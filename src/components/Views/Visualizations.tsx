/* Visualizations.tsx — Mini SVG visualizations for service cards.
   Each export is a self-contained component. Pick by `viz` key in ServiceCard. */

'use client';

import vizStyles from './Visualizations.module.css';

function Frame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className={vizStyles.viz}>
      <span className={vizStyles.label}>{label}</span>
      <div className={vizStyles.corner}>
        <span className={vizStyles.dotOn}></span>
        <span className={vizStyles.dot}></span>
        <span className={vizStyles.dot}></span>
      </div>
      {children}
    </div>
  );
}

/* 1. BI / KPI — area chart with marker */
export function bi() {
  const p1 = 'M30,95 L60,80 L90,85 L120,60 L150,68 L180,40 L210,52 L240,30 L270,38 L300,22 L330,28 L360,15';
  const p2 = 'M30,110 L60,100 L90,95 L120,90 L150,82 L180,75 L210,72 L240,65 L270,60 L300,55 L330,50 L360,45';
  return (
    <Frame label="BI · KPI">
      <svg viewBox="0 0 400 140" preserveAspectRatio="none">
        <line x1="30" y1="120" x2="380" y2="120" stroke="rgba(148,163,184,0.2)" strokeWidth="0.5"/>
        <defs>
          <linearGradient id="bigrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <path d={`${p1} L360,120 L30,120 Z`} fill="url(#bigrad)" opacity="0.4"/>
        <path className={vizStyles.draw} d={p2} stroke="#3b82f6" strokeWidth="1.2" fill="none" opacity="0.7"/>
        <path className={vizStyles.draw} d={p1} stroke="#22d3ee" strokeWidth="1.8" fill="none" style={{ animationDelay: '0.2s' }}/>
        <circle cx="300" cy="22" r="3" fill="#22d3ee" className={vizStyles.pulse}/>
        <circle cx="300" cy="22" r="6" fill="none" stroke="#22d3ee" strokeWidth="0.8" opacity="0.4" className={vizStyles.pulse}/>
        <text x="308" y="20" fill="#22d3ee" fontSize="9" fontFamily="var(--font-mono)">+47%</text>
      </svg>
    </Frame>
  );
}

/* 2. AI — neural network */
export function ai() {
  const layers = [[0.2, 0.4, 0.6, 0.8], [0.25, 0.45, 0.65, 0.85], [0.35, 0.55, 0.75]];
  const xs = [0.18, 0.5, 0.82];
  return (
    <Frame label="ML · NEURAL">
      <svg viewBox="0 0 400 140" preserveAspectRatio="none">
        {layers[0].map((y1, i) =>
          layers[1].map((y2, j) => (
            <line key={`a${i}-${j}`} x1={xs[0]*400} y1={y1*140} x2={xs[1]*400} y2={y2*140}
              stroke="#22d3ee" strokeWidth="0.4" opacity={0.15 + ((i+j) % 2) * 0.15}/>
          ))
        )}
        {layers[1].map((y1, i) =>
          layers[2].map((y2, j) => (
            <line key={`b${i}-${j}`} x1={xs[1]*400} y1={y1*140} x2={xs[2]*400} y2={y2*140}
              stroke="#22d3ee" strokeWidth="0.4" opacity={0.15 + ((i*j) % 2) * 0.2}/>
          ))
        )}
        <path d={`M${xs[0]*400},${layers[0][2]*140} L${xs[1]*400},${layers[1][1]*140} L${xs[2]*400},${layers[2][1]*140}`}
          stroke="#22d3ee" strokeWidth="1.5" fill="none" className={vizStyles.pulse}/>
        {layers.map((layer, li) =>
          layer.map((y, ni) => (
            <g key={`n${li}-${ni}`}>
              <circle cx={xs[li]*400} cy={y*140} r="4" fill="#0a1220" stroke="#22d3ee" strokeWidth="1.2"/>
              {((li === 0 && ni === 2) || (li === 1 && ni === 1) || (li === 2 && ni === 1)) && (
                <circle cx={xs[li]*400} cy={y*140} r="4" fill="#22d3ee" className={vizStyles.pulse}/>
              )}
            </g>
          ))
        )}
      </svg>
    </Frame>
  );
}

/* 3. Growth — bars + trajectory line */
export function growth() {
  const bars = [30, 45, 38, 62, 55, 78, 70, 95, 88, 110];
  return (
    <Frame label="GROWTH · TRAJECTORY">
      <svg viewBox="0 0 400 140" preserveAspectRatio="none">
        <defs>
          <linearGradient id="barg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.1"/>
          </linearGradient>
        </defs>
        {bars.map((v, i) => (
          <rect key={i} x={30 + i*34} y={130 - v} width="22" height={v} fill="url(#barg)" opacity={0.4 + (i / bars.length) * 0.5}/>
        ))}
        <path className={vizStyles.draw}
          d={bars.map((v, i) => `${i === 0 ? 'M' : 'L'}${41 + i*34},${130 - v}`).join(' ')}
          stroke="#f8fafc" strokeWidth="1.2" fill="none" opacity="0.7"/>
        <line x1="20" y1="130" x2="380" y2="130" stroke="rgba(148,163,184,0.2)" strokeWidth="0.5"/>
      </svg>
    </Frame>
  );
}

/* 4. Sales — funnel */
export function sales() {
  const stages = [
    { w: 340, v: '10.2K', l: 'LEADS' },
    { w: 260, v: '4.1K', l: 'MQL' },
    { w: 180, v: '1.8K', l: 'SQL' },
    { w: 90, v: '612', l: 'WON' },
  ];
  return (
    <Frame label="FUNNEL · B2B">
      <svg viewBox="0 0 400 140" preserveAspectRatio="none">
        {stages.map((s, i) => (
          <g key={i}>
            <rect x={(400 - s.w) / 2} y={10 + i*30} width={s.w} height="22" rx="2"
              fill="#22d3ee" opacity={0.2 + i*0.18} stroke="#22d3ee" strokeWidth="0.6"/>
            <text x={(400 - s.w) / 2 + 8} y={25 + i*30} fill="#f8fafc" fontSize="10" fontFamily="var(--font-mono)" fontWeight="500">{s.v}</text>
            <text x={(400 + s.w) / 2 - 8} y={25 + i*30} fill="rgba(148,163,184,0.7)" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="end">{s.l}</text>
          </g>
        ))}
      </svg>
    </Frame>
  );
}

/* 5. Ops — timeline / gantt */
export function ops() {
  const tasks = [
    { y: 18, x1: 30, x2: 180, c: '#22d3ee' },
    { y: 38, x1: 90, x2: 240, c: '#3b82f6' },
    { y: 58, x1: 60, x2: 320, c: '#22d3ee' },
    { y: 78, x1: 170, x2: 290, c: '#3b82f6' },
    { y: 98, x1: 220, x2: 370, c: '#22d3ee' },
    { y: 118, x1: 100, x2: 200, c: '#94a3b8' },
  ];
  return (
    <Frame label="OPS · TIMELINE">
      <svg viewBox="0 0 400 140" preserveAspectRatio="none">
        {[0,1,2,3,4,5].map(i => (
          <line key={i} x1={50 + i*60} y1="8" x2={50 + i*60} y2="132" stroke="rgba(148,163,184,0.08)" strokeWidth="0.5"/>
        ))}
        {tasks.map((t, i) => (
          <g key={i}>
            <rect x={t.x1} y={t.y - 5} width={t.x2 - t.x1} height="10" rx="2" fill={t.c} opacity="0.3" stroke={t.c} strokeWidth="0.6"/>
            <rect x={t.x1} y={t.y - 5} width={(t.x2 - t.x1) * (0.4 + (i % 3) * 0.2)} height="10" rx="2" fill={t.c} opacity="0.8"/>
          </g>
        ))}
        <line x1="230" y1="8" x2="230" y2="132" stroke="#22d3ee" strokeWidth="1" strokeDasharray="2 2"/>
      </svg>
    </Frame>
  );
}

/* 6. Data — pipeline */
export function data() {
  return (
    <Frame label="DATA · PIPELINE">
      <svg viewBox="0 0 400 140" preserveAspectRatio="none">
        {[35, 70, 105].map((y, i) => (
          <g key={i}>
            <rect x="20" y={y - 8} width="50" height="16" rx="3" fill="rgba(15,23,42,0.8)" stroke="#94a3b8" strokeWidth="0.6"/>
            <text x="45" y={y + 3} fill="#94a3b8" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">SRC{i + 1}</text>
          </g>
        ))}
        <rect x="170" y="55" width="60" height="30" rx="4" fill="rgba(34,211,238,0.15)" stroke="#22d3ee" strokeWidth="1"/>
        <text x="200" y="73" fill="#22d3ee" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">ETL</text>
        <rect x="320" y="55" width="60" height="30" rx="4" fill="rgba(15,23,42,0.9)" stroke="#22d3ee" strokeWidth="0.8"/>
        <text x="350" y="73" fill="#f8fafc" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">DWH</text>
        {[35, 70, 105].map((y, i) => (
          <path key={i} className={vizStyles.draw}
            d={`M70,${y} C120,${y} 140,70 170,70`}
            stroke="#22d3ee" strokeWidth="1" fill="none" opacity="0.6"
            style={{ animationDelay: `${i * 0.2}s` }}/>
        ))}
        <path className={vizStyles.draw} d="M230,70 L320,70" stroke="#22d3ee" strokeWidth="1.5" fill="none" style={{ animationDelay: '0.8s' }}/>
        <circle r="2" fill="#22d3ee">
          <animateMotion dur="2s" repeatCount="indefinite" path="M70,35 C120,35 140,70 170,70 L230,70 L320,70"/>
        </circle>
      </svg>
    </Frame>
  );
}

/* 7. Agents — LLM orchestration */
export function agents() {
  return (
    <Frame label="AGENTS · ORCHESTRATION">
      <svg viewBox="0 0 400 140" preserveAspectRatio="none">
        <circle cx="200" cy="70" r="22" fill="rgba(34,211,238,0.15)" stroke="#22d3ee" strokeWidth="1.2"/>
        <text x="200" y="73" fill="#22d3ee" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">LLM</text>
        <ellipse cx="200" cy="70" rx="120" ry="45" fill="none" stroke="rgba(148,163,184,0.18)" strokeWidth="0.5" strokeDasharray="2 3"/>
        {[
          { x: 80, y: 70, l: 'QA' },
          { x: 320, y: 70, l: 'RAG' },
          { x: 200, y: 25, l: 'PLAN' },
          { x: 200, y: 115, l: 'EXEC' },
        ].map((a, i) => (
          <g key={i}>
            <rect x={a.x - 22} y={a.y - 9} width="44" height="18" rx="4" fill="rgba(15,23,42,0.9)" stroke="#94a3b8" strokeWidth="0.7"/>
            <text x={a.x} y={a.y + 3} fill="#f8fafc" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle">{a.l}</text>
            <line x1={a.x} y1={a.y} x2="200" y2="70" stroke="#22d3ee" strokeWidth="0.5" opacity="0.4" strokeDasharray="2 2"/>
          </g>
        ))}
      </svg>
    </Frame>
  );
}

/* 8. Vision — bounding boxes */
export function vision() {
  return (
    <Frame label="VISION · DETECTION">
      <svg viewBox="0 0 400 140" preserveAspectRatio="none">
        <rect x="20" y="15" width="360" height="110" fill="rgba(148,163,184,0.04)" stroke="rgba(148,163,184,0.15)" strokeWidth="0.5"/>
        <g>
          <rect x="50" y="35" width="90" height="70" fill="none" stroke="#22d3ee" strokeWidth="1.2"/>
          <rect x="50" y="25" width="60" height="12" fill="#22d3ee"/>
          <text x="54" y="34" fill="#04121b" fontSize="8" fontFamily="var(--font-mono)" fontWeight="600">obj · 0.97</text>
        </g>
        <g>
          <rect x="180" y="55" width="60" height="55" fill="none" stroke="#3b82f6" strokeWidth="1"/>
          <rect x="180" y="45" width="50" height="11" fill="#3b82f6"/>
          <text x="184" y="53" fill="#04121b" fontSize="7.5" fontFamily="var(--font-mono)" fontWeight="600">item · 0.88</text>
        </g>
        <g>
          <rect x="280" y="40" width="80" height="65" fill="none" stroke="#22d3ee" strokeWidth="1" strokeDasharray="3 2"/>
          <text x="282" y="35" fill="#22d3ee" fontSize="7.5" fontFamily="var(--font-mono)">scan...</text>
        </g>
      </svg>
    </Frame>
  );
}

/* 9. Voice — waveform */
export function voice() {
  const bars = Array.from({ length: 60 }, (_, i) => {
    const t = i / 60;
    const rawV = Math.abs(Math.sin(t * Math.PI * 4)) * (0.5 + Math.sin(t * Math.PI * 1.5) * 0.4) * 50 + 5;
    return Number(rawV.toFixed(2));
  });
  return (
    <Frame label="WAVEFORM · NLP">
      <svg viewBox="0 0 400 140" preserveAspectRatio="none">
        {bars.map((v, i) => {
          const x = Number((20 + i * 6.3).toFixed(2));
          const y = Number((70 - v / 2).toFixed(2));
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width="3"
              height={v}
              rx="1.5"
              fill={i >= 20 && i <= 38 ? '#22d3ee' : 'rgba(148,163,184,0.4)'}
            />
          );
        })}
        <line x1="200" y1="20" x2="200" y2="120" stroke="#22d3ee" strokeWidth="0.8" opacity="0.6"/>
        <circle cx="200" cy="20" r="3" fill="#22d3ee"/>
      </svg>
    </Frame>
  );
}

/* 10. Global — globe with arcs */
export function global() {
  return (
    <Frame label="GLOBAL · EXPANSION">
      <svg viewBox="0 0 400 140" preserveAspectRatio="none">
        <ellipse cx="200" cy="70" rx="60" ry="60" fill="none" stroke="rgba(148,163,184,0.3)" strokeWidth="0.6"/>
        <ellipse cx="200" cy="70" rx="60" ry="22" fill="none" stroke="rgba(148,163,184,0.2)" strokeWidth="0.5"/>
        <ellipse cx="200" cy="70" rx="22" ry="60" fill="none" stroke="rgba(148,163,184,0.2)" strokeWidth="0.5"/>
        <line x1="140" y1="70" x2="260" y2="70" stroke="rgba(148,163,184,0.2)" strokeWidth="0.5"/>
        <path d="M50,90 Q120,10 200,40" stroke="#22d3ee" strokeWidth="1" fill="none" className={vizStyles.draw}/>
        <path d="M200,40 Q300,20 360,80" stroke="#22d3ee" strokeWidth="1" fill="none" className={vizStyles.draw} style={{ animationDelay: '0.3s' }}/>
        <path d="M50,90 Q150,130 200,110" stroke="#3b82f6" strokeWidth="0.8" fill="none" opacity="0.6" className={vizStyles.draw} style={{ animationDelay: '0.6s' }}/>
        {[[50,90],[200,40],[360,80],[200,110],[140,60],[280,90]].map(([x,y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="3" fill="#22d3ee"/>
            <circle cx={x} cy={y} r="6" fill="none" stroke="#22d3ee" strokeWidth="0.6" opacity="0.5" className={vizStyles.pulse}/>
          </g>
        ))}
      </svg>
    </Frame>
  );
}

/* 11. Alliances — node graph */
export function alliances() {
  const peers = [
    { x: 80, y: 35 }, { x: 80, y: 105 }, { x: 320, y: 35 },
    { x: 320, y: 105 }, { x: 200, y: 20 }, { x: 200, y: 120 },
  ];
  return (
    <Frame label="PARTNERS · NETWORK">
      <svg viewBox="0 0 400 140" preserveAspectRatio="none">
        {peers.map((p, i) => (
          <line key={i} x1="200" y1="70" x2={p.x} y2={p.y}
            stroke="#22d3ee" strokeWidth="0.6"
            opacity={0.3 + (i % 2) * 0.3}
            className={i % 2 === 0 ? vizStyles.pulse : undefined}/>
        ))}
        {peers.map((p, i) => (
          <g key={`p${i}`}>
            <circle cx={p.x} cy={p.y} r="8" fill="rgba(15,23,42,0.9)" stroke="#94a3b8" strokeWidth="0.8"/>
            <circle cx={p.x} cy={p.y} r="3" fill={i % 2 ? '#22d3ee' : '#3b82f6'}/>
          </g>
        ))}
        <circle cx="200" cy="70" r="16" fill="rgba(34,211,238,0.15)" stroke="#22d3ee" strokeWidth="1.2"/>
        <circle cx="200" cy="70" r="6" fill="#22d3ee" className={vizStyles.pulse}/>
      </svg>
    </Frame>
  );
}

/* 12. Radar — pentagon */
export function radar() {
  const cx = 200, cy = 70;
  const angles = [-Math.PI/2, -Math.PI/2 + 2*Math.PI/5, -Math.PI/2 + 4*Math.PI/5, -Math.PI/2 + 6*Math.PI/5, -Math.PI/2 + 8*Math.PI/5];
  const polyAt = (r: number) => angles.map(a => `${(cx + Math.cos(a)*r).toFixed(2)},${(cy + Math.sin(a)*r).toFixed(2)}`).join(' ');
  const values = [0.85, 0.55, 0.72, 0.62, 0.78];
  const dataPoly = angles.map((a, i) => `${(cx + Math.cos(a)*55*values[i]).toFixed(2)},${(cy + Math.sin(a)*55*values[i]).toFixed(2)}`).join(' ');
  return (
    <Frame label="MARKET · RADAR">
      <svg viewBox="0 0 400 140" preserveAspectRatio="none">
        {[20, 35, 50, 60].map((r, i) => (
          <polygon key={i} points={polyAt(r)} fill="none" stroke="rgba(148,163,184,0.18)" strokeWidth="0.5"/>
        ))}
        {angles.map((a, i) => {
          const x2 = Number((cx + Math.cos(a)*60).toFixed(2));
          const y2 = Number((cy + Math.sin(a)*60).toFixed(2));
          return (
            <line key={i} x1={cx} y1={cy} x2={x2} y2={y2} stroke="rgba(148,163,184,0.15)" strokeWidth="0.5"/>
          );
        })}
        <polygon points={dataPoly} fill="#22d3ee" fillOpacity="0.2" stroke="#22d3ee" strokeWidth="1.2"/>
        {angles.map((a, i) => {
          const circleCx = Number((cx + Math.cos(a)*55*values[i]).toFixed(2));
          const circleCy = Number((cy + Math.sin(a)*55*values[i]).toFixed(2));
          return (
            <circle key={i} cx={circleCx} cy={circleCy} r="2.5" fill="#22d3ee"/>
          );
        })}
      </svg>
    </Frame>
  );
}

/* 13. Product — MVP sketch */
export function product() {
  return (
    <Frame label="MVP · SKETCH">
      <svg viewBox="0 0 400 140" preserveAspectRatio="none">
        <rect x="80" y="20" width="240" height="100" rx="6" fill="none" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="3 2"/>
        <line x1="80" y1="38" x2="320" y2="38" stroke="#94a3b8" strokeWidth="0.5" opacity="0.5"/>
        <rect x="92" y="48" width="60" height="60" rx="3" fill="#22d3ee" opacity="0.15" stroke="#22d3ee" strokeWidth="0.8"/>
        <line x1="92" y1="48" x2="152" y2="108" stroke="#22d3ee" strokeWidth="0.4" opacity="0.5"/>
        <line x1="152" y1="48" x2="92" y2="108" stroke="#22d3ee" strokeWidth="0.4" opacity="0.5"/>
        <rect x="162" y="48" width="146" height="14" rx="2" fill="rgba(148,163,184,0.15)"/>
        <rect x="162" y="68" width="100" height="8" rx="2" fill="rgba(148,163,184,0.1)"/>
        <rect x="162" y="82" width="120" height="8" rx="2" fill="rgba(148,163,184,0.1)"/>
        <rect x="162" y="96" width="60" height="12" rx="2" fill="#22d3ee" opacity="0.5"/>
      </svg>
    </Frame>
  );
}
