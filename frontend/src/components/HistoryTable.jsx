import { useState, useEffect } from 'react';
import { fetchHistory } from '../api/telemetryApi';
import './HistoryTable.css';

const PAGE_SIZE = 20;

export default function HistoryTable({ experimentId }) {
    const [rows, setRows] = useState([]);
    const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 0 });
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setPage(1); // reset page on filter change
    }, [experimentId]);

    useEffect(() => {
        let cancelled = false;
        const load = async () => {
            setLoading(true);
            try {
                const filters = { limit: PAGE_SIZE, page };
                if (experimentId) filters.experimentId = experimentId;
                const res = await fetchHistory(filters);
                if (!cancelled && res.success) {
                    setRows(res.data);
                    setPagination(res.pagination);
                }
            } catch { /* silently handle */ }
            if (!cancelled) setLoading(false);
        };
        load();
        return () => { cancelled = true; };
    }, [page, experimentId]);

    const formatTime = (ts) => {
        const d = new Date(ts);
        return d.toLocaleString();
    };

    return (
        <div className="history-table card">
            <div className="table-header">
                <h2 className="card-title">Historical Data</h2>
                <span className="table-count">{pagination.total} records</span>
            </div>

            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Timestamp</th>
                            <th>Experiment</th>
                            <th>Wind (m/s)</th>
                            <th>Pitch (°)</th>
                            <th>Voltage (V)</th>
                            <th>Current (A)</th>
                            <th>Power (W)</th>
                            <th>Source</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="8" className="table-loading">Loading...</td></tr>
                        ) : rows.length === 0 ? (
                            <tr><td colSpan="8" className="table-loading">No records found</td></tr>
                        ) : (
                            rows.map(row => (
                                <tr key={row._id}>
                                    <td className="cell-time">{formatTime(row.timestamp)}</td>
                                    <td>{row.experimentId}</td>
                                    <td>{Number(row.windSpeed).toFixed(2)}</td>
                                    <td>{Number(row.pitchAngle).toFixed(1)}</td>
                                    <td>{Number(row.voltage).toFixed(2)}</td>
                                    <td>{Number(row.current).toFixed(2)}</td>
                                    <td className="cell-power">{Number(row.power).toFixed(2)}</td>
                                    <td>
                                        <span className={`source-tag ${row.source}`}>{row.source}</span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {pagination.pages > 1 && (
                <div className="table-pagination">
                    <button
                        disabled={page <= 1}
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                    >
                        ← Previous
                    </button>
                    <span className="page-info">Page {page} of {pagination.pages}</span>
                    <button
                        disabled={page >= pagination.pages}
                        onClick={() => setPage(p => p + 1)}
                    >
                        Next →
                    </button>
                </div>
            )}
        </div>
    );
}
