"""
CHISPAZO PREDICTOR V3 - generador de pools
Implementa la misma logica descrita en tu index:
- Pool2 HOT first (Freq Decay 200)
- Pool3 BALANCED (Gap/Overdue)
- Pool4 BALANCED RECENCY (Recencia x Stickiness)
- Pool FINAL CONSENSUS 16

Lee Chispazo.csv y genera Tr, zr, Lr, Rr para siguiente sorteo
"""
import csv, math, pathlib
from collections import defaultdict, Counter

CSV = pathlib.Path('Chispazo.csv')
ROWS=[]
with open(CSV, encoding='utf-8') as f:
    for r in csv.DictReader(f):
        try:
            c=int(r['CONCURSO'])
            R=[int(r['R1']),int(r['R2']),int(r['R3']),int(r['R4']),int(r['R5'])]
            ROWS.append({"c":c,"R":R,"fecha":r['FECHA']})
        except: continue
ROWS.sort(key=lambda x: x["c"])
LAST200=ROWS[-200:]  # para backtesting usas 200

# Freq Decay 200: peso exponencial, reciente vale mas
def freq_decay():
    scores=defaultdict(float)
    # decay 0.985 por sorteo de antiguedad
    for i, row in enumerate(reversed(LAST200)): # i=0 mas reciente
        w = 0.985 ** i
        for n in row["R"]:
            scores[n] += w
    # ordenar
    return sorted(scores.items(), key=lambda x: x[1], reverse=True)

# Gap / Overdue
def gap_overdue():
    last_seen={}
    for row in ROWS:
        for n in row["R"]:
            last_seen[n]=row["c"]
    max_c=ROWS[-1]["c"]
    gaps=[]
    for n in range(1,29):
        last=last_seen.get(n,0)
        gap=max_c-last
        gaps.append((n,gap))
    # los que tienen mayor gap = mas overdue
    gaps.sort(key=lambda x: x[1], reverse=True)
    return gaps

# Recency x Stickiness
def recency_stickiness():
    # stickiness = veces que aparece en ultimos 50 y rachas
    last50=ROWS[-50:]
    cnt=Counter()
    for r in last50:
        cnt.update(r["R"])
    # recencia = 1/(1+gap)
    last_seen={}
    for row in ROWS:
        for n in row["R"]:
            last_seen[n]=row["c"]
    max_c=ROWS[-1]["c"]
    scores=[]
    for n in range(1,29):
        gap=max_c-last_seen.get(n,0)
        recency=1/(1+gap)
        stick=cnt.get(n,0)
        score=recency*2 + stick*0.3
        scores.append((n,score))
    scores.sort(key=lambda x: x[1], reverse=True)
    return scores

freq=freq_decay()
gap=gap_overdue()
rec=recency_stickiness()

# Pool2: HOT first 21 por freq decay
zr=[n for n,_ in freq[:21]]
# Pool3: BALANCED gap/overdue - combina gap con freq para no ir solo frio
# tomamos top 14 gap + 7 freq que no esten
pool3= [n for n,_ in gap[:14]]
for n,_ in freq:
    if n not in pool3 and len(pool3)<21:
        pool3.append(n)
Lr=pool3[:21]

# Pool4: BALANCED RECENCY
Rr=[n for n,_ in rec[:21]]

# Pool FINAL CONSENSUS 16: interseccion de los 3 + hot
# votos por numero en cuantos pools aparece
votes=Counter()
for lst in [zr, Lr, Rr]:
    votes.update(lst)
# consenso = los que estan en al menos 2 pools + top freq
consensus=[n for n,c in votes.most_common() if c>=2]
# completar a 16 con freq
for n,_ in freq:
    if n not in consensus and len(consensus)<16:
        consensus.append(n)
Tr=consensus[:16]

print(f"Pool2 HOT 21: {zr}")
print(f"Pool3 BALANCED 21: {Lr}")
print(f"Pool4 RECENCY 21: {Rr}")
print(f"Pool FINAL 16: {Tr}")

# Guardar para que el yml lo inserte en index.html
out=pathlib.Path('/tmp/pools.txt')
out.write_text(f"Tr={Tr}\nzr={Lr}\nLr={Lr}\nRr={Rr}\nFINAL={Tr}\n", encoding='utf-8')
# Formato JS directo
js=f"const Tr={Tr};\nconst zr={zr};\nconst Lr={Lr};\nconst Rr={Rr};\n"
pathlib.Path('/tmp/pools.js').write_text(js)
