import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  BrainCircuit, 
  BarChart3, 
  Rocket, 
  ShieldAlert, 
  Settings, 
  Search, 
  Bell, 
  ChevronRight,
  TrendingUp,
  ArrowUpRight,
  AlertTriangle,
  ExternalLink,
  Sparkles,
  Loader2,
  ShieldCheck,
  Send,
  ArrowDownRight,
  Clock,
  CreditCard,
  Cpu,
  Zap,
  Activity,
  Shield,
  User,
  Key,
  Globe,
  ToggleRight,
  Sun,
  Moon
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area,
  ComposedChart
} from 'recharts';

// --- Gemini API Configuration ---
const apiKey = "";
const GEMINI_MODEL = "gemini-2.5-flash-preview-09-2025";

const fetchGemini = async (prompt, systemInstruction = "") => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
  
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: systemInstruction ? { parts: [{ text: systemInstruction }] } : undefined
  };

  const maxRetries = 5;
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      const delay = Math.pow(2, i) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

// --- Theme Constants ---
const COLORS = {
  gold: '#D4AF37',
  goldLight: '#F1D592',
  bullish: '#4ade80',
  bearish: '#f87171'
};

const portfolioData = [
  { name: 'Technology', value: 35 },
  { name: 'Crypto', value: 25 },
  { name: 'Commodities', value: 15 },
  { name: 'Bits', value: 15 },
  { name: 'Cryptic', value: 15 },
  { name: 'Compuities', value: 15 },
  { name: 'Others', value: 15 },
];

const quantData = [
  { time: 'Jan', price: 190000 },
  { time: 'Feb', price: 210000 },
  { time: 'Mar', price: 280000 },
  { time: 'Apr', price: 240000 },
  { time: 'May', price: 310000 },
  { time: 'Jun', price: 330000 },
];

const portfolioHistory = [
  { date: 'Mon', value: 125000 },
  { date: 'Tue', value: 128000 },
  { date: 'Wed', value: 124000 },
  { date: 'Thu', value: 132000 },
  { date: 'Fri', value: 139000 },
  { date: 'Sat', value: 142000 },
  { date: 'Sun', value: 145891 },
];

const holdingsData = [
  { ticker: 'BTC', name: 'Bitcoin', amount: '1.24', value: '85,473.20', alloc: '58.6%', change: '+4.36%', up: true },
  { ticker: 'ETH', name: 'Ethereum', amount: '14.5', value: '50,346.90', alloc: '34.5%', change: '+2.25%', up: true },
  { ticker: 'SOL', name: 'Solana', amount: '45.2', value: '6,543.12', alloc: '4.5%', change: '-1.20%', up: false },
  { ticker: 'LINK', name: 'Chainlink', amount: '185.0', value: '3,528.65', alloc: '2.4%', change: '+5.40%', up: true },
];

const transactionsData = [
  { type: 'Buy', asset: 'ETH', amount: '+2.5', date: 'Today, 14:30', status: 'Completed' },
  { type: 'Sell', asset: 'SOL', amount: '-15.0', date: 'Yesterday, 09:15', status: 'Completed' },
  { type: 'Buy', asset: 'BTC', amount: '+0.1', date: 'March 12', status: 'Completed' },
];

const aiSignals = [
  { asset: 'BTC/USDT', signal: 'Strong Buy', confidence: '94%', time: '10 mins ago', icon: TrendingUp, color: 'text-green-500 dark:text-green-400' },
  { asset: 'ETH/USDT', signal: 'Buy', confidence: '82%', time: '1 hour ago', icon: TrendingUp, color: 'text-green-500 dark:text-green-400' },
  { asset: 'SOL/USDT', signal: 'Hold', confidence: '56%', time: '3 hours ago', icon: Activity, color: 'text-yellow-500 dark:text-yellow-400' },
  { asset: 'ADA/USDT', signal: 'Sell', confidence: '71%', time: '5 hours ago', icon: ArrowDownRight, color: 'text-red-500 dark:text-red-400' },
];

const activeBots = [
  { name: 'Alpha-Grid v2', pair: 'BTC/USDT', profit: '+14.2%', status: 'Active', trades: 142 },
  { name: 'Mean Reversion', pair: 'ETH/USDT', profit: '+8.7%', status: 'Active', trades: 89 },
  { name: 'Trend Follower', pair: 'SOL/USDT', profit: '-1.2%', status: 'Paused', trades: 12 },
];

const venturesList = [
  { title: "Quantum Computing", stage: "Series A", desc: "Breakthroughs in quantum error correction and qubit scaling.", raised: "$12M" },
  { title: "DeFi Aggregator", stage: "Seed", desc: "Cross-chain liquidity optimization utilizing ZK-rollups.", raised: "$2.5M" },
  { title: "Neuro-Link", stage: "Series B", desc: "Non-invasive BCI interfaces for the mass consumer market.", raised: "$45M" },
  { title: "Carbon Ledger", stage: "Pre-Seed", desc: "Decentralized ESG tracking built on a green blockchain.", raised: "$500K" },
  { title: "Space Mining AI", stage: "Series C", desc: "Autonomous AI for rare-earth metal extraction on asteroids.", raised: "$120M" },
  { title: "Geno-Biotech", stage: "Seed", desc: "Generative AI models for molecular drug discovery.", raised: "$4M" },
];

const recentAudits = [
  { name: "MetaVerse Token", risk: "CRITICAL", score: "12/100", issue: "Honeypot contract detected, locked liquidity." },
  { name: "DeFi Yield Farm", risk: "HIGH", score: "45/100", issue: "Missing multisig wallet, un-audited core code." },
  { name: "Layer 2 Bridge", risk: "LOW", score: "92/100", issue: "Minor compiler warnings, considered safe." },
];

// --- Sub-Components ---

const SidebarItem = ({ icon: Icon, label, active = false, onClick }) => (
  <div onClick={onClick} className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-300 group
    ${active ? 'text-slate-900 dark:text-white border-l-4 border-[#D4AF37] bg-gradient-to-r from-[#D4AF37]/20 to-transparent' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'}`}>
    <Icon size={20} className={active ? 'text-[#D4AF37]' : 'group-hover:text-[#D4AF37]'} />
    <span className="text-sm font-medium tracking-wide">{label}</span>
  </div>
);

const Card = ({ title, tag, children, className = "", headerAction }) => (
  <div className={`relative overflow-hidden bg-white/90 dark:bg-[#141A26]/80 border border-slate-200 dark:border-white/10 rounded-xl backdrop-blur-md shadow-xl dark:shadow-2xl transition-colors duration-300 ${className}`}>
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-widest flex items-center gap-2">
            <div className="w-1 h-1 bg-[#D4AF37] rounded-full" />
            {title}
          </h3>
          {tag && (
            <span className="text-[10px] px-2 py-0.5 rounded border border-[#D4AF37]/50 text-[#D4AF37] font-bold">
              {tag}
            </span>
          )}
        </div>
        {headerAction || (
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-slate-300 dark:bg-slate-600 rounded-full" />
            <div className="w-1 h-1 bg-slate-300 dark:bg-slate-600 rounded-full" />
            <div className="w-1 h-1 bg-slate-300 dark:bg-slate-600 rounded-full" />
          </div>
        )}
      </div>
      {children}
    </div>
  </div>
);

const WatchlistRow = ({ ticker, price, up, change, target }) => (
  <tr className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
    <td className="py-3 px-2 text-xs font-bold text-slate-800 dark:text-slate-200">{ticker}</td>
    <td className="py-3 px-2 text-xs text-slate-600 dark:text-slate-300 font-mono">${price}</td>
    <td className="py-3 px-2 text-xs text-slate-600 dark:text-slate-300 font-mono">${(parseFloat(price) * 1.5).toFixed(2)}</td>
    <td className="py-3 px-2">
      <div className="w-16 h-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={[{v:1}, {v:3}, {v:2}, {v:5}, {v:4}, {v:7}]}>
            <Line type="monotone" dataKey="v" stroke={up ? "#4ade80" : "#f87171"} strokeWidth={1} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </td>
    <td className={`py-3 px-2 text-xs font-bold ${up ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>{change}</td>
    <td className="py-3 px-2 text-xs text-green-500 dark:text-green-400 font-bold">{target}</td>
  </tr>
);

// --- Main App Component ---

export default function App() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('Settings'); // Default to Settings so you can see the toggle right away
  const [theme, setTheme] = useState('dark'); // Theme state

  // AI Analyst State
  const [analystInput, setAnalystInput] = useState("");
  const [analystOutput, setAnalystOutput] = useState("Awaiting your market query...");
  const [isAnalystLoading, setIsAnalystLoading] = useState(false);

  // Risk Auditor State
  const [auditInput, setAuditInput] = useState("");
  const [auditOutput, setAuditOutput] = useState(null);
  const [isAuditLoading, setIsAuditLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAnalystRequest = async () => {
    if (!analystInput.trim()) return;
    setIsAnalystLoading(true);
    setAnalystOutput("");
    
    const systemPrompt = "You are the Alpha Forge Intelligence Analyst. Provide a concise, professional investment outlook in English (max 3 sentences) for the ticker or market trend provided. Focus on sentiment, potential catalysts, and strategic positioning.";
    
    try {
      const result = await fetchGemini(analystInput, systemPrompt);
      setAnalystOutput(result);
    } catch (err) {
      setAnalystOutput("Analyst temporarily unavailable. Check API status.");
    } finally {
      setIsAnalystLoading(false);
    }
  };

  const handleAuditRequest = async () => {
    if (!auditInput.trim()) return;
    setIsAuditLoading(true);
    
    const systemPrompt = "You are the Alpha Forge Scam Detector. Analyze the following project description for red flags. Provide a short text summary in English with: Risk Level (Critical/High/Low), Primary Red Flag, and a Recommendation. Keep it brief and structured.";
    
    try {
      const result = await fetchGemini(`Audit this project: ${auditInput}`, systemPrompt);
      setAuditOutput(result);
    } catch (err) {
      setAuditOutput("Audit system failure.");
    } finally {
      setIsAuditLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className={`${theme} min-h-screen font-sans selection:bg-[#D4AF37]/30 transition-colors duration-300`}>
      <div className="bg-slate-50 dark:bg-[#0A0E17] text-slate-600 dark:text-slate-300 min-h-screen flex relative">
        
        {/* Dynamic Background */}
        <div className={`fixed inset-0 pointer-events-none bg-[url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-bottom transition-opacity duration-500 ${theme === 'dark' ? 'opacity-20 mix-blend-overlay' : 'opacity-[0.03] mix-blend-multiply'}`} />
        
        {/* Sidebar */}
        <aside className="w-64 border-r border-slate-200 dark:border-white/10 flex flex-col z-10 bg-white/90 dark:bg-[#0A0E17]/90 backdrop-blur-xl shrink-0 h-screen sticky top-0 transition-colors duration-300">
          <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[#D4AF37] to-[#8B732A] rounded-lg shadow-lg shadow-[#D4AF37]/20 shrink-0">
               <span className="text-black font-black text-2xl italic">A</span>
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tighter text-slate-900 dark:text-white leading-tight">ALPHA FORGE</h1>
              <p className="text-[8px] text-[#D4AF37] tracking-[0.2em] font-bold uppercase">Intelligence Hub</p>
            </div>
          </div>

          <nav className="mt-4 flex-1 overflow-y-auto overflow-x-hidden">
            <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => setActiveTab('Dashboard')} />
            <SidebarItem icon={Wallet} label="Portfolio View" active={activeTab === 'Portfolio View'} onClick={() => setActiveTab('Portfolio View')} />
            <SidebarItem icon={BrainCircuit} label="AI Tools" active={activeTab === 'AI Tools'} onClick={() => setActiveTab('AI Tools')} />
            <SidebarItem icon={BarChart3} label="Quant Analysis" active={activeTab === 'Quant Analysis'} onClick={() => setActiveTab('Quant Analysis')} />
            <SidebarItem icon={Rocket} label="Ventures" active={activeTab === 'Ventures'} onClick={() => setActiveTab('Ventures')} />
            <SidebarItem icon={ShieldAlert} label="Scam Check" active={activeTab === 'Scam Check'} onClick={() => setActiveTab('Scam Check')} />
            <div className="mt-8 px-4 py-2 text-[10px] text-slate-400 dark:text-slate-500 font-bold tracking-widest uppercase">System</div>
            <SidebarItem icon={Settings} label="Settings" active={activeTab === 'Settings'} onClick={() => setActiveTab('Settings')} />
          </nav>

          <div className="p-4 border-t border-slate-200 dark:border-white/5 shrink-0 transition-colors duration-300">
            <div className="p-3 bg-slate-100 dark:bg-white/5 rounded-lg flex items-center justify-between">
              <span className="text-[10px] text-slate-500 uppercase font-bold">API Gateway</span>
              <div className="flex items-center gap-1">
                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                 <span className="text-[10px] text-green-600 dark:text-green-500 font-bold">Active</span>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 flex flex-col z-10 min-h-screen">
          <header className="h-20 border-b border-slate-200 dark:border-white/10 px-8 flex items-center justify-between bg-white/50 dark:bg-[#0A0E17]/50 backdrop-blur-md sticky top-0 z-20 shrink-0 transition-colors duration-300">
            <div className="flex items-center gap-6">
               <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                  <input 
                    type="text" 
                    placeholder="Search assets, projects..." 
                    className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#D4AF37]/50 w-80 text-slate-900 dark:text-white transition-colors"
                  />
               </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer transition-colors">
                <Bell size={20} />
                <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#0A0E17]" />
              </div>
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-white/10 transition-colors">
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Alex Forge</p>
                  <p className="text-[10px] text-[#D4AF37]">Diamond Tier</p>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-[#D4AF37] overflow-hidden bg-slate-200 dark:bg-slate-800">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="User" />
                </div>
              </div>
            </div>
          </header>

          <div className="p-8 grid grid-cols-12 gap-6 max-w-[1600px] mx-auto w-full flex-1 content-start">
            
            {/* ============================== DASHBOARD ============================== */}
            {activeTab === 'Dashboard' && (
              <>
                <Card title="Portfolio Overview" tag="LIVE" className="col-span-12 lg:col-span-7">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1">
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Total Assets</p>
                      <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-1">$1,45,891.87</h2>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1 text-green-500 dark:text-green-400 text-xs font-bold">
                          <TrendingUp size={14} />
                          <span>+$3,990 (+12.86%)</span>
                        </div>
                      </div>
                      <div className="mt-6 pt-6 border-t border-slate-200 dark:border-white/5 transition-colors">
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">24H Alpha</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold text-slate-900 dark:text-white">+$1,764</span>
                          <span className="text-green-500 dark:text-green-400 text-[10px] font-bold">Real-time</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 flex justify-center relative">
                      <div className="w-48 h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie data={portfolioData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                              {portfolioData.map((_, idx) => <Cell key={idx} fill={idx === 0 ? COLORS.gold : (theme === 'dark' ? '#1e293b' : '#e2e8f0')} />)}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="ml-4 space-y-1">
                        {portfolioData.slice(0, 5).map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between gap-4 w-32">
                            <span className="text-[9px] text-slate-500 dark:text-slate-400 truncate">{item.name}</span>
                            <span className="text-[9px] font-bold text-slate-700 dark:text-slate-200">{item.value}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                <Card title="AI Analyst" tag="GEMINI" className="col-span-12 lg:col-span-5">
                  <div className="flex flex-col h-full gap-4">
                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-white/5 p-2 rounded-lg border border-slate-200 dark:border-white/10 transition-colors">
                      <Sparkles size={14} className="text-[#D4AF37]" />
                      <input 
                        value={analystInput}
                        onChange={(e) => setAnalystInput(e.target.value)}
                        placeholder="Ask about BTC, NVDA or trends..."
                        className="bg-transparent border-none text-[10px] flex-1 focus:outline-none text-slate-900 dark:text-white"
                        onKeyDown={(e) => e.key === 'Enter' && handleAnalystRequest()}
                      />
                      <button onClick={handleAnalystRequest} disabled={isAnalystLoading} className="p-1 text-slate-400 hover:text-[#D4AF37] transition-colors">
                        {isAnalystLoading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                      </button>
                    </div>

                    <div className="flex-1 min-h-[100px] p-3 bg-[#D4AF37]/5 rounded-lg border border-[#D4AF37]/20 relative">
                      {isAnalystLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/60 dark:bg-[#0A0E17]/60 backdrop-blur-[2px] rounded-lg z-10 transition-colors">
                          <div className="flex flex-col items-center gap-2">
                             <Loader2 className="animate-spin text-[#D4AF37]" size={20} />
                             <span className="text-[10px] text-[#D4AF37] font-bold animate-pulse">✨ Analyzing market...</span>
                          </div>
                        </div>
                      )}
                      <p className="text-[10px] leading-relaxed text-slate-700 dark:text-slate-300 italic">{analystOutput}</p>
                    </div>
                  </div>
                </Card>

                <Card title="Global Markets" tag="REAL-TIME" className="col-span-12">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-white/10 text-[10px] text-slate-500 uppercase font-bold tracking-widest transition-colors">
                          <th className="pb-3 px-2">Asset</th>
                          <th className="pb-3 px-2">Price</th>
                          <th className="pb-3 px-2">Projection</th>
                          <th className="pb-3 px-2">Trend</th>
                          <th className="pb-3 px-2">Change</th>
                          <th className="pb-3 px-2">Conviction</th>
                        </tr>
                      </thead>
                      <tbody>
                        <WatchlistRow ticker="BTC" price="68,930.00" target="+12.23%" change="4.36%" up />
                        <WatchlistRow ticker="ETH" price="3,472.20" target="+8.59%" change="2.25%" up />
                        <WatchlistRow ticker="NVDA" price="913.70" target="+15.98%" change="1.36%" up />
                      </tbody>
                    </table>
                  </div>
                </Card>
              </>
            )}

            {/* ============================== PORTFOLIO VIEW ============================== */}
            {activeTab === 'Portfolio View' && (
              <>
                <Card title="Portfolio Balance" tag="ALL ASSETS" className="col-span-12">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-1/3">
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Current Value</p>
                      <h2 className="text-4xl font-black text-slate-900 dark:text-white mt-2">$145,891.87</h2>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="flex items-center gap-1 bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-1 rounded text-xs font-bold border border-green-200 dark:border-green-500/20">
                          <TrendingUp size={14} /> +$3,990 (12.86%)
                        </span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase">All Time</span>
                      </div>
                      
                      <div className="mt-8 space-y-4">
                        <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-white/5 transition-colors">
                          <span className="text-xs text-slate-500 dark:text-slate-400">Profit (24h)</span>
                          <span className="text-xs font-bold text-green-500 dark:text-green-400">+$1,764.00</span>
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-white/5 transition-colors">
                          <span className="text-xs text-slate-500 dark:text-slate-400">Available Funds</span>
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">$12,450.50</span>
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-white/5 transition-colors">
                          <span className="text-xs text-slate-500 dark:text-slate-400">Algorithm ROI</span>
                          <span className="text-xs font-bold text-[#D4AF37]">84.5%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full md:w-2/3 h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={portfolioHistory}>
                          <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#ffffff05' : '#00000010'} />
                          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748b'}} />
                          <YAxis hide domain={['dataMin - 5000', 'dataMax + 5000']} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff', border: theme === 'dark' ? '1px solid #334155' : '1px solid #e2e8f0', borderRadius: '8px' }}
                            itemStyle={{ fontSize: '12px', color: '#D4AF37', fontWeight: 'bold' }}
                            labelStyle={{ fontSize: '10px', color: theme === 'dark' ? '#94a3b8' : '#64748b' }}
                          />
                          <Area type="monotone" dataKey="value" stroke="#D4AF37" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </Card>

                <Card title="Your Assets" tag="HOLDINGS" className="col-span-12 lg:col-span-8">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-white/10 text-[10px] text-slate-500 uppercase font-bold tracking-widest transition-colors">
                          <th className="pb-3 px-2">Asset</th>
                          <th className="pb-3 px-2">Balance</th>
                          <th className="pb-3 px-2">Value (USD)</th>
                          <th className="pb-3 px-2">Allocation</th>
                          <th className="pb-3 px-2">24h Change</th>
                        </tr>
                      </thead>
                      <tbody>
                        {holdingsData.map((asset, idx) => (
                          <tr key={idx} className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                            <td className="py-4 px-2">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-white/10 flex items-center justify-center text-xs font-black text-[#D4AF37]">
                                  {asset.ticker[0]}
                                </div>
                                <div>
                                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{asset.ticker}</p>
                                  <p className="text-[10px] text-slate-500">{asset.name}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-2 text-xs text-slate-600 dark:text-slate-300 font-mono">{asset.amount}</td>
                            <td className="py-4 px-2 text-xs text-slate-800 dark:text-slate-200 font-mono font-bold">${asset.value}</td>
                            <td className="py-4 px-2">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-500 dark:text-slate-400">{asset.alloc}</span>
                                <div className="w-16 h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                  <div className="h-full bg-[#D4AF37]" style={{ width: asset.alloc }} />
                                </div>
                              </div>
                            </td>
                            <td className={`py-4 px-2 text-xs font-bold flex items-center gap-1 ${asset.up ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                              {asset.up ? <TrendingUp size={12} /> : <ArrowDownRight size={12} />}
                              {asset.change}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>

                <Card title="Recent Transactions" tag="HISTORY" className="col-span-12 lg:col-span-4">
                  <div className="space-y-4">
                    {transactionsData.map((tx, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-white/5 rounded-lg border border-slate-100 dark:border-white/5 hover:border-slate-200 dark:hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded flex items-center justify-center ${tx.type === 'Buy' ? 'bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400'}`}>
                            {tx.type === 'Buy' ? <ArrowDownRight size={16} className="rotate-180" /> : <ArrowUpRight size={16} />}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                              {tx.type === 'Buy' ? 'Buy' : 'Sell'} <span className="text-[#D4AF37]">{tx.asset}</span>
                            </p>
                            <p className="text-[9px] text-slate-500 flex items-center gap-1 mt-0.5">
                              <Clock size={10} /> {tx.date}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-xs font-mono font-bold ${tx.type === 'Buy' ? 'text-green-500 dark:text-green-400' : 'text-slate-800 dark:text-slate-200'}`}>
                            {tx.amount} {tx.asset}
                          </p>
                          <p className="text-[9px] text-slate-500 mt-0.5">{tx.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </>
            )}

            {/* ============================== AI TOOLS ============================== */}
            {activeTab === 'AI Tools' && (
              <>
                <Card title="Alpha Intelligence Terminal" tag="GEMINI PRO" className="col-span-12 lg:col-span-8">
                  <div className="flex flex-col h-[400px]">
                     <div className="flex-1 overflow-y-auto mb-4 p-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-lg transition-colors">
                        <div className="flex gap-4 mb-4 opacity-70 dark:opacity-50">
                           <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center shrink-0">
                             <User size={14} className="text-slate-500 dark:text-slate-400" />
                           </div>
                           <div className="bg-slate-200 dark:bg-slate-800/50 p-3 rounded-lg rounded-tl-none border border-slate-300 dark:border-white/5 text-xs text-slate-700 dark:text-slate-300">
                             What does the AI think about macroeconomics next week?
                           </div>
                        </div>
                        <div className="flex gap-4">
                           <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 dark:bg-[#D4AF37]/20 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                             <Sparkles size={14} className="text-[#D4AF37]" />
                           </div>
                           <div className="bg-[#D4AF37]/5 dark:bg-[#D4AF37]/10 p-4 rounded-lg rounded-tl-none border border-[#D4AF37]/20 text-xs text-slate-800 dark:text-slate-200 leading-relaxed shadow-[0_0_15px_rgba(212,175,55,0.05)] dark:shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                             {analystOutput}
                           </div>
                        </div>
                     </div>
                     <div className="flex items-center gap-2 bg-slate-50 dark:bg-white/5 p-3 rounded-lg border border-slate-200 dark:border-white/10 shrink-0 transition-colors">
                        <input 
                          value={analystInput}
                          onChange={(e) => setAnalystInput(e.target.value)}
                          placeholder="Enter a prompt or asset ticker (e.g. AAPL)..."
                          className="bg-transparent border-none text-xs flex-1 focus:outline-none text-slate-900 dark:text-white px-2"
                          onKeyDown={(e) => e.key === 'Enter' && handleAnalystRequest()}
                        />
                        <button 
                          onClick={handleAnalystRequest}
                          disabled={isAnalystLoading}
                          className="bg-[#D4AF37]/10 dark:bg-[#D4AF37]/20 hover:bg-[#D4AF37]/20 dark:hover:bg-[#D4AF37]/40 text-[#D4AF37] px-4 py-2 rounded font-bold text-xs flex items-center gap-2 transition-all"
                        >
                          {isAnalystLoading ? <Loader2 size={14} className="animate-spin" /> : <><Sparkles size={14} /> Analyze</>}
                        </button>
                     </div>
                  </div>
                </Card>
                
                <Card title="Neural Network Signals" tag="LIVE" className="col-span-12 lg:col-span-4">
                   <div className="space-y-4">
                      {aiSignals.map((signal, idx) => {
                        const Icon = signal.icon;
                        return (
                          <div key={idx} className="p-3 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:border-[#D4AF37]/30 dark:hover:border-[#D4AF37]/30 transition-all rounded-lg flex items-center justify-between">
                             <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded bg-slate-200 dark:bg-slate-800 flex items-center justify-center ${signal.color}`}>
                                  <Icon size={16} />
                                </div>
                                <div>
                                  <p className="text-xs font-bold text-slate-900 dark:text-white">{signal.asset}</p>
                                  <p className="text-[9px] text-slate-500">{signal.time}</p>
                                </div>
                             </div>
                             <div className="text-right">
                                <p className={`text-xs font-bold ${signal.color}`}>{signal.signal}</p>
                                <p className="text-[9px] text-slate-500 dark:text-slate-400">Accuracy: {signal.confidence}</p>
                             </div>
                          </div>
                        )
                      })}
                   </div>
                </Card>
              </>
            )}

            {/* ============================== QUANT ANALYSIS ============================== */}
            {activeTab === 'Quant Analysis' && (
              <>
                <Card title="Quant Lab Modeling" tag="ALGO-V3" className="col-span-12 lg:col-span-8">
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={quantData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#ffffff05' : '#00000010'} />
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748b'}} />
                        <YAxis hide domain={['auto', 'auto']} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff', border: 'none', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} 
                          itemStyle={{ color: '#D4AF37' }} 
                        />
                        <Area type="monotone" dataKey="price" fill="url(#colorPrice2)" stroke="#D4AF37" strokeWidth={3} />
                        <defs>
                          <linearGradient id="colorPrice2" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-200 dark:border-white/5 transition-colors">
                     <div>
                       <p className="text-[10px] text-slate-500 uppercase font-bold">Sharpe Ratio</p>
                       <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">2.45</p>
                     </div>
                     <div>
                       <p className="text-[10px] text-slate-500 uppercase font-bold">Max Drawdown</p>
                       <p className="text-xl font-bold text-red-500 dark:text-red-400 mt-1">-8.4%</p>
                     </div>
                     <div>
                       <p className="text-[10px] text-slate-500 uppercase font-bold">Win Rate</p>
                       <p className="text-xl font-bold text-green-500 dark:text-green-400 mt-1">68.2%</p>
                     </div>
                     <div>
                       <p className="text-[10px] text-slate-500 uppercase font-bold">Alpha Score</p>
                       <p className="text-xl font-bold text-[#D4AF37] mt-1">92/100</p>
                     </div>
                  </div>
                </Card>

                <Card title="Active Bots" tag="EXECUTION" className="col-span-12 lg:col-span-4">
                  <div className="space-y-4">
                    {activeBots.map((bot, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 dark:bg-white/5 rounded-lg border border-slate-100 dark:border-white/5 relative overflow-hidden group transition-colors">
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${bot.status === 'Active' ? 'bg-green-500' : 'bg-slate-400 dark:bg-slate-500'}`} />
                        <div className="flex justify-between items-start pl-2">
                          <div>
                             <h4 className="text-xs font-bold text-slate-900 dark:text-white">{bot.name}</h4>
                             <p className="text-[10px] text-slate-500 mt-0.5">{bot.pair} • {bot.trades} trades</p>
                          </div>
                          <div className="text-right">
                             <p className={`text-xs font-bold ${bot.profit.startsWith('+') ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>{bot.profit}</p>
                             <p className="text-[9px] text-slate-500 dark:text-slate-400 mt-0.5">{bot.status}</p>
                          </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/5 flex gap-2 pl-2 transition-colors">
                          <button className="flex-1 py-1.5 bg-slate-200 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 text-xs text-slate-800 dark:text-white rounded transition-colors">Settings</button>
                          <button className="flex-1 py-1.5 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold rounded transition-colors">Logs</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </>
            )}

            {/* ============================== VENTURES ============================== */}
            {activeTab === 'Ventures' && (
              <div className="col-span-12">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-3">
                    <Rocket className="text-[#D4AF37]" /> Exclusive Ventures (Early Stage)
                  </h3>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-slate-200 dark:bg-white/10 text-xs font-bold rounded-full text-slate-900 dark:text-white cursor-pointer border border-slate-300 dark:border-white/20">All</span>
                    <span className="px-3 py-1 bg-transparent hover:bg-slate-200 dark:hover:bg-white/5 text-xs text-slate-600 dark:text-slate-400 rounded-full cursor-pointer">Seed</span>
                    <span className="px-3 py-1 bg-transparent hover:bg-slate-200 dark:hover:bg-white/5 text-xs text-slate-600 dark:text-slate-400 rounded-full cursor-pointer">Series A</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {venturesList.map((v, idx) => (
                    <Card key={idx} title={v.title} tag={v.stage}>
                      <div className="h-24">
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{v.desc}</p>
                      </div>
                      <div className="flex justify-between items-end border-t border-slate-200 dark:border-white/5 pt-4 transition-colors">
                        <div>
                           <p className="text-[9px] text-slate-500 uppercase font-bold">Funds Raised</p>
                           <p className="text-sm font-bold text-slate-900 dark:text-white">{v.raised}</p>
                        </div>
                        <button className="text-xs font-bold text-[#D4AF37] flex items-center gap-1 hover:underline">
                          Pitch Deck <ChevronRight size={14} />
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* ============================== SCAM CHECK ============================== */}
            {activeTab === 'Scam Check' && (
              <>
                <Card title="Smart Contract Auditor" tag="SECURITY" className="col-span-12 lg:col-span-7">
                  <div className="flex flex-col gap-4 h-full">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Paste a contract address, whitepaper link, or project description for instant vulnerability analysis.</p>
                    
                    <textarea 
                      value={auditInput}
                      onChange={(e) => setAuditInput(e.target.value)}
                      placeholder="0x..."
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg p-4 text-xs focus:outline-none focus:border-red-500/50 min-h-[120px] resize-none text-slate-900 dark:text-white font-mono flex-1 transition-colors"
                    />
                    <button 
                      onClick={handleAuditRequest}
                      disabled={isAuditLoading}
                      className="w-full py-3 rounded-lg bg-red-100 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-xs font-black text-red-600 dark:text-red-500 uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-200 dark:hover:bg-red-500/20 transition-all group"
                    >
                      {isAuditLoading ? <Loader2 className="animate-spin" size={16} /> : <><ShieldAlert size={16} className="group-hover:scale-110 transition-transform" /> Run Deep Analysis</>}
                    </button>

                    {auditOutput && (
                      <div className="p-4 mt-4 bg-red-50 dark:bg-red-500/5 border border-red-200 dark:border-red-500/20 rounded-lg flex items-start gap-3 animate-in fade-in zoom-in duration-300">
                        <AlertTriangle className="text-red-500 shrink-0 mt-1" size={20} />
                        <div>
                          <h4 className="text-xs font-black text-red-600 dark:text-red-500 uppercase mb-2">Threat Report</h4>
                          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-mono whitespace-pre-wrap">
                            {auditOutput}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>

                <Card title="Recent Scans" tag="HISTORY" className="col-span-12 lg:col-span-5">
                   <div className="space-y-4">
                     {recentAudits.map((audit, idx) => (
                       <div key={idx} className="p-3 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-lg flex items-start gap-3 transition-colors">
                          <div className={`w-2 h-full rounded-full shrink-0 ${audit.risk === 'CRITICAL' ? 'bg-red-500' : audit.risk === 'HIGH' ? 'bg-orange-500' : 'bg-green-500'}`} />
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                               <h4 className="text-xs font-bold text-slate-900 dark:text-white">{audit.name}</h4>
                               <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${audit.risk === 'CRITICAL' ? 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-500' : audit.risk === 'HIGH' ? 'bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-500' : 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-500'}`}>
                                  {audit.risk}
                               </span>
                            </div>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-2">Security Score: <strong className="text-slate-900 dark:text-white">{audit.score}</strong></p>
                            <p className="text-[10px] text-slate-600 dark:text-slate-500 mt-1 truncate">{audit.issue}</p>
                          </div>
                       </div>
                     ))}
                   </div>
                </Card>
              </>
            )}

            {/* ============================== SETTINGS ============================== */}
            {activeTab === 'Settings' && (
              <>
                <Card title="User Profile" tag="DIAMOND" className="col-span-12 lg:col-span-4">
                  <div className="flex flex-col items-center py-6">
                    <div className="w-24 h-24 rounded-full border-4 border-[#D4AF37] overflow-hidden bg-slate-200 dark:bg-slate-800 mb-4 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="User" className="w-full h-full object-cover" />
                    </div>
                    <h2 className="text-lg font-black text-slate-900 dark:text-white">Alex Forge</h2>
                    <p className="text-xs text-[#D4AF37] uppercase font-bold tracking-widest mt-1">Diamond Tier Member</p>
                    
                    <div className="w-full mt-8 space-y-3">
                      <div className="flex justify-between items-center text-xs p-3 bg-slate-100 dark:bg-white/5 rounded transition-colors">
                         <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2"><Globe size={14}/> Language</span>
                         <span className="text-slate-900 dark:text-white font-bold">English</span>
                      </div>
                      <div className="flex justify-between items-center text-xs p-3 bg-slate-100 dark:bg-white/5 rounded transition-colors">
                         <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2"><Clock size={14}/> Timezone</span>
                         <span className="text-slate-900 dark:text-white font-bold">UTC +3</span>
                      </div>
                    </div>
                  </div>
                </Card>

                <div className="col-span-12 lg:col-span-8 space-y-6">
                  <Card title="System Preferences" tag="PREFERENCES">
                    <div className="space-y-6">
                      
                      {/* --- Theme Toggle --- */}
                      <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-4 transition-colors">
                        <div>
                           <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Theme (Light / Dark)</h4>
                           <p className="text-xs text-slate-500">Toggle interface appearance</p>
                        </div>
                        <div 
                          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
                          className="flex items-center gap-1 cursor-pointer bg-slate-200 dark:bg-slate-800 p-1 rounded-full transition-colors"
                        >
                           <div className={`p-1.5 rounded-full transition-all duration-300 ${theme === 'light' ? 'bg-white shadow-sm text-[#D4AF37]' : 'text-slate-400'}`}>
                              <Sun size={16} />
                           </div>
                           <div className={`p-1.5 rounded-full transition-all duration-300 ${theme === 'dark' ? 'bg-[#141A26] shadow-sm text-[#D4AF37]' : 'text-slate-400'}`}>
                              <Moon size={16} />
                           </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-4 transition-colors">
                        <div>
                           <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Push Notifications</h4>
                           <p className="text-xs text-slate-500">Receive real-time AI signals</p>
                        </div>
                        <ToggleRight size={32} className="text-[#D4AF37] cursor-pointer" />
                      </div>
                      <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-4 transition-colors">
                        <div>
                           <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Two-Factor Authentication (2FA)</h4>
                           <p className="text-xs text-slate-500">Additional security layer for your account</p>
                        </div>
                        <ToggleRight size={32} className="text-slate-400 dark:text-slate-600 cursor-pointer rotate-180" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                           <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Auto-Trading (Quant)</h4>
                           <p className="text-xs text-slate-500">Allow algorithms to execute trades</p>
                        </div>
                        <ToggleRight size={32} className="text-[#D4AF37] cursor-pointer" />
                      </div>
                    </div>
                  </Card>

                  <Card title="API Keys" tag="INTEGRATIONS">
                    <div className="space-y-4">
                       <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Connect your exchange accounts or external AI models (e.g. Gemini) for full feature access.</p>
                       
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded bg-slate-200 dark:bg-slate-800 flex items-center justify-center shrink-0 transition-colors">
                            <Key size={18} className="text-[#D4AF37]" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">Gemini Pro API Key</p>
                            <input type="password" value="*************************" readOnly className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded px-3 py-2 text-xs text-slate-600 dark:text-slate-500 focus:outline-none transition-colors" />
                          </div>
                          <button className="bg-slate-200 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 px-4 py-2 rounded text-xs text-slate-900 dark:text-white mt-5 transition-colors">Update</button>
                       </div>
                    </div>
                  </Card>
                </div>
              </>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}