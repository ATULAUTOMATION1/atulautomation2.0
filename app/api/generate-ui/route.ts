import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // If no API key is present, we return a fully functional mocked template
    // to demonstrate the capability without crashing. 
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not set in .env.local. Returning a mocked prototype.");
      
      // Simulate real API latency
      await new Promise(res => setTimeout(res, 3000));
      
      const mockedResponse = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Prototype</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              primary: '#F97316',
            }
          }
        }
      }
    </script>
</head>
<body class="bg-gray-50 text-gray-900 font-sans min-h-screen flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div class="h-16 flex items-center px-6 border-b border-gray-200">
            <i data-lucide="sparkles" class="text-primary w-5 h-5 mr-2"></i>
            <span class="font-bold text-lg tracking-tight">App Builder Demo</span>
        </div>
        <nav class="flex-1 p-4 space-y-1">
            <a href="#" class="flex items-center px-3 py-2 text-primary bg-orange-50 rounded-md font-medium text-sm">
                <i data-lucide="layout-dashboard" class="w-4 h-4 mr-3"></i> Dashboard
            </a>
            <a href="#" class="flex items-center px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md font-medium text-sm transition-colors">
                <i data-lucide="users" class="w-4 h-4 mr-3"></i> Users
            </a>
            <a href="#" class="flex items-center px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md font-medium text-sm transition-colors">
                <i data-lucide="bar-chart-3" class="w-4 h-4 mr-3"></i> Analytics
            </a>
            <a href="#" class="flex items-center px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md font-medium text-sm transition-colors">
                <i data-lucide="settings" class="w-4 h-4 mr-3"></i> Settings
            </a>
        </nav>
        <div class="p-4 border-t border-gray-200">
            <div class="bg-blue-50 text-blue-700 p-3 rounded-md text-xs font-semibold">
                ⚠️ GEMINI_API_KEY not found. Showing mock data. Please add your key to .env.local for dynamic generation!
            </div>
        </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col">
        <header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
            <h1 class="text-xl font-semibold opacity-80">Overview: \${prompt}</h1>
            <div class="flex items-center gap-4">
                <button class="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                    <i data-lucide="bell" class="w-4 h-4 text-gray-500"></i>
                </button>
                <div class="w-8 h-8 rounded-full bg-primary/20 border border-primary text-primary flex items-center justify-center font-bold text-xs">
                    AA
                </div>
            </div>
        </header>

        <div class="p-8 flex-1 overflow-y-auto">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <!-- Stat Cards -->
                <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div class="text-gray-500 text-sm font-medium mb-1 flex items-center justify-between">
                        Total Revenue <i data-lucide="dollar-sign" class="w-4 h-4 text-gray-400"></i>
                    </div>
                    <div class="text-3xl font-bold tracking-tight">$45,231.89</div>
                    <div class="text-green-500 text-xs font-semibold mt-2 flex items-center">
                        <i data-lucide="trending-up" class="w-3 h-3 mr-1"></i> +20.1% from last month
                    </div>
                </div>
                <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div class="text-gray-500 text-sm font-medium mb-1 flex items-center justify-between">
                        Active Users <i data-lucide="users" class="w-4 h-4 text-gray-400"></i>
                    </div>
                    <div class="text-3xl font-bold tracking-tight">+2,350</div>
                    <div class="text-green-500 text-xs font-semibold mt-2 flex items-center">
                        <i data-lucide="trending-up" class="w-3 h-3 mr-1"></i> +15.5% from last month
                    </div>
                </div>
                <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div class="text-gray-500 text-sm font-medium mb-1 flex items-center justify-between">
                        Active Sessions <i data-lucide="activity" class="w-4 h-4 text-gray-400"></i>
                    </div>
                    <div class="text-3xl font-bold tracking-tight">+12,234</div>
                    <div class="text-red-500 text-xs font-semibold mt-2 flex items-center">
                        <i data-lucide="trending-down" class="w-3 h-3 mr-1"></i> -4.2% from last month
                    </div>
                </div>
            </div>

            <!-- Content Area -->
            <div class="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col overflow-hidden h-96">
                <div class="p-4 border-b border-gray-100 font-semibold text-gray-700 flex justify-between items-center">
                    Recent Activity
                    <button class="text-xs text-primary font-medium hover:underline">View All</button>
                </div>
                <!-- Mock Chart Area -->
                <div class="flex-1 flex items-center justify-center bg-gray-50/50">
                    <div class="text-center">
                        <i data-lucide="bar-chart-2" class="w-16 h-16 text-gray-300 mx-auto mb-4"></i>
                        <p class="text-gray-400 text-sm font-medium">Interactive Graph Area</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <script>
      lucide.createIcons();
    </script>
</body>
</html>
      `.replace(/\${prompt}/g, prompt);

      return NextResponse.json({ html: mockedResponse });
    }

    // -- REAL GENERATION USING GEMINI --
    const genAI = new GoogleGenerativeAI(apiKey);
    // Use gemini-2.5-flash for speed
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const systemPrompt = `
You are an expert UI/UX developer and frontend engineer. 
Your task is to generate a fully functional, beautiful, modern, single-file HTML prototype based on the user's prompt.
You MUST use Tailwind CSS via CDN (<script src="https://cdn.tailwindcss.com"></script>).
You MUST use Lucide icons via CDN (<script src="https://unpkg.com/lucide@latest"></script>) and initialize them with lucide.createIcons(); at the end of the body.
Ensure the design looks extremely premium, using modern layout paradigms (Grid/Flexbox), soft shadows, nice borders, and rounded corners.

CRITICAL RULES:
1. Return ONLY the raw HTML code. 
2. NO markdown formatting blocks like "\`\`\`html" or "\`\`\`". Just output the raw <html> string starting from <!DOCTYPE html>.
3. Include inline JavaScript for basic interactivity if it makes sense (like a togglable sidebar or tabs), but it is optional.
`;

    const result = await model.generateContent([
      systemPrompt, 
      `User requested UI: "${prompt}"`
    ]);

    const text = result.response.text();
    // Clean up potential markdown formatting if the model disobeys
    const cleanHtml = text.replace(/^\`\`\`(html)?/, "").replace(/\`\`\`$/, "").trim();

    return NextResponse.json({ html: cleanHtml });

  } catch (error: any) {
    console.error("UI Generation Error:", error);
    return NextResponse.json(
      { error: "Failed to generate prototype.", details: error.message },
      { status: 500 }
    );
  }
}
