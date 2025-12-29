import { Header } from "@/app/components/Header";
import { Sidebar } from "@/app/components/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <Header />
            <Sidebar />
            <main className="md:pl-64 pt-16">
                <div className="p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
