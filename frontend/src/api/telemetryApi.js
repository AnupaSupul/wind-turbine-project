import { apiGet } from './config';

export const fetchLatest = (signal) => apiGet('/api/telemetry/latest', signal);

export const fetchHistory = (filters = {}, signal) => {
    const params = new URLSearchParams();
    if (filters.limit) params.set('limit', filters.limit);
    if (filters.page) params.set('page', filters.page);
    if (filters.experimentId) params.set('experimentId', filters.experimentId);
    if (filters.source) params.set('source', filters.source);
    const qs = params.toString();
    return apiGet(`/api/telemetry/history${qs ? '?' + qs : ''}`, signal);
};

export const fetchHealth = (signal) => apiGet('/api/health', signal);
