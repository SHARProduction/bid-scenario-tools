export const evaluators={
  'bid-line-coverage-checker': i=>{const req=[...new Set(i.requirements||[])],counts=Object.fromEntries(req.map(x=>[x,0]));for(const l of i.lines||[])for(const x of l.covers||[])if(x in counts)counts[x]++;return{valid:req.length>0&&Object.values(counts).every(Boolean),uncovered:req.filter(x=>!counts[x]),duplicated:req.filter(x=>counts[x]>1),coverage:counts}},
  'scenario-cost-range-comparator': i=>{const issues=[],rows=(i.scenarios||[]).map(s=>{const low=Number(s.low),base=Number(s.base),high=Number(s.high);if(!(low<=base&&base<=high))issues.push({scenario:s.name,issue:'range order'});return{name:s.name,low,base,high,spread:high-low}});return{valid:rows.length>1&&!issues.length,issues,rows,lowestBase:rows.sort((a,b)=>a.base-b.base)[0]?.name||null}}
};
export function evaluate(slug,input){const fn=evaluators[slug];if(!fn)throw new Error('Unknown tool');return fn(input)}
