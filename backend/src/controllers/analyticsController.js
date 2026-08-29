const analyticsService = require('../services/analyticsService');

/**
 * GET /api/analytics/summary
 * Return summary statistics for all telemetry data.
 */
const getSummary = async (req, res) => {
    try {
        const summary = await analyticsService.getSummary(req.query);

        if (!summary) {
            return res.status(404).json({
                success: false,
                message: 'No telemetry data available for analytics',
            });
        }

        res.status(200).json({
            success: true,
            data: summary,
        });
    } catch (error) {
        console.error('Error fetching analytics summary:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch analytics summary',
        });
    }
};

/**
 * GET /api/analytics/power
 * Return power analytics data for charting.
 */
const getPowerAnalytics = async (req, res) => {
    try {
        const analytics = await analyticsService.getPowerAnalytics(req.query);

        res.status(200).json({
            success: true,
            data: analytics,
        });
    } catch (error) {
        console.error('Error fetching power analytics:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch power analytics',
        });
    }
};

module.exports = { getSummary, getPowerAnalytics };
