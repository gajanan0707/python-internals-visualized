import { useEffect, useRef } from 'react';

export function useAnimationLoop({
    currentStep,
    paused,
    speed,
    replaySeed,
    flowMode = 'sequence',
    manualHop = null,
    onHopChange = null
}) {
    const lastHopRef = useRef(-1);

    useEffect(() => {
        let rafId = null;
        const start = performance.now();
        const activeEdges = currentStep?.edges?.filter((e) => e.active) || [];
        const numActive = activeEdges.length || 1;

        // Base hop duration: 1300ms per hop, scaled by speed
        const hopDuration = 1300 / (speed || 1);
        const totalDuration = flowMode === 'sequence' ? numActive * hopDuration : 1800 / (speed || 1);

        const tick = (now) => {
            if (!currentStep?.edges) return;

            // Manual Hop mode (paused on a specific hop)
            if (manualHop !== null && manualHop >= 0 && manualHop < currentStep.edges.length) {
                currentStep.edges.forEach((e, idx) => {
                    const dot = document.getElementById(`py-pkt-${idx}`);
                    const trail = document.getElementById(`py-trail-${idx}`);
                    const path = document.getElementById(`py-edge-${idx}`);
                    if (!dot || !path) return;

                    if (idx === manualHop) {
                        const len = path.getTotalLength();
                        const pt = path.getPointAtLength(0.65 * len);
                        dot.setAttribute('cx', pt.x);
                        dot.setAttribute('cy', pt.y);
                        dot.setAttribute('opacity', '1');
                        if (trail) {
                            const trPt = path.getPointAtLength(0.52 * len);
                            trail.setAttribute('cx', trPt.x);
                            trail.setAttribute('cy', trPt.y);
                            trail.setAttribute('opacity', '0.6');
                        }
                    } else {
                        dot.setAttribute('opacity', '0.15');
                        if (trail) trail.setAttribute('opacity', '0');
                    }
                });

                if (onHopChange && lastHopRef.current !== manualHop) {
                    lastHopRef.current = manualHop;
                    onHopChange(manualHop);
                }
                return;
            }

            // Automatic Animation
            if (!paused) {
                if (flowMode === 'sequence') {
                    const elapsed = (now - start) % totalDuration;
                    const overallP = elapsed / totalDuration;
                    const activeHopIdx = Math.min(numActive - 1, Math.floor(overallP * numActive));
                    const localRaw = (overallP * numActive) - activeHopIdx;
                    // Smooth sinusoidal ease-in-out
                    const easedT = (1 - Math.cos(localRaw * Math.PI)) / 2;

                    let activeCount = 0;
                    currentStep.edges.forEach((e, idx) => {
                        const dot = document.getElementById(`py-pkt-${idx}`);
                        const trail = document.getElementById(`py-trail-${idx}`);
                        const path = document.getElementById(`py-edge-${idx}`);
                        if (!dot || !path) return;

                        if (!e.active) {
                            dot.setAttribute('opacity', '0');
                            if (trail) trail.setAttribute('opacity', '0');
                            return;
                        }

                        const currentHopRank = activeCount;
                        activeCount++;

                        if (currentHopRank === activeHopIdx) {
                            const len = path.getTotalLength();
                            const pt = path.getPointAtLength(easedT * len);
                            dot.setAttribute('cx', pt.x);
                            dot.setAttribute('cy', pt.y);
                            dot.setAttribute('opacity', '1');

                            if (trail) {
                                const trailT = Math.max(0, easedT - 0.08);
                                const trPt = path.getPointAtLength(trailT * len);
                                trail.setAttribute('cx', trPt.x);
                                trail.setAttribute('cy', trPt.y);
                                trail.setAttribute('opacity', easedT > 0.1 ? '0.65' : '0');
                            }
                        } else if (currentHopRank < activeHopIdx) {
                            // Completed previous hop in this wave: parked at destination with subtle glow
                            const len = path.getTotalLength();
                            const pt = path.getPointAtLength(len);
                            dot.setAttribute('cx', pt.x);
                            dot.setAttribute('cy', pt.y);
                            dot.setAttribute('opacity', '0.35');
                            if (trail) trail.setAttribute('opacity', '0');
                        } else {
                            // Future hop: hidden until its turn
                            dot.setAttribute('opacity', '0.05');
                            if (trail) trail.setAttribute('opacity', '0');
                        }
                    });

                    if (onHopChange && lastHopRef.current !== activeHopIdx) {
                        lastHopRef.current = activeHopIdx;
                        onHopChange(activeHopIdx);
                    }
                } else {
                    // Continuous Stream mode
                    const t = ((now - start) % totalDuration) / totalDuration;
                    currentStep.edges.forEach((e, idx) => {
                        if (!e.active) return;
                        const path = document.getElementById(`py-edge-${idx}`);
                        const dot = document.getElementById(`py-pkt-${idx}`);
                        const trail = document.getElementById(`py-trail-${idx}`);
                        if (path && dot) {
                            const len = path.getTotalLength();
                            const offsetT = (t + idx * 0.25) % 1;
                            const pt = path.getPointAtLength(offsetT * len);
                            dot.setAttribute('cx', pt.x);
                            dot.setAttribute('cy', pt.y);
                            dot.setAttribute('opacity', '1');

                            if (trail) {
                                const trailT = (offsetT - 0.07 + 1) % 1;
                                const trPt = path.getPointAtLength(trailT * len);
                                trail.setAttribute('cx', trPt.x);
                                trail.setAttribute('cy', trPt.y);
                                trail.setAttribute('opacity', '0.5');
                            }
                        }
                    });
                }
            }

            rafId = requestAnimationFrame(tick);
        };

        rafId = requestAnimationFrame(tick);
        return () => {
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [currentStep, paused, speed, replaySeed, flowMode, manualHop, onHopChange]);
}
