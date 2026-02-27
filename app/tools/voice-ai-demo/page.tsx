'use client';

import { useState, useEffect, useRef } from 'react';
import { Phone, PhoneOff, Mic, Volume2, Bot, Loader2, Sparkles, MessageCircle } from 'lucide-react';
import { SocialShare } from '@/components/ui/social-share';

// Types for Web Speech API
declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

export default function VoiceAIDemo() {
    const [isCallActive, setIsCallActive] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'agent', text: string }[]>([]);

    const recognitionRef = useRef<any>(null);
    const synthesisRef = useRef<SpeechSynthesis | null>(null);

    // Initialize Web Speech APIs
    useEffect(() => {
        if (typeof window !== 'undefined') {
            synthesisRef.current = window.speechSynthesis;
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.continuous = false;
                recognition.interimResults = true;
                recognition.lang = 'en-US';

                recognition.onstart = () => setIsListening(true);

                recognition.onresult = (event: any) => {
                    let currentTranscript = '';
                    for (let i = event.resultIndex; i < event.results.length; i++) {
                        currentTranscript += event.results[i][0].transcript;
                    }
                    setTranscript(currentTranscript);
                };

                // When user stops speaking, process their query
                recognition.onend = () => {
                    setIsListening(false);
                    const finalTranscript = transcript.trim();

                    // If we actually captured audio
                    if (finalTranscript && isCallActive && !isSpeaking) {
                        handleUserQuery(finalTranscript);
                    } else if (isCallActive && !isSpeaking) {
                        // Automatically restart listening if still in call and not speaking
                        try { recognition.start(); } catch (e) { }
                    }
                };

                recognition.onerror = (event: any) => {
                    console.error("Speech Recognition Error:", event.error);
                    if (event.error !== 'no-speech' && event.error !== 'aborted') {
                        setIsListening(false);
                    }
                };

                recognitionRef.current = recognition;
            }
        }
    }, [transcript, isCallActive, isSpeaking]);

    // Handle when user hits "Start Call"
    const startCall = () => {
        setIsCallActive(true);
        setChatHistory([]);
        setTranscript('');

        // Introductory greeting
        const greeting = "Hi there! I'm Sarah, the AI assistant for Atul Automation. How can I help you today?";
        setChatHistory([{ role: 'agent', text: greeting }]);
        speak(greeting);
    };

    // Handle when user hits "End Call"
    const endCall = () => {
        setIsCallActive(false);
        setIsListening(false);
        setIsSpeaking(false);
        setTranscript('');
        if (recognitionRef.current) recognitionRef.current.stop();
        if (synthesisRef.current) synthesisRef.current.cancel();
    };

    // The AI speaks back using the browser synth API
    const speak = (text: string) => {
        if (!synthesisRef.current) return;

        setIsSpeaking(true);
        // Ensure not trying to listen while speaking
        if (recognitionRef.current) recognitionRef.current.stop();

        const utterance = new SpeechSynthesisUtterance(text);

        // Try to find a good female voice (Google US English or UK English)
        const voices = synthesisRef.current.getVoices();
        const preferredVoice = voices.find(v => v.name.includes("Google US English") || v.name.includes("Samantha") || v.name.includes("Female"));
        if (preferredVoice) utterance.voice = preferredVoice;

        utterance.rate = 1.0; // Normal speaking speed
        utterance.pitch = 1.1; // Slightly friendly pitch

        utterance.onend = () => {
            setIsSpeaking(false);
            // Once done speaking, immediately start listening again if the call is active
            if (isCallActive && recognitionRef.current) {
                try {
                    setTranscript('');
                    recognitionRef.current.start();
                } catch (e) { console.error(e) }
            }
        };

        synthesisRef.current.speak(utterance);
    };

    // Process the final voice text through our backend API
    const handleUserQuery = async (queryText: string) => {
        // Prevent double booking
        if (isSpeaking) return;

        // Add to history
        setChatHistory(prev => [...prev, { role: 'user', text: queryText }]);
        setTranscript('');
        setIsSpeaking(true); // Temporarily set speaking flag to simulate "thinking" to avoid overlapping recognition

        try {
            const res = await fetch('/api/voice-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: queryText }),
            });

            const data = await res.json();

            if (data.error) throw new Error(data.error);

            setChatHistory(prev => [...prev, { role: 'agent', text: data.response }]);
            speak(data.response);

        } catch (error) {
            console.error(error);
            const fallbackMsg = "I'm sorry, my connection dropped for a second. Could you repeat that?";
            setChatHistory(prev => [...prev, { role: 'agent', text: fallbackMsg }]);
            speak(fallbackMsg);
        }
    };

    return (
        <main className="min-h-screen pt-24 md:pt-32 pb-24 overflow-hidden relative bg-background text-foreground selection:bg-primary/20 selection:text-primary">
            {/* Background Animations */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10 mix-blend-screen opacity-50" />
            {(isListening || isSpeaking) && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/20 rounded-full blur-[80px] -z-10 mix-blend-screen animate-pulse" />
            )}

            <section className="container-custom max-w-4xl relative z-10 flex flex-col items-center">

                {/* Header */}
                <div className="text-center mb-12">
                    <span className="section-badge mb-6">
                        <Mic className="w-4 h-4 animate-pulse mr-1" />
                        Live Voice Demo
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight">
                        Talk to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Sarah</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                        Experience our interactive Voice AI Agent. Tap the green button to start a phone call right in your browser. (Make sure your microphone is allowed).
                    </p>
                </div>

                {/* Call Interface Box */}
                <div className="w-full max-w-md bg-card/80 backdrop-blur-2xl border border-border rounded-[3rem] p-8 shadow-2xl flex flex-col items-center justify-between min-h-[500px] relative overflow-hidden">

                    {/* Top Status */}
                    <div className="w-full flex justify-between items-center mb-8 px-2">
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Bot className="w-8 h-8 text-primary" />
                                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-card"></div>
                            </div>
                            <div>
                                <h3 className="font-bold text-foreground leading-none">Sarah AI</h3>
                                <p className="text-xs text-muted-foreground mt-1">Receptionist Agent</p>
                            </div>
                        </div>
                        <div className="text-right flex-1 flex justify-end">
                            <div className="w-auto">
                                {isCallActive ? (
                                    <span className="flex items-center gap-1.5 text-xs font-bold text-green-600 dark:text-green-400 bg-green-500/10 px-2 py-1 rounded-lg animate-pulse whitespace-nowrap">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> 00:00
                                    </span>
                                ) : (
                                    <span className="text-xs font-bold text-muted-foreground bg-muted px-2 py-1 rounded-lg border border-border">Offline</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Central Circle Animation */}
                    <div className="relative flex-1 flex flex-col items-center justify-center w-full">
                        <div className={`relative flex items-center justify-center w-48 h-48 rounded-full border-2 
                            ${!isCallActive ? 'border-border' :
                                isSpeaking ? 'border-primary shadow-[0_0_50px_rgba(255,87,34,0.2)]' :
                                    isListening ? 'border-green-500 shadow-[0_0_50px_rgba(34,197,94,0.2)]' : 'border-primary/50'}
                            transition-all duration-500 ease-out`}
                        >
                            {/* Inner pulsing ripples if active */}
                            {isCallActive && (
                                <>
                                    <div className={`absolute inset-0 rounded-full bg-primary/5 ${isSpeaking ? 'animate-ping' : ''}`}></div>
                                    <div className={`absolute inset-4 rounded-full bg-primary/10 ${isListening ? 'animate-pulse' : ''}`}></div>
                                </>
                            )}

                            <div className="z-10 bg-muted/80 backdrop-blur-sm w-32 h-32 border border-border rounded-full flex items-center justify-center shadow-inner">
                                {!isCallActive ? (
                                    <Bot className="w-12 h-12 text-muted-foreground/50" />
                                ) : isSpeaking ? (
                                    <Volume2 className="w-12 h-12 text-primary animate-pulse" />
                                ) : isListening ? (
                                    <Mic className="w-12 h-12 text-green-500 animate-bounce" />
                                ) : (
                                    <Loader2 className="w-12 h-12 text-primary animate-spin" />
                                )}
                            </div>
                        </div>

                        {/* Status Text Under Circle */}
                        <div className="mt-8 text-center h-16 w-full flex items-center justify-center px-4">
                            {!isCallActive ? (
                                <p className="text-muted-foreground text-sm font-medium">Ready when you are.</p>
                            ) : isSpeaking ? (
                                <p className="text-primary font-bold">Sarah is speaking...</p>
                            ) : isListening ? (
                                <p className="text-green-600 dark:text-green-400 font-bold overflow-hidden text-ellipsis whitespace-nowrap px-4 bg-green-500/10 rounded-full py-2">
                                    {transcript ? `"${transcript}"` : "Listening..."}
                                </p>
                            ) : (
                                <p className="text-muted-foreground text-sm animate-pulse flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Thinking...</p>
                            )}
                        </div>
                    </div>

                    {/* Call Buttons */}
                    <div className="w-full flex justify-center mt-auto pt-6 gap-6">
                        {!isCallActive ? (
                            <button
                                onClick={startCall}
                                className="group flex flex-col items-center gap-3"
                            >
                                <div className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-white transition-all shadow-lg hover:shadow-green-500/30 hover:scale-110 active:scale-95 cursor-pointer">
                                    <Phone className="w-7 h-7 fill-current" />
                                </div>
                                <span className="text-xs font-bold text-green-600 dark:text-green-500 group-hover:text-green-700 dark:group-hover:text-green-400">Connect to AI</span>
                            </button>
                        ) : (
                            <button
                                onClick={endCall}
                                className="group flex flex-col items-center gap-3"
                            >
                                <div className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white transition-all shadow-lg hover:shadow-red-500/30 hover:scale-110 active:scale-95 cursor-pointer">
                                    <PhoneOff className="w-7 h-7" />
                                </div>
                                <span className="text-xs font-bold text-red-600 dark:text-red-500 group-hover:text-red-700 dark:group-hover:text-red-400">End Call</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Subtext info */}
                <div className="mt-12 text-center text-muted-foreground text-sm max-w-lg bg-muted/50 rounded-2xl p-4 border border-border flex flex-col sm:flex-row items-center gap-3">
                    <Sparkles className="w-8 h-8 text-primary shrink-0" />
                    <p className="text-left leading-relaxed">This is a simulated browser demo. A real production Voice Agent (like Vapi or Retell AI) can route live phone lines, book calendars, integrate directly with your CRM, and achieve &lt;500ms latency.</p>
                </div>

            </section>
        </main>
    );
}
