import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchLatest } from '../api/telemetryApi';

const POLL_INTERVAL = 200; // ms
const MAX_CHART_POINTS = 60; // rolling window for live chart

/**
 * Custom hook for 200ms polling of /api/telemetry/latest.
 * - Prevents request overlap (skips if previous fetch still in-flight)
 * - Maintains a rolling buffer of recent data points for live charting
 * - Tracks connection status
 * - Cleans up on unmount
 */
export function usePolling() {
    const [latest, setLatest] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [lastUpdate, setLastUpdate] = useState(null);
    const inFlight = useRef(false);
    const intervalRef = useRef(null);
    const abortRef = useRef(null);

    const poll = useCallback(async () => {
        // Skip if previous request is still in-flight
        if (inFlight.current) return;
        inFlight.current = true;

        try {
            abortRef.current = new AbortController();
            const res = await fetchLatest(abortRef.current.signal);

            if (res.success && res.data) {
                setLatest(res.data);
                setIsConnected(true);
                setLastUpdate(new Date());

                // Append to rolling chart buffer
                setChartData(prev => {
                    const point = {
                        time: new Date(res.data.timestamp).toLocaleTimeString(),
                        windSpeed: res.data.windSpeed,
                        power: res.data.power,
                        voltage: res.data.voltage,
                        current: res.data.current,
                        pitchAngle: res.data.pitchAngle,
                    };
                    const next = [...prev, point];
                    return next.length > MAX_CHART_POINTS ? next.slice(-MAX_CHART_POINTS) : next;
                });
            }
        } catch (err) {
            if (err.name !== 'AbortError') {
                setIsConnected(false);
            }
        } finally {
            inFlight.current = false;
        }
    }, []);

    useEffect(() => {
        poll(); // immediate first fetch
        intervalRef.current = setInterval(poll, POLL_INTERVAL);

        return () => {
            clearInterval(intervalRef.current);
            if (abortRef.current) abortRef.current.abort();
        };
    }, [poll]);

    return { latest, chartData, isConnected, lastUpdate };
}
