import './MetricCards.css';

const metrics = [
    { key: 'windSpeed', label: 'Wind Speed', unit: 'm/s', decimals: 2, icon: '🌬️' },
    { key: 'pitchAngle', label: 'Pitch Angle', unit: '°', decimals: 1, icon: '📐' },
    { key: 'voltage', label: 'Voltage', unit: 'V', decimals: 2, icon: '⚡' },
    { key: 'current', label: 'Current', unit: 'A', decimals: 2, icon: '🔌' },
    { key: 'power', label: 'Power', unit: 'W', decimals: 2, icon: '💡' },
    { key: 'stepperPosition', label: 'Stepper Position', unit: 'steps', decimals: 0, icon: '⚙️' },
];

export default function MetricCards({ data }) {
    return (
        <div className="metric-cards">
            {metrics.map(m => {
                const value = data ? data[m.key] : null;
                const display = value != null ? Number(value).toFixed(m.decimals) : '—';

                return (
                    <div key={m.key} className={`metric-card ${m.key === 'power' ? 'highlight' : ''}`}>
                        <div className="metric-icon">{m.icon}</div>
                        <div className="metric-label">{m.label}</div>
                        <div className="metric-value">
                            {display}
                            <span className="metric-unit"> {m.unit}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
