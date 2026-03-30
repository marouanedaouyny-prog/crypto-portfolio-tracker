"use client";

import { useEffect, useState } from "react";
import { fetchPortfolioData } from "../lib/crypto-api";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from "recharts";
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownRight, RefreshCw, Activity } from "lucide-react";

export default function CryptoPortfolio() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const refreshData = () => {
    setLoading(true);
    fetchPortfolioData().then(d => {
      setData(d);
      setLoading(false);
    });
  };

  useEffect(() => {
    refreshData();
  }, []);

  if (!data) return <div className="p-20 text-center text-gray-400">Loading wallet data...</div>;

  return (
    <main className="min-h-screen bg-[#0F172A] text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-500/20"><Wallet size={24}/></div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">CryptoAssets Pro</h1>
              <p className="text-gray-400 text-sm font-medium">Real-time portfolio & market performance tracking.</p>
            </div>
          </div>
          <button 
            onClick={refreshData}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition text-sm font-semibold border border-white/10"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''}/>
            Refresh Prices
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Stats */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-800 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition duration-500"><TrendingUp size={120}/></div>
              <div className="relative z-10 space-y-2">
                <span className="text-sm font-medium opacity-80 uppercase tracking-widest">Total Net Worth</span>
                <h2 className="text-5xl font-extrabold tracking-tight">${data.totalBalance.toLocaleString()}</h2>
                <div className="flex items-center gap-2 text-green-300 font-bold mt-4 bg-green-900/30 w-fit px-3 py-1 rounded-full text-xs">
                  <ArrowUpRight size={14}/>
                  +${data.totalProfit.toLocaleString()} ({data.profitPercentage}%)
                </div>
              </div>
            </div>

            {/* Performance Chart */}
            <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2"><Activity size={20} className="text-blue-500"/> Portfolio Performance</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.performanceData}>
                    <defs>
                      <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                    <YAxis domain={['auto', 'auto']} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <Tooltip contentStyle={{background: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff'}} />
                    <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Assets Table */}
            <div className="bg-white/5 rounded-[2rem] border border-white/10 overflow-hidden">
               <div className="p-6 border-b border-white/10 font-bold text-gray-400 uppercase tracking-widest text-xs">Your Holdings</div>
               <div className="divide-y divide-white/10">
                  {data.assets.map((asset: any) => (
                    <div key={asset.id} className="p-6 flex items-center justify-between hover:bg-white/5 transition">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs" style={{backgroundColor: asset.color + '20', color: asset.color}}>{asset.symbol}</div>
                        <div>
                          <p className="font-bold">{asset.name}</p>
                          <span className="text-xs text-gray-500 font-medium">{asset.balance} {asset.symbol}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${asset.value.toLocaleString()}</p>
                        <div className={`flex items-center gap-1 text-xs font-bold justify-end ${asset.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {asset.change24h >= 0 ? <ArrowUpRight size={12}/> : <ArrowDownRight size={12}/>}
                          {asset.change24h}%
                        </div>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* Asset Allocation */}
          <div className="space-y-8">
            <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10">
              <h3 className="text-xl font-bold mb-6">Asset Allocation</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={data.assets} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={8} dataKey="value">
                      {data.assets.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4 mt-4">
                {data.assets.map((asset: any) => (
                  <div key={asset.id} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{backgroundColor: asset.color}}></div>
                      <span className="text-gray-400">{asset.name}</span>
                    </div>
                    <span className="font-bold">{((asset.value / data.totalBalance) * 100).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 p-6 rounded-[2rem] border border-green-500/20">
               <h4 className="font-bold text-green-400 mb-2 flex items-center gap-2"><TrendingUp size={16}/> Market Insights</h4>
               <p className="text-xs text-gray-400 leading-relaxed">
                 The market is currently showing strong bullish momentum in the Solana ecosystem. Bitcoin maintains stability above critical support levels.
               </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
