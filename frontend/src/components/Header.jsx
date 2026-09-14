import { memo } from 'react';
import './Header.css';

function Header({ isConnected, lastUpdate, source, isTelemetryFresh }) {
    const sourceLabel = source === 'esp32' ? 'ESP32' : 'SIMULATOR';
    const sourceClass = source === 'esp32' ? 'source-hardware' : 'source-simulator';

    const formatDateTime = (date) => {
        if (!date) return '—';
        return date.toLocaleString('en-US', {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            hour12: false,
        });
    };

    return (
        <header className="header" id="main-header">
            <div className="header-left">
                <div className="header-logo">
                    <svg className="header-logo-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16" cy="16" r="3" fill="currentColor" opacity="0.9"/>
                        <path d="M16 13 L15 2 Q16 0 17 2 L16 13Z" fill="currentColor" opacity="0.8"/>
                        <path d="M16 13 L15 2 Q16 0 17 2 L16 13Z" fill="currentColor" opacity="0.8" transform="rotate(120 16 16)"/>
                        <path d="M16 13 L15 2 Q16 0 17 2 L16 13Z" fill="currentColor" opacity="0.8" transform="rotate(240 16 16)"/>
                        <line x1="16" y1="19" x2="16" y2="32" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
                    </svg>
                </div>
                <div>
                    <h1 className="header-title">Wind Turbine Monitoring System</h1>
                    <p className="header-subtitle">Live Telemetry • Pitch Control • Real-time Analytics</p>
                </div>
            </div>
            <div className="header-right">
                <div className={`source-badge ${sourceClass}`}>
                    {sourceLabel}
                </div>
                <div className="header-status-group">
                    <div className={`connection-indicator ${isConnected ? 'connected' : 'disconnected'}`}>
                        <span className="status-dot" />
                        <span className="status-text">
                            {isConnected ? 'Backend Connected' : 'Backend Offline'}
                        </span>
                    </div>
                    {isConnected && (
                        <div className={`telemetry-indicator ${isTelemetryFresh ? 'fresh' : 'stale'}`}>
                            <span className="status-dot" />
                            <span className="status-text">
                                {isTelemetryFresh ? 'Telemetry Live' : 'Telemetry Stale'}
                            </span>
                        </div>
                    )}
                </div>
                <div className="header-datetime">
                    {formatDateTime(lastUpdate)}
                </div>
            </div>
        </header>
    );
}

export default memo(Header);
