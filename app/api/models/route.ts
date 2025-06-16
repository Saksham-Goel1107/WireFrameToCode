import { NextRequest, NextResponse } from 'next/server';
import OpenAI from "openai";

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_AI_API_KEY || '',
    defaultHeaders: {
        'HTTP-Referer': 'https://wireframetocode.vercel.app',
        'X-Title': 'WireFrameToCode'
    }
});

export async function GET(request: NextRequest) {
    try {
        // List available models from OpenRouter
        const models = await openai.models.list();
        
        // Filter for vision models only (those that can process images)
        const visionModels = models.data.filter(model => {
            // Filter for models that are known to support vision or have vision in their name
            return model.id.includes('vision') || 
                   model.id.includes('gemini') ||
                   model.id.includes('claude') ||
                   model.id.includes('gpt-4');
        });
        
        return NextResponse.json({
            allModels: models.data.map(model => model.id),
            visionModels: visionModels.map(model => model.id)
        });
    } catch (error) {
        console.error('Error fetching models:', error);
        return NextResponse.json({ 
            error: 'Failed to fetch models', 
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
