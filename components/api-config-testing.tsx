"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { formatApiError } from "@/lib/apiStatusCheck";
import { testApiConnection } from "@/app/actions"; // Import from server actions

export default function ApiConnectionTest({ config }: { config: any }) {
    const [testing, setTesting] = useState(false);
    const [result, setResult] = useState<{
        success: boolean;
        message: string;
        provider?: string;
        error?: any;
    } | null>(null);

    const runTest = async () => {
        setTesting(true);
        setResult(null);

        try {
            // Make sure we have valid API keys before testing
            const validConfig = {
                anthropicApiKey: config.anthropicApiKey?.trim() || "",
                openaiApiKey: config.openaiApiKey?.trim() || "",
                preferredProvider: config.preferredProvider || "anthropic",
            };
            
            // Exit early if no API key is provided for the selected provider
            if (validConfig.preferredProvider === "anthropic" && !validConfig.anthropicApiKey) {
                setResult({
                    success: false,
                    message: "Anthropic API key is required for testing with Anthropic provider"
                });
                setTesting(false);
                return;
            }
            
            if (validConfig.preferredProvider === "openai" && !validConfig.openaiApiKey) {
                setResult({
                    success: false,
                    message: "OpenAI API key is required for testing with OpenAI provider"
                });
                setTesting(false);
                return;
            }
            
            // Pass the config to the server action
            const testResult = await testApiConnection({
                anthropicApiKey: validConfig.anthropicApiKey,
                openaiApiKey: validConfig.openaiApiKey,
                preferredProvider: validConfig.preferredProvider,
            });
            
            setResult(testResult);
        } catch (error: any) {
            // Handle serialization errors by extracting just the message
            let errorMessage = "";
            if (typeof error === "object") {
                errorMessage = error.message || "Unknown error occurred";
            } else {
                errorMessage = String(error);
            }
            
            setResult({
                success: false,
                message: formatApiError(errorMessage),
                error: { message: errorMessage }
            });
        } finally {
            setTesting(false);
        }
    };

    return (
        <div className="mt-4 p-4 border rounded-md">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium">API Connection Test</h3>
                <Button
                    onClick={runTest}
                    disabled={testing}
                    size="sm"
                    variant="outline"
                >
                    {testing ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Testing...
                        </>
                    ) : (
                        "Test Connection"
                    )}
                </Button>
            </div>

            {result && (
                <div
                    className={`p-3 rounded-md text-sm flex items-start gap-2 ${
                        result.success
                            ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                            : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
                    }`}
                >
                    {result.success ? (
                        <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
                    ) : (
                        <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
                    )}
                    <div>
                        <p className="font-medium">
                            {result.success
                                ? "Connection Successful"
                                : "Connection Failed"}
                        </p>
                        <p>{result.message}</p>
                        {result.provider && (
                            <p className="text-xs mt-1">
                                Provider: {result.provider}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}