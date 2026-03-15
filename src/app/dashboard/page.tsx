"use client";

import Image from "next/image";
import Link from "next/link";
import "./dashboard.css";
import { OrbitalBrand } from "@/components/orbital-brand";
import { useState, useEffect } from "react";
import { fetchGemini } from "@/lib/gemini";
import { useAuth } from "@/components/auth-provider";
import {
  Bell,
  Bot,
  BriefcaseBusiness,
  ChartColumnIncreasing,
  Gauge,
  LayoutDashboard,
  Radar,
  Search,
  Settings,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  Wallet,
  Loader2,
  Send,
  AlertTriangle,
  TrendingUp,
  Activity,
  ArrowDownRight,
  Moon,
  Sun,
  LogOut,
  BrainCircuit,
  BarChart3,
  Rocket,
  MoreHorizontal,
  LayoutGrid,
  User as UserIcon
} from "lucide-react";
import {
  PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area, Bar, ComposedChart, Legend
} from "recharts";

const navItems = [
  { label: "Dashboard", icon: LayoutGrid },
  { label: "Portfolio View", icon: Wallet },
  { label: "AI Tools", icon: BrainCircuit },
  { label: "Quant Analysis", icon: BarChart3 },
  { label: "Ventures", icon: Rocket },
  { label: "Scam Check", icon: ShieldCheck },
  { label: "Settings", icon: Settings }
];

const allocation = [
  { label: "Technology", value: 35, color: "#d2b45e" },
  { label: "Crypto", value: 25, color: "#9ca3af" },
  { label: "Commodities", value: 15, color: "#b5842e" },
  { label: "Bits", value: 15, color: "#6b7280" },
  { label: "Cryptic", value: 15, color: "#71717a" },
  { label: "Compuities", value: 15, color: "#52525b" },
  { label: "Others", value: 10, color: "#3f3f46" }
];

const candleSeries = [42, 60, 51, 78, 64, 55, 82, 71, 88, 76, 92, 96, 85, 90, 80, 75, 85, 95];
const comparisonA = [18, 46, 63, 72, 81, 91, 100];
const comparisonB = [11, 34, 54, 60, 71, 82, 90];

function buildPolyline(values: number[], width: number, height: number) {
  const step = width / (values.length - 1);
  return values
    .map((value: number, index: number) => {
      const x = index * step;
      const y = height - (value / 100) * height;
      return `${x},${y}`;
    })
    .join(" ");
}

function buildSpark(values: number[]) {
  return buildPolyline(values.map((value: number) => value * 2.5), 60, 20);
}

function getInitials(displayName: string): string {
  if (!displayName) return "U";
  const parts = displayName.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return parts[0][0]?.toUpperCase() || "U";
}

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  price: string;
  change24h: string;
  volume24h: string;
  sparkline: number[];
}

function CryptoWatchlist() {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    const fetchCryptoData = async () => {
      try {
        const ids = 'bitcoin,ethereum,solana,binancecoin,ripple';
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_vol=true&include_24hr_change=true`);
        
        if (!response.ok) {
           throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        const mapData = [
          { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
          { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
          { id: 'solana', symbol: 'SOL', name: 'Solana' },
          { id: 'binancecoin', symbol: 'BNB', name: 'Binance Coin' },
          { id: 'ripple', symbol: 'XRP', name: 'Ripple' }
        ];

        const updatedCryptos = mapData.map((item) => {
          const coin = data[item.id] || {};
          const price = coin.usd || 0;
          const vol = coin.usd_24h_vol || 0;
          const change = coin.usd_24h_change || 0;
          
          return {
            id: item.id,
            symbol: item.symbol,
            name: item.name,
            price: price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 }),
            change24h: change.toFixed(2),
            volume24h: (vol / 1000000000).toFixed(2) + 'B',
            sparkline: Array.from({ length: 10 }, () => Math.floor(Math.random() * 8) + 2)
          };
        });
        
        setCryptos(updatedCryptos);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };

    fetchCryptoData();
    interval = setInterval(fetchCryptoData, 15000); // refresh every 15s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="scr-panel">
      <div className="scr-panel-header">
        <div className="scr-panel-title">
          <Wallet size={16} /> <h2>ACTIVE WATCHLIST <span className="cat">(CRYPTO)</span></h2>
        </div>
        <div className="scr-panel-actions">
          <span className="scr-tag" style={{ background: 'rgba(74, 222, 128, 0.15)', color: '#4ade80' }}>LIVE TICKER</span>
          <button><MoreHorizontal size={14} /></button>
        </div>
      </div>
      <div className="scr-panel-body">
        <table className="scr-table">
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Asset</th>
              <th style={{ textAlign: 'right' }}>Price</th>
              <th style={{ textAlign: 'right' }}>24h Vol</th>
              <th style={{ textAlign: 'center' }}>Sparkline</th>
              <th style={{ textAlign: 'right' }}>24h Chg</th>
              <th style={{ textAlign: 'right' }}>Target</th>
            </tr>
          </thead>
          <tbody>
            {cryptos.map(crypto => {
              const isPositive = parseFloat(crypto.change24h) >= 0;
              const color = isPositive ? '#4ade80' : '#f87171';
              return (
                <tr key={crypto.id}>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 600, color: '#fff' }}>{crypto.symbol}</span>
                      <span style={{ fontSize: '10px', color: '#777' }}>{crypto.name}</span>
                    </div>
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>${crypto.price}</td>
                  <td style={{ textAlign: 'right', color: '#ccc', fontVariantNumeric: 'tabular-nums' }}>${crypto.volume24h}</td>
                  <td style={{ textAlign: 'center' }}>
                    <svg viewBox="0 0 60 20" width="60" height="20" style={{ display: 'inline-block' }}>
                      <polyline fill="none" stroke={color} strokeWidth="1" points={buildSpark(crypto.sparkline)} />
                    </svg>
                  </td>
                  <td style={{ textAlign: 'right', color: color, fontVariantNumeric: 'tabular-nums' }}>
                    {isPositive ? '+' : ''}{crypto.change24h}%
                  </td>
                  <td style={{ textAlign: 'right', color: '#d2b45e', fontVariantNumeric: 'tabular-nums' }}>
                    +5.00%
                  </td>
                </tr>
              );
            })}
            {cryptos.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '20px', color: '#777' }}>
                  <Loader2 size={24} className="lucide-spin" style={{ margin: '0 auto', display: 'block', marginBottom: '8px', animation: 'spin 1s linear infinite' }} />
                  Loading real-time quotes...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [theme, setTheme] = useState("dark");
  const [apiKey, setApiKey] = useState("");
  const [analystInput, setAnalystInput] = useState("");
  const [analystOutput, setAnalystOutput] = useState("Awaiting your market query...");
  const [isAnalystLoading, setIsAnalystLoading] = useState(false);
  const [auditInput, setAuditInput] = useState("");
  const [auditOutput, setAuditOutput] = useState<string | null>(null);
  const [isAuditLoading, setIsAuditLoading] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { user, profile, signOut } = useAuth();

  // Данные из профиля (реальные из Supabase)
  const balance = profile?.balance ?? 0;
  const yieldPercent = profile?.yield ?? 0;
  const dailyChange = profile?.daily_change ?? 0;

  // Приоритет: first_name + last_name > display_name > user metadata > "User"
  const fullNameFromProfile =
    `${profile?.first_name || ""} ${profile?.last_name || ""}`.trim();
  const displayName =
    fullNameFromProfile ||
    profile?.display_name ||
    user?.user_metadata?.full_name ||
    user?.user_metadata?.first_name ||
    "User";
  const photoUrl = profile?.photo_url || user?.user_metadata?.avatar_url || "";
  const userEmail = profile?.email || user?.email || "";

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('theme-light');
    } else {
      document.body.classList.remove('theme-light');
    }
  }, [theme]);

  const handleAnalystRequest = async () => {
    if (!analystInput.trim()) return;
    setIsAnalystLoading(true);
    setAnalystOutput("");
    const systemPrompt = "You are the Alpha Forge Intelligence Analyst. Provide a concise, professional investment outlook in English (max 3 sentences).";
    try {
      const result = await fetchGemini(analystInput, systemPrompt);
      setAnalystOutput(result || "An error occurred");
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
      setAuditOutput(result || "Audit system failure");
    } catch (err) {
      setAuditOutput("Audit system failure.");
    } finally {
      setIsAuditLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    window.location.assign("/");
  };

  return (
    <div className="scr-app">
      <aside className="scr-sidebar">
        <Link className="brand-link brand-link--sidebar scr-logo-top" href="/">
          <OrbitalBrand compact />
        </Link>
        <nav className="scr-nav">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`scr-nav-item ${activeTab === item.label ? "active" : ""}`}
              onClick={() => setActiveTab(item.label)}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* User info в сайдбаре */}
        <div className="scr-sidebar-user">
          <div className="scr-sidebar-user-info">
            {photoUrl ? (
              <Image src={photoUrl} alt={displayName} width={36} height={36} className="scr-sidebar-avatar" referrerPolicy="no-referrer" unoptimized />
            ) : (
              <div className="scr-sidebar-avatar scr-sidebar-avatar--initials">
                {getInitials(displayName)}
              </div>
            )}
            <div className="scr-sidebar-user-text">
              <span className="scr-sidebar-user-name">{displayName}</span>
              <span className="scr-sidebar-user-email">{userEmail}</span>
            </div>
          </div>
          <button className="scr-sidebar-logout" onClick={handleSignOut} title="Sign Out">
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      <div className="scr-main">
        <header className="scr-topbar">
          <div className="scr-top-center">
            <Link className="brand-link" href="/">
              <OrbitalBrand />
            </Link>
          </div>
          <div className="scr-top-right">
            <div className="scr-search">
              <Search size={14} color="rgba(255,255,255,0.4)" />
              <input type="text" placeholder="Search..." />
            </div>
            <button className="scr-bell">
              <Bell size={18} />
              <div className="scr-bell-dot">1</div>
            </button>
            <div className="scr-user-menu-wrapper">
              <button
                className="scr-avatar-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                {photoUrl ? (
                  <Image src={photoUrl} alt={displayName} width={36} height={36} className="scr-avatar-img" referrerPolicy="no-referrer" unoptimized />
                ) : (
                  <div className="scr-avatar-initials">
                    {getInitials(displayName)}
                  </div>
                )}
              </button>
              {showUserMenu && (
                <div className="scr-user-dropdown">
                  <div className="scr-user-dropdown-header">
                    {photoUrl ? (
                      <Image src={photoUrl} alt={displayName} width={40} height={40} className="scr-dropdown-avatar" referrerPolicy="no-referrer" unoptimized />
                    ) : (
                      <div className="scr-dropdown-avatar scr-dropdown-avatar--initials">
                        {getInitials(displayName)}
                      </div>
                    )}
                    <div className="scr-dropdown-info">
                      <span className="scr-dropdown-name">{displayName}</span>
                      <span className="scr-dropdown-email">{userEmail}</span>
                    </div>
                  </div>
                  <div className="scr-user-dropdown-divider" />
                  <button className="scr-user-dropdown-item" onClick={() => { setActiveTab("Settings"); setShowUserMenu(false); }}>
                    <Settings size={14} /> Settings
                  </button>
                  <button className="scr-user-dropdown-item scr-user-dropdown-item--danger" onClick={handleSignOut}>
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <section className="scr-content">
          {activeTab === "Dashboard" && (
            <div className="scr-grid">

              {/* Приветственная карточка */}
              <div className="scr-panel scr-panel--welcome">
                <div className="scr-panel-body" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
                  {photoUrl ? (
                    <Image src={photoUrl} alt={displayName} width={48} height={48} style={{ borderRadius: '50%', border: '2px solid rgba(210,180,94,0.4)' }} referrerPolicy="no-referrer" unoptimized />
                  ) : (
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid rgba(210,180,94,0.4)', background: 'rgba(210,180,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d2b45e', fontWeight: 'bold', fontSize: '18px' }}>
                      {getInitials(displayName)}
                    </div>
                  )}
                  <div>
                    <p style={{ color: '#888', fontSize: '12px', margin: 0 }}>Welcome back,</p>
                    <h2 style={{ color: '#fff', fontSize: '20px', margin: '2px 0 0', fontWeight: 600 }}>{displayName}</h2>
                    <p style={{ color: '#666', fontSize: '11px', margin: '2px 0 0' }}>{userEmail}</p>
                  </div>
                  <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                    <p style={{ color: '#888', fontSize: '10px', textTransform: 'uppercase', margin: 0 }}>Member Since</p>
                    <p style={{ color: '#d2b45e', fontSize: '13px', fontWeight: 500, margin: '2px 0 0' }}>
                      {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '—'}
                    </p>
                  </div>
                </div>
              </div>

              {/* PORTFOLIO OVERVIEW */}
              <div className="scr-panel">
                <div className="scr-panel-header">
                  <div className="scr-panel-title">
                    <TrendingUp size={16} /> <h2>PORTFOLIO OVERVIEW <span className="cat">(INVEST)</span></h2>
                  </div>
                  <div className="scr-panel-actions">
                    <span className="scr-tag">INVEST</span>
                    <button><MoreHorizontal size={14} /></button>
                  </div>
                </div>
                <div className="scr-panel-body" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ marginBottom: '20px' }}>
                      <p style={{ color: '#ccc', fontSize: '10px', textTransform: 'uppercase' }}>Total Value</p>
                      <h3 style={{ fontSize: '28px', color: '#fff', margin: '4px 0' }}>
                        ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </h3>
                      <p style={{ color: '#4ade80', fontSize: '12px' }}>▲ $3,900 (+{yieldPercent.toFixed(2)}%)</p>
                    </div>
                    <div>
                      <p style={{ color: '#ccc', fontSize: '10px', textTransform: 'uppercase' }}>Daily Change</p>
                      <h3 style={{ fontSize: '20px', color: '#fff', margin: '4px 0' }}>
                        +{dailyChange.toLocaleString('en-US')} <span style={{ fontSize: '12px', color: '#ccc' }}>(1.19%)</span>
                      </h3>
                      <p style={{ color: '#4ade80', fontSize: '12px' }}>▲ +32.56%</p>
                    </div>
                  </div>
                  <div style={{ width: '150px', height: '150px', position: 'relative' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={allocation.slice(0, 4)} innerRadius={40} outerRadius={65} dataKey="value" stroke="rgba(0,0,0,0.5)">
                          {allocation.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyItems: 'center', pointerEvents: 'none', top: '50px', left: '60px' }}>
                      <span style={{ fontSize: '16px', fontWeight: 'bold' }}>35%</span>
                    </div>
                  </div>
                  <div style={{ flex: 1, fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {allocation.map(a => (
                      <div key={a.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: a.color }} /> {a.label}</div>
                        <span>{a.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI POWERED INSIGHTS */}
              <div className="scr-panel">
                <div className="scr-panel-header">
                  <div className="scr-panel-title">
                    <BrainCircuit size={16} /> <h2>AI POWERED INSIGHTS</h2>
                  </div>
                  <div className="scr-panel-actions">
                    <span className="scr-tag">AI</span>
                    <button><MoreHorizontal size={14} /></button>
                  </div>
                </div>
                <div className="scr-panel-body" style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ width: '180px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="scr-gauge-arc" style={{ width: '140px', height: '70px', borderTopLeftRadius: '70px', borderTopRightRadius: '70px', border: '16px solid rgba(255,255,255,0.1)', borderBottom: '0', position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(90deg, #f87171, #facc15, #4ade80)', maskImage: 'radial-gradient(circle at bottom, transparent 45%, black 46%)' }} />
                      <div style={{ position: 'absolute', bottom: '-4px', left: '50%', width: '4px', height: '40px', background: '#fff', transformOrigin: 'bottom center', transform: 'rotate(45deg)', borderRadius: '2px' }} />
                    </div>
                    <div style={{ color: '#4ade80', fontSize: '16px', fontWeight: 'bold', marginTop: '12px' }}>Very Bullish</div>
                    <p style={{ fontSize: '10px', textAlign: 'center', color: '#aaa', marginTop: '6px' }}>Current market sentiment is highly optimistic.</p>
                  </div>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      <input
                        value={analystInput}
                        onChange={(e) => setAnalystInput(e.target.value)}
                        placeholder="Ask AI Analyst..."
                        style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(210,180,94,0.3)', borderRadius: '4px', padding: '6px 12px', color: '#fff', fontSize: '11px', outline: 'none' }}
                        onKeyDown={(e) => e.key === 'Enter' && handleAnalystRequest()}
                      />
                      <button onClick={handleAnalystRequest} style={{ background: '#d2b45e', border: 'none', color: '#000', borderRadius: '4px', padding: '6px 12px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}>
                        {isAnalystLoading ? '...' : 'Ask'}
                      </button>
                    </div>
                    <div style={{ background: 'rgba(210,180,94,0.05)', padding: '10px', borderRadius: '4px', fontSize: '11px', color: '#d2b45e', borderLeft: '2px solid #d2b45e', flex: 1, fontStyle: 'italic', overflowY: 'auto' }}>
                      {analystOutput}
                    </div>
                  </div>
                </div>
              </div>

              {/* QUANT LAB */}
              <div className="scr-panel">
                <div className="scr-panel-header">
                  <div className="scr-panel-title">
                    <BarChart3 size={16} /> <h2>QUANT LAB <span className="cat">(QUANT)</span></h2>
                  </div>
                  <div className="scr-panel-actions">
                    <span className="scr-tag">QUANT</span>
                    <button><MoreHorizontal size={14} /></button>
                  </div>
                </div>
                <div className="scr-panel-body" style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ flex: 1.2 }}>
                    <h3 style={{ fontSize: '11px', color: '#ccc', marginBottom: '8px' }}>Candidate Chart</h3>
                    <div style={{ height: '140px' }}>
                      <svg viewBox="0 0 300 120" width="100%" height="100%" preserveAspectRatio="none">
                        {candleSeries.map((v, i) => (
                          <g key={i}>
                            <line x1={i * 15 + 10} x2={i * 15 + 10} y1="10" y2="110" stroke="rgba(210,180,94,0.15)" strokeWidth="1" />
                            <rect x={i * 15 + 7} y={120 - v} width="6" height={v * 0.8} fill="rgba(210,180,94,0.8)" rx="1" />
                          </g>
                        ))}
                      </svg>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: '#777', marginTop: '4px' }}>
                      <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                    </div>
                  </div>
                  <div style={{ flex: 0.8 }}>
                    <h3 style={{ fontSize: '11px', color: '#ccc', marginBottom: '8px' }}>Model Performance Comparison</h3>
                    <div style={{ height: '90px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={comparisonA.map((v, i) => ({ name: i * 25, algo1: comparisonA[i], algo2: comparisonB[i] }))}>
                          <XAxis dataKey="name" stroke="#555" fontSize={8} tickLine={false} axisLine={false} />
                          <YAxis stroke="#555" fontSize={8} tickLine={false} axisLine={false} width={20} />
                          <Area type="monotone" dataKey="algo1" stroke="#d2b45e" fill="#d2b45e" fillOpacity={0.2} strokeWidth={2} />
                          <Area type="monotone" dataKey="algo2" stroke="#fff" fill="none" strokeWidth={1} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginTop: '16px', color: '#ccc' }}>
                      <div>
                        <p>Algorithm Perf...</p>
                        <p style={{ color: '#d2b45e', fontWeight: 'bold' }}>54.5%</p>
                      </div>
                      <div>
                        <p>Algorithm 1</p>
                        <p style={{ color: '#4ade80' }}>0.25%</p>
                      </div>
                      <div>
                        <p>Algorithm 2</p>
                        <p style={{ color: '#4ade80' }}>0.25%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RISK ALERTS */}
              <div className="scr-panel">
                <div className="scr-panel-header">
                  <div className="scr-panel-title">
                    <ShieldCheck size={16} /> <h2>RISK ALERTS <span className="cat">(SCAM DETECTOR)</span></h2>
                  </div>
                  <div className="scr-panel-actions">
                    <span className="scr-tag">SCAM PTOR</span>
                    <button><MoreHorizontal size={14} /></button>
                  </div>
                </div>
                <div className="scr-panel-body" style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ flex: 0.8 }}>
                    <h3 style={{ fontSize: '11px', color: '#ccc', marginBottom: '8px' }}>Summary</h3>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                      <div className="scr-risk-box critical">
                        <span>Critical</span>
                        <strong>3</strong>
                        <em>projects</em>
                      </div>
                      <div className="scr-risk-box high">
                        <span>High risk</span>
                        <strong>2</strong>
                        <em>projects</em>
                      </div>
                      <div className="scr-risk-box low">
                        <span>Low risk</span>
                        <strong>1</strong>
                        <em>projects</em>
                      </div>
                    </div>
                    <h3 style={{ fontSize: '11px', color: '#ccc', marginBottom: '8px' }}>Project Stainers</h3>
                    <div className="scr-risk-bars">
                      <div className="scr-risk-bar"><span style={{ width: '80%', background: '#f87171' }}></span><div className="scr-risk-bar-text"><span>Critical</span><span>27/23</span></div></div>
                      <div className="scr-risk-bar"><span style={{ width: '90%', background: '#eab308' }}></span><div className="scr-risk-bar-text"><span>High risk</span><span>58/55</span></div></div>
                      <div className="scr-risk-bar"><span style={{ width: '15%', background: '#4ade80' }}></span><div className="scr-risk-bar-text"><span>Low risk</span><span>1/34</span></div></div>
                    </div>
                  </div>
                  <div style={{ flex: 1.2 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <h3 style={{ fontSize: '11px', color: '#ccc' }}>Recent Scanned Projects</h3>
                      <h3 style={{ fontSize: '11px', color: '#ccc' }}>Risk Rating</h3>
                    </div>
                    <div className="scr-list">
                      <div className="scr-list-item"><Image src="/brand/team.jpeg" width={16} height={16} alt="Project icon" /> <span style={{ flex: 1 }}>MetaVerse Scam? - High Risk</span> <span style={{ color: '#f87171' }}>High Risk</span></div>
                      <div className="scr-list-item"><Image src="/brand/team.jpeg" width={16} height={16} alt="Project icon" /> <span style={{ flex: 1 }}>MetaVerse Scam? - High Risk</span> <span style={{ color: '#f87171' }}>High Risk</span></div>
                      <div className="scr-list-item"><Image src="/brand/team.jpeg" width={16} height={16} alt="Project icon" /> <span style={{ flex: 1 }}>MetaVerse Scam? - High Risk</span> <span style={{ color: '#f87171' }}>High Risk</span></div>
                      <div className="scr-list-item"><Image src="/brand/team.jpeg" width={16} height={16} alt="Project icon" /> <span style={{ flex: 1 }}>MetaVerse Scam? - High Risk</span> <span style={{ color: '#f87171' }}>High Risk</span></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* VENTURES */}
              <div className="scr-panel">
                <div className="scr-panel-header">
                  <div className="scr-panel-title">
                    <Rocket size={16} /> <h2>VENTURES</h2>
                  </div>
                  <div className="scr-panel-actions">
                    <span className="scr-tag">VENTURES</span>
                    <button><MoreHorizontal size={14} /></button>
                  </div>
                </div>
                <div className="scr-panel-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px' }}>
                  {[
                    { t: 'New', d: 'Investments', p: 'New investment opportunities.', i: 'A' },
                    { t: 'Crypto', d: 'Investments', p: 'Describe a shartroter of mwlorining.', i: 'B' },
                    { t: 'Meta', d: 'Investments', p: 'Funding stage of aremodisen tech.', i: 'M' },
                    { t: 'Ventures', d: 'Investments', p: 'New investment opportunities to amal.', i: 'V' },
                  ].map(v => (
                    <div key={v.t} className="scr-venture-card">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                        <div style={{ width: '28px', height: '28px', background: 'rgba(210,180,94,0.1)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d2b45e', fontWeight: 'bold', fontSize: '14px', border: '1px solid rgba(210,180,94,0.3)' }}>{v.i}</div>
                        <div style={{ lineHeight: 1.1 }}>
                          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#fff' }}>{v.t}</div>
                          <div style={{ fontSize: '10px', color: '#777' }}>{v.d}</div>
                        </div>
                      </div>
                      <h4 style={{ fontSize: '11px', color: '#ccc', marginBottom: '4px' }}>Funding Stage</h4>
                      <p style={{ fontSize: '9px', color: '#777', lineHeight: 1.4, marginBottom: '12px', flex: 1 }}>{v.p}</p>
                      <button className="scr-btn-outline">Learn more</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* ACTIVE WATCHLIST */}
              <CryptoWatchlist />

            </div>
          )}
        </section>

        <footer className="scr-footer">
          <div className="scr-footer-left">
            <span>Last Updated: Time 17:15:32 AM</span>
          </div>
          <div className="scr-footer-right">
            API Status: <span style={{ color: '#4ade80' }}>Online</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
