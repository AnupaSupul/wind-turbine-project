import { memo, useMemo } from 'react';
import './TurbineVisualization.css';

/**
 * SVG-based wind turbine visualization driven entirely by real telemetry.
 *
 * Visual mappings:
 * - windSpeed    → wind particle animation speed + blade rotation speed
 * - pitchAngle   → blade CSS transform rotation (smooth transition)
 * - power        → generator glow intensity (visual scaling, NOT engineering threshold)
 * - stepperPosition → stepper progress indicator
 *
 * IMPORTANT:
 * - Blade rotation is a VISUAL REPRESENTATION driven by windSpeed.
 *   It does NOT represent measured RPM. RPM is NOT in the telemetry schema.
 * - Power glow normalization is purely a UI visual scale, not an engineering limit.
 */
function TurbineVisualization({ data }) {
    const windSpeed = data?.windSpeed ?? 0;
    const pitchAngle = data?.pitchAngle ?? 0;
    const power = data?.power ?? 0;
    const stepperPosition = data?.stepperPosition ?? 0;
    const experimentId = data?.experimentId ?? '—';

    // Blade rotation speed driven by windSpeed — visual representation only
    const rotationDuration = useMemo(() => {
        if (windSpeed <= 0.1) return 0; // no rotation when no wind
        return Math.max(0.5, 8 / windSpeed);
    }, [windSpeed]);

    // Wind particle speed — inversely proportional to wind speed
    const windParticleDuration = useMemo(() => {
        if (windSpeed <= 0.1) return 0;
        return Math.max(0.8, 6 / windSpeed);
    }, [windSpeed]);

    // Power glow — normalized from available power data range.
    // This is purely a visual scale, NOT an engineering rating or limit.
    const powerGlow = useMemo(() => {
        return Math.min(1, Math.max(0.05, power / 40));
    }, [power]);

    // Stepper visual proportion
    const stepperPercent = useMemo(() => {
        // Stepper range is typically 0-1000 based on the simulator
        if (stepperPosition <= 0) return 0;
        return Math.min(100, (stepperPosition / 1000) * 100);
    }, [stepperPosition]);

    // Wind intensity class
    const windIntensity = windSpeed > 5 ? 'high' : windSpeed > 2 ? 'medium' : 'low';

    return (
        <div className="turbine-viz" id="turbine-visualization">
            <div className="turbine-viz-header">
                <h2 className="card-title">Live Wind Turbine</h2>
                <p className="card-subtitle">Real-time visualization based on live sensor data</p>
            </div>

            <div className="turbine-viz-content">
                {/* Main SVG turbine */}
                <div className="turbine-svg-container">
                    {/* Wind particles — speed driven by windSpeed */}
                    <div className="wind-particles-layer">
                        {windParticleDuration > 0 && (
                            <>
                                <div
                                    className={`wind-streak wind-streak-1 intensity-${windIntensity}`}
                                    style={{ animationDuration: `${windParticleDuration}s` }}
                                />
                                <div
                                    className={`wind-streak wind-streak-2 intensity-${windIntensity}`}
                                    style={{ animationDuration: `${windParticleDuration * 1.2}s` }}
                                />
                                <div
                                    className={`wind-streak wind-streak-3 intensity-${windIntensity}`}
                                    style={{ animationDuration: `${windParticleDuration * 0.9}s` }}
                                />
                                <div
                                    className={`wind-streak wind-streak-4 intensity-${windIntensity}`}
                                    style={{ animationDuration: `${windParticleDuration * 1.4}s` }}
                                />
                                <div
                                    className={`wind-streak wind-streak-5 intensity-${windIntensity}`}
                                    style={{ animationDuration: `${windParticleDuration * 1.1}s` }}
                                />
                            </>
                        )}
                    </div>

                    <svg
                        className="turbine-svg"
                        viewBox="0 0 300 400"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Tower */}
                        <polygon
                            points="140,180 160,180 155,380 145,380"
                            fill="url(#towerGradient)"
                            stroke="rgba(148,163,184,0.3)"
                            strokeWidth="0.5"
                        />

                        {/* Nacelle (hub housing) */}
                        <rect
                            x="128" y="155" width="44" height="28" rx="4"
                            fill="url(#nacelleGradient)"
                            stroke="rgba(148,163,184,0.3)"
                            strokeWidth="0.5"
                        />

                        {/* Hub center */}
                        <circle
                            cx="150" cy="168" r="8"
                            fill="#1e293b"
                            stroke="rgba(148,163,184,0.5)"
                            strokeWidth="1"
                        />

                        {/* Generator power glow — intensity driven by actual power */}
                        <circle
                            cx="150" cy="168" r="12"
                            fill="none"
                            stroke="var(--color-power)"
                            strokeWidth="2"
                            opacity={powerGlow}
                            className="power-glow-ring"
                        />
                        <circle
                            cx="150" cy="168" r="18"
                            fill="none"
                            stroke="var(--color-power)"
                            strokeWidth="1"
                            opacity={powerGlow * 0.4}
                        />

                        {/* Blades — rotation driven by windSpeed, pitch by pitchAngle */}
                        <g
                            className="turbine-blades"
                            style={{
                                transformOrigin: '150px 168px',
                                animationDuration: rotationDuration > 0 ? `${rotationDuration}s` : '0s',
                                animationPlayState: rotationDuration > 0 ? 'running' : 'paused',
                            }}
                        >
                            {/* Blade 1 */}
                            <g style={{
                                transformOrigin: '150px 168px',
                                transform: `rotate(0deg)`,
                            }}>
                                <path
                                    d={`M150,168 L${148 - pitchAngle * 0.15},40 Q150,30 ${152 + pitchAngle * 0.15},40 L150,168`}
                                    fill="url(#bladeGradient)"
                                    stroke="rgba(148,163,184,0.4)"
                                    strokeWidth="0.5"
                                    style={{
                                        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                    }}
                                />
                            </g>
                            {/* Blade 2 */}
                            <g style={{
                                transformOrigin: '150px 168px',
                                transform: `rotate(120deg)`,
                            }}>
                                <path
                                    d={`M150,168 L${148 - pitchAngle * 0.15},40 Q150,30 ${152 + pitchAngle * 0.15},40 L150,168`}
                                    fill="url(#bladeGradient)"
                                    stroke="rgba(148,163,184,0.4)"
                                    strokeWidth="0.5"
                                    style={{
                                        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                    }}
                                />
                            </g>
                            {/* Blade 3 */}
                            <g style={{
                                transformOrigin: '150px 168px',
                                transform: `rotate(240deg)`,
                            }}>
                                <path
                                    d={`M150,168 L${148 - pitchAngle * 0.15},40 Q150,30 ${152 + pitchAngle * 0.15},40 L150,168`}
                                    fill="url(#bladeGradient)"
                                    stroke="rgba(148,163,184,0.4)"
                                    strokeWidth="0.5"
                                    style={{
                                        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                    }}
                                />
                            </g>
                        </g>

                        {/* Hub center dot (on top of blades) */}
                        <circle cx="150" cy="168" r="5" fill="#334155" stroke="#475569" strokeWidth="1"/>

                        {/* Foundation */}
                        <rect x="130" y="375" width="40" height="8" rx="2" fill="#1e293b" stroke="rgba(148,163,184,0.2)" strokeWidth="0.5"/>

                        {/* Gradients */}
                        <defs>
                            <linearGradient id="towerGradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#334155" />
                                <stop offset="50%" stopColor="#475569" />
                                <stop offset="100%" stopColor="#334155" />
                            </linearGradient>
                            <linearGradient id="nacelleGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#475569" />
                                <stop offset="100%" stopColor="#334155" />
                            </linearGradient>
                            <linearGradient id="bladeGradient" x1="0" y1="1" x2="0" y2="0">
                                <stop offset="0%" stopColor="#475569" />
                                <stop offset="40%" stopColor="#64748b" />
                                <stop offset="100%" stopColor="#94a3b8" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                {/* Right-side data panel — all values from real telemetry */}
                <div className="turbine-data-panel">
                    <div className="turbine-data-item">
                        <span className="turbine-data-label">Current Wind</span>
                        <span className="turbine-data-value" style={{ color: 'var(--color-wind)' }}>
                            {windSpeed > 0 ? windSpeed.toFixed(1) : '—'}
                            <small> m/s</small>
                        </span>
                    </div>
                    <div className="turbine-data-item">
                        <span className="turbine-data-label">Pitch Angle</span>
                        <span className="turbine-data-value" style={{ color: 'var(--color-pitch)' }}>
                            {pitchAngle}
                            <small>°</small>
                        </span>
                    </div>
                    <div className="turbine-data-item">
                        <span className="turbine-data-label">Generated Power</span>
                        <span className="turbine-data-value" style={{ color: 'var(--color-power)' }}>
                            {power > 0 ? power.toFixed(2) : '—'}
                            <small> W</small>
                        </span>
                    </div>
                    <div className="turbine-data-item">
                        <span className="turbine-data-label">Experiment</span>
                        <span className="turbine-data-value turbine-data-exp">
                            {experimentId}
                        </span>
                    </div>

                    {/* Stepper Position indicator */}
                    <div className="turbine-stepper-section">
                        <div className="turbine-data-label">Stepper Position</div>
                        <div className="stepper-bar-wrap">
                            <div
                                className="stepper-bar-fill"
                                style={{ width: `${stepperPercent}%` }}
                            />
                        </div>
                        <div className="stepper-bar-labels">
                            <span>{stepperPosition} steps</span>
                            <span className="stepper-pitch-link">{pitchAngle}° pitch</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(TurbineVisualization);
