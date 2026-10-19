"""
V4 - Guarda historial de pools para no re-evaluar pasado con pools futuros
"""
import csv, pathlib, json, datetime
from collections import defaultdict, Counter

CSV = pathlib.Path('Chispazo.csv')
HIST = pathlib.Path('history')
HIST.mkdir(exist_ok=True)

# Cargar CSV limpiando lineas vacias
ROWS=[]
with open(CSV, encoding='utf-8') as f:
    clean=[l for l in f if l.strip()!='']
    reader=csv.DictReader(clean)
    for r in reader:
        try:
            c=int(r['CONCURSO'])
            R=[int(r['R1']),int(r['R2']),int(r['R3']),int(r['R4']),int(r['R5'])]
            ROWS.append({"c":c,"R":R,"fecha":r['FECHA']})
        except: continue
ROWS.sort(key=lambda x: x["c"])
LAST200=ROWS[-200:]

def freq_decay():
    scores=defaultdict(float)
    for i, row in enumerate(reversed(LAST200)):
        w=0.985**i
        for n in row["R"]:
            scores[n]+=w
    return sorted(scores.items(), key=lambda x:x[1], reverse=True)

def gap_overdue():
    last_seen={}
    for row in ROWS:
        for n in row["R"]:
            last_seen[n]=row["c"]
    max_c=ROWS[-1]["c"]
    gaps=[]
    for n in range(1,29):
        gaps.append((n, max_c-last_seen.get(n,0)))
    gaps.sort(key=lambda x:x[1], reverse=True)
    return gaps

def recency_stickiness():
    last50=ROWS[-50:]
    cnt=Counter()
    for r in last50:
        cnt.update(r["R"])
    last_seen={}
    for row in ROWS:
        for n in row["R"]:
            last_seen[n]=row["c"]
    max_c=ROWS[-1]["c"]
    scores=[]
    for n in range(1,29):
        gap=max_c-last_seen.get(n,0)
        rec=1/(1+gap)
        scores.append((n, rec*2 + cnt.get(n,0)*0.3))
    scores.sort(key=lambda x:x[1], reverse=True)
    return scores

freq=freq_decay()
gap=gap_overdue()
rec=recency_stickiness()

zr=[n for n,_ in freq[:21]]
Lr_tmp=[n for n,_ in gap[:14]]
for n,_ in freq:
    if n not in Lr_tmp and len(Lr_tmp)<21:
        Lr_tmp.append(n)
Lr=Lr_tmp[:21]
Rr=[n for n,_ in rec[:21]]
votes=Counter()
for lst in [zr, Lr, Rr]:
    votes.update(lst)
consensus=[n for n,c in votes.most_common() if c>=2]
for n,_ in freq:
    if n not in consensus and len(consensus)<16:
        consensus.append(n)
Tr=consensus[:16]

# Guardar prediccion actual para historial futuro
max_c=ROWS[-1]["c"]
next_c=max_c+1
# Si existe index.html, leer su sorteoNum actual (prediccion que se va a convertir en resultado)
# Lo guardamos como history/{sorteoNum}.json con pools que se usaron para predecirlo
# Para eso, si ya tenemos un archivo previo de pools para next_c-1, lo respetamos
# Ahora generamos el nuevo para next_c
payload={
    "sorteo": next_c,
    "generado": datetime.datetime.utcnow().isoformat()+"Z",
    "con_datos_hasta": max_c,
    "fecha_csv": ROWS[-1]["fecha"],
    "pools": {"Tr": Tr, "zr": zr, "Lr": Lr, "Rr": Rr}
}
pathlib.Path(f'/tmp/next_prediction.json').write_text(json.dumps(payload, indent=2), encoding='utf-8')

# Tambien guardar historial de este next_c como referencia
# El workflow se encargará de guardar el ANTERIOR antes de sobreescribir
js=f"const Tr={Tr};\nconst zr={zr};\nconst Lr={Lr};\nconst Rr={Rr};\n"
pathlib.Path('/tmp/pools.js').write_text(js, encoding='utf-8')
print(f"NEXT {next_c} Tr={Tr} zr={zr}")
