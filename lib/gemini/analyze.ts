import OpenAI from 'openai';
import Groq from 'groq-sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GOLDEN_PROMPT = `You are a contract analysis expert. Analyze the following contract text and provide a structured analysis.

Your response MUST be a valid JSON object with exactly these fields:
{
  "summary": "A plain-English summary of what this contract is about (2-3 sentences)",
  "keyObligations": ["List of key obligations and responsibilities"],
  "risksAndRedFlags": ["List of potential risks, red flags, or concerning clauses"],
  "importantDates": ["List of important dates, deadlines, and time-sensitive conditions"],
  "whoShouldBeCareful": "Who should pay special attention to this contract and why"
}

Guidelines:
- Use simple, plain English that anyone can understand
- Be specific and actionable in your analysis
- Highlight anything that seems unusual or one-sided
- If there are no items for a category, use an empty array []
- Keep each point concise but informative
- Return ONLY the JSON object, no other text

CONTRACT TEXT:
`;

export interface ContractAnalysis {
    summary: string;
    keyObligations: string[];
    risksAndRedFlags: string[];
    importantDates: string[];
    whoShouldBeCareful: string;
}

type Provider = 'openrouter' | 'groq' | 'gemini';

function isRateLimitError(error: unknown): boolean {
    if (error instanceof Error) {
        const message = error.message.toLowerCase();
        return message.includes('rate') ||
            message.includes('quota') ||
            message.includes('429') ||
            message.includes('too many requests') ||
            message.includes('limit');
    }
    return false;
}

function parseAnalysisResponse(text: string): ContractAnalysis {
    // Extract JSON from the response (handle markdown code blocks)
    let jsonText = text;
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
        jsonText = jsonMatch[1].trim();
    }

    try {
        return JSON.parse(jsonText) as ContractAnalysis;
    } catch {
        // If parsing fails, return a fallback response
        return {
            summary: text.substring(0, 500),
            keyObligations: ['Unable to parse structured response - please try again'],
            risksAndRedFlags: [],
            importantDates: [],
            whoShouldBeCareful: 'Please re-analyze for detailed results',
        };
    }
}

async function analyzeWithOpenRouter(contractText: string): Promise<ContractAnalysis> {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
        throw new Error('OPENROUTER_API_KEY not configured');
    }

    console.log('Trying OpenRouter...');

    const openai = new OpenAI({
        baseURL: 'https://openrouter.ai/api/v1',
        apiKey,
    });

    const completion = await openai.chat.completions.create({
        model: 'meta-llama/llama-3.1-8b-instruct:free',
        messages: [
            { role: 'user', content: GOLDEN_PROMPT + contractText }
        ],
    });

    const text = completion.choices[0]?.message?.content || '';
    console.log('OpenRouter response received');
    return parseAnalysisResponse(text);
}

async function analyzeWithGroq(contractText: string): Promise<ContractAnalysis> {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
        throw new Error('GROQ_API_KEY not configured');
    }

    console.log('Trying Groq...');

    const groq = new Groq({ apiKey });

    const completion = await groq.chat.completions.create({
        model: 'llama-3.1-8b-instant',
        messages: [
            { role: 'user', content: GOLDEN_PROMPT + contractText }
        ],
    });

    const text = completion.choices[0]?.message?.content || '';
    console.log('Groq response received');
    return parseAnalysisResponse(text);
}

async function analyzeWithGemini(contractText: string): Promise<ContractAnalysis> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error('GEMINI_API_KEY not configured');
    }

    console.log('Trying Gemini...');

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const result = await model.generateContent(GOLDEN_PROMPT + contractText);
    const response = await result.response;
    const text = response.text();

    console.log('Gemini response received');
    return parseAnalysisResponse(text);
}

export async function analyzeContract(contractText: string): Promise<ContractAnalysis> {
    const providers: { name: Provider; fn: (text: string) => Promise<ContractAnalysis> }[] = [
        { name: 'openrouter', fn: analyzeWithOpenRouter },
        { name: 'groq', fn: analyzeWithGroq },
        { name: 'gemini', fn: analyzeWithGemini },
    ];

    let lastError: Error | null = null;

    for (const provider of providers) {
        try {
            const result = await provider.fn(contractText);
            console.log(`✓ Analysis completed with ${provider.name}`);
            return result;
        } catch (error) {
            console.error(`✗ ${provider.name} failed:`, error instanceof Error ? error.message : error);
            lastError = error instanceof Error ? error : new Error(String(error));

            // If it's a rate limit error, try next provider
            if (isRateLimitError(error)) {
                console.log(`Rate limit hit on ${provider.name}, trying next provider...`);
                continue;
            }

            // For non-rate-limit errors (like missing API key), also try next provider
            continue;
        }
    }

    // All providers failed
    throw new Error(`All AI providers failed. Last error: ${lastError?.message || 'Unknown error'}`);
}
