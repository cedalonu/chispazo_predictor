"""
CHISPAZO PREDICTOR V8.2 - rotacion forzada 4 numeros, fix hang, historial dinamico
"""
import csv, pathlib, json
from collections import defaultdict, Counter

CSV = pathlib.Path('Chispazo.csv')
if not CSV.exists():
    CSV = pathlib.Path('/mnt/data/Chispazo_2.csv')
if not CSV.exists():
    CSV = pathlib.Path('/mnt/data/Chispazo.csv')

ROWS=[]
with open(CSV, encoding='utf-8') as f:
    clean=[l for l in f if l.strip()!='']
    reader=csv.DictReader(clean)
    for r in reader:
        try:
            c=int(r['CONCURSO']); R=[int(r['R1']),int(r['R2']),int(r['R3']),int(r['R4']),int(r['R5'])]
            ROWS.append({"c":c,"R":R,"fecha":r['FECHA']})
        except: continue
ROWS.sort(key=lambda x: x["c"])
max_c=ROWS[-1]["c"]
next_c=max_c+1
prev_c=next_c-1

def pool2(rows_up, decay=0.985):
    scores=defaultdict(float)
    for i,row in enumerate(reversed(rows_up[-200:])):
        w=decay**i
        for n in row["R"]:
            scores[n]+=w
    for n in range(1,29):
        jitter=((next_c*37 + n*13) % 100)/1000.0
        scores[n]+=jitter
    s=sorted(scores.items(), key=lambda x: x[1], reverse=True)
    return [n for n,_ in s[:21]]

def pool3(rows_up):
    last_seen={}
    for row in rows_up:
        for n in row["R"]:
            last_seen[n]=row["c"]
    max_c_local=rows_up[-1]["c"]
    gaps=[]
    for n in range(1,29):
        gap=max_c_local-last_seen.get(n,0)
        gap+=((next_c*17 + n*23) % 7)
        gaps.append((n,gap))
    gaps.sort(key=lambda x: x[1], reverse=True)
    Lr=[n for n,_ in gaps[:14]]
    zr=pool2(rows_up)
    for n in zr:
        if n not in Lr and len(Lr)<21:
            Lr.append(n)
    rot=next_c % 5
    Lr=Lr[rot:]+Lr[:rot]
    return Lr

def pool4(rows_up):
    last=rows_up[-40:]
    cnt=Counter()
    for r in last:
        cnt.update(r["R"])
    last_seen={}
    for row in rows_up:
        for n in row["R"]:
            last_seen[n]=row["c"]
    max_c_local=rows_up[-1]["c"]
    scores=[]
    for n in range(1,29):
        gap=max_c_local-last_seen.get(n,0)
        rec=1/(1+gap*0.25)
        jitter=((next_c*29 + n*11) % 100)/200.0
        score=rec*1.5 + cnt.get(n,0)*0.35 + (1/(1+gap))*0.6 + jitter
        scores.append((n,score))
    scores.sort(key=lambda x: x[1], reverse=True)
    return [n for n,_ in scores[:21]]

def pool_final(zr,Lr,Rr):
    votes=defaultdict(float)
    weights=(3,1,2)
    for idx,lst in enumerate([zr,Lr,Rr]):
        w=weights[idx]
        for pos,num in enumerate(lst):
            votes[num]+=w*(1.0-pos*0.02)
    for num in range(1,29):
        cnt=sum(1 for lst in [zr,Lr,Rr] if num in lst)
        if cnt>=2:
            votes[num]+=cnt*2.0
    sorted_votes=sorted(votes.items(), key=lambda x: x[1], reverse=True)
    candidates=[n for n,_ in sorted_votes[:24]]
    start=(next_c % 6)
    Tr=candidates[start:start+16]
    if len(Tr)<16:
        Tr+=candidates[:16-len(Tr)]
    
    # HISTORIAL DINAMICO - busca el sorteo anterior, no 12320 fijo
    hist_candidates=[
        pathlib.Path(f'history/{prev_c}.json'),
        pathlib.Path(f'/mnt/data/history/{prev_c}.json'),
        pathlib.Path(f'history/{12320}.json'),
    ]
    for hist_path in hist_candidates:
        if hist_path.exists():
            try:
                prev=json.loads(hist_path.read_text())
                prevTr=prev['pools']['Tr']
                overlap=len(set(Tr)&set(prevTr))
                print(f"Historial {prev_c}: {prevTr} -> overlap {overlap}/16")
                if overlap>12:
                    remaining=[]
                    for n,_ in sorted_votes:
                        if n not in Tr and n not in remaining:
                            remaining.append(n)
                        if len(remaining)>=4:
                            break
                    if len(remaining)>=4:
                        Tr=Tr[:12]+remaining[:4]
                        print(f"Rotacion forzada 4 numeros: {prevTr} -> {Tr}")
                    else:
                        print(f"WARNING: solo {len(remaining)} disponibles para rotar")
                else:
                    print(f"Overlap OK {overlap}, no fuerza rotacion")
                break
            except Exception as e:
                print(f"Error leyendo {hist_path}: {e}")
                continue
    
    if len(Tr)!=16:
        for n,_ in sorted_votes:
            if n not in Tr:
                Tr.append(n)
            if len(Tr)>=16:
                break
    Tr=Tr[:16]
    return Tr

zr=pool2(ROWS)
Lr=pool3(ROWS)
Rr=pool4(ROWS)
Tr=pool_final(zr,Lr,Rr)

print(f"V8.2 Pools para {next_c}: FINAL 16: {Tr} ({len(Tr)} numeros)")
print(f"P2: {zr}")
print(f"P3: {Lr}")
print(f"P4: {Rr}")

pathlib.Path('/tmp/pools.js').write_text(f"const Tr={Tr};\nconst zr={zr};\nconst Lr={Lr};\nconst Rr={Rr};\n")
pathlib.Path('/tmp/next_prediction.json').write_text(json.dumps({"sorteo":next_c,"Tr":Tr,"zr":zr,"Lr":Lr,"Rr":Rr}, indent=2))

