// Temporary deployment script to inject environment variables on Hostinger
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
    try {
        const { secret, apiKey } = await req.json();

        // Hardcoded, one-time secret just for this operation
        if (secret !== 'auto-deploy-agent-x9281290001') {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        if (!apiKey) {
             return NextResponse.json({ success: false, error: 'No API Key provided' }, { status: 400 });
        }

        const envPath = path.join(process.cwd(), '.env.local');
        
        let envContent = '';
        if (fs.existsSync(envPath)) {
            envContent = fs.readFileSync(envPath, 'utf8');
        }

        // Only append if it doesn't exist
        if (envContent.includes('GEMINI_API_KEY=')) {
            // Replace existing key
            envContent = envContent.replace(/GEMINI_API_KEY=.*/, `GEMINI_API_KEY=${apiKey}`);
        } else {
            // Append
            envContent += `\n# Injected by Agent\nGEMINI_API_KEY=${apiKey}\n`;
        }

        fs.writeFileSync(envPath, envContent, 'utf8');

        // Force a PM2 restart by gracefully crashing
        setTimeout(() => {
            console.log("Agent requested PM2 env flush. Exiting process. PM2 will auto-restart.");
            process.exit(0);
        }, 1000);

        return NextResponse.json({ success: true, message: 'Key successfully injected on Live Host and server restarted.' });

    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message }, { status: 500 });
    }
}
