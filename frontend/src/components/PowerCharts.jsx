import { useState, useEffect } from 'react';
import {
    BarChart, Bar, ScatterChart, Scatter,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { fetchPowerAnalytics } from '../api/analyticsApi';
import './PowerCharts.css';

const PITCH_COLORS = ['#3b82f6', '#f59e0b', '#22c55e', '#ef4444', '#a855f7', '#ec4899'];

export default function PowerCharts({ experimentId }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        const load = async () => {
            setLoading(true);
            try {
                const filters = {};
                if (experimentId) filters.experimentId = experimentId;
                const res = await fetchPowerAnalytics(filters);
                if (!cancelled && res.success) setData(res.data);
            } catch { /* silently handle */ }
            if (!cancelled) setLoading(false);
        };
        load();
        return () => { cancelled = true; };
    }, [experimentId]);

    if (loading) return <div className="card"><p className="loading-text">Loading analytics...</p></div>;
    if (!data) return <div className="card"><p className="loading-text">No analytics data</p></div>;

    return (
        <div className="power-charts">
            {/* Power vs Wind Speed */}
            <div className="card">
                <h2 className="card-title">Power vs Wind Speed</h2>
                <p className="chart-desc">Average power output grouped by wind speed</p>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data.powerByWindSpeed}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                        <XAxis
                            dataKey="windSpeed"
                            tick={{ fontSize: 11, fill: '#94a3b8' }}
                            label={{ value: 'Wind Speed (m/s)', position: 'insideBottom', offset: -5, fill: '#94a3b8', fontSize: 12 }}
                        />
                        <YAxis
                            tick={{ fontSize: 11, fill: '#94a3b8' }}
                            label={{ value: 'Power (W)', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 12 }}
                        />
                        <Tooltip
                            contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 6 }}
                            formatter={(val, name) => {
                                const labels = { avgPower: 'Avg Power', minPower: 'Min', maxPower: 'Max' };
                                return [`${val} W`, labels[name] || name];
                            }}
                            labelFormatter={(v) => `Wind: ${v} m/s`}
                        />
                        <Bar dataKey="avgPower" fill="#3b82f6" radius={[4, 4, 0, 0]} name="avgPower" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Power vs Pitch Angle */}
            <div className="card">
                <h2 className="card-title">Power vs Pitch Angle</h2>
                <p className="chart-desc">Average power at each pitch angle (with avg wind speed context)</p>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data.powerByPitchAngle}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                        <XAxis
                            dataKey="pitchAngle"
                            tick={{ fontSize: 11, fill: '#94a3b8' }}
                            label={{ value: 'Pitch Angle (°)', position: 'insideBottom', offset: -5, fill: '#94a3b8', fontSize: 12 }}
                        />
                        <YAxis
                            tick={{ fontSize: 11, fill: '#94a3b8' }}
                            label={{ value: 'Power (W)', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 12 }}
                        />
                        <Tooltip
                            contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 6 }}
                            formatter={(val, name) => {
                                if (name === 'avgPower') return [`${val} W`, 'Avg Power'];
                                if (name === 'avgWindSpeed') return [`${val} m/s`, 'Avg Wind'];
                                return [val, name];
                            }}
                            labelFormatter={(v) => `Pitch: ${v}°`}
                        />
                        <Bar dataKey="avgPower" name="avgPower" radius={[4, 4, 0, 0]}>
                            {(data.powerByPitchAngle || []).map((entry, i) => (
                                <Cell key={i} fill={PITCH_COLORS[i % PITCH_COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
                <p className="chart-note">
                    ⚠️ Different pitch angles were tested under different wind conditions.
                    Direct power comparison may not reflect pitch effectiveness alone.
                </p>
            </div>
        </div>
    );
}
