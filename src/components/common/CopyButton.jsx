import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export function CopyButton({ text }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text);
            } else {
                const ta = document.createElement('textarea');
                ta.value = text;
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                document.body.removeChild(ta);
            }
            setCopied(true);
            setTimeout(() => setCopied(false), 1400);
        } catch (e) { }
    };

    return (
        <button
            onClick={handleCopy}
            className="neo-btn px-2 py-1 bg-[var(--surface)] font-mono-ui text-[10px] font-bold flex items-center gap-1"
            title="Copy code"
        >
            {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
            {copied ? 'Copied!' : 'Copy'}
        </button>
    );
}

export default CopyButton;
