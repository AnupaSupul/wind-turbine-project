import { apiGet } from './config';

export const fetchSummary = (filters = {}, signal) => {
    const params = new URLSearchParams();
    if (filters.experimentId) params.set('experimentId', filters.experimentId);
    const qs = params.toString();
    return apiGet(`/api/analytics/summary${qs ? '?' + qs : ''}`, signal);
};

export const fetchPowerAnalytics = (filters = {}, signal) => {
    const params = new URLSearchParams();
    if (filters.experimentId) params.set('experimentId', filters.experimentId);
    const qs = params.toString();
    return apiGet(`/api/analytics/power${qs ? '?' + qs : ''}`, signal);
};
