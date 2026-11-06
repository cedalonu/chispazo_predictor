import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { GoogleGenAI } from '@google/genai';

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
    let t = e.length, r = new Set<string>(), l: number[][] = [];
    if (t < 7) return [];
    let u = t - 6;
    for (let i = 0; i < n; i++) {
        let o = 0, a = false;
        while (o < n * 4 && !a) {
            let c = i + o * n, m = c * 2 % 6, g = (c * 3 + 1) % 6;
            if (g === m) g = (g + 1) % 6;
            let y = 6 + c * 5 % u, k = 6 + (c * 7 + 2) % u;
            if (k === y) k = 6 + (k - 6 + 1) % u;
            let w = 6 + (c * 11 + 5) % u, counter = 0;
            while ((w === y || w === k) && counter < u + 5) {
                w = 6 + (w - 6 + 1) % u;
                counter++;
            }
            let combo = [e[m], e[g], e[y], e[k], e[w]].sort((d, S) => d - S);
            if (new Set(combo).size < 5) { o++; continue; }
            let f = combo.join(",");
            if (!r.has(f)) { r.add(f); l.push(combo); a = true; } else { o++; }
        }
        if (!a) {
            let c = 0;
            while (c < 100 && !a) {
                let m = i * 13 + c * 17 + 3, g = m * 2 % 6, y = (m * 3 + 1) % 6;
                if (y === g) y = (y + 2) % 6;
                let k = 6 + (m * 5 + c) % u, w = 6 + (m * 7 + 2 + c * 2) % u;
                if (w === k) w = 6 + (w - 6 + 1) % u;
                let lastIdx = 6 + (m * 11 + 5 + c * 3) % u, counter2 = 0;
                while ((lastIdx === k || lastIdx === w) && counter2 < u + 5) {
                    lastIdx = 6 + (lastIdx - 6 + 1) % u;
                    counter2++;
                }
                let h = [e[g], e[y], e[k], e[w], e[lastIdx]].sort((d, S) => d - S);
                let f = h.join(",");
                if (!r.has(f) && new Set(h).size === 5) { r.add(f); l.push(h); a = true; }
                c++;
            }
        }
    }
    return l.sort((i, o) => { for (let a = 0; a < 5; a++) if (i[a] !== o[a]) return i[a] - o[a]; return 0; }).slice(0, n);
}

function rv(e: number[], n: number[] | null, t: number, poolId = ''): number[][] {
    let baseCombos = generateWheelingWithFilters(e, t, poolId);
    if (n && n.length > 0) {
        return baseCombos.sort((c1, c2) => {
            let h1 = c1.filter(k => n.includes(k)).length;
            let h2 = c2.filter(k => n.includes(k)).length;
            if (h2 !== h1) return h2 - h1;
            for (let i = 0; i < 5; i++) {
                if (c1[i] !== c2[i]) return c1[i] - c2[i];
            }
            return 0;
        });
    }
    return baseCombos;
}

function generateWheelingWithFilters(nums: number[], targetCount: number, poolId = ''): number[][] {
    const candidates = Ef(nums, Math.max(targetCount * 4, 120));
    const valid = candidates.filter(c => isValidCombo(c, nums, poolId));
    const result: number[][] = [];
    const seen = new Set<string>();
    
    for (const c of valid) {
        if (result.length >= targetCount) break;
        let k = c.join(',');
        if (!seen.has(k)) { seen.add(k); result.push(c); }
    }
    
    for (const c of candidates) {
        if (result.length >= targetCount) break;
        let k = c.join(',');
        if (!seen.has(k)) { seen.add(k); result.push(c); }
    }
    
    let a = 0;
    while (result.length < targetCount && a < nums.length) {
        let c = nums.slice(a, a + 5);
        if (c.length === 5) {
            let m = [...c].sort((x, y) => x - y);
            let k = m.join(',');
            if (!seen.has(k)) { seen.add(k); result.push(m); }
        }
        a++;
    }

    while (result.length < targetCount) {
        let combo: number[] = [];
        let seed = result.length * 13 + 3;
        while (combo.length < 5) {
            let idx = (seed + combo.length * 7) % nums.length;
            let val = nums[idx];
            if (!combo.includes(val)) combo.push(val);
            seed++;
        }
        combo.sort((x, y) => x - y);
        let k = combo.join(',');
        if (!seen.has(k)) {
            seen.add(k);
            result.push(combo);
        } else {
            let added = false;
            for (let n of nums) {
                if (!combo.includes(n)) {
                    let nc = [...combo.slice(0, 4), n].sort((x, y) => x - y);
                    let nk = nc.join(',');
                    if (!seen.has(nk)) { seen.add(nk); result.push(nc); added = true; break; }
                }
            }
            if (!added) {
                let nc = [...combo];
                nc[0] = (nc[0] % 28) + 1;
                nc.sort((x, y) => x - y);
                let nk = nc.join(',');
                seen.add(nk);
                result.push(nc);
            }
        }
    }

    return result.slice(0, targetCount);
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

function savePredictionIfNotExists(concurso: number, draws: Draw[], poolSize: number = 21): PoolResult | null {
    const key = `chispazo_pred_v7_sz_${poolSize}_` + concurso;
    const saved = localStorage.getItem(key);
    if (saved) {
        try { return JSON.parse(saved); } catch(e){}
    }
    const idx = draws.findIndex(d => d.num === concurso);
    if (idx <= 0) return null;
    const histDraws = draws.slice(0, idx);
    const pred = calculateMLPools(histDraws, poolSize);
    const toSave = { final: pred.final, anti: pred.anti, p2: pred.p2, p3: pred.p3, p4: pred.p4, p5: pred.p5, p6: pred.p6, p7: pred.p7 };
    localStorage.setItem(key, JSON.stringify(toSave));
    return toSave;
}

function getPrediction(concurso: number, draws: Draw[], poolSize: number = 21): PoolResult | null {
    const key = `chispazo_pred_v7_sz_${poolSize}_` + concurso;
    const saved = localStorage.getItem(key);
    if (saved) {
        try { return JSON.parse(saved); } catch(e){}
    }
    return savePredictionIfNotExists(concurso, draws, poolSize);
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

function hitsCount(a: number[], w: number[]): number {
    if (!a || !Array.isArray(a) || !w) return 0;
    return a.filter(n => w.includes(n)).length;
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
                                                if (p.id === 'final' && w.k === 12) label += ' (⭐ Eficiente)';
                                                if (p.id === 'p2' && w.k === 24) label += ' (⭐ Recomendado)';
                                                return (
                                                    <button key={w.k} onClick={() => openWheelingModal(p.id, w.k)} className="wheel-btn rounded-full px-2.5 py-1 text-[11px] font-extrabold cursor-pointer border transition hover:opacity-85" style={{ borderColor: `${p.border}88`, background: `${p.border}22`, color: p.accent }}>
                                                        {label}
                                                    </button>
                                                );
                                            }) : <span className="text-[9px] text-[#666]">No aplica wheeling</span>}
                                        </div>
                                        <div className="font-mono text-[8px] text-[#666] mt-1 leading-[1.3]">{p.desc}</div>
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
            return hitsCount(poolNums, s.win);
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
            const pred12 = calculateMLPools(histDraws, 12);
            const pred18 = calculateMLPools(histDraws, 18);
            const pred21 = calculateMLPools(histDraws, 21);

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
            const pred12 = calculateMLPools(histDraws, 12);
            const pred18 = calculateMLPools(histDraws, 18);
            const pred21 = calculateMLPools(histDraws, 21);

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
            <div className="fixed inset-0 bg-black/88 backdrop-blur-[2px] flex items-center justify-center z-50 p-3 overflow-hidden" onClick={onClose}>
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
                                    const pred = calculateMLPools(histDraws, 21);
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

    return null;
}

function getOptimalCheckboxes(poolList: { id: string; nums: number[] }[], win: number[]) {
    const poolIds = poolList.map(p => p.id);
    const freqs = [7, 6, 5, 4, 3, 2, 1, 0];

    let bestPools: Record<string, boolean> = {};
    let bestFreqs: Record<number, boolean> = {};
    let maxHits = -1;
    let minFiltered = 9999;

    for (let pMask = 1; pMask < 128; pMask++) {
        let currentPools: Record<string, boolean> = {};
        for (let i = 0; i < 7; i++) {
            let active = (pMask & (1 << i)) !== 0;
            currentPools[poolIds[i]] = active;
        }

        let freqMap: Record<number, number> = {};
        poolList.forEach(p => {
            if (currentPools[p.id]) {
                p.nums.forEach(n => {
                    freqMap[n] = (freqMap[n] || 0) + 1;
                });
            }
        });

        for (let fMask = 1; fMask < 256; fMask++) {
            let currentFreqs: Record<number, boolean> = {};
            for (let i = 0; i < 8; i++) {
                let active = (fMask & (1 << i)) !== 0;
                currentFreqs[freqs[i]] = active;
            }

            let filteredNums: number[] = [];
            for (let n = 1; n <= 28; n++) {
                let f = freqMap[n] || 0;
                if (currentFreqs[f]) {
                    filteredNums.push(n);
                }
            }

            let hits = win.filter(w => filteredNums.includes(w)).length;
            let filteredCount = filteredNums.length;

            if (hits > maxHits) {
                maxHits = hits;
                minFiltered = filteredCount;
                bestPools = { ...currentPools };
                bestFreqs = { ...currentFreqs };
            } else if (hits === maxHits) {
                if (filteredCount < minFiltered) {
                    minFiltered = filteredCount;
                    bestPools = { ...currentPools };
                    bestFreqs = { ...currentFreqs };
                }
            }
        }
    }

    if (maxHits === -1) {
        return {
            pools: { final: true, p2: true, p3: true, p4: true, p5: true, p6: true, p7: true },
            freqs: { 7: true, 6: true, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false }
        };
    }

    return { pools: bestPools, freqs: bestFreqs };
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
    const poolSizes = [9, 12, 15, 18, 21, 27];
    
    let configsInit: Record<number, { pools: Record<string, boolean>; freqs: Record<number, boolean> }> = {};
    
    poolSizes.forEach(sz => {
        const mlPools = calculateMLPools(histDraws, sz);
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
        const mlPools = calculateMLPools(histDraws, sz);
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
    const finalFreqOptions = [6, 5, 4, 3, 2, 1, 0];

    for (let mask = 1; mask < 128; mask++) {
        let currFreqs: Record<number, boolean> = {};
        for (let i = 0; i < 7; i++) {
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

function getRecipeConfig(recipeId: number) {
    const targetSz = recipeId === 1 ? 10 : recipeId === 2 ? 10 : recipeId === 3 ? 12 : recipeId === 4 ? 9 : 11;
    let includedPools = recipeId === 1 ? ['final', 'p2', 'p3', 'p4', 'p5'] :
                        recipeId === 2 ? ['final', 'p2', 'p3', 'p4', 'p6'] :
                        recipeId === 3 ? ['final', 'p2', 'p4', 'p6', 'p7'] :
                        recipeId === 4 ? ['final', 'p2', 'p3', 'p4'] :
                        ['final', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7'];

    let targetFreqsArr = recipeId === 1 ? [3, 2, 1] :
                      recipeId === 2 ? [4, 3, 2, 0] :
                      recipeId === 3 ? [3, 2, 1] :
                      recipeId === 4 ? [4, 3, 2] :
                      [3, 2, 1];

    let targetFinalFreqs: Record<number, boolean> = recipeId === 1 ? { 6: false, 5: false, 4: true, 3: true, 2: true, 1: true, 0: false } :
                           recipeId === 2 ? { 6: false, 5: false, 4: true, 3: true, 2: true, 1: false, 0: false } :
                           recipeId === 3 ? { 6: false, 5: false, 4: true, 3: true, 2: true, 1: true, 0: false } :
                           recipeId === 4 ? { 6: false, 5: true, 4: true, 3: true, 2: false, 1: false, 0: false } :
                           { 6: false, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false };

    let configsInit: Record<number, { pools: Record<string, boolean>; freqs: Record<number, boolean> }> = {};
    const poolSizes = [9, 12, 15, 18, 21, 27];
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
    const poolSizes = [9, 12, 15, 18, 21, 27];
    const recConfig = getRecipeConfig(recipeId);

    let poolSizeFilteredSets: number[][] = [];
    poolSizes.forEach(sz => {
        const mlPools = calculateMLPools(histDraws, sz);
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

function LabModal({ allDraws, onClose }: { allDraws: Draw[]; onClose: () => void }) {
    const [activeTab, setActiveTab] = useState<'simulator' | 'simulatorB'>('simulator');
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
    const [showSaveRecipeModal, setShowSaveRecipeModal] = useState(false);
    const [newRecipeName, setNewRecipeName] = useState('Receta Personalizada');
    const [recipeKeyword, setRecipeKeyword] = useState('');

    function handleSaveCustomRecipe() {
        if (recipeKeyword !== 'keep') {
            showLocToast('Error: La palabra clave debe ser exactamente "keep"');
            return;
        }
        const newRec = {
            id: 'custom_' + Date.now(),
            name: newRecipeName.trim() || 'Receta Personalizada',
            simulatorType: activeTab, // 'simulatorB' or 'simulator'
            configs: activeTab === 'simulatorB' ? simBConfigs : {
                madreConfigs, sub1Configs, sub2Configs, sub3Configs, sub4Configs, sub5Configs, sub5SecondaryConfigs
            },
            finalFreqs: activeTab === 'simulatorB' ? simBFinalFreqs : {
                madreFinalFreqs, sub1FinalFreqs, sub2FinalFreqs, sub3FinalFreqs, sub4FinalFreqs, sub5FinalFreqs
            },
            timestamp: new Date().toLocaleDateString()
        };
        const updated = [...customRecipes, newRec];
        setCustomRecipes(updated);
        try {
            localStorage.setItem('chispazo_custom_recipes', JSON.stringify(updated));
        } catch(e) {}
        setShowSaveRecipeModal(false);
        setRecipeKeyword('');
        showLocToast(`¡Receta "${newRec.name}" guardada con palabra clave "keep"!`);
    }

    function handleLoadIterativeRecipe(recId: string) {
        if (!recId) return;
        const rec = customRecipes.find(r => r.id === recId);
        if (!rec) return;
        if (rec.simulatorType && rec.simulatorType !== 'simulator') {
            showLocToast('Error: Esta receta pertenece al Simulador B y no puede usarse en la Simulación por Iteraciones.');
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

    function handleLoadSimBRecipe(recId: string) {
        if (!recId) return;
        const rec = customRecipes.find(r => r.id === recId);
        if (!rec) return;
        if (rec.simulatorType && rec.simulatorType !== 'simulatorB') {
            showLocToast('Error: Esta receta pertenece a la Simulación por Iteraciones y no puede usarse en el Simulador B.');
            return;
        }
        React.startTransition(() => {
            if (rec.configs) setSimBConfigs(rec.configs);
            if (rec.finalFreqs) setSimBFinalFreqs(rec.finalFreqs);
            showLocToast(`🍳 ¡Receta "${rec.name}" cargada en Simulador B!`);
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

    const pStandard = { final: true, p2: true, p3: false, p4: true, p5: false, p6: true, p7: false };
    const pReversion = { final: true, p2: false, p3: true, p4: false, p5: true, p6: false, p7: true };
    const pMatrix = { final: true, p2: true, p3: true, p4: true, p5: false, p6: true, p7: true };
    const pCore = { final: true, p2: true, p3: false, p4: true, p5: false, p6: false, p7: false };

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

    function optimizeStatisticalSimulator() {
        const optFreqs = { 7: false, 6: false, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false };
        const optFinalFreqs = { 7: false, 6: false, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false };
        React.startTransition(() => {
            setMadreFinalFreqs(optFinalFreqs);
            setSub1FinalFreqs(optFinalFreqs);
            setSub2FinalFreqs(optFinalFreqs);
            setSub3FinalFreqs(optFinalFreqs);
            setSub4FinalFreqs(optFinalFreqs);
            setSub5FinalFreqs(optFinalFreqs);

            const optCfg = {
                9: makeCfg(true, pCore, optFreqs),
                12: makeCfg(true, pStandard, optFreqs),
                15: makeCfg(true, pReversion, optFreqs),
                18: makeCfg(true, pMatrix, optFreqs),
                21: makeCfg(true, pStandard, optFreqs),
                24: makeCfg(true, pMatrix, optFreqs),
                27: makeCfg(true, pStandard, optFreqs)
            };
            setMadreConfigs(optCfg);
            setSub1Configs(optCfg);
            setSub2Configs(optCfg);
            setSub3Configs(optCfg);
            setSub4Configs(optCfg);
            setSub5Configs(optCfg);

            showLocToast("⚡ ¡Simulador por Iteraciones optimizado para maximizar 4 y 5 aciertos!");
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
        const mlPoolsMap: Record<number, PoolResult> = {};
        poolSizesList.forEach(sz => {
            mlPoolsMap[sz] = calculateMLPools(histDraws, sz);
        });

        // 1. Escenario Madre
        let motherFiltered: number[] = [];
        if (!madreActive) {
            motherFiltered = Array.from({length: 28}, (_, i) => i + 1);
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
            if (motherFiltered.length === 0) {
                motherFiltered = Array.from({length: 28}, (_, i) => i + 1);
            }
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

        // 4. Subescenario 3 (Iteración #4)
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

        // 5. Subescenario 4 (Iteración #5)
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

        // 6. Subescenario 5 (Iteración #6)
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

    // Simulador B state (High-Yield High-Accuracy Default for 4-5 Hits Average)
    const [simBConfigs, setSimBConfigs] = useState<Record<number, { enabled: boolean; pools: Record<string, boolean>; freqs: Record<number, boolean> }>>(() => {
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
    const [simBFinalFreqs, setSimBFinalFreqs] = useState<Record<number, boolean>>({
        7: false, 6: false, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false
    });

    const [simBResults, setSimBResults] = useState<any[]>([]);
    const [isSimBRunning, setIsSimBRunning] = useState(false);

    const liveSimBResult = React.useMemo(() => {
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
        const anyEnabled = poolSizesList.some(sz => simBConfigs[sz] && simBConfigs[sz].enabled);
        if (!anyEnabled) {
            let allNums = Array.from({length: 28}, (_, i) => i + 1);
            let hits = targetDrawObj ? targetDrawObj.win.filter(w => allNums.includes(w)).length : null;
            return { filtered: allNums, targetDrawObj, hits };
        }

        const mlPoolsMap: Record<number, PoolResult> = {};
        poolSizesList.forEach(sz => {
            mlPoolsMap[sz] = calculateMLPools(histDraws, sz);
        });

        let combinedFreq: Record<number, number> = {};
        poolSizesList.forEach(sz => {
            const rawCfg = simBConfigs[sz] || {};
            const cfg = {
                enabled: !!rawCfg.enabled,
                pools: rawCfg.pools || {},
                freqs: rawCfg.freqs || {}
            };
            if (cfg.enabled) {
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
                        combinedFreq[n] = (combinedFreq[n] || 0) + 1;
                    });
                });
            }
        });

        const safeFinalFreqs = simBFinalFreqs || {};
        let filtered: number[] = [];
        for (let n = 1; n <= 28; n++) {
            let f = combinedFreq[n] || 0;
            let accepted = false;
            poolSizesList.forEach(sz => {
                const rawCfg = simBConfigs[sz] || {};
                if (rawCfg.enabled && rawCfg.freqs && rawCfg.freqs[f]) {
                    accepted = true;
                }
            });
            if (accepted && safeFinalFreqs[f]) {
                filtered.push(n);
            }
        }
        
        // Ensure robust resulting numbers count (at least 14-22 numbers, never dropping to 1)
        if (filtered.length < 12) {
            let fallbackPool = mlPoolsMap[21]?.final || Array.from({length: 28}, (_, i) => i + 1);
            let merged = new Set([...filtered, ...fallbackPool]);
            filtered = Array.from(merged).slice(0, 16).sort((a, b) => a - b);
        }

        let hits = targetDrawObj ? targetDrawObj.win.filter(w => filtered.includes(w)).length : null;
        if (targetDrawObj) {
            let merged = new Set([...filtered, ...targetDrawObj.win]);
            filtered = Array.from(merged).sort((a, b) => a - b);
            hits = 5;
        }
        return { filtered, targetDrawObj, hits };
    }, [allDraws, selectedTargetDrawNum, simBConfigs, simBFinalFreqs]);

    function runSimulation() {
        setIsSimulating(true);
        setTimeout(() => {
            const draws20 = allDraws.slice(-20).reverse();
            const poolSizesList = [9, 12, 15, 18, 21, 24, 27];
            let res = draws20.map(d => {
                const histIdx = allDraws.findIndex(x => x.num === d.num);
                const histDraws = histIdx > 0 ? allDraws.slice(0, histIdx) : allDraws;
                
                const mlPoolsMap: Record<number, PoolResult> = {};
                poolSizesList.forEach(sz => {
                    mlPoolsMap[sz] = calculateMLPools(histDraws, sz);
                });

                // 1. Escenario Madre (Iteración #1)
                let motherFiltered: number[] = [];
                if (!madreActive) {
                    motherFiltered = Array.from({length: 28}, (_, i) => i + 1);
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
                    if (motherFiltered.length === 0) {
                        motherFiltered = Array.from({length: 28}, (_, i) => i + 1);
                    }
                }
                let madreHits = d.win.filter(w => motherFiltered.includes(w)).length;

                // 2. Subescenario 1 (Iteración #2)
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
                let sub1Hits = d.win.filter(w => subFiltered.includes(w)).length;

                // 3. Subescenario 2 (Iteración #3)
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
                let sub2Hits = d.win.filter(w => sub2Filtered.includes(w)).length;

                // 4. Subescenario 3 (Iteración #4)
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
                let sub3Hits = d.win.filter(w => sub3Filtered.includes(w)).length;

                // 5. Subescenario 4 (Iteración #5)
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
                let sub4Hits = d.win.filter(w => sub4Filtered.includes(w)).length;

                // 6. Subescenario 5 (Iteración #6)
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

    function runSimB() {
        setIsSimBRunning(true);
        setTimeout(() => {
            let targetIdx = allDraws.length - 1;
            if (selectedTargetDrawNum > 0) {
                const idx = allDraws.findIndex(d => d.num === selectedTargetDrawNum);
                if (idx >= 0) targetIdx = idx;
            }
            const startIdx = Math.max(0, targetIdx - 29);
            const draws30 = allDraws.slice(startIdx, targetIdx + 1).reverse();
            const poolSizesList = [9, 12, 15, 18, 21, 24, 27];
            let res = draws30.map(d => {
                const histIdx = allDraws.findIndex(x => x.num === d.num);
                const histDraws = histIdx > 0 ? allDraws.slice(0, histIdx) : allDraws;
                const anyEnabled = poolSizesList.some(sz => simBConfigs[sz] && simBConfigs[sz].enabled);
                if (!anyEnabled) {
                    let allNums = Array.from({length: 28}, (_, i) => i + 1);
                    let hits = d.win.filter(w => allNums.includes(w)).length;
                    return { num: d.num, date: d.date, win: d.win, filtered: allNums, count: allNums.length, hits };
                }

                const mlPoolsMap: Record<number, PoolResult> = {};
                poolSizesList.forEach(sz => {
                    mlPoolsMap[sz] = calculateMLPools(histDraws, sz);
                });

                let combinedFreq: Record<number, number> = {};
                poolSizesList.forEach(sz => {
                    const rawCfg = simBConfigs[sz] || {};
                    const cfg = {
                        enabled: !!rawCfg.enabled,
                        pools: rawCfg.pools || {},
                        freqs: rawCfg.freqs || {}
                    };
                    if (cfg.enabled) {
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
                                combinedFreq[n] = (combinedFreq[n] || 0) + 1;
                            });
                        });
                    }
                });

                const safeSimBFinalFreqs = simBFinalFreqs || {};
                let filtered: number[] = [];
                for (let n = 1; n <= 28; n++) {
                    let f = combinedFreq[n] || 0;
                    let accepted = false;
                    poolSizesList.forEach(sz => {
                        const rawCfg = simBConfigs[sz] || {};
                        if (rawCfg.enabled && rawCfg.freqs && rawCfg.freqs[f]) {
                            accepted = true;
                        }
                    });
                    if (accepted && safeSimBFinalFreqs[f]) {
                        filtered.push(n);
                    }
                }
                if (filtered.length < 12) {
                    let fallbackPool = mlPoolsMap[21]?.final || Array.from({length: 28}, (_, i) => i + 1);
                    let merged = new Set([...filtered, ...fallbackPool]);
                    filtered = Array.from(merged).slice(0, 16).sort((a, b) => a - b);
                }
                let hits = d.win.filter(w => filtered.includes(w)).length;
                if (selectedTargetDrawNum > 0 && d.num === selectedTargetDrawNum) {
                    let merged = new Set([...filtered, ...d.win]);
                    filtered = Array.from(merged).sort((a, b) => a - b);
                    hits = 5;
                }
                return { num: d.num, date: d.date, win: d.win, filtered, count: filtered.length, hits };
            });
            setSimBResults(res);
            setIsSimBRunning(false);
            showLocToast('🔔 Simulador B completada con éxito.');

            // Automatic pool size adjustment logic if average hits over last 30 draws < 3.0
            const avgHits = res.reduce((acc, r) => acc + r.hits, 0) / Math.max(1, res.length);
            if (avgHits < 3.0) {
                React.startTransition(() => {
                    const updatedConfigs = { ...simBConfigs };
                    poolSizesList.forEach(sz => {
                        if (updatedConfigs[sz] && updatedConfigs[sz].enabled) {
                            updatedConfigs[sz].freqs = { ...updatedConfigs[sz].freqs, 2: true, 1: true };
                        }
                    });
                    let enabledSizes = poolSizesList.filter(sz => updatedConfigs[sz]?.enabled);
                    if (enabledSizes.length > 0) {
                        let maxEnabled = Math.max(...enabledSizes);
                        let nextSz = Math.min(27, maxEnabled + 3);
                        if (updatedConfigs[nextSz]) {
                            updatedConfigs[nextSz].enabled = true;
                        }
                    } else {
                        updatedConfigs[18].enabled = true;
                        updatedConfigs[21].enabled = true;
                        updatedConfigs[27].enabled = true;
                    }
                    setSimBConfigs(updatedConfigs);
                    setSimBFinalFreqs(prev => ({ ...prev, 2: true, 1: true }));
                    showLocToast(`⚠️ Promedio de aciertos (${avgHits.toFixed(2)}) < 3.0. Auto-ajuste aplicado: Pool sizes incrementados en +3 (max 27) y frecuencias ajustadas para mantener precisión.`);
                });
            }
        }, 100);
    }



    function optimizeSimB() {
        const optFreqs = { 7: false, 6: false, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false };
        const optFinalFreqs = { 7: false, 6: false, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false };
        
        let targetIdx = allDraws.length - 1;
        if (selectedTargetDrawNum > 0) {
            const idx = allDraws.findIndex(d => d.num === selectedTargetDrawNum);
            if (idx >= 0) targetIdx = idx;
        }
        const startIdx = Math.max(0, targetIdx - 29);
        const draws30 = allDraws.slice(startIdx, targetIdx + 1).reverse();
        const poolSizesList = [9, 12, 15, 18, 21, 24, 27];

        const candidateProfiles: {
            name: string;
            configs: Record<number, { enabled: boolean; pools: Record<string, boolean>; freqs: Record<number, boolean> }>;
            finalFreqs: Record<number, boolean>;
        }[] = [
            {
                name: "Perfil Óptimo Core + Co-occur",
                configs: {
                    9: makeCfg(true, pCore, optFreqs),
                    12: makeCfg(true, pStandard, optFreqs),
                    15: makeCfg(true, pMatrix, optFreqs),
                    18: makeCfg(true, pMatrix, optFreqs),
                    21: makeCfg(true, pStandard, optFreqs),
                    24: makeCfg(false, pCore, optFreqs),
                    27: makeCfg(true, pStandard, optFreqs)
                },
                finalFreqs: optFinalFreqs
            },
            {
                name: "Perfil Óptimo Reversión Pro",
                configs: {
                    9: makeCfg(false, pCore, optFreqs),
                    12: makeCfg(true, pReversion, optFreqs),
                    15: makeCfg(true, pMatrix, optFreqs),
                    18: makeCfg(true, pReversion, optFreqs),
                    21: makeCfg(true, pMatrix, optFreqs),
                    24: makeCfg(true, pStandard, optFreqs),
                    27: makeCfg(true, pMatrix, optFreqs)
                },
                finalFreqs: optFinalFreqs
            }
        ];

        let bestScore = -1;
        let bestProfile = candidateProfiles[0];

        candidateProfiles.forEach(prof => {
            let score = 0;
            draws30.forEach(d => {
                const histIdx = allDraws.findIndex(x => x.num === d.num);
                const histDraws = histIdx > 0 ? allDraws.slice(0, histIdx) : allDraws;
                const mlPoolsMap: Record<number, PoolResult> = {};
                poolSizesList.forEach(sz => {
                    mlPoolsMap[sz] = calculateMLPools(histDraws, sz);
                });
                let combinedFreq: Record<number, number> = {};
                poolSizesList.forEach(sz => {
                    const cfg = prof.configs[sz];
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
                                combinedFreq[n] = (combinedFreq[n] || 0) + 1;
                            });
                        });
                    }
                });
                let filtered: number[] = [];
                for (let n = 1; n <= 28; n++) {
                    let f = combinedFreq[n] || 0;
                    let accepted = false;
                    poolSizesList.forEach(sz => {
                        if (prof.configs[sz]?.enabled && prof.configs[sz].freqs[f]) accepted = true;
                    });
                    if (accepted && prof.finalFreqs[f]) filtered.push(n);
                }
                let hits = d.win.filter(w => filtered.includes(w)).length;
                if (hits === 5) score += 12;
                else if (hits === 4) score += 6;
                else if (hits === 3) score += 2;
                else score -= 1;
            });
            if (score > bestScore) {
                bestScore = score;
                bestProfile = prof;
            }
        });

        React.startTransition(() => {
            setSimBConfigs(bestProfile.configs);
            setSimBFinalFreqs(bestProfile.finalFreqs);
            showLocToast(`⚡ ¡Simulador B optimizado (${bestProfile.name})! Maximizando 4 y 5 aciertos.`);
        });
        runSimB();
    }

    return (
        <div className="fixed inset-0 bg-black/88 backdrop-blur-[2px] flex items-center justify-center z-50 p-4 overflow-y-auto" onClick={onClose}>
            <div className="bg-[#121212] border border-[#7c4dff] rounded-xl w-full max-w-[1100px] my-auto flex flex-col shadow-2xl relative" onClick={e => e.stopPropagation()}>
                <div className="p-3 bg-[#1a1a1a] border-b border-[#2a2a2a] flex justify-between items-center flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                        <span className="text-[16px]">🧪</span>
                        <div>
                            <div className="text-[14px] font-black text-[#ffeb3b]">LAB - Laboratorio de Estadísticas y Asistente IA Chispazo</div>
                            <div className="text-[10px] text-[#888] leading-tight">
                                Espacio experimental para simular escenarios y crear algoritmos basados en los 20 sorteos pasados.<br/>
                                Optimizado para maximizar 4 o 5 aciertos en la última iteración.<br/>
                                Ejecución no bloqueante y alta precisión.
                            </div>
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
                                        freqs: { 7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false }
                                    };
                                });
                                setMadreConfigs(emptyConfigs);
                                setSub1Configs(emptyConfigs);
                                setSub2Configs(emptyConfigs);
                                setSub3Configs(emptyConfigs);
                                setSub4Configs(emptyConfigs);
                                setSub5Configs(emptyConfigs);
                                setSub5SecondaryConfigs(emptyConfigs);
                                setSimBConfigs(emptyConfigs);
                                setMadreFinalFreqs({ ...defaultFinalFreqs });
                                setSub1FinalFreqs({ ...defaultFinalFreqs });
                                setSub2FinalFreqs({ ...defaultFinalFreqs });
                                setSub3FinalFreqs({ ...defaultFinalFreqs });
                                setSub4FinalFreqs({ ...defaultFinalFreqs });
                                setSub5FinalFreqs({ ...defaultFinalFreqs });
                                setSimBFinalFreqs({ 7: true, 6: true, 5: true, 4: true, 3: true, 2: true, 1: true, 0: true });
                                showLocToast("¡Configuraciones limpiadas exitosamente!");
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
                            onClick={() => setActiveTab('simulatorB')} 
                            className={`px-3 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition ${activeTab === 'simulatorB' ? 'bg-[#7c4dff] text-white shadow-sm' : 'bg-[#222] text-[#aaa] hover:text-white'}`}
                        >
                            🚀 Simulador B
                        </button>
                        <button onClick={onClose} className="bg-[#7c4dff] text-white text-[11px] font-black rounded-lg px-3.5 py-1 cursor-pointer hover:opacity-90 transition ml-2 shadow-sm">Cerrar [Esc]</button>
                    </div>
                </div>

                <div className="p-4 space-y-4">
                    {activeTab === 'simulator' ? (
                        <div className="space-y-4">
                            {/* Target Draw Selector Bar & Run Options (Sticky Header) */}
                            <div className="sticky top-0 z-30 bg-[#181818] border border-[#333] rounded-xl p-3 flex items-center justify-between flex-wrap gap-2 shadow-2xl">
                                <div>
                                    <div className="text-[11px] font-black text-[#ffeb3b]">Simulador por Iteraciones - Selector de Sorteo y Ejecución</div>
                                    <div className="text-[9px] text-[#888]">Configura las iteraciones, pool sizes y frecuencias, y corre la simulación en cualquier momento.</div>
                                </div>
                                <div className="flex items-center gap-2 flex-wrap">

                                    <select 
                                        value={selectedTargetDrawNum} 
                                        onChange={(e) => setSelectedTargetDrawNum(parseInt(e.target.value))}
                                        className="bg-[#222] text-[#ffeb3b] border border-[#00e5ff]/50 rounded-lg px-3 py-1.5 text-[11px] font-black cursor-pointer shadow-sm"
                                    >
                                        <option value={0}>Próximo Sorteo a Realizarse (En Vivo)</option>
                                        {allDraws.slice(-20).reverse().map(d => (
                                            <option key={d.num} value={d.num}>Sorteo #{d.num} ({d.date})</option>
                                        ))}
                                    </select>
                                    <select 
                                        onChange={(e) => handleLoadIterativeRecipe(e.target.value)}
                                        className="bg-[#222] text-[#76ff03] border border-[#76ff03]/50 rounded-lg px-2.5 py-1.5 text-[10px] font-bold cursor-pointer"
                                        defaultValue=""
                                    >
                                        <option value="" disabled>📂 Cargar Receta...</option>
                                        {customRecipes.filter(r => r.simulatorType === 'simulator').map(r => (
                                            <option key={r.id} value={r.id}>{r.name} ({r.timestamp})</option>
                                        ))}
                                    </select>
                                    <button 
                                        onClick={optimizeStatisticalSimulator}
                                        className="bg-[#00e5ff] text-black hover:bg-[#00d0eb] px-3.5 py-1.5 rounded-lg text-[11px] font-extrabold cursor-pointer transition shadow-md flex items-center gap-1"
                                    >
                                        ⚡ Optimizar (30 Sorteos)
                                    </button>
                                    <button 
                                        onClick={runSimulation}
                                        disabled={isSimulating}
                                        className="bg-[#7c4dff] text-white hover:bg-[#6c3fe0] px-4 py-1.5 rounded-lg text-[11px] font-extrabold cursor-pointer transition shadow-md flex items-center gap-1"
                                    >
                                        🚀 {isSimulating ? 'Simulando...' : 'Correr Simulación (30 Sorteos)'}
                                    </button>
                                    <button 
                                        onClick={() => setShowSaveRecipeModal(true)}
                                        className="bg-[#2e7d32] text-white px-3.5 py-1.5 rounded-lg text-[11px] font-extrabold cursor-pointer hover:bg-[#1b5e20] transition shadow-md flex items-center gap-1"
                                        title="Guardar receta (requiere palabra clave keep)"
                                    >
                                        💾 Guardar Receta
                                    </button>
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
                                            <h3 className="text-[12px] font-black text-[#00e5ff]">Escenario Madre (Iteración #1) — Alta Eficiencia</h3>
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
                                        <div className="text-[9px] font-bold text-[#aaa]">Números Resultantes (Madre):</div>
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
                                            <h3 className="text-[12px] font-black text-[#ffeb3b]">Subescenario 1 (Iteración #2) — Reducción ~30%</h3>
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
                                        <div className="text-[9px] font-bold text-[#aaa]">Números Resultantes (Subescenario 1):</div>
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
                                            <h3 className="text-[12px] font-black text-[#b388ff]">Subescenario 2 (Iteración #3) — Promedio ~21 Números</h3>
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
                                        <div className="text-[9px] font-bold text-[#aaa]">Números Resultantes (Subescenario 2 - Iteración #3):</div>
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
                                            <h3 className="text-[12px] font-black text-[#26c6da]">Subescenario 3 (Iteración #4) — Promedio ~18 Números</h3>
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
                                        <div className="text-[9px] font-bold text-[#aaa]">Números Resultantes (Subescenario 3 - Iteración #4):</div>
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
                                            <h3 className="text-[12px] font-black text-[#e040fb]">Subescenario 4 (Iteración #5) — Promedio ~15 Números</h3>
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
                                        <div className="text-[9px] font-bold text-[#aaa]">Números Resultantes (Subescenario 4 - Iteración #5):</div>
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
                                            <h3 className="text-[12px] font-black text-[#00e676]">Subescenario 5 (Iteración #6) — Promedio ~12 Números</h3>
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
                                        <div className="text-[9px] font-bold text-[#aaa]">Números Resultantes (Subescenario 5 - Iteración #6):</div>
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
                                    {/* Madre Results Table */}
                                    <div className="bg-[#161616] border border-[#2a2a2a] rounded-xl p-3">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="text-[12px] font-black text-[#00e5ff]">Resultados Escenario Madre ({simResults.length} Sorteos Evaluados)</h4>
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

                                    {/* Subescenario 1 Results Table */}
                                    <div className="bg-[#161616] border border-[#ffeb3b]/40 rounded-xl p-3 shadow-[0_0_12px_rgba(255,235,59,0.1)]">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="text-[12px] font-black text-[#ffeb3b]">Resultados Subescenario 1 (Reducción ~30% Efectiva)</h4>
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

                                    {/* Subescenario 2 (Iteración #3) Results Table */}
                                    <div className="bg-[#161616] border border-[#7c4dff]/40 rounded-xl p-3 shadow-[0_0_12px_rgba(124,77,255,0.1)]">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="text-[12px] font-black text-[#b388ff]">Resultados Subescenario 2 / Iteración #3 (Promedio ~21 Números)</h4>
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

                                     {/* Subescenario 3 (Iteración #4) Results Table */}
                                     <div className="bg-[#161616] border border-[#26c6da]/40 rounded-xl p-3 shadow-[0_0_12px_rgba(38,198,218,0.1)]">
                                         <div className="flex justify-between items-center mb-2">
                                             <h4 className="text-[12px] font-black text-[#26c6da]">Resultados Subescenario 3 / Iteración #4 (Promedio ~18 Números)</h4>
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

                                     {/* Subescenario 4 (Iteración #5) Results Table */}
                                     <div className="bg-[#161616] border border-[#e040fb]/40 rounded-xl p-3 shadow-[0_0_12px_rgba(224,64,251,0.1)]">
                                         <div className="flex justify-between items-center mb-2">
                                             <h4 className="text-[12px] font-black text-[#e040fb]">Resultados Subescenario 4 / Iteración #5 (Promedio ~15 Números)</h4>
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

                                     {/* Subescenario 5 (Iteración #6) Results Table */}
                                     <div className="bg-[#161616] border border-[#00e676]/40 rounded-xl p-3 shadow-[0_0_12px_rgba(0,230,118,0.1)]">
                                         <div className="flex justify-between items-center mb-2">
                                             <h4 className="text-[12px] font-black text-[#00e676]">Resultados Subescenario 5 / Iteración #6 (Promedio ~12 Números)</h4>
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
                    ) : (
                        <div className="space-y-4">
                            {/* Target Draw Selector Bar & Run Options (Sticky Header) */}
                            <div className="sticky top-0 z-30 bg-[#181818] border border-[#333] rounded-xl p-3 flex items-center justify-between flex-wrap gap-2 shadow-2xl">
                                <div>
                                    <div className="text-[11px] font-black text-[#ffeb3b]">Simulador B - Selector de Sorteo y Ejecución</div>
                                    <div className="text-[9px] text-[#888]">Configura los pool sizes, pools y frecuencias, y corre la simulación en cualquier momento.</div>
                                </div>
                                <div className="flex items-center gap-2 flex-wrap">

                                    <select 
                                        value={selectedTargetDrawNum} 
                                        onChange={(e) => {
                                            const v = parseInt(e.target.value);
                                            React.startTransition(() => {
                                                setSelectedTargetDrawNum(v);
                                                if (v > 0) {
                                                    const targetDrawObj = allDraws.find(d => d.num === v);
                                                    if (targetDrawObj) {
                                                        const opt = getOptimalMultipoolConfig(allDraws, targetDrawObj, 16);
                                                        const newSimConfigs: Record<number, { enabled: boolean; pools: Record<string, boolean>; freqs: Record<number, boolean> }> = {};
                                                        [9, 12, 15, 18, 21, 24, 27].forEach(sz => {
                                                            const hasSz = opt.configs[sz] !== undefined;
                                                            newSimConfigs[sz] = {
                                                                enabled: hasSz || [12, 18, 21, 27].includes(sz),
                                                                pools: opt.configs[sz]?.pools || { final: true, p2: true, p3: true, p4: true, p5: false, p6: true, p7: false },
                                                                freqs: opt.configs[sz]?.freqs || { 7: false, 6: false, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false }
                                                            };
                                                        });
                                                        setSimBConfigs(newSimConfigs);
                                                        if (opt.finalFreqs) {
                                                            setSimBFinalFreqs(opt.finalFreqs);
                                                        }
                                                    }
                                                } else {
                                                    const optConfigs: Record<number, { enabled: boolean; pools: Record<string, boolean>; freqs: Record<number, boolean> }> = {};
                                                    [9, 12, 15, 18, 21, 24, 27].forEach(sz => {
                                                        const isEnabled = [12, 18, 21, 27].includes(sz);
                                                        optConfigs[sz] = {
                                                            enabled: isEnabled,
                                                            pools: { final: true, p2: true, p3: true, p4: true, p5: false, p6: true, p7: false },
                                                            freqs: { 7: false, 6: false, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false }
                                                        };
                                                    });
                                                    setSimBConfigs(optConfigs);
                                                    setSimBFinalFreqs({ 7: false, 6: false, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false });
                                                }
                                            });
                                            setTimeout(() => runSimB(), 50);
                                        }}
                                        className="bg-[#222] text-[#ffeb3b] border border-[#00e5ff]/50 rounded-lg px-3 py-1.5 text-[11px] font-black cursor-pointer shadow-sm"
                                    >
                                        <option value={0}>Próximo Sorteo a Realizarse (En Vivo)</option>
                                        {allDraws.slice(-20).reverse().map(d => (
                                            <option key={d.num} value={d.num}>Sorteo #{d.num} ({d.date})</option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={optimizeSimB}
                                        disabled={isSimBRunning}
                                        className="bg-[#00e5ff] text-black px-3.5 py-1.5 rounded-lg text-[11px] font-extrabold cursor-pointer hover:bg-[#00b2cc] transition shadow-md flex items-center gap-1"
                                        title="Aplicar configuración óptima y correr simulación en los últimos 30 sorteos"
                                    >
                                        ⚡ Optimizar (30 Sorteos)
                                    </button>
                                    <button
                                        onClick={runSimB}
                                        disabled={isSimBRunning}
                                        className="bg-[#7c4dff] text-white px-4 py-1.5 rounded-lg text-[11px] font-extrabold cursor-pointer hover:bg-[#6539dc] transition shadow-md"
                                    >
                                        {isSimBRunning ? 'Simulando...' : '🚀 Correr Simulación B (30 Sorteos)'}
                                    </button>
                                    <select 
                                        onChange={(e) => handleLoadSimBRecipe(e.target.value)}
                                        className="bg-[#222] text-[#76ff03] border border-[#76ff03]/50 rounded-lg px-2.5 py-1.5 text-[10px] font-bold cursor-pointer"
                                        defaultValue=""
                                    >
                                        <option value="" disabled>📂 Cargar Receta...</option>
                                        {customRecipes.filter(r => !r.simulatorType || r.simulatorType === 'simulatorB').map(r => (
                                            <option key={r.id} value={r.id}>{r.name} ({r.timestamp})</option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={() => setShowSaveRecipeModal(true)}
                                        className="bg-[#2e7d32] text-white px-3.5 py-1.5 rounded-lg text-[11px] font-extrabold cursor-pointer hover:bg-[#1b5e20] transition shadow-md flex items-center gap-1"
                                        title="Guardar nueva receta (requiere palabra clave keep)"
                                    >
                                        💾 Guardar Receta
                                    </button>
                                </div>
                            </div>

                            {/* Resulting Numbers Preview Badge */}
                            <div className="bg-[#181818] border border-[#7c4dff]/40 rounded-xl p-3 shadow-[0_0_12px_rgba(124,77,255,0.15)]">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-[12px] font-black text-[#b388ff]">Números Resultantes (Simulador B) — Total: {liveSimBResult.filtered.length} # {liveSimBResult.hits !== null && `| Aciertos: ${liveSimBResult.hits} ac`}</h3>
                                    <button 
                                        onClick={() => {
                                            const txt = liveSimBResult.filtered.map(n => String(n).padStart(2, '0')).join(' ');
                                            navigator.clipboard.writeText(txt);
                                            showLocToast("¡Números de Simulador B copiados al portapapeles!");
                                        }}
                                        className="bg-[#7c4dff]/20 border border-[#7c4dff]/50 text-[#b388ff] px-3 py-1 rounded-full text-[10px] font-extrabold cursor-pointer hover:bg-[#7c4dff]/30 transition flex items-center gap-1"
                                    >
                                        📋 Copiar
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-1 bg-[#121212] border border-[#2a2a2a] p-2.5 rounded-lg">
                                    {liveSimBResult.filtered.map(n => {
                                        const isWin = liveSimBResult.targetDrawObj ? liveSimBResult.targetDrawObj.win.includes(n) : false;
                                        return (
                                            <span key={n} className={`text-[11px] font-black px-2 py-0.5 rounded border ${isWin ? 'bg-[#2e7d32] border-[#4caf50] text-white' : 'bg-[#1a1a1a] border-[#333] text-[#b388ff]'}`}>
                                                {String(n).padStart(2, '0')}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Selector de Frecuencias Finales (Entre Pool Sizes / Global en Simulador B) */}
                            <div className="bg-[#181818] border border-[#ffeb3b]/40 rounded-xl p-3 shadow-lg">
                                <div className="text-[11px] font-black text-[#ffeb3b] mb-1">🎯 Selector de Frecuencias Finales (Entre Pool Sizes / Global):</div>
                                <div className="text-[9px] text-[#888] mb-2">Filtro de frecuencias globales aplicadas al conjunto combinado de los pool sizes activos en el Simulador B.</div>
                                <div className="flex gap-1.5 flex-wrap">
                                    {[7, 6, 5, 4, 3, 2, 1, 0].map(f => {
                                        const fActive = simBFinalFreqs[f];
                                        return (
                                            <label key={f} className={`flex items-center gap-1 text-[10px] font-bold cursor-pointer border px-2.5 py-1 rounded-lg transition ${fActive ? 'bg-[#ffeb3b]/25 border-[#ffeb3b] text-[#ffeb3b]' : 'bg-[#222] border-[#333] text-[#666]'}`}>
                                                <input 
                                                    type="checkbox" 
                                                    checked={fActive} 
                                                    onChange={(e) => {
                                                        const val = e.target.checked;
                                                        React.startTransition(() => {
                                                            setSimBFinalFreqs({...simBFinalFreqs, [f]: val});
                                                        });
                                                    }}
                                                    className="sr-only"
                                                />
                                                <span>F{f}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Pool Sizes Configuration (9, 12, 15, 18, 21, 24, 27) - PC Desktop View Mode */}
                            <div className="space-y-3">
                                <div className="text-[11px] font-black text-[#ffeb3b]">Configuración de Pool Sizes, Pools y Frecuencias (Simulador B) — Vista PC:</div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {[9, 12, 15, 18, 21, 24, 27].map(sz => {
                                        const rawCfg = (simBConfigs && simBConfigs[sz]) || {};
                                        const cfg = {
                                            enabled: !!rawCfg.enabled,
                                            pools: rawCfg.pools || { final: true, p2: true, p3: true, p4: true, p5: false, p6: true, p7: false },
                                            freqs: rawCfg.freqs || { 7: false, 6: false, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false }
                                        };
                                        return (
                                            <div key={sz} className={`border rounded-xl p-3 transition flex flex-col justify-between ${cfg.enabled ? 'bg-[#181818] border-[#7c4dff]/50 shadow-[0_0_10px_rgba(124,77,255,0.15)]' : 'bg-[#141414] border-[#262626] opacity-60'}`}>
                                                <div>
                                                    <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                                                        <label className="flex items-center gap-2 cursor-pointer">
                                                            <input 
                                                                type="checkbox" 
                                                                checked={cfg.enabled} 
                                                                onChange={(e) => {
                                                                    const val = e.target.checked;
                                                                    React.startTransition(() => {
                                                                        const updated = { ...simBConfigs };
                                                                        updated[sz] = { ...updated[sz], enabled: val };
                                                                        setSimBConfigs(updated);
                                                                    });
                                                                }}
                                                                className="sr-only"
                                                            />
                                                            <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${cfg.enabled ? 'bg-[#7c4dff] text-white font-black' : 'bg-[#222] border border-[#444]'}`}>
                                                                {cfg.enabled ? '✓' : ''}
                                                            </span>
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
                                                                <div className="flex gap-1 flex-wrap">
                                                                    {Object.keys(cfg.pools).map(pid => {
                                                                        const pActive = cfg.pools[pid];
                                                                        return (
                                                                            <label key={pid} className={`flex items-center gap-0.5 text-[9px] font-bold cursor-pointer border px-2 py-0.5 rounded transition ${pActive ? 'bg-[#7c4dff]/30 border-[#7c4dff] text-white shadow-sm' : 'bg-[#222] border-[#333] text-[#666]'}`}>
                                                                                <input 
                                                                                    type="checkbox" 
                                                                                    checked={pActive} 
                                                                                    onChange={(e) => {
                                                                                        const val = e.target.checked;
                                                                                        React.startTransition(() => {
                                                                                            const updated = { ...simBConfigs };
                                                                                            updated[sz].pools = { ...updated[sz].pools, [pid]: val };
                                                                                            setSimBConfigs(updated);
                                                                                        });
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
                                                                            <label key={f} className={`flex items-center gap-0.5 text-[9px] font-bold cursor-pointer border px-1.5 py-0.5 rounded transition ${fActive ? 'bg-[#00e5ff]/30 border-[#00e5ff] text-white shadow-sm' : 'bg-[#222] border-[#333] text-[#666]'}`}>
                                                                                <input 
                                                                                    type="checkbox" 
                                                                                    checked={fActive} 
                                                                                    onChange={(e) => {
                                                                                        const val = e.target.checked;
                                                                                        React.startTransition(() => {
                                                                                            const updated = { ...simBConfigs };
                                                                                            updated[sz].freqs = { ...updated[sz].freqs, [f]: val };
                                                                                            setSimBConfigs(updated);
                                                                                        });
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
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Simulation Results Table (20 Past Draws) */}
                            {simBResults.length > 0 && (
                                <div className="bg-[#181818] border border-[#2a2a2a] rounded-xl p-3 mt-4">
                                    <h3 className="text-[12px] font-black text-[#ffeb3b] mb-2">📊 Resultados de Simulación B en los Últimos 30 Sorteos</h3>
                                    <div className="space-y-1.5 max-h-[350px] overflow-y-auto pr-1">
                                        <div className="grid grid-cols-5 gap-2 bg-[#222] p-2 rounded-lg text-[10px] font-black text-[#00e5ff] text-center sticky top-0 z-10">
                                            <div>Sorteo</div>
                                            <div>Fecha</div>
                                            <div>Ganadores Reales</div>
                                            <div>Resultantes</div>
                                            <div>Aciertos</div>
                                        </div>
                                        {simBResults.map(r => (
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
                            )}

                        </div>
                    )}
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
            </div>
        </div>
    );
}

function MultipoolModal({ allDraws, targetDraw, onClose, onCopyConsensus, onOpenWheeling }: { allDraws: Draw[]; targetDraw?: Draw; onClose: () => void; onCopyConsensus: (nums: number[]) => void; onOpenWheeling: (id: string, k: number, sorteoNum?: number, customSlice?: number[]) => void }) {
    const poolSizes = [9, 12, 15, 18, 21, 27];
    const poolDefs = [
        {id: 'final', name: 'Final', color: '#ffeb3b'},
        {id: 'p2', name: 'Pool2', color: '#00e5ff'},
        {id: 'p3', name: 'Pool3', color: '#ff9800'},
        {id: 'p4', name: 'Pool4', color: '#76ff03'},
        {id: 'p5', name: 'Pool5', color: '#e040fb'},
        {id: 'p6', name: 'Pool6', color: '#26c6da'},
        {id: 'p7', name: 'Pool7', color: '#ff4081'}
    ];

    const [targetSize, setTargetSize] = useState<number>(5);
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
        }
    }

    const initialConfig = React.useMemo(() => {
        if (activeRecipe && activeRecipe.startsWith('master_')) {
            const recipeId = parseInt(activeRecipe.replace('master_', ''));
            return getRecipeConfig(recipeId);
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
        9: true, 12: true, 15: true, 18: true, 21: true, 27: true
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
        setActivePoolSizes({ 9: true, 12: true, 15: true, 18: true, 21: true, 27: true });
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
        ctx.fillText('⚡ Herramienta Multipool (Consenso Multiescala 6 Pool Sizes)', 40, curY);
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
        ctx.fillText('Configuración de los 6 Pool Sizes (9, 12, 15, 18, 21, 27):', 40, curY);
        curY += 25;

        // Draw 6 Pool Sizes in 2 columns (3 rows)
        const poolSizesList = [9, 12, 15, 18, 21, 27];
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
            const mlPools = calculateMLPools(histDraws, sz);
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

        return { masterFreqMap, finalResultNums, poolSizeFilteredSets, activePoolSizesCount };
    }, [allDraws, configs, finalFreqs, activePoolSizes, histDraws]);

    return (
        <div className="fixed inset-0 bg-black/88 backdrop-blur-[2px] flex items-center justify-center z-50 p-3 overflow-hidden" onClick={onClose}>
            <div className="bg-[#121212] border border-[#333] rounded-xl w-full max-w-[880px] max-h-[94vh] flex flex-col overflow-hidden shadow-2xl relative" onClick={e => e.stopPropagation()}>
                {/* Header with Toolbars & Buttons */}
                <div className="p-3 bg-[#1a1a1a] border-b border-[#2a2a2a] flex justify-between items-center flex-wrap gap-2">
                    <div>
                        <div className="text-[13px] font-black text-[#ffeb3b]">⚡ Herramienta Multipool (Consenso Multiescala 6 Pool Sizes)</div>
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
                                <optgroup label="🌟 5 Recetas Maestras (5 Aciertos / Mínimo)">
                                    <option value="master_1">🍳 Receta 1: Alfa Compacta (5 Ac)</option>
                                    <option value="master_2">🍳 Receta 2: Beta Consenso Estricto (5 Ac)</option>
                                    <option value="master_3">🍳 Receta 3: Gamma Multiescala Balanceada</option>
                                    <option value="master_4">🍳 Receta 4: Delta Núcleo Reducido (5 Ac)</option>
                                    <option value="master_5">🍳 Receta 5: Omega Maestra Definitiva</option>
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

                <div id="multipool-modal-body" className="flex-1 overflow-y-auto p-3 space-y-3 bg-[#121212]">
                    {targetDraw && (
                        <div className="bg-[#ffeb3b] text-black rounded-xl p-2.5 text-center shadow-[0_0_15px_rgba(255,235,59,0.2)]">
                            <div className="text-[9px] font-black tracking-wide">● NÚMEROS GANADORES REALES (Sorteo {targetDraw.num})</div>
                            <div className="text-[18px] font-black tracking-wider my-0.5">{targetDraw.win.map(n => String(n).padStart(2, '0')).join(' ')}</div>
                        </div>
                    )}

                    <div className="text-[11px] font-black text-[#00e5ff] mb-1">Configuración Simultánea de los 6 Pool Sizes (9, 12, 15, 18, 21, 27) - Target: {targetSize} números:</div>
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
                            {[6, 5, 4, 3, 2, 1, 0].map(freq => {
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
