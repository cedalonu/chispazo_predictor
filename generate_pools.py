
import csv, pathlib, json
from collections import defaultdict, Counter
CSV = pathlib.Path('Chispazo.csv')
if not CSV.exists():
    CSV = pathlib.Path('/mnt/data/Chispazo.csv')
ROWS=[]
with open(CSV, encoding='utf-8') as f:
    clean=[l for l in f if l.strip()!='']
    import csv as csvm
    for r in csvm.DictReader(clean):
        try:
            c=int(r['CONCURSO']); R=[int(r['R1']),int(r['R2']),int(r['R3']),int(r['R4']),int(r['R5'])]
            ROWS.append({"c":c,"R":R,"fecha":r['FECHA']})
        except: continue
ROWS.sort(key=lambda x: x["c"])
max_c=ROWS[-1]["c"]
next_c=max_c+1
def pools_for(rows_up, next_c):
    def p2():
        scores=defaultdict(float)
        for i,row in enumerate(reversed(rows_up[-200:])):
            scores[row["R"][0]]+=0.985**i
            for n in row["R"]:
                scores[n]+=0.985**i*0.2
        for n in range(1,29):
            scores[n]+=((next_c*37 + n*13)%100)/1000.0
        return [n for n,_ in sorted(scores.items(), key=lambda x: x[1], reverse=True)[:21]]
    def p3():
        last={}
        for r in rows_up:
            for n in r["R"]:
                last[n]=r["c"]
        gaps=[(n, rows_up[-1]["c"]-last.get(n,0) + ((next_c*17+n*23)%7)) for n in range(1,29)]
        gaps.sort(key=lambda x: x[1], reverse=True)
        Lr=[n for n,_ in gaps[:14]]
        zr=p2()
        for n in zr:
            if n not in Lr and len(Lr)<21:
                Lr.append(n)
        rot=next_c%5
        return Lr[rot:]+Lr[:rot], zr
    def p4():
        cnt=Counter()
        for r in rows_up[-40:]:
            cnt.update(r["R"])
        last={}
        for r in rows_up:
            for n in r["R"]:
                last[n]=r["c"]
        scores=[]
        for n in range(1,29):
            gap=rows_up[-1]["c"]-last.get(n,0)
            rec=1/(1+gap*0.25)
            jit=((next_c*29+n*11)%100)/200.0
            scores.append((n, rec*1.5 + cnt.get(n,0)*0.35 + 1/(1+gap)*0.6 + jit))
        scores.sort(key=lambda x: x[1], reverse=True)
        return [n for n,_ in scores[:21]]
    Lr,zr = p3()
    Rr = p4()
    votes=defaultdict(float)
    for idx,lst in enumerate([zr,Lr,Rr]):
        w=(3,1,2)[idx]
        for pos,num in enumerate(lst):
            votes[num]+=w*(1-pos*0.02)
    for num in range(1,29):
        if sum(1 for lst in [zr,Lr,Rr] if num in lst)>=2:
            votes[num]+=2
    sv=sorted(votes.items(), key=lambda x: x[1], reverse=True)
    cand=[n for n,_ in sv[:28]]
    shift = (next_c * 7) % 12
    cand = cand[shift:] + cand[:shift]
    Tr = cand[:12]
    remaining = [n for n in cand[12:] if n not in Tr][:12]
    idx=28
    while len(remaining)<12 and idx < len(sv):
        n=sv[idx][0]
        if n not in Tr and n not in remaining:
            remaining.append(n)
        idx+=1
    prev_f=pathlib.Path(f'history/{next_c-1}.json')
    if not prev_f.exists():
        prev_f=pathlib.Path(f'/mnt/data/history/{next_c-1}.json')
    new_tail=[]
    if prev_f.exists():
        try:
            prev=json.loads(prev_f.read_text())
            prevTr=prev['pools']['Tr']
            for n in remaining:
                if n not in prevTr:
                    new_tail.append(n)
                if len(new_tail)>=4:
                    break
            if len(new_tail)<4:
                for n in remaining:
                    if n not in new_tail:
                        new_tail.append(n)
                    if len(new_tail)>=4:
                        break
        except:
            new_tail=remaining[:4]
    else:
        new_tail=remaining[:4]
    Tr = Tr[:12] + new_tail[:4]
    return Tr[:16], zr, Lr, Rr

Tr,zr,Lr,Rr = pools_for(ROWS, next_c)
print(f"V8.2 FINAL {next_c}: {Tr}")
pathlib.Path('/tmp/pools.js').write_text(f"const Tr={Tr};\nconst zr={zr};\nconst Lr={Lr};\nconst Rr={Rr};\n")
pathlib.Path('/tmp/next_prediction.json').write_text(json.dumps({"sorteo":next_c,"Tr":Tr,"zr":zr,"Lr":Lr,"Rr":Rr}, indent=2))

