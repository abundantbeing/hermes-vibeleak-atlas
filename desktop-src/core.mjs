export const GRADES=['S','A','B','C','D','F'];
export const BAYER4=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5];
export function layoutLabels(points,width,height){
  const placed=[];
  for(const point of [...points].sort((a,b)=>Number(!!b.selected)-Number(!!a.selected)||(b.priority||0)-(a.priority||0))){
    const left=point.x-point.width/2,top=point.y-point.height-9,right=left+point.width,bottom=top+point.height;
    if(left<12||top<58||right>width-12||bottom>height-58)continue;
    if(placed.some(p=>left<p.right+5&&right>p.left-5&&top<p.bottom+5&&bottom>p.top-5))continue;
    placed.push({...point,left,top,right,bottom});
  }
  return placed;
}
export function scopeKey(profile,epoch,connection='local'){return JSON.stringify([connection,profile,epoch])}
export function filterSites(rows,{query='',grade=null,location='all',country=null,lens='trust'}={}){
  return rows.filter(row=>(!query||row.domain.toLowerCase().includes(query.toLowerCase()))&&(!grade||(lens==='ai'?row.ai?.grade:row.grade)===grade)&&(!country||row.geo?.country===country)&&(location!=='unknown'||row.geo?.status!=='mapped'));
}
export function groupCountries(rows,lens='trust'){
  const groups=new Map();
  for(const row of rows){const geo=row.geo;if(geo?.status!=='mapped'||!Number.isFinite(geo.lat)||!Number.isFinite(geo.lon))continue;
    let group=groups.get(geo.country);if(!group){group={country:geo.country,name:geo.name,lat:geo.lat,lon:geo.lon,grade:null,count:0,domains:[]};groups.set(geo.country,group)}
    group.count++;group.domains.push(row.domain);const grade=lens==='ai'?row.ai?.grade:row.grade;
    if(GRADES.includes(grade)&&(!group.grade||GRADES.indexOf(grade)>GRADES.indexOf(group.grade)))group.grade=grade;
  }
  return [...groups.values()].sort((a,b)=>b.count-a.count);
}
export function parseCommand(value){
  const input=String(value||'').trim();if(/[;&|`$<>\r\n]/.test(input))return {type:'error',message:'Only Atlas commands are supported. No shell execution.'};
  if(['help','refresh','reset'].includes(input))return {type:input};
  const view=/^view (globe|ascii|list)$/.exec(input);if(view)return {type:'view',view:view[1]};
  const watch=/^(watch|unwatch|select) ([a-zA-Z0-9.-]+)$/.exec(input);if(watch)return {type:watch[1],domain:watch[2].toLowerCase()};
  return {type:'error',message:'Commands: watch <domain>, unwatch <domain>, select <domain>, view globe|ascii|list, refresh, reset, help.'};
}
export function formatScore(site,lens='trust'){const value=lens==='ai'?site?.ai?.score:site?.score;return typeof value==='number'&&Number.isFinite(value)?`${value}/100`:'not provided'}
export function historyChanges(history){
  const events=[];
  for(let i=1;i<history.length;i++){const before=new Map(history[i-1].sites.map(s=>[s.domain,s]));for(const site of history[i].sites){const prior=before.get(site.domain);if(prior&&prior.grade!==site.grade)events.push({id:`${history[i].id}:${site.domain}`,domain:site.domain,kind:'grade-changed',from:prior.grade,to:site.grade,occurredAt:history[i].capturedAt})}}
  return events.reverse().slice(0,50);
}
export function asciiMap(lines,sites){
  const grid=lines.map(line=>[...line]);
  for(const group of groupCountries(sites)){const row=Math.max(0,Math.min(grid.length-1,Math.round((82-group.lat)/5.7)));const col=Math.max(0,Math.min(79,Math.round((group.lon+178)/4.5)));grid[row][col]=group.grade||'?'}
  return grid.map(row=>row.join('')).join('\n');
}
export function ageLabel(value,now=Date.now()){const time=Date.parse(value);if(!Number.isFinite(time))return 'unknown';const elapsed=Math.max(0,now-time);if(elapsed<60000)return '<1m';if(elapsed<3600000)return `${Math.floor(elapsed/60000)}m`;if(elapsed<86400000)return `${Math.floor(elapsed/3600000)}h`;return `${Math.floor(elapsed/86400000)}d`}
export function safeDate(value){const t=Date.parse(value);return Number.isFinite(t)?new Date(t).toLocaleString():'not provided'}
