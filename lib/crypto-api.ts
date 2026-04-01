export interface PortfolioData {
  totalBalance: number;
  totalProfit: number;
  profitPercentage: number;
  lastUpdate: string;
  assets: Array<{
    id: string;
    name: string;
    symbol: string;
    price: number;
    balance: number;
    value: number;
    change24h: number;
    color: string;
  }>;
  performanceData: Array<{ time: string; value: number }>;
}

export interface ApiError {
  message: string;
  status?: number;
}

export const fetchPortfolioData = async (): Promise<PortfolioData> => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Base mock data
    const baseBalance = 45280.50;
    const variation = (Math.random() - 0.5) * 500; // Small random variation for simulation

    return {
      totalBalance: baseBalance + variation,
      totalProfit: 1240.20 + (variation / 2),
      profitPercentage: 2.8,
      lastUpdate: new Date().toISOString(),
      assets: [
        { id: 'btc', name: 'Bitcoin', symbol: 'BTC', price: 65420.00, balance: 0.45, value: 29439.00 + (variation * 0.6), change24h: 1.2, color: '#f59e0b' },
        { id: 'eth', name: 'Ethereum', symbol: 'ETH', price: 3450.50, balance: 3.2, value: 11041.60 + (variation * 0.25), change24h: -0.5, color: '#6366f1' },
        { id: 'sol', name: 'Solana', symbol: 'SOL', price: 145.20, balance: 33.0, value: 4791.60 + (variation * 0.15), change24h: 5.4, color: '#10b981' },
      ],
      performanceData: [
        { time: '00:00', value: 44100 },
        { time: '04:00', value: 44300 },
        { time: '08:00', value: 44200 },
        { time: '12:00', value: 44800 },
        { time: '16:00', value: 45100 },
        { time: '20:00', value: 45280 + variation },
      ]
    };
  } catch (error) {
    console.error('Failed to fetch portfolio data:', error);
    throw {
      message: 'Failed to load portfolio data. Please try again.',
      status: 500
    } as ApiError;
  }
};
