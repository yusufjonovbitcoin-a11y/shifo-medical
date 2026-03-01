import { NextResponse } from 'next/server';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

export async function GET() {
  try {
    // Google Analytics Property ID - O'zingiznikini qo'ying
    // Google Analytics > Admin > Property Settings'dan topiladi
    const propertyId = 'G-S432B8C471';
    
    // Check if credentials are available
    if (!process.env.GOOGLE_ANALYTICS_CREDENTIALS) {
      // Return simulated data if no credentials
      const simulatedVisitors = Math.floor(Math.random() * 5000) + 1000;
      return NextResponse.json({
        success: true,
        data: {
          currentMonthVisitors: simulatedVisitors,
          month: new Date().toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long' }),
          lastUpdated: new Date().toISOString(),
          isSimulated: true
        }
      });
    }

    // Initialize the Analytics Data API client
    const analyticsDataClient = new BetaAnalyticsDataClient({
      credentials: JSON.parse(process.env.GOOGLE_ANALYTICS_CREDENTIALS)
    });

    // Get first and last day of current month
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const today = new Date();
    
    const startDate = firstDay.toISOString().split('T')[0];
    const endDate = today.toISOString().split('T')[0];

    // Run the report
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: startDate,
          endDate: endDate,
        },
      ],
      metrics: [
        {
          name: 'activeUsers',
        },
      ],
    });

    // Extract visitor count
    const visitors = response.rows?.[0]?.metricValues?.[0]?.value || '0';
    
    return NextResponse.json({
      success: true,
      data: {
        currentMonthVisitors: parseInt(visitors),
        month: new Date().toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long' }),
        lastUpdated: new Date().toISOString(),
        isSimulated: false
      }
    });
    
  } catch (error) {
    console.error('Analytics error:', error);
    
    // Fallback to simulated data on error
    const simulatedVisitors = Math.floor(Math.random() * 5000) + 1000;
    return NextResponse.json({
      success: true,
      data: {
        currentMonthVisitors: simulatedVisitors,
        month: new Date().toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long' }),
        lastUpdated: new Date().toISOString(),
        isSimulated: true,
        error: 'Analytics API not configured'
      }
    });
  }
}
