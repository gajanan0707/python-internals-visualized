import { useEffect } from 'react';

export function useAnimationLoop({ currentStep, paused, speed, replaySeed }) {
    useEffect(() => {
        let rafId = null;
        const start = performance.now();
        const duration = 1800 / (speed || 1);

        const tick = (now) => {
            if (!paused && currentStep?.edges) {
                const t = ((now - start) % duration) / duration;
                currentStep.edges.forEach((e, idx) => {
                    if (!e.active) return;
                    const path = document.getElementById(`py-edge-${idx}`);
                    const dot = document.getElementById(`py-pkt-${idx}`);
                    if (path && dot) {
                        const len = path.getTotalLength();
                        const pt = path.getPointAtLength(t * len);
                        dot.setAttribute('cx', pt.x);
                        dot.setAttribute('cy', pt.y);
                    }
                });
            }
            rafId = requestAnimationFrame(tick);
        };

        rafId = requestAnimationFrame(tick);
        return () => {
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [currentStep, paused, speed, replaySeed]);
}
