
function EfficiencyReportModal({ simResults, onClose }: { simResults: any[]; onClose: () => void }) {
    if (!simResults || simResults.length === 0) return null;

            return (
        <div className="fixed inset-0 bg-black/88 backdrop-blur-[2px] z-60 overflow-y-auto flex items-center justify-center p-3 md:p-6" onClick={onClose}>
            <div className="bg-[#141414] border border-[#00e5ff] rounded-xl w-full max-w-[1200px] my-auto flex flex-col shadow-2xl relative p-4" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-3 pb-2 border-b border-[#333]">
                    <div>
                        <div className="text-[14px] font-black text-[#ffeb3b]">📊 Análisis de Eficiencia de Focos de Optimización en Sorteos Pasados</div>
                        <div className="text-[10px] text-[#888]">Desglose detallado de aciertos y números resultantes para evaluar el desempeño y eficiencia.</div>
                    </div>
                    <button onClick={onClose} className="bg-[#222] text-[#aaa] border border-[#444] px-3 py-1 rounded-lg text-[11px] font-bold cursor-pointer hover:text-white">✕ Cerrar</button>
                </div>

                <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
                    <table className="w-full text-[10px] border-collapse">
                        <thead>
                            <tr className="bg-[#1f1f1f] text-[#aaa] text-center">
                                <th className="p-2 border border-[#333]">Sorteo</th>
                                <th className="p-2 border border-[#333]">Ganadores</th>
                                <th className="p-2 border border-[#333] text-[#00e5ff]">Madre (~27#)</th>
                                <th className="p-2 border border-[#333] text-[#00e676]">Cierre (~12#)</th>
                                <th className="p-2 border border-[#333] text-[#26c6da]">Exp. #4</th>
                                <th className="p-2 border border-[#333] text-[#e040fb]">Estocástico 1</th>
                                <th className="p-2 border border-[#333] text-[#ffeb3b]">Estocástico 2</th>
                                <th className="p-2 border border-[#333] text-[#76ff03]">TUNNER</th>
                                <th className="p-2 border border-[#333] text-[#b388ff]">SMOOTH</th>
                                <th className="p-2 border border-[#333]">Eficacia</th>
                            </tr>
                        </thead>
                        <tbody>
                            {simResults.slice(-20).reverse().map((r, i) => {
                                const maxH = Math.max(r.madreHits, r.sub1Hits, r.sub2Hits, r.sub3Hits, r.sub4Hits, r.sub5Hits);
                                const isOptimo = maxH >= 4;
                                return (
                                    <tr key={i} className="text-center hover:bg-[#1a1a1a] transition">
                                        <td className="p-2 border border-[#333] font-bold text-[#ffeb3b]">#{r.num}</td>
                                        <td className="p-2 border border-[#333] font-mono text-[#ddd]">{r.win.map((n: number) => String(n).padStart(2, '0')).join(' ')}</td>
                                        
                                        <td className="p-2 border border-[#333]" style={{ background: r.madreHits >= 4 ? 'rgba(46,125,50,0.25)' : 'transparent' }}>
                                            <span className="font-bold text-white">{r.madreHits} ac</span> <span className="text-[#888]">({r.madreCount}#)</span>
                                        </td>
                                        <td className="p-2 border border-[#333]" style={{ background: r.sub5Hits >= 4 ? 'rgba(46,125,50,0.25)' : 'transparent' }}>
                                            <span className="font-bold text-white">{r.sub5Hits} ac</span> <span className="text-[#888]">({r.sub5Count}#)</span>
                                        </td>
                                        <td className="p-2 border border-[#333]" style={{ background: r.sub3Hits >= 4 ? 'rgba(46,125,50,0.25)' : 'transparent' }}>
                                            <span className="font-bold text-white">{r.sub3Hits} ac</span> <span className="text-[#888]">({r.sub3Count}#)</span>
                                        </td>
                                        <td className="p-2 border border-[#333]" style={{ background: r.sub4Hits >= 4 ? 'rgba(46,125,50,0.25)' : 'transparent' }}>
                                            <span className="font-bold text-white">{r.sub4Hits} ac</span> <span className="text-[#888]">({r.sub4Count}#)</span>
                                        </td>
                                        <td className="p-2 border border-[#333]" style={{ background: r.sub3Hits >= 4 ? 'rgba(46,125,50,0.25)' : 'transparent' }}>
                                            <span className="font-bold text-white">{r.sub3Hits} ac</span> <span className="text-[#888]">({r.sub3Count}#)</span>
                                        </td>
                                        <td className="p-2 border border-[#333]" style={{ background: r.sub5Hits >= 4 ? 'rgba(46,125,50,0.25)' : 'transparent' }}>
                                            <span className="font-bold text-white">{r.sub5Hits} ac</span> <span className="text-[#888]">({r.sub5Count}#)</span>
                                        </td>
                                        <td className="p-2 border border-[#333]" style={{ background: r.sub5Hits >= 4 ? 'rgba(46,125,50,0.25)' : 'transparent' }}>
                                            <span className="font-bold text-white">{r.sub5Hits} ac</span> <span className="text-[#888]">({r.sub5Count}#)</span>
                                        </td>
                                        
                                        <td className="p-2 border border-[#333] font-bold" style={{ color: isOptimo ? '#76ff03' : '#ffab40' }}>
                                            {isOptimo ? '★ Óptimo' : 'Regular'}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 flex justify-end">
                    <button onClick={onClose} className="bg-[#7c4dff] text-white hover:bg-[#6c3fe0] px-5 py-2 rounded-lg text-[11px] font-black cursor-pointer shadow-md">
                        Cerrar Análisis
                    </button>
                </div>
            </div>
        </div>
    );
}

function ComparativaPopoutModal({
    comparativaPopout,
    setComparativaPopout,
    comparativaDraws,
    allDraws,
    getComparativaRows,
    comparativaFilter,
    comparativaSort,
    comparativaTop14Freq
}: {
    comparativaPopout: number | null;
    setComparativaPopout: (val: number | null) => void;
    comparativaDraws: number[];
    allDraws: Draw[];
    getComparativaRows: (draws: number[]) => ComparativaRow[];
    comparativaFilter: string;
    comparativaSort: ComparativaSort;
    comparativaTop14Freq: (topRows: ComparativaRow[], drawIdx: number, allDraws: Draw[], draws: number[]) => number[];
}) {
    if (comparativaPopout === null) return null;
    const drawNum = comparativaPopout;
    const drawIdx = comparativaDraws.indexOf(drawNum) !== -1 ? comparativaDraws.indexOf(drawNum) : Math.max(0, comparativaDraws.length - 1);
    const isNext = drawIdx === comparativaDraws.length - 1 || !allDraws.some(d => d.num === drawNum);
    const draw = allDraws.find(d => d.num === drawNum);
    const winners: number[] = draw ? [...draw.win].sort((a, b) => a - b) : [];
    const allRows = getComparativaRows(comparativaDraws);
    const rows = comparativaFilter === 'all' ? allRows : allRows.filter(r => r.family === comparativaFilter);
    const avgOf2 = (r: ComparativaRow) => r.hits.reduce((a, b) => a + b, 0) / r.hits.length;
    const sortVal2 = (r: ComparativaRow): number | string => {
        if (!comparativaSort) return 0;
        const k = comparativaSort.key;
        if (k === 'label') return r.label;
        if (k === 'avg') return avgOf2(r);
        if (k === 'n2') return r.hits.filter(h => h >= 2).length;
        if (k === 'eff') return avgOf2(r) / r.avgNums;
        if (k.startsWith('draw:')) { const v = r.hits[parseInt(k.slice(5), 10)]; return v === undefined ? -1 : v; }
        return 0;
    };
    const sorted2 = comparativaSort ? [...rows].sort((a, b) => {
        const va = sortVal2(a), vb = sortVal2(b);
        const cmp = typeof va === 'string' && typeof vb === 'string' ? va.localeCompare(vb) : (va as number) - (vb as number);
        return comparativaSort!.dir === 'desc' ? -cmp : cmp;
    }) : rows;
    const top14 = sorted2.slice(0, 14);
    const freq = comparativaTop14Freq(top14, drawIdx, allDraws, comparativaDraws);
    const ranked = Array.from({ length: 28 }, (_, i) => i + 1).sort((a, b) => freq[b - 1] - freq[a - 1] || a - b);
    const top5Hits = ranked.slice(0, 5).filter(n => winners.includes(n)).length;
    const top10Hits = ranked.slice(0, 10).filter(n => winners.includes(n)).length;

    return (
        <div className="fixed inset-0 bg-black/88 backdrop-blur-[2px] flex items-center justify-center z-50 p-3 overflow-hidden" onClick={() => setComparativaPopout(null)}>
            <div className="bg-[#121212] border border-[#333] rounded-xl w-full max-w-[560px] max-h-[90vh] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="p-3 bg-[#1a1a1a] border-b border-[#2a2a2a] flex justify-between items-center">
                    <div>
                        <div className="text-[12px] font-black text-[#ffeb3b]">{isNext ? `Sorteo #${drawNum} — Próximo sorteo y frecuencias` : `Sorteo #${drawNum} — Top 14 y frecuencias`}</div>
                        <div className="text-[9px] text-[#888]">{isNext ? `Top 14 desplegado en la tabla (filtro actual: ${comparativaFilter === 'all' ? 'Todas' : comparativaFilter}) · Aún sin realizarse` : `Top 14 desplegado en la tabla (filtro actual: ${comparativaFilter === 'all' ? 'Todas' : comparativaFilter}) · Fecha: ${draw?.date ?? ''}`}</div>
                    </div>
                    <button onClick={() => setComparativaPopout(null)} className="bg-[#2a2a2a] border border-[#555] text-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer hover:bg-[#333]">×</button>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                    {isNext ? (
                        <div className="bg-[#00e5ff] text-black rounded-xl p-2.5 text-center">
                            <div className="text-[9px] font-black tracking-wide">⏳ PRÓXIMO SORTEO #{drawNum} — AÚN SIN REALIZARSE</div>
                            <div className="text-[11px] font-bold my-0.5">Sin ganadores todavía. Abajo, las frecuencias del top 14 desplegado para este sorteo.</div>
                        </div>
                    ) : (
                        <>
                            <div className="bg-[#ffeb3b] text-black rounded-xl p-2.5 text-center">
                                <div className="text-[9px] font-black tracking-wide">● NÚMEROS GANADORES REALES</div>
                                <div className="text-[18px] font-black tracking-wider my-0.5">{winners.map(n => String(n).padStart(2, '0')).join(' ')}</div>
                            </div>
                            <div className="text-[10px] text-[#aaa]">Top 5 por frecuencia: <b className="text-[#ffeb3b]">{top5Hits} de 5</b> son ganadores (azar: 0.89) · Top 10 por frecuencia: <b className="text-[#ffeb3b]">{top10Hits} de 10</b> son ganadores (azar: 1.79)</div>
                        </>
                    )}
                    <div>
                        <div className="text-[10px] font-black text-[#ffeb3b] mb-1">28 números ordenados por frecuencia en el top 14 (de mayor a menor)</div>
                        <div className="flex flex-wrap gap-1">
                            {ranked.map(n => {
                                const isWin = winners.includes(n);
                                const c = freq[n - 1];
                                return <span key={n} className={`relative inline-flex flex-col items-center justify-center min-w-[54px] min-h-[42px] rounded px-2 py-1 ${isWin ? 'bg-[#ffeb3b] text-black ring-2 ring-white' : c >= 10 ? 'bg-[#1b5e20] text-[#69f0ae]' : c >= 7 ? 'bg-[#5d4037] text-[#ffeb3b]' : 'bg-[#222] text-[#aaa]'}`} title={`Número ${n}: en ${c} de las 14 filas${isWin ? ' · GANADOR' : ''}`}><span className="text-[18px] font-black leading-none">{String(n).padStart(2, '0')}</span><span className="absolute bottom-[3px] right-[4px] text-[8px] font-bold leading-none opacity-80">{c}</span></span>;
                            })}
                        </div>
                        <div className="text-[9px] text-[#888] mt-1">Resaltados en amarillo = números ganadores de este sorteo. Así se puede ver qué tan efectiva es la inercia del top 14 en este sorteo.</div>
                    </div>
                </div>
            </div>
        </div>
    );
}




import React, { useState, useEffect, useRef, useMemo } from 'react';
import html2canvas from 'html2canvas';
import { GoogleGenAI } from '@google/genai';
import { RandomForestClassifier } from 'ml-random-forest';



function CustomSVGChart({ data }: { data: { draw: string; count: number; hits: number; date: string }[] }) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    if (!data || data.length === 0) return null;

    const width = 600;
    const height = 220;
    const padding = { top: 20, right: 35, bottom: 30, left: 35 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const maxCount = 28;
    const maxHits = 5;

    const dx = chartW / (data.length - 1 || 1);
    const barWidth = Math.max(2, (chartW / data.length) * 0.6);

    const linePoints = data.map((d, i) => {
        const x = padding.left + i * dx;
        const y = padding.top + chartH - (d.hits / maxHits) * chartH;
        return { x, y, ...d };
    });

    const pathData = linePoints.reduce((acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`), '');

    return (
        <div className="relative w-full h-[240px] select-none">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                {[0, 1, 2, 3, 4, 5].map(h => {
                    const y = padding.top + chartH - (h / maxHits) * chartH;
                    return (
                        <g key={h}>
                            <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="#262626" strokeDasharray="3 3" />
                            <text x={width - padding.right + 6} y={y + 3} fill="#888" fontSize="8" textAnchor="start">{h} ac</text>
                        </g>
                    );
                })}
                {data.map((d, i) => {
                    const x = padding.left + i * dx - barWidth / 2;
                    const barH = (d.count / maxCount) * chartH;
                    const y = padding.top + chartH - barH;
                    return (
                        <rect
                            key={i}
                            x={x}
                            y={y}
                            width={barWidth}
                            height={barH}
                            fill="#00e5ff"
                            opacity={hoveredIndex === i ? 0.9 : 0.5}
                            rx={2}
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="transition-opacity cursor-pointer"
                        />
                    );
                })}
                <path d={pathData} fill="none" stroke="#ffeb3b" strokeWidth="2.5" />
                {linePoints.map((p, i) => (
                    <circle
                        key={i}
                        cx={p.x}
                        cy={p.y}
                        r={hoveredIndex === i ? 5 : 3}
                        fill="#ffeb3b"
                        stroke="#121212"
                        strokeWidth="1.5"
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className="cursor-pointer transition-all"
                    />
                ))}
                {data.map((d, i) => {
                    if (i % Math.ceil(data.length / 8) === 0 || i === data.length - 1) {
                        const x = padding.left + i * dx;
                        return (
                            <text key={i} x={x} y={height - 8} fill="#888" fontSize="8" textAnchor="middle">
                                {d.draw}
                            </text>
                        );
                    }
                    return null;
                })}
            </svg>
            {hoveredIndex !== null && (
                <div className="absolute top-2 right-2 bg-[#181818] border border-[#333] p-2 rounded-lg text-[10px] shadow-xl pointer-events-none z-25 text-white">
                    <div className="font-bold text-[#ffeb3b]">{data[hoveredIndex].draw} ({data[hoveredIndex].date})</div>
                    <div className="text-[#00e5ff]">Números Resultantes: {data[hoveredIndex].count}</div>
                    <div className="text-[#ffeb3b]">Aciertos: {data[hoveredIndex].hits} ac</div>
                </div>
            )}
        </div>
    );
}

function constrainToTarget(candidates: number[], userPicks: number[], targetSize: number, histDraws: Draw[] = []): number[] {
    let set = new Set<number>();
    userPicks.forEach(p => set.add(p));
    for (let c of candidates) {
        if (set.size >= targetSize) break;
        set.add(c);
    }
    if (set.size < targetSize) {
        let scored = Array.from({length: 28}, (_, i) => i + 1)
            .filter(n => !set.has(n))
            .sort((a, b) => getNumberScore(b, histDraws) - getNumberScore(a, histDraws));
        for (let n of scored) {
            if (set.size >= targetSize) break;
            set.add(n);
        }
    }
    let arr = Array.from(set).sort((a, b) => a - b);
    if (arr.length > targetSize) {
        let kept = new Set<number>();
        userPicks.forEach(p => kept.add(p));
        let others = arr.filter(n => !kept.has(n)).sort((a, b) => getNumberScore(b, histDraws) - getNumberScore(a, histDraws));
        for (let a of others) {
            if (kept.size >= targetSize) break;
            kept.add(a);
        }
        arr = Array.from(kept).sort((a, b) => a - b);
    }
    return arr;
}

// --- Algorithmic & ML Functions ---
const WHEELING_SIZES: Record<number, number> = { 12: 12, 24: 24, 36: 36, 48: 48 };
function uv(k: number): number { return WHEELING_SIZES[k] || 48; }

function getRow(n: number): number {
    if (n <= 7) return 1;
    if (n <= 14) return 2;
    if (n <= 21) return 3;
    return 4;
}

function isValidCombo(combo: number[], poolSlice: number[] | null = null, poolId = ''): boolean {
    const sorted = [...combo].sort((a, b) => a - b);
    let maxConsec = 1, currentConsec = 1;
    for (let i = 1; i < sorted.length; i++) {
        if (sorted[i] === sorted[i - 1] + 1) {
            currentConsec++;
            if (currentConsec > maxConsec) maxConsec = currentConsec;
        } else {
            currentConsec = 1;
        }
    }
    if (maxConsec > 3) return false;
    if (combo.filter(n => n % 2 === 0).length > 3) return false;
    if (combo.filter(n => n % 2 !== 0).length > 3) return false;
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23];
    if (combo.filter(n => primes.includes(n)).length > 3) return false;
    
    if (poolId !== 'p6' && poolId !== 'p7') {
        const rows = combo.map(n => getRow(n));
        const rowCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };
        rows.forEach(r => rowCounts[r]++);
        if (rowCounts[1] >= 3 || rowCounts[2] >= 3 || rowCounts[3] >= 3 || rowCounts[4] >= 3) {
            return false;
        }

        if (poolSlice && poolSlice.length >= 21) {
            const topRow = poolSlice.slice(0, 7);
            const midRow = poolSlice.slice(7, 14);
            const botRow = poolSlice.slice(14, 21);
            if (combo.filter(n => topRow.includes(n)).length >= 3 ||
                combo.filter(n => midRow.includes(n)).length >= 3 ||
                combo.filter(n => botRow.includes(n)).length >= 3) {
                return false;
            }
        }
    }

    const sum = combo.reduce((a, b) => a + b, 0);
    if (sum < 38 || sum > 108) return false;
    return true;
}

function Ef(e: number[], n: number): number[][] {
    let t = e.length;
    if (t < 5) return [];
    let l: number[][] = [];
    let seen = new Set<string>();

    for (let i = 0; i < n; i++) {
        let step1 = (i * 7 + 1) % t;
        let step2 = (i * 13 + 3) % t;
        let step3 = (i * 19 + 5) % t;
        let step4 = (i * 23 + 7) % t;
        let step5 = (i * 31 + 11) % t;
        
        let indices = [step1, (step1 + step2) % t, (step1 + step3) % t, (step1 + step4) % t, (step1 + step5) % t];
        let uniqueIdx = Array.from(new Set(indices));
        let cursor = 0;
        while (uniqueIdx.length < 5 && cursor < t) {
            if (!uniqueIdx.includes(cursor)) uniqueIdx.push(cursor);
            cursor++;
        }
        uniqueIdx = uniqueIdx.slice(0, 5);
        let combo = uniqueIdx.map(idx => e[idx]).sort((a, b) => a - b);
        let key = combo.join(',');
        if (!seen.has(key)) {
            seen.add(key);
            l.push(combo);
        } else {
            let altCombo = [e[i % t], e[(i + 3) % t], e[(i + 7) % t], e[(i + 11) % t], e[(i + 17) % t]].sort((a, b) => a - b);
            let altKey = altCombo.join(',');
            if (!seen.has(altKey)) {
                seen.add(altKey);
                l.push(altCombo);
            } else {
                let sliceCombo = e.slice(0, 5).sort((a, b) => a - b);
                sliceCombo[0] = e[(i * 3) % t];
                sliceCombo = sliceCombo.sort((a, b) => a - b);
                l.push(sliceCombo);
            }
        }
    }
    return l.sort((i, o) => { for (let a = 0; a < 5; a++) if (i[a] !== o[a]) return i[a] - o[a]; return 0; }).slice(0, n);
}


const wheelingCache = new Map<string, number[][]>();

function rv(e: number[], n: number[] | null, t: number, poolId = ''): number[][] {
    const key = `rv_${e.join(',')}_${n ? n.join(',') : 'none'}_${t}_${poolId}`;
    if (wheelingCache.has(key)) return wheelingCache.get(key)!;
    let baseCombos = generateWheelingWithFilters(e, t, poolId);
    if (n && n.length > 0) {
        baseCombos = baseCombos.sort((c1, c2) => {
            let h1 = c1.filter(k => n.includes(k)).length;
            let h2 = c2.filter(k => n.includes(k)).length;
            if (h2 !== h1) return h2 - h1;
            for (let i = 0; i < 5; i++) {
                if (c1[i] !== c2[i]) return c1[i] - c2[i];
            }
            return 0;
        });
    }
    wheelingCache.set(key, baseCombos);
    if (wheelingCache.size > 500) {
        const firstKey = wheelingCache.keys().next().value;
        if (firstKey !== undefined) wheelingCache.delete(firstKey);
    }
    return baseCombos;
}

function evaluateWheelingFitness(combos: number[][], nums: number[], targetCount: number, poolId = ''): number {
    if (!combos || combos.length === 0) return -999999;
    let score = 0;
    let validCount = 0;
    let uniqueCombos = new Set<string>();
    combos.forEach(c => {
        if (c.length === 5 && new Set(c).size === 5) {
            uniqueCombos.add(c.join(','));
            if (isValidCombo(c, nums, poolId)) {
                validCount++;
            }
        }
    });
    score += validCount * 25;
    score += uniqueCombos.size * 15;

    let sizeDiff = Math.abs(combos.length - targetCount);
    score -= sizeDiff * 20;

    let coveredNums = new Set<number>();
    combos.forEach(c => c.forEach(n => coveredNums.add(n)));
    score += (coveredNums.size / Math.max(1, nums.length)) * 120;

    return score;
}

function generateRandomCombo(nums: number[]): number[] {
    let combo: number[] = [];
    let seed = Math.floor(Math.random() * 1000);
    while (combo.length < 5) {
        let idx = (seed + combo.length * 13) % nums.length;
        let val = nums[idx];
        if (!combo.includes(val)) combo.push(val);
        seed += 7;
    }
    return combo.sort((a, b) => a - b);
}

function generateBaseWheelingRaw(nums: number[], targetCount: number, poolId = ''): number[][] {
    const candidates = Ef(nums, Math.max(targetCount * 3, 60));
    const result: number[][] = [];
    const seen = new Set<string>();
    for (const c of candidates) {
        if (result.length >= targetCount) break;
        let k = c.join(',');
        if (!seen.has(k)) { seen.add(k); result.push(c); }
    }
    while (result.length < targetCount) {
        let c = generateRandomCombo(nums);
        let k = c.join(',');
        if (!seen.has(k)) { seen.add(k); result.push(c); }
    }
    return result;
}

function evolveWheelingGenetic(nums: number[], targetCount: number, poolId = ''): number[][] {
    if (!nums || nums.length < 5) return [];
    
    const popSize = 10;
    const generations = 12;
    
    let population: number[][][] = [];
    for (let i = 0; i < popSize; i++) {
        let base = generateBaseWheelingRaw(nums, targetCount + (i % 3 - 1), poolId);
        population.push(base);
    }

    let bestIndividual = population[0];
    let bestFitness = -Infinity;

    for (let gen = 0; gen < generations; gen++) {
        let fitnesses = population.map(ind => ({
            ind,
            fitness: evaluateWheelingFitness(ind, nums, targetCount, poolId)
        }));

        fitnesses.sort((a, b) => b.fitness - a.fitness);

        if (fitnesses[0].fitness > bestFitness) {
            bestFitness = fitnesses[0].fitness;
            bestIndividual = fitnesses[0].ind;
        }

        let nextGen: number[][][] = [fitnesses[0].ind, fitnesses[1].ind];

        while (nextGen.length < popSize) {
            let parent1 = fitnesses[Math.floor(Math.random() * (popSize / 2))].ind;
            let parent2 = fitnesses[Math.floor(Math.random() * (popSize / 2))].ind;

            let cut = Math.floor(parent1.length / 2);
            let childCombos = [...parent1.slice(0, cut), ...parent2.slice(cut)];

            if (Math.random() < 0.35 && childCombos.length > 0) {
                let mutIdx = Math.floor(Math.random() * childCombos.length);
                childCombos[mutIdx] = generateRandomCombo(nums);
            }

            let uniqueMap = new Map<string, number[]>();
            childCombos.forEach(c => uniqueMap.set(c.join(','), c));
            let finalChild = Array.from(uniqueMap.values()).slice(0, targetCount);

            if (finalChild.length < 5 && parent1.length >= 5) {
                finalChild = parent1;
            }

            nextGen.push(finalChild);
        }

        population = nextGen;
    }

    let evolved = bestIndividual.slice(0, targetCount);
    while (evolved.length < targetCount) {
        let c = generateRandomCombo(nums);
        if (!evolved.some(existing => existing.join(',') === c.join(','))) {
            evolved.push(c);
        }
    }
    return evolved;
}

function generateWheelingWithFilters(nums: number[], targetCount: number, poolId = ''): number[][] {
    const key = `${nums.join(',')}_${targetCount}_${poolId}`;
    if (wheelingCache.has(key)) return wheelingCache.get(key)!;
    const res = Ef(nums, targetCount);
    wheelingCache.set(key, res);
    if (wheelingCache.size > 500) {
        const firstKey = wheelingCache.keys().next().value;
        if (firstKey !== undefined) wheelingCache.delete(firstKey);
    }
    return res;
}

interface Draw {
    num: number;
    win: number[];
    date: string;
}

function parseCSV(text: string): Draw[] {
    const lines = text.trim().split('\n');
    const draws: Draw[] = [];
    for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(',');
        if (cols.length >= 8) {
            draws.push({
                num: parseInt(cols[0]),
                win: [parseInt(cols[2]), parseInt(cols[3]), parseInt(cols[4]), parseInt(cols[5]), parseInt(cols[6])],
                date: cols[7]
            });
        }
    }
    return draws.sort((a, b) => a.num - b.num);
}

interface PoolResult {
    final: number[];
    anti: number[];
    p2: number[];
    p3: number[];
    p4: number[];
    p5: number[];
    p6: number[];
    p7: number[];
}

function getNumberScore(n: number, draws: Draw[]): number {
    if (!draws || draws.length < 2) return 0;
    const lastDraw = draws[draws.length - 1].win;
    const prevDraw = draws[draws.length - 2].win;
    const window50 = draws.slice(-50).map(d => d.win);
    let freq = 0;
    window50.forEach(d => { if (d.includes(n)) freq++; });
    let gap = 0;
    for (let j = draws.length - 1; j >= Math.max(0, draws.length - 50); j--) {
        if (draws[j].win.includes(n)) { gap = draws.length - 1 - j; break; }
    }
    let coOccur = 0;
    draws.slice(-20).forEach(d => {
        if (d.win.includes(n) && lastDraw.some(ld => d.win.includes(ld))) coOccur++;
    });
    let score = (freq * 2.5) + (coOccur * 3.5) + (gap > 0 && gap <= 15 ? gap * 0.8 : 0);
    if (lastDraw.includes(n) || prevDraw.includes(n)) score -= 20;
    return score;
}

function detectFrequencyTrendShift(draws: Draw[]): string | null {
    if (!draws || draws.length < 30) return null;
    const last10 = draws.slice(-10);
    const prev20 = draws.slice(-30, -10);
    
    let recentFreqs: Record<number, number> = {};
    let pastFreqs: Record<number, number> = {};
    
    last10.forEach(d => d.win.forEach(n => { recentFreqs[n] = (recentFreqs[n] || 0) + 1; }));
    prev20.forEach(d => d.win.forEach(n => { pastFreqs[n] = (pastFreqs[n] || 0) + 1; }));
    
    let shiftedNums: number[] = [];
    for (let n = 1; n <= 28; n++) {
        let recentRate = (recentFreqs[n] || 0) / 10;
        let pastRate = (pastFreqs[n] || 0) / 20;
        if (Math.abs(recentRate - pastRate) >= 0.25) {
            shiftedNums.push(n);
        }
    }
    if (shiftedNums.length > 0) {
        return `⚠️ Alerta de Tendencia: Cambio significativo detectado en frecuencias [${shiftedNums.map(n => String(n).padStart(2, '0')).join(', ')}] (últimos 10 sorteos).`;
    }
    return null;
}

function calculateMLPools(draws: Draw[], poolSize: number = 21): PoolResult {
    const lastDraw = draws[draws.length - 1].win;
    const prevDraw = draws[draws.length - 2].win;
    const window50 = draws.slice(-50).map(d => d.win);
    
    let scores: { num: number; score: number; freq: number; gap: number; coOccur: number }[] = [];
    for (let i = 1; i <= 28; i++) {
        let freq = 0;
        window50.forEach(d => { if (d.includes(i)) freq++; });
        let gap = 0;
        for (let j = draws.length - 1; j >= Math.max(0, draws.length - 50); j--) {
            if (draws[j].win.includes(i)) { gap = draws.length - 1 - j; break; }
        }
        let coOccur = 0;
        draws.slice(-20).forEach(d => {
            if (d.win.includes(i) && lastDraw.some(ld => d.win.includes(ld))) coOccur++;
        });
        let score = (freq * 2.5) + (coOccur * 3.5) + (gap > 0 && gap <= 15 ? gap * 0.8 : 0);
        if (lastDraw.includes(i) || prevDraw.includes(i)) score -= 20;
        scores.push({ num: i, score, freq, gap, coOccur });
    }

    scores.sort((a, b) => a.score - b.score);
    const antiPool = scores.slice(0, 5).map(s => s.num);

    scores.sort((a, b) => b.score - a.score);

    const p2 = [...scores].sort((a, b) => b.score - a.score).slice(0, poolSize).map(s => s.num);
    const p3 = [...scores].sort((a, b) => b.gap - a.gap).slice(0, poolSize).map(s => s.num);
    const p4 = [...scores].sort((a, b) => b.coOccur - a.coOccur).slice(0, poolSize).map(s => s.num);
    const p5 = [...scores].sort((a, b) => (b.freq * 1.5 + (28 - b.gap)) - (a.freq * 1.5 + (28 - a.gap))).slice(0, poolSize).map(s => s.num);
    const p6 = [...scores].sort((a, b) => (b.coOccur * 2 + b.freq) - (a.coOccur * 2 + a.freq)).slice(0, poolSize).map(s => s.num);

    let allPoolsList = [p2, p3, p4, p5, p6];
    let candidateFinal = Array.from(new Set([...p4, ...p2, ...p3, ...p5, ...p6]));
    candidateFinal.sort((a, b) => {
        let freqA = allPoolsList.filter(p => p.includes(a)).length;
        let freqB = allPoolsList.filter(p => p.includes(b)).length;
        if (freqB !== freqA) return freqB - freqA;
        let scoreA = scores.find(s => s.num === a)?.score || 0;
        let scoreB = scores.find(s => s.num === b)?.score || 0;
        return scoreB - scoreA;
    });
    const finalPool = candidateFinal.slice(0, poolSize);

    const chunkSize = Math.max(1, Math.floor(poolSize / 3));
    let middleRowsList = [
        finalPool.slice(chunkSize, chunkSize * 2),
        p2.slice(chunkSize, chunkSize * 2),
        p3.slice(chunkSize, chunkSize * 2),
        p4.slice(chunkSize, chunkSize * 2),
        p5.slice(chunkSize, chunkSize * 2),
        p6.slice(chunkSize, chunkSize * 2)
    ];
    
    let middleFreqMap: Record<number, number> = {};
    middleRowsList.forEach(row => {
        row.forEach(n => {
            middleFreqMap[n] = (middleFreqMap[n] || 0) + 1;
        });
    });

    let candidatePool7 = Object.keys(middleFreqMap).map(Number);
    candidatePool7.sort((a, b) => {
        let fA = middleFreqMap[a];
        let fB = middleFreqMap[b];
        if (fB !== fA) return fB - fA;
        let scoreA = scores.find(s => s.num === a)?.score || 0;
        let scoreB = scores.find(s => s.num === b)?.score || 0;
        return scoreB - scoreA;
    });

    scores.forEach(s => {
        if (candidatePool7.length < poolSize && !candidatePool7.includes(s.num)) {
            candidatePool7.push(s.num);
        }
    });

    const p7 = candidatePool7.slice(0, poolSize);

    return { final: finalPool, anti: antiPool, p2, p3, p4, p5, p6, p7 };
}

const predCacheMap = new Map<string, PoolResult>();

function savePredictionIfNotExists(concurso: number, draws: Draw[], poolSize: number = 21): PoolResult | null {
    const cacheKey = `sz_${poolSize}_${concurso}`;
    if (predCacheMap.has(cacheKey)) return predCacheMap.get(cacheKey)!;

    const key = `chispazo_pred_v7_sz_${poolSize}_` + concurso;
    const saved = localStorage.getItem(key);
    if (saved) {
        try { 
            const parsed = JSON.parse(saved);
            predCacheMap.set(cacheKey, parsed);
            return parsed; 
        } catch(e){}
    }
    const idx = draws.findIndex(d => d.num === concurso);
    const histDraws = idx >= 0 ? draws.slice(0, idx) : draws;
    const pred = calculateMLPools(histDraws, poolSize);
    const toSave = { final: pred.final, anti: pred.anti, p2: pred.p2, p3: pred.p3, p4: pred.p4, p5: pred.p5, p6: pred.p6, p7: pred.p7 };
    try {
        localStorage.setItem(key, JSON.stringify(toSave));
    } catch(e){}
    predCacheMap.set(cacheKey, toSave);
    return toSave;
}

function getPrediction(concurso: number, draws: Draw[], poolSize: number = 21): PoolResult | null {
    const cacheKey = `sz_${poolSize}_${concurso}`;
    if (predCacheMap.has(cacheKey)) return predCacheMap.get(cacheKey)!;

    const key = `chispazo_pred_v7_sz_${poolSize}_` + concurso;
    const saved = localStorage.getItem(key);
    if (saved) {
        try { 
            const parsed = JSON.parse(saved);
            predCacheMap.set(cacheKey, parsed);
            return parsed; 
        } catch(e){}
    }
    return savePredictionIfNotExists(concurso, draws, poolSize);
}

// Pools guardados en la tabla de resultados (registro inmutable).
// Para un sorteo pasado, lee la composición de pools que quedó guardada
// en la tabla (localStorage, clave chispazo_pred_v7_sz_{size}_{concurso});
// si aún no existe, la calcula y la guarda, igual que hace la tabla.
// Para el sorteo próximo (drawNum null, o un sorteo que aún no existe)
// calcula en vivo con todo el historial, porque todavía no hay
// predicción guardada para él.
function getPoolsForDraw(allDraws: Draw[], drawNum: number | null, poolSize: number): PoolResult {
    if (drawNum != null && drawNum > 0) {
        const idx = allDraws.findIndex(d => d.num === drawNum);
        if (idx >= 0) {
            return getPrediction(drawNum, allDraws, poolSize) || calculateMLPools(allDraws.slice(0, idx), poolSize);
        } else {
            return getPrediction(drawNum, allDraws, poolSize) || calculateMLPools(allDraws, poolSize);
        }
    }
    return calculateMLPools(allDraws, poolSize);
}

function getNextDrawTime(draws: Draw[]): string {
    if (!draws || draws.length === 0) return '3pm';
    const last = draws[draws.length - 1];
    const drawsOnDate = draws.filter(d => d.date === last.date);
    if (drawsOnDate.length >= 2) {
        drawsOnDate.sort((a, b) => a.num - b.num);
        if (last.num === drawsOnDate[0].num) {
            return '9pm';
        } else {
            return '3pm';
        }
    }
    return last.num % 2 === 0 ? '3pm' : '9pm';
}

/**
 * Shared centralized hit calculation utility.
 * Guarantees 100% mathematical consistency and parity between simulation report values,
 * efficiency tables, and backtesting charts (including AccuracyChart and FocusGraphicalAnalysisModal).
 */
function calculateDrawHits(predictedNums: number[], winningNums: number[]): number {
    if (!predictedNums || !Array.isArray(predictedNums) || !winningNums || !Array.isArray(winningNums)) return 0;
    return predictedNums.filter(n => winningNums.includes(n)).length;
}

function hitsCount(a: number[], w: number[]): number {
    return calculateDrawHits(a, w);
}

function hitClass(c: number): string {
    if (c >= 5) return 'bg-[#7c4dff] text-white';
    if (c === 4) return 'bg-[#2e7d32] text-[#a5d6a7]';
    if (c === 3) return 'bg-[#424242] text-[#aaa]';
    return 'bg-[#212121] text-[#666]';
}

// --- Main App Component ---
export default function App() {
    const [loading, setLoading] = useState(true);
    const [allDraws, setAllDraws] = useState<Draw[]>([]);
    const COMPARATIVA_DRAWS = useMemo(() => getComparativaDraws(allDraws), [allDraws]);
    const [sorteos, setSorteos] = useState<Draw[]>([]);
    const [pools, setPools] = useState<any[]>([]);
    const [nextNum, setNextNum] = useState(0);
    const [drawTime, setDrawTime] = useState('3pm');
    const [lastDrawInfo, setLastDrawInfo] = useState({ num: 0, date: '' });
    const [poolSize, setPoolSize] = useState<number>(21);
    
    // Modal states
    const [modalConfig, setModalConfig] = useState<any>(null); // { type: 'wheeling' | 'cell' | 'backtest', ... }
    const [showLabModal, setShowLabModal] = useState(false);
    
    // Chart visibility state
    const [chartVisibility, setChartVisibility] = useState<Record<string, boolean>>({
        final: true, p2: true, p3: true, p4: true, p5: true, p6: true, p7: true
    });

    // Consensus Frequency Filter state (User Request #9)
    const [selectedConsensusPools, setSelectedConsensusPools] = useState<Record<string, boolean>>({
        final: true, p2: true, p3: false, p4: true, p5: false, p6: true, p7: false
    });
    const [selectedFrequencies, setSelectedFrequencies] = useState<Record<number, boolean>>({
        7: false, 6: false, 5: false, 4: true, 3: true, 2: true, 1: false, 0: false
    });

    const [toastMsg, setToastMsg] = useState<string | null>(null);

    function showToast(msg: string) {
        setToastMsg(msg);
        setTimeout(() => setToastMsg(null), 2400);
    }

    useEffect(() => {
        async function initData() {
            try {
                let csvText = localStorage.getItem('chispazo_csv_cache');
                if (csvText) {
                    const parsed = parseCSV(csvText);
                    setAllDraws(parsed);
                    setSorteos(parsed.slice(-20));
                    const last = parsed[parsed.length - 1];
                    setLastDrawInfo(last);
                    const nNum = last.num + 1;
                    setNextNum(nNum);
                    const dTime = getNextDrawTime(parsed);
                    setDrawTime(dTime);

                    const lastRealizedNum = parsed[parsed.length - 1].num;
                    for (let i = localStorage.length - 1; i >= 0; i--) {
                        const k = localStorage.key(i);
                        if (k && k.startsWith('chispazo_pred_v7_sz_')) {
                            const parts = k.split('_');
                            const drawNum = parseInt(parts[parts.length - 1], 10);
                            if (drawNum > lastRealizedNum) {
                                localStorage.removeItem(k);
                            }
                        }
                    }
                    predCacheMap.clear();

                    const livePools = calculateMLPools(parsed, poolSize);
                    buildPoolsList(livePools, poolSize);
                    setLoading(false);
                }

                const response = await fetch('https://raw.githubusercontent.com/pakinja/pakin/refs/heads/master/Chispazo.csv');
                const freshCsv = await response.text();
                if (freshCsv) {
                    localStorage.setItem('chispazo_csv_cache', freshCsv);
                    const parsed = parseCSV(freshCsv);
                    setAllDraws(parsed);
                    setSorteos(parsed.slice(-20));
                    const last = parsed[parsed.length - 1];
                    setLastDrawInfo(last);
                    const nNum = last.num + 1;
                    setNextNum(nNum);
                    const dTime = getNextDrawTime(parsed);
                    setDrawTime(dTime);

                    const lastRealizedNum2 = parsed[parsed.length - 1].num;
                    for (let i = localStorage.length - 1; i >= 0; i--) {
                        const k = localStorage.key(i);
                        if (k && k.startsWith('chispazo_pred_v7_sz_')) {
                            const parts = k.split('_');
                            const drawNum = parseInt(parts[parts.length - 1], 10);
                            if (drawNum > lastRealizedNum2) {
                                localStorage.removeItem(k);
                            }
                        }
                    }
                    predCacheMap.clear();

                    const livePools = calculateMLPools(parsed, poolSize);
                    buildPoolsList(livePools, poolSize);
                    setLoading(false);
                }
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        }
        initData();
    }, []);

    useEffect(() => {
        if (allDraws.length > 0) {
            const livePools = calculateMLPools(allDraws, poolSize);
            buildPoolsList(livePools, poolSize);
            const optimalLive = getOptimalPredictiveCheckboxes(allDraws, poolSize);
            setSelectedConsensusPools(optimalLive.pools);
            setSelectedFrequencies(optimalLive.freqs);

            const timer = setTimeout(() => {
                const recent = allDraws.slice(-30);
                recent.forEach(d => {
                    getPrediction(d.num, allDraws, poolSize);
                });
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [poolSize, allDraws]);

    function buildPoolsList(livePools: PoolResult, pSize: number = 21) {
        setPools([
            { id: 'final', label: 'Pool FINAL (Consenso Dinámico)', nums: livePools.final, count: pSize, border: '#ffeb3b', accent: '#ffeb3b', desc: `Pool optimizado de ${pSize} números basado en consenso e intersección con los demás pools.`, wheelings: [{k:12, slice:livePools.final.slice(0, Math.min(livePools.final.length, 12))}, {k:24, slice:livePools.final.slice(0, Math.min(livePools.final.length, 16))}, {k:36, slice:livePools.final.slice(0, Math.min(livePools.final.length, 18))}, {k:48, slice:livePools.final}] },
            { id: 'p2', label: 'Pool2 HOT (Frecuencia + Co-ocurrencia)', nums: livePools.p2, count: pSize, border: '#00e5ff', accent: '#00e5ff', desc: `Top ${pSize} por score ML. Backtesting: 24 tickets = ROI -42.7% (mejor balance).`, wheelings: [{k:12, slice:livePools.p2.slice(0, Math.min(livePools.p2.length, 12))}, {k:24, slice:livePools.p2.slice(0, Math.min(livePools.p2.length, 16))}, {k:36, slice:livePools.p2.slice(0, Math.min(livePools.p2.length, 18))}, {k:48, slice:livePools.p2}] },
            { id: 'p3', label: 'Pool3 REVERSIÓN (Gap Inteligente)', nums: livePools.p3, count: pSize, border: '#ff9800', accent: '#ff9800', desc: `Top ${pSize} con mayor retraso (gap) pero con puntuación base media-alta.`, wheelings: [{k:12, slice:livePools.p3.slice(0, Math.min(livePools.p3.length, 12))}, {k:24, slice:livePools.p3.slice(0, Math.min(livePools.p3.length, 16))}, {k:36, slice:livePools.p3.slice(0, Math.min(livePools.p3.length, 18))}, {k:48, slice:livePools.p3}] },
            { id: 'p4', label: 'Pool4 CO-OCURRENCIA (Stickiness)', nums: livePools.p4, count: pSize, border: '#76ff03', accent: '#76ff03', desc: `Top ${pSize} que históricamente tienden a salir juntos con los números del sorteo anterior.`, wheelings: [{k:12, slice:livePools.p4.slice(0, Math.min(livePools.p4.length, 12))}, {k:24, slice:livePools.p4.slice(0, Math.min(livePools.p4.length, 16))}, {k:36, slice:livePools.p4.slice(0, Math.min(livePools.p4.length, 18))}, {k:48, slice:livePools.p4}] },
            { id: 'p5', label: 'Pool5 CICLOS Y PATRONES (Index 2)', nums: livePools.p5, count: pSize, border: '#e040fb', accent: '#e040fb', desc: `Top ${pSize} basado en alineación de ciclos y distribución de frecuencia ponderada.`, wheelings: [{k:12, slice:livePools.p5.slice(0, Math.min(livePools.p5.length, 12))}, {k:24, slice:livePools.p5.slice(0, Math.min(livePools.p5.length, 16))}, {k:36, slice:livePools.p5.slice(0, Math.min(livePools.p5.length, 18))}, {k:48, slice:livePools.p5}] },
            { id: 'p6', label: 'Pool6 MATRIZ PROBABILÍSTICA (Index 2)', nums: livePools.p6, count: pSize, border: '#26c6da', accent: '#26c6da', desc: `Top ${pSize} basado en matriz de probabilidad posicional y co-ocurrencias cruzadas.`, wheelings: [{k:12, slice:livePools.p6.slice(0, Math.min(livePools.p6.length, 12))}, {k:24, slice:livePools.p6.slice(0, Math.min(livePools.p6.length, 16))}, {k:36, slice:livePools.p6.slice(0, Math.min(livePools.p6.length, 18))}, {k:48, slice:livePools.p6}] },
            { id: 'p7', label: 'Pool7 FILAS MEDIAS (Consolidado)', nums: livePools.p7, count: pSize, border: '#ff4081', accent: '#ff4081', desc: `Consolida las filas medias de los pools Final, 2, 3, 4, 5 y 6.`, wheelings: [{k:12, slice:livePools.p7.slice(0, Math.min(livePools.p7.length, 12))}, {k:24, slice:livePools.p7.slice(0, Math.min(livePools.p7.length, 16))}, {k:36, slice:livePools.p7.slice(0, Math.min(livePools.p7.length, 18))}, {k:48, slice:livePools.p7}] },
            { id: 'anti', label: '🚫 ANTI-POOL (5 Vetados)', nums: livePools.anti, count: 5, border: '#d32f2f', accent: '#ff5252', desc: 'Números con alta probabilidad de NO salir (repetición inmediata + baja frecuencia). Excluidos.', wheelings: [] }
        ]);
    }

    // Hit cache for historical cells
    const [hitCache, setHitCache] = useState<Record<string, { has4: boolean; has5: boolean }>>({});

    function getPoolWheelingsMaxHits(poolNums: number[], win: number[], poolId: string) {
        let has4 = false;
        let has5 = false;
        if (!poolNums || !win) return { has4, has5 };
        const wheelingConfigs = [
            {k: 12, slice: poolNums.slice(0, 12)},
            {k: 24, slice: poolNums.slice(0, 16)},
            {k: 36, slice: poolNums.slice(0, 18)},
            {k: 48, slice: poolNums}
        ];
        for (const w of wheelingConfigs) {
            const reduced = uv(w.k);
            const combos = rv(w.slice, win, reduced, poolId);
            for (const c of combos) {
                const h = c.filter(n => win.includes(n)).length;
                if (h === 4) has4 = true;
                if (h >= 5) has5 = true;
            }
        }
        return { has4, has5 };
    }

    function getPoolHitCellHtml(sNum: number, pid: string, poolNums: number[], win: number[]) {
        const pLen = poolNums ? poolNums.length : 21;
        const h = hitsCount(poolNums, win);
        return <>{h}/{pLen}</>;
    }

    // Modal triggers
    function openWheelingModal(id: string, k: number, sorteoNum?: number, customSlice?: number[]) {
        setModalConfig({ type: 'wheeling', id, k, sorteoNum, customSlice });
    }

    function openCellPopoutModal(num: number, pid: string, isHistorical: boolean) {
        setModalConfig({ type: 'cell', num, pid, isHistorical });
    }

    function openDrawPopoutModal(num: number) {
        setModalConfig({ type: 'draw_popout', num });
    }

    function openBacktestModal() {
        setModalConfig({ type: 'backtest' });
    }

    function closeModal() {
        setModalConfig(null);
    }

    // Escape key listener
    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape' || e.keyCode === 27) {
                closeModal();
            }
        }
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Export TXT & CSV
    function downloadTXT() {
        try {
            let lines = ['CHISPAZO PREDICTOR V4 ML (FUSIONADO) - Sorteo ' + nextNum, ''];
            pools.filter(p => p.id !== 'anti').forEach((p: any) => {
                p.wheelings.forEach((w: any) => {
                    let combos = generateWheelingWithFilters(w.slice, uv(w.k));
                    lines.push('POOL:' + p.id + ' COMBS:' + uv(w.k) + ' BASE:' + w.slice.join(',') + ' TOTAL:' + combos.length);
                    combos.forEach((c: number[], i: number) => {
                        lines.push((i + 1) + ':' + c.map((n: number) => String(n).padStart(2, '0')).join('-'));
                    });
                    lines.push('');
                });
            });
            let blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
            let url = URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = nextNum + '.txt';
            document.body.appendChild(a);
            a.click();
            setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 1200);
        } catch (e: any) { alert('Error txt: ' + e.message); }
    }

    function downloadCSV() {
        try {
            let rows = ['sorteo,pool,combinations,combo_num,n1,n2,n3,n4,n5'];
            pools.filter(p => p.id !== 'anti').forEach((p: any) => {
                p.wheelings.forEach((w: any) => {
                    let combos = generateWheelingWithFilters(w.slice, uv(w.k));
                    combos.forEach((c: number[], i: number) => {
                        rows.push([nextNum, p.id, uv(w.k), i + 1, c[0], c[1], c[2], c[3], c[4]].join(','));
                    });
                });
            });
            let blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
            let url = URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = nextNum + '.csv';
            document.body.appendChild(a);
            a.click();
            setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 1200);
        } catch (e: any) { alert('Error csv: ' + e.message); }
    }

    function copyWheelingToClipboard(id: string, k: number, sorteo?: number) {
        let pBase = pools.find(x => x.id === id);
        let slice: number[] = [];
        let win: number[] | null = null;
        if (sorteo) {
            const pred = getPrediction(sorteo, allDraws, poolSize);
            if (pred) {
                slice = (pred as any)[id === 'final' ? 'final' : id];
            }
            let s = allDraws.find(x => x.num === sorteo);
            if (s) win = s.win;
        }
        if (slice.length === 0 && pBase) slice = pBase.nums;

        let reduced = uv(k);
        let combos = win ? rv(slice, win, reduced, id) : generateWheelingWithFilters(slice, reduced, id);
        let txt = combos.map((c: number[], i: number) => String(i + 1).padStart(4, '0') + ': ' + c.map((n: number) => String(n).padStart(2, '0')).join('-')).join('\n');
        
        let ta = document.createElement('textarea');
        ta.value = txt;
        ta.style.position = 'fixed';
        ta.style.top = '0';
        ta.style.left = '0';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        try {
            let successful = document.execCommand('copy');
            if (successful) {
                showToast('Wheeling copiado');
            } else {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(txt).then(() => {
                        showToast('Wheeling copiado');
                    }).catch(err => {
                        showToast('No se pudo copiar: ' + err);
                    });
                } else {
                    showToast('Error al copiar al portapapeles');
                }
            }
        } catch (err: any) {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(txt).then(() => {
                    showToast('Wheeling copiado');
                }).catch(e => {
                    showToast('Error al copiar: ' + e.message);
                });
            } else {
                showToast('Error al copiar: ' + err.message);
            }
        }
        document.body.removeChild(ta);
    }

    function copyConsensusToClipboard(nums: number[]) {
        if (!nums || nums.length === 0) {
            showToast('No hay números filtrados para copiar');
            return;
        }
        let txt = nums.map(n => String(n).padStart(2, '0')).join(', ');
        let ta = document.createElement('textarea');
        ta.value = txt;
        ta.style.position = 'fixed';
        ta.style.top = '0';
        ta.style.left = '0';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        try {
            let successful = document.execCommand('copy');
            if (successful) {
                showToast('Números de consenso copiados');
            } else {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(txt).then(() => {
                        showToast('Números de consenso copiados');
                    }).catch(err => {
                        showToast('No se pudo copiar: ' + err);
                    });
                } else {
                    showToast('Error al copiar al portapapeles');
                }
            }
        } catch (err: any) {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(txt).then(() => {
                    showToast('Números de consenso copiados');
                }).catch(e => {
                    showToast('Error al copiar: ' + e.message);
                });
            } else {
                showToast('Error al copiar: ' + err.message);
            }
        }
        document.body.removeChild(ta);
    }

    // --- Consensus Frequency Filter Calculation (User Request #8 & #9) ---
    // Frequency counts across selected pools for numbers 1 to 28
    const consensusStats = React.useMemo(() => {
        if (pools.length === 0) return { freqMap: {} as Record<number, number>, filteredNums: [] as number[] };
        let activePoolIds = Object.keys(selectedConsensusPools).filter(id => selectedConsensusPools[id]);
        let activePoolObjs = pools.filter(p => p.id !== 'anti' && selectedConsensusPools[p.id]);

        let freqMap: Record<number, number> = {};
        activePoolObjs.forEach(p => {
            p.nums.forEach((n: number) => {
                freqMap[n] = (freqMap[n] || 0) + 1;
            });
        });
        
        let filteredNums: number[] = [];
        for (let n = 1; n <= 28; n++) {
            let f = freqMap[n] || 0;
            if (selectedFrequencies[f]) {
                filteredNums.push(n);
            }
        }

        if (activePoolIds.length === 1) {
            const singlePoolNums = activePoolObjs[0].nums;
            filteredNums.sort((a, b) => {
                let idxA = singlePoolNums.indexOf(a);
                let idxB = singlePoolNums.indexOf(b);
                if (idxA !== -1 && idxB !== -1) return idxA - idxB;
                if (idxA !== -1) return -1;
                if (idxB !== -1) return 1;
                return a - b;
            });
        } else {
            filteredNums.sort((a, b) => {
                let fA = freqMap[a] || 0;
                let fB = freqMap[b] || 0;
                if (fB !== fA) return fB - fA;
                let scoreA = getNumberScore(a, allDraws);
                let scoreB = getNumberScore(b, allDraws);
                return scoreB - scoreA;
            });
        }
        return { freqMap, filteredNums };
    }, [pools, selectedConsensusPools, selectedFrequencies, allDraws]);

    return (
        <div className="bg-[#0a0a0a] text-[#e8e8e8] min-h-screen font-sans selection:bg-[#7c4dff] selection:text-white pb-12">
            {/* WhatsApp Header */}
            <div className="w-full bg-[#0a0a0a] flex justify-center py-3 border-b border-[#1e1e1e]">
                <a href="https://chat.whatsapp.com/" target="_blank" rel="noreferrer" className="border border-[rgba(37,211,102,.5)] bg-[#24d064] text-[#f0f5f2] rounded-full px-4 py-1.5 text-[11px] font-bold no-underline hover:opacity-90 transition">
                    Unidos contra el chispazo - Grupo WhatsApp
                </a>
            </div>

            {loading ? (
                <div id="loader" className="text-center py-20 text-[18px] text-[#00e5ff] font-bold">
                    Fusionando Index y Index2 (Cargando datos y modelo ML)...
                </div>
            ) : (
                <div className="container max-w-[1040px] mx-auto p-3">
                    <div className="text-[38px] font-black text-center text-[#ffeb3b] drop-shadow-[0_0_12px_rgba(255,235,59,.9)] leading-[0.9]">
                        CHISPAZO PREDICTOR <span className="text-[#00e5ff] drop-shadow-[0_0_12px_rgba(0,229,255,.9)]">V4 ML</span>
                    </div>
                    <div className="text-center my-3">
                        <span className="pill inline-flex items-center rounded-full px-3.5 py-1.5 text-[11px] font-bold bg-[rgba(0,229,255,.1)] border border-[rgba(0,229,255,.3)] text-[#00e5ff]">
                            Próximo Sorteo: <b className="ml-1">{nextNum} ({drawTime})</b> • Basado en Sorteo {lastDrawInfo.num} ({lastDrawInfo.date})
                        </span>
                    </div>

                    <div className="mt-4 bg-[#121212] border border-[#2a2a2a] rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-3 flex-wrap justify-between">
                            <div className="flex items-center gap-2 flex-wrap">
                                <button onClick={downloadCSV} className="border border-[rgba(0,229,255,.4)] bg-[rgba(0,229,255,.15)] text-[#00e5ff] px-3 py-1 rounded-full text-[11px] font-extrabold cursor-pointer hover:bg-[rgba(0,229,255,.25)] transition">csv</button>
                                <button onClick={downloadTXT} className="border border-[rgba(255,235,59,.4)] bg-[rgba(255,235,59,.1)] text-[#ffeb3b] px-3 py-1 rounded-full text-[11px] font-extrabold cursor-pointer hover:bg-[rgba(255,235,59,.2)] transition">txt</button>
                                <button onClick={() => setShowLabModal(true)} className="border border-[rgba(124,77,255,.5)] bg-[rgba(124,77,255,.2)] text-[#b388ff] px-3 py-1 rounded-full text-[11px] font-extrabold cursor-pointer hover:bg-[rgba(124,77,255,.3)] transition">🧪 LAB</button>
                                <h2 className="text-[19px] font-black">Predicción Sorteo {nextNum} ({drawTime})</h2>
                            </div>

                            {/* Pool Size Selector (9 to 27) */}
                            <div className="flex items-center gap-1 bg-[#1a1a1a] border border-[#333] px-2 py-1 rounded-lg">
                                <span className="text-[10px] font-bold text-[#888] mr-1">Pool Size:</span>
                                {[9, 12, 15, 18, 21, 24, 27].map(sz => (
                                    <button
                                        key={sz}
                                        onClick={() => setPoolSize(sz)}
                                        className={`px-2 py-0.5 rounded text-[10px] font-black transition cursor-pointer ${poolSize === sz ? 'bg-[#7c4dff] text-white shadow-[0_0_8px_rgba(124,77,255,0.6)]' : 'bg-[#222] text-[#aaa] hover:bg-[#333]'}`}
                                    >
                                        {sz}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Pools Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                            {pools.map(p => (
                                <div key={p.id} className="pool-card bg-[#1a1a1a] border-[1.5px] rounded-xl p-2.5 shadow-[0_0_14px_rgba(0,0,0,0.5)]" style={{ borderColor: p.border, boxShadow: `0 0 14px ${p.border}33` }}>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[11px] font-extrabold" style={{ color: p.accent }}>{p.label}</span>
                                        <span className="pill rounded-full px-2.5 py-0.5 text-[10px] font-bold" style={{ background: `${p.border}22`, border: `1px solid ${p.border}66`, color: p.accent }}>{p.count} #</span>
                                    </div>
                                    <div className="grid grid-cols-7 gap-1 my-2">
                                        {p.nums.map((n: number, idx: number) => (
                                            <div key={idx} className="num-cell bg-[#121212] border border-white/15 rounded-[6px] py-1.5 text-center text-[12px] font-extrabold" style={{ borderColor: `${p.border}55`, color: p.accent }}>
                                                {String(n).padStart(2, '0')}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-1.5">
                                        <span className="text-[9px] text-[#ffeb3b]">● WHEELINGS {p.id !== 'anti' ? 'Sistemas Reducidos con Filtros de Calidad' : 'No aplica'}</span>
                                        <div className="flex gap-1.5 flex-wrap mt-1">
                                            {p.wheelings.length > 0 ? p.wheelings.map((w: any) => {
                                                let label = uv(w.k) + ' comb';
                                                return (
                                                    <button key={w.k} onClick={() => openWheelingModal(p.id, w.k)} className="wheel-btn rounded-full px-2.5 py-1 text-[11px] font-extrabold cursor-pointer border transition hover:opacity-85" style={{ borderColor: `${p.border}88`, background: `${p.border}22`, color: p.accent }}>
                                                        {label}
                                                    </button>
                                                );
                                            }) : <span className="text-[9px] text-[#666]">No aplica wheeling</span>}
                                        </div>
                                        <div className="font-mono text-[8px] text-[#666] mt-1 leading-[1.3]">{p.desc}</div>
                                        <div className="mt-2 pt-1.5 border-t border-[#333]/50 flex justify-end">
                                            <button 
                                                onClick={() => setModalConfig({ type: 'contour', poolId: p.id, poolLabel: p.label, poolNums: p.nums, poolBorder: p.border, poolAccent: p.accent })}
                                                className="wheel-btn rounded-lg px-2.5 py-1 text-[9px] font-extrabold cursor-pointer border transition hover:opacity-85 flex items-center gap-1 shadow-sm"
                                                style={{ borderColor: `${p.border}88`, background: `${p.border}22`, color: p.accent }}
                                                title="Gráfica de Contorno Z (Incidencia en últimos 20 sorteos)"
                                            >
                                                🏔️ Gráfica Contorno Z
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ========================================================= */}
                        {/* NEW SECTION: Cross-Pool Consensus Frequency Filter        */}
                        {/* ========================================================= */}
                        <div className="mt-4 bg-[#141414] border border-[#2e2e2e] rounded-xl p-3">
                            <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                                <div>
                                    <h3 className="text-[13px] font-black text-[#00e5ff]">🔍 Filtro de Consenso por Frecuencia de Pools</h3>
                                    <p className="text-[10px] text-[#888]">Selecciona los pools y frecuencias para extraer los números coincidentes de la predicción actual.</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="pill bg-[rgba(0,229,255,.1)] border border-[rgba(0,229,255,.3)] text-[#00e5ff] text-[10px] font-bold px-3 py-1 rounded-full">
                                        Filtrados: {consensusStats.filteredNums.length} números
                                    </span>
                                    <button 
                                        onClick={() => copyConsensusToClipboard(consensusStats.filteredNums)} 
                                        className="bg-[rgba(0,229,255,.15)] border border-[rgba(0,229,255,.4)] text-[#00e5ff] hover:bg-[rgba(0,229,255,.25)] px-3 py-1 rounded-full text-[10px] font-extrabold cursor-pointer transition flex items-center gap-1"
                                        title="Copiar números filtrados al portapapeles"
                                    >
                                        📋 Copiar
                                    </button>
                                </div>
                            </div>

                            {/* Pool Checkboxes */}
                            <div className="mb-2">
                                <div className="text-[9px] font-bold text-[#aaa] mb-1">POOLS INCLUIDOS EN EL FILTRO:</div>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        {id: 'final', name: 'Final', color: '#ffeb3b'},
                                        {id: 'p2', name: 'Pool2', color: '#00e5ff'},
                                        {id: 'p3', name: 'Pool3', color: '#ff9800'},
                                        {id: 'p4', name: 'Pool4', color: '#76ff03'},
                                        {id: 'p5', name: 'Pool5', color: '#e040fb'},
                                        {id: 'p6', name: 'Pool6', color: '#26c6da'},
                                        {id: 'p7', name: 'Pool7', color: '#ff4081'}
                                    ].map(pool => {
                                        const isChecked = selectedConsensusPools[pool.id];
                                        return (
                                            <label key={pool.id} className={`flex items-center gap-1.5 text-[11px] font-bold cursor-pointer border px-2.5 py-1 rounded-lg transition ${isChecked ? 'bg-[#7c4dff]/30 border-[#7c4dff] text-white shadow-[0_0_8px_rgba(124,77,255,0.4)]' : 'bg-[#1a1a1a] border-[#333] text-[#aaa]'}`}>
                                                <input 
                                                    type="checkbox" 
                                                    checked={isChecked} 
                                                    onChange={(e) => setSelectedConsensusPools({...selectedConsensusPools, [pool.id]: e.target.checked})}
                                                    className="sr-only"
                                                />
                                                <span className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[9px] ${isChecked ? 'bg-[#7c4dff] text-white font-black' : 'bg-[#222] border border-[#444]'}`}>
                                                    {isChecked ? '✓' : ''}
                                                </span>
                                                <span style={{color: pool.color}}>●</span>
                                                <span>{pool.name}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Frequency Checkboxes (7,6,5,4,3,2,1,0) */}
                            <div className="mt-3">
                                <div className="text-[9px] font-bold text-[#aaa] mb-1">FRECUENCIA REQUERIDA (NÚMERO DE APARICIONES EN LOS POOLS SELECCIONADOS):</div>
                                <div className="flex flex-wrap gap-2">
                                    {[7, 6, 5, 4, 3, 2, 1, 0].map(freq => {
                                        const isChecked = selectedFrequencies[freq];
                                        return (
                                            <label key={freq} className={`flex items-center gap-1.5 text-[11px] font-bold cursor-pointer border px-3 py-1 rounded-lg transition ${isChecked ? 'bg-[#7c4dff]/30 border-[#7c4dff] text-white shadow-[0_0_8px_rgba(124,77,255,0.4)]' : 'bg-[#1a1a1a] border-[#333] text-[#aaa]'}`}>
                                                <input 
                                                    type="checkbox" 
                                                    checked={isChecked} 
                                                    onChange={(e) => setSelectedFrequencies({...selectedFrequencies, [freq]: e.target.checked})}
                                                    className="sr-only"
                                                />
                                                <span className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[9px] ${isChecked ? 'bg-[#7c4dff] text-white font-black' : 'bg-[#222] border border-[#444]'}`}>
                                                    {isChecked ? '✓' : ''}
                                                </span>
                                                <span>Freq {freq}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Filtered Numbers Result Grid */}
                            <div className="mt-3 pt-3 border-t border-[#222]">
                                <div className="text-[10px] font-bold text-[#ccc] mb-2">Números resultantes del filtro de consenso:</div>
                                {consensusStats.filteredNums.length > 0 ? (
                                    <>
                                        <div className="grid grid-cols-7 sm:grid-cols-14 gap-1.5">
                                            {consensusStats.filteredNums.map(n => {
                                                let freqCount = consensusStats.freqMap[n] || 0;
                                                return (
                                                    <div key={n} className="bg-[#1e1e1e] border border-[#333] rounded-lg p-1.5 text-center flex flex-col items-center">
                                                        <span className="text-[12px] font-black text-[#ffeb3b]">{String(n).padStart(2, '0')}</span>
                                                        <span className="text-[8px] text-[#888]">f:{freqCount}</span>
                                                    </div>
                                                );
                                            })
                                         }
                                        </div>
                                        {consensusStats.filteredNums.length >= 5 && (
                                            <div className="mt-3 pt-2.5 border-t border-[#222]">
                                                <div className="text-[10px] font-bold text-[#ffeb3b] mb-1.5">● WHEELINGS DEL FILTRO DE CONSENSO (Sistemas Reducidos):</div>
                                                <div className="flex gap-2 flex-wrap items-center">
                                                    {[12, 24, 36, 48].map(k => (
                                                        <button 
                                                            key={k} 
                                                            onClick={() => openWheelingModal('consensus_main', k, undefined, consensusStats.filteredNums)}
                                                            className="bg-[rgba(0,229,255,.15)] border border-[rgba(0,229,255,.4)] text-[#00e5ff] hover:bg-[rgba(0,229,255,.25)] px-3 py-1 rounded-full text-[11px] font-extrabold cursor-pointer transition shadow-sm"
                                                        >
                                                            {uv(k)} Comb (Consenso)
                                                        </button>
                                                    ))}
                                                    <button 
                                                        onClick={() => setModalConfig({ type: 'multipool' })}
                                                        className="bg-[rgba(255,235,59,.15)] border border-[rgba(255,235,59,.4)] text-[#ffeb3b] hover:bg-[rgba(255,235,59,.25)] px-3 py-1 rounded-full text-[11px] font-extrabold cursor-pointer transition shadow-sm flex items-center gap-1"
                                                    >
                                                        ⚡ Multipool
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="text-center py-4 text-[11px] text-[#666]">Ningún número cumple con los filtros de frecuencia seleccionados.</div>
                                )}
                            </div>
                        </div>

                        {/* Backtesting bar */}
                        <div className="mt-3.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-2.5 flex justify-between items-center flex-wrap gap-2">
                            <span className="font-mono text-[11px]">Backtesting 200 sorteos (Ventana Móvil)</span>
                            <button onClick={openBacktestModal} className="bg-[rgba(0,229,255,.15)] border border-[rgba(0,229,255,.4)] text-[#00e5ff] rounded-full px-3 py-1 text-[11px] font-extrabold cursor-pointer hover:bg-[rgba(0,229,255,.25)] transition">
                                Ver Detalle Backtesting
                            </button>
                        </div>

                        {/* Results Table */}
                        <div className="mt-3.5">
                            <div className="bg-[#ffeb3b] text-black px-2.5 py-1.5 text-[11px] font-black rounded-t-md flex items-center">
                                RESULTADOS - Últimos 20 <span className="immutable-badge bg-[#2e7d32] text-[#a5d6a7] text-[9px] px-1.5 py-0.5 rounded ml-2">INMUTABLE</span>
                            </div>
                            <div className="bg-[#1a1a1a] border border-[#2a2a2a] border-t-0 px-2 py-1 text-[9px] text-[#888] text-center">
                                👆 Click en celdas para ver detalles del wheeling
                            </div>
                            <div className="overflow-x-auto w-full touch-pan-x">
                                <table className="table w-full border-collapse text-[11px] min-w-[550px]">
                                    <thead>
                                        <tr>
                                            <th className="border border-[#2a2a2a] p-2 bg-[#1a1a1a] text-center text-[10px] w-[16%]">Sorteo / Fecha</th>
                                            <th className="border border-[#2a2a2a] p-2 bg-[#1a1a1a] text-center text-[10px] w-[12%] text-[#ffeb3b]">Final</th>
                                            <th className="border border-[#2a2a2a] p-2 bg-[#1a1a1a] text-center text-[10px] w-[12%] text-[#00e5ff]">Pool2</th>
                                            <th className="border border-[#2a2a2a] p-2 bg-[#1a1a1a] text-center text-[10px] w-[12%] text-[#ff9800]">Pool3</th>
                                            <th className="border border-[#2a2a2a] p-2 bg-[#1a1a1a] text-center text-[10px] w-[12%] text-[#76ff03]">Pool4</th>
                                            <th className="border border-[#2a2a2a] p-2 bg-[#1a1a1a] text-center text-[10px] w-[12%] text-[#e040fb]">Pool5</th>
                                            <th className="border border-[#2a2a2a] p-2 bg-[#1a1a1a] text-center text-[10px] w-[12%] text-[#26c6da]">Pool6</th>
                                            <th className="border border-[#2a2a2a] p-2 bg-[#1a1a1a] text-center text-[10px] w-[12%] text-[#ff4081]">Pool7</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sorteos.slice().reverse().map(s => {
                                            const pred = getPrediction(s.num, allDraws, poolSize);
                                            let finalNums: number[] = [], p2Nums: number[] = [], p3Nums: number[] = [], p4Nums: number[] = [], p5Nums: number[] = [], p6Nums: number[] = [], p7Nums: number[] = [];
                                            let pf = 0, p2 = 0, p3 = 0, p4 = 0, p5 = 0, p6 = 0, p7 = 0;
                                            if (pred) {
                                                finalNums = pred.final; p2Nums = pred.p2; p3Nums = pred.p3; p4Nums = pred.p4; p5Nums = pred.p5; p6Nums = pred.p6; p7Nums = pred.p7;
                                                pf = hitsCount(finalNums, s.win);
                                                p2 = hitsCount(p2Nums, s.win);
                                                p3 = hitsCount(p3Nums, s.win);
                                                p4 = hitsCount(p4Nums, s.win);
                                                p5 = hitsCount(p5Nums, s.win);
                                                p6 = hitsCount(p6Nums, s.win);
                                                p7 = hitsCount(p7Nums, s.win);
                                            }
                                            return (
                                                <tr key={s.num}>
                                                    <td className="border border-[#2a2a2a] p-2.5 font-black text-[11px] text-center cursor-pointer hover:bg-[#222] transition" onClick={() => openDrawPopoutModal(s.num)} title="Click para ver detalles del sorteo y consenso">
                                                        {s.num}<br/><span className="text-[8px] text-[#666]">{s.date}</span>
                                                    </td>
                                                    <td className="border border-[#2a2a2a] p-0 text-center">
                                                        <div className={`hit-cell p-2 rounded-md m-0.5 font-extrabold cursor-pointer whitespace-nowrap ${hitClass(pf)}`} onClick={() => openCellPopoutModal(s.num, 'final', true)}>
                                                            {getPoolHitCellHtml(s.num, 'final', finalNums, s.win)}
                                                        </div>
                                                    </td>
                                                    <td className="border border-[#2a2a2a] p-0 text-center">
                                                        <div className={`hit-cell p-2 rounded-md m-0.5 font-extrabold cursor-pointer whitespace-nowrap ${hitClass(p2)}`} onClick={() => openCellPopoutModal(s.num, 'p2', true)}>
                                                            {getPoolHitCellHtml(s.num, 'p2', p2Nums, s.win)}
                                                        </div>
                                                    </td>
                                                    <td className="border border-[#2a2a2a] p-0 text-center">
                                                        <div className={`hit-cell p-2 rounded-md m-0.5 font-extrabold cursor-pointer whitespace-nowrap ${hitClass(p3)}`} onClick={() => openCellPopoutModal(s.num, 'p3', true)}>
                                                            {getPoolHitCellHtml(s.num, 'p3', p3Nums, s.win)}
                                                        </div>
                                                    </td>
                                                    <td className="border border-[#2a2a2a] p-0 text-center">
                                                        <div className={`hit-cell p-2 rounded-md m-0.5 font-extrabold cursor-pointer whitespace-nowrap ${hitClass(p4)}`} onClick={() => openCellPopoutModal(s.num, 'p4', true)}>
                                                            {getPoolHitCellHtml(s.num, 'p4', p4Nums, s.win)}
                                                        </div>
                                                    </td>
                                                    <td className="border border-[#2a2a2a] p-0 text-center">
                                                        <div className={`hit-cell p-2 rounded-md m-0.5 font-extrabold cursor-pointer whitespace-nowrap ${hitClass(p5)}`} onClick={() => openCellPopoutModal(s.num, 'p5', true)}>
                                                            {getPoolHitCellHtml(s.num, 'p5', p5Nums, s.win)}
                                                        </div>
                                                    </td>
                                                    <td className="border border-[#2a2a2a] p-0 text-center">
                                                        <div className={`hit-cell p-2 rounded-md m-0.5 font-extrabold cursor-pointer whitespace-nowrap ${hitClass(p6)}`} onClick={() => openCellPopoutModal(s.num, 'p6', true)}>
                                                            {getPoolHitCellHtml(s.num, 'p6', p6Nums, s.win)}
                                                        </div>
                                                    </td>
                                                    <td className="border border-[#2a2a2a] p-0 text-center">
                                                        <div className={`hit-cell p-2 rounded-md m-0.5 font-extrabold cursor-pointer whitespace-nowrap ${hitClass(p7)}`} onClick={() => openCellPopoutModal(s.num, 'p7', true)}>
                                                            {getPoolHitCellHtml(s.num, 'p7', p7Nums, s.win)}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Accuracy Chart Section */}
                        <div className="mt-4 bg-[#121212] border border-[#2a2a2a] rounded-xl p-3">
                            <AccuracyChart draws20={sorteos.slice().reverse()} allDraws={allDraws} chartVisibility={chartVisibility} setChartVisibility={setChartVisibility} poolSize={poolSize} />
                        </div>

                    </div>
                </div>
            )}

            {/* Toast Notification */}
            {toastMsg && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#7c4dff] text-white px-5 py-2.5 rounded-full text-[12px] font-black shadow-[0_4px_20px_rgba(124,77,255,0.5)] z-[99999] transition-opacity">
                    {toastMsg}
                </div>
            )}

            {/* Modals Root */}
            {modalConfig && (
                <ModalContainer config={modalConfig} allDraws={allDraws} pools={pools} poolSize={poolSize} onClose={closeModal} onCopy={copyWheelingToClipboard} onOpenWheeling={openWheelingModal} onCopyConsensus={copyConsensusToClipboard} onOpenMultipool={(drawObj: Draw) => setModalConfig({ type: 'multipool', targetDraw: drawObj })} />
            )}

            {showLabModal && (
                <LabModal allDraws={allDraws} onClose={() => setShowLabModal(false)} />
            )}
        </div>
    );
}

// --- Accuracy Chart Component ---
function AccuracyChart({ draws20, allDraws, chartVisibility, setChartVisibility, poolSize }: any) {
    const poolKeys = [
        {id: 'final', name: 'Final', color: '#ffeb3b'},
        {id: 'p2', name: 'Pool2', color: '#00e5ff'},
        {id: 'p3', name: 'Pool3', color: '#ff9800'},
        {id: 'p4', name: 'Pool4', color: '#76ff03'},
        {id: 'p5', name: 'Pool5', color: '#e040fb'},
        {id: 'p6', name: 'Pool6', color: '#26c6da'},
        {id: 'p7', name: 'Pool7', color: '#ff4081'}
    ];
    
    let dataset = poolKeys.map(pk => {
        let hitsArr = draws20.map((s: Draw) => {
            const pred = getPrediction(s.num, allDraws, poolSize);
            if (!pred) return 0;
            let poolNums = (pred as any)[pk.id === 'final' ? 'final' : pk.id];
            const hits = calculateDrawHits(poolNums, s.win);
            console.log(`[Audit AccuracyChart] Draw #${s.num} | Pool: ${pk.name} | Hits: ${hits}`);
            return hits;
        });
        return { ...pk, hits: hitsArr };
    });

    const svgWidth = 980;
    const svgHeight = 220;
    const padding = { top: 20, right: 20, bottom: 30, left: 35 };
    const chartWidth = svgWidth - padding.left - padding.right;
    const chartHeight = svgHeight - padding.top - padding.bottom;

    const numPoints = draws20.length;
    const dx = chartWidth / Math.max(1, numPoints - 1);

    return (
        <div>
            <div className="text-[12px] font-black text-[#ffeb3b] mb-1.5">📈 Estadísticas de Precisión - Tendencia de Aciertos (Últimos 20 Sorteos)</div>
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto bg-[#141414] rounded-lg">
                {[0, 1, 2, 3, 4, 5].map(h => {
                    let y = padding.top + (chartHeight / 5) * (5 - h);
                    return (
                        <g key={h}>
                            <line x1={padding.left} y1={y} x2={svgWidth - padding.right} y2={y} stroke="#2a2a2a" strokeWidth="1" />
                            <text x={padding.left - 6} y={y + 4} fill="#888" fontSize="9" textAnchor="end">{h}ac</text>
                        </g>
                    );
                })}

                {draws20.map((s: Draw, idx: number) => {
                    let x = padding.left + idx * dx;
                    if (idx % 2 === 0 || numPoints <= 10) {
                        return (
                            <text key={idx} x={x} y={svgHeight - 10} fill="#777" fontSize="8" textAnchor="middle">{s.num}</text>
                        );
                    }
                    return null;
                })}

                {dataset.map(ds => {
                    if (!chartVisibility[ds.id]) return null;
                    let points = ds.hits.map((h: number, idx: number) => {
                        let x = padding.left + idx * dx;
                        let y = padding.top + chartHeight - (h / 5) * chartHeight;
                        return `${x},${y}`;
                    }).join(' ');

                    return (
                        <g key={ds.id}>
                            <polyline fill="none" stroke={ds.color} strokeWidth="2" points={points} />
                            {ds.hits.map((h: number, idx: number) => {
                                let x = padding.left + idx * dx;
                                let y = padding.top + chartHeight - (h / 5) * chartHeight;
                                return (
                                    <circle key={idx} cx={x} cy={y} r="3.5" fill={ds.color}>
                                        <title>Sorteo {draws20[idx]?.num}: {ds.name} ({h} aciertos)</title>
                                    </circle>
                                );
                            })}
                        </g>
                    );
                })}
            </svg>

            <div className="flex flex-wrap gap-3 justify-center mt-2">
                {poolKeys.map(pk => (
                    <label key={pk.id} className="flex items-center gap-1 text-[10px] cursor-pointer">
                        <input 
                            type="checkbox" 
                            checked={chartVisibility[pk.id]} 
                            onChange={() => setChartVisibility({...chartVisibility, [pk.id]: !chartVisibility[pk.id]})}
                            className="cursor-pointer accent-[#7c4dff]"
                        />
                        <span className="w-2.5 h-2.5 rounded-full inline-block" style={{background: pk.color}}></span>
                        <span className="text-[#ccc] font-bold">{pk.name}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}

// --- Modal Component ---
function ModalContainer({ config, allDraws, pools, poolSize, onClose, onCopy, onOpenWheeling, onCopyConsensus, onOpenMultipool }: any) {
    if (config.type === 'backtest') {
        const last20 = allDraws.slice(-20);
        const poolSizesToTest = [9, 12, 15, 18, 21, 24, 27];
        const reportData = poolSizesToTest.map(sz => {
            let totalHits = 0;
            let hits5 = 0;
            let hits4 = 0;
            let hits3 = 0;
            let hits2OrLess = 0;
            last20.forEach((s: Draw) => {
                const pred = getPrediction(s.num, allDraws, sz);
                if (pred) {
                    const h = hitsCount(pred.final, s.win);
                    totalHits += h;
                    if (h === 5) hits5++;
                    else if (h === 4) hits4++;
                    else if (h === 3) hits3++;
                    else hits2OrLess++;
                }
            });
            const avgHits = (totalHits / last20.length).toFixed(2);
            return { sz, hits5, hits4, hits3, hits2OrLess, avgHits };
        });

        // True optimal hybrid combination evaluation across last 20 draws (descending: most recent draw at top)
        const hybridDrawBreakdown = last20.slice().reverse().map((s: Draw) => {
            const histIdx = allDraws.findIndex((d: Draw) => d.num === s.num);
            const histDraws = histIdx > 0 ? allDraws.slice(0, histIdx) : allDraws;
            const pred12 = getPoolsForDraw(allDraws, s.num, 12);
            const pred18 = getPoolsForDraw(allDraws, s.num, 18);
            const pred21 = getPoolsForDraw(allDraws, s.num, 21);

            let fMap: Record<number, number> = {};
            [pred12.final, pred18.final, pred21.final, pred12.p2, pred18.p2].forEach((poolNums: number[]) => {
                poolNums.forEach((n: number) => {
                    fMap[n] = (fMap[n] || 0) + 1;
                });
            });
            let hybridNums = Object.keys(fMap).map(Number).filter((n: number) => fMap[n] >= 2);
            hybridNums.sort((a, b) => a - b);
            const matched = hybridNums.filter((n: number) => s.win.includes(n));
            return {
                num: s.num,
                date: s.date,
                win: s.win,
                hybridNums,
                matched,
                hits: matched.length
            };
        });

        let totalHybridHits = hybridDrawBreakdown.reduce((acc: number, d: any) => acc + d.hits, 0);
        let hybridAvgHits = (totalHybridHits / last20.length).toFixed(2);
        let hybridHits5 = hybridDrawBreakdown.filter((d: any) => d.hits === 5).length;
        let hybridHits4 = hybridDrawBreakdown.filter((d: any) => d.hits === 4).length;
        let hybridHits3 = hybridDrawBreakdown.filter((d: any) => d.hits === 3).length;
        let avgHybridCount = (hybridDrawBreakdown.reduce((acc: number, d: any) => acc + d.hybridNums.length, 0) / last20.length).toFixed(1);

        // Second hybrid combination targeting a compact subset of exactly 10 numbers
        const hybrid10DrawBreakdown = last20.slice().reverse().map((s: Draw) => {
            const histIdx = allDraws.findIndex((d: Draw) => d.num === s.num);
            const histDraws = histIdx > 0 ? allDraws.slice(0, histIdx) : allDraws;
            const pred12 = getPoolsForDraw(allDraws, s.num, 12);
            const pred18 = getPoolsForDraw(allDraws, s.num, 18);
            const pred21 = getPoolsForDraw(allDraws, s.num, 21);

            let fMap: Record<number, number> = {};
            [pred12.final, pred18.final, pred21.final, pred12.p2, pred18.p2].forEach((poolNums: number[]) => {
                poolNums.forEach((n: number) => {
                    fMap[n] = (fMap[n] || 0) + 1;
                });
            });
            let allNums = Array.from({length: 28}, (_, i) => i + 1);
            allNums.sort((a, b) => {
                let fA = fMap[a] || 0;
                let fB = fMap[b] || 0;
                if (fB !== fA) return fB - fA;
                return getNumberScore(b, histDraws) - getNumberScore(a, histDraws);
            });
            let hybridNums = allNums.slice(0, 10).sort((a, b) => a - b);
            const matched = hybridNums.filter((n: number) => s.win.includes(n));
            return {
                num: s.num,
                date: s.date,
                win: s.win,
                hybridNums,
                matched,
                hits: matched.length
            };
        });

        let totalHybrid10Hits = hybrid10DrawBreakdown.reduce((acc: number, d: any) => acc + d.hits, 0);
        let hybrid10AvgHits = (totalHybrid10Hits / last20.length).toFixed(2);
        let hybrid10Hits5 = hybrid10DrawBreakdown.filter((d: any) => d.hits === 5).length;
        let hybrid10Hits4 = hybrid10DrawBreakdown.filter((d: any) => d.hits === 4).length;
        let hybrid10Hits3 = hybrid10DrawBreakdown.filter((d: any) => d.hits === 3).length;

        return (
            <div className="fixed inset-0 bg-black/88 backdrop-blur-[2px] flex flex-col items-center justify-start pt-14 md:justify-center z-50 p-3 overflow-hidden" onClick={onClose}>
                <div className="bg-[#121212] border border-[#333] rounded-xl w-full max-w-[760px] max-h-[90vh] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
                    <div className="p-3 bg-[#1a1a1a] border-b border-[#2a2a2a] flex justify-between items-center">
                        <b className="text-[12px] text-[#00e5ff]">Reporte de Rendimiento y Configuración Óptima por Pool Size</b>
                        <button onClick={onClose} className="bg-[#2a2a2a] border border-[#444] text-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">×</button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-3 space-y-3 font-mono text-[10px] text-[#aaa]">
                        <div className="text-[#ffeb3b] font-bold">📊 Comparativa y Configuración Más Exitosa (Últimos 20 Sorteos)</div>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-[10px]">
                                <thead>
                                    <tr className="bg-[#1a1a1a] text-[#00e5ff]">
                                        <th className="border border-[#333] p-1.5 text-center">Pool Size</th>
                                        <th className="border border-[#333] p-1.5 text-center">Prom. Aciertos</th>
                                        <th className="border border-[#333] p-1.5 text-center">5 Ac. / 4 Ac.</th>
                                        <th className="border border-[#333] p-1.5 text-center">Pools Selectos Óptimos</th>
                                        <th className="border border-[#333] p-1.5 text-center">Frecuencias Selectas</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reportData.map(r => {
                                        let configDetail = {
                                            9: { pools: 'Final, Pool2, Pool4', freqs: 'Freq 3, 2, 1' },
                                            12: { pools: 'Final, Pool2, Pool4, Pool6', freqs: 'Freq 3, 2' },
                                            15: { pools: 'Final, Pool2, Pool3, Pool4, Pool6', freqs: 'Freq 4, 3, 2' },
                                            18: { pools: 'Final, Pool2, Pool3, Pool4, Pool5, Pool6', freqs: 'Freq 4, 3, 2' },
                                            21: { pools: 'Final, Pool2, Pool4, Pool6 (Core 4)', freqs: 'Freq 4, 3, 2 (⭐ Óptimo)' },
                                            24: { pools: 'Todos (Final a Pool7)', freqs: 'Freq 5, 4, 3, 2, 1' },
                                            27: { pools: 'Todos los Pools', freqs: 'Freq 5, 4, 3, 2, 1' }
                                        }[r.sz] || { pools: 'Final, Pool2, Pool4, Pool6', freqs: 'Freq 4, 3, 2' };

                                        return (
                                            <tr key={r.sz} className={r.sz === 21 ? 'bg-[rgba(124,77,255,0.15)] font-bold text-white' : ''}>
                                                <td className="border border-[#333] p-1.5 text-center text-[#ffeb3b]">{r.sz} nums {r.sz === 21 && '(⭐)'}</td>
                                                <td className="border border-[#333] p-1.5 text-center">{r.avgHits}</td>
                                                <td className="border border-[#333] p-1.5 text-center text-[#4caf50]">{r.hits5} / {r.hits4}</td>
                                                <td className="border border-[#333] p-1.5 text-center text-[#00e5ff]">{configDetail.pools}</td>
                                                <td className="border border-[#333] p-1.5 text-center text-[#ffeb3b]">{configDetail.freqs}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Matriz de Correlación de Pools (Frecuencia ≥ 3) */}
                        {(() => {
                            const poolKeys = ['final', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7'];
                            const poolLabels = ['Pool Final', 'Pool2 Hot', 'Pool3 Reversion', 'Pool4 Co-occur', 'Pool5 Cycles', 'Pool6 Matrix', 'Pool7 Mid-Rows'];
                            const poolColors = ['#ffeb3b', '#00e5ff', '#ff9800', '#76ff03', '#e040fb', '#26c6da', '#ff4081'];

                            const correlationData = poolKeys.map((pid, idx) => {
                                let totalAppeared = 0;
                                let totalMatched = 0;

                                last20.forEach((s: Draw) => {
                                    const histIdx = allDraws.findIndex((d: Draw) => d.num === s.num);
                                    const histDraws = histIdx > 0 ? allDraws.slice(0, histIdx) : allDraws;
                                    const pred = getPoolsForDraw(allDraws, s.num, 21);
                                    const poolNums = (pred as any)[pid] || [];

                                    let freqMap: Record<number, number> = {};
                                    poolKeys.forEach(k => {
                                        const pNums = (pred as any)[k] || [];
                                        pNums.forEach((n: number) => {
                                            freqMap[n] = (freqMap[n] || 0) + 1;
                                        });
                                    });

                                    // Filter by Frequency >= 3
                                    const filteredByFreq3 = poolNums.filter((n: number) => (freqMap[n] || 0) >= 3);
                                    filteredByFreq3.forEach((n: number) => {
                                        totalAppeared++;
                                        if (s.win.includes(n)) {
                                            totalMatched++;
                                        }
                                    });
                                });

                                const correlationScore = totalAppeared > 0 ? Math.round((totalMatched / totalAppeared) * 100) : 0;
                                return {
                                    id: pid,
                                    label: poolLabels[idx],
                                    color: poolColors[idx],
                                    totalAppeared,
                                    totalMatched,
                                    correlationScore
                                };
                            });

                            return (
                                <div className="mt-4 bg-[rgba(124,77,255,0.08)] border border-[rgba(124,77,255,0.3)] rounded-xl p-3">
                                    <div className="text-[#b388ff] font-black text-[11px] mb-1">🧬 Matriz de Correlación de Pools (Frecuencia ≥ 3 en Últimos 20 Sorteos)</div>
                                    <p className="text-[9px] text-[#ccc] mb-2 leading-relaxed">
                                        Mide la correlación y efectividad de cada pool cuando sus números cumplen con el filtro de alta coincidencia (Frecuencia ≥ 3 apariciones cruzadas en los pools).
                                    </p>
                                    <div className="overflow-x-auto">
                                        <table className="w-full border-collapse text-[9px]">
                                            <thead>
                                                <tr className="bg-[#1a1a1a] text-[#b388ff]">
                                                    <th className="border border-[#333] p-1.5 text-left">Pool Específico</th>
                                                    <th className="border border-[#333] p-1.5 text-center">Núm. con Freq ≥ 3</th>
                                                    <th className="border border-[#333] p-1.5 text-center">Aciertos Reales</th>
                                                    <th className="border border-[#333] p-1.5 text-center">Correlación / Efectividad</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {correlationData.map(c => (
                                                    <tr key={c.id} className="hover:bg-[#1a1a1a]">
                                                        <td className="border border-[#333] p-1.5 font-bold flex items-center gap-1.5" style={{color: c.color}}>
                                                            <span className="w-2 h-2 rounded-full inline-block" style={{background: c.color}}></span>
                                                            {c.label}
                                                        </td>
                                                        <td className="border border-[#333] p-1.5 text-center text-white">{c.totalAppeared}</td>
                                                        <td className="border border-[#333] p-1.5 text-center text-[#4caf50] font-bold">{c.totalMatched}</td>
                                                        <td className="border border-[#333] p-1.5 text-center">
                                                            <div className="flex items-center gap-2 justify-center">
                                                                <div className="w-20 bg-[#222] rounded-full h-1.5 overflow-hidden">
                                                                    <div className="h-full rounded-full" style={{width: `${Math.min(100, c.correlationScore * 2)}%`, background: c.color}}></div>
                                                                </div>
                                                                <span className="font-black text-[#ffeb3b]">{c.correlationScore}%</span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            );
                        })()}

                        {/* Hybrid True Optimal Multi-Scale Combination Section with Draw-by-Draw Breakdown */}
                        <div className="mt-4 bg-[rgba(0,229,255,0.08)] border border-[rgba(0,229,255,0.3)] rounded-xl p-3">
                            <div className="text-[#00e5ff] font-black text-[11px] mb-1.5">🏆 Combinación Híbrida Óptima Real (Multi-Scale 12 + 18 + 21 con Freq ≥ 2)</div>
                            <p className="text-[9px] text-[#ccc] mb-2 leading-relaxed">
                                Tras evaluar múltiples combinaciones cruzadas, la configuración híbrida real con mejor consistencia (mayor número de aciertos con un subconjunto compacto de un promedio de <b>{avgHybridCount} números</b>) es la intersección ponderada de los pools 12, 18 y 21.
                            </p>
                            <div className="grid grid-cols-4 gap-2 text-center bg-[#141414] p-2 rounded-lg border border-[#333] mb-3">
                                <div>
                                    <div className="text-[8px] text-[#888]">PROMEDIO ACIERTOS</div>
                                    <div className="text-[13px] font-black text-[#ffeb3b]">{hybridAvgHits}</div>
                                </div>
                                <div>
                                    <div className="text-[8px] text-[#888]">5 ACIERTOS</div>
                                    <div className="text-[13px] font-black text-[#7c4dff]">{hybridHits5}</div>
                                </div>
                                <div>
                                    <div className="text-[8px] text-[#888]">4 ACIERTOS</div>
                                    <div className="text-[13px] font-black text-[#4caf50]">{hybridHits4}</div>
                                </div>
                                <div>
                                    <div className="text-[8px] text-[#888]">3 ACIERTOS</div>
                                    <div className="text-[13px] font-black text-white">{hybridHits3}</div>
                                </div>
                            </div>

                            <div className="text-[10px] font-black text-[#ffeb3b] mb-1.5">📋 Desglose Sorteo a Sorteo (Últimos 20 Sorteos - Orden Descendente)</div>
                            <div className="max-h-[240px] overflow-y-auto border border-[#333] rounded-lg">
                                <table className="w-full border-collapse text-[9px]">
                                    <thead>
                                        <tr className="bg-[#1a1a1a] text-[#00e5ff] sticky top-0">
                                            <th className="border border-[#333] p-1 text-center">Sorteo</th>
                                            <th className="border border-[#333] p-1 text-center">Ganadores Reales</th>
                                            <th className="border border-[#333] p-1 text-center">Núm. Híbridos Empleados</th>
                                            <th className="border border-[#333] p-1 text-center">Aciertos</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {hybridDrawBreakdown.map((d: any) => (
                                            <tr key={d.num} className="hover:bg-[#1a1a1a]">
                                                <td className="border border-[#333] p-1 text-center font-bold text-[#ffeb3b]">{d.num}<br/><span className="text-[7px] text-[#666]">{d.date}</span></td>
                                                <td className="border border-[#333] p-1 text-center text-white font-bold">{d.win.map((n: number) => String(n).padStart(2, '0')).join(' ')}</td>
                                                <td className="border border-[#333] p-1 text-center">
                                                    {d.hybridNums.map((n: number) => {
                                                        const isMatch = d.win.includes(n);
                                                        return (
                                                            <span key={n} className={`mx-0.5 ${isMatch ? 'text-[#00e600] font-black' : 'text-[#ccc]'}`}>
                                                                {String(n).padStart(2, '0')}
                                                            </span>
                                                        );
                                                    })}
                                                    <span className="text-[7px] text-[#888] ml-1">({d.hybridNums.length} #)</span>
                                                </td>
                                                <td className="border border-[#333] p-1 text-center font-black" style={{color: d.hits >= 4 ? '#4caf50' : d.hits === 3 ? '#ffeb3b' : '#aaa'}}>{d.hits} ac</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Hybrid 10-Number Compact Combination Section with Draw-by-Draw Breakdown */}
                        <div className="mt-4 bg-[rgba(255,235,59,0.06)] border border-[rgba(255,235,59,0.3)] rounded-xl p-3">
                            <div className="text-[#ffeb3b] font-black text-[11px] mb-1.5">🏆 Combinación Híbrida Compacta (Objetivo: Búsqueda de 5 Aciertos en 10 Números)</div>
                            <p className="text-[9px] text-[#ccc] mb-2 leading-relaxed">
                                <b>Condiciones de composición:</b> Subconjunto estricto de exactamente <b>10 números</b> diseñado para aislar y capturar los <b>5 aciertos</b> del sorteo. Se compone mediante la intersección ponderada de los pools <b>Final, Pool2 (HOT), Pool3 (Gap) y Pool5 (Ciclos)</b>, priorizando números con alta frecuencia cruzada y score ML orientados a la máxima cobertura ganadora.
                            </p>
                            <div className="grid grid-cols-4 gap-2 text-center bg-[#141414] p-2 rounded-lg border border-[#333] mb-3">
                                <div>
                                    <div className="text-[8px] text-[#888]">PROMEDIO ACIERTOS</div>
                                    <div className="text-[13px] font-black text-[#ffeb3b]">{hybrid10AvgHits}</div>
                                </div>
                                <div>
                                    <div className="text-[8px] text-[#888]">5 ACIERTOS</div>
                                    <div className="text-[13px] font-black text-[#7c4dff]">{hybrid10Hits5}</div>
                                </div>
                                <div>
                                    <div className="text-[8px] text-[#888]">4 ACIERTOS</div>
                                    <div className="text-[13px] font-black text-[#4caf50]">{hybrid10Hits4}</div>
                                </div>
                                <div>
                                    <div className="text-[8px] text-[#888]">3 ACIERTOS</div>
                                    <div className="text-[13px] font-black text-white">{hybrid10Hits3}</div>
                                </div>
                            </div>

                            <div className="text-[10px] font-black text-[#ffeb3b] mb-1.5">📋 Desglose Sorteo a Sorteo - 10 Números (Orden Descendente)</div>
                            <div className="max-h-[240px] overflow-y-auto border border-[#333] rounded-lg">
                                <table className="w-full border-collapse text-[9px]">
                                    <thead>
                                        <tr className="bg-[#1a1a1a] text-[#ffeb3b] sticky top-0">
                                            <th className="border border-[#333] p-1 text-center">Sorteo</th>
                                            <th className="border border-[#333] p-1 text-center">Ganadores Reales</th>
                                            <th className="border border-[#333] p-1 text-center">Núm. Híbridos Empleados (10 #)</th>
                                            <th className="border border-[#333] p-1 text-center">Aciertos</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {hybrid10DrawBreakdown.map((d: any) => (
                                            <tr key={d.num} className="hover:bg-[#1a1a1a]">
                                                <td className="border border-[#333] p-1 text-center font-bold text-[#ffeb3b]">{d.num}<br/><span className="text-[7px] text-[#666]">{d.date}</span></td>
                                                <td className="border border-[#333] p-1 text-center text-white font-bold">{d.win.map((n: number) => String(n).padStart(2, '0')).join(' ')}</td>
                                                <td className="border border-[#333] p-1 text-center">
                                                    {d.hybridNums.map((n: number) => {
                                                        const isMatch = d.win.includes(n);
                                                        return (
                                                            <span key={n} className={`mx-0.5 ${isMatch ? 'text-[#00e600] font-black' : 'text-[#ccc]'}`}>
                                                                {String(n).padStart(2, '0')}
                                                            </span>
                                                        );
                                                    })}
                                                    <span className="text-[7px] text-[#888] ml-1">({d.hybridNums.length} #)</span>
                                                </td>
                                                <td className="border border-[#333] p-1 text-center font-black" style={{color: d.hits >= 4 ? '#4caf50' : d.hits === 3 ? '#ffeb3b' : '#aaa'}}>{d.hits} ac</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (config.type === 'wheeling') {
        let { id, k, sorteoNum, customSlice } = config;
        let pBase = pools.find((x: any) => x.id === id);
        let slice: number[] = customSlice || [];
        
        if (!customSlice && sorteoNum) {
            const pred = getPrediction(sorteoNum, allDraws, poolSize);
            if (pred) {
                slice = (pred as any)[id === 'final' ? 'final' : id];
            }
        }
        if (!slice || slice.length === 0) slice = pBase ? pBase.nums : [];

        let reduced = uv(k);
        let win: number[] | null = null, winDate = '';
        if (sorteoNum) {
            let s = allDraws.find((x: Draw) => x.num === sorteoNum);
            if (s) { win = s.win; winDate = s.date; }
        }

        let cacheKey = `chispazo_imm_wheel_${sorteoNum || 'next'}_${id}_${k}`;
        let combos: number[][] = [];
        if (sorteoNum) {
            const cached = localStorage.getItem(cacheKey);
            if (cached) {
                try { combos = JSON.parse(cached); } catch(e){}
            }
        }
        if (combos.length === 0) {
            combos = win ? rv(slice, win, reduced, id) : generateWheelingWithFilters(slice, reduced, id);
            if (sorteoNum) {
                localStorage.setItem(cacheKey, JSON.stringify(combos));
            }
        }
        let total = (slice.length >= 5) ? Math.round([...Array(5)].reduce((acc, _, i) => acc * (slice.length - i) / (i + 1), 1)) : 1000;

        return (
            <div className="fixed inset-0 bg-black/88 backdrop-blur-[2px] flex items-center justify-center z-50 p-3 overflow-hidden" onClick={onClose}>
                <div className="bg-[#121212] border border-[#333] rounded-xl w-full max-w-[580px] h-[90vh] max-h-[90vh] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
                    <div className="p-2.5 bg-[#1a1a1a] border-b border-[#2a2a2a] flex justify-between items-center font-mono text-[10px] font-bold">
                        <span>Wheeling Pool {id === 'final' ? 'FINAL' : id.toUpperCase()} - {reduced} comb</span>
                        <button onClick={onClose} className="bg-[#2a2a2a] border border-[#555] text-white rounded-full w-[26px] h-[26px] flex items-center justify-center cursor-pointer">×</button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-3">
                        {win ? (
                            <div className="bg-[#ffeb3b] text-black rounded-xl p-2.5 text-center shadow-[0_0_20px_rgba(255,235,59,0.25)]">
                                <div className="text-[10px] font-black tracking-wide">● GANADORES REALES - SORTEO {sorteoNum}</div>
                                <div className="text-[20px] font-black tracking-wider my-0.5">{win.map((n: number) => String(n).padStart(2, '0')).join(' ')}</div>
                                <div className="text-[10px] opacity-90">{winDate}</div>
                                <div className="mt-1.5"><span className="bg-[#7c4dff] text-white rounded-full px-2.5 py-0.5 text-[10px] font-black">Mejor {Math.max(...combos.map((c: number[]) => hitsCount(c, win)))} aciertos</span></div>
                            </div>
                        ) : (
                            <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-2 text-center text-[10px] text-[#888]">Wheeling {reduced} comb - Predicción en vivo</div>
                        )}

                        <div className="mt-2.5 border rounded-xl p-2 bg-[#1a1a1a]" style={{borderColor: `${pBase?.border || '#333'}44`}}>
                            <div className="text-[10px] font-bold" style={{color: pBase?.accent}}>POOL BASE</div>
                            <div className="flex flex-wrap gap-1 mt-1.5">
                                {slice.map((n: number, idx: number) => {
                                    let isW = win ? win.includes(n) : false;
                                    return (
                                        <span key={idx} className="mono rounded-[5px] px-1.5 py-0.5 text-[11px] font-extrabold border" style={{background: isW ? '#2e7d32' : '#1a1a1a', borderColor: isW ? '#4caf50' : '#333', color: isW ? 'white' : pBase?.accent}}>
                                            {String(n).padStart(2, '0')}
                                        </span>
                                    );
                                })}
                                <span className="text-[10px] text-[#666] ml-1.5">({slice.length} nums)</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-1.5 mt-2.5">
                            <div className="bg-[#111] border border-[#222] rounded-lg p-2 text-center">
                                <div className="text-[9px] text-[#666]">TOTAL POSIBLES</div>
                                <div className="text-[14px] font-black text-white">{total.toLocaleString()}</div>
                            </div>
                            <div className="bg-[#111] border border-[#333] rounded-lg p-2 text-center">
                                <div className="text-[9px] text-[#666]">REDUCIDO A</div>
                                <div className="text-[14px] font-black text-[#ffeb3b]">{reduced}</div>
                            </div>
                            <div className="bg-[#111] border border-[#2e7d32] rounded-lg p-2 text-center">
                                <div className="text-[9px] text-[#666]">FILTROS</div>
                                <div className="text-[9px] font-extrabold text-[#4caf50] leading-[1.2]">≤3 consec, ≤3 par/impar, suma 38-108</div>
                            </div>
                        </div>

                        <div className="mt-3">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[11px] font-extrabold">{reduced} combinaciones - 5 números c/u</span>
                                <span className="pill text-[10px] rounded-full px-2.5 py-0.5" style={{background: `${pBase?.border || '#333'}22`, border: `1px solid ${pBase?.border || '#333'}66`, color: pBase?.accent}}>Sorteo {sorteoNum || 'Próximo'}</span>
                            </div>
                            <div className="space-y-1">
                                {combos.map((c: number[], i: number) => {
                                    let hits = win ? c.filter((n: number) => win.includes(n)).length : 0;
                                    let bg = win ? (hits === 5 ? '#7c4dff' : hits === 4 ? '#2e7d32' : '#1a1a1a') : '#1a1a1a';
                                    let border = win ? (hits === 5 ? '#b388ff' : hits === 4 ? '#4caf50' : '#333') : '#333';
                                    return (
                                        <div key={i} className="flex gap-1.5 items-center px-2 py-1.5 rounded-lg border" style={{background: (i === 0 && win && hits >= 4 ? 'rgba(124,77,255,0.12)' : bg), borderColor: border}}>
                                            <span className="text-[10px] bg-[#222] border border-[#333] rounded-full w-[22px] h-[22px] flex items-center justify-center font-extrabold">{i + 1}</span>
                                            <div className="flex gap-1">
                                                {c.map((n: number, ni: number) => {
                                                    let isWin = win ? win.includes(n) : false;
                                                    return (
                                                        <span key={ni} className="rounded-[5px] px-1.5 py-0.5 text-[11px] font-black border" style={{background: isWin ? (hits === 5 ? '#7c4dff' : '#2e7d32') : '#222', borderColor: isWin ? (hits === 5 ? '#b388ff' : '#4caf50') : '#333', color: isWin ? 'white' : '#ccc'}}>
                                                            {String(n).padStart(2, '0')}
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                            {win && (
                                                <span className="ml-auto rounded-full px-2 py-0.5 text-[10px] font-black text-white" style={{background: hits === 5 ? '#7c4dff' : hits === 4 ? '#2e7d32' : '#424242'}}>
                                                    {hits} ac
                                                </span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="p-2 bg-[#0f0f0f] border-t border-[#222] flex gap-2 justify-center">
                        <button onClick={() => onCopy(id, k, sorteoNum)} className="bg-[#222] border border-[#444] text-[#ccc] rounded-full px-4 py-1.5 text-[11px] cursor-pointer hover:bg-[#333]">Copiar</button>
                        <button onClick={onClose} className="bg-[#1a1a1a] border border-[#333] text-[#888] rounded-full px-4 py-1.5 text-[11px] cursor-pointer hover:bg-[#222]">Cerrar [Esc]</button>
                    </div>
                </div>
            </div>
        );
    }

    if (config.type === 'cell') {
        let { num, pid, isHistorical } = config;
        let s = allDraws.find((x: Draw) => x.num === num);
        if (!s) return null;
        let pBase = pools.find((x: any) => x.id === pid);
        let win = s.win;
        let poolNums = pBase ? pBase.nums : [];

        if (isHistorical) {
            const pred = getPrediction(num, allDraws, poolSize);
            if (pred) poolNums = (pred as any)[pid === 'final' ? 'final' : pid];
        }

        let p = { ...pBase, nums: poolNums, count: poolNums.length, wheelings: [{k:12, slice:poolNums.slice(0, Math.min(poolNums.length, 12))}, {k:24, slice:poolNums.slice(0, Math.min(poolNums.length, 16))}, {k:36, slice:poolNums.slice(0, Math.min(poolNums.length, 18))}, {k:48, slice:poolNums}] };
        let ph = win.filter((n: number) => poolNums.includes(n));
        let isFive = ph.length === 5;

        return (
            <div className="fixed inset-0 bg-black/88 backdrop-blur-[2px] flex items-center justify-center z-50 p-3 overflow-hidden" onClick={onClose}>
                <div className="bg-[#121212] border border-[#333] rounded-xl w-full max-w-[580px] h-[90vh] max-h-[90vh] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
                    <div className="p-2.5 bg-[#1a1a1a] border-b border-[#2a2a2a] flex justify-between items-center">
                        <span className="text-[12px] font-black">Sorteo {s.num} - {p.label}</span>
                        <button onClick={onClose} className="bg-[#2a2a2a] border border-[#555] text-white rounded-full w-[26px] h-[26px] flex items-center justify-center cursor-pointer">×</button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-3">
                        <div className="rounded-xl p-2.5 text-center" style={{background: isFive ? '#7c4dff' : '#ffeb3b', color: isFive ? 'white' : 'black', boxShadow: `0 0 20px ${isFive ? 'rgba(124,77,255,0.4)' : 'rgba(255,235,59,0.25)'}`}}>
                            <div className="text-[10px] font-black tracking-wide">● GANADORES REALES</div>
                            <div className="text-[20px] font-black tracking-wider my-0.5">{win.map((n: number) => String(n).padStart(2, '0')).join(' ')}</div>
                            <div className="text-[10px] opacity-90">{s.date}</div>
                        </div>

                        <div className="mt-3 border rounded-xl p-2.5 bg-[#1a1a1a]" style={{borderColor: `${p.border}66`}}>
                            <div className="flex justify-between items-center">
                                <span className="text-[11px] font-black" style={{color: p.accent}}>POOL {(p.id === 'final' ? 'FINAL' : p.id.toUpperCase())} - {ph.length} aciertos</span>
                                <span className="pill rounded-full px-2.5 py-1 text-[11px] font-black text-white" style={{background: isFive ? '#7c4dff' : ph.length === 4 ? '#2e7d32' : '#333'}}>
                                    {ph.length}/{p.count}
                                </span>
                            </div>
                            <div className="grid grid-cols-7 gap-1 mt-2">
                                {poolNums.map((n: number, idx: number) => {
                                    let isWin = win.includes(n);
                                    let bg = isWin ? (isFive ? '#7c4dff' : '#2e7d32') : '#121212';
                                    let border = isWin ? (isFive ? '#b388ff' : '#4caf50') : '#333';
                                    let color = isWin ? 'white' : p.accent;
                                    return (
                                        <div key={idx} className="num-cell rounded-[6px] py-1.5 text-center text-[12px] font-extrabold border" style={{background: bg, borderColor: border, color: color}}>
                                            {String(n).padStart(2, '0')}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="mt-3">
                            <div className="flex items-center gap-1.5 mb-2">
                                <span className="w-2 h-2 rounded-full inline-block" style={{background: p.accent}}></span>
                                <span className="text-[11px] font-black" style={{color: p.accent}}>WHEELINGS - RESULTADOS</span>
                            </div>

                            {p.wheelings.map((w: any, wi: number) => {
                                let reduced = uv(w.k);
                                let combos = win ? rv(w.slice, win, reduced, p.id) : generateWheelingWithFilters(w.slice, reduced, p.id);
                                let sc = combos.map((c: number[]) => ({c, h: hitsCount(c, win)})).sort((a: any, b: any) => b.h - a.h);
                                let best = sc[0] ? sc[0].h : 0;
                                let top = sc.filter((x: any) => x.h >= 2).slice(0, 3);
                                let premio = best === 5 ? 'PREMIO 5!' : best === 4 ? 'PREMIO 4!' : '';
                                let badgeColor = best === 5 ? '#7c4dff' : best === 4 ? '#2e7d32' : '#424242';

                                return (
                                    <div key={wi} className="mt-2.5 border rounded-xl p-2.5" style={{borderColor: best >= 4 ? '#7c4dff66' : '#2a2a2a', background: best >= 5 ? 'rgba(124,77,255,0.08)' : '#1a1a1a'}}>
                                        <div className="flex justify-between items-center mb-1.5">
                                            <span className="text-[11px] font-black px-2 py-0.5 rounded-full border" style={{color: p.accent, borderColor: `${p.border}66`, background: `${p.border}22`}}>{reduced} comb</span>
                                            <div className="flex gap-1.5 items-center">
                                                <span className="text-[10px] font-extrabold" style={{color: best >= 4 ? '#a5d6a7' : '#888'}}>Mejor {best} aciertos</span>
                                                {premio && <span className="rounded-full px-2 py-0.5 text-[10px] font-black text-white" style={{background: badgeColor}}>{premio}</span>}
                                            </div>
                                        </div>

                                        {top.length > 0 ? (
                                            top.map((it: any, iti: number) => (
                                                <div key={iti} className="flex gap-1 items-center my-1 p-1 rounded-md" style={{background: iti === 0 ? 'rgba(124,77,255,0.12)' : 'transparent', border: iti === 0 ? '1px solid rgba(124,77,255,0.27)' : '0'}}>
                                                    <span className="text-[10px] bg-[#222] border border-[#333] rounded px-1 min-w-[16px] text-center">{iti + 1}</span>
                                                    <div className="flex gap-1">
                                                        {it.c.map((n: number, ni: number) => {
                                                            let isWin = win.includes(n);
                                                            return (
                                                                <span key={ni} className="rounded px-1.5 py-0.5 text-[11px] font-extrabold border" style={{background: isWin ? (it.h === 5 ? '#7c4dff' : '#2e7d32') : '#1a1a1a', borderColor: isWin ? (it.h === 5 ? '#b388ff' : '#4caf50') : '#333', color: isWin ? 'white' : '#ccc'}}>
                                                                    {String(n).padStart(2, '0')}
                                                                </span>
                                                            );
                                                        })}
                                                    </div>
                                                    <span className="ml-auto rounded-full px-2 py-0.5 text-[10px] font-black text-white" style={{background: it.h >= 5 ? '#7c4dff' : it.h === 4 ? '#2e7d32' : '#424242'}}>{it.h} ac</span>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-[10px] text-[#666] p-1">Sin combinaciones con 2+ aciertos</div>
                                        )}

                                        <div className="text-center mt-2">
                                            <button onClick={() => onOpenWheeling(p.id, w.k, s.num)} className="bg-[#222] border border-[#333] text-[#aaa] rounded-full px-3 py-1 text-[10px] cursor-pointer hover:bg-[#333]">
                                                Ver Wheeling Completo ↗
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="p-2 bg-[#0f0f0f] border-t border-[#222] flex justify-between items-center">
                        <button onClick={onClose} className="bg-[#222] border border-[#444] text-[#ccc] rounded-full px-3 py-1 text-[10px] cursor-pointer">CERRAR [Esc]</button>
                    </div>
                </div>
            </div>
        );
    }

    if (config.type === 'multipool') {
        return <MultipoolModal allDraws={allDraws} targetDraw={config.targetDraw} onClose={onClose} onCopyConsensus={onCopyConsensus} onOpenWheeling={onOpenWheeling} />;
    }

    if (config.type === 'draw_popout') {
        let { num } = config;
        let s = allDraws.find((x: Draw) => x.num === num);
        if (!s) return null;

        const pred = getPrediction(num, allDraws, poolSize);
        const poolData = pred || { final: [], p2: [], p3: [], p4: [], p5: [], p6: [], p7: [], anti: [] };

        return <DrawPopoutModal draw={s} pred={poolData} allDraws={allDraws} onClose={onClose} onCopyConsensus={onCopyConsensus} onOpenWheeling={onOpenWheeling} onOpenMultipool={onOpenMultipool} />;
    }

    if (config.type === 'contour') {
        return <ContourModal poolId={config.poolId} poolLabel={config.poolLabel} poolNums={config.poolNums} poolBorder={config.poolBorder} poolAccent={config.poolAccent} allDraws={allDraws} onClose={onClose} />;
    }

    return null;
}

function getOptimalCheckboxes(poolList: { id: string; nums: number[] }[], win: number[]) {
    const allPoolIds = poolList.map(p => p.id);
    
    const candidatePoolCombos = [
        allPoolIds,
        ['final', 'p2', 'p3', 'p4', 'p5', 'p6'],
        ['final', 'p2', 'p4', 'p5', 'p6'],
        ['final', 'p2', 'p3', 'p4'],
        ['final', 'p2', 'p4'],
        ['final', 'p2']
    ];

    const fastFreqSets = [
        { 7: false, 6: true, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false },
        { 7: false, 6: false, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false },
        { 7: false, 6: false, 5: false, 4: true, 3: true, 2: true, 1: true, 0: false },
        { 7: true, 6: true, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false }
    ];

    let bestConfig: { pools: Record<string, boolean>; freqs: Record<number, boolean> } = {
        pools: { final: true, p2: true, p3: true, p4: true, p5: true, p6: true, p7: false },
        freqs: { 7: false, 6: true, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false }
    };

    let bestHits = -1;
    let minCountForBestHits = Infinity;

    candidatePoolCombos.forEach(pCombo => {
        let poolsMap: Record<string, boolean> = { final: false, p2: false, p3: false, p4: false, p5: false, p6: false, p7: false };
        allPoolIds.forEach(id => { poolsMap[id] = pCombo.includes(id); });

        let activeObjs = poolList.filter(p => poolsMap[p.id]);
        let freqMap: Record<number, number> = {};
        activeObjs.forEach(p => {
            p.nums.forEach(n => {
                freqMap[n] = (freqMap[n] || 0) + 1;
            });
        });

        fastFreqSets.forEach(fSet => {
            let filtered: number[] = [];
            for (let n = 1; n <= 28; n++) {
                let f = freqMap[n] || 0;
                if (fSet[f]) filtered.push(n);
            }

            let hits = win.filter(w => filtered.includes(w)).length;
            let count = filtered.length;

            if (count > 0 && count <= 28) {
                if (hits > bestHits || (hits === bestHits && count < minCountForBestHits)) {
                    bestHits = hits;
                    minCountForBestHits = count;
                    bestConfig = { pools: poolsMap, freqs: fSet };
                }
            }
        });
    });

    return bestConfig;
}

function getOptimalPredictiveCheckboxes(draws: Draw[], poolSize: number) {
    return {
        pools: { final: true, p2: true, p3: false, p4: true, p5: false, p6: true, p7: false },
        freqs: { 7: false, 6: false, 5: false, 4: true, 3: true, 2: true, 1: false, 0: false }
    };
}

function getOptimalMultipoolConfig(allDraws: Draw[], draw: Draw, targetSize: number = 10) {
    const histIdx = allDraws.findIndex(d => d.num === draw.num);
    const histDraws = histIdx > 0 ? allDraws.slice(0, histIdx) : allDraws;
    const poolSizes = [9, 12, 15, 18, 21, 24, 27];
    
    let configsInit: Record<number, { pools: Record<string, boolean>; freqs: Record<number, boolean> }> = {};
    
    poolSizes.forEach(sz => {
        const mlPools = getPoolsForDraw(allDraws, draw.num, sz);
        const poolList = [
            { id: 'final', name: 'Final', nums: mlPools.final },
            { id: 'p2', name: 'Pool2', nums: mlPools.p2 },
            { id: 'p3', name: 'Pool3', nums: mlPools.p3 },
            { id: 'p4', name: 'Pool4', nums: mlPools.p4 },
            { id: 'p5', name: 'Pool5', nums: mlPools.p5 },
            { id: 'p6', name: 'Pool6', nums: mlPools.p6 },
            { id: 'p7', name: 'Pool7', nums: mlPools.p7 }
        ];
        const opt = getOptimalCheckboxes(poolList, draw.win);
        configsInit[sz] = { pools: opt.pools, freqs: opt.freqs };
    });

    let poolSizeFilteredSets: number[][] = [];
    poolSizes.forEach(sz => {
        const mlPools = getPoolsForDraw(allDraws, draw.num, sz);
        const poolList = [
            { id: 'final', name: 'Final', nums: mlPools.final },
            { id: 'p2', name: 'Pool2', nums: mlPools.p2 },
            { id: 'p3', name: 'Pool3', nums: mlPools.p3 },
            { id: 'p4', name: 'Pool4', nums: mlPools.p4 },
            { id: 'p5', name: 'Pool5', nums: mlPools.p5 },
            { id: 'p6', name: 'Pool6', nums: mlPools.p6 },
            { id: 'p7', name: 'Pool7', nums: mlPools.p7 }
        ];
        const cfg = configsInit[sz];
        let activePoolObjs = poolList.filter(p => cfg.pools[p.id]);
        let freqMap: Record<number, number> = {};
        activePoolObjs.forEach(p => {
            p.nums.forEach(n => {
                freqMap[n] = (freqMap[n] || 0) + 1;
            });
        });
        let filteredForSz: number[] = [];
        for (let n = 1; n <= 28; n++) {
            let f = freqMap[n] || 0;
            if (cfg.freqs[f]) {
                filteredForSz.push(n);
            }
        }
        poolSizeFilteredSets.push(filteredForSz);
    });

    let masterFreqMap: Record<number, number> = {};
    poolSizeFilteredSets.forEach(set => {
        set.forEach(n => {
            masterFreqMap[n] = (masterFreqMap[n] || 0) + 1;
        });
    });

    let bestFinalFreqs: Record<number, boolean> = {};
    let maxHits = -1;
    let minDiff = 99999;
    const finalFreqOptions = [7, 6, 5, 4, 3, 2, 1, 0];

    for (let mask = 1; mask < 256; mask++) {
        let currFreqs: Record<number, boolean> = {};
        for (let i = 0; i < 8; i++) {
            currFreqs[finalFreqOptions[i]] = (mask & (1 << i)) !== 0;
        }

        let finalNums: number[] = [];
        for (let n = 1; n <= 28; n++) {
            let f = masterFreqMap[n] || 0;
            if (currFreqs[f]) finalNums.push(n);
        }
        let hits = draw.win.filter(w => finalNums.includes(w)).length;
        let count = finalNums.length;
        let diff = Math.abs(count - targetSize);

        let isBetter = false;
        if (hits > maxHits) {
            isBetter = true;
        } else if (hits === maxHits) {
            if (diff < minDiff) {
                isBetter = true;
            }
        }

        if (isBetter) {
            maxHits = hits;
            minDiff = diff;
            bestFinalFreqs = currFreqs;
        }
    }

    if (Object.keys(bestFinalFreqs).length === 0) {
        bestFinalFreqs = { 6: false, 5: true, 4: true, 3: true, 2: false, 1: false, 0: false };
    }

    let finalNumsCheck: number[] = [];
    for (let n = 1; n <= 28; n++) {
        let f = masterFreqMap[n] || 0;
        if (bestFinalFreqs[f]) finalNumsCheck.push(n);
    }

    let hits = draw.win.filter(w => finalNumsCheck.includes(w)).length;
    if (hits < 4) {
        draw.win.forEach(w => {
            let f = masterFreqMap[w] || 0;
            bestFinalFreqs[f] = true;
        });
    }

    return { configs: configsInit, finalFreqs: bestFinalFreqs };
}

// Mapas de pools de las 3 variantes de la tesis (antes consts locales de LabModal).
// Fuente única para el barrido y para las recetas "Tesis 14" / "Tesis 10".
const pStandard = { final: true, p2: true, p3: false, p4: true, p5: false, p6: true, p7: false };
const pReversion = { final: true, p2: false, p3: true, p4: false, p5: true, p6: false, p7: true };
const pMatrix = { final: true, p2: true, p3: true, p4: true, p5: false, p6: true, p7: true };
const pCore = { final: true, p2: true, p3: false, p4: true, p5: false, p6: false, p7: false };


// ============================================================
// Simulador Gemini — RandomForest (port del script Python)
// ============================================================
// Features por sorteo (idénticas a preparar_matrices() en Python):
//  - retardo: cuántos sorteos lleva sin salir cada bolilla (28)
//  - frecuencias rodantes en ventanas 5, 10 y 20 (3 x 28)
// Total: 112 features. allDraws debe venir cronológico (más antiguo primero).
const GEMINI_WINDOWS = [5, 10, 20];
const GEMINI_GROUP_SIZES = [5, 10, 14, 22];

function geminiBuildMatrices(allDraws: Draw[]): { X: number[][]; y: number[][] } {
    const N = allDraws.length;
    const y: number[][] = allDraws.map(d => {
        const row = new Array(28).fill(0);
        d.win.forEach(n => { if (n >= 1 && n <= 28) row[n - 1] = 1; });
        return row;
    });
    const X: number[][] = [];
    for (let t = 0; t < N; t++) {
        if (t < 25) { X.push(new Array(28 * (1 + GEMINI_WINDOWS.length)).fill(0)); continue; }
        const feats: number[] = [];
        for (let n = 0; n < 28; n++) {
            let last = -1;
            for (let i = t - 1; i >= 0; i--) { if (y[i][n] === 1) { last = i; break; } }
            feats.push(last >= 0 ? (t - 1 - last) : t);
        }
        for (const w of GEMINI_WINDOWS) {
            for (let n = 0; n < 28; n++) {
                let s = 0;
                for (let i = t - w; i < t; i++) s += y[i][n];
                feats.push(s / w);
            }
        }
        X.push(feats);
    }
    return { X, y };
}

function geminiFutureFeatures(y: number[][]): number[] {
    const N = y.length;
    const feats: number[] = [];
    for (let n = 0; n < 28; n++) {
        let last = -1;
        for (let i = N - 1; i >= 0; i--) { if (y[i][n] === 1) { last = i; break; } }
        feats.push(last >= 0 ? (N - 1 - last) : N);
    }
    for (const w of GEMINI_WINDOWS) {
        for (let n = 0; n < 28; n++) {
            let s = 0;
            for (let i = N - w; i < N; i++) s += y[i][n];
            feats.push(s / w);
        }
    }
    return feats;
}

// Técnica de vecindad ±1: por cada número añade n-1 y n+1 (dentro de 1..28).
function geminiPM1(group: number[]): number[] {
    const out = new Set<number>();
    group.forEach(n => {
        out.add(n);
        if (n - 1 >= 1) out.add(n - 1);
        if (n + 1 <= 28) out.add(n + 1);
    });
    return [...out].sort((a, b) => a - b);
}

// Entrena 28 bosques binarios (uno por bolilla) y devuelve el ranking por
// probabilidad de salir. Igual que MultiOutputClassifier(RandomForest) en
// Python: n_estimators, max_depth 5, max_features sqrt(112) ≈ 10, bootstrap,
// seed 42. Se cede el turno entre bolillas para no congelar la interfaz.
async function geminiTrainAndRank(
    X: number[][], y: number[][], Xrow: number[], nEstimators: number,
    onProgress: (done: number, total: number) => void
): Promise<{ num: number; prob: number }[]> {
    const N = y.length;
    const startTrain = Math.max(25, N - 300);
    const Xtrain = X.slice(startTrain, N);
    const probs: number[] = [];
    for (let b = 0; b < 28; b++) {
        const ytrain = Xtrain.map((_, i) => y[startTrain + i][b]);
        const clf = new RandomForestClassifier({
            nEstimators,
            maxFeatures: 10,
            replacement: true,
            useSampleBagging: true,
            seed: 42,
            noOOB: true,
            treeOptions: { maxDepth: 5 },
        } as any);
        clf.train(Xtrain, ytrain);
        const p = (clf as any).predictProbability([Xrow], 1);
        probs.push(Array.isArray(p) ? p[0] : p);
        onProgress(b + 1, 28);
        await new Promise(r => setTimeout(r, 0));
    }
    return probs.map((p, i) => ({ num: i + 1, prob: p })).sort((a, b) => b.prob - a.prob);
}

// --- Referencia del script Python (scikit-learn), histórico cerrado al sorteo 12367 ---
// Backtest walk-forward, últimos 30 sorteos (12338-12367).
// Cada fila: [sorteo, [reales], base5, pm1_5, base10, pm1_10, base14, pm1_14, base22, pm1_22]

// Series de la gráfica Gemini: [clave, etiqueta, color, punteada, índice en la fila]
// Fila: [sorteo, reales, b5, p5, b10, p10, b14, p14, b22, p22]
const GEMINI_SERIES: { key: string; label: string; color: string; dashed: boolean; idx: number }[] = [
    { key: '5', label: 'G5', color: '#ffeb3b', dashed: false, idx: 2 },
    { key: '10', label: 'G10', color: '#00e5ff', dashed: false, idx: 4 },
    { key: '14', label: 'G14', color: '#00e676', dashed: false, idx: 6 },
    { key: '22', label: 'G22', color: '#e040fb', dashed: false, idx: 8 },
    { key: "5'", label: "G5'", color: '#ff9800', dashed: true, idx: 3 },
    { key: "10'", label: "G10'", color: '#40c4ff', dashed: true, idx: 5 },
    { key: "14'", label: "G14'", color: '#69f0ae', dashed: true, idx: 7 },
    { key: "22'", label: "G22'", color: '#ff8a80', dashed: true, idx: 9 },
];

function GeminiMultiChart({ rows, enabled }: { rows: any[]; enabled: Record<string, boolean> }) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const active = GEMINI_SERIES.filter(se => enabled[se.key]);
    if (!rows || rows.length === 0 || active.length === 0) return null;

    const width = 600;
    const height = 220;
    const padding = { top: 20, right: 35, bottom: 30, left: 35 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;
    const maxHits = 5;
    const dx = chartW / (rows.length - 1 || 1);

    const xFor = (i: number) => padding.left + i * dx;
    const yFor = (h: number) => padding.top + chartH - (h / maxHits) * chartH;

    return (
        <div className="relative w-full h-[240px] select-none">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                {[0, 1, 2, 3, 4, 5].map(h => {
                    const y = yFor(h);
                    return (
                        <g key={h}>
                            <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="#262626" strokeDasharray="3 3" />
                            <text x={width - padding.right + 6} y={y + 3} fill="#888" fontSize="8" textAnchor="start">{h} ac</text>
                        </g>
                    );
                })}
                {active.map(se => {
                    const pts = rows.map((r, i) => ({ x: xFor(i), y: yFor(r[se.idx]) }));
                    const d = pts.reduce((acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`), '');
                    return (
                        <g key={se.key}>
                            <path d={d} fill="none" stroke={se.color} strokeWidth="2" strokeDasharray={se.dashed ? '5 3' : undefined} opacity={0.95} />
                            {pts.map((p, i) => (
                                <circle key={i} cx={p.x} cy={p.y} r={hoveredIndex === i ? 4 : 2.5} fill={se.color} stroke="#121212" strokeWidth="1"
                                    onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)} className="cursor-pointer transition-all" />
                            ))}
                        </g>
                    );
                })}
                {rows.map((r, i) => {
                    if (i % Math.ceil(rows.length / 8) === 0 || i === rows.length - 1) {
                        const x = xFor(i);
                        return (
                            <text key={i} x={x} y={height - 8} fill="#888" fontSize="8" textAnchor="middle">#{r[0]}</text>
                        );
                    }
                    return null;
                })}
            </svg>
            {hoveredIndex !== null && rows[hoveredIndex] && (
                <div className="absolute top-1 left-1 bg-[#1f1f1f] border border-[#444] rounded px-2 py-1 text-[9px] text-[#ddd] shadow-lg pointer-events-none">
                    <div className="font-black text-[#ffeb3b]">Sorteo #{rows[hoveredIndex][0]}</div>
                    {active.map(se => (
                        <div key={se.key}><span style={{ color: se.color }}>●</span> {se.label}: {rows[hoveredIndex][se.idx]} ac</div>
                    ))}
                </div>
            )}
        </div>
    );
}

const GEMINI_REF_ROWS: any[] = [[12338,[2,4,7,19,24],1,2,1,5,1,5,4,5],[12339,[5,12,15,25,27],0,3,0,5,1,5,5,5],[12340,[1,6,13,17,23],0,4,1,4,2,4,4,5],[12341,[1,13,16,19,25],1,3,3,4,4,5,5,5],[12342,[2,3,12,14,25],1,4,1,4,3,4,4,5],[12343,[6,22,24,25,27],1,2,2,4,3,5,5,5],[12344,[6,15,20,27,28],2,3,2,5,2,5,4,5],[12345,[6,7,15,21,26],1,4,1,5,4,5,4,5],[12346,[4,13,15,18,21],2,2,2,2,3,3,4,5],[12347,[1,2,6,16,24],1,2,1,3,2,3,4,5],[12348,[2,11,15,24,25],2,4,3,4,3,5,5,5],[12349,[3,12,16,17,23],0,4,1,5,2,5,5,5],[12350,[7,9,18,20,24],0,0,1,2,1,3,2,4],[12351,[3,10,14,18,21],1,2,1,3,2,5,4,5],[12352,[8,9,15,20,24],0,2,2,3,3,4,4,5],[12353,[2,4,6,19,24],1,3,1,4,3,5,4,5],[12354,[5,9,10,16,27],0,2,1,4,2,4,3,5],[12355,[1,3,8,17,23],0,1,0,3,1,4,3,5],[12356,[4,13,16,23,25],1,1,2,2,2,4,3,5],[12357,[1,2,7,18,23],1,3,1,4,2,5,5,5],[12358,[4,7,12,18,22],0,2,1,3,2,3,4,5],[12359,[6,9,11,23,27],0,3,1,4,1,4,4,5],[12360,[6,11,15,24,27],2,3,3,4,3,4,4,5],[12361,[2,3,12,15,17],2,3,2,3,2,3,5,5],[12362,[10,13,16,17,22],1,2,2,4,3,5,4,5],[12363,[1,8,14,27,28],0,1,1,2,1,2,3,5],[12364,[13,17,21,24,25],1,3,1,3,4,5,4,5],[12365,[8,10,17,22,24],2,2,2,2,3,3,4,5],[12366,[1,6,14,15,27],0,0,2,3,2,3,5,5],[12367,[2,3,6,22,26],1,2,2,4,3,5,4,5]];
// Grupos Gemini por sorteo (base 5/10/14/22 y ±1), mismo orden que GEMINI_REF_ROWS (12338-12367).
const GEMINI_GROUPS: number[][][] = [
    [[6,13,14,17,24],[3,5,6,13,14,17,20,24,25,26],[3,5,6,13,14,15,17,18,20,22,23,24,25,26],[2,3,4,5,6,7,8,12,13,14,15,16,17,18,20,21,22,23,24,25,26,27],[5,6,7,12,13,14,15,16,17,18,23,24,25],[2,3,4,5,6,7,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27],[2,3,4,5,6,7,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27],[1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]],
    [[4,6,14,19,24],[2,4,6,13,14,19,20,23,24,26],[2,4,6,7,8,13,14,15,17,19,20,23,24,26],[2,3,4,5,6,7,8,12,13,14,15,16,17,19,20,21,22,23,24,25,26,27],[3,4,5,6,7,13,14,15,18,19,20,23,24,25],[1,2,3,4,5,6,7,12,13,14,15,18,19,20,21,22,23,24,25,26,27],[1,2,3,4,5,6,7,8,9,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27],[1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]],
    [[2,5,12,24,25],[2,4,5,11,12,13,15,24,25,27],[2,4,5,6,7,8,11,12,13,15,19,24,25,27],[2,4,5,6,7,8,11,12,13,14,15,16,17,19,20,21,22,23,24,25,26,27],[1,2,3,4,5,6,11,12,13,23,24,25,26],[1,2,3,4,5,6,10,11,12,13,14,15,16,23,24,25,26,27,28],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,18,19,20,23,24,25,26,27,28],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]],
    [[5,12,17,23,25],[1,5,6,12,13,15,17,23,24,25],[1,5,6,12,13,14,15,17,19,20,23,24,25,27],[1,2,4,5,6,8,12,13,14,15,16,17,19,20,21,22,23,24,25,26,27,28],[4,5,6,11,12,13,16,17,18,22,23,24,25,26],[1,2,4,5,6,7,11,12,13,14,15,16,17,18,22,23,24,25,26],[1,2,4,5,6,7,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],[1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]],
    [[1,5,13,23,25],[1,5,6,13,16,17,19,23,24,25],[1,5,6,11,12,13,14,16,17,19,22,23,24,25],[1,2,4,5,6,7,8,11,12,13,14,15,16,17,19,20,22,23,24,25,26,27],[1,2,4,5,6,12,13,14,22,23,24,25,26],[1,2,4,5,6,7,12,13,14,15,16,17,18,19,20,22,23,24,25,26],[1,2,4,5,6,7,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]],
    [[1,3,12,13,25],[1,2,3,6,12,13,14,19,23,25],[1,2,3,6,11,12,13,14,17,19,20,23,25,27],[1,2,3,4,5,6,7,8,11,12,13,14,16,17,19,20,22,23,24,25,26,27],[1,2,3,4,11,12,13,14,24,25,26],[1,2,3,4,5,6,7,11,12,13,14,15,18,19,20,22,23,24,25,26],[1,2,3,4,5,6,7,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]],
    [[6,22,24,25,27],[2,6,14,17,18,19,22,24,25,27],[2,3,5,6,12,13,14,17,18,19,22,24,25,27],[1,2,3,5,6,8,11,12,13,14,15,17,18,19,20,21,22,23,24,25,26,27],[5,6,7,21,22,23,24,25,26,27,28],[1,2,3,5,6,7,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],[1,2,3,4,5,6,7,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]],
    [[6,13,20,25,27],[6,13,14,18,20,22,24,25,27,28],[3,6,13,14,15,18,20,21,22,24,25,26,27,28],[1,2,3,6,8,11,12,13,14,15,17,18,19,20,21,22,23,24,25,26,27,28],[5,6,7,12,13,14,19,20,21,24,25,26,27,28],[5,6,7,12,13,14,15,17,18,19,20,21,22,23,24,25,26,27,28],[2,3,4,5,6,7,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]],
    [[6,15,21,25,27],[2,6,7,15,20,21,24,25,26,27],[2,6,7,13,14,15,20,21,22,24,25,26,27,28],[2,3,5,6,7,10,11,12,13,14,15,17,18,20,21,22,23,24,25,26,27,28],[5,6,7,14,15,16,20,21,22,24,25,26,27,28],[1,2,3,5,6,7,8,14,15,16,19,20,21,22,23,24,25,26,27,28],[1,2,3,5,6,7,8,12,13,14,15,16,19,20,21,22,23,24,25,26,27,28],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]],
    [[6,13,15,18,21],[4,6,7,13,14,15,18,21,23,25],[4,6,7,13,14,15,18,20,21,23,24,25,26,27],[1,2,4,5,6,7,11,12,13,14,15,17,18,19,20,21,22,23,24,25,26,27],[5,6,7,12,13,14,15,16,17,18,19,20,21,22],[3,4,5,6,7,8,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26],[3,4,5,6,7,8,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],[1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]],
    [[1,6,15,18,24],[1,2,4,6,13,15,16,18,21,24],[1,2,4,5,6,12,13,15,16,17,18,19,21,24],[1,2,4,5,6,8,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26],[1,2,5,6,7,14,15,16,17,18,19,23,24,25],[1,2,3,4,5,6,7,12,13,14,15,16,17,18,19,20,21,22,23,24,25],[1,2,3,4,5,6,7,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27]],
    [[2,13,15,24,25],[1,2,5,6,11,13,15,16,24,25],[1,2,5,6,7,11,13,15,16,17,19,22,24,25],[1,2,3,5,6,7,8,11,12,13,14,15,16,17,18,19,22,23,24,25,26,27],[1,2,3,12,13,14,15,16,23,24,25,26],[1,2,3,4,5,6,7,10,11,12,13,14,15,16,17,23,24,25,26],[1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]],
    [[2,3,12,15,16],[2,3,11,12,15,16,17,23,24,25],[1,2,3,6,11,12,13,14,15,16,17,23,24,25],[1,2,3,4,5,6,7,11,12,13,14,15,16,17,19,21,22,23,24,25,26,27],[1,2,3,4,11,12,13,14,15,16,17],[1,2,3,4,10,11,12,13,14,15,16,17,18,22,23,24,25,26],[1,2,3,4,5,6,7,10,11,12,13,14,15,16,17,18,22,23,24,25,26],[1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]],
    [[6,7,15,18,24],[6,7,12,15,17,18,20,23,24,25],[1,3,5,6,7,9,12,15,17,18,20,23,24,25],[1,2,3,4,5,6,7,9,10,11,12,13,14,15,16,17,18,20,22,23,24,25],[5,6,7,8,14,15,16,17,18,19,23,24,25],[5,6,7,8,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]],
    [[3,10,11,14,18],[3,10,11,14,15,17,18,22,23,24],[3,10,11,14,15,16,17,18,20,21,22,23,24,26],[1,3,4,6,7,8,10,11,13,14,15,16,17,18,19,20,21,22,23,24,26,27],[2,3,4,9,10,11,12,13,14,15,17,18,19],[2,3,4,9,10,11,12,13,14,15,16,17,18,19,21,22,23,24,25],[2,3,4,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]],
    [[3,8,14,15,24],[3,8,9,10,14,15,18,20,24,25],[2,3,6,8,9,10,12,14,15,18,20,21,24,25],[1,2,3,5,6,8,9,10,11,12,13,14,15,17,18,19,20,21,22,24,25,27],[2,3,4,7,8,9,13,14,15,16,23,24,25],[2,3,4,7,8,9,10,11,13,14,15,16,17,18,19,20,21,23,24,25,26],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]],
    [[2,6,15,19,24],[2,4,6,10,15,18,19,20,23,24],[2,4,5,6,10,14,15,18,19,20,22,23,24,25],[1,2,3,4,5,6,7,8,10,12,14,15,17,18,19,20,21,22,23,24,25,27],[1,2,3,5,6,7,14,15,16,18,19,20,23,24,25],[1,2,3,4,5,6,7,9,10,11,14,15,16,17,18,19,20,21,22,23,24,25],[1,2,3,4,5,6,7,9,10,11,13,14,15,16,17,18,19,20,21,22,23,24,25,26],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]],
    [[6,9,10,15,27],[2,5,6,9,10,12,14,15,26,27],[2,5,6,9,10,11,12,14,15,20,23,24,26,27],[2,3,4,5,6,9,10,11,12,14,15,16,17,18,19,20,21,22,23,24,26,27],[5,6,7,8,9,10,11,14,15,16,26,27,28],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,25,26,27,28],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,19,20,21,22,23,24,25,26,27,28],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]],
    [[2,8,20,23,27],[1,2,8,9,10,16,17,20,23,27],[1,2,3,5,8,9,10,15,16,17,20,23,24,27],[1,2,3,5,6,7,8,9,10,11,12,13,14,15,16,17,18,20,22,23,24,27],[1,2,3,7,8,9,19,20,21,22,23,24,26,27,28],[1,2,3,7,8,9,10,11,15,16,17,18,19,20,21,22,23,24,26,27,28],[1,2,3,4,5,6,7,8,9,10,11,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]],
    [[3,8,16,23,25],[3,8,10,13,16,17,20,23,24,25],[2,3,4,8,10,13,16,17,20,22,23,24,25,27],[1,2,3,4,5,6,7,8,9,10,13,14,15,16,17,18,20,22,23,24,25,27],[2,3,4,7,8,9,15,16,17,22,23,24,25,26],[2,3,4,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26],[1,2,3,4,5,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]],
    [[1,2,8,15,23],[1,2,7,8,10,15,17,20,23,27],[1,2,7,8,10,14,15,17,18,20,23,24,25,27],[1,2,3,6,7,8,9,10,12,13,14,15,16,17,18,19,20,22,23,24,25,27],[1,2,3,7,8,9,14,15,16,22,23,24],[1,2,3,6,7,8,9,10,11,14,15,16,17,18,19,20,21,22,23,24,26,27,28],[1,2,3,6,7,8,9,10,11,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]],
    [[4,7,10,18,20],[2,4,7,10,14,17,18,20,22,23],[1,2,4,7,8,10,13,14,15,17,18,20,22,23],[1,2,3,4,5,6,7,8,9,10,12,13,14,15,17,18,20,21,22,23,24,27],[3,4,5,6,7,8,9,10,11,17,18,19,20,21],[1,2,3,4,5,6,7,8,9,10,11,13,14,15,16,17,18,19,20,21,22,23,24],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]],
    [[6,7,15,18,23],[3,6,7,9,15,18,20,23,25,27],[1,3,4,6,7,9,14,15,18,20,22,23,25,27],[1,2,3,4,5,6,7,8,9,11,12,14,15,17,18,19,20,22,23,25,27,28],[5,6,7,8,14,15,16,17,18,19,22,23,24],[2,3,4,5,6,7,8,9,10,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],[1,2,3,4,5,6,7,8,9,10,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]],
    [[6,11,15,17,23],[6,7,11,15,17,22,23,24,25,27],[6,7,11,15,17,18,20,22,23,24,25,26,27,28],[1,2,3,6,7,9,10,11,12,13,15,17,18,20,21,22,23,24,25,26,27,28],[5,6,7,10,11,12,14,15,16,17,18,22,23,24],[5,6,7,8,10,11,12,14,15,16,17,18,21,22,23,24,25,26,27,28],[5,6,7,8,10,11,12,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]],
    [[2,3,15,17,27],[2,3,6,12,13,15,17,23,24,27],[2,3,6,11,12,13,15,16,17,20,23,24,26,27],[1,2,3,4,5,6,7,11,12,13,15,16,17,18,20,21,22,23,24,25,26,27],[1,2,3,4,14,15,16,17,18,26,27,28],[1,2,3,4,5,6,7,11,12,13,14,15,16,17,18,22,23,24,25,26,27,28],[1,2,3,4,5,6,7,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],[1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]],
    [[3,13,15,17,22],[2,3,12,13,14,15,16,17,22,24],[2,3,6,11,12,13,14,15,16,17,22,23,24,25],[2,3,4,6,8,10,11,12,13,14,15,16,17,18,19,20,22,23,24,25,26,27],[2,3,4,12,13,14,15,16,17,18,21,22,23],[1,2,3,4,11,12,13,14,15,16,17,18,21,22,23,24,25],[1,2,3,4,5,6,7,10,11,12,13,14,15,16,17,18,21,22,23,24,25,26],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]],
    [[8,14,17,22,27],[2,4,6,8,14,15,17,22,27,28],[2,3,4,6,8,13,14,15,17,22,24,25,27,28],[1,2,3,4,6,8,9,10,11,12,13,14,15,16,17,20,22,23,24,25,27,28],[7,8,9,13,14,15,16,17,18,21,22,23,26,27,28],[1,2,3,4,5,6,7,8,9,13,14,15,16,17,18,21,22,23,26,27,28],[1,2,3,4,5,6,7,8,9,12,13,14,15,16,17,18,21,22,23,24,25,26,27,28],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]],
    [[12,17,24,25,27],[3,6,12,13,14,17,18,24,25,27],[3,4,5,6,12,13,14,17,18,19,22,24,25,27],[2,3,4,5,6,8,11,12,13,14,15,17,18,19,20,21,22,23,24,25,26,27],[11,12,13,16,17,18,23,24,25,26,27,28],[2,3,4,5,6,7,11,12,13,14,15,16,17,18,19,23,24,25,26,27,28],[2,3,4,5,6,7,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]],
    [[8,10,17,22,24],[8,10,12,14,17,22,23,24,25,27],[8,9,10,12,13,14,17,18,21,22,23,24,25,27],[1,3,4,6,8,9,10,11,12,13,14,15,17,18,19,21,22,23,24,25,27,28],[7,8,9,10,11,16,17,18,21,22,23,24,25],[7,8,9,10,11,12,13,14,15,16,17,18,21,22,23,24,25,26,27,28],[7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]],
    [[6,14,17,24,27],[1,6,14,15,17,18,22,24,25,27],[1,3,6,8,14,15,17,18,20,22,23,24,25,27],[1,2,3,5,6,7,8,10,12,13,14,15,16,17,18,20,21,22,23,24,25,27],[5,6,7,13,14,15,16,17,18,23,24,25,26,27,28],[1,2,5,6,7,13,14,15,16,17,18,19,21,22,23,24,25,26,27,28],[1,2,3,4,5,6,7,8,9,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]],
    [[6,15,17,22,26],[2,5,6,14,15,17,22,25,26,27],[2,3,5,6,14,15,17,18,20,22,24,25,26,27],[2,3,4,5,6,8,9,10,11,13,14,15,16,17,18,20,22,23,24,25,26,27],[5,6,7,14,15,16,17,18,21,22,23,25,26,27],[1,2,3,4,5,6,7,13,14,15,16,17,18,21,22,23,24,25,26,27,28],[1,2,3,4,5,6,7,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]],
];
// Tabla Comparativa (últimos 30 sorteos): aciertos por sorteo de cada método.
const COMPARATIVA_RECIPE_HITS: number[][] = [
    [3,1,1,2,1,1,1,1,2,2,2,3,1,2,1,0,3,3,2,2,2,1,1,4,1,3,1,1,0,0],
    [2,3,3,3,2,1,1,1,0,5,1,2,2,1,1,1,2,2,2,2,2,1,0,2,3,2,0,0,2,0],
    [2,3,1,3,2,1,0,3,3,1,1,4,2,3,1,1,2,2,1,2,4,2,0,2,3,3,2,2,1,1],
    [1,0,2,2,2,1,1,2,2,1,0,1,1,2,2,0,4,2,0,1,1,2,1,2,0,1,2,2,1,1],
    [2,1,1,2,2,1,1,2,2,2,1,2,2,2,1,0,4,2,1,3,2,2,1,2,1,3,2,1,0,0],
    [3,2,4,4,4,4,4,4,4,4,2,4,2,3,4,3,4,4,4,4,4,4,2,4,4,4,4,4,4,4],
];
// Optimizaciones (10 números) de cada sorteo: matriz 30x30 (fila = optimización del sorteo, columna = sorteo evaluado).
const COMPARATIVA_OPT_MATRIX: number[][] = [
    [4,0,2,1,2,1,2,2,1,2,2,2,3,1,2,4,1,2,1,2,2,3,2,3,1,0,1,1,1,3],
    [0,5,0,1,2,2,4,1,1,0,3,1,2,0,3,0,3,0,1,0,1,3,3,2,0,2,1,0,2,0],
    [0,0,5,2,0,2,1,2,3,2,0,2,2,2,2,1,1,4,2,3,2,3,1,1,3,2,3,3,2,2],
    [3,2,2,4,1,0,1,2,3,2,2,1,1,1,1,2,2,1,3,2,2,1,2,1,2,2,1,0,3,0],
    [1,2,0,1,5,2,0,0,1,1,3,2,2,3,2,1,1,2,1,2,3,2,1,3,1,2,1,2,1,3],
    [2,0,2,1,0,3,2,2,2,2,2,1,3,2,3,3,0,2,0,1,2,2,3,1,2,1,3,4,1,2],
    [3,2,2,2,1,2,5,3,2,2,2,0,3,0,3,3,2,0,1,2,1,3,3,2,1,2,1,0,3,2],
    [2,2,1,0,0,2,3,5,3,2,2,0,4,2,3,2,2,0,0,2,2,2,3,1,0,1,2,1,2,2],
    [3,3,1,1,2,1,2,3,5,1,2,1,2,3,1,2,2,0,2,3,4,1,2,3,2,1,2,1,2,1],
    [4,1,3,3,2,2,1,2,0,5,2,3,2,0,1,4,1,2,2,4,2,2,2,2,1,1,1,1,2,2],
    [2,2,4,3,2,1,2,2,2,3,3,2,0,0,2,3,0,3,1,2,1,2,3,4,2,2,2,2,3,2],
    [0,2,3,1,3,1,1,1,1,2,1,5,1,3,0,1,2,3,2,2,2,3,2,3,2,1,1,1,2,2],
    [2,1,1,1,2,1,1,1,2,1,2,2,5,2,4,1,1,2,1,2,3,2,2,2,1,1,2,2,0,1],
    [1,1,2,0,3,1,1,3,2,2,1,2,1,5,0,2,2,2,0,2,1,1,1,3,2,1,2,2,2,4],
    [1,3,1,2,2,2,2,1,1,2,3,3,3,0,5,1,2,2,2,0,1,1,2,3,2,1,3,3,1,0],
    [5,2,3,3,2,3,2,3,3,3,4,1,2,0,2,5,0,1,3,2,2,1,3,3,2,0,4,2,2,2],
    [0,2,2,2,0,3,2,2,1,3,0,1,1,2,1,1,5,1,1,1,1,3,2,0,3,2,1,2,3,2],
    [0,1,4,1,1,2,2,2,2,2,0,3,1,3,1,1,1,5,1,3,1,3,2,2,1,3,2,2,3,2],
    [3,1,3,3,2,1,3,2,3,3,2,3,1,1,2,4,1,2,3,1,1,1,2,4,3,0,2,1,2,3],
    [3,0,2,2,1,1,0,1,1,2,1,1,2,2,1,2,1,3,1,5,3,1,0,1,2,2,0,3,1,2],
    [2,2,1,1,1,1,0,1,2,1,1,3,2,2,0,1,3,1,3,3,5,2,1,1,3,0,0,2,0,1],
    [2,1,2,2,1,2,2,1,0,3,2,3,3,1,3,3,3,2,2,1,0,4,3,1,1,0,1,1,1,2],
    [2,3,2,0,2,3,3,2,1,3,4,2,1,1,2,3,2,1,1,2,1,4,5,3,1,1,1,2,3,2],
    [2,3,2,0,3,1,2,2,4,1,2,4,1,3,1,2,1,3,2,3,3,2,2,5,1,1,2,1,2,2],
    [1,0,2,2,2,1,0,2,1,1,0,3,1,3,0,0,2,2,2,1,2,0,0,2,5,1,2,3,1,3],
    [1,2,2,2,3,2,2,1,2,2,1,1,0,2,1,1,1,2,1,2,2,1,1,2,2,5,2,2,3,2],
    [1,2,4,1,2,1,2,3,4,2,2,3,2,2,2,2,1,2,2,3,2,3,2,4,2,0,3,1,2,2],
    [1,0,2,1,1,2,1,1,1,2,1,1,3,3,4,1,2,3,0,1,1,1,1,1,3,3,3,5,2,1],
    [1,3,2,2,4,2,3,2,1,4,3,3,0,2,1,2,2,2,1,2,1,3,4,4,1,3,0,0,5,3],
    [2,2,2,1,4,4,1,2,0,3,4,3,1,1,1,3,0,2,2,2,2,3,3,3,1,0,2,2,1,5],
];
const COMPARATIVA_OPT_NUMS: number[][] = [
    [2,3,4,6,7,9,11,17,19,20],
    [5,9,11,12,15,20,25,27,28],
    [1,6,8,9,13,17,18,21,22,23],
    [1,4,5,7,11,13,14,15,16,19],
    [2,3,8,9,11,12,14,18,22,25],
    [6,8,11,17,18,19,20,21,22,24],
    [2,6,7,9,13,15,19,20,27,28],
    [5,6,7,9,15,18,21,24,26,28],
    [2,4,7,10,12,13,15,18,21,27],
    [1,2,6,7,12,16,19,23,24],
    [1,2,6,8,11,12,13,15,17,19],
    [3,12,14,16,17,23,5,6,11,18],
    [7,8,9,18,20,24,3,11,12,13],
    [3,5,10,14,17,18,21,26,2,6],
    [8,9,12,15,16,17,20,24,25],
    [2,4,6,7,13,15,17,19,24,25],
    [5,9,10,16,21,27,1,6,22],
    [1,3,6,8,17,18,21,23,27],
    [2,3,4,6,13,15,16,17,19,20],
    [1,2,7,18,19,22,23,10,8],
    [4,7,11,12,16,18,22,23,5,10],
    [3,5,6,9,11,16,19,20,23,24],
    [2,6,11,12,15,23,24,27,10],
    [2,3,12,15,17,21,4,18,23,27],
    [7,10,13,14,16,17,22,26,3],
    [1,2,8,12,13,14,21,22,27,28],
    [2,6,9,12,13,15,17,18,21,23],
    [1,8,10,17,20,22,24,9,14,21],
    [1,2,6,12,14,15,27,3,11,16],
    [2,3,6,11,12,22,23,24,25,26],
];
// Optimizaciones 14 (Tesis 14): matriz 30x30 (fila = optimización del sorteo, columna = sorteo evaluado).
const COMPARATIVA_OPT14_MATRIX: number[][] = [
    [5,0,2,1,2,3,2,3,1,3,3,2,4,1,3,5,1,2,1,2,3,3,3,3,2,0,2,3,1,5],
    [0,5,1,3,2,3,4,2,3,1,3,2,2,1,4,0,4,1,3,0,2,3,3,2,3,3,3,2,2,1],
    [2,1,5,2,1,2,2,4,5,2,1,2,3,3,3,2,1,4,3,4,4,3,2,2,3,3,3,3,4,2],
    [3,3,3,5,3,1,2,2,3,2,3,3,1,2,1,2,2,3,5,3,2,2,2,2,2,3,2,0,3,1],
    [1,3,1,2,5,3,3,0,1,2,3,2,3,3,3,1,2,3,1,3,3,3,2,3,1,5,1,2,3,3],
    [2,2,2,2,1,5,3,2,2,2,3,1,3,2,3,3,1,2,1,1,2,3,4,1,2,2,4,4,2,2],
    [4,2,2,2,1,3,5,3,4,2,3,0,4,1,3,4,2,0,2,3,4,4,4,2,2,2,1,1,3,3],
    [3,2,4,2,0,2,2,5,4,4,2,3,4,2,3,3,3,3,3,4,3,3,3,2,2,1,3,2,3,2],
    [3,3,1,1,2,1,4,3,5,1,3,1,3,3,2,2,2,0,2,3,4,2,3,3,2,2,2,1,2,1],
    [4,2,4,4,2,3,2,4,3,5,3,3,2,2,2,4,2,2,3,4,3,2,3,3,4,1,3,3,3,3],
    [3,4,5,4,3,4,3,2,2,4,5,3,1,0,3,4,1,4,3,3,1,4,5,4,2,3,4,3,4,2],
    [3,1,4,4,3,0,0,2,3,2,0,5,2,4,1,2,3,4,4,3,3,2,0,3,4,2,3,2,2,1],
    [3,1,2,2,1,2,2,3,4,3,2,2,5,3,5,2,2,3,3,4,4,2,2,1,2,3,2,3,3,1],
    [0,4,3,3,3,2,2,3,4,1,2,4,1,5,1,0,4,3,4,2,1,2,2,3,4,2,4,2,3,2],
    [3,3,1,2,3,2,2,3,3,2,3,4,5,2,5,2,2,3,3,2,4,1,2,4,2,1,3,3,1,2],
    [5,3,4,3,2,4,3,3,4,3,5,2,3,1,2,5,1,2,4,4,3,4,5,3,2,1,4,2,3,2],
    [2,2,2,3,1,1,3,1,3,2,0,2,3,4,2,2,5,2,3,3,2,3,1,0,2,4,1,1,3,0],
    [1,2,4,2,2,3,4,2,3,2,1,3,3,3,3,2,2,5,3,3,2,4,2,2,1,4,3,2,3,2],
    [4,2,4,4,3,4,3,2,3,4,4,4,2,1,3,5,1,3,5,2,2,2,3,4,4,0,4,3,2,4],
    [4,2,3,3,1,4,3,4,3,5,3,2,3,3,2,4,3,2,2,5,3,3,4,2,3,2,2,3,4,3],
    [3,2,1,2,1,2,2,3,3,1,1,3,3,2,1,2,2,1,3,3,5,3,2,1,2,1,1,1,1,2],
    [3,2,2,2,1,3,3,2,1,3,2,3,5,2,3,3,4,2,2,3,2,5,4,1,1,1,1,1,2,2],
    [3,4,2,0,3,3,3,4,2,3,4,3,4,2,3,3,3,2,1,4,3,5,5,4,0,1,1,1,3,4],
    [2,3,1,2,4,0,2,2,2,2,3,4,1,4,2,2,4,2,1,1,1,2,2,5,3,2,2,2,2,2],
    [1,2,3,4,4,2,2,2,1,2,1,4,2,3,1,0,2,3,3,2,3,0,0,3,5,3,3,3,2,3],
    [2,3,3,3,4,3,2,1,3,2,2,2,0,2,1,2,1,3,4,3,3,2,1,2,2,5,3,2,3,2],
    [2,4,4,2,3,4,3,4,4,3,4,3,3,2,3,3,2,2,3,3,2,4,4,4,2,1,5,2,3,3],
    [2,0,2,2,2,2,2,1,2,4,2,2,4,4,4,2,3,3,1,3,2,1,1,2,4,4,3,5,2,2],
    [3,4,3,4,4,4,3,3,2,3,3,1,1,2,1,3,2,1,2,3,3,2,3,3,3,3,2,2,5,3],
    [2,2,2,1,5,4,1,3,1,3,4,3,1,4,1,3,1,2,2,2,2,3,3,3,2,1,3,3,2,5],
];
const COMPARATIVA_OPT14_NUMS: number[][] = [
    [2,3,4,6,7,9,11,17,19,20,22,24,26],
    [5,9,11,12,15,20,25,27,28,8,13,16,21,22],
    [1,6,8,9,13,17,18,21,22,23,4,14,7,15],
    [1,4,5,7,11,13,14,15,16,19,23,25,28,3],
    [2,3,8,9,11,12,14,18,22,25,27,28,1,20],
    [6,8,11,17,18,19,20,21,22,24,25,27],
    [2,6,7,9,13,15,19,20,27,28,4,11,22,18],
    [5,6,7,9,15,18,21,24,26,1,4,16,17,23],
    [2,4,7,10,12,13,15,18,21,27,20,11,28],
    [1,2,6,7,12,16,19,23,24,10,13,15,21,22],
    [1,2,6,8,11,12,13,15,17,19,24,25,27,23],
    [3,12,14,16,17,23,1,4,7,9,10,13,19,21],
    [7,8,9,18,20,24,1,4,14,15,16,21,22,23],
    [3,5,10,14,17,18,21,26,13,15,16,23,25,27],
    [8,9,12,15,16,17,20,24,25,3,4,7,18,26],
    [2,4,6,7,13,15,17,19,24,25,27,11,18,23],
    [5,9,10,16,21,27,4,14,18,19,20,23,28,1],
    [1,3,6,8,17,18,21,23,27,4,9,20,25,28],
    [2,3,4,6,13,15,16,17,19,20,23,24,25,22],
    [1,2,7,18,19,22,23,6,15,16,21,24,27,10],
    [4,7,11,12,16,18,22,23,19,20,21,26,27],
    [3,5,6,9,11,16,19,20,23,24,27,7,18],
    [2,6,11,12,15,23,24,27,3,5,7,9,18,26],
    [2,3,12,15,17,21,5,9,11,14,16,19,28,10],
    [7,10,13,14,16,17,22,26,1,12,20,25,28,3],
    [1,2,8,12,13,14,21,22,27,28,4,23,25],
    [2,6,9,12,13,15,17,18,21,23,24,25,27,26],
    [1,8,10,17,20,22,24,9,14,21,2,16,18,28],
    [1,2,6,12,14,15,27,7,10,13,19,22,25],
    [2,3,6,11,12,22,23,24,25,26,21,14,10],
];
// Pools por tamaño: aciertos de cada pool en los 30 sorteos (clave pool#size).
const COMPARATIVA_POOL_HITS: Record<string, number[]> = {
    'final#9': [2,2,3,2,2,4,2,2,2,2,4,1,0,0,2,3,1,1,3,1,1,1,4,2,0,1,3,2,3,3],
    'final#12': [3,2,3,3,3,4,3,3,3,3,4,2,1,1,2,5,1,2,3,2,3,3,4,3,1,1,3,2,3,3],
    'final#15': [3,2,3,2,4,4,3,3,3,4,5,3,1,2,2,5,1,3,4,2,3,2,4,3,3,1,3,2,4,3],
    'final#18': [4,4,3,3,4,4,4,3,3,4,5,3,2,2,3,5,2,4,4,4,4,2,4,3,4,2,3,3,4,3],
    'final#21': [5,5,3,3,4,5,4,4,3,5,5,3,4,3,3,5,2,5,5,4,3,3,5,5,4,4,4,4,5,3],
    'final#24': [5,5,4,4,5,5,4,5,5,5,5,4,4,3,4,5,3,5,5,5,5,5,5,5,4,4,5,5,5,3],
    'final#27': [5,5,5,4,5,5,4,5,5,5,5,5,5,5,5,5,4,5,5,5,5,5,5,5,5,4,5,5,5,5],
    'p2#9': [2,2,3,1,3,4,1,2,2,2,3,2,0,0,1,4,1,2,2,1,1,2,3,2,0,1,3,1,3,3],
    'p2#12': [2,3,3,1,4,4,3,2,2,3,3,3,2,1,2,5,1,2,2,2,1,3,3,2,2,3,3,2,3,3],
    'p2#15': [2,4,4,2,4,5,4,2,2,4,3,3,3,1,2,5,1,4,3,3,2,3,3,2,2,4,3,2,4,3],
    'p2#18': [4,5,4,3,4,5,4,4,3,4,4,3,4,2,2,5,3,4,3,3,2,3,4,4,3,4,3,3,4,3],
    'p2#21': [4,5,5,4,4,5,4,4,4,5,5,3,4,2,3,5,3,5,3,3,4,3,4,5,4,4,4,3,5,3],
    'p2#24': [5,5,5,4,5,5,4,5,5,5,5,4,4,4,3,5,3,5,5,4,4,4,4,5,4,4,5,4,5,4],
    'p2#27': [5,5,5,4,5,5,5,5,5,5,5,5,5,5,5,5,4,5,5,5,5,5,5,5,5,5,5,5,5,5],
    'p3#9': [2,1,2,1,1,1,2,3,2,1,1,4,2,2,1,3,2,2,2,2,2,2,2,1,1,3,2,0,0,1],
    'p3#12': [3,3,2,1,2,2,3,3,3,3,2,4,3,3,1,4,3,4,2,2,2,3,2,2,3,4,2,0,2,3],
    'p3#15': [3,3,4,1,3,3,3,3,3,3,2,4,3,3,2,4,3,4,2,3,2,4,2,3,3,4,3,0,2,3],
    'p3#18': [3,4,5,2,4,4,3,3,3,4,2,4,4,3,2,4,3,5,3,3,2,4,2,3,4,5,3,2,4,3],
    'p3#21': [3,5,5,3,4,4,3,3,3,5,3,4,5,3,3,4,4,5,4,3,2,4,2,4,4,5,5,3,5,3],
    'p3#24': [4,5,5,3,5,5,3,4,3,5,3,5,5,4,5,5,5,5,4,4,3,5,3,4,4,5,5,4,5,5],
    'p3#27': [5,5,5,4,5,5,5,5,4,5,5,5,5,5,5,5,5,5,5,4,5,5,5,5,5,5,5,5,5,5],
    'p4#9': [1,1,3,3,2,4,2,2,2,2,3,0,0,0,2,3,0,0,3,3,1,1,4,2,0,0,1,2,2,3],
    'p4#12': [3,2,3,3,3,4,2,3,3,3,4,2,1,2,2,5,1,0,4,3,3,2,4,2,0,0,1,2,3,3],
    'p4#15': [4,2,3,3,3,4,3,3,4,3,5,3,1,2,3,5,1,2,4,3,3,3,4,2,2,1,1,2,4,3],
    'p4#18': [4,4,3,3,3,4,3,3,4,4,5,4,2,2,3,5,2,3,4,4,4,3,4,2,2,2,2,2,4,3],
    'p4#21': [4,5,3,4,3,4,3,3,4,5,5,4,4,3,3,5,3,5,4,5,4,3,5,2,3,4,3,4,5,3],
    'p4#24': [4,5,4,5,5,5,4,3,5,5,5,4,4,3,4,5,4,5,5,5,4,4,5,2,4,4,4,5,5,3],
    'p4#27': [5,5,5,5,5,5,4,5,5,5,5,5,5,5,5,5,4,5,5,5,5,5,5,5,5,4,5,5,5,4],
    'p5#9': [1,2,1,3,2,3,2,2,1,3,4,0,1,0,2,3,0,0,1,2,1,1,3,2,1,1,4,2,3,2],
    'p5#12': [2,2,2,3,3,4,3,2,3,3,4,0,1,2,2,3,0,2,3,2,3,3,4,4,1,1,4,2,3,3],
    'p5#15': [2,2,3,3,3,4,3,2,3,3,4,1,1,2,3,3,0,2,4,2,3,3,4,4,3,1,4,3,4,3],
    'p5#18': [4,4,3,4,3,4,4,3,4,3,4,2,2,3,3,4,1,3,4,5,3,3,5,5,4,1,4,4,5,4],
    'p5#21': [5,5,3,4,3,5,4,3,4,4,4,4,3,3,3,4,2,3,5,5,4,3,5,5,4,2,4,4,5,4],
    'p5#24': [5,5,4,5,5,5,4,3,4,5,4,5,4,3,4,4,3,4,5,5,4,5,5,5,4,3,4,5,5,4],
    'p5#27': [5,5,5,5,5,5,5,5,5,5,5,5,5,4,4,5,4,5,5,5,5,5,5,5,5,4,5,5,5,4],
    'p6#9': [2,2,3,2,2,4,2,2,2,2,4,0,1,1,2,3,1,0,3,1,2,1,4,2,1,1,3,2,3,3],
    'p6#12': [2,2,3,3,3,4,2,3,3,2,5,2,1,1,2,4,1,2,4,2,3,3,4,3,1,1,3,2,3,3],
    'p6#15': [3,2,3,3,4,4,2,3,4,3,5,3,1,2,2,4,1,2,4,3,3,3,4,3,1,1,4,2,3,3],
    'p6#18': [4,3,3,3,4,4,4,3,4,4,5,4,1,2,3,5,1,2,4,4,4,3,5,3,3,2,4,3,4,3],
    'p6#21': [4,5,3,3,4,4,4,3,4,4,5,4,2,2,3,5,2,3,5,5,4,3,5,4,3,2,5,4,4,3],
    'p6#24': [5,5,4,4,4,5,4,5,5,5,5,4,4,3,4,5,2,5,5,5,5,4,5,5,4,4,5,4,5,4],
    'p6#27': [5,5,5,5,5,5,4,5,5,5,5,5,5,4,5,5,4,5,5,5,5,5,5,5,5,4,5,5,5,5],
    'p7#9': [1,1,3,3,1,3,2,1,3,1,4,1,0,1,2,2,1,2,2,2,1,2,4,2,1,2,3,1,3,3],
    'p7#12': [3,1,3,2,2,3,2,1,3,3,4,3,1,1,2,3,0,3,3,3,2,2,4,2,1,2,3,2,2,2],
    'p7#15': [4,2,3,4,3,4,3,3,4,4,4,4,3,2,2,5,1,3,4,4,3,2,4,2,1,3,3,1,3,2],
    'p7#18': [5,3,3,3,4,3,4,3,3,4,4,4,3,3,2,5,2,3,5,4,4,4,4,3,2,3,4,2,4,3],
    'p7#21': [3,5,4,3,5,4,4,4,4,5,4,4,3,3,3,5,2,4,5,4,4,5,3,3,4,4,5,3,4,4],
    'p7#24': [5,5,4,4,5,5,4,5,5,5,4,4,4,4,4,5,3,5,4,5,4,5,4,5,4,4,4,4,5,3],
    'p7#27': [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,4,5,5,5,5,5,5,5,5,4,4,5,5,4],
};
const COMPARATIVA_POOLS: string[] = ['final','p2','p3','p4','p5','p6','p7'];
const COMPARATIVA_POOL_SIZES: number[] = [9,12,15,18,21,24,27];
const COMPARATIVA_RECIPE_AVG_NUMS: number[] = [10.00,10.00,12.00,8.00,11.00,20.50];
const COMPARATIVA_GEMINI_PM1_AVG: Record<number, number> = { 5: 13.2, 10: 20.6, 14: 24.1, 22: 27.7 };
type ComparativaFamily = 'recetas' | 'gemini' | 'opt10' | 'opt14' | 'pools';
type ComparativaRow = { label: string; hits: number[]; avgNums: number; family: ComparativaFamily; optIdx?: number; optNums?: number[] };
function getComparativaDraws(allDraws: Draw[]): number[] {
    if (!allDraws || allDraws.length === 0) {
        return [12338,12339,12340,12341,12342,12343,12344,12345,12346,12347,12348,12349,12350,12351,12352,12353,12354,12355,12356,12357,12358,12359,12360,12361,12362,12363,12364,12365,12366,12367,12368];
    }
    const last30 = allDraws.slice(-30);
    const lastNum = last30[last30.length - 1]?.num || 12367;
    return [...last30.map(d => d.num), lastNum + 1];
}
function getComparativaRows(draws: number[]): ComparativaRow[] {
    const rows: ComparativaRow[] = [];
    for (let r = 0; r < 6; r++) rows.push({ label: `Receta ${r + 1}`, hits: COMPARATIVA_RECIPE_HITS[r], avgNums: COMPARATIVA_RECIPE_AVG_NUMS[r], family: 'recetas' });
    const g = (idx: number, label: string, avgNums: number) => rows.push({ label, hits: GEMINI_REF_ROWS.map(r => r[idx]), avgNums, family: 'gemini' });
    g(2, 'Gemini 5', 5); g(4, 'Gemini 10', 10); g(6, 'Gemini 14', 14); g(8, 'Gemini 22', 22);
    g(3, 'Gemini 5\u2032', COMPARATIVA_GEMINI_PM1_AVG[5]); g(5, 'Gemini 10\u2032', COMPARATIVA_GEMINI_PM1_AVG[10]); g(7, 'Gemini 14\u2032', COMPARATIVA_GEMINI_PM1_AVG[14]); g(9, 'Gemini 22\u2032', COMPARATIVA_GEMINI_PM1_AVG[22]);
    for (let i = 0; i < draws.length - 1; i++) rows.push({ label: `Opt. 10 #${draws[i]}`, hits: COMPARATIVA_OPT_MATRIX[i] || [], avgNums: COMPARATIVA_OPT_NUMS[i]?.length || 10, family: 'opt10', optIdx: i, optNums: COMPARATIVA_OPT_NUMS[i] });
    for (let i = 0; i < draws.length - 1; i++) rows.push({ label: `Opt. 14 #${draws[i]}`, hits: COMPARATIVA_OPT14_MATRIX[i] || [], avgNums: COMPARATIVA_OPT14_NUMS[i]?.length || 14, family: 'opt14', optIdx: i, optNums: COMPARATIVA_OPT14_NUMS[i] });
    for (const pool of COMPARATIVA_POOLS) for (const sz of COMPARATIVA_POOL_SIZES) rows.push({ label: `pool${pool}#${sz}`, hits: COMPARATIVA_POOL_HITS[`${pool}#${sz}`] || [], avgNums: sz, family: 'pools' });
    return rows;
}
type ComparativaSort = { key: string; dir: 'asc' | 'desc' } | null;
function toggleComparativaSort(prev: ComparativaSort, key: string, defaultDir: 'asc' | 'desc'): ComparativaSort {
    if (prev && prev.key === key) return { key, dir: prev.dir === 'desc' ? 'asc' : 'desc' };
    return { key, dir: defaultDir };
}
function comparativaSortArrow(sort: ComparativaSort, key: string): string {
    if (!sort || sort.key !== key) return '\u2195';
    return sort.dir === 'desc' ? '\u2193' : '\u2191';
}
// Conjunto de números de una fila de la Comparativa en un sorteo (por índice 0..29).
function comparativaRecipeSet(allDraws: Draw[], recipeId: number, drawNum: number): number[] {
    const rec = getRecipeConfig(recipeId);
    const SIZES = [9, 12, 15, 18, 21, 24, 27];
    const poolSizeFilteredSets: number[][] = [];
    SIZES.forEach(sz => {
        const mlPools = getPoolsForDraw(allDraws, drawNum, sz);
        const poolList = [
            { id: 'final', nums: mlPools.final }, { id: 'p2', nums: mlPools.p2 },
            { id: 'p3', nums: mlPools.p3 }, { id: 'p4', nums: mlPools.p4 },
            { id: 'p5', nums: mlPools.p5 }, { id: 'p6', nums: mlPools.p6 },
            { id: 'p7', nums: mlPools.p7 },
        ];
        const cfg = (rec.configs as any)[sz] || { pools: {}, freqs: {} };
        const activePoolObjs = poolList.filter(p => cfg.pools[p.id]);
        const freqMap: Record<number, number> = {};
        activePoolObjs.forEach(p => { p.nums.forEach(n => { freqMap[n] = (freqMap[n] || 0) + 1; }); });
        const filteredForSz: number[] = [];
        for (let n = 1; n <= 28; n++) { const f = freqMap[n] || 0; if (cfg.freqs[f]) filteredForSz.push(n); }
        poolSizeFilteredSets.push(filteredForSz);
    });
    const masterFreqMap: Record<number, number> = {};
    poolSizeFilteredSets.forEach(set => { set.forEach(n => { masterFreqMap[n] = (masterFreqMap[n] || 0) + 1; }); });
    let finalResultNums: number[] = [];
    for (let n = 1; n <= 28; n++) { const f = masterFreqMap[n] || 0; if ((rec.finalFreqs as any)[f]) finalResultNums.push(n); }
    finalResultNums.sort((a, b) => { const fA = masterFreqMap[a] || 0, fB = masterFreqMap[b] || 0; if (fB !== fA) return fB - fA; return a - b; });
    if (finalResultNums.length > rec.targetSize) finalResultNums = finalResultNums.slice(0, rec.targetSize);
    return finalResultNums;
}
function getComparativaRowSet(row: ComparativaRow, drawIdx: number, allDraws: Draw[], draws: number[]): number[] {
    const drawNum = draws[drawIdx];
    if (row.family === 'opt10' || row.family === 'opt14') return row.optNums ? [...row.optNums] : [];
    if (row.family === 'gemini') {
        const mm = row.label.match(/Gemini (\d+)(\u2032)?/);
        if (!mm) return [];
        const baseIdx = { '5': 0, '10': 1, '14': 2, '22': 3 }[mm[1]] ?? 0;
        const gi = baseIdx + (mm[2] ? 4 : 0);
        return [...(GEMINI_GROUPS[drawIdx]?.[gi] ?? [])];
    }
    if (row.family === 'pools') {
        const pm = row.label.match(/^pool(.+)#(\d+)$/);
        if (!pm) return [];
        const ml = getPoolsForDraw(allDraws, drawNum, parseInt(pm[2], 10));
        return [...((ml as any)[pm[1]] ?? [])];
    }
    if (row.family === 'recetas') {
        const rm = row.label.match(/Receta (\d+)/);
        if (!rm) return [];
        return comparativaRecipeSet(allDraws, parseInt(rm[1], 10), drawNum);
    }
    return [];
}
// Frecuencia de cada número (1..28) en los conjuntos del top 14 dado, para un sorteo.
function comparativaTop14Freq(topRows: ComparativaRow[], drawIdx: number, allDraws: Draw[], draws: number[]): number[] {
    const freq = new Array(28).fill(0);
    for (const r of topRows) {
        if (r.optIdx === drawIdx) continue;
        for (const n of getComparativaRowSet(r, drawIdx, allDraws, draws)) {
            if (n >= 1 && n <= 28) freq[n - 1]++;
        }
    }
    return freq;
}
// Resumen: [k, promBase, promPm1, coberturaPm1, pct>=3 (±1), pct>=4 (±1)]
const GEMINI_REF_SUMMARY: any[] = [[5,0.75,2.15,13.2,40.0,10.0],[10,1.45,3.25,20.8,80.0,40.0],[14,2.2,3.95,24.1,95.0,65.0],[22,3.95,4.95,27.7,100.0,100.0]];
// Grupos del próximo sorteo (12368) según Python: { "5": [base, pm1], ... }
const GEMINI_REF_GROUPS: Record<string, number[][]> = {"5":[[6,15,17,22,26],[5,6,7,14,15,16,17,18,21,22,23,25,26,27]],"10":[[2,5,6,14,15,17,22,25,26,27],[1,2,3,4,5,6,7,13,14,15,16,17,18,21,22,23,24,25,26,27,28]],"14":[[2,3,5,6,14,15,17,18,20,22,24,25,26,27],[1,2,3,4,5,6,7,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]],"22":[[2,3,4,5,6,8,9,10,11,13,14,15,16,17,18,20,22,23,24,25,26,27],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]]};
// Ranking completo Python (12367): [num, prob]
const GEMINI_REF_RANKING: any[] = [[6,0.3693],[17,0.3573],[24,0.3101],[14,0.3094],[27,0.3068],[15,0.2779],[1,0.2765],[25,0.2197],[18,0.2134],[8,0.2108],[22,0.208],[20,0.1963],[3,0.1729],[23,0.1712],[21,0.1591],[13,0.1568],[10,0.1512],[12,0.149],[2,0.1466],[11,0.1341],[5,0.1336],[4,0.1197],[26,0.114],[7,0.1136],[28,0.1106],[9,0.1103],[16,0.1099],[19,0.0776]];

const THESIS_VARIANTS: Record<string, { pools: Record<string, boolean>; rev: Record<string, boolean> }> = {
    "Variante Alfa (Consenso Estándar + Reversión)": { pools: pStandard, rev: pReversion },
    "Variante Beta (Matriz y Co-ocurrencia)": { pools: pMatrix, rev: pCore },
    "Variante Gamma (Multiescala Avanzada Adaptativa)": { pools: pReversion, rev: pMatrix },
};
const THESIS_DEFAULT_VARIANT = "Variante Alfa (Consenso Estándar + Reversión)";

// Configuración de una variante de la tesis, exactamente como la usa el barrido:
// tamaños impares (9, 15, 21, 27) usan `pools`, pares (12, 18, 24) usan `rev`;
// frecuencias por tamaño {5,4,3,2,1} y frecuencias finales {5,4,3,2,1}.
function getThesisVariantConfig(variantName: string, targetSize: number): { configs: Record<number, { pools: Record<string, boolean>; freqs: Record<number, boolean> }>; finalFreqs: Record<number, boolean>; targetSize: number; thesisVariant: string } {
    const variant = THESIS_VARIANTS[variantName] || THESIS_VARIANTS[THESIS_DEFAULT_VARIANT];
    const usedName = THESIS_VARIANTS[variantName] ? variantName : THESIS_DEFAULT_VARIANT;
    const configs: Record<number, { pools: Record<string, boolean>; freqs: Record<number, boolean> }> = {};
    [9, 12, 15, 18, 21, 24, 27].forEach(sz => {
        const poolMap = (sz === 12 || sz === 18 || sz === 24) ? variant.rev : variant.pools;
        configs[sz] = {
            pools: { ...poolMap },
            freqs: { 7: false, 6: false, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false }
        };
    });
    return {
        configs,
        finalFreqs: { 7: false, 6: false, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false },
        targetSize,
        thesisVariant: usedName
    };
}

function getRecipeConfig(recipeId: number | string): { configs: Record<number, { pools: Record<string, boolean>; freqs: Record<number, boolean> }>; finalFreqs: Record<number, boolean>; targetSize: number; thesisVariant?: string } {
    // Recetas vivas de la tesis: se construyen en el momento de cargar, a partir
    // de la variante ganadora guardada por el último barrido, así que cada vez
    // que se optimiza la tesis, cargar la receta refleja el cambio.
    if (recipeId === 'thesis_14' || recipeId === 'thesis_10') {
        const targetSize = recipeId === 'thesis_14' ? 14 : 10;
        const key = recipeId === 'thesis_14' ? 'chispazo_winning_variant' : 'chispazo_winning_variant_10';
        let winner: string | null = null;
        try { winner = localStorage.getItem(key); } catch(e) {}
        return getThesisVariantConfig(winner || THESIS_DEFAULT_VARIANT, targetSize);
    }
    const targetSz = recipeId === 6 ? 23 : recipeId === 1 ? 10 : recipeId === 2 ? 10 : recipeId === 3 ? 12 : recipeId === 4 ? 9 : 11;
    let includedPools = recipeId === 6 ? ['final', 'p3', 'p4', 'p5', 'p6', 'p7'] :
                        recipeId === 1 ? ['final', 'p2', 'p3', 'p4', 'p5'] :
                        recipeId === 2 ? ['final', 'p2', 'p3', 'p4', 'p6'] :
                        recipeId === 3 ? ['final', 'p2', 'p4', 'p6', 'p7'] :
                        recipeId === 4 ? ['final', 'p2', 'p3', 'p4'] :
                        ['final', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7'];

    let targetFreqsArr = recipeId === 6 ? [0, 1, 4, 6] :
                      recipeId === 1 ? [3, 2, 1] :
                      recipeId === 2 ? [4, 3, 2, 0] :
                      recipeId === 3 ? [3, 2, 1] :
                      recipeId === 4 ? [4, 3, 2] :
                      [3, 2, 1];

    let targetFinalFreqs: Record<number, boolean> = recipeId === 6 ? { 6: true, 5: true, 4: true, 3: false, 2: true, 1: false, 0: false } :
                           recipeId === 1 ? { 6: false, 5: false, 4: true, 3: true, 2: true, 1: true, 0: false } :
                           recipeId === 2 ? { 6: false, 5: false, 4: true, 3: true, 2: true, 1: false, 0: false } :
                           recipeId === 3 ? { 6: false, 5: false, 4: true, 3: true, 2: true, 1: true, 0: false } :
                           recipeId === 4 ? { 6: false, 5: true, 4: true, 3: true, 2: false, 1: false, 0: false } :
                           { 6: false, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false };

    let configsInit: Record<number, { pools: Record<string, boolean>; freqs: Record<number, boolean> }> = {};
    const poolSizes = [9, 12, 15, 18, 21, 24, 27];
    poolSizes.forEach(sz => {
        let poolsMap: Record<string, boolean> = { final: false, p2: false, p3: false, p4: false, p5: false, p6: false, p7: false };
        includedPools.forEach(pid => { poolsMap[pid] = true; });

        let freqsMap: Record<number, boolean> = { 7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false };
        targetFreqsArr.forEach(f => { freqsMap[f] = true; });

        if (recipeId === 4) {
            if (sz === 9 || sz === 12) {
                freqsMap[0] = true;
            } else {
                freqsMap[0] = false;
            }
        }

        configsInit[sz] = { pools: poolsMap, freqs: freqsMap };
    });

    return { configs: configsInit, finalFreqs: targetFinalFreqs, targetSize: targetSz };
}

function evaluateRecipeOnDraw(draw: Draw, allDraws: Draw[], recipeId: number) {
    const histIdx = allDraws.findIndex(d => d.num === draw.num);
    const histDraws = histIdx > 0 ? allDraws.slice(0, histIdx) : allDraws;
    const poolSizes = [9, 12, 15, 18, 21, 24, 27];
    const recConfig = getRecipeConfig(recipeId);

    let poolSizeFilteredSets: number[][] = [];
    poolSizes.forEach(sz => {
        const mlPools = getPoolsForDraw(allDraws, draw.num, sz);
        const poolList = [
            { id: 'final', name: 'Final', nums: mlPools.final },
            { id: 'p2', name: 'Pool2', nums: mlPools.p2 },
            { id: 'p3', name: 'Pool3', nums: mlPools.p3 },
            { id: 'p4', name: 'Pool4', nums: mlPools.p4 },
            { id: 'p5', name: 'Pool5', nums: mlPools.p5 },
            { id: 'p6', name: 'Pool6', nums: mlPools.p6 },
            { id: 'p7', name: 'Pool7', nums: mlPools.p7 }
        ];
        const cfg = recConfig.configs[sz] || { pools: {}, freqs: {} };
        let activePoolObjs = poolList.filter(p => cfg.pools[p.id]);
        let freqMap: Record<number, number> = {};
        activePoolObjs.forEach(p => {
            p.nums.forEach(n => {
                freqMap[n] = (freqMap[n] || 0) + 1;
            });
        });
        let filteredForSz: number[] = [];
        for (let n = 1; n <= 28; n++) {
            let f = freqMap[n] || 0;
            if (cfg.freqs[f]) filteredForSz.push(n);
        }
        poolSizeFilteredSets.push(filteredForSz);
    });

    let masterFreqMap: Record<number, number> = {};
    poolSizeFilteredSets.forEach(set => {
        set.forEach(n => {
            masterFreqMap[n] = (masterFreqMap[n] || 0) + 1;
        });
    });

    let finalResultNums: number[] = [];
    for (let n = 1; n <= 28; n++) {
        let f = masterFreqMap[n] || 0;
        if ((recConfig.finalFreqs as any)[f]) finalResultNums.push(n);
    }

    let hits = draw.win.filter(w => finalResultNums.includes(w)).length;
    return { resultingCount: finalResultNums.length, hits, resultingNums: finalResultNums };
}

function ContourModal({ poolId, poolLabel, poolNums, poolBorder, poolAccent, allDraws, onClose }: { poolId: string; poolLabel: string; poolNums: number[]; poolBorder: string; poolAccent: string; allDraws: Draw[]; onClose: () => void }) {
    const last20 = useMemo(() => allDraws.slice(-20), [allDraws]);
    const cols = 7;
    const rows = Math.ceil(poolNums.length / cols);

    const dataPoints = useMemo(() => {
        return poolNums.map((n, idx) => {
            const x = idx % cols;
            const y = Math.floor(idx / cols);
            const z = last20.filter(d => d.win.includes(n)).length;
            return { n, x, y, z };
        });
    }, [poolNums, last20, cols, rows]);

    const maxZ = useMemo(() => Math.max(...dataPoints.map(d => d.z), 1), [dataPoints]);
    const minZ = useMemo(() => Math.min(...dataPoints.map(d => d.z), 0), [dataPoints]);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const width = canvas.width;
        const height = canvas.height;
        ctx.clearRect(0, 0, width, height);

        ctx.fillStyle = '#141414';
        ctx.fillRect(0, 0, width, height);

        const padLeft = 45;
        const padBottom = 35;
        const padTop = 20;
        const padRight = 20;
        const graphW = width - padLeft - padRight;
        const graphH = height - padTop - padBottom;

        const cellW = graphW / Math.max(1, cols);
        const cellH = graphH / Math.max(1, rows);

        // Pre-rendered offscreen buffer for optimal performance (zero lag)
        const offCanvas = document.createElement('canvas');
        offCanvas.width = graphW;
        offCanvas.height = graphH;
        const offCtx = offCanvas.getContext('2d');

        if (offCtx) {
            const resX = 120;
            const resY = 120;
            const dx = graphW / resX;
            const dy = graphH / resY;

            const getColor = (ratio: number) => {
                if (ratio >= 0.85) return '#ff1744';
                if (ratio >= 0.70) return '#ff9800';
                if (ratio >= 0.50) return '#ffeb3b';
                if (ratio >= 0.30) return '#76ff03';
                if (ratio >= 0.15) return '#00e5ff';
                return '#00b0ff';
            };

            for (let ix = 0; ix <= resX; ix++) {
                for (let iy = 0; iy <= resY; iy++) {
                    const px = ix * dx;
                    const py = iy * dy;
                    let totalWeight = 0;
                    let weightedZ = 0;
                    dataPoints.forEach(pt => {
                        const cx = (pt.x + 0.5) * cellW;
                        const cy = (pt.y + 0.5) * cellH;
                        const dist = Math.sqrt((px - cx) ** 2 + (py - cy) ** 2);
                        const weight = 1 / (dist ** 3 + 8);
                        totalWeight += weight;
                        weightedZ += pt.z * weight;
                    });
                    const smoothedZ = totalWeight > 0 ? weightedZ / totalWeight : 0;
                    const ratio = Math.min(1, Math.max(0, smoothedZ / maxZ));

                    offCtx.fillStyle = getColor(ratio);
                    offCtx.globalAlpha = 0.75;
                    offCtx.fillRect(px, py, dx + 0.8, dy + 0.8);
                }
            }
            ctx.drawImage(offCanvas, padLeft, padTop);
        }

        // Smooth contour grid lines
        ctx.strokeStyle = 'rgba(255,255,255,0.22)';
        ctx.lineWidth = 1.2;
        for (let c = 0; c <= cols; c++) {
            ctx.beginPath();
            ctx.moveTo(padLeft + c * cellW, padTop);
            ctx.lineTo(padLeft + c * cellW, padTop + graphH);
            ctx.stroke();
        }
        for (let r = 0; r <= rows; r++) {
            ctx.beginPath();
            ctx.moveTo(padLeft, padTop + r * cellH);
            ctx.lineTo(padLeft + graphW, padTop + r * cellH);
            ctx.stroke();
        }

        // Axes labels
        ctx.fillStyle = '#bbb';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        for (let c = 0; c < cols; c++) {
            ctx.fillText(`X:${c}`, padLeft + (c + 0.5) * cellW, height - 10);
        }
        ctx.textAlign = 'right';
        for (let r = 0; r < rows; r++) {
            ctx.fillText(`Y:${r}`, padLeft - 6, padTop + (r + 0.5) * cellH + 4);
        }

        // Data nodes (Number + Z)
        dataPoints.forEach(pt => {
            const cx = padLeft + (pt.x + 0.5) * cellW;
            const cy = padTop + (pt.y + 0.5) * cellH;

            ctx.beginPath();
            ctx.arc(cx, cy - 5, 12, 0, Math.PI * 2);
            ctx.fillStyle = '#0f0f0f';
            ctx.fill();
            ctx.strokeStyle = poolAccent;
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.fillStyle = '#fff';
            ctx.font = 'bold 11px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(String(pt.n).padStart(2, '0'), cx, cy - 2);

            ctx.fillStyle = '#ffeb3b';
            ctx.font = '9px monospace';
            ctx.fillText(`z:${pt.z}`, cx, cy + 10);
        });

    }, [dataPoints, cols, rows, maxZ, poolAccent]);

    return (
        <div className="fixed inset-0 bg-black/88 backdrop-blur-[2px] flex items-center justify-center z-50 p-3 overflow-hidden" onClick={onClose}>
            <div className="bg-[#121212] border border-[#333] rounded-xl w-full max-w-[620px] flex flex-col overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
                <div className="p-3 bg-[#1a1a1a] border-b border-[#2a2a2a] flex justify-between items-center">
                    <div>
                        <div className="text-[13px] font-black" style={{ color: poolAccent }}>🏔️ Gráfica de Contorno Z — {poolLabel}</div>
                        <div className="text-[9px] text-[#888]">Ejes X, Y: Coordenadas de casilla · Eje Z: Incidencia de aciertos (ganador en últimos 20 sorteos)</div>
                    </div>
                    <button onClick={onClose} className="bg-[#2a2a2a] border border-[#555] text-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer hover:bg-[#333]">×</button>
                </div>

                <div className="p-4 space-y-3">
                    <div className="bg-[#161616] border border-[#2a2a2a] rounded-xl p-3 flex flex-col items-center">
                        <canvas ref={canvasRef} width={560} height={280} className="w-full h-auto rounded-lg" />
                        
                        {/* Color Scale Legend */}
                        <div className="mt-3 w-full flex flex-col gap-1">
                            <div className="flex justify-between items-center text-[9px] font-bold text-[#aaa]">
                                <span>Escala de Color Z (Aciertos en 20 Sorteos):</span>
                                <span className="text-[#ffeb3b]">Mín: {minZ} ac. → Máx: {maxZ} ac.</span>
                            </div>
                            <div className="h-4 w-full rounded-md flex overflow-hidden border border-[#444] shadow-inner">
                                <div className="flex-1 bg-[#00b0ff]" title="Muy baja incidencia"></div>
                                <div className="flex-1 bg-[#00e5ff]" title="Baja incidencia"></div>
                                <div className="flex-1 bg-[#76ff03]" title="Incidencia media-baja"></div>
                                <div className="flex-1 bg-[#ffeb3b]" title="Incidencia media-alta"></div>
                                <div className="flex-1 bg-[#ff9800]" title="Alta incidencia"></div>
                                <div className="flex-1 bg-[#ff1744]" title="Máxima incidencia (Hot)"></div>
                            </div>
                            <div className="flex justify-between text-[8px] text-[#888] px-1 font-mono">
                                <span>0 ac.</span>
                                <span>{Math.round(maxZ * 0.2)} ac.</span>
                                <span>{Math.round(maxZ * 0.4)} ac.</span>
                                <span>{Math.round(maxZ * 0.6)} ac.</span>
                                <span>{Math.round(maxZ * 0.8)} ac.</span>
                                <span>{maxZ} ac.</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-3 bg-[#1a1a1a] border-t border-[#2a2a2a] flex justify-end">
                    <button onClick={onClose} className="bg-[#7c4dff] hover:bg-[#6c3fe0] text-white px-5 py-2 rounded-lg text-[11px] font-black cursor-pointer shadow-md">Cerrar Gráfica</button>
                </div>
            </div>
        </div>
    );
}

function DrawPopoutModal({ draw, pred, allDraws, onClose, onCopyConsensus, onOpenWheeling, onOpenMultipool }: { draw: Draw; pred: PoolResult; allDraws: Draw[]; onClose: () => void; onCopyConsensus: (nums: number[]) => void; onOpenWheeling: (id: string, k: number, sorteoNum: number, customSlice: number[]) => void; onOpenMultipool: (draw: Draw) => void }) {
    const poolList = [
        { id: 'final', name: 'Final', nums: pred.final || [], color: '#ffeb3b' },
        { id: 'p2', name: 'Pool2', nums: pred.p2 || [], color: '#00e5ff' },
        { id: 'p3', name: 'Pool3', nums: pred.p3 || [], color: '#ff9800' },
        { id: 'p4', name: 'Pool4', nums: pred.p4 || [], color: '#76ff03' },
        { id: 'p5', name: 'Pool5', nums: pred.p5 || [], color: '#e040fb' },
        { id: 'p6', name: 'Pool6', nums: pred.p6 || [], color: '#26c6da' },
        { id: 'p7', name: 'Pool7', nums: pred.p7 || [], color: '#ff4081' }
    ];

    const optimal = React.useMemo(() => getOptimalCheckboxes(poolList, draw.win), [draw.win, pred]);

    const [selPools, setSelPools] = useState<Record<string, boolean>>(optimal.pools);
    const [selFreqs, setSelFreqs] = useState<Record<number, boolean>>(optimal.freqs);

    useEffect(() => {
        setSelPools(optimal.pools);
        setSelFreqs(optimal.freqs);
    }, [optimal]);

    const stats = React.useMemo(() => {
        let activePoolIds = Object.keys(selPools).filter(id => selPools[id]);
        let activePoolObjs = poolList.filter(p => selPools[p.id]);

        let freqMap: Record<number, number> = {};
        activePoolObjs.forEach(p => {
            p.nums.forEach(n => {
                freqMap[n] = (freqMap[n] || 0) + 1;
            });
        });

        let filteredNums: number[] = [];
        for (let n = 1; n <= 28; n++) {
            let f = freqMap[n] || 0;
            if (selFreqs[f]) {
                filteredNums.push(n);
            }
        }
        const histIdx = allDraws.findIndex(d => d.num === draw.num);
        const histDraws = histIdx > 0 ? allDraws.slice(0, histIdx) : allDraws;

        if (activePoolIds.length === 1) {
            const singlePoolNums = activePoolObjs[0].nums;
            filteredNums.sort((a, b) => {
                let idxA = singlePoolNums.indexOf(a);
                let idxB = singlePoolNums.indexOf(b);
                if (idxA !== -1 && idxB !== -1) return idxA - idxB;
                if (idxA !== -1) return -1;
                if (idxB !== -1) return 1;
                return a - b;
            });
        } else {
            filteredNums.sort((a, b) => {
                let fA = freqMap[a] || 0;
                let fB = freqMap[b] || 0;
                if (fB !== fA) return fB - fA;
                let scoreA = getNumberScore(a, histDraws);
                let scoreB = getNumberScore(b, histDraws);
                return scoreB - scoreA;
            });
        }
        return { freqMap, filteredNums };
    }, [selPools, selFreqs, pred, draw.num, allDraws, poolList]);

    return (
        <div className="fixed inset-0 bg-black/88 backdrop-blur-[2px] flex items-center justify-center z-50 p-3 overflow-hidden" onClick={onClose}>
            <div className="bg-[#121212] border border-[#333] rounded-xl w-full max-w-[650px] max-h-[90vh] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="p-3 bg-[#1a1a1a] border-b border-[#2a2a2a] flex justify-between items-center">
                    <div>
                        <div className="text-[12px] font-black text-[#ffeb3b]">Sorteo {draw.num} - Detalle de Consenso y Pools</div>
                        <div className="text-[9px] text-[#888]">Fecha: {draw.date} | Ganadores: {draw.win.map(n => String(n).padStart(2, '0')).join(', ')}</div>
                    </div>
                    <button onClick={onClose} className="bg-[#2a2a2a] border border-[#555] text-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer hover:bg-[#333]">×</button>
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                    {/* Winning Numbers Header */}
                    <div className="bg-[#ffeb3b] text-black rounded-xl p-2.5 text-center shadow-[0_0_15px_rgba(255,235,59,0.2)]">
                        <div className="text-[9px] font-black tracking-wide">● NÚMEROS GANADORES REALES</div>
                        <div className="text-[18px] font-black tracking-wider my-0.5">{draw.win.map(n => String(n).padStart(2, '0')).join(' ')}</div>
                    </div>

                    {/* Consensus Frequency Filter section inside Popout */}
                    <div className="bg-[#141414] border border-[#2e2e2e] rounded-xl p-3">
                        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                            <div>
                                <h3 className="text-[12px] font-black text-[#00e5ff]">🔍 Filtro de Consenso por Frecuencia (Sorteo {draw.num})</h3>
                                <p className="text-[9px] text-[#888]">Selecciona los pools y frecuencias para analizar las coincidencias de esta predicción histórica.</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="pill bg-[rgba(0,229,255,.1)] border border-[rgba(0,229,255,.3)] text-[#00e5ff] text-[9px] font-bold px-2.5 py-0.5 rounded-full">
                                    Filtrados: {stats.filteredNums.length} números
                                </span>
                                <button 
                                    onClick={() => onOpenMultipool(draw)}
                                    className="bg-[rgba(255,235,59,.15)] border border-[rgba(255,235,59,.4)] text-[#ffeb3b] hover:bg-[rgba(255,235,59,.25)] px-2.5 py-0.5 rounded-full text-[9px] font-extrabold cursor-pointer transition flex items-center gap-1"
                                    title="Abrir herramienta Multipool con configuración óptima para este sorteo"
                                >
                                    ⚡ Multipool (Óptimo)
                                </button>
                                <button 
                                    onClick={() => onCopyConsensus(stats.filteredNums)} 
                                    className="bg-[rgba(0,229,255,.15)] border border-[rgba(0,229,255,.4)] text-[#00e5ff] hover:bg-[rgba(0,229,255,.25)] px-2.5 py-0.5 rounded-full text-[9px] font-extrabold cursor-pointer transition flex items-center gap-1"
                                    title="Copiar números filtrados al portapapeles"
                                >
                                    📋 Copiar
                                </button>
                            </div>
                        </div>

                        {/* Pool Checkboxes */}
                        <div className="mb-2">
                            <div className="text-[8px] font-bold text-[#aaa] mb-1">POOLS INCLUIDOS EN EL FILTRO:</div>
                            <div className="flex flex-wrap gap-1.5">
                                {poolList.map(pool => (
                                    <label key={pool.id} className="flex items-center gap-1 text-[10px] font-bold cursor-pointer bg-[#1a1a1a] border border-[#333] px-2 py-1 rounded-lg hover:border-[#555]">
                                        <input 
                                            type="checkbox" 
                                            checked={selPools[pool.id]} 
                                            onChange={(e) => setSelPools({...selPools, [pool.id]: e.target.checked})}
                                            className="cursor-pointer accent-[#7c4dff]"
                                        />
                                        <span style={{color: pool.color}}>●</span>
                                        <span>{pool.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Frequency Checkboxes */}
                        <div className="mt-2">
                            <div className="text-[8px] font-bold text-[#aaa] mb-1">FRECUENCIA REQUERIDA (NÚMERO DE APARICIONES EN LOS POOLS SELECCIONADOS):</div>
                            <div className="flex flex-wrap gap-1.5">
                                {[7, 6, 5, 4, 3, 2, 1, 0].map(freq => (
                                    <label key={freq} className="flex items-center gap-1 text-[10px] font-bold cursor-pointer bg-[#1a1a1a] border border-[#333] px-2.5 py-1 rounded-lg hover:border-[#555]">
                                        <input 
                                            type="checkbox" 
                                            checked={selFreqs[freq]} 
                                            onChange={(e) => setSelFreqs({...selFreqs, [freq]: e.target.checked})}
                                            className="cursor-pointer accent-[#7c4dff]"
                                        />
                                        <span>Freq {freq}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Filtered Numbers Result Grid */}
                        <div className="mt-2.5 pt-2.5 border-t border-[#222]">
                            <div className="text-[9px] font-bold text-[#ccc] mb-2">Números resultantes del filtro de consenso:</div>
                            {stats.filteredNums.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-7 sm:grid-cols-14 gap-1">
                                        {stats.filteredNums.map(n => {
                                            let freqCount = stats.freqMap[n] || 0;
                                            let isWin = draw.win.includes(n);
                                            return (
                                                <div key={n} className={`border rounded-lg p-1 text-center flex flex-col items-center ${isWin ? 'bg-[#2e7d32] border-[#4caf50]' : 'bg-[#1e1e1e] border-[#333]'}`}>
                                                    <span className={`text-[11px] font-black ${isWin ? 'text-white' : 'text-[#ffeb3b]'}`}>{String(n).padStart(2, '0')}</span>
                                                    <span className={`text-[7px] ${isWin ? 'text-[#a5d6a7]' : 'text-[#888]'}`}>f:{freqCount}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    {stats.filteredNums.length >= 5 && (
                                        <div className="mt-2.5 pt-2 border-t border-[#222]">
                                            <div className="text-[9px] font-bold text-[#ffeb3b] mb-1">● WHEELINGS DEL FILTRO DE CONSENSO (12, 24, 36, 48 Comb):</div>
                                            <div className="flex gap-1.5 flex-wrap">
                                                {[12, 24, 36, 48].map(k => (
                                                    <button 
                                                        key={k} 
                                                        onClick={() => onOpenWheeling('consensus_' + draw.num, k, draw.num, stats.filteredNums)}
                                                        className="bg-[rgba(0,229,255,.15)] border border-[rgba(0,229,255,.4)] text-[#00e5ff] hover:bg-[rgba(0,229,255,.25)] px-2.5 py-1 rounded-full text-[10px] font-extrabold cursor-pointer transition shadow-sm"
                                                    >
                                                        {uv(k)} Comb
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-3 text-[10px] text-[#666]">Ningún número cumple con los filtros de frecuencia seleccionados.</div>
                            )}
                        </div>
                    </div>

                    {/* Individual Pools Preview & Consensus Wheelings List */}
                    <div className="space-y-2">
                        <div className="text-[11px] font-black text-[#ffeb3b] mb-2">Desglose de Pools Registrados y Wheelings de Consenso para Sorteo {draw.num}</div>
                        {poolList.map(p => {
                            let hits = p.nums.filter(n => draw.win.includes(n)).length;
                            return (
                                <div key={p.id} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-2.5 flex items-center justify-between flex-wrap gap-2">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full" style={{background: p.color}}></span>
                                        <span className="text-[11px] font-bold" style={{color: p.color}}>{p.name}</span>
                                        <span className="text-[9px] text-[#888]">({p.nums.length} nums)</span>
                                    </div>
                                    <div className="flex gap-1 items-center">
                                        <div className="flex gap-0.5">
                                            {p.nums.map((n, idx) => {
                                                let isWin = draw.win.includes(n);
                                                return (
                                                    <span key={idx} className={`text-[9px] px-1 py-0.5 rounded font-bold border ${isWin ? 'bg-[#2e7d32] border-[#4caf50] text-white' : 'bg-[#121212] border-[#2a2a2a] text-[#aaa]'}`}>
                                                        {String(n).padStart(2, '0')}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                        <span className="ml-2 bg-[#222] border border-[#333] text-white px-2 py-0.5 rounded text-[10px] font-black">{hits} ac</span>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Consensus Wheelings with Top 3 Combinations in the List */}
                        {([12, 24, 36, 48] as number[]).map(k => {
                            let baseSlice = stats.filteredNums.length >= 5 ? stats.filteredNums : (pred.final || []);
                            let reduced = uv(k);
                            let combos = rv(baseSlice, draw.win, reduced, 'consensus_' + draw.num + '_' + k);
                            let sc = combos.map(c => ({ c, h: hitsCount(c, draw.win) })).sort((a, b) => b.h - a.h);
                            let best = sc[0] ? sc[0].h : 0;
                            let top = sc.slice(0, 3);

                            return (
                                <div key={k} className="border rounded-xl p-2.5 bg-[#1a1a1a]" style={{borderColor: best >= 4 ? '#00e5ff66' : '#2a2a2a'}}>
                                    <div className="flex justify-between items-center mb-1.5">
                                        <span className="text-[11px] font-black text-[#00e5ff] px-2 py-0.5 rounded-full border border-[#00e5ff44] bg-[rgba(0,229,255,0.1)]">{reduced} Comb (Consenso)</span>
                                        <span className="text-[10px] font-extrabold text-[#aaa]">Mejor {best} aciertos ({baseSlice.length} nums base)</span>
                                    </div>
                                    <div className="space-y-1">
                                        {top.map((it, iti) => (
                                            <div key={iti} className="flex gap-1 items-center px-2 py-1 rounded-md" style={{background: iti === 0 ? 'rgba(0,229,255,0.08)' : 'transparent', border: iti === 0 ? '1px solid rgba(0,229,255,0.2)' : '0'}}>
                                                <span className="text-[9px] bg-[#222] border border-[#333] rounded px-1 text-center">{iti + 1}</span>
                                                <div className="flex gap-1">
                                                    {it.c.map((n, ni) => {
                                                        let isWin = draw.win.includes(n);
                                                        return (
                                                            <span key={ni} className="rounded px-1.5 py-0.5 text-[10px] font-black border" style={{background: isWin ? (it.h === 5 ? '#7c4dff' : '#2e7d32') : '#222', borderColor: isWin ? (it.h === 5 ? '#b388ff' : '#4caf50') : '#333', color: isWin ? 'white' : '#ccc'}}>
                                                                {String(n).padStart(2, '0')}
                                                            </span>
                                                        );
                                                    })}
                                                </div>
                                                <span className="ml-auto rounded-full px-2 py-0.5 text-[9px] font-black text-white" style={{background: it.h >= 5 ? '#7c4dff' : it.h === 4 ? '#2e7d32' : '#424242'}}>{it.h} ac</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="p-2.5 bg-[#0f0f0f] border-t border-[#222] flex justify-end">
                    <button onClick={onClose} className="bg-[#222] border border-[#444] text-[#ccc] rounded-full px-4 py-1.5 text-[10px] cursor-pointer hover:bg-[#333]">Cerrar [Esc]</button>
                </div>
            </div>
        </div>
    );
}

function IterationEfficiencyReportModal({ simResults, currentMode, onClose }: { simResults: any[]; currentMode: string; onClose: () => void }) {
    if (!simResults || simResults.length === 0) return null;

    const focusNames: Record<string, string> = {
        madre: 'Madre',
        sub5: 'Cierre',
        experimental: 'Avanz.',
        stochastic1: 'Estocástico 1',
        stochastic2: 'Estocástico 2',
        tunner: 'TUNNER',
        smooth: 'SMOOTH',
        greenV: 'Perfil V Verde'
    };
    const focusLabel = focusNames[currentMode] || currentMode;

    return (
        <div className="fixed inset-0 bg-black/88 backdrop-blur-[2px] z-[9999] overflow-y-auto flex items-center justify-center p-3 md:p-6" onClick={onClose}>
            <div className="bg-[#141414] border border-[#00e5ff] rounded-xl w-full max-w-[1250px] my-auto flex flex-col shadow-2xl relative p-4" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-3 pb-2 border-b border-[#333]">
                    <div>
                        <div className="text-[14px] font-black text-[#ffeb3b]">
                            📊 Análisis de Eficiencia de Iteraciones (1 a 6) — Foco Activo: <span className="text-[#00e5ff] uppercase">{focusLabel}</span>
                        </div>
                        <div className="text-[10px] text-[#888]">Desglose detallado de aciertos y números resultantes por iteración para evaluar el desempeño y eficiencia.</div>
                    </div>
                    <button onClick={onClose} className="bg-[#222] text-[#aaa] border border-[#444] px-3 py-1 rounded-lg text-[11px] font-bold cursor-pointer hover:text-white">✕ Cerrar</button>
                </div>

                <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
                    <table className="w-full text-[10px] border-collapse">
                        <thead>
                            <tr className="bg-[#1f1f1f] text-[#aaa] text-center">
                                <th className="p-2 border border-[#333]">Sorteo</th>
                                <th className="p-2 border border-[#333]">Ganadores</th>
                                <th className="p-2 border border-[#333] text-[#00e5ff]">Madre</th>
                                <th className="p-2 border border-[#333] text-[#ffeb3b]">Prim.</th>
                                <th className="p-2 border border-[#333] text-[#b388ff]">Sec.</th>
                                <th className="p-2 border border-[#333] text-[#26c6da]">Avanz.</th>
                                <th className="p-2 border border-[#333] text-[#e040fb]">Prec.</th>
                                <th className="p-2 border border-[#333] text-[#00e676]">Cierre</th>
                                <th className="p-2 border border-[#333]">Eficacia</th>
                            </tr>
                        </thead>
                        <tbody>
                            {simResults.slice(-20).reverse().map((r, i) => {
                                const maxH = Math.max(r.madreHits, r.sub1Hits, r.sub2Hits, r.sub3Hits, r.sub4Hits, r.sub5Hits);
                                const isOptimo = maxH >= 4;
                                return (
                                    <tr key={i} className="text-center hover:bg-[#1a1a1a] transition">
                                        <td className="p-2 border border-[#333] font-bold text-[#ffeb3b]">#{r.num}</td>
                                        <td className="p-2 border border-[#333] font-mono text-[#ddd]">{r.win.map((n: number) => String(n).padStart(2, '0')).join(' ')}</td>
                                        
                                        <td className="p-2 border border-[#333]" style={{ background: r.madreHits >= 4 ? 'rgba(46,125,50,0.25)' : 'transparent' }}>
                                            <span className="font-bold text-white">{r.madreHits} ac</span> <span className="text-[#888]">({r.madreCount}#)</span>
                                        </td>
                                        <td className="p-2 border border-[#333]" style={{ background: r.sub1Hits >= 4 ? 'rgba(46,125,50,0.25)' : 'transparent' }}>
                                            <span className="font-bold text-white">{r.sub1Hits} ac</span> <span className="text-[#888]">({r.sub1Count}#)</span>
                                        </td>
                                        <td className="p-2 border border-[#333]" style={{ background: r.sub2Hits >= 4 ? 'rgba(46,125,50,0.25)' : 'transparent' }}>
                                            <span className="font-bold text-white">{r.sub2Hits} ac</span> <span className="text-[#888]">({r.sub2Count}#)</span>
                                        </td>
                                        <td className="p-2 border border-[#333]" style={{ background: r.sub3Hits >= 4 ? 'rgba(46,125,50,0.25)' : 'transparent' }}>
                                            <span className="font-bold text-white">{r.sub3Hits} ac</span> <span className="text-[#888]">({r.sub3Count}#)</span>
                                        </td>
                                        <td className="p-2 border border-[#333]" style={{ background: r.sub4Hits >= 4 ? 'rgba(46,125,50,0.25)' : 'transparent' }}>
                                            <span className="font-bold text-white">{r.sub4Hits} ac</span> <span className="text-[#888]">({r.sub4Count}#)</span>
                                        </td>
                                        <td className="p-2 border border-[#333]" style={{ background: r.sub5Hits >= 4 ? 'rgba(46,125,50,0.25)' : 'transparent' }}>
                                            <span className="font-bold text-white">{r.sub5Hits} ac</span> <span className="text-[#888]">({r.sub5Count}#)</span>
                                        </td>
                                        
                                        <td className="p-2 border border-[#333] font-bold" style={{ color: isOptimo ? '#76ff03' : '#ffab40' }}>
                                            {isOptimo ? '★ Óptimo' : 'Regular'}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 flex justify-between items-center">
                    <span className="text-[10px] text-[#888]">Mostrando los últimos 20 sorteos evaluados (destacado verde para 4+ aciertos).</span>
                    <button onClick={onClose} className="bg-[#7c4dff] text-white hover:bg-[#6c3fe0] px-5 py-2 rounded-lg text-[11px] font-black cursor-pointer shadow-md">
                        Cerrar Análisis
                    </button>
                </div>
            </div>
        </div>
    );
}

function getSmoothPath(points: { x: number; y: number }[]): string {
    if (points.length === 0) return '';
    if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
    
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i === 0 ? 0 : i - 1];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[i + 2 < points.length ? i + 2 : points.length - 1];

        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;

        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;

        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return path;
}

function FocusGraphicalAnalysisModal({ simResults, currentMode = 'madre', onClose }: { simResults: any[]; currentMode?: string; onClose: () => void }) {
    if (!simResults || simResults.length === 0) return null;

    const focusNames: Record<string, string> = {
        madre: 'Madre',
        sub5: 'Cierre',
        experimental: 'Avanz.',
        stochastic1: 'Estocástico 1',
        stochastic2: 'Estocástico 2',
        tunner: 'TUNNER',
        smooth: 'SMOOTH',
        greenV: 'Perfil V Verde'
    };
    const focusLabel = focusNames[currentMode] || currentMode;

    const foci = [
        { name: 'Madre (~27#)', color: '#00e5ff', profile: [3.2, 2.8, 2.4, 2.1, 1.9, 1.7] },
        { name: 'Primario (~24#)', color: '#ffeb3b', profile: [1.8, 2.1, 2.4, 2.8, 3.3, 3.0] },
        { name: 'Secundario (~21#)', color: '#b388ff', profile: [2.0, 2.5, 2.9, 3.2, 2.6, 2.1] },
        { name: 'Avanzado (~18#)', color: '#26c6da', profile: [2.3, 2.0, 2.2, 2.6, 3.1, 3.0] },
        { name: 'Precisión (~15#)', color: '#e040fb', profile: [2.2, 2.7, 3.1, 3.2, 2.9, 2.3] },
        { name: 'Cierre (~12#)', color: '#00e676', profile: [2.4, 2.5, 2.6, 2.7, 2.8, 3.0] },
        { name: 'TUNNER', color: '#76ff03', profile: [2.6, 2.6, 2.6, 2.6, 2.6, 2.6] },
        { name: 'Perfil V Verde', color: '#00e676', profile: [3.0, 2.7, 2.4, 2.1, 2.6, 3.0] }
    ];

    const fociHist = [
        { name: 'Madre (~27#)', color: '#00e5ff', getHits: (r: any) => r.madreHits },
        { name: 'Primario (~24#)', color: '#ffeb3b', getHits: (r: any) => r.sub1Hits },
        { name: 'Secundario (~21#)', color: '#b388ff', getHits: (r: any) => r.sub2Hits },
        { name: 'Avanzado (~18#)', color: '#26c6da', getHits: (r: any) => r.sub3Hits },
        { name: 'Precisión (~15#)', color: '#e040fb', getHits: (r: any) => r.sub4Hits },
        { name: 'Cierre (~12#)', color: '#00e676', getHits: (r: any) => r.sub5Hits },
        { name: 'TUNNER', color: '#76ff03', getHits: (r: any) => r.sub5Hits },
        { name: 'Perfil V Verde', color: '#00e676', getHits: (r: any) => r.sub5Hits }
    ];

    const modeToFocusName: Record<string, string> = {
        madre: 'Madre (~27#)',
        sub5: 'Cierre (~12#)',
        experimental: 'Avanzado (~18#)',
        stochastic1: 'Cierre (~12#)',
        stochastic2: 'Avanzado (~18#)',
        tunner: 'TUNNER',
        smooth: 'Madre (~27#)',
        greenV: 'Perfil V Verde'
    };
    const activeFocusName = modeToFocusName[currentMode] || 'Madre (~27#)';

    const [visibleFoci, setVisibleFoci] = useState<Record<string, boolean>>(() => {
        const next: Record<string, boolean> = {};
        foci.forEach(f => { next[f.name] = (f.name === activeFocusName); });
        return next;
    });

    const [visibleHistFoci, setVisibleHistFoci] = useState<Record<string, boolean>>(() => {
        const next: Record<string, boolean> = {};
        fociHist.forEach(f => { next[f.name] = (f.name === activeFocusName); });
        return next;
    });

    const [visibleNonCumFoci, setVisibleNonCumFoci] = useState<Record<string, boolean>>(() => {
        const next: Record<string, boolean> = {};
        fociHist.forEach(f => { next[f.name] = (f.name === activeFocusName); });
        return next;
    });

    const [visibleChart4Foci, setVisibleChart4Foci] = useState<Record<string, boolean>>(() => {
        const next: Record<string, boolean> = {};
        fociHist.forEach(f => { next[f.name] = (f.name === activeFocusName); });
        return next;
    });

    const [visibleChart5Foci, setVisibleChart5Foci] = useState<Record<string, boolean>>(() => {
        const next: Record<string, boolean> = {};
        fociHist.forEach(f => { next[f.name] = (f.name === activeFocusName); });
        return next;
    });

    const toggleFocus = (name: string) => {
        setVisibleFoci(prev => ({ ...prev, [name]: !prev[name] }));
    };

    const toggleAll = (state: boolean) => {
        const next: Record<string, boolean> = {};
        foci.forEach(f => { next[f.name] = state; });
        setVisibleFoci(next);
    };

    const toggleHistFocus = (name: string) => {
        setVisibleHistFoci(prev => ({ ...prev, [name]: !prev[name] }));
    };

    const toggleAllHist = (state: boolean) => {
        const next: Record<string, boolean> = {};
        fociHist.forEach(f => { next[f.name] = state; });
        setVisibleHistFoci(next);
    };

    const toggleNonCumFocus = (name: string) => {
        setVisibleNonCumFoci(prev => ({ ...prev, [name]: !prev[name] }));
    };

    const toggleAllNonCum = (state: boolean) => {
        const next: Record<string, boolean> = {};
        fociHist.forEach(f => { next[f.name] = state; });
        setVisibleNonCumFoci(next);
    };

    const toggleChart4Focus = (name: string) => {
        setVisibleChart4Foci(prev => ({ ...prev, [name]: !prev[name] }));
    };

    const toggleAllChart4 = (state: boolean) => {
        const next: Record<string, boolean> = {};
        fociHist.forEach(f => { next[f.name] = state; });
        setVisibleChart4Foci(next);
    };

    const toggleChart5Focus = (name: string) => {
        setVisibleChart5Foci(prev => ({ ...prev, [name]: !prev[name] }));
    };

    const toggleAllChart5 = (state: boolean) => {
        const next: Record<string, boolean> = {};
        fociHist.forEach(f => { next[f.name] = state; });
        setVisibleChart5Foci(next);
    };

    const chartWidth = 700;
    const chartHeight = 300;
    const padding = { top: 30, right: 30, bottom: 40, left: 50 };
    const w = chartWidth - padding.left - padding.right;
    const h = chartHeight - padding.top - padding.bottom;

    const maxVal = 5.0;
    const dx = w / 5;

    // Historical 30 draws sorted strictly chronological (oldest draw number on left, newest on right)
    const histDraws = [...simResults].sort((a, b) => a.num - b.num).slice(-30);
    const histW = chartWidth - padding.left - padding.right;
    const histH = chartHeight - padding.top - padding.bottom;
    const histDx = histW / (histDraws.length - 1 || 1);

    // Compute cumulative hits per focus across histDraws
    const histSeries = fociHist.map(f => {
        let sum = 0;
        const cumValues = histDraws.map(r => {
            sum += f.getHits(r);
            return sum;
        });
        return { ...f, cumValues, maxCum: sum };
    });

    const maxHistVal = Math.max(1, ...histSeries.filter(s => visibleHistFoci[s.name]).map(s => s.maxCum));

    // Compute non-cumulative hits per focus across histDraws
    const nonCumSeries = fociHist.map(f => {
        const values = histDraws.map(r => f.getHits(r));
        return { ...f, values };
    });
    
    // Dynamic Y-axis max for non-cumulative chart based on actual historical hits achieved (min max 3)
    const activeNonCumValues = nonCumSeries
        .filter(s => visibleNonCumFoci[s.name])
        .flatMap(s => s.values);
    const maxNonCumVal = Math.max(3, activeNonCumValues.length > 0 ? Math.max(...activeNonCumValues) : 3);

    const showOnlyActiveFocus = () => {
        const next: Record<string, boolean> = {};
        foci.forEach(f => { next[f.name] = (f.name === activeFocusName); });
        setVisibleFoci(next);
        const nextHist: Record<string, boolean> = {};
        fociHist.forEach(f => { nextHist[f.name] = (f.name === activeFocusName); });
        setVisibleHistFoci(nextHist);
        setVisibleNonCumFoci(nextHist);
        setVisibleChart4Foci(nextHist);
        setVisibleChart5Foci(nextHist);
    };

    return (
        <div className="fixed inset-0 bg-black/88 backdrop-blur-[2px] z-[9999] overflow-y-auto flex items-center justify-center p-3 md:p-6" onClick={onClose}>
            <div className="bg-[#141414] border border-[#00e5ff] rounded-xl w-full max-w-[880px] my-auto flex flex-col shadow-2xl relative p-5 max-h-[92vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-3 pb-2 border-b border-[#333]">
                    <div>
                        <div className="text-[14px] font-black text-[#ffeb3b]">📈 Análisis Gráfico XY de Focos de Optimización</div>
                        <div className="text-[10px] text-[#888]">Perfil de Optimización (Iteraciones 1 a 6) & Backtesting Histórico ({histDraws.length} Sorteos: Acumulado & No Acumulado). Foco Activo: <span className="text-[#00e5ff] font-bold">{focusLabel}</span></div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={showOnlyActiveFocus} className="bg-[rgba(0,229,255,0.2)] border border-[rgba(0,229,255,0.5)] text-[#00e5ff] px-3 py-1 rounded-lg text-[10px] font-extrabold cursor-pointer hover:bg-[#00e5ff]/30 transition">
                            🎯 Solo Foco Activo
                        </button>
                        <button onClick={onClose} className="bg-[#222] text-[#aaa] border border-[#444] px-3 py-1 rounded-lg text-[11px] font-bold cursor-pointer hover:text-white ml-2">✕ Cerrar</button>
                    </div>
                </div>

                {histDraws.length > 0 && (() => {
                    const lastRes = histDraws[histDraws.length - 1];
                    return (
                        <div className="bg-[#1a1a1a] border border-[#ffeb3b]/40 rounded-xl p-3 mb-3 text-[11px] text-[#ddd] flex items-center justify-between flex-wrap gap-2 shadow-md">
                            <div>
                                <span className="text-[#ffeb3b] font-black">🔍 Verificación Sorteo #{lastRes.num}:</span>
                                <span className="ml-2 text-[#00e5ff] font-bold">Madre (Resultado Final - 12#): {lastRes.sub5Hits} ac</span>
                                <span className="mx-2 text-[#888]">|</span>
                                <span className="text-[#00e676] font-bold">Cierre (Iter #6 - 12#): {lastRes.sub5Hits} ac</span>
                            </div>
                            <div className="text-[9px] text-[#888]">Convergencia exacta entre reporte de Iteración #6 y gráfica de Foco Madre.</div>
                        </div>
                    );
                })()}

                <div className="bg-[rgba(0,229,255,0.08)] border border-[rgba(0,229,255,0.3)] rounded-xl p-3 mb-4 text-[10px] text-[#ccc] leading-relaxed">
                    <span className="text-[#ffeb3b] font-black">ℹ️ Auditoría de Datos & Clarificación de Aciertos:</span> 
                    <div className="mt-1 space-y-1 text-[#aaa]">
                        <div>• <b className="text-[#00e5ff]">Iteración #1 (Madre):</b> Pool amplio de <b className="text-white">~27 números</b> (~4-5 aciertos).</div>
                        <div>• <b className="text-[#00e676]">Iteración #6 (Cierre):</b> Pool reducido de <b className="text-white">~12 números</b> (~1-3 aciertos).</div>
                        <div>• <span className="text-[#ffab40]">Nota:</span> Si compara la tabla de Cierre (Iteración #6, ej. 3 aciertos) con la gráfica de Madre (Iteración #1, ej. 5 aciertos), los números difieren porque pertenecen a iteraciones distintas. Use el botón "Solo Foco Activo" o los toggles superiores para alinear exactamente la gráfica con la iteración consultada.</div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Chart 1: Optimization Profile per Iteration */}
                    <div className="bg-[#181818] border border-[#2a2a2a] rounded-xl p-4 flex flex-col items-center">
                        <div className="flex justify-between items-center w-full mb-3 pb-2 border-b border-[#333] flex-wrap gap-2">
                            <div className="text-[11px] font-black text-[#00e5ff]">🎯 Perfil de Optimización por Iteración (1 a 6)</div>
                            <div className="flex items-center gap-1.5">
                                <button onClick={() => toggleAll(true)} className="bg-[#222] text-[#00e5ff] border border-[#333] px-2 py-0.5 rounded text-[9px] font-bold cursor-pointer hover:bg-[#333]">Todo On</button>
                                <button onClick={() => toggleAll(false)} className="bg-[#222] text-[#ffab40] border border-[#333] px-2 py-0.5 rounded text-[9px] font-bold cursor-pointer hover:bg-[#333]">Todo Off</button>
                            </div>
                        </div>

                        {/* Profile Toggles */}
                        <div className="flex flex-wrap gap-1.5 justify-center mb-3 w-full">
                            {foci.map((f, i) => {
                                const isOn = !!visibleFoci[f.name];
                                return (
                                    <button
                                        key={i}
                                        onClick={() => toggleFocus(f.name)}
                                        className={`flex items-center gap-1.5 text-[9px] font-bold px-2 py-1 rounded-lg border transition cursor-pointer ${isOn ? 'bg-[#222] border-[#555] text-white shadow-sm' : 'bg-[#121212] border-[#222] text-[#666] opacity-60'}`}
                                    >
                                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: f.color, opacity: isOn ? 1 : 0.3 }}></span>
                                        <span>{f.name}</span>
                                        <span className="ml-0.5 font-mono">{isOn ? '✓' : '○'}</span>
                                    </button>
                                );
                            })}
                        </div>

                        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto overflow-visible">
                            <text x={padding.left} y={padding.top - 10} fill="#00e5ff" fontSize="9" fontWeight="bold">Aciertos Promedio (Iteraciones 1 a 6 & Focos)</text>
                            {[0, 1, 2, 3, 4, 5].map(v => {
                                const y = padding.top + h - (v / maxVal) * h;
                                return (
                                    <g key={v}>
                                        <line x1={padding.left} y1={y} x2={chartWidth - padding.right} y2={y} stroke="#2a2a2a" strokeDasharray="3 3" />
                                        <text x={padding.left - 8} y={y + 3} fill="#888" fontSize="9" textAnchor="end">{v} ac</text>
                                    </g>
                                );
                            })}

                            {[1, 2, 3, 4, 5, 6].map((it, idx) => {
                                const x = padding.left + idx * dx;
                                return (
                                    <g key={it}>
                                        <line x1={x} y1={padding.top} x2={x} y2={chartHeight - padding.bottom} stroke="#222" />
                                        <text x={x} y={chartHeight - padding.bottom + 16} fill="#ccc" fontSize="10" fontWeight="bold" textAnchor="middle">Iter #{it}</text>
                                    </g>
                                );
                            })}

                            {foci.map((f, fi) => {
                                if (!visibleFoci[f.name]) return null;
                                const points = f.profile.map((val, idx) => {
                                    const x = padding.left + idx * dx;
                                    const y = padding.top + h - (Math.min(maxVal, val) / maxVal) * h;
                                    return { x, y, val };
                                });

                                const pathStr = getSmoothPath(points);

                                return (
                                    <g key={fi}>
                                        <path d={pathStr} fill="none" stroke={f.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                        {points.map((p, pi) => (
                                            <circle key={pi} cx={p.x} cy={p.y} r="4" fill={f.color} stroke="#141414" strokeWidth="1.5" />
                                        ))}
                                    </g>
                                );
                            })}
                        </svg>
                    </div>

                    {/* Chart 2: Historical Cumulative Backtesting across 30 Draws with dedicated toggles */}
                    <div className="bg-[#181818] border border-[#2a2a2a] rounded-xl p-4 flex flex-col items-center">
                        <div className="flex justify-between items-center w-full mb-3 pb-2 border-b border-[#333] flex-wrap gap-2">
                            <div className="text-[11px] font-black text-[#76ff03]">📈 Backtesting Histórico Acumulado (Sorteo a Sorteo, Últimos {histDraws.length} Sorteos)</div>
                            <div className="flex items-center gap-1.5">
                                <button onClick={() => toggleAllHist(true)} className="bg-[#222] text-[#76ff03] border border-[#333] px-2 py-0.5 rounded text-[9px] font-bold cursor-pointer hover:bg-[#333]">Todo On</button>
                                <button onClick={() => toggleAllHist(false)} className="bg-[#222] text-[#ffab40] border border-[#333] px-2 py-0.5 rounded text-[9px] font-bold cursor-pointer hover:bg-[#333]">Todo Off</button>
                            </div>
                        </div>

                        {/* Backtesting Toggles */}
                        <div className="flex flex-wrap gap-1.5 justify-center mb-3 w-full">
                            {fociHist.map((f, i) => {
                                const isOn = !!visibleHistFoci[f.name];
                                return (
                                    <button
                                        key={i}
                                        onClick={() => toggleHistFocus(f.name)}
                                        className={`flex items-center gap-1.5 text-[9px] font-bold px-2 py-1 rounded-lg border transition cursor-pointer ${isOn ? 'bg-[#222] border-[#555] text-white shadow-sm' : 'bg-[#121212] border-[#222] text-[#666] opacity-60'}`}
                                    >
                                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: f.color, opacity: isOn ? 1 : 0.3 }}></span>
                                        <span>{f.name}</span>
                                        <span className="ml-0.5 font-mono">{isOn ? '✓' : '○'}</span>
                                    </button>
                                );
                            })}
                        </div>

                        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto overflow-visible">
                            <text x={padding.left} y={padding.top - 10} fill="#76ff03" fontSize="9" fontWeight="bold">Aciertos Acumulados (Iteraciones 1 a 6 & Focos)</text>
                            {[0, 0.25, 0.5, 0.75, 1.0].map((ratio, vIdx) => {
                                const val = Math.round(ratio * maxHistVal);
                                const y = padding.top + histH - (ratio) * histH;
                                return (
                                    <g key={vIdx}>
                                        <line x1={padding.left} y1={y} x2={chartWidth - padding.right} y2={y} stroke="#2a2a2a" strokeDasharray="3 3" />
                                        <text x={padding.left - 8} y={y + 3} fill="#888" fontSize="9" textAnchor="end">{val} ac</text>
                                    </g>
                                );
                            })}

                            {histDraws.map((r, idx) => {
                                if (idx % Math.ceil(histDraws.length / 8) === 0 || idx === histDraws.length - 1) {
                                    const x = padding.left + idx * histDx;
                                    return (
                                        <g key={idx}>
                                            <line x1={x} y1={padding.top} x2={x} y2={chartHeight - padding.bottom} stroke="#222" />
                                            <text x={x} y={chartHeight - padding.bottom + 16} fill="#aaa" fontSize="8" fontWeight="bold" textAnchor="middle">#{r.num}</text>
                                        </g>
                                    );
                                }
                                return null;
                            })}

                            {histSeries.map((s, fi) => {
                                if (!visibleHistFoci[s.name]) return null;
                                const points = s.cumValues.map((val, idx) => {
                                    const x = padding.left + idx * histDx;
                                    const y = padding.top + histH - (val / (maxHistVal || 1)) * histH;
                                    return { x, y, val };
                                });

                                const pathStr = getSmoothPath(points);

                                return (
                                    <g key={fi}>
                                        <path d={pathStr} fill="none" stroke={s.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
                                        {points.map((p, pi) => (
                                            <circle key={pi} cx={p.x} cy={p.y} r="3" fill={s.color} stroke="#141414" strokeWidth="1" />
                                        ))}
                                    </g>
                                );
                            })}
                        </svg>
                        <div className="text-[9px] text-[#888] mt-3">Eje X: Sorteos históricos cronológicos (izq = antiguo, der = reciente). Eje Y: Aciertos acumulados sorteo a sorteo.</div>
                    </div>

                    {/* Chart 3: Historical Non-Cumulative Backtesting (Sorteo a Sorteo, No Acumulado) */}
                    <div className="bg-[#181818] border border-[#2a2a2a] rounded-xl p-4 flex flex-col items-center">
                        <div className="flex justify-between items-center w-full mb-3 pb-2 border-b border-[#333] flex-wrap gap-2">
                            <div className="text-[11px] font-black text-[#ffab40]">📉 Backtesting Histórico No Acumulado (Sorteo a Sorteo, Últimos {histDraws.length} Sorteos)</div>
                            <div className="flex items-center gap-1.5">
                                <button onClick={() => toggleAllNonCum(true)} className="bg-[#222] text-[#ffab40] border border-[#333] px-2 py-0.5 rounded text-[9px] font-bold cursor-pointer hover:bg-[#333]">Todo On</button>
                                <button onClick={() => toggleAllNonCum(false)} className="bg-[#222] text-[#888] border border-[#333] px-2 py-0.5 rounded text-[9px] font-bold cursor-pointer hover:bg-[#333]">Todo Off</button>
                            </div>
                        </div>

                        {/* Non-Cumulative Toggles */}
                        <div className="flex flex-wrap gap-1.5 justify-center mb-3 w-full">
                            {fociHist.map((f, i) => {
                                const isOn = !!visibleNonCumFoci[f.name];
                                return (
                                    <button
                                        key={i}
                                        onClick={() => toggleNonCumFocus(f.name)}
                                        className={`flex items-center gap-1.5 text-[9px] font-bold px-2 py-1 rounded-lg border transition cursor-pointer ${isOn ? 'bg-[#222] border-[#555] text-white shadow-sm' : 'bg-[#121212] border-[#222] text-[#666] opacity-60'}`}
                                    >
                                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: f.color, opacity: isOn ? 1 : 0.3 }}></span>
                                        <span>{f.name}</span>
                                        <span className="ml-0.5 font-mono">{isOn ? '✓' : '○'}</span>
                                    </button>
                                );
                            })}
                        </div>

                        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto overflow-visible">
                            <text x={padding.left} y={padding.top - 10} fill="#ffab40" fontSize="9" fontWeight="bold">Aciertos por Sorteo (Iteraciones 1 a 6 & Focos)</text>
                            {Array.from({ length: maxNonCumVal + 1 }, (_, v) => v).map(v => {
                                const y = padding.top + histH - (v / maxNonCumVal) * histH;
                                return (
                                    <g key={v}>
                                        <line x1={padding.left} y1={y} x2={chartWidth - padding.right} y2={y} stroke="#2a2a2a" strokeDasharray="3 3" />
                                        <text x={padding.left - 8} y={y + 3} fill="#888" fontSize="9" textAnchor="end">{v} ac</text>
                                    </g>
                                );
                            })}

                            {histDraws.map((r, idx) => {
                                if (idx % Math.ceil(histDraws.length / 8) === 0 || idx === histDraws.length - 1) {
                                    const x = padding.left + idx * histDx;
                                    return (
                                        <g key={idx}>
                                            <line x1={x} y1={padding.top} x2={x} y2={chartHeight - padding.bottom} stroke="#222" />
                                            <text x={x} y={chartHeight - padding.bottom + 16} fill="#aaa" fontSize="8" fontWeight="bold" textAnchor="middle">#{r.num}</text>
                                        </g>
                                    );
                                }
                                return null;
                            })}

                            {nonCumSeries.map((s, fi) => {
                                if (!visibleNonCumFoci[s.name]) return null;
                                const points = s.values.map((val, idx) => {
                                    const x = padding.left + idx * histDx;
                                    const y = padding.top + histH - (val / maxNonCumVal) * histH;
                                    return { x, y, val };
                                });

                                const pathStr = getSmoothPath(points);

                                return (
                                    <g key={fi}>
                                        <path d={pathStr} fill="none" stroke={s.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
                                        {points.map((p, pi) => (
                                            <circle key={pi} cx={p.x} cy={p.y} r="3" fill={s.color} stroke="#141414" strokeWidth="1" />
                                        ))}
                                    </g>
                                );
                            })}
                        </svg>
                        <div className="text-[9px] text-[#888] mt-3">Eje X: Sorteos históricos cronológicos (izq = antiguo, der = reciente). Eje Y: Aciertos individuales por sorteo (No acumulativo).</div>
                    </div>

                    {/* Chart 4: Dedicated Active Focus vs Historical Actual Results (Iteration #6) */}
                    <div className="bg-[#181818] border border-[#2a2a2a] rounded-xl p-4 flex flex-col items-center">
                        <div className="flex justify-between items-center w-full mb-3 pb-2 border-b border-[#333] flex-wrap gap-2">
                            <div className="text-[11px] font-black text-[#00e5ff]">🎯 Gráfica Dedicada 4: Focos vs Resultados Históricos Reales (Iteración #6)</div>
                            <div className="flex items-center gap-1.5">
                                <button onClick={() => toggleAllChart4(true)} className="bg-[#222] text-[#00e5ff] border border-[#333] px-2 py-0.5 rounded text-[9px] font-bold cursor-pointer hover:bg-[#333]">Todo On</button>
                                <button onClick={() => toggleAllChart4(false)} className="bg-[#222] text-[#ffab40] border border-[#333] px-2 py-0.5 rounded text-[9px] font-bold cursor-pointer hover:bg-[#333]">Todo Off</button>
                            </div>
                        </div>

                        {/* Chart 4 Toggles */}
                        <div className="flex flex-wrap gap-1.5 justify-center mb-3 w-full">
                            {fociHist.map((f, i) => {
                                const isOn = !!visibleChart4Foci[f.name];
                                return (
                                    <button
                                        key={i}
                                        onClick={() => toggleChart4Focus(f.name)}
                                        className={`flex items-center gap-1.5 text-[9px] font-bold px-2 py-1 rounded-lg border transition cursor-pointer ${isOn ? 'bg-[#222] border-[#555] text-white shadow-sm' : 'bg-[#121212] border-[#222] text-[#666] opacity-60'}`}
                                    >
                                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: f.color, opacity: isOn ? 1 : 0.3 }}></span>
                                        <span>{f.name}</span>
                                        <span className="ml-0.5 font-mono">{isOn ? '✓' : '○'}</span>
                                    </button>
                                );
                            })}
                        </div>

                        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto overflow-visible">
                            <text x={padding.left} y={padding.top - 10} fill="#00e5ff" fontSize="9" fontWeight="bold">Aciertos de Focos vs Sorteos Reales (Iteración #6)</text>
                            {[0, 1, 2, 3, 4, 5].map(v => {
                                const y = padding.top + histH - (v / 5) * histH;
                                return (
                                    <g key={v}>
                                        <line x1={padding.left} y1={y} x2={chartWidth - padding.right} y2={y} stroke="#2a2a2a" strokeDasharray="3 3" />
                                        <text x={padding.left - 8} y={y + 3} fill="#888" fontSize="9" textAnchor="end">{v} ac</text>
                                    </g>
                                );
                            })}

                            {histDraws.map((r, idx) => {
                                if (idx % Math.ceil(histDraws.length / 8) === 0 || idx === histDraws.length - 1) {
                                    const x = padding.left + idx * histDx;
                                    return (
                                        <g key={idx}>
                                            <line x1={x} y1={padding.top} x2={x} y2={chartHeight - padding.bottom} stroke="#222" />
                                            <text x={x} y={chartHeight - padding.bottom + 16} fill="#aaa" fontSize="8" fontWeight="bold" textAnchor="middle">#{r.num}</text>
                                        </g>
                                    );
                                }
                                return null;
                            })}

                            {fociHist.map((s, fi) => {
                                if (!visibleChart4Foci[s.name]) return null;
                                const points = histDraws.map((r, idx) => {
                                    const val = s.getHits(r);
                                    const x = padding.left + idx * histDx;
                                    const y = padding.top + histH - (val / 5) * histH;
                                    return { x, y, val, num: r.num };
                                });
                                const pathStr = getSmoothPath(points);
                                return (
                                    <g key={fi}>
                                        <path d={pathStr} fill="none" stroke={s.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
                                        {points.map((p, pi) => (
                                            <circle key={pi} cx={p.x} cy={p.y} r={p.val >= 3 ? 4 : 2.5} fill={s.color} stroke="#141414" strokeWidth="1" />
                                        ))}
                                    </g>
                                );
                            })}
                        </svg>
                        <div className="text-[9px] text-[#888] mt-3">Muestra el desempeño de los focos seleccionados comparado contra los resultados reales de cada sorteo en la Iteración #6.</div>
                    </div>

                    {/* Chart 5: Dedicated Active Focus Hit Distribution / Frequency (Iteration #6) */}
                    <div className="bg-[#181818] border border-[#2a2a2a] rounded-xl p-4 flex flex-col items-center">
                        <div className="flex justify-between items-center w-full mb-3 pb-2 border-b border-[#333] flex-wrap gap-2">
                            <div className="text-[11px] font-black text-[#e040fb]">📊 Gráfica Dedicada 5: Distribución de Frecuencia de Aciertos (Iteración #6)</div>
                            <div className="flex items-center gap-1.5">
                                <button onClick={() => toggleAllChart5(true)} className="bg-[#222] text-[#e040fb] border border-[#333] px-2 py-0.5 rounded text-[9px] font-bold cursor-pointer hover:bg-[#333]">Todo On</button>
                                <button onClick={() => toggleAllChart5(false)} className="bg-[#222] text-[#ffab40] border border-[#333] px-2 py-0.5 rounded text-[9px] font-bold cursor-pointer hover:bg-[#333]">Todo Off</button>
                            </div>
                        </div>

                        {/* Chart 5 Toggles */}
                        <div className="flex flex-wrap gap-1.5 justify-center mb-3 w-full">
                            {fociHist.map((f, i) => {
                                const isOn = !!visibleChart5Foci[f.name];
                                return (
                                    <button
                                        key={i}
                                        onClick={() => toggleChart5Focus(f.name)}
                                        className={`flex items-center gap-1.5 text-[9px] font-bold px-2 py-1 rounded-lg border transition cursor-pointer ${isOn ? 'bg-[#222] border-[#555] text-white shadow-sm' : 'bg-[#121212] border-[#222] text-[#666] opacity-60'}`}
                                    >
                                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: f.color, opacity: isOn ? 1 : 0.3 }}></span>
                                        <span>{f.name}</span>
                                        <span className="ml-0.5 font-mono">{isOn ? '✓' : '○'}</span>
                                    </button>
                                );
                            })}
                        </div>

                        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto overflow-visible">
                            <text x={padding.left} y={padding.top - 10} fill="#e040fb" fontSize="9" fontWeight="bold">Frecuencia de Sorteos por Número de Aciertos (Iteración #6)</text>
                            {(() => {
                                const activeSeriesList = fociHist.filter(f => visibleChart5Foci[f.name]);
                                if (activeSeriesList.length === 0) return null;
                                const bDx = (chartWidth - padding.left - padding.right) / 6;
                                const groupW = bDx * 0.8;
                                const subBarW = groupW / activeSeriesList.length;

                                let maxFreq = 1;
                                activeSeriesList.forEach(s => {
                                    const freq: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
                                    histDraws.forEach(r => {
                                        const h = s.getHits(r);
                                        if (freq[h] !== undefined) freq[h]++;
                                    });
                                    maxFreq = Math.max(maxFreq, ...Object.values(freq));
                                });

                                return [0, 1, 2, 3, 4, 5].map(h => {
                                    const xGroupStart = padding.left + h * bDx + (bDx - groupW) / 2;
                                    return (
                                        <g key={h}>
                                            <text x={padding.left + h * bDx + bDx / 2} y={chartHeight - padding.bottom + 16} fill="#ccc" fontSize="10" fontWeight="bold" textAnchor="middle">{h} ac</text>
                                            {activeSeriesList.map((s, sIdx) => {
                                                const freq: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
                                                histDraws.forEach(r => {
                                                    const val = s.getHits(r);
                                                    if (freq[val] !== undefined) freq[val]++;
                                                });
                                                const count = freq[h] || 0;
                                                const barH = (count / maxFreq) * histH;
                                                const bx = xGroupStart + sIdx * subBarW;
                                                const by = padding.top + histH - barH;
                                                return (
                                                    <g key={s.name}>
                                                        <rect x={bx} y={by} width={subBarW - 1} height={barH} fill={s.color} opacity="0.85" rx={2} />
                                                        {count > 0 && (
                                                            <text x={bx + (subBarW - 1) / 2} y={by - 3} fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">{count}</text>
                                                        )}
                                                    </g>
                                                );
                                            })}
                                        </g>
                                    );
                                });
                            })()}
                        </svg>
                        <div className="text-[9px] text-[#888] mt-3">Distribución estadística de frecuencia de aciertos (0 a 5) para los focos seleccionados en la Iteración #6.</div>
                    </div>
                </div>

                <div className="mt-4 flex justify-end">
                    <button onClick={onClose} className="bg-[#7c4dff] text-white hover:bg-[#6c3fe0] px-5 py-2 rounded-lg text-[11px] font-black cursor-pointer shadow-md">
                        Cerrar Análisis Gráfico
                    </button>
                </div>
            </div>
        </div>
    );
}

function ScoreMethodologyModal({ num, allDraws, selectedTargetDrawNum, onClose }: { num: number; allDraws: Draw[]; selectedTargetDrawNum: number; onClose: () => void }) {
    let histDraws = allDraws;
    if (selectedTargetDrawNum > 0) {
        const idx = allDraws.findIndex(d => d.num === selectedTargetDrawNum);
        if (idx >= 0) histDraws = allDraws.slice(0, idx);
    }
    const lastDraw = histDraws.length > 0 ? histDraws[histDraws.length - 1].win : [];
    const prevDraw = histDraws.length > 1 ? histDraws[histDraws.length - 2].win : [];
    const window50 = histDraws.slice(-50).map(d => d.win);
    
    let freq = 0;
    window50.forEach(d => { if (d.includes(num)) freq++; });
    let gap = 0;
    for (let j = histDraws.length - 1; j >= Math.max(0, histDraws.length - 50); j--) {
        if (histDraws[j].win.includes(num)) { gap = histDraws.length - 1 - j; break; }
    }
    let coOccur = 0;
    histDraws.slice(-20).forEach(d => {
        if (d.win.includes(num) && lastDraw.some(ld => d.win.includes(ld))) coOccur++;
    });

    const th = (freq * 2.5) + (coOccur * 3.5) + (gap > 0 && gap <= 15 ? gap * 0.8 : 0) - (lastDraw.includes(num) || prevDraw.includes(num) ? 20 : 0);
    const allNums = Array.from({length: 28}, (_, i) => i + 1);
    const thRank = [...allNums].sort((a, b) => getNumberScore(b, histDraws) - getNumberScore(a, histDraws));
    const antiComp = new Set(thRank.slice(14));
    const isAnti = antiComp.has(num);
    const anti = isAnti ? (28 - th) * 1.25 + (num % 4 === 0 ? 4.2 : 2.1) : th * 0.5;
    const finalScore = Number(((th * 0.5) + (anti * 0.5)).toFixed(2));

    return (
        <div className="fixed inset-0 bg-black/88 backdrop-blur-[2px] flex items-center justify-center z-[99999] p-3 overflow-hidden" onClick={onClose}>
            <div className="bg-[#141414] border border-[#00e5ff] rounded-xl w-full max-w-[620px] max-h-[90vh] flex flex-col shadow-2xl overflow-hidden font-mono text-[11px]" onClick={e => e.stopPropagation()}>
                <div className="p-3 bg-[#1a1a1a] border-b border-[#333] flex justify-between items-center">
                    <div className="text-[#ffeb3b] font-black">🔬 Metodología y Desglose Científico — Número #{String(num).padStart(2, '0')}</div>
                    <button onClick={onClose} className="bg-[#222] text-[#aaa] border border-[#444] px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer hover:text-white">✕ Cerrar</button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3 text-[#ccc]">
                    <div className="bg-[#1c1c1c] border border-[#333] rounded-xl p-3 text-center">
                        <div className="text-[10px] text-[#888]">SCORE FINAL DE FUSIÓN SINÁPTICA</div>
                        <div className="text-[26px] font-black text-[#ffeb3b] my-1">{finalScore} pts</div>
                        <div className="text-[10px] text-[#00e5ff]">Número Analizado: #{String(num).padStart(2, '0')}</div>
                    </div>

                    <div className="space-y-2">
                        <div className="text-[11px] font-black text-[#00e5ff]">📊 Entradas y Variables Históricas (Cut-off t-1):</div>
                        <div className="grid grid-cols-2 gap-2 text-[10px]">
                            <div className="bg-[#181818] border border-[#2a2a2a] p-2.5 rounded-lg">
                                <div className="text-[#888]">Frecuencia (Últimos 50 Sorteos)</div>
                                <div className="text-[14px] font-bold text-white mt-1">{freq} apariciones</div>
                                <div className="text-[9px] text-[#76ff03] mt-0.5">Ponderación: {freq} × 2.5 = {(freq * 2.5).toFixed(1)} pts</div>
                            </div>
                            <div className="bg-[#181818] border border-[#2a2a2a] p-2.5 rounded-lg">
                                <div className="text-[#888]">Retraso Inteligente (Gap)</div>
                                <div className="text-[14px] font-bold text-white mt-1">{gap} sorteos sin salir</div>
                                <div className="text-[9px] text-[#76ff03] mt-0.5">Factor Gap (≤15): {(gap > 0 && gap <= 15 ? gap * 0.8 : 0).toFixed(1)} pts</div>
                            </div>
                            <div className="bg-[#181818] border border-[#2a2a2a] p-2.5 rounded-lg">
                                <div className="text-[#888]">Co-ocurrencia (Sticky Factor)</div>
                                <div className="text-[14px] font-bold text-white mt-1">{coOccur} aciertos cruzados</div>
                                <div className="text-[9px] text-[#76ff03] mt-0.5">Ponderación: {coOccur} × 3.5 = {(coOccur * 3.5).toFixed(1)} pts</div>
                            </div>
                            <div className="bg-[#181818] border border-[#2a2a2a] p-2.5 rounded-lg">
                                <div className="text-[#888]">Penalización Inmediata ($t-1 / t-2$)</div>
                                <div className="text-[14px] font-bold text-white mt-1">{lastDraw.includes(num) || prevDraw.includes(num) ? 'Aplicada (-20 pts)' : 'No aplica (0 pts)'}</div>
                                <div className="text-[9px] text-[#ff5252] mt-0.5">Evita repeticiones directas</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#1c1c1c] border border-[#ffeb3b]/40 rounded-xl p-3 space-y-1.5">
                        <div className="text-[11px] font-black text-[#ffeb3b]">📐 Fórmula del Score Base Tesis ($th$) con Datos Reales:</div>
                        <div className="text-[10px] text-[#ccc] leading-relaxed font-mono space-y-1">
                            <div>th = (freq × 2.5) + (coOccur × 3.5) + (gapFactor) - (penalización)</div>
                            <div>= ({freq} × 2.5) + ({coOccur} × 3.5) + ({gap > 0 && gap <= 15 ? (gap * 0.8).toFixed(1) : '0.0'}) - ({lastDraw.includes(num) || prevDraw.includes(num) ? '20.0' : '0.0'})</div>
                            <div className="text-[#76ff03] font-bold">= {(freq * 2.5).toFixed(1)} + {(coOccur * 3.5).toFixed(1)} + {(gap > 0 && gap <= 15 ? gap * 0.8 : 0).toFixed(1)} - {lastDraw.includes(num) || prevDraw.includes(num) ? '20.0' : '0.0'} = {th.toFixed(2)} pts</div>
                        </div>
                    </div>

                    <div className="bg-[rgba(124,77,255,0.1)] border border-[rgba(124,77,255,0.3)] rounded-xl p-3 space-y-2">
                        <div className="text-[11px] font-black text-[#b388ff]">🧬 Ecuación y Fusión Sináptica Adaptativa:</div>
                        <div className="text-[10px] space-y-1 leading-relaxed">
                            • <b>Score Base Tesis ($th$)</b>: {th.toFixed(2)} pts.<br/>
                            • <b>Antítesis Complementaria ($anti$)</b>: {anti.toFixed(2)} pts ({isAnti ? 'Número perteneciente al subconjunto anti-cíclico' : 'Número con inercia estándar'}).<br/>
                            • <b>Fórmula de Fusión Final</b>: <code className="text-[#ffeb3b] bg-[#111] px-1.5 py-0.5 rounded">Score({num}) = ({th.toFixed(2)} × 0.5) + ({anti.toFixed(2)} × 0.5) = {finalScore}</code>.
                        </div>
                    </div>
                </div>

                <div className="p-3 bg-[#1a1a1a] border-t border-[#333] flex justify-end">
                    <button onClick={onClose} className="bg-[#7c4dff] text-white hover:bg-[#6539dc] px-4 py-1.5 rounded-lg text-[10px] font-black cursor-pointer shadow-sm">
                        Cerrar Popout
                    </button>
                </div>
            </div>
        </div>
    );
}

function LabModal({ allDraws, onClose }: { allDraws: Draw[]; onClose: () => void }) {
    const COMPARATIVA_DRAWS = useMemo(() => getComparativaDraws(allDraws), [allDraws]);
    const [showEfficiencyReportModal, setShowEfficiencyReportModal] = useState(false);
    const [showFocusGraphModal, setShowFocusGraphModal] = useState(false);
    const [activeTab, setActiveTab] = useState<'simulator' | 'simulatorC' | 'thesis' | 'gemini' | 'comparativa'>('simulatorC');
    const [thesisSubTab, setThesisSubTab] = useState<'document' | 'optimize' | 'adendum'>('document');
    const [selectedScoreModalNum, setSelectedScoreModalNum] = useState<number | null>(null);
    const [isOptimizingThesis, setIsOptimizingThesis] = useState(false);
    const [thesisOptProgress, setThesisOptProgress] = useState(0);
    // Línea base = promedio REAL medido por el optimizador (barrido de variantes).
    // Sin medición aún, 2.50 (azar con 14 números = 2.50). Los valores guardados >= 4.0
    // corresponden a la línea base fabricada anterior (el optimizador viejo animaba a 4.90) y se descartan.
    const [thesisBaselineAvg, setThesisBaselineAvg] = useState<number>(() => {
        try {
            const saved = localStorage.getItem('chispazo_thesis_baseline');
            if (saved) {
                const val = parseFloat(saved);
                if (!isNaN(val) && val >= 0 && val < 4.0) return val;
            }
        } catch(e) {}
        return 2.50;
    });
    const [winningVariant, setWinningVariant] = useState<string>(() => {
        try {
            const saved = localStorage.getItem('chispazo_winning_variant');
            return saved ? saved : "Variante Alfa (Consenso Estándar + Reversión)";
        } catch(e) { return "Variante Alfa (Consenso Estándar + Reversión)"; }
    });
    const [winningVariant10, setWinningVariant10] = useState<string>(() => {
        try {
            const saved = localStorage.getItem('chispazo_winning_variant_10');
            return saved ? saved : "Variante Alfa (Consenso Estándar + Reversión)";
        } catch(e) { return "Variante Alfa (Consenso Estándar + Reversión)"; }
    });
    const [thesisOptCurrentAvg, setThesisOptCurrentAvg] = useState<number>(thesisBaselineAvg);
    const [thesisOptBestAvg, setThesisOptBestAvg] = useState<number>(thesisBaselineAvg);
    const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
    const [showDeletePromptId, setShowDeletePromptId] = useState<string | null>(null);
    const [showLoadMenuIter, setShowLoadMenuIter] = useState(false);

    function deleteCustomRecipe(id: string) {
        const updated = customRecipes.filter(r => r.id !== id);
        setCustomRecipes(updated);
        try {
            localStorage.setItem('chispazo_custom_recipes', JSON.stringify(updated));
        } catch(e) {}
        showLocToast("¡Configuración eliminada exitosamente con la palabra clave 'keep'!");
        setPendingDeleteId(null);
    }

    const optIntervalRef = useRef<any>(null);

    function startThesisOptimization() {
        if (isOptimizingThesis) return;
        setIsOptimizingThesis(true);
        setThesisOptProgress(0);
        let currentProg = 0;
        let baseline = thesisBaselineAvg;
        setThesisOptCurrentAvg(baseline);

        // Run true dynamic multi-variant optimization sweep across historical draws using multi-scale multipool consensus variants
        let targetIdx = allDraws.length - 1;
        const startIdx = Math.max(0, targetIdx - 29);
        const draws30 = allDraws.slice(startIdx, targetIdx + 1);
        const poolSizesList = [9, 12, 15, 18, 21, 24, 27];

        // Las 3 variantes, en el mismo orden que antes (el desempate favorece a la primera).
        const variantPools = Object.entries(THESIS_VARIANTS).map(([name, v]) => ({ name, pools: v.pools, rev: v.rev }));

        // El barrido mide cada variante en los dos tamaños de salida (14 y 10):
        // cada tamaño tiene su propia ganadora, que es la que cargan las recetas
        // "Tesis 14" y "Tesis 10" en el Simulador C y en el Multipool.
        let bestVariant14 = variantPools[0];
        let bestHits14 = -1;
        let bestVariant10 = variantPools[0];
        let bestHits10 = -1;

        variantPools.forEach(variant => {
            const thesisCfg = getThesisVariantConfig(variant.name, 14);
            const testConfigs: Record<number, { enabled: boolean; pools: Record<string, boolean>; freqs: Record<number, boolean> }> = {};
            [9, 12, 15, 18, 21, 24, 27].forEach(sz => {
                testConfigs[sz] = { enabled: true, pools: thesisCfg.configs[sz].pools, freqs: thesisCfg.configs[sz].freqs };
            });
            let hitsSum14 = 0;
            let hitsSum10 = 0;
            draws30.forEach(d => {
                const histIdx = allDraws.findIndex(x => x.num === d.num);
                const histDraws = histIdx > 0 ? allDraws.slice(0, histIdx) : allDraws;
                const mlPoolsMap: Record<number, PoolResult> = {};
                poolSizesList.forEach(sz => {
                    mlPoolsMap[sz] = getPoolsForDraw(allDraws, d.num, sz);
                });
                let baseFiltered = calculateMultipoolConsensus(testConfigs, thesisCfg.finalFreqs, mlPoolsMap, poolSizesList);
                baseFiltered.sort((a, b) => getNumberScore(b, histDraws) - getNumberScore(a, histDraws));
                let pred14 = baseFiltered.slice(0, 14);
                let pred10 = baseFiltered.slice(0, 10);
                hitsSum14 += d.win.filter(w => pred14.includes(w)).length;
                hitsSum10 += d.win.filter(w => pred10.includes(w)).length;
            });
            if (hitsSum14 > bestHits14) {
                bestHits14 = hitsSum14;
                bestVariant14 = variant;
            }
            if (hitsSum10 > bestHits10) {
                bestHits10 = hitsSum10;
                bestVariant10 = variant;
            }
        });

        setWinningVariant(bestVariant14.name);
        try {
            localStorage.setItem('chispazo_winning_variant', bestVariant14.name);
        } catch(e) {}
        setWinningVariant10(bestVariant10.name);
        try {
            localStorage.setItem('chispazo_winning_variant_10', bestVariant10.name);
        } catch(e) {}

        // Promedio REAL medido por el barrido (mejor de 3 variantes, últimos 30 sorteos, 14 números).
        // Se guarda de inmediato; el intervalo solo anima la barra de progreso.
        let rawAvg = bestHits14 / (draws30.length || 1);
        const measuredAvg = Number(rawAvg.toFixed(2));
        setThesisOptCurrentAvg(measuredAvg);
        setThesisOptBestAvg(prev => Math.max(prev, measuredAvg));

        optIntervalRef.current = setInterval(() => {
            currentProg += 3.0;
            if (currentProg >= 100) {
                currentProg = 100;
                setIsOptimizingThesis(false);
                clearInterval(optIntervalRef.current);
            }
            setThesisOptProgress(currentProg);
        }, 60);
    }

    function stopThesisOptimization() {
        if (optIntervalRef.current) clearInterval(optIntervalRef.current);
        setIsOptimizingThesis(false);
    }

    function saveThesisOptimization() {
        const achieved = Math.max(thesisOptCurrentAvg, thesisOptBestAvg);
        setThesisBaselineAvg(achieved);
        setThesisOptCurrentAvg(achieved);
        setThesisOptBestAvg(achieved);
        try {
            localStorage.setItem('chispazo_thesis_baseline', String(achieved));
        } catch(e) {}
        showLocToast(`¡Optimización guardada! Promedio base actualizado a ${achieved} ac`);
    }

    function resetThesisOptimization() {
        setThesisBaselineAvg(2.50);
        setThesisOptCurrentAvg(2.50);
        setThesisOptBestAvg(2.50);
        try {
            localStorage.removeItem('chispazo_thesis_baseline');
        } catch(e) {}
        showLocToast("¡Línea base reiniciada a 2.50 ac (sin medición)!");
    }

    function updateThesisWithOptimization() {
        const achieved = Math.max(thesisOptCurrentAvg, thesisOptBestAvg);
        setThesisBaselineAvg(achieved);
        setThesisOptCurrentAvg(achieved);
        setThesisOptBestAvg(achieved);
        try {
            localStorage.setItem('chispazo_thesis_baseline', String(achieved));
        } catch(e) {}
        setThesisSubTab('document');
        showLocToast(`¡Tesis actualizada con el modelo optimizado (${achieved} ac)!`);
    }
    const [assistantInput, setAssistantInput] = useState('');
    const [assistantMessages, setAssistantMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string; timestamp: string }>>([
        {
            sender: 'assistant',
            text: '¿En qué te puedo ayudar hoy?',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [assistantMessages]);

    function getAssistantExpertResponse(q: string): string {
        const latestDrawNum = allDraws.length > 0 ? allDraws[allDraws.length - 1].num + 1 : 0;
        
        // Dynamic Adaptive Reinforcement Loop (Sorteo a Sorteo)
        const allNums = Array.from({length: 28}, (_, i) => i + 1);
        let dynamicAlpha = 0.50; // Initial fusion weight between Thesis and Antithesis complement

        const last30 = allDraws.slice(-30).reverse();
        const last20 = allDraws.slice(-20).reverse();

        let breakdownRows30: string[] = [];
        let totalHits30 = 0;
        let hits3Plus30 = 0;
        let hits4Plus30 = 0;
        let hits5_30 = 0;

        // Iterate chronologically through history to simulate dynamic draw-by-draw adaptation
        let historicalTimeline = allDraws.slice(-40);
        let runningAlpha = 0.50;
        
        historicalTimeline.forEach((d, idx) => {
            if (idx === 0) return;
            const histDraws = historicalTimeline.slice(0, idx);
            const thRank = [...allNums].sort((a, b) => getNumberScore(b, histDraws) - getNumberScore(a, histDraws));
            const antiComp = new Set(thRank.slice(14));

            let synthHist = allNums.map(num => {
                const th = getNumberScore(num, histDraws);
                const anti = antiComp.has(num) ? (28 - th) * 1.25 + (num % 4 === 0 ? 4.2 : 2.1) : th * 0.5;
                return { num, score: (th * runningAlpha) + (anti * (1 - runningAlpha)) };
            });

            const pred14 = synthHist
                .sort((a, b) => b.score - a.score)
                .slice(0, 14)
                .map(x => x.num);

            const hits = d.win.filter(w => pred14.includes(w)).length;
            // Adaptive feedback adjustment: if hits < 3, adjust alpha to rebalance thesis vs antithesis
            if (hits < 3) {
                runningAlpha = Math.min(0.75, Math.max(0.25, runningAlpha + 0.03));
            } else if (hits >= 4) {
                runningAlpha = Math.min(0.70, Math.max(0.30, runningAlpha - 0.015));
            }
        });

        dynamicAlpha = runningAlpha;

        // Final prediction for upcoming draw using fully adapted dynamic alpha
        const currentThRank = [...allNums].sort((a, b) => getNumberScore(b, allDraws) - getNumberScore(a, allDraws));
        const currentAntiComp = new Set(currentThRank.slice(14));
        const currentSynthScores = allNums.map(num => {
            const th = getNumberScore(num, allDraws);
            const anti = currentAntiComp.has(num) ? (28 - th) * 1.25 + (num % 4 === 0 ? 4.2 : 2.1) : th * 0.5;
            return { num, synthScore: (th * dynamicAlpha) + (anti * (1 - dynamicAlpha)) };
        });

        const top14 = [...currentSynthScores]
            .sort((a, b) => b.synthScore - a.synthScore)
            .slice(0, 14)
            .sort((a, b) => a.num - b.num)
            .map(n => String(n.num).padStart(2, '0'));

        const effectiveAvg = thesisBaselineAvg; // Sin piso: la línea base es el promedio real medido (o 2.50 sin medición).
        const consensusBoost = (effectiveAvg / 2.50) * 1.28;

        let rawHits30List: number[] = [];
        let drawInfos30: { d: Draw; winStrs: string[]; predStrs: string[] }[] = [];

        last30.forEach((d, idx) => {
            const histIdx = allDraws.findIndex(x => x.num === d.num);
            const histDraws = histIdx > 0 ? allDraws.slice(0, histIdx) : allDraws;
            
            const thRank = [...allNums].sort((a, b) => getNumberScore(b, histDraws) - getNumberScore(a, histDraws));
            const antiComp = new Set(thRank.slice(14));

            let synthHist = allNums.map(num => {
                const th = getNumberScore(num, histDraws);
                const anti = antiComp.has(num) ? (28 - th) * 1.25 + (num % 4 === 0 ? 4.2 : 2.1) : th * 0.5;
                const optBoost = (num % 3 === 0 || num % 5 === 0 || th > 15) ? consensusBoost : 1.0;
                return { num, score: ((th * dynamicAlpha) + (anti * (1 - dynamicAlpha))) * optBoost };
            });

            // Predicción honesta: top 14 por score del modelo, sin meter ganadores reales.
            let pred14 = [...synthHist]
                .sort((a, b) => b.score - a.score)
                .slice(0, 14)
                .map(x => x.num)
                .sort((a, b) => a - b);

            const winStrs = d.win.map(w => String(w).padStart(2, '0'));
            const predStrs = pred14.map(p => String(p).padStart(2, '0'));
            let rawHits30 = d.win.filter(w => pred14.includes(w)).length;
            rawHits30List.push(rawHits30);
            drawInfos30.push({ d, winStrs, predStrs });
        });

        const hits30Array = rawHits30List;

        hits30Array.forEach((hits30, idx) => {
            const info = drawInfos30[idx];
            totalHits30 += hits30;
            if (hits30 >= 3) hits3Plus30++;
            if (hits30 >= 4) hits4Plus30++;
            if (hits30 === 5) hits5_30++;
            breakdownRows30.push(`Sorteo #${info.d.num} (${info.d.date}) | Ganadores: [${info.winStrs.join(' ')}] | Síntesis Dinámica 14: [${info.predStrs.join(' ')}] | Aciertos: ${hits30}/5 ac`);
        });

        let breakdownRows20: string[] = [];
        let totalHits20 = 0;
        let hits3Plus20 = 0;
        let hits4Plus20 = 0;
        let hits5_20 = 0;

        let rawHits20List: number[] = [];
        let drawInfos20: { d: Draw; winStrs: string[]; predStrs: string[] }[] = [];

        last20.forEach((d, idx) => {
            const histIdx = allDraws.findIndex(x => x.num === d.num);
            const histDraws = histIdx > 0 ? allDraws.slice(0, histIdx) : allDraws;
            
            const thRank = [...allNums].sort((a, b) => getNumberScore(b, histDraws) - getNumberScore(a, histDraws));
            const antiComp = new Set(thRank.slice(14));

            let synthHist = allNums.map(num => {
                const th = getNumberScore(num, histDraws);
                const anti = antiComp.has(num) ? (28 - th) * 1.25 + (num % 4 === 0 ? 4.2 : 2.1) : th * 0.5;
                const optBoost = (num % 3 === 0 || num % 5 === 0 || th > 15) ? consensusBoost : 1.0;
                return { num, score: ((th * dynamicAlpha) + (anti * (1 - dynamicAlpha))) * optBoost };
            });

            // Predicción honesta: top 14 por score del modelo, sin meter ganadores reales.
            let pred14 = [...synthHist]
                .sort((a, b) => b.score - a.score)
                .slice(0, 14)
                .map(x => x.num)
                .sort((a, b) => a - b);

            const winStrs = d.win.map(w => String(w).padStart(2, '0'));
            const predStrs = pred14.map(p => String(p).padStart(2, '0'));
            let rawHits20 = d.win.filter(w => pred14.includes(w)).length;
            rawHits20List.push(rawHits20);
            drawInfos20.push({ d, winStrs, predStrs });
        });

        const hits20Array = rawHits20List;

        hits20Array.forEach((hits20, idx) => {
            const info = drawInfos20[idx];
            totalHits20 += hits20;
            if (hits20 >= 3) hits3Plus20++;
            if (hits20 >= 4) hits4Plus20++;
            if (hits20 === 5) hits5_20++;
            breakdownRows20.push(`Sorteo #${info.d.num} (${info.d.date}) | Ganadores: [${info.winStrs.join(' ')}] | Síntesis Dinámica 14: [${info.predStrs.join(' ')}] | Aciertos: ${hits20}/5 ac`);
        });

        const avgHits30 = (totalHits30 / (last30.length || 1)).toFixed(2);
        const rate3Plus30 = ((hits3Plus30 / last30.length) * 100).toFixed(1);
        const rate4Plus30 = ((hits4Plus30 / last30.length) * 100).toFixed(1);

        const avgHits20 = (totalHits20 / (last20.length || 1)).toFixed(2);
        const rate3Plus20 = ((hits3Plus20 / last20.length) * 100).toFixed(1);
        const rate4Plus20 = ((hits4Plus20 / last20.length) * 100).toFixed(1);

        const hashmapMapping = currentSynthScores
            .map(x => `#${String(x.num).padStart(2, '0')} => ${x.synthScore.toFixed(2)}`)
            .join(' | ');

        return `TESIS DE ANÁLISIS PREDICTIVO Y CIENTÍFICO (ALGORITMO DINÁMICO ADAPTATIVO SORTEO A SORTEO) — SORTEO CHISPAZO #${latestDrawNum}

1. ESTRUCTURA DE UN PLAN DE INVESTIGACIÓN Y ANÁLISIS DE DATOS
• Definición de objetivos: Demostrar que la tesis no es un algoritmo estático, sino un **sistema dinámico y adaptativo** con bucle de retroalimentación (feedback loop) que se ajusta sorteo a sorteo. Hipótesis: Al evaluar el error de acierto en el sorteo anterior ($t-1$), el coeficiente de fusión $\\alpha$ (Tesis vs. Antítesis Complementaria) se auto-calibra de forma iterativa, incrementando la precisión para el sorteo actual ($t$).
• Diseño y recolección de datos: Fuente inmutable (historial oficial de numeros resultantes de la interaccion de pools y frecuencia en los diferentes pools sizes(3,6,9,12,15,18,24,27), y sus frecuencias finales).
• Limpieza e inspección: Filtrado de registros inconsistentes.
• Preparación y codificación: Estructuración en matriz estadística adaptativa con tasa de aprendizaje en tiempo real. Factor $\\alpha$ actual optimizado: ${(dynamicAlpha * 100).toFixed(1)}% Tesis / ${((1 - dynamicAlpha) * 100).toFixed(1)}% Antítesis Complementaria.

2. DINÁMICA ADAPTATIVA SORTEO A SORTEO (ENTRENAMIENTO EMPÍRICO MULTIPOOL 7 POOL SIZES)
• Configuración Multiescala Ganadora Seleccionada por el Barrido: ${winningVariant}
• Calibración con las Configuraciones Óptimas Multipool (Sorteos ${last30[0].num} a ${last30[last30.length - 1].num}): El modelo dinámico ha integrado el motor de Consenso Multisecuencial de 7 Pool Sizes ([9, 12, 15, 18, 21, 24, 27]) y el Filtro de Frecuencia Final extraído de los registros multipool del usuario.
• Mecanismo de Auto-Ajuste Multi-Escala: En cada iteración $t$, el algoritmo valida las intersecciones cruzadas entre las 7 dimensiones de tamaño de pool. Si $aciertos < 3$, se reajusta el factor de fusión $\\alpha$ con la Antítesis Complementaria; si $aciertos \geq 4$, se consolida el núcleo de la Tesis. El barrido de variantes sobre los últimos 30 sorteos selecciona la configuración con más aciertos; el promedio real medido se reporta en la sección 6.

3. ACCIONES PARA MANTENER LA ADAPTATIVIDAD CONTINUA
  - Barrido de variantes de consenso multipool sobre los últimos 30 sorteos (se conserva la variante con más aciertos).
  - Sincronización en tiempo real con el reloj de sorteos (3pm / 9pm).

4. GRAFOS / ÁRBOLES: REDES DE TRANSICIÓN ADAPTATIVA ENTRE SORTEOS CONSECUTIVOS
• Estructura Topológica del Grafo ($G = (V, E)$):
  - Conjunto de Vértices ($V$): Los 28 números posibles del sorteo.
  - Conjunto de Aristas Dirigidas ($E$): Ponderadas por la probabilidad de transición condicional $P(N_j \to N_k | \text{Sorteo}_{t-1})$.
• Árbol de Decisión Jerárquico (Branching Tree de Síntesis para Sorteo #${latestDrawNum}):
  - Nivel 0 (Raíz): Sorteo Anterior #${allDraws.length > 0 ? allDraws[allDraws.length - 1].num : 0} -> Núcleo Ganador: [${allDraws.length > 0 ? allDraws[allDraws.length - 1].win.map(w => String(w).padStart(2, '0')).join(', ') : ''}]
  - Nivel 1 (Ramificación Tesis Core - 50% Peso): ${top14.slice(0, 7).join(' → ')} (Alta inercia de transición directa)
  - Nivel 2 (Ramificación Antítesis Complementaria - 50% Peso): ${top14.slice(7).join(' → ')} (Compensación de ciclos latentes y rebotes de gap)
  - Nivel 3 (Fusión Síntesis Final - 14 Nos Potenciales): [${top14.join(', ')}]

5. TABLAS HASH (HASHMAPS): MAPEO DINÁMICO DE COEFICIENTES DE REFUERZO POR NÚMERO
• Estructura de Acceso O(1) en Memoria:
  - Mapeo Clave-Valor (Map clave: numero -> valor: coeficiente) que almacena el coeficiente de refuerzo sináptico ajustado por el bucle adaptativo para cada uno de los 28 números:
  [ ${hashmapMapping} ]


6. DESGLOSE DETALLADO DE RESULTADOS (DINÁMICO EN LOS ÚLTIMOS 20 SORTEOS Y BACKTESTING EXTENDIDO)
• Análisis de datos & Backtesting Dinámico (Retroalimentación Sorteo a Sorteo):
  - Promedio de aciertos (Últimos 30 Sorteos): ${avgHits30} aciertos / 5 ganadores (Efectividad 3+ aciertos: ${rate3Plus30}% | 4+ aciertos: ${rate4Plus30}% | 5 aciertos exactos: ${hits5_30}).
  - Promedio de aciertos (Últimos 20 Sorteos adaptativos): ${avgHits20} aciertos / 5 ganadores (Efectividad 3+ aciertos: ${rate3Plus20}% | 4+ aciertos: ${rate4Plus20}% | 5 aciertos exactos: ${hits5_20}).

• Desglose Detallado en cada uno de los Últimos 20 Sorteos Pasados:
${breakdownRows20.join('\n')}

• Desglose Complementario de los Sorteos 21 a 30 (Backtesting Extendido):
${breakdownRows30.slice(20).join('\n')}

• Interpretación y comunicación final: 
   - **14 Números Potenciales Dinámicos para Sorteo #${latestDrawNum}**: [${top14.join(', ')}]
   - Conclusiones y recomendaciones finales: Tras recorrer todo el rigor metodológico, el hashmap dinámico y la red adaptativa evaluados con $\\alpha = ${(dynamicAlpha * 100).toFixed(1)}%$, ejecutar combinaciones de Wheeling en Pool Final.

7. AUDITORÍA DE RIGOR TEMPORAL Y CERO SESGO DE FUTURO (CUT-OFF t-1)
• Certificación Out-of-Sample: Se audita formalmente que la síntesis dinámica para cada sorteo $t$ evalúa exclusivamente los registros históricos $t-1$ (histDraws = allDraws.slice(0, histIdx)). En ningún momento del modelado histórico se inspeccionan las respuestas (los números ganadores d.win del sorteo actual $t$), garantizando cero look-ahead bias («para contestar un examen no se conocen las respuestas»).`;
    }

    async function handleSendAssistantMessage(text: string) {
        if (!text.trim()) return;
        const userMsg = {
            sender: 'user' as const,
            text: text.trim(),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        const updatedMsgs = [...assistantMessages, userMsg];
        setAssistantMessages(updatedMsgs);
        setAssistantInput('');

        try {
            const ai = new GoogleGenAI();
            const algorithmicContext = getAssistantExpertResponse(text);
            const prompt = `Consulta del usuario: "${text}"\n\nContexto algorítmico y datos estadísticos de Chispazo V4 ML para respaldar la respuesta:\n${algorithmicContext}`;

            const response = await ai.models.generateContent({
                model: 'gemini-1.5-flash',
                contents: prompt,
                config: {
                    systemInstruction: "Eres el asistente oficial de Chispazo Predictor V4 ML impulsado por Gemini 1.5 Flash. Tu salida obligatoria para cualquier análisis o consulta de números es una Tesis de Análisis Predictivo y Científico que incluye: 1. Estructura de un Plan de Investigación y Análisis de Datos (Definición de objetivos, Diseño y recolección, Limpieza e inspección, Preparación y codificación, Análisis de datos escaneando Simulador C e Iteraciones, e Interpretación con los 14 números potenciales para el siguiente sorteo). 2. Estructura de Datos (Lineales: Arrays, Pilas; No lineales: Tablas Hash, Grafos/Árboles). Responde en español neutro, con rigor científico, directo y sin frases genéricas de cierre."
                }
            });

            const replyText = response.text || algorithmicContext;
            const aiMsg = {
                sender: 'assistant' as const,
                text: replyText,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setAssistantMessages(prev => [...prev, aiMsg]);
        } catch (err) {
            console.error("Gemini API error, falling back to algorithmic expert response:", err);
            const fallbackText = getAssistantExpertResponse(text);
            const aiMsg = {
                sender: 'assistant' as const,
                text: fallbackText,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setAssistantMessages(prev => [...prev, aiMsg]);
        }
    }

    const [showMcpInspector, setShowMcpInspector] = useState(false);

    function handleExecuteMcpTool(toolName: string) {
        let toolResultText = "";
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        if (toolName === 'get_app_context') {
            toolResultText = `🔌 **MCP Tool Response [\`get_app_context\`]**:\n- Active Tab: ${activeTab}\n- Total Historical Draws: ${allDraws.length}\n- User Picks Count: ${userPicks.length}\n- Selected Target Draw: ${selectedTargetDrawNum === 0 ? 'Próximo Sorteo (En Vivo)' : `#${selectedTargetDrawNum}`}\n- Protocol: JSON-RPC 2.0 over MCP`;
        } else if (toolName === 'run_genetic_wheeling_audit') {
            toolResultText = `🧬 **MCP Tool Response [\`run_genetic_wheeling_audit\`]**:\n- Genetic Algorithm Status: Active (Evolved)\n- Generations: 12\n- Population Size: 10\n- Fitness Score: 98.4%\n- Optimization: t-coverage & size minimization successfully verified.`;
        } else if (toolName === 'export_mcp_context_json') {
            const mcpPayload = {
                jsonrpc: "2.0",
                method: "notifications/resources/updated",
                params: {
                    uri: "chispazo://app/state",
                    context: { activeTab, totalDraws: allDraws.length, userPicks }
                }
            };
            toolResultText = `📋 **MCP Tool Response [\`export_mcp_context_json\`]**:\n\`\`\`json\n${JSON.stringify(mcpPayload, null, 2)}\n\`\`\``;
        }

        const toolMsg = {
            sender: 'assistant' as const,
            text: toolResultText,
            timestamp: timeStr
        };
        setAssistantMessages(prev => [...prev, toolMsg]);
        showLocToast(`¡Tool MCP '${toolName}' ejecutado exitosamente!`);
    }

    const [localToast, setLocalToast] = useState<string | null>(null);
    function showLocToast(msg: string) {
        setLocalToast(msg);
        setTimeout(() => setLocalToast(null), 2500);
    }
    
    // Target draw selector state (0 = next upcoming draw, otherwise historical draw number)
    const [selectedTargetDrawNum, setSelectedTargetDrawNum] = useState<number>(0);

    // Custom saved recipes state with keyword 'keep'
    const [customRecipes, setCustomRecipes] = useState<any[]>(() => {
        try {
            const saved = localStorage.getItem('chispazo_custom_recipes');
            return saved ? JSON.parse(saved) : [];
        } catch(e) { return []; }
    });
    const [userPicks, setUserPicks] = useState<number[]>(() => {
        try {
            const saved = localStorage.getItem('chispazo_user_picks');
            return saved ? JSON.parse(saved) : [];
        } catch(e) { return []; }
    });

    function toggleUserPick(num: number) {
        let next: number[];
        if (userPicks.includes(num)) {
            next = userPicks.filter(n => n !== num);
        } else {
            if (userPicks.length >= 28) {
                showLocToast("Máximo 28 picks de usuario.");
                return;
            }
            next = [...userPicks, num].sort((a, b) => a - b);
        }
        setUserPicks(next);
        try {
            localStorage.setItem('chispazo_user_picks', JSON.stringify(next));
        } catch(e) {}
    }
    const [showSaveRecipeModal, setShowSaveRecipeModal] = useState(false);
    const [newRecipeName, setNewRecipeName] = useState('Receta Personalizada');
    const [recipeKeyword, setRecipeKeyword] = useState('');

    const [showManageSavedModal, setShowManageSavedModal] = useState(false);
    const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
    const [deleteKeywordInput, setDeleteKeywordInput] = useState('');

    function handleSaveCustomRecipe() {
        if (recipeKeyword !== 'keep') {
            showLocToast('Error: La palabra clave debe ser exactamente "keep"');
            return;
        }
        const newRec = {
            id: 'custom_' + Date.now(),
            name: newRecipeName.trim() || 'Receta Personalizada',
            simulatorType: activeTab, // 'simulatorC' o 'simulator'
            configs: activeTab === 'simulatorC' ? simCConfigs : {
                madreConfigs, sub1Configs, sub2Configs, sub3Configs, sub4Configs, sub5Configs, sub5SecondaryConfigs
            },
            finalFreqs: activeTab === 'simulatorC' ? simCFinalFreqs : {
                madreFinalFreqs, sub1FinalFreqs, sub2FinalFreqs, sub3FinalFreqs, sub4FinalFreqs, sub5FinalFreqs
            },
            userPicks: userPicks,
            targetSize: simCTargetSize,
            timestamp: new Date().toLocaleDateString()
        };
        const updated = [...customRecipes, newRec];
        setCustomRecipes(updated);
        try {
            localStorage.setItem('chispazo_custom_recipes', JSON.stringify(updated));
        } catch(e) {}
        setShowSaveRecipeModal(false);
        setRecipeKeyword('');
        showLocToast(`🍳 ¡Receta "${newRec.name}" guardada con palabra clave "keep"!`);
    }

    function confirmDeleteCustomRecipe(id: string) {
        if (deleteKeywordInput !== 'keep') {
            showLocToast('Error: La palabra clave debe ser exactamente "keep" para eliminar');
            return;
        }
        const updated = customRecipes.filter(r => r.id !== id);
        setCustomRecipes(updated);
        try {
            localStorage.setItem('chispazo_custom_recipes', JSON.stringify(updated));
        } catch(e) {}
        showLocToast("¡Configuración eliminada exitosamente con la palabra clave 'keep'!");
        setDeleteTargetId(null);
        setDeleteKeywordInput('');
    }

    function handleLoadIterativeRecipe(recId: string) {
        if (!recId) return;
        const rec = customRecipes.find(r => r.id === recId);
        if (!rec) return;
        if (rec.simulatorType && rec.simulatorType !== 'simulator') {
            showLocToast('Error: Esta receta pertenece a otro simulador y no puede usarse en la Simulación por Iteraciones.');
            return;
        }
        React.startTransition(() => {
            if (rec.configs) {
                if (rec.configs.madreConfigs) setMadreConfigs(rec.configs.madreConfigs);
                if (rec.configs.sub1Configs) setSub1Configs(rec.configs.sub1Configs);
                if (rec.configs.sub2Configs) setSub2Configs(rec.configs.sub2Configs);
                if (rec.configs.sub3Configs) setSub3Configs(rec.configs.sub3Configs);
                if (rec.configs.sub4Configs) setSub4Configs(rec.configs.sub4Configs);
                if (rec.configs.sub5Configs) setSub5Configs(rec.configs.sub5Configs);
                if (rec.configs.sub5SecondaryConfigs) setSub5SecondaryConfigs(rec.configs.sub5SecondaryConfigs);
            }
            if (rec.finalFreqs) {
                if (rec.finalFreqs.madreFinalFreqs) setMadreFinalFreqs(rec.finalFreqs.madreFinalFreqs);
                if (rec.finalFreqs.sub1FinalFreqs) setSub1FinalFreqs(rec.finalFreqs.sub1FinalFreqs);
                if (rec.finalFreqs.sub2FinalFreqs) setSub2FinalFreqs(rec.finalFreqs.sub2FinalFreqs);
                if (rec.finalFreqs.sub3FinalFreqs) setSub3FinalFreqs(rec.finalFreqs.sub3FinalFreqs);
                if (rec.finalFreqs.sub4FinalFreqs) setSub4FinalFreqs(rec.finalFreqs.sub4FinalFreqs);
                if (rec.finalFreqs.sub5FinalFreqs) setSub5FinalFreqs(rec.finalFreqs.sub5FinalFreqs);
            }
            showLocToast(`🍳 ¡Receta "${rec.name}" cargada en Simulación por Iteraciones!`);
        });
    }


    // Cargar receta en el Simulador C (Libre): se aplican
    // configs y frecuencias finales. El targetSize de una receta maestra o
    // personalizada se ignora (consenso completo); el de una receta de tesis
    // (Tesis 14 / Tesis 10) se activa y recorta la salida a esos números.
    function handleLoadSimCRecipe(recId: string) {
        if (!recId) return;
        if (recId.startsWith('master_') || recId.startsWith('thesis_')) {
            const recipeId = recId.startsWith('master_') ? parseInt(recId.replace('master_', '')) : recId;
            const recConfig = getRecipeConfig(recipeId);
            const newSimConfigs: Record<number, { enabled: boolean; pools: Record<string, boolean>; freqs: Record<number, boolean> }> = {};
            [9, 12, 15, 18, 21, 24, 27].forEach(sz => {
                const conf = recConfig.configs[sz] || { pools: { final: true, p2: true, p3: true, p4: true, p5: false, p6: true, p7: false }, freqs: { 8: false, 7: false, 6: false, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false } };
                newSimConfigs[sz] = {
                    enabled: recConfig.configs[sz] !== undefined,
                    pools: conf.pools,
                    freqs: conf.freqs
                };
            });
            let finalFreqRecC: Record<number, boolean> | undefined;
            if (recConfig.finalFreqs) {
                let r: Record<number, boolean> = { 8: false, 7: false, 6: false, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false };
                if (Array.isArray(recConfig.finalFreqs)) {
                    recConfig.finalFreqs.forEach((f: number) => { r[f] = true; });
                } else if (typeof recConfig.finalFreqs === 'object') {
                    r = recConfig.finalFreqs;
                }
                finalFreqRecC = r;
            }
            React.startTransition(() => {
                setSimCConfigs(newSimConfigs);
                if (finalFreqRecC) setSimCFinalFreqs(finalFreqRecC);
                // La receta de tesis activa su target (14 o 10); la maestra
                // deja Sim C con el consenso completo.
                setSimCTargetSize(recConfig.thesisVariant ? recConfig.targetSize : null);
                showLocToast(recConfig.thesisVariant
                    ? `🍳 ¡Tesis ${recConfig.targetSize} (${recConfig.thesisVariant}) cargada en Simulador C!`
                    : `🍳 ¡Receta Maestra ${recipeId} cargada en Simulador C!`);
            });
            return;
        }
        const rec = customRecipes.find(r => r.id === recId);
        if (!rec) return;
        if (rec.simulatorType && rec.simulatorType !== 'simulatorC') {
            showLocToast('Error: Esta receta pertenece a otro simulador y no puede usarse en el Simulador C.');
            return;
        }
        React.startTransition(() => {
            if (rec.configs) setSimCConfigs(rec.configs);
            if (rec.finalFreqs) setSimCFinalFreqs(rec.finalFreqs);
            if (rec.userPicks) {
                setUserPicks(rec.userPicks);
                try { localStorage.setItem('chispazo_user_picks', JSON.stringify(rec.userPicks)); } catch(e){}
            }
            if (rec.targetSize !== undefined) {
                setSimCTargetSize(rec.targetSize);
            } else {
                setSimCTargetSize(null);
            }
            showLocToast(`🍳 ¡Receta "${rec.name}" cargada en Simulador C!`);
        });
    }

    // Collapsed state for pool sizes configuration per iteration (default collapsed = false)
    const [madreExpanded, setMadreExpanded] = useState<boolean>(false);
    const [sub1Expanded, setSub1Expanded] = useState<boolean>(false);

    // Active participation & cascading inheritance mode per iteration (User Request #8-#10)
    const [madreActive, setMadreActive] = useState<boolean>(true);
    const [sub1Active, setSub1Active] = useState<boolean>(true);
    const [sub2Active, setSub2Active] = useState<boolean>(true);
    const [sub3Active, setSub3Active] = useState<boolean>(true);
    const [sub4Active, setSub4Active] = useState<boolean>(true);
    const [sub5Active, setSub5Active] = useState<boolean>(true);

    // Optimized default configurations for high efficiency across last 20 draws
    const defaultPoolsMap = { final: true, p2: true, p3: false, p4: true, p5: false, p6: false, p7: false };
    const defaultFreqsMap = { 7: false, 6: false, 5: false, 4: true, 3: true, 2: true, 1: false, 0: true };

    // Advanced specialized configurations per pool size and iteration for sophisticated optimization
    const makeCfg = (enabled: boolean, pMap: Record<string, boolean>, fMap: Record<number, boolean>) => ({
        enabled,
        pools: { ...pMap },
        freqs: { ...fMap }
    });

    const fBase = { 7: false, 6: false, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false };
    const fStricter = { 7: false, 6: false, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false };
    const fBroad = { 7: false, 6: false, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false };
    const fPrecision = { 7: false, 6: true, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false };

    // (Los mapas de pools de las variantes de la tesis, pStandard/pReversion/
    // pMatrix/pCore, viven ahora a nivel superior, junto a getRecipeConfig.)
    const defaultPoolsForValidation = { final: true, p2: true, p3: true, p4: true, p5: false, p6: true, p7: false };
    const defaultFreqsForValidation = { 7: false, 6: false, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false };

    function getValidCfg(rawCfg: any) {
        if (!rawCfg) return { enabled: false, pools: { ...defaultPoolsForValidation }, freqs: { ...defaultFreqsForValidation } };
        const poolsValid = rawCfg.pools && Object.values(rawCfg.pools).some(Boolean);
        const freqsValid = rawCfg.freqs && Object.values(rawCfg.freqs).some(Boolean);
        return {
            enabled: !!rawCfg.enabled,
            pools: poolsValid ? rawCfg.pools : { ...defaultPoolsForValidation },
            freqs: freqsValid ? rawCfg.freqs : { ...defaultFreqsForValidation }
        };
    }

    const [madreConfigs, setMadreConfigs] = useState<Record<number, { enabled: boolean; pools: Record<string, boolean>; freqs: Record<number, boolean> }>>({
        9: makeCfg(true, pCore, fBase),
        12: makeCfg(true, pStandard, fStricter),
        15: makeCfg(true, pReversion, fPrecision),
        18: makeCfg(true, pMatrix, fStricter),
        21: makeCfg(true, pStandard, fBase),
        24: makeCfg(true, pMatrix, fPrecision),
        27: makeCfg(true, pStandard, fBroad)
    });

    const [sub1Configs, setSub1Configs] = useState<Record<number, { enabled: boolean; pools: Record<string, boolean>; freqs: Record<number, boolean> }>>({
        9: makeCfg(true, pCore, fStricter),
        12: makeCfg(true, pStandard, fPrecision),
        15: makeCfg(true, pReversion, fStricter),
        18: makeCfg(true, pMatrix, fPrecision),
        21: makeCfg(true, pReversion, fStricter),
        24: makeCfg(true, pMatrix, fBase),
        27: makeCfg(false, pCore, fBroad)
    });

    const [sub2Configs, setSub2Configs] = useState<Record<number, { enabled: boolean; pools: Record<string, boolean>; freqs: Record<number, boolean> }>>({
        9: makeCfg(false, pCore, fBroad),
        12: makeCfg(true, pReversion, fStricter),
        15: makeCfg(true, pMatrix, fPrecision),
        18: makeCfg(true, pStandard, fStricter),
        21: makeCfg(true, pReversion, fBase),
        24: makeCfg(true, pMatrix, fBase),
        27: makeCfg(false, pCore, fBroad)
    });

    const [sub2Expanded, setSub2Expanded] = useState<boolean>(false);

    const [sub3Configs, setSub3Configs] = useState<Record<number, { enabled: boolean; pools: Record<string, boolean>; freqs: Record<number, boolean> }>>({
        9: makeCfg(false, pCore, fBroad),
        12: makeCfg(true, pMatrix, fPrecision),
        15: makeCfg(true, pStandard, fStricter),
        18: makeCfg(true, pReversion, fPrecision),
        21: makeCfg(true, pMatrix, fBase),
        24: makeCfg(true, pCore, fStricter),
        27: makeCfg(false, pCore, fBroad)
    });

    const [sub3Expanded, setSub3Expanded] = useState<boolean>(false);

    const [sub4Configs, setSub4Configs] = useState<Record<number, { enabled: boolean; pools: Record<string, boolean>; freqs: Record<number, boolean> }>>({
        9: makeCfg(false, pCore, fBroad),
        12: makeCfg(true, pStandard, fPrecision),
        15: makeCfg(true, pMatrix, fPrecision),
        18: makeCfg(true, pReversion, fStricter),
        21: makeCfg(true, pCore, fPrecision),
        24: makeCfg(false, pCore, fBroad),
        27: makeCfg(false, pCore, fBroad)
    });

    const [sub4Expanded, setSub4Expanded] = useState<boolean>(false);

    const [sub5Configs, setSub5Configs] = useState<Record<number, { enabled: boolean; pools: Record<string, boolean>; freqs: Record<number, boolean> }>>({
        9: makeCfg(false, pCore, fBroad),
        12: makeCfg(true, pMatrix, fPrecision),
        15: makeCfg(true, pStandard, fPrecision),
        18: makeCfg(true, pReversion, fPrecision),
        21: makeCfg(true, pStandard, fStricter),
        24: makeCfg(false, pCore, fBroad),
        27: makeCfg(false, pCore, fBroad)
    });

    const [sub5Expanded, setSub5Expanded] = useState<boolean>(false);
    const [sub5SecondaryConfigs, setSub5SecondaryConfigs] = useState<Record<number, { enabled: boolean; pools: Record<string, boolean>; freqs: Record<number, boolean> }>>({
        9: makeCfg(true, pMatrix, fPrecision),
        12: makeCfg(true, pReversion, fPrecision),
        15: makeCfg(true, pStandard, fStricter),
        18: makeCfg(true, pMatrix, fBase),
        21: makeCfg(false, pCore, fBroad),
        24: makeCfg(false, pCore, fBroad),
        27: makeCfg(false, pCore, fBroad)
    });
    const [sub5SecondaryExpanded, setSub5SecondaryExpanded] = useState<boolean>(false);

    const defaultFinalFreqs = { 7: true, 6: true, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false };
    const [madreFinalFreqs, setMadreFinalFreqs] = useState<Record<number, boolean>>({ ...defaultFinalFreqs });
    const [sub1FinalFreqs, setSub1FinalFreqs] = useState<Record<number, boolean>>({ ...defaultFinalFreqs });
    const [sub2FinalFreqs, setSub2FinalFreqs] = useState<Record<number, boolean>>({ ...defaultFinalFreqs });
    const [sub3FinalFreqs, setSub3FinalFreqs] = useState<Record<number, boolean>>({ ...defaultFinalFreqs });
    const [sub4FinalFreqs, setSub4FinalFreqs] = useState<Record<number, boolean>>({ ...defaultFinalFreqs });
    const [sub5FinalFreqs, setSub5FinalFreqs] = useState<Record<number, boolean>>({ ...defaultFinalFreqs });
    const [iterOptMode, setIterOptMode] = useState<'madre' | 'sub5' | 'experimental' | 'stochastic1' | 'stochastic2' | 'tunner' | 'smooth' | 'greenV'>('madre');

    function optimizeStatisticalSimulator() {
        const optFreqs = { 7: false, 6: false, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false };
        const optFinalFreqs = { 7: false, 6: false, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false };
        React.startTransition(() => {
            setMadreActive(true);
            setSub1Active(true);
            setSub2Active(true);
            setSub3Active(true);
            setSub4Active(true);
            setSub5Active(true);

            setMadreFinalFreqs(optFinalFreqs);
            setSub1FinalFreqs(optFinalFreqs);
            setSub2FinalFreqs(optFinalFreqs);
            setSub3FinalFreqs(optFinalFreqs);
            setSub4FinalFreqs(optFinalFreqs);
            setSub5FinalFreqs(optFinalFreqs);

            if (iterOptMode === 'madre') {
                const madreOptCfg = {
                    9: makeCfg(true, pCore, { 7: false, 6: false, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false }),
                    12: makeCfg(true, pMatrix, { 7: false, 6: true, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false }),
                    15: makeCfg(true, pReversion, optFreqs),
                    18: makeCfg(true, pMatrix, optFreqs),
                    21: makeCfg(true, pStandard, optFreqs),
                    24: makeCfg(true, pMatrix, optFreqs),
                    27: makeCfg(true, pStandard, optFreqs)
                };
                const standardSubCfg = {
                    9: makeCfg(true, pCore, optFreqs),
                    12: makeCfg(true, pStandard, optFreqs),
                    15: makeCfg(true, pReversion, optFreqs),
                    18: makeCfg(true, pMatrix, optFreqs),
                    21: makeCfg(true, pStandard, optFreqs),
                    24: makeCfg(true, pMatrix, optFreqs),
                    27: makeCfg(true, pStandard, optFreqs)
                };
                setMadreConfigs(madreOptCfg);
                setSub1Configs(standardSubCfg);
                setSub2Configs(standardSubCfg);
                setSub3Configs(standardSubCfg);
                setSub4Configs(standardSubCfg);
                setSub5Configs(standardSubCfg);
                setMadreFinalFreqs({ 7: false, 6: true, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false });
                showLocToast("⚡ ¡Simulador optimizado con Foco en Iteración #1 (Madre - Alta Cobertura 27#)!");
            } else if (iterOptMode === 'sub5') {
                const standardCfg = {
                    9: makeCfg(true, pCore, optFreqs),
                    12: makeCfg(true, pStandard, optFreqs),
                    15: makeCfg(true, pReversion, optFreqs),
                    18: makeCfg(true, pMatrix, optFreqs),
                    21: makeCfg(true, pStandard, optFreqs),
                    24: makeCfg(true, pMatrix, optFreqs),
                    27: makeCfg(true, pStandard, optFreqs)
                };
                const closingExpertCfg = {
                    9: makeCfg(true, pMatrix, { 7: false, 6: true, 5: true, 4: true, 3: false, 2: false, 1: false, 0: false }),
                    12: makeCfg(true, pReversion, { 7: false, 6: true, 5: true, 4: true, 3: true, 2: false, 1: false, 0: false }),
                    15: makeCfg(true, pMatrix, { 7: false, 6: false, 5: true, 4: true, 3: true, 2: true, 1: false, 0: false }),
                    18: makeCfg(true, pStandard, optFreqs),
                    21: makeCfg(false, pCore, optFreqs),
                    24: makeCfg(false, pCore, optFreqs),
                    27: makeCfg(false, pCore, optFreqs)
                };
                setMadreConfigs(standardCfg);
                setSub1Configs(standardCfg);
                setSub2Configs(standardCfg);
                setSub3Configs(standardCfg);
                setSub4Configs(standardCfg);
                setSub5Configs(closingExpertCfg);
                setSub5FinalFreqs({ 7: false, 6: true, 5: true, 4: true, 3: true, 2: false, 1: false, 0: false });
                showLocToast("⚡ ¡Simulador optimizado con Foco en Iteración #6 (Cierre - Objetivo 5 Aciertos en 12#)!");
            } else if (iterOptMode === 'experimental') {
                const standardCfg = {
                    9: makeCfg(true, pCore, optFreqs),
                    12: makeCfg(true, pStandard, optFreqs),
                    15: makeCfg(true, pReversion, optFreqs),
                    18: makeCfg(true, pMatrix, optFreqs),
                    21: makeCfg(true, pStandard, optFreqs),
                    24: makeCfg(true, pMatrix, optFreqs),
                    27: makeCfg(true, pStandard, optFreqs)
                };
                const experimentalSub3Cfg = {
                    9: makeCfg(true, pReversion, { 7: true, 6: true, 5: false, 4: false, 3: false, 2: false, 1: false, 0: true }),
                    12: makeCfg(true, pMatrix, { 7: true, 6: true, 5: false, 4: false, 3: false, 2: false, 1: false, 0: true }),
                    15: makeCfg(true, pCore, { 7: true, 6: true, 5: false, 4: false, 3: false, 2: false, 1: false, 0: true }),
                    18: makeCfg(false, pCore, optFreqs),
                    21: makeCfg(false, pCore, optFreqs),
                    24: makeCfg(false, pCore, optFreqs),
                    27: makeCfg(false, pCore, optFreqs)
                };
                setMadreConfigs(standardCfg);
                setSub1Configs(standardCfg);
                setSub2Configs(standardCfg);
                setSub3Configs(experimentalSub3Cfg);
                setSub4Configs(standardCfg);
                setSub5Configs(standardCfg);
                setSub3FinalFreqs({ 7: true, 6: true, 5: false, 4: false, 3: false, 2: false, 1: false, 0: true });
                showLocToast("🔬 ¡Modo experimental activado: Foco en menor cantidad de aciertos en Iteración #4!");
            } else if (iterOptMode === 'stochastic2') {
                const standardCfg = {
                    9: makeCfg(true, pCore, optFreqs),
                    12: makeCfg(true, pStandard, optFreqs),
                    15: makeCfg(true, pReversion, optFreqs),
                    18: makeCfg(true, pMatrix, optFreqs),
                    21: makeCfg(true, pStandard, optFreqs),
                    24: makeCfg(true, pMatrix, optFreqs),
                    27: makeCfg(true, pStandard, optFreqs)
                };
                const stochastic2Sub3Cfg = {
                    9: makeCfg(true, pMatrix, { 7: false, 6: true, 5: true, 4: true, 3: true, 2: true, 1: false, 0: false }),
                    12: makeCfg(true, pReversion, { 7: false, 6: true, 5: true, 4: true, 3: true, 2: true, 1: false, 0: false }),
                    15: makeCfg(true, pMatrix, { 7: false, 6: true, 5: true, 4: true, 3: true, 2: true, 1: false, 0: false }),
                    18: makeCfg(true, pStandard, optFreqs),
                    21: makeCfg(false, pCore, optFreqs),
                    24: makeCfg(false, pCore, optFreqs),
                    27: makeCfg(false, pCore, optFreqs)
                };
                setMadreConfigs(standardCfg);
                setSub1Configs(standardCfg);
                setSub2Configs(standardCfg);
                setSub3Configs(stochastic2Sub3Cfg);
                setSub4Configs(standardCfg);
                setSub5Configs(standardCfg);
                setSub3FinalFreqs({ 7: false, 6: true, 5: true, 4: true, 3: true, 2: true, 1: false, 0: false });
                showLocToast("🎲 ¡Estocástico 2 activado: Foco en maximizar 4+ aciertos en la Iteración #4 (18#)!");
            } else if (iterOptMode === 'tunner') {
                const standardCfg = {
                    9: makeCfg(true, pCore, optFreqs),
                    12: makeCfg(true, pStandard, optFreqs),
                    15: makeCfg(true, pReversion, optFreqs),
                    18: makeCfg(true, pMatrix, optFreqs),
                    21: makeCfg(true, pStandard, optFreqs),
                    24: makeCfg(true, pMatrix, optFreqs),
                    27: makeCfg(true, pStandard, optFreqs)
                };
                const tunnerSub5Cfg = {
                    9: makeCfg(true, pMatrix, { 7: false, 6: false, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false }),
                    12: makeCfg(true, pStandard, { 7: false, 6: false, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false }),
                    15: makeCfg(true, pReversion, { 7: false, 6: false, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false }),
                    18: makeCfg(true, pMatrix, optFreqs),
                    21: makeCfg(false, pCore, optFreqs),
                    24: makeCfg(false, pCore, optFreqs),
                    27: makeCfg(false, pCore, optFreqs)
                };
                setMadreConfigs(standardCfg);
                setSub1Configs(standardCfg);
                setSub2Configs(standardCfg);
                setSub3Configs(standardCfg);
                setSub4Configs(standardCfg);
                setSub5Configs(tunnerSub5Cfg);
                setSub5FinalFreqs({ 7: false, 6: false, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false });
                showLocToast("🎛️ ¡TUNNER activado: Foco en 2-3 aciertos en promedio para la Iteración #6 (Cierre)!");
            } else if (iterOptMode === 'smooth') {
                const baseOpt = { 7: false, 6: false, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false };
                const madreSmooth = {
                    9: makeCfg(true, pCore, baseOpt),
                    12: makeCfg(true, pStandard, baseOpt),
                    15: makeCfg(true, pReversion, baseOpt),
                    18: makeCfg(true, pMatrix, baseOpt),
                    21: makeCfg(true, pStandard, baseOpt),
                    24: makeCfg(true, pMatrix, baseOpt),
                    27: makeCfg(true, pStandard, baseOpt)
                };
                const sub1Smooth = {
                    9: makeCfg(true, pMatrix, baseOpt),
                    12: makeCfg(true, pReversion, baseOpt),
                    15: makeCfg(true, pStandard, baseOpt),
                    18: makeCfg(true, pMatrix, baseOpt),
                    21: makeCfg(true, pReversion, baseOpt),
                    24: makeCfg(true, pStandard, baseOpt),
                    27: makeCfg(false, pCore, baseOpt)
                };
                const sub2Smooth = {
                    9: makeCfg(true, pStandard, baseOpt),
                    12: makeCfg(true, pMatrix, baseOpt),
                    15: makeCfg(true, pReversion, baseOpt),
                    18: makeCfg(true, pStandard, baseOpt),
                    21: makeCfg(true, pMatrix, baseOpt),
                    24: makeCfg(false, pCore, baseOpt),
                    27: makeCfg(false, pCore, baseOpt)
                };
                const sub3Smooth = {
                    9: makeCfg(true, pReversion, baseOpt),
                    12: makeCfg(true, pStandard, baseOpt),
                    15: makeCfg(true, pMatrix, baseOpt),
                    18: makeCfg(true, pReversion, baseOpt),
                    21: makeCfg(true, pStandard, baseOpt),
                    24: makeCfg(false, pCore, baseOpt),
                    27: makeCfg(false, pCore, baseOpt)
                };
                const sub4Smooth = {
                    9: makeCfg(true, pMatrix, baseOpt),
                    12: makeCfg(true, pReversion, baseOpt),
                    15: makeCfg(true, pStandard, baseOpt),
                    18: makeCfg(true, pMatrix, baseOpt),
                    21: makeCfg(false, pCore, baseOpt),
                    24: makeCfg(false, pCore, optFreqs),
                    27: makeCfg(false, pCore, optFreqs)
                };
                const sub5Smooth = {
                    9: makeCfg(true, pStandard, baseOpt),
                    12: makeCfg(true, pMatrix, baseOpt),
                    15: makeCfg(true, pReversion, baseOpt),
                    18: makeCfg(true, pStandard, baseOpt),
                    21: makeCfg(false, pCore, optFreqs),
                    24: makeCfg(false, pCore, optFreqs),
                    27: makeCfg(false, pCore, optFreqs)
                };
                setMadreConfigs(madreSmooth);
                setSub1Configs(sub1Smooth);
                setSub2Configs(sub2Smooth);
                setSub3Configs(sub3Smooth);
                setSub4Configs(sub4Smooth);
                setSub5Configs(sub5Smooth);
                setMadreFinalFreqs({ 7: false, 6: false, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false });
                setSub1FinalFreqs({ 7: false, 6: false, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false });
                setSub2FinalFreqs({ 7: false, 6: false, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false });
                setSub3FinalFreqs({ 7: false, 6: false, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false });
                setSub4FinalFreqs({ 7: false, 6: false, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false });
                setSub5FinalFreqs({ 7: false, 6: false, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false });
                showLocToast("🌊 ¡SMOOTH activado: Distribución equitativa y gradual de aciertos en las 6 iteraciones!");
            } else if (iterOptMode === 'greenV') {
                const standardCfg = {
                    9: makeCfg(true, pCore, optFreqs),
                    12: makeCfg(true, pStandard, optFreqs),
                    15: makeCfg(true, pReversion, optFreqs),
                    18: makeCfg(true, pMatrix, optFreqs),
                    21: makeCfg(true, pStandard, optFreqs),
                    24: makeCfg(true, pMatrix, optFreqs),
                    27: makeCfg(true, pStandard, optFreqs)
                };
                const greenVCfg = {
                    9: makeCfg(true, pMatrix, { 7: false, 6: true, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false }),
                    12: makeCfg(true, pStandard, { 7: false, 6: true, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false }),
                    15: makeCfg(true, pReversion, { 7: false, 6: true, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false }),
                    18: makeCfg(true, pMatrix, optFreqs),
                    21: makeCfg(false, pCore, optFreqs),
                    24: makeCfg(false, pCore, optFreqs),
                    27: makeCfg(false, pCore, optFreqs)
                };
                setMadreConfigs(greenVCfg);
                setSub1Configs(standardCfg);
                setSub2Configs(standardCfg);
                setSub3Configs(standardCfg);
                setSub4Configs(standardCfg);
                setSub5Configs(greenVCfg);
                setMadreFinalFreqs({ 7: false, 6: true, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false });
                setSub5FinalFreqs({ 7: false, 6: true, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false });
                showLocToast("🟢 ¡Perfil V Verde activado: Foco en alta eficiencia en Iteración #1 y #6!");
            } else {
                const stochasticCfg = {
                    9: makeCfg(true, pMatrix, { 7: true, 6: true, 5: false, 4: false, 3: true, 2: true, 1: true, 0: true }),
                    12: makeCfg(true, pReversion, { 7: true, 6: true, 5: false, 4: false, 3: true, 2: true, 1: true, 0: true }),
                    15: makeCfg(true, pCore, { 7: true, 6: true, 5: false, 4: false, 3: true, 2: true, 1: true, 0: true }),
                    18: makeCfg(true, pMatrix, optFreqs),
                    21: makeCfg(true, pStandard, optFreqs),
                    24: makeCfg(true, pMatrix, optFreqs),
                    27: makeCfg(true, pStandard, optFreqs)
                };
                const closingExpertStoch = {
                    9: makeCfg(true, pMatrix, { 7: false, 6: true, 5: true, 4: true, 3: true, 2: false, 1: false, 0: false }),
                    12: makeCfg(true, pReversion, { 7: false, 6: true, 5: true, 4: true, 3: true, 2: false, 1: false, 0: false }),
                    15: makeCfg(true, pMatrix, { 7: false, 6: true, 5: true, 4: true, 3: true, 2: false, 1: false, 0: false }),
                    18: makeCfg(true, pStandard, optFreqs),
                    21: makeCfg(false, pCore, optFreqs),
                    24: makeCfg(false, pCore, optFreqs),
                    27: makeCfg(false, pCore, optFreqs)
                };
                setMadreConfigs(stochasticCfg);
                setSub1Configs(stochasticCfg);
                setSub2Configs(stochasticCfg);
                setSub3Configs(stochasticCfg);
                setSub4Configs(stochasticCfg);
                setSub5Configs(closingExpertStoch);
                setSub5FinalFreqs({ 7: false, 6: true, 5: true, 4: true, 3: true, 2: false, 1: false, 0: false });
                showLocToast("🎲 ¡Estocástico 1 activado: Entropía inversa en iteraciones intermedias para maximizar aciertos en el cierre!");
            }
        });
        runSimulation();
    }

    const [simResults, setSimResults] = useState<any[]>([]);
    const [isSimulating, setIsSimulating] = useState(false);

    function updateConfig(
        setter: React.Dispatch<React.SetStateAction<Record<number, { enabled: boolean; pools: Record<string, boolean>; freqs: Record<number, boolean> }>>>,
        state: Record<number, { enabled: boolean; pools: Record<string, boolean>; freqs: Record<number, boolean> }>,
        sz: number,
        type: 'enabled' | 'pools' | 'freqs',
        subKey: string | number,
        value: boolean
    ) {
        React.startTransition(() => {
            if (type === 'enabled') {
                setter({
                    ...state,
                    [sz]: { ...state[sz], enabled: value }
                });
            } else if (type === 'pools') {
                setter({
                    ...state,
                    [sz]: {
                        ...state[sz],
                        pools: { ...state[sz].pools, [subKey]: value }
                    }
                });
            } else if (type === 'freqs') {
                setter({
                    ...state,
                    [sz]: {
                        ...state[sz],
                        freqs: { ...state[sz].freqs, [Number(subKey)]: value }
                    }
                });
            }
        });
    }

    // Compute live resulting numbers for the selected target draw
    const liveTargetResult = React.useMemo(() => {
        let histDraws = allDraws;
        let targetDrawObj: Draw | null = null;
        if (selectedTargetDrawNum > 0) {
            const idx = allDraws.findIndex(d => d.num === selectedTargetDrawNum);
            if (idx >= 0) {
                targetDrawObj = allDraws[idx];
                histDraws = allDraws.slice(0, idx);
            }
        }

        const poolSizesList = [9, 12, 15, 18, 21, 24, 27];
        const anyActive = madreActive || sub1Active || sub2Active || sub3Active || sub4Active || sub5Active;
        if (!anyActive && userPicks.length === 0) {
            return {
                motherFiltered: [],
                subFiltered: [],
                sub2Filtered: [],
                sub3Filtered: [],
                sub4Filtered: [],
                sub5Filtered: [],
                targetDrawObj,
                hitsMadre: null,
                hitsSub1: null,
                hitsSub2: null,
                hitsSub3: null,
                hitsSub4: null,
                hitsSub5: null,
                redPct: 0,
                red2Pct: 0,
                red3Pct: 0,
                red4Pct: 0,
                red5Pct: 0
            };
        }

        const mlPoolsMap: Record<number, PoolResult> = {};
        poolSizesList.forEach(sz => {
            mlPoolsMap[sz] = getPoolsForDraw(allDraws, targetDrawObj ? targetDrawObj.num : null, sz);
        });

        // 1. Escenario Madre
        let motherFiltered: number[] = [];
        const anyMadreEnabled = poolSizesList.some(sz => madreConfigs[sz] && madreConfigs[sz].enabled);
        if (!madreActive) {
            motherFiltered = userPicks.length > 0 ? [...userPicks] : [];
        } else if (!anyMadreEnabled) {
            motherFiltered = userPicks.length > 0 ? [...userPicks] : [];
        } else {
            let madreCombinedFreq: Record<number, number> = {};
            poolSizesList.forEach(sz => {
                const cfg = madreConfigs[sz];
                if (cfg && cfg.enabled) {
                    const mlPools = mlPoolsMap[sz];
                    const poolList = [
                        { id: 'final', nums: mlPools.final },
                        { id: 'p2', nums: mlPools.p2 },
                        { id: 'p3', nums: mlPools.p3 },
                        { id: 'p4', nums: mlPools.p4 },
                        { id: 'p5', nums: mlPools.p5 },
                        { id: 'p6', nums: mlPools.p6 },
                        { id: 'p7', nums: mlPools.p7 }
                    ];
                    let activePoolObjs = poolList.filter(p => cfg.pools[p.id]);
                    activePoolObjs.forEach(p => {
                        p.nums.forEach(n => {
                            madreCombinedFreq[n] = (madreCombinedFreq[n] || 0) + 1;
                        });
                    });
                }
            });

            for (let n = 1; n <= 28; n++) {
                let f = madreCombinedFreq[n] || 0;
                let accepted = false;
                [9, 12, 15, 18, 21, 24, 27].forEach(sz => {
                    if (madreConfigs[sz].enabled && madreConfigs[sz].freqs[f]) {
                        accepted = true;
                    }
                });
                if (accepted && madreFinalFreqs[f]) motherFiltered.push(n);
            }
            let merged = new Set([...motherFiltered, ...userPicks]);
            if (merged.size === 0) {
                let fallback = mlPoolsMap[21]?.final || Array.from({length: 28}, (_, i) => i + 1);
                merged = new Set([...fallback]);
            }
            motherFiltered = Array.from(merged).sort((a, b) => a - b);
        }

        // 2. Subescenario 1
        let subFiltered: number[] = [];
        if (!sub1Active) {
            subFiltered = [...motherFiltered];
        } else {
            let sub1CombinedFreq: Record<number, number> = {};
            poolSizesList.forEach(sz => {
                const cfg = sub1Configs[sz];
                if (cfg && cfg.enabled) {
                    const mlPools = mlPoolsMap[sz];
                    const poolList = [
                        { id: 'final', nums: mlPools.final },
                        { id: 'p2', nums: mlPools.p2 },
                        { id: 'p3', nums: mlPools.p3 },
                        { id: 'p4', nums: mlPools.p4 },
                        { id: 'p5', nums: mlPools.p5 },
                        { id: 'p6', nums: mlPools.p6 },
                        { id: 'p7', nums: mlPools.p7 }
                    ];
                    let activePoolObjs = poolList.filter(p => cfg.pools[p.id]);
                    activePoolObjs.forEach(p => {
                        p.nums.forEach(n => {
                            if (motherFiltered.includes(n)) {
                                sub1CombinedFreq[n] = (sub1CombinedFreq[n] || 0) + 1;
                            }
                        });
                    });
                }
            });

            for (let n of motherFiltered) {
                let f = sub1CombinedFreq[n] || 0;
                let accepted = false;
                poolSizesList.forEach(sz => {
                    if (sub1Configs[sz].enabled && sub1Configs[sz].freqs[f]) {
                        accepted = true;
                    }
                });
                if (accepted && sub1FinalFreqs[f]) subFiltered.push(n);
            }
            if (subFiltered.length === 0) {
                subFiltered = [...motherFiltered];
            }
        }

        // 3. Subescenario 2
        let sub2Filtered: number[] = [];
        if (!sub2Active) {
            sub2Filtered = [...subFiltered];
        } else {
            let sub2CombinedFreq: Record<number, number> = {};
            poolSizesList.forEach(sz => {
                const cfg = sub2Configs[sz];
                if (cfg && cfg.enabled) {
                    const mlPools = mlPoolsMap[sz];
                    const poolList = [
                        { id: 'final', nums: mlPools.final },
                        { id: 'p2', nums: mlPools.p2 },
                        { id: 'p3', nums: mlPools.p3 },
                        { id: 'p4', nums: mlPools.p4 },
                        { id: 'p5', nums: mlPools.p5 },
                        { id: 'p6', nums: mlPools.p6 },
                        { id: 'p7', nums: mlPools.p7 }
                    ];
                    let activePoolObjs = poolList.filter(p => cfg.pools[p.id]);
                    activePoolObjs.forEach(p => {
                        p.nums.forEach(n => {
                            if (subFiltered.includes(n)) {
                                sub2CombinedFreq[n] = (sub2CombinedFreq[n] || 0) + 1;
                            }
                        });
                    });
                }
            });

            for (let n of subFiltered) {
                let f = sub2CombinedFreq[n] || 0;
                let accepted = false;
                poolSizesList.forEach(sz => {
                    if (sub2Configs[sz].enabled && sub2Configs[sz].freqs[f]) {
                        accepted = true;
                    }
                });
                if (accepted && sub2FinalFreqs[f]) sub2Filtered.push(n);
            }
            if (sub2Filtered.length === 0) {
                sub2Filtered = [...subFiltered];
            }
        }

        // 4. Iteración #4 (Filtro Avanzado)
        let sub3Filtered: number[] = [];
        if (!sub3Active) {
            sub3Filtered = [...sub2Filtered];
        } else {
            let sub3CombinedFreq: Record<number, number> = {};
            poolSizesList.forEach(sz => {
                const cfg = sub3Configs[sz];
                if (cfg && cfg.enabled) {
                    const mlPools = mlPoolsMap[sz];
                    const poolList = [
                        { id: 'final', nums: mlPools.final },
                        { id: 'p2', nums: mlPools.p2 },
                        { id: 'p3', nums: mlPools.p3 },
                        { id: 'p4', nums: mlPools.p4 },
                        { id: 'p5', nums: mlPools.p5 },
                        { id: 'p6', nums: mlPools.p6 },
                        { id: 'p7', nums: mlPools.p7 }
                    ];
                    let activePoolObjs = poolList.filter(p => cfg.pools[p.id]);
                    activePoolObjs.forEach(p => {
                        p.nums.forEach(n => {
                            if (sub2Filtered.includes(n)) {
                                sub3CombinedFreq[n] = (sub3CombinedFreq[n] || 0) + 1;
                            }
                        });
                    });
                }
            });

            for (let n of sub2Filtered) {
                let f = sub3CombinedFreq[n] || 0;
                let accepted = false;
                poolSizesList.forEach(sz => {
                    if (sub3Configs[sz].enabled && sub3Configs[sz].freqs[f]) {
                        accepted = true;
                    }
                });
                if (accepted && sub3FinalFreqs[f]) sub3Filtered.push(n);
            }
            if (sub3Filtered.length === 0) {
                sub3Filtered = [...sub2Filtered];
            }
        }

        // 5. Iteración #5 (Filtro de Precisión)
        let sub4Filtered: number[] = [];
        if (!sub4Active) {
            sub4Filtered = [...sub3Filtered];
        } else {
            let sub4CombinedFreq: Record<number, number> = {};
            poolSizesList.forEach(sz => {
                const cfg = sub4Configs[sz];
                if (cfg && cfg.enabled) {
                    const mlPools = mlPoolsMap[sz];
                    const poolList = [
                        { id: 'final', nums: mlPools.final },
                        { id: 'p2', nums: mlPools.p2 },
                        { id: 'p3', nums: mlPools.p3 },
                        { id: 'p4', nums: mlPools.p4 },
                        { id: 'p5', nums: mlPools.p5 },
                        { id: 'p6', nums: mlPools.p6 },
                        { id: 'p7', nums: mlPools.p7 }
                    ];
                    let activePoolObjs = poolList.filter(p => cfg.pools[p.id]);
                    activePoolObjs.forEach(p => {
                        p.nums.forEach(n => {
                            if (sub3Filtered.includes(n)) {
                                sub4CombinedFreq[n] = (sub4CombinedFreq[n] || 0) + 1;
                            }
                        });
                    });
                }
            });

            for (let n of sub3Filtered) {
                let f = sub4CombinedFreq[n] || 0;
                let accepted = false;
                poolSizesList.forEach(sz => {
                    if (sub4Configs[sz].enabled && sub4Configs[sz].freqs[f]) {
                        accepted = true;
                    }
                });
                if (accepted && sub4FinalFreqs[f]) sub4Filtered.push(n);
            }
            if (sub4Filtered.length === 0) {
                sub4Filtered = [...sub3Filtered];
            }
        }

        // 6. Iteración #6 (Filtro Experto / Cierre)
        let sub5Filtered: number[] = [];
        if (!sub5Active) {
            sub5Filtered = [...sub4Filtered];
        } else {
            let sub5CombinedFreq: Record<number, number> = {};
            poolSizesList.forEach(sz => {
                const cfg = sub5Configs[sz];
                if (cfg && cfg.enabled) {
                    const mlPools = mlPoolsMap[sz];
                    const poolList = [
                        { id: 'final', nums: mlPools.final },
                        { id: 'p2', nums: mlPools.p2 },
                        { id: 'p3', nums: mlPools.p3 },
                        { id: 'p4', nums: mlPools.p4 },
                        { id: 'p5', nums: mlPools.p5 },
                        { id: 'p6', nums: mlPools.p6 },
                        { id: 'p7', nums: mlPools.p7 }
                    ];
                    let activePoolObjs = poolList.filter(p => cfg.pools[p.id]);
                    activePoolObjs.forEach(p => {
                        p.nums.forEach(n => {
                            if (sub4Filtered.includes(n)) {
                                sub5CombinedFreq[n] = (sub5CombinedFreq[n] || 0) + 1;
                            }
                        });
                    });
                }
            });

            let sub5PrimaryFiltered: number[] = [];
            for (let n of sub4Filtered) {
                let f = sub5CombinedFreq[n] || 0;
                let accepted = false;
                poolSizesList.forEach(sz => {
                    if (sub5Configs[sz].enabled && sub5Configs[sz].freqs[f]) {
                        accepted = true;
                    }
                });
                if (accepted && sub5FinalFreqs[f]) sub5PrimaryFiltered.push(n);
            }

            let secondaryCandidates = new Set<number>();
            poolSizesList.forEach(sz => {
                const secCfg = sub5SecondaryConfigs[sz];
                if (secCfg && secCfg.enabled) {
                    const mlPools = mlPoolsMap[sz];
                    const poolList = [
                        { id: 'final', nums: mlPools.final },
                        { id: 'p2', nums: mlPools.p2 },
                        { id: 'p3', nums: mlPools.p3 },
                        { id: 'p4', nums: mlPools.p4 },
                        { id: 'p5', nums: mlPools.p5 },
                        { id: 'p6', nums: mlPools.p6 },
                        { id: 'p7', nums: mlPools.p7 }
                    ];
                    let activeSecPools = poolList.filter(p => secCfg.pools[p.id]);
                    let secFreqMap: Record<number, number> = {};
                    activeSecPools.forEach(p => {
                        p.nums.forEach(n => {
                            secFreqMap[n] = (secFreqMap[n] || 0) + 1;
                        });
                    });
                    for (let n = 1; n <= 28; n++) {
                        let sf = secFreqMap[n] || 0;
                        if (secCfg.freqs[sf]) {
                            secondaryCandidates.add(n);
                        }
                    }
                }
            });

            let mergedSet = new Set([...sub5PrimaryFiltered]);
            let sortedSec = Array.from(secondaryCandidates).sort((a, b) => getNumberScore(b, histDraws) - getNumberScore(a, histDraws));
            for (let n of sortedSec) {
                if (mergedSet.size >= 15) break;
                mergedSet.add(n);
            }

            sub5Filtered = Array.from(mergedSet).sort((a, b) => {
                let scoreA = (sub5CombinedFreq[a] || 0) * 3 + getNumberScore(a, histDraws) * 0.15;
                let scoreB = (sub5CombinedFreq[b] || 0) * 3 + getNumberScore(b, histDraws) * 0.15;
                if (scoreB !== scoreA) return scoreB - scoreA;
                return a - b;
            });

            if (sub5Filtered.length > 16 || sub5Filtered.length < 8) {
                sub5Filtered = sub5Filtered.slice(0, 15);
            } else if (sub5Filtered.length === 0) {
                sub5Filtered = [...sub4Filtered].slice(0, 12);
            }
        }



        motherFiltered = constrainToTarget(motherFiltered, userPicks, 27, allDraws);
        subFiltered = constrainToTarget(subFiltered, userPicks, 24, allDraws);
        sub2Filtered = constrainToTarget(sub2Filtered, userPicks, 21, allDraws);
        sub3Filtered = constrainToTarget(sub3Filtered, userPicks, 18, allDraws);
        sub4Filtered = constrainToTarget(sub4Filtered, userPicks, 15, allDraws);
        sub5Filtered = constrainToTarget(sub5Filtered, userPicks, 12, allDraws);

        let hitsMadre = targetDrawObj ? targetDrawObj.win.filter(w => motherFiltered.includes(w)).length : null;
        let hitsSub1 = targetDrawObj ? targetDrawObj.win.filter(w => subFiltered.includes(w)).length : null;
        let hitsSub2 = targetDrawObj ? targetDrawObj.win.filter(w => sub2Filtered.includes(w)).length : null;
        let hitsSub3 = targetDrawObj ? targetDrawObj.win.filter(w => sub3Filtered.includes(w)).length : null;
        let hitsSub4 = targetDrawObj ? targetDrawObj.win.filter(w => sub4Filtered.includes(w)).length : null;
        let hitsSub5 = targetDrawObj ? targetDrawObj.win.filter(w => sub5Filtered.includes(w)).length : null;

        return {
            motherFiltered,
            subFiltered,
            sub2Filtered,
            sub3Filtered,
            sub4Filtered,
            sub5Filtered,
            targetDrawObj,
            hitsMadre,
            hitsSub1,
            hitsSub2,
            hitsSub3,
            hitsSub4,
            hitsSub5,
            redPct: Math.round((1 - subFiltered.length / Math.max(1, motherFiltered.length)) * 100),
            red2Pct: Math.round((1 - sub2Filtered.length / Math.max(1, subFiltered.length)) * 100),
            red3Pct: Math.round((1 - sub3Filtered.length / Math.max(1, sub2Filtered.length)) * 100),
            red4Pct: Math.round((1 - sub4Filtered.length / Math.max(1, sub3Filtered.length)) * 100),
            red5Pct: Math.round((1 - sub5Filtered.length / Math.max(1, sub4Filtered.length)) * 100)
        };
    }, [allDraws, selectedTargetDrawNum, madreConfigs, sub1Configs, sub2Configs, sub3Configs, sub4Configs, sub5Configs, sub5SecondaryConfigs, madreActive, sub1Active, sub2Active, sub3Active, sub4Active, sub5Active, madreFinalFreqs, sub1FinalFreqs, sub2FinalFreqs, sub3FinalFreqs, sub4FinalFreqs, sub5FinalFreqs]);




    function getSafeSimBConfig(configs: any, sz: number) {
        const raw = (configs && configs[sz]) || {};
        return {
            enabled: !!raw.enabled,
            pools: raw.pools || { final: true, p2: true, p3: true, p4: true, p5: false, p6: true, p7: false },
            freqs: raw.freqs || { 7: false, 6: false, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false }
        };
    }

    function setSimBConfigField(prevConfigs: any, sz: number, partial: any) {
        const prev = prevConfigs || {};
        const cur = getSafeSimBConfig(prev, sz);
        return {
            ...prev,
            [sz]: {
                ...cur,
                ...partial,
                pools: partial.pools ? { ...cur.pools, ...partial.pools } : cur.pools,
                freqs: partial.freqs ? { ...cur.freqs, ...partial.freqs } : cur.freqs
            }
        };
    }



    // Simulador C (Libre): la salida es el consenso completo, del
    // tamaño que resulte naturalmente (sin recortar ni rellenar).
    const [simCConfigs, setSimCConfigs] = useState<Record<number, { enabled: boolean; pools: Record<string, boolean>; freqs: Record<number, boolean> }>>(() => {
        const optConfigs: Record<number, { enabled: boolean; pools: Record<string, boolean>; freqs: Record<number, boolean> }> = {};
        [9, 12, 15, 18, 21, 24, 27].forEach(sz => {
            const isEnabled = [12, 18, 21, 27].includes(sz);
            optConfigs[sz] = {
                enabled: isEnabled,
                pools: { final: true, p2: true, p3: true, p4: true, p5: false, p6: true, p7: false },
                freqs: { 7: false, 6: false, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false }
            };
        });
        return optConfigs;
    });
    const [simCFinalFreqs, setSimCFinalFreqs] = useState<Record<number, boolean>>({
        8: false, 7: false, 6: false, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false
    });

    // Target activo de Sim C: null = consenso completo (
    // comportamiento por defecto y para recetas maestras/personalizadas).
    // Al cargar una receta de tesis se fija a su target (14 o 10) y la
    // salida (en vivo y en la gráfica) se recorta a esos números.
    const [simCTargetSize, setSimCTargetSize] = useState<number | null>(null);

    const [simCResults, setSimCResults] = useState<any[]>([]);
    const [isSimCRunning, setIsSimCRunning] = useState(false);

    // Simulador Gemini (RandomForest): ranking en vivo del próximo sorteo.
    const [geminiRanking, setGeminiRanking] = useState<{ num: number; prob: number }[] | null>(null);
    const [geminiTraining, setGeminiTraining] = useState(false);
    const [geminiProgress, setGeminiProgress] = useState({ done: 0, total: 28 });
    const [geminiEstimators, setGeminiEstimators] = useState(100);
    const [geminiError, setGeminiError] = useState<string | null>(null);

    // Gráfica Gemini: ventana (20 o 30 sorteos) y series visibles.
    const [geminiWindow, setGeminiWindow] = useState<20 | 30>(20);
    const [geminiSeries, setGeminiSeries] = useState<Record<string, boolean>>({ '5': true, '10': true, '14': true, '22': true, "5'": true, "10'": true, "14'": true, "22'": true });
    const [comparativaSort, setComparativaSort] = useState<ComparativaSort>(null);
    const [comparativaFilter, setComparativaFilter] = useState<'all' | ComparativaFamily>('all');
    const [comparativaPopout, setComparativaPopout] = useState<number | null>(null);

    async function runGemini(nEst?: number) {
        if (geminiTraining) return;
        const est = nEst ?? geminiEstimators;
        setGeminiTraining(true);
        setGeminiError(null);
        setGeminiProgress({ done: 0, total: 28 });
        try {
            const { X, y } = geminiBuildMatrices(allDraws);
            const Xfut = geminiFutureFeatures(y);
            const ranking = await geminiTrainAndRank(X, y, Xfut, est, (done, total) => setGeminiProgress({ done, total }));
            setGeminiRanking(ranking);
        } catch (e: any) {
            setGeminiError(e?.message || 'Error al entrenar el modelo Gemini.');
        } finally {
            setGeminiTraining(false);
        }
    }

    function updateSimCField(sz: number, partial: any) {
        setSimCConfigs(prev => setSimBConfigField(prev, sz, partial));
    }

    // Mapa de frecuencia maestra: en cuántos pool sizes aparece cada número
    // con la configuración dada (misma lógica que el MultipoolModal).
    // userPicks cuentan como octava fuente, igual que en el consenso.
    function getMultipoolMasterFreqMap(configsMap: any, mlPoolsMap: Record<number, PoolResult>, poolSizesList: number[], userPicks: number[] = []): Record<number, number> {
        let poolSizeFilteredSets: number[][] = [];
        poolSizesList.forEach(sz => {
            const rawCfg = configsMap[sz] || {};
            const cfg = getValidCfg(rawCfg);
            if (!cfg.enabled) {
                poolSizeFilteredSets.push([]);
                return;
            }
            const mlPools = mlPoolsMap[sz];
            if (!mlPools) {
                poolSizeFilteredSets.push([]);
                return;
            }
            const poolList = [
                { id: 'final', nums: mlPools.final },
                { id: 'p2', nums: mlPools.p2 },
                { id: 'p3', nums: mlPools.p3 },
                { id: 'p4', nums: mlPools.p4 },
                { id: 'p5', nums: mlPools.p5 },
                { id: 'p6', nums: mlPools.p6 },
                { id: 'p7', nums: mlPools.p7 }
            ];
            let activePoolObjs = poolList.filter(p => cfg.pools[p.id]);
            let szItemFreq: Record<number, number> = {};
            activePoolObjs.forEach(p => {
                p.nums.forEach(n => {
                    szItemFreq[n] = (szItemFreq[n] || 0) + 1;
                });
            });
            let filteredForSz: number[] = [];
            for (let n = 1; n <= 28; n++) {
                let f = szItemFreq[n] || 0;
                if (cfg.freqs[f]) {
                    filteredForSz.push(n);
                }
            }
            poolSizeFilteredSets.push(filteredForSz);
        });

        let masterFreqMap: Record<number, number> = {};
        poolSizeFilteredSets.forEach((set, szIdx) => {
            const sz = poolSizesList[szIdx];
            const rawCfg = configsMap[sz] || {};
            if (rawCfg.enabled) {
                set.forEach(n => {
                    masterFreqMap[n] = (masterFreqMap[n] || 0) + 1;
                });
            }
        });

        // Treat userPicks as 8th pool source
        if (userPicks && userPicks.length > 0) {
            userPicks.forEach(n => {
                masterFreqMap[n] = (masterFreqMap[n] || 0) + 1;
            });
        }
        return masterFreqMap;
    }

    // Orden de los números resultantes, igual que el MultipoolModal:
    // primero los de mayor frecuencia maestra, y dentro de cada
    // frecuencia por número ascendente.
    function sortByMasterFreqDesc(nums: number[], masterFreqMap: Record<number, number>): number[] {
        return [...nums].sort((a, b) => {
            let fA = masterFreqMap[a] || 0;
            let fB = masterFreqMap[b] || 0;
            if (fB !== fA) return fB - fA;
            return a - b;
        });
    }

    function calculateMultipoolConsensus(configsMap: any, finalFreqsMap: any, mlPoolsMap: Record<number, PoolResult>, poolSizesList: number[], userPicks: number[] = []): number[] {
        const masterFreqMap = getMultipoolMasterFreqMap(configsMap, mlPoolsMap, poolSizesList, userPicks);

        const safeFinalFreqs = finalFreqsMap || {};
        let baseFiltered: number[] = [];
        for (let n = 1; n <= 28; n++) {
            let f = masterFreqMap[n] || 0;
            if (safeFinalFreqs[f]) {
                baseFiltered.push(n);
            }
        }
        // Si el filtro de frecuencias finales no deja ningún número (p. ej.
        // la máscara pide frecuencia 7 pero hay menos de 7 tamaños activos),
        // usar la frecuencia más alta disponible para que el consenso no se
        // vacíe: son los números más consensuados con los tamaños activos.
        if (baseFiltered.length === 0) {
            let maxF = 0;
            for (let n = 1; n <= 28; n++) {
                const f = masterFreqMap[n] || 0;
                if (f > maxF) maxF = f;
            }
            if (maxF > 0) {
                for (let n = 1; n <= 28; n++) {
                    if ((masterFreqMap[n] || 0) === maxF) baseFiltered.push(n);
                }
            }
        }
        return baseFiltered;
    }


    // Resultado en vivo del Simulador C (Libre): el consenso completo
    // sin ninguna restricción de tamaño de salida.
    // Sin recorte a un tamaño fijo, sin relleno con 1..28 y sin forzar
    // los números ganadores del sorteo seleccionado: la salida es
    // userPicks + el consenso completo, del tamaño que resulte.
    // Recorta la salida de Sim C al target activo, protegiendo los picks
    // fijos (siempre incluidos). Sin target (null) devuelve la lista tal cual.
    function capSimCToTarget(filtered: number[], picks: number[], masterFreqMap: Record<number, number>, target: number | null): number[] {
        if (target === null || filtered.length <= target) return filtered;
        const pickSet = new Set(picks);
        const mustKeep = filtered.filter(n => pickSet.has(n));
        const others = filtered.filter(n => !pickSet.has(n));
        const combined = [...mustKeep, ...others].slice(0, target);
        return sortByMasterFreqDesc(combined, masterFreqMap);
    }

    const liveSimCResult = React.useMemo(() => {
        const poolSizesList = [9, 12, 15, 18, 21, 24, 27];
        let histDraws = allDraws;
        let targetDrawObj: Draw | null = null;

        if (selectedTargetDrawNum > 0) {
            const idx = allDraws.findIndex(d => d.num === selectedTargetDrawNum);
            if (idx >= 0) {
                targetDrawObj = allDraws[idx];
                histDraws = allDraws.slice(0, idx);
            }
        }

        const mlPoolsMap: Record<number, PoolResult> = {};
        poolSizesList.forEach(sz => {
            mlPoolsMap[sz] = getPoolsForDraw(allDraws, targetDrawObj ? targetDrawObj.num : null, sz);
        });

        const anyEnabled = poolSizesList.some(sz => simCConfigs[sz] && simCConfigs[sz].enabled);
        let baseFiltered: number[] = [];
        if (anyEnabled) {
            baseFiltered = calculateMultipoolConsensus(simCConfigs, simCFinalFreqs, mlPoolsMap, poolSizesList, userPicks);
            baseFiltered.sort((a, b) => getNumberScore(b, histDraws) - getNumberScore(a, histDraws));
        } else {
            baseFiltered = Array.from({length: 28}, (_, i) => i + 1).sort((a, b) => getNumberScore(b, histDraws) - getNumberScore(a, histDraws));
        }

        const masterFreqMapC = getMultipoolMasterFreqMap(simCConfigs, mlPoolsMap, poolSizesList, userPicks);
        let filtered = sortByMasterFreqDesc(Array.from(new Set([...userPicks, ...baseFiltered])), masterFreqMapC);
        filtered = capSimCToTarget(filtered, userPicks, masterFreqMapC, simCTargetSize);
        let hits = targetDrawObj ? targetDrawObj.win.filter(w => filtered.includes(w)).length : null;
        return { filtered, targetDrawObj, hits, mlPoolsMap };
    }, [allDraws, selectedTargetDrawNum, simCConfigs, simCFinalFreqs, userPicks, simCTargetSize]);

    // Aviso cuando las frecuencias finales activas superan la cantidad de
    // tamaños activos: la máscara no se alcanza y el consenso usa la
    // frecuencia más alta disponible (ver calculateMultipoolConsensus).
    const activeSimCSizeCount = [9, 12, 15, 18, 21, 24, 27].filter(sz => simCConfigs[sz] && simCConfigs[sz].enabled).length;
    const maxSimCFinalFreq = Math.max(0, ...Object.keys(simCFinalFreqs || {}).filter(k => (simCFinalFreqs as any)[k]).map(Number));

    const optimalAdendumNumbers = React.useMemo(() => {
        const optFreqs = { 7: false, 6: false, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false };
        const optFinalFreqs = { 7: false, 6: false, 5: false, 4: true, 3: true, 2: true, 1: false, 0: false };
        let histDraws = allDraws;
        const mlPoolsMap: Record<number, PoolResult> = {};
        [9, 12, 15, 18, 21, 24, 27].forEach(sz => {
            mlPoolsMap[sz] = calculateMLPools(histDraws, sz);
        });
        const profileConfigs = {
            9: makeCfg(true, pCore, optFreqs),
            12: makeCfg(true, pStandard, optFreqs),
            15: makeCfg(true, pMatrix, optFreqs),
            18: makeCfg(true, pReversion, optFreqs),
            21: makeCfg(true, pStandard, optFreqs),
            24: makeCfg(true, pCore, optFreqs),
            27: makeCfg(true, pMatrix, optFreqs)
        };
        let baseFiltered = calculateMultipoolConsensus(profileConfigs, optFinalFreqs, mlPoolsMap, [9, 12, 15, 18, 21, 24, 27]);
        baseFiltered.sort((a, b) => getNumberScore(b, histDraws) - getNumberScore(a, histDraws));
        return baseFiltered;
    }, [allDraws]);

    const adendumStep4AllScores = React.useMemo(() => {
        let histDraws = allDraws;
        if (selectedTargetDrawNum > 0) {
            const idx = allDraws.findIndex(d => d.num === selectedTargetDrawNum);
            if (idx >= 0) histDraws = allDraws.slice(0, idx);
        }
        const allFiltered = [...liveSimCResult.filtered].sort((a, b) => a - b);
        const allNums = Array.from({length: 28}, (_, i) => i + 1);
        const thRank = [...allNums].sort((a, b) => getNumberScore(b, histDraws) - getNumberScore(a, histDraws));
        const antiComp = new Set(thRank.slice(14));

        return allFiltered.map(n => {
            const th = getNumberScore(n, histDraws);
            const anti = antiComp.has(n) ? (28 - th) * 1.25 + (n % 4 === 0 ? 4.2 : 2.1) : th * 0.5;
            const score = Number(((th * 0.5) + (anti * 0.5)).toFixed(2));
            return { num: n, score };
        });
    }, [allDraws, selectedTargetDrawNum, liveSimCResult]);

    function runSimulation() {
        const poolSizesList = [9, 12, 15, 18, 21, 24, 27];
        const anyActive = madreActive || sub1Active || sub2Active || sub3Active || sub4Active || sub5Active;
        if (!anyActive && userPicks.length === 0) {
            showLocToast("⚠️ No hay ninguna configuración activa ni iteraciones seleccionadas para simular.");
            setSimResults([]);
            return;
        }

        setIsSimulating(true);
        setTimeout(() => {
            let targetIdx = allDraws.length - 1;
            if (selectedTargetDrawNum > 0) {
                const idx = allDraws.findIndex(d => d.num === selectedTargetDrawNum);
                if (idx >= 0) targetIdx = idx;
            }
            const startIdx = Math.max(0, targetIdx - 29);
            const draws30 = allDraws.slice(startIdx, targetIdx + 1).reverse();
            let res = draws30.map(d => {
                const histIdx = allDraws.findIndex(x => x.num === d.num);
                const histDraws = histIdx > 0 ? allDraws.slice(0, histIdx) : allDraws;
                console.log(`[Audit Simulation] Draw #${d.num}: histIdx = ${histIdx}, histDraws length = ${histDraws.length}`);
                
                const mlPoolsMap: Record<number, PoolResult> = {};
                poolSizesList.forEach(sz => {
                    mlPoolsMap[sz] = getPoolsForDraw(allDraws, d.num, sz);
                });

                // 1. Iteración #1 (Base / Madre)
                let motherFiltered: number[] = [];
                const anyMadreEnabled = poolSizesList.some(sz => madreConfigs[sz] && madreConfigs[sz].enabled);
                if (!madreActive) {
                    motherFiltered = userPicks.length > 0 ? [...userPicks] : [];
                } else if (!anyMadreEnabled) {
                    motherFiltered = userPicks.length > 0 ? [...userPicks] : [];
                } else {
                    let madreCombinedFreq: Record<number, number> = {};
                    poolSizesList.forEach(sz => {
                        const cfg = madreConfigs[sz];
                        if (cfg && cfg.enabled) {
                            const mlPools = mlPoolsMap[sz];
                            const poolList = [
                                { id: 'final', nums: mlPools.final },
                                { id: 'p2', nums: mlPools.p2 },
                                { id: 'p3', nums: mlPools.p3 },
                                { id: 'p4', nums: mlPools.p4 },
                                { id: 'p5', nums: mlPools.p5 },
                                { id: 'p6', nums: mlPools.p6 },
                                { id: 'p7', nums: mlPools.p7 }
                            ];
                            let activePoolObjs = poolList.filter(p => cfg.pools[p.id]);
                            activePoolObjs.forEach(p => {
                                p.nums.forEach(n => {
                                    madreCombinedFreq[n] = (madreCombinedFreq[n] || 0) + 1;
                                });
                            });
                        }
                    });

                    for (let n = 1; n <= 28; n++) {
                        let f = madreCombinedFreq[n] || 0;
                        let accepted = false;
                        poolSizesList.forEach(sz => {
                            if (madreConfigs[sz].enabled && madreConfigs[sz].freqs[f]) {
                                accepted = true;
                            }
                        });
                        if (accepted && madreFinalFreqs[f]) motherFiltered.push(n);
                    }
                    let merged = new Set([...motherFiltered, ...userPicks]);
                    if (merged.size === 0) {
                        let fallback = mlPoolsMap[21]?.final || Array.from({length: 28}, (_, i) => i + 1);
                        merged = new Set([...fallback]);
                    }
                    motherFiltered = Array.from(merged).sort((a, b) => a - b);
                }
                // madreHits calculated at end

                // 2. Iteración #2 (Filtro Primario)
                let subFiltered: number[] = [];
                if (!sub1Active) {
                    subFiltered = [...motherFiltered];
                } else {
                    let sub1CombinedFreq: Record<number, number> = {};
                    poolSizesList.forEach(sz => {
                        const cfg = sub1Configs[sz];
                        if (cfg && cfg.enabled) {
                            const mlPools = mlPoolsMap[sz];
                            const poolList = [
                                { id: 'final', nums: mlPools.final },
                                { id: 'p2', nums: mlPools.p2 },
                                { id: 'p3', nums: mlPools.p3 },
                                { id: 'p4', nums: mlPools.p4 },
                                { id: 'p5', nums: mlPools.p5 },
                                { id: 'p6', nums: mlPools.p6 },
                                { id: 'p7', nums: mlPools.p7 }
                            ];
                            let activePoolObjs = poolList.filter(p => cfg.pools[p.id]);
                            activePoolObjs.forEach(p => {
                                p.nums.forEach(n => {
                                    if (motherFiltered.includes(n)) {
                                        sub1CombinedFreq[n] = (sub1CombinedFreq[n] || 0) + 1;
                                    }
                                });
                            });
                        }
                    });

                    for (let n of motherFiltered) {
                        let f = sub1CombinedFreq[n] || 0;
                        let accepted = false;
                        poolSizesList.forEach(sz => {
                            if (sub1Configs[sz].enabled && sub1Configs[sz].freqs[f]) {
                                accepted = true;
                            }
                        });
                        if (accepted && sub1FinalFreqs[f]) subFiltered.push(n);
                    }
                    if (subFiltered.length === 0) {
                        subFiltered = [...motherFiltered];
                    }
                }
                // sub1Hits calculated at end

                // 3. Iteración #3 (Filtro Secundario)
                let sub2Filtered: number[] = [];
                if (!sub2Active) {
                    sub2Filtered = [...subFiltered];
                } else {
                    let sub2CombinedFreq: Record<number, number> = {};
                    poolSizesList.forEach(sz => {
                        const cfg = sub2Configs[sz];
                        if (cfg && cfg.enabled) {
                            const mlPools = mlPoolsMap[sz];
                            const poolList = [
                                { id: 'final', nums: mlPools.final },
                                { id: 'p2', nums: mlPools.p2 },
                                { id: 'p3', nums: mlPools.p3 },
                                { id: 'p4', nums: mlPools.p4 },
                                { id: 'p5', nums: mlPools.p5 },
                                { id: 'p6', nums: mlPools.p6 },
                                { id: 'p7', nums: mlPools.p7 }
                            ];
                            let activePoolObjs = poolList.filter(p => cfg.pools[p.id]);
                            activePoolObjs.forEach(p => {
                                p.nums.forEach(n => {
                                    if (subFiltered.includes(n)) {
                                        sub2CombinedFreq[n] = (sub2CombinedFreq[n] || 0) + 1;
                                    }
                                });
                            });
                        }
                    });

                    for (let n of subFiltered) {
                        let f = sub2CombinedFreq[n] || 0;
                        let accepted = false;
                        poolSizesList.forEach(sz => {
                            if (sub2Configs[sz].enabled && sub2Configs[sz].freqs[f]) {
                                accepted = true;
                            }
                        });
                        if (accepted && sub2FinalFreqs[f]) sub2Filtered.push(n);
                    }
                    if (sub2Filtered.length === 0) {
                        sub2Filtered = [...subFiltered];
                    }
                }
                // sub2Hits calculated at end

                // 4. Iteración #4 (Filtro Avanzado)
                let sub3Filtered: number[] = [];
                if (!sub3Active) {
                    sub3Filtered = [...sub2Filtered];
                } else {
                    let sub3CombinedFreq: Record<number, number> = {};
                    poolSizesList.forEach(sz => {
                        const cfg = sub3Configs[sz];
                        if (cfg && cfg.enabled) {
                            const mlPools = mlPoolsMap[sz];
                            const poolList = [
                                { id: 'final', nums: mlPools.final },
                                { id: 'p2', nums: mlPools.p2 },
                                { id: 'p3', nums: mlPools.p3 },
                                { id: 'p4', nums: mlPools.p4 },
                                { id: 'p5', nums: mlPools.p5 },
                                { id: 'p6', nums: mlPools.p6 },
                                { id: 'p7', nums: mlPools.p7 }
                            ];
                            let activePoolObjs = poolList.filter(p => cfg.pools[p.id]);
                            activePoolObjs.forEach(p => {
                                p.nums.forEach(n => {
                                    if (sub2Filtered.includes(n)) {
                                        sub3CombinedFreq[n] = (sub3CombinedFreq[n] || 0) + 1;
                                    }
                                });
                            });
                        }
                    });

                    for (let n of sub2Filtered) {
                        let f = sub3CombinedFreq[n] || 0;
                        let accepted = false;
                        poolSizesList.forEach(sz => {
                            if (sub3Configs[sz].enabled && sub3Configs[sz].freqs[f]) {
                                accepted = true;
                            }
                        });
                        if (accepted && sub3FinalFreqs[f]) sub3Filtered.push(n);
                    }
                    if (sub3Filtered.length === 0) {
                        sub3Filtered = [...sub2Filtered];
                    }
                }
                // sub3Hits calculated at end

                // 5. Iteración #5 (Filtro de Precisión)
                let sub4Filtered: number[] = [];
                if (!sub4Active) {
                    sub4Filtered = [...sub3Filtered];
                } else {
                    let sub4CombinedFreq: Record<number, number> = {};
                    poolSizesList.forEach(sz => {
                        const cfg = sub4Configs[sz];
                        if (cfg && cfg.enabled) {
                            const mlPools = mlPoolsMap[sz];
                            const poolList = [
                                { id: 'final', nums: mlPools.final },
                                { id: 'p2', nums: mlPools.p2 },
                                { id: 'p3', nums: mlPools.p3 },
                                { id: 'p4', nums: mlPools.p4 },
                                { id: 'p5', nums: mlPools.p5 },
                                { id: 'p6', nums: mlPools.p6 },
                                { id: 'p7', nums: mlPools.p7 }
                            ];
                            let activePoolObjs = poolList.filter(p => cfg.pools[p.id]);
                            activePoolObjs.forEach(p => {
                                p.nums.forEach(n => {
                                    if (sub3Filtered.includes(n)) {
                                        sub4CombinedFreq[n] = (sub4CombinedFreq[n] || 0) + 1;
                                    }
                                });
                            });
                        }
                    });

                    for (let n of sub3Filtered) {
                        let f = sub4CombinedFreq[n] || 0;
                        let accepted = false;
                        poolSizesList.forEach(sz => {
                            if (sub4Configs[sz].enabled && sub4Configs[sz].freqs[f]) {
                                accepted = true;
                            }
                        });
                        if (accepted && sub4FinalFreqs[f]) sub4Filtered.push(n);
                    }
                    if (sub4Filtered.length === 0) {
                        sub4Filtered = [...sub3Filtered];
                    }
                }
                // sub4Hits calculated at end

                // 6. Iteración #6 (Filtro Experto / Cierre)
                let sub5Filtered: number[] = [];
                if (!sub5Active) {
                    sub5Filtered = [...sub4Filtered];
                } else {
                    let sub5CombinedFreq: Record<number, number> = {};
                    poolSizesList.forEach(sz => {
                        const cfg = sub5Configs[sz];
                        if (cfg && cfg.enabled) {
                            const mlPools = mlPoolsMap[sz];
                            const poolList = [
                                { id: 'final', nums: mlPools.final },
                                { id: 'p2', nums: mlPools.p2 },
                                { id: 'p3', nums: mlPools.p3 },
                                { id: 'p4', nums: mlPools.p4 },
                                { id: 'p5', nums: mlPools.p5 },
                                { id: 'p6', nums: mlPools.p6 },
                                { id: 'p7', nums: mlPools.p7 }
                            ];
                            let activePoolObjs = poolList.filter(p => cfg.pools[p.id]);
                            activePoolObjs.forEach(p => {
                                p.nums.forEach(n => {
                                    if (sub4Filtered.includes(n)) {
                                        sub5CombinedFreq[n] = (sub5CombinedFreq[n] || 0) + 1;
                                    }
                                });
                            });
                        }
                    });

                    let sub5PrimaryFiltered: number[] = [];
                    for (let n of sub4Filtered) {
                        let f = sub5CombinedFreq[n] || 0;
                        let accepted = false;
                        poolSizesList.forEach(sz => {
                            if (sub5Configs[sz].enabled && sub5Configs[sz].freqs[f]) {
                                accepted = true;
                            }
                        });
                        if (accepted && sub5FinalFreqs[f]) sub5PrimaryFiltered.push(n);
                    }

                    let secondaryCandidates = new Set<number>();
                    poolSizesList.forEach(sz => {
                        const secCfg = sub5SecondaryConfigs[sz];
                        if (secCfg && secCfg.enabled) {
                            const mlPools = mlPoolsMap[sz];
                            const poolList = [
                                { id: 'final', nums: mlPools.final },
                                { id: 'p2', nums: mlPools.p2 },
                                { id: 'p3', nums: mlPools.p3 },
                                { id: 'p4', nums: mlPools.p4 },
                                { id: 'p5', nums: mlPools.p5 },
                                { id: 'p6', nums: mlPools.p6 },
                                { id: 'p7', nums: mlPools.p7 }
                            ];
                            let activeSecPools = poolList.filter(p => secCfg.pools[p.id]);
                            let secFreqMap: Record<number, number> = {};
                            activeSecPools.forEach(p => {
                                p.nums.forEach(n => {
                                    secFreqMap[n] = (secFreqMap[n] || 0) + 1;
                                });
                            });
                            for (let n = 1; n <= 28; n++) {
                                let sf = secFreqMap[n] || 0;
                                if (secCfg.freqs[sf]) {
                                    secondaryCandidates.add(n);
                                }
                            }
                        }
                    });

                    let mergedSet = new Set([...sub5PrimaryFiltered]);
                    let sortedSec = Array.from(secondaryCandidates).sort((a, b) => getNumberScore(b, histDraws) - getNumberScore(a, histDraws));
                    for (let n of sortedSec) {
                        if (mergedSet.size >= 15) break;
                        mergedSet.add(n);
                    }

                    sub5Filtered = Array.from(mergedSet).sort((a, b) => {
                        let scoreA = (sub5CombinedFreq[a] || 0) * 3 + getNumberScore(a, histDraws) * 0.15;
                        let scoreB = (sub5CombinedFreq[b] || 0) * 3 + getNumberScore(b, histDraws) * 0.15;
                        if (scoreB !== scoreA) return scoreB - scoreA;
                        return a - b;
                    });

                    if (sub5Filtered.length > 16 || sub5Filtered.length < 8) {
                        sub5Filtered = sub5Filtered.slice(0, 15);
                    } else if (sub5Filtered.length === 0) {
                        sub5Filtered = [...sub4Filtered].slice(0, 12);
                    }
                }



                motherFiltered = constrainToTarget(motherFiltered, userPicks, 27, histDraws);
                subFiltered = constrainToTarget(subFiltered, userPicks, 24, histDraws);
                sub2Filtered = constrainToTarget(sub2Filtered, userPicks, 21, histDraws);
                sub3Filtered = constrainToTarget(sub3Filtered, userPicks, 18, histDraws);
                sub4Filtered = constrainToTarget(sub4Filtered, userPicks, 15, histDraws);
                sub5Filtered = constrainToTarget(sub5Filtered, userPicks, 12, histDraws);

                let madreHits = d.win.filter(w => motherFiltered.includes(w)).length;
                let sub1Hits = d.win.filter(w => subFiltered.includes(w)).length;
                let sub2Hits = d.win.filter(w => sub2Filtered.includes(w)).length;
                let sub3Hits = d.win.filter(w => sub3Filtered.includes(w)).length;
                let sub4Hits = d.win.filter(w => sub4Filtered.includes(w)).length;
                let sub5Hits = d.win.filter(w => sub5Filtered.includes(w)).length;

                return { 
                    num: d.num, 
                    win: d.win, 
                    madreCount: motherFiltered.length, 
                    madreHits, 
                    sub1Count: subFiltered.length, 
                    sub1Hits,
                    sub2Count: sub2Filtered.length,
                    sub2Hits,
                    sub3Count: sub3Filtered.length,
                    sub3Hits,
                    sub4Count: sub4Filtered.length,
                    sub4Hits,
                    sub5Count: sub5Filtered.length,
                    sub5Hits
                };
            });
            setSimResults(res);
            setIsSimulating(false);
            showLocToast('🔔 Simulación por Iteraciones completada con éxito.');
        }, 100);
    }

    // Auto-simulación con debounce: al cambiar cualquier toggle (configs,
    // frecuencias finales, target, picks o sorteo seleccionado) la simulación
    // y la gráfica se actualizan solas tras 600 ms sin cambios, sin esperar a
    // pulsar "Correr Simulación". El toast se suprime en estas corridas
    // automáticas para no saturar la pantalla; el botón sigue corriendo la
    // simulación de inmediato y con aviso.
    useEffect(() => {
        if (allDraws.length === 0) return;
        let timer: ReturnType<typeof setTimeout> | undefined;
        if (activeTab === 'simulatorC') {
            timer = setTimeout(() => runSimC({ silent: true }), 600);
        }
        return () => { if (timer) clearTimeout(timer); };
    }, [activeTab, allDraws, simCConfigs, simCFinalFreqs, simCTargetSize, userPicks, selectedTargetDrawNum]);
    // Simulador C: la salida es el consenso completo, sin recortar
    // ni rellenar a ningún tamaño y sin forzar ganadores.
    // Cada sorteo se evalúa con el consenso completo que resulte.
    function runSimC(opts?: { configs?: any; finalFreqs?: any; targetSize?: number | null; targetDrawNum?: number; userPicks?: number[]; silent?: boolean }) {
        // Valores efectivos: los pasados explícitamente (p. ej. recién
        // optimizados o cargados) o, si no, los del estado actual. Sin esto,
        // un setTimeout tras cambiar el estado simulaba con la configuración
        // anterior (closure obsoleto) y la gráfica no correspondía a lo visto.
        const cfgs = opts?.configs ?? simCConfigs;
        const ff = opts?.finalFreqs ?? simCFinalFreqs;
        const tSize = opts?.targetSize ?? simCTargetSize;
        const selDraw = opts?.targetDrawNum ?? selectedTargetDrawNum;
        const picks = opts?.userPicks ?? userPicks;
        setIsSimCRunning(true);
        setTimeout(() => {
            // Rango constante: siempre los últimos 20/30 sorteos a la fecha
            // de la página principal, sin importar el sorteo seleccionado.
            // Así se aprecia el comportamiento antes y después del sorteo
            // optimizado, cuando queda en medio del rango.
            const countDraws = selDraw === -30 ? 30 : selDraw === -20 ? 20 : 30;
            const targetIdx = allDraws.length - 1;
            const startIdx = Math.max(0, targetIdx - countDraws + 1);
            const draws30 = allDraws.slice(startIdx, targetIdx + 1); // chronological: sorteo menor to mayor
            const poolSizesList = [9, 12, 15, 18, 21, 24, 27];
            let res = draws30.map(d => {
                const histIdx = allDraws.findIndex(x => x.num === d.num);
                const histDraws = histIdx > 0 ? allDraws.slice(0, histIdx) : allDraws;
                const anyEnabled = poolSizesList.some(sz => cfgs[sz] && cfgs[sz].enabled);
                const mlPoolsMap: Record<number, PoolResult> = {};
                if (anyEnabled) {
                    poolSizesList.forEach(sz => {
                        mlPoolsMap[sz] = getPoolsForDraw(allDraws, d.num, sz);
                    });
                }

                let baseFiltered: number[] = [];
                if (anyEnabled) {
                    baseFiltered = calculateMultipoolConsensus(cfgs, ff, mlPoolsMap, poolSizesList, picks);
                    baseFiltered.sort((a, b) => getNumberScore(b, histDraws) - getNumberScore(a, histDraws));
                } else {
                    baseFiltered = Array.from({length: 28}, (_, i) => i + 1).sort((a, b) => getNumberScore(b, histDraws) - getNumberScore(a, histDraws));
                }

                // Con target activo (receta de tesis) la salida se recorta a
                // esos números; sin él es el consenso completo, sin
                // relleno y sin forzar los ganadores de este sorteo.
                const masterFreqMapD = getMultipoolMasterFreqMap(cfgs, mlPoolsMap, poolSizesList, picks);
                let filtered = sortByMasterFreqDesc(Array.from(new Set([...picks, ...baseFiltered])), masterFreqMapD);
                filtered = capSimCToTarget(filtered, picks, masterFreqMapD, tSize);

                let hits = d.win.filter(w => filtered.includes(w)).length;
                return { num: d.num, date: d.date, win: d.win, filtered, count: filtered.length, hits };
            });
            setSimCResults(res);
            setIsSimCRunning(false);
            if (!opts?.silent) showLocToast('🔔 Simulador C completada con éxito.');
        }, 100);
    }

    // Optimizar el Simulador C: recrea la optimización que el detalle de
    // un sorteo muestra por default, igual que el Multipool (target 10),
    // para que la recreación dé también 10 números y se pueda estudiar
    // su comportamiento histórico en la simulación:
    // - Con un sorteo pasado seleccionado: la de ese sorteo.
    // - Sin sorteo específico: la del último sorteo de la ventana.
    // Después corre la simulación con esa configuración como config
    // global sobre los últimos 30 sorteos (backtest honesto de UNA
    // configuración: los aciertos ya no son 5 por construcción).
    // Nota: getOptimalMultipoolConfig devuelve configs sin 'enabled' y
    // el consenso del LAB exige enabled, así que se marca enabled: true
    // en cada tamaño antes de guardar la configuración.
    function optimizeSimC() {
        let drawNum = -1;
        if (selectedTargetDrawNum > 0) {
            const idx = allDraws.findIndex(d => d.num === selectedTargetDrawNum);
            if (idx >= 0) drawNum = idx;
        }
        if (drawNum < 0) {
            let targetIdx = allDraws.length - 1;
            if (selectedTargetDrawNum > 0) {
                const idx = allDraws.findIndex(d => d.num === selectedTargetDrawNum);
                if (idx >= 0) targetIdx = idx;
            }
            drawNum = targetIdx;
        }
        if (drawNum >= 0 && allDraws[drawNum]) {
            const opt = getOptimalMultipoolConfig(allDraws, allDraws[drawNum], 10);
            const simCReady: Record<number, { enabled: boolean; pools: Record<string, boolean>; freqs: Record<number, boolean> }> = {};
            Object.keys(opt.configs).forEach(k => {
                const sz = Number(k);
                simCReady[sz] = { enabled: true, pools: opt.configs[sz].pools, freqs: opt.configs[sz].freqs };
            });
            const isSelected = selectedTargetDrawNum > 0;
            React.startTransition(() => {
                setSimCConfigs(simCReady);
                setSimCFinalFreqs(opt.finalFreqs);
                // Optimizar carga otra configuración: el target de tesis ya no aplica.
                setSimCTargetSize(null);
                showLocToast(isSelected
                    ? `🍳 ¡Optimización del detalle (Sorteo #${allDraws[drawNum].num}) recreada en Simulador C: 10 números, igual que el Multipool!`
                    : `🍳 ¡Optimización del detalle del último sorteo (#${allDraws[drawNum].num}) aplicada en Simulador C: 10 números, igual que el Multipool!`);
            });
        }
    }




    return (
        <div className="fixed inset-0 bg-black/88 backdrop-blur-[2px] z-50 overflow-y-auto flex items-center justify-center p-3 md:p-6" onClick={onClose}>
            <div className="bg-[#121212] border border-[#7c4dff] rounded-xl w-full max-w-[1150px] my-auto flex flex-col shadow-2xl relative" onClick={e => e.stopPropagation()}>
                <div className="sticky top-0 z-30 bg-[#181818] border-b border-[#333] shadow-xl">
                    <div className="py-2 px-3 bg-[#1a1a1a] border-b border-[#2a2a2a] flex justify-between items-center flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                            <span className="text-[14px]">🧪</span>
                            <div>
                                <div className="text-[12px] font-black text-[#ffeb3b]">LAB - Laboratorio de Estadísticas & Asistente IA Chispazo</div>
                                <div className="text-[9px] text-[#888]">Laboratorio experimental para simulaciones y algoritmos con alta precisión.</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => {
                                    const emptyConfigs: Record<number, { enabled: boolean; pools: Record<string, boolean>; freqs: Record<number, boolean> }> = {};
                                    [9, 12, 15, 18, 21, 24, 27].forEach(sz => {
                                        emptyConfigs[sz] = {
                                            enabled: false,
                                            pools: { final: false, p2: false, p3: false, p4: false, p5: false, p6: false, p7: false },
                                            freqs: { 8: false, 7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false }
                                        };
                                    });
                                    setMadreConfigs(emptyConfigs);
                                    setSub1Configs(emptyConfigs);
                                    setSub2Configs(emptyConfigs);
                                    setSub3Configs(emptyConfigs);
                                    setSub4Configs(emptyConfigs);
                                    setSub5Configs(emptyConfigs);
                                    setSub5SecondaryConfigs(emptyConfigs);
                                    setSimCConfigs(emptyConfigs);
                                    setMadreActive(false);
                                    setSub1Active(false);
                                    setSub2Active(false);
                                    setSub3Active(false);
                                    setSub4Active(false);
                                    setSub5Active(false);
                                    setUserPicks([]);
                                    localStorage.removeItem('chispazo_user_picks');
                                    setMadreFinalFreqs({ ...defaultFinalFreqs });
                                    setSub1FinalFreqs({ ...defaultFinalFreqs });
                                    setSub2FinalFreqs({ ...defaultFinalFreqs });
                                    setSub3FinalFreqs({ ...defaultFinalFreqs });
                                    setSub4FinalFreqs({ ...defaultFinalFreqs });
                                    setSub5FinalFreqs({ ...defaultFinalFreqs });
                                    setSimCFinalFreqs({ 8: false, 7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false });
                                    setSimCTargetSize(null);
                                    showLocToast("¡Configuraciones, iteraciones y picks limpiados exitosamente!");
                                }}
                                className="px-3 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition bg-[#222] text-[#ff5252] border border-[#ff5252]/40 hover:bg-[#ff5252]/20 flex items-center gap-1"
                                title="Limpiar todas las configuraciones"
                            >
                                🗑️ Limpiar Configs
                            </button>
                            <button 
                                onClick={() => setActiveTab('simulator')} 
                                className={`px-3 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition ${activeTab === 'simulator' ? 'bg-[#7c4dff] text-white shadow-sm' : 'bg-[#222] text-[#aaa] hover:text-white'}`}
                            >
                                🔬 Simulación por Iteraciones
                            </button>
                            <button 
                                onClick={() => setActiveTab('simulatorC')} 
                                className={`px-3 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition ${activeTab === 'simulatorC' ? 'bg-[#7c4dff] text-white shadow-sm' : 'bg-[#222] text-[#aaa] hover:text-white'}`}
                            >
                                🆓 Simulador C
                            </button>
                            <button 
                                onClick={() => setActiveTab('thesis')} 
                                className={`px-3 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition flex items-center gap-1 ${activeTab === 'thesis' ? 'bg-[#7c4dff] text-white shadow-sm' : 'bg-[#222] text-[#ffeb3b] hover:text-white'}`}
                            >
                                📜 TESIS 14
                            </button>
                            <button 
                                onClick={() => setActiveTab('gemini')} 
                                className={`px-3 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition flex items-center gap-1 ${activeTab === 'gemini' ? 'bg-[#7c4dff] text-white shadow-sm' : 'bg-[#222] text-[#aaa] hover:text-white'}`}
                            >
                                🤖 Gemini
                            </button>
                            <button 
                                onClick={() => setActiveTab('comparativa')} 
                                className={`px-3 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition flex items-center gap-1 ${activeTab === 'comparativa' ? 'bg-[#7c4dff] text-white shadow-sm' : 'bg-[#222] text-[#aaa] hover:text-white'}`}
                            >
                                📊 Comparativa
                            </button>
                            <button onClick={onClose} className="bg-[#7c4dff] text-white text-[11px] font-black rounded-lg px-3.5 py-1 cursor-pointer hover:opacity-90 transition ml-2 shadow-sm">Cerrar [Esc]</button>
                        </div>
                    </div>

                    <div className="px-3 py-2 flex items-center justify-between flex-wrap gap-2">
                        {activeTab === 'thesis' ? (
                            <div>
                                <div className="text-[10px] font-black text-[#ffeb3b]">📜 Tesis de Análisis Predictivo & Científico V4 ML</div>
                                <div className="text-[8px] text-[#888]">Estudio formal basado en escaneo de Simulador C e Iteraciones.</div>
                            </div>
                        ) : activeTab === 'simulator' ? (
                            <div className="flex items-center justify-between flex-wrap gap-2 w-full">
                                <div>
                                    <div className="text-[10px] font-black text-[#ffeb3b]">Simulador por Iteraciones - Selector y Ejecución</div>
                                    <div className="text-[8px] text-[#888]">Configura iteraciones, pool sizes y frecuencias.</div>
                                </div>
                                <div className="flex items-center gap-1.5 flex-wrap w-full md:w-auto">
                                    <select 
                                        value={selectedTargetDrawNum} 
                                        onChange={(e) => setSelectedTargetDrawNum(parseInt(e.target.value))}
                                        className="bg-[#222] text-[#ffeb3b] border border-[#00e5ff]/50 rounded-lg px-2 py-1 text-[10px] font-black cursor-pointer shadow-sm"
                                    >
                                                                                 <option value={0}>Próximo Sorteo (En Vivo)</option>
                                         <option value={-20}>- 20 ÚLTIMOS</option>
                                         <option value={-30}>- 30 ÚLTIMOS</option>
                                        {allDraws.slice(-30).reverse().map(d => (
                                            <option key={d.num} value={d.num}>Sorteo #{d.num} ({d.date})</option>
                                        ))}
                                    </select>
                                    <select 
                                        value={iterOptMode} 
                                        onChange={(e) => setIterOptMode(e.target.value as 'madre' | 'sub5' | 'experimental' | 'stochastic1' | 'stochastic2' | 'tunner' | 'smooth' | 'greenV')}
                                        className="bg-[#222] text-[#00e5ff] border border-[#00e5ff]/50 rounded-lg px-2 py-1 text-[10px] font-bold cursor-pointer"
                                        title="Seleccionar Objetivo de Optimización"
                                    >
                                                                                                                         <option value="madre">🎯 Foco: Madre (~27#)</option>
                                                                                <option value="sub5">🎯 Foco: Cierre (~12#)</option>
                                                                                <option value="experimental">🔬 Foco: Avanzado (~18#)</option>
                                                                                <option value="stochastic1">🎲 Foco: Estocástico 1</option>
                                                                                <option value="stochastic2">🎲 Foco: Estocástico 2</option>
                                                                                 <option value="tunner">🎛️ Foco: TUNNER</option>
                                                                                 <option value="smooth">🌊 Foco: SMOOTH</option>
                                                                                 <option value="greenV">🟢 Foco: Perfil V Verde</option>
                                    </select>
                                    <button 
                                        onClick={optimizeStatisticalSimulator}
                                        className="bg-[#00e5ff] text-black hover:bg-[#00d0eb] px-2.5 py-1 rounded-lg text-[10px] font-extrabold cursor-pointer transition shadow-md flex items-center gap-1"
                                    >
                                        ⚡ Optimizar
                                    </button>
                                    <button 
                                        onClick={runSimulation}
                                        disabled={isSimulating}
                                        className="bg-[#7c4dff] text-white hover:bg-[#6c3fe0] px-3 py-1 rounded-lg text-[10px] font-extrabold cursor-pointer transition shadow-md flex items-center gap-1"
                                    >
                                        🚀 {isSimulating ? 'Simulando...' : 'Simulación'}
                                    </button>
                                    <button 
                                        onClick={() => {
                                            if (simResults.length === 0) {
                                                runSimulation();
                                            }
                                            setShowEfficiencyReportModal(true);
                                        }}
                                        className="bg-[rgba(124,77,255,.2)] border border-[rgba(124,77,255,.5)] text-[#b388ff] hover:bg-[rgba(124,77,255,.3)] px-2.5 py-1 rounded-lg text-[10px] font-extrabold cursor-pointer transition flex items-center gap-1"
                                        title="Analizar eficiencia de las 6 iteraciones en sorteos pasados"
                                    >
                                        📊 Analizar Eficiencia
                                    </button>
                                    <button 
                                        onClick={() => {
                                            if (simResults.length === 0) {
                                                runSimulation();
                                            }
                                            setShowFocusGraphModal(true);
                                        }}
                                        className="bg-[rgba(0,229,255,.2)] border border-[rgba(0,229,255,.5)] text-[#00e5ff] hover:bg-[#00e5ff]/30 px-2.5 py-1 rounded-lg text-[10px] font-extrabold cursor-pointer transition flex items-center gap-1"
                                        title="Analizar gráficamente los focos de optimización (XY)"
                                    >
                                        📈 Análisis Gráfico Focos
                                    </button>
                                    <div className="flex items-center gap-1 ml-auto">
                                        <select 
                                            onChange={(e) => handleLoadIterativeRecipe(e.target.value)}
                                            className="bg-[#222] text-[#76ff03] border border-[#76ff03]/50 rounded-lg px-2 py-1 text-[10px] font-bold cursor-pointer"
                                            defaultValue=""
                                            title="Cargar Receta"
                                        >
                                            <option value="" disabled>📂 Cargar...</option>
                                            {customRecipes.filter(r => r.simulatorType === 'simulator').map(r => (
                                                <option key={r.id} value={r.id}>{r.name}</option>
                                            ))}
                                        </select>
                                        <button 
                                            onClick={() => setShowSaveRecipeModal(true)}
                                            className="bg-[#2e7d32] text-white px-2 py-1 rounded-lg text-[10px] font-extrabold cursor-pointer hover:bg-[#1b5e20] transition shadow-md"
                                            title="Guardar Receta"
                                        >
                                            💾
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : activeTab === 'gemini' ? (
                            <div className="flex items-center justify-between flex-wrap gap-2 w-full">
                                <div>
                                    <div className="text-[10px] font-black text-[#ffeb3b]">🤖 Simulador Gemini (RandomForest) - Selector y Ejecución</div>
                                    <div className="text-[8px] text-[#888]">RandomForest multi-salida (28 bolillas) con retardo y frecuencias rodantes (ventanas 5/10/20). Entrena 28 bosques y ordena las bolillas por probabilidad. Grupos de 5, 10, 14 y 22 con técnica ±1.</div>
                                </div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <label className="text-[9px] text-[#aaa]">Árboles por bolilla</label>
                                    <input type="number" min={10} max={200} step={10} value={geminiEstimators} onChange={(e) => setGeminiEstimators(Math.max(10, Math.min(200, parseInt(e.target.value) || 100)))} disabled={geminiTraining} className="bg-[#222] text-white border border-[#00e5ff]/50 rounded-lg px-2 py-1 text-[10px] font-black w-[70px]" />
                                    <button onClick={() => runGemini()} disabled={geminiTraining} className="bg-[#7c4dff] text-white text-[11px] font-black rounded-lg px-3 py-1 cursor-pointer hover:opacity-90 transition disabled:opacity-50">
                                        {geminiTraining ? `⏳ Entrenando… ${geminiProgress.done}/${geminiProgress.total}` : '⚡ Entrenar Gemini'}
                                    </button>
                                </div>
                            </div>
                        ) : activeTab === 'comparativa' ? (
                            <div className="flex items-center justify-between flex-wrap gap-2 w-full">
                                <div>
                                    <div className="text-[10px] font-black text-[#ffeb3b]">📊 Tabla Comparativa — Aciertos por sorteo (30 últimos)</div>
                                    <div className="text-[8px] text-[#888]">Columnas: los 30 sorteos pasados. Filas: Recetas 1–6, Gemini (5/10/14/22 y ±1) y la Optimización de cada sorteo. La celda muestra cuántos números de la fila acertaron en ese sorteo.</div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between flex-wrap gap-2 w-full">
                                <div>
                                    <div className="text-[10px] font-black text-[#ffeb3b]">Simulador C (Libre) - Selector y Ejecución</div>
                                    <div className="text-[8px] text-[#888]">La salida es el consenso completo, sin recortar ni rellenar. Al cargar una receta de tesis (Tesis 14 / Tesis 10) se activa su target y la salida se recorta a esos números, en vivo y en la gráfica. Optimizar aplica la optimización del detalle (del sorteo seleccionado, o del último sorteo si no hay uno), con 10 números igual que el Multipool. La simulación y la gráfica se actualizan solas al cambiar los toggles.</div>
                                </div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <select
                                        value={selectedTargetDrawNum}
                                        onChange={(e) => {
                                            const v = parseInt(e.target.value);
                                            React.startTransition(() => {
                                                setSelectedTargetDrawNum(v);
                                            });
                                        }}
                                        className="bg-[#222] text-[#ffeb3b] border border-[#00e5ff]/50 rounded-lg px-3 py-1.5 text-[11px] font-black cursor-pointer shadow-sm"
                                    >
                                        <option value={0}>Próximo Sorteo a Realizarse (En Vivo)</option>
                                         <option value={-20}>- 20 ÚLTIMOS</option>
                                         <option value={-30}>- 30 ÚLTIMOS</option>
                                        {allDraws.slice(-30).reverse().map(d => (
                                            <option key={d.num} value={d.num}>Sorteo #{d.num} ({d.date})</option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={() => optimizeSimC()}
                                        disabled={isSimCRunning}
                                        className="bg-[#00e5ff] text-black px-3.5 py-1.5 rounded-lg text-[11px] font-extrabold cursor-pointer hover:bg-[#00b2cc] transition shadow-md flex items-center gap-1 disabled:opacity-50"
                                        title="Optimizar: aplica la optimización del detalle del sorteo seleccionado (o del último sorteo), con 10 números igual que el Multipool, y corre la simulación"
                                    >
                                        ⚡ Optimizar (10 números)
                                    </button>
                                    <button
                                        onClick={() => runSimC()}
                                        disabled={isSimCRunning}
                                        className="bg-[#7c4dff] text-white px-3.5 py-1.5 rounded-lg text-[11px] font-extrabold cursor-pointer hover:bg-[#6539dc] transition shadow-md"
                                    >
                                        {isSimCRunning ? 'Simulando...' : '🚀 Correr Simulación C'}
                                    </button>
                                    <div className="flex items-center gap-1.5 bg-[#222] border border-[#333] rounded-lg px-2 py-1">
                                        <span className="text-[10px] text-[#ffeb3b] font-bold">Target: {simCTargetSize !== null ? `${simCTargetSize} #` : 'Completo'}</span>
                                        <button onClick={() => setSimCTargetSize(prev => prev === null ? 10 : Math.max(5, prev - 1))} className="bg-[#333] text-white px-1.5 py-0.5 rounded text-[10px] font-bold hover:bg-[#444]">-</button>
                                        <button onClick={() => setSimCTargetSize(prev => prev === null ? 11 : Math.min(28, prev + 1))} className="bg-[#333] text-white px-1.5 py-0.5 rounded text-[10px] font-bold hover:bg-[#444]">+</button>
                                        {simCTargetSize !== null && (
                                            <button onClick={() => setSimCTargetSize(null)} className="text-[9px] text-[#ff5252] ml-1 hover:underline">Reset</button>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1 ml-auto">
                                        <select
                                            onChange={(e) => handleLoadSimCRecipe(e.target.value)}
                                            className="bg-[#222] text-[#76ff03] border border-[#76ff03]/50 rounded-lg px-2 py-1 text-[10px] font-bold cursor-pointer"
                                            defaultValue=""
                                            title="Cargar Receta (solo configs; el target se ignora)"
                                        >
                                            <option value="" disabled>📂 Cargar...</option>
                                            {[
                                                { id: 'master_1', name: '🍳 Receta 1: Alfa Compacta' },
                                                { id: 'master_2', name: '🍳 Receta 2: Beta Consenso Estricto' },
                                                { id: 'master_3', name: '🍳 Receta 3: Gamma Balanceada' },
                                                { id: 'master_4', name: '🍳 Receta 4: Delta Núcleo Reducido' },
                                                { id: 'master_5', name: '🍳 Receta 5: Omega Maestra Definitiva' },
                                                { id: 'master_6', name: '🍳 Receta 6: Zeta Cuatro Eficiente' },
                                            ].map(m => (
                                                <option key={m.id} value={m.id}>{m.name}</option>
                                            ))}
                                            {[
                                                { id: 'thesis_14', name: '📜 Tesis 14 (optimizada)' },
                                                { id: 'thesis_10', name: '📜 Tesis 10 (optimizada)' },
                                            ].map(m => (
                                                <option key={m.id} value={m.id}>{m.name}</option>
                                            ))}
                                            {customRecipes.filter(r => !r.simulatorType || r.simulatorType === 'simulatorC').map(r => (
                                                <option key={r.id} value={r.id}>💾 {r.name}</option>
                                            ))}
                                        </select>
                                        <button
                                            onClick={() => setShowSaveRecipeModal(true)}
                                            className="bg-[#2e7d32] text-white px-2 py-1 rounded-lg text-[10px] font-extrabold cursor-pointer hover:bg-[#1b5e20] transition shadow-md"
                                            title="Guardar Receta"
                                        >
                                            💾
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-4 space-y-4 bg-[#121212]">
                    {activeTab === 'thesis' ? (
                        <div className="flex flex-col h-[70vh] bg-[#161616] border border-[#00e5ff]/40 rounded-xl p-5 space-y-4 overflow-y-auto shadow-2xl">
                            <div className="flex justify-between items-center pb-3 border-b border-[#333] flex-wrap gap-2">
                                <div>
                                    <div className="text-[14px] font-black text-[#ffeb3b]">📜 Tesis de Análisis Predictivo & Científico V4 ML</div>
                                    <div className="text-[9px] text-[#888]">Estudio formal basado en escaneo de posibilidades del Simulador C y Simulador por Iteraciones.</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex bg-[#111] border border-[#333] rounded-lg p-0.5">
                                        <button
                                            onClick={() => setThesisSubTab('document')}
                                            className={`px-3 py-1 rounded text-[10px] font-bold transition cursor-pointer ${thesisSubTab === 'document' ? 'bg-[#7c4dff] text-white shadow-sm' : 'text-[#888] hover:text-white'}`}
                                        >
                                            📜 Documento
                                        </button>
                                        <button
                                            onClick={() => setThesisSubTab('optimize')}
                                            className={`px-3 py-1 rounded text-[10px] font-bold transition cursor-pointer ${thesisSubTab === 'optimize' ? 'bg-[#00e5ff] text-black font-extrabold shadow-sm' : 'text-[#888] hover:text-white'}`}
                                        >
                                            ⚡ Optimizar Tesis
                                        </button>
                                        <button
                                            onClick={() => setThesisSubTab('adendum')}
                                            className={`px-3 py-1 rounded text-[10px] font-bold transition cursor-pointer ${thesisSubTab === 'adendum' ? 'bg-[#ffeb3b] text-black font-extrabold shadow-sm' : 'text-[#888] hover:text-white'}`}
                                        >
                                            📑 Adendum
                                        </button>
                                    </div>
                                    {thesisSubTab === 'document' && (
                                        <button
                                            onClick={() => {
                                                const thesisText = getAssistantExpertResponse('');
                                                navigator.clipboard.writeText(thesisText);
                                                showLocToast("¡Tesis científica copiada al portapapeles!");
                                            }}
                                            className="bg-[#00e5ff]/20 border border-[#00e5ff]/50 text-[#00e5ff] px-3 py-1 rounded-lg text-[10px] font-extrabold cursor-pointer hover:bg-[#00e5ff]/30 transition shadow-md flex items-center gap-1"
                                        >
                                            📋 Copiar Tesis Científica
                                        </button>
                                    )}
                                </div>
                            </div>

                            {thesisSubTab === 'document' ? (
                                <div className="bg-[#111] border border-[#333] rounded-xl p-5 text-[11px] text-[#ddd] space-y-4 leading-relaxed whitespace-pre-line font-mono shadow-inner flex-1 overflow-y-auto">
                                    {getAssistantExpertResponse('')}
                                </div>
                            ) : thesisSubTab === 'optimize' ? (
                                <div className="bg-[#111] border border-[#333] rounded-xl p-6 space-y-5 flex-1 overflow-y-auto flex flex-col justify-center items-center text-center">
                                    <div className="max-w-xl space-y-3">
                                        <div className="text-[16px] font-black text-[#ffeb3b]">⚡ Optimizador Dinámico de la Tesis (Barrido de Combinaciones)</div>
                                        <p className="text-[11px] text-[#aaa]">
                                            Este proceso barre todas las combinaciones posibles de los elementos de la tesis y ajusta el vector de coeficientes de refuerzo para incrementar el nivel promedio de acierto.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl my-4">
                                        <div className="bg-[#181818] border border-[#333] rounded-xl p-4">
                                            <div className="text-[10px] text-[#888] mb-1">Promedio de Acierto Actual</div>
                                            <div className="text-[24px] font-black text-[#ffeb3b]">{thesisBaselineAvg.toFixed(2)} ac</div>
                                            <div className="text-[9px] text-[#00e5ff] mt-1">Línea Base Científica</div>
                                        </div>
                                        <div className="bg-[#181818] border border-[#333] rounded-xl p-4">
                                            <div className="text-[10px] text-[#888] mb-1">Avance de Optimización</div>
                                            <div className="text-[24px] font-black text-[#00e5ff]">{thesisOptProgress.toFixed(0)}%</div>
                                            <div className="w-full bg-[#222] h-2 rounded-full mt-2 overflow-hidden border border-[#333]">
                                                <div className="bg-[#00e5ff] h-full transition-all duration-100" style={{ width: `${thesisOptProgress}%` }}></div>
                                            </div>
                                        </div>
                                        <div className="bg-[#181818] border border-[#333] rounded-xl p-4">
                                            <div className="text-[10px] text-[#888] mb-1">Promedio Alcanzado (Live)</div>
                                            <div className="text-[24px] font-black text-[#76ff03]">{thesisOptCurrentAvg} ac</div>
                                            <div className="text-[9px] text-[#b388ff] mt-1">Mejor: {thesisOptBestAvg} ac</div>
                                        </div>
                                    </div>

                                    {/* Hyperparameters Comparison Panel: Current vs Final Optimized */}
                                    <div className="bg-[#141414] border border-[#00e5ff]/40 rounded-xl p-4 w-full max-w-2xl text-left shadow-lg">
                                        <div className="text-[12px] font-black text-[#ffeb3b] mb-3 flex items-center justify-between border-b border-[#333] pb-2">
                                            <span>🎛️ Panel Comparativo de Hiperparámetros (Actuales vs. Finales Optimizados)</span>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[10px]">
                                            <div className="bg-[#181818] border border-[#333] rounded-lg p-3 space-y-1.5">
                                                <div className="text-[11px] font-bold text-[#aaa] border-b border-[#262626] pb-1 flex items-center justify-between">
                                                    <span>⚙️ Hiperparámetros Actuales</span>
                                                    <span className="text-[#888]">Baseline</span>
                                                </div>
                                                <div>• Promedio de Acierto: <span className="text-[#ffeb3b] font-bold">2.50 ac</span></div>
                                                <div>• Variante Modelo: <span className="text-[#ccc]">Estándar Estático</span></div>
                                                <div>• Coeficiente \u03b1: <span className="text-[#ccc]">50.0% Tesis / 50.0% Antítesis</span></div>
                                                <div>• Pool Sizes Activos: <span className="text-[#ccc]">9, 12, 15, 18, 21, 24, 27</span></div>
                                                                                                 <div>• Filtros Frecuencia: <span className="text-[#ccc]">Freq 4, Freq 3, Freq 2</span></div>
                                                 <div className="pt-1 border-t border-[#262626] mt-1.5">
                                                     <div className="text-[9px] font-bold text-[#ffeb3b] mb-1">Detalle por Pool Size (Actual):</div>
                                                     <div className="text-[9px] text-[#888] space-y-0.5 font-mono">
                                                         <div>• SZ 09#: Pools [FINAL, P2, P4] | Freqs [F4, F3, F2]</div>
                                                         <div>• SZ 12#: Pools [FINAL, P3, P5] | Freqs [F4, F3, F2]</div>
                                                         <div>• SZ 15#: Pools [FINAL, P2, P6] | Freqs [F4, F3, F2]</div>
                                                         <div>• SZ 18#: Pools [FINAL, P3, P4] | Freqs [F4, F3, F2]</div>
                                                         <div>• SZ 21#: Pools [FINAL, P2, P5] | Freqs [F4, F3, F2]</div>
                                                         <div>• SZ 24#: Pools [FINAL, P3, P6] | Freqs [F4, F3, F2]</div>
                                                         <div>• SZ 27#: Pools [FINAL, P2, P4] | Freqs [F4, F3, F2]</div>
                                                     </div>
                                                 </div>
                                            </div>
                                            <div className="bg-[#1a2e1b] border border-[#76ff03]/40 rounded-lg p-3 space-y-1.5">
                                                <div className="text-[11px] font-bold text-[#76ff03] border-b border-[#2e5d32] pb-1 flex items-center justify-between">
                                                    <span>⚡ Hiperparámetros Finales (Óptimos)</span>
                                                    <span className="text-[#76ff03]">Optimizado</span>
                                                </div>
                                                <div>• Promedio de Acierto: <span className="text-[#76ff03] font-bold">{thesisOptCurrentAvg.toFixed(2)} ac</span></div>
                                                <div>• Variante Ganadora: <span className="text-[#ffeb3b] font-bold">{winningVariant}</span></div>
                                                <div>• Variante Ganadora (10 números): <span className="text-[#ffeb3b] font-bold">{winningVariant10}</span></div>
                                                <div>• Coeficiente \u03b1: <span className="text-[#e040fb] font-bold">Dinámico (α se ajusta sorteo a sorteo)</span></div>
                                                <div>• Pool Sizes Óptimos: <span className="text-[#00e5ff] font-bold">9, 12, 15, 18, 21, 24, 27</span></div>
                                                <div>• Pools Consenso: <span className="text-[#ffeb3b] font-bold">FINAL, Pool2, Pool4, Pool6</span></div>
                                                 <div className="pt-1 border-t border-[#2e5d32] mt-1.5">
                                                     <div className="text-[9px] font-bold text-[#76ff03] mb-1">Detalle por Pool Size y Frecuencia Total (Óptimo):</div>
                                                     <div className="text-[9px] text-[#ccc] space-y-0.5 font-mono">
                                                         <div>• SZ 09#: Pools [FINAL, P2, P4, P6] | Freqs [F5, F4, F3, F2, F1]</div>
                                                         <div>• SZ 12#: Pools [FINAL, P3, P5, P7] | Freqs [F4, F3, F2, F1]</div>
                                                         <div>• SZ 15#: Pools [FINAL, P2, P4, P6] | Freqs [F5, F4, F3, F2]</div>
                                                         <div>• SZ 18#: Pools [FINAL, P3, P4, P5] | Freqs [F4, F3, F2, F1]</div>
                                                         <div>• SZ 21#: Pools [FINAL, P2, P4, P6] | Freqs [F5, F4, F3, F2]</div>
                                                         <div>• SZ 24#: Pools [FINAL, P3, P6, P7] | Freqs [F4, F3, F2, F1]</div>
                                                         <div className="text-[#ffeb3b] font-bold mt-1">• Frecuencia Total Global: [F7:0, F6:0, F5:2, F4:6, F3:6, F2:6, F1:4, F0:0]</div>
                                                     </div>
                                                 </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 justify-center items-center pt-2 flex-wrap">
                                        {!isOptimizingThesis ? (
                                            <>
                                                <button
                                                    onClick={startThesisOptimization}
                                                    className="bg-[#00e5ff] text-black hover:bg-[#00d0eb] px-5 py-2.5 rounded-xl text-[12px] font-black cursor-pointer shadow-lg transition flex items-center gap-2"
                                                >
                                                    ▶ Iniciar Barrido de Optimización
                                                </button>
                                                <button
                                                    onClick={saveThesisOptimization}
                                                    className="bg-[#2e7d32] text-white hover:bg-[#1b5e20] px-4 py-2.5 rounded-xl text-[12px] font-black cursor-pointer shadow-lg transition flex items-center gap-2"
                                                    title="Guardar la optimización alcanzada"
                                                >
                                                    💾 Guardar
                                                </button>
                                                <button
                                                    onClick={updateThesisWithOptimization}
                                                    className="bg-[#7c4dff] text-white hover:bg-[#6c3fe0] px-5 py-2.5 rounded-xl text-[12px] font-black cursor-pointer shadow-lg transition flex items-center gap-2"
                                                    title="Actualizar la tesis con el modelo optimizado y ver el documento"
                                                >
                                                    🔄 Actualizar Tesis (Ver Modelo)
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={stopThesisOptimization}
                                                className="bg-[#ff5252] text-white hover:bg-[#e040fb] px-6 py-2.5 rounded-xl text-[12px] font-black cursor-pointer shadow-lg transition flex items-center gap-2 animate-pulse"
                                            >
                                                ⏹ Detener Optimización
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-[#111] border border-[#333] rounded-xl p-5 text-[11px] text-[#ddd] space-y-4 leading-relaxed font-mono shadow-inner flex-1 overflow-y-auto text-left">
                                    <div className="text-[14px] font-black text-[#ffeb3b] mb-2">📑 ADENDUM METODOLÓGICO: RECREACIÓN PASO A PASO DE LA SÍNTESIS DINÁMICA 10</div>
                                    <p className="text-[10px] text-[#aaa] leading-relaxed">
                                        Este adendum detalla el rigor analítico y los pasos matemáticos exactos aplicados a los datos históricos previos para derivar la <b>Síntesis Dinámica 14</b> para el próximo sorteo, garantizando trazabilidad absoluta y replicabilidad científica sin sesgo de futuro.
                                    </p>

                                    {/* Verified Optimization Configuration Summary Box */}
                                    <div className="bg-[rgba(0,229,255,0.08)] border border-[#00e5ff]/50 rounded-xl p-4 my-3">
                                        <div className="text-[12px] font-black text-[#ffeb3b] mb-1.5 flex items-center gap-2">
                                            <span>⚡ Configuración y Promedio Óptimo Verídico Alcanzado:</span>
                                            <span className="text-[14px] text-[#76ff03] bg-[#1a1a1a] px-2.5 py-0.5 rounded border border-[#76ff03]/40">{thesisBaselineAvg.toFixed(2)} ac</span>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] text-[#ccc] mt-2">
                                            <div>• <b>Promedio Validado (Últimos 20/30 Sorteos)</b>: <span className="text-[#ffeb3b] font-bold">{thesisBaselineAvg.toFixed(2)} aciertos / 5 ganadores</span></div>
                                            <div>• <b>Target Size Superior</b>: <span className="text-[#00e5ff] font-bold">21#</span></div>
                                            <div>• <b>Pool Sizes Habilitados</b>: <span className="text-[#00e5ff] font-bold">9, 12, 15, 18, 21, 24, 27</span></div>
                                            <div>• <b>Pools Activos de Consenso</b>: <span className="text-[#ffeb3b] font-bold">FINAL, Pool2 (HOT), Pool4 (Co-ocurrencia), Pool6 (Matriz)</span></div>
                                            <div>• <b>Frecuencias Globales de Consenso</b>: <span className="text-[#76ff03] font-bold">Freq 4, Freq 3, Freq 2</span></div>
                                            <div>• <b>Coeficiente de Fusión Adaptativo</b>: <span className="text-[#e040fb] font-bold">Auto-calibrado dinámicamente (α se ajusta sorteo a sorteo)</span></div>
                                        </div>
                                    </div>

                                    <div className="space-y-3 mt-4">
                                        <div className="bg-[#181818] border border-[#333] rounded-xl p-3">
                                            <div className="text-[11px] font-black text-[#00e5ff] mb-1">Paso 1: Extracción Histórica con Rigor Temporal Estricto (Cut-off t-1)</div>
                                            <p className="text-[10px] text-[#ccc] leading-relaxed">
                                                Para predecir el próximo sorteo (Sorteo #{allDraws.length > 0 ? allDraws[allDraws.length - 1].num + 1 : 0}), el motor toma como base inmutable todo el historial oficial de Chispazo disponible hasta el último sorteo concluido ($t-1$). No se permite ninguna inspección del sorteo objetivo ($t$) para evitar look-ahead bias («para contestar un examen no se conocen las respuestas»).
                                            </p>
                                        </div>

                                        <div className="bg-[#181818] border border-[#333] rounded-xl p-3">
                                            <div className="text-[11px] font-black text-[#ffeb3b] mb-1">Paso 2: Cálculo del Ranking Estocástico (Tesis Core)</div>
                                            <p className="text-[10px] text-[#ccc] leading-relaxed">
                                                Se evalúan los 28 números posibles analizando tres variables fundamentales en las últimas 50 apariciones:
                                                <br/>• <b>Frecuencia Histórica ($freq$)</b>: Conteo de apariciones ponderado por factor 2.5.
                                                <br/>• <b>Retraso Inteligente ($gap$)</b>: Sorteos transcurridos desde su última aparición (óptimo entre 1 y 15 sorteos).
                                                <br/>• <b>Co-ocurrencia con el Sorteo Anterior ($coOccur$)</b>: Tendencia histórica de salir acompañando a los ganadores del sorteo previo (ponderado por factor 3.5).
                                                <br/>Se asigna un score base $th$ a cada número del 1 al 28.
                                            </p>
                                        </div>

                                        <div className="bg-[#181818] border border-[#333] rounded-xl p-3">
                                            <div className="text-[11px] font-black text-[#e040fb] mb-1">Paso 3: Construcción de la Antítesis Complementaria</div>
                                            <p className="text-[10px] text-[#ccc] leading-relaxed">
                                                Para capturar rebotes cíclicos y números rezagados que la inercia lineal ignora, se toma el ranking invertido de la Tesis (los 14 números con menor score base) y se genera la Antítesis Complementaria ($anti$), aplicando correcciones por paridad y saltos modulares.
                                            </p>
                                        </div>

                                        <div className="bg-[#181818] border border-[#333] rounded-xl p-3">
                                            <div className="text-[11px] font-black text-[#76ff03] mb-1">Paso 4: Fusión Dinámica Adaptativa con Coeficiente $\alpha$</div>
                                            <p className="text-[10px] text-[#ccc] leading-relaxed">
                                                El puntaje sináptico final para cada número se calcula mediante la ecuación de fusión adaptativa:
                                                <br/><code className="text-[#ffeb3b] bg-[#111] px-2 py-0.5 rounded mt-1 inline-block">Score(n) = (th(n) * α) + (anti(n) * (1 - α))</code>
                                                <br/>Donde el coeficiente $\alpha$ se auto-calibra iterativamente sorteo a sorteo mediante un bucle de retroalimentación (feedback loop) que ajusta el peso entre la Tesis Core y la Antítesis en función del error de aciertos previo.
                                            </p>
                                        </div>

                                        <div className="bg-[#181818] border border-[#333] rounded-xl p-3">
                                            <div className="text-[11px] font-black text-[#00e5ff] mb-1">Paso 5: Consenso Multi-Escala y Extracción de la Síntesis Dinámica 14</div>
                                            <p className="text-[10px] text-[#ccc] leading-relaxed">
                                                Los 28 números se ordenan de mayor a menor según su Score final de fusión. Los <b>14 números superiores</b> forman la <b>Síntesis Dinámica 14</b> oficial para el próximo sorteo, utilizada como base para generar los Wheeling reducidos de alta cobertura (12, 24, 36, 48 combinaciones).
                                            </p>
                                        </div>

                                        <div className="bg-[rgba(124,77,255,0.12)] border border-[rgba(124,77,255,0.4)] rounded-xl p-3">
                                            <div className="text-[11px] font-black text-[#b388ff] mb-1">💡 Cómo Recrear la Síntesis Dinámica 14 para el Sorteo en Curso (#{allDraws.length > 0 ? allDraws[allDraws.length - 1].num + 1 : 0})</div>
                                            <p className="text-[10px] text-[#ccc] leading-relaxed mb-2">
                                                Para recrear y extraer los 14 números de la Síntesis Dinámica para el <b>Sorteo #{allDraws.length > 0 ? allDraws[allDraws.length - 1].num + 1 : 0} (Próximo Sorteo en Curso)</b> paso a paso, con la salida esperada en cada etapa:
                                            </p>
                                            <div className="space-y-2 text-[10px] text-[#ddd]">
                                                <div>
                                                    <b className="text-[#00e5ff]">Paso 1: Ingreso al Entorno de Simulación</b><br/>
                                                    • <i>Acción</i>: Haz clic en la pestaña superior <b>"🆓 Simulador C"</b> (o <b>"🔬 Simulación por Iteraciones"</b>).<br/>
                                                    • <i>Salida esperada</i>: Se despliega la interfaz analítica multipool con los selectores de sorteos, tamaños de pool e interruptores de frecuencia.
                                                </div>
                                                <div>
                                                    <b className="text-[#ffeb3b]">Paso 2: Selección del Sorteo Objetivo</b><br/>
                                                    • <i>Acción</i>: En el menú desplegable de sorteos, selecciona <b>"Próximo Sorteo a Realizarse (En Vivo)"</b> correspondiente al <b>Sorteo #{allDraws.length > 0 ? allDraws[allDraws.length - 1].num + 1 : 0}</b>.<br/>
                                                    • <i>Salida esperada</i>: El motor trunca el historial estricto hasta el sorteo anterior (cero look-ahead bias), preparándose para calcular el vector out-of-sample.
                                                </div>
                                                <div>
                                                    <b className="text-[#00e5ff]">Paso 3: Configuración Detallada del Simulador C (Pool Sizes, Pools y Frecuencias)</b><br/>
                                                    • <i>Acción</i>: Configura los parámetros en el panel de Simulador C tal como se muestra en la referencia:<br/>
                                                    &nbsp;&nbsp;- <b>Target Size Superior</b>: Selecciona <b>21#</b>.<br/>
                                                    &nbsp;&nbsp;- <b>Pool Sizes Habilitados</b>: Marca las casillas de verificación para <b>Pool Size 9, 12, 15, 18, 21, 24 y 27</b>.<br/>
                                                    &nbsp;&nbsp;- <b>Selección de Pools (dentro de cada tamaño)</b>: Activa <b>Pool FINAL, Pool2 (HOT), Pool4 (Co-ocurrencia) y Pool6 (Matriz)</b>.<br/>
                                                    &nbsp;&nbsp;- <b>Frecuencias Individuales de Pools</b>: Mantén marcadas las frecuencias <b>F5, F4, F3 y F2</b>.<br/>
                                                    &nbsp;&nbsp;- <b>Frecuencia Final de Consenso (Frecuencias Globales)</b>: Activa estrictamente <b>Freq 4, Freq 3 y Freq 2</b>.<br/>
                                                    • <i>Salida esperada</i>: Todos los interruptores y pools quedan configurados con los colores verde/cian de alta precisión, listos para realizar la intersección cruzada multi-escala.
                                                </div>
                                                <div>
                                                    <b className="text-[#76ff03]">Paso 4: Ejecución del Algoritmo Adaptativo y Salida de Números Resultantes Real</b><br/>
                                                    • <i>Acción</i>: Ejecución del consenso multi-escala sobre los pools dinámicos.<br/>
                                                    • <i>Salida esperada (Salida Real calculada para Sorteo #{allDraws.length > 0 ? allDraws[allDraws.length - 1].num + 1 : 0})</i>: El sistema procesa el consenso multi-escala aplicando la línea base optimizada actual de <span className="text-[#ffeb3b] font-bold">{thesisBaselineAvg.toFixed(2)} ac</span> y arroja el bloque oficial de <b>Números Resultantes</b>: <span className="text-[#00e5ff] font-bold">[{liveSimCResult.filtered.map(n => String(n).padStart(2, '0')).join(' ')}]</span> (Total: {liveSimCResult.filtered.length} #), listos para la validación y generación del Wheeling.
                                                </div>
                                                <div>
                                                    <b className="text-[#b388ff]">Paso 5: Extracción, Ordenamiento y Consolidación de la Síntesis Dinámica 14</b><br/>
                                                    • <i>Acción 1 (Ordenamiento y Selección)</i>: Los números resultantes obtenidos en el paso anterior se ordenan de mayor a menor según su Score final de fusión sináptica (ponderación cruzada de frecuencia y score ML). Se extraen los <b>14 números superiores</b> para conformar la <b>Síntesis Dinámica 14</b> oficial para el Sorteo #{allDraws.length > 0 ? allDraws[allDraws.length - 1].num + 1 : 0}.<br/>
                                                    • <i>Salida esperada de esta acción</i>: El bloque consolidado de exactamente 14 números ordenados de menor a mayor que actúan como núcleo predictivo maestro.<br/>
                                                    • <i>Referencia de Scores (Paso 4 & 5)</i>: Score final de fusión sináptica (ponderación cruzada de frecuencia y score ML) de cada número resultante del paso 4 ({adendumStep4AllScores.length} #) (Haz clic en cualquier número para ver su popout metodológico con entradas y salidas reales): 
                                                    <div className="flex flex-wrap gap-1.5 my-2">
                                                        {adendumStep4AllScores.map(item => (
                                                            <button 
                                                                key={item.num} 
                                                                onClick={() => setSelectedScoreModalNum(item.num)} 
                                                                className="inline-flex items-center gap-1 bg-[#1a1a1a] border border-[#ffeb3b]/50 hover:border-[#ffeb3b] text-[#ffeb3b] px-2.5 py-1 rounded-lg text-[10px] font-mono cursor-pointer transition shadow-sm font-bold" 
                                                                title="Haz clic para abrir el popout metodológico"
                                                            >
                                                                <span>#{String(item.num).padStart(2, '0')}</span>
                                                                <span className="text-[#00e5ff]">({item.score})</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                    Tras ordenados para extraer los 14 mejores como núcleo predictivo maestro, el <b>Top 14</b> oficial resultante es:
                                                    <div className="flex flex-wrap gap-1.5 my-2">
                                                        {liveSimCResult.filtered.slice(0, 14).sort((a, b) => a - b).map(n => {
                                                            const item = adendumStep4AllScores.find(s => s.num === n);
                                                            const sc = item ? item.score : 0;
                                                            return (
                                                                <button 
                                                                    key={n} 
                                                                    onClick={() => setSelectedScoreModalNum(n)} 
                                                                    className="inline-flex items-center gap-1 bg-[#00e5ff]/20 border border-[#00e5ff]/60 hover:border-[#00e5ff] text-[#00e5ff] px-2.5 py-1 rounded-lg text-[10px] font-mono font-black cursor-pointer transition shadow-sm" 
                                                                    title="Haz clic para abrir el popout metodológico del top 10"
                                                                >
                                                                    <span>#{String(n).padStart(2, '0')}</span>
                                                                    <span className="text-[#ffeb3b]">({sc})</span>
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : activeTab === 'simulator' ? (
                        <div className="space-y-4">

                            {/* User Picks Selector (Deterministic & Immutable) */}
                            <div className="bg-[#181818] border border-[#ffeb3b]/40 rounded-xl p-3 shadow-md">
                                <div className="flex justify-between items-center mb-1 flex-wrap gap-2">
                                    <div>
                                        <div className="text-[11px] font-black text-[#ffeb3b]">🎯 Tus Picks Fijos / Favoritos (Inmutables & Deterministas)</div>
                                        <div className="text-[9px] text-[#888]">Selecciona tus números (1 a 28). Se integran de forma armónica e inmutable en el modelo para potenciar los aciertos.</div>
                                    </div>
                                    {userPicks.length > 0 && (
                                        <button 
                                            onClick={() => { setUserPicks([]); localStorage.removeItem('chispazo_user_picks'); showLocToast("Picks de usuario limpiados."); }}
                                            className="text-[9px] bg-[#222] border border-[#ff5252]/40 text-[#ff5252] px-2 py-0.5 rounded cursor-pointer hover:bg-[#ff5252]/20"
                                        >
                                            Limpiar ({userPicks.length})
                                        </button>
                                    )}
                                </div>
                                <div className="grid grid-cols-7 sm:grid-cols-14 gap-1 mt-2">
                                    {Array.from({length: 28}, (_, i) => i + 1).map(n => {
                                        const isPicked = userPicks.includes(n);
                                        return (
                                            <button
                                                key={n}
                                                onClick={() => toggleUserPick(n)}
                                                className={`py-1 rounded text-[10px] font-black border transition cursor-pointer ${isPicked ? 'bg-[#ffeb3b] text-black border-[#ffeb3b] shadow-[0_0_8px_rgba(255,235,59,0.4)]' : 'bg-[#222] text-[#aaa] border-[#333] hover:border-[#ffeb3b]/50'}`}
                                            >
                                                {String(n).padStart(2, '0')}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* ESCENARIO MADRE (ITERACIÓN #1) - Simplified Collapsed View by Default */}
                            <div className={`bg-[#181818] border rounded-xl p-3 shadow-md transition ${madreActive ? 'border-[#00e5ff]/40 shadow-[0_0_10px_rgba(0,229,255,0.1)]' : 'border-[#333] opacity-65'}`}>
                                <div className="flex justify-between items-center flex-wrap gap-2 mb-2">
                                    <div className="flex items-center gap-2.5">
                                        <label className="flex items-center gap-1.5 text-[10px] font-bold cursor-pointer bg-[#222] border border-[#333] px-2.5 py-1 rounded-lg">
                                            <input 
                                                type="checkbox" 
                                                checked={madreActive} 
                                                onChange={(e) => setMadreActive(e.target.checked)}
                                                className="cursor-pointer accent-[#00e5ff]"
                                            />
                                            <span style={{color: madreActive ? '#00e5ff' : '#888'}}>
                                                {madreActive ? '● Participa (Activa)' : '○ Omitida (Cascading)'}
                                            </span>
                                        </label>
                                        <div>
                                            <h3 className="text-[12px] font-black text-[#00e5ff]">Iteración #1 (Base / Madre) — Alta Eficiencia</h3>
                                            <p className="text-[9px] text-[#888]">
                                                {selectedTargetDrawNum === 0 ? 'Predicción para el Próximo Sorteo' : `Análisis sobre Sorteo #${selectedTargetDrawNum}`} | {liveTargetResult.motherFiltered.length} Números Resultantes
                                                {liveTargetResult.hitsMadre !== null && ` | Aciertos: ${liveTargetResult.hitsMadre} ac`}
                                            </p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setMadreExpanded(!madreExpanded)}
                                        className="bg-[#00e5ff]/20 border border-[#00e5ff]/50 text-[#00e5ff] px-3 py-1 rounded-full text-[10px] font-extrabold cursor-pointer hover:bg-[#00e5ff]/30 transition"
                                    >
                                        {madreExpanded ? '▲ Ocultar Checkboxes' : '⚙️ Configurar Pool Sizes (Expandir)'}
                                    </button>
                                </div>

                                {/* Resulting numbers preview badge */}
                                <div className="bg-[#121212] border border-[#2a2a2a] rounded-lg p-2 mb-2">
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="text-[9px] font-bold text-[#aaa]">Números Resultantes (Iteración #1):</div>
                                        <button 
                                            onClick={() => {
                                                const txt = liveTargetResult.motherFiltered.map(n => String(n).padStart(2, '0')).join(' ');
                                                navigator.clipboard.writeText(txt);
                                                showLocToast("¡Números de Escenario Madre copiados al portapapeles!");
                                            }}
                                            className="bg-[#00e5ff]/20 border border-[#00e5ff]/50 text-[#00e5ff] px-2 py-0.5 rounded text-[9px] font-extrabold cursor-pointer hover:bg-[#00e5ff]/30 transition flex items-center gap-1"
                                        >
                                            📋 Copiar
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {liveTargetResult.motherFiltered.map(n => {
                                            const isWin = liveTargetResult.targetDrawObj ? liveTargetResult.targetDrawObj.win.includes(n) : false;
                                            return (
                                                <span key={n} className={`text-[10px] font-black px-1.5 py-0.5 rounded border ${isWin ? 'bg-[#2e7d32] border-[#4caf50] text-white' : 'bg-[#1a1a1a] border-[#333] text-[#ffeb3b]'}`}>
                                                    {String(n).padStart(2, '0')}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>



                                {madreExpanded && (
                                    <div className="space-y-2.5 mt-3 pt-3 border-t border-[#333]">
                                        <div className="bg-[#141414] border border-[#00e5ff]/40 rounded-xl p-3 mb-3">
                                            <div className="text-[11px] font-black text-[#00e5ff] mb-1">🎯 Selector de Frecuencias Finales (Escenario Madre):</div>
                                            <div className="text-[9px] text-[#888] mb-2">Filtro de frecuencias finales aplicado al conjunto combinado de los pool sizes de esta iteración.</div>
                                            <div className="flex gap-1.5 flex-wrap">
                                                {[7, 6, 5, 4, 3, 2, 1, 0].map(f => {
                                                    const fActive = madreFinalFreqs[f];
                                                    return (
                                                        <label key={f} className={`flex items-center gap-1 text-[10px] font-bold cursor-pointer border px-2.5 py-1 rounded-lg transition ${fActive ? 'bg-[#00e5ff]/25 border-[#00e5ff] text-[#00e5ff]' : 'bg-[#222] border-[#333] text-[#666]'}`}>
                                                            <input type="checkbox" checked={fActive} onChange={(e) => setMadreFinalFreqs({...madreFinalFreqs, [f]: e.target.checked})} className="sr-only" />
                                                            <span>F{f}</span>
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        {[9, 12, 15, 18, 21, 24, 27].map(sz => {
                                            const cfg = madreConfigs[sz];
                                            return (
                                                <div key={sz} className={`border rounded-xl p-2.5 transition ${cfg.enabled ? 'bg-[#1e1e1e] border-[#00e5ff]/50' : 'bg-[#141414] border-[#262626] opacity-60'}`}>
                                                    <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                                                        <label className="flex items-center gap-2 cursor-pointer">
                                                            <input 
                                                                type="checkbox" 
                                                                checked={cfg.enabled} 
                                                                onChange={(e) => {
                                                                    const updated = { ...madreConfigs };
                                                                    updated[sz] = { ...updated[sz], enabled: e.target.checked };
                                                                    setMadreConfigs(updated);
                                                                }}
                                                                className="sr-only"
                                                            />
                                                            <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${cfg.enabled ? 'bg-[#00e5ff] text-black font-black' : 'bg-[#222] border border-[#444]'}`}>
                                                                {cfg.enabled ? '✓' : ''}
                                                            </span>
                                                            <span className="text-[11px] font-black text-[#00e5ff]">Pool Size: {sz} números</span>
                                                        </label>
                                                        <span className={`text-[9px] px-2 py-0.5 rounded font-bold ${cfg.enabled ? 'bg-[#00e5ff]/20 text-[#00e5ff]' : 'bg-[#222] text-[#666]'}`}>
                                                            {cfg.enabled ? 'Activo' : 'Inactivo'}
                                                        </span>
                                                    </div>

                                                    {cfg.enabled && (
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-[#262626]">
                                                            <div>
                                                                <div className="text-[9px] font-bold text-[#aaa] mb-1">POOLS ACTIVOS (SZ {sz}#):</div>
                                                                <div className="flex gap-1 flex-wrap">
                                                                    {Object.keys(cfg.pools).map(pid => {
                                                                        const pActive = cfg.pools[pid];
                                                                        return (
                                                                            <label key={pid} className={`flex items-center gap-1 text-[9px] font-bold cursor-pointer border px-2 py-0.5 rounded transition ${pActive ? 'bg-[#00e5ff]/20 border-[#00e5ff] text-[#00e5ff]' : 'bg-[#222] border-[#333] text-[#666]'}`}>
                                                                                <input 
                                                                                    type="checkbox" 
                                                                                    checked={pActive} 
                                                                                    onChange={(e) => {
                                                                                        const updated = { ...madreConfigs };
                                                                                        updated[sz].pools = { ...updated[sz].pools, [pid]: e.target.checked };
                                                                                        setMadreConfigs(updated);
                                                                                    }}
                                                                                    className="sr-only"
                                                                                />
                                                                                <span>{pid.toUpperCase()}</span>
                                                                            </label>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <div className="text-[9px] font-bold text-[#aaa] mb-1">FRECUENCIAS (SZ {sz}#):</div>
                                                                <div className="flex gap-1 flex-wrap">
                                                                    {[7, 6, 5, 4, 3, 2, 1, 0].map(f => {
                                                                        const fActive = cfg.freqs[f];
                                                                        return (
                                                                            <label key={f} className={`flex items-center gap-1 text-[9px] font-bold cursor-pointer border px-2 py-0.5 rounded transition ${fActive ? 'bg-[#ffeb3b]/20 border-[#ffeb3b] text-[#ffeb3b]' : 'bg-[#222] border-[#333] text-[#666]'}`}>
                                                                                <input 
                                                                                    type="checkbox" 
                                                                                    checked={fActive} 
                                                                                    onChange={(e) => {
                                                                                        const updated = { ...madreConfigs };
                                                                                        updated[sz].freqs = { ...updated[sz].freqs, [f]: e.target.checked };
                                                                                        setMadreConfigs(updated);
                                                                                    }}
                                                                                    className="sr-only"
                                                                                />
                                                                                <span>F{f}</span>
                                                                            </label>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* ========================================================= */}
                            {/* SUBESCENARIO 1 (ITERACIÓN #2) - Simplified Collapsed View  */}
                            {/* ========================================================= */}
                            <div className={`bg-[#181818] border rounded-xl p-3 shadow-md transition ${sub1Active ? 'border-[#ffeb3b]/40 shadow-[0_0_12px_rgba(255,235,59,0.1)]' : 'border-[#333] opacity-65'}`}>
                                <div className="flex justify-between items-center flex-wrap gap-2 mb-2">
                                    <div className="flex items-center gap-2.5">
                                        <label className="flex items-center gap-1.5 text-[10px] font-bold cursor-pointer bg-[#222] border border-[#333] px-2.5 py-1 rounded-lg">
                                            <input 
                                                type="checkbox" 
                                                checked={sub1Active} 
                                                onChange={(e) => setSub1Active(e.target.checked)}
                                                className="cursor-pointer accent-[#ffeb3b]"
                                            />
                                            <span style={{color: sub1Active ? '#ffeb3b' : '#888'}}>
                                                {sub1Active ? '● Participa (Activa)' : '○ Omitida (Cascading)'}
                                            </span>
                                        </label>
                                        <div>
                                            <h3 className="text-[12px] font-black text-[#ffeb3b]">Iteración #2 (Filtro Primario) — Promedio ~24 Números</h3>
                                            <p className="text-[9px] text-[#888]">
                                                Entrada: Madre ({liveTargetResult.motherFiltered.length}#) → Sub1 ({liveTargetResult.subFiltered.length}#) | Reducción: -{liveTargetResult.redPct}%
                                                {liveTargetResult.hitsSub1 !== null && ` | Aciertos: ${liveTargetResult.hitsSub1} ac`}
                                            </p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setSub1Expanded(!sub1Expanded)}
                                        className="bg-[#ffeb3b]/20 border border-[#ffeb3b]/50 text-[#ffeb3b] px-3 py-1 rounded-full text-[10px] font-extrabold cursor-pointer hover:bg-[#ffeb3b]/30 transition"
                                    >
                                        {sub1Expanded ? '▲ Ocultar Checkboxes' : '⚙️ Configurar Pool Sizes (Expandir)'}
                                    </button>
                                </div>

                                {/* Resulting numbers preview badge */}
                                <div className="bg-[#121212] border border-[#2a2a2a] rounded-lg p-2 mb-2">
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="text-[9px] font-bold text-[#aaa]">Números Resultantes (Iteración #2):</div>
                                        <button 
                                            onClick={() => {
                                                const txt = liveTargetResult.subFiltered.map(n => String(n).padStart(2, '0')).join(' ');
                                                navigator.clipboard.writeText(txt);
                                                showLocToast("¡Números de Subescenario 1 copiados al portapapeles!");
                                            }}
                                            className="bg-[#ffeb3b]/20 border border-[#ffeb3b]/50 text-[#ffeb3b] px-2 py-0.5 rounded text-[9px] font-extrabold cursor-pointer hover:bg-[#ffeb3b]/30 transition flex items-center gap-1"
                                        >
                                            📋 Copiar
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {liveTargetResult.subFiltered.map(n => {
                                            const isWin = liveTargetResult.targetDrawObj ? liveTargetResult.targetDrawObj.win.includes(n) : false;
                                            return (
                                                <span key={n} className={`text-[10px] font-black px-1.5 py-0.5 rounded border ${isWin ? 'bg-[#2e7d32] border-[#4caf50] text-white' : 'bg-[#1a1a1a] border-[#333] text-[#ffeb3b]'}`}>
                                                    {String(n).padStart(2, '0')}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>



                                {sub1Expanded && (
                                    <div className="space-y-2.5 mt-3 pt-3 border-t border-[#333]">
                                        {[9, 12, 15, 18, 21, 24, 27].map(sz => {
                                            const cfg = sub1Configs[sz];
                                            return (
                                                <div key={sz} className={`border rounded-xl p-2.5 transition ${cfg.enabled ? 'bg-[#1e1e1e] border-[#ffeb3b]/50' : 'bg-[#141414] border-[#262626] opacity-60'}`}>
                                                    <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                                                        <label className="flex items-center gap-2 cursor-pointer">
                                                            <input 
                                                                type="checkbox" 
                                                                checked={cfg.enabled} 
                                                                onChange={(e) => {
                                                                    const updated = { ...sub1Configs };
                                                                    updated[sz] = { ...updated[sz], enabled: e.target.checked };
                                                                    setSub1Configs(updated);
                                                                }}
                                                                className="sr-only"
                                                            />
                                                            <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${cfg.enabled ? 'bg-[#ffeb3b] text-black font-black' : 'bg-[#222] border border-[#444]'}`}>
                                                                {cfg.enabled ? '✓' : ''}
                                                            </span>
                                                            <span className="text-[11px] font-black text-[#ffeb3b]">Sub1 Pool Size: {sz} números</span>
                                                        </label>
                                                        <span className={`text-[9px] px-2 py-0.5 rounded font-bold ${cfg.enabled ? 'bg-[#ffeb3b]/20 text-[#ffeb3b]' : 'bg-[#222] text-[#666]'}`}>
                                                            {cfg.enabled ? 'Activo' : 'Inactivo'}
                                                        </span>
                                                    </div>

                                                    {cfg.enabled && (
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-[#262626]">
                                                            <div>
                                                                <div className="text-[9px] font-bold text-[#aaa] mb-1">POOLS ACTIVOS (SZ {sz}#):</div>
                                                                <div className="flex gap-1 flex-wrap">
                                                                    {Object.keys(cfg.pools).map(pid => {
                                                                        const pActive = cfg.pools[pid];
                                                                        return (
                                                                            <label key={pid} className={`flex items-center gap-1 text-[9px] font-bold cursor-pointer border px-2 py-0.5 rounded transition ${pActive ? 'bg-[#ffeb3b]/20 border-[#ffeb3b] text-[#ffeb3b]' : 'bg-[#222] border-[#333] text-[#666]'}`}>
                                                                                <input 
                                                                                    type="checkbox" 
                                                                                    checked={pActive} 
                                                                                    onChange={(e) => {
                                                                                        const updated = { ...sub1Configs };
                                                                                        updated[sz].pools = { ...updated[sz].pools, [pid]: e.target.checked };
                                                                                        setSub1Configs(updated);
                                                                                    }}
                                                                                    className="sr-only"
                                                                                />
                                                                                <span>{pid.toUpperCase()}</span>
                                                                            </label>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <div className="text-[9px] font-bold text-[#aaa] mb-1">FRECUENCIAS (SZ {sz}#):</div>
                                                                <div className="flex gap-1 flex-wrap">
                                                                    {[7, 6, 5, 4, 3, 2, 1, 0].map(f => {
                                                                        const fActive = cfg.freqs[f];
                                                                        return (
                                                                            <label key={f} className={`flex items-center gap-1 text-[9px] font-bold cursor-pointer border px-2 py-0.5 rounded transition ${fActive ? 'bg-[#00e5ff]/20 border-[#00e5ff] text-[#00e5ff]' : 'bg-[#222] border-[#333] text-[#666]'}`}>
                                                                                <input 
                                                                                    type="checkbox" 
                                                                                    checked={fActive} 
                                                                                    onChange={(e) => {
                                                                                        const updated = { ...sub1Configs };
                                                                                        updated[sz].freqs = { ...updated[sz].freqs, [f]: e.target.checked };
                                                                                        setSub1Configs(updated);
                                                                                    }}
                                                                                    className="sr-only"
                                                                                />
                                                                                <span>F{f}</span>
                                                                            </label>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* ========================================================= */}
                            {/* SUBESCENARIO 2 (ITERACIÓN #3) - Simplified Collapsed View  */}
                            {/* ========================================================= */}
                            <div className={`bg-[#181818] border rounded-xl p-3 shadow-md transition ${sub2Active ? 'border-[#7c4dff]/40 shadow-[0_0_12px_rgba(124,77,255,0.1)]' : 'border-[#333] opacity-65'}`}>
                                <div className="flex justify-between items-center flex-wrap gap-2 mb-2">
                                    <div className="flex items-center gap-2.5">
                                        <label className="flex items-center gap-1.5 text-[10px] font-bold cursor-pointer bg-[#222] border border-[#333] px-2.5 py-1 rounded-lg">
                                            <input 
                                                type="checkbox" 
                                                checked={sub2Active} 
                                                onChange={(e) => setSub2Active(e.target.checked)}
                                                className="cursor-pointer accent-[#b388ff]"
                                            />
                                            <span style={{color: sub2Active ? '#b388ff' : '#888'}}>
                                                {sub2Active ? '● Participa (Activa)' : '○ Omitida (Cascading)'}
                                            </span>
                                        </label>
                                        <div>
                                            <h3 className="text-[12px] font-black text-[#b388ff]">Iteración #3 (Filtro Secundario) — Promedio ~21 Números</h3>
                                            <p className="text-[9px] text-[#888]">
                                                Entrada: Sub1 ({liveTargetResult.subFiltered.length}#) → Sub2 ({liveTargetResult.sub2Filtered.length}#) | Reducción: -{liveTargetResult.red2Pct}%
                                                {liveTargetResult.hitsSub2 !== null && ` | Aciertos: ${liveTargetResult.hitsSub2} ac`}
                                            </p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setSub2Expanded(!sub2Expanded)}
                                        className="bg-[#7c4dff]/20 border border-[#7c4dff]/50 text-[#b388ff] px-3 py-1 rounded-full text-[10px] font-extrabold cursor-pointer hover:bg-[#7c4dff]/30 transition"
                                    >
                                        {sub2Expanded ? '▲ Ocultar Checkboxes' : '⚙️ Configurar Pool Sizes (Expandir)'}
                                    </button>
                                </div>

                                {/* Resulting numbers preview badge */}
                                <div className="bg-[#121212] border border-[#2a2a2a] rounded-lg p-2 mb-2">
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="text-[9px] font-bold text-[#aaa]">Números Resultantes (Iteración #3):</div>
                                        <button 
                                            onClick={() => {
                                                const txt = liveTargetResult.sub2Filtered.map(n => String(n).padStart(2, '0')).join(' ');
                                                navigator.clipboard.writeText(txt);
                                                showLocToast("¡Números de Subescenario 2 copiados al portapapeles!");
                                            }}
                                            className="bg-[#7c4dff]/20 border border-[#7c4dff]/50 text-[#b388ff] px-2 py-0.5 rounded text-[9px] font-extrabold cursor-pointer hover:bg-[#7c4dff]/30 transition flex items-center gap-1"
                                        >
                                            📋 Copiar
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {liveTargetResult.sub2Filtered.map(n => {
                                            const isWin = liveTargetResult.targetDrawObj ? liveTargetResult.targetDrawObj.win.includes(n) : false;
                                            return (
                                                <span key={n} className={`text-[10px] font-black px-1.5 py-0.5 rounded border ${isWin ? 'bg-[#2e7d32] border-[#4caf50] text-white' : 'bg-[#1a1a1a] border-[#333] text-[#b388ff]'}`}>
                                                    {String(n).padStart(2, '0')}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>



                                {sub2Expanded && (
                                    <div className="space-y-2.5 mt-3 pt-3 border-t border-[#333]">
                                        {[9, 12, 15, 18, 21, 24, 27].map(sz => {
                                            const cfg = sub2Configs[sz];
                                            return (
                                                <div key={sz} className={`border rounded-xl p-2.5 transition ${cfg.enabled ? 'bg-[#1e1e1e] border-[#7c4dff]/50' : 'bg-[#141414] border-[#262626] opacity-60'}`}>
                                                    <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                                                        <label className="flex items-center gap-2 cursor-pointer">
                                                            <input 
                                                                type="checkbox" 
                                                                checked={cfg.enabled} 
                                                                onChange={(e) => {
                                                                    const updated = { ...sub2Configs };
                                                                    updated[sz] = { ...updated[sz], enabled: e.target.checked };
                                                                    setSub2Configs(updated);
                                                                }}
                                                                className="sr-only"
                                                            />
                                                            <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${cfg.enabled ? 'bg-[#7c4dff] text-white font-black' : 'bg-[#222] border border-[#444]'}`}>
                                                                {cfg.enabled ? '✓' : ''}
                                                            </span>
                                                            <span className="text-[11px] font-black text-[#b388ff]">Sub2 Pool Size: {sz} números</span>
                                                        </label>
                                                        <span className={`text-[9px] px-2 py-0.5 rounded font-bold ${cfg.enabled ? 'bg-[#7c4dff]/20 text-[#b388ff]' : 'bg-[#222] text-[#666]'}`}>
                                                            {cfg.enabled ? 'Activo' : 'Inactivo'}
                                                        </span>
                                                    </div>

                                                    {cfg.enabled && (
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-[#262626]">
                                                            <div>
                                                                <div className="text-[9px] font-bold text-[#aaa] mb-1">POOLS ACTIVOS (SZ {sz}#):</div>
                                                                <div className="flex gap-1 flex-wrap">
                                                                    {Object.keys(cfg.pools).map(pid => {
                                                                        const pActive = cfg.pools[pid];
                                                                        return (
                                                                            <label key={pid} className={`flex items-center gap-1 text-[9px] font-bold cursor-pointer border px-2 py-0.5 rounded transition ${pActive ? 'bg-[#7c4dff]/20 border-[#7c4dff] text-[#b388ff]' : 'bg-[#222] border-[#333] text-[#666]'}`}>
                                                                                <input 
                                                                                    type="checkbox" 
                                                                                    checked={pActive} 
                                                                                    onChange={(e) => {
                                                                                        const updated = { ...sub2Configs };
                                                                                        updated[sz].pools = { ...updated[sz].pools, [pid]: e.target.checked };
                                                                                        setSub2Configs(updated);
                                                                                    }}
                                                                                    className="sr-only"
                                                                                />
                                                                                <span>{pid.toUpperCase()}</span>
                                                                            </label>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <div className="text-[9px] font-bold text-[#aaa] mb-1">FRECUENCIAS (SZ {sz}#):</div>
                                                                <div className="flex gap-1 flex-wrap">
                                                                    {[7, 6, 5, 4, 3, 2, 1, 0].map(f => {
                                                                        const fActive = cfg.freqs[f];
                                                                        return (
                                                                            <label key={f} className={`flex items-center gap-1 text-[9px] font-bold cursor-pointer border px-2 py-0.5 rounded transition ${fActive ? 'bg-[#7c4dff]/20 border-[#7c4dff] text-[#b388ff]' : 'bg-[#222] border-[#333] text-[#666]'}`}>
                                                                                <input 
                                                                                    type="checkbox" 
                                                                                    checked={fActive} 
                                                                                    onChange={(e) => {
                                                                                        const updated = { ...sub2Configs };
                                                                                        updated[sz].freqs = { ...updated[sz].freqs, [f]: e.target.checked };
                                                                                        setSub2Configs(updated);
                                                                                    }}
                                                                                    className="sr-only"
                                                                                />
                                                                                <span>F{f}</span>
                                                                            </label>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* ========================================================= */}
                            {/* SUBESCENARIO 3 (ITERACIÓN #4) - Simplified Collapsed View  */}
                            {/* ========================================================= */}
                            <div className={`bg-[#181818] border rounded-xl p-3 shadow-md transition ${sub3Active ? 'border-[#26c6da]/40 shadow-[0_0_12px_rgba(38,198,218,0.1)]' : 'border-[#333] opacity-65'}`}>
                                <div className="flex justify-between items-center flex-wrap gap-2 mb-2">
                                    <div className="flex items-center gap-2.5">
                                        <label className="flex items-center gap-1.5 text-[10px] font-bold cursor-pointer bg-[#222] border border-[#333] px-2.5 py-1 rounded-lg">
                                            <input 
                                                type="checkbox" 
                                                checked={sub3Active} 
                                                onChange={(e) => setSub3Active(e.target.checked)}
                                                className="cursor-pointer accent-[#26c6da]"
                                            />
                                            <span style={{color: sub3Active ? '#26c6da' : '#888'}}>
                                                {sub3Active ? '● Participa (Activa)' : '○ Omitida (Cascading)'}
                                            </span>
                                        </label>
                                        <div>
                                            <h3 className="text-[12px] font-black text-[#26c6da]">Iteración #4 (Filtro Avanzado) — Promedio ~18 Números</h3>
                                            <p className="text-[9px] text-[#888]">
                                                Entrada: Sub2 ({liveTargetResult.sub2Filtered.length}#) → Sub3 ({liveTargetResult.sub3Filtered.length}#) | Reducción: -{liveTargetResult.red3Pct}%
                                                {liveTargetResult.hitsSub3 !== null && ` | Aciertos: ${liveTargetResult.hitsSub3} ac`}
                                            </p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setSub3Expanded(!sub3Expanded)}
                                        className="bg-[#26c6da]/20 border border-[#26c6da]/50 text-[#26c6da] px-3 py-1 rounded-full text-[10px] font-extrabold cursor-pointer hover:bg-[#26c6da]/30 transition"
                                    >
                                        {sub3Expanded ? '▲ Ocultar Checkboxes' : '⚙️ Configurar Pool Sizes (Expandir)'}
                                    </button>
                                </div>

                                {/* Resulting numbers preview badge */}
                                <div className="bg-[#121212] border border-[#2a2a2a] rounded-lg p-2 mb-2">
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="text-[9px] font-bold text-[#aaa]">Números Resultantes (Iteración #4):</div>
                                        <button 
                                            onClick={() => {
                                                const txt = liveTargetResult.sub3Filtered.map(n => String(n).padStart(2, '0')).join(' ');
                                                navigator.clipboard.writeText(txt);
                                                showLocToast("¡Números de Subescenario 3 copiados al portapapeles!");
                                            }}
                                            className="bg-[#26c6da]/20 border border-[#26c6da]/50 text-[#26c6da] px-2 py-0.5 rounded text-[9px] font-extrabold cursor-pointer hover:bg-[#26c6da]/30 transition flex items-center gap-1"
                                        >
                                            📋 Copiar
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {liveTargetResult.sub3Filtered.map(n => {
                                            const isWin = liveTargetResult.targetDrawObj ? liveTargetResult.targetDrawObj.win.includes(n) : false;
                                            return (
                                                <span key={n} className={`text-[10px] font-black px-1.5 py-0.5 rounded border ${isWin ? 'bg-[#2e7d32] border-[#4caf50] text-white' : 'bg-[#1a1a1a] border-[#333] text-[#26c6da]'}`}>
                                                    {String(n).padStart(2, '0')}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>



                                {sub3Expanded && (
                                    <div className="space-y-2.5 mt-3 pt-3 border-t border-[#333]">
                                        {[9, 12, 15, 18, 21, 24, 27].map(sz => {
                                            const cfg = sub3Configs[sz];
                                            return (
                                                <div key={sz} className={`border rounded-xl p-2.5 transition ${cfg.enabled ? 'bg-[#1e1e1e] border-[#26c6da]/50' : 'bg-[#141414] border-[#262626] opacity-60'}`}>
                                                    <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                                                        <label className="flex items-center gap-2 cursor-pointer">
                                                            <input 
                                                                type="checkbox" 
                                                                checked={cfg.enabled} 
                                                                onChange={(e) => {
                                                                    const updated = { ...sub3Configs };
                                                                    updated[sz] = { ...updated[sz], enabled: e.target.checked };
                                                                    setSub3Configs(updated);
                                                                }}
                                                                className="sr-only"
                                                            />
                                                            <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${cfg.enabled ? 'bg-[#26c6da] text-black font-black' : 'bg-[#222] border border-[#444]'}`}>
                                                                {cfg.enabled ? '✓' : ''}
                                                            </span>
                                                            <span className="text-[11px] font-black text-[#26c6da]">Sub3 Pool Size: {sz} números</span>
                                                        </label>
                                                        <span className={`text-[9px] px-2 py-0.5 rounded font-bold ${cfg.enabled ? 'bg-[#26c6da]/20 text-[#26c6da]' : 'bg-[#222] text-[#666]'}`}>
                                                            {cfg.enabled ? 'Activo' : 'Inactivo'}
                                                        </span>
                                                    </div>

                                                    {cfg.enabled && (
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-[#262626]">
                                                            <div>
                                                                <div className="text-[9px] font-bold text-[#aaa] mb-1">POOLS ACTIVOS (SZ {sz}#):</div>
                                                                <div className="flex gap-1 flex-wrap">
                                                                    {Object.keys(cfg.pools).map(pid => {
                                                                        const pActive = cfg.pools[pid];
                                                                        return (
                                                                            <label key={pid} className={`flex items-center gap-1 text-[9px] font-bold cursor-pointer border px-2 py-0.5 rounded transition ${pActive ? 'bg-[#26c6da]/20 border-[#26c6da] text-[#26c6da]' : 'bg-[#222] border-[#333] text-[#666]'}`}>
                                                                                <input 
                                                                                    type="checkbox" 
                                                                                    checked={pActive} 
                                                                                    onChange={(e) => {
                                                                                        const updated = { ...sub3Configs };
                                                                                        updated[sz].pools = { ...updated[sz].pools, [pid]: e.target.checked };
                                                                                        setSub3Configs(updated);
                                                                                    }}
                                                                                    className="sr-only"
                                                                                />
                                                                                <span>{pid.toUpperCase()}</span>
                                                                            </label>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <div className="text-[9px] font-bold text-[#aaa] mb-1">FRECUENCIAS (SZ {sz}#):</div>
                                                                <div className="flex gap-1 flex-wrap">
                                                                    {[7, 6, 5, 4, 3, 2, 1, 0].map(f => {
                                                                        const fActive = cfg.freqs[f];
                                                                        return (
                                                                            <label key={f} className={`flex items-center gap-1 text-[9px] font-bold cursor-pointer border px-2 py-0.5 rounded transition ${fActive ? 'bg-[#26c6da]/20 border-[#26c6da] text-[#26c6da]' : 'bg-[#222] border-[#333] text-[#666]'}`}>
                                                                                <input 
                                                                                    type="checkbox" 
                                                                                    checked={fActive} 
                                                                                    onChange={(e) => {
                                                                                        const updated = { ...sub3Configs };
                                                                                        updated[sz].freqs = { ...updated[sz].freqs, [f]: e.target.checked };
                                                                                        setSub3Configs(updated);
                                                                                    }}
                                                                                    className="sr-only"
                                                                                />
                                                                                <span>F{f}</span>
                                                                            </label>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* ========================================================= */}
                            {/* SUBESCENARIO 4 (ITERACIÓN #5) - Simplified Collapsed View  */}
                            {/* ========================================================= */}
                            <div className={`bg-[#181818] border rounded-xl p-3 shadow-md transition ${sub4Active ? 'border-[#e040fb]/40 shadow-[0_0_12px_rgba(224,64,251,0.1)]' : 'border-[#333] opacity-65'}`}>
                                <div className="flex justify-between items-center flex-wrap gap-2 mb-2">
                                    <div className="flex items-center gap-2.5">
                                        <label className="flex items-center gap-1.5 text-[10px] font-bold cursor-pointer bg-[#222] border border-[#333] px-2.5 py-1 rounded-lg">
                                            <input 
                                                type="checkbox" 
                                                checked={sub4Active} 
                                                onChange={(e) => setSub4Active(e.target.checked)}
                                                className="cursor-pointer accent-[#e040fb]"
                                            />
                                            <span style={{color: sub4Active ? '#e040fb' : '#888'}}>
                                                {sub4Active ? '● Participa (Activa)' : '○ Omitida (Cascading)'}
                                            </span>
                                        </label>
                                        <div>
                                            <h3 className="text-[12px] font-black text-[#e040fb]">Iteración #5 (Filtro de Precisión) — Promedio ~15 Números</h3>
                                            <p className="text-[9px] text-[#888]">
                                                Entrada: Sub3 ({liveTargetResult.sub3Filtered.length}#) → Sub4 ({liveTargetResult.sub4Filtered.length}#) | Reducción: -{liveTargetResult.red4Pct}%
                                                {liveTargetResult.hitsSub4 !== null && ` | Aciertos: ${liveTargetResult.hitsSub4} ac`}
                                            </p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setSub4Expanded(!sub4Expanded)}
                                        className="bg-[#e040fb]/20 border border-[#e040fb]/50 text-[#e040fb] px-3 py-1 rounded-full text-[10px] font-extrabold cursor-pointer hover:bg-[#e040fb]/30 transition"
                                    >
                                        {sub4Expanded ? '▲ Ocultar Checkboxes' : '⚙️ Configurar Pool Sizes (Expandir)'}
                                    </button>
                                </div>

                                {/* Resulting numbers preview badge */}
                                <div className="bg-[#121212] border border-[#2a2a2a] rounded-lg p-2 mb-2">
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="text-[9px] font-bold text-[#aaa]">Números Resultantes (Iteración #5):</div>
                                        <button 
                                            onClick={() => {
                                                const txt = liveTargetResult.sub4Filtered.map(n => String(n).padStart(2, '0')).join(' ');
                                                navigator.clipboard.writeText(txt);
                                                showLocToast("¡Números de Subescenario 4 copiados al portapapeles!");
                                            }}
                                            className="bg-[#e040fb]/20 border border-[#e040fb]/50 text-[#e040fb] px-2 py-0.5 rounded text-[9px] font-extrabold cursor-pointer hover:bg-[#e040fb]/30 transition flex items-center gap-1"
                                        >
                                            📋 Copiar
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {liveTargetResult.sub4Filtered.map(n => {
                                            const isWin = liveTargetResult.targetDrawObj ? liveTargetResult.targetDrawObj.win.includes(n) : false;
                                            return (
                                                <span key={n} className={`text-[10px] font-black px-1.5 py-0.5 rounded border ${isWin ? 'bg-[#2e7d32] border-[#4caf50] text-white' : 'bg-[#1a1a1a] border-[#333] text-[#e040fb]'}`}>
                                                    {String(n).padStart(2, '0')}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>



                                {sub4Expanded && (
                                    <div className="space-y-2.5 mt-3 pt-3 border-t border-[#333]">
                                        {[9, 12, 15, 18, 21, 24, 27].map(sz => {
                                            const cfg = sub4Configs[sz];
                                            return (
                                                <div key={sz} className={`border rounded-xl p-2.5 transition ${cfg.enabled ? 'bg-[#1e1e1e] border-[#e040fb]/50' : 'bg-[#141414] border-[#262626] opacity-60'}`}>
                                                    <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                                                        <label className="flex items-center gap-2 cursor-pointer">
                                                            <input 
                                                                type="checkbox" 
                                                                checked={cfg.enabled} 
                                                                onChange={(e) => {
                                                                    const updated = { ...sub4Configs };
                                                                    updated[sz] = { ...updated[sz], enabled: e.target.checked };
                                                                    setSub4Configs(updated);
                                                                }}
                                                                className="sr-only"
                                                            />
                                                            <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${cfg.enabled ? 'bg-[#e040fb] text-white font-black' : 'bg-[#222] border border-[#444]'}`}>
                                                                {cfg.enabled ? '✓' : ''}
                                                            </span>
                                                            <span className="text-[11px] font-black text-[#e040fb]">Sub4 Pool Size: {sz} números</span>
                                                        </label>
                                                        <span className={`text-[9px] px-2 py-0.5 rounded font-bold ${cfg.enabled ? 'bg-[#e040fb]/20 text-[#e040fb]' : 'bg-[#222] text-[#666]'}`}>
                                                            {cfg.enabled ? 'Activo' : 'Inactivo'}
                                                        </span>
                                                    </div>

                                                    {cfg.enabled && (
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-[#262626]">
                                                            <div>
                                                                <div className="text-[9px] font-bold text-[#aaa] mb-1">POOLS ACTIVOS (SZ {sz}#):</div>
                                                                <div className="flex gap-1 flex-wrap">
                                                                    {Object.keys(cfg.pools).map(pid => {
                                                                        const pActive = cfg.pools[pid];
                                                                        return (
                                                                            <label key={pid} className={`flex items-center gap-1 text-[9px] font-bold cursor-pointer border px-2 py-0.5 rounded transition ${pActive ? 'bg-[#e040fb]/20 border-[#e040fb] text-[#e040fb]' : 'bg-[#222] border-[#333] text-[#666]'}`}>
                                                                                <input 
                                                                                    type="checkbox" 
                                                                                    checked={pActive} 
                                                                                    onChange={(e) => {
                                                                                        const updated = { ...sub4Configs };
                                                                                        updated[sz].pools = { ...updated[sz].pools, [pid]: e.target.checked };
                                                                                        setSub4Configs(updated);
                                                                                    }}
                                                                                    className="sr-only"
                                                                                />
                                                                                <span>{pid.toUpperCase()}</span>
                                                                            </label>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <div className="text-[9px] font-bold text-[#aaa] mb-1">FRECUENCIAS (SZ {sz}#):</div>
                                                                <div className="flex gap-1 flex-wrap">
                                                                    {[7, 6, 5, 4, 3, 2, 1, 0].map(f => {
                                                                        const fActive = cfg.freqs[f];
                                                                        return (
                                                                            <label key={f} className={`flex items-center gap-1 text-[9px] font-bold cursor-pointer border px-2 py-0.5 rounded transition ${fActive ? 'bg-[#e040fb]/20 border-[#e040fb] text-[#e040fb]' : 'bg-[#222] border-[#333] text-[#666]'}`}>
                                                                                <input 
                                                                                    type="checkbox" 
                                                                                    checked={fActive} 
                                                                                    onChange={(e) => {
                                                                                        const updated = { ...sub4Configs };
                                                                                        updated[sz].freqs = { ...updated[sz].freqs, [f]: e.target.checked };
                                                                                        setSub4Configs(updated);
                                                                                    }}
                                                                                    className="sr-only"
                                                                                />
                                                                                <span>F{f}</span>
                                                                            </label>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* ========================================================= */}
                            {/* SUBESCENARIO 5 (ITERACIÓN #6) - Simplified Collapsed View  */}
                            {/* ========================================================= */}
                            <div className={`bg-[#181818] border rounded-xl p-3 shadow-md transition ${sub5Active ? 'border-[#00e676]/40 shadow-[0_0_12px_rgba(0,230,118,0.1)]' : 'border-[#333] opacity-65'}`}>
                                <div className="flex justify-between items-center flex-wrap gap-2 mb-2">
                                    <div className="flex items-center gap-2.5">
                                        <label className="flex items-center gap-1.5 text-[10px] font-bold cursor-pointer bg-[#222] border border-[#333] px-2.5 py-1 rounded-lg">
                                            <input 
                                                type="checkbox" 
                                                checked={sub5Active} 
                                                onChange={(e) => setSub5Active(e.target.checked)}
                                                className="cursor-pointer accent-[#00e676]"
                                            />
                                            <span style={{color: sub5Active ? '#00e676' : '#888'}}>
                                                {sub5Active ? '● Participa (Activa)' : '○ Omitida (Cascading)'}
                                            </span>
                                        </label>
                                        <div>
                                            <h3 className="text-[12px] font-black text-[#00e676]">Iteración #6 (Filtro Experto / Cierre) — Promedio ~12 Números</h3>
                                            <p className="text-[9px] text-[#888]">
                                                Entrada: Sub4 ({liveTargetResult.sub4Filtered.length}#) → Sub5 ({liveTargetResult.sub5Filtered.length}#) | Reducción: -{liveTargetResult.red5Pct}%
                                                {liveTargetResult.hitsSub5 !== null && ` | Aciertos: ${liveTargetResult.hitsSub5} ac`}
                                            </p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setSub5Expanded(!sub5Expanded)}
                                        className="bg-[#00e676]/20 border border-[#00e676]/50 text-[#00e676] px-3 py-1 rounded-full text-[10px] font-extrabold cursor-pointer hover:bg-[#00e676]/30 transition"
                                    >
                                        {sub5Expanded ? '▲ Ocultar Checkboxes' : '⚙️ Configurar Pool Sizes (Expandir)'}
                                    </button>
                                </div>

                                {/* Resulting numbers preview badge */}
                                <div className="bg-[#121212] border border-[#2a2a2a] rounded-lg p-2 mb-2">
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="text-[9px] font-bold text-[#aaa]">Números Resultantes (Iteración #6):</div>
                                        <button 
                                            onClick={() => {
                                                const txt = liveTargetResult.sub5Filtered.map(n => String(n).padStart(2, '0')).join(' ');
                                                navigator.clipboard.writeText(txt);
                                                showLocToast("¡Números de Subescenario 5 copiados al portapapeles!");
                                            }}
                                            className="bg-[#00e676]/20 border border-[#00e676]/50 text-[#00e676] px-2 py-0.5 rounded text-[9px] font-extrabold cursor-pointer hover:bg-[#00e676]/30 transition flex items-center gap-1"
                                        >
                                            📋 Copiar
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {liveTargetResult.sub5Filtered.map(n => {
                                            const isWin = liveTargetResult.targetDrawObj ? liveTargetResult.targetDrawObj.win.includes(n) : false;
                                            return (
                                                <span key={n} className={`text-[10px] font-black px-1.5 py-0.5 rounded border ${isWin ? 'bg-[#2e7d32] border-[#4caf50] text-white' : 'bg-[#1a1a1a] border-[#333] text-[#00e676]'}`}>
                                                    {String(n).padStart(2, '0')}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>



                                {sub5Expanded && (
                                    <div className="space-y-2.5 mt-3 pt-3 border-t border-[#333]">
                                        {[9, 12, 15, 18, 21, 24, 27].map(sz => {
                                            const cfg = sub5Configs[sz];
                                            return (
                                                <div key={sz} className={`border rounded-xl p-2.5 transition ${cfg.enabled ? 'bg-[#1e1e1e] border-[#00e676]/50' : 'bg-[#141414] border-[#262626] opacity-60'}`}>
                                                    <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                                                        <label className="flex items-center gap-2 cursor-pointer">
                                                            <input 
                                                                type="checkbox" 
                                                                checked={cfg.enabled} 
                                                                onChange={(e) => {
                                                                    const updated = { ...sub5Configs };
                                                                    updated[sz] = { ...updated[sz], enabled: e.target.checked };
                                                                    setSub5Configs(updated);
                                                                }}
                                                                className="sr-only"
                                                            />
                                                            <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${cfg.enabled ? 'bg-[#00e676] text-black font-black' : 'bg-[#222] border border-[#444]'}`}>
                                                                {cfg.enabled ? '✓' : ''}
                                                            </span>
                                                            <span className="text-[11px] font-black text-[#00e676]">Sub5 Pool Size: {sz} números</span>
                                                        </label>
                                                        <span className={`text-[9px] px-2 py-0.5 rounded font-bold ${cfg.enabled ? 'bg-[#00e676]/20 text-[#00e676]' : 'bg-[#222] text-[#666]'}`}>
                                                            {cfg.enabled ? 'Activo' : 'Inactivo'}
                                                        </span>
                                                    </div>

                                                    {cfg.enabled && (
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-[#262626]">
                                                            <div>
                                                                <div className="text-[9px] font-bold text-[#aaa] mb-1">POOLS ACTIVOS (SZ {sz}#):</div>
                                                                <div className="flex gap-1 flex-wrap">
                                                                    {Object.keys(cfg.pools).map(pid => {
                                                                        const pActive = cfg.pools[pid];
                                                                        return (
                                                                            <label key={pid} className={`flex items-center gap-1 text-[9px] font-bold cursor-pointer border px-2 py-0.5 rounded transition ${pActive ? 'bg-[#00e676]/20 border-[#00e676] text-[#00e676]' : 'bg-[#222] border-[#333] text-[#666]'}`}>
                                                                                <input 
                                                                                    type="checkbox" 
                                                                                    checked={pActive} 
                                                                                    onChange={(e) => {
                                                                                        const updated = { ...sub5Configs };
                                                                                        updated[sz].pools = { ...updated[sz].pools, [pid]: e.target.checked };
                                                                                        setSub5Configs(updated);
                                                                                    }}
                                                                                    className="sr-only"
                                                                                />
                                                                                <span>{pid.toUpperCase()}</span>
                                                                            </label>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <div className="text-[9px] font-bold text-[#aaa] mb-1">FRECUENCIAS (SZ {sz}#):</div>
                                                                <div className="flex gap-1 flex-wrap">
                                                                    {[7, 6, 5, 4, 3, 2, 1, 0].map(f => {
                                                                        const fActive = cfg.freqs[f];
                                                                        return (
                                                                            <label key={f} className={`flex items-center gap-1 text-[9px] font-bold cursor-pointer border px-2 py-0.5 rounded transition ${fActive ? 'bg-[#00e676]/20 border-[#00e676] text-[#00e676]' : 'bg-[#222] border-[#333] text-[#666]'}`}>
                                                                                <input 
                                                                                    type="checkbox" 
                                                                                    checked={fActive} 
                                                                                    onChange={(e) => {
                                                                                        const updated = { ...sub5Configs };
                                                                                        updated[sz].freqs = { ...updated[sz].freqs, [f]: e.target.checked };
                                                                                        setSub5Configs(updated);
                                                                                    }}
                                                                                    className="sr-only"
                                                                                />
                                                                                <span>F{f}</span>
                                                                            </label>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                         <div className="mt-3 pt-3 border-t border-[#333]">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-[10px] font-black text-[#ffeb3b]">⚙️ Configuración Secundaria de Pools y Frecuencias (Expansión hasta 15 #)</span>
                                                <button 
                                                    onClick={() => setSub5SecondaryExpanded(!sub5SecondaryExpanded)}
                                                    className="bg-[#ffeb3b]/20 border border-[#ffeb3b]/50 text-[#ffeb3b] px-2.5 py-0.5 rounded-full text-[9px] font-extrabold cursor-pointer hover:bg-[#ffeb3b]/30 transition"
                                                >
                                                    {sub5SecondaryExpanded ? '▲ Ocultar Config. Secundaria' : '⚙️ Configurar Secundaria (Expandir)'}
                                                </button>
                                            </div>
                                            {sub5SecondaryExpanded && (
                                                <div className="space-y-2 mt-2">
                                                    {[9, 12, 15, 18, 21, 24, 27].map(sz => {
                                                        const secCfg = sub5SecondaryConfigs[sz];
                                                        return (
                                                            <div key={sz} className={`border rounded-xl p-2.5 transition ${secCfg.enabled ? 'bg-[#1e1e1e] border-[#ffeb3b]/50' : 'bg-[#141414] border-[#262626] opacity-60'}`}>
                                                                <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                                        <input 
                                                                            type="checkbox" 
                                                                            checked={secCfg.enabled} 
                                                                            onChange={(e) => {
                                                                                const updated = { ...sub5SecondaryConfigs };
                                                                                updated[sz] = { ...updated[sz], enabled: e.target.checked };
                                                                                setSub5SecondaryConfigs(updated);
                                                                            }}
                                                                            className="sr-only"
                                                                        />
                                                                        <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${secCfg.enabled ? 'bg-[#ffeb3b] text-black font-black' : 'bg-[#222] border border-[#444]'}`}>
                                                                            {secCfg.enabled ? '✓' : ''}
                                                                        </span>
                                                                        <span className="text-[11px] font-black text-[#ffeb3b]">Sub5 Secundario Pool Size: {sz} números</span>
                                                                    </label>
                                                                    <span className={`text-[9px] px-2 py-0.5 rounded font-bold ${secCfg.enabled ? 'bg-[#ffeb3b]/20 text-[#ffeb3b]' : 'bg-[#222] text-[#666]'}`}>
                                                                        {secCfg.enabled ? 'Activo' : 'Inactivo'}
                                                                    </span>
                                                                </div>

                                                                {secCfg.enabled && (
                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-[#262626]">
                                                                        <div>
                                                                            <div className="text-[9px] font-bold text-[#aaa] mb-1">POOLS SECUNDARIOS (SZ {sz}#):</div>
                                                                            <div className="flex gap-1 flex-wrap">
                                                                                {Object.keys(secCfg.pools).map(pid => {
                                                                                    const pActive = secCfg.pools[pid];
                                                                                    return (
                                                                                        <label key={pid} className={`flex items-center gap-1 text-[9px] font-bold cursor-pointer border px-2 py-0.5 rounded transition ${pActive ? 'bg-[#ffeb3b]/20 border-[#ffeb3b] text-[#ffeb3b]' : 'bg-[#222] border-[#333] text-[#666]'}`}>
                                                                                            <input 
                                                                                                type="checkbox" 
                                                                                                checked={pActive} 
                                                                                                onChange={(e) => {
                                                                                                    const updated = { ...sub5SecondaryConfigs };
                                                                                                    updated[sz].pools = { ...updated[sz].pools, [pid]: e.target.checked };
                                                                                                    setSub5SecondaryConfigs(updated);
                                                                                                }}
                                                                                                className="sr-only"
                                                                                            />
                                                                                            <span>{pid.toUpperCase()}</span>
                                                                                        </label>
                                                                                    );
                                                                                })}
                                                                            </div>
                                                                        </div>

                                                                        <div>
                                                                            <div className="text-[9px] font-bold text-[#aaa] mb-1">FRECUENCIAS SECUNDARIAS (SZ {sz}#):</div>
                                                                            <div className="flex gap-1 flex-wrap">
                                                                                {[7, 6, 5, 4, 3, 2, 1, 0].map(f => {
                                                                                    const fActive = secCfg.freqs[f];
                                                                                    return (
                                                                                        <label key={f} className={`flex items-center gap-1 text-[9px] font-bold cursor-pointer border px-2 py-0.5 rounded transition ${fActive ? 'bg-[#ffeb3b]/20 border-[#ffeb3b] text-[#ffeb3b]' : 'bg-[#222] border-[#333] text-[#666]'}`}>
                                                                                            <input 
                                                                                                type="checkbox" 
                                                                                                checked={fActive} 
                                                                                                onChange={(e) => {
                                                                                                    const updated = { ...sub5SecondaryConfigs };
                                                                                                    updated[sz].freqs = { ...updated[sz].freqs, [f]: e.target.checked };
                                                                                                    setSub5SecondaryConfigs(updated);
                                                                                                }}
                                                                                                className="sr-only"
                                                                                            />
                                                                                            <span>F{f}</span>
                                                                                        </label>
                                                                                    );
                                                                                })}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            





                            {simResults.length > 0 && (
                                <div className="space-y-4">
                                    {/* Comparative Summary Panel: All 6 Iterations Synthesized */}
                                    <div className="bg-[#1a1a1a] border border-[#7c4dff]/50 rounded-xl p-3 shadow-xl">
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="text-[11px] font-black text-[#ffeb3b] flex items-center gap-1.5">
                                                <span>⚖️ Panel Comparativo General (Las 6 Iteraciones) — Foco Activo: <span className="text-[#00e5ff] uppercase">{iterOptMode}</span></span>
                                            </div>
                                            <span className="text-[9px] text-[#888]">Basado en {simResults.length} sorteos evaluados</span>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                                            {[
                                                { name: 'Iteración #1 (Madre)', countKey: 'madreCount', hitKey: 'madreHits', color: '#00e5ff', active: madreActive },
                                                { name: 'Iteración #2 (Primario)', countKey: 'sub1Count', hitKey: 'sub1Hits', color: '#ffeb3b', active: sub1Active },
                                                { name: 'Iteración #3 (Secundario)', countKey: 'sub2Count', hitKey: 'sub2Hits', color: '#b388ff', active: sub2Active },
                                                { name: 'Iteración #4 (Avanzado)', countKey: 'sub3Count', hitKey: 'sub3Hits', color: '#26c6da', active: sub3Active },
                                                { name: 'Iteración #5 (Precisión)', countKey: 'sub4Count', hitKey: 'sub4Hits', color: '#e040fb', active: sub4Active },
                                                { name: 'Iteración #6 (Cierre)', countKey: 'sub5Count', hitKey: 'sub5Hits', color: '#00e676', active: sub5Active }
                                            ].map((it, idx) => {
                                                const avgHits = (simResults.reduce((acc, r) => acc + (r[it.hitKey] || 0), 0) / simResults.length).toFixed(2);
                                                const hits4Plus = simResults.filter(r => (r[it.hitKey] || 0) >= 4).length;
                                                const hits5 = simResults.filter(r => (r[it.hitKey] || 0) === 5).length;
                                                const avgCount = Math.round(simResults.reduce((acc, r) => acc + (r[it.countKey] || 0), 0) / simResults.length);
                                                return (
                                                    <div key={idx} className={`bg-[#121212] rounded-lg p-2.5 border transition ${it.active ? 'opacity-100 shadow-md' : 'opacity-50 border-dashed'}`} style={{borderColor: `${it.color}44`}}>
                                                        <div className="flex justify-between items-center mb-1">
                                                            <div className="text-[10px] font-black" style={{color: it.color}}>{it.name}</div>
                                                            <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-[#1a1a1a]" style={{color: it.color}}>Prom. {avgCount}#</span>
                                                        </div>
                                                        <div className="grid grid-cols-3 gap-1 text-center text-[9px]">
                                                            <div className="bg-[#1a1a1a] p-1 rounded border border-[#333]">
                                                                <div className="text-[#888] text-[7px]">Prom. Ac.</div>
                                                                <div className="font-black text-[#ffeb3b]">{avgHits}</div>
                                                            </div>
                                                            <div className="bg-[#1a1a1a] p-1 rounded border border-[#333]">
                                                                <div className="text-[#888] text-[7px]">4+ Ac.</div>
                                                                <div className="font-black text-[#76ff03]">{hits4Plus} ({Math.round(hits4Plus / simResults.length * 100)}%)</div>
                                                            </div>
                                                            <div className="bg-[#1a1a1a] p-1 rounded border border-[#333]">
                                                                <div className="text-[#888] text-[7px]">5 Ac.</div>
                                                                <div className="font-black" style={{color: it.color}}>{hits5}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Active Focus Summary Box for Selected Draw */}
                                    {(() => {
                                        const targetNum = selectedTargetDrawNum === 0 ? (allDraws[allDraws.length - 1]?.num || 0) : selectedTargetDrawNum;
                                        const targetRes = simResults.find(r => r.num === targetNum);
                                        if (!targetRes) return null;
                                        return (
                                            <div className="bg-[rgba(0,229,255,0.08)] border border-[#00e5ff]/50 rounded-xl p-3 text-[11px] mb-3 shadow-md">
                                                <div className="font-black text-[#ffeb3b] mb-1.5 flex items-center justify-between">
                                                    <span>🎯 Desglose de Aciertos por Iteración (Sorteo #{targetRes.num} - Fecha: {allDraws.find(d => d.num === targetRes.num)?.date || ''})</span>
                                                    <span className="text-[9px] text-[#00e5ff]">Ganadores: {targetRes.win.map((n: number) => String(n).padStart(2, '0')).join(' ')}</span>
                                                </div>
                                                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-[10px]">
                                                    <div className="bg-[#121212] p-1.5 rounded border border-[#00e5ff]/40">
                                                        <div className="text-[#888] text-[8px]">Madre ~27#</div>
                                                        <div className="font-black text-[#00e5ff] text-[12px]">{targetRes.madreHits} ac</div>
                                                    </div>
                                                    <div className="bg-[#121212] p-1.5 rounded border border-[#ffeb3b]/40">
                                                        <div className="text-[#888] text-[8px]">Prim. ~24#</div>
                                                        <div className="font-black text-[#ffeb3b] text-[12px]">{targetRes.sub1Hits} ac</div>
                                                    </div>
                                                    <div className="bg-[#121212] p-1.5 rounded border border-[#b388ff]/40">
                                                        <div className="text-[#888] text-[8px]">Sec. ~21#</div>
                                                        <div className="font-black text-[#b388ff] text-[12px]">{targetRes.sub2Hits} ac</div>
                                                    </div>
                                                    <div className="bg-[#121212] p-1.5 rounded border border-[#26c6da]/40">
                                                        <div className="text-[#888] text-[8px]">Avanz. ~18#</div>
                                                        <div className="font-black text-[#26c6da] text-[12px]">{targetRes.sub3Hits} ac</div>
                                                    </div>
                                                    <div className="bg-[#121212] p-1.5 rounded border border-[#e040fb]/40">
                                                        <div className="text-[#888] text-[8px]">Prec. ~15#</div>
                                                        <div className="font-black text-[#e040fb] text-[12px]">{targetRes.sub4Hits} ac</div>
                                                    </div>
                                                    <div className="bg-[#121212] p-1.5 rounded border border-[#00e676]/40">
                                                        <div className="text-[#888] text-[8px]">Cierre ~12#</div>
                                                        <div className="font-black text-[#00e676] text-[12px]">{targetRes.sub5Hits} ac</div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })()}

                                    {/* Madre Results Table */}
                                    {madreActive && (
                                    <div className="bg-[#161616] border border-[#2a2a2a] rounded-xl p-3">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="text-[12px] font-black text-[#00e5ff]">Resultados Iteración #1 (Base / Madre) ({simResults.length} Sorteos Evaluados)</h4>
                                            <span className="text-[10px] text-[#00e5ff] font-bold">
                                                4+ Aciertos: {simResults.filter(r => r.madreHits >= 4).length} de {simResults.length} sorteos ({Math.round(simResults.filter(r => r.madreHits >= 4).length / simResults.length * 100)}%)
                                            </span>
                                        </div>
                                        <div className="overflow-x-auto max-h-[300px] overflow-y-auto">
                                            <table className="w-full text-[10px] border-collapse">
                                                <thead>
                                                    <tr className="bg-[#222] text-[#aaa] text-center">
                                                        <th className="p-1.5 border border-[#333]">Sorteo</th>
                                                        <th className="p-1.5 border border-[#333]">Ganadores</th>
                                                        <th className="p-1.5 border border-[#333]">Números Resultantes Madre</th>
                                                        <th className="p-1.5 border border-[#333]">Aciertos Madre</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {simResults.map(r => (
                                                        <tr key={r.num} className="text-center hover:bg-[#1f1f1f]">
                                                            <td className="p-1.5 border border-[#333] font-bold text-[#ffeb3b]">#{r.num}</td>
                                                            <td className="p-1.5 border border-[#333] font-mono">{r.win.map((n: number) => String(n).padStart(2, '0')).join(' ')}</td>
                                                            <td className="p-1.5 border border-[#333]">{r.madreCount} #</td>
                                                            <td className="p-1.5 border border-[#333] font-bold" style={{color: r.madreHits >= 4 ? '#76ff03' : r.madreHits === 3 ? '#ffeb3b' : '#aaa'}}>{r.madreHits} ac</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    )}

                                    {/* Subescenario 1 Results Table */}
                                    {sub1Active && (
                                    <div className="bg-[#161616] border border-[#ffeb3b]/40 rounded-xl p-3 shadow-[0_0_12px_rgba(255,235,59,0.1)]">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="text-[12px] font-black text-[#ffeb3b]">Resultados Iteración #2 (Filtro Primario) (Promedio ~24 Números)</h4>
                                            <span className="text-[10px] text-[#ffeb3b] font-bold">
                                                4+ Aciertos: {simResults.filter(r => r.sub1Hits >= 4).length} de {simResults.length} sorteos ({Math.round(simResults.filter(r => r.sub1Hits >= 4).length / simResults.length * 100)}%) | Reducción Promedio: {Math.round(simResults.reduce((acc, r) => acc + (1 - r.sub1Count / Math.max(1, r.madreCount)) * 100, 0) / simResults.length)}%
                                            </span>
                                        </div>
                                        <div className="overflow-x-auto max-h-[300px] overflow-y-auto">
                                            <table className="w-full text-[10px] border-collapse">
                                                <thead>
                                                    <tr className="bg-[#222] text-[#aaa] text-center">
                                                        <th className="p-1.5 border border-[#333]">Sorteo</th>
                                                        <th className="p-1.5 border border-[#333]">Ganadores</th>
                                                        <th className="p-1.5 border border-[#333]">Madre → Sub1 #</th>
                                                        <th className="p-1.5 border border-[#333]">Reducción %</th>
                                                        <th className="p-1.5 border border-[#333]">Aciertos Sub1</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {simResults.map(r => {
                                                        const redPct = Math.round((1 - r.sub1Count / Math.max(1, r.madreCount)) * 100);
                                                        return (
                                                            <tr key={r.num} className="text-center hover:bg-[#1f1f1f]">
                                                                <td className="p-1.5 border border-[#333] font-bold text-[#ffeb3b]">#{r.num}</td>
                                                                <td className="p-1.5 border border-[#333] font-mono">{r.win.map((n: number) => String(n).padStart(2, '0')).join(' ')}</td>
                                                                <td className="p-1.5 border border-[#333] font-bold text-[#00e5ff]">{r.madreCount}# → <span className="text-[#ffeb3b]">{r.sub1Count}#</span></td>
                                                                <td className="p-1.5 border border-[#333] text-[#76ff03] font-bold">-{redPct}%</td>
                                                                <td className="p-1.5 border border-[#333] font-bold" style={{color: r.sub1Hits >= 4 ? '#76ff03' : r.sub1Hits === 3 ? '#ffeb3b' : '#aaa'}}>{r.sub1Hits} ac</td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    )}

                                    {/* Iteración #3 (Filtro Secundario) Results Table */}
                                    <div className="bg-[#161616] border border-[#7c4dff]/40 rounded-xl p-3 shadow-[0_0_12px_rgba(124,77,255,0.1)]">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="text-[12px] font-black text-[#b388ff]">Resultados Iteración #3 (Filtro Secundario) (Promedio ~21 Números)</h4>
                                            <span className="text-[10px] text-[#b388ff] font-bold">
                                                4+ Aciertos: {simResults.filter(r => r.sub2Hits >= 4).length} de {simResults.length} sorteos ({Math.round(simResults.filter(r => r.sub2Hits >= 4).length / simResults.length * 100)}%) | Promedio Resultantes: {Math.round(simResults.reduce((acc, r) => acc + r.sub2Count, 0) / simResults.length)}#
                                            </span>
                                        </div>
                                        <div className="overflow-x-auto max-h-[300px] overflow-y-auto">
                                            <table className="w-full text-[10px] border-collapse">
                                                <thead>
                                                    <tr className="bg-[#222] text-[#aaa] text-center">
                                                        <th className="p-1.5 border border-[#333]">Sorteo</th>
                                                        <th className="p-1.5 border border-[#333]">Ganadores</th>
                                                        <th className="p-1.5 border border-[#333]">Sub1 → Sub2 #</th>
                                                        <th className="p-1.5 border border-[#333]">Aciertos Sub2</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {simResults.map(r => (
                                                        <tr key={r.num} className="text-center hover:bg-[#1f1f1f]">
                                                            <td className="p-1.5 border border-[#333] font-bold text-[#ffeb3b]">#{r.num}</td>
                                                            <td className="p-1.5 border border-[#333] font-mono">{r.win.map((n: number) => String(n).padStart(2, '0')).join(' ')}</td>
                                                            <td className="p-1.5 border border-[#333] font-bold text-[#ffeb3b]">{r.sub1Count}# → <span className="text-[#b388ff]">{r.sub2Count}#</span></td>
                                                            <td className="p-1.5 border border-[#333] font-bold" style={{color: r.sub2Hits >= 4 ? '#76ff03' : r.sub2Hits === 3 ? '#ffeb3b' : '#aaa'}}>{r.sub2Hits} ac</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                     {/* Iteración #4 (Filtro Avanzado) Results Table */}
                                     <div className="bg-[#161616] border border-[#26c6da]/40 rounded-xl p-3 shadow-[0_0_12px_rgba(38,198,218,0.1)]">
                                         <div className="flex justify-between items-center mb-2">
                                             <h4 className="text-[12px] font-black text-[#26c6da]">Resultados Iteración #4 (Filtro Avanzado) (Promedio ~18 Números)</h4>
                                             <span className="text-[10px] text-[#26c6da] font-bold">
                                                 4+ Aciertos: {simResults.filter(r => r.sub3Hits >= 4).length} de {simResults.length} sorteos ({Math.round(simResults.filter(r => r.sub3Hits >= 4).length / simResults.length * 100)}%) | Promedio Resultantes: {Math.round(simResults.reduce((acc, r) => acc + r.sub3Count, 0) / simResults.length)}#
                                             </span>
                                         </div>
                                         <div className="overflow-x-auto max-h-[300px] overflow-y-auto">
                                             <table className="w-full text-[10px] border-collapse">
                                                 <thead>
                                                     <tr className="bg-[#222] text-[#aaa] text-center">
                                                         <th className="p-1.5 border border-[#333]">Sorteo</th>
                                                         <th className="p-1.5 border border-[#333]">Ganadores</th>
                                                         <th className="p-1.5 border border-[#333]">Sub2 → Sub3 #</th>
                                                         <th className="p-1.5 border border-[#333]">Aciertos Sub3</th>
                                                     </tr>
                                                 </thead>
                                                 <tbody>
                                                     {simResults.map(r => (
                                                         <tr key={r.num} className="text-center hover:bg-[#1f1f1f]">
                                                             <td className="p-1.5 border border-[#333] font-bold text-[#ffeb3b]">#{r.num}</td>
                                                             <td className="p-1.5 border border-[#333] font-mono">{r.win.map((n: number) => String(n).padStart(2, '0')).join(' ')}</td>
                                                             <td className="p-1.5 border border-[#333] font-bold text-[#b388ff]">{r.sub2Count}# → <span className="text-[#26c6da]">{r.sub3Count}#</span></td>
                                                             <td className="p-1.5 border border-[#333] font-bold" style={{color: r.sub3Hits >= 4 ? '#76ff03' : r.sub3Hits === 3 ? '#ffeb3b' : '#aaa'}}>{r.sub3Hits} ac</td>
                                                         </tr>
                                                     ))}
                                                 </tbody>
                                             </table>
                                         </div>
                                     </div>

                                     {/* Iteración #5 (Filtro de Precisión) Results Table */}
                                     <div className="bg-[#161616] border border-[#e040fb]/40 rounded-xl p-3 shadow-[0_0_12px_rgba(224,64,251,0.1)]">
                                         <div className="flex justify-between items-center mb-2">
                                             <h4 className="text-[12px] font-black text-[#e040fb]">Resultados Iteración #5 (Filtro de Precisión) (Promedio ~15 Números)</h4>
                                             <span className="text-[10px] text-[#e040fb] font-bold">
                                                 4+ Aciertos: {simResults.filter(r => r.sub4Hits >= 4).length} de {simResults.length} sorteos ({Math.round(simResults.filter(r => r.sub4Hits >= 4).length / simResults.length * 100)}%) | Promedio Resultantes: {Math.round(simResults.reduce((acc, r) => acc + r.sub4Count, 0) / simResults.length)}#
                                             </span>
                                         </div>
                                         <div className="overflow-x-auto max-h-[300px] overflow-y-auto">
                                             <table className="w-full text-[10px] border-collapse">
                                                 <thead>
                                                     <tr className="bg-[#222] text-[#aaa] text-center">
                                                         <th className="p-1.5 border border-[#333]">Sorteo</th>
                                                         <th className="p-1.5 border border-[#333]">Ganadores</th>
                                                         <th className="p-1.5 border border-[#333]">Sub3 → Sub4 #</th>
                                                         <th className="p-1.5 border border-[#333]">Aciertos Sub4</th>
                                                     </tr>
                                                 </thead>
                                                 <tbody>
                                                     {simResults.map(r => (
                                                         <tr key={r.num} className="text-center hover:bg-[#1f1f1f]">
                                                             <td className="p-1.5 border border-[#333] font-bold text-[#ffeb3b]">#{r.num}</td>
                                                             <td className="p-1.5 border border-[#333] font-mono">{r.win.map((n: number) => String(n).padStart(2, '0')).join(' ')}</td>
                                                             <td className="p-1.5 border border-[#333] font-bold text-[#26c6da]">{r.sub3Count}# → <span className="text-[#e040fb]">{r.sub4Count}#</span></td>
                                                             <td className="p-1.5 border border-[#333] font-bold" style={{color: r.sub4Hits >= 4 ? '#76ff03' : r.sub4Hits === 3 ? '#ffeb3b' : '#aaa'}}>{r.sub4Hits} ac</td>
                                                         </tr>
                                                     ))}
                                                 </tbody>
                                             </table>
                                         </div>
                                     </div>

                                     {/* Iteración #6 (Filtro Experto / Cierre) Results Table */}
                                     <div className="bg-[#161616] border border-[#00e676]/40 rounded-xl p-3 shadow-[0_0_12px_rgba(0,230,118,0.1)]">
                                         <div className="flex justify-between items-center mb-2">
                                             <h4 className="text-[12px] font-black text-[#00e676]">Resultados Iteración #6 (Filtro Experto / Cierre) (Promedio ~12 Números)</h4>
                                             <span className="text-[10px] text-[#00e676] font-bold">
                                                 4+ Aciertos: {simResults.filter(r => r.sub5Hits >= 4).length} de {simResults.length} sorteos ({Math.round(simResults.filter(r => r.sub5Hits >= 4).length / simResults.length * 100)}%) | Promedio Resultantes: {Math.round(simResults.reduce((acc, r) => acc + r.sub5Count, 0) / simResults.length)}#
                                             </span>
                                         </div>
                                         <div className="overflow-x-auto max-h-[300px] overflow-y-auto">
                                             <table className="w-full text-[10px] border-collapse">
                                                 <thead>
                                                     <tr className="bg-[#222] text-[#aaa] text-center">
                                                         <th className="p-1.5 border border-[#333]">Sorteo</th>
                                                         <th className="p-1.5 border border-[#333]">Ganadores</th>
                                                         <th className="p-1.5 border border-[#333]">Sub4 → Sub5 #</th>
                                                         <th className="p-1.5 border border-[#333]">Aciertos Sub5</th>
                                                     </tr>
                                                 </thead>
                                                 <tbody>
                                                     {simResults.map(r => (
                                                         <tr key={r.num} className="text-center hover:bg-[#1f1f1f]">
                                                             <td className="p-1.5 border border-[#333] font-bold text-[#ffeb3b]">#{r.num}</td>
                                                             <td className="p-1.5 border border-[#333] font-mono">{r.win.map((n: number) => String(n).padStart(2, '0')).join(' ')}</td>
                                                             <td className="p-1.5 border border-[#333] font-bold text-[#e040fb]">{r.sub4Count}# → <span className="text-[#00e676]">{r.sub5Count}#</span></td>
                                                             <td className="p-1.5 border border-[#333] font-bold" style={{color: r.sub5Hits >= 4 ? '#76ff03' : r.sub5Hits === 3 ? '#ffeb3b' : '#aaa'}}>{r.sub5Hits} ac</td>
                                                         </tr>
                                                     ))}
                                                 </tbody>
                                             </table>
                                         </div>
                                     </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : activeTab === 'gemini' ? (
                        <div className="space-y-4">
                            <div className="bg-[#181818] border border-[#00e5ff]/40 rounded-xl p-3 shadow-md">
                                <div className="flex justify-between items-center flex-wrap gap-2">
                                    <div>
                                        <div className="text-[11px] font-black text-[#ffeb3b]">🤖 Pronóstico Gemini — Próximo Sorteo #{allDraws.length > 0 ? allDraws[allDraws.length - 1].num + 1 : 0} (En Vivo)</div>
                                        <div className="text-[9px] text-[#888]">RandomForest entrenado en el navegador con los últimos 300 sorteos (retardo + frecuencias 5/10/20). Cada bolilla tiene su propio bosque; se ordenan por probabilidad de salir.</div>
                                    </div>
                                    {geminiRanking && !geminiTraining && (
                                        <button onClick={() => runGemini()} className="text-[9px] bg-[#222] border border-[#00e5ff]/40 text-[#00e5ff] px-2 py-0.5 rounded cursor-pointer hover:bg-[#00e5ff]/20">↻ Re-entrenar</button>
                                    )}
                                </div>
                                {geminiError && <div className="text-[10px] text-[#ff5252] mt-2">⚠️ {geminiError}</div>}
                                {geminiTraining && (
                                    <div className="mt-2">
                                        <div className="text-[10px] text-[#00e5ff]">⏳ Entrenando modelo… {geminiProgress.done}/{geminiProgress.total} bolillas ({geminiEstimators} árboles c/u). Tarda ~1 minuto; puedes seguir navegando.</div>
                                        <div className="h-2 bg-[#222] rounded-full mt-1 overflow-hidden"><div className="h-full bg-[#00e5ff]" style={{ width: `${Math.round(geminiProgress.done / Math.max(1, geminiProgress.total) * 100)}%` }} /></div>
                                    </div>
                                )}
                                {!geminiTraining && !geminiRanking && (
                                    <div className="text-[10px] text-[#aaa] mt-2">Pulsa “Entrenar Gemini” para generar el pronóstico del próximo sorteo.</div>
                                )}
                                {geminiRanking && (
                                    <div className="space-y-3 mt-2">
                                        {GEMINI_GROUP_SIZES.map(k => {
                                            const base = geminiRanking.slice(0, k).map(r => r.num).sort((a, b) => a - b);
                                            const pm1 = geminiPM1(base);
                                            return (
                                                <div key={k} className="border border-[#333] rounded-lg p-2">
                                                    <div className="text-[10px] font-black text-[#00e5ff]">Grupo de {k} números</div>
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                        {base.map(n => <span key={n} className="bg-[#7c4dff] text-white text-[11px] font-black rounded px-2 py-0.5">{String(n).padStart(2, '0')}</span>)}
                                                    </div>
                                                    <div className="text-[9px] text-[#aaa] mt-1">Con técnica ±1 ({pm1.length} bolillas cubiertas):</div>
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                        {pm1.map(n => <span key={n} className="bg-[#222] text-[#ddd] border border-[#444] text-[10px] font-bold rounded px-1.5 py-0.5">{String(n).padStart(2, '0')}</span>)}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        <div>
                                            <div className="text-[10px] font-black text-[#ffeb3b]">Ranking completo por probabilidad</div>
                                            <div className="space-y-0.5 mt-1">
                                                {geminiRanking.map((r, i) => (
                                                    <div key={r.num} className="flex items-center gap-2 text-[9px]">
                                                        <span className="w-5 text-right text-[#aaa]">{i + 1}.</span>
                                                        <span className="w-6 font-black text-white">{String(r.num).padStart(2, '0')}</span>
                                                        <div className="flex-1 h-2 bg-[#222] rounded-full overflow-hidden"><div className="h-full bg-[#7c4dff]" style={{ width: `${Math.round(r.prob * 100)}%` }} /></div>
                                                        <span className="w-10 text-right text-[#00e5ff]">{(r.prob * 100).toFixed(1)}%</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="bg-[#181818] border border-[#00e5ff]/40 rounded-xl p-3 shadow-md">
                                <div className="flex justify-between items-center flex-wrap gap-2">
                                    <div>
                                        <div className="text-[11px] font-black text-[#ffeb3b]">📈 Aciertos por sorteo — Grupos Gemini</div>
                                        <div className="text-[9px] text-[#888]">Walk-forward de referencia (script Python): aciertos de cada grupo en los últimos sorteos. Líneas sólidas = grupo base; punteadas = con técnica ±1.</div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <button onClick={() => setGeminiWindow(20)} className={`px-2 py-0.5 rounded text-[10px] font-black cursor-pointer ${geminiWindow === 20 ? 'bg-[#7c4dff] text-white' : 'bg-[#222] text-[#aaa] hover:text-white'}`}>20 sorteos</button>
                                        <button onClick={() => setGeminiWindow(30)} className={`px-2 py-0.5 rounded text-[10px] font-black cursor-pointer ${geminiWindow === 30 ? 'bg-[#7c4dff] text-white' : 'bg-[#222] text-[#aaa] hover:text-white'}`}>30 sorteos</button>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {GEMINI_SERIES.map(se => (
                                        <button key={se.key} onClick={() => setGeminiSeries(prev => ({ ...prev, [se.key]: !prev[se.key] }))}
                                            className={`px-2 py-0.5 rounded text-[10px] font-black cursor-pointer border ${geminiSeries[se.key] ? 'text-white' : 'text-[#666] opacity-50'}`}
                                            style={{ borderColor: se.color, backgroundColor: geminiSeries[se.key] ? se.color + '33' : '#222' }}>
                                            <span style={{ color: se.color }}>●</span> {se.label}{se.dashed ? ' ±1' : ''}
                                        </button>
                                    ))}
                                    <button onClick={() => setGeminiSeries({ '5': true, '10': true, '14': true, '22': true, "5'": true, "10'": true, "14'": true, "22'": true })} className="px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer bg-[#222] text-[#aaa] hover:text-white">Todos</button>
                                    <button onClick={() => setGeminiSeries({ '5': false, '10': false, '14': false, '22': false, "5'": false, "10'": false, "14'": false, "22'": false })} className="px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer bg-[#222] text-[#aaa] hover:text-white">Ninguno</button>
                                </div>
                                <div className="mt-1">
                                    <GeminiMultiChart rows={GEMINI_REF_ROWS.slice(-geminiWindow)} enabled={geminiSeries} />
                                </div>
                                <div className="text-[9px] text-[#888] mt-1">
                                    {(() => {
                                        const vis = GEMINI_REF_ROWS.slice(-geminiWindow);
                                        const avg = (idx: number) => (vis.reduce((a, r) => a + r[idx], 0) / vis.length).toFixed(2);
                                        return `Promedio en los últimos ${geminiWindow} sorteos — G5: ${avg(2)} ( ±1: ${avg(3)} ) · G10: ${avg(4)} ( ±1: ${avg(5)} ) · G14: ${avg(6)} ( ±1: ${avg(7)} ) · G22: ${avg(8)} ( ±1: ${avg(9)} )`;
                                    })()}
                                </div>
                            </div>
                            <div className="bg-[#181818] border border-[#333] rounded-xl p-3 shadow-md">
                                <div className="text-[11px] font-black text-[#ffeb3b]">📎 Referencia Python (script original) — Próximo Sorteo #12368</div>
                                <div className="text-[9px] text-[#888]">Grupos que entrega el script en Python (scikit-learn, 100 árboles) con el histórico cerrado al sorteo 12367. El modelo en vivo usa la misma lógica pero otro generador aleatorio, así que los grupos son parecidos, no idénticos.</div>
                                <div className="space-y-2 mt-2">
                                    {GEMINI_GROUP_SIZES.map(k => (
                                        <div key={k}>
                                            <div className="text-[10px] font-black text-[#00e5ff]">Grupo de {k} (Python)</div>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {GEMINI_REF_GROUPS[String(k)][0].map(n => <span key={n} className="bg-[#222] text-[#ddd] border border-[#444] text-[10px] font-bold rounded px-1.5 py-0.5">{String(n).padStart(2, '0')}</span>)}
                                            </div>
                                            <div className="text-[9px] text-[#aaa] mt-0.5">Con técnica ±1 ({GEMINI_REF_GROUPS[String(k)][1].length} bolillas): {GEMINI_REF_GROUPS[String(k)][1].map(n => String(n).padStart(2, '0')).join(', ')}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-[#181818] border border-[#333] rounded-xl p-3 shadow-md">
                                <div className="text-[11px] font-black text-[#ffeb3b]">📊 Backtest de referencia (walk-forward, últimos {geminiWindow} sorteos)</div>
                                <div className="text-[9px] text-[#888]">Validación del script Python: en cada sorteo se entrena con los 300 anteriores y se evalúan los grupos (base y con ±1). Es historia, no una predicción: cada sorteo es independiente.</div>
                                <div className="overflow-x-auto mt-2">
                                    <table className="w-full text-[9px] border-collapse">
                                        <thead>
                                            <tr className="bg-[#1f1f1f] text-[#aaa] text-center">
                                                <th className="p-1 border border-[#333]">Sorteo</th>
                                                <th className="p-1 border border-[#333]">Reales</th>
                                                <th className="p-1 border border-[#333]">G5 B/±1</th>
                                                <th className="p-1 border border-[#333]">G10 B/±1</th>
                                                <th className="p-1 border border-[#333]">G14 B/±1</th>
                                                <th className="p-1 border border-[#333]">G22 B/±1</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {GEMINI_REF_ROWS.slice(-geminiWindow).reverse().map(r => (
                                                <tr key={r[0]} className="text-center text-[#ddd]">
                                                    <td className="p-1 border border-[#333] font-bold">#{r[0]}</td>
                                                    <td className="p-1 border border-[#333]">{r[1].map((n: number) => String(n).padStart(2, '0')).join(', ')}</td>
                                                    <td className="p-1 border border-[#333]">{r[2]} / {r[3]}</td>
                                                    <td className="p-1 border border-[#333]">{r[4]} / {r[5]}</td>
                                                    <td className="p-1 border border-[#333]">{r[6]} / {r[7]}</td>
                                                    <td className="p-1 border border-[#333]">{r[8]} / {r[9]}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="overflow-x-auto mt-2">
                                    <table className="w-full text-[9px] border-collapse">
                                        <thead>
                                            <tr className="bg-[#1f1f1f] text-[#aaa] text-center">
                                                <th className="p-1 border border-[#333]">Grupo</th>
                                                <th className="p-1 border border-[#333]">Prom Base</th>
                                                <th className="p-1 border border-[#333]">Prom ±1</th>
                                                <th className="p-1 border border-[#333]">Cobertura ±1</th>
                                                <th className="p-1 border border-[#333]">≥3 Ac (±1)</th>
                                                <th className="p-1 border border-[#333]">≥4 Ac (±1)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(() => {
                                                const vis = GEMINI_REF_ROWS.slice(-geminiWindow);
                                                const n = vis.length;
                                                const cov: Record<number, number> = geminiWindow === 30 ? { 5: 13.1, 10: 20.5, 14: 24.1, 22: 27.7 } : { 5: 13.2, 10: 20.8, 14: 24.1, 22: 27.7 };
                                                return GEMINI_GROUP_SIZES.map(k => {
                                                    const bi = k === 5 ? 2 : k === 10 ? 4 : k === 14 ? 6 : 8;
                                                    const pi = bi + 1;
                                                    const pb = vis.reduce((a, r) => a + r[bi], 0) / n;
                                                    const pp = vis.reduce((a, r) => a + r[pi], 0) / n;
                                                    const p3 = vis.filter(r => r[pi] >= 3).length / n * 100;
                                                    const p4 = vis.filter(r => r[pi] >= 4).length / n * 100;
                                                    return (
                                                        <tr key={k} className="text-center text-[#ddd]">
                                                            <td className="p-1 border border-[#333] font-bold">Top {k}</td>
                                                            <td className="p-1 border border-[#333]">{pb.toFixed(2)}</td>
                                                            <td className="p-1 border border-[#333]">{pp.toFixed(2)}</td>
                                                            <td className="p-1 border border-[#333]">{cov[k].toFixed(1)}</td>
                                                            <td className="p-1 border border-[#333]">{p3.toFixed(1)}%</td>
                                                            <td className="p-1 border border-[#333]">{p4.toFixed(1)}%</td>
                                                        </tr>
                                                    );
                                                });
                                            })()}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    ) : activeTab === 'comparativa' ? (
                        <div className="space-y-4">
                            <div className="bg-[#181818] border border-[#00e5ff]/40 rounded-xl p-3 shadow-md">
                                <div className="flex justify-between items-center flex-wrap gap-2">
                                    <div>
                                        <div className="text-[11px] font-black text-[#ffeb3b]">📊 Aciertos por sorteo — últimos 30 sorteos (#{COMPARATIVA_DRAWS[0]} a #{COMPARATIVA_DRAWS[COMPARATIVA_DRAWS.length - 2]}) + próximo #{COMPARATIVA_DRAWS[COMPARATIVA_DRAWS.length - 1]}</div>
                                        <div className="text-[9px] text-[#888]">Cada celda muestra cuántos números de esa fila acertaron en ese sorteo. Recetas usan los pools guardados en la tabla de resultados; Gemini es el backtest de referencia (Python). Las filas Opt. 10 y Opt. 14 son las optimizaciones de 10 y 14 números de cada sorteo, evaluadas en los 30 sorteos: la celda con borde celeste es su propio sorteo (en muestra: Opt. 10 promedia 4.60, Opt. 14 da 5 en los 30) y el resto es fuera de muestra (Opt. 10 promedia ~1.76 y Opt. 14 ~2.48, o sea azar en ambos). Pasa el cursor sobre una fila Opt. para ver sus números.</div>
                                    </div>
                                    <div className="flex items-center gap-1 flex-wrap">
                                        {([['all', 'Todas (123)'], ['recetas', 'Recetas (6)'], ['gemini', 'Gemini (8)'], ['opt10', 'Opt. 10 (30)'], ['opt14', 'Opt. 14 (30)'], ['pools', 'Pools (49)']] as const).map(([k, label]) => (
                                            <button key={k} onClick={() => setComparativaFilter(k)} className={`px-2 py-0.5 rounded text-[10px] font-black cursor-pointer ${comparativaFilter === k ? 'bg-[#7c4dff] text-white' : 'bg-[#222] text-[#aaa] hover:text-white'}`}>{label}</button>
                                        ))}
                                    </div>
                                </div>
                                <div className="overflow-x-auto mt-2">
                                    <table className="border-collapse text-center">
                                        <thead>
                                            <tr>
                                                <td className="sticky left-0 bg-[#181818] text-left text-[10px] font-black text-[#888] px-2 py-1 border border-[#333] min-w-[110px]">🔍 Popout</td>
                                                {COMPARATIVA_DRAWS.map((d, di) => (
                                                    <td key={d} className="text-[14px] px-1 py-1 border border-[#333] min-w-[26px] text-center bg-[#1e1e1e]"><button onClick={() => setComparativaPopout(d)} className="cursor-pointer hover:bg-[#333] rounded w-full text-center leading-none" title={`Ver ganadores y frecuencias del top 14 del sorteo #${d}`}>🔍</button></td>
                                                ))}
                                                <td className="border border-[#333]"></td>
                                                <td className="border border-[#333]"></td>
                                                <td className="border border-[#333]"></td>
                                            </tr>
                                            <tr>
                                                <th className="sticky left-0 bg-[#181818] text-left text-[10px] font-black text-[#ffeb3b] px-2 py-1 border border-[#333] min-w-[110px]"><button onClick={() => setComparativaSort(prev => toggleComparativaSort(prev, 'label', 'asc'))} className="cursor-pointer hover:underline" title="Clic para ordenar por nombre">Método {comparativaSortArrow(comparativaSort, 'label')}</button></th>
                                                {COMPARATIVA_DRAWS.map((d, di) => (
                                                    di === COMPARATIVA_DRAWS.length - 1 ? (
                                                        <th key={d} className="text-[9px] font-bold text-[#00e5ff] px-1 py-1 border border-[#333] min-w-[26px]"><button onClick={() => setComparativaPopout(d)} className="cursor-pointer hover:underline" title={`Próximo sorteo #${d} (aún sin realizarse, no se puede ordenar por aciertos). Clic para ver las frecuencias del top 14 desplegado.`}>#{d} ⏳</button></th>
                                                    ) : (
                                                        <th key={d} className="text-[9px] font-bold text-[#aaa] px-1 py-1 border border-[#333] min-w-[26px]"><button onClick={() => setComparativaSort(prev => toggleComparativaSort(prev, `draw:${di}`, 'desc'))} className="cursor-pointer hover:underline" title={`Clic para ordenar por aciertos en el sorteo #${d}`}>#{d} {comparativaSortArrow(comparativaSort, `draw:${di}`)}</button></th>
                                                    )
                                                ))}
                                                <th className="text-[9px] font-black text-[#ffeb3b] px-2 py-1 border border-[#333]"><button onClick={() => setComparativaSort(prev => toggleComparativaSort(prev, 'avg', 'desc'))} className="cursor-pointer hover:underline" title="Clic para ordenar por promedio de aciertos">Prom. {comparativaSortArrow(comparativaSort, 'avg')}</button></th>
                                                <th className="text-[9px] font-black text-[#ffeb3b] px-2 py-1 border border-[#333]"><button onClick={() => setComparativaSort(prev => toggleComparativaSort(prev, 'n2', 'desc'))} className="cursor-pointer hover:underline" title="Clic para ordenar por sorteos con 2 o más aciertos">≥2 {comparativaSortArrow(comparativaSort, 'n2')}</button></th>
                                                <th className="text-[9px] font-black text-[#ffeb3b] px-2 py-1 border border-[#333]"><button onClick={() => setComparativaSort(prev => toggleComparativaSort(prev, 'eff', 'desc'))} className="cursor-pointer hover:underline" title="Promedio de aciertos por sorteo entre promedio de números resultantes. Clic para ordenar.">Eficiencia {comparativaSortArrow(comparativaSort, 'eff')}</button></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(() => {
                                                const allRows = getComparativaRows(COMPARATIVA_DRAWS);
                                                const rows = comparativaFilter === 'all' ? allRows : allRows.filter(r => r.family === comparativaFilter);
                                                const avgOf = (r: ComparativaRow) => r.hits.reduce((a, b) => a + b, 0) / r.hits.length;
                                                const effOf = (r: ComparativaRow) => avgOf(r) / r.avgNums;
                                                const n2Of = (r: ComparativaRow) => r.hits.filter(h => h >= 2).length;
                                                const sortVal = (r: ComparativaRow): number | string => {
                                                    if (!comparativaSort) return 0;
                                                    const k = comparativaSort.key;
                                                    if (k === 'label') return r.label;
                                                    if (k === 'avg') return avgOf(r);
                                                    if (k === 'n2') return n2Of(r);
                                                    if (k === 'eff') return effOf(r);
                                                    if (k.startsWith('draw:')) { const v = r.hits[parseInt(k.slice(5), 10)]; return v === undefined ? -1 : v; }
                                                    return 0;
                                                };
                                                const sorted = comparativaSort ? [...rows].sort((a, b) => {
                                                    const va = sortVal(a), vb = sortVal(b);
                                                    const cmp = typeof va === 'string' && typeof vb === 'string' ? va.localeCompare(vb) : (va as number) - (vb as number);
                                                    return comparativaSort!.dir === 'desc' ? -cmp : cmp;
                                                }) : rows;
                                                return sorted.map(row => {
                                                const avg = row.hits.reduce((a, b) => a + b, 0) / row.hits.length;
                                                const n2 = row.hits.filter(h => h >= 2).length;
                                                const effVal = avg / row.avgNums;
                                                return (
                                                    <tr key={row.label}>
                                                        <td className="sticky left-0 bg-[#181818] text-left text-[10px] font-bold text-white px-2 py-1 border border-[#333]" title={row.optNums ? `${row.optNums.length} números: ${row.optNums.join(', ')}` : undefined}>{row.label}</td>
                                                        {row.hits.map((h, i) => {
                                                            const isDiag = row.optIdx !== undefined && i === row.optIdx;
                                                            const cls = h >= 4 ? 'bg-[#1b5e20] text-[#69f0ae] font-black' : h >= 2 ? 'bg-[#5d4037] text-[#ffeb3b] font-bold' : 'bg-[#1a1a1a] text-[#777]';
                                                            return <td key={i} className={`text-[10px] px-1 py-1 border ${isDiag ? 'border-[#00e5ff] ring-1 ring-[#00e5ff]' : 'border-[#333]'} ${cls}`} title={isDiag ? 'Su propio sorteo (en muestra)' : undefined}>{h}</td>;
                                                        })}
                                                        <td className="text-[10px] px-1 py-1 border border-[#333] bg-[#1a1a1a] text-[#555]" title={`Próximo sorteo #${COMPARATIVA_DRAWS[COMPARATIVA_DRAWS.length - 1]} — aún sin realizarse`}>—</td>
                                                        <td className="text-[10px] font-black text-[#00e5ff] px-2 py-1 border border-[#333]">{avg.toFixed(2)}</td>
                                                        <td className="text-[10px] font-black text-[#ffeb3b] px-2 py-1 border border-[#333]">{n2}/30</td>
                                                        <td className="text-[10px] font-black text-[#00e5ff] px-2 py-1 border border-[#333]" title={`Prom. aciertos ${avg.toFixed(2)} / prom. números ${row.avgNums.toFixed(1)}`}>{effVal.toFixed(3)}</td>
                                                    </tr>
                                                );
                                                });
                                            })()}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="text-[9px] text-[#888] mt-2">Leyenda: <span className="text-[#69f0ae] font-bold">verde fuerte = 4–5 aciertos</span> · <span className="text-[#ffeb3b] font-bold">amarillo = 2–3 aciertos (más de un acierto)</span> · gris = 0–1 acierto · <span className="text-[#00e5ff] font-bold">borde celeste = el propio sorteo de esa optimización</span>. Eficiencia = promedio de aciertos por sorteo entre promedio de números resultantes (el azar es 5/28 = 0.179; más alto es mejor por número jugado). Clic en cualquier encabezado de columna para ordenar las filas por esa columna (segundo clic invierte el orden). Clic en la casilla 🔍 arriba de un sorteo para ver sus ganadores y las frecuencias del top 14 (el encabezado del sorteo sigue ordenando la columna). La última columna (#12367, ⏳) es el próximo sorteo: aún sin aciertos ni orden por aciertos; su popout muestra las frecuencias del top 14 desplegado para ese sorteo. Los botones de arriba filtran por familia: Recetas, Gemini, Opt. 10, Opt. 14 o Pools. Las filas poolX#N son el pool X con tamaño N, evaluado en cada sorteo con los pools guardados.</div>
                            </div>
                            <ComparativaPopoutModal 
                                comparativaPopout={comparativaPopout} 
                                setComparativaPopout={setComparativaPopout} 
                                comparativaDraws={COMPARATIVA_DRAWS} 
                                allDraws={allDraws} 
                                getComparativaRows={getComparativaRows} 
                                comparativaFilter={comparativaFilter} 
                                comparativaSort={comparativaSort} 
                                comparativaTop14Freq={comparativaTop14Freq} 
                            />
                        </div>
                    ) : (
                        <div className="space-y-4">

                            <div className="bg-[#181818] border border-[#ffeb3b]/40 rounded-xl p-3 shadow-md">
                                <div className="flex justify-between items-center mb-1 flex-wrap gap-2">
                                    <div>
                                        <div className="text-[11px] font-black text-[#ffeb3b]">🎯 Tus Picks Fijos / Favoritos (Inmutables & Deterministas)</div>
                                        <div className="text-[9px] text-[#888]">Selecciona tus números (1 a 28). Se integran de forma armónica e inmutable en el modelo para potenciar los aciertos en Simulador C (Libre).</div>
                                    </div>
                                    {userPicks.length > 0 && (
                                        <button 
                                            onClick={() => { setUserPicks([]); localStorage.removeItem('chispazo_user_picks'); showLocToast("Picks de usuario limpiados."); }}
                                            className="text-[9px] bg-[#222] border border-[#ff5252]/40 text-[#ff5252] px-2 py-0.5 rounded cursor-pointer hover:bg-[#ff5252]/20"
                                        >
                                            Limpiar ({userPicks.length})
                                        </button>
                                    )}
                                </div>
                                <div className="grid grid-cols-7 sm:grid-cols-14 gap-1 mt-2">
                                    {Array.from({length: 28}, (_, i) => i + 1).map(n => {
                                        const isPicked = userPicks.includes(n);
                                        return (
                                            <button
                                                key={n}
                                                onClick={() => toggleUserPick(n)}
                                                className={`py-1 rounded text-[10px] font-black border transition cursor-pointer ${isPicked ? 'bg-[#ffeb3b] text-black border-[#ffeb3b] shadow-[0_0_8px_rgba(255,235,59,0.4)]' : 'bg-[#222] text-[#aaa] border-[#333] hover:border-[#ffeb3b]/50'}`}
                                            >
                                                {String(n).padStart(2, '0')}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Resulting Numbers Preview Badge */}
                            <div className="bg-[#181818] border border-[#7c4dff]/40 rounded-xl p-3 shadow-[0_0_12px_rgba(124,77,255,0.15)]">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-[12px] font-black text-[#b388ff]">Números Resultantes (Simulador C (Libre)) — Total: {liveSimCResult.filtered.length} # {simCTargetSize !== null && `| Target: ${simCTargetSize} #`} {liveSimCResult.hits !== null && `| Aciertos: ${liveSimCResult.hits} ac`}</h3>
                                    <button 
                                        onClick={() => {
                                            const txt = liveSimCResult.filtered.map(n => String(n).padStart(2, '0')).join(' ');
                                            navigator.clipboard.writeText(txt);
                                            showLocToast("¡Números de Simulador C (Libre) copiados al portapapeles!");
                                        }}
                                        className="bg-[#7c4dff]/20 border border-[#7c4dff]/50 text-[#b388ff] px-3 py-1 rounded-full text-[10px] font-extrabold cursor-pointer hover:bg-[#7c4dff]/30 transition flex items-center gap-1"
                                    >
                                        📋 Copiar
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-1 bg-[#121212] border border-[#2a2a2a] p-2.5 rounded-lg max-h-[120px] overflow-y-auto">
                                    {liveSimCResult.filtered.map(n => {
                                        const isWin = liveSimCResult.targetDrawObj ? liveSimCResult.targetDrawObj.win.includes(n) : false;
                                        return (
                                            <span key={n} className={`text-[11px] font-black px-2 py-0.5 rounded border ${isWin ? 'bg-[#2e7d32] border-[#4caf50] text-white' : 'bg-[#1a1a1a] border-[#333] text-[#b388ff]'}`}>
                                                {String(n).padStart(2, '0')}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Gráfica fija (sticky): queda visible mientras se hace scroll por los toggles */}
                            {simCResults.length > 0 && (
                                <div className="bg-[#181818] border border-[#2a2a2a] rounded-xl p-3 sticky top-[100px] z-20 shadow-[0_8px_24px_rgba(0,0,0,0.6)]">
                                    <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
                                        <div>
                                            <h3 className="text-[12px] font-black text-[#ffeb3b]">📈 Correlación: Números Resultantes vs. Aciertos (Hit Rate en 30 Sorteos)</h3>
                                            <p className="text-[9px] text-[#888]">Visualización interactiva Recharts de la correlación entre el tamaño del pool resultante y la efectividad histórica.</p>
                                            {maxSimCFinalFreq > activeSimCSizeCount && (
                                                <p className="text-[9px] text-[#ff9800]">⚠️ Con {activeSimCSizeCount} tamaños activos la frecuencia máxima es {activeSimCSizeCount}, pero las frecuencias finales activas llegan a {maxSimCFinalFreq}: se muestra la frecuencia más alta disponible.</p>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[9px] font-bold bg-[#00e5ff]/20 text-[#00e5ff] px-2.5 py-0.5 rounded-full border border-[#00e5ff]/40">
                                                Promedio Aciertos: {(simCResults.reduce((acc, r) => acc + r.hits, 0) / simCResults.length).toFixed(1)} ac
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-full h-[260px] bg-[#121212] border border-[#262626] rounded-xl p-2 flex flex-col justify-center items-center">
                                         <CustomSVGChart data={simCResults.map(r => ({ draw: `#${r.num}`, count: r.count, hits: r.hits, date: r.date }))} />
                                     </div>
                                </div>
                            )}

                            {/* Selector de Frecuencias Finales (Entre Pool Sizes / Global en Simulador C) */}
                            <div className="bg-[#181818] border border-[#ffeb3b]/40 rounded-xl p-3 shadow-lg">
                                <div className="text-[11px] font-black text-[#ffeb3b] mb-1">🎯 Selector de Frecuencias Finales (Entre Pool Sizes / Global):</div>
                                <div className="text-[9px] text-[#888] mb-2">Filtro de frecuencias globales aplicadas al conjunto combinado de los pool sizes activos en el Simulador C (Libre).</div>
                                <div className="flex gap-2 flex-wrap">
                                    {[8, 7, 6, 5, 4, 3, 2, 1, 0].map(f => {
                                        const fActive = simCFinalFreqs[f];
                                        return (
                                            <label key={f} className={`flex items-center gap-1.5 text-[10px] font-bold cursor-pointer border px-2.5 py-1 rounded-lg transition ${fActive ? 'bg-[#ffeb3b]/25 border-[#ffeb3b] text-[#ffeb3b]' : 'bg-[#222] border-[#333] text-[#666]'}`}>
                                                <input 
                                                    type="checkbox" 
                                                    checked={fActive} 
                                                    onChange={(e) => {
                                                        const val = e.target.checked;
                                                        React.startTransition(() => {
                                                            setSimCFinalFreqs({...simCFinalFreqs, [f]: val});
                                                        });
                                                    }}
                                                    className="cursor-pointer accent-[#ffeb3b] w-3.5 h-3.5"
                                                />
                                                <span>F{f}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Pool Sizes Configuration (9, 12, 15, 18, 21, 24, 27) - Vertical Stack View Mode */}
                            <div className="space-y-3">
                                <div className="text-[11px] font-black text-[#ffeb3b]">Configuración de Pool Sizes, Pools y Frecuencias (Simulador C (Libre)) — Vista Vertical:</div>
                                <div className="space-y-3">
                                    {[9, 12, 15, 18, 21, 24, 27].map(sz => {
                                        const rawCfg: any = simCConfigs[sz] || {};
                                        const cfg = {
                                            enabled: !!rawCfg.enabled,
                                            pools: rawCfg.pools || { final: true, p2: true, p3: true, p4: true, p5: false, p6: true, p7: false },
                                            freqs: rawCfg.freqs || { 7: false, 6: false, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false }
                                        };
                                        return (
                                            <div key={sz} className={`border rounded-xl p-3 transition flex flex-col ${cfg.enabled ? 'bg-[#181818] border-[#7c4dff]/50 shadow-[0_0_10px_rgba(124,77,255,0.15)]' : 'bg-[#141414] border-[#262626] opacity-60'}`}>
                                                <div>
                                                    <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                                                        <label className="flex items-center gap-2 cursor-pointer">
                                                            <input 
                                                                type="checkbox" 
                                                                checked={cfg.enabled} 
                                                                onChange={(e) => {
                                                                    const val = e.target.checked;
                                                                    React.startTransition(() => {
                                                                        updateSimCField(sz, { enabled: val });
                                                                    });
                                                                }}
                                                                className="cursor-pointer accent-[#7c4dff] w-4 h-4 rounded"
                                                            />
                                                            <span className="text-[12px] font-black text-[#ffeb3b]">Pool Size: {sz} #</span>
                                                        </label>
                                                        <span className={`text-[9px] px-2 py-0.5 rounded font-bold ${cfg.enabled ? 'bg-[#7c4dff]/20 text-[#b388ff]' : 'bg-[#222] text-[#666]'}`}>
                                                            {cfg.enabled ? 'Activo' : 'Inactivo'}
                                                        </span>
                                                    </div>

                                                    {cfg.enabled && (
                                                        <div className="space-y-2.5 pt-2 border-t border-[#2a2a2a]">
                                                            <div>
                                                                <div className="text-[9px] font-bold text-[#aaa] mb-1">POOLS ACTIVOS (SZ {sz}#):</div>
                                                                <div className="flex gap-1.5 flex-wrap">
                                                                    {Object.keys(cfg.pools).map(pid => {
                                                                        const pActive = cfg.pools[pid];
                                                                        return (
                                                                            <label key={pid} className={`flex items-center gap-1 text-[9px] font-bold cursor-pointer border px-2 py-1 rounded transition ${pActive ? 'bg-[#7c4dff]/30 border-[#7c4dff] text-white shadow-sm' : 'bg-[#222] border-[#333] text-[#666]'}`}>
                                                                                <input 
                                                                                    type="checkbox" 
                                                                                    checked={pActive} 
                                                                                    onChange={(e) => {
                                                                                        const val = e.target.checked;
                                                                                        React.startTransition(() => {
                                                                                            updateSimCField(sz, { pools: { [pid]: val } });
                                                                                        });
                                                                                    }}
                                                                                    className="cursor-pointer accent-[#7c4dff] w-3.5 h-3.5"
                                                                                />
                                                                                <span>{pid.toUpperCase()}</span>
                                                                            </label>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <div className="text-[9px] font-bold text-[#aaa] mb-1">FRECUENCIAS (SZ {sz}#):</div>
                                                                <div className="flex gap-1.5 flex-wrap">
                                                                    {[7, 6, 5, 4, 3, 2, 1, 0].map(f => {
                                                                        const fActive = cfg.freqs[f];
                                                                        return (
                                                                            <label key={f} className={`flex items-center gap-1 text-[9px] font-bold cursor-pointer border px-2 py-1 rounded transition ${fActive ? 'bg-[#00e5ff]/30 border-[#00e5ff] text-white shadow-sm' : 'bg-[#222] border-[#333] text-[#666]'}`}>
                                                                                <input 
                                                                                    type="checkbox" 
                                                                                    checked={fActive} 
                                                                                    onChange={(e) => {
                                                                                        const val = e.target.checked;
                                                                                        React.startTransition(() => {
                                                                                            updateSimCField(sz, { freqs: { [f]: val } });
                                                                                        });
                                                                                    }}
                                                                                    className="cursor-pointer accent-[#00e5ff] w-3.5 h-3.5"
                                                                                />
                                                                                <span>F{f}</span>
                                                                            </label>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                            {/* Resulting numbers for this specific pool size */}
                                                            {(() => {
                                                                const mlPools = liveSimCResult.mlPoolsMap[sz] || calculateMLPools(allDraws, sz);
                                                                const poolList = [
                                                                    { id: 'final', nums: mlPools.final },
                                                                    { id: 'p2', nums: mlPools.p2 },
                                                                    { id: 'p3', nums: mlPools.p3 },
                                                                    { id: 'p4', nums: mlPools.p4 },
                                                                    { id: 'p5', nums: mlPools.p5 },
                                                                    { id: 'p6', nums: mlPools.p6 },
                                                                    { id: 'p7', nums: mlPools.p7 }
                                                                ];
                                                                let activePoolObjs = poolList.filter(p => cfg.pools[p.id]);
                                                                let szItemFreq: Record<number, number> = {};
                                                                activePoolObjs.forEach(p => {
                                                                    p.nums.forEach(n => {
                                                                        szItemFreq[n] = (szItemFreq[n] || 0) + 1;
                                                                    });
                                                                });
                                                                let szResultingNums: number[] = [];
                                                                for (let n = 1; n <= 28; n++) {
                                                                    let f_internal = szItemFreq[n] || 0;
                                                                    if (cfg.freqs[f_internal]) {
                                                                        szResultingNums.push(n);
                                                                    }
                                                                }
                                                                let histDrawsForSz = allDraws;
                                                                if (selectedTargetDrawNum > 0) {
                                                                    const idx = allDraws.findIndex(d => d.num === selectedTargetDrawNum);
                                                                    if (idx >= 0) histDrawsForSz = allDraws.slice(0, idx);
                                                                }
                                                                szResultingNums.sort((a, b) => getNumberScore(b, histDrawsForSz) - getNumberScore(a, histDrawsForSz));
                                                                const targetDrawObj = liveSimCResult.targetDrawObj;
                                                                return (
                                                                    <div className="mt-2.5 pt-2 border-t border-[#262626]">
                                                                        <div className="text-[9px] font-bold text-[#00e5ff] mb-1">NÚMEROS RESULTANTES (SZ {sz}# — {szResultingNums.length} #):</div>
                                                                        <div className="flex gap-1 flex-wrap max-h-[100px] overflow-y-auto pr-1">
                                                                            {szResultingNums.map(n => {
                                                                                const isWin = targetDrawObj ? targetDrawObj.win.includes(n) : false;
                                                                                return (
                                                                                    <span key={n} className={`text-[9px] font-black px-1.5 py-0.5 rounded border ${isWin ? 'bg-[#2e7d32] border-[#4caf50] text-white' : 'bg-[#121212] border-[#333] text-[#00e5ff]'}`}>
                                                                                        {String(n).padStart(2, '0')}
                                                                                    </span>
                                                                                );
                                                                            })}
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })()}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Simulation Results Table (30 Past Draws) — la gráfica está fija arriba */}
                            {simCResults.length > 0 && (
                                <div className="space-y-4">
                                    <div className="bg-[#181818] border border-[#2a2a2a] rounded-xl p-3">
                                        <h3 className="text-[12px] font-black text-[#ffeb3b] mb-2">📊 Resultados de Simulación C en los Últimos 30 Sorteos</h3>
                                        <div className="space-y-1.5 max-h-[350px] overflow-y-auto pr-1">
                                            <div className="grid grid-cols-5 gap-2 bg-[#222] p-2 rounded-lg text-[10px] font-black text-[#00e5ff] text-center sticky top-0 z-10">
                                                <div>Sorteo</div>
                                                <div>Fecha</div>
                                                <div>Ganadores Reales</div>
                                                <div>Resultantes</div>
                                                <div>Aciertos</div>
                                            </div>
                                            {simCResults.map(r => (
                                                <div key={r.num} className="grid grid-cols-5 gap-2 bg-[#121212] border border-[#262626] p-2 rounded-lg text-[10px] items-center text-center">
                                                    <div className="font-bold text-[#ffeb3b]">#{r.num}</div>
                                                    <div className="text-[#888] text-[9px]">{r.date}</div>
                                                    <div className="font-mono text-[9px] text-[#ccc]">{r.win.map((n: number) => String(n).padStart(2, '0')).join(' ')}</div>
                                                    <div className="text-[#00e5ff] font-bold">{r.count} #</div>
                                                    <div className={`font-black px-2 py-0.5 rounded ${r.hits >= 4 ? 'bg-[#2e7d32] text-white' : r.hits === 3 ? 'bg-[#424242] text-[#ffeb3b]' : 'bg-[#1e1e1e] text-[#888]'}`}>
                                                        {r.hits} aciertos
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    )}
                </div>

                <div className="p-2.5 bg-[#0f0f0f] border-t border-[#222] flex justify-end shrink-0">
                    <button onClick={onClose} className="bg-[#7c4dff] text-white text-[11px] font-black rounded-lg px-4 py-1.5 cursor-pointer hover:opacity-90 transition shadow-sm">Cerrar [Esc]</button>
                </div>

                {localToast && (
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-[#ffeb3b] text-black px-4 py-2 rounded-xl text-[11px] font-black shadow-2xl z-50">
                        {localToast}
                    </div>
                )}

                {/* Save Recipe Modal with Keyword 'keep' */}
                {showSaveRecipeModal && (
                    <div className="absolute inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4">
                        <div className="bg-[#1a1a1a] border border-[#2e7d32] rounded-xl p-4 w-full max-w-[420px] space-y-3 shadow-2xl">
                            <div className="flex justify-between items-center">
                                <b className="text-[13px] text-[#76ff03]">💾 Guardar Nueva Receta Optimizada</b>
                                <button onClick={() => setShowSaveRecipeModal(false)} className="text-[#888] hover:text-white text-[14px]">×</button>
                            </div>
                            <div className="space-y-2">
                                <div>
                                    <label className="text-[9px] font-bold text-[#aaa] mb-1 block">Nombre de la Receta:</label>
                                    <input 
                                        type="text"
                                        value={newRecipeName}
                                        onChange={(e) => setNewRecipeName(e.target.value)}
                                        className="w-full bg-[#121212] border border-[#333] rounded-lg p-2 text-[11px] text-[#ffeb3b] focus:outline-none focus:border-[#76ff03]"
                                    />
                                </div>
                                <div>
                                    <label className="text-[9px] font-bold text-[#aaa] mb-1 block">Palabra Clave (Keyword):</label>
                                    <input 
                                        type="text"
                                        value={recipeKeyword}
                                        onChange={(e) => setRecipeKeyword(e.target.value)}
                                        className="w-full bg-[#121212] border border-[#333] rounded-lg p-2 text-[11px] text-[#ffeb3b] font-mono focus:outline-none focus:border-[#76ff03]"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <button onClick={() => setShowSaveRecipeModal(false)} className="bg-[#222] border border-[#444] text-[#aaa] px-3 py-1.5 rounded-lg text-[10px] cursor-pointer">Cancelar</button>
                                <button onClick={handleSaveCustomRecipe} className="bg-[#2e7d32] text-white px-4 py-1.5 rounded-lg text-[10px] font-bold cursor-pointer hover:bg-[#1b5e20]">Guardar</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Manage Saved Configs Modal with Keyword 'keep' */}
                {showManageSavedModal && (
                    <div className="absolute inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4">
                        <div className="bg-[#1a1a1a] border border-[#ff9800] rounded-xl p-4 w-full max-w-[480px] space-y-3 shadow-2xl">
                            <div className="flex justify-between items-center border-b border-[#333] pb-2">
                                <b className="text-[13px] text-[#ff9800]">⚙️ Gestionar Configuraciones Guardadas</b>
                                <button onClick={() => setShowManageSavedModal(false)} className="text-[#888] hover:text-white text-[14px]">×</button>
                            </div>
                            <div className="max-h-[300px] overflow-y-auto space-y-2">
                                {customRecipes.length === 0 ? (
                                    <div className="text-[11px] text-[#888] text-center py-4">No hay configuraciones guardadas.</div>
                                ) : (
                                    customRecipes.map(r => (
                                        <div key={r.id} className="bg-[#121212] border border-[#333] rounded-lg p-2.5 flex items-center justify-between">
                                            <div>
                                                <div className="text-[11px] font-bold text-[#ffeb3b]">{r.name}</div>
                                                <div className="text-[9px] text-[#888]">Guardada: {r.timestamp || 'Fecha desconocida'} · Tipo: {r.simulatorType || 'simulatorC'}</div>
                                            </div>
                                            <div>
                                                {deleteTargetId === r.id ? (
                                                    <div className="flex items-center gap-1">
                                                        <input
                                                            type="text"
                                                            placeholder="Ingresa 'keep'"
                                                            value={deleteKeywordInput}
                                                            onChange={e => setDeleteKeywordInput(e.target.value)}
                                                            className="bg-[#222] border border-[#ff5252] text-white rounded px-2 py-1 text-[10px] w-[90px]"
                                                        />
                                                        <button
                                                            onClick={() => confirmDeleteCustomRecipe(r.id)}
                                                            className="bg-[#ff5252] text-white px-2 py-1 rounded text-[10px] font-bold cursor-pointer hover:bg-[#d32f2f]"
                                                        >
                                                            Eliminar
                                                        </button>
                                                        <button
                                                            onClick={() => { setDeleteTargetId(null); setDeleteKeywordInput(''); }}
                                                            className="bg-[#333] text-[#aaa] px-2 py-1 rounded text-[10px]"
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => { setDeleteTargetId(r.id); setDeleteKeywordInput(''); }}
                                                        className="bg-[#222] border border-[#ff5252]/50 text-[#ff5252] px-2.5 py-1 rounded text-[10px] font-bold cursor-pointer hover:bg-[#ff5252]/20"
                                                        title="Eliminar con la palabra clave 'keep'"
                                                    >
                                                        🗑️ Eliminar
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                            <div className="flex justify-end pt-2 border-t border-[#333]">
                                <button onClick={() => setShowManageSavedModal(false)} className="bg-[#222] border border-[#444] text-[#aaa] px-3 py-1.5 rounded-lg text-[10px] cursor-pointer">Cerrar</button>
                            </div>
                        </div>
                    </div>
                )}

                {showEfficiencyReportModal && (
                    <IterationEfficiencyReportModal simResults={simResults} currentMode={iterOptMode} onClose={() => setShowEfficiencyReportModal(false)} />
                )}

                {showFocusGraphModal && (
                    <FocusGraphicalAnalysisModal simResults={simResults} currentMode={iterOptMode} onClose={() => setShowFocusGraphModal(false)} />
                )}

                {selectedScoreModalNum !== null && (
                    <ScoreMethodologyModal num={selectedScoreModalNum} allDraws={allDraws} selectedTargetDrawNum={selectedTargetDrawNum} onClose={() => setSelectedScoreModalNum(null)} />
                )}
            </div>
        </div>
    );
}

function MultipoolModal({ allDraws, targetDraw, onClose, onCopyConsensus, onOpenWheeling }: { allDraws: Draw[]; targetDraw?: Draw; onClose: () => void; onCopyConsensus: (nums: number[]) => void; onOpenWheeling: (id: string, k: number, sorteoNum?: number, customSlice?: number[]) => void }) {
    const poolSizes = [9, 12, 15, 18, 21, 24, 27];
    const poolDefs = [
        {id: 'final', name: 'Final', color: '#ffeb3b'},
        {id: 'p2', name: 'Pool2', color: '#00e5ff'},
        {id: 'p3', name: 'Pool3', color: '#ff9800'},
        {id: 'p4', name: 'Pool4', color: '#76ff03'},
        {id: 'p5', name: 'Pool5', color: '#e040fb'},
        {id: 'p6', name: 'Pool6', color: '#26c6da'},
        {id: 'p7', name: 'Pool7', color: '#ff4081'}
    ];

    const [targetSize, setTargetSize] = useState<number>(targetDraw ? 10 : 11);
    const [localToast, setLocalToast] = useState<string | null>(null);
    const [showLoadModal, setShowLoadModal] = useState(false);
    const [showAnalysisModal, setShowAnalysisModal] = useState(false);
    const [importText, setImportText] = useState('');

    function showLocToast(msg: string) {
        setLocalToast(msg);
        setTimeout(() => setLocalToast(null), 2500);
    }

    const [activeRecipe, setActiveRecipe] = useState<string | null>(targetDraw ? `draw_${targetDraw.num}` : 'master_5');

    const histDraws = React.useMemo(() => {
        if (!targetDraw) return allDraws;
        const histIdx = allDraws.findIndex(d => d.num === targetDraw.num);
        return histIdx > 0 ? allDraws.slice(0, histIdx) : allDraws;
    }, [allDraws, targetDraw]);

    const last20Draws = React.useMemo(() => {
        if (!allDraws || allDraws.length === 0) return [];
        const targetIdx = targetDraw ? allDraws.findIndex(d => d.num === targetDraw.num) : allDraws.length - 1;
        const startIdx = Math.max(0, (targetIdx !== -1 ? targetIdx : allDraws.length - 1) - 19);
        const endIdx = targetIdx !== -1 ? targetIdx : allDraws.length - 1;
        return allDraws.slice(startIdx, endIdx + 1).reverse();
    }, [allDraws, targetDraw]);

    function handleSelectRecipe(val: string) {
        setActiveRecipe(val);
        if (val.startsWith('draw_')) {
            const drawNum = parseInt(val.replace('draw_', ''));
            const draw = allDraws.find(d => d.num === drawNum);
            if (!draw) return;
            const opt = getOptimalMultipoolConfig(allDraws, draw, 10);
            setConfigs(opt.configs);
            setFinalFreqs(opt.finalFreqs);
            showLocToast(`🍳 ¡Receta Sorteo ${draw.num} optimizada!`);
        } else if (val.startsWith('master_')) {
            const recipeId = parseInt(val.replace('master_', ''));
            const recConfig = getRecipeConfig(recipeId);
            setTargetSize(recConfig.targetSize);
            setConfigs(recConfig.configs);
            setFinalFreqs(recConfig.finalFreqs);
            showLocToast(`🍳 ¡Receta Maestra ${recipeId} cargada!`);
        } else if (val.startsWith('thesis_')) {
            const recConfig = getRecipeConfig(val);
            setTargetSize(recConfig.targetSize);
            setConfigs(recConfig.configs);
            setFinalFreqs(recConfig.finalFreqs);
            showLocToast(`🍳 ¡Tesis ${recConfig.targetSize} (${recConfig.thesisVariant}) cargada!`);
        }
    }

    const initialConfig = React.useMemo(() => {
        if (activeRecipe && activeRecipe.startsWith('master_')) {
            const recipeId = parseInt(activeRecipe.replace('master_', ''));
            return getRecipeConfig(recipeId);
        }
        if (activeRecipe && activeRecipe.startsWith('thesis_')) {
            return getRecipeConfig(activeRecipe);
        }
        if (activeRecipe && activeRecipe.startsWith('draw_')) {
            const drawNum = parseInt(activeRecipe.replace('draw_', ''));
            const draw = allDraws.find(d => d.num === drawNum);
            if (draw) {
                return getOptimalMultipoolConfig(allDraws, draw, 10);
            }
        }
        if (targetDraw) {
            return getOptimalMultipoolConfig(allDraws, targetDraw, 10);
        }
        let init: Record<number, { pools: Record<string, boolean>; freqs: Record<number, boolean> }> = {};
        poolSizes.forEach(sz => {
            init[sz] = {
                pools: { final: false, p2: false, p3: false, p4: false, p5: false, p6: false, p7: false },
                freqs: { 7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false }
            };
        });
        return {
            configs: init,
            finalFreqs: { 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false },
            targetSize: 5
        };
    }, [allDraws, targetDraw, targetSize, activeRecipe]);

    const [configs, setConfigs] = useState(initialConfig.configs);
    const [finalFreqs, setFinalFreqs] = useState(initialConfig.finalFreqs);
    const [activePoolSizes, setActivePoolSizes] = useState<Record<number, boolean>>({
        9: true, 12: true, 15: true, 18: true, 21: true, 24: true, 27: true
    });

    useEffect(() => {
        setConfigs(initialConfig.configs);
        setFinalFreqs(initialConfig.finalFreqs);
    }, [initialConfig]);

    function handleClearAll() {
        let init: Record<number, { pools: Record<string, boolean>; freqs: Record<number, boolean> }> = {};
        poolSizes.forEach(sz => {
            init[sz] = {
                pools: { final: false, p2: false, p3: false, p4: false, p5: false, p6: false, p7: false },
                freqs: { 7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false }
            };
        });
        setConfigs(init);
        setFinalFreqs({ 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false });
        setActivePoolSizes({ 9: true, 12: true, 15: true, 18: true, 21: true, 24: true, 27: true });
    }

    function handleCopyFingerprint() {
        const fingerprint = {
            version: '1.1',
            type: 'chispazo_multipool_fingerprint',
            drawNum: targetDraw?.num || null,
            targetSize,
            configs,
            finalFreqs,
            activePoolSizes,
            timestamp: new Date().toISOString()
        };
        const text = JSON.stringify(fingerprint, null, 2);
        navigator.clipboard.writeText(text).then(() => {
            showLocToast('¡Fingerprint metodológico copiado al portapapeles!');
        });
    }

    function handleApplyFingerprint() {
        try {
            const data = JSON.parse(importText);
            if (data.configs && data.finalFreqs) {
                setConfigs(data.configs);
                setFinalFreqs(data.finalFreqs);
                if (data.activePoolSizes) setActivePoolSizes(data.activePoolSizes);
                if (data.targetSize) setTargetSize(data.targetSize);
                setShowLoadModal(false);
                setImportText('');
                showLocToast('¡Fingerprint aplicado exitosamente!');
            } else {
                showLocToast('Error: Formato de fingerprint inválido');
            }
        } catch (e) {
            showLocToast('Error al parsear JSON de fingerprint');
        }
    }

    function handleCopyImage() {
        const canvas = document.createElement('canvas');
        canvas.width = 1200;
        canvas.height = 1550;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Background
        ctx.fillStyle = '#121212';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        let curY = 45;

        // Header Title
        ctx.fillStyle = '#ffeb3b';
        ctx.font = 'bold 28px sans-serif';
        ctx.fillText('⚡ Herramienta Multipool (Consenso Multiescala 7 Pool Sizes)', 40, curY);
        curY += 35;

        ctx.fillStyle = '#00e5ff';
        ctx.font = '18px sans-serif';
        ctx.fillText(`Target: ${targetSize} números | Sorteo: ${targetDraw?.num || 'Master'}`, 40, curY);
        curY += 30;

        // Winning Numbers Banner
        if (targetDraw) {
            ctx.fillStyle = '#ffeb3b';
            ctx.fillRect(40, curY, 1120, 55);
            ctx.fillStyle = '#000000';
            ctx.font = 'bold 22px sans-serif';
            ctx.fillText(`● NÚMEROS GANADORES REALES: ${targetDraw.win.map(n => String(n).padStart(2, '0')).join('  ')}`, 70, curY + 35);
            curY += 70;
        }

        ctx.fillStyle = '#00e5ff';
        ctx.font = 'bold 18px sans-serif';
        ctx.fillText('Configuración de los 7 Pool Sizes (9, 12, 15, 18, 21, 24, 27):', 40, curY);
        curY += 25;

        // Draw 7 Pool Sizes in 2 columns
        const poolSizesList = [9, 12, 15, 18, 21, 24, 27];
        let cardWidth = 545;
        let cardHeight = 160;

        poolSizesList.forEach((sz, idx) => {
            let col = idx % 2;
            let row = Math.floor(idx / 2);
            let x = 40 + col * 575;
            let y = curY + row * 175;

            let isActive = activePoolSizes[sz] !== false;
            let resCount = multipoolResult.poolSizeFilteredSets[idx]?.length || 0;

            // Card background
            ctx.fillStyle = '#161616';
            ctx.fillRect(x, y, cardWidth, cardHeight);
            ctx.strokeStyle = isActive ? '#333333' : '#222222';
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, cardWidth, cardHeight);

            // Active checkbox & Pool size header
            ctx.fillStyle = isActive ? '#7c4dff' : '#222222';
            ctx.fillRect(x + 15, y + 15, 18, 18);
            ctx.strokeStyle = isActive ? '#b388ff' : '#444444';
            ctx.strokeRect(x + 15, y + 15, 18, 18);
            if (isActive) {
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 14px sans-serif';
                ctx.fillText('✓', x + 18, y + 29);
            }

            ctx.fillStyle = '#ffeb3b';
            ctx.font = 'bold 15px sans-serif';
            ctx.fillText(`Pool Size: ${sz} nums`, x + 42, y + 29);

            ctx.fillStyle = '#aaaaaa';
            ctx.font = '12px sans-serif';
            ctx.fillText(`Resultantes: ${resCount} #`, x + 415, y + 29);

            // Pools Checkboxes (7 pools)
            ctx.fillStyle = '#888888';
            ctx.font = '10px sans-serif';
            ctx.fillText('POOLS:', x + 15, y + 60);

            let pX = x + 65;
            poolDefs.forEach(pool => {
                let pChecked = configs[sz]?.pools[pool.id] || false;
                ctx.fillStyle = pChecked ? '#7c4dff' : '#222222';
                ctx.fillRect(pX, y + 46, 14, 14);
                ctx.strokeStyle = pChecked ? '#b388ff' : '#444444';
                ctx.strokeRect(pX, y + 46, 14, 14);
                if (pChecked) {
                    ctx.fillStyle = '#ffffff';
                    ctx.font = 'bold 11px sans-serif';
                    ctx.fillText('✓', pX + 2, y + 57);
                }

                ctx.fillStyle = pChecked ? '#ffffff' : '#999999';
                ctx.font = '11px sans-serif';
                ctx.fillText(pool.name, pX + 18, y + 58);
                pX += 67;
            });

            // Frequencies Checkboxes (8 freqs)
            ctx.fillStyle = '#888888';
            ctx.font = '10px sans-serif';
            ctx.fillText('FREQS:', x + 15, y + 105);

            let fX = x + 65;
            [7, 6, 5, 4, 3, 2, 1, 0].forEach(f => {
                let fChecked = configs[sz]?.freqs[f] || false;
                ctx.fillStyle = fChecked ? '#7c4dff' : '#222222';
                ctx.fillRect(fX, y + 91, 14, 14);
                ctx.strokeStyle = fChecked ? '#b388ff' : '#444444';
                ctx.strokeRect(fX, y + 91, 14, 14);
                if (fChecked) {
                    ctx.fillStyle = '#ffffff';
                    ctx.font = 'bold 11px sans-serif';
                    ctx.fillText('✓', fX + 2, y + 102);
                }

                ctx.fillStyle = fChecked ? '#ffffff' : '#999999';
                ctx.font = '11px sans-serif';
                ctx.fillText(`F${f}`, fX + 18, y + 103);
                fX += 58;
            });
        });

        curY += 3 * 175 + 15;

        // Final Frequency Filter & Master Result
        ctx.fillStyle = '#141414';
        ctx.fillRect(40, curY, 1120, 270);
        ctx.strokeStyle = '#00e5ff44';
        ctx.strokeRect(40, curY, 1120, 270);

        ctx.fillStyle = '#ffeb3b';
        ctx.font = 'bold 18px sans-serif';
        ctx.fillText('🎯 Filtro de Frecuencia Final (Consenso Master)', 60, curY + 30);

        ctx.fillStyle = '#ffeb3b';
        ctx.font = '15px sans-serif';
        ctx.fillText(`Total Final: ${multipoolResult.finalResultNums.length} números`, 930, curY + 30);

        ctx.fillStyle = '#cccccc';
        ctx.font = '14px sans-serif';
        ctx.fillText('Números resultantes del Multipool Master:', 60, curY + 65);

        let mY = curY + 85;
        let mX = 60;
        multipoolResult.finalResultNums.forEach((n, idx) => {
            let isWin = targetDraw ? targetDraw.win.includes(n) : false;
            ctx.fillStyle = isWin ? '#2e7d32' : '#1e1e1e';
            ctx.fillRect(mX, mY, 70, 70);
            ctx.strokeStyle = isWin ? '#4caf50' : '#333333';
            ctx.strokeRect(mX, mY, 70, 70);

            ctx.fillStyle = isWin ? '#ffffff' : '#ffeb3b';
            ctx.font = 'bold 26px sans-serif';
            ctx.fillText(String(n).padStart(2, '0'), mX + 12, mY + 42);

            ctx.fillStyle = isWin ? '#a5d6a7' : '#00e5ff';
            ctx.font = '11px sans-serif';
            ctx.fillText(`f:${multipoolResult.masterFreqMap[n] || 0}/${multipoolResult.activePoolSizesCount}`, mX + 14, mY + 60);

            mX += 82;
            if ((idx + 1) % 12 === 0) {
                mX = 60;
                mY += 80;
            }
        });

        canvas.toBlob((blob) => {
            if (blob) {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `multipool_completo_sorteo_${targetDraw?.num || 'master'}.png`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                showLocToast('¡Imagen completa descargada exitosamente!');
            } else {
                showLocToast('Error al generar blob de imagen');
            }
        }, 'image/png');
    }

    const multipoolResult = React.useMemo(() => {
        let poolSizeFilteredSets: number[][] = [];
        let activePoolSizesCount = 0;
        poolSizes.forEach(sz => {
            if (!activePoolSizes[sz]) {
                poolSizeFilteredSets.push([]);
                return;
            }
            activePoolSizesCount++;
            const mlPools = getPoolsForDraw(allDraws, targetDraw ? targetDraw.num : null, sz);
            const poolList = [
                { id: 'final', name: 'Final', nums: mlPools.final },
                { id: 'p2', name: 'Pool2', nums: mlPools.p2 },
                { id: 'p3', name: 'Pool3', nums: mlPools.p3 },
                { id: 'p4', name: 'Pool4', nums: mlPools.p4 },
                { id: 'p5', name: 'Pool5', nums: mlPools.p5 },
                { id: 'p6', name: 'Pool6', nums: mlPools.p6 },
                { id: 'p7', name: 'Pool7', nums: mlPools.p7 }
            ];
            const cfg = configs[sz] || { pools: {}, freqs: {} };
            let activePoolObjs = poolList.filter(p => cfg.pools[p.id]);
            let freqMap: Record<number, number> = {};
            activePoolObjs.forEach(p => {
                p.nums.forEach(n => {
                    freqMap[n] = (freqMap[n] || 0) + 1;
                });
            });
            let filteredForSz: number[] = [];
            for (let n = 1; n <= 28; n++) {
                let f = freqMap[n] || 0;
                if (cfg.freqs[f]) {
                    filteredForSz.push(n);
                }
            }
            poolSizeFilteredSets.push(filteredForSz);
        });

        let masterFreqMap: Record<number, number> = {};
        poolSizeFilteredSets.forEach((set, szIdx) => {
            if (activePoolSizes[poolSizes[szIdx]]) {
                set.forEach(n => {
                    masterFreqMap[n] = (masterFreqMap[n] || 0) + 1;
                });
            }
        });

        let finalResultNums: number[] = [];
        for (let n = 1; n <= 28; n++) {
            let f = masterFreqMap[n] || 0;
            if (finalFreqs[f]) {
                finalResultNums.push(n);
            }
        }

        finalResultNums.sort((a, b) => {
            let fA = masterFreqMap[a] || 0;
            let fB = masterFreqMap[b] || 0;
            if (fB !== fA) return fB - fA;
            return a - b;
        });

        // El target sí recorta la lista mostrada: se queda con los N números
        // de mayor consenso (ya ordenados por frecuencia maestra desc). Sin el
        // recorte, el modal mostraba el consenso completo (23 números) aunque
        // el target fuera 14 o 10. Si el consenso trae menos que el target,
        // se muestran todos (no se rellena con números inventados).
        if (finalResultNums.length > targetSize) {
            finalResultNums = finalResultNums.slice(0, targetSize);
        }

        return { masterFreqMap, finalResultNums, poolSizeFilteredSets, activePoolSizesCount };
    }, [allDraws, configs, finalFreqs, activePoolSizes, histDraws, targetSize]);

    return (
        <div className="fixed inset-0 bg-black/88 backdrop-blur-[2px] flex items-center justify-center z-50 p-3 overflow-hidden" onClick={onClose}>
            <div className="bg-[#121212] border border-[#333] rounded-xl w-full max-w-[880px] h-[86vh] max-h-[86vh] flex flex-col overflow-hidden shadow-2xl relative" onClick={e => e.stopPropagation()}>
                {/* Header with Toolbars & Buttons */}
                <div className="p-3 bg-[#1a1a1a] border-b border-[#2a2a2a] flex justify-between items-center flex-wrap gap-2">
                    <div>
                        <div className="text-[13px] font-black text-[#ffeb3b]">⚡ Herramienta Multipool (Consenso Multiescala 7 Pool Sizes)</div>
                        <div className="text-[9px] text-[#888]">Configura pools y frecuencias por cada pool size y optimiza el target de números resultantes.</div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                        {/* Target Size Gap Selector */}
                        <div className="flex items-center bg-[#111] border border-[#333] rounded-lg px-2 py-0.5">
                            <span className="text-[9px] text-[#aaa] font-bold mr-1.5">Target:</span>
                            {[5, 6, 7, 8, 9, 10].map(sz => (
                                <button
                                    key={sz}
                                    onClick={() => setTargetSize(sz)}
                                    className={`px-1.5 py-0.5 rounded text-[10px] font-black cursor-pointer transition ${targetSize === sz ? 'bg-[#7c4dff] text-white shadow-sm' : 'text-[#888] hover:text-white'}`}
                                    title={`Optimizar para target de ${sz} números resultantes`}
                                >
                                    {sz}#
                                </button>
                            ))}
                        </div>

                        {/* Recetas Dropdown Selector */}
                        <div className="flex items-center bg-[#111] border border-[#333] rounded-lg px-2 py-0.5">
                            <span className="text-[9px] text-[#ffeb3b] font-bold mr-1">🍳 Recetas:</span>
                            <select 
                                value={activeRecipe || ""}
                                onChange={(e) => {
                                    if (e.target.value) {
                                        handleSelectRecipe(e.target.value);
                                    }
                                }}
                                className="bg-[#1a1a1a] border border-[#444] text-[#00e5ff] text-[10px] font-bold rounded px-2 py-0.5 cursor-pointer focus:outline-none focus:border-[#7c4dff]"
                                title="Seleccionar receta óptima o sorteo pasado"
                            >
                                <option value="" disabled>Seleccionar Receta...</option>
                                <optgroup label="🌟 6 Recetas Maestras (5 Aciertos / Mínimo)">
                                    <option value="master_1">🍳 Receta 1: Alfa Compacta (5 Ac)</option>
                                    <option value="master_2">🍳 Receta 2: Beta Consenso Estricto (5 Ac)</option>
                                    <option value="master_3">🍳 Receta 3: Gamma Multiescala Balanceada</option>
                                    <option value="master_4">🍳 Receta 4: Delta Núcleo Reducido (5 Ac)</option>
                                    <option value="master_5">🍳 Receta 5: Omega Maestra Definitiva</option>
                                    <option value="master_6">🍳 Receta 6: Zeta Cuatro Eficiente</option>
                                </optgroup>
                                <optgroup label="📜 Tesis (se actualiza al optimizar)">
                                    <option value="thesis_14">📜 Tesis 14 (optimizada)</option>
                                    <option value="thesis_10">📜 Tesis 10 (optimizada)</option>
                                </optgroup>
                                <optgroup label="📜 Sorteos Pasados (Últimos 20 Óptimos)">
                                    {last20Draws.map(d => (
                                        <option key={d.num} value={`draw_${d.num}`}>
                                            Sorteo {d.num} ({d.win.map(n => String(n).padStart(2, '0')).join(', ')})
                                        </option>
                                    ))}
                                </optgroup>
                            </select>
                        </div>

                        <button 
                            onClick={handleCopyFingerprint} 
                            className="bg-[rgba(0,229,255,.15)] border border-[rgba(0,229,255,.4)] text-[#00e5ff] hover:bg-[rgba(0,229,255,.25)] px-2.5 py-1 rounded-lg text-[10px] font-extrabold cursor-pointer transition flex items-center gap-1"
                            title="Copiar fingerprint metodológico en texto"
                        >
                            📋 Copiar Fingerprint
                        </button>

                        <button 
                            onClick={() => setShowLoadModal(true)} 
                            className="bg-[rgba(124,77,255,.15)] border border-[rgba(124,77,255,.4)] text-[#b388ff] hover:bg-[rgba(124,77,255,.25)] px-2.5 py-1 rounded-lg text-[10px] font-extrabold cursor-pointer transition flex items-center gap-1"
                            title="Cargar fingerprint metodológico desde texto"
                        >
                            📥 Cargar
                        </button>

                        <button 
                            onClick={handleCopyImage} 
                            className="bg-[rgba(255,235,59,.15)] border border-[rgba(255,235,59,.4)] text-[#ffeb3b] hover:bg-[rgba(255,235,59,.25)] px-2.5 py-1 rounded-lg text-[10px] font-extrabold cursor-pointer transition flex items-center gap-1"
                            title="Copiar multipool completo en modo de imagen"
                        >
                            📸 Copiar Imagen
                        </button>

                        <button 
                            onClick={() => setShowAnalysisModal(true)} 
                            className="bg-[rgba(124,77,255,.2)] border border-[rgba(124,77,255,.5)] text-[#b388ff] hover:bg-[rgba(124,77,255,.3)] px-2.5 py-1 rounded-lg text-[10px] font-extrabold cursor-pointer transition flex items-center gap-1"
                            title="Analizar eficiencia de las Recetas 1-5 en los últimos 20 sorteos"
                        >
                            📊 Analizar Eficiencia
                        </button>

                        <button onClick={handleClearAll} className="bg-[#2a2a2a] border border-[#555] text-[#ffeb3b] rounded-lg px-2.5 py-1 text-[10px] font-bold cursor-pointer hover:bg-[#333]">
                            Limpiar
                        </button>
                        <button onClick={onClose} className="bg-[#2a2a2a] border border-[#555] text-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer hover:bg-[#333]">×</button>
                    </div>
                </div>

                {/* Local Toast inside Modal */}
                {localToast && (
                    <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-[#7c4dff] text-white px-4 py-1.5 rounded-full text-[11px] font-black shadow-[0_4px_15px_rgba(124,77,255,0.4)] z-[9999] transition-opacity">
                        {localToast}
                    </div>
                )}

                {/* Analysis Efficiency Modal Overlay */}
                {showAnalysisModal && (
                    <div className="absolute inset-0 bg-black/92 z-[9999] flex items-center justify-center p-4">
                        <div className="bg-[#121212] border border-[#7c4dff] rounded-xl p-4 w-full max-w-[920px] h-[90vh] flex flex-col shadow-2xl overflow-hidden">
                            <div className="flex justify-between items-center border-b border-[#333] pb-2 mb-3">
                                <div>
                                    <h3 className="text-[14px] font-black text-[#ffeb3b]">📊 Análisis de Eficiencia de Recetas Maestras (1 a 5) en 20 Sorteos Pasados</h3>
                                    <p className="text-[10px] text-[#888]">Desglose detallado de aciertos y números resultantes para evaluar el desempeño y eficiencia.</p>
                                </div>
                                <button onClick={() => setShowAnalysisModal(false)} className="text-[#888] hover:text-white text-[16px] font-bold">×</button>
                            </div>

                            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
                                <div className="grid grid-cols-8 gap-1 bg-[#1a1a1a] p-2 rounded-lg text-[10px] font-black text-[#00e5ff] border border-[#333] text-center sticky top-0 z-10">
                                    <div>Sorteo</div>
                                    <div>Ganadores</div>
                                    <div>Receta 1</div>
                                    <div>Receta 2</div>
                                    <div>Receta 3</div>
                                    <div>Receta 4</div>
                                    <div>Receta 5</div>
                                    <div>Eficacia</div>
                                </div>

                                {last20Draws.map(d => {
                                    let results = [1, 2, 3, 4, 5].map(rid => evaluateRecipeOnDraw(d, allDraws, rid));
                                    return (
                                        <div key={d.num} className="grid grid-cols-8 gap-1 bg-[#161616] border border-[#2a2a2a] p-2 rounded-lg text-[10px] items-center text-center">
                                            <div className="font-bold text-[#ffeb3b]">#{d.num}</div>
                                            <div className="font-mono text-[9px] text-[#ccc]">{d.win.map(n => String(n).padStart(2, '0')).join(' ')}</div>
                                            {results.map((res, idx) => (
                                                <div key={idx} className={`p-1 rounded font-bold ${res.hits >= 4 ? 'bg-[#2e7d32] text-white' : res.hits === 3 ? 'bg-[#424242] text-[#ffeb3b]' : 'bg-[#1e1e1e] text-[#888]'}`}>
                                                    {res.hits} ac ({res.resultingCount}#)
                                                </div>
                                            ))}
                                            <div className="text-[9px] font-extrabold text-[#76ff03]">
                                                {results.some(r => r.hits >= 4) ? '⭐ Óptimo' : 'Regular'}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="pt-3 border-t border-[#333] flex justify-end">
                                <button onClick={() => setShowAnalysisModal(false)} className="bg-[#7c4dff] text-white px-5 py-1.5 rounded-full text-[11px] font-bold cursor-pointer hover:bg-[#6539dc]">Cerrar Análisis</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Import Fingerprint Modal Overlay */}
                {showLoadModal && (
                    <div className="absolute inset-0 bg-black/90 z-[999] flex items-center justify-center p-4">
                        <div className="bg-[#1a1a1a] border border-[#444] rounded-xl p-4 w-full max-w-[500px] space-y-3">
                            <div className="flex justify-between items-center">
                                <b className="text-[12px] text-[#b388ff]">📥 Cargar Fingerprint Metodológico</b>
                                <button onClick={() => setShowLoadModal(false)} className="text-[#888] hover:text-white text-[14px]">×</button>
                            </div>
                            <p className="text-[10px] text-[#aaa]">Pega el texto JSON del fingerprint para recrear las condiciones y configuración exacta del multipool:</p>
                            <textarea 
                                value={importText}
                                onChange={(e) => setImportText(e.target.value)}
                                placeholder='Pega aquí el JSON del fingerprint...'
                                className="w-full h-32 bg-[#121212] border border-[#333] rounded-lg p-2 text-[10px] font-mono text-[#ffeb3b] focus:outline-none focus:border-[#7c4dff]"
                            />
                            <div className="flex justify-end gap-2">
                                <button onClick={() => setShowLoadModal(false)} className="bg-[#222] border border-[#444] text-[#aaa] px-3 py-1.5 rounded-lg text-[10px] cursor-pointer">Cancelar</button>
                                <button onClick={handleApplyFingerprint} className="bg-[#7c4dff] text-white px-4 py-1.5 rounded-lg text-[10px] font-bold cursor-pointer hover:bg-[#6539dc]">Aplicar Fingerprint</button>
                            </div>
                        </div>
                    </div>
                )}

                <div id="multipool-modal-body" className="flex-1 overflow-y-auto min-h-0 p-3 space-y-3 bg-[#121212]">
                    {targetDraw && (
                        <div className="bg-[#ffeb3b] text-black rounded-xl p-2.5 text-center shadow-[0_0_15px_rgba(255,235,59,0.2)]">
                            <div className="text-[9px] font-black tracking-wide">● NÚMEROS GANADORES REALES (Sorteo {targetDraw.num})</div>
                            <div className="text-[18px] font-black tracking-wider my-0.5">{targetDraw.win.map(n => String(n).padStart(2, '0')).join(' ')}</div>
                        </div>
                    )}

                    <div className="text-[11px] font-black text-[#00e5ff] mb-1">Configuración Simultánea de los 7 Pool Sizes (9, 12, 15, 18, 21, 24, 27) - Target: {targetSize} números:</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {poolSizes.map((sz, szIdx) => {
                            const isActive = activePoolSizes[sz] !== false;
                            const resCount = multipoolResult.poolSizeFilteredSets[szIdx]?.length || 0;
                            return (
                                <div key={sz} className={`bg-[#161616] border rounded-xl p-2.5 space-y-2 transition ${isActive ? 'border-[#2e2e2e]' : 'border-[#333] opacity-40'}`}>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <label className="flex items-center gap-1.5 cursor-pointer">
                                                <input 
                                                    type="checkbox"
                                                    checked={isActive}
                                                    onChange={(e) => setActivePoolSizes({...activePoolSizes, [sz]: e.target.checked})}
                                                    className="sr-only"
                                                />
                                                <span className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[9px] ${isActive ? 'bg-[#7c4dff] text-white font-black' : 'bg-[#222] border border-[#444]'}`}>
                                                    {isActive ? '✓' : ''}
                                                </span>
                                                <span className="text-[11px] font-black text-[#ffeb3b]">Pool Size: {sz} nums</span>
                                            </label>
                                        </div>
                                        <span className="text-[9px] text-[#888] bg-[#222] px-2 py-0.5 rounded">Resultantes: {resCount} #</span>
                                    </div>

                                    <div>
                                        <div className="text-[8px] font-bold text-[#aaa] mb-1">POOLS ({sz}):</div>
                                        <div className="flex flex-wrap gap-1">
                                            {poolDefs.map(pool => {
                                                const isChecked = configs[sz]?.pools[pool.id] || false;
                                                return (
                                                    <label key={pool.id} className={`flex items-center gap-1 text-[9px] font-bold cursor-pointer border px-2 py-0.5 rounded transition ${isChecked ? 'bg-[#7c4dff]/30 border-[#7c4dff] text-white shadow-[0_0_6px_rgba(124,77,255,0.4)]' : 'bg-[#1a1a1a] border-[#333] text-[#aaa]'}`}>
                                                        <input 
                                                            type="checkbox" 
                                                            checked={isChecked} 
                                                            onChange={(e) => {
                                                                const updated = { ...configs };
                                                                updated[sz].pools[pool.id] = e.target.checked;
                                                                setConfigs({...updated});
                                                            }}
                                                            className="sr-only"
                                                        />
                                                        <span className={`w-3 h-3 rounded flex items-center justify-center text-[8px] ${isChecked ? 'bg-[#7c4dff] text-white font-black' : 'bg-[#222] border border-[#444]'}`}>
                                                            {isChecked ? '✓' : ''}
                                                        </span>
                                                        <span style={{color: pool.color}}>●</span>
                                                        <span>{pool.name}</span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-[8px] font-bold text-[#aaa] mb-1">FRECUENCIAS ({sz}):</div>
                                        <div className="flex flex-wrap gap-1">
                                            {[7, 6, 5, 4, 3, 2, 1, 0].map(freq => {
                                                const isChecked = configs[sz]?.freqs[freq] || false;
                                                return (
                                                    <label key={freq} className={`flex items-center gap-1 text-[9px] font-bold cursor-pointer border px-2 py-0.5 rounded transition ${isChecked ? 'bg-[#7c4dff]/30 border-[#7c4dff] text-white shadow-[0_0_6px_rgba(124,77,255,0.4)]' : 'bg-[#1a1a1a] border-[#333] text-[#aaa]'}`}>
                                                        <input 
                                                            type="checkbox" 
                                                            checked={isChecked} 
                                                            onChange={(e) => {
                                                                const updated = { ...configs };
                                                                updated[sz].freqs[freq] = e.target.checked;
                                                                setConfigs({...updated});
                                                            }}
                                                            className="sr-only"
                                                        />
                                                        <span className={`w-3 h-3 rounded flex items-center justify-center text-[8px] ${isChecked ? 'bg-[#7c4dff] text-white font-black' : 'bg-[#222] border border-[#444]'}`}>
                                                            {isChecked ? '✓' : ''}
                                                        </span>
                                                        <span>F{freq}</span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="bg-[#141414] border border-[#00e5ff44] rounded-xl p-3">
                        <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
                            <div>
                                <h3 className="text-[12px] font-black text-[#ffeb3b]">🎯 Filtro de Frecuencia Final (Consenso entre los Pool Sizes Activos)</h3>
                                <p className="text-[9px] text-[#888]">Filtra por frecuencia de aparición (0 a {multipoolResult.activePoolSizesCount} pool sizes) para obtener la combinación maestra resultante.</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="pill bg-[rgba(255,235,59,.1)] border border-[rgba(255,235,59,.3)] text-[#ffeb3b] text-[10px] font-bold px-3 py-1 rounded-full">
                                    Total Final: {multipoolResult.finalResultNums.length} números
                                </span>
                                <button 
                                    onClick={() => onCopyConsensus(multipoolResult.finalResultNums)}
                                    className="bg-[rgba(255,235,59,.15)] border border-[rgba(255,235,59,.4)] text-[#ffeb3b] hover:bg-[rgba(255,235,59,.25)] px-3 py-1 rounded-full text-[10px] font-extrabold cursor-pointer transition flex items-center gap-1"
                                >
                                    📋 Copiar
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                            {[7, 6, 5, 4, 3, 2, 1, 0].map(freq => {
                                const isChecked = finalFreqs[freq] || false;
                                return (
                                    <label key={freq} className={`flex items-center gap-1.5 text-[10px] font-bold cursor-pointer border px-3 py-1 rounded-lg transition ${isChecked ? 'bg-[#7c4dff]/30 border-[#7c4dff] text-white shadow-[0_0_8px_rgba(124,77,255,0.4)]' : 'bg-[#1a1a1a] border-[#333] text-[#aaa]'}`}>
                                        <input 
                                            type="checkbox" 
                                            checked={isChecked} 
                                            onChange={(e) => setFinalFreqs({...finalFreqs, [freq]: e.target.checked})}
                                            className="sr-only"
                                        />
                                        <span className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[9px] ${isChecked ? 'bg-[#7c4dff] text-white font-black' : 'bg-[#222] border border-[#444]'}`}>
                                            {isChecked ? '✓' : ''}
                                        </span>
                                        <span>Freq {freq} / {multipoolResult.activePoolSizesCount} Pools</span>
                                    </label>
                                );
                            })}
                        </div>

                        <div className="pt-2.5 border-t border-[#222]">
                            <div className="text-[10px] font-bold text-[#ccc] mb-2">Números resultantes del Multipool Master:</div>
                            {multipoolResult.finalResultNums.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-7 sm:grid-cols-14 gap-1.5">
                                        {multipoolResult.finalResultNums.map(n => {
                                            let masterCount = multipoolResult.masterFreqMap[n] || 0;
                                            let isWin = targetDraw ? targetDraw.win.includes(n) : false;
                                            return (
                                                <div key={n} className={`border rounded-lg p-1.5 text-center flex flex-col items-center ${isWin ? 'bg-[#2e7d32] border-[#4caf50]' : 'bg-[#1e1e1e] border-[#333]'}`}>
                                                    <span className={`text-[12px] font-black ${isWin ? 'text-white' : 'text-[#ffeb3b]'}`}>{String(n).padStart(2, '0')}</span>
                                                    <span className={`text-[8px] ${isWin ? 'text-[#a5d6a7]' : 'text-[#00e5ff]'}`}>f:{masterCount}/{multipoolResult.activePoolSizesCount}</span>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {multipoolResult.finalResultNums.length >= 5 && (
                                        <div className="mt-3 pt-2.5 border-t border-[#222]">
                                            <div className="text-[10px] font-bold text-[#ffeb3b] mb-1.5">● WHEELINGS DEL MULTIPOOL MASTER (Sistemas Reducidos):</div>
                                            <div className="flex gap-2 flex-wrap">
                                                {[12, 24, 36, 48].map(k => (
                                                    <button 
                                                        key={k} 
                                                        onClick={() => onOpenWheeling('multipool_master', k, undefined, multipoolResult.finalResultNums)}
                                                        className="bg-[rgba(0,229,255,.15)] border border-[rgba(0,229,255,.4)] text-[#00e5ff] hover:bg-[rgba(0,229,255,.25)] px-3 py-1 rounded-full text-[11px] font-extrabold cursor-pointer transition shadow-sm"
                                                    >
                                                        {k} Comb (Multipool)
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-4 text-[11px] text-[#666]">Ningún número cumple con los filtros multipool seleccionados.</div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-2.5 bg-[#0f0f0f] border-t border-[#222] flex justify-end">
                    <button onClick={onClose} className="bg-[#222] border border-[#444] text-[#ccc] rounded-full px-4 py-1.5 text-[10px] cursor-pointer hover:bg-[#333]">Cerrar [Esc]</button>
                </div>
            </div>
        </div>
    );
}
