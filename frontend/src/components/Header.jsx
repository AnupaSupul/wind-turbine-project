import './Header.css';

export default function Header({ isConnected, lastUpdate, source }) {
    const sourceLabel = source === 'esp32' ? 'REAL HARDWARE' : 'SIMULATOR';
    const sourceClass = source === 'esp32' ? 'source-hardware' : 'source-simulator';

    return (
        <header className="header">
            <div className="header-left">
                <h1 className="header-title">Wind Turbine IoT Monitoring</h1>
                <p className="header-subtitle">Real-Time Wind Turbine Performance Monitoring</p>
            </div>
            <div className="header-right">
                <div className={`source-badge ${sourceClass}`}>
                    {sourceLabel}
                </div>
                <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
                    <span className="status-dot" />
                    {isConnected ? 'Backend Connected' : 'Backend Offline'}
                </div>
                {lastUpdate && (
                    <div className="last-update">
                        Last update: {lastUpdate.toLocaleTimeString()}
                    </div>
                )}
            </div>
        </header>
    );
}
