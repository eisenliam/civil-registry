"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [showPw, setShowPw]     = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    setLoading(false);
    if (!response.ok) {
      const data = await response.json();
      setError(data?.error ?? 'Login failed. Please try again.');
      return;
    }
    // router.push('/') — add next/navigation router here
  }

  const majorAngles = Array.from({ length: 8 }, (_, i) => i * 45);
  const minorAngles = Array.from({ length: 8 }, (_, i) => i * 45 + 22.5);

    router.push('/add');
  function makeRayPoints(deg, innerR, outerR, halfBase) {
    const rad  = (deg - 90) * Math.PI / 180;
    const x1   = 100 + innerR * Math.cos(rad);
    const y1   = 100 + innerR * Math.sin(rad);
    const x2   = 100 + outerR * Math.cos(rad);
    const y2   = 100 + outerR * Math.sin(rad);
    const perp = rad + Math.PI / 2;
    const ax   = x1 + halfBase * Math.cos(perp);
    const ay   = y1 + halfBase * Math.sin(perp);
    const bx   = x1 - halfBase * Math.cos(perp);
    const by   = y1 - halfBase * Math.sin(perp);
    return `${ax},${ay} ${bx},${by} ${x2},${y2}`;
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant:ital,wght@0,500;0,600;1,400;1,500&family=Figtree:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --orange:    #f97316;
          --deep:      #c2410c;
          --gold:      #fbbf24;
          --gold-dim:  rgba(251,191,36,0.55);
          --dark:      #0c0905;
          --cream:     #fafaf8;
        }

        @keyframes panelIn   { from { transform:translateX(-100%); opacity:0 } to { transform:translateX(0); opacity:1 } }
        @keyframes formIn    { from { transform:translateX(36px);  opacity:0 } to { transform:translateX(0); opacity:1 } }
        @keyframes fadeUp    { from { transform:translateY(18px);  opacity:0 } to { transform:translateY(0); opacity:1 } }
        @keyframes slowSpin  { to   { transform: rotate(360deg); } }
        @keyframes embFloat  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes embGlow   {
          0%,100% { filter:drop-shadow(0 0 14px rgba(251,191,36,.32)) drop-shadow(0 0 44px rgba(234,88,12,.16)); }
          50%     { filter:drop-shadow(0 0 26px rgba(251,191,36,.52)) drop-shadow(0 0 68px rgba(234,88,12,.26)); }
        }
        @keyframes ringPop   {
          0%   { transform:translate(-50%,-50%) scale(1);    opacity:.3; }
          100% { transform:translate(-50%,-50%) scale(1.55); opacity:0;  }
        }
        @keyframes spin      { to { transform:rotate(360deg); } }
        @keyframes shake     {
          0%,100%{transform:translateX(0)}
          20%{transform:translateX(-6px)} 40%{transform:translateX(6px)}
          60%{transform:translateX(-4px)} 80%{transform:translateX(4px)}
        }
        @keyframes grain     {
          0%,100%{transform:translate(0,0)}     20%{transform:translate(-2%,-3%)}
          40%{transform:translate(3%,2%)}        60%{transform:translate(-1%,4%)}
          80%{transform:translate(4%,-2%)}
        }

        .lr-root {
          min-height: 100vh;
          display: flex;
          font-family: 'Figtree', sans-serif;
          overflow: hidden;
          background: var(--cream);
        }

        .lr-panel {
          width: 46%;
          background: var(--dark);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 64px 48px 80px;
          animation: panelIn 1s cubic-bezier(.16,1,.3,1) both;
        }

        .lr-grain {
          position: absolute; inset: -50%;
          width: 200%; height: 200%;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='.07'/%3E%3C/svg%3E");
          opacity: .4; pointer-events: none;
          animation: grain 9s steps(1) infinite; z-index: 1;
        }
        .lr-panel-glow {
          position: absolute;
          width: 460px; height: 460px;
          border-radius: 50%;
          top: 50%; left: 50%;
          transform: translate(-50%, -56%);
          background: radial-gradient(circle, rgba(234,88,12,.17) 0%, rgba(251,191,36,.07) 45%, transparent 70%);
          pointer-events: none; z-index: 0;
        }
        .lr-panel-fade {
          position: absolute;
          bottom: 0; left: 0; right: 0; height: 160px;
          background: linear-gradient(to top, rgba(12,9,5,.88), transparent);
          pointer-events: none; z-index: 1;
        }

        .lr-emblem-wrap {
          position: relative; z-index: 2;
          margin-bottom: 30px;
          animation: embFloat 7s ease-in-out infinite;
        }
        .lr-emblem-svg { animation: embGlow 5s ease-in-out infinite; display: block; }
        .lr-rays       { animation: slowSpin 80s linear infinite; transform-origin: 100px 100px; }

        .lr-ring {
          position: absolute; border-radius: 50%;
          border: 1px solid rgba(251,191,36,.18);
          top: 50%; left: 50%; pointer-events: none;
        }
        .lr-ring-1 { width:210px; height:210px; animation: ringPop 3.5s ease-out infinite; }
        .lr-ring-2 { width:210px; height:210px; animation: ringPop 3.5s ease-out infinite 1.17s; }
        .lr-ring-3 { width:210px; height:210px; animation: ringPop 3.5s ease-out infinite 2.33s; }

        .lr-ptext { text-align: center; position: relative; z-index: 2; }
        .lr-eyebrow {
          font-family: 'Cormorant', serif; font-size: 15px; font-style: italic;
          color: var(--gold-dim); letter-spacing: .5px; margin-bottom: 2px;
          animation: fadeUp .8s ease .35s both;
        }
        .lr-town {
          font-family: 'Bebas Neue', cursive;
          font-size: clamp(52px,5.8vw,78px);
          color: #fff; letter-spacing: 8px; line-height: 1;
          text-shadow: 0 0 60px rgba(251,191,36,.12);
          animation: fadeUp .8s ease .42s both;
        }
        .lr-dept {
          font-size: 9.5px; font-weight: 600; letter-spacing: 4.5px;
          text-transform: uppercase; color: rgba(255,255,255,.28); margin-top: 10px;
          animation: fadeUp .8s ease .49s both;
        }
        .lr-orn {
          display: flex; align-items: center; gap: 12px;
          margin: 18px auto; width: fit-content;
          animation: fadeUp .8s ease .54s both;
        }
        .lr-orn-line { width: 36px; height: 1px; background: rgba(251,191,36,.28); }
        .lr-orn-gem  { width: 5px; height: 5px; background: var(--gold-dim); transform: rotate(45deg); flex-shrink: 0; }
        .lr-tagline  {
          font-family: 'Cormorant', serif; font-size: 14px; font-style: italic;
          letter-spacing: 1px; color: rgba(251,191,36,.72);
          animation: fadeUp .8s ease .59s both;
        }
        .lr-footer {
          position: absolute; bottom: 26px; left: 0; right: 0;
          text-align: center;
          font-size: 8.5px; font-weight: 600; letter-spacing: 3.5px;
          text-transform: uppercase; color: rgba(255,255,255,.12);
          z-index: 2;
        }

        .lr-right {
          flex: 1;
          display: flex; align-items: center; justify-content: center;
          padding: 48px 52px;
          background: var(--cream);
          position: relative;
          animation: formIn .9s cubic-bezier(.16,1,.3,1) .12s both;
        }
        .lr-right::before {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(0,0,0,.055) 1px, transparent 1px);
          background-size: 22px 22px;
          pointer-events: none;
        }

        .lr-form-wrap { width: 100%; max-width: 370px; position: relative; z-index: 1; }

        .lr-heading { margin-bottom: 28px; animation: fadeUp .55s ease .28s both; }
        .lr-heading h2 {
          font-family: 'Bebas Neue', cursive;
          font-size: 36px; font-weight: 700;
          color: #1c1917; line-height: 1.08; margin-bottom: 6px;
          text-transform: uppercase; letter-spacing: 2px;
        }
        .lr-heading p { color: #78716c; font-size: 13px; }

        .lr-fields { display: flex; flex-direction: column; gap: 15px; }

        .lr-fg { animation: fadeUp .55s ease both; }
        .lr-fg:nth-child(1) { animation-delay: .34s; }
        .lr-fg:nth-child(2) { animation-delay: .41s; }

        .lr-fg label, .lr-fg [data-slot="label"] {
          font-size: 10.5px !important; font-weight: 700 !important;
          letter-spacing: .8px !important; text-transform: uppercase !important;
          color: #57534e !important; font-family: 'Figtree', sans-serif !important;
          margin-bottom: 6px !important; display: block !important;
        }
        .lr-fg input, .lr-fg [data-slot="input"] {
          height: 46px !important; background: #fff !important;
          border: 1.5px solid #e5e1dc !important; border-radius: 11px !important;
          font-family: 'Figtree', sans-serif !important; font-size: 14px !important;
          color: #1c1917 !important; outline: none !important; box-shadow: none !important;
          width: 100% !important; padding: 0 14px !important;
          transition: border-color .2s, box-shadow .2s !important;
        }
        .lr-fg input:focus, .lr-fg [data-slot="input"]:focus {
          border-color: var(--orange) !important;
          box-shadow: 0 0 0 3.5px rgba(249,115,22,.11) !important;
        }
        .lr-fg input::placeholder { color: #b5b0aa !important; }

        .lr-pw { position: relative; }
        .lr-pw input, .lr-pw [data-slot="input"] { padding-right: 46px !important; }
        .lr-eye {
          position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          color: #b5b0aa; padding: 4px; line-height: 0; transition: color .18s;
        }
        .lr-eye:hover { color: var(--orange); }

        .lr-error {
          background: #fef2f2; border: 1px solid #fecaca; border-radius: 10px;
          padding: 10px 13px; color: #dc2626; font-size: 12.5px; font-weight: 500;
          display: flex; align-items: center; gap: 8px;
          animation: shake .45s ease, fadeUp .3s ease;
        }

        .lr-submit {
          width: 100%; height: 48px;
          background: linear-gradient(135deg,#f97316 0%,#ea580c 55%,#c2410c 100%) !important;
          color: #fff !important; border: none !important; border-radius: 12px !important;
          font-family: 'Figtree', sans-serif !important; font-size: 14.5px !important;
          font-weight: 600 !important; letter-spacing: .3px !important;
          cursor: pointer !important; position: relative !important; overflow: hidden !important;
          transition: transform .22s, box-shadow .22s, opacity .22s !important;
          animation: fadeUp .55s ease .48s both;
        }
        .lr-submit::after {
          content:''; position:absolute; inset:0;
          background: linear-gradient(135deg,#ea580c,#9a3412);
          opacity:0; transition:opacity .32s;
        }
        .lr-submit:hover:not(:disabled)::after { opacity:1; }
        .lr-submit:hover:not(:disabled) { transform:translateY(-2px) !important; box-shadow:0 10px 28px rgba(234,88,12,.36) !important; }
        .lr-submit:active:not(:disabled) { transform:translateY(0) !important; }
        .lr-submit:disabled { opacity:.62 !important; cursor:not-allowed !important; }

        .lr-btn-inner { position:relative; z-index:1; display:flex; align-items:center; justify-content:center; gap:8px; }
        .lr-spinner   { width:15px; height:15px; border:2px solid rgba(255,255,255,.32); border-top-color:#fff; border-radius:50%; animation:spin .72s linear infinite; }

        @media (max-width:768px) {
          .lr-root  { flex-direction:column; }
          .lr-panel { width:100%; min-height:52vh; padding:44px 28px 56px; animation:none; }
          .lr-right { padding:36px 24px; animation:none; }
          .lr-heading,.lr-fg,.lr-submit { animation:none; opacity:1; transform:none; }
        }
      `}</style>

      <div className="lr-root">

        {/* LEFT PANEL */}
        <div className="lr-panel">
          <div className="lr-grain" />
          <div className="lr-panel-glow" />
          <div className="lr-panel-fade" />

          <div className="lr-emblem-wrap">
            <div className="lr-ring lr-ring-1" />
            <div className="lr-ring lr-ring-2" />
            <div className="lr-ring lr-ring-3" />

            <svg className="lr-emblem-svg" width="200" height="200" viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="100" r="95" stroke="rgba(251,191,36,0.10)" strokeWidth="1" />
              <circle cx="100" cy="100" r="87" stroke="rgba(251,191,36,0.07)" strokeWidth="0.5" strokeDasharray="3 7" />
              <g className="lr-rays">
                {majorAngles.map(deg => (
                  <polygon key={`maj-${deg}`} points={makeRayPoints(deg, 53, 94, 6)} fill="rgba(251,191,36,0.88)" />
                ))}
                {minorAngles.map(deg => (
                  <polygon key={`min-${deg}`} points={makeRayPoints(deg, 53, 76, 3)} fill="rgba(251,191,36,0.42)" />
                ))}
              </g>
              <circle cx="100" cy="100" r="52" fill="rgba(251,191,36,0.09)" />
              <circle cx="100" cy="100" r="46" fill="rgba(251,191,36,0.17)" />
              <circle cx="100" cy="100" r="40" fill="rgba(251,191,36,0.82)" />
              <circle cx="100" cy="100" r="33" fill="rgba(254,215,70,0.94)" />
              <circle cx="100" cy="100" r="24" fill="rgba(255,230,100,0.97)" />
              <circle cx="100" cy="100" r="27" stroke="rgba(160,90,0,0.20)" strokeWidth="1.5" fill="none" />
              <circle cx="100" cy="100" r="7" fill="rgba(180,100,10,0.52)" />
            </svg>
          </div>

          <div className="lr-ptext">
            <div className="lr-eyebrow">Bayan ng</div>
            <div className="lr-town">Calumpit</div>
            <div className="lr-dept">Municipal Civil Registrar</div>
            <div className="lr-orn">
              <div className="lr-orn-line" />
              <div className="lr-orn-gem" />
              <div className="lr-orn-line" />
            </div>
            <div className="lr-tagline">Taas Noo Calumpiteño</div>
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
          <p className="font-semibold">Test accounts</p>
          <ul className="mt-2 space-y-1">
            <li>Uno / Munggosathursdayz</li>
            <li>Dos / Munggosathursdayx</li>
            <li>Tres / Munggosathursdayc</li>
            <li>Quatro / Munggosathursdayv</li>
          </ul>
          <div className="lr-footer">Republic of the Philippines</div>
        </div>

        {/* RIGHT FORM */}
        <div className="lr-right">
          <div className="lr-form-wrap">

            <div className="lr-heading">
              <h2>Welcome back</h2>
              <p>Sign in to access the registry system</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="lr-fields">

                <div className="lr-fg">
                  <Label htmlFor="lr-user">Username</Label>
                  <Input
                    id="lr-user"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    autoComplete="username"
                    required
                  />
                </div>

                <div className="lr-fg">
                  <Label htmlFor="lr-pass">Password</Label>
                  <div className="lr-pw">
                    <Input
                      id="lr-pass"
                      type={showPw ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      required
                    />
                    <button type="button" className="lr-eye"
                      aria-label={showPw ? 'Hide password' : 'Show password'}
                      onClick={() => setShowPw(v => !v)}>
                      {showPw ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                          <line x1="1" y1="1" x2="23" y2="23"/>
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="lr-error" role="alert">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0 }}>
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="12"/>
                      <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    {error}
                  </div>
                )}

                <Button type="submit" disabled={loading} className="lr-submit">
                  <span className="lr-btn-inner">
                    {loading && <span className="lr-spinner" />}
                    {loading ? 'Signing in…' : 'Sign in'}
                  </span>
                </Button>

              </div>
            </form>

          </div>
        </div>
      </div>
    </>
  );
}