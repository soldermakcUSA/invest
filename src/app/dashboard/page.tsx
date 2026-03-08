"use client";

import Image from "next/image";
import Link from "next/link";
import "./dashboard.css";
import { OrbitalBrand } from "@/components/orbital-brand";
import { useState, useEffect } from "react";
import { fetchGemini } from "@/lib/gemini";
import { supabase } from "@/lib/supabase/client";
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
  LayoutGrid
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
  const [userData, setUserData] = useState<{ balance: number; yield: number; dailyChange: number } | null>(null);

  useEffect(() => {
    let channel: any;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const user = session?.user;
      if (user) {
        // Initial fetch from Supabase
        const fetchUserData = async () => {
          let { data, error: fetchError } = await supabase
            .from("users")
            .select("balance, yield, daily_change")
            .eq("uid", user.id)
            .maybeSingle();

          if (!data && !fetchError) {
            const fallbackName = user.user_metadata?.full_name?.split(/\s+/) || ["", ""];
            const { data: newData } = await supabase.from("users").insert({
              uid: user.id,
              email: user.email || "",
              display_name: user.user_metadata?.full_name || "",
              first_name: user.user_metadata?.first_name || fallbackName[0] || "",
              last_name: user.user_metadata?.last_name || fallbackName.slice(1).join(" ") || "",
              photo_url: user.user_metadata?.avatar_url || "",
              provider: user.app_metadata?.provider || "supabase",
              balance: 145891.87,
              yield: 12.86,
              daily_change: 1764.00,
              last_sign_in_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              created_at: new Date().toISOString(),
            }).select("balance, yield, daily_change").maybeSingle();

            if (newData) data = newData;
          }

          if (data) {
            setUserData({
              balance: data.balance ?? 145891.87,
              yield: data.yield ?? 12.86,
              dailyChange: data.daily_change ?? 1764.00,
            });
          }
        };

        fetchUserData();

        // Listen for realtime changes on the user's row
        channel = supabase
          .channel("public:users")
          .on(
            "postgres_changes",
            { event: "UPDATE", schema: "public", table: "users", filter: `uid=eq.${user.id}` },
            (payload) => {
              if (payload.new) {
                setUserData({
                  balance: payload.new.balance ?? 145891.87,
                  yield: payload.new.yield ?? 12.86,
                  dailyChange: payload.new.daily_change ?? 1764.00,
                });
              }
            }
          )
          .subscribe();
      } else {
        setUserData(null);
        if (channel) {
          supabase.removeChannel(channel);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

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
            <div className="scr-avatar">
              <img src="/brand/team.jpeg" alt="User" />
            </div>
          </div>
        </header>

        <section className="scr-content">
          {activeTab === "Dashboard" && (
            <div className="scr-grid">

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
                        ${userData ? userData.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "145,891.87"}
                      </h3>
                      <p style={{ color: '#4ade80', fontSize: '12px' }}>▲ $3,900 (+{userData ? userData.yield.toFixed(2) : "12.86"}%)</p>
                    </div>
                    <div>
                      <p style={{ color: '#ccc', fontSize: '10px', textTransform: 'uppercase' }}>Daily Change</p>
                      <h3 style={{ fontSize: '20px', color: '#fff', margin: '4px 0' }}>
                        +{userData ? userData.dailyChange.toLocaleString('en-US') : "1,764"} <span style={{ fontSize: '12px', color: '#ccc' }}>(1.19%)</span>
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
                      <div className="scr-list-item"><img src="/brand/team.jpeg" width={16} height={16} /> <span style={{ flex: 1 }}>MetaVerse Scam? - High Risk</span> <span style={{ color: '#f87171' }}>High Risk</span></div>
                      <div className="scr-list-item"><img src="/brand/team.jpeg" width={16} height={16} /> <span style={{ flex: 1 }}>MetaVerse Scam? - High Risk</span> <span style={{ color: '#f87171' }}>High Risk</span></div>
                      <div className="scr-list-item"><img src="/brand/team.jpeg" width={16} height={16} /> <span style={{ flex: 1 }}>MetaVerse Scam? - High Risk</span> <span style={{ color: '#f87171' }}>High Risk</span></div>
                      <div className="scr-list-item"><img src="/brand/team.jpeg" width={16} height={16} /> <span style={{ flex: 1 }}>MetaVerse Scam? - High Risk</span> <span style={{ color: '#f87171' }}>High Risk</span></div>
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
              <div className="scr-panel">
                <div className="scr-panel-header">
                  <div className="scr-panel-title">
                    <Wallet size={16} /> <h2>ACTIVE WATCHLIST</h2>
                  </div>
                  <div className="scr-panel-actions">
                    <span className="scr-tag">WOW BENEFIT</span>
                    <button><MoreHorizontal size={14} /></button>
                  </div>
                </div>
                <div className="scr-panel-body">
                  <table className="scr-table">
                    <thead>
                      <tr>
                        <th>Ticker</th><th>Price</th><th>Price</th><th>Sparkline</th><th>Change</th><th>Target</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>AVDK</td><td>$9.30</td><td>$1548.30</td><td><svg viewBox="0 0 60 20" width="60" height="20"><polyline fill="none" stroke="#d2b45e" strokeWidth="1" points={buildSpark([2, 5, 3, 6, 4, 8])} /></svg></td><td style={{ color: '#d2b45e' }}>13.38%</td><td style={{ color: '#4ade80' }}>+3.23%</td></tr>
                      <tr><td>ALONI</td><td>$2.70</td><td>$92.90</td><td><svg viewBox="0 0 60 20" width="60" height="20"><polyline fill="none" stroke="#d2b45e" strokeWidth="1" points={buildSpark([4, 3, 5, 2, 4, 4])} /></svg></td><td style={{ color: '#d2b45e' }}>7.25%</td><td style={{ color: '#4ade80' }}>+2.59%</td></tr>
                      <tr><td>CRYPD</td><td>$13.70</td><td>$398.70</td><td><svg viewBox="0 0 60 20" width="60" height="20"><polyline fill="none" stroke="#d2b45e" strokeWidth="1" points={buildSpark([1, 3, 2, 5, 3, 6])} /></svg></td><td style={{ color: '#d2b45e' }}>3.38%</td><td style={{ color: '#4ade80' }}>+5.98%</td></tr>
                      <tr><td>BREC</td><td>$3.90</td><td>$38.95</td><td><svg viewBox="0 0 60 20" width="60" height="20"><polyline fill="none" stroke="#d2b45e" strokeWidth="1" points={buildSpark([6, 5, 7, 4, 6, 8])} /></svg></td><td style={{ color: '#d2b45e' }}>1.25%</td><td style={{ color: '#4ade80' }}>+9.60%</td></tr>
                      <tr><td>FMRN</td><td>$3.00</td><td>$92.75</td><td><svg viewBox="0 0 60 20" width="60" height="20"><polyline fill="none" stroke="#d2b45e" strokeWidth="1" points={buildSpark([3, 5, 4, 7, 5, 9])} /></svg></td><td style={{ color: '#d2b45e' }}>3.38%</td><td style={{ color: '#4ade80' }}>+4.99%</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

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
