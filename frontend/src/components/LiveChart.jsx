import { useState } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import './LiveChart.css';

const METRICS = [
    { key: 'windSpeed', label: 'Wind Speed', unit: 'm/s', color: '#3b82f6' },
    { key: 'power', label: 'Power', unit: 'W', color: '#f59e0b' },
    { key: 'voltage', label: 'Voltage', unit: 'V', color: '#22c55e' },
    { key: 'current', label: 'Current', unit: 'A', color: '#a855f7' },
    { key: 'pitchAngle', label: 'Pitch Angle', unit: '°', color: '#ef4444' },
];

export default function LiveChart({ data }) {
    const [activeMetric, setActiveMetric] = useState('power');
    const metric = METRICS.find(m => m.key === activeMetric);

    return (
        <div className="live-chart-container card">
            <div className="chart-header">
                <h2 className="card-title">Live Trend</h2>
                <div className="metric-selector">
                    {METRICS.map(m => (
                        <button
                            key={m.key}
                            className={`selector-btn ${activeMetric === m.key ? 'active' : ''}`}
                            onClick={() => setActiveMetric(m.key)}
                            style={activeMetric === m.key ? { borderColor: m.color, color: m.color } : {}}
                        >
                            {m.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="chart-body">
                <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                        <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#94a3b8' }} interval="preserveStartEnd" />
                        <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} width={50} />
                        <Tooltip
                            contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 6 }}
                            labelStyle={{ color: '#94a3b8' }}
                            formatter={(val) => [`${Number(val).toFixed(2)} ${metric.unit}`, metric.label]}
                        />
                        <Line
                            type="monotone"
                            dataKey={activeMetric}
                            stroke={metric.color}
                            strokeWidth={2}
                            dot={false}
                            isAnimationActive={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
