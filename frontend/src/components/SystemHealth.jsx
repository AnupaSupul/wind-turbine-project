import { useState, useEffect, useRef, memo } from 'react';
import { fetchHealth } from '../api/telemetryApi';
import './SystemHealth.css';

/**
 * System Health panel — shows real connection/telemetry status.
 *
 * IMPORTANT distinctions:
 * - "Backend API" = can we reach the API? (from isConnected prop)
 * - "Telemetry Receiving" = is fresh telemetry actually arriving? (from isTelemetryFresh prop)
 *   These are SEPARATE states. API may be reachable but telemetry stale (simulator stopped).
 * - "Frontend Session" = time since dashboard polling started. This is NOT system uptime.
 *   The backend does not provide real system uptime, so we don't claim it.
 * - "Database" = from GET /api/health response.
 */
function SystemHealth({ isConnected, isTelemetryFresh, latest, sessionStart }) {
    const [healthData, setHealthData] = useState(null);
    const [dbStatus, setDbStatus] = useState('unknown');
    const [sessionTime, setSessionTime] = useState('0m 0s');
    const sessionTimerRef = useRef(null);

    // Fetch health endpoint periodically (every 10 seconds, not 200ms)
    useEffect(() => {
        let cancelled = false;

        const checkHealth = async () => {
            try {
                const res = await fetchHealth();
                if (!cancelled) {
                    setHealthData(res);
                    // If health endpoint responds successfully, backend + DB are reachable
                    setDbStatus(res.success ? 'connected' : 'error');
                }
            } catch {
                if (!cancelled) {
                    setDbStatus('disconnected');
                }
            }
        };

        checkHealth();
        const interval = setInterval(checkHealth, 10000);

        return () => {
            cancelled = true;
            clearInterval(interval);
        };
    }, []);

    // Frontend session timer — updates every second
    useEffect(() => {
        const updateSessionTime = () => {
            if (!sessionStart) return;
            const diff = Math.floor((Date.now() - sessionStart.getTime()) / 1000);
            const hours = Math.floor(diff / 3600);
            const minutes = Math.floor((diff % 3600) / 60);
            const seconds = diff % 60;

            if (hours > 0) {
                setSessionTime(`${hours}h ${minutes}m ${seconds}s`);
            } else {
                setSessionTime(`${minutes}m ${seconds}s`);
            }
        };

        updateSessionTime();
        sessionTimerRef.current = setInterval(updateSessionTime, 1000);

        return () => {
            clearInterval(sessionTimerRef.current);
        };
    }, [sessionStart]);

    const source = latest?.source || '—';
    const sourceLabel = source === 'esp32' ? 'ESP32 Hardware' : source === 'simulator' ? 'Simulator' : '—';

    // Determine telemetry status text
    let telemetryStatus, telemetryClass;
    if (!isConnected) {
        telemetryStatus = 'No Connection';
        telemetryClass = 'status-error';
    } else if (!latest) {
        telemetryStatus = 'No Data';
        telemetryClass = 'status-warning';
    } else if (isTelemetryFresh) {
        telemetryStatus = 'Receiving';
        telemetryClass = 'status-ok';
    } else {
        telemetryStatus = 'Stale';
        telemetryClass = 'status-warning';
    }

    return (
        <div className="system-health card" id="system-health">
            <h2 className="card-title">System Status</h2>
            <p className="card-subtitle">Real-time connection and system health</p>

            <div className="health-grid">
                {/* Backend API */}
                <div className="health-item">
                    <div className="health-item-header">
                        <svg className="health-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
                            <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
                            <line x1="6" y1="6" x2="6.01" y2="6"/>
                            <line x1="6" y1="18" x2="6.01" y2="18"/>
                        </svg>
                        <span className="health-label">Backend API</span>
                    </div>
                    <div className={`health-status ${isConnected ? 'status-ok' : 'status-error'}`}>
                        <span className="health-dot" />
                        {isConnected ? 'Healthy' : 'Disconnected'}
                    </div>
                </div>

                {/* Database */}
                <div className="health-item">
                    <div className="health-item-header">
                        <svg className="health-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <ellipse cx="12" cy="5" rx="9" ry="3"/>
                            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                        </svg>
                        <span className="health-label">Database (MongoDB Atlas)</span>
                    </div>
                    <div className={`health-status ${dbStatus === 'connected' ? 'status-ok' : dbStatus === 'disconnected' ? 'status-error' : 'status-unknown'}`}>
                        <span className="health-dot" />
                        {dbStatus === 'connected' ? 'Connected' : dbStatus === 'disconnected' ? 'Disconnected' : 'Checking...'}
                    </div>
                </div>

                {/* Telemetry Receiving */}
                <div className="health-item">
                    <div className="health-item-header">
                        <svg className="health-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                        </svg>
                        <span className="health-label">Telemetry</span>
                    </div>
                    <div className={`health-status ${telemetryClass}`}>
                        <span className="health-dot" />
                        {telemetryStatus}
                    </div>
                </div>

                {/* Update Interval */}
                <div className="health-item">
                    <div className="health-item-header">
                        <svg className="health-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                        </svg>
                        <span className="health-label">Poll Interval</span>
                    </div>
                    <div className="health-value">200ms</div>
                </div>

                {/* Data Source */}
                <div className="health-item">
                    <div className="health-item-header">
                        <svg className="health-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                        </svg>
                        <span className="health-label">Data Source</span>
                    </div>
                    <div className={`health-source ${source}`}>
                        {sourceLabel}
                    </div>
                </div>

                {/* Frontend Session — NOT system uptime */}
                <div className="health-item">
                    <div className="health-item-header">
                        <svg className="health-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                            <line x1="8" y1="21" x2="16" y2="21"/>
                            <line x1="12" y1="17" x2="12" y2="21"/>
                        </svg>
                        <span className="health-label">Frontend Session</span>
                    </div>
                    <div className="health-value">{sessionTime}</div>
                </div>
            </div>
        </div>
    );
}

export default memo(SystemHealth);
