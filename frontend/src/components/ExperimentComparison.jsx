import { useState, useEffect } from 'react';
import { fetchPowerAnalytics } from '../api/analyticsApi';
import './ExperimentComparison.css';

export default function ExperimentComparison({ onExperimentChange }) {
    const [experiments, setExperiments] = useState([]);
    const [selected, setSelected] = useState('');

    useEffect(() => {
        let cancelled = false;
        const load = async () => {
            try {
                const res = await fetchPowerAnalytics();
                if (!cancelled && res.success) {
                    setExperiments(res.data.experiments || []);
                }
            } catch { /* silently handle */ }
        };
        load();
        return () => { cancelled = true; };
    }, []);

    const handleChange = (e) => {
        const val = e.target.value;
        setSelected(val);
        onExperimentChange(val);
    };

    return (
        <div className="experiment-comparison card">
            <div className="experiment-header">
                <h2 className="card-title">Experiments</h2>
                <select className="experiment-select" value={selected} onChange={handleChange}>
                    <option value="">All Experiments</option>
                    {experiments.map(exp => (
                        <option key={exp.experimentId} value={exp.experimentId}>
                            {exp.experimentId} — Pitch {exp.pitchAngle}°
                        </option>
                    ))}
                </select>
            </div>
            <div className="experiment-cards">
                {experiments.map(exp => (
                    <div
                        key={exp.experimentId}
                        className={`experiment-card ${selected === exp.experimentId ? 'selected' : ''}`}
                        onClick={() => { setSelected(exp.experimentId); onExperimentChange(exp.experimentId); }}
                    >
                        <div className="exp-id">{exp.experimentId}</div>
                        <div className="exp-details">
                            <span>Pitch: <strong>{exp.pitchAngle}°</strong></span>
                            <span>Avg Wind: <strong>{exp.avgWindSpeed} m/s</strong></span>
                            <span>Avg Power: <strong>{exp.avgPower} W</strong></span>
                            <span>Records: <strong>{exp.count}</strong></span>
                            <span className={`exp-source ${exp.source}`}>{exp.source}</span>
                        </div>
                    </div>
                ))}
            </div>
            {selected && (
                <button className="clear-filter-btn" onClick={() => { setSelected(''); onExperimentChange(''); }}>
                    Clear Filter
                </button>
            )}
        </div>
    );
}
