# Crypto Portfolio Tracker

A professional crypto tracking application that provides real-time updates on asset performance and total portfolio value.

![Crypto Portfolio Tracker Demo](./demo.png)

## ✨ Features

- **Portfolio Overview:** Track your total net worth and profit/loss in real-time
- **Performance Charts:** Visualize portfolio growth with interactive area charts
- **Asset Allocation:** Understand your portfolio distribution with interactive pie charts
- **Market Insights:** Real-time feedback on market trends and price changes
- **24h Change Tracking:** Monitor price changes for each asset
- **TypeScript Support:** Full type safety with interfaces and error handling
- **Modern UI:** Built with Next.js 14, Tailwind CSS, and Recharts

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Navigate to the project directory:
   ```bash
   cd crypto-portfolio-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📊 Features Breakdown

### Dashboard Components

- **Total Balance Card:** Displays current portfolio value with profit/loss
- **Performance Chart:** 24-hour portfolio value visualization
- **Asset List:** Individual asset performance with 24h change percentage
- **Allocation Pie Chart:** Portfolio distribution by asset

### Mock Data Integration

This project demonstrates a production-ready UI with mock data integration. The `lib/crypto-api.ts` file simulates API responses and can be easily replaced with real API calls to:

- CoinGecko API
- CoinMarketCap API
- Binance API
- Custom backend

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development with interfaces
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Modern icon library
- **Recharts** - Data visualization library

### Data Layer
- **Mock API** - Simulated crypto data with realistic variations
- **TypeScript Interfaces** - Full type safety for PortfolioData and ApiError

## 📁 Project Structure

```
crypto-portfolio-tracker/
├── app/                 # Next.js App Router pages
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Main dashboard page
│   └── globals.css     # Global styles
├── components/         # Reusable React components
│   ├── PortfolioCard.tsx
│   ├── PerformanceChart.tsx
│   ├── AssetList.tsx
│   └── AllocationChart.tsx
├── lib/                # Utility functions and types
│   ├── crypto-api.ts   # Mock API with error handling
│   └── utils.ts        # Helper functions
├── LICENSE
└── README.md
```

## 🔌 API Integration Guide

To connect to a real crypto API:

1. **Replace `fetchPortfolioData` in `lib/crypto-api.ts`:**

```typescript
export const fetchPortfolioData = async (): Promise<PortfolioData> => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/...');
    if (!response.ok) throw new Error('Failed to fetch data');
    const data = await response.json();
    // Transform API response to match PortfolioData interface
    return transformData(data);
  } catch (error) {
    console.error('Failed to fetch portfolio data:', error);
    throw {
      message: 'Failed to load portfolio data. Please try again.',
      status: 500
    } as ApiError;
  }
};
```

2. **Add your API key to `.env.local`:**
```
COINGECKO_API_KEY=your_api_key
```

## 🔒 Code Quality Features

- **TypeScript Interfaces:** Full type safety for all data structures
- **Error Handling:** Try-catch blocks with meaningful error messages
- **Type Guards:** Proper error type discrimination
- **Console Logging:** Debug-friendly error logging

## 🎯 Use Cases

- **Crypto Investors:** Track personal portfolio performance
- **Traders:** Monitor multiple assets in one dashboard
- **DeFi Enthusiasts:** Visualize yield farming positions
- **Portfolio Managers:** Client portfolio reporting
- **Educational:** Learn crypto API integration patterns

## 🔄 Future Enhancements

- Real-time API integration (CoinGecko, CoinMarketCap)
- User authentication and portfolio persistence
- Multiple portfolio support
- Price alerts and notifications
- Historical performance analysis
- Export to CSV/PDF reports
- Mobile responsive improvements
- Dark mode toggle

## 🤝 Contributing

This is a portfolio project. Feel free to fork and customize for your needs.

## 📄 License

MIT License - See [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- UI components from [Lucide Icons](https://lucide.dev/)
- Charts powered by [Recharts](https://recharts.org/)
- Data visualization inspired by leading crypto trackers
