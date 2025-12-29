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

CONTRACT TEXT:
`;

export interface ContractAnalysis {
    summary: string;
    keyObligations: string[];
    risksAndRedFlags: string[];
    importantDates: string[];
    whoShouldBeCareful: string;
}

export async function analyzeContract(contractText: string): Promise<ContractAnalysis> {
    // Get API key at runtime to ensure environment is loaded
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error('GEMINI_API_KEY is not configured. Please add it to your .env.local file.');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = GOLDEN_PROMPT + contractText;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Extract JSON from the response (handle markdown code blocks)
        let jsonText = text;
        const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
        if (jsonMatch) {
            jsonText = jsonMatch[1].trim();
        }

        try {
            const analysis = JSON.parse(jsonText) as ContractAnalysis;
            return analysis;
        } catch {
            // If parsing fails, create a structured response from the raw text
            return {
                summary: text.substring(0, 500),
                keyObligations: ['Unable to parse structured response - please try again'],
                risksAndRedFlags: [],
                importantDates: [],
                whoShouldBeCareful: 'Please re-analyze for detailed results',
            };
        }
    } catch (error) {
        console.error('Gemini API error:', error);
        throw new Error('Failed to analyze contract with AI. Please check your API key and try again.');
    }
}
