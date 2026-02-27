"use client";

import { useEffect } from "react";

interface AdSlotProps {
    className?: string;
    id?: string;
    style?: React.CSSProperties;
}

export function AdSlot({ className = "", id, style }: AdSlotProps) {
    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error("AdSense error:", err);
        }
    }, []);

    return (
        <div className={`my-8 w-full overflow-hidden ${className}`}>
            <ins
                className="adsbygoogle"
                style={style || { display: "block", minHeight: "90px" }}
                data-ad-client="ca-pub-5677457553651550"
                data-ad-slot={id || "auto"}
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
        </div>
    );
}
