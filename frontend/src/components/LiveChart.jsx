import { useState, memo } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import './LiveChart.css';

const METRICS = [
    { key: 'windSpeed', label: 'Wind Speed', unit: 'm/s', color: '#38bdf8' },
    { key: 'power', label: 'Power', unit: 'W', color: '#f59e0b' },
    { key: 'voltage', label: 'Voltage', unit: 'V', color: '#4ade80' },
    { key: 'current', label: 'Current', unit: 'A', color: '#a78bfa' },
    { key: 'pitchAngle', label: 'Pitch Angle', unit: '°', color: '#22d3ee' },
    { key: 'stepperPosition', label: 'Stepper', unit: 'steps', color: '#f472b6' },
];

function LiveChart({ data }) {
    const [activeMetric, setActiveMetric] = useState('power');
    const [showPoints, setShowPoints] = useState(false);
    const [smoothLine, setSmoothLine] = useState(true);

    const metric = METRICS.find(m => m.key === activeMetric);

    return (
        <div className="live-chart-container card" id="live-chart">
            <div className="chart-header">
                <div>
                    <h2 className="card-title">Live Trend Chart</h2>
                    <p className="card-subtitle">
                        Real-time visualization of turbine parameters (updates every 200ms)
                    </p>
                </div>
                <div className="chart-controls-row">
                    <select
                        className="chart-metric-select"
                        value={activeMetric}
                        onChange={(e) => setActiveMetric(e.target.value)}
                    >
                        {METRICS.map(m => (
                            <option key={m.key} value={m.key}>
                                {m.label} ({m.unit})
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Metric selector pills */}
            <div className="metric-pills">
                {METRICS.map(m => (
                    <button
                        key={m.key}
                        className={`metric-pill ${activeMetric === m.key ? 'active' : ''}`}
                        onClick={() => setActiveMetric(m.key)}
                        style={activeMetric === m.key ? {
                            borderColor: m.color,
                            color: m.color,
                            background: `${m.color}12`,
                        } : {}}
                    >
                        {m.label}
                    </button>
                ))}
            </div>

            <div className="chart-body">
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                        <XAxis
                            dataKey="time"
                            tick={{ fontSize: 10, fill: '#64748b' }}
                            interval="preserveStartEnd"
                            axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
                            tickLine={{ stroke: 'rgba(255,255,255,0.06)' }}
                        />
                        <YAxis
                            tick={{ fontSize: 10, fill: '#64748b' }}
                            width={50}
                            axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
                            tickLine={{ stroke: 'rgba(255,255,255,0.06)' }}
                        />
                        <Tooltip
                            contentStyle={{
                                background: 'rgba(15, 23, 42, 0.95)',
                                border: '1px solid rgba(56, 97, 150, 0.3)',
                                borderRadius: 8,
                                backdropFilter: 'blur(8px)',
                                padding: '8px 12px',
                            }}
                            labelStyle={{ color: '#64748b', fontSize: 11 }}
                            formatter={(val) => [
                                `${Number(val).toFixed(2)} ${metric.unit}`,
                                metric.label,
                            ]}
                        />
                        <Line
                            type={smoothLine ? 'monotone' : 'linear'}
                            dataKey={activeMetric}
                            stroke={metric.color}
                            strokeWidth={2}
                            dot={showPoints ? { fill: metric.color, r: 2.5 } : false}
                            isAnimationActive={false}
                            connectNulls
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Chart options */}
            <div className="chart-options">
                <label className="chart-toggle">
                    <input
                        type="checkbox"
                        checked={showPoints}
                        onChange={(e) => setShowPoints(e.target.checked)}
                    />
                    <span className="toggle-slider" />
                    <span className="toggle-label">Show Points</span>
                </label>
                <label className="chart-toggle">
                    <input
                        type="checkbox"
                        checked={smoothLine}
                        onChange={(e) => setSmoothLine(e.target.checked)}
                    />
                    <span className="toggle-slider" />
                    <span className="toggle-label">Smooth Line</span>
                </label>
            </div>
        </div>
    );
}

export default memo(LiveChart);
