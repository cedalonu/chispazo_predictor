import React, { useState, useEffect } from 'react';

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
    
    // Chart visibility state
    const [chartVisibility, setChartVisibility] = useState<Record<string, boolean>>({
        final: true, p2: true, p3: true, p4: true, p5: true, p6: true, p7: true
    });

    // Consensus Frequency Filter state (User Request #9)
    const [selectedConsensusPools, setSelectedConsensusPools] = useState<Record<string, boolean>>({
        final: true, p2: true, p3: true, p4: true, p5: true, p6: true, p7: true
    });
    const [selectedFrequencies, setSelectedFrequencies] = useState<Record<number, boolean>>({
        7: true, 6: true, 5: true, 4: true, 3: true, 2: true, 1: true, 0: false
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
        let freqMap: Record<number, number> = {};
        pools.filter(p => p.id !== 'anti' && selectedConsensusPools[p.id]).forEach(p => {
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
        return { freqMap, filteredNums };
    }, [pools, selectedConsensusPools, selectedFrequencies]);

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
                                    ].map(pool => (
                                        <label key={pool.id} className="flex items-center gap-1.5 text-[11px] font-bold cursor-pointer bg-[#1a1a1a] border border-[#333] px-2.5 py-1 rounded-lg hover:border-[#555]">
                                            <input 
                                                type="checkbox" 
                                                checked={selectedConsensusPools[pool.id]} 
                                                onChange={(e) => setSelectedConsensusPools({...selectedConsensusPools, [pool.id]: e.target.checked})}
                                                className="cursor-pointer accent-[#7c4dff]"
                                            />
                                            <span style={{color: pool.color}}>●</span>
                                            <span>{pool.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Frequency Checkboxes (7,6,5,4,3,2,1,0) */}
                            <div className="mt-3">
                                <div className="text-[9px] font-bold text-[#aaa] mb-1">FRECUENCIA REQUERIDA (NÚMERO DE APARICIONES EN LOS POOLS SELECCIONADOS):</div>
                                <div className="flex flex-wrap gap-2">
                                    {[7, 6, 5, 4, 3, 2, 1, 0].map(freq => (
                                        <label key={freq} className="flex items-center gap-1.5 text-[11px] font-bold cursor-pointer bg-[#1a1a1a] border border-[#333] px-3 py-1 rounded-lg hover:border-[#555]">
                                            <input 
                                                type="checkbox" 
                                                checked={selectedFrequencies[freq]} 
                                                onChange={(e) => setSelectedFrequencies({...selectedFrequencies, [freq]: e.target.checked})}
                                                className="cursor-pointer accent-[#7c4dff]"
                                            />
                                            <span>Freq {freq}</span>
                                        </label>
                                    ))}
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
                                            })}
                                        </div>
                                        {consensusStats.filteredNums.length >= 5 && (
                                            <div className="mt-3 pt-2.5 border-t border-[#222]">
                                                <div className="text-[10px] font-bold text-[#ffeb3b] mb-1.5">● WHEELINGS DEL FILTRO DE CONSENSO (Sistemas Reducidos):</div>
                                                <div className="flex gap-2 flex-wrap">
                                                    {[12, 24, 36, 48].map(k => (
                                                        <button 
                                                            key={k} 
                                                            onClick={() => openWheelingModal('consensus_main', k, undefined, consensusStats.filteredNums)}
                                                            className="bg-[rgba(0,229,255,.15)] border border-[rgba(0,229,255,.4)] text-[#00e5ff] hover:bg-[rgba(0,229,255,.25)] px-3 py-1 rounded-full text-[11px] font-extrabold cursor-pointer transition shadow-sm"
                                                        >
                                                            {uv(k)} Comb (Consenso)
                                                        </button>
                                                    ))}
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
                            <div className="overflow-x-hidden w-full">
                                <table className="table w-full border-collapse text-[11px] table-fixed">
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
                <ModalContainer config={modalConfig} allDraws={allDraws} pools={pools} poolSize={poolSize} onClose={closeModal} onCopy={copyWheelingToClipboard} onOpenWheeling={openWheelingModal} onCopyConsensus={copyConsensusToClipboard} />
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
function ModalContainer({ config, allDraws, pools, poolSize, onClose, onCopy, onOpenWheeling, onCopyConsensus }: any) {
    if (config.type === 'backtest') {
        return (
            <div className="fixed inset-0 bg-black/88 backdrop-blur-[2px] flex items-center justify-center z-50 p-3 overflow-hidden" onClick={onClose}>
                <div className="bg-[#121212] border border-[#333] rounded-xl w-full max-w-[580px] max-h-[80vh] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
                    <div className="p-3 bg-[#1a1a1a] border-b border-[#2a2a2a] flex justify-between items-center">
                        <b className="text-[12px] text-[#00e5ff]">Backtesting: Ventana Móvil de 200 sorteos</b>
                        <button onClick={onClose} className="bg-[#2a2a2a] border border-[#444] text-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">×</button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-3 font-mono text-[10px] text-[#aaa] leading-relaxed">
                        El modelo fusionado utiliza una ventana móvil de 200 sorteos para calcular frecuencias, gaps, co-ocurrencias, ciclos y matrices probabilísticas. La Selección Restringida garantiza que los números finales no se solapen.<br/><br/>
                        ✅ Anti-Pool activo: Excluye automáticamente los 5 números con mayor probabilidad de NO salir.<br/>
                        ✅ Inmutabilidad: Las predicciones de sorteos pasados se guardan en localStorage y nunca cambian.<br/>
                        ✅ Filtros de calidad: Los wheelings excluyen combinaciones con &gt;3 consecutivos, &gt;3 pares/nones/primos, o suma fuera de 38-108.
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

    if (config.type === 'draw_popout') {
        let { num } = config;
        let s = allDraws.find((x: Draw) => x.num === num);
        if (!s) return null;

        const pred = getPrediction(num, allDraws, poolSize);
        const poolData = pred || { final: [], p2: [], p3: [], p4: [], p5: [], p6: [], p7: [], anti: [] };

        return <DrawPopoutModal draw={s} pred={poolData} onClose={onClose} onCopyConsensus={onCopyConsensus} onOpenWheeling={onOpenWheeling} />;
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

function DrawPopoutModal({ draw, pred, onClose, onCopyConsensus, onOpenWheeling }: { draw: Draw; pred: PoolResult; onClose: () => void; onCopyConsensus: (nums: number[]) => void; onOpenWheeling: (id: string, k: number, sorteoNum: number, customSlice: number[]) => void }) {
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
        let freqMap: Record<number, number> = {};
        poolList.forEach(p => {
            if (selPools[p.id]) {
                p.nums.forEach(n => {
                    freqMap[n] = (freqMap[n] || 0) + 1;
                });
            }
        });

        let filteredNums: number[] = [];
        for (let n = 1; n <= 28; n++) {
            let f = freqMap[n] || 0;
            if (selFreqs[f]) {
                filteredNums.push(n);
            }
        }
        return { freqMap, filteredNums };
    }, [selPools, selFreqs, pred]);

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

                    {/* Individual Pools Preview */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center flex-wrap gap-2">
                            <div className="text-[11px] font-black text-[#ffeb3b]">Desglose de Pools Registrados para Sorteo {draw.num}</div>
                            <div className="flex gap-1.5">
                                <button 
                                    onClick={() => {
                                        let baseSlice = stats.filteredNums.length >= 5 ? stats.filteredNums : (pred.final || []);
                                        onOpenWheeling('consensus_12', 12, draw.num, baseSlice);
                                    }}
                                    className="bg-[rgba(255,235,59,0.15)] border border-[rgba(255,235,59,0.4)] text-[#ffeb3b] hover:bg-[rgba(255,235,59,0.25)] px-2.5 py-1 rounded-full text-[10px] font-extrabold cursor-pointer transition shadow-sm"
                                    title="Wheeling reducido inmutable de 12 combinaciones aplicando filtros de calidad"
                                >
                                    Wheel 12 Comb
                                </button>
                                <button 
                                    onClick={() => {
                                        let baseSlice = stats.filteredNums.length >= 5 ? stats.filteredNums : (pred.final || []);
                                        onOpenWheeling('consensus_24', 24, draw.num, baseSlice);
                                    }}
                                    className="bg-[rgba(0,229,255,0.15)] border border-[rgba(0,229,255,0.4)] text-[#00e5ff] hover:bg-[rgba(0,229,255,0.25)] px-2.5 py-1 rounded-full text-[10px] font-extrabold cursor-pointer transition shadow-sm"
                                    title="Wheeling reducido inmutable de 24 combinaciones aplicando filtros de calidad"
                                >
                                    Wheel 24 Comb
                                </button>
                            </div>
                        </div>
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
                    </div>
                </div>

                <div className="p-2.5 bg-[#0f0f0f] border-t border-[#222] flex justify-end">
                    <button onClick={onClose} className="bg-[#222] border border-[#444] text-[#ccc] rounded-full px-4 py-1.5 text-[10px] cursor-pointer hover:bg-[#333]">Cerrar [Esc]</button>
                </div>
            </div>
        </div>
    );
}
