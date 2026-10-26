export function approvalReady(operation,authorized,budgetApproved){
  return !!operation&&/^[0-9a-f-]{36}$/i.test(operation.id)&&operation.maxUnits===1&&authorized===true&&budgetApproved===true;
}
export function canDraftTo(owner,profile,connectionId){
  return !owner||(owner.profile===profile&&owner.connectionId===connectionId);
}

export function contrastRatio(a,b){
  const luminance=rgb=>rgb.map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);
  const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);
}
export function pickAccentInk(accent,candidates){
  return Object.entries(candidates).sort((a,b)=>contrastRatio(accent,b[1])-contrastRatio(accent,a[1]))[0]?.[0]||'--ui-text-primary';
}

// Selecting repository context grants a native folder; it never reads source.
export async function pickRepositoryFolder(files,isCurrent=()=>true){
  if(!files?.requestFolder)return {state:'unavailable'};
  if(!isCurrent())return {state:'scope-changed'};
  const result=await files.requestFolder();
  if(!isCurrent())return {state:'scope-changed'};
  if(!result?.ok)return {state:'refused'};
  if(!result.folder)return {state:'cancelled'};
  const folder=result.folder;
  if(typeof folder.id!=='string'||!folder.id||typeof folder.path!=='string'||!folder.path||folder.path.length>512||/[\u0000-\u001f\u007f]/.test(folder.path))return {state:'refused'};
  return {state:'selected',folder};
}
