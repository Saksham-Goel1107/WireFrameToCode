import React, { useState } from 'react'
import { Sandpack, SandpackCodeEditor, SandpackLayout, SandpackProvider } from "@codesandbox/sandpack-react";
import Constants from '@/data/Constants';
import { aquaBlue } from "@codesandbox/sandpack-themes";
import { ClipboardCopy, Check } from 'lucide-react';
import { toast } from 'sonner';
function CodeEditor({ codeResp, isReady }: any) {
    const [copied, setCopied] = useState(false);
    
    const handleCopyCode = () => {
        navigator.clipboard.writeText(codeResp)
            .then(() => {
                setCopied(true);
                toast.success("Code copied to clipboard");
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(err => {
                toast.error("Failed to copy code");
                console.error('Failed to copy code: ', err);
            });
    };

    return (
        <div className="relative">
            <button 
                onClick={handleCopyCode}
                className="absolute top-2 right-2 z-10 bg-gray-800 text-white p-2 rounded-md hover:bg-gray-700 transition-colors"
                title="Copy code"
            >
                {copied ? <Check size={18} /> : <ClipboardCopy size={18} />}
            </button>
            
            {isReady ? <Sandpack template="react"
                theme={aquaBlue}
                options={{
                    externalResources: ["https://cdn.tailwindcss.com"],
                    showNavigator: true,
                    showTabs: true,
                    editorHeight: 600
                }}
                customSetup={{
                    dependencies: {
                        ...Constants.DEPENDANCY
                    }
                }}
                files={{
                    "/App.js": `${codeResp}`,

                }} />
                :
                <SandpackProvider template="react"
                    theme={aquaBlue}
                    files={{
                        "/app.js": {
                            code: `${codeResp}`,
                            active: true
                        }
                    }}
                    customSetup={{
                        dependencies: {
                            ...Constants.DEPENDANCY
                        }
                    }}
                    options={{
                        externalResources: ["https://cdn.tailwindcss.com"],
                    }}
                >
                    <SandpackLayout>
                        <SandpackCodeEditor showTabs={true} style={{ height: '70vh' }} />
                    </SandpackLayout>
                </SandpackProvider>
            }
        </div>
    )
}

export default CodeEditor