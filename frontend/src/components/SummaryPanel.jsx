import { useState, useEffect } from 'react';
import { fetchSummary } from '../api/analyticsApi';
import './SummaryPanel.css';

const STAT_GROUPS = [
    { key: 'windSpeed', label: 'Wind Speed', unit: 'm/s', icon: '🌬️' },
    { key: 'power', label: 'Power', unit: 'W', icon: '💡' },
    { key: 'voltage', label: 'Voltage', unit: 'V', icon: '⚡' },
    { key: 'current', label: 'Current', unit: 'A', icon: '🔌' },
];

export default function SummaryPanel({ experimentId }) {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        const load = async () => {
            setLoading(true);
            try {
                const filters = {};
                if (experimentId) filters.experimentId = experimentId;
                const res = await fetchSummary(filters);
                if (!cancelled && res.success) setSummary(res.data);
            } catch { /* silently handle */ }
            if (!cancelled) setLoading(false);
        };
        load();
        return () => { cancelled = true; };
    }, [experimentId]);

    if (loading) return <div className="card"><p className="loading-text">Loading summary...</p></div>;
    if (!summary) return <div className="card"><p className="loading-text">No data available</p></div>;

    return (
        <div className="summary-panel card">
            <h2 className="card-title">Summary Statistics</h2>
            <p className="summary-count">{summary.count} measurements</p>
            <div className="stat-groups">
                {STAT_GROUPS.map(group => {
                    const s = summary[group.key];
                    if (!s) return null;
                    return (
                        <div key={group.key} className="stat-group">
                            <div className="stat-group-header">
                                <span className="stat-icon">{group.icon}</span>
                                <span className="stat-group-label">{group.label}</span>
                            </div>
                            <div className="stat-row">
                                <div className="stat-item">
                                    <span className="stat-label">Avg</span>
                                    <span className="stat-value">{s.avg} <small>{group.unit}</small></span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">Min</span>
                                    <span className="stat-value">{s.min} <small>{group.unit}</small></span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">Max</span>
                                    <span className="stat-value">{s.max} <small>{group.unit}</small></span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
