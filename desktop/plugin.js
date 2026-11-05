import{useEffect as as,useRef as pr,useState as St}from"react";import{gatewayActivationEpoch as k1,host as Ut,useValue as Ao,useQuery as Io,useQueryClient as V1,Button as H1,Input as Oc,Dialog as G1,DialogContent as W1,DialogHeader as X1,DialogTitle as q1,DialogDescription as Y1,DialogFooter as Co,ROUTES_AREA as Z1,SIDEBAR_NAV_AREA as $1,PALETTE_AREA as J1}from"@hermes/plugin-sdk";var gr=["S","A","B","C","D","F"],zo=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5];function ko(i,e,t){let n=[];for(let s of[...i].sort((r,a)=>+!!a.selected-+!!r.selected||(a.priority||0)-(r.priority||0))){let r=s.x-s.width/2,a=s.y-s.height-9,o=r+s.width,l=a+s.height;r<12||a<58||o>e-12||l>t-58||n.some(c=>r<c.right+5&&o>c.left-5&&a<c.bottom+5&&l>c.top-5)||n.push({...s,left:r,top:a,right:o,bottom:l})}return n}function Vo({scope:i,mode:e,domain:t,scanId:n,consent:s,privateVersion:r,replayId:a}){return s&&t&&!a?JSON.stringify([i,e,t,n||null,r||null]):null}function vr(i,e){return typeof e=="string"&&i?.binding===e&&typeof i.markdown=="string"}function Ho(i,e,t="local"){return JSON.stringify([t,i,e])}function xr(i,e="trust"){let t=new Map;for(let n of i){let s=n.geo;if(s?.status!=="mapped"||!Number.isFinite(s.lat)||!Number.isFinite(s.lon))continue;let r=t.get(s.country);r||(r={country:s.country,name:s.name,lat:s.lat,lon:s.lon,grade:null,count:0,domains:[]},t.set(s.country,r)),r.count++,r.domains.push(n.domain);let a=e==="ai"?n.ai?.grade:n.grade;gr.includes(a)&&(!r.grade||gr.indexOf(a)>gr.indexOf(r.grade))&&(r.grade=a)}return[...t.values()].sort((n,s)=>s.count-n.count)}function Go(i,e,t="trust"){let n=i.map(s=>[...s]);for(let s of xr(e,t)){let r=Math.max(0,Math.min(n.length-1,Math.round((82-s.lat)/5.7))),a=Math.max(0,Math.min(79,Math.round((s.lon+178)/4.5)));n[r][a]=s.grade||"?"}return n.map(s=>s.join("")).join(`
`)}function _r(i,e,t){return!!i&&/^[0-9a-f-]{36}$/i.test(i.id)&&i.maxUnits===1&&e===!0&&t===!0}function hs(i,e,t){return!i||i.profile===e&&i.connectionId===t}function Wo(i,e){let t=r=>r.map(a=>a/255).map(a=>a<=.04045?a/12.92:((a+.055)/1.055)**2.4).reduce((a,o,l)=>a+o*[.2126,.7152,.0722][l],0),n=t(i),s=t(e);return(Math.max(n,s)+.05)/(Math.min(n,s)+.05)}function Xo(i,e){return Object.entries(e).sort((t,n)=>Wo(i,n[1])-Wo(i,t[1]))[0]?.[0]||"--ui-text-primary"}async function qo(i,e=()=>!0){if(!i?.requestFolder)return{state:"unavailable"};if(!e())return{state:"scope-changed"};let t=await i.requestFolder();if(!e())return{state:"scope-changed"};if(!t?.ok)return{state:"refused"};if(!t.folder)return{state:"cancelled"};let n=t.folder;return typeof n.id!="string"||!n.id||typeof n.path!="string"||!n.path||n.path.length>512||/[\u0000-\u001f\u007f]/.test(n.path)?{state:"refused"}:{state:"selected",folder:n}}var Yo=`.vla{--atlas-grade-S:var(--ui-success,var(--ui-accent));--atlas-grade-A:var(--ui-accent);--atlas-grade-B:var(--ui-info,var(--ui-text-primary));--atlas-grade-C:var(--ui-warning,var(--ui-text-primary));--atlas-grade-D:var(--ui-warning,var(--ui-text-primary));--atlas-grade-F:var(--ui-danger,var(--ui-error,var(--ui-text-primary)));--atlas-grade-N:var(--ui-text-tertiary);--atlas-quiet:var(--ui-text-secondary);--atlas-rule:var(--ui-stroke-secondary);color:var(--ui-text-primary);container:atlas/inline-size;min-width:0;height:100%;overflow:auto;position:relative;font-family:var(--font-mono,ui-monospace,monospace);font-size:12px;line-height:1.55;scrollbar-width:thin;scrollbar-color:var(--ui-stroke-secondary) transparent}.vla *{box-sizing:border-box}.vla button,.vla input,.vla select{font:inherit}.vla button{touch-action:manipulation}.vla a{color:var(--ui-accent);text-underline-offset:3px}.vla :focus-visible{outline:2px solid var(--ui-accent);outline-offset:3px}.vla-shell{padding:24px 28px 18px;max-width:1740px;margin:0 auto}.vla-top{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;padding-bottom:20px;border-bottom:1px solid var(--atlas-rule)}.vla-eyebrow{font-size:10px;letter-spacing:.15em;color:var(--atlas-quiet);text-transform:uppercase}.vla-title{font-size:clamp(27px,3.8cqw,49px);font-weight:600;line-height:1.05;letter-spacing:-.07em;margin:9px 0 8px}.vla-title span{font-weight:400;color:var(--ui-accent)}.vla-top p{color:var(--atlas-quiet);margin:0;max-width:520px}.vla-top-meta{text-align:right;display:grid;gap:7px;font-size:10px;color:var(--atlas-quiet);padding-top:5px}.vla-pill{display:inline-flex;align-items:center;gap:8px;border:1px solid var(--atlas-rule);padding:4px 9px;width:max-content}.vla-pill:before{content:'+';color:var(--ui-accent)}.vla-top-meta .vla-pill{justify-self:end}.vla-sourcebar{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;padding:14px 0}.vla-segments{display:flex;align-items:center;gap:3px;flex-wrap:wrap}.vla-segments button[data-active=true]{background:color-mix(in srgb,var(--ui-accent) 12%,transparent);color:var(--ui-accent)}.vla-actions{display:flex;gap:8px;align-items:center;flex-wrap:wrap}.vla-meta{font-size:10px;color:var(--atlas-quiet)}.vla-notice{border:1px solid var(--atlas-rule);border-left:2px solid var(--ui-accent);padding:16px 18px;display:flex;align-items:center;justify-content:space-between;gap:20px;margin:0 0 14px;background:color-mix(in srgb,var(--ui-accent) 3%,transparent)}.vla-notice h2{margin:0 0 5px;font-size:14px}.vla-notice p{margin:0;color:var(--atlas-quiet);max-width:690px}.vla-main{display:grid;grid-template-columns:minmax(0,1fr) 300px;border:1px solid var(--atlas-rule);position:relative}.vla-map-panel{min-width:0;position:relative;overflow:hidden}.vla-map-toolbar{display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;padding:12px 16px;border-bottom:1px solid var(--atlas-rule)}.vla-visual{position:relative;height:440px;overflow:hidden;background-image:radial-gradient(var(--ui-stroke-secondary) .6px,transparent .8px);background-size:18px 18px}.vla-globe{position:absolute;inset:0;overflow:hidden}.vla-globe canvas{display:block;width:100%;height:100%;cursor:grab;touch-action:none}.vla-coordinate{position:absolute;font-size:9px;color:var(--atlas-quiet);letter-spacing:.09em;z-index:1;pointer-events:none}.vla-coordinate.nw{top:16px;left:16px}.vla-coordinate.ne{top:16px;right:16px;text-align:right}.vla-coordinate.sw{bottom:16px;left:16px}.vla-coordinate.se{bottom:16px;right:16px;text-align:right}.vla-graticule{position:absolute;inset:28px 50%;border-left:1px dashed var(--atlas-rule);pointer-events:none;opacity:.55}.vla-cross{position:absolute;top:50%;left:16px;right:16px;border-top:1px dashed var(--atlas-rule);pointer-events:none;opacity:.5}.vla-country-label{position:absolute;left:0;top:0;border:1px solid var(--atlas-rule);background:var(--ui-surface-background);padding:2px 5px;font-size:9px;line-height:1.35;white-space:nowrap;color:var(--ui-text-primary);cursor:pointer;opacity:0;z-index:2}.vla-country-label[data-selected=true]{border-color:var(--ui-accent);color:var(--ui-accent)}.vla-ascii{margin:0;position:absolute;inset:35px 8px 34px;display:flex;align-items:center;justify-content:center;white-space:pre;font-size:clamp(5px,1.24cqw,12px);line-height:1.17;letter-spacing:0;color:var(--ui-accent);font-variant-ligatures:none;user-select:text;overflow:hidden}.vla-legend{display:flex;align-items:stretch;border-top:1px solid var(--atlas-rule);min-height:68px}.vla-grade-filter{flex:1;min-width:0;border:0;border-right:1px solid var(--atlas-rule);background:transparent;color:var(--ui-text-primary);padding:9px 7px;text-align:left;cursor:pointer}.vla-grade-filter:last-child{border-right:0}.vla-grade-filter[data-active=true]{background:color-mix(in srgb,var(--ui-accent) 9%,transparent);box-shadow:inset 0 -2px var(--ui-accent)}.vla-grade-filter strong{display:block;font-size:17px;line-height:1.2}.vla-grade-filter small{display:block;color:var(--atlas-quiet);font-size:9px;margin-top:3px}.vla-hatch{height:4px;margin-top:5px;width:var(--density);max-width:100%;min-width:2px;background:repeating-linear-gradient(90deg,currentColor 0,currentColor 1px,transparent 1px,transparent 3px)}.vla-inspector{border-left:1px solid var(--atlas-rule);min-width:0;padding:16px;display:flex;flex-direction:column;gap:15px}.vla-section-label{font-size:10px;letter-spacing:.12em;color:var(--atlas-quiet);text-transform:uppercase;display:flex;justify-content:space-between;gap:8px}.vla-inspector h2{font-size:17px;line-height:1.3;overflow-wrap:anywhere;font-weight:500;margin:0;letter-spacing:-.035em}.vla-grade-card{display:grid;grid-template-columns:auto 1fr;align-items:center;gap:17px;padding:14px 0;border-top:1px solid var(--atlas-rule);border-bottom:1px solid var(--atlas-rule)}.vla-grade-card .vla-big-grade{font-size:72px;line-height:.9;font-weight:600;letter-spacing:-.09em}.vla-details{display:grid;gap:10px;margin:0}.vla-details div{display:grid;grid-template-columns:78px 1fr;gap:9px}.vla-details dt{font-size:10px;color:var(--atlas-quiet)}.vla-details dd{margin:0;font-size:11px;overflow-wrap:anywhere}.vla-explanation{font-size:10px;color:var(--atlas-quiet);margin:0}.vla-inspector-actions{display:grid;gap:6px;margin-top:auto}.vla-empty{padding:25px 8px;text-align:left}.vla-empty pre{color:var(--ui-accent);font-size:13px;line-height:1.2;margin:20px 0 28px;white-space:pre}.vla-empty h3{font-size:13px;font-weight:500}.vla-empty p{color:var(--atlas-quiet);font-size:11px;max-width:310px}.vla-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border:1px solid var(--atlas-rule);border-top:0}.vla-stat{padding:15px 17px;border-right:1px solid var(--atlas-rule);min-width:0}.vla-stat:last-child{border:0}.vla-stat strong{display:block;font-size:25px;line-height:1.25;font-weight:500;letter-spacing:-.06em}.vla-stat span{font-size:10px;color:var(--atlas-quiet)}.vla-lower{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(230px,1fr);gap:18px;margin-top:22px}.vla-lower h3{margin:0;font-size:11px;font-weight:500;letter-spacing:.05em}.vla-table-top{display:flex;gap:12px;align-items:center;justify-content:space-between;margin-bottom:12px;flex-wrap:wrap}.vla-search{max-width:220px;min-width:120px}.vla-table-scroll{max-height:300px;overflow:auto;border-top:1px solid var(--atlas-rule);scrollbar-width:thin}.vla-table{border-collapse:collapse;width:100%;font-size:11px;text-align:left;table-layout:fixed}.vla-table th{font-weight:400;font-size:9px;text-transform:uppercase;letter-spacing:.05em;color:var(--atlas-quiet);padding:9px 7px;position:sticky;top:0;background:var(--ui-surface-background);z-index:1}.vla-table td{padding:9px 7px;border-top:1px solid var(--atlas-rule);overflow-wrap:anywhere}.vla-table th:nth-child(1){width:46%}.vla-table th:nth-child(2){width:15%}.vla-table th:nth-child(3){width:22%}.vla-table th:nth-child(4){width:17%}.vla-site-select{background:none;border:0;padding:0;color:inherit;text-align:left;cursor:pointer;overflow-wrap:anywhere}.vla-table tr[data-selected=true]{background:color-mix(in srgb,var(--ui-accent) 6%,transparent);color:var(--ui-accent)}.vla-events{border-top:1px solid var(--atlas-rule);max-height:300px;overflow:auto;scrollbar-width:thin}.vla-event{padding:11px 0;border-bottom:1px solid var(--atlas-rule);display:grid;grid-template-columns:28px 1fr;gap:10px}.vla-event-glyph{color:var(--ui-accent);font-size:14px}.vla-event strong{font-size:11px;font-weight:400;display:block;overflow-wrap:anywhere}.vla-event p{margin:2px 0;color:var(--atlas-quiet);font-size:10px}.vla-terminal{border:1px solid var(--atlas-rule);display:flex;gap:10px;padding:10px 12px;align-items:center;margin-top:22px}.vla-terminal label{font-size:11px;color:var(--ui-accent);white-space:nowrap}.vla-terminal input{border:0;outline:none;min-width:0;flex:1;color:var(--ui-text-primary);background:transparent;font-size:11px;padding:3px 0}.vla-terminal-output{min-height:20px;padding:6px 2px 0;color:var(--atlas-quiet);font-size:10px;overflow-wrap:anywhere}.vla-footer{display:flex;justify-content:space-between;align-items:flex-start;gap:20px;border-top:1px solid var(--atlas-rule);padding-top:13px;margin-top:13px;font-size:9px;color:var(--atlas-quiet)}.vla-footer p{margin:0;max-width:590px}.vla-chiprow{display:flex;align-items:center;gap:6px;flex-wrap:wrap}.vla-chip{font-size:10px;color:var(--ui-accent);border:1px solid var(--atlas-rule);background:transparent;padding:3px 6px;cursor:pointer}.vla-chip[data-active=true]{background:color-mix(in srgb,var(--ui-accent) 9%,transparent)}.vla-full-list{height:440px;overflow:auto;padding:18px}.vla-full-list .vla-table-scroll{max-height:100%}.vla-modal{font-family:var(--font-mono,ui-monospace,monospace);max-width:720px}.vla-modal pre{white-space:pre-wrap;overflow-wrap:anywhere;overflow:auto;max-height:50vh;font:11px/1.6 var(--font-mono,ui-monospace,monospace);padding:16px;border:1px solid var(--ui-stroke-secondary)}.vla-modal p{font-size:12px;line-height:1.6}.vla-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}.vla-replay{display:flex;align-items:center;gap:12px;padding:12px 16px;border-top:1px solid var(--atlas-rule)}.vla-replay input{flex:1;min-width:60px;accent-color:var(--ui-accent)}.vla-replay label{font-size:10px;color:var(--atlas-quiet)}.vla-disconnected{padding:24px;border:1px solid var(--atlas-rule)}.vla-findings{max-height:160px;overflow:auto;border-top:1px solid var(--atlas-rule);padding-top:8px}.vla-findings article{margin-bottom:10px}.vla-findings strong{display:block;font-size:11px}.vla-findings p{font-size:10px;margin:3px 0;color:var(--atlas-quiet)}
@container atlas (max-width:900px){.vla-shell{padding:18px}.vla-main{grid-template-columns:minmax(0,1fr) 260px}.vla-visual,.vla-full-list{height:380px}.vla-inspector{padding:12px}.vla-lower{gap:14px;grid-template-columns:minmax(0,1.4fr) minmax(200px,1fr)}.vla-grade-filter{padding:9px 5px}.vla-grade-filter small{font-size:8px}.vla-top-meta{max-width:180px}.vla-ascii{font-size:clamp(5px,1.1cqw,9px)}}
@container atlas (max-width:680px){.vla-shell{padding:15px}.vla-top{gap:12px}.vla-title{font-size:30px}.vla-top p{font-size:10px}.vla-top-meta{display:none}.vla-main{grid-template-columns:1fr}.vla-inspector{border-left:0;border-top:1px solid var(--atlas-rule);padding:16px}.vla-visual,.vla-full-list{height:370px}.vla-ascii{font-size:clamp(5px,1.7cqw,10px)}.vla-lower{grid-template-columns:1fr;gap:20px}.vla-notice{align-items:flex-start;flex-direction:column;gap:12px}.vla-stats{grid-template-columns:repeat(2,minmax(0,1fr))}.vla-stat:nth-child(2){border-right:0}.vla-stat:nth-child(-n+2){border-bottom:1px solid var(--atlas-rule)}.vla-terminal{gap:6px}.vla-terminal label{font-size:9px}.vla-footer{flex-direction:column;gap:8px;font-size:10px}.vla-inspector-actions{grid-template-columns:repeat(2,minmax(0,1fr))}.vla-empty{padding:5px 0}.vla-empty pre{display:none}.vla-table-top{align-items:flex-start}.vla-grade-filter strong{font-size:15px}.vla-grade-filter small{font-size:9px}.vla-map-toolbar{padding:10px}.vla-coordinate{font-size:8px}.vla-coordinate.ne{max-width:105px}.vla-replay{flex-wrap:wrap}.vla-top .vla-eyebrow{font-size:9px}}
@media(prefers-reduced-motion:reduce){.vla *{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
.vla-map-note{display:none}.vla-coordinate{font-size:12px;letter-spacing:.025em}.vla-map-note span{white-space:normal}
@container atlas (max-width:900px){.vla-coordinate{display:none}.vla-map-note{display:flex;flex-wrap:wrap;gap:4px 14px;padding:10px 13px;font-size:12px;line-height:1.5;color:var(--ui-text-secondary);border-bottom:1px solid var(--ui-stroke-secondary)}}
.vla-meta,.vla-explanation,.vla-event p{font-size:11px}.vla-coordinate,.vla-country-label,.vla-grade-filter small{font-size:10px}.vla-title{font-size:clamp(27px,3.4cqw,43px)}.vla-chip{min-height:30px}.vla-map-toolbar button{min-height:30px}
@container atlas (max-width:680px){.vla-visual,.vla-full-list{height:280px}.vla-map-toolbar{gap:9px;padding:10px}.vla-map-toolbar .vla-segments{gap:4px}.vla-coordinate{font-size:10px;letter-spacing:0}.vla-coordinate.ne{max-width:110px}.vla-coordinate.se{max-width:160px}.vla-sourcebar button,.vla-map-toolbar button{min-height:34px}.vla-grade-filter small{font-size:10px}.vla-top p,.vla-top .vla-eyebrow{font-size:11px}.vla-inspector-actions button{white-space:normal;min-height:36px}}
.vla-coordinate{font-size:12px}
`;var Zo=`.wba .vla-shell{max-width:1520px;padding:26px 30px}.wba-stagebar{display:flex;align-items:center;gap:28px;padding:18px 0;color:var(--ui-text-secondary);font-size:11px}.wba-stagebar span{display:flex;gap:8px;align-items:center}.wba-stagebar b{font-size:10px;color:var(--ui-accent);font-weight:500}.wba-stagebar>button{margin-left:auto}.wba-target{padding:18px;background:color-mix(in srgb,var(--ui-accent) 3%,transparent);border:1px solid var(--atlas-rule);margin-bottom:18px}.wba-target form{display:grid;grid-template-columns:minmax(170px,1fr) minmax(180px,1.3fr) auto;gap:16px;align-items:end}.wba-field{display:grid;gap:7px;font-size:11px;color:var(--ui-text-secondary);min-width:0}.wba-field input{min-width:0;width:100%}.wba-field>span{display:inline}.wba-inline{display:flex;gap:5px;align-items:center;min-width:0}.wba-inline input{flex:1}.wba .wba-primary,.wba-dialog .wba-primary{background:var(--ui-accent);color:var(--wba-accent-ink,var(--ui-bg-chrome));font-weight:600}.wba .wba-primary:hover,.wba-dialog .wba-primary:hover{background:color-mix(in srgb,var(--ui-accent) 85%,var(--ui-text-primary))}.wba .wba-primary:disabled,.wba-dialog .wba-primary:disabled{opacity:.65}.wba-feedback{color:var(--ui-text-secondary);font-size:11px;line-height:1.6;padding:0 0 16px;overflow-wrap:anywhere}.wba-layout{display:grid;grid-template-columns:246px minmax(0,1fr);border:1px solid var(--atlas-rule);min-height:470px}.wba-receipts{border-right:1px solid var(--atlas-rule);min-width:0}.wba-section-head{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:16px 18px;border-bottom:1px solid var(--atlas-rule);min-width:0}.wba-section-head .vla-meta{font-size:9px;letter-spacing:.08em}.wba-receipt{display:grid;gap:5px;text-align:left;background:none;width:100%;border:0;border-bottom:1px solid var(--atlas-rule);padding:17px 18px;cursor:pointer;color:var(--ui-text-primary);overflow-wrap:anywhere;transition:background-color 160ms cubic-bezier(.22,1,.36,1)}.wba-receipt:hover{background:color-mix(in srgb,var(--ui-accent) 5%,transparent)}.wba-receipt[data-selected=true]{background:color-mix(in srgb,var(--ui-accent) 9%,transparent);box-shadow:inset 2px 0 var(--ui-accent)}.wba-receipt strong{font-size:12px}.wba-receipt span,.wba-receipt small{color:var(--ui-text-secondary);font-size:10px}.wba-receipt small{opacity:.8;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.wba-local-empty{padding:25px 18px;color:var(--ui-text-secondary);font-size:11px;line-height:1.7}.wba-local-empty h3{color:var(--ui-text-primary);font-size:12px}.wba-reticle{font-size:24px;color:var(--ui-accent);margin:0 0 24px}.wba-evidence{min-width:0}.wba-empty-evidence{padding:58px 36px 48px;max-width:680px}.wba-empty-evidence h2{font-size:clamp(20px,3.2cqw,32px);line-height:1.2;letter-spacing:-.055em;font-weight:500;margin:32px 0 14px}.wba-empty-evidence p{color:var(--ui-text-secondary);font-size:12px;line-height:1.8;max-width:550px}.wba-empty-evidence .vla-meta{font-size:11px;margin-top:24px}.wba-blueprint{display:flex;align-items:center;gap:8px;font-size:9px;letter-spacing:.1em;color:var(--ui-accent);max-width:420px}.wba-blueprint span{padding:12px 9px;border:1px dashed color-mix(in srgb,var(--ui-accent) 40%,transparent);white-space:nowrap}.wba-blueprint i{height:1px;min-width:10px;flex:1;background:color-mix(in srgb,var(--ui-accent) 40%,transparent)}.wba-result-top{padding:24px 22px 12px;display:flex;justify-content:space-between;align-items:center;gap:18px}.wba-result-top h2{font-size:25px;font-weight:500;letter-spacing:-.045em;line-height:1.2;overflow-wrap:anywhere;margin:0 0 8px}.wba-result-top p{color:var(--ui-text-secondary);font-size:11px;margin:0}.wba-grade{display:grid;text-align:center;min-width:70px}.wba-grade strong{font-size:40px;line-height:1;font-weight:500}.wba-grade span{font-size:10px;white-space:nowrap}.wba-result-actions{display:flex;flex-wrap:wrap;gap:8px;padding:10px 22px 16px}.wba-evidence>.vla-explanation{padding:0 22px}.wba-findings{padding:0 22px}.wba-findings article{padding:18px 0;border-bottom:1px solid var(--atlas-rule)}.wba-findings p{color:var(--ui-text-secondary);line-height:1.7;overflow-wrap:anywhere}.wba-finding-head{display:flex;align-items:baseline;gap:12px}.wba-finding-head h3{font-size:13px;margin:0;font-weight:600;overflow-wrap:anywhere}.wba-severity{text-transform:uppercase;font-size:9px;letter-spacing:.1em;color:var(--ui-text-secondary)}.wba-severity[data-severity=critical],.wba-severity[data-severity=high]{color:var(--ui-warning,var(--ui-accent))}.wba-findings pre,.wba-handoff{white-space:pre-wrap;overflow-wrap:anywhere;font:11px/1.65 var(--font-mono,monospace);border-left:2px solid var(--ui-stroke-secondary);padding:10px 12px;background:color-mix(in srgb,var(--ui-text-primary) 3%,transparent);max-width:100%;max-height:280px;overflow:auto;color:var(--ui-text-secondary)}.wba-php,.wba-comparison{padding:23px 22px;border-top:1px solid var(--atlas-rule);margin-top:22px}.wba-php h3,.wba-comparison h3{font-size:15px;letter-spacing:-.02em;font-weight:500}.wba-php p,.wba-comparison p{font-size:11px;color:var(--ui-text-secondary);line-height:1.8;overflow-wrap:anywhere}.wba-php form{display:grid;gap:14px;max-width:560px;padding:15px 0}.wba-php form>button{justify-self:start}.wba-warning{padding:12px 14px;border-left:2px solid var(--ui-warning,var(--ui-accent));background:color-mix(in srgb,var(--ui-warning,var(--ui-accent)) 5%,transparent);color:var(--ui-text-secondary);font-size:11px;line-height:1.7;margin:0 0 15px;overflow-wrap:anywhere}.wba-pending{display:flex;align-items:center;justify-content:space-between;gap:14px}.wba-check{display:flex;align-items:flex-start;gap:10px;font-size:12px;line-height:1.7;color:var(--ui-text-secondary)}.wba-check input{accent-color:var(--ui-accent);flex-shrink:0;width:15px;height:15px;margin-top:3px}.wba-dialog{width:min(700px,calc(100vw - 32px));max-width:700px;max-height:88dvh;overflow:visible;box-sizing:border-box;font-family:var(--font-mono,ui-monospace,monospace);gap:18px}.wba-dialog .vla-meta{color:var(--ui-text-secondary);font-size:11px;line-height:1.8}.wba-approval-target{display:grid;gap:13px;padding:16px;border:1px solid var(--ui-stroke-secondary)}.wba-approval-target div{display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap}.wba-approval-target dt{font-size:11px;color:var(--ui-text-secondary)}.wba-approval-target dd{font-size:12px;margin:0;color:var(--ui-text-primary);overflow-wrap:anywhere}.wba-handoff{max-height:48dvh;margin:0}.wba-diff-counts{display:flex;gap:24px;flex-wrap:wrap}.wba-diff-counts span{display:grid;gap:3px;color:var(--ui-text-secondary);font-size:11px}.wba-diff-counts strong{font-size:26px;font-weight:500;color:var(--ui-text-primary)}
@container atlas (max-width:950px){.wba .vla-shell{padding:20px}.wba-target form{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}.wba-target form>button{justify-self:start;grid-column:1/-1}.wba-layout{grid-template-columns:210px minmax(0,1fr)}.wba-result-top{padding:20px 16px 12px}.wba-findings{padding:0 16px}.wba-evidence>.vla-explanation{padding:0 16px}.wba-result-actions{padding:8px 16px 14px}.wba-php,.wba-comparison{padding:20px 16px}.wba-empty-evidence{padding:38px 22px}.wba-stagebar{gap:18px}.wba-blueprint{font-size:8px;gap:5px}.wba-blueprint span{padding:10px 6px}}
@container atlas (max-width:680px){.wba .vla-shell{padding:16px}.wba-layout{grid-template-columns:minmax(0,1fr)}.wba-receipts{border-right:0;border-bottom:1px solid var(--atlas-rule)}.wba-local-empty{padding:16px}.wba-reticle{display:none}.wba-empty-evidence{padding:30px 18px}.wba-stagebar{flex-wrap:wrap;gap:12px;font-size:10px}.wba-stagebar>button{margin-left:0}.wba-target form{grid-template-columns:minmax(0,1fr);gap:14px}.wba-target{padding:14px}.wba-section-head{padding:14px 16px}.wba-receipt{padding:14px 16px}.wba-blueprint{max-width:360px}.wba-empty-evidence h2{margin-top:24px}.wba-pending{align-items:flex-start;flex-direction:column}.wba-result-top h2{font-size:22px}.wba .vla-footer .vla-actions{align-items:flex-start}.wba .vla-footer span{font-size:9px}.wba-approval-target div{gap:6px}.wba-finding-head{flex-wrap:wrap;gap:5px 10px}}

.wba-hosting{border:1px solid var(--atlas-rule);margin-bottom:22px}.wba-hosting .vla-visual{height:400px}.wba-hosting .vla-map-toolbar p{margin:4px 0 0}.wba-map-caption{padding:12px 16px;border-top:1px solid var(--atlas-rule);font-size:11px;line-height:1.7;color:var(--ui-text-secondary)}.wba-map-caption p{margin:0 0 5px;max-width:940px}.wba-map-list{min-height:270px;max-height:400px;overflow:auto}.wba-hosting .vla-chiprow{align-items:center}.wba-hosting .vla-coordinate{pointer-events:none}.wba-hosting .vla-coordinate.nw{max-width:190px}.wba-hosting .vla-coordinate.ne{max-width:170px}.wba-hosting .vla-coordinate.sw{max-width:230px}.wba-hosting .vla-coordinate.se{max-width:220px}.wba-hosting .vla-ascii{padding:45px 25px;font-size:clamp(6px,1.02cqw,10px)}
@container atlas(max-width:950px){.wba-hosting .vla-visual{height:350px}.wba-hosting .vla-ascii{font-size:clamp(5px,1.2cqw,9px);padding:30px 15px}}
@container atlas(max-width:680px){.wba-hosting .vla-visual{height:300px}.wba-hosting .vla-ascii{font-size:clamp(5px,1.65cqw,9px);padding:25px 8px}.wba-hosting .vla-map-toolbar{gap:12px}.wba-map-caption{padding:12px}.wba-map-list{font-size:10px}}

/* Dialogs portal outside .wba. The native inner body owns scrolling. */
.wba-dialog-body{min-width:0;max-width:100%;gap:18px;overflow-x:hidden;overflow-wrap:anywhere}
.wba-dialog-body>*{min-width:0;max-width:100%;box-sizing:border-box}
.wba-dialog .wba-draft,.wba-dialog .wba-handoff{display:block;box-sizing:border-box;width:100%;min-width:0;max-width:100%;margin:0;padding:14px 16px;white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-word;font:12px/1.75 var(--font-mono,monospace);border:1px solid var(--ui-stroke-secondary);background:color-mix(in srgb,var(--ui-text-primary) 3%,transparent);color:var(--ui-text-secondary);max-height:48dvh;overflow-y:auto}
.wba-dialog-body [data-slot=dialog-footer]{flex-wrap:wrap;gap:8px}
.wba-repository{align-items:start;flex-wrap:wrap}
.wba-repository input{flex:1 1 160px}
.wba-repository-actions{display:flex;flex-wrap:wrap;gap:5px}
.wba-repository-help{font-size:10px;line-height:1.6;color:var(--ui-text-secondary);margin:0;overflow-wrap:anywhere}
`;import{useEffect as Mo,useMemo as Ec,useRef as bo,useState as Di}from"react";import{Button as a1,useTheme as o1,createBudgetedLoop as l1}from"@hermes/plugin-sdk";var Wc=0,$o=1,Xc=2;var nc=1,qc=2,ln=3,Rn=0,Ct=1,hn=2,An=0,xi=1,Jo=2,Ko=3,jo=4,Yc=5,Vn=100,Zc=101,$c=102,Jc=103,Kc=104,jc=200,Qc=201,eh=202,th=203,$r=204,Jr=205,nh=206,ih=207,sh=208,rh=209,ah=210,oh=211,lh=212,ch=213,hh=214,Kr=0,jr=1,Qr=2,Mi=3,ea=4,ta=5,na=6,ia=7,ic=0,uh=1,dh=2,Cn=0,fh=1,ph=2,mh=3,gh=4,vh=5,xh=6,_h=7;var sc=300,wi=301,Si=302,sa=303,ra=304,lr=306,aa=1e3,Wn=1001,oa=1002,Yt=1003,yh=1004;var us=1005;var Kt=1006,yr=1007;var Xn=1008;var pn=1009,rc=1010,ac=1011,Yi=1012,co=1013,qn=1014,un=1015,ns=1016,ho=1017,uo=1018,Ei=1020,oc=35902,lc=1021,cc=1022,qt=1023,hc=1024,uc=1025,_i=1026,Ti=1027,dc=1028,fo=1029,fc=1030,po=1031;var mo=1033,Os=33776,Bs=33777,zs=33778,ks=33779,la=35840,ca=35841,ha=35842,ua=35843,da=36196,fa=37492,pa=37496,ma=37808,ga=37809,va=37810,xa=37811,_a=37812,ya=37813,ba=37814,Ma=37815,wa=37816,Sa=37817,Ea=37818,Ta=37819,Aa=37820,Ca=37821,Vs=36492,Ra=36494,Ia=36495,pc=36283,Pa=36284,La=36285,Na=36286;var Hs=2300,Da=2301,br=2302,Qo=2400,el=2401,tl=2402;var bh=3200,Mh=3201;var wh=0,Sh=1,Tn="",Tt="srgb",Pi="srgb-linear",cr="linear",tt="srgb";var ni=7680;var nl=519,Eh=512,Th=513,Ah=514,mc=515,Ch=516,Rh=517,Ih=518,Ph=519,il=35044;var sl="300 es",dn=2e3,Gs=2001,In=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let s=this._listeners[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},xt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],rl=1234567,Wi=Math.PI/180,Zi=180/Math.PI;function Li(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(xt[i&255]+xt[i>>8&255]+xt[i>>16&255]+xt[i>>24&255]+"-"+xt[e&255]+xt[e>>8&255]+"-"+xt[e>>16&15|64]+xt[e>>24&255]+"-"+xt[t&63|128]+xt[t>>8&255]+"-"+xt[t>>16&255]+xt[t>>24&255]+xt[n&255]+xt[n>>8&255]+xt[n>>16&255]+xt[n>>24&255]).toLowerCase()}function Mt(i,e,t){return Math.max(e,Math.min(t,i))}function go(i,e){return(i%e+e)%e}function Lh(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Nh(i,e,t){return i!==e?(t-i)/(e-i):0}function Xi(i,e,t){return(1-t)*i+t*e}function Dh(i,e,t,n){return Xi(i,e,1-Math.exp(-t*n))}function Uh(i,e=1){return e-Math.abs(go(i,e*2)-e)}function Fh(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Oh(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Bh(i,e){return i+Math.floor(Math.random()*(e-i+1))}function zh(i,e){return i+Math.random()*(e-i)}function kh(i){return i*(.5-Math.random())}function Vh(i){i!==void 0&&(rl=i);let e=rl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Hh(i){return i*Wi}function Gh(i){return i*Zi}function Wh(i){return(i&i-1)===0&&i!==0}function Xh(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function qh(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Yh(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),u=a((e+n)/2),d=r((e-n)/2),f=a((e-n)/2),m=r((n-e)/2),g=a((n-e)/2);switch(s){case"XYX":i.set(o*u,l*d,l*f,o*c);break;case"YZY":i.set(l*f,o*u,l*d,o*c);break;case"ZXZ":i.set(l*d,l*f,o*u,o*c);break;case"XZX":i.set(o*u,l*g,l*m,o*c);break;case"YXY":i.set(l*m,o*u,l*g,o*c);break;case"ZYZ":i.set(l*g,l*m,o*u,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function gi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function yt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var vo={DEG2RAD:Wi,RAD2DEG:Zi,generateUUID:Li,clamp:Mt,euclideanModulo:go,mapLinear:Lh,inverseLerp:Nh,lerp:Xi,damp:Dh,pingpong:Uh,smoothstep:Fh,smootherstep:Oh,randInt:Bh,randFloat:zh,randFloatSpread:kh,seededRandom:Vh,degToRad:Hh,radToDeg:Gh,isPowerOfTwo:Wh,ceilPowerOfTwo:Xh,floorPowerOfTwo:qh,setQuaternionFromProperEuler:Yh,normalize:yt,denormalize:gi},et=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ke=class i{constructor(e,t,n,s,r,a,o,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){let u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],d=n[7],f=n[2],m=n[5],g=n[8],x=s[0],p=s[3],h=s[6],S=s[1],E=s[4],M=s[7],R=s[2],T=s[5],A=s[8];return r[0]=a*x+o*S+l*R,r[3]=a*p+o*E+l*T,r[6]=a*h+o*M+l*A,r[1]=c*x+u*S+d*R,r[4]=c*p+u*E+d*T,r[7]=c*h+u*M+d*A,r[2]=f*x+m*S+g*R,r[5]=f*p+m*E+g*T,r[8]=f*h+m*M+g*A,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*r*u+n*o*l+s*r*c-s*a*l}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=u*a-o*c,f=o*l-u*r,m=c*r-a*l,g=t*d+n*f+s*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return e[0]=d*x,e[1]=(s*c-u*n)*x,e[2]=(o*n-s*a)*x,e[3]=f*x,e[4]=(u*t-s*l)*x,e[5]=(s*r-o*t)*x,e[6]=m*x,e[7]=(n*l-c*t)*x,e[8]=(a*t-n*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Mr.makeScale(e,t)),this}rotate(e){return this.premultiply(Mr.makeRotation(-e)),this}translate(e,t){return this.premultiply(Mr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Mr=new ke;function gc(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Ws(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Zh(){let i=Ws("canvas");return i.style.display="block",i}var al={};function Hi(i){i in al||(al[i]=!0,console.warn(i))}function $h(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function Jh(i){let e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Kh(i){let e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}var Ye={enabled:!0,workingColorSpace:Pi,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===tt&&(i.r=fn(i.r),i.g=fn(i.g),i.b=fn(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===tt&&(i.r=yi(i.r),i.g=yi(i.g),i.b=yi(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Tn?cr:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function fn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function yi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var ol=[.64,.33,.3,.6,.15,.06],ll=[.2126,.7152,.0722],cl=[.3127,.329],hl=new ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ul=new ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Ye.define({[Pi]:{primaries:ol,whitePoint:cl,transfer:cr,toXYZ:hl,fromXYZ:ul,luminanceCoefficients:ll,workingColorSpaceConfig:{unpackColorSpace:Tt},outputColorSpaceConfig:{drawingBufferColorSpace:Tt}},[Tt]:{primaries:ol,whitePoint:cl,transfer:tt,toXYZ:hl,fromXYZ:ul,luminanceCoefficients:ll,outputColorSpaceConfig:{drawingBufferColorSpace:Tt}}});var ii,Ua=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ii===void 0&&(ii=Ws("canvas")),ii.width=e.width,ii.height=e.height;let n=ii.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ii}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Ws("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=fn(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(fn(t[n]/255)*255):t[n]=fn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},jh=0,Xs=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:jh++}),this.uuid=Li(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(wr(s[a].image)):r.push(wr(s[a]))}else r=wr(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function wr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Ua.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Qh=0,zt=class i extends In{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Wn,s=Wn,r=Kt,a=Xn,o=qt,l=pn,c=i.DEFAULT_ANISOTROPY,u=Tn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Qh++}),this.uuid=Li(),this.name="",this.source=new Xs(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new et(0,0),this.repeat=new et(1,1),this.center=new et(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==sc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case aa:e.x=e.x-Math.floor(e.x);break;case Wn:e.x=e.x<0?0:1;break;case oa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case aa:e.y=e.y-Math.floor(e.y);break;case Wn:e.y=e.y<0?0:1;break;case oa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};zt.DEFAULT_IMAGE=null;zt.DEFAULT_MAPPING=sc;zt.DEFAULT_ANISOTROPY=1;var dt=class i{constructor(e=0,t=0,n=0,s=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,l=e.elements,c=l[0],u=l[4],d=l[8],f=l[1],m=l[5],g=l[9],x=l[2],p=l[6],h=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-x)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+x)<.1&&Math.abs(g+p)<.1&&Math.abs(c+m+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let E=(c+1)/2,M=(m+1)/2,R=(h+1)/2,T=(u+f)/4,A=(d+x)/4,D=(g+p)/4;return E>M&&E>R?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=T/n,r=A/n):M>R?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=T/s,r=D/s):R<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),n=A/r,s=D/r),this.set(n,s,r,t),this}let S=Math.sqrt((p-g)*(p-g)+(d-x)*(d-x)+(f-u)*(f-u));return Math.abs(S)<.001&&(S=1),this.x=(p-g)/S,this.y=(d-x)/S,this.z=(f-u)/S,this.w=Math.acos((c+m+h-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Fa=class extends In{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new dt(0,0,e,t),this.scissorTest=!1,this.viewport=new dt(0,0,e,t);let s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Kt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new zt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new Xs(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},mn=class extends Fa{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},qs=class extends zt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Yt,this.minFilter=Yt,this.wrapR=Wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Oa=class extends zt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Yt,this.minFilter=Yt,this.wrapR=Wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Pn=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],u=n[s+2],d=n[s+3],f=r[a+0],m=r[a+1],g=r[a+2],x=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(o===1){e[t+0]=f,e[t+1]=m,e[t+2]=g,e[t+3]=x;return}if(d!==x||l!==f||c!==m||u!==g){let p=1-o,h=l*f+c*m+u*g+d*x,S=h>=0?1:-1,E=1-h*h;if(E>Number.EPSILON){let R=Math.sqrt(E),T=Math.atan2(R,h*S);p=Math.sin(p*T)/R,o=Math.sin(o*T)/R}let M=o*S;if(l=l*p+f*M,c=c*p+m*M,u=u*p+g*M,d=d*p+x*M,p===1-o){let R=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=R,c*=R,u*=R,d*=R}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],u=n[s+3],d=r[a],f=r[a+1],m=r[a+2],g=r[a+3];return e[t]=o*g+u*d+l*m-c*f,e[t+1]=l*g+u*f+c*d-o*m,e[t+2]=c*g+u*m+o*f-l*d,e[t+3]=u*g-o*d-l*f-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(s/2),d=o(r/2),f=l(n/2),m=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=f*u*d+c*m*g,this._y=c*m*d-f*u*g,this._z=c*u*g+f*m*d,this._w=c*u*d-f*m*g;break;case"YXZ":this._x=f*u*d+c*m*g,this._y=c*m*d-f*u*g,this._z=c*u*g-f*m*d,this._w=c*u*d+f*m*g;break;case"ZXY":this._x=f*u*d-c*m*g,this._y=c*m*d+f*u*g,this._z=c*u*g+f*m*d,this._w=c*u*d-f*m*g;break;case"ZYX":this._x=f*u*d-c*m*g,this._y=c*m*d+f*u*g,this._z=c*u*g-f*m*d,this._w=c*u*d+f*m*g;break;case"YZX":this._x=f*u*d+c*m*g,this._y=c*m*d+f*u*g,this._z=c*u*g-f*m*d,this._w=c*u*d-f*m*g;break;case"XZY":this._x=f*u*d-c*m*g,this._y=c*m*d-f*u*g,this._z=c*u*g+f*m*d,this._w=c*u*d+f*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],d=t[10],f=n+o+d;if(f>0){let m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(u-l)*m,this._y=(r-c)*m,this._z=(a-s)*m}else if(n>o&&n>d){let m=2*Math.sqrt(1+n-o-d);this._w=(u-l)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+c)/m}else if(o>d){let m=2*Math.sqrt(1+o-n-d);this._w=(r-c)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(l+u)/m}else{let m=2*Math.sqrt(1+d-n-o);this._w=(a-s)/m,this._x=(r+c)/m,this._y=(l+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Mt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-n*c,this._z=r*u+a*c+n*l-s*o,this._w=a*u-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,s=this._y,r=this._z,a=this._w,o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;let l=1-o*o;if(l<=Number.EPSILON){let m=1-t;return this._w=m*a+t*this._w,this._x=m*n+t*this._x,this._y=m*s+t*this._y,this._z=m*r+t*this._z,this.normalize(),this}let c=Math.sqrt(l),u=Math.atan2(c,o),d=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=a*d+this._w*f,this._x=n*d+this._x*f,this._y=s*d+this._y*f,this._z=r*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},O=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(dl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(dl.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),u=2*(o*t-r*s),d=2*(r*n-a*t);return this.x=t+l*c+a*d-o*u,this.y=n+l*u+o*c-r*d,this.z=s+l*d+r*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Sr.copy(this).projectOnVector(e),this.sub(Sr)}reflect(e){return this.sub(Sr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Sr=new O,dl=new Pn,Yn=class{constructor(e=new O(1/0,1/0,1/0),t=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Gt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Gt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Gt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Gt):Gt.fromBufferAttribute(r,a),Gt.applyMatrix4(e.matrixWorld),this.expandByPoint(Gt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ds.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ds.copy(n.boundingBox)),ds.applyMatrix4(e.matrixWorld),this.union(ds)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Gt),Gt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Oi),fs.subVectors(this.max,Oi),si.subVectors(e.a,Oi),ri.subVectors(e.b,Oi),ai.subVectors(e.c,Oi),yn.subVectors(ri,si),bn.subVectors(ai,ri),Dn.subVectors(si,ai);let t=[0,-yn.z,yn.y,0,-bn.z,bn.y,0,-Dn.z,Dn.y,yn.z,0,-yn.x,bn.z,0,-bn.x,Dn.z,0,-Dn.x,-yn.y,yn.x,0,-bn.y,bn.x,0,-Dn.y,Dn.x,0];return!Er(t,si,ri,ai,fs)||(t=[1,0,0,0,1,0,0,0,1],!Er(t,si,ri,ai,fs))?!1:(ps.crossVectors(yn,bn),t=[ps.x,ps.y,ps.z],Er(t,si,ri,ai,fs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Gt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Gt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(nn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),nn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),nn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),nn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),nn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),nn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),nn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),nn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(nn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},nn=[new O,new O,new O,new O,new O,new O,new O,new O],Gt=new O,ds=new Yn,si=new O,ri=new O,ai=new O,yn=new O,bn=new O,Dn=new O,Oi=new O,fs=new O,ps=new O,Un=new O;function Er(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Un.fromArray(i,r);let o=s.x*Math.abs(Un.x)+s.y*Math.abs(Un.y)+s.z*Math.abs(Un.z),l=e.dot(Un),c=t.dot(Un),u=n.dot(Un);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var eu=new Yn,Bi=new O,Tr=new O,Zn=class{constructor(e=new O,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):eu.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Bi.subVectors(e,this.center);let t=Bi.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Bi,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Tr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Bi.copy(e.center).add(Tr)),this.expandByPoint(Bi.copy(e.center).sub(Tr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},sn=new O,Ar=new O,ms=new O,Mn=new O,Cr=new O,gs=new O,Rr=new O,Ai=class{constructor(e=new O,t=new O(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,sn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=sn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(sn.copy(this.origin).addScaledVector(this.direction,t),sn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Ar.copy(e).add(t).multiplyScalar(.5),ms.copy(t).sub(e).normalize(),Mn.copy(this.origin).sub(Ar);let r=e.distanceTo(t)*.5,a=-this.direction.dot(ms),o=Mn.dot(this.direction),l=-Mn.dot(ms),c=Mn.lengthSq(),u=Math.abs(1-a*a),d,f,m,g;if(u>0)if(d=a*l-o,f=a*o-l,g=r*u,d>=0)if(f>=-g)if(f<=g){let x=1/u;d*=x,f*=x,m=d*(d+a*f+2*o)+f*(a*d+f+2*l)+c}else f=r,d=Math.max(0,-(a*f+o)),m=-d*d+f*(f+2*l)+c;else f=-r,d=Math.max(0,-(a*f+o)),m=-d*d+f*(f+2*l)+c;else f<=-g?(d=Math.max(0,-(-a*r+o)),f=d>0?-r:Math.min(Math.max(-r,-l),r),m=-d*d+f*(f+2*l)+c):f<=g?(d=0,f=Math.min(Math.max(-r,-l),r),m=f*(f+2*l)+c):(d=Math.max(0,-(a*r+o)),f=d>0?r:Math.min(Math.max(-r,-l),r),m=-d*d+f*(f+2*l)+c);else f=a>0?-r:r,d=Math.max(0,-(a*f+o)),m=-d*d+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Ar).addScaledVector(ms,f),m}intersectSphere(e,t){sn.subVectors(e.center,this.origin);let n=sn.dot(this.direction),s=sn.dot(sn)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l,c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,s=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,s=(e.min.x-f.x)*c),u>=0?(r=(e.min.y-f.y)*u,a=(e.max.y-f.y)*u):(r=(e.max.y-f.y)*u,a=(e.min.y-f.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(o=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,sn)!==null}intersectTriangle(e,t,n,s,r){Cr.subVectors(t,e),gs.subVectors(n,e),Rr.crossVectors(Cr,gs);let a=this.direction.dot(Rr),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Mn.subVectors(this.origin,e);let l=o*this.direction.dot(gs.crossVectors(Mn,gs));if(l<0)return null;let c=o*this.direction.dot(Cr.cross(Mn));if(c<0||l+c>a)return null;let u=-o*Mn.dot(Rr);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ht=class i{constructor(e,t,n,s,r,a,o,l,c,u,d,f,m,g,x,p){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,u,d,f,m,g,x,p)}set(e,t,n,s,r,a,o,l,c,u,d,f,m,g,x,p){let h=this.elements;return h[0]=e,h[4]=t,h[8]=n,h[12]=s,h[1]=r,h[5]=a,h[9]=o,h[13]=l,h[2]=c,h[6]=u,h[10]=d,h[14]=f,h[3]=m,h[7]=g,h[11]=x,h[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,s=1/oi.setFromMatrixColumn(e,0).length(),r=1/oi.setFromMatrixColumn(e,1).length(),a=1/oi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let f=a*u,m=a*d,g=o*u,x=o*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=m+g*c,t[5]=f-x*c,t[9]=-o*l,t[2]=x-f*c,t[6]=g+m*c,t[10]=a*l}else if(e.order==="YXZ"){let f=l*u,m=l*d,g=c*u,x=c*d;t[0]=f+x*o,t[4]=g*o-m,t[8]=a*c,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=m*o-g,t[6]=x+f*o,t[10]=a*l}else if(e.order==="ZXY"){let f=l*u,m=l*d,g=c*u,x=c*d;t[0]=f-x*o,t[4]=-a*d,t[8]=g+m*o,t[1]=m+g*o,t[5]=a*u,t[9]=x-f*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let f=a*u,m=a*d,g=o*u,x=o*d;t[0]=l*u,t[4]=g*c-m,t[8]=f*c+x,t[1]=l*d,t[5]=x*c+f,t[9]=m*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let f=a*l,m=a*c,g=o*l,x=o*c;t[0]=l*u,t[4]=x-f*d,t[8]=g*d+m,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=m*d+g,t[10]=f-x*d}else if(e.order==="XZY"){let f=a*l,m=a*c,g=o*l,x=o*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=f*d+x,t[5]=a*u,t[9]=m*d-g,t[2]=g*d-m,t[6]=o*u,t[10]=x*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(tu,e,nu)}lookAt(e,t,n){let s=this.elements;return Pt.subVectors(e,t),Pt.lengthSq()===0&&(Pt.z=1),Pt.normalize(),wn.crossVectors(n,Pt),wn.lengthSq()===0&&(Math.abs(n.z)===1?Pt.x+=1e-4:Pt.z+=1e-4,Pt.normalize(),wn.crossVectors(n,Pt)),wn.normalize(),vs.crossVectors(Pt,wn),s[0]=wn.x,s[4]=vs.x,s[8]=Pt.x,s[1]=wn.y,s[5]=vs.y,s[9]=Pt.y,s[2]=wn.z,s[6]=vs.z,s[10]=Pt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],d=n[5],f=n[9],m=n[13],g=n[2],x=n[6],p=n[10],h=n[14],S=n[3],E=n[7],M=n[11],R=n[15],T=s[0],A=s[4],D=s[8],b=s[12],y=s[1],C=s[5],W=s[9],B=s[13],X=s[2],J=s[6],Y=s[10],ee=s[14],V=s[3],te=s[7],ce=s[11],ge=s[15];return r[0]=a*T+o*y+l*X+c*V,r[4]=a*A+o*C+l*J+c*te,r[8]=a*D+o*W+l*Y+c*ce,r[12]=a*b+o*B+l*ee+c*ge,r[1]=u*T+d*y+f*X+m*V,r[5]=u*A+d*C+f*J+m*te,r[9]=u*D+d*W+f*Y+m*ce,r[13]=u*b+d*B+f*ee+m*ge,r[2]=g*T+x*y+p*X+h*V,r[6]=g*A+x*C+p*J+h*te,r[10]=g*D+x*W+p*Y+h*ce,r[14]=g*b+x*B+p*ee+h*ge,r[3]=S*T+E*y+M*X+R*V,r[7]=S*A+E*C+M*J+R*te,r[11]=S*D+E*W+M*Y+R*ce,r[15]=S*b+E*B+M*ee+R*ge,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],d=e[6],f=e[10],m=e[14],g=e[3],x=e[7],p=e[11],h=e[15];return g*(+r*l*d-s*c*d-r*o*f+n*c*f+s*o*m-n*l*m)+x*(+t*l*m-t*c*f+r*a*f-s*a*m+s*c*u-r*l*u)+p*(+t*c*d-t*o*m-r*a*d+n*a*m+r*o*u-n*c*u)+h*(-s*o*u-t*l*d+t*o*f+s*a*d-n*a*f+n*l*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=e[9],f=e[10],m=e[11],g=e[12],x=e[13],p=e[14],h=e[15],S=d*p*c-x*f*c+x*l*m-o*p*m-d*l*h+o*f*h,E=g*f*c-u*p*c-g*l*m+a*p*m+u*l*h-a*f*h,M=u*x*c-g*d*c+g*o*m-a*x*m-u*o*h+a*d*h,R=g*d*l-u*x*l-g*o*f+a*x*f+u*o*p-a*d*p,T=t*S+n*E+s*M+r*R;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/T;return e[0]=S*A,e[1]=(x*f*r-d*p*r-x*s*m+n*p*m+d*s*h-n*f*h)*A,e[2]=(o*p*r-x*l*r+x*s*c-n*p*c-o*s*h+n*l*h)*A,e[3]=(d*l*r-o*f*r-d*s*c+n*f*c+o*s*m-n*l*m)*A,e[4]=E*A,e[5]=(u*p*r-g*f*r+g*s*m-t*p*m-u*s*h+t*f*h)*A,e[6]=(g*l*r-a*p*r-g*s*c+t*p*c+a*s*h-t*l*h)*A,e[7]=(a*f*r-u*l*r+u*s*c-t*f*c-a*s*m+t*l*m)*A,e[8]=M*A,e[9]=(g*d*r-u*x*r-g*n*m+t*x*m+u*n*h-t*d*h)*A,e[10]=(a*x*r-g*o*r+g*n*c-t*x*c-a*n*h+t*o*h)*A,e[11]=(u*o*r-a*d*r-u*n*c+t*d*c+a*n*m-t*o*m)*A,e[12]=R*A,e[13]=(u*x*s-g*d*s+g*n*f-t*x*f-u*n*p+t*d*p)*A,e[14]=(g*o*s-a*x*s-g*n*l+t*x*l+a*n*p-t*o*p)*A,e[15]=(a*d*s-u*o*s+u*n*l-t*d*l-a*n*f+t*o*f)*A,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,u=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+n,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,u=a+a,d=o+o,f=r*c,m=r*u,g=r*d,x=a*u,p=a*d,h=o*d,S=l*c,E=l*u,M=l*d,R=n.x,T=n.y,A=n.z;return s[0]=(1-(x+h))*R,s[1]=(m+M)*R,s[2]=(g-E)*R,s[3]=0,s[4]=(m-M)*T,s[5]=(1-(f+h))*T,s[6]=(p+S)*T,s[7]=0,s[8]=(g+E)*A,s[9]=(p-S)*A,s[10]=(1-(f+x))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements,r=oi.set(s[0],s[1],s[2]).length(),a=oi.set(s[4],s[5],s[6]).length(),o=oi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Wt.copy(this);let c=1/r,u=1/a,d=1/o;return Wt.elements[0]*=c,Wt.elements[1]*=c,Wt.elements[2]*=c,Wt.elements[4]*=u,Wt.elements[5]*=u,Wt.elements[6]*=u,Wt.elements[8]*=d,Wt.elements[9]*=d,Wt.elements[10]*=d,t.setFromRotationMatrix(Wt),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=dn){let l=this.elements,c=2*r/(t-e),u=2*r/(n-s),d=(t+e)/(t-e),f=(n+s)/(n-s),m,g;if(o===dn)m=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Gs)m=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=dn){let l=this.elements,c=1/(t-e),u=1/(n-s),d=1/(a-r),f=(t+e)*c,m=(n+s)*u,g,x;if(o===dn)g=(a+r)*d,x=-2*d;else if(o===Gs)g=r*d,x=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=x,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},oi=new O,Wt=new ht,tu=new O(0,0,0),nu=new O(1,1,1),wn=new O,vs=new O,Pt=new O,fl=new ht,pl=new Pn,gn=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],d=s[2],f=s[6],m=s[10];switch(t){case"XYZ":this._y=Math.asin(Mt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Mt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Mt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Mt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Mt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Mt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return fl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(fl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return pl.setFromEuler(this),this.setFromQuaternion(pl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};gn.DEFAULT_ORDER="XYZ";var $i=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},iu=0,ml=new O,li=new Pn,rn=new ht,xs=new O,zi=new O,su=new O,ru=new Pn,gl=new O(1,0,0),vl=new O(0,1,0),xl=new O(0,0,1),_l={type:"added"},au={type:"removed"},ci={type:"childadded",child:null},Ir={type:"childremoved",child:null},Dt=class i extends In{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:iu++}),this.uuid=Li(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new O,t=new gn,n=new Pn,s=new O(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ht},normalMatrix:{value:new ke}}),this.matrix=new ht,this.matrixWorld=new ht,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new $i,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return li.setFromAxisAngle(e,t),this.quaternion.multiply(li),this}rotateOnWorldAxis(e,t){return li.setFromAxisAngle(e,t),this.quaternion.premultiply(li),this}rotateX(e){return this.rotateOnAxis(gl,e)}rotateY(e){return this.rotateOnAxis(vl,e)}rotateZ(e){return this.rotateOnAxis(xl,e)}translateOnAxis(e,t){return ml.copy(e).applyQuaternion(this.quaternion),this.position.add(ml.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(gl,e)}translateY(e){return this.translateOnAxis(vl,e)}translateZ(e){return this.translateOnAxis(xl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(rn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?xs.copy(e):xs.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),zi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?rn.lookAt(zi,xs,this.up):rn.lookAt(xs,zi,this.up),this.quaternion.setFromRotationMatrix(rn),s&&(rn.extractRotation(s.matrixWorld),li.setFromRotationMatrix(rn),this.quaternion.premultiply(li.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(_l),ci.child=e,this.dispatchEvent(ci),ci.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(au),Ir.child=e,this.dispatchEvent(Ir),Ir.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),rn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),rn.multiply(e.parent.matrixWorld)),e.applyMatrix4(rn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(_l),ci.child=e,this.dispatchEvent(ci),ci.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zi,e,su),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zi,ru,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),d=a(e.shapes),f=a(e.skeletons),m=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};Dt.DEFAULT_UP=new O(0,1,0);Dt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Xt=new O,an=new O,Pr=new O,on=new O,hi=new O,ui=new O,yl=new O,Lr=new O,Nr=new O,Dr=new O,Ur=new dt,Fr=new dt,Or=new dt,Hn=class i{constructor(e=new O,t=new O,n=new O){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Xt.subVectors(e,t),s.cross(Xt);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Xt.subVectors(s,t),an.subVectors(n,t),Pr.subVectors(e,t);let a=Xt.dot(Xt),o=Xt.dot(an),l=Xt.dot(Pr),c=an.dot(an),u=an.dot(Pr),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let f=1/d,m=(c*l-o*u)*f,g=(a*u-o*l)*f;return r.set(1-m-g,g,m)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,on)===null?!1:on.x>=0&&on.y>=0&&on.x+on.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,on)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,on.x),l.addScaledVector(a,on.y),l.addScaledVector(o,on.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return Ur.setScalar(0),Fr.setScalar(0),Or.setScalar(0),Ur.fromBufferAttribute(e,t),Fr.fromBufferAttribute(e,n),Or.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Ur,r.x),a.addScaledVector(Fr,r.y),a.addScaledVector(Or,r.z),a}static isFrontFacing(e,t,n,s){return Xt.subVectors(n,t),an.subVectors(e,t),Xt.cross(an).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Xt.subVectors(this.c,this.b),an.subVectors(this.a,this.b),Xt.cross(an).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;hi.subVectors(s,n),ui.subVectors(r,n),Lr.subVectors(e,n);let l=hi.dot(Lr),c=ui.dot(Lr);if(l<=0&&c<=0)return t.copy(n);Nr.subVectors(e,s);let u=hi.dot(Nr),d=ui.dot(Nr);if(u>=0&&d<=u)return t.copy(s);let f=l*d-u*c;if(f<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(hi,a);Dr.subVectors(e,r);let m=hi.dot(Dr),g=ui.dot(Dr);if(g>=0&&m<=g)return t.copy(r);let x=m*c-l*g;if(x<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(ui,o);let p=u*g-m*d;if(p<=0&&d-u>=0&&m-g>=0)return yl.subVectors(r,s),o=(d-u)/(d-u+(m-g)),t.copy(s).addScaledVector(yl,o);let h=1/(p+x+f);return a=x*h,o=f*h,t.copy(n).addScaledVector(hi,a).addScaledVector(ui,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},vc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Sn={h:0,s:0,l:0},_s={h:0,s:0,l:0};function Br(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var We=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Tt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ye.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=Ye.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ye.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=Ye.workingColorSpace){if(e=go(e,1),t=Mt(t,0,1),n=Mt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Br(a,r,e+1/3),this.g=Br(a,r,e),this.b=Br(a,r,e-1/3)}return Ye.toWorkingColorSpace(this,s),this}setStyle(e,t=Tt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Tt){let n=vc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=fn(e.r),this.g=fn(e.g),this.b=fn(e.b),this}copyLinearToSRGB(e){return this.r=yi(e.r),this.g=yi(e.g),this.b=yi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Tt){return Ye.fromWorkingColorSpace(_t.copy(this),e),Math.round(Mt(_t.r*255,0,255))*65536+Math.round(Mt(_t.g*255,0,255))*256+Math.round(Mt(_t.b*255,0,255))}getHexString(e=Tt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ye.workingColorSpace){Ye.fromWorkingColorSpace(_t.copy(this),t);let n=_t.r,s=_t.g,r=_t.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,u=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=u<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Ye.workingColorSpace){return Ye.fromWorkingColorSpace(_t.copy(this),t),e.r=_t.r,e.g=_t.g,e.b=_t.b,e}getStyle(e=Tt){Ye.fromWorkingColorSpace(_t.copy(this),e);let t=_t.r,n=_t.g,s=_t.b;return e!==Tt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Sn),this.setHSL(Sn.h+e,Sn.s+t,Sn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Sn),e.getHSL(_s);let n=Xi(Sn.h,_s.h,t),s=Xi(Sn.s,_s.s,t),r=Xi(Sn.l,_s.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},_t=new We;We.NAMES=vc;var ou=0,Ln=class extends In{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ou++}),this.uuid=Li(),this.name="",this.blending=xi,this.side=Rn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=$r,this.blendDst=Jr,this.blendEquation=Vn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new We(0,0,0),this.blendAlpha=0,this.depthFunc=Mi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=nl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ni,this.stencilZFail=ni,this.stencilZPass=ni,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==xi&&(n.blending=this.blending),this.side!==Rn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==$r&&(n.blendSrc=this.blendSrc),this.blendDst!==Jr&&(n.blendDst=this.blendDst),this.blendEquation!==Vn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Mi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==nl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ni&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ni&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ni&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},Ci=class extends Ln{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new We(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gn,this.combine=ic,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var ft=new O,ys=new et,Bt=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=il,this.updateRanges=[],this.gpuType=un,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ys.fromBufferAttribute(this,t),ys.applyMatrix3(e),this.setXY(t,ys.x,ys.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ft.fromBufferAttribute(this,t),ft.applyMatrix3(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ft.fromBufferAttribute(this,t),ft.applyMatrix4(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ft.fromBufferAttribute(this,t),ft.applyNormalMatrix(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ft.fromBufferAttribute(this,t),ft.transformDirection(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=gi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=yt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=gi(t,this.array)),t}setX(e,t){return this.normalized&&(t=yt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=gi(t,this.array)),t}setY(e,t){return this.normalized&&(t=yt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=gi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=yt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=gi(t,this.array)),t}setW(e,t){return this.normalized&&(t=yt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=yt(t,this.array),n=yt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=yt(t,this.array),n=yt(n,this.array),s=yt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=yt(t,this.array),n=yt(n,this.array),s=yt(s,this.array),r=yt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==il&&(e.usage=this.usage),e}};var Ys=class extends Bt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Zs=class extends Bt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var wt=class extends Bt{constructor(e,t,n){super(new Float32Array(e),t,n)}},lu=0,Ot=new ht,zr=new Dt,di=new O,Lt=new Yn,ki=new Yn,gt=new O,Rt=class i extends In{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:lu++}),this.uuid=Li(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(gc(e)?Zs:Ys)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new ke().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Ot.makeRotationFromQuaternion(e),this.applyMatrix4(Ot),this}rotateX(e){return Ot.makeRotationX(e),this.applyMatrix4(Ot),this}rotateY(e){return Ot.makeRotationY(e),this.applyMatrix4(Ot),this}rotateZ(e){return Ot.makeRotationZ(e),this.applyMatrix4(Ot),this}translate(e,t,n){return Ot.makeTranslation(e,t,n),this.applyMatrix4(Ot),this}scale(e,t,n){return Ot.makeScale(e,t,n),this.applyMatrix4(Ot),this}lookAt(e){return zr.lookAt(e),zr.updateMatrix(),this.applyMatrix4(zr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(di).negate(),this.translate(di.x,di.y,di.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new wt(n,3))}else{for(let n=0,s=t.count;n<s;n++){let r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Yn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];Lt.setFromBufferAttribute(r),this.morphTargetsRelative?(gt.addVectors(this.boundingBox.min,Lt.min),this.boundingBox.expandByPoint(gt),gt.addVectors(this.boundingBox.max,Lt.max),this.boundingBox.expandByPoint(gt)):(this.boundingBox.expandByPoint(Lt.min),this.boundingBox.expandByPoint(Lt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Zn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(e){let n=this.boundingSphere.center;if(Lt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];ki.setFromBufferAttribute(o),this.morphTargetsRelative?(gt.addVectors(Lt.min,ki.min),Lt.expandByPoint(gt),gt.addVectors(Lt.max,ki.max),Lt.expandByPoint(gt)):(Lt.expandByPoint(ki.min),Lt.expandByPoint(ki.max))}Lt.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)gt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(gt));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)gt.fromBufferAttribute(o,c),l&&(di.fromBufferAttribute(e,c),gt.add(di)),s=Math.max(s,n.distanceToSquared(gt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Bt(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let D=0;D<n.count;D++)o[D]=new O,l[D]=new O;let c=new O,u=new O,d=new O,f=new et,m=new et,g=new et,x=new O,p=new O;function h(D,b,y){c.fromBufferAttribute(n,D),u.fromBufferAttribute(n,b),d.fromBufferAttribute(n,y),f.fromBufferAttribute(r,D),m.fromBufferAttribute(r,b),g.fromBufferAttribute(r,y),u.sub(c),d.sub(c),m.sub(f),g.sub(f);let C=1/(m.x*g.y-g.x*m.y);isFinite(C)&&(x.copy(u).multiplyScalar(g.y).addScaledVector(d,-m.y).multiplyScalar(C),p.copy(d).multiplyScalar(m.x).addScaledVector(u,-g.x).multiplyScalar(C),o[D].add(x),o[b].add(x),o[y].add(x),l[D].add(p),l[b].add(p),l[y].add(p))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let D=0,b=S.length;D<b;++D){let y=S[D],C=y.start,W=y.count;for(let B=C,X=C+W;B<X;B+=3)h(e.getX(B+0),e.getX(B+1),e.getX(B+2))}let E=new O,M=new O,R=new O,T=new O;function A(D){R.fromBufferAttribute(s,D),T.copy(R);let b=o[D];E.copy(b),E.sub(R.multiplyScalar(R.dot(b))).normalize(),M.crossVectors(T,b);let C=M.dot(l[D])<0?-1:1;a.setXYZW(D,E.x,E.y,E.z,C)}for(let D=0,b=S.length;D<b;++D){let y=S[D],C=y.start,W=y.count;for(let B=C,X=C+W;B<X;B+=3)A(e.getX(B+0)),A(e.getX(B+1)),A(e.getX(B+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Bt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,m=n.count;f<m;f++)n.setXYZ(f,0,0,0);let s=new O,r=new O,a=new O,o=new O,l=new O,c=new O,u=new O,d=new O;if(e)for(let f=0,m=e.count;f<m;f+=3){let g=e.getX(f+0),x=e.getX(f+1),p=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,x),a.fromBufferAttribute(t,p),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,p),o.add(u),l.add(u),c.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let f=0,m=t.count;f<m;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)gt.fromBufferAttribute(e,t),gt.normalize(),e.setXYZ(t,gt.x,gt.y,gt.z)}toNonIndexed(){function e(o,l){let c=o.array,u=o.itemSize,d=o.normalized,f=new c.constructor(l.length*u),m=0,g=0;for(let x=0,p=l.length;x<p;x++){o.isInterleavedBufferAttribute?m=l[x]*o.data.stride+o.offset:m=l[x]*u;for(let h=0;h<u;h++)f[g++]=c[m++]}return new Bt(f,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=e(l,n);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let u=0,d=c.length;u<d;u++){let f=c[u],m=e(f,n);l.push(m)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){let m=c[d];u.push(m.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let s=e.attributes;for(let c in s){let u=s[c];this.setAttribute(c,u.clone(t))}let r=e.morphAttributes;for(let c in r){let u=[],d=r[c];for(let f=0,m=d.length;f<m;f++)u.push(d[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,u=a.length;c<u;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},bl=new ht,Fn=new Ai,bs=new Zn,Ml=new O,Ms=new O,ws=new O,Ss=new O,kr=new O,Es=new O,wl=new O,Ts=new O,At=class extends Dt{constructor(e=new Rt,t=new Ci){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){Es.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=o[l],d=r[l];u!==0&&(kr.fromBufferAttribute(d,e),a?Es.addScaledVector(kr,u):Es.addScaledVector(kr.sub(t),u))}t.add(Es)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),bs.copy(n.boundingSphere),bs.applyMatrix4(r),Fn.copy(e.ray).recast(e.near),!(bs.containsPoint(Fn.origin)===!1&&(Fn.intersectSphere(bs,Ml)===null||Fn.origin.distanceToSquared(Ml)>(e.far-e.near)**2))&&(bl.copy(r).invert(),Fn.copy(e.ray).applyMatrix4(bl),!(n.boundingBox!==null&&Fn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Fn)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,f=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=f.length;g<x;g++){let p=f[g],h=a[p.materialIndex],S=Math.max(p.start,m.start),E=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let M=S,R=E;M<R;M+=3){let T=o.getX(M),A=o.getX(M+1),D=o.getX(M+2);s=As(this,h,e,n,c,u,d,T,A,D),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{let g=Math.max(0,m.start),x=Math.min(o.count,m.start+m.count);for(let p=g,h=x;p<h;p+=3){let S=o.getX(p),E=o.getX(p+1),M=o.getX(p+2);s=As(this,a,e,n,c,u,d,S,E,M),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,x=f.length;g<x;g++){let p=f[g],h=a[p.materialIndex],S=Math.max(p.start,m.start),E=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let M=S,R=E;M<R;M+=3){let T=M,A=M+1,D=M+2;s=As(this,h,e,n,c,u,d,T,A,D),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{let g=Math.max(0,m.start),x=Math.min(l.count,m.start+m.count);for(let p=g,h=x;p<h;p+=3){let S=p,E=p+1,M=p+2;s=As(this,a,e,n,c,u,d,S,E,M),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}}};function cu(i,e,t,n,s,r,a,o){let l;if(e.side===Ct?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===Rn,o),l===null)return null;Ts.copy(o),Ts.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(Ts);return c<t.near||c>t.far?null:{distance:c,point:Ts.clone(),object:i}}function As(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,Ms),i.getVertexPosition(l,ws),i.getVertexPosition(c,Ss);let u=cu(i,e,t,n,Ms,ws,Ss,wl);if(u){let d=new O;Hn.getBarycoord(wl,Ms,ws,Ss,d),s&&(u.uv=Hn.getInterpolatedAttribute(s,o,l,c,d,new et)),r&&(u.uv1=Hn.getInterpolatedAttribute(r,o,l,c,d,new et)),a&&(u.normal=Hn.getInterpolatedAttribute(a,o,l,c,d,new O),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let f={a:o,b:l,c,normal:new O,materialIndex:0};Hn.getNormal(Ms,ws,Ss,f.normal),u.face=f,u.barycoord=d}return u}var Ji=class i extends Rt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],u=[],d=[],f=0,m=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new wt(c,3)),this.setAttribute("normal",new wt(u,3)),this.setAttribute("uv",new wt(d,2));function g(x,p,h,S,E,M,R,T,A,D,b){let y=M/A,C=R/D,W=M/2,B=R/2,X=T/2,J=A+1,Y=D+1,ee=0,V=0,te=new O;for(let ce=0;ce<Y;ce++){let ge=ce*C-B;for(let we=0;we<J;we++){let De=we*y-W;te[x]=De*S,te[p]=ge*E,te[h]=X,c.push(te.x,te.y,te.z),te[x]=0,te[p]=0,te[h]=T>0?1:-1,u.push(te.x,te.y,te.z),d.push(we/A),d.push(1-ce/D),ee+=1}}for(let ce=0;ce<D;ce++)for(let ge=0;ge<A;ge++){let we=f+ge+J*ce,De=f+ge+J*(ce+1),L=f+(ge+1)+J*(ce+1),G=f+(ge+1)+J*ce;l.push(we,De,G),l.push(De,L,G),V+=6}o.addGroup(m,V,b),m+=V,f+=ee}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Ri(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function bt(i){let e={};for(let t=0;t<i.length;t++){let n=Ri(i[t]);for(let s in n)e[s]=n[s]}return e}function hu(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function xc(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ye.workingColorSpace}var uu={clone:Ri,merge:bt},du=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,fu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,kt=class extends Ln{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=du,this.fragmentShader=fu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ri(e.uniforms),this.uniformsGroups=hu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},$s=class extends Dt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ht,this.projectionMatrix=new ht,this.projectionMatrixInverse=new ht,this.coordinateSystem=dn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},En=new O,Sl=new et,El=new et,Nt=class extends $s{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Zi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Wi*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Zi*2*Math.atan(Math.tan(Wi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){En.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(En.x,En.y).multiplyScalar(-e/En.z),En.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(En.x,En.y).multiplyScalar(-e/En.z)}getViewSize(e,t){return this.getViewBounds(e,Sl,El),t.subVectors(El,Sl)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Wi*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},fi=-90,pi=1,Ba=class extends Dt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Nt(fi,pi,e,t);s.layers=this.layers,this.add(s);let r=new Nt(fi,pi,e,t);r.layers=this.layers,this.add(r);let a=new Nt(fi,pi,e,t);a.layers=this.layers,this.add(a);let o=new Nt(fi,pi,e,t);o.layers=this.layers,this.add(o);let l=new Nt(fi,pi,e,t);l.layers=this.layers,this.add(l);let c=new Nt(fi,pi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===dn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Gs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,s),e.render(t,u),e.setRenderTarget(d,f,m),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Js=class extends zt{constructor(e,t,n,s,r,a,o,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:wi,super(e,t,n,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},za=class extends mn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Js(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Kt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Ji(5,5,5),r=new kt({name:"CubemapFromEquirect",uniforms:Ri(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ct,blending:An});r.uniforms.tEquirect.value=t;let a=new At(s,r),o=t.minFilter;return t.minFilter===Xn&&(t.minFilter=Kt),new Ba(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,s){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}},Vr=new O,pu=new O,mu=new ke,cn=class{constructor(e=new O(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Vr.subVectors(n,t).cross(pu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Vr),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||mu.getNormalMatrix(e),s=this.coplanarPoint(Vr).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},On=new Zn,Cs=new O,Ks=class{constructor(e=new cn,t=new cn,n=new cn,s=new cn,r=new cn,a=new cn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=dn){let n=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],u=s[5],d=s[6],f=s[7],m=s[8],g=s[9],x=s[10],p=s[11],h=s[12],S=s[13],E=s[14],M=s[15];if(n[0].setComponents(l-r,f-c,p-m,M-h).normalize(),n[1].setComponents(l+r,f+c,p+m,M+h).normalize(),n[2].setComponents(l+a,f+u,p+g,M+S).normalize(),n[3].setComponents(l-a,f-u,p-g,M-S).normalize(),n[4].setComponents(l-o,f-d,p-x,M-E).normalize(),t===dn)n[5].setComponents(l+o,f+d,p+x,M+E).normalize();else if(t===Gs)n[5].setComponents(o,d,x,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),On.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),On.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(On)}intersectsSprite(e){return On.center.set(0,0,0),On.radius=.7071067811865476,On.applyMatrix4(e.matrixWorld),this.intersectsSphere(On)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Cs.x=s.normal.x>0?e.max.x:e.min.x,Cs.y=s.normal.y>0?e.max.y:e.min.y,Cs.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Cs)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function _c(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function gu(i){let e=new WeakMap;function t(o,l){let c=o.array,u=o.usage,d=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,u),o.onUploadCallback();let m;if(c instanceof Float32Array)m=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=i.SHORT;else if(c instanceof Uint32Array)m=i.UNSIGNED_INT;else if(c instanceof Int32Array)m=i.INT;else if(c instanceof Int8Array)m=i.BYTE;else if(c instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){let u=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,u);else{d.sort((m,g)=>m.start-g.start);let f=0;for(let m=1;m<d.length;m++){let g=d[f],x=d[m];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++f,d[f]=x)}d.length=f+1;for(let m=0,g=d.length;m<g;m++){let x=d[m];i.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var js=class i extends Rt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,u=l+1,d=e/o,f=t/l,m=[],g=[],x=[],p=[];for(let h=0;h<u;h++){let S=h*f-a;for(let E=0;E<c;E++){let M=E*d-r;g.push(M,-S,0),x.push(0,0,1),p.push(E/o),p.push(1-h/l)}}for(let h=0;h<l;h++)for(let S=0;S<o;S++){let E=S+c*h,M=S+c*(h+1),R=S+1+c*(h+1),T=S+1+c*h;m.push(E,M,T),m.push(M,R,T)}this.setIndex(m),this.setAttribute("position",new wt(g,3)),this.setAttribute("normal",new wt(x,3)),this.setAttribute("uv",new wt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},vu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,xu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,_u=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,yu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,bu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Mu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,wu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Su=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Eu=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Tu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Au=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Cu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ru=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Iu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Pu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Lu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Nu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Du=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Uu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Fu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ou=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Bu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,zu=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,ku=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Vu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Hu=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Gu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Wu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Xu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,qu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Yu="gl_FragColor = linearToOutputTexel( gl_FragColor );",Zu=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,$u=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Ju=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ku=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,ju=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Qu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,ed=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,td=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,nd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,id=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,sd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,rd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ad=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,od=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ld=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,cd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,hd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ud=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,dd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,fd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,pd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,md=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,gd=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,vd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,xd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,_d=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,yd=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,bd=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Md=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,wd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Sd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ed=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Td=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ad=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Cd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Rd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Id=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Pd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ld=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Nd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Dd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Ud=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Fd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Od=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,zd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,kd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Vd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Hd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Gd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Wd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Xd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,qd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Yd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Zd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,$d=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Jd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Kd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,jd=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Qd=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,ef=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,tf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,nf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,sf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,rf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,af=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,of=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,lf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,cf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,hf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,uf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,df=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,ff=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,pf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,mf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,gf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,vf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,xf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_f=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Mf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Sf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Ef=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Tf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Af=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Cf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,If=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Pf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Lf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Nf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Df=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Uf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Ff=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Of=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Bf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,zf=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,kf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Hf=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gf=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Wf=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xf=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,qf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Yf=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Zf=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,$f=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Jf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,He={alphahash_fragment:vu,alphahash_pars_fragment:xu,alphamap_fragment:_u,alphamap_pars_fragment:yu,alphatest_fragment:bu,alphatest_pars_fragment:Mu,aomap_fragment:wu,aomap_pars_fragment:Su,batching_pars_vertex:Eu,batching_vertex:Tu,begin_vertex:Au,beginnormal_vertex:Cu,bsdfs:Ru,iridescence_fragment:Iu,bumpmap_pars_fragment:Pu,clipping_planes_fragment:Lu,clipping_planes_pars_fragment:Nu,clipping_planes_pars_vertex:Du,clipping_planes_vertex:Uu,color_fragment:Fu,color_pars_fragment:Ou,color_pars_vertex:Bu,color_vertex:zu,common:ku,cube_uv_reflection_fragment:Vu,defaultnormal_vertex:Hu,displacementmap_pars_vertex:Gu,displacementmap_vertex:Wu,emissivemap_fragment:Xu,emissivemap_pars_fragment:qu,colorspace_fragment:Yu,colorspace_pars_fragment:Zu,envmap_fragment:$u,envmap_common_pars_fragment:Ju,envmap_pars_fragment:Ku,envmap_pars_vertex:ju,envmap_physical_pars_fragment:cd,envmap_vertex:Qu,fog_vertex:ed,fog_pars_vertex:td,fog_fragment:nd,fog_pars_fragment:id,gradientmap_pars_fragment:sd,lightmap_pars_fragment:rd,lights_lambert_fragment:ad,lights_lambert_pars_fragment:od,lights_pars_begin:ld,lights_toon_fragment:hd,lights_toon_pars_fragment:ud,lights_phong_fragment:dd,lights_phong_pars_fragment:fd,lights_physical_fragment:pd,lights_physical_pars_fragment:md,lights_fragment_begin:gd,lights_fragment_maps:vd,lights_fragment_end:xd,logdepthbuf_fragment:_d,logdepthbuf_pars_fragment:yd,logdepthbuf_pars_vertex:bd,logdepthbuf_vertex:Md,map_fragment:wd,map_pars_fragment:Sd,map_particle_fragment:Ed,map_particle_pars_fragment:Td,metalnessmap_fragment:Ad,metalnessmap_pars_fragment:Cd,morphinstance_vertex:Rd,morphcolor_vertex:Id,morphnormal_vertex:Pd,morphtarget_pars_vertex:Ld,morphtarget_vertex:Nd,normal_fragment_begin:Dd,normal_fragment_maps:Ud,normal_pars_fragment:Fd,normal_pars_vertex:Od,normal_vertex:Bd,normalmap_pars_fragment:zd,clearcoat_normal_fragment_begin:kd,clearcoat_normal_fragment_maps:Vd,clearcoat_pars_fragment:Hd,iridescence_pars_fragment:Gd,opaque_fragment:Wd,packing:Xd,premultiplied_alpha_fragment:qd,project_vertex:Yd,dithering_fragment:Zd,dithering_pars_fragment:$d,roughnessmap_fragment:Jd,roughnessmap_pars_fragment:Kd,shadowmap_pars_fragment:jd,shadowmap_pars_vertex:Qd,shadowmap_vertex:ef,shadowmask_pars_fragment:tf,skinbase_vertex:nf,skinning_pars_vertex:sf,skinning_vertex:rf,skinnormal_vertex:af,specularmap_fragment:of,specularmap_pars_fragment:lf,tonemapping_fragment:cf,tonemapping_pars_fragment:hf,transmission_fragment:uf,transmission_pars_fragment:df,uv_pars_fragment:ff,uv_pars_vertex:pf,uv_vertex:mf,worldpos_vertex:gf,background_vert:vf,background_frag:xf,backgroundCube_vert:_f,backgroundCube_frag:yf,cube_vert:bf,cube_frag:Mf,depth_vert:wf,depth_frag:Sf,distanceRGBA_vert:Ef,distanceRGBA_frag:Tf,equirect_vert:Af,equirect_frag:Cf,linedashed_vert:Rf,linedashed_frag:If,meshbasic_vert:Pf,meshbasic_frag:Lf,meshlambert_vert:Nf,meshlambert_frag:Df,meshmatcap_vert:Uf,meshmatcap_frag:Ff,meshnormal_vert:Of,meshnormal_frag:Bf,meshphong_vert:zf,meshphong_frag:kf,meshphysical_vert:Vf,meshphysical_frag:Hf,meshtoon_vert:Gf,meshtoon_frag:Wf,points_vert:Xf,points_frag:qf,shadow_vert:Yf,shadow_frag:Zf,sprite_vert:$f,sprite_frag:Jf},le={common:{diffuse:{value:new We(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ke}},envmap:{envMap:{value:null},envMapRotation:{value:new ke},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ke},normalScale:{value:new et(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new We(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new We(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0},uvTransform:{value:new ke}},sprite:{diffuse:{value:new We(16777215)},opacity:{value:1},center:{value:new et(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}}},Jt={basic:{uniforms:bt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.fog]),vertexShader:He.meshbasic_vert,fragmentShader:He.meshbasic_frag},lambert:{uniforms:bt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new We(0)}}]),vertexShader:He.meshlambert_vert,fragmentShader:He.meshlambert_frag},phong:{uniforms:bt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new We(0)},specular:{value:new We(1118481)},shininess:{value:30}}]),vertexShader:He.meshphong_vert,fragmentShader:He.meshphong_frag},standard:{uniforms:bt([le.common,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.roughnessmap,le.metalnessmap,le.fog,le.lights,{emissive:{value:new We(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag},toon:{uniforms:bt([le.common,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.gradientmap,le.fog,le.lights,{emissive:{value:new We(0)}}]),vertexShader:He.meshtoon_vert,fragmentShader:He.meshtoon_frag},matcap:{uniforms:bt([le.common,le.bumpmap,le.normalmap,le.displacementmap,le.fog,{matcap:{value:null}}]),vertexShader:He.meshmatcap_vert,fragmentShader:He.meshmatcap_frag},points:{uniforms:bt([le.points,le.fog]),vertexShader:He.points_vert,fragmentShader:He.points_frag},dashed:{uniforms:bt([le.common,le.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:He.linedashed_vert,fragmentShader:He.linedashed_frag},depth:{uniforms:bt([le.common,le.displacementmap]),vertexShader:He.depth_vert,fragmentShader:He.depth_frag},normal:{uniforms:bt([le.common,le.bumpmap,le.normalmap,le.displacementmap,{opacity:{value:1}}]),vertexShader:He.meshnormal_vert,fragmentShader:He.meshnormal_frag},sprite:{uniforms:bt([le.sprite,le.fog]),vertexShader:He.sprite_vert,fragmentShader:He.sprite_frag},background:{uniforms:{uvTransform:{value:new ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:He.background_vert,fragmentShader:He.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ke}},vertexShader:He.backgroundCube_vert,fragmentShader:He.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:He.cube_vert,fragmentShader:He.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:He.equirect_vert,fragmentShader:He.equirect_frag},distanceRGBA:{uniforms:bt([le.common,le.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:He.distanceRGBA_vert,fragmentShader:He.distanceRGBA_frag},shadow:{uniforms:bt([le.lights,le.fog,{color:{value:new We(0)},opacity:{value:1}}]),vertexShader:He.shadow_vert,fragmentShader:He.shadow_frag}};Jt.physical={uniforms:bt([Jt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ke},clearcoatNormalScale:{value:new et(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ke},sheen:{value:0},sheenColor:{value:new We(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ke},transmissionSamplerSize:{value:new et},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ke},attenuationDistance:{value:0},attenuationColor:{value:new We(0)},specularColor:{value:new We(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ke},anisotropyVector:{value:new et},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ke}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag};var Rs={r:0,b:0,g:0},Bn=new gn,Kf=new ht;function jf(i,e,t,n,s,r,a){let o=new We(0),l=r===!0?0:1,c,u,d=null,f=0,m=null;function g(S){let E=S.isScene===!0?S.background:null;return E&&E.isTexture&&(E=(S.backgroundBlurriness>0?t:e).get(E)),E}function x(S){let E=!1,M=g(S);M===null?h(o,l):M&&M.isColor&&(h(M,1),E=!0);let R=i.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,a):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||E)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function p(S,E){let M=g(E);M&&(M.isCubeTexture||M.mapping===lr)?(u===void 0&&(u=new At(new Ji(1,1,1),new kt({name:"BackgroundCubeMaterial",uniforms:Ri(Jt.backgroundCube.uniforms),vertexShader:Jt.backgroundCube.vertexShader,fragmentShader:Jt.backgroundCube.fragmentShader,side:Ct,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(R,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),Bn.copy(E.backgroundRotation),Bn.x*=-1,Bn.y*=-1,Bn.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Bn.y*=-1,Bn.z*=-1),u.material.uniforms.envMap.value=M,u.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Kf.makeRotationFromEuler(Bn)),u.material.toneMapped=Ye.getTransfer(M.colorSpace)!==tt,(d!==M||f!==M.version||m!==i.toneMapping)&&(u.material.needsUpdate=!0,d=M,f=M.version,m=i.toneMapping),u.layers.enableAll(),S.unshift(u,u.geometry,u.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new At(new js(2,2),new kt({name:"BackgroundMaterial",uniforms:Ri(Jt.background.uniforms),vertexShader:Jt.background.vertexShader,fragmentShader:Jt.background.fragmentShader,side:Rn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.toneMapped=Ye.getTransfer(M.colorSpace)!==tt,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(d!==M||f!==M.version||m!==i.toneMapping)&&(c.material.needsUpdate=!0,d=M,f=M.version,m=i.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function h(S,E){S.getRGB(Rs,xc(i)),n.buffers.color.setClear(Rs.r,Rs.g,Rs.b,E,a)}return{getClearColor:function(){return o},setClearColor:function(S,E=1){o.set(S),l=E,h(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,h(o,l)},render:x,addToRenderList:p}}function Qf(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null),r=s,a=!1;function o(y,C,W,B,X){let J=!1,Y=d(B,W,C);r!==Y&&(r=Y,c(r.object)),J=m(y,B,W,X),J&&g(y,B,W,X),X!==null&&e.update(X,i.ELEMENT_ARRAY_BUFFER),(J||a)&&(a=!1,M(y,C,W,B),X!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function l(){return i.createVertexArray()}function c(y){return i.bindVertexArray(y)}function u(y){return i.deleteVertexArray(y)}function d(y,C,W){let B=W.wireframe===!0,X=n[y.id];X===void 0&&(X={},n[y.id]=X);let J=X[C.id];J===void 0&&(J={},X[C.id]=J);let Y=J[B];return Y===void 0&&(Y=f(l()),J[B]=Y),Y}function f(y){let C=[],W=[],B=[];for(let X=0;X<t;X++)C[X]=0,W[X]=0,B[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:W,attributeDivisors:B,object:y,attributes:{},index:null}}function m(y,C,W,B){let X=r.attributes,J=C.attributes,Y=0,ee=W.getAttributes();for(let V in ee)if(ee[V].location>=0){let ce=X[V],ge=J[V];if(ge===void 0&&(V==="instanceMatrix"&&y.instanceMatrix&&(ge=y.instanceMatrix),V==="instanceColor"&&y.instanceColor&&(ge=y.instanceColor)),ce===void 0||ce.attribute!==ge||ge&&ce.data!==ge.data)return!0;Y++}return r.attributesNum!==Y||r.index!==B}function g(y,C,W,B){let X={},J=C.attributes,Y=0,ee=W.getAttributes();for(let V in ee)if(ee[V].location>=0){let ce=J[V];ce===void 0&&(V==="instanceMatrix"&&y.instanceMatrix&&(ce=y.instanceMatrix),V==="instanceColor"&&y.instanceColor&&(ce=y.instanceColor));let ge={};ge.attribute=ce,ce&&ce.data&&(ge.data=ce.data),X[V]=ge,Y++}r.attributes=X,r.attributesNum=Y,r.index=B}function x(){let y=r.newAttributes;for(let C=0,W=y.length;C<W;C++)y[C]=0}function p(y){h(y,0)}function h(y,C){let W=r.newAttributes,B=r.enabledAttributes,X=r.attributeDivisors;W[y]=1,B[y]===0&&(i.enableVertexAttribArray(y),B[y]=1),X[y]!==C&&(i.vertexAttribDivisor(y,C),X[y]=C)}function S(){let y=r.newAttributes,C=r.enabledAttributes;for(let W=0,B=C.length;W<B;W++)C[W]!==y[W]&&(i.disableVertexAttribArray(W),C[W]=0)}function E(y,C,W,B,X,J,Y){Y===!0?i.vertexAttribIPointer(y,C,W,X,J):i.vertexAttribPointer(y,C,W,B,X,J)}function M(y,C,W,B){x();let X=B.attributes,J=W.getAttributes(),Y=C.defaultAttributeValues;for(let ee in J){let V=J[ee];if(V.location>=0){let te=X[ee];if(te===void 0&&(ee==="instanceMatrix"&&y.instanceMatrix&&(te=y.instanceMatrix),ee==="instanceColor"&&y.instanceColor&&(te=y.instanceColor)),te!==void 0){let ce=te.normalized,ge=te.itemSize,we=e.get(te);if(we===void 0)continue;let De=we.buffer,L=we.type,G=we.bytesPerElement,pe=L===i.INT||L===i.UNSIGNED_INT||te.gpuType===co;if(te.isInterleavedBufferAttribute){let ne=te.data,Ie=ne.stride,Le=te.offset;if(ne.isInstancedInterleavedBuffer){for(let Oe=0;Oe<V.locationSize;Oe++)h(V.location+Oe,ne.meshPerAttribute);y.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let Oe=0;Oe<V.locationSize;Oe++)p(V.location+Oe);i.bindBuffer(i.ARRAY_BUFFER,De);for(let Oe=0;Oe<V.locationSize;Oe++)E(V.location+Oe,ge/V.locationSize,L,ce,Ie*G,(Le+ge/V.locationSize*Oe)*G,pe)}else{if(te.isInstancedBufferAttribute){for(let ne=0;ne<V.locationSize;ne++)h(V.location+ne,te.meshPerAttribute);y.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let ne=0;ne<V.locationSize;ne++)p(V.location+ne);i.bindBuffer(i.ARRAY_BUFFER,De);for(let ne=0;ne<V.locationSize;ne++)E(V.location+ne,ge/V.locationSize,L,ce,ge*G,ge/V.locationSize*ne*G,pe)}}else if(Y!==void 0){let ce=Y[ee];if(ce!==void 0)switch(ce.length){case 2:i.vertexAttrib2fv(V.location,ce);break;case 3:i.vertexAttrib3fv(V.location,ce);break;case 4:i.vertexAttrib4fv(V.location,ce);break;default:i.vertexAttrib1fv(V.location,ce)}}}}S()}function R(){D();for(let y in n){let C=n[y];for(let W in C){let B=C[W];for(let X in B)u(B[X].object),delete B[X];delete C[W]}delete n[y]}}function T(y){if(n[y.id]===void 0)return;let C=n[y.id];for(let W in C){let B=C[W];for(let X in B)u(B[X].object),delete B[X];delete C[W]}delete n[y.id]}function A(y){for(let C in n){let W=n[C];if(W[y.id]===void 0)continue;let B=W[y.id];for(let X in B)u(B[X].object),delete B[X];delete W[y.id]}}function D(){b(),a=!0,r!==s&&(r=s,c(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:D,resetDefaultState:b,dispose:R,releaseStatesOfGeometry:T,releaseStatesOfProgram:A,initAttributes:x,enableAttribute:p,disableUnusedAttributes:S}}function ep(i,e,t){let n;function s(c){n=c}function r(c,u){i.drawArrays(n,c,u),t.update(u,n,1)}function a(c,u,d){d!==0&&(i.drawArraysInstanced(n,c,u,d),t.update(u,n,d))}function o(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,d);let m=0;for(let g=0;g<d;g++)m+=u[g];t.update(m,n,1)}function l(c,u,d,f){if(d===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<c.length;g++)a(c[g],u[g],f[g]);else{m.multiDrawArraysInstancedWEBGL(n,c,0,u,0,f,0,d);let g=0;for(let x=0;x<d;x++)g+=u[x]*f[x];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function tp(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let A=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==qt&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){let D=A===ns&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==pn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==un&&!D)}function l(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let d=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),h=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:f,maxTextures:m,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:p,maxAttributes:h,maxVertexUniforms:S,maxVaryings:E,maxFragmentUniforms:M,vertexTextures:R,maxSamples:T}}function np(i){let e=this,t=null,n=0,s=!1,r=!1,a=new cn,o=new ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){let m=d.length!==0||f||n!==0||s;return s=f,n=d.length,m},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,m){let g=d.clippingPlanes,x=d.clipIntersection,p=d.clipShadows,h=i.get(d);if(!s||g===null||g.length===0||r&&!p)r?u(null):c();else{let S=r?0:n,E=S*4,M=h.clippingState||null;l.value=M,M=u(g,f,E,m);for(let R=0;R!==E;++R)M[R]=t[R];h.clippingState=M,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,f,m,g){let x=d!==null?d.length:0,p=null;if(x!==0){if(p=l.value,g!==!0||p===null){let h=m+x*4,S=f.matrixWorldInverse;o.getNormalMatrix(S),(p===null||p.length<h)&&(p=new Float32Array(h));for(let E=0,M=m;E!==x;++E,M+=4)a.copy(d[E]).applyMatrix4(S,o),a.normal.toArray(p,M),p[M+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,p}}function ip(i){let e=new WeakMap;function t(a,o){return o===sa?a.mapping=wi:o===ra&&(a.mapping=Si),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===sa||o===ra)if(e.has(a)){let l=e.get(a).texture;return t(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new za(l.height);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var Ki=class extends $s{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},vi=4,Tl=[.125,.215,.35,.446,.526,.582],Gn=20,Hr=new Ki,Al=new We,Gr=null,Wr=0,Xr=0,qr=!1,kn=(1+Math.sqrt(5))/2,mi=1/kn,Cl=[new O(-kn,mi,0),new O(kn,mi,0),new O(-mi,0,kn),new O(mi,0,kn),new O(0,kn,-mi),new O(0,kn,mi),new O(-1,1,-1),new O(1,1,-1),new O(-1,1,1),new O(1,1,1)],Qs=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){Gr=this._renderer.getRenderTarget(),Wr=this._renderer.getActiveCubeFace(),Xr=this._renderer.getActiveMipmapLevel(),qr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Pl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Il(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Gr,Wr,Xr),this._renderer.xr.enabled=qr,e.scissorTest=!1,Is(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===wi||e.mapping===Si?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Gr=this._renderer.getRenderTarget(),Wr=this._renderer.getActiveCubeFace(),Xr=this._renderer.getActiveMipmapLevel(),qr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Kt,minFilter:Kt,generateMipmaps:!1,type:ns,format:qt,colorSpace:Pi,depthBuffer:!1},s=Rl(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Rl(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=sp(r)),this._blurMaterial=rp(r,e,t)}return s}_compileMaterial(e){let t=new At(this._lodPlanes[0],e);this._renderer.compile(t,Hr)}_sceneToCubeUV(e,t,n,s){let o=new Nt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Al),u.toneMapping=Cn,u.autoClear=!1;let m=new Ci({name:"PMREM.Background",side:Ct,depthWrite:!1,depthTest:!1}),g=new At(new Ji,m),x=!1,p=e.background;p?p.isColor&&(m.color.copy(p),e.background=null,x=!0):(m.color.copy(Al),x=!0);for(let h=0;h<6;h++){let S=h%3;S===0?(o.up.set(0,l[h],0),o.lookAt(c[h],0,0)):S===1?(o.up.set(0,0,l[h]),o.lookAt(0,c[h],0)):(o.up.set(0,l[h],0),o.lookAt(0,0,c[h]));let E=this._cubeSize;Is(s,S*E,h>2?E:0,E,E),u.setRenderTarget(s),x&&u.render(g,o),u.render(e,o)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=d,e.background=p}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===wi||e.mapping===Si;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Pl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Il());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new At(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;Is(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Hr)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Cl[(s-r-1)%Cl.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,d=new At(this._lodPlanes[s],c),f=c.uniforms,m=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*Gn-1),x=r/g,p=isFinite(r)?1+Math.floor(u*x):Gn;p>Gn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Gn}`);let h=[],S=0;for(let A=0;A<Gn;++A){let D=A/x,b=Math.exp(-D*D/2);h.push(b),A===0?S+=b:A<p&&(S+=2*b)}for(let A=0;A<h.length;A++)h[A]=h[A]/S;f.envMap.value=e.texture,f.samples.value=p,f.weights.value=h,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);let{_lodMax:E}=this;f.dTheta.value=g,f.mipInt.value=E-n;let M=this._sizeLods[s],R=3*M*(s>E-vi?s-E+vi:0),T=4*(this._cubeSize-M);Is(t,R,T,3*M,2*M),l.setRenderTarget(t),l.render(d,Hr)}};function sp(i){let e=[],t=[],n=[],s=i,r=i-vi+1+Tl.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);t.push(o);let l=1/o;a>i-vi?l=Tl[a-i+vi-1]:a===0&&(l=0),n.push(l);let c=1/(o-2),u=-c,d=1+c,f=[u,u,d,u,d,d,u,u,d,d,u,d],m=6,g=6,x=3,p=2,h=1,S=new Float32Array(x*g*m),E=new Float32Array(p*g*m),M=new Float32Array(h*g*m);for(let T=0;T<m;T++){let A=T%3*2/3-1,D=T>2?0:-1,b=[A,D,0,A+2/3,D,0,A+2/3,D+1,0,A,D,0,A+2/3,D+1,0,A,D+1,0];S.set(b,x*g*T),E.set(f,p*g*T);let y=[T,T,T,T,T,T];M.set(y,h*g*T)}let R=new Rt;R.setAttribute("position",new Bt(S,x)),R.setAttribute("uv",new Bt(E,p)),R.setAttribute("faceIndex",new Bt(M,h)),e.push(R),s>vi&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Rl(i,e,t){let n=new mn(i,e,t);return n.texture.mapping=lr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Is(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function rp(i,e,t){let n=new Float32Array(Gn),s=new O(0,1,0);return new kt({name:"SphericalGaussianBlur",defines:{n:Gn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:xo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:An,depthTest:!1,depthWrite:!1})}function Il(){return new kt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:xo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:An,depthTest:!1,depthWrite:!1})}function Pl(){return new kt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:xo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:An,depthTest:!1,depthWrite:!1})}function xo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function ap(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){let l=o.mapping,c=l===sa||l===ra,u=l===wi||l===Si;if(c||u){let d=e.get(o),f=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return t===null&&(t=new Qs(i)),d=c?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{let m=o.image;return c&&m&&m.height>0||u&&m&&s(m)?(t===null&&(t=new Qs(i)),d=c?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function s(o){let l=0,c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function r(o){let l=o.target;l.removeEventListener("dispose",r);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function op(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&Hi("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function lp(i,e,t,n){let s={},r=new WeakMap;function a(d){let f=d.target;f.index!==null&&e.remove(f.index);for(let g in f.attributes)e.remove(f.attributes[g]);for(let g in f.morphAttributes){let x=f.morphAttributes[g];for(let p=0,h=x.length;p<h;p++)e.remove(x[p])}f.removeEventListener("dispose",a),delete s[f.id];let m=r.get(f);m&&(e.remove(m),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(d,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,t.memory.geometries++),f}function l(d){let f=d.attributes;for(let g in f)e.update(f[g],i.ARRAY_BUFFER);let m=d.morphAttributes;for(let g in m){let x=m[g];for(let p=0,h=x.length;p<h;p++)e.update(x[p],i.ARRAY_BUFFER)}}function c(d){let f=[],m=d.index,g=d.attributes.position,x=0;if(m!==null){let S=m.array;x=m.version;for(let E=0,M=S.length;E<M;E+=3){let R=S[E+0],T=S[E+1],A=S[E+2];f.push(R,T,T,A,A,R)}}else if(g!==void 0){let S=g.array;x=g.version;for(let E=0,M=S.length/3-1;E<M;E+=3){let R=E+0,T=E+1,A=E+2;f.push(R,T,T,A,A,R)}}else return;let p=new(gc(f)?Zs:Ys)(f,1);p.version=x;let h=r.get(d);h&&e.remove(h),r.set(d,p)}function u(d){let f=r.get(d);if(f){let m=d.index;m!==null&&f.version<m.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function cp(i,e,t){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,m){i.drawElements(n,m,r,f*a),t.update(m,n,1)}function c(f,m,g){g!==0&&(i.drawElementsInstanced(n,m,r,f*a,g),t.update(m,n,g))}function u(f,m,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,m,0,r,f,0,g);let p=0;for(let h=0;h<g;h++)p+=m[h];t.update(p,n,1)}function d(f,m,g,x){if(g===0)return;let p=e.get("WEBGL_multi_draw");if(p===null)for(let h=0;h<f.length;h++)c(f[h]/a,m[h],x[h]);else{p.multiDrawElementsInstancedWEBGL(n,m,0,r,f,0,x,0,g);let h=0;for(let S=0;S<g;S++)h+=m[S]*x[S];t.update(h,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function hp(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function up(i,e,t){let n=new WeakMap,s=new dt;function r(a,o,l){let c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0,f=n.get(o);if(f===void 0||f.count!==d){let b=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",b)};f!==void 0&&f.texture.dispose();let m=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],h=o.morphAttributes.normal||[],S=o.morphAttributes.color||[],E=0;m===!0&&(E=1),g===!0&&(E=2),x===!0&&(E=3);let M=o.attributes.position.count*E,R=1;M>e.maxTextureSize&&(R=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);let T=new Float32Array(M*R*4*d),A=new qs(T,M,R,d);A.type=un,A.needsUpdate=!0;let D=E*4;for(let y=0;y<d;y++){let C=p[y],W=h[y],B=S[y],X=M*R*4*y;for(let J=0;J<C.count;J++){let Y=J*D;m===!0&&(s.fromBufferAttribute(C,J),T[X+Y+0]=s.x,T[X+Y+1]=s.y,T[X+Y+2]=s.z,T[X+Y+3]=0),g===!0&&(s.fromBufferAttribute(W,J),T[X+Y+4]=s.x,T[X+Y+5]=s.y,T[X+Y+6]=s.z,T[X+Y+7]=0),x===!0&&(s.fromBufferAttribute(B,J),T[X+Y+8]=s.x,T[X+Y+9]=s.y,T[X+Y+10]=s.z,T[X+Y+11]=B.itemSize===4?s.w:1)}}f={count:d,texture:A,size:new et(M,R)},n.set(o,f),o.addEventListener("dispose",b)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let m=0;for(let x=0;x<c.length;x++)m+=c[x];let g=o.morphTargetsRelative?1:1-m;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function dp(i,e,t,n){let s=new WeakMap;function r(l){let c=n.render.frame,u=l.geometry,d=e.get(l,u);if(s.get(d)!==c&&(e.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return d}function a(){s=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}var er=class extends zt{constructor(e,t,n,s,r,a,o,l,c,u=_i){if(u!==_i&&u!==Ti)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===_i&&(n=qn),n===void 0&&u===Ti&&(n=Ei),super(null,s,r,a,o,l,u,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Yt,this.minFilter=l!==void 0?l:Yt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},yc=new zt,Ll=new er(1,1),bc=new qs,Mc=new Oa,wc=new Js,Nl=[],Dl=[],Ul=new Float32Array(16),Fl=new Float32Array(9),Ol=new Float32Array(4);function Ni(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=Nl[s];if(r===void 0&&(r=new Float32Array(s),Nl[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function pt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function mt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function hr(i,e){let t=Dl[e];t===void 0&&(t=new Int32Array(e),Dl[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function fp(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function pp(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;i.uniform2fv(this.addr,e),mt(t,e)}}function mp(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(pt(t,e))return;i.uniform3fv(this.addr,e),mt(t,e)}}function gp(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;i.uniform4fv(this.addr,e),mt(t,e)}}function vp(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(pt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,n))return;Ol.set(n),i.uniformMatrix2fv(this.addr,!1,Ol),mt(t,n)}}function xp(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(pt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,n))return;Fl.set(n),i.uniformMatrix3fv(this.addr,!1,Fl),mt(t,n)}}function _p(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(pt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,n))return;Ul.set(n),i.uniformMatrix4fv(this.addr,!1,Ul),mt(t,n)}}function yp(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function bp(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;i.uniform2iv(this.addr,e),mt(t,e)}}function Mp(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(pt(t,e))return;i.uniform3iv(this.addr,e),mt(t,e)}}function wp(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;i.uniform4iv(this.addr,e),mt(t,e)}}function Sp(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Ep(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;i.uniform2uiv(this.addr,e),mt(t,e)}}function Tp(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(pt(t,e))return;i.uniform3uiv(this.addr,e),mt(t,e)}}function Ap(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;i.uniform4uiv(this.addr,e),mt(t,e)}}function Cp(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Ll.compareFunction=mc,r=Ll):r=yc,t.setTexture2D(e||r,s)}function Rp(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Mc,s)}function Ip(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||wc,s)}function Pp(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||bc,s)}function Lp(i){switch(i){case 5126:return fp;case 35664:return pp;case 35665:return mp;case 35666:return gp;case 35674:return vp;case 35675:return xp;case 35676:return _p;case 5124:case 35670:return yp;case 35667:case 35671:return bp;case 35668:case 35672:return Mp;case 35669:case 35673:return wp;case 5125:return Sp;case 36294:return Ep;case 36295:return Tp;case 36296:return Ap;case 35678:case 36198:case 36298:case 36306:case 35682:return Cp;case 35679:case 36299:case 36307:return Rp;case 35680:case 36300:case 36308:case 36293:return Ip;case 36289:case 36303:case 36311:case 36292:return Pp}}function Np(i,e){i.uniform1fv(this.addr,e)}function Dp(i,e){let t=Ni(e,this.size,2);i.uniform2fv(this.addr,t)}function Up(i,e){let t=Ni(e,this.size,3);i.uniform3fv(this.addr,t)}function Fp(i,e){let t=Ni(e,this.size,4);i.uniform4fv(this.addr,t)}function Op(i,e){let t=Ni(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Bp(i,e){let t=Ni(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function zp(i,e){let t=Ni(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function kp(i,e){i.uniform1iv(this.addr,e)}function Vp(i,e){i.uniform2iv(this.addr,e)}function Hp(i,e){i.uniform3iv(this.addr,e)}function Gp(i,e){i.uniform4iv(this.addr,e)}function Wp(i,e){i.uniform1uiv(this.addr,e)}function Xp(i,e){i.uniform2uiv(this.addr,e)}function qp(i,e){i.uniform3uiv(this.addr,e)}function Yp(i,e){i.uniform4uiv(this.addr,e)}function Zp(i,e,t){let n=this.cache,s=e.length,r=hr(t,s);pt(n,r)||(i.uniform1iv(this.addr,r),mt(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||yc,r[a])}function $p(i,e,t){let n=this.cache,s=e.length,r=hr(t,s);pt(n,r)||(i.uniform1iv(this.addr,r),mt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Mc,r[a])}function Jp(i,e,t){let n=this.cache,s=e.length,r=hr(t,s);pt(n,r)||(i.uniform1iv(this.addr,r),mt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||wc,r[a])}function Kp(i,e,t){let n=this.cache,s=e.length,r=hr(t,s);pt(n,r)||(i.uniform1iv(this.addr,r),mt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||bc,r[a])}function jp(i){switch(i){case 5126:return Np;case 35664:return Dp;case 35665:return Up;case 35666:return Fp;case 35674:return Op;case 35675:return Bp;case 35676:return zp;case 5124:case 35670:return kp;case 35667:case 35671:return Vp;case 35668:case 35672:return Hp;case 35669:case 35673:return Gp;case 5125:return Wp;case 36294:return Xp;case 36295:return qp;case 36296:return Yp;case 35678:case 36198:case 36298:case 36306:case 35682:return Zp;case 35679:case 36299:case 36307:return $p;case 35680:case 36300:case 36308:case 36293:return Jp;case 36289:case 36303:case 36311:case 36292:return Kp}}var ka=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Lp(t.type)}},Va=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=jp(t.type)}},Ha=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},Yr=/(\w+)(\])?(\[|\.)?/g;function Bl(i,e){i.seq.push(e),i.map[e.id]=e}function Qp(i,e,t){let n=i.name,s=n.length;for(Yr.lastIndex=0;;){let r=Yr.exec(n),a=Yr.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Bl(t,c===void 0?new ka(o,i,e):new Va(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new Ha(o),Bl(t,d)),t=d}}}var bi=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);Qp(r,a,this)}}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function zl(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var em=37297,tm=0;function nm(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var kl=new ke;function im(i){Ye._getMatrix(kl,Ye.workingColorSpace,i);let e=`mat3( ${kl.elements.map(t=>t.toFixed(4))} )`;switch(Ye.getTransfer(i)){case cr:return[e,"LinearTransferOETF"];case tt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Vl(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+nm(i.getShaderSource(e),a)}else return s}function sm(i,e){let t=im(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function rm(i,e){let t;switch(e){case fh:t="Linear";break;case ph:t="Reinhard";break;case mh:t="Cineon";break;case gh:t="ACESFilmic";break;case xh:t="AgX";break;case _h:t="Neutral";break;case vh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Ps=new O;function am(){Ye.getLuminanceCoefficients(Ps);let i=Ps.x.toFixed(4),e=Ps.y.toFixed(4),t=Ps.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function om(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Gi).join(`
`)}function lm(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function cm(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Gi(i){return i!==""}function Hl(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Gl(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var hm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ga(i){return i.replace(hm,dm)}var um=new Map;function dm(i,e){let t=He[e];if(t===void 0){let n=um.get(e);if(n!==void 0)t=He[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ga(t)}var fm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Wl(i){return i.replace(fm,pm)}function pm(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Xl(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function mm(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===nc?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===qc?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===ln&&(e="SHADOWMAP_TYPE_VSM"),e}function gm(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case wi:case Si:e="ENVMAP_TYPE_CUBE";break;case lr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function vm(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Si:e="ENVMAP_MODE_REFRACTION";break}return e}function xm(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case ic:e="ENVMAP_BLENDING_MULTIPLY";break;case uh:e="ENVMAP_BLENDING_MIX";break;case dh:e="ENVMAP_BLENDING_ADD";break}return e}function _m(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function ym(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=mm(t),c=gm(t),u=vm(t),d=xm(t),f=_m(t),m=om(t),g=lm(r),x=s.createProgram(),p,h,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Gi).join(`
`),p.length>0&&(p+=`
`),h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Gi).join(`
`),h.length>0&&(h+=`
`)):(p=[Xl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Gi).join(`
`),h=[Xl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Cn?"#define TONE_MAPPING":"",t.toneMapping!==Cn?He.tonemapping_pars_fragment:"",t.toneMapping!==Cn?rm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",He.colorspace_pars_fragment,sm("linearToOutputTexel",t.outputColorSpace),am(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Gi).join(`
`)),a=Ga(a),a=Hl(a,t),a=Gl(a,t),o=Ga(o),o=Hl(o,t),o=Gl(o,t),a=Wl(a),o=Wl(o),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,h=["#define varying in",t.glslVersion===sl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===sl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);let E=S+p+a,M=S+h+o,R=zl(s,s.VERTEX_SHADER,E),T=zl(s,s.FRAGMENT_SHADER,M);s.attachShader(x,R),s.attachShader(x,T),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function A(C){if(i.debug.checkShaderErrors){let W=s.getProgramInfoLog(x).trim(),B=s.getShaderInfoLog(R).trim(),X=s.getShaderInfoLog(T).trim(),J=!0,Y=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(J=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,R,T);else{let ee=Vl(s,R,"vertex"),V=Vl(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+W+`
`+ee+`
`+V)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):(B===""||X==="")&&(Y=!1);Y&&(C.diagnostics={runnable:J,programLog:W,vertexShader:{log:B,prefix:p},fragmentShader:{log:X,prefix:h}})}s.deleteShader(R),s.deleteShader(T),D=new bi(s,x),b=cm(s,x)}let D;this.getUniforms=function(){return D===void 0&&A(this),D};let b;this.getAttributes=function(){return b===void 0&&A(this),b};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(x,em)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=tm++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=R,this.fragmentShader=T,this}var bm=0,Wa=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Xa(e),t.set(e,n)),n}},Xa=class{constructor(e){this.id=bm++,this.code=e,this.usedTimes=0}};function Mm(i,e,t,n,s,r,a){let o=new $i,l=new Wa,c=new Set,u=[],d=s.logarithmicDepthBuffer,f=s.vertexTextures,m=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(b){return c.add(b),b===0?"uv":`uv${b}`}function p(b,y,C,W,B){let X=W.fog,J=B.geometry,Y=b.isMeshStandardMaterial?W.environment:null,ee=(b.isMeshStandardMaterial?t:e).get(b.envMap||Y),V=ee&&ee.mapping===lr?ee.image.height:null,te=g[b.type];b.precision!==null&&(m=s.getMaxPrecision(b.precision),m!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",m,"instead."));let ce=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,ge=ce!==void 0?ce.length:0,we=0;J.morphAttributes.position!==void 0&&(we=1),J.morphAttributes.normal!==void 0&&(we=2),J.morphAttributes.color!==void 0&&(we=3);let De,L,G,pe;if(te){let Qe=Jt[te];De=Qe.vertexShader,L=Qe.fragmentShader}else De=b.vertexShader,L=b.fragmentShader,l.update(b),G=l.getVertexShaderID(b),pe=l.getFragmentShaderID(b);let ne=i.getRenderTarget(),Ie=i.state.buffers.depth.getReversed(),Le=B.isInstancedMesh===!0,Oe=B.isBatchedMesh===!0,Je=!!b.map,Ge=!!b.matcap,nt=!!ee,P=!!b.aoMap,re=!!b.lightMap,be=!!b.bumpMap,H=!!b.normalMap,ae=!!b.displacementMap,Me=!!b.emissiveMap,Ae=!!b.metalnessMap,w=!!b.roughnessMap,v=b.anisotropy>0,F=b.clearcoat>0,K=b.dispersion>0,Q=b.iridescence>0,$=b.sheen>0,Ce=b.transmission>0,ue=v&&!!b.anisotropyMap,xe=F&&!!b.clearcoatMap,qe=F&&!!b.clearcoatNormalMap,ie=F&&!!b.clearcoatRoughnessMap,_e=Q&&!!b.iridescenceMap,Pe=Q&&!!b.iridescenceThicknessMap,Ue=$&&!!b.sheenColorMap,ye=$&&!!b.sheenRoughnessMap,Xe=!!b.specularMap,Ve=!!b.specularColorMap,it=!!b.specularIntensityMap,I=Ce&&!!b.transmissionMap,he=Ce&&!!b.thicknessMap,q=!!b.gradientMap,j=!!b.alphaMap,me=b.alphaTest>0,de=!!b.alphaHash,Be=!!b.extensions,ct=Cn;b.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(ct=i.toneMapping);let vt={shaderID:te,shaderType:b.type,shaderName:b.name,vertexShader:De,fragmentShader:L,defines:b.defines,customVertexShaderID:G,customFragmentShaderID:pe,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:m,batching:Oe,batchingColor:Oe&&B._colorsTexture!==null,instancing:Le,instancingColor:Le&&B.instanceColor!==null,instancingMorph:Le&&B.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ne===null?i.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:Pi,alphaToCoverage:!!b.alphaToCoverage,map:Je,matcap:Ge,envMap:nt,envMapMode:nt&&ee.mapping,envMapCubeUVHeight:V,aoMap:P,lightMap:re,bumpMap:be,normalMap:H,displacementMap:f&&ae,emissiveMap:Me,normalMapObjectSpace:H&&b.normalMapType===Sh,normalMapTangentSpace:H&&b.normalMapType===wh,metalnessMap:Ae,roughnessMap:w,anisotropy:v,anisotropyMap:ue,clearcoat:F,clearcoatMap:xe,clearcoatNormalMap:qe,clearcoatRoughnessMap:ie,dispersion:K,iridescence:Q,iridescenceMap:_e,iridescenceThicknessMap:Pe,sheen:$,sheenColorMap:Ue,sheenRoughnessMap:ye,specularMap:Xe,specularColorMap:Ve,specularIntensityMap:it,transmission:Ce,transmissionMap:I,thicknessMap:he,gradientMap:q,opaque:b.transparent===!1&&b.blending===xi&&b.alphaToCoverage===!1,alphaMap:j,alphaTest:me,alphaHash:de,combine:b.combine,mapUv:Je&&x(b.map.channel),aoMapUv:P&&x(b.aoMap.channel),lightMapUv:re&&x(b.lightMap.channel),bumpMapUv:be&&x(b.bumpMap.channel),normalMapUv:H&&x(b.normalMap.channel),displacementMapUv:ae&&x(b.displacementMap.channel),emissiveMapUv:Me&&x(b.emissiveMap.channel),metalnessMapUv:Ae&&x(b.metalnessMap.channel),roughnessMapUv:w&&x(b.roughnessMap.channel),anisotropyMapUv:ue&&x(b.anisotropyMap.channel),clearcoatMapUv:xe&&x(b.clearcoatMap.channel),clearcoatNormalMapUv:qe&&x(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ie&&x(b.clearcoatRoughnessMap.channel),iridescenceMapUv:_e&&x(b.iridescenceMap.channel),iridescenceThicknessMapUv:Pe&&x(b.iridescenceThicknessMap.channel),sheenColorMapUv:Ue&&x(b.sheenColorMap.channel),sheenRoughnessMapUv:ye&&x(b.sheenRoughnessMap.channel),specularMapUv:Xe&&x(b.specularMap.channel),specularColorMapUv:Ve&&x(b.specularColorMap.channel),specularIntensityMapUv:it&&x(b.specularIntensityMap.channel),transmissionMapUv:I&&x(b.transmissionMap.channel),thicknessMapUv:he&&x(b.thicknessMap.channel),alphaMapUv:j&&x(b.alphaMap.channel),vertexTangents:!!J.attributes.tangent&&(H||v),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!J.attributes.uv&&(Je||j),fog:!!X,useFog:b.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Ie,skinning:B.isSkinnedMesh===!0,morphTargets:J.morphAttributes.position!==void 0,morphNormals:J.morphAttributes.normal!==void 0,morphColors:J.morphAttributes.color!==void 0,morphTargetsCount:ge,morphTextureStride:we,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:ct,decodeVideoTexture:Je&&b.map.isVideoTexture===!0&&Ye.getTransfer(b.map.colorSpace)===tt,decodeVideoTextureEmissive:Me&&b.emissiveMap.isVideoTexture===!0&&Ye.getTransfer(b.emissiveMap.colorSpace)===tt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===hn,flipSided:b.side===Ct,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Be&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Be&&b.extensions.multiDraw===!0||Oe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return vt.vertexUv1s=c.has(1),vt.vertexUv2s=c.has(2),vt.vertexUv3s=c.has(3),c.clear(),vt}function h(b){let y=[];if(b.shaderID?y.push(b.shaderID):(y.push(b.customVertexShaderID),y.push(b.customFragmentShaderID)),b.defines!==void 0)for(let C in b.defines)y.push(C),y.push(b.defines[C]);return b.isRawShaderMaterial===!1&&(S(y,b),E(y,b),y.push(i.outputColorSpace)),y.push(b.customProgramCacheKey),y.join()}function S(b,y){b.push(y.precision),b.push(y.outputColorSpace),b.push(y.envMapMode),b.push(y.envMapCubeUVHeight),b.push(y.mapUv),b.push(y.alphaMapUv),b.push(y.lightMapUv),b.push(y.aoMapUv),b.push(y.bumpMapUv),b.push(y.normalMapUv),b.push(y.displacementMapUv),b.push(y.emissiveMapUv),b.push(y.metalnessMapUv),b.push(y.roughnessMapUv),b.push(y.anisotropyMapUv),b.push(y.clearcoatMapUv),b.push(y.clearcoatNormalMapUv),b.push(y.clearcoatRoughnessMapUv),b.push(y.iridescenceMapUv),b.push(y.iridescenceThicknessMapUv),b.push(y.sheenColorMapUv),b.push(y.sheenRoughnessMapUv),b.push(y.specularMapUv),b.push(y.specularColorMapUv),b.push(y.specularIntensityMapUv),b.push(y.transmissionMapUv),b.push(y.thicknessMapUv),b.push(y.combine),b.push(y.fogExp2),b.push(y.sizeAttenuation),b.push(y.morphTargetsCount),b.push(y.morphAttributeCount),b.push(y.numDirLights),b.push(y.numPointLights),b.push(y.numSpotLights),b.push(y.numSpotLightMaps),b.push(y.numHemiLights),b.push(y.numRectAreaLights),b.push(y.numDirLightShadows),b.push(y.numPointLightShadows),b.push(y.numSpotLightShadows),b.push(y.numSpotLightShadowsWithMaps),b.push(y.numLightProbes),b.push(y.shadowMapType),b.push(y.toneMapping),b.push(y.numClippingPlanes),b.push(y.numClipIntersection),b.push(y.depthPacking)}function E(b,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),b.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reverseDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),b.push(o.mask)}function M(b){let y=g[b.type],C;if(y){let W=Jt[y];C=uu.clone(W.uniforms)}else C=b.uniforms;return C}function R(b,y){let C;for(let W=0,B=u.length;W<B;W++){let X=u[W];if(X.cacheKey===y){C=X,++C.usedTimes;break}}return C===void 0&&(C=new ym(i,y,b,r),u.push(C)),C}function T(b){if(--b.usedTimes===0){let y=u.indexOf(b);u[y]=u[u.length-1],u.pop(),b.destroy()}}function A(b){l.remove(b)}function D(){l.dispose()}return{getParameters:p,getProgramCacheKey:h,getUniforms:M,acquireProgram:R,releaseProgram:T,releaseShaderCache:A,programs:u,dispose:D}}function wm(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Sm(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function ql(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Yl(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(d,f,m,g,x,p){let h=i[e];return h===void 0?(h={id:d.id,object:d,geometry:f,material:m,groupOrder:g,renderOrder:d.renderOrder,z:x,group:p},i[e]=h):(h.id=d.id,h.object=d,h.geometry=f,h.material=m,h.groupOrder=g,h.renderOrder=d.renderOrder,h.z=x,h.group=p),e++,h}function o(d,f,m,g,x,p){let h=a(d,f,m,g,x,p);m.transmission>0?n.push(h):m.transparent===!0?s.push(h):t.push(h)}function l(d,f,m,g,x,p){let h=a(d,f,m,g,x,p);m.transmission>0?n.unshift(h):m.transparent===!0?s.unshift(h):t.unshift(h)}function c(d,f){t.length>1&&t.sort(d||Sm),n.length>1&&n.sort(f||ql),s.length>1&&s.sort(f||ql)}function u(){for(let d=e,f=i.length;d<f;d++){let m=i[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:u,sort:c}}function Em(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new Yl,i.set(n,[a])):s>=r.length?(a=new Yl,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Tm(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new O,color:new We};break;case"SpotLight":t={position:new O,direction:new O,color:new We,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new O,color:new We,distance:0,decay:0};break;case"HemisphereLight":t={direction:new O,skyColor:new We,groundColor:new We};break;case"RectAreaLight":t={color:new We,position:new O,halfWidth:new O,halfHeight:new O};break}return i[e.id]=t,t}}}function Am(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var Cm=0;function Rm(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Im(i){let e=new Tm,t=Am(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new O);let s=new O,r=new ht,a=new ht;function o(c){let u=0,d=0,f=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let m=0,g=0,x=0,p=0,h=0,S=0,E=0,M=0,R=0,T=0,A=0;c.sort(Rm);for(let b=0,y=c.length;b<y;b++){let C=c[b],W=C.color,B=C.intensity,X=C.distance,J=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)u+=W.r*B,d+=W.g*B,f+=W.b*B;else if(C.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(C.sh.coefficients[Y],B);A++}else if(C.isDirectionalLight){let Y=e.get(C);if(Y.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let ee=C.shadow,V=t.get(C);V.shadowIntensity=ee.intensity,V.shadowBias=ee.bias,V.shadowNormalBias=ee.normalBias,V.shadowRadius=ee.radius,V.shadowMapSize=ee.mapSize,n.directionalShadow[m]=V,n.directionalShadowMap[m]=J,n.directionalShadowMatrix[m]=C.shadow.matrix,S++}n.directional[m]=Y,m++}else if(C.isSpotLight){let Y=e.get(C);Y.position.setFromMatrixPosition(C.matrixWorld),Y.color.copy(W).multiplyScalar(B),Y.distance=X,Y.coneCos=Math.cos(C.angle),Y.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),Y.decay=C.decay,n.spot[x]=Y;let ee=C.shadow;if(C.map&&(n.spotLightMap[R]=C.map,R++,ee.updateMatrices(C),C.castShadow&&T++),n.spotLightMatrix[x]=ee.matrix,C.castShadow){let V=t.get(C);V.shadowIntensity=ee.intensity,V.shadowBias=ee.bias,V.shadowNormalBias=ee.normalBias,V.shadowRadius=ee.radius,V.shadowMapSize=ee.mapSize,n.spotShadow[x]=V,n.spotShadowMap[x]=J,M++}x++}else if(C.isRectAreaLight){let Y=e.get(C);Y.color.copy(W).multiplyScalar(B),Y.halfWidth.set(C.width*.5,0,0),Y.halfHeight.set(0,C.height*.5,0),n.rectArea[p]=Y,p++}else if(C.isPointLight){let Y=e.get(C);if(Y.color.copy(C.color).multiplyScalar(C.intensity),Y.distance=C.distance,Y.decay=C.decay,C.castShadow){let ee=C.shadow,V=t.get(C);V.shadowIntensity=ee.intensity,V.shadowBias=ee.bias,V.shadowNormalBias=ee.normalBias,V.shadowRadius=ee.radius,V.shadowMapSize=ee.mapSize,V.shadowCameraNear=ee.camera.near,V.shadowCameraFar=ee.camera.far,n.pointShadow[g]=V,n.pointShadowMap[g]=J,n.pointShadowMatrix[g]=C.shadow.matrix,E++}n.point[g]=Y,g++}else if(C.isHemisphereLight){let Y=e.get(C);Y.skyColor.copy(C.color).multiplyScalar(B),Y.groundColor.copy(C.groundColor).multiplyScalar(B),n.hemi[h]=Y,h++}}p>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=le.LTC_FLOAT_1,n.rectAreaLTC2=le.LTC_FLOAT_2):(n.rectAreaLTC1=le.LTC_HALF_1,n.rectAreaLTC2=le.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=f;let D=n.hash;(D.directionalLength!==m||D.pointLength!==g||D.spotLength!==x||D.rectAreaLength!==p||D.hemiLength!==h||D.numDirectionalShadows!==S||D.numPointShadows!==E||D.numSpotShadows!==M||D.numSpotMaps!==R||D.numLightProbes!==A)&&(n.directional.length=m,n.spot.length=x,n.rectArea.length=p,n.point.length=g,n.hemi.length=h,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=M+R-T,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=A,D.directionalLength=m,D.pointLength=g,D.spotLength=x,D.rectAreaLength=p,D.hemiLength=h,D.numDirectionalShadows=S,D.numPointShadows=E,D.numSpotShadows=M,D.numSpotMaps=R,D.numLightProbes=A,n.version=Cm++)}function l(c,u){let d=0,f=0,m=0,g=0,x=0,p=u.matrixWorldInverse;for(let h=0,S=c.length;h<S;h++){let E=c[h];if(E.isDirectionalLight){let M=n.directional[d];M.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(p),d++}else if(E.isSpotLight){let M=n.spot[m];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(p),M.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(p),m++}else if(E.isRectAreaLight){let M=n.rectArea[g];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(p),a.identity(),r.copy(E.matrixWorld),r.premultiply(p),a.extractRotation(r),M.halfWidth.set(E.width*.5,0,0),M.halfHeight.set(0,E.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),g++}else if(E.isPointLight){let M=n.point[f];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(p),f++}else if(E.isHemisphereLight){let M=n.hemi[x];M.direction.setFromMatrixPosition(E.matrixWorld),M.direction.transformDirection(p),x++}}}return{setup:o,setupView:l,state:n}}function Zl(i){let e=new Im(i),t=[],n=[];function s(u){c.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}let c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function Pm(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new Zl(i),e.set(s,[o])):r>=a.length?(o=new Zl(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var qa=class extends Ln{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=bh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ya=class extends Ln{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},Lm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Nm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Dm(i,e,t){let n=new Ks,s=new et,r=new et,a=new dt,o=new qa({depthPacking:Mh}),l=new Ya,c={},u=t.maxTextureSize,d={[Rn]:Ct,[Ct]:Rn,[hn]:hn},f=new kt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new et},radius:{value:4}},vertexShader:Lm,fragmentShader:Nm}),m=f.clone();m.defines.HORIZONTAL_PASS=1;let g=new Rt;g.setAttribute("position",new Bt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new At(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=nc;let h=this.type;this.render=function(T,A,D){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;let b=i.getRenderTarget(),y=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),W=i.state;W.setBlending(An),W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);let B=h!==ln&&this.type===ln,X=h===ln&&this.type!==ln;for(let J=0,Y=T.length;J<Y;J++){let ee=T[J],V=ee.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",ee,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);let te=V.getFrameExtents();if(s.multiply(te),r.copy(V.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/te.x),s.x=r.x*te.x,V.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/te.y),s.y=r.y*te.y,V.mapSize.y=r.y)),V.map===null||B===!0||X===!0){let ge=this.type!==ln?{minFilter:Yt,magFilter:Yt}:{};V.map!==null&&V.map.dispose(),V.map=new mn(s.x,s.y,ge),V.map.texture.name=ee.name+".shadowMap",V.camera.updateProjectionMatrix()}i.setRenderTarget(V.map),i.clear();let ce=V.getViewportCount();for(let ge=0;ge<ce;ge++){let we=V.getViewport(ge);a.set(r.x*we.x,r.y*we.y,r.x*we.z,r.y*we.w),W.viewport(a),V.updateMatrices(ee,ge),n=V.getFrustum(),M(A,D,V.camera,ee,this.type)}V.isPointLightShadow!==!0&&this.type===ln&&S(V,D),V.needsUpdate=!1}h=this.type,p.needsUpdate=!1,i.setRenderTarget(b,y,C)};function S(T,A){let D=e.update(x);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,m.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new mn(s.x,s.y)),f.uniforms.shadow_pass.value=T.map.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(A,null,D,f,x,null),m.uniforms.shadow_pass.value=T.mapPass.texture,m.uniforms.resolution.value=T.mapSize,m.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(A,null,D,m,x,null)}function E(T,A,D,b){let y=null,C=D.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(C!==void 0)y=C;else if(y=D.isPointLight===!0?l:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){let W=y.uuid,B=A.uuid,X=c[W];X===void 0&&(X={},c[W]=X);let J=X[B];J===void 0&&(J=y.clone(),X[B]=J,A.addEventListener("dispose",R)),y=J}if(y.visible=A.visible,y.wireframe=A.wireframe,b===ln?y.side=A.shadowSide!==null?A.shadowSide:A.side:y.side=A.shadowSide!==null?A.shadowSide:d[A.side],y.alphaMap=A.alphaMap,y.alphaTest=A.alphaTest,y.map=A.map,y.clipShadows=A.clipShadows,y.clippingPlanes=A.clippingPlanes,y.clipIntersection=A.clipIntersection,y.displacementMap=A.displacementMap,y.displacementScale=A.displacementScale,y.displacementBias=A.displacementBias,y.wireframeLinewidth=A.wireframeLinewidth,y.linewidth=A.linewidth,D.isPointLight===!0&&y.isMeshDistanceMaterial===!0){let W=i.properties.get(y);W.light=D}return y}function M(T,A,D,b,y){if(T.visible===!1)return;if(T.layers.test(A.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&y===ln)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,T.matrixWorld);let B=e.update(T),X=T.material;if(Array.isArray(X)){let J=B.groups;for(let Y=0,ee=J.length;Y<ee;Y++){let V=J[Y],te=X[V.materialIndex];if(te&&te.visible){let ce=E(T,te,b,y);T.onBeforeShadow(i,T,A,D,B,ce,V),i.renderBufferDirect(D,null,B,ce,T,V),T.onAfterShadow(i,T,A,D,B,ce,V)}}}else if(X.visible){let J=E(T,X,b,y);T.onBeforeShadow(i,T,A,D,B,J,null),i.renderBufferDirect(D,null,B,J,T,null),T.onAfterShadow(i,T,A,D,B,J,null)}}let W=T.children;for(let B=0,X=W.length;B<X;B++)M(W[B],A,D,b,y)}function R(T){T.target.removeEventListener("dispose",R);for(let D in c){let b=c[D],y=T.target.uuid;y in b&&(b[y].dispose(),delete b[y])}}}var Um={[Kr]:jr,[Qr]:na,[ea]:ia,[Mi]:ta,[jr]:Kr,[na]:Qr,[ia]:ea,[ta]:Mi};function Fm(i,e){function t(){let I=!1,he=new dt,q=null,j=new dt(0,0,0,0);return{setMask:function(me){q!==me&&!I&&(i.colorMask(me,me,me,me),q=me)},setLocked:function(me){I=me},setClear:function(me,de,Be,ct,vt){vt===!0&&(me*=ct,de*=ct,Be*=ct),he.set(me,de,Be,ct),j.equals(he)===!1&&(i.clearColor(me,de,Be,ct),j.copy(he))},reset:function(){I=!1,q=null,j.set(-1,0,0,0)}}}function n(){let I=!1,he=!1,q=null,j=null,me=null;return{setReversed:function(de){if(he!==de){let Be=e.get("EXT_clip_control");he?Be.clipControlEXT(Be.LOWER_LEFT_EXT,Be.ZERO_TO_ONE_EXT):Be.clipControlEXT(Be.LOWER_LEFT_EXT,Be.NEGATIVE_ONE_TO_ONE_EXT);let ct=me;me=null,this.setClear(ct)}he=de},getReversed:function(){return he},setTest:function(de){de?ne(i.DEPTH_TEST):Ie(i.DEPTH_TEST)},setMask:function(de){q!==de&&!I&&(i.depthMask(de),q=de)},setFunc:function(de){if(he&&(de=Um[de]),j!==de){switch(de){case Kr:i.depthFunc(i.NEVER);break;case jr:i.depthFunc(i.ALWAYS);break;case Qr:i.depthFunc(i.LESS);break;case Mi:i.depthFunc(i.LEQUAL);break;case ea:i.depthFunc(i.EQUAL);break;case ta:i.depthFunc(i.GEQUAL);break;case na:i.depthFunc(i.GREATER);break;case ia:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}j=de}},setLocked:function(de){I=de},setClear:function(de){me!==de&&(he&&(de=1-de),i.clearDepth(de),me=de)},reset:function(){I=!1,q=null,j=null,me=null,he=!1}}}function s(){let I=!1,he=null,q=null,j=null,me=null,de=null,Be=null,ct=null,vt=null;return{setTest:function(Qe){I||(Qe?ne(i.STENCIL_TEST):Ie(i.STENCIL_TEST))},setMask:function(Qe){he!==Qe&&!I&&(i.stencilMask(Qe),he=Qe)},setFunc:function(Qe,Vt,en){(q!==Qe||j!==Vt||me!==en)&&(i.stencilFunc(Qe,Vt,en),q=Qe,j=Vt,me=en)},setOp:function(Qe,Vt,en){(de!==Qe||Be!==Vt||ct!==en)&&(i.stencilOp(Qe,Vt,en),de=Qe,Be=Vt,ct=en)},setLocked:function(Qe){I=Qe},setClear:function(Qe){vt!==Qe&&(i.clearStencil(Qe),vt=Qe)},reset:function(){I=!1,he=null,q=null,j=null,me=null,de=null,Be=null,ct=null,vt=null}}}let r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap,u={},d={},f=new WeakMap,m=[],g=null,x=!1,p=null,h=null,S=null,E=null,M=null,R=null,T=null,A=new We(0,0,0),D=0,b=!1,y=null,C=null,W=null,B=null,X=null,J=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Y=!1,ee=0,V=i.getParameter(i.VERSION);V.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(V)[1]),Y=ee>=1):V.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),Y=ee>=2);let te=null,ce={},ge=i.getParameter(i.SCISSOR_BOX),we=i.getParameter(i.VIEWPORT),De=new dt().fromArray(ge),L=new dt().fromArray(we);function G(I,he,q,j){let me=new Uint8Array(4),de=i.createTexture();i.bindTexture(I,de),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Be=0;Be<q;Be++)I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY?i.texImage3D(he,0,i.RGBA,1,1,j,0,i.RGBA,i.UNSIGNED_BYTE,me):i.texImage2D(he+Be,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,me);return de}let pe={};pe[i.TEXTURE_2D]=G(i.TEXTURE_2D,i.TEXTURE_2D,1),pe[i.TEXTURE_CUBE_MAP]=G(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),pe[i.TEXTURE_2D_ARRAY]=G(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),pe[i.TEXTURE_3D]=G(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ne(i.DEPTH_TEST),a.setFunc(Mi),be(!1),H($o),ne(i.CULL_FACE),P(An);function ne(I){u[I]!==!0&&(i.enable(I),u[I]=!0)}function Ie(I){u[I]!==!1&&(i.disable(I),u[I]=!1)}function Le(I,he){return d[I]!==he?(i.bindFramebuffer(I,he),d[I]=he,I===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=he),I===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=he),!0):!1}function Oe(I,he){let q=m,j=!1;if(I){q=f.get(he),q===void 0&&(q=[],f.set(he,q));let me=I.textures;if(q.length!==me.length||q[0]!==i.COLOR_ATTACHMENT0){for(let de=0,Be=me.length;de<Be;de++)q[de]=i.COLOR_ATTACHMENT0+de;q.length=me.length,j=!0}}else q[0]!==i.BACK&&(q[0]=i.BACK,j=!0);j&&i.drawBuffers(q)}function Je(I){return g!==I?(i.useProgram(I),g=I,!0):!1}let Ge={[Vn]:i.FUNC_ADD,[Zc]:i.FUNC_SUBTRACT,[$c]:i.FUNC_REVERSE_SUBTRACT};Ge[Jc]=i.MIN,Ge[Kc]=i.MAX;let nt={[jc]:i.ZERO,[Qc]:i.ONE,[eh]:i.SRC_COLOR,[$r]:i.SRC_ALPHA,[ah]:i.SRC_ALPHA_SATURATE,[sh]:i.DST_COLOR,[nh]:i.DST_ALPHA,[th]:i.ONE_MINUS_SRC_COLOR,[Jr]:i.ONE_MINUS_SRC_ALPHA,[rh]:i.ONE_MINUS_DST_COLOR,[ih]:i.ONE_MINUS_DST_ALPHA,[oh]:i.CONSTANT_COLOR,[lh]:i.ONE_MINUS_CONSTANT_COLOR,[ch]:i.CONSTANT_ALPHA,[hh]:i.ONE_MINUS_CONSTANT_ALPHA};function P(I,he,q,j,me,de,Be,ct,vt,Qe){if(I===An){x===!0&&(Ie(i.BLEND),x=!1);return}if(x===!1&&(ne(i.BLEND),x=!0),I!==Yc){if(I!==p||Qe!==b){if((h!==Vn||M!==Vn)&&(i.blendEquation(i.FUNC_ADD),h=Vn,M=Vn),Qe)switch(I){case xi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Jo:i.blendFunc(i.ONE,i.ONE);break;case Ko:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case jo:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case xi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Jo:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Ko:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case jo:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}S=null,E=null,R=null,T=null,A.set(0,0,0),D=0,p=I,b=Qe}return}me=me||he,de=de||q,Be=Be||j,(he!==h||me!==M)&&(i.blendEquationSeparate(Ge[he],Ge[me]),h=he,M=me),(q!==S||j!==E||de!==R||Be!==T)&&(i.blendFuncSeparate(nt[q],nt[j],nt[de],nt[Be]),S=q,E=j,R=de,T=Be),(ct.equals(A)===!1||vt!==D)&&(i.blendColor(ct.r,ct.g,ct.b,vt),A.copy(ct),D=vt),p=I,b=!1}function re(I,he){I.side===hn?Ie(i.CULL_FACE):ne(i.CULL_FACE);let q=I.side===Ct;he&&(q=!q),be(q),I.blending===xi&&I.transparent===!1?P(An):P(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),r.setMask(I.colorWrite);let j=I.stencilWrite;o.setTest(j),j&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),Me(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?ne(i.SAMPLE_ALPHA_TO_COVERAGE):Ie(i.SAMPLE_ALPHA_TO_COVERAGE)}function be(I){y!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),y=I)}function H(I){I!==Wc?(ne(i.CULL_FACE),I!==C&&(I===$o?i.cullFace(i.BACK):I===Xc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ie(i.CULL_FACE),C=I}function ae(I){I!==W&&(Y&&i.lineWidth(I),W=I)}function Me(I,he,q){I?(ne(i.POLYGON_OFFSET_FILL),(B!==he||X!==q)&&(i.polygonOffset(he,q),B=he,X=q)):Ie(i.POLYGON_OFFSET_FILL)}function Ae(I){I?ne(i.SCISSOR_TEST):Ie(i.SCISSOR_TEST)}function w(I){I===void 0&&(I=i.TEXTURE0+J-1),te!==I&&(i.activeTexture(I),te=I)}function v(I,he,q){q===void 0&&(te===null?q=i.TEXTURE0+J-1:q=te);let j=ce[q];j===void 0&&(j={type:void 0,texture:void 0},ce[q]=j),(j.type!==I||j.texture!==he)&&(te!==q&&(i.activeTexture(q),te=q),i.bindTexture(I,he||pe[I]),j.type=I,j.texture=he)}function F(){let I=ce[te];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function K(){try{i.compressedTexImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Q(){try{i.compressedTexImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function $(){try{i.texSubImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ce(){try{i.texSubImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ue(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function xe(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function qe(){try{i.texStorage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ie(){try{i.texStorage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function _e(){try{i.texImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Pe(){try{i.texImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ue(I){De.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),De.copy(I))}function ye(I){L.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),L.copy(I))}function Xe(I,he){let q=c.get(he);q===void 0&&(q=new WeakMap,c.set(he,q));let j=q.get(I);j===void 0&&(j=i.getUniformBlockIndex(he,I.name),q.set(I,j))}function Ve(I,he){let j=c.get(he).get(I);l.get(he)!==j&&(i.uniformBlockBinding(he,j,I.__bindingPointIndex),l.set(he,j))}function it(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},te=null,ce={},d={},f=new WeakMap,m=[],g=null,x=!1,p=null,h=null,S=null,E=null,M=null,R=null,T=null,A=new We(0,0,0),D=0,b=!1,y=null,C=null,W=null,B=null,X=null,De.set(0,0,i.canvas.width,i.canvas.height),L.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ne,disable:Ie,bindFramebuffer:Le,drawBuffers:Oe,useProgram:Je,setBlending:P,setMaterial:re,setFlipSided:be,setCullFace:H,setLineWidth:ae,setPolygonOffset:Me,setScissorTest:Ae,activeTexture:w,bindTexture:v,unbindTexture:F,compressedTexImage2D:K,compressedTexImage3D:Q,texImage2D:_e,texImage3D:Pe,updateUBOMapping:Xe,uniformBlockBinding:Ve,texStorage2D:qe,texStorage3D:ie,texSubImage2D:$,texSubImage3D:Ce,compressedTexSubImage2D:ue,compressedTexSubImage3D:xe,scissor:Ue,viewport:ye,reset:it}}function $l(i,e,t,n){let s=Om(n);switch(t){case lc:return i*e;case hc:return i*e;case uc:return i*e*2;case dc:return i*e/s.components*s.byteLength;case fo:return i*e/s.components*s.byteLength;case fc:return i*e*2/s.components*s.byteLength;case po:return i*e*2/s.components*s.byteLength;case cc:return i*e*3/s.components*s.byteLength;case qt:return i*e*4/s.components*s.byteLength;case mo:return i*e*4/s.components*s.byteLength;case Os:case Bs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case zs:case ks:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ca:case ua:return Math.max(i,16)*Math.max(e,8)/4;case la:case ha:return Math.max(i,8)*Math.max(e,8)/2;case da:case fa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case pa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ma:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ga:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case va:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case xa:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case _a:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case ya:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case ba:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Ma:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case wa:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Sa:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Ea:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ta:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Aa:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Ca:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Vs:case Ra:case Ia:return Math.ceil(i/4)*Math.ceil(e/4)*16;case pc:case Pa:return Math.ceil(i/4)*Math.ceil(e/4)*8;case La:case Na:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Om(i){switch(i){case pn:case rc:return{byteLength:1,components:1};case Yi:case ac:case ns:return{byteLength:2,components:1};case ho:case uo:return{byteLength:2,components:4};case qn:case co:case un:return{byteLength:4,components:1};case oc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function Bm(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new et,u=new WeakMap,d,f=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,v){return m?new OffscreenCanvas(w,v):Ws("canvas")}function x(w,v,F){let K=1,Q=Ae(w);if((Q.width>F||Q.height>F)&&(K=F/Math.max(Q.width,Q.height)),K<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){let $=Math.floor(K*Q.width),Ce=Math.floor(K*Q.height);d===void 0&&(d=g($,Ce));let ue=v?g($,Ce):d;return ue.width=$,ue.height=Ce,ue.getContext("2d").drawImage(w,0,0,$,Ce),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+$+"x"+Ce+")."),ue}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),w;return w}function p(w){return w.generateMipmaps}function h(w){i.generateMipmap(w)}function S(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(w,v,F,K,Q=!1){if(w!==null){if(i[w]!==void 0)return i[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let $=v;if(v===i.RED&&(F===i.FLOAT&&($=i.R32F),F===i.HALF_FLOAT&&($=i.R16F),F===i.UNSIGNED_BYTE&&($=i.R8)),v===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&($=i.R8UI),F===i.UNSIGNED_SHORT&&($=i.R16UI),F===i.UNSIGNED_INT&&($=i.R32UI),F===i.BYTE&&($=i.R8I),F===i.SHORT&&($=i.R16I),F===i.INT&&($=i.R32I)),v===i.RG&&(F===i.FLOAT&&($=i.RG32F),F===i.HALF_FLOAT&&($=i.RG16F),F===i.UNSIGNED_BYTE&&($=i.RG8)),v===i.RG_INTEGER&&(F===i.UNSIGNED_BYTE&&($=i.RG8UI),F===i.UNSIGNED_SHORT&&($=i.RG16UI),F===i.UNSIGNED_INT&&($=i.RG32UI),F===i.BYTE&&($=i.RG8I),F===i.SHORT&&($=i.RG16I),F===i.INT&&($=i.RG32I)),v===i.RGB_INTEGER&&(F===i.UNSIGNED_BYTE&&($=i.RGB8UI),F===i.UNSIGNED_SHORT&&($=i.RGB16UI),F===i.UNSIGNED_INT&&($=i.RGB32UI),F===i.BYTE&&($=i.RGB8I),F===i.SHORT&&($=i.RGB16I),F===i.INT&&($=i.RGB32I)),v===i.RGBA_INTEGER&&(F===i.UNSIGNED_BYTE&&($=i.RGBA8UI),F===i.UNSIGNED_SHORT&&($=i.RGBA16UI),F===i.UNSIGNED_INT&&($=i.RGBA32UI),F===i.BYTE&&($=i.RGBA8I),F===i.SHORT&&($=i.RGBA16I),F===i.INT&&($=i.RGBA32I)),v===i.RGB&&F===i.UNSIGNED_INT_5_9_9_9_REV&&($=i.RGB9_E5),v===i.RGBA){let Ce=Q?cr:Ye.getTransfer(K);F===i.FLOAT&&($=i.RGBA32F),F===i.HALF_FLOAT&&($=i.RGBA16F),F===i.UNSIGNED_BYTE&&($=Ce===tt?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&($=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&($=i.RGB5_A1)}return($===i.R16F||$===i.R32F||$===i.RG16F||$===i.RG32F||$===i.RGBA16F||$===i.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function M(w,v){let F;return w?v===null||v===qn||v===Ei?F=i.DEPTH24_STENCIL8:v===un?F=i.DEPTH32F_STENCIL8:v===Yi&&(F=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===qn||v===Ei?F=i.DEPTH_COMPONENT24:v===un?F=i.DEPTH_COMPONENT32F:v===Yi&&(F=i.DEPTH_COMPONENT16),F}function R(w,v){return p(w)===!0||w.isFramebufferTexture&&w.minFilter!==Yt&&w.minFilter!==Kt?Math.log2(Math.max(v.width,v.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?v.mipmaps.length:1}function T(w){let v=w.target;v.removeEventListener("dispose",T),D(v),v.isVideoTexture&&u.delete(v)}function A(w){let v=w.target;v.removeEventListener("dispose",A),y(v)}function D(w){let v=n.get(w);if(v.__webglInit===void 0)return;let F=w.source,K=f.get(F);if(K){let Q=K[v.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&b(w),Object.keys(K).length===0&&f.delete(F)}n.remove(w)}function b(w){let v=n.get(w);i.deleteTexture(v.__webglTexture);let F=w.source,K=f.get(F);delete K[v.__cacheKey],a.memory.textures--}function y(w){let v=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(v.__webglFramebuffer[K]))for(let Q=0;Q<v.__webglFramebuffer[K].length;Q++)i.deleteFramebuffer(v.__webglFramebuffer[K][Q]);else i.deleteFramebuffer(v.__webglFramebuffer[K]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[K])}else{if(Array.isArray(v.__webglFramebuffer))for(let K=0;K<v.__webglFramebuffer.length;K++)i.deleteFramebuffer(v.__webglFramebuffer[K]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let K=0;K<v.__webglColorRenderbuffer.length;K++)v.__webglColorRenderbuffer[K]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[K]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let F=w.textures;for(let K=0,Q=F.length;K<Q;K++){let $=n.get(F[K]);$.__webglTexture&&(i.deleteTexture($.__webglTexture),a.memory.textures--),n.remove(F[K])}n.remove(w)}let C=0;function W(){C=0}function B(){let w=C;return w>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),C+=1,w}function X(w){let v=[];return v.push(w.wrapS),v.push(w.wrapT),v.push(w.wrapR||0),v.push(w.magFilter),v.push(w.minFilter),v.push(w.anisotropy),v.push(w.internalFormat),v.push(w.format),v.push(w.type),v.push(w.generateMipmaps),v.push(w.premultiplyAlpha),v.push(w.flipY),v.push(w.unpackAlignment),v.push(w.colorSpace),v.join()}function J(w,v){let F=n.get(w);if(w.isVideoTexture&&ae(w),w.isRenderTargetTexture===!1&&w.version>0&&F.__version!==w.version){let K=w.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{L(F,w,v);return}}t.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+v)}function Y(w,v){let F=n.get(w);if(w.version>0&&F.__version!==w.version){L(F,w,v);return}t.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+v)}function ee(w,v){let F=n.get(w);if(w.version>0&&F.__version!==w.version){L(F,w,v);return}t.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+v)}function V(w,v){let F=n.get(w);if(w.version>0&&F.__version!==w.version){G(F,w,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+v)}let te={[aa]:i.REPEAT,[Wn]:i.CLAMP_TO_EDGE,[oa]:i.MIRRORED_REPEAT},ce={[Yt]:i.NEAREST,[yh]:i.NEAREST_MIPMAP_NEAREST,[us]:i.NEAREST_MIPMAP_LINEAR,[Kt]:i.LINEAR,[yr]:i.LINEAR_MIPMAP_NEAREST,[Xn]:i.LINEAR_MIPMAP_LINEAR},ge={[Eh]:i.NEVER,[Ph]:i.ALWAYS,[Th]:i.LESS,[mc]:i.LEQUAL,[Ah]:i.EQUAL,[Ih]:i.GEQUAL,[Ch]:i.GREATER,[Rh]:i.NOTEQUAL};function we(w,v){if(v.type===un&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Kt||v.magFilter===yr||v.magFilter===us||v.magFilter===Xn||v.minFilter===Kt||v.minFilter===yr||v.minFilter===us||v.minFilter===Xn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,te[v.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,te[v.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,te[v.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,ce[v.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,ce[v.minFilter]),v.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,ge[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Yt||v.minFilter!==us&&v.minFilter!==Xn||v.type===un&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){let F=e.get("EXT_texture_filter_anisotropic");i.texParameterf(w,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function De(w,v){let F=!1;w.__webglInit===void 0&&(w.__webglInit=!0,v.addEventListener("dispose",T));let K=v.source,Q=f.get(K);Q===void 0&&(Q={},f.set(K,Q));let $=X(v);if($!==w.__cacheKey){Q[$]===void 0&&(Q[$]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,F=!0),Q[$].usedTimes++;let Ce=Q[w.__cacheKey];Ce!==void 0&&(Q[w.__cacheKey].usedTimes--,Ce.usedTimes===0&&b(v)),w.__cacheKey=$,w.__webglTexture=Q[$].texture}return F}function L(w,v,F){let K=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(K=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(K=i.TEXTURE_3D);let Q=De(w,v),$=v.source;t.bindTexture(K,w.__webglTexture,i.TEXTURE0+F);let Ce=n.get($);if($.version!==Ce.__version||Q===!0){t.activeTexture(i.TEXTURE0+F);let ue=Ye.getPrimaries(Ye.workingColorSpace),xe=v.colorSpace===Tn?null:Ye.getPrimaries(v.colorSpace),qe=v.colorSpace===Tn||ue===xe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,qe);let ie=x(v.image,!1,s.maxTextureSize);ie=Me(v,ie);let _e=r.convert(v.format,v.colorSpace),Pe=r.convert(v.type),Ue=E(v.internalFormat,_e,Pe,v.colorSpace,v.isVideoTexture);we(K,v);let ye,Xe=v.mipmaps,Ve=v.isVideoTexture!==!0,it=Ce.__version===void 0||Q===!0,I=$.dataReady,he=R(v,ie);if(v.isDepthTexture)Ue=M(v.format===Ti,v.type),it&&(Ve?t.texStorage2D(i.TEXTURE_2D,1,Ue,ie.width,ie.height):t.texImage2D(i.TEXTURE_2D,0,Ue,ie.width,ie.height,0,_e,Pe,null));else if(v.isDataTexture)if(Xe.length>0){Ve&&it&&t.texStorage2D(i.TEXTURE_2D,he,Ue,Xe[0].width,Xe[0].height);for(let q=0,j=Xe.length;q<j;q++)ye=Xe[q],Ve?I&&t.texSubImage2D(i.TEXTURE_2D,q,0,0,ye.width,ye.height,_e,Pe,ye.data):t.texImage2D(i.TEXTURE_2D,q,Ue,ye.width,ye.height,0,_e,Pe,ye.data);v.generateMipmaps=!1}else Ve?(it&&t.texStorage2D(i.TEXTURE_2D,he,Ue,ie.width,ie.height),I&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ie.width,ie.height,_e,Pe,ie.data)):t.texImage2D(i.TEXTURE_2D,0,Ue,ie.width,ie.height,0,_e,Pe,ie.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Ve&&it&&t.texStorage3D(i.TEXTURE_2D_ARRAY,he,Ue,Xe[0].width,Xe[0].height,ie.depth);for(let q=0,j=Xe.length;q<j;q++)if(ye=Xe[q],v.format!==qt)if(_e!==null)if(Ve){if(I)if(v.layerUpdates.size>0){let me=$l(ye.width,ye.height,v.format,v.type);for(let de of v.layerUpdates){let Be=ye.data.subarray(de*me/ye.data.BYTES_PER_ELEMENT,(de+1)*me/ye.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,de,ye.width,ye.height,1,_e,Be)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,ye.width,ye.height,ie.depth,_e,ye.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,q,Ue,ye.width,ye.height,ie.depth,0,ye.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ve?I&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,ye.width,ye.height,ie.depth,_e,Pe,ye.data):t.texImage3D(i.TEXTURE_2D_ARRAY,q,Ue,ye.width,ye.height,ie.depth,0,_e,Pe,ye.data)}else{Ve&&it&&t.texStorage2D(i.TEXTURE_2D,he,Ue,Xe[0].width,Xe[0].height);for(let q=0,j=Xe.length;q<j;q++)ye=Xe[q],v.format!==qt?_e!==null?Ve?I&&t.compressedTexSubImage2D(i.TEXTURE_2D,q,0,0,ye.width,ye.height,_e,ye.data):t.compressedTexImage2D(i.TEXTURE_2D,q,Ue,ye.width,ye.height,0,ye.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ve?I&&t.texSubImage2D(i.TEXTURE_2D,q,0,0,ye.width,ye.height,_e,Pe,ye.data):t.texImage2D(i.TEXTURE_2D,q,Ue,ye.width,ye.height,0,_e,Pe,ye.data)}else if(v.isDataArrayTexture)if(Ve){if(it&&t.texStorage3D(i.TEXTURE_2D_ARRAY,he,Ue,ie.width,ie.height,ie.depth),I)if(v.layerUpdates.size>0){let q=$l(ie.width,ie.height,v.format,v.type);for(let j of v.layerUpdates){let me=ie.data.subarray(j*q/ie.data.BYTES_PER_ELEMENT,(j+1)*q/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,j,ie.width,ie.height,1,_e,Pe,me)}v.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,_e,Pe,ie.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ue,ie.width,ie.height,ie.depth,0,_e,Pe,ie.data);else if(v.isData3DTexture)Ve?(it&&t.texStorage3D(i.TEXTURE_3D,he,Ue,ie.width,ie.height,ie.depth),I&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,_e,Pe,ie.data)):t.texImage3D(i.TEXTURE_3D,0,Ue,ie.width,ie.height,ie.depth,0,_e,Pe,ie.data);else if(v.isFramebufferTexture){if(it)if(Ve)t.texStorage2D(i.TEXTURE_2D,he,Ue,ie.width,ie.height);else{let q=ie.width,j=ie.height;for(let me=0;me<he;me++)t.texImage2D(i.TEXTURE_2D,me,Ue,q,j,0,_e,Pe,null),q>>=1,j>>=1}}else if(Xe.length>0){if(Ve&&it){let q=Ae(Xe[0]);t.texStorage2D(i.TEXTURE_2D,he,Ue,q.width,q.height)}for(let q=0,j=Xe.length;q<j;q++)ye=Xe[q],Ve?I&&t.texSubImage2D(i.TEXTURE_2D,q,0,0,_e,Pe,ye):t.texImage2D(i.TEXTURE_2D,q,Ue,_e,Pe,ye);v.generateMipmaps=!1}else if(Ve){if(it){let q=Ae(ie);t.texStorage2D(i.TEXTURE_2D,he,Ue,q.width,q.height)}I&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,_e,Pe,ie)}else t.texImage2D(i.TEXTURE_2D,0,Ue,_e,Pe,ie);p(v)&&h(K),Ce.__version=$.version,v.onUpdate&&v.onUpdate(v)}w.__version=v.version}function G(w,v,F){if(v.image.length!==6)return;let K=De(w,v),Q=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+F);let $=n.get(Q);if(Q.version!==$.__version||K===!0){t.activeTexture(i.TEXTURE0+F);let Ce=Ye.getPrimaries(Ye.workingColorSpace),ue=v.colorSpace===Tn?null:Ye.getPrimaries(v.colorSpace),xe=v.colorSpace===Tn||Ce===ue?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe);let qe=v.isCompressedTexture||v.image[0].isCompressedTexture,ie=v.image[0]&&v.image[0].isDataTexture,_e=[];for(let j=0;j<6;j++)!qe&&!ie?_e[j]=x(v.image[j],!0,s.maxCubemapSize):_e[j]=ie?v.image[j].image:v.image[j],_e[j]=Me(v,_e[j]);let Pe=_e[0],Ue=r.convert(v.format,v.colorSpace),ye=r.convert(v.type),Xe=E(v.internalFormat,Ue,ye,v.colorSpace),Ve=v.isVideoTexture!==!0,it=$.__version===void 0||K===!0,I=Q.dataReady,he=R(v,Pe);we(i.TEXTURE_CUBE_MAP,v);let q;if(qe){Ve&&it&&t.texStorage2D(i.TEXTURE_CUBE_MAP,he,Xe,Pe.width,Pe.height);for(let j=0;j<6;j++){q=_e[j].mipmaps;for(let me=0;me<q.length;me++){let de=q[me];v.format!==qt?Ue!==null?Ve?I&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,me,0,0,de.width,de.height,Ue,de.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,me,Xe,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ve?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,me,0,0,de.width,de.height,Ue,ye,de.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,me,Xe,de.width,de.height,0,Ue,ye,de.data)}}}else{if(q=v.mipmaps,Ve&&it){q.length>0&&he++;let j=Ae(_e[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,he,Xe,j.width,j.height)}for(let j=0;j<6;j++)if(ie){Ve?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,_e[j].width,_e[j].height,Ue,ye,_e[j].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Xe,_e[j].width,_e[j].height,0,Ue,ye,_e[j].data);for(let me=0;me<q.length;me++){let Be=q[me].image[j].image;Ve?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,me+1,0,0,Be.width,Be.height,Ue,ye,Be.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,me+1,Xe,Be.width,Be.height,0,Ue,ye,Be.data)}}else{Ve?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Ue,ye,_e[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Xe,Ue,ye,_e[j]);for(let me=0;me<q.length;me++){let de=q[me];Ve?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,me+1,0,0,Ue,ye,de.image[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,me+1,Xe,Ue,ye,de.image[j])}}}p(v)&&h(i.TEXTURE_CUBE_MAP),$.__version=Q.version,v.onUpdate&&v.onUpdate(v)}w.__version=v.version}function pe(w,v,F,K,Q,$){let Ce=r.convert(F.format,F.colorSpace),ue=r.convert(F.type),xe=E(F.internalFormat,Ce,ue,F.colorSpace),qe=n.get(v),ie=n.get(F);if(ie.__renderTarget=v,!qe.__hasExternalTextures){let _e=Math.max(1,v.width>>$),Pe=Math.max(1,v.height>>$);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?t.texImage3D(Q,$,xe,_e,Pe,v.depth,0,Ce,ue,null):t.texImage2D(Q,$,xe,_e,Pe,0,Ce,ue,null)}t.bindFramebuffer(i.FRAMEBUFFER,w),H(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,Q,ie.__webglTexture,0,be(v)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,K,Q,ie.__webglTexture,$),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ne(w,v,F){if(i.bindRenderbuffer(i.RENDERBUFFER,w),v.depthBuffer){let K=v.depthTexture,Q=K&&K.isDepthTexture?K.type:null,$=M(v.stencilBuffer,Q),Ce=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ue=be(v);H(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ue,$,v.width,v.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,ue,$,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,$,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ce,i.RENDERBUFFER,w)}else{let K=v.textures;for(let Q=0;Q<K.length;Q++){let $=K[Q],Ce=r.convert($.format,$.colorSpace),ue=r.convert($.type),xe=E($.internalFormat,Ce,ue,$.colorSpace),qe=be(v);F&&H(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,qe,xe,v.width,v.height):H(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,qe,xe,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,xe,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ie(w,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,w),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let K=n.get(v.depthTexture);K.__renderTarget=v,(!K.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),J(v.depthTexture,0);let Q=K.__webglTexture,$=be(v);if(v.depthTexture.format===_i)H(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0);else if(v.depthTexture.format===Ti)H(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Le(w){let v=n.get(w),F=w.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==w.depthTexture){let K=w.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),K){let Q=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,K.removeEventListener("dispose",Q)};K.addEventListener("dispose",Q),v.__depthDisposeCallback=Q}v.__boundDepthTexture=K}if(w.depthTexture&&!v.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");Ie(v.__webglFramebuffer,w)}else if(F){v.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[K]),v.__webglDepthbuffer[K]===void 0)v.__webglDepthbuffer[K]=i.createRenderbuffer(),ne(v.__webglDepthbuffer[K],w,!1);else{let Q=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,$=v.__webglDepthbuffer[K];i.bindRenderbuffer(i.RENDERBUFFER,$),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,$)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),ne(v.__webglDepthbuffer,w,!1);else{let K=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Q=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Q),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,Q)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Oe(w,v,F){let K=n.get(w);v!==void 0&&pe(K.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&Le(w)}function Je(w){let v=w.texture,F=n.get(w),K=n.get(v);w.addEventListener("dispose",A);let Q=w.textures,$=w.isWebGLCubeRenderTarget===!0,Ce=Q.length>1;if(Ce||(K.__webglTexture===void 0&&(K.__webglTexture=i.createTexture()),K.__version=v.version,a.memory.textures++),$){F.__webglFramebuffer=[];for(let ue=0;ue<6;ue++)if(v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer[ue]=[];for(let xe=0;xe<v.mipmaps.length;xe++)F.__webglFramebuffer[ue][xe]=i.createFramebuffer()}else F.__webglFramebuffer[ue]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer=[];for(let ue=0;ue<v.mipmaps.length;ue++)F.__webglFramebuffer[ue]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(Ce)for(let ue=0,xe=Q.length;ue<xe;ue++){let qe=n.get(Q[ue]);qe.__webglTexture===void 0&&(qe.__webglTexture=i.createTexture(),a.memory.textures++)}if(w.samples>0&&H(w)===!1){F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let ue=0;ue<Q.length;ue++){let xe=Q[ue];F.__webglColorRenderbuffer[ue]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[ue]);let qe=r.convert(xe.format,xe.colorSpace),ie=r.convert(xe.type),_e=E(xe.internalFormat,qe,ie,xe.colorSpace,w.isXRRenderTarget===!0),Pe=be(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,Pe,_e,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.RENDERBUFFER,F.__webglColorRenderbuffer[ue])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),ne(F.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if($){t.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),we(i.TEXTURE_CUBE_MAP,v);for(let ue=0;ue<6;ue++)if(v.mipmaps&&v.mipmaps.length>0)for(let xe=0;xe<v.mipmaps.length;xe++)pe(F.__webglFramebuffer[ue][xe],w,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,xe);else pe(F.__webglFramebuffer[ue],w,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0);p(v)&&h(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ce){for(let ue=0,xe=Q.length;ue<xe;ue++){let qe=Q[ue],ie=n.get(qe);t.bindTexture(i.TEXTURE_2D,ie.__webglTexture),we(i.TEXTURE_2D,qe),pe(F.__webglFramebuffer,w,qe,i.COLOR_ATTACHMENT0+ue,i.TEXTURE_2D,0),p(qe)&&h(i.TEXTURE_2D)}t.unbindTexture()}else{let ue=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ue=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ue,K.__webglTexture),we(ue,v),v.mipmaps&&v.mipmaps.length>0)for(let xe=0;xe<v.mipmaps.length;xe++)pe(F.__webglFramebuffer[xe],w,v,i.COLOR_ATTACHMENT0,ue,xe);else pe(F.__webglFramebuffer,w,v,i.COLOR_ATTACHMENT0,ue,0);p(v)&&h(ue),t.unbindTexture()}w.depthBuffer&&Le(w)}function Ge(w){let v=w.textures;for(let F=0,K=v.length;F<K;F++){let Q=v[F];if(p(Q)){let $=S(w),Ce=n.get(Q).__webglTexture;t.bindTexture($,Ce),h($),t.unbindTexture()}}}let nt=[],P=[];function re(w){if(w.samples>0){if(H(w)===!1){let v=w.textures,F=w.width,K=w.height,Q=i.COLOR_BUFFER_BIT,$=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ce=n.get(w),ue=v.length>1;if(ue)for(let xe=0;xe<v.length;xe++)t.bindFramebuffer(i.FRAMEBUFFER,Ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+xe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ce.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ce.__webglFramebuffer);for(let xe=0;xe<v.length;xe++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),ue){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ce.__webglColorRenderbuffer[xe]);let qe=n.get(v[xe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,qe,0)}i.blitFramebuffer(0,0,F,K,0,0,F,K,Q,i.NEAREST),l===!0&&(nt.length=0,P.length=0,nt.push(i.COLOR_ATTACHMENT0+xe),w.depthBuffer&&w.resolveDepthBuffer===!1&&(nt.push($),P.push($),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,P)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,nt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ue)for(let xe=0;xe<v.length;xe++){t.bindFramebuffer(i.FRAMEBUFFER,Ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xe,i.RENDERBUFFER,Ce.__webglColorRenderbuffer[xe]);let qe=n.get(v[xe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+xe,i.TEXTURE_2D,qe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ce.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){let v=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function be(w){return Math.min(s.maxSamples,w.samples)}function H(w){let v=n.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function ae(w){let v=a.render.frame;u.get(w)!==v&&(u.set(w,v),w.update())}function Me(w,v){let F=w.colorSpace,K=w.format,Q=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||F!==Pi&&F!==Tn&&(Ye.getTransfer(F)===tt?(K!==qt||Q!==pn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),v}function Ae(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=W,this.setTexture2D=J,this.setTexture2DArray=Y,this.setTexture3D=ee,this.setTextureCube=V,this.rebindTextures=Oe,this.setupRenderTarget=Je,this.updateRenderTargetMipmap=Ge,this.updateMultisampleRenderTarget=re,this.setupDepthRenderbuffer=Le,this.setupFrameBufferTexture=pe,this.useMultisampledRTT=H}function zm(i,e){function t(n,s=Tn){let r,a=Ye.getTransfer(s);if(n===pn)return i.UNSIGNED_BYTE;if(n===ho)return i.UNSIGNED_SHORT_4_4_4_4;if(n===uo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===oc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===rc)return i.BYTE;if(n===ac)return i.SHORT;if(n===Yi)return i.UNSIGNED_SHORT;if(n===co)return i.INT;if(n===qn)return i.UNSIGNED_INT;if(n===un)return i.FLOAT;if(n===ns)return i.HALF_FLOAT;if(n===lc)return i.ALPHA;if(n===cc)return i.RGB;if(n===qt)return i.RGBA;if(n===hc)return i.LUMINANCE;if(n===uc)return i.LUMINANCE_ALPHA;if(n===_i)return i.DEPTH_COMPONENT;if(n===Ti)return i.DEPTH_STENCIL;if(n===dc)return i.RED;if(n===fo)return i.RED_INTEGER;if(n===fc)return i.RG;if(n===po)return i.RG_INTEGER;if(n===mo)return i.RGBA_INTEGER;if(n===Os||n===Bs||n===zs||n===ks)if(a===tt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Os)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Bs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===zs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ks)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Os)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Bs)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===zs)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ks)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===la||n===ca||n===ha||n===ua)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===la)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ca)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ha)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ua)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===da||n===fa||n===pa)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===da||n===fa)return a===tt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===pa)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ma||n===ga||n===va||n===xa||n===_a||n===ya||n===ba||n===Ma||n===wa||n===Sa||n===Ea||n===Ta||n===Aa||n===Ca)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ma)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ga)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===va)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===xa)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===_a)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ya)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ba)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ma)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===wa)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Sa)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ea)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ta)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Aa)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ca)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Vs||n===Ra||n===Ia)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Vs)return a===tt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ra)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ia)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===pc||n===Pa||n===La||n===Na)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Vs)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Pa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===La)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Na)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ei?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var Za=class extends Nt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},jt=class extends Dt{constructor(){super(),this.isGroup=!0,this.type="Group"}},km={type:"move"},qi=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new jt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new jt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new jt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let x of e.hand.values()){let p=t.getJointPose(x,n),h=this._getHandJoint(c,x);p!==null&&(h.matrix.fromArray(p.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=p.radius),h.visible=p!==null}let u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),m=.02,g=.005;c.inputState.pinching&&f>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(km)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new jt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Vm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Hm=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,$a=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){let s=new zt,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new kt({vertexShader:Vm,fragmentShader:Hm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new At(new js(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Ja=class extends In{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,d=null,f=null,m=null,g=null,x=new $a,p=t.getContextAttributes(),h=null,S=null,E=[],M=[],R=new et,T=null,A=new Nt;A.viewport=new dt;let D=new Nt;D.viewport=new dt;let b=[A,D],y=new Za,C=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(L){let G=E[L];return G===void 0&&(G=new qi,E[L]=G),G.getTargetRaySpace()},this.getControllerGrip=function(L){let G=E[L];return G===void 0&&(G=new qi,E[L]=G),G.getGripSpace()},this.getHand=function(L){let G=E[L];return G===void 0&&(G=new qi,E[L]=G),G.getHandSpace()};function B(L){let G=M.indexOf(L.inputSource);if(G===-1)return;let pe=E[G];pe!==void 0&&(pe.update(L.inputSource,L.frame,c||a),pe.dispatchEvent({type:L.type,data:L.inputSource}))}function X(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",J);for(let L=0;L<E.length;L++){let G=M[L];G!==null&&(M[L]=null,E[L].disconnect(G))}C=null,W=null,x.reset(),e.setRenderTarget(h),m=null,f=null,d=null,s=null,S=null,De.stop(),n.isPresenting=!1,e.setPixelRatio(T),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(L){r=L,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(L){o=L,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(L){c=L},this.getBaseLayer=function(){return f!==null?f:m},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(L){if(s=L,s!==null){if(h=e.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",X),s.addEventListener("inputsourceschange",J),p.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(R),s.renderState.layers===void 0){let G={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,t,G),s.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),S=new mn(m.framebufferWidth,m.framebufferHeight,{format:qt,type:pn,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let G=null,pe=null,ne=null;p.depth&&(ne=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,G=p.stencil?Ti:_i,pe=p.stencil?Ei:qn);let Ie={colorFormat:t.RGBA8,depthFormat:ne,scaleFactor:r};d=new XRWebGLBinding(s,t),f=d.createProjectionLayer(Ie),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),S=new mn(f.textureWidth,f.textureHeight,{format:qt,type:pn,depthTexture:new er(f.textureWidth,f.textureHeight,pe,void 0,void 0,void 0,void 0,void 0,void 0,G),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),De.setContext(s),De.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function J(L){for(let G=0;G<L.removed.length;G++){let pe=L.removed[G],ne=M.indexOf(pe);ne>=0&&(M[ne]=null,E[ne].disconnect(pe))}for(let G=0;G<L.added.length;G++){let pe=L.added[G],ne=M.indexOf(pe);if(ne===-1){for(let Le=0;Le<E.length;Le++)if(Le>=M.length){M.push(pe),ne=Le;break}else if(M[Le]===null){M[Le]=pe,ne=Le;break}if(ne===-1)break}let Ie=E[ne];Ie&&Ie.connect(pe)}}let Y=new O,ee=new O;function V(L,G,pe){Y.setFromMatrixPosition(G.matrixWorld),ee.setFromMatrixPosition(pe.matrixWorld);let ne=Y.distanceTo(ee),Ie=G.projectionMatrix.elements,Le=pe.projectionMatrix.elements,Oe=Ie[14]/(Ie[10]-1),Je=Ie[14]/(Ie[10]+1),Ge=(Ie[9]+1)/Ie[5],nt=(Ie[9]-1)/Ie[5],P=(Ie[8]-1)/Ie[0],re=(Le[8]+1)/Le[0],be=Oe*P,H=Oe*re,ae=ne/(-P+re),Me=ae*-P;if(G.matrixWorld.decompose(L.position,L.quaternion,L.scale),L.translateX(Me),L.translateZ(ae),L.matrixWorld.compose(L.position,L.quaternion,L.scale),L.matrixWorldInverse.copy(L.matrixWorld).invert(),Ie[10]===-1)L.projectionMatrix.copy(G.projectionMatrix),L.projectionMatrixInverse.copy(G.projectionMatrixInverse);else{let Ae=Oe+ae,w=Je+ae,v=be-Me,F=H+(ne-Me),K=Ge*Je/w*Ae,Q=nt*Je/w*Ae;L.projectionMatrix.makePerspective(v,F,K,Q,Ae,w),L.projectionMatrixInverse.copy(L.projectionMatrix).invert()}}function te(L,G){G===null?L.matrixWorld.copy(L.matrix):L.matrixWorld.multiplyMatrices(G.matrixWorld,L.matrix),L.matrixWorldInverse.copy(L.matrixWorld).invert()}this.updateCamera=function(L){if(s===null)return;let G=L.near,pe=L.far;x.texture!==null&&(x.depthNear>0&&(G=x.depthNear),x.depthFar>0&&(pe=x.depthFar)),y.near=D.near=A.near=G,y.far=D.far=A.far=pe,(C!==y.near||W!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),C=y.near,W=y.far),A.layers.mask=L.layers.mask|2,D.layers.mask=L.layers.mask|4,y.layers.mask=A.layers.mask|D.layers.mask;let ne=L.parent,Ie=y.cameras;te(y,ne);for(let Le=0;Le<Ie.length;Le++)te(Ie[Le],ne);Ie.length===2?V(y,A,D):y.projectionMatrix.copy(A.projectionMatrix),ce(L,y,ne)};function ce(L,G,pe){pe===null?L.matrix.copy(G.matrixWorld):(L.matrix.copy(pe.matrixWorld),L.matrix.invert(),L.matrix.multiply(G.matrixWorld)),L.matrix.decompose(L.position,L.quaternion,L.scale),L.updateMatrixWorld(!0),L.projectionMatrix.copy(G.projectionMatrix),L.projectionMatrixInverse.copy(G.projectionMatrixInverse),L.isPerspectiveCamera&&(L.fov=Zi*2*Math.atan(1/L.projectionMatrix.elements[5]),L.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(f===null&&m===null))return l},this.setFoveation=function(L){l=L,f!==null&&(f.fixedFoveation=L),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=L)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(y)};let ge=null;function we(L,G){if(u=G.getViewerPose(c||a),g=G,u!==null){let pe=u.views;m!==null&&(e.setRenderTargetFramebuffer(S,m.framebuffer),e.setRenderTarget(S));let ne=!1;pe.length!==y.cameras.length&&(y.cameras.length=0,ne=!0);for(let Le=0;Le<pe.length;Le++){let Oe=pe[Le],Je=null;if(m!==null)Je=m.getViewport(Oe);else{let nt=d.getViewSubImage(f,Oe);Je=nt.viewport,Le===0&&(e.setRenderTargetTextures(S,nt.colorTexture,f.ignoreDepthValues?void 0:nt.depthStencilTexture),e.setRenderTarget(S))}let Ge=b[Le];Ge===void 0&&(Ge=new Nt,Ge.layers.enable(Le),Ge.viewport=new dt,b[Le]=Ge),Ge.matrix.fromArray(Oe.transform.matrix),Ge.matrix.decompose(Ge.position,Ge.quaternion,Ge.scale),Ge.projectionMatrix.fromArray(Oe.projectionMatrix),Ge.projectionMatrixInverse.copy(Ge.projectionMatrix).invert(),Ge.viewport.set(Je.x,Je.y,Je.width,Je.height),Le===0&&(y.matrix.copy(Ge.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),ne===!0&&y.cameras.push(Ge)}let Ie=s.enabledFeatures;if(Ie&&Ie.includes("depth-sensing")){let Le=d.getDepthInformation(pe[0]);Le&&Le.isValid&&Le.texture&&x.init(e,Le,s.renderState)}}for(let pe=0;pe<E.length;pe++){let ne=M[pe],Ie=E[pe];ne!==null&&Ie!==void 0&&Ie.update(ne,G,c||a)}ge&&ge(L,G),G.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:G}),g=null}let De=new _c;De.setAnimationLoop(we),this.setAnimationLoop=function(L){ge=L},this.dispose=function(){}}},zn=new gn,Gm=new ht;function Wm(i,e){function t(p,h){p.matrixAutoUpdate===!0&&p.updateMatrix(),h.value.copy(p.matrix)}function n(p,h){h.color.getRGB(p.fogColor.value,xc(i)),h.isFog?(p.fogNear.value=h.near,p.fogFar.value=h.far):h.isFogExp2&&(p.fogDensity.value=h.density)}function s(p,h,S,E,M){h.isMeshBasicMaterial||h.isMeshLambertMaterial?r(p,h):h.isMeshToonMaterial?(r(p,h),d(p,h)):h.isMeshPhongMaterial?(r(p,h),u(p,h)):h.isMeshStandardMaterial?(r(p,h),f(p,h),h.isMeshPhysicalMaterial&&m(p,h,M)):h.isMeshMatcapMaterial?(r(p,h),g(p,h)):h.isMeshDepthMaterial?r(p,h):h.isMeshDistanceMaterial?(r(p,h),x(p,h)):h.isMeshNormalMaterial?r(p,h):h.isLineBasicMaterial?(a(p,h),h.isLineDashedMaterial&&o(p,h)):h.isPointsMaterial?l(p,h,S,E):h.isSpriteMaterial?c(p,h):h.isShadowMaterial?(p.color.value.copy(h.color),p.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function r(p,h){p.opacity.value=h.opacity,h.color&&p.diffuse.value.copy(h.color),h.emissive&&p.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(p.map.value=h.map,t(h.map,p.mapTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,t(h.alphaMap,p.alphaMapTransform)),h.bumpMap&&(p.bumpMap.value=h.bumpMap,t(h.bumpMap,p.bumpMapTransform),p.bumpScale.value=h.bumpScale,h.side===Ct&&(p.bumpScale.value*=-1)),h.normalMap&&(p.normalMap.value=h.normalMap,t(h.normalMap,p.normalMapTransform),p.normalScale.value.copy(h.normalScale),h.side===Ct&&p.normalScale.value.negate()),h.displacementMap&&(p.displacementMap.value=h.displacementMap,t(h.displacementMap,p.displacementMapTransform),p.displacementScale.value=h.displacementScale,p.displacementBias.value=h.displacementBias),h.emissiveMap&&(p.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,p.emissiveMapTransform)),h.specularMap&&(p.specularMap.value=h.specularMap,t(h.specularMap,p.specularMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest);let S=e.get(h),E=S.envMap,M=S.envMapRotation;E&&(p.envMap.value=E,zn.copy(M),zn.x*=-1,zn.y*=-1,zn.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(zn.y*=-1,zn.z*=-1),p.envMapRotation.value.setFromMatrix4(Gm.makeRotationFromEuler(zn)),p.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=h.reflectivity,p.ior.value=h.ior,p.refractionRatio.value=h.refractionRatio),h.lightMap&&(p.lightMap.value=h.lightMap,p.lightMapIntensity.value=h.lightMapIntensity,t(h.lightMap,p.lightMapTransform)),h.aoMap&&(p.aoMap.value=h.aoMap,p.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,p.aoMapTransform))}function a(p,h){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,h.map&&(p.map.value=h.map,t(h.map,p.mapTransform))}function o(p,h){p.dashSize.value=h.dashSize,p.totalSize.value=h.dashSize+h.gapSize,p.scale.value=h.scale}function l(p,h,S,E){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,p.size.value=h.size*S,p.scale.value=E*.5,h.map&&(p.map.value=h.map,t(h.map,p.uvTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,t(h.alphaMap,p.alphaMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest)}function c(p,h){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,p.rotation.value=h.rotation,h.map&&(p.map.value=h.map,t(h.map,p.mapTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,t(h.alphaMap,p.alphaMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest)}function u(p,h){p.specular.value.copy(h.specular),p.shininess.value=Math.max(h.shininess,1e-4)}function d(p,h){h.gradientMap&&(p.gradientMap.value=h.gradientMap)}function f(p,h){p.metalness.value=h.metalness,h.metalnessMap&&(p.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,p.metalnessMapTransform)),p.roughness.value=h.roughness,h.roughnessMap&&(p.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,p.roughnessMapTransform)),h.envMap&&(p.envMapIntensity.value=h.envMapIntensity)}function m(p,h,S){p.ior.value=h.ior,h.sheen>0&&(p.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),p.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(p.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,p.sheenColorMapTransform)),h.sheenRoughnessMap&&(p.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,p.sheenRoughnessMapTransform))),h.clearcoat>0&&(p.clearcoat.value=h.clearcoat,p.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(p.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,p.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(p.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Ct&&p.clearcoatNormalScale.value.negate())),h.dispersion>0&&(p.dispersion.value=h.dispersion),h.iridescence>0&&(p.iridescence.value=h.iridescence,p.iridescenceIOR.value=h.iridescenceIOR,p.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(p.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,p.iridescenceMapTransform)),h.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),h.transmission>0&&(p.transmission.value=h.transmission,p.transmissionSamplerMap.value=S.texture,p.transmissionSamplerSize.value.set(S.width,S.height),h.transmissionMap&&(p.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,p.transmissionMapTransform)),p.thickness.value=h.thickness,h.thicknessMap&&(p.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=h.attenuationDistance,p.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(p.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(p.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=h.specularIntensity,p.specularColor.value.copy(h.specularColor),h.specularColorMap&&(p.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,p.specularColorMapTransform)),h.specularIntensityMap&&(p.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,h){h.matcap&&(p.matcap.value=h.matcap)}function x(p,h){let S=e.get(h).light;p.referencePosition.value.setFromMatrixPosition(S.matrixWorld),p.nearDistance.value=S.shadow.camera.near,p.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Xm(i,e,t,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,E){let M=E.program;n.uniformBlockBinding(S,M)}function c(S,E){let M=s[S.id];M===void 0&&(g(S),M=u(S),s[S.id]=M,S.addEventListener("dispose",p));let R=E.program;n.updateUBOMapping(S,R);let T=e.render.frame;r[S.id]!==T&&(f(S),r[S.id]=T)}function u(S){let E=d();S.__bindingPointIndex=E;let M=i.createBuffer(),R=S.__size,T=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,R,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,M),M}function d(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(S){let E=s[S.id],M=S.uniforms,R=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let T=0,A=M.length;T<A;T++){let D=Array.isArray(M[T])?M[T]:[M[T]];for(let b=0,y=D.length;b<y;b++){let C=D[b];if(m(C,T,b,R)===!0){let W=C.__offset,B=Array.isArray(C.value)?C.value:[C.value],X=0;for(let J=0;J<B.length;J++){let Y=B[J],ee=x(Y);typeof Y=="number"||typeof Y=="boolean"?(C.__data[0]=Y,i.bufferSubData(i.UNIFORM_BUFFER,W+X,C.__data)):Y.isMatrix3?(C.__data[0]=Y.elements[0],C.__data[1]=Y.elements[1],C.__data[2]=Y.elements[2],C.__data[3]=0,C.__data[4]=Y.elements[3],C.__data[5]=Y.elements[4],C.__data[6]=Y.elements[5],C.__data[7]=0,C.__data[8]=Y.elements[6],C.__data[9]=Y.elements[7],C.__data[10]=Y.elements[8],C.__data[11]=0):(Y.toArray(C.__data,X),X+=ee.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,W,C.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(S,E,M,R){let T=S.value,A=E+"_"+M;if(R[A]===void 0)return typeof T=="number"||typeof T=="boolean"?R[A]=T:R[A]=T.clone(),!0;{let D=R[A];if(typeof T=="number"||typeof T=="boolean"){if(D!==T)return R[A]=T,!0}else if(D.equals(T)===!1)return D.copy(T),!0}return!1}function g(S){let E=S.uniforms,M=0,R=16;for(let A=0,D=E.length;A<D;A++){let b=Array.isArray(E[A])?E[A]:[E[A]];for(let y=0,C=b.length;y<C;y++){let W=b[y],B=Array.isArray(W.value)?W.value:[W.value];for(let X=0,J=B.length;X<J;X++){let Y=B[X],ee=x(Y),V=M%R,te=V%ee.boundary,ce=V+te;M+=te,ce!==0&&R-ce<ee.storage&&(M+=R-ce),W.__data=new Float32Array(ee.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=M,M+=ee.storage}}}let T=M%R;return T>0&&(M+=R-T),S.__size=M,S.__cache={},this}function x(S){let E={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(E.boundary=4,E.storage=4):S.isVector2?(E.boundary=8,E.storage=8):S.isVector3||S.isColor?(E.boundary=16,E.storage=12):S.isVector4?(E.boundary=16,E.storage=16):S.isMatrix3?(E.boundary=48,E.storage=48):S.isMatrix4?(E.boundary=64,E.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),E}function p(S){let E=S.target;E.removeEventListener("dispose",p);let M=a.indexOf(E.__bindingPointIndex);a.splice(M,1),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function h(){for(let S in s)i.deleteBuffer(s[S]);a=[],s={},r={}}return{bind:l,update:c,dispose:h}}var tr=class{constructor(e={}){let{canvas:t=Zh(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;let g=new Uint32Array(4),x=new Int32Array(4),p=null,h=null,S=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Tt,this.toneMapping=Cn,this.toneMappingExposure=1;let M=this,R=!1,T=0,A=0,D=null,b=-1,y=null,C=new dt,W=new dt,B=null,X=new We(0),J=0,Y=t.width,ee=t.height,V=1,te=null,ce=null,ge=new dt(0,0,Y,ee),we=new dt(0,0,Y,ee),De=!1,L=new Ks,G=!1,pe=!1,ne=new ht,Ie=new ht,Le=new O,Oe=new dt,Je={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ge=!1;function nt(){return D===null?V:1}let P=n;function re(_,N){return t.getContext(_,N)}try{let _={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r170"),t.addEventListener("webglcontextlost",j,!1),t.addEventListener("webglcontextrestored",me,!1),t.addEventListener("webglcontextcreationerror",de,!1),P===null){let N="webgl2";if(P=re(N,_),P===null)throw re(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(_){throw console.error("THREE.WebGLRenderer: "+_.message),_}let be,H,ae,Me,Ae,w,v,F,K,Q,$,Ce,ue,xe,qe,ie,_e,Pe,Ue,ye,Xe,Ve,it,I;function he(){be=new op(P),be.init(),Ve=new zm(P,be),H=new tp(P,be,e,Ve),ae=new Fm(P,be),H.reverseDepthBuffer&&f&&ae.buffers.depth.setReversed(!0),Me=new hp(P),Ae=new wm,w=new Bm(P,be,ae,Ae,H,Ve,Me),v=new ip(M),F=new ap(M),K=new gu(P),it=new Qf(P,K),Q=new lp(P,K,Me,it),$=new dp(P,Q,K,Me),Ue=new up(P,H,w),ie=new np(Ae),Ce=new Mm(M,v,F,be,H,it,ie),ue=new Wm(M,Ae),xe=new Em,qe=new Pm(be),Pe=new jf(M,v,F,ae,$,m,l),_e=new Dm(M,$,H),I=new Xm(P,Me,H,ae),ye=new ep(P,be,Me),Xe=new cp(P,be,Me),Me.programs=Ce.programs,M.capabilities=H,M.extensions=be,M.properties=Ae,M.renderLists=xe,M.shadowMap=_e,M.state=ae,M.info=Me}he();let q=new Ja(M,P);this.xr=q,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let _=be.get("WEBGL_lose_context");_&&_.loseContext()},this.forceContextRestore=function(){let _=be.get("WEBGL_lose_context");_&&_.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(_){_!==void 0&&(V=_,this.setSize(Y,ee,!1))},this.getSize=function(_){return _.set(Y,ee)},this.setSize=function(_,N,z=!0){if(q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=_,ee=N,t.width=Math.floor(_*V),t.height=Math.floor(N*V),z===!0&&(t.style.width=_+"px",t.style.height=N+"px"),this.setViewport(0,0,_,N)},this.getDrawingBufferSize=function(_){return _.set(Y*V,ee*V).floor()},this.setDrawingBufferSize=function(_,N,z){Y=_,ee=N,V=z,t.width=Math.floor(_*z),t.height=Math.floor(N*z),this.setViewport(0,0,_,N)},this.getCurrentViewport=function(_){return _.copy(C)},this.getViewport=function(_){return _.copy(ge)},this.setViewport=function(_,N,z,k){_.isVector4?ge.set(_.x,_.y,_.z,_.w):ge.set(_,N,z,k),ae.viewport(C.copy(ge).multiplyScalar(V).round())},this.getScissor=function(_){return _.copy(we)},this.setScissor=function(_,N,z,k){_.isVector4?we.set(_.x,_.y,_.z,_.w):we.set(_,N,z,k),ae.scissor(W.copy(we).multiplyScalar(V).round())},this.getScissorTest=function(){return De},this.setScissorTest=function(_){ae.setScissorTest(De=_)},this.setOpaqueSort=function(_){te=_},this.setTransparentSort=function(_){ce=_},this.getClearColor=function(_){return _.copy(Pe.getClearColor())},this.setClearColor=function(){Pe.setClearColor.apply(Pe,arguments)},this.getClearAlpha=function(){return Pe.getClearAlpha()},this.setClearAlpha=function(){Pe.setClearAlpha.apply(Pe,arguments)},this.clear=function(_=!0,N=!0,z=!0){let k=0;if(_){let U=!1;if(D!==null){let se=D.texture.format;U=se===mo||se===po||se===fo}if(U){let se=D.texture.type,fe=se===pn||se===qn||se===Yi||se===Ei||se===ho||se===uo,Se=Pe.getClearColor(),Ee=Pe.getClearAlpha(),Fe=Se.r,ze=Se.g,Te=Se.b;fe?(g[0]=Fe,g[1]=ze,g[2]=Te,g[3]=Ee,P.clearBufferuiv(P.COLOR,0,g)):(x[0]=Fe,x[1]=ze,x[2]=Te,x[3]=Ee,P.clearBufferiv(P.COLOR,0,x))}else k|=P.COLOR_BUFFER_BIT}N&&(k|=P.DEPTH_BUFFER_BIT),z&&(k|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",j,!1),t.removeEventListener("webglcontextrestored",me,!1),t.removeEventListener("webglcontextcreationerror",de,!1),xe.dispose(),qe.dispose(),Ae.dispose(),v.dispose(),F.dispose(),$.dispose(),it.dispose(),I.dispose(),Ce.dispose(),q.dispose(),q.removeEventListener("sessionstart",Po),q.removeEventListener("sessionend",Lo),Nn.stop()};function j(_){_.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function me(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;let _=Me.autoReset,N=_e.enabled,z=_e.autoUpdate,k=_e.needsUpdate,U=_e.type;he(),Me.autoReset=_,_e.enabled=N,_e.autoUpdate=z,_e.needsUpdate=k,_e.type=U}function de(_){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",_.statusMessage)}function Be(_){let N=_.target;N.removeEventListener("dispose",Be),ct(N)}function ct(_){vt(_),Ae.remove(_)}function vt(_){let N=Ae.get(_).programs;N!==void 0&&(N.forEach(function(z){Ce.releaseProgram(z)}),_.isShaderMaterial&&Ce.releaseShaderCache(_))}this.renderBufferDirect=function(_,N,z,k,U,se){N===null&&(N=Je);let fe=U.isMesh&&U.matrixWorld.determinant()<0,Se=zc(_,N,z,k,U);ae.setMaterial(k,fe);let Ee=z.index,Fe=1;if(k.wireframe===!0){if(Ee=Q.getWireframeAttribute(z),Ee===void 0)return;Fe=2}let ze=z.drawRange,Te=z.attributes.position,Ze=ze.start*Fe,st=(ze.start+ze.count)*Fe;se!==null&&(Ze=Math.max(Ze,se.start*Fe),st=Math.min(st,(se.start+se.count)*Fe)),Ee!==null?(Ze=Math.max(Ze,0),st=Math.min(st,Ee.count)):Te!=null&&(Ze=Math.max(Ze,0),st=Math.min(st,Te.count));let rt=st-Ze;if(rt<0||rt===1/0)return;it.setup(U,k,Se,z,Ee);let Et,Ke=ye;if(Ee!==null&&(Et=K.get(Ee),Ke=Xe,Ke.setIndex(Et)),U.isMesh)k.wireframe===!0?(ae.setLineWidth(k.wireframeLinewidth*nt()),Ke.setMode(P.LINES)):Ke.setMode(P.TRIANGLES);else if(U.isLine){let Re=k.linewidth;Re===void 0&&(Re=1),ae.setLineWidth(Re*nt()),U.isLineSegments?Ke.setMode(P.LINES):U.isLineLoop?Ke.setMode(P.LINE_LOOP):Ke.setMode(P.LINE_STRIP)}else U.isPoints?Ke.setMode(P.POINTS):U.isSprite&&Ke.setMode(P.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)Ke.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(be.get("WEBGL_multi_draw"))Ke.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{let Re=U._multiDrawStarts,tn=U._multiDrawCounts,je=U._multiDrawCount,Ht=Ee?K.get(Ee).bytesPerElement:1,ti=Ae.get(k).currentProgram.getUniforms();for(let It=0;It<je;It++)ti.setValue(P,"_gl_DrawID",It),Ke.render(Re[It]/Ht,tn[It])}else if(U.isInstancedMesh)Ke.renderInstances(Ze,rt,U.count);else if(z.isInstancedBufferGeometry){let Re=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,tn=Math.min(z.instanceCount,Re);Ke.renderInstances(Ze,rt,tn)}else Ke.render(Ze,rt)};function Qe(_,N,z){_.transparent===!0&&_.side===hn&&_.forceSinglePass===!1?(_.side=Ct,_.needsUpdate=!0,cs(_,N,z),_.side=Rn,_.needsUpdate=!0,cs(_,N,z),_.side=hn):cs(_,N,z)}this.compile=function(_,N,z=null){z===null&&(z=_),h=qe.get(z),h.init(N),E.push(h),z.traverseVisible(function(U){U.isLight&&U.layers.test(N.layers)&&(h.pushLight(U),U.castShadow&&h.pushShadow(U))}),_!==z&&_.traverseVisible(function(U){U.isLight&&U.layers.test(N.layers)&&(h.pushLight(U),U.castShadow&&h.pushShadow(U))}),h.setupLights();let k=new Set;return _.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;let se=U.material;if(se)if(Array.isArray(se))for(let fe=0;fe<se.length;fe++){let Se=se[fe];Qe(Se,z,U),k.add(Se)}else Qe(se,z,U),k.add(se)}),E.pop(),h=null,k},this.compileAsync=function(_,N,z=null){let k=this.compile(_,N,z);return new Promise(U=>{function se(){if(k.forEach(function(fe){Ae.get(fe).currentProgram.isReady()&&k.delete(fe)}),k.size===0){U(_);return}setTimeout(se,10)}be.get("KHR_parallel_shader_compile")!==null?se():setTimeout(se,10)})};let Vt=null;function en(_){Vt&&Vt(_)}function Po(){Nn.stop()}function Lo(){Nn.start()}let Nn=new _c;Nn.setAnimationLoop(en),typeof self<"u"&&Nn.setContext(self),this.setAnimationLoop=function(_){Vt=_,q.setAnimationLoop(_),_===null?Nn.stop():Nn.start()},q.addEventListener("sessionstart",Po),q.addEventListener("sessionend",Lo),this.render=function(_,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),q.enabled===!0&&q.isPresenting===!0&&(q.cameraAutoUpdate===!0&&q.updateCamera(N),N=q.getCamera()),_.isScene===!0&&_.onBeforeRender(M,_,N,D),h=qe.get(_,E.length),h.init(N),E.push(h),Ie.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),L.setFromProjectionMatrix(Ie),pe=this.localClippingEnabled,G=ie.init(this.clippingPlanes,pe),p=xe.get(_,S.length),p.init(),S.push(p),q.enabled===!0&&q.isPresenting===!0){let se=M.xr.getDepthSensingMesh();se!==null&&mr(se,N,-1/0,M.sortObjects)}mr(_,N,0,M.sortObjects),p.finish(),M.sortObjects===!0&&p.sort(te,ce),Ge=q.enabled===!1||q.isPresenting===!1||q.hasDepthSensing()===!1,Ge&&Pe.addToRenderList(p,_),this.info.render.frame++,G===!0&&ie.beginShadows();let z=h.state.shadowsArray;_e.render(z,_,N),G===!0&&ie.endShadows(),this.info.autoReset===!0&&this.info.reset();let k=p.opaque,U=p.transmissive;if(h.setupLights(),N.isArrayCamera){let se=N.cameras;if(U.length>0)for(let fe=0,Se=se.length;fe<Se;fe++){let Ee=se[fe];Do(k,U,_,Ee)}Ge&&Pe.render(_);for(let fe=0,Se=se.length;fe<Se;fe++){let Ee=se[fe];No(p,_,Ee,Ee.viewport)}}else U.length>0&&Do(k,U,_,N),Ge&&Pe.render(_),No(p,_,N);D!==null&&(w.updateMultisampleRenderTarget(D),w.updateRenderTargetMipmap(D)),_.isScene===!0&&_.onAfterRender(M,_,N),it.resetDefaultState(),b=-1,y=null,E.pop(),E.length>0?(h=E[E.length-1],G===!0&&ie.setGlobalState(M.clippingPlanes,h.state.camera)):h=null,S.pop(),S.length>0?p=S[S.length-1]:p=null};function mr(_,N,z,k){if(_.visible===!1)return;if(_.layers.test(N.layers)){if(_.isGroup)z=_.renderOrder;else if(_.isLOD)_.autoUpdate===!0&&_.update(N);else if(_.isLight)h.pushLight(_),_.castShadow&&h.pushShadow(_);else if(_.isSprite){if(!_.frustumCulled||L.intersectsSprite(_)){k&&Oe.setFromMatrixPosition(_.matrixWorld).applyMatrix4(Ie);let fe=$.update(_),Se=_.material;Se.visible&&p.push(_,fe,Se,z,Oe.z,null)}}else if((_.isMesh||_.isLine||_.isPoints)&&(!_.frustumCulled||L.intersectsObject(_))){let fe=$.update(_),Se=_.material;if(k&&(_.boundingSphere!==void 0?(_.boundingSphere===null&&_.computeBoundingSphere(),Oe.copy(_.boundingSphere.center)):(fe.boundingSphere===null&&fe.computeBoundingSphere(),Oe.copy(fe.boundingSphere.center)),Oe.applyMatrix4(_.matrixWorld).applyMatrix4(Ie)),Array.isArray(Se)){let Ee=fe.groups;for(let Fe=0,ze=Ee.length;Fe<ze;Fe++){let Te=Ee[Fe],Ze=Se[Te.materialIndex];Ze&&Ze.visible&&p.push(_,fe,Ze,z,Oe.z,Te)}}else Se.visible&&p.push(_,fe,Se,z,Oe.z,null)}}let se=_.children;for(let fe=0,Se=se.length;fe<Se;fe++)mr(se[fe],N,z,k)}function No(_,N,z,k){let U=_.opaque,se=_.transmissive,fe=_.transparent;h.setupLightsView(z),G===!0&&ie.setGlobalState(M.clippingPlanes,z),k&&ae.viewport(C.copy(k)),U.length>0&&ls(U,N,z),se.length>0&&ls(se,N,z),fe.length>0&&ls(fe,N,z),ae.buffers.depth.setTest(!0),ae.buffers.depth.setMask(!0),ae.buffers.color.setMask(!0),ae.setPolygonOffset(!1)}function Do(_,N,z,k){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;h.state.transmissionRenderTarget[k.id]===void 0&&(h.state.transmissionRenderTarget[k.id]=new mn(1,1,{generateMipmaps:!0,type:be.has("EXT_color_buffer_half_float")||be.has("EXT_color_buffer_float")?ns:pn,minFilter:Xn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ye.workingColorSpace}));let se=h.state.transmissionRenderTarget[k.id],fe=k.viewport||C;se.setSize(fe.z,fe.w);let Se=M.getRenderTarget();M.setRenderTarget(se),M.getClearColor(X),J=M.getClearAlpha(),J<1&&M.setClearColor(16777215,.5),M.clear(),Ge&&Pe.render(z);let Ee=M.toneMapping;M.toneMapping=Cn;let Fe=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),h.setupLightsView(k),G===!0&&ie.setGlobalState(M.clippingPlanes,k),ls(_,z,k),w.updateMultisampleRenderTarget(se),w.updateRenderTargetMipmap(se),be.has("WEBGL_multisampled_render_to_texture")===!1){let ze=!1;for(let Te=0,Ze=N.length;Te<Ze;Te++){let st=N[Te],rt=st.object,Et=st.geometry,Ke=st.material,Re=st.group;if(Ke.side===hn&&rt.layers.test(k.layers)){let tn=Ke.side;Ke.side=Ct,Ke.needsUpdate=!0,Uo(rt,z,k,Et,Ke,Re),Ke.side=tn,Ke.needsUpdate=!0,ze=!0}}ze===!0&&(w.updateMultisampleRenderTarget(se),w.updateRenderTargetMipmap(se))}M.setRenderTarget(Se),M.setClearColor(X,J),Fe!==void 0&&(k.viewport=Fe),M.toneMapping=Ee}function ls(_,N,z){let k=N.isScene===!0?N.overrideMaterial:null;for(let U=0,se=_.length;U<se;U++){let fe=_[U],Se=fe.object,Ee=fe.geometry,Fe=k===null?fe.material:k,ze=fe.group;Se.layers.test(z.layers)&&Uo(Se,N,z,Ee,Fe,ze)}}function Uo(_,N,z,k,U,se){_.onBeforeRender(M,N,z,k,U,se),_.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,_.matrixWorld),_.normalMatrix.getNormalMatrix(_.modelViewMatrix),U.onBeforeRender(M,N,z,k,_,se),U.transparent===!0&&U.side===hn&&U.forceSinglePass===!1?(U.side=Ct,U.needsUpdate=!0,M.renderBufferDirect(z,N,k,U,_,se),U.side=Rn,U.needsUpdate=!0,M.renderBufferDirect(z,N,k,U,_,se),U.side=hn):M.renderBufferDirect(z,N,k,U,_,se),_.onAfterRender(M,N,z,k,U,se)}function cs(_,N,z){N.isScene!==!0&&(N=Je);let k=Ae.get(_),U=h.state.lights,se=h.state.shadowsArray,fe=U.state.version,Se=Ce.getParameters(_,U.state,se,N,z),Ee=Ce.getProgramCacheKey(Se),Fe=k.programs;k.environment=_.isMeshStandardMaterial?N.environment:null,k.fog=N.fog,k.envMap=(_.isMeshStandardMaterial?F:v).get(_.envMap||k.environment),k.envMapRotation=k.environment!==null&&_.envMap===null?N.environmentRotation:_.envMapRotation,Fe===void 0&&(_.addEventListener("dispose",Be),Fe=new Map,k.programs=Fe);let ze=Fe.get(Ee);if(ze!==void 0){if(k.currentProgram===ze&&k.lightsStateVersion===fe)return Oo(_,Se),ze}else Se.uniforms=Ce.getUniforms(_),_.onBeforeCompile(Se,M),ze=Ce.acquireProgram(Se,Ee),Fe.set(Ee,ze),k.uniforms=Se.uniforms;let Te=k.uniforms;return(!_.isShaderMaterial&&!_.isRawShaderMaterial||_.clipping===!0)&&(Te.clippingPlanes=ie.uniform),Oo(_,Se),k.needsLights=Vc(_),k.lightsStateVersion=fe,k.needsLights&&(Te.ambientLightColor.value=U.state.ambient,Te.lightProbe.value=U.state.probe,Te.directionalLights.value=U.state.directional,Te.directionalLightShadows.value=U.state.directionalShadow,Te.spotLights.value=U.state.spot,Te.spotLightShadows.value=U.state.spotShadow,Te.rectAreaLights.value=U.state.rectArea,Te.ltc_1.value=U.state.rectAreaLTC1,Te.ltc_2.value=U.state.rectAreaLTC2,Te.pointLights.value=U.state.point,Te.pointLightShadows.value=U.state.pointShadow,Te.hemisphereLights.value=U.state.hemi,Te.directionalShadowMap.value=U.state.directionalShadowMap,Te.directionalShadowMatrix.value=U.state.directionalShadowMatrix,Te.spotShadowMap.value=U.state.spotShadowMap,Te.spotLightMatrix.value=U.state.spotLightMatrix,Te.spotLightMap.value=U.state.spotLightMap,Te.pointShadowMap.value=U.state.pointShadowMap,Te.pointShadowMatrix.value=U.state.pointShadowMatrix),k.currentProgram=ze,k.uniformsList=null,ze}function Fo(_){if(_.uniformsList===null){let N=_.currentProgram.getUniforms();_.uniformsList=bi.seqWithValue(N.seq,_.uniforms)}return _.uniformsList}function Oo(_,N){let z=Ae.get(_);z.outputColorSpace=N.outputColorSpace,z.batching=N.batching,z.batchingColor=N.batchingColor,z.instancing=N.instancing,z.instancingColor=N.instancingColor,z.instancingMorph=N.instancingMorph,z.skinning=N.skinning,z.morphTargets=N.morphTargets,z.morphNormals=N.morphNormals,z.morphColors=N.morphColors,z.morphTargetsCount=N.morphTargetsCount,z.numClippingPlanes=N.numClippingPlanes,z.numIntersection=N.numClipIntersection,z.vertexAlphas=N.vertexAlphas,z.vertexTangents=N.vertexTangents,z.toneMapping=N.toneMapping}function zc(_,N,z,k,U){N.isScene!==!0&&(N=Je),w.resetTextureUnits();let se=N.fog,fe=k.isMeshStandardMaterial?N.environment:null,Se=D===null?M.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:Pi,Ee=(k.isMeshStandardMaterial?F:v).get(k.envMap||fe),Fe=k.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,ze=!!z.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Te=!!z.morphAttributes.position,Ze=!!z.morphAttributes.normal,st=!!z.morphAttributes.color,rt=Cn;k.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(rt=M.toneMapping);let Et=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,Ke=Et!==void 0?Et.length:0,Re=Ae.get(k),tn=h.state.lights;if(G===!0&&(pe===!0||_!==y)){let Ft=_===y&&k.id===b;ie.setState(k,_,Ft)}let je=!1;k.version===Re.__version?(Re.needsLights&&Re.lightsStateVersion!==tn.state.version||Re.outputColorSpace!==Se||U.isBatchedMesh&&Re.batching===!1||!U.isBatchedMesh&&Re.batching===!0||U.isBatchedMesh&&Re.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&Re.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&Re.instancing===!1||!U.isInstancedMesh&&Re.instancing===!0||U.isSkinnedMesh&&Re.skinning===!1||!U.isSkinnedMesh&&Re.skinning===!0||U.isInstancedMesh&&Re.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Re.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&Re.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&Re.instancingMorph===!1&&U.morphTexture!==null||Re.envMap!==Ee||k.fog===!0&&Re.fog!==se||Re.numClippingPlanes!==void 0&&(Re.numClippingPlanes!==ie.numPlanes||Re.numIntersection!==ie.numIntersection)||Re.vertexAlphas!==Fe||Re.vertexTangents!==ze||Re.morphTargets!==Te||Re.morphNormals!==Ze||Re.morphColors!==st||Re.toneMapping!==rt||Re.morphTargetsCount!==Ke)&&(je=!0):(je=!0,Re.__version=k.version);let Ht=Re.currentProgram;je===!0&&(Ht=cs(k,N,U));let ti=!1,It=!1,Ui=!1,at=Ht.getUniforms(),$t=Re.uniforms;if(ae.useProgram(Ht.program)&&(ti=!0,It=!0,Ui=!0),k.id!==b&&(b=k.id,It=!0),ti||y!==_){ae.buffers.depth.getReversed()?(ne.copy(_.projectionMatrix),Jh(ne),Kh(ne),at.setValue(P,"projectionMatrix",ne)):at.setValue(P,"projectionMatrix",_.projectionMatrix),at.setValue(P,"viewMatrix",_.matrixWorldInverse);let xn=at.map.cameraPosition;xn!==void 0&&xn.setValue(P,Le.setFromMatrixPosition(_.matrixWorld)),H.logarithmicDepthBuffer&&at.setValue(P,"logDepthBufFC",2/(Math.log(_.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&at.setValue(P,"isOrthographic",_.isOrthographicCamera===!0),y!==_&&(y=_,It=!0,Ui=!0)}if(U.isSkinnedMesh){at.setOptional(P,U,"bindMatrix"),at.setOptional(P,U,"bindMatrixInverse");let Ft=U.skeleton;Ft&&(Ft.boneTexture===null&&Ft.computeBoneTexture(),at.setValue(P,"boneTexture",Ft.boneTexture,w))}U.isBatchedMesh&&(at.setOptional(P,U,"batchingTexture"),at.setValue(P,"batchingTexture",U._matricesTexture,w),at.setOptional(P,U,"batchingIdTexture"),at.setValue(P,"batchingIdTexture",U._indirectTexture,w),at.setOptional(P,U,"batchingColorTexture"),U._colorsTexture!==null&&at.setValue(P,"batchingColorTexture",U._colorsTexture,w));let Fi=z.morphAttributes;if((Fi.position!==void 0||Fi.normal!==void 0||Fi.color!==void 0)&&Ue.update(U,z,Ht),(It||Re.receiveShadow!==U.receiveShadow)&&(Re.receiveShadow=U.receiveShadow,at.setValue(P,"receiveShadow",U.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&($t.envMap.value=Ee,$t.flipEnvMap.value=Ee.isCubeTexture&&Ee.isRenderTargetTexture===!1?-1:1),k.isMeshStandardMaterial&&k.envMap===null&&N.environment!==null&&($t.envMapIntensity.value=N.environmentIntensity),It&&(at.setValue(P,"toneMappingExposure",M.toneMappingExposure),Re.needsLights&&kc($t,Ui),se&&k.fog===!0&&ue.refreshFogUniforms($t,se),ue.refreshMaterialUniforms($t,k,V,ee,h.state.transmissionRenderTarget[_.id]),bi.upload(P,Fo(Re),$t,w)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(bi.upload(P,Fo(Re),$t,w),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&at.setValue(P,"center",U.center),at.setValue(P,"modelViewMatrix",U.modelViewMatrix),at.setValue(P,"normalMatrix",U.normalMatrix),at.setValue(P,"modelMatrix",U.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){let Ft=k.uniformsGroups;for(let xn=0,_n=Ft.length;xn<_n;xn++){let Bo=Ft[xn];I.update(Bo,Ht),I.bind(Bo,Ht)}}return Ht}function kc(_,N){_.ambientLightColor.needsUpdate=N,_.lightProbe.needsUpdate=N,_.directionalLights.needsUpdate=N,_.directionalLightShadows.needsUpdate=N,_.pointLights.needsUpdate=N,_.pointLightShadows.needsUpdate=N,_.spotLights.needsUpdate=N,_.spotLightShadows.needsUpdate=N,_.rectAreaLights.needsUpdate=N,_.hemisphereLights.needsUpdate=N}function Vc(_){return _.isMeshLambertMaterial||_.isMeshToonMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isShadowMaterial||_.isShaderMaterial&&_.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(_,N,z){Ae.get(_.texture).__webglTexture=N,Ae.get(_.depthTexture).__webglTexture=z;let k=Ae.get(_);k.__hasExternalTextures=!0,k.__autoAllocateDepthBuffer=z===void 0,k.__autoAllocateDepthBuffer||be.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),k.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(_,N){let z=Ae.get(_);z.__webglFramebuffer=N,z.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(_,N=0,z=0){D=_,T=N,A=z;let k=!0,U=null,se=!1,fe=!1;if(_){let Ee=Ae.get(_);if(Ee.__useDefaultFramebuffer!==void 0)ae.bindFramebuffer(P.FRAMEBUFFER,null),k=!1;else if(Ee.__webglFramebuffer===void 0)w.setupRenderTarget(_);else if(Ee.__hasExternalTextures)w.rebindTextures(_,Ae.get(_.texture).__webglTexture,Ae.get(_.depthTexture).__webglTexture);else if(_.depthBuffer){let Te=_.depthTexture;if(Ee.__boundDepthTexture!==Te){if(Te!==null&&Ae.has(Te)&&(_.width!==Te.image.width||_.height!==Te.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");w.setupDepthRenderbuffer(_)}}let Fe=_.texture;(Fe.isData3DTexture||Fe.isDataArrayTexture||Fe.isCompressedArrayTexture)&&(fe=!0);let ze=Ae.get(_).__webglFramebuffer;_.isWebGLCubeRenderTarget?(Array.isArray(ze[N])?U=ze[N][z]:U=ze[N],se=!0):_.samples>0&&w.useMultisampledRTT(_)===!1?U=Ae.get(_).__webglMultisampledFramebuffer:Array.isArray(ze)?U=ze[z]:U=ze,C.copy(_.viewport),W.copy(_.scissor),B=_.scissorTest}else C.copy(ge).multiplyScalar(V).floor(),W.copy(we).multiplyScalar(V).floor(),B=De;if(ae.bindFramebuffer(P.FRAMEBUFFER,U)&&k&&ae.drawBuffers(_,U),ae.viewport(C),ae.scissor(W),ae.setScissorTest(B),se){let Ee=Ae.get(_.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+N,Ee.__webglTexture,z)}else if(fe){let Ee=Ae.get(_.texture),Fe=N||0;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,Ee.__webglTexture,z||0,Fe)}b=-1},this.readRenderTargetPixels=function(_,N,z,k,U,se,fe){if(!(_&&_.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=Ae.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&fe!==void 0&&(Se=Se[fe]),Se){ae.bindFramebuffer(P.FRAMEBUFFER,Se);try{let Ee=_.texture,Fe=Ee.format,ze=Ee.type;if(!H.textureFormatReadable(Fe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!H.textureTypeReadable(ze)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=_.width-k&&z>=0&&z<=_.height-U&&P.readPixels(N,z,k,U,Ve.convert(Fe),Ve.convert(ze),se)}finally{let Ee=D!==null?Ae.get(D).__webglFramebuffer:null;ae.bindFramebuffer(P.FRAMEBUFFER,Ee)}}},this.readRenderTargetPixelsAsync=async function(_,N,z,k,U,se,fe){if(!(_&&_.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Se=Ae.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&fe!==void 0&&(Se=Se[fe]),Se){let Ee=_.texture,Fe=Ee.format,ze=Ee.type;if(!H.textureFormatReadable(Fe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!H.textureTypeReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=_.width-k&&z>=0&&z<=_.height-U){ae.bindFramebuffer(P.FRAMEBUFFER,Se);let Te=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Te),P.bufferData(P.PIXEL_PACK_BUFFER,se.byteLength,P.STREAM_READ),P.readPixels(N,z,k,U,Ve.convert(Fe),Ve.convert(ze),0);let Ze=D!==null?Ae.get(D).__webglFramebuffer:null;ae.bindFramebuffer(P.FRAMEBUFFER,Ze);let st=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await $h(P,st,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Te),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,se),P.deleteBuffer(Te),P.deleteSync(st),se}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(_,N=null,z=0){_.isTexture!==!0&&(Hi("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,_=arguments[1]);let k=Math.pow(2,-z),U=Math.floor(_.image.width*k),se=Math.floor(_.image.height*k),fe=N!==null?N.x:0,Se=N!==null?N.y:0;w.setTexture2D(_,0),P.copyTexSubImage2D(P.TEXTURE_2D,z,0,0,fe,Se,U,se),ae.unbindTexture()},this.copyTextureToTexture=function(_,N,z=null,k=null,U=0){_.isTexture!==!0&&(Hi("WebGLRenderer: copyTextureToTexture function signature has changed."),k=arguments[0]||null,_=arguments[1],N=arguments[2],U=arguments[3]||0,z=null);let se,fe,Se,Ee,Fe,ze,Te,Ze,st,rt=_.isCompressedTexture?_.mipmaps[U]:_.image;z!==null?(se=z.max.x-z.min.x,fe=z.max.y-z.min.y,Se=z.isBox3?z.max.z-z.min.z:1,Ee=z.min.x,Fe=z.min.y,ze=z.isBox3?z.min.z:0):(se=rt.width,fe=rt.height,Se=rt.depth||1,Ee=0,Fe=0,ze=0),k!==null?(Te=k.x,Ze=k.y,st=k.z):(Te=0,Ze=0,st=0);let Et=Ve.convert(N.format),Ke=Ve.convert(N.type),Re;N.isData3DTexture?(w.setTexture3D(N,0),Re=P.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(w.setTexture2DArray(N,0),Re=P.TEXTURE_2D_ARRAY):(w.setTexture2D(N,0),Re=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,N.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,N.unpackAlignment);let tn=P.getParameter(P.UNPACK_ROW_LENGTH),je=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Ht=P.getParameter(P.UNPACK_SKIP_PIXELS),ti=P.getParameter(P.UNPACK_SKIP_ROWS),It=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,rt.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,rt.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Ee),P.pixelStorei(P.UNPACK_SKIP_ROWS,Fe),P.pixelStorei(P.UNPACK_SKIP_IMAGES,ze);let Ui=_.isDataArrayTexture||_.isData3DTexture,at=N.isDataArrayTexture||N.isData3DTexture;if(_.isRenderTargetTexture||_.isDepthTexture){let $t=Ae.get(_),Fi=Ae.get(N),Ft=Ae.get($t.__renderTarget),xn=Ae.get(Fi.__renderTarget);ae.bindFramebuffer(P.READ_FRAMEBUFFER,Ft.__webglFramebuffer),ae.bindFramebuffer(P.DRAW_FRAMEBUFFER,xn.__webglFramebuffer);for(let _n=0;_n<Se;_n++)Ui&&P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Ae.get(_).__webglTexture,U,ze+_n),_.isDepthTexture?(at&&P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Ae.get(N).__webglTexture,U,st+_n),P.blitFramebuffer(Ee,Fe,se,fe,Te,Ze,se,fe,P.DEPTH_BUFFER_BIT,P.NEAREST)):at?P.copyTexSubImage3D(Re,U,Te,Ze,st+_n,Ee,Fe,se,fe):P.copyTexSubImage2D(Re,U,Te,Ze,st+_n,Ee,Fe,se,fe);ae.bindFramebuffer(P.READ_FRAMEBUFFER,null),ae.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else at?_.isDataTexture||_.isData3DTexture?P.texSubImage3D(Re,U,Te,Ze,st,se,fe,Se,Et,Ke,rt.data):N.isCompressedArrayTexture?P.compressedTexSubImage3D(Re,U,Te,Ze,st,se,fe,Se,Et,rt.data):P.texSubImage3D(Re,U,Te,Ze,st,se,fe,Se,Et,Ke,rt):_.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,U,Te,Ze,se,fe,Et,Ke,rt.data):_.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,U,Te,Ze,rt.width,rt.height,Et,rt.data):P.texSubImage2D(P.TEXTURE_2D,U,Te,Ze,se,fe,Et,Ke,rt);P.pixelStorei(P.UNPACK_ROW_LENGTH,tn),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,je),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Ht),P.pixelStorei(P.UNPACK_SKIP_ROWS,ti),P.pixelStorei(P.UNPACK_SKIP_IMAGES,It),U===0&&N.generateMipmaps&&P.generateMipmap(Re),ae.unbindTexture()},this.copyTextureToTexture3D=function(_,N,z=null,k=null,U=0){return _.isTexture!==!0&&(Hi("WebGLRenderer: copyTextureToTexture3D function signature has changed."),z=arguments[0]||null,k=arguments[1]||null,_=arguments[2],N=arguments[3],U=arguments[4]||0),Hi('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(_,N,z,k,U)},this.initRenderTarget=function(_){Ae.get(_).__webglFramebuffer===void 0&&w.setupRenderTarget(_)},this.initTexture=function(_){_.isCubeTexture?w.setTextureCube(_,0):_.isData3DTexture?w.setTexture3D(_,0):_.isDataArrayTexture||_.isCompressedArrayTexture?w.setTexture2DArray(_,0):w.setTexture2D(_,0),ae.unbindTexture()},this.resetState=function(){T=0,A=0,D=null,ae.reset(),it.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorspace=Ye._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ye._getUnpackColorSpace()}};var nr=class extends Dt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new gn,this.environmentIntensity=1,this.environmentRotation=new gn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}};var ji=class extends Ln{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new We(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},ir=new O,sr=new O,Jl=new ht,Vi=new Ai,Ls=new Zn,Zr=new O,Kl=new O,Qi=class extends Dt{constructor(e=new Rt,t=new ji){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)ir.fromBufferAttribute(t,s-1),sr.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=ir.distanceTo(sr);e.setAttribute("lineDistance",new wt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ls.copy(n.boundingSphere),Ls.applyMatrix4(s),Ls.radius+=r,e.ray.intersectsSphere(Ls)===!1)return;Jl.copy(s).invert(),Vi.copy(e.ray).applyMatrix4(Jl);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){let m=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let x=m,p=g-1;x<p;x+=c){let h=u.getX(x),S=u.getX(x+1),E=Ns(this,e,Vi,l,h,S);E&&t.push(E)}if(this.isLineLoop){let x=u.getX(g-1),p=u.getX(m),h=Ns(this,e,Vi,l,x,p);h&&t.push(h)}}else{let m=Math.max(0,a.start),g=Math.min(f.count,a.start+a.count);for(let x=m,p=g-1;x<p;x+=c){let h=Ns(this,e,Vi,l,x,x+1);h&&t.push(h)}if(this.isLineLoop){let x=Ns(this,e,Vi,l,g-1,m);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Ns(i,e,t,n,s,r){let a=i.geometry.attributes.position;if(ir.fromBufferAttribute(a,s),sr.fromBufferAttribute(a,r),t.distanceSqToSegment(ir,sr,Zr,Kl)>n)return;Zr.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(Zr);if(!(l<e.near||l>e.far))return{distance:l,point:Kl.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}var es=class extends Ln{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new We(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},jl=new ht,Ka=new Ai,Ds=new Zn,Us=new O,rr=class extends Dt{constructor(e=new Rt,t=new es){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ds.copy(n.boundingSphere),Ds.applyMatrix4(s),Ds.radius+=r,e.ray.intersectsSphere(Ds)===!1)return;jl.copy(s).invert(),Ka.copy(e.ray).applyMatrix4(jl);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){let f=Math.max(0,a.start),m=Math.min(c.count,a.start+a.count);for(let g=f,x=m;g<x;g++){let p=c.getX(g);Us.fromBufferAttribute(d,p),Ql(Us,p,l,s,e,t,this)}}else{let f=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let g=f,x=m;g<x;g++)Us.fromBufferAttribute(d,g),Ql(Us,g,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Ql(i,e,t,n,s,r,a){let o=Ka.distanceSqToPoint(i);if(o<t){let l=new O;Ka.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var ts=class i extends Rt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,u=[],d=new O,f=new O,m=[],g=[],x=[],p=[];for(let h=0;h<=n;h++){let S=[],E=h/n,M=0;h===0&&a===0?M=.5/t:h===n&&l===Math.PI&&(M=-.5/t);for(let R=0;R<=t;R++){let T=R/t;d.x=-e*Math.cos(s+T*r)*Math.sin(a+E*o),d.y=e*Math.cos(a+E*o),d.z=e*Math.sin(s+T*r)*Math.sin(a+E*o),g.push(d.x,d.y,d.z),f.copy(d).normalize(),x.push(f.x,f.y,f.z),p.push(T+M,1-E),S.push(c++)}u.push(S)}for(let h=0;h<n;h++)for(let S=0;S<t;S++){let E=u[h][S+1],M=u[h][S],R=u[h+1][S],T=u[h+1][S+1];(h!==0||a>0)&&m.push(E,M,T),(h!==n-1||l<Math.PI)&&m.push(M,R,T)}this.setIndex(m),this.setAttribute("position",new wt(g,3)),this.setAttribute("normal",new wt(x,3)),this.setAttribute("uv",new wt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};function Fs(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function qm(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var Ii=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},ja=class extends Ii{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Qo,endingEnd:Qo}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case el:r=e,o=2*t-n;break;case tl:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case el:a=e,l=2*n-t;break;case tl:a=1,l=n+s[1]-s[0];break;default:a=e-1,l=t}let c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,m=this._weightNext,g=(n-t)/(s-t),x=g*g,p=x*g,h=-f*p+2*f*x-f*g,S=(1+f)*p+(-1.5-2*f)*x+(-.5+f)*g+1,E=(-1-m)*p+(1.5+m)*x+.5*g,M=m*p-m*x;for(let R=0;R!==o;++R)r[R]=h*a[u+R]+S*a[c+R]+E*a[l+R]+M*a[d+R];return r}},Qa=class extends Ii{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(n-t)/(s-t),d=1-u;for(let f=0;f!==o;++f)r[f]=a[c+f]*d+a[l+f]*u;return r}},eo=class extends Ii{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},Zt=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Fs(t,this.TimeBufferType),this.values=Fs(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Fs(e.times,Array),values:Fs(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new eo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Qa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ja(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Hs:t=this.InterpolantFactoryMethodDiscrete;break;case Da:t=this.InterpolantFactoryMethodLinear;break;case br:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Hs;case this.InterpolantFactoryMethodLinear:return Da;case this.InterpolantFactoryMethodSmooth:return br}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&qm(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===br,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(s)l=!0;else{let d=o*n,f=d-n,m=d+n;for(let g=0;g!==n;++g){let x=t[d+g];if(x!==t[f+g]||x!==t[m+g]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let d=o*n,f=a*n;for(let m=0;m!==n;++m)t[f+m]=t[d+m]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};Zt.prototype.TimeBufferType=Float32Array;Zt.prototype.ValueBufferType=Float32Array;Zt.prototype.DefaultInterpolation=Da;var $n=class extends Zt{constructor(e,t,n){super(e,t,n)}};$n.prototype.ValueTypeName="bool";$n.prototype.ValueBufferType=Array;$n.prototype.DefaultInterpolation=Hs;$n.prototype.InterpolantFactoryMethodLinear=void 0;$n.prototype.InterpolantFactoryMethodSmooth=void 0;var to=class extends Zt{};to.prototype.ValueTypeName="color";var no=class extends Zt{};no.prototype.ValueTypeName="number";var io=class extends Ii{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(s-t),c=e*o;for(let u=c+o;c!==u;c+=4)Pn.slerpFlat(r,0,a,c-o,a,c,l);return r}},ar=class extends Zt{InterpolantFactoryMethodLinear(e){return new io(this.times,this.values,this.getValueSize(),e)}};ar.prototype.ValueTypeName="quaternion";ar.prototype.InterpolantFactoryMethodSmooth=void 0;var Jn=class extends Zt{constructor(e,t,n){super(e,t,n)}};Jn.prototype.ValueTypeName="string";Jn.prototype.ValueBufferType=Array;Jn.prototype.DefaultInterpolation=Hs;Jn.prototype.InterpolantFactoryMethodLinear=void 0;Jn.prototype.InterpolantFactoryMethodSmooth=void 0;var so=class extends Zt{};so.prototype.ValueTypeName="vector";var ro=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){let d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,f=c.length;d<f;d+=2){let m=c[d],g=c[d+1];if(m.global&&(m.lastIndex=0),m.test(u))return g}return null}}},Ym=new ro,ao=class{constructor(e){this.manager=e!==void 0?e:Ym,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};ao.DEFAULT_MATERIAL_NAME="__DEFAULT";var _o="\\[\\]\\.:\\/",Zm=new RegExp("["+_o+"]","g"),yo="[^"+_o+"]",$m="[^"+_o.replace("\\.","")+"]",Jm=/((?:WC+[\/:])*)/.source.replace("WC",yo),Km=/(WCOD+)?/.source.replace("WCOD",$m),jm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",yo),Qm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",yo),e1=new RegExp("^"+Jm+Km+jm+Qm+"$"),t1=["material","materials","bones","map"],oo=class{constructor(e,t,n){let s=n||ot.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},ot=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Zm,"")}static parseTrackName(e){let t=e1.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);t1.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[s];if(a===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ot.Composite=oo;ot.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ot.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ot.prototype.GetterByBindingType=[ot.prototype._getValue_direct,ot.prototype._getValue_array,ot.prototype._getValue_arrayElement,ot.prototype._getValue_toArray];ot.prototype.SetterByBindingTypeAndVersioning=[[ot.prototype._setValue_direct,ot.prototype._setValue_direct_setNeedsUpdate,ot.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ot.prototype._setValue_array,ot.prototype._setValue_array_setNeedsUpdate,ot.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ot.prototype._setValue_arrayElement,ot.prototype._setValue_arrayElement_setNeedsUpdate,ot.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ot.prototype._setValue_fromArray,ot.prototype._setValue_fromArray_setNeedsUpdate,ot.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var a0=new Float32Array(1);var ec=new ht,or=class{constructor(e,t,n=0,s=1/0){this.ray=new Ai(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new $i,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return ec.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ec),this}intersectObject(e,t=!0,n=[]){return lo(e,this,n,t),n.sort(tc),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)lo(e[s],this,n,t);return n.sort(tc),n}};function tc(i,e){return i.distance-e.distance}function lo(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let a=0,o=r.length;a<o;a++)lo(r[a],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"170"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="170");var ur={points:[[-82,-151.5],[-82,-149.6],[-82,-147.7],[-82,-145.8],[-82,-143.9],[-82,-142],[-82,-140.1],[-82,-138.2],[-82,-136.3],[-82,-134.4],[-82,-132.5],[-82,-130.6],[-82,-128.7],[-82,-126.8],[-82,-124.9],[-82,-123],[-82,-121.1],[-82,-119.2],[-82,-117.3],[-82,-115.4],[-82,-113.5],[-82,-111.6],[-82,-109.7],[-82,-107.8],[-82,-105.9],[-82,-104],[-82,-102.1],[-82,-100.2],[-82,-98.3],[-82,-96.4],[-82,-94.5],[-82,-92.6],[-82,-90.7],[-82,-88.8],[-82,-86.9],[-82,-85],[-82,-83.1],[-82,-81.2],[-82,-79.3],[-82,-77.4],[-82,-75.5],[-82,-73.6],[-82,-71.7],[-82,-69.8],[-82,-67.9],[-82,-66],[-82,-64.1],[-82,-62.2],[-82,-50.8],[-82,-48.9],[-82,-47],[-82,-45.1],[-82,-41.3],[-82,-39.4],[-82,-37.5],[-82,-35.6],[-82,-33.7],[-82,-31.8],[-82,-29.9],[-82,-28],[-82,-26.1],[-82,-24.2],[-82,-22.3],[-82,-20.4],[-82,-18.5],[-82,-16.6],[-82,-14.7],[-82,-12.8],[-82,-10.9],[-82,-9],[-82,-7.1],[-82,-5.2],[-82,-3.3],[-82,-1.4],[-82,.5],[-82,2.4],[-82,4.3],[-82,6.2],[-82,8.1],[-82,10],[-82,11.9],[-82,13.8],[-82,15.7],[-82,17.6],[-82,19.5],[-82,21.4],[-82,23.3],[-82,25.2],[-82,27.1],[-82,29],[-82,30.9],[-82,32.8],[-82,34.7],[-82,36.6],[-82,38.5],[-82,40.4],[-82,42.3],[-82,44.2],[-82,46.1],[-82,48],[-82,49.9],[-82,51.8],[-82,53.7],[-82,55.6],[-82,57.5],[-82,59.4],[-82,61.3],[-82,63.2],[-82,65.1],[-82,67],[-82,68.9],[-82,70.8],[-82,72.7],[-82,74.6],[-82,76.5],[-82,78.4],[-82,80.3],[-82,82.2],[-82,84.1],[-82,86],[-82,87.9],[-82,89.8],[-82,91.7],[-82,93.6],[-82,95.5],[-82,97.4],[-82,99.3],[-82,101.2],[-82,103.1],[-82,105],[-82,106.9],[-82,108.8],[-82,110.7],[-82,112.6],[-82,114.5],[-82,116.4],[-82,118.3],[-82,120.2],[-82,122.1],[-82,124],[-82,125.9],[-82,127.8],[-82,129.7],[-82,131.6],[-82,133.5],[-82,135.4],[-82,137.3],[-82,139.2],[-82,141.1],[-82,143],[-82,144.9],[-82,146.8],[-82,148.7],[-82,150.6],[-82,152.5],[-82,154.4],[-82,156.3],[-82,158.2],[-82,160.1],[-82,162],[-80.1,-144.85],[-80.1,-142.95],[-80.1,-141.05],[-80.1,-139.15],[-80.1,-137.25],[-80.1,-135.35],[-80.1,-133.45],[-80.1,-131.55],[-80.1,-129.65],[-80.1,-127.75],[-80.1,-125.85],[-80.1,-123.95],[-80.1,-122.05],[-80.1,-120.15],[-80.1,-118.25],[-80.1,-116.35],[-80.1,-114.45],[-80.1,-112.55],[-80.1,-110.65],[-80.1,-108.75],[-80.1,-106.85],[-80.1,-104.95],[-80.1,-103.05],[-80.1,-101.15],[-80.1,-99.25],[-80.1,-97.35],[-80.1,-95.45],[-80.1,-93.55],[-80.1,-91.65],[-80.1,-89.75],[-80.1,-87.85],[-80.1,-85.95],[-80.1,-84.05],[-80.1,-82.15],[-80.1,-80.25],[-80.1,-78.35],[-80.1,-76.45],[-80.1,-61.25],[-80.1,-51.75],[-80.1,-49.85],[-80.1,-47.95],[-80.1,-46.05],[-80.1,-44.15],[-80.1,-28.95],[-80.1,-27.05],[-80.1,-25.15],[-80.1,-23.25],[-80.1,-21.35],[-80.1,-19.45],[-80.1,-17.55],[-80.1,-15.65],[-80.1,-13.75],[-80.1,-11.85],[-80.1,-9.95],[-80.1,-8.05],[-80.1,-6.15],[-80.1,-4.25],[-80.1,-2.35],[-80.1,-.45],[-80.1,1.45],[-80.1,3.35],[-80.1,5.25],[-80.1,7.15],[-80.1,9.05],[-80.1,10.95],[-80.1,12.85],[-80.1,14.75],[-80.1,16.65],[-80.1,18.55],[-80.1,20.45],[-80.1,22.35],[-80.1,24.25],[-80.1,26.15],[-80.1,28.05],[-80.1,29.95],[-80.1,31.85],[-80.1,33.75],[-80.1,35.65],[-80.1,37.55],[-80.1,39.45],[-80.1,41.35],[-80.1,43.25],[-80.1,45.15],[-80.1,47.05],[-80.1,48.95],[-80.1,50.85],[-80.1,52.75],[-80.1,54.65],[-80.1,56.55],[-80.1,58.45],[-80.1,60.35],[-80.1,62.25],[-80.1,64.15],[-80.1,66.05],[-80.1,67.95],[-80.1,69.85],[-80.1,71.75],[-80.1,73.65],[-80.1,75.55],[-80.1,77.45],[-80.1,79.35],[-80.1,81.25],[-80.1,83.15],[-80.1,85.05],[-80.1,86.95],[-80.1,88.85],[-80.1,90.75],[-80.1,92.65],[-80.1,94.55],[-80.1,96.45],[-80.1,98.35],[-80.1,100.25],[-80.1,102.15],[-80.1,104.05],[-80.1,105.95],[-80.1,107.85],[-80.1,109.75],[-80.1,111.65],[-80.1,113.55],[-80.1,115.45],[-80.1,117.35],[-80.1,119.25],[-80.1,121.15],[-80.1,123.05],[-80.1,124.95],[-80.1,126.85],[-80.1,128.75],[-80.1,130.65],[-80.1,132.55],[-80.1,134.45],[-80.1,136.35],[-80.1,138.25],[-80.1,140.15],[-80.1,142.05],[-80.1,143.95],[-80.1,145.85],[-80.1,147.75],[-80.1,149.65],[-80.1,151.55],[-80.1,153.45],[-80.1,155.35],[-80.1,157.25],[-80.1,159.15],[-78.2,-157.2],[-78.2,-155.3],[-78.2,-153.4],[-78.2,-151.5],[-78.2,-149.6],[-78.2,-147.7],[-78.2,-145.8],[-78.2,-143.9],[-78.2,-142],[-78.2,-140.1],[-78.2,-138.2],[-78.2,-136.3],[-78.2,-134.4],[-78.2,-132.5],[-78.2,-130.6],[-78.2,-128.7],[-78.2,-126.8],[-78.2,-124.9],[-78.2,-123],[-78.2,-121.1],[-78.2,-119.2],[-78.2,-117.3],[-78.2,-115.4],[-78.2,-113.5],[-78.2,-111.6],[-78.2,-109.7],[-78.2,-107.8],[-78.2,-105.9],[-78.2,-104],[-78.2,-102.1],[-78.2,-100.2],[-78.2,-98.3],[-78.2,-96.4],[-78.2,-94.5],[-78.2,-92.6],[-78.2,-90.7],[-78.2,-88.8],[-78.2,-86.9],[-78.2,-85],[-78.2,-83.1],[-78.2,-81.2],[-78.2,-79.3],[-78.2,-77.4],[-78.2,-48.9],[-78.2,-47],[-78.2,-45.1],[-78.2,-33.7],[-78.2,-31.8],[-78.2,-29.9],[-78.2,-28],[-78.2,-26.1],[-78.2,-24.2],[-78.2,-22.3],[-78.2,-20.4],[-78.2,-18.5],[-78.2,-16.6],[-78.2,-14.7],[-78.2,-12.8],[-78.2,-10.9],[-78.2,-9],[-78.2,-7.1],[-78.2,-5.2],[-78.2,-3.3],[-78.2,-1.4],[-78.2,.5],[-78.2,2.4],[-78.2,4.3],[-78.2,6.2],[-78.2,8.1],[-78.2,10],[-78.2,11.9],[-78.2,13.8],[-78.2,15.7],[-78.2,17.6],[-78.2,19.5],[-78.2,21.4],[-78.2,23.3],[-78.2,25.2],[-78.2,27.1],[-78.2,29],[-78.2,30.9],[-78.2,32.8],[-78.2,34.7],[-78.2,36.6],[-78.2,38.5],[-78.2,40.4],[-78.2,42.3],[-78.2,44.2],[-78.2,46.1],[-78.2,48],[-78.2,49.9],[-78.2,51.8],[-78.2,53.7],[-78.2,55.6],[-78.2,57.5],[-78.2,59.4],[-78.2,61.3],[-78.2,63.2],[-78.2,65.1],[-78.2,67],[-78.2,68.9],[-78.2,70.8],[-78.2,72.7],[-78.2,74.6],[-78.2,76.5],[-78.2,78.4],[-78.2,80.3],[-78.2,82.2],[-78.2,84.1],[-78.2,86],[-78.2,87.9],[-78.2,89.8],[-78.2,91.7],[-78.2,93.6],[-78.2,95.5],[-78.2,97.4],[-78.2,99.3],[-78.2,101.2],[-78.2,103.1],[-78.2,105],[-78.2,106.9],[-78.2,108.8],[-78.2,110.7],[-78.2,112.6],[-78.2,114.5],[-78.2,116.4],[-78.2,118.3],[-78.2,120.2],[-78.2,122.1],[-78.2,124],[-78.2,125.9],[-78.2,127.8],[-78.2,129.7],[-78.2,131.6],[-78.2,133.5],[-78.2,135.4],[-78.2,137.3],[-78.2,139.2],[-78.2,141.1],[-78.2,143],[-78.2,144.9],[-78.2,146.8],[-78.2,148.7],[-78.2,150.6],[-78.2,152.5],[-78.2,154.4],[-78.2,156.3],[-78.2,158.2],[-78.2,160.1],[-78.2,162],[-78.2,163.9],[-76.3,-144.85],[-76.3,-142.95],[-76.3,-141.05],[-76.3,-139.15],[-76.3,-137.25],[-76.3,-135.35],[-76.3,-133.45],[-76.3,-131.55],[-76.3,-129.65],[-76.3,-127.75],[-76.3,-125.85],[-76.3,-123.95],[-76.3,-122.05],[-76.3,-120.15],[-76.3,-118.25],[-76.3,-116.35],[-76.3,-114.45],[-76.3,-112.55],[-76.3,-110.65],[-76.3,-108.75],[-76.3,-106.85],[-76.3,-104.95],[-76.3,-103.05],[-76.3,-101.15],[-76.3,-99.25],[-76.3,-97.35],[-76.3,-95.45],[-76.3,-93.55],[-76.3,-91.65],[-76.3,-89.75],[-76.3,-87.85],[-76.3,-85.95],[-76.3,-84.05],[-76.3,-82.15],[-76.3,-80.25],[-76.3,-78.35],[-76.3,-76.45],[-76.3,-74.55],[-76.3,-72.65],[-76.3,-70.75],[-76.3,-25.15],[-76.3,-23.25],[-76.3,-21.35],[-76.3,-19.45],[-76.3,-17.55],[-76.3,-15.65],[-76.3,-13.75],[-76.3,-11.85],[-76.3,-9.95],[-76.3,-8.05],[-76.3,-6.15],[-76.3,-4.25],[-76.3,-2.35],[-76.3,-.45],[-76.3,1.45],[-76.3,3.35],[-76.3,5.25],[-76.3,7.15],[-76.3,9.05],[-76.3,10.95],[-76.3,12.85],[-76.3,14.75],[-76.3,16.65],[-76.3,18.55],[-76.3,20.45],[-76.3,22.35],[-76.3,24.25],[-76.3,26.15],[-76.3,28.05],[-76.3,29.95],[-76.3,31.85],[-76.3,33.75],[-76.3,35.65],[-76.3,37.55],[-76.3,39.45],[-76.3,41.35],[-76.3,43.25],[-76.3,45.15],[-76.3,47.05],[-76.3,48.95],[-76.3,50.85],[-76.3,52.75],[-76.3,54.65],[-76.3,56.55],[-76.3,58.45],[-76.3,60.35],[-76.3,62.25],[-76.3,64.15],[-76.3,66.05],[-76.3,67.95],[-76.3,69.85],[-76.3,71.75],[-76.3,73.65],[-76.3,75.55],[-76.3,77.45],[-76.3,79.35],[-76.3,81.25],[-76.3,83.15],[-76.3,85.05],[-76.3,86.95],[-76.3,88.85],[-76.3,90.75],[-76.3,92.65],[-76.3,94.55],[-76.3,96.45],[-76.3,98.35],[-76.3,100.25],[-76.3,102.15],[-76.3,104.05],[-76.3,105.95],[-76.3,107.85],[-76.3,109.75],[-76.3,111.65],[-76.3,113.55],[-76.3,115.45],[-76.3,117.35],[-76.3,119.25],[-76.3,121.15],[-76.3,123.05],[-76.3,124.95],[-76.3,126.85],[-76.3,128.75],[-76.3,130.65],[-76.3,132.55],[-76.3,134.45],[-76.3,136.35],[-76.3,138.25],[-76.3,140.15],[-76.3,142.05],[-76.3,143.95],[-76.3,145.85],[-76.3,147.75],[-76.3,149.65],[-76.3,151.55],[-76.3,153.45],[-76.3,155.35],[-76.3,157.25],[-76.3,159.15],[-76.3,161.05],[-76.3,162.95],[-74.4,-134.4],[-74.4,-132.5],[-74.4,-128.7],[-74.4,-119.2],[-74.4,-117.3],[-74.4,-115.4],[-74.4,-113.5],[-74.4,-100.2],[-74.4,-98.3],[-74.4,-96.4],[-74.4,-94.5],[-74.4,-92.6],[-74.4,-90.7],[-74.4,-88.8],[-74.4,-86.9],[-74.4,-85],[-74.4,-83.1],[-74.4,-81.2],[-74.4,-79.3],[-74.4,-77.4],[-74.4,-75.5],[-74.4,-73.6],[-74.4,-71.7],[-74.4,-69.8],[-74.4,-67.9],[-74.4,-66],[-74.4,-64.1],[-74.4,-62.2],[-74.4,-14.7],[-74.4,-12.8],[-74.4,-10.9],[-74.4,-9],[-74.4,-7.1],[-74.4,-5.2],[-74.4,-3.3],[-74.4,-1.4],[-74.4,.5],[-74.4,2.4],[-74.4,4.3],[-74.4,6.2],[-74.4,8.1],[-74.4,10],[-74.4,11.9],[-74.4,13.8],[-74.4,15.7],[-74.4,17.6],[-74.4,19.5],[-74.4,21.4],[-74.4,23.3],[-74.4,25.2],[-74.4,27.1],[-74.4,29],[-74.4,30.9],[-74.4,32.8],[-74.4,34.7],[-74.4,36.6],[-74.4,38.5],[-74.4,40.4],[-74.4,42.3],[-74.4,44.2],[-74.4,46.1],[-74.4,48],[-74.4,49.9],[-74.4,51.8],[-74.4,53.7],[-74.4,55.6],[-74.4,57.5],[-74.4,59.4],[-74.4,61.3],[-74.4,63.2],[-74.4,65.1],[-74.4,67],[-74.4,68.9],[-74.4,70.8],[-74.4,72.7],[-74.4,74.6],[-74.4,76.5],[-74.4,78.4],[-74.4,80.3],[-74.4,82.2],[-74.4,84.1],[-74.4,86],[-74.4,87.9],[-74.4,89.8],[-74.4,91.7],[-74.4,93.6],[-74.4,95.5],[-74.4,97.4],[-74.4,99.3],[-74.4,101.2],[-74.4,103.1],[-74.4,105],[-74.4,106.9],[-74.4,108.8],[-74.4,110.7],[-74.4,112.6],[-74.4,114.5],[-74.4,116.4],[-74.4,118.3],[-74.4,120.2],[-74.4,122.1],[-74.4,124],[-74.4,125.9],[-74.4,127.8],[-74.4,129.7],[-74.4,131.6],[-74.4,133.5],[-74.4,135.4],[-74.4,137.3],[-74.4,139.2],[-74.4,141.1],[-74.4,143],[-74.4,144.9],[-74.4,146.8],[-74.4,148.7],[-74.4,150.6],[-74.4,152.5],[-74.4,154.4],[-74.4,156.3],[-74.4,158.2],[-74.4,160.1],[-74.4,162],[-74.4,163.9],[-74.4,165.8],[-72.5,-66.95],[-72.5,-65.05],[-72.5,-63.15],[-72.5,-61.25],[-72.5,-11.85],[-72.5,-9.95],[-72.5,-8.05],[-72.5,-6.15],[-72.5,-4.25],[-72.5,-2.35],[-72.5,-.45],[-72.5,1.45],[-72.5,3.35],[-72.5,5.25],[-72.5,7.15],[-72.5,9.05],[-72.5,10.95],[-72.5,12.85],[-72.5,14.75],[-72.5,16.65],[-72.5,18.55],[-72.5,20.45],[-72.5,22.35],[-72.5,24.25],[-72.5,26.15],[-72.5,28.05],[-72.5,29.95],[-72.5,31.85],[-72.5,33.75],[-72.5,35.65],[-72.5,37.55],[-72.5,39.45],[-72.5,41.35],[-72.5,43.25],[-72.5,45.15],[-72.5,47.05],[-72.5,48.95],[-72.5,50.85],[-72.5,52.75],[-72.5,54.65],[-72.5,56.55],[-72.5,58.45],[-72.5,60.35],[-72.5,62.25],[-72.5,64.15],[-72.5,66.05],[-72.5,67.95],[-72.5,69.85],[-72.5,71.75],[-72.5,73.65],[-72.5,75.55],[-72.5,77.45],[-72.5,79.35],[-72.5,81.25],[-72.5,83.15],[-72.5,85.05],[-72.5,86.95],[-72.5,88.85],[-72.5,90.75],[-72.5,92.65],[-72.5,94.55],[-72.5,96.45],[-72.5,98.35],[-72.5,100.25],[-72.5,102.15],[-72.5,104.05],[-72.5,105.95],[-72.5,107.85],[-72.5,109.75],[-72.5,111.65],[-72.5,113.55],[-72.5,115.45],[-72.5,117.35],[-72.5,119.25],[-72.5,121.15],[-72.5,123.05],[-72.5,124.95],[-72.5,126.85],[-72.5,128.75],[-72.5,130.65],[-72.5,132.55],[-72.5,134.45],[-72.5,136.35],[-72.5,138.25],[-72.5,140.15],[-72.5,142.05],[-72.5,143.95],[-72.5,145.85],[-72.5,147.75],[-72.5,149.65],[-72.5,151.55],[-72.5,153.45],[-72.5,155.35],[-72.5,157.25],[-72.5,159.15],[-72.5,161.05],[-72.5,162.95],[-72.5,164.85],[-72.5,166.75],[-72.5,168.65],[-70.6,-71.7],[-70.6,-69.8],[-70.6,-67.9],[-70.6,-66],[-70.6,-64.1],[-70.6,-62.2],[-70.6,6.2],[-70.6,8.1],[-70.6,10],[-70.6,13.8],[-70.6,15.7],[-70.6,17.6],[-70.6,19.5],[-70.6,21.4],[-70.6,23.3],[-70.6,25.2],[-70.6,27.1],[-70.6,29],[-70.6,30.9],[-70.6,32.8],[-70.6,34.7],[-70.6,36.6],[-70.6,38.5],[-70.6,40.4],[-70.6,42.3],[-70.6,44.2],[-70.6,46.1],[-70.6,48],[-70.6,49.9],[-70.6,51.8],[-70.6,53.7],[-70.6,55.6],[-70.6,57.5],[-70.6,59.4],[-70.6,61.3],[-70.6,63.2],[-70.6,65.1],[-70.6,67],[-70.6,74.6],[-70.6,76.5],[-70.6,78.4],[-70.6,80.3],[-70.6,82.2],[-70.6,84.1],[-70.6,86],[-70.6,87.9],[-70.6,89.8],[-70.6,91.7],[-70.6,93.6],[-70.6,95.5],[-70.6,97.4],[-70.6,99.3],[-70.6,101.2],[-70.6,103.1],[-70.6,105],[-70.6,106.9],[-70.6,108.8],[-70.6,110.7],[-70.6,112.6],[-70.6,114.5],[-70.6,116.4],[-70.6,118.3],[-70.6,120.2],[-70.6,122.1],[-70.6,124],[-70.6,125.9],[-70.6,127.8],[-70.6,129.7],[-70.6,131.6],[-70.6,133.5],[-70.6,135.4],[-70.6,137.3],[-70.6,139.2],[-70.6,141.1],[-70.6,143],[-70.6,144.9],[-70.6,146.8],[-70.6,148.7],[-70.6,150.6],[-70.6,152.5],[-70.6,154.4],[-70.6,156.3],[-70.6,158.2],[-70.6,160.1],[-68.7,-66.95],[-68.7,-65.05],[-68.7,33.75],[-68.7,43.25],[-68.7,45.15],[-68.7,47.05],[-68.7,48.95],[-68.7,50.85],[-68.7,52.75],[-68.7,54.65],[-68.7,56.55],[-68.7,58.45],[-68.7,60.35],[-68.7,62.25],[-68.7,64.15],[-68.7,66.05],[-68.7,67.95],[-68.7,79.35],[-68.7,81.25],[-68.7,83.15],[-68.7,85.05],[-68.7,86.95],[-68.7,88.85],[-68.7,90.75],[-68.7,92.65],[-68.7,94.55],[-68.7,96.45],[-68.7,98.35],[-68.7,100.25],[-68.7,102.15],[-68.7,104.05],[-68.7,105.95],[-68.7,107.85],[-68.7,109.75],[-68.7,111.65],[-68.7,113.55],[-68.7,115.45],[-68.7,117.35],[-68.7,119.25],[-68.7,121.15],[-68.7,123.05],[-68.7,124.95],[-68.7,126.85],[-68.7,128.75],[-68.7,130.65],[-68.7,132.55],[-68.7,134.45],[-68.7,136.35],[-68.7,138.25],[-68.7,140.15],[-68.7,142.05],[-68.7,143.95],[-68.7,145.85],[-68.7,147.75],[-68.7,149.65],[-66.8,-66],[-66.8,51.8],[-66.8,53.7],[-66.8,55.6],[-66.8,57.5],[-66.8,87.9],[-66.8,101.2],[-66.8,103.1],[-66.8,105],[-66.8,110.7],[-66.8,112.6],[-66.8,114.5],[-66.8,116.4],[-66.8,122.1],[-66.8,124],[-66.8,125.9],[-66.8,127.8],[-66.8,129.7],[-66.8,131.6],[-66.8,133.5],[-66.8,135.4],[-66.8,143],[-64.9,-63.15],[-55.4,-67.9],[-53.5,-68.85],[-51.6,-73.6],[-51.6,-71.7],[-51.6,-69.8],[-51.6,-60.3],[-51.6,-58.4],[-49.7,-74.55],[-49.7,-72.65],[-49.7,-70.75],[-49.7,-68.85],[-49.7,69.85],[-47.8,-73.6],[-47.8,-71.7],[-47.8,-69.8],[-47.8,-67.9],[-47.8,-66],[-45.9,-74.55],[-45.9,-72.65],[-45.9,-70.75],[-45.9,-68.85],[-45.9,166.75],[-45.9,168.65],[-45.9,170.55],[-44,-71.7],[-44,-69.8],[-44,-67.9],[-44,-66],[-44,169.6],[-44,171.5],[-42.1,-72.65],[-42.1,-70.75],[-42.1,-68.85],[-42.1,-66.95],[-42.1,-65.05],[-42.1,145.85],[-42.1,147.75],[-42.1,172.45],[-40.2,-73.6],[-40.2,-71.7],[-40.2,-69.8],[-40.2,-67.9],[-40.2,-66],[-40.2,-64.1],[-40.2,175.3],[-38.3,-72.65],[-38.3,-70.75],[-38.3,-68.85],[-38.3,-66.95],[-38.3,-65.05],[-38.3,-63.15],[-38.3,-61.25],[-38.3,-59.35],[-38.3,142.05],[-38.3,143.95],[-38.3,145.85],[-38.3,176.25],[-38.3,178.15],[-36.4,-71.7],[-36.4,-69.8],[-36.4,-67.9],[-36.4,-66],[-36.4,-64.1],[-36.4,-62.2],[-36.4,-60.3],[-36.4,-58.4],[-36.4,141.1],[-36.4,143],[-36.4,144.9],[-36.4,146.8],[-36.4,148.7],[-34.5,-70.75],[-34.5,-68.85],[-34.5,-66.95],[-34.5,-65.05],[-34.5,-63.15],[-34.5,-61.25],[-34.5,-59.35],[-34.5,-55.55],[-34.5,20.45],[-34.5,117.35],[-34.5,119.25],[-34.5,138.25],[-34.5,140.15],[-34.5,142.05],[-34.5,143.95],[-34.5,145.85],[-34.5,147.75],[-34.5,149.65],[-32.6,-69.8],[-32.6,-67.9],[-32.6,-66],[-32.6,-64.1],[-32.6,-62.2],[-32.6,-60.3],[-32.6,-58.4],[-32.6,-56.5],[-32.6,-54.6],[-32.6,-52.7],[-32.6,19.5],[-32.6,21.4],[-32.6,23.3],[-32.6,25.2],[-32.6,27.1],[-32.6,116.4],[-32.6,118.3],[-32.6,120.2],[-32.6,122.1],[-32.6,124],[-32.6,135.4],[-32.6,137.3],[-32.6,139.2],[-32.6,141.1],[-32.6,143],[-32.6,144.9],[-32.6,146.8],[-32.6,148.7],[-32.6,150.6],[-30.7,-70.75],[-30.7,-68.85],[-30.7,-66.95],[-30.7,-65.05],[-30.7,-63.15],[-30.7,-61.25],[-30.7,-59.35],[-30.7,-57.45],[-30.7,-55.55],[-30.7,-53.65],[-30.7,-51.75],[-30.7,18.55],[-30.7,20.45],[-30.7,22.35],[-30.7,24.25],[-30.7,26.15],[-30.7,28.05],[-30.7,29.95],[-30.7,115.45],[-30.7,117.35],[-30.7,119.25],[-30.7,121.15],[-30.7,123.05],[-30.7,124.95],[-30.7,126.85],[-30.7,128.75],[-30.7,130.65],[-30.7,132.55],[-30.7,134.45],[-30.7,136.35],[-30.7,138.25],[-30.7,140.15],[-30.7,142.05],[-30.7,143.95],[-30.7,145.85],[-30.7,147.75],[-30.7,149.65],[-30.7,151.55],[-28.8,-69.8],[-28.8,-67.9],[-28.8,-66],[-28.8,-64.1],[-28.8,-62.2],[-28.8,-60.3],[-28.8,-58.4],[-28.8,-56.5],[-28.8,-54.6],[-28.8,-52.7],[-28.8,-50.8],[-28.8,17.6],[-28.8,19.5],[-28.8,21.4],[-28.8,23.3],[-28.8,25.2],[-28.8,27.1],[-28.8,29],[-28.8,30.9],[-28.8,116.4],[-28.8,118.3],[-28.8,120.2],[-28.8,122.1],[-28.8,124],[-28.8,125.9],[-28.8,127.8],[-28.8,129.7],[-28.8,131.6],[-28.8,133.5],[-28.8,135.4],[-28.8,137.3],[-28.8,139.2],[-28.8,141.1],[-28.8,143],[-28.8,144.9],[-28.8,146.8],[-28.8,148.7],[-28.8,150.6],[-28.8,152.5],[-26.9,-70.75],[-26.9,-68.85],[-26.9,-66.95],[-26.9,-65.05],[-26.9,-63.15],[-26.9,-61.25],[-26.9,-59.35],[-26.9,-57.45],[-26.9,-55.55],[-26.9,-53.65],[-26.9,-51.75],[-26.9,-49.85],[-26.9,16.65],[-26.9,18.55],[-26.9,20.45],[-26.9,22.35],[-26.9,24.25],[-26.9,26.15],[-26.9,28.05],[-26.9,29.95],[-26.9,31.85],[-26.9,115.45],[-26.9,117.35],[-26.9,119.25],[-26.9,121.15],[-26.9,123.05],[-26.9,124.95],[-26.9,126.85],[-26.9,128.75],[-26.9,130.65],[-26.9,132.55],[-26.9,134.45],[-26.9,136.35],[-26.9,138.25],[-26.9,140.15],[-26.9,142.05],[-26.9,143.95],[-26.9,145.85],[-26.9,147.75],[-26.9,149.65],[-26.9,151.55],[-25,-69.8],[-25,-67.9],[-25,-66],[-25,-64.1],[-25,-62.2],[-25,-60.3],[-25,-58.4],[-25,-56.5],[-25,-54.6],[-25,-52.7],[-25,-50.8],[-25,-48.9],[-25,15.7],[-25,17.6],[-25,19.5],[-25,21.4],[-25,23.3],[-25,25.2],[-25,27.1],[-25,29],[-25,30.9],[-25,32.8],[-25,44.2],[-25,46.1],[-25,114.5],[-25,116.4],[-25,118.3],[-25,120.2],[-25,122.1],[-25,124],[-25,125.9],[-25,127.8],[-25,129.7],[-25,131.6],[-25,133.5],[-25,135.4],[-25,137.3],[-25,139.2],[-25,141.1],[-25,143],[-25,144.9],[-25,146.8],[-25,148.7],[-25,150.6],[-25,152.5],[-23.1,-68.85],[-23.1,-66.95],[-23.1,-65.05],[-23.1,-63.15],[-23.1,-61.25],[-23.1,-59.35],[-23.1,-57.45],[-23.1,-55.55],[-23.1,-53.65],[-23.1,-51.75],[-23.1,-49.85],[-23.1,-47.95],[-23.1,-46.05],[-23.1,-44.15],[-23.1,14.75],[-23.1,16.65],[-23.1,18.55],[-23.1,20.45],[-23.1,22.35],[-23.1,24.25],[-23.1,26.15],[-23.1,28.05],[-23.1,29.95],[-23.1,31.85],[-23.1,33.75],[-23.1,45.15],[-23.1,47.05],[-23.1,115.45],[-23.1,117.35],[-23.1,119.25],[-23.1,121.15],[-23.1,123.05],[-23.1,124.95],[-23.1,126.85],[-23.1,128.75],[-23.1,130.65],[-23.1,132.55],[-23.1,134.45],[-23.1,136.35],[-23.1,138.25],[-23.1,140.15],[-23.1,142.05],[-23.1,143.95],[-23.1,145.85],[-23.1,147.75],[-23.1,149.65],[-21.2,-69.8],[-21.2,-67.9],[-21.2,-66],[-21.2,-64.1],[-21.2,-62.2],[-21.2,-60.3],[-21.2,-58.4],[-21.2,-56.5],[-21.2,-54.6],[-21.2,-52.7],[-21.2,-50.8],[-21.2,-48.9],[-21.2,-47],[-21.2,-45.1],[-21.2,-43.2],[-21.2,-41.3],[-21.2,13.8],[-21.2,15.7],[-21.2,17.6],[-21.2,19.5],[-21.2,21.4],[-21.2,23.3],[-21.2,25.2],[-21.2,27.1],[-21.2,29],[-21.2,30.9],[-21.2,32.8],[-21.2,34.7],[-21.2,44.2],[-21.2,46.1],[-21.2,48],[-21.2,116.4],[-21.2,118.3],[-21.2,120.2],[-21.2,122.1],[-21.2,124],[-21.2,125.9],[-21.2,127.8],[-21.2,129.7],[-21.2,131.6],[-21.2,133.5],[-21.2,135.4],[-21.2,137.3],[-21.2,139.2],[-21.2,141.1],[-21.2,143],[-21.2,144.9],[-21.2,146.8],[-21.2,148.7],[-21.2,165.8],[-19.3,-68.85],[-19.3,-66.95],[-19.3,-65.05],[-19.3,-63.15],[-19.3,-61.25],[-19.3,-59.35],[-19.3,-57.45],[-19.3,-55.55],[-19.3,-53.65],[-19.3,-51.75],[-19.3,-49.85],[-19.3,-47.95],[-19.3,-46.05],[-19.3,-44.15],[-19.3,-42.25],[-19.3,-40.35],[-19.3,12.85],[-19.3,14.75],[-19.3,16.65],[-19.3,18.55],[-19.3,20.45],[-19.3,22.35],[-19.3,24.25],[-19.3,26.15],[-19.3,28.05],[-19.3,29.95],[-19.3,31.85],[-19.3,33.75],[-19.3,45.15],[-19.3,47.05],[-19.3,48.95],[-19.3,123.05],[-19.3,124.95],[-19.3,126.85],[-19.3,128.75],[-19.3,130.65],[-19.3,132.55],[-19.3,134.45],[-19.3,136.35],[-19.3,138.25],[-19.3,140.15],[-19.3,142.05],[-19.3,143.95],[-19.3,145.85],[-17.4,-69.8],[-17.4,-67.9],[-17.4,-66],[-17.4,-64.1],[-17.4,-62.2],[-17.4,-60.3],[-17.4,-58.4],[-17.4,-56.5],[-17.4,-54.6],[-17.4,-52.7],[-17.4,-50.8],[-17.4,-48.9],[-17.4,-47],[-17.4,-45.1],[-17.4,-43.2],[-17.4,-41.3],[-17.4,-39.4],[-17.4,11.9],[-17.4,13.8],[-17.4,15.7],[-17.4,17.6],[-17.4,19.5],[-17.4,21.4],[-17.4,23.3],[-17.4,25.2],[-17.4,27.1],[-17.4,29],[-17.4,30.9],[-17.4,32.8],[-17.4,34.7],[-17.4,36.6],[-17.4,44.2],[-17.4,46.1],[-17.4,48],[-17.4,124],[-17.4,125.9],[-17.4,127.8],[-17.4,129.7],[-17.4,131.6],[-17.4,133.5],[-17.4,135.4],[-17.4,137.3],[-17.4,139.2],[-17.4,141.1],[-17.4,143],[-17.4,144.9],[-15.5,-74.55],[-15.5,-72.65],[-15.5,-70.75],[-15.5,-68.85],[-15.5,-66.95],[-15.5,-65.05],[-15.5,-63.15],[-15.5,-61.25],[-15.5,-59.35],[-15.5,-57.45],[-15.5,-55.55],[-15.5,-53.65],[-15.5,-51.75],[-15.5,-49.85],[-15.5,-47.95],[-15.5,-46.05],[-15.5,-44.15],[-15.5,-42.25],[-15.5,-40.35],[-15.5,12.85],[-15.5,14.75],[-15.5,16.65],[-15.5,18.55],[-15.5,20.45],[-15.5,22.35],[-15.5,24.25],[-15.5,26.15],[-15.5,28.05],[-15.5,29.95],[-15.5,31.85],[-15.5,33.75],[-15.5,35.65],[-15.5,37.55],[-15.5,39.45],[-15.5,47.05],[-15.5,48.95],[-15.5,124.95],[-15.5,126.85],[-15.5,128.75],[-15.5,130.65],[-15.5,132.55],[-15.5,134.45],[-15.5,142.05],[-15.5,143.95],[-15.5,166.75],[-13.6,-75.5],[-13.6,-73.6],[-13.6,-71.7],[-13.6,-69.8],[-13.6,-67.9],[-13.6,-66],[-13.6,-64.1],[-13.6,-62.2],[-13.6,-60.3],[-13.6,-58.4],[-13.6,-56.5],[-13.6,-54.6],[-13.6,-52.7],[-13.6,-50.8],[-13.6,-48.9],[-13.6,-47],[-13.6,-45.1],[-13.6,-43.2],[-13.6,-41.3],[-13.6,-39.4],[-13.6,13.8],[-13.6,15.7],[-13.6,17.6],[-13.6,19.5],[-13.6,21.4],[-13.6,23.3],[-13.6,25.2],[-13.6,27.1],[-13.6,29],[-13.6,30.9],[-13.6,32.8],[-13.6,34.7],[-13.6,36.6],[-13.6,38.5],[-13.6,40.4],[-13.6,49.9],[-13.6,131.6],[-13.6,133.5],[-13.6,135.4],[-13.6,143],[-11.7,-76.45],[-11.7,-74.55],[-11.7,-72.65],[-11.7,-70.75],[-11.7,-68.85],[-11.7,-66.95],[-11.7,-65.05],[-11.7,-63.15],[-11.7,-61.25],[-11.7,-59.35],[-11.7,-57.45],[-11.7,-55.55],[-11.7,-53.65],[-11.7,-51.75],[-11.7,-49.85],[-11.7,-47.95],[-11.7,-46.05],[-11.7,-44.15],[-11.7,-42.25],[-11.7,-40.35],[-11.7,-38.45],[-11.7,14.75],[-11.7,16.65],[-11.7,18.55],[-11.7,20.45],[-11.7,22.35],[-11.7,24.25],[-11.7,26.15],[-11.7,28.05],[-11.7,29.95],[-11.7,31.85],[-11.7,33.75],[-11.7,35.65],[-11.7,37.55],[-11.7,39.45],[-11.7,142.05],[-9.8,-77.4],[-9.8,-75.5],[-9.8,-73.6],[-9.8,-71.7],[-9.8,-69.8],[-9.8,-67.9],[-9.8,-66],[-9.8,-64.1],[-9.8,-62.2],[-9.8,-60.3],[-9.8,-58.4],[-9.8,-56.5],[-9.8,-54.6],[-9.8,-52.7],[-9.8,-50.8],[-9.8,-48.9],[-9.8,-47],[-9.8,-45.1],[-9.8,-43.2],[-9.8,-41.3],[-9.8,-39.4],[-9.8,-37.5],[-9.8,13.8],[-9.8,15.7],[-9.8,17.6],[-9.8,19.5],[-9.8,21.4],[-9.8,23.3],[-9.8,25.2],[-9.8,27.1],[-9.8,29],[-9.8,30.9],[-9.8,32.8],[-9.8,34.7],[-9.8,36.6],[-9.8,38.5],[-9.8,120.2],[-9.8,124],[-9.8,148.7],[-9.8,160.1],[-7.9,-78.35],[-7.9,-76.45],[-7.9,-74.55],[-7.9,-72.65],[-7.9,-70.75],[-7.9,-68.85],[-7.9,-66.95],[-7.9,-65.05],[-7.9,-63.15],[-7.9,-61.25],[-7.9,-59.35],[-7.9,-57.45],[-7.9,-55.55],[-7.9,-53.65],[-7.9,-51.75],[-7.9,-49.85],[-7.9,-47.95],[-7.9,-46.05],[-7.9,-44.15],[-7.9,-42.25],[-7.9,-40.35],[-7.9,-38.45],[-7.9,-36.55],[-7.9,14.75],[-7.9,16.65],[-7.9,18.55],[-7.9,20.45],[-7.9,22.35],[-7.9,24.25],[-7.9,26.15],[-7.9,28.05],[-7.9,29.95],[-7.9,31.85],[-7.9,33.75],[-7.9,35.65],[-7.9,37.55],[-7.9,111.65],[-7.9,113.55],[-7.9,138.25],[-7.9,140.15],[-7.9,142.05],[-7.9,145.85],[-7.9,147.75],[-7.9,159.15],[-6,-79.3],[-6,-77.4],[-6,-75.5],[-6,-73.6],[-6,-71.7],[-6,-69.8],[-6,-67.9],[-6,-66],[-6,-64.1],[-6,-62.2],[-6,-60.3],[-6,-58.4],[-6,-56.5],[-6,-54.6],[-6,-52.7],[-6,-50.8],[-6,-48.9],[-6,-47],[-6,-45.1],[-6,-43.2],[-6,-41.3],[-6,-39.4],[-6,-37.5],[-6,-35.6],[-6,13.8],[-6,15.7],[-6,17.6],[-6,19.5],[-6,21.4],[-6,23.3],[-6,25.2],[-6,27.1],[-6,29],[-6,30.9],[-6,32.8],[-6,34.7],[-6,36.6],[-6,38.5],[-6,106.9],[-6,139.2],[-6,141.1],[-6,143],[-6,144.9],[-6,146.8],[-6,150.6],[-4.1,-80.25],[-4.1,-78.35],[-4.1,-76.45],[-4.1,-74.55],[-4.1,-72.65],[-4.1,-70.75],[-4.1,-68.85],[-4.1,-66.95],[-4.1,-65.05],[-4.1,-63.15],[-4.1,-61.25],[-4.1,-59.35],[-4.1,-57.45],[-4.1,-55.55],[-4.1,-53.65],[-4.1,-51.75],[-4.1,-49.85],[-4.1,-47.95],[-4.1,-46.05],[-4.1,-44.15],[-4.1,-42.25],[-4.1,-40.35],[-4.1,-38.45],[-4.1,12.85],[-4.1,14.75],[-4.1,16.65],[-4.1,18.55],[-4.1,20.45],[-4.1,22.35],[-4.1,24.25],[-4.1,26.15],[-4.1,28.05],[-4.1,29.95],[-4.1,31.85],[-4.1,33.75],[-4.1,35.65],[-4.1,37.55],[-4.1,39.45],[-4.1,104.05],[-4.1,136.35],[-4.1,138.25],[-4.1,140.15],[-4.1,142.05],[-4.1,143.95],[-2.2,-79.3],[-2.2,-77.4],[-2.2,-75.5],[-2.2,-73.6],[-2.2,-71.7],[-2.2,-69.8],[-2.2,-67.9],[-2.2,-66],[-2.2,-64.1],[-2.2,-62.2],[-2.2,-60.3],[-2.2,-58.4],[-2.2,-56.5],[-2.2,-54.6],[-2.2,-52.7],[-2.2,-50.8],[-2.2,-48.9],[-2.2,-47],[-2.2,-45.1],[-2.2,10],[-2.2,11.9],[-2.2,13.8],[-2.2,15.7],[-2.2,17.6],[-2.2,19.5],[-2.2,21.4],[-2.2,23.3],[-2.2,25.2],[-2.2,27.1],[-2.2,29],[-2.2,30.9],[-2.2,32.8],[-2.2,34.7],[-2.2,36.6],[-2.2,38.5],[-2.2,40.4],[-2.2,101.2],[-2.2,103.1],[-2.2,110.7],[-2.2,112.6],[-2.2,114.5],[-2.2,116.4],[-2.2,120.2],[-2.2,133.5],[-2.2,137.3],[-2.2,139.2],[-.3,-80.25],[-.3,-78.35],[-.3,-76.45],[-.3,-74.55],[-.3,-72.65],[-.3,-70.75],[-.3,-68.85],[-.3,-66.95],[-.3,-65.05],[-.3,-63.15],[-.3,-61.25],[-.3,-59.35],[-.3,-57.45],[-.3,-55.55],[-.3,-53.65],[-.3,-51.75],[-.3,-49.85],[-.3,10.95],[-.3,12.85],[-.3,14.75],[-.3,16.65],[-.3,18.55],[-.3,20.45],[-.3,22.35],[-.3,24.25],[-.3,26.15],[-.3,28.05],[-.3,29.95],[-.3,31.85],[-.3,33.75],[-.3,35.65],[-.3,37.55],[-.3,39.45],[-.3,41.35],[-.3,100.25],[-.3,102.15],[-.3,109.75],[-.3,111.65],[-.3,113.55],[-.3,115.45],[-.3,117.35],[1.6,-77.4],[1.6,-75.5],[1.6,-73.6],[1.6,-71.7],[1.6,-69.8],[1.6,-67.9],[1.6,-66],[1.6,-64.1],[1.6,-62.2],[1.6,-60.3],[1.6,-58.4],[1.6,-56.5],[1.6,-54.6],[1.6,-52.7],[1.6,-50.8],[1.6,10],[1.6,11.9],[1.6,13.8],[1.6,15.7],[1.6,17.6],[1.6,19.5],[1.6,21.4],[1.6,23.3],[1.6,25.2],[1.6,27.1],[1.6,29],[1.6,30.9],[1.6,32.8],[1.6,34.7],[1.6,36.6],[1.6,38.5],[1.6,40.4],[1.6,42.3],[1.6,44.2],[1.6,99.3],[1.6,101.2],[1.6,103.1],[1.6,110.7],[1.6,112.6],[1.6,114.5],[1.6,116.4],[1.6,127.8],[3.5,-76.45],[3.5,-74.55],[3.5,-72.65],[3.5,-70.75],[3.5,-68.85],[3.5,-66.95],[3.5,-65.05],[3.5,-63.15],[3.5,-61.25],[3.5,-59.35],[3.5,-57.45],[3.5,-55.55],[3.5,-53.65],[3.5,-51.75],[3.5,10.95],[3.5,12.85],[3.5,14.75],[3.5,16.65],[3.5,18.55],[3.5,20.45],[3.5,22.35],[3.5,24.25],[3.5,26.15],[3.5,28.05],[3.5,29.95],[3.5,31.85],[3.5,33.75],[3.5,35.65],[3.5,37.55],[3.5,39.45],[3.5,41.35],[3.5,43.25],[3.5,45.15],[3.5,47.05],[3.5,98.35],[3.5,102.15],[3.5,113.55],[3.5,115.45],[3.5,117.35],[5.4,-77.4],[5.4,-75.5],[5.4,-73.6],[5.4,-71.7],[5.4,-69.8],[5.4,-67.9],[5.4,-66],[5.4,-64.1],[5.4,-62.2],[5.4,-60.3],[5.4,-58.4],[5.4,-56.5],[5.4,-54.6],[5.4,-9],[5.4,-7.1],[5.4,-5.2],[5.4,-3.3],[5.4,-1.4],[5.4,6.2],[5.4,8.1],[5.4,10],[5.4,11.9],[5.4,13.8],[5.4,15.7],[5.4,17.6],[5.4,19.5],[5.4,21.4],[5.4,23.3],[5.4,25.2],[5.4,27.1],[5.4,29],[5.4,30.9],[5.4,32.8],[5.4,34.7],[5.4,36.6],[5.4,38.5],[5.4,40.4],[5.4,42.3],[5.4,44.2],[5.4,46.1],[5.4,48],[5.4,95.5],[5.4,101.2],[5.4,116.4],[5.4,118.3],[7.3,-76.45],[7.3,-74.55],[7.3,-72.65],[7.3,-70.75],[7.3,-68.85],[7.3,-66.95],[7.3,-65.05],[7.3,-63.15],[7.3,-61.25],[7.3,-59.35],[7.3,-11.85],[7.3,-9.95],[7.3,-8.05],[7.3,-6.15],[7.3,-4.25],[7.3,-2.35],[7.3,-.45],[7.3,1.45],[7.3,3.35],[7.3,5.25],[7.3,7.15],[7.3,9.05],[7.3,10.95],[7.3,12.85],[7.3,14.75],[7.3,16.65],[7.3,18.55],[7.3,20.45],[7.3,22.35],[7.3,24.25],[7.3,26.15],[7.3,28.05],[7.3,29.95],[7.3,31.85],[7.3,33.75],[7.3,35.65],[7.3,37.55],[7.3,39.45],[7.3,41.35],[7.3,43.25],[7.3,45.15],[7.3,47.05],[7.3,48.95],[7.3,81.25],[7.3,100.25],[7.3,124.95],[9.2,-83.1],[9.2,-79.3],[9.2,-75.5],[9.2,-73.6],[9.2,-69.8],[9.2,-67.9],[9.2,-66],[9.2,-64.1],[9.2,-62.2],[9.2,-12.8],[9.2,-10.9],[9.2,-9],[9.2,-7.1],[9.2,-5.2],[9.2,-3.3],[9.2,-1.4],[9.2,.5],[9.2,2.4],[9.2,4.3],[9.2,6.2],[9.2,8.1],[9.2,10],[9.2,11.9],[9.2,13.8],[9.2,15.7],[9.2,17.6],[9.2,19.5],[9.2,21.4],[9.2,23.3],[9.2,25.2],[9.2,27.1],[9.2,29],[9.2,30.9],[9.2,32.8],[9.2,34.7],[9.2,36.6],[9.2,38.5],[9.2,40.4],[9.2,42.3],[9.2,44.2],[9.2,46.1],[9.2,48],[9.2,49.9],[9.2,76.5],[9.2,78.4],[9.2,80.3],[9.2,99.3],[9.2,105],[9.2,118.3],[9.2,125.9],[11.1,-84.05],[11.1,-72.65],[11.1,-70.75],[11.1,-68.85],[11.1,-13.75],[11.1,-11.85],[11.1,-9.95],[11.1,-8.05],[11.1,-6.15],[11.1,-4.25],[11.1,-2.35],[11.1,-.45],[11.1,1.45],[11.1,3.35],[11.1,5.25],[11.1,7.15],[11.1,9.05],[11.1,10.95],[11.1,12.85],[11.1,14.75],[11.1,16.65],[11.1,18.55],[11.1,20.45],[11.1,22.35],[11.1,24.25],[11.1,26.15],[11.1,28.05],[11.1,29.95],[11.1,31.85],[11.1,33.75],[11.1,35.65],[11.1,37.55],[11.1,39.45],[11.1,41.35],[11.1,43.25],[11.1,48.95],[11.1,50.85],[11.1,77.45],[11.1,79.35],[11.1,104.05],[11.1,105.95],[11.1,107.85],[11.1,124.95],[13,-86.9],[13,-85],[13,-16.6],[13,-14.7],[13,-12.8],[13,-10.9],[13,-9],[13,-7.1],[13,-5.2],[13,-3.3],[13,-1.4],[13,.5],[13,2.4],[13,4.3],[13,6.2],[13,8.1],[13,10],[13,11.9],[13,13.8],[13,15.7],[13,17.6],[13,19.5],[13,21.4],[13,23.3],[13,25.2],[13,27.1],[13,29],[13,30.9],[13,32.8],[13,34.7],[13,36.6],[13,38.5],[13,40.4],[13,42.3],[13,44.2],[13,76.5],[13,78.4],[13,99.3],[13,101.2],[13,103.1],[13,105],[13,106.9],[13,108.8],[13,124],[14.9,-91.65],[14.9,-89.75],[14.9,-87.85],[14.9,-85.95],[14.9,-84.05],[14.9,-15.65],[14.9,-13.75],[14.9,-11.85],[14.9,-9.95],[14.9,-8.05],[14.9,-6.15],[14.9,-4.25],[14.9,-2.35],[14.9,-.45],[14.9,1.45],[14.9,3.35],[14.9,5.25],[14.9,7.15],[14.9,9.05],[14.9,10.95],[14.9,12.85],[14.9,14.75],[14.9,16.65],[14.9,18.55],[14.9,20.45],[14.9,22.35],[14.9,24.25],[14.9,26.15],[14.9,28.05],[14.9,29.95],[14.9,31.85],[14.9,33.75],[14.9,35.65],[14.9,37.55],[14.9,39.45],[14.9,43.25],[14.9,45.15],[14.9,47.05],[14.9,48.95],[14.9,75.55],[14.9,77.45],[14.9,79.35],[14.9,98.35],[14.9,100.25],[14.9,102.15],[14.9,104.05],[14.9,105.95],[14.9,107.85],[14.9,121.15],[16.8,-98.3],[16.8,-96.4],[16.8,-94.5],[16.8,-92.6],[16.8,-90.7],[16.8,-88.8],[16.8,-14.7],[16.8,-12.8],[16.8,-10.9],[16.8,-9],[16.8,-7.1],[16.8,-5.2],[16.8,-3.3],[16.8,-1.4],[16.8,.5],[16.8,2.4],[16.8,4.3],[16.8,6.2],[16.8,8.1],[16.8,10],[16.8,11.9],[16.8,13.8],[16.8,15.7],[16.8,17.6],[16.8,19.5],[16.8,21.4],[16.8,23.3],[16.8,25.2],[16.8,27.1],[16.8,29],[16.8,30.9],[16.8,32.8],[16.8,34.7],[16.8,36.6],[16.8,38.5],[16.8,44.2],[16.8,46.1],[16.8,48],[16.8,49.9],[16.8,51.8],[16.8,53.7],[16.8,74.6],[16.8,76.5],[16.8,78.4],[16.8,80.3],[16.8,95.5],[16.8,97.4],[16.8,99.3],[16.8,101.2],[16.8,103.1],[16.8,105],[16.8,106.9],[16.8,122.1],[18.7,-103.05],[18.7,-101.15],[18.7,-99.25],[18.7,-97.35],[18.7,-95.45],[18.7,-91.65],[18.7,-89.75],[18.7,-87.85],[18.7,-70.75],[18.7,-68.85],[18.7,-15.65],[18.7,-13.75],[18.7,-11.85],[18.7,-9.95],[18.7,-8.05],[18.7,-6.15],[18.7,-4.25],[18.7,-2.35],[18.7,-.45],[18.7,1.45],[18.7,3.35],[18.7,5.25],[18.7,7.15],[18.7,9.05],[18.7,10.95],[18.7,12.85],[18.7,14.75],[18.7,16.65],[18.7,18.55],[18.7,20.45],[18.7,22.35],[18.7,24.25],[18.7,26.15],[18.7,28.05],[18.7,29.95],[18.7,31.85],[18.7,33.75],[18.7,35.65],[18.7,41.35],[18.7,43.25],[18.7,45.15],[18.7,47.05],[18.7,48.95],[18.7,50.85],[18.7,52.75],[18.7,54.65],[18.7,56.55],[18.7,73.65],[18.7,75.55],[18.7,77.45],[18.7,79.35],[18.7,81.25],[18.7,83.15],[18.7,94.55],[18.7,96.45],[18.7,98.35],[18.7,100.25],[18.7,102.15],[18.7,104.05],[18.7,109.75],[20.6,-104],[20.6,-102.1],[20.6,-100.2],[20.6,-98.3],[20.6,-88.8],[20.6,-75.5],[20.6,-14.7],[20.6,-12.8],[20.6,-10.9],[20.6,-9],[20.6,-7.1],[20.6,-5.2],[20.6,-3.3],[20.6,-1.4],[20.6,.5],[20.6,2.4],[20.6,4.3],[20.6,6.2],[20.6,8.1],[20.6,10],[20.6,11.9],[20.6,13.8],[20.6,15.7],[20.6,17.6],[20.6,19.5],[20.6,21.4],[20.6,23.3],[20.6,25.2],[20.6,27.1],[20.6,29],[20.6,30.9],[20.6,32.8],[20.6,34.7],[20.6,36.6],[20.6,40.4],[20.6,42.3],[20.6,44.2],[20.6,46.1],[20.6,48],[20.6,49.9],[20.6,51.8],[20.6,53.7],[20.6,55.6],[20.6,57.5],[20.6,74.6],[20.6,76.5],[20.6,78.4],[20.6,80.3],[20.6,82.2],[20.6,84.1],[20.6,86],[20.6,93.6],[20.6,95.5],[20.6,97.4],[20.6,99.3],[20.6,101.2],[20.6,103.1],[20.6,105],[22.5,-104.95],[22.5,-103.05],[22.5,-101.15],[22.5,-99.25],[22.5,-84.05],[22.5,-80.25],[22.5,-78.35],[22.5,-15.65],[22.5,-13.75],[22.5,-11.85],[22.5,-9.95],[22.5,-8.05],[22.5,-6.15],[22.5,-4.25],[22.5,-2.35],[22.5,-.45],[22.5,1.45],[22.5,3.35],[22.5,5.25],[22.5,7.15],[22.5,9.05],[22.5,10.95],[22.5,12.85],[22.5,14.75],[22.5,16.65],[22.5,18.55],[22.5,20.45],[22.5,22.35],[22.5,24.25],[22.5,26.15],[22.5,28.05],[22.5,29.95],[22.5,31.85],[22.5,33.75],[22.5,35.65],[22.5,39.45],[22.5,41.35],[22.5,43.25],[22.5,45.15],[22.5,47.05],[22.5,48.95],[22.5,50.85],[22.5,52.75],[22.5,54.65],[22.5,56.55],[22.5,58.45],[22.5,69.85],[22.5,71.75],[22.5,73.65],[22.5,75.55],[22.5,77.45],[22.5,79.35],[22.5,81.25],[22.5,83.15],[22.5,85.05],[22.5,86.95],[22.5,88.85],[22.5,92.65],[22.5,94.55],[22.5,96.45],[22.5,98.35],[22.5,100.25],[22.5,102.15],[22.5,104.05],[22.5,105.95],[22.5,107.85],[22.5,109.75],[22.5,111.65],[22.5,113.55],[24.4,-105.9],[24.4,-104],[24.4,-102.1],[24.4,-100.2],[24.4,-98.3],[24.4,-14.7],[24.4,-12.8],[24.4,-10.9],[24.4,-9],[24.4,-7.1],[24.4,-5.2],[24.4,-3.3],[24.4,-1.4],[24.4,.5],[24.4,2.4],[24.4,4.3],[24.4,6.2],[24.4,8.1],[24.4,10],[24.4,11.9],[24.4,13.8],[24.4,15.7],[24.4,17.6],[24.4,19.5],[24.4,21.4],[24.4,23.3],[24.4,25.2],[24.4,27.1],[24.4,29],[24.4,30.9],[24.4,32.8],[24.4,34.7],[24.4,38.5],[24.4,40.4],[24.4,42.3],[24.4,44.2],[24.4,46.1],[24.4,48],[24.4,49.9],[24.4,55.6],[24.4,68.9],[24.4,70.8],[24.4,72.7],[24.4,74.6],[24.4,76.5],[24.4,78.4],[24.4,80.3],[24.4,82.2],[24.4,84.1],[24.4,86],[24.4,87.9],[24.4,89.8],[24.4,91.7],[24.4,93.6],[24.4,95.5],[24.4,97.4],[24.4,99.3],[24.4,101.2],[24.4,103.1],[24.4,105],[24.4,106.9],[24.4,108.8],[24.4,110.7],[24.4,112.6],[24.4,114.5],[24.4,116.4],[24.4,118.3],[26.3,-112.55],[26.3,-108.75],[26.3,-106.85],[26.3,-104.95],[26.3,-103.05],[26.3,-101.15],[26.3,-99.25],[26.3,-97.35],[26.3,-80.25],[26.3,-13.75],[26.3,-11.85],[26.3,-9.95],[26.3,-8.05],[26.3,-6.15],[26.3,-4.25],[26.3,-2.35],[26.3,-.45],[26.3,1.45],[26.3,3.35],[26.3,5.25],[26.3,7.15],[26.3,9.05],[26.3,10.95],[26.3,12.85],[26.3,14.75],[26.3,16.65],[26.3,18.55],[26.3,20.45],[26.3,22.35],[26.3,24.25],[26.3,26.15],[26.3,28.05],[26.3,29.95],[26.3,31.85],[26.3,33.75],[26.3,37.55],[26.3,39.45],[26.3,41.35],[26.3,43.25],[26.3,45.15],[26.3,47.05],[26.3,48.95],[26.3,58.45],[26.3,60.35],[26.3,62.25],[26.3,64.15],[26.3,66.05],[26.3,67.95],[26.3,69.85],[26.3,71.75],[26.3,73.65],[26.3,75.55],[26.3,77.45],[26.3,79.35],[26.3,81.25],[26.3,83.15],[26.3,85.05],[26.3,86.95],[26.3,88.85],[26.3,90.75],[26.3,92.65],[26.3,94.55],[26.3,96.45],[26.3,98.35],[26.3,100.25],[26.3,102.15],[26.3,104.05],[26.3,105.95],[26.3,107.85],[26.3,109.75],[26.3,111.65],[26.3,113.55],[26.3,115.45],[26.3,117.35],[26.3,119.25],[28.2,-113.5],[28.2,-109.7],[28.2,-107.8],[28.2,-105.9],[28.2,-104],[28.2,-102.1],[28.2,-100.2],[28.2,-98.3],[28.2,-81.2],[28.2,-10.9],[28.2,-9],[28.2,-7.1],[28.2,-5.2],[28.2,-3.3],[28.2,-1.4],[28.2,.5],[28.2,2.4],[28.2,4.3],[28.2,6.2],[28.2,8.1],[28.2,10],[28.2,11.9],[28.2,13.8],[28.2,15.7],[28.2,17.6],[28.2,19.5],[28.2,21.4],[28.2,23.3],[28.2,25.2],[28.2,27.1],[28.2,29],[28.2,30.9],[28.2,32.8],[28.2,34.7],[28.2,36.6],[28.2,38.5],[28.2,40.4],[28.2,42.3],[28.2,44.2],[28.2,46.1],[28.2,48],[28.2,51.8],[28.2,53.7],[28.2,55.6],[28.2,57.5],[28.2,59.4],[28.2,61.3],[28.2,63.2],[28.2,65.1],[28.2,67],[28.2,68.9],[28.2,70.8],[28.2,72.7],[28.2,74.6],[28.2,76.5],[28.2,78.4],[28.2,80.3],[28.2,82.2],[28.2,84.1],[28.2,86],[28.2,87.9],[28.2,89.8],[28.2,91.7],[28.2,93.6],[28.2,95.5],[28.2,97.4],[28.2,99.3],[28.2,101.2],[28.2,103.1],[28.2,105],[28.2,106.9],[28.2,108.8],[28.2,110.7],[28.2,112.6],[28.2,114.5],[28.2,116.4],[28.2,118.3],[28.2,120.2],[30.1,-112.55],[30.1,-110.65],[30.1,-108.75],[30.1,-106.85],[30.1,-104.95],[30.1,-103.05],[30.1,-101.15],[30.1,-99.25],[30.1,-97.35],[30.1,-95.45],[30.1,-93.55],[30.1,-91.65],[30.1,-89.75],[30.1,-84.05],[30.1,-82.15],[30.1,-8.05],[30.1,-6.15],[30.1,-4.25],[30.1,-2.35],[30.1,-.45],[30.1,1.45],[30.1,3.35],[30.1,5.25],[30.1,7.15],[30.1,9.05],[30.1,10.95],[30.1,12.85],[30.1,14.75],[30.1,16.65],[30.1,18.55],[30.1,20.45],[30.1,22.35],[30.1,24.25],[30.1,26.15],[30.1,28.05],[30.1,29.95],[30.1,31.85],[30.1,33.75],[30.1,35.65],[30.1,37.55],[30.1,39.45],[30.1,41.35],[30.1,43.25],[30.1,45.15],[30.1,47.05],[30.1,50.85],[30.1,52.75],[30.1,54.65],[30.1,56.55],[30.1,58.45],[30.1,60.35],[30.1,62.25],[30.1,64.15],[30.1,66.05],[30.1,67.95],[30.1,69.85],[30.1,71.75],[30.1,73.65],[30.1,75.55],[30.1,77.45],[30.1,79.35],[30.1,81.25],[30.1,83.15],[30.1,85.05],[30.1,86.95],[30.1,88.85],[30.1,90.75],[30.1,92.65],[30.1,94.55],[30.1,96.45],[30.1,98.35],[30.1,100.25],[30.1,102.15],[30.1,104.05],[30.1,105.95],[30.1,107.85],[30.1,109.75],[30.1,111.65],[30.1,113.55],[30.1,115.45],[30.1,117.35],[30.1,119.25],[30.1,121.15],[32,-115.4],[32,-113.5],[32,-111.6],[32,-109.7],[32,-107.8],[32,-105.9],[32,-104],[32,-102.1],[32,-100.2],[32,-98.3],[32,-96.4],[32,-94.5],[32,-92.6],[32,-90.7],[32,-88.8],[32,-86.9],[32,-85],[32,-83.1],[32,-81.2],[32,-9],[32,-7.1],[32,-5.2],[32,-3.3],[32,-1.4],[32,.5],[32,2.4],[32,4.3],[32,6.2],[32,8.1],[32,10],[32,11.9],[32,13.8],[32,21.4],[32,23.3],[32,36.6],[32,38.5],[32,40.4],[32,42.3],[32,44.2],[32,46.1],[32,48],[32,49.9],[32,51.8],[32,53.7],[32,55.6],[32,57.5],[32,59.4],[32,61.3],[32,63.2],[32,65.1],[32,67],[32,68.9],[32,70.8],[32,72.7],[32,74.6],[32,76.5],[32,78.4],[32,80.3],[32,82.2],[32,84.1],[32,86],[32,87.9],[32,89.8],[32,91.7],[32,93.6],[32,95.5],[32,97.4],[32,99.3],[32,101.2],[32,103.1],[32,105],[32,106.9],[32,108.8],[32,110.7],[32,112.6],[32,114.5],[32,116.4],[32,118.3],[32,120.2],[33.9,-118.25],[33.9,-116.35],[33.9,-114.45],[33.9,-112.55],[33.9,-110.65],[33.9,-108.75],[33.9,-106.85],[33.9,-104.95],[33.9,-103.05],[33.9,-101.15],[33.9,-99.25],[33.9,-97.35],[33.9,-95.45],[33.9,-93.55],[33.9,-91.65],[33.9,-89.75],[33.9,-87.85],[33.9,-85.95],[33.9,-84.05],[33.9,-82.15],[33.9,-80.25],[33.9,-78.35],[33.9,-6.15],[33.9,-4.25],[33.9,-2.35],[33.9,-.45],[33.9,1.45],[33.9,3.35],[33.9,5.25],[33.9,7.15],[33.9,9.05],[33.9,35.65],[33.9,37.55],[33.9,39.45],[33.9,41.35],[33.9,43.25],[33.9,45.15],[33.9,47.05],[33.9,48.95],[33.9,50.85],[33.9,52.75],[33.9,54.65],[33.9,56.55],[33.9,58.45],[33.9,60.35],[33.9,62.25],[33.9,64.15],[33.9,66.05],[33.9,67.95],[33.9,69.85],[33.9,71.75],[33.9,73.65],[33.9,75.55],[33.9,77.45],[33.9,79.35],[33.9,81.25],[33.9,83.15],[33.9,85.05],[33.9,86.95],[33.9,88.85],[33.9,90.75],[33.9,92.65],[33.9,94.55],[33.9,96.45],[33.9,98.35],[33.9,100.25],[33.9,102.15],[33.9,104.05],[33.9,105.95],[33.9,107.85],[33.9,109.75],[33.9,111.65],[33.9,113.55],[33.9,115.45],[33.9,117.35],[33.9,119.25],[33.9,130.65],[33.9,134.45],[35.8,-121.1],[35.8,-119.2],[35.8,-117.3],[35.8,-115.4],[35.8,-113.5],[35.8,-111.6],[35.8,-109.7],[35.8,-107.8],[35.8,-105.9],[35.8,-104],[35.8,-102.1],[35.8,-100.2],[35.8,-98.3],[35.8,-96.4],[35.8,-94.5],[35.8,-92.6],[35.8,-90.7],[35.8,-88.8],[35.8,-86.9],[35.8,-85],[35.8,-83.1],[35.8,-81.2],[35.8,-79.3],[35.8,-77.4],[35.8,.5],[35.8,2.4],[35.8,4.3],[35.8,6.2],[35.8,8.1],[35.8,10],[35.8,36.6],[35.8,38.5],[35.8,40.4],[35.8,42.3],[35.8,44.2],[35.8,46.1],[35.8,48],[35.8,49.9],[35.8,51.8],[35.8,53.7],[35.8,55.6],[35.8,57.5],[35.8,59.4],[35.8,61.3],[35.8,63.2],[35.8,65.1],[35.8,67],[35.8,68.9],[35.8,70.8],[35.8,72.7],[35.8,74.6],[35.8,76.5],[35.8,78.4],[35.8,80.3],[35.8,82.2],[35.8,84.1],[35.8,86],[35.8,87.9],[35.8,89.8],[35.8,91.7],[35.8,93.6],[35.8,95.5],[35.8,97.4],[35.8,99.3],[35.8,101.2],[35.8,103.1],[35.8,105],[35.8,106.9],[35.8,108.8],[35.8,110.7],[35.8,112.6],[35.8,114.5],[35.8,116.4],[35.8,118.3],[35.8,127.8],[35.8,137.3],[35.8,139.2],[37.7,-122.05],[37.7,-120.15],[37.7,-118.25],[37.7,-116.35],[37.7,-114.45],[37.7,-112.55],[37.7,-110.65],[37.7,-108.75],[37.7,-106.85],[37.7,-104.95],[37.7,-103.05],[37.7,-101.15],[37.7,-99.25],[37.7,-97.35],[37.7,-95.45],[37.7,-93.55],[37.7,-91.65],[37.7,-89.75],[37.7,-87.85],[37.7,-85.95],[37.7,-84.05],[37.7,-82.15],[37.7,-80.25],[37.7,-78.35],[37.7,-76.45],[37.7,-8.05],[37.7,-6.15],[37.7,-4.25],[37.7,-2.35],[37.7,12.85],[37.7,14.75],[37.7,22.35],[37.7,28.05],[37.7,29.95],[37.7,31.85],[37.7,33.75],[37.7,35.65],[37.7,37.55],[37.7,39.45],[37.7,41.35],[37.7,43.25],[37.7,45.15],[37.7,47.05],[37.7,48.95],[37.7,54.65],[37.7,56.55],[37.7,58.45],[37.7,60.35],[37.7,62.25],[37.7,64.15],[37.7,66.05],[37.7,67.95],[37.7,69.85],[37.7,71.75],[37.7,73.65],[37.7,75.55],[37.7,77.45],[37.7,79.35],[37.7,81.25],[37.7,83.15],[37.7,85.05],[37.7,86.95],[37.7,88.85],[37.7,90.75],[37.7,92.65],[37.7,94.55],[37.7,96.45],[37.7,98.35],[37.7,100.25],[37.7,102.15],[37.7,104.05],[37.7,105.95],[37.7,107.85],[37.7,109.75],[37.7,111.65],[37.7,113.55],[37.7,115.45],[37.7,117.35],[37.7,121.15],[37.7,126.85],[37.7,128.75],[37.7,140.15],[39.6,-123],[39.6,-121.1],[39.6,-119.2],[39.6,-117.3],[39.6,-115.4],[39.6,-113.5],[39.6,-111.6],[39.6,-109.7],[39.6,-107.8],[39.6,-105.9],[39.6,-104],[39.6,-102.1],[39.6,-100.2],[39.6,-98.3],[39.6,-96.4],[39.6,-94.5],[39.6,-92.6],[39.6,-90.7],[39.6,-88.8],[39.6,-86.9],[39.6,-85],[39.6,-83.1],[39.6,-81.2],[39.6,-79.3],[39.6,-77.4],[39.6,-75.5],[39.6,-9],[39.6,-7.1],[39.6,-5.2],[39.6,-3.3],[39.6,-1.4],[39.6,15.7],[39.6,21.4],[39.6,27.1],[39.6,29],[39.6,30.9],[39.6,32.8],[39.6,34.7],[39.6,36.6],[39.6,38.5],[39.6,40.4],[39.6,42.3],[39.6,44.2],[39.6,46.1],[39.6,48],[39.6,53.7],[39.6,55.6],[39.6,57.5],[39.6,59.4],[39.6,61.3],[39.6,63.2],[39.6,65.1],[39.6,67],[39.6,68.9],[39.6,70.8],[39.6,72.7],[39.6,74.6],[39.6,76.5],[39.6,78.4],[39.6,80.3],[39.6,82.2],[39.6,84.1],[39.6,86],[39.6,87.9],[39.6,89.8],[39.6,91.7],[39.6,93.6],[39.6,95.5],[39.6,97.4],[39.6,99.3],[39.6,101.2],[39.6,103.1],[39.6,105],[39.6,106.9],[39.6,108.8],[39.6,110.7],[39.6,112.6],[39.6,114.5],[39.6,116.4],[39.6,118.3],[39.6,122.1],[39.6,125.9],[39.6,141.1],[41.5,-123.95],[41.5,-122.05],[41.5,-120.15],[41.5,-118.25],[41.5,-116.35],[41.5,-114.45],[41.5,-112.55],[41.5,-110.65],[41.5,-108.75],[41.5,-106.85],[41.5,-104.95],[41.5,-103.05],[41.5,-101.15],[41.5,-99.25],[41.5,-97.35],[41.5,-95.45],[41.5,-93.55],[41.5,-91.65],[41.5,-89.75],[41.5,-87.85],[41.5,-85.95],[41.5,-84.05],[41.5,-82.15],[41.5,-80.25],[41.5,-78.35],[41.5,-76.45],[41.5,-74.55],[41.5,-72.65],[41.5,-70.75],[41.5,-8.05],[41.5,-6.15],[41.5,-4.25],[41.5,-2.35],[41.5,-.45],[41.5,1.45],[41.5,9.05],[41.5,12.85],[41.5,14.75],[41.5,20.45],[41.5,22.35],[41.5,24.25],[41.5,26.15],[41.5,28.05],[41.5,33.75],[41.5,35.65],[41.5,43.25],[41.5,45.15],[41.5,47.05],[41.5,52.75],[41.5,54.65],[41.5,56.55],[41.5,58.45],[41.5,60.35],[41.5,62.25],[41.5,64.15],[41.5,66.05],[41.5,67.95],[41.5,69.85],[41.5,71.75],[41.5,73.65],[41.5,75.55],[41.5,77.45],[41.5,79.35],[41.5,81.25],[41.5,83.15],[41.5,85.05],[41.5,86.95],[41.5,88.85],[41.5,90.75],[41.5,92.65],[41.5,94.55],[41.5,96.45],[41.5,98.35],[41.5,100.25],[41.5,102.15],[41.5,104.05],[41.5,105.95],[41.5,107.85],[41.5,109.75],[41.5,111.65],[41.5,113.55],[41.5,115.45],[41.5,117.35],[41.5,119.25],[41.5,121.15],[41.5,123.05],[41.5,124.95],[41.5,126.85],[41.5,128.75],[43.4,-123],[43.4,-121.1],[43.4,-119.2],[43.4,-117.3],[43.4,-115.4],[43.4,-113.5],[43.4,-111.6],[43.4,-109.7],[43.4,-107.8],[43.4,-105.9],[43.4,-104],[43.4,-102.1],[43.4,-100.2],[43.4,-98.3],[43.4,-96.4],[43.4,-94.5],[43.4,-92.6],[43.4,-90.7],[43.4,-88.8],[43.4,-86.9],[43.4,-85],[43.4,-83.1],[43.4,-81.2],[43.4,-79.3],[43.4,-77.4],[43.4,-75.5],[43.4,-73.6],[43.4,-71.7],[43.4,-7.1],[43.4,-5.2],[43.4,-3.3],[43.4,-1.4],[43.4,.5],[43.4,2.4],[43.4,4.3],[43.4,6.2],[43.4,11.9],[43.4,17.6],[43.4,19.5],[43.4,21.4],[43.4,23.3],[43.4,25.2],[43.4,27.1],[43.4,40.4],[43.4,42.3],[43.4,44.2],[43.4,46.1],[43.4,51.8],[43.4,53.7],[43.4,55.6],[43.4,57.5],[43.4,59.4],[43.4,61.3],[43.4,63.2],[43.4,65.1],[43.4,67],[43.4,68.9],[43.4,70.8],[43.4,72.7],[43.4,74.6],[43.4,76.5],[43.4,78.4],[43.4,80.3],[43.4,82.2],[43.4,84.1],[43.4,86],[43.4,87.9],[43.4,89.8],[43.4,91.7],[43.4,93.6],[43.4,95.5],[43.4,97.4],[43.4,99.3],[43.4,101.2],[43.4,103.1],[43.4,105],[43.4,106.9],[43.4,108.8],[43.4,110.7],[43.4,112.6],[43.4,114.5],[43.4,116.4],[43.4,118.3],[43.4,120.2],[43.4,122.1],[43.4,124],[43.4,125.9],[43.4,127.8],[43.4,129.7],[43.4,131.6],[43.4,133.5],[43.4,143],[43.4,144.9],[45.3,-122.05],[45.3,-120.15],[45.3,-118.25],[45.3,-116.35],[45.3,-114.45],[45.3,-112.55],[45.3,-110.65],[45.3,-108.75],[45.3,-106.85],[45.3,-104.95],[45.3,-103.05],[45.3,-101.15],[45.3,-99.25],[45.3,-97.35],[45.3,-95.45],[45.3,-93.55],[45.3,-91.65],[45.3,-89.75],[45.3,-87.85],[45.3,-85.95],[45.3,-84.05],[45.3,-82.15],[45.3,-80.25],[45.3,-78.35],[45.3,-76.45],[45.3,-74.55],[45.3,-72.65],[45.3,-70.75],[45.3,-68.85],[45.3,-66.95],[45.3,-65.05],[45.3,-63.15],[45.3,-61.25],[45.3,-.45],[45.3,1.45],[45.3,3.35],[45.3,5.25],[45.3,7.15],[45.3,9.05],[45.3,10.95],[45.3,14.75],[45.3,16.65],[45.3,18.55],[45.3,20.45],[45.3,22.35],[45.3,24.25],[45.3,26.15],[45.3,28.05],[45.3,33.75],[45.3,35.65],[45.3,37.55],[45.3,39.45],[45.3,41.35],[45.3,43.25],[45.3,45.15],[45.3,47.05],[45.3,52.75],[45.3,54.65],[45.3,56.55],[45.3,58.45],[45.3,60.35],[45.3,62.25],[45.3,64.15],[45.3,66.05],[45.3,67.95],[45.3,69.85],[45.3,71.75],[45.3,73.65],[45.3,75.55],[45.3,77.45],[45.3,79.35],[45.3,81.25],[45.3,83.15],[45.3,85.05],[45.3,86.95],[45.3,88.85],[45.3,90.75],[45.3,92.65],[45.3,94.55],[45.3,96.45],[45.3,98.35],[45.3,100.25],[45.3,102.15],[45.3,104.05],[45.3,105.95],[45.3,107.85],[45.3,109.75],[45.3,111.65],[45.3,113.55],[45.3,115.45],[45.3,117.35],[45.3,119.25],[45.3,121.15],[45.3,123.05],[45.3,124.95],[45.3,126.85],[45.3,128.75],[45.3,130.65],[45.3,132.55],[45.3,134.45],[45.3,136.35],[45.3,142.05],[47.2,-123],[47.2,-121.1],[47.2,-119.2],[47.2,-117.3],[47.2,-115.4],[47.2,-113.5],[47.2,-111.6],[47.2,-109.7],[47.2,-107.8],[47.2,-105.9],[47.2,-104],[47.2,-102.1],[47.2,-100.2],[47.2,-98.3],[47.2,-96.4],[47.2,-94.5],[47.2,-92.6],[47.2,-90.7],[47.2,-88.8],[47.2,-86.9],[47.2,-85],[47.2,-83.1],[47.2,-81.2],[47.2,-79.3],[47.2,-77.4],[47.2,-75.5],[47.2,-73.6],[47.2,-71.7],[47.2,-69.8],[47.2,-67.9],[47.2,-66],[47.2,-1.4],[47.2,.5],[47.2,2.4],[47.2,4.3],[47.2,6.2],[47.2,8.1],[47.2,10],[47.2,11.9],[47.2,13.8],[47.2,15.7],[47.2,17.6],[47.2,19.5],[47.2,21.4],[47.2,23.3],[47.2,25.2],[47.2,27.1],[47.2,29],[47.2,30.9],[47.2,32.8],[47.2,34.7],[47.2,36.6],[47.2,38.5],[47.2,40.4],[47.2,42.3],[47.2,44.2],[47.2,46.1],[47.2,48],[47.2,49.9],[47.2,51.8],[47.2,53.7],[47.2,55.6],[47.2,57.5],[47.2,59.4],[47.2,61.3],[47.2,63.2],[47.2,65.1],[47.2,67],[47.2,68.9],[47.2,70.8],[47.2,72.7],[47.2,74.6],[47.2,76.5],[47.2,78.4],[47.2,80.3],[47.2,82.2],[47.2,84.1],[47.2,86],[47.2,87.9],[47.2,89.8],[47.2,91.7],[47.2,93.6],[47.2,95.5],[47.2,97.4],[47.2,99.3],[47.2,101.2],[47.2,103.1],[47.2,105],[47.2,106.9],[47.2,108.8],[47.2,110.7],[47.2,112.6],[47.2,114.5],[47.2,116.4],[47.2,118.3],[47.2,120.2],[47.2,122.1],[47.2,124],[47.2,125.9],[47.2,127.8],[47.2,129.7],[47.2,131.6],[47.2,133.5],[47.2,135.4],[47.2,137.3],[47.2,143],[49.1,-125.85],[49.1,-122.05],[49.1,-120.15],[49.1,-118.25],[49.1,-116.35],[49.1,-114.45],[49.1,-112.55],[49.1,-110.65],[49.1,-108.75],[49.1,-106.85],[49.1,-104.95],[49.1,-103.05],[49.1,-101.15],[49.1,-99.25],[49.1,-97.35],[49.1,-95.45],[49.1,-93.55],[49.1,-91.65],[49.1,-89.75],[49.1,-87.85],[49.1,-85.95],[49.1,-84.05],[49.1,-82.15],[49.1,-80.25],[49.1,-78.35],[49.1,-76.45],[49.1,-74.55],[49.1,-72.65],[49.1,-70.75],[49.1,-68.85],[49.1,-65.05],[49.1,-57.45],[49.1,-55.55],[49.1,-53.65],[49.1,-.45],[49.1,1.45],[49.1,3.35],[49.1,5.25],[49.1,7.15],[49.1,9.05],[49.1,10.95],[49.1,12.85],[49.1,14.75],[49.1,16.65],[49.1,18.55],[49.1,20.45],[49.1,22.35],[49.1,24.25],[49.1,26.15],[49.1,28.05],[49.1,29.95],[49.1,31.85],[49.1,33.75],[49.1,35.65],[49.1,37.55],[49.1,39.45],[49.1,41.35],[49.1,43.25],[49.1,45.15],[49.1,47.05],[49.1,48.95],[49.1,50.85],[49.1,52.75],[49.1,54.65],[49.1,56.55],[49.1,58.45],[49.1,60.35],[49.1,62.25],[49.1,64.15],[49.1,66.05],[49.1,67.95],[49.1,69.85],[49.1,71.75],[49.1,73.65],[49.1,75.55],[49.1,77.45],[49.1,79.35],[49.1,81.25],[49.1,83.15],[49.1,85.05],[49.1,86.95],[49.1,88.85],[49.1,90.75],[49.1,92.65],[49.1,94.55],[49.1,96.45],[49.1,98.35],[49.1,100.25],[49.1,102.15],[49.1,104.05],[49.1,105.95],[49.1,107.85],[49.1,109.75],[49.1,111.65],[49.1,113.55],[49.1,115.45],[49.1,117.35],[49.1,119.25],[49.1,121.15],[49.1,123.05],[49.1,124.95],[49.1,126.85],[49.1,128.75],[49.1,130.65],[49.1,132.55],[49.1,134.45],[49.1,136.35],[49.1,138.25],[49.1,140.15],[49.1,142.05],[51,-126.8],[51,-124.9],[51,-123],[51,-121.1],[51,-119.2],[51,-117.3],[51,-115.4],[51,-113.5],[51,-111.6],[51,-109.7],[51,-107.8],[51,-105.9],[51,-104],[51,-102.1],[51,-100.2],[51,-98.3],[51,-96.4],[51,-94.5],[51,-92.6],[51,-90.7],[51,-88.8],[51,-86.9],[51,-85],[51,-83.1],[51,-81.2],[51,-79.3],[51,-77.4],[51,-75.5],[51,-73.6],[51,-71.7],[51,-69.8],[51,-67.9],[51,-66],[51,-64.1],[51,-62.2],[51,-60.3],[51,-56.5],[51,-3.3],[51,-1.4],[51,.5],[51,2.4],[51,4.3],[51,6.2],[51,8.1],[51,10],[51,11.9],[51,13.8],[51,15.7],[51,17.6],[51,19.5],[51,21.4],[51,23.3],[51,25.2],[51,27.1],[51,29],[51,30.9],[51,32.8],[51,34.7],[51,36.6],[51,38.5],[51,40.4],[51,42.3],[51,44.2],[51,46.1],[51,48],[51,49.9],[51,51.8],[51,53.7],[51,55.6],[51,57.5],[51,59.4],[51,61.3],[51,63.2],[51,65.1],[51,67],[51,68.9],[51,70.8],[51,72.7],[51,74.6],[51,76.5],[51,78.4],[51,80.3],[51,82.2],[51,84.1],[51,86],[51,87.9],[51,89.8],[51,91.7],[51,93.6],[51,95.5],[51,97.4],[51,99.3],[51,101.2],[51,103.1],[51,105],[51,106.9],[51,108.8],[51,110.7],[51,112.6],[51,114.5],[51,116.4],[51,118.3],[51,120.2],[51,122.1],[51,124],[51,125.9],[51,127.8],[51,129.7],[51,131.6],[51,133.5],[51,135.4],[51,137.3],[51,139.2],[51,143],[52.9,-127.75],[52.9,-125.85],[52.9,-123.95],[52.9,-122.05],[52.9,-120.15],[52.9,-118.25],[52.9,-116.35],[52.9,-114.45],[52.9,-112.55],[52.9,-110.65],[52.9,-108.75],[52.9,-106.85],[52.9,-104.95],[52.9,-103.05],[52.9,-101.15],[52.9,-99.25],[52.9,-97.35],[52.9,-95.45],[52.9,-93.55],[52.9,-91.65],[52.9,-89.75],[52.9,-87.85],[52.9,-85.95],[52.9,-84.05],[52.9,-82.15],[52.9,-78.35],[52.9,-76.45],[52.9,-74.55],[52.9,-72.65],[52.9,-70.75],[52.9,-68.85],[52.9,-66.95],[52.9,-65.05],[52.9,-63.15],[52.9,-61.25],[52.9,-59.35],[52.9,-57.45],[52.9,-8.05],[52.9,-4.25],[52.9,-2.35],[52.9,-.45],[52.9,5.25],[52.9,7.15],[52.9,9.05],[52.9,10.95],[52.9,12.85],[52.9,14.75],[52.9,16.65],[52.9,18.55],[52.9,20.45],[52.9,22.35],[52.9,24.25],[52.9,26.15],[52.9,28.05],[52.9,29.95],[52.9,31.85],[52.9,33.75],[52.9,35.65],[52.9,37.55],[52.9,39.45],[52.9,41.35],[52.9,43.25],[52.9,45.15],[52.9,47.05],[52.9,48.95],[52.9,50.85],[52.9,52.75],[52.9,54.65],[52.9,56.55],[52.9,58.45],[52.9,60.35],[52.9,62.25],[52.9,64.15],[52.9,66.05],[52.9,67.95],[52.9,69.85],[52.9,71.75],[52.9,73.65],[52.9,75.55],[52.9,77.45],[52.9,79.35],[52.9,81.25],[52.9,83.15],[52.9,85.05],[52.9,86.95],[52.9,88.85],[52.9,90.75],[52.9,92.65],[52.9,94.55],[52.9,96.45],[52.9,98.35],[52.9,100.25],[52.9,102.15],[52.9,104.05],[52.9,105.95],[52.9,107.85],[52.9,109.75],[52.9,111.65],[52.9,113.55],[52.9,115.45],[52.9,117.35],[52.9,119.25],[52.9,121.15],[52.9,123.05],[52.9,124.95],[52.9,126.85],[52.9,128.75],[52.9,130.65],[52.9,132.55],[52.9,134.45],[52.9,136.35],[52.9,138.25],[52.9,140.15],[52.9,142.05],[52.9,157.25],[54.8,-162.9],[54.8,-128.7],[54.8,-126.8],[54.8,-124.9],[54.8,-123],[54.8,-121.1],[54.8,-119.2],[54.8,-117.3],[54.8,-115.4],[54.8,-113.5],[54.8,-111.6],[54.8,-109.7],[54.8,-107.8],[54.8,-105.9],[54.8,-104],[54.8,-102.1],[54.8,-100.2],[54.8,-98.3],[54.8,-96.4],[54.8,-94.5],[54.8,-92.6],[54.8,-90.7],[54.8,-88.8],[54.8,-86.9],[54.8,-85],[54.8,-83.1],[54.8,-79.3],[54.8,-77.4],[54.8,-75.5],[54.8,-73.6],[54.8,-71.7],[54.8,-69.8],[54.8,-67.9],[54.8,-66],[54.8,-64.1],[54.8,-62.2],[54.8,-60.3],[54.8,-58.4],[54.8,-7.1],[54.8,-3.3],[54.8,-1.4],[54.8,17.6],[54.8,21.4],[54.8,23.3],[54.8,25.2],[54.8,27.1],[54.8,29],[54.8,30.9],[54.8,32.8],[54.8,34.7],[54.8,36.6],[54.8,38.5],[54.8,40.4],[54.8,42.3],[54.8,44.2],[54.8,46.1],[54.8,48],[54.8,49.9],[54.8,51.8],[54.8,53.7],[54.8,55.6],[54.8,57.5],[54.8,59.4],[54.8,61.3],[54.8,63.2],[54.8,65.1],[54.8,67],[54.8,68.9],[54.8,70.8],[54.8,72.7],[54.8,74.6],[54.8,76.5],[54.8,78.4],[54.8,80.3],[54.8,82.2],[54.8,84.1],[54.8,86],[54.8,87.9],[54.8,89.8],[54.8,91.7],[54.8,93.6],[54.8,95.5],[54.8,97.4],[54.8,99.3],[54.8,101.2],[54.8,103.1],[54.8,105],[54.8,106.9],[54.8,108.8],[54.8,110.7],[54.8,112.6],[54.8,114.5],[54.8,116.4],[54.8,118.3],[54.8,120.2],[54.8,122.1],[54.8,124],[54.8,125.9],[54.8,127.8],[54.8,129.7],[54.8,131.6],[54.8,133.5],[54.8,156.3],[54.8,158.2],[54.8,160.1],[56.7,-158.15],[56.7,-131.55],[56.7,-129.65],[56.7,-127.75],[56.7,-125.85],[56.7,-123.95],[56.7,-122.05],[56.7,-120.15],[56.7,-118.25],[56.7,-116.35],[56.7,-114.45],[56.7,-112.55],[56.7,-110.65],[56.7,-108.75],[56.7,-106.85],[56.7,-104.95],[56.7,-103.05],[56.7,-101.15],[56.7,-99.25],[56.7,-97.35],[56.7,-95.45],[56.7,-93.55],[56.7,-91.65],[56.7,-89.75],[56.7,-76.45],[56.7,-74.55],[56.7,-72.65],[56.7,-70.75],[56.7,-68.85],[56.7,-66.95],[56.7,-65.05],[56.7,-63.15],[56.7,-4.25],[56.7,9.05],[56.7,12.85],[56.7,14.75],[56.7,22.35],[56.7,24.25],[56.7,26.15],[56.7,28.05],[56.7,29.95],[56.7,31.85],[56.7,33.75],[56.7,35.65],[56.7,37.55],[56.7,39.45],[56.7,41.35],[56.7,43.25],[56.7,45.15],[56.7,47.05],[56.7,48.95],[56.7,50.85],[56.7,52.75],[56.7,54.65],[56.7,56.55],[56.7,58.45],[56.7,60.35],[56.7,62.25],[56.7,64.15],[56.7,66.05],[56.7,67.95],[56.7,69.85],[56.7,71.75],[56.7,73.65],[56.7,75.55],[56.7,77.45],[56.7,79.35],[56.7,81.25],[56.7,83.15],[56.7,85.05],[56.7,86.95],[56.7,88.85],[56.7,90.75],[56.7,92.65],[56.7,94.55],[56.7,96.45],[56.7,98.35],[56.7,100.25],[56.7,102.15],[56.7,104.05],[56.7,105.95],[56.7,107.85],[56.7,109.75],[56.7,111.65],[56.7,113.55],[56.7,115.45],[56.7,117.35],[56.7,119.25],[56.7,121.15],[56.7,123.05],[56.7,124.95],[56.7,126.85],[56.7,128.75],[56.7,130.65],[56.7,132.55],[56.7,134.45],[56.7,136.35],[56.7,138.25],[56.7,157.25],[56.7,159.15],[56.7,161.05],[56.7,162.95],[58.6,-159.1],[58.6,-157.2],[58.6,-155.3],[58.6,-136.3],[58.6,-134.4],[58.6,-132.5],[58.6,-130.6],[58.6,-128.7],[58.6,-126.8],[58.6,-124.9],[58.6,-123],[58.6,-121.1],[58.6,-119.2],[58.6,-117.3],[58.6,-115.4],[58.6,-113.5],[58.6,-111.6],[58.6,-109.7],[58.6,-107.8],[58.6,-105.9],[58.6,-104],[58.6,-102.1],[58.6,-100.2],[58.6,-98.3],[58.6,-96.4],[58.6,-94.5],[58.6,-77.4],[58.6,-75.5],[58.6,-73.6],[58.6,-71.7],[58.6,-69.8],[58.6,-66],[58.6,-64.1],[58.6,-3.3],[58.6,6.2],[58.6,8.1],[58.6,11.9],[58.6,13.8],[58.6,15.7],[58.6,25.2],[58.6,27.1],[58.6,29],[58.6,30.9],[58.6,32.8],[58.6,34.7],[58.6,36.6],[58.6,38.5],[58.6,40.4],[58.6,42.3],[58.6,44.2],[58.6,46.1],[58.6,48],[58.6,49.9],[58.6,51.8],[58.6,53.7],[58.6,55.6],[58.6,57.5],[58.6,59.4],[58.6,61.3],[58.6,63.2],[58.6,65.1],[58.6,67],[58.6,68.9],[58.6,70.8],[58.6,72.7],[58.6,74.6],[58.6,76.5],[58.6,78.4],[58.6,80.3],[58.6,82.2],[58.6,84.1],[58.6,86],[58.6,87.9],[58.6,89.8],[58.6,91.7],[58.6,93.6],[58.6,95.5],[58.6,97.4],[58.6,99.3],[58.6,101.2],[58.6,103.1],[58.6,105],[58.6,106.9],[58.6,108.8],[58.6,110.7],[58.6,112.6],[58.6,114.5],[58.6,116.4],[58.6,118.3],[58.6,120.2],[58.6,122.1],[58.6,124],[58.6,125.9],[58.6,127.8],[58.6,129.7],[58.6,131.6],[58.6,133.5],[58.6,135.4],[58.6,137.3],[58.6,139.2],[58.6,141.1],[58.6,160.1],[58.6,162],[60.5,-163.85],[60.5,-161.95],[60.5,-160.05],[60.5,-158.15],[60.5,-156.25],[60.5,-154.35],[60.5,-152.45],[60.5,-150.55],[60.5,-148.65],[60.5,-144.85],[60.5,-142.95],[60.5,-141.05],[60.5,-139.15],[60.5,-137.25],[60.5,-135.35],[60.5,-133.45],[60.5,-131.55],[60.5,-129.65],[60.5,-127.75],[60.5,-125.85],[60.5,-123.95],[60.5,-122.05],[60.5,-120.15],[60.5,-118.25],[60.5,-116.35],[60.5,-114.45],[60.5,-112.55],[60.5,-110.65],[60.5,-108.75],[60.5,-106.85],[60.5,-104.95],[60.5,-103.05],[60.5,-101.15],[60.5,-99.25],[60.5,-97.35],[60.5,-95.45],[60.5,-76.45],[60.5,-74.55],[60.5,-72.65],[60.5,-70.75],[60.5,-44.15],[60.5,5.25],[60.5,7.15],[60.5,9.05],[60.5,10.95],[60.5,12.85],[60.5,14.75],[60.5,16.65],[60.5,22.35],[60.5,24.25],[60.5,26.15],[60.5,29.95],[60.5,31.85],[60.5,33.75],[60.5,35.65],[60.5,37.55],[60.5,39.45],[60.5,41.35],[60.5,43.25],[60.5,45.15],[60.5,47.05],[60.5,48.95],[60.5,50.85],[60.5,52.75],[60.5,54.65],[60.5,56.55],[60.5,58.45],[60.5,60.35],[60.5,62.25],[60.5,64.15],[60.5,66.05],[60.5,67.95],[60.5,69.85],[60.5,71.75],[60.5,73.65],[60.5,75.55],[60.5,77.45],[60.5,79.35],[60.5,81.25],[60.5,83.15],[60.5,85.05],[60.5,86.95],[60.5,88.85],[60.5,90.75],[60.5,92.65],[60.5,94.55],[60.5,96.45],[60.5,98.35],[60.5,100.25],[60.5,102.15],[60.5,104.05],[60.5,105.95],[60.5,107.85],[60.5,109.75],[60.5,111.65],[60.5,113.55],[60.5,115.45],[60.5,117.35],[60.5,119.25],[60.5,121.15],[60.5,123.05],[60.5,124.95],[60.5,126.85],[60.5,128.75],[60.5,130.65],[60.5,132.55],[60.5,134.45],[60.5,136.35],[60.5,138.25],[60.5,140.15],[60.5,142.05],[60.5,143.95],[60.5,145.85],[60.5,147.75],[60.5,149.65],[60.5,151.55],[60.5,153.45],[60.5,162.95],[60.5,164.85],[60.5,166.75],[60.5,168.65],[60.5,170.55],[62.4,-164.8],[62.4,-162.9],[62.4,-161],[62.4,-159.1],[62.4,-157.2],[62.4,-155.3],[62.4,-153.4],[62.4,-151.5],[62.4,-149.6],[62.4,-147.7],[62.4,-145.8],[62.4,-143.9],[62.4,-142],[62.4,-140.1],[62.4,-138.2],[62.4,-136.3],[62.4,-134.4],[62.4,-132.5],[62.4,-130.6],[62.4,-128.7],[62.4,-126.8],[62.4,-124.9],[62.4,-123],[62.4,-121.1],[62.4,-119.2],[62.4,-117.3],[62.4,-115.4],[62.4,-113.5],[62.4,-111.6],[62.4,-109.7],[62.4,-107.8],[62.4,-105.9],[62.4,-104],[62.4,-102.1],[62.4,-100.2],[62.4,-98.3],[62.4,-96.4],[62.4,-94.5],[62.4,-92.6],[62.4,-83.1],[62.4,-77.4],[62.4,-67.9],[62.4,-48.9],[62.4,-47],[62.4,-45.1],[62.4,-43.2],[62.4,6.2],[62.4,8.1],[62.4,10],[62.4,11.9],[62.4,13.8],[62.4,15.7],[62.4,17.6],[62.4,21.4],[62.4,23.3],[62.4,25.2],[62.4,27.1],[62.4,29],[62.4,30.9],[62.4,32.8],[62.4,34.7],[62.4,36.6],[62.4,38.5],[62.4,40.4],[62.4,42.3],[62.4,44.2],[62.4,46.1],[62.4,48],[62.4,49.9],[62.4,51.8],[62.4,53.7],[62.4,55.6],[62.4,57.5],[62.4,59.4],[62.4,61.3],[62.4,63.2],[62.4,65.1],[62.4,67],[62.4,68.9],[62.4,70.8],[62.4,72.7],[62.4,74.6],[62.4,76.5],[62.4,78.4],[62.4,80.3],[62.4,82.2],[62.4,84.1],[62.4,86],[62.4,87.9],[62.4,89.8],[62.4,91.7],[62.4,93.6],[62.4,95.5],[62.4,97.4],[62.4,99.3],[62.4,101.2],[62.4,103.1],[62.4,105],[62.4,106.9],[62.4,108.8],[62.4,110.7],[62.4,112.6],[62.4,114.5],[62.4,116.4],[62.4,118.3],[62.4,120.2],[62.4,122.1],[62.4,124],[62.4,125.9],[62.4,127.8],[62.4,129.7],[62.4,131.6],[62.4,133.5],[62.4,135.4],[62.4,137.3],[62.4,139.2],[62.4,141.1],[62.4,143],[62.4,144.9],[62.4,146.8],[62.4,148.7],[62.4,150.6],[62.4,152.5],[62.4,154.4],[62.4,156.3],[62.4,158.2],[62.4,160.1],[62.4,162],[62.4,165.8],[62.4,167.7],[62.4,169.6],[62.4,171.5],[62.4,173.4],[62.4,175.3],[62.4,179.1],[64.3,-173.35],[64.3,-160.05],[64.3,-158.15],[64.3,-156.25],[64.3,-154.35],[64.3,-152.45],[64.3,-150.55],[64.3,-148.65],[64.3,-146.75],[64.3,-144.85],[64.3,-142.95],[64.3,-141.05],[64.3,-139.15],[64.3,-137.25],[64.3,-135.35],[64.3,-133.45],[64.3,-131.55],[64.3,-129.65],[64.3,-127.75],[64.3,-125.85],[64.3,-123.95],[64.3,-122.05],[64.3,-120.15],[64.3,-118.25],[64.3,-116.35],[64.3,-114.45],[64.3,-112.55],[64.3,-110.65],[64.3,-108.75],[64.3,-106.85],[64.3,-104.95],[64.3,-103.05],[64.3,-101.15],[64.3,-99.25],[64.3,-97.35],[64.3,-95.45],[64.3,-93.55],[64.3,-91.65],[64.3,-89.75],[64.3,-85.95],[64.3,-84.05],[64.3,-82.15],[64.3,-76.45],[64.3,-72.65],[64.3,-70.75],[64.3,-68.85],[64.3,-66.95],[64.3,-51.75],[64.3,-49.85],[64.3,-47.95],[64.3,-46.05],[64.3,-44.15],[64.3,-42.25],[64.3,-21.35],[64.3,-19.45],[64.3,-17.55],[64.3,-15.65],[64.3,10.95],[64.3,12.85],[64.3,14.75],[64.3,16.65],[64.3,18.55],[64.3,20.45],[64.3,24.25],[64.3,26.15],[64.3,28.05],[64.3,29.95],[64.3,31.85],[64.3,33.75],[64.3,37.55],[64.3,39.45],[64.3,41.35],[64.3,43.25],[64.3,45.15],[64.3,47.05],[64.3,48.95],[64.3,50.85],[64.3,52.75],[64.3,54.65],[64.3,56.55],[64.3,58.45],[64.3,60.35],[64.3,62.25],[64.3,64.15],[64.3,66.05],[64.3,67.95],[64.3,69.85],[64.3,71.75],[64.3,73.65],[64.3,75.55],[64.3,77.45],[64.3,79.35],[64.3,81.25],[64.3,83.15],[64.3,85.05],[64.3,86.95],[64.3,88.85],[64.3,90.75],[64.3,92.65],[64.3,94.55],[64.3,96.45],[64.3,98.35],[64.3,100.25],[64.3,102.15],[64.3,104.05],[64.3,105.95],[64.3,107.85],[64.3,109.75],[64.3,111.65],[64.3,113.55],[64.3,115.45],[64.3,117.35],[64.3,119.25],[64.3,121.15],[64.3,123.05],[64.3,124.95],[64.3,126.85],[64.3,128.75],[64.3,130.65],[64.3,132.55],[64.3,134.45],[64.3,136.35],[64.3,138.25],[64.3,140.15],[64.3,142.05],[64.3,143.95],[64.3,145.85],[64.3,147.75],[64.3,149.65],[64.3,151.55],[64.3,153.45],[64.3,155.35],[64.3,157.25],[64.3,159.15],[64.3,161.05],[64.3,162.95],[64.3,164.85],[64.3,166.75],[64.3,168.65],[64.3,170.55],[64.3,172.45],[64.3,174.35],[64.3,176.25],[66.2,-180],[66.2,-178.1],[66.2,-176.2],[66.2,-174.3],[66.2,-172.4],[66.2,-170.5],[66.2,-164.8],[66.2,-161],[66.2,-159.1],[66.2,-157.2],[66.2,-155.3],[66.2,-153.4],[66.2,-151.5],[66.2,-149.6],[66.2,-147.7],[66.2,-145.8],[66.2,-143.9],[66.2,-142],[66.2,-140.1],[66.2,-138.2],[66.2,-136.3],[66.2,-134.4],[66.2,-132.5],[66.2,-130.6],[66.2,-128.7],[66.2,-126.8],[66.2,-124.9],[66.2,-123],[66.2,-121.1],[66.2,-119.2],[66.2,-117.3],[66.2,-115.4],[66.2,-113.5],[66.2,-111.6],[66.2,-109.7],[66.2,-107.8],[66.2,-105.9],[66.2,-104],[66.2,-102.1],[66.2,-100.2],[66.2,-98.3],[66.2,-96.4],[66.2,-94.5],[66.2,-92.6],[66.2,-90.7],[66.2,-88.8],[66.2,-86.9],[66.2,-73.6],[66.2,-71.7],[66.2,-69.8],[66.2,-66],[66.2,-64.1],[66.2,-62.2],[66.2,-52.7],[66.2,-50.8],[66.2,-48.9],[66.2,-47],[66.2,-45.1],[66.2,-43.2],[66.2,-41.3],[66.2,-39.4],[66.2,-37.5],[66.2,-22.3],[66.2,-16.6],[66.2,-14.7],[66.2,13.8],[66.2,15.7],[66.2,17.6],[66.2,19.5],[66.2,21.4],[66.2,23.3],[66.2,25.2],[66.2,27.1],[66.2,29],[66.2,30.9],[66.2,32.8],[66.2,38.5],[66.2,42.3],[66.2,44.2],[66.2,46.1],[66.2,48],[66.2,49.9],[66.2,51.8],[66.2,53.7],[66.2,55.6],[66.2,57.5],[66.2,59.4],[66.2,61.3],[66.2,63.2],[66.2,65.1],[66.2,67],[66.2,68.9],[66.2,70.8],[66.2,72.7],[66.2,74.6],[66.2,76.5],[66.2,78.4],[66.2,80.3],[66.2,82.2],[66.2,84.1],[66.2,86],[66.2,87.9],[66.2,89.8],[66.2,91.7],[66.2,93.6],[66.2,95.5],[66.2,97.4],[66.2,99.3],[66.2,101.2],[66.2,103.1],[66.2,105],[66.2,106.9],[66.2,108.8],[66.2,110.7],[66.2,112.6],[66.2,114.5],[66.2,116.4],[66.2,118.3],[66.2,120.2],[66.2,122.1],[66.2,124],[66.2,125.9],[66.2,127.8],[66.2,129.7],[66.2,131.6],[66.2,133.5],[66.2,135.4],[66.2,137.3],[66.2,139.2],[66.2,141.1],[66.2,143],[66.2,144.9],[66.2,146.8],[66.2,148.7],[66.2,150.6],[66.2,152.5],[66.2,154.4],[66.2,156.3],[66.2,158.2],[66.2,160.1],[66.2,162],[66.2,163.9],[66.2,165.8],[66.2,167.7],[66.2,169.6],[66.2,171.5],[66.2,173.4],[66.2,175.3],[66.2,177.2],[66.2,179.1],[68.1,-179.05],[68.1,-163.85],[68.1,-161.95],[68.1,-160.05],[68.1,-158.15],[68.1,-156.25],[68.1,-154.35],[68.1,-152.45],[68.1,-150.55],[68.1,-148.65],[68.1,-146.75],[68.1,-144.85],[68.1,-142.95],[68.1,-141.05],[68.1,-139.15],[68.1,-137.25],[68.1,-135.35],[68.1,-133.45],[68.1,-131.55],[68.1,-129.65],[68.1,-127.75],[68.1,-125.85],[68.1,-123.95],[68.1,-122.05],[68.1,-120.15],[68.1,-118.25],[68.1,-116.35],[68.1,-106.85],[68.1,-104.95],[68.1,-97.35],[68.1,-93.55],[68.1,-91.65],[68.1,-89.75],[68.1,-85.95],[68.1,-84.05],[68.1,-82.15],[68.1,-76.45],[68.1,-72.65],[68.1,-70.75],[68.1,-68.85],[68.1,-66.95],[68.1,-51.75],[68.1,-49.85],[68.1,-47.95],[68.1,-46.05],[68.1,-44.15],[68.1,-42.25],[68.1,-40.35],[68.1,-38.45],[68.1,-36.55],[68.1,-34.65],[68.1,-32.75],[68.1,16.65],[68.1,18.55],[68.1,20.45],[68.1,22.35],[68.1,24.25],[68.1,26.15],[68.1,28.05],[68.1,29.95],[68.1,31.85],[68.1,33.75],[68.1,35.65],[68.1,37.55],[68.1,39.45],[68.1,45.15],[68.1,50.85],[68.1,52.75],[68.1,54.65],[68.1,56.55],[68.1,58.45],[68.1,60.35],[68.1,62.25],[68.1,64.15],[68.1,66.05],[68.1,67.95],[68.1,69.85],[68.1,71.75],[68.1,75.55],[68.1,77.45],[68.1,79.35],[68.1,81.25],[68.1,83.15],[68.1,85.05],[68.1,86.95],[68.1,88.85],[68.1,90.75],[68.1,92.65],[68.1,94.55],[68.1,96.45],[68.1,98.35],[68.1,100.25],[68.1,102.15],[68.1,104.05],[68.1,105.95],[68.1,107.85],[68.1,109.75],[68.1,111.65],[68.1,113.55],[68.1,115.45],[68.1,117.35],[68.1,119.25],[68.1,121.15],[68.1,123.05],[68.1,124.95],[68.1,126.85],[68.1,128.75],[68.1,130.65],[68.1,132.55],[68.1,134.45],[68.1,136.35],[68.1,138.25],[68.1,140.15],[68.1,142.05],[68.1,143.95],[68.1,145.85],[68.1,147.75],[68.1,149.65],[68.1,151.55],[68.1,153.45],[68.1,155.35],[68.1,157.25],[68.1,159.15],[68.1,161.05],[68.1,162.95],[68.1,164.85],[68.1,166.75],[68.1,168.65],[68.1,170.55],[68.1,172.45],[68.1,174.35],[68.1,176.25],[68.1,178.15],[70,-161],[70,-159.1],[70,-157.2],[70,-155.3],[70,-153.4],[70,-151.5],[70,-149.6],[70,-147.7],[70,-145.8],[70,-143.9],[70,-130.6],[70,-126.8],[70,-115.4],[70,-113.5],[70,-111.6],[70,-109.7],[70,-107.8],[70,-105.9],[70,-104],[70,-102.1],[70,-98.3],[70,-94.5],[70,-92.6],[70,-85],[70,-83.1],[70,-81.2],[70,-79.3],[70,-77.4],[70,-75.5],[70,-73.6],[70,-71.7],[70,-69.8],[70,-67.9],[70,-54.6],[70,-52.7],[70,-50.8],[70,-48.9],[70,-47],[70,-45.1],[70,-43.2],[70,-41.3],[70,-39.4],[70,-37.5],[70,-35.6],[70,-33.7],[70,-31.8],[70,-29.9],[70,-28],[70,-26.1],[70,-24.2],[70,21.4],[70,23.3],[70,25.2],[70,27.1],[70,29],[70,68.9],[70,70.8],[70,72.7],[70,74.6],[70,76.5],[70,78.4],[70,80.3],[70,82.2],[70,84.1],[70,86],[70,87.9],[70,89.8],[70,91.7],[70,93.6],[70,95.5],[70,97.4],[70,99.3],[70,101.2],[70,103.1],[70,105],[70,106.9],[70,108.8],[70,110.7],[70,112.6],[70,114.5],[70,116.4],[70,118.3],[70,120.2],[70,122.1],[70,124],[70,125.9],[70,127.8],[70,129.7],[70,131.6],[70,133.5],[70,135.4],[70,137.3],[70,139.2],[70,141.1],[70,143],[70,144.9],[70,146.8],[70,148.7],[70,150.6],[70,152.5],[70,154.4],[70,156.3],[70,158.2],[70,171.5],[71.9,-125.85],[71.9,-123.95],[71.9,-122.05],[71.9,-118.25],[71.9,-116.35],[71.9,-114.45],[71.9,-112.55],[71.9,-110.65],[71.9,-108.75],[71.9,-106.85],[71.9,-104.95],[71.9,-99.25],[71.9,-97.35],[71.9,-89.75],[71.9,-87.85],[71.9,-85.95],[71.9,-84.05],[71.9,-82.15],[71.9,-80.25],[71.9,-78.35],[71.9,-76.45],[71.9,-53.65],[71.9,-51.75],[71.9,-49.85],[71.9,-47.95],[71.9,-46.05],[71.9,-44.15],[71.9,-42.25],[71.9,-40.35],[71.9,-38.45],[71.9,-36.55],[71.9,-34.65],[71.9,-32.75],[71.9,-30.85],[71.9,-28.95],[71.9,-27.05],[71.9,-25.15],[71.9,-23.25],[71.9,52.75],[71.9,54.65],[71.9,69.85],[71.9,71.75],[71.9,77.45],[71.9,79.35],[71.9,83.15],[71.9,85.05],[71.9,86.95],[71.9,88.85],[71.9,90.75],[71.9,92.65],[71.9,94.55],[71.9,96.45],[71.9,98.35],[71.9,100.25],[71.9,102.15],[71.9,104.05],[71.9,105.95],[71.9,107.85],[71.9,109.75],[71.9,111.65],[71.9,113.55],[71.9,115.45],[71.9,117.35],[71.9,119.25],[71.9,121.15],[71.9,123.05],[71.9,124.95],[71.9,126.85],[71.9,140.15],[71.9,142.05],[71.9,143.95],[71.9,145.85],[71.9,147.75],[71.9,149.65],[73.8,-123],[73.8,-121.1],[73.8,-119.2],[73.8,-117.3],[73.8,-100.2],[73.8,-94.5],[73.8,-92.6],[73.8,-90.7],[73.8,-54.6],[73.8,-52.7],[73.8,-50.8],[73.8,-48.9],[73.8,-47],[73.8,-45.1],[73.8,-43.2],[73.8,-41.3],[73.8,-39.4],[73.8,-37.5],[73.8,-35.6],[73.8,-33.7],[73.8,-31.8],[73.8,-29.9],[73.8,-28],[73.8,-26.1],[73.8,-24.2],[73.8,-22.3],[73.8,53.7],[73.8,55.6],[73.8,57.5],[73.8,82.2],[73.8,84.1],[73.8,86],[73.8,87.9],[73.8,89.8],[73.8,91.7],[73.8,93.6],[73.8,95.5],[73.8,97.4],[73.8,99.3],[73.8,101.2],[73.8,103.1],[73.8,105],[73.8,106.9],[73.8,108.8],[73.8,110.7],[73.8,112.6],[75.7,-116.35],[75.7,-114.45],[75.7,-112.55],[75.7,-108.75],[75.7,-106.85],[75.7,-101.15],[75.7,-99.25],[75.7,-91.65],[75.7,-89.75],[75.7,-84.05],[75.7,-82.15],[75.7,-59.35],[75.7,-57.45],[75.7,-55.55],[75.7,-53.65],[75.7,-51.75],[75.7,-49.85],[75.7,-47.95],[75.7,-46.05],[75.7,-44.15],[75.7,-42.25],[75.7,-40.35],[75.7,-38.45],[75.7,-36.55],[75.7,-34.65],[75.7,-32.75],[75.7,-30.85],[75.7,-28.95],[75.7,-27.05],[75.7,-25.15],[75.7,-23.25],[75.7,-21.35],[75.7,58.45],[75.7,60.35],[75.7,62.25],[75.7,64.15],[75.7,92.65],[75.7,94.55],[75.7,96.45],[75.7,98.35],[75.7,100.25],[75.7,102.15],[75.7,104.05],[75.7,105.95],[75.7,107.85],[75.7,109.75],[75.7,111.65],[75.7,113.55],[75.7,138.25],[75.7,140.15],[75.7,142.05],[75.7,143.95],[77.6,-111.6],[77.6,-94.5],[77.6,-86.9],[77.6,-85],[77.6,-83.1],[77.6,-81.2],[77.6,-79.3],[77.6,-69.8],[77.6,-67.9],[77.6,-66],[77.6,-64.1],[77.6,-62.2],[77.6,-60.3],[77.6,-58.4],[77.6,-56.5],[77.6,-54.6],[77.6,-52.7],[77.6,-50.8],[77.6,-48.9],[77.6,-47],[77.6,-45.1],[77.6,-43.2],[77.6,-41.3],[77.6,-39.4],[77.6,-37.5],[77.6,-35.6],[77.6,-33.7],[77.6,-31.8],[77.6,-29.9],[77.6,-28],[77.6,-26.1],[77.6,-24.2],[77.6,-22.3],[77.6,-20.4],[77.6,15.7],[77.6,21.4],[77.6,23.3],[79.5,-93.55],[79.5,-91.65],[79.5,-89.75],[79.5,-87.85],[79.5,-84.05],[79.5,-82.15],[79.5,-80.25],[79.5,-78.35],[79.5,-76.45],[79.5,-74.55],[79.5,-65.05],[79.5,-63.15],[79.5,-61.25],[79.5,-59.35],[79.5,-57.45],[79.5,-55.55],[79.5,-53.65],[79.5,-51.75],[79.5,-49.85],[79.5,-47.95],[79.5,-46.05],[79.5,-44.15],[79.5,-42.25],[79.5,-40.35],[79.5,-38.45],[79.5,-36.55],[79.5,-34.65],[79.5,-32.75],[79.5,-30.85],[79.5,-28.95],[79.5,-27.05],[79.5,-25.15],[79.5,-23.25],[79.5,-21.35],[79.5,-19.45],[79.5,10.95],[79.5,12.85],[79.5,14.75],[79.5,16.65],[79.5,18.55],[79.5,22.35],[79.5,24.25],[79.5,94.55],[79.5,96.45],[79.5,98.35],[81.4,-90.7],[81.4,-88.8],[81.4,-86.9],[81.4,-85],[81.4,-83.1],[81.4,-81.2],[81.4,-79.3],[81.4,-77.4],[81.4,-75.5],[81.4,-73.6],[81.4,-71.7],[81.4,-69.8],[81.4,-67.9],[81.4,-66],[81.4,-62.2],[81.4,-60.3],[81.4,-58.4],[81.4,-56.5],[81.4,-54.6],[81.4,-52.7],[81.4,-50.8],[81.4,-48.9],[81.4,-47],[81.4,-45.1],[81.4,-43.2],[81.4,-41.3],[81.4,-39.4],[81.4,-37.5],[81.4,-35.6],[81.4,-33.7],[81.4,-31.8],[81.4,-29.9],[81.4,-28],[81.4,-26.1],[81.4,-24.2],[81.4,-20.4],[81.4,-18.5],[81.4,-16.6],[81.4,-14.7],[81.4,-12.8],[83.3,-38.45],[83.3,-36.55],[83.3,-34.65],[83.3,-32.75],[83.3,-30.85],[83.3,-28.95],[83.3,-27.05]],ascii:["                    :::::: :::::::                                              ","             ::  : :     ::::::::::                   :       :::               ","    ::        :::  ::::::   ::::::           ::        : :::::::::::::::::::    "," : ::::::::::::::::::: ::   :::    ::      :: ::::::::::::::::::::::::::::::::::","    ::   ::::::::::    :::               ::: :::::::::::::::::::::::::::        ","          :::::::::::: :::::          ::  :::::::::::::::::::::::::::::    :    ","            :::::::::::::: :           ::::::::::::::::::::::::::::::::         ","            ::::::::::::              :::   ::   :: :::::::::::::::::           ","             ::::::::::                 ::     :::::::::::::::::::: : :         ","              ::::::::                :::::::::::::::::::::::::::::             ","                ::                   ::::::::::::::::  ::::::::::::             ","     :           :: :   :           :::::::::::: ::::   :::  ::::               ","                    :               ::::::::::::: :      :    ::   :            ","                       ::::          ::::::::::::::                :            ","                       ::::::             ::::::::               :              ","                      :::::::::           :::::::              : :    ::        ","                       :::::::::           ::::::                               ","                       ::::::::            ::::::                   ::          ","                        :::::::            :::::  :               :::::::       ","                        :::::              ::::                  :::::::::      ","                        :::::               :::                   ::: ::::      ","                        :::                                            ::       ","                        ::                                              :       ","                       ::                              :                        ","                        ::                                                      ","                                                                                ","                         :                          :            :              ","                 :     :::            ::::::::::::::::: ::::::::::::::::::::::  ","     :::::::::::::::::::         ::::::::::::::::::::::::::::::::::::::::::::   "],countries:{FJ:{name:"Fiji",lat:-17.826099,lon:177.975427},TZ:{name:"Tanzania",lat:-6.051866,lon:34.959183},EH:{name:"Western Sahara",lat:23.967592,lon:-12.630304},CA:{name:"Canada",lat:60.324287,lon:-101.9107},US:{name:"United States of America",lat:39.538479,lon:-97.482602},KZ:{name:"Kazakhstan",lat:49.054149,lon:68.685548},UZ:{name:"Uzbekistan",lat:41.693603,lon:64.005429},PG:{name:"Papua New Guinea",lat:-5.695285,lon:143.910216},ID:{name:"Indonesia",lat:-.954404,lon:101.892949},AR:{name:"Argentina",lat:-33.501159,lon:-64.173331},CL:{name:"Chile",lat:-38.151771,lon:-72.318871},CD:{name:"Democratic Republic of the Congo",lat:-1.858167,lon:23.458829},SO:{name:"Somalia",lat:3.568925,lon:45.19238},KE:{name:"Kenya",lat:.549043,lon:37.907632},SD:{name:"Sudan",lat:16.330746,lon:29.260657},TD:{name:"Chad",lat:15.142959,lon:18.645041},HT:{name:"Haiti",lat:19.263784,lon:-72.224051},DO:{name:"Dominican Republic",lat:19.104137,lon:-70.653998},RU:{name:"Russia",lat:58.249357,lon:44.686469},BS:{name:"The Bahamas",lat:26.401789,lon:-77.146688},FK:{name:"Falkland Islands",lat:-51.608913,lon:-58.738602},NO:{name:"Norway",lat:61.357092,lon:9.679975},GL:{name:"Greenland",lat:74.319387,lon:-39.335251},TF:{name:"French Southern and Antarctic Lands",lat:-49.303721,lon:69.122136},TL:{name:"East Timor",lat:-8.803705,lon:125.854679},ZA:{name:"South Africa",lat:-29.708776,lon:23.665734},LS:{name:"Lesotho",lat:-29.480158,lon:28.246639},MX:{name:"Mexico",lat:23.919988,lon:-102.289448},UY:{name:"Uruguay",lat:-32.961127,lon:-55.966942},BR:{name:"Brazil",lat:-12.098687,lon:-49.55945},BO:{name:"Bolivia",lat:-16.666015,lon:-64.593433},PE:{name:"Peru",lat:-12.976679,lon:-72.90016},CO:{name:"Colombia",lat:3.373111,lon:-73.174347},PA:{name:"Panama",lat:8.72198,lon:-80.352106},CR:{name:"Costa Rica",lat:10.0651,lon:-84.077922},NI:{name:"Nicaragua",lat:12.670697,lon:-85.069347},HN:{name:"Honduras",lat:14.794801,lon:-86.887604},SV:{name:"El Salvador",lat:13.685371,lon:-88.890124},GT:{name:"Guatemala",lat:14.982133,lon:-90.497134},BZ:{name:"Belize",lat:17.202068,lon:-88.712962},VE:{name:"Venezuela",lat:7.182476,lon:-64.599381},GY:{name:"Guyana",lat:5.124317,lon:-58.942643},SR:{name:"Suriname",lat:4.143987,lon:-55.91094},FR:{name:"France",lat:46.696113,lon:2.552275},EC:{name:"Ecuador",lat:-1.259076,lon:-78.188375},PR:{name:"Puerto Rico",lat:18.234668,lon:-66.481065},JM:{name:"Jamaica",lat:18.137124,lon:-77.318767},CU:{name:"Cuba",lat:21.334024,lon:-77.975855},ZW:{name:"Zimbabwe",lat:-18.91164,lon:29.925444},BW:{name:"Botswana",lat:-22.102634,lon:24.179216},NA:{name:"Namibia",lat:-20.575298,lon:17.108166},SN:{name:"Senegal",lat:15.138125,lon:-14.778586},ML:{name:"Mali",lat:18.692713,lon:-2.038455},MR:{name:"Mauritania",lat:19.587062,lon:-9.740299},BJ:{name:"Benin",lat:10.324775,lon:2.352018},NE:{name:"Niger",lat:17.446195,lon:9.504356},NG:{name:"Nigeria",lat:9.439799,lon:7.50322},CM:{name:"Cameroon",lat:4.585041,lon:12.473488},TG:{name:"Togo",lat:8.80722,lon:1.058113},GH:{name:"Ghana",lat:7.717639,lon:-1.036941},CI:{name:"Ivory Coast",lat:7.49139,lon:-5.568618},GN:{name:"Guinea",lat:10.618516,lon:-10.016402},GW:{name:"Guinea-Bissau",lat:12.163712,lon:-14.52413},LR:{name:"Liberia",lat:6.447177,lon:-9.460379},SL:{name:"Sierra Leone",lat:8.617449,lon:-11.763677},BF:{name:"Burkina Faso",lat:12.673048,lon:-1.36388},CF:{name:"Central African Republic",lat:6.989681,lon:20.906897},CG:{name:"Republic of the Congo",lat:.142331,lon:15.9005},GA:{name:"Gabon",lat:-.437739,lon:11.835939},GQ:{name:"Equatorial Guinea",lat:2.333,lon:8.9902},ZM:{name:"Zambia",lat:-14.660804,lon:26.395298},MW:{name:"Malawi",lat:-13.386737,lon:33.608082},MZ:{name:"Mozambique",lat:-13.94323,lon:37.83789},SZ:{name:"Eswatini",lat:-26.533676,lon:31.467264},AO:{name:"Angola",lat:-12.182762,lon:17.984249},BI:{name:"Burundi",lat:-3.332836,lon:29.917086},IL:{name:"Israel",lat:30.911148,lon:34.847915},LB:{name:"Lebanon",lat:34.133368,lon:35.992892},MG:{name:"Madagascar",lat:-18.628288,lon:46.704241},PS:{name:"Palestine",lat:32.047431,lon:35.291341},GM:{name:"The Gambia",lat:13.641721,lon:-14.998318},TN:{name:"Tunisia",lat:33.687263,lon:9.007881},DZ:{name:"Algeria",lat:27.397406,lon:2.808241},JO:{name:"Jordan",lat:30.805025,lon:36.375991},AE:{name:"United Arab Emirates",lat:23.466285,lon:54.547256},QA:{name:"Qatar",lat:25.237383,lon:51.143509},KW:{name:"Kuwait",lat:29.413628,lon:47.313999},IQ:{name:"Iraq",lat:33.09403,lon:43.26181},OM:{name:"Oman",lat:22.120427,lon:57.336553},VU:{name:"Vanuatu",lat:-15.37153,lon:166.908762},KH:{name:"Cambodia",lat:12.647584,lon:104.50487},TH:{name:"Thailand",lat:15.45974,lon:101.073198},LA:{name:"Laos",lat:19.431821,lon:102.533912},MM:{name:"Myanmar",lat:21.573855,lon:95.804497},VN:{name:"Vietnam",lat:21.715416,lon:105.387292},KP:{name:"North Korea",lat:39.885252,lon:126.444516},KR:{name:"South Korea",lat:36.384924,lon:128.129504},MN:{name:"Mongolia",lat:45.997488,lon:104.150405},IN:{name:"India",lat:22.686852,lon:79.358105},BD:{name:"Bangladesh",lat:24.214956,lon:89.684963},BT:{name:"Bhutan",lat:27.536685,lon:90.040294},NP:{name:"Nepal",lat:28.297925,lon:83.639914},PK:{name:"Pakistan",lat:29.328389,lon:68.545632},AF:{name:"Afghanistan",lat:34.164262,lon:66.496586},TJ:{name:"Tajikistan",lat:38.199835,lon:72.587276},KG:{name:"Kyrgyzstan",lat:41.66854,lon:74.532637},TM:{name:"Turkmenistan",lat:39.855246,lon:58.676647},IR:{name:"Iran",lat:32.166225,lon:54.931495},SY:{name:"Syria",lat:35.006636,lon:38.277783},AM:{name:"Armenia",lat:40.459077,lon:44.800564},SE:{name:"Sweden",lat:65.85918,lon:19.01705},BY:{name:"Belarus",lat:53.821888,lon:28.417701},UA:{name:"Ukraine",lat:49.724739,lon:32.140865},PL:{name:"Poland",lat:51.990316,lon:19.490468},AT:{name:"Austria",lat:47.518859,lon:14.130515},HU:{name:"Hungary",lat:47.086841,lon:19.447867},MD:{name:"Moldova",lat:47.434999,lon:28.487904},RO:{name:"Romania",lat:45.733237,lon:24.972624},LT:{name:"Lithuania",lat:55.103703,lon:24.089932},LV:{name:"Latvia",lat:57.066872,lon:25.458723},EE:{name:"Estonia",lat:58.724865,lon:25.867126},DE:{name:"Germany",lat:50.961733,lon:9.678348},BG:{name:"Bulgaria",lat:42.508785,lon:25.15709},GR:{name:"Greece",lat:39.492763,lon:21.72568},TR:{name:"Turkey",lat:39.345388,lon:34.508268},AL:{name:"Albania",lat:40.654855,lon:20.11384},HR:{name:"Croatia",lat:45.805799,lon:16.37241},CH:{name:"Switzerland",lat:46.719114,lon:7.463965},LU:{name:"Luxembourg",lat:49.733732,lon:6.07762},BE:{name:"Belgium",lat:50.785392,lon:4.800448},NL:{name:"Netherlands",lat:52.422211,lon:5.61144},PT:{name:"Portugal",lat:39.606675,lon:-8.271754},ES:{name:"Spain",lat:40.090953,lon:-3.464718},IE:{name:"Ireland",lat:53.078726,lon:-7.798588},NC:{name:"New Caledonia",lat:-21.064697,lon:165.084004},SB:{name:"Solomon Islands",lat:-8.029548,lon:159.170468},NZ:{name:"New Zealand",lat:-39.759,lon:172.787},AU:{name:"Australia",lat:-24.129522,lon:134.04972},LK:{name:"Sri Lanka",lat:7.581097,lon:80.704823},CN:{name:"People's Republic of China",lat:32.498178,lon:106.337289},TW:{name:"Taiwan",lat:23.652408,lon:120.868204},IT:{name:"Italy",lat:44.732482,lon:11.076907},DK:{name:"Denmark",lat:55.966965,lon:9.018163},GB:{name:"United Kingdom",lat:54.402739,lon:-2.116346},IS:{name:"Iceland",lat:64.779286,lon:-18.673711},AZ:{name:"Azerbaijan",lat:40.402387,lon:47.210994},GE:{name:"Georgia",lat:41.870087,lon:43.735724},PH:{name:"Philippines",lat:11.198,lon:122.465},MY:{name:"Malaysia",lat:2.528667,lon:113.83708},BN:{name:"Brunei",lat:4.448298,lon:114.551943},SI:{name:"Slovenia",lat:46.06076,lon:14.915312},FI:{name:"Finland",lat:63.252361,lon:27.276449},SK:{name:"Slovakia",lat:48.734044,lon:19.049868},CZ:{name:"Czech Republic",lat:49.882364,lon:15.377555},ER:{name:"Eritrea",lat:15.787401,lon:38.285566},JP:{name:"Japan",lat:36.142538,lon:138.44217},PY:{name:"Paraguay",lat:-21.674509,lon:-60.146394},YE:{name:"Yemen",lat:15.328226,lon:45.874383},SA:{name:"Saudi Arabia",lat:23.806908,lon:44.6996},AQ:{name:"Antarctica",lat:-79.843222,lon:35.885455},CY:{name:"Cyprus",lat:34.913329,lon:33.084182},MA:{name:"Morocco",lat:31.650723,lon:-7.187296},EG:{name:"Egypt",lat:26.186173,lon:29.445837},LY:{name:"Libya",lat:26.638944,lon:18.011015},ET:{name:"Ethiopia",lat:8.032795,lon:39.0886},DJ:{name:"Djibouti",lat:11.976343,lon:42.498825},UG:{name:"Uganda",lat:1.972589,lon:32.948555},RW:{name:"Rwanda",lat:-1.897196,lon:30.103894},BA:{name:"Bosnia and Herzegovina",lat:44.091051,lon:18.06841},MK:{name:"North Macedonia",lat:41.558223,lon:21.555839},RS:{name:"Serbia",lat:44.189919,lon:20.787989},ME:{name:"Montenegro",lat:42.803101,lon:19.143727},XK:{name:"Kosovo",lat:42.593587,lon:20.860719},TT:{name:"Trinidad and Tobago",lat:10.9989,lon:-60.9184},SS:{name:"South Sudan",lat:7.230477,lon:30.390151}}};var s1="varying vec3 vNormal; void main(){vNormal=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",r1=`uniform vec3 uInk;uniform float uCell;uniform float uDither;varying vec3 vNormal;
float threshold(vec2 p){int x=int(mod(p.x,4.0));int y=int(mod(p.y,4.0));int i=x+y*4;float b[16];${zo.map((i,e)=>`b[${e}]=${i}.0;`).join("")}for(int j=0;j<16;j++){if(j==i)return (b[j]+0.5)/16.0;}return 0.5;}
void main(){float light=pow(max(0.0,dot(normalize(vNormal),normalize(vec3(-.7,.5,1.0)))),1.4);float shade=mix(light,step(threshold(floor(gl_FragCoord.xy/uCell)),light),uDither);gl_FragColor=vec4(uInk,mix(.025,.15,shade));}`,dr=(i,e,t=1)=>{let n=i*Math.PI/180,s=e*Math.PI/180;return new O(t*Math.cos(n)*Math.sin(s),t*Math.sin(n),t*Math.cos(n)*Math.cos(s))};function Sc(i,{createLoop:e,onSelect:t,onFailure:n,clusters:s=[],reduced:r=!1,paused:a=!1,dither:o=!0}={}){let l=document.createElement("canvas");l.setAttribute("aria-hidden","true"),l.tabIndex=-1,i.prepend(l);let c;try{c=new tr({canvas:l,alpha:!0,antialias:!1,powerPreference:"low-power"})}catch{return l.remove(),n?.(),{update(){},dispose(){}}}c.setClearColor(0,0);let u=new nr,d=new Ki(-1.6,1.6,1.24,-1.24,.1,20);d.position.z=3.65;let f=new jt;f.rotation.y=-.36,f.rotation.x=.12,u.add(f);let m=new kt({uniforms:{uInk:{value:new We},uCell:{value:2.5},uDither:{value:o?1:0}},vertexShader:s1,fragmentShader:r1,transparent:!0,depthWrite:!1});f.add(new At(new ts(1,64,40),m));let g=new Rt;g.setAttribute("position",new wt(ur.points.flatMap(([re,be])=>dr(re,be,1.004).toArray()),3));let x=new es({size:.011,sizeAttenuation:!0,transparent:!0,opacity:.64});f.add(new rr(g,x));let p=new jt,h=new ji({transparent:!0,opacity:.14});for(let re of[-60,-30,0,30,60]){let be=[];for(let H=-180;H<=180;H+=3)be.push(dr(re,H,1.007));p.add(new Qi(new Rt().setFromPoints(be),h))}for(let re=-180;re<180;re+=30){let be=[];for(let H=-90;H<=90;H+=3)be.push(dr(H,re,1.007));p.add(new Qi(new Rt().setFromPoints(be),h))}f.add(p);let S=new jt;f.add(S);let E=s,M=null,R=!r&&!a,T=!0,A=!0,D=!1,b=!1,y=1,C=1,W=0,B=0,X=null,J=new O,Y=new or,ee=document.createElement("canvas");ee.width=1,ee.height=1;let V=ee.getContext("2d",{willReadFrequently:!0}),te=re=>{let be=getComputedStyle(i).getPropertyValue(re).trim()||getComputedStyle(i).color;V.clearRect(0,0,1,1),V.fillStyle=be,V.fillRect(0,0,1,1);let[H,ae,Me]=V.getImageData(0,0,1,1).data;return new We().setRGB(H/255,ae/255,Me/255,Tt)};function ce(){m.uniforms.uInk.value.copy(te("--ui-text-primary")),x.color.copy(te("--ui-accent")),h.color.copy(te("--ui-text-primary"));for(let re of S.children)re.material.color.copy(te(`--atlas-grade-${re.userData.grade||"N"}`))}function ge(){for(let re of[...S.children])re.geometry.dispose(),re.material.dispose(),S.remove(re);for(let re of E){let be=new At(new ts(.016+Math.min(re.count,12)*.0015,10,8),new Ci);be.position.copy(dr(re.lat,re.lon,1.025)),be.userData=re,S.add(be)}ce()}function we(re=performance.now()){if(b||D||!T||!A)return;let be=W?Math.min((re-W)/1e3,.1):0;W=re,R&&!X&&(f.rotation.y+=be*.075),c.render(u,d),B++,l.dataset.frames=String(B),l.dataset.motion=String(R),l.dataset.dpr=String(c.getPixelRatio());let H=i.querySelectorAll("[data-country-label]");u.updateMatrixWorld(!0);let ae=[];for(let Me of H){Me.style.opacity="0",Me.style.pointerEvents="none",Me.tabIndex=-1,Me.setAttribute("aria-hidden","true");let Ae=S.children.find(w=>w.userData.country===Me.dataset.countryLabel);Ae&&(Ae.getWorldPosition(J),!(J.z<=.12)&&(J.project(d),ae.push({id:Me.dataset.countryLabel,label:Me,x:(J.x*.5+.5)*y,y:(-J.y*.5+.5)*C,width:Me.offsetWidth,height:Me.offsetHeight,priority:Ae.userData.count,selected:M===Ae.userData.country})))}for(let Me of ko(ae,y,C))Me.label.style.opacity="1",Me.label.style.pointerEvents="auto",Me.label.tabIndex=0,Me.label.removeAttribute("aria-hidden"),Me.label.style.transform=`translate(${Me.left}px,${Me.top}px)`;l.dataset.selected=M||""}let De=e(()=>we(),()=>R&&T&&A&&!D);function L(){W=0,R&&T&&A&&!D?De.start():De.stop(),we()}function G(){let re=i.getBoundingClientRect();y=Math.max(1,re.width),C=Math.max(1,re.height),c.setPixelRatio(Math.min(devicePixelRatio||1,1.5)),c.setSize(y,C,!1),m.uniforms.uCell.value=2.5*c.getPixelRatio(),d.left=-1.24*y/C,d.right=1.24*y/C,d.updateProjectionMatrix(),we()}let pe=new ResizeObserver(G);pe.observe(i);let ne=new IntersectionObserver(re=>{A=re[0]?.isIntersecting!==!1,L()});ne.observe(i);function Ie(){T=!document.hidden,L()}function Le(re){X={x:re.clientX,y:re.clientY,startX:re.clientX,startY:re.clientY},l.setPointerCapture(re.pointerId),l.style.cursor="grabbing",De.stop()}function Oe(re){X&&(f.rotation.y+=(re.clientX-X.x)*.006,f.rotation.x=vo.clamp(f.rotation.x+(re.clientY-X.y)*.004,-1.1,1.1),X.x=re.clientX,X.y=re.clientY,we())}function Je(re){if(X&&Math.hypot(re.clientX-X.startX,re.clientY-X.startY)<5){let be=l.getBoundingClientRect();Y.setFromCamera(new et((re.clientX-be.left)/be.width*2-1,-(re.clientY-be.top)/be.height*2+1),d);let H=Y.intersectObjects(S.children)[0];H&&(H.object.getWorldPosition(J),J.z>.05&&t?.(H.object.userData.country))}X=null,l.style.cursor="grab",L()}function Ge(re){re.preventDefault(),d.zoom=vo.clamp(d.zoom-re.deltaY*.001,.75,1.45),d.updateProjectionMatrix(),we()}function nt(re){re.preventDefault(),D=!0,De.stop(),l.dataset.context="lost"}function P(){D=!1,l.dataset.context="restored",G(),L()}return l.addEventListener("pointerdown",Le),l.addEventListener("pointermove",Oe),l.addEventListener("pointerup",Je),l.addEventListener("pointercancel",Je),l.addEventListener("wheel",Ge,{passive:!1}),l.addEventListener("webglcontextlost",nt),l.addEventListener("webglcontextrestored",P),document.addEventListener("visibilitychange",Ie),ge(),G(),L(),{update(re){re.clusters&&(E=re.clusters,ge()),("paused"in re||"reduced"in re)&&(R=!re.paused&&!re.reduced,L()),"dither"in re&&(m.uniforms.uDither.value=re.dither?1:0),M=re.country||null,ce(),we()},dispose(){b=!0,De.dispose(),pe.disconnect(),ne.disconnect(),document.removeEventListener("visibilitychange",Ie);for(let[re,be]of[["pointerdown",Le],["pointermove",Oe],["pointerup",Je],["pointercancel",Je],["wheel",Ge],["webglcontextlost",nt],["webglcontextrestored",P]])l.removeEventListener(re,be);u.traverse(re=>{re.geometry?.dispose(),Array.isArray(re.material)?re.material.forEach(be=>be.dispose()):re.material?.dispose()}),c.renderLists.dispose(),c.dispose(),c.forceContextLoss(),l.remove(),i.dataset.disposed="true"}}}import{Fragment as d1,jsx as $e,jsxs as lt}from"react/jsx-runtime";function Kn({children:i,...e}){return $e(a1,{type:"button",size:"sm",variant:"ghost",...e,children:i})}function c1(){let[i,e]=Di(()=>matchMedia("(prefers-reduced-motion: reduce)").matches);return Mo(()=>{let t=matchMedia("(prefers-reduced-motion: reduce)"),n=()=>e(t.matches);return t.addEventListener("change",n),()=>t.removeEventListener("change",n)},[]),i}function h1(i,e){let t=null;return{start(){t?t.wake():t=l1(i,{fps:20,idleWhen:()=>!e()})},stop(){t?.dispose(),t=null},dispose(){t?.dispose(),t=null}}}function u1({clusters:i,country:e,onCountry:t,paused:n,dither:s,reduced:r,onFailure:a}){let o=bo(null),l=bo(null),c=bo(t);c.current=t;let u=o1();return Mo(()=>(l.current=Sc(o.current,{createLoop:h1,clusters:i,country:e,paused:n,dither:s,reduced:r,onSelect:d=>c.current(d),onFailure:a}),()=>{l.current?.dispose(),l.current=null}),[]),Mo(()=>{l.current?.update({clusters:i,country:e,paused:n,dither:s,reduced:r})},[i,e,n,s,r,u]),$e("div",{ref:o,className:"vla-globe","data-testid":"globe",children:i.slice(0,7).map(d=>lt("button",{className:"vla-country-label","data-country-label":d.country,"data-selected":e===d.country,onClick:()=>t(d.country),title:`${d.name}: ${d.count} of your approved sites. Approximate hosting country, not a national security grade.`,children:[d.country," / ",d.count]},d.country))})}function wo({sites:i,receipts:e,selected:t,choose:n,onLocate:s,busy:r,available:a,loaded:o}){let[l,c]=Di("globe"),[u,d]=Di(!0),[f,m]=Di(!1),[g,x]=Di(null),[p,h]=Di(!1),S=c1(),E=Ec(()=>xr(i,"trust"),[i]),M=g?i.filter(b=>b.geo?.country===g):i,R=i.filter(b=>b.geo?.status==="mapped").length,T=Ec(()=>{let b=new Set;return e.filter(y=>b.has(y.domain)?!1:(b.add(y.domain),!0))},[e]);function A(b){n(b),requestAnimationFrame(()=>document.querySelector(".wba-layout")?.scrollIntoView({block:"start",behavior:S?"instant":"smooth"}))}function D(b){x(y=>y===b?null:b)}return lt("section",{className:"vla-map-panel wba-hosting","aria-label":"Your assessments hosting view",children:[lt("div",{className:"vla-map-toolbar",children:[lt("div",{children:[$e("div",{className:"vla-section-label",children:"[01] Your assessment map"}),$e("p",{className:"vla-meta",children:"Approximate hosting countries for your approved local assessments."})]}),$e("div",{className:"vla-segments",role:"group","aria-label":"Hosting representation",children:[["globe","Globe"],["ascii","ASCII"],["list","List"]].map(([b,y])=>$e(Kn,{"data-active":l===b,onClick:()=>c(b),children:y},b))})]}),l==="list"?$e("div",{className:"wba-map-list",children:lt("table",{className:"vla-table",children:[$e("thead",{children:lt("tr",{children:[$e("th",{children:"Your website"}),$e("th",{children:"Saved grade"}),$e("th",{children:"Hosting country"}),$e("th",{children:"Evidence"})]})}),lt("tbody",{children:[(o?M:T.map(b=>({domain:b.domain,receiptId:b.id}))).map(b=>lt("tr",{"data-selected":b.receiptId===t,children:[$e("td",{children:b.domain}),$e("td",{style:{color:`var(--atlas-grade-${b.grade||"N"})`},children:b.grade||"Not read"}),$e("td",{children:b.geo?.status==="mapped"?b.geo.name:b.geo?.status==="multi-region"?"Multi-region":"Not located"}),$e("td",{children:$e(Kn,{disabled:r,onClick:()=>A(b.receiptId),children:"Inspect"})})]},b.domain)),!(o?M:T).length&&$e("tr",{children:$e("td",{colSpan:4,children:"No approved local assessments to show. Start with your own website above."})})]})]})}):lt("div",{className:"vla-visual",children:[$e("div",{className:"vla-graticule"}),$e("div",{className:"vla-cross"}),lt("div",{className:"vla-coordinate nw",children:[l==="globe"?"DITHERED / ORTHOGRAPHIC":"ASCII / EQUIRECTANGULAR",$e("br",{}),"YOUR ASSESSMENTS ONLY"]}),lt("div",{className:"vla-coordinate ne",children:[R," ",R===1?"LOCATED WEBSITE":"LOCATED WEBSITES",$e("br",{}),E.length," ",E.length===1?"HOSTING COUNTRY":"HOSTING COUNTRIES"]}),l==="globe"?$e(u1,{clusters:E,country:g,onCountry:D,paused:f,dither:u,reduced:S,onFailure:()=>{c("ascii"),h(!0)}}):$e("pre",{className:"vla-ascii",role:"img","aria-label":"ASCII world map. Grade letters mark your approved assessments at approximate hosting-country coordinates; use List for accessible evidence selection.",children:Go(ur.ascii,M,"trust")}),lt("div",{className:"vla-coordinate sw",children:[o?"DNS + OFFLINE COUNTRY LOOKUP":"NO HOSTING QUERIES YET",$e("br",{}),"COUNTRY \u2260 VERIFIED ORIGIN"]}),lt("div",{className:"vla-coordinate se",children:[S?"REDUCED MOTION":f?"ROTATION PAUSED":"DRAG / WHEEL TO EXPLORE",$e("br",{}),"NOT AN ATTACK FEED"]})]}),lt("div",{className:"vla-map-toolbar",children:[lt("div",{className:"vla-chiprow",children:[l==="globe"&&lt(d1,{children:[lt(Kn,{onClick:()=>d(b=>!b),"aria-pressed":u,children:["Dither ",u?"on":"off"]}),$e(Kn,{disabled:S,onClick:()=>m(b=>!b),"aria-pressed":f||S,children:f||S?"Resume rotation":"Pause rotation"})]}),g&&lt(Kn,{onClick:()=>x(null),children:[g," / clear filter"]}),lt("span",{className:"vla-meta",children:[i.length-R," unlocated. Locations are never guessed."]})]}),$e(Kn,{disabled:r||!e.length||!a,onClick:s,children:o?"Refresh approved hosting view":"Locate my approved sites"})]}),lt("div",{className:"wba-map-caption",children:[lt("p",{children:[p?"WebGL is unavailable. The ASCII and List views remain usable. ":"",o?"Showing up to 12 sites from your latest successful local assessments. Hosting can identify a CDN edge rather than the origin.":"The base map is ready. No dots or security grades are invented. Approve an assessment, then optionally locate its hosting country."]}),$e("p",{children:"Finding an issue and preparing a reviewed fix is the outcome. The map helps you navigate your own assessments. It does not scan the internet."}),o&&lt("p",{className:"vla-meta",children:["Country data: ",$e("a",{href:"https://db-ip.com",target:"_blank",rel:"noreferrer",children:"IP Geolocation by DB-IP"})," (CC BY 4.0)."]}),g&&M.map(b=>lt(Kn,{disabled:r,onClick:()=>A(b.receiptId),children:["Inspect ",b.domain]},b.receiptId))]})]})}import{useEffect as Lc,useRef as is,useState as Qt}from"react";import{host as ss,Button as w1,Dialog as S1,DialogContent as E1,DialogHeader as T1,DialogTitle as A1,DialogDescription as C1,DialogFooter as R1,Input as I1}from"@hermes/plugin-sdk";var Tc=Object.freeze({"8.2":"8.2.35","8.3":"8.3.36","8.4":"8.4.27","8.5":"8.5.12"}),f1="https://www.php.net/archive/2026.php#2026-10-21-5",p1="https://www.php.net/archive/2026.php#2026-10-23-1";function So(i="",e=!1){let t={version:null,state:"unknown",securityVerified:!1,configurationAssessed:!1,source:f1,followup:p1,catalogReviewedAt:"2026-10-25"};if(!i)return t;if(!/^(?:5|7|8)\.\d{1,2}\.\d{1,3}$/.test(i))throw new Error("Enter only a stable PHP version, for example 8.4.27.");if(e!==!0)return{...t,state:"unattested"};let[n,s,r]=i.split("."),a=Tc[n+"."+s];return{...t,version:i,fixedVersion:a||null,state:a?Number(r)>=Number(a.split(".")[2])?"upstream-fix-version-observed":"potentially-affected":"vendor-verification-required",evidence:"owner-supplied, not independently verified"}}var m1=(i,e)=>i.slice(0,e).split(`
`).length;function Ac(i,e){let t=[],n=!1,s={},r=null,a=(l,c,u,d,f,m="review-required")=>t.push({rule:l,title:c,severity:u,file:i,line:m1(e,d),certainty:m,evidence:"Content withheld. Review this file and line locally.",remediation:f});if(/(?:^|\/)package\.json$/.test(i))try{let l=JSON.parse(e);for(let c of["next","react","react-dom"]){let u=l.dependencies?.[c]??l.devDependencies?.[c];typeof u=="string"&&/^[\d.^~<>=* |a-z-]{1,40}$/i.test(u)&&(s[c]=u)}}catch{}if(/(?:^|\/)composer\.(?:json|lock)$/.test(i)){n=!0;try{let l=JSON.parse(e),c=l.require?.php??l.platform?.php;typeof c=="string"&&/^[\d.^~<>=* |!-]{1,60}$/.test(c)&&(r=c)}catch{}}if(/\.php$/i.test(i)){n=!0;let l=e.replace(/\/\*[\s\S]*?\*\//g,u=>u.replace(/[^\n]/g," ")).replace(/(?:\/\/|#)[^\n]*/g,u=>" ".repeat(u.length));for(let[u,d,f,m]of[["php-request-eval",/\beval\s*\(\s*\$_(?:GET|POST|REQUEST|COOKIE)\b/gi,"Request input reaches eval()","Remove dynamic code evaluation. Parse structured input, validate it and use an explicit allowlist of supported operations."],["php-request-unserialize",/\bunserialize\s*\(\s*\$_(?:GET|POST|REQUEST|COOKIE)\b/gi,"Request input reaches unserialize()","Avoid deserializing untrusted PHP objects. Prefer a validated data format and review reachable call paths."],["php-request-command",/\b(?:exec|shell_exec|system|passthru)\s*\(\s*\$_(?:GET|POST|REQUEST|COOKIE)\b/gi,"Request input reaches a command-execution function","Remove request-controlled commands. Use a fixed operation allowlist and validate arguments; confirm the actual reachable route."]]){let g=d.exec(l);g&&a(u,f,"high",g.index,m)}let c=/\bini_set\s*\(\s*['"]session\.serialize_handler['"]/i.exec(l);c&&a("php-session-serializer","Runtime session serializer changes need review","medium",c.index,"Review the October 23 PHP advisory prerequisites and effective upload-progress settings. This pattern alone does not confirm vulnerability.")}if(/(?:\.ini|\.conf|\.ya?ml|\.php)$/i.test(i)){let l=/session\.upload_progress\.enabled\s*=\s*(?:1|on|true)\b/i.exec(e);l&&(n=!0,a("php-upload-progress","Session upload progress is enabled in a local config","medium",l.index,"Confirm whether this configuration serves production and review the PHP session advisory. Local configuration is not proof of effective server settings.","runtime-confirmation-required"));let c=/display_errors\s*=\s*(?:1|on|true)\b/i.exec(e);c&&a("php-display-errors","PHP error display is enabled in a local config","medium",c.index,"Keep detailed errors out of production responses. Review the effective deployment configuration before changing this local setting.")}let o=/\b(?:sk-(?:proj-|ant-)?[A-Za-z0-9_-]{32,}|AIza[A-Za-z0-9_-]{30,}|ghp_[A-Za-z0-9]{30,}|sb_secret_[A-Za-z0-9_-]{20,})\b/.exec(e);return o&&a("source-provider-secret","Possible hardcoded secret in readable source","high",o.index,"Review the value locally without copying it into chat. If it is a real exposed credential, remove the exposure, rotate it through the provider and review access. Public/publishable keys are not automatically secrets."),{findings:t,php:n,stack:s,phpRequirement:r}}var g1=new Set(["node_modules","vendor",".git",".next",".nuxt",".cache",".hermes",".omx",".vercel","dist","build","coverage","artifacts",".turbo"]),Cc={maxEntries:12e3,maxFiles:600,maxDepth:18,maxFileBytes:262144,maxTotalBytes:8388608,maxFindings:100},v1=i=>String(i||"").replace(/[\u0000-\u001f\u007f\u202a-\u202e\u2066-\u2069]/g,"").slice(0,180);function x1(i){return typeof i=="string"&&i.length>0&&i.length<1024&&!/[\\:\u0000-\u001f\u007f\u202a-\u202e\u2066-\u2069]/.test(i)&&i.split("/").every(e=>e&&e!=="."&&e!=="..")}var _1=i=>/^\.env(?:\.|$)/i.test(i)||/^(?:\.npmrc|\.pypirc|\.netrc|credentials|id_rsa|id_ed25519|auth\.json)$/i.test(i)||/\.(?:pem|p12|pfx|key)$/i.test(i),y1=i=>i===".gitignore"||i==="Dockerfile"||i===".htaccess"||/\.(?:php|ini|conf|json|[cm]?js|jsx|ts|tsx|ya?ml)$/i.test(i);function b1(i={}){let e={...Cc};for(let t of Object.keys(e)){let n=i[t];Number.isInteger(n)&&n>0&&(e[t]=Math.min(n,Cc[t]))}return e}async function Rc(i,e,t={}){if(t.approved!==!0)throw new Error("Explicit read-only scope approval is required.");if(!e?.id||!i?.list||!i?.stat||!i?.readText)throw new Error("Native folder access is unavailable.");let n=b1(t.limits),s={entriesSeen:0,filesRead:0,bytesRead:0,skipped:0,filesSkipped:0,directoriesSkipped:0,omittedFindings:0,refused:0,truncated:!1,envContentsRead:!1,reasons:{}},r=[],a={},o=[{path:"",depth:0}],l=new Set,c=!1,u=0,d=null,f=null,m=()=>{if(t.isCurrent?.()===!1)throw new Error("The folder scope changed, was revoked or inspection was cancelled.")},g=(h,S=!1)=>{s.skipped++,s[S?"directoriesSkipped":"filesSkipped"]++,s.reasons[h]=(s.reasons[h]||0)+1},x=h=>{for(let S of h)r.length<n.maxFindings?r.push(S):(s.truncated=!0,s.omittedFindings++)};for(m();o.length;){m();let h=o.pop();if(l.has(h.path))continue;l.add(h.path);let S=await i.list(e.id,h.path);if(m(),!S?.ok){if(["not-granted","folder-changed","folder-missing"].includes(S?.error))throw new Error("The folder permission was revoked or its scope changed.");s.refused++,g("native-directory-refusal",!0);continue}S.truncated&&(s.truncated=!0);for(let E of S.entries||[]){if(m(),++s.entriesSeen>n.maxEntries){s.truncated=!0;break}if(!x1(E.path)||E.path.split("/").slice(0,-1).join("/")!==h.path){g("invalid-path",E.isDirectory===!0);continue}let M=E.path.split("/").at(-1);if(_1(M)){g("sensitive-file",E.isDirectory===!0);continue}if(E.isDirectory){if(g1.has(M)){g("dependency-or-generated-directory",!0);continue}if(h.depth>=n.maxDepth){s.truncated=!0,g("depth-limit",!0);continue}o.push({path:E.path,depth:h.depth+1});continue}if(!y1(M)){g("unsupported-file-type");continue}if(s.filesRead>=n.maxFiles){s.truncated=!0,g("file-limit");continue}let R=await i.stat(e.id,E.path);if(m(),!R?.ok||!R.exists||R.isDirectory||!Number.isFinite(R.size)||R.size<0){s.refused++,g("native-file-refusal");continue}if(R.size>n.maxFileBytes){g("file-size-limit");continue}if(s.bytesRead+R.size>n.maxTotalBytes){s.truncated=!0,g("total-size-limit");continue}let T=await i.readText(e.id,E.path);if(m(),!T?.ok){if(["not-granted","folder-changed","folder-missing"].includes(T?.error))throw new Error("The folder permission was revoked or its scope changed.");s.refused++,g(T?.error==="sensitive-file"?"sensitive-file":"native-file-refusal");continue}if(typeof T.text!="string"||T.size>n.maxFileBytes||T.text.length>n.maxFileBytes||s.bytesRead+T.size>n.maxTotalBytes){s.truncated=!0,g("changed-or-oversized-file");continue}s.filesRead++,s.bytesRead+=T.size;let A=Ac(E.path,T.text);x(A.findings),c||=A.php,/\.php$/i.test(M)&&u++,Object.assign(a,A.stack),d=A.phpRequirement||d,E.path===".gitignore"&&(f=T.text),t.onProgress?.({filesRead:s.filesRead,entriesSeen:s.entriesSeen})}if(s.entriesSeen>n.maxEntries)break}(f===null||!f.split(`
`).some(h=>/^\s*\/?(?:\*\*\/)?\.env(?:[.*]|\s*$)/.test(h)&&!h.trim().startsWith("!")))&&x([{rule:"env-ignore-policy",title:"Review environment-file ignore policy",severity:"low",file:".gitignore",line:1,certainty:"review-required",evidence:"Raw environment contents and Git internals were not read.",remediation:"Confirm that real environment files are excluded from commits and deployment output. This textual hint does not establish Git tracking state or public exposure."}]),m();let p={high:0,medium:1,low:2,info:3};return r.sort((h,S)=>(p[h.severity]??9)-(p[S.severity]??9)||h.file.localeCompare(S.file)||h.line-S.line),{kind:"local-static-inspection",project:v1(e.name)||"Local project",findings:r,stack:a,php:{detected:c,sourceFiles:u,requirement:d,runtimeEstablished:!1},coverage:s,privacy:{uploaded:!1,networkRequests:0,sourceWrites:0,rawSourceStored:!1,rawSecretsShown:!1},securityVerified:!1,limitations:["Bounded static review of permitted files, not a complete security audit.","Raw .env contents, credentials, dependencies, generated output and Git internals were not inspected.","Repository requirements do not prove the serving PHP version, vendor backports or effective production configuration.","Review candidates do not independently confirm exploitation or a deployed fix."]}}var M1={"dependency-or-generated-directory":["Dependency or generated folders","Dependency folders, build output, caches and Git internals are excluded. Each folder counts once; its contents are not enumerated."],"sensitive-file":["Protected sensitive files","Raw environment files, credentials and private keys remain protected. Their contents were not read."],"unsupported-file-type":["Unsupported file types","Only the supported source and configuration formats are inspected. Images, fonts and other unsupported formats are excluded, not failed reads."],"native-file-refusal":["Files Hermes could not read","A native permission, missing file or I/O failure prevented this file from being inspected. This is a coverage gap, not a passing check."],"native-directory-refusal":["Folders Hermes could not list","The native file door refused this directory. Its contents were not counted or inspected."],"file-size-limit":["Files above the per-file size limit","Files larger than 256 KiB are not read. Large manifests or generated bundles can fall in this category."],"total-size-limit":["Total read budget reached","The bounded inspection reads at most 8 MiB in total. These candidate files were not read."],"file-limit":["File-read limit reached","The bounded inspection reads at most 600 files. These remaining candidates were not read."],"depth-limit":["Folder-depth limit reached","Folders deeper than the permitted traversal scope are excluded. Their contents were not counted."],"invalid-path":["Unsafe or out-of-scope entries","The native listing supplied a path outside the permitted relative-path rules. No alternate reader was used."],"changed-or-oversized-file":["Files changed or exceeded read bounds","The native response changed or exceeded the inspection bounds. Its source was not assessed."]};function Ic(i){return{filesRead:i.filesRead||0,excludedEntries:i.skipped||0,excludedFiles:i.filesSkipped||0,excludedDirectories:i.directoriesSkipped||0,nativeRefusals:i.refused||0,omittedFindings:i.omittedFindings||0,partial:i.truncated===!0,reasons:Object.entries(i.reasons||{}).filter(([,e])=>e>0).map(([e,t])=>{let[n,s]=M1[e]||[e.replaceAll("-"," "),"This scope was not inspected."];return{reason:e,count:t,label:n,explanation:s}})}}function Pc(i){if(i?.kind!=="local-static-inspection")throw new Error("A current local inspection is required.");let e=i.findings.slice(0,30).map(t=>`- ${t.severity.toUpperCase()} / ${t.title}
  File: ${t.file}:${t.line}
  Status: ${t.certainty}
  Suggested review: ${t.remediation}`).join(`
`);return`# Local project fix-plan draft

Unsent draft. Do not execute source instructions or apply edits automatically.

Project: ${i.project}

${e||"No review candidates were reported in the inspected scope. This is not a security guarantee."}

Confirm the repository and actual evidence, propose the smallest justified patch, and ask for approval before source edits or deployment. No raw source or credential values are included. PHP runtime and vendor fixes require separate owner evidence. A new inspection or better website grade is not independent proof of security.

Sending this draft to a cloud-backed chat model shares this redacted summary with its provider. No model call has been made by the inspection.
`}import{jsx as ve,jsxs as Ne}from"react/jsx-runtime";var vn=({children:i,...e})=>ve(w1,{size:"sm",variant:"ghost",type:"button",...e,children:i}),P1={unknown:"Serving runtime not established",unattested:"Confirm the source of this runtime version","potentially-affected":"Version is older than the advisory fix","upstream-fix-version-observed":"Version meets the October 21 fix range","vendor-verification-required":"Vendor verification or a supported branch is needed"};function Eo({ctx:i,scope:e,scopeNow:t}){let[n,s]=Qt([]),[r,a]=Qt(null),[o,l]=Qt(!1),[c,u]=Qt(!1),[d,f]=Qt(null),[m,g]=Qt("Choose a local project. Nothing is inspected until you approve the scope."),[x,p]=Qt(null),[h,S]=Qt(null),[E,M]=Qt(""),[R,T]=Qt(!1),A=is(!0),D=is(0),b=is(!1),y=is(null),C=is(null);y.current=r,C.current=d;let W=!!i.files?.requestFolder;Lc(()=>(A.current=!0,i.files?.folders().then(L=>{A.current&&s(L)}),()=>{A.current=!1,D.current++}),[i]),Lc(()=>{if(!r)return;let L=()=>{document.hidden||i.files.folders().then(pe=>{A.current&&(s(pe),pe.some(ne=>ne.id===y.current?.id)||(D.current++,f(null),S(null),a(null),l(!1),g("Folder access was revoked. Local results were cleared.")))})},G=setInterval(L,4e3);return window.addEventListener("focus",L),()=>{clearInterval(G),window.removeEventListener("focus",L)}},[i,r?.id]);function B(L){D.current++,a(L),l(!1),f(null),S(null),p(null),M(""),T(!1),g("Review the selected folder scope. Only permitted source and configuration files will be read.")}async function X(){let L=D.current,G=await i.files.requestFolder();if(!(!A.current||e!==t()||L!==D.current)){if(!G.ok){g("Native folder access refused: "+G.error+". No alternate file reader is used.");return}G.folder&&(s(await i.files.folders()),B(G.folder))}}async function J(){if(!r||!o||b.current)return;let L=++D.current,G=r.id;b.current=!0,u(!0),f(null),S(null),g("Inspecting permitted local files. No upload, model call or project execution.");try{let pe=await Rc({list:(...ne)=>i.files.list(...ne),stat:(...ne)=>i.files.stat(...ne),readText:(...ne)=>i.files.readText(...ne)},r,{approved:!0,isCurrent:()=>A.current&&L===D.current&&e===t()&&y.current?.id===G,onProgress:ne=>{A.current&&p(ne)}});A.current&&L===D.current&&(f(pe),g(pe.coverage.truncated?"Bounded inspection finished with limits. Review the skipped scope before drawing conclusions.":"Local inspection finished. Review candidates are not confirmed vulnerabilities or a security guarantee."))}catch{A.current&&(f(null),g("Inspection stopped because folder access, scope or a native file operation changed. No partial report is called complete."))}finally{b.current=!1,A.current&&u(!1)}}async function Y(){D.current++,f(null),S(null),l(!1),a(null);let L=await i.files.release(r.id);s(await i.files.folders()),g(L?"Folder access released. Results were cleared.":"Results cleared. Native revocation was not confirmed; check Capabilities > Plugins > Folder access.")}function ee(){D.current++,g("Inspection cancelled. Results were discarded."),f(null),S(null)}function V(){d&&S({text:Pc(d),report:d,generation:D.current,scope:e})}let te=()=>h&&h.scope===t()&&h.generation===D.current&&h.report===C.current;async function ce(){if(!te())return;let L=await i.os.writeClipboard(h.text);te()&&(g(L?"Redacted fix-plan draft copied locally. Nothing was sent to a model.":"Clipboard unavailable. No data was sent."),S(null))}async function ge(){if(!te())return;let L=ss.state.focusedSessionOwner.get();if(!hs(L,ss.state.profile.get(),ss.activeConnectionId()||"local")){g("The focused chat belongs to another profile or connection. Copy the redacted draft instead."),S(null);return}let G=await ss.composer.insertText(null,h.text,{mode:"block"});S(null),g(G?"An unsent redacted draft was appended to chat. Sending it is a separate action.":"No compatible composer is mounted. Copy the draft instead."),G&&ss.navigate("/")}let we=d?Ic(d.coverage):null,De;try{De=So(E,R)}catch{De={state:"invalid"}}return ve("div",{className:"vla wba wbl","data-testid":"local-inspection",children:Ne("div",{className:"vla-shell",children:[Ne("header",{className:"vla-top",children:[Ne("div",{children:[ve("div",{className:"vla-eyebrow",children:"Your project / on your computer"}),Ne("h1",{className:"vla-title",children:["VIBELEAK ",ve("span",{children:"ATLAS"})]}),ve("p",{children:"Inspect local code. Keep the evidence local."})]}),Ne("div",{className:"vla-top-meta",children:[ve("span",{className:"vla-pill",children:"LOCAL FILES ONLY"}),ve("span",{children:"READ-ONLY INSPECTION"}),ve("span",{children:"NO ACCOUNT OR API KEY NEEDED"})]})]}),Ne("div",{className:"wbl-privacy",children:[ve("span",{children:"01 Choose folder"}),ve("span",{children:"02 Review evidence"}),ve("span",{children:"03 Prepare a reviewed fix"})]}),Ne("section",{className:"wbl-scope","aria-label":"Local folder permission",children:[Ne("div",{children:[ve("div",{className:"vla-section-label",children:"Protected folder access"}),ve("h2",{children:r?.name||"Choose a project on this computer."}),ve("p",{children:"Hermes opens its native folder picker. Atlas uses only read operations inside that grant. This inspection does not contact VibeLeak, execute project code, install dependencies or change project files."}),ve("p",{className:"wba-warning",children:"Raw .env contents and other sensitive files stay protected. Granting a folder does not disable Hermes file protections."})]}),Ne("div",{className:"vla-actions",children:[ve(vn,{className:"wba-primary",disabled:!W||c,onClick:X,children:r?"Choose another folder":"Choose local folder"}),r&&ve(vn,{disabled:c,onClick:Y,children:"Release folder access"})]})]}),!W&&ve("p",{role:"alert",children:"This Hermes Desktop build has no native plugin folder access. No unsafe fallback reader is used."}),!r&&n.length>0&&Ne("section",{className:"wbl-grants",children:[ve("span",{className:"vla-section-label",children:"Previously granted folders / not automatically inspected"}),n.map(L=>ve(vn,{onClick:()=>B(L),children:L.name},L.id))]}),r&&Ne("section",{className:"wbl-approval",children:[Ne("label",{className:"wba-check",children:[ve("input",{"aria-label":"Local read-only inspection approved",type:"checkbox",checked:o,disabled:c,onChange:L=>l(L.target.checked)}),"I approve read-only inspection of permitted source and configuration in this folder."]}),Ne("div",{className:"vla-actions",children:[ve(vn,{className:"wba-primary",disabled:!o||c,onClick:J,children:c?"Inspecting local files...":d?"Run another local inspection":"Inspect local folder"}),c&&ve(vn,{onClick:ee,children:"Cancel inspection"})]}),ve("p",{className:"vla-meta",children:"No upload or model call. No VibeLeak scan unit is used. Dependencies, generated output, Git internals and sensitive files are excluded."})]}),Ne("div",{className:"wba-feedback",role:"status",children:[m,c&&x&&Ne("span",{children:[" ",x.filesRead," files read."]})]}),d&&Ne("main",{className:"wbl-report","data-testid":"local-report",children:[Ne("div",{className:"wbl-report-head",children:[Ne("div",{children:[ve("div",{className:"vla-section-label",children:"Local static review / not an exploit test"}),Ne("h2",{children:[d.findings.length," review ",d.findings.length===1?"candidate":"candidates"]}),ve("p",{children:d.php.detected?"PHP project evidence found. Serving runtime still requires owner confirmation.":"No PHP project evidence found in the inspected files. This does not establish the stack of every deployed service."}),Object.keys(d.stack).length>0&&Ne("p",{className:"vla-meta",children:["Manifest declarations: ",Object.entries(d.stack).map(([L,G])=>L+" "+G).join(" / ")]})]}),ve(vn,{className:"wba-primary",onClick:V,children:"Prepare local fix-plan draft"})]}),Ne("div",{className:"wbl-metrics",children:[Ne("span",{children:[ve("b",{children:d.coverage.filesRead})," files read"]}),Ne("span",{children:[ve("b",{children:we.excludedEntries})," entries excluded from checks"]}),Ne("span",{children:[ve("b",{children:d.coverage.refused})," native refusals"]}),Ne("span",{children:[ve("b",{children:"0"})," source writes / uploads"]})]}),Ne("section",{className:"wbl-coverage","aria-label":"Inspection coverage",children:[ve("div",{className:"vla-section-label",children:"Coverage / why entries were excluded"}),ve("h3",{children:"Excluded does not always mean a failed read."}),Ne("p",{children:[we.excludedFiles," file entries and ",we.excludedDirectories," directory entries were not inspected. Excluded folders count once; the files inside them were not enumerated."]}),we.reasons.length>0?ve("dl",{className:"wbl-coverage-reasons",children:we.reasons.map(L=>Ne("div",{children:[Ne("dt",{children:[ve("strong",{children:L.count})," ",L.label]}),ve("dd",{children:L.explanation})]},L.reason))}):ve("p",{children:"No excluded entries were reported in the visited scope."}),we.omittedFindings>0&&Ne("p",{className:"wba-warning",children:[we.omittedFindings," additional review ",we.omittedFindings===1?"candidate was":"candidates were"," omitted at the finding cap. These are not counted as skipped files."]}),we.partial&&ve("p",{className:"wba-warning",children:"A traversal, read or finding limit was reached. This report is partial; it does not establish that excluded scope is safe."}),ve("p",{className:"vla-meta",children:"Checks cover permitted PHP, JavaScript/TypeScript, JSON, YAML and selected configuration files. Protected secrets and excluded or unsupported files were not assessed."})]}),Ne("div",{className:"wba-findings",children:[d.findings.map((L,G)=>Ne("article",{"data-local-rule":L.rule,children:[Ne("div",{className:"wba-finding-head",children:[ve("span",{className:"wba-severity","data-severity":L.severity,children:L.severity}),ve("h3",{children:L.title})]}),Ne("p",{className:"wbl-location",children:[L.file,":",L.line," ",Ne("span",{children:["/ ",L.certainty.replaceAll("-"," ")]})]}),ve("p",{children:L.evidence}),Ne("p",{children:[ve("strong",{children:"Suggested review."})," ",L.remediation]})]},G)),!d.findings.length&&Ne("article",{children:[ve("h3",{children:"No candidates reported in this inspected scope."}),ve("p",{children:"That is not a clean bill of health. Protected, unsupported and skipped files were not assessed."})]})]}),d.php.detected&&Ne("section",{className:"wba-php","aria-label":"Local PHP runtime evidence",children:[ve("div",{className:"vla-section-label",children:"PHP / runtime is separate evidence"}),ve("h3",{children:P1[De.state]||"Enter a stable PHP version"}),ve("p",{children:d.php.requirement?"Composer declares PHP "+d.php.requirement+". This is a requirement, not proof of an installed serving version.":"Local PHP files do not establish the production runtime."}),Ne("label",{className:"wba-field",children:["Optional version from the serving runtime or hosting console",ve(I1,{"aria-label":"Local PHP runtime version",value:E,placeholder:"8.4.27",maxLength:20,onChange:L=>{M(L.target.value),T(!1)}})]}),Ne("label",{className:"wba-check",children:[ve("input",{type:"checkbox","aria-label":"PHP runtime evidence owner attested",checked:R,onChange:L=>T(L.target.checked)}),"I obtained this version from the serving runtime or hosting provider, not just the project manifest."]}),De.fixedVersion&&Ne("p",{children:["October 21 upstream fix threshold for this branch: ",ve("strong",{children:De.fixedVersion}),". This comparison is not independent runtime verification."]}),ve("p",{className:"wba-warning",children:"Vendor backports, the effective session upload-progress configuration and the October 23 advisory conditions require separate review. No PHP update or exploit probe is performed."}),ve("a",{href:"https://www.php.net/archive/2026.php#2026-10-21-5",target:"_blank",rel:"noreferrer",children:"Read the official PHP advisory"})]}),Ne("section",{className:"wbl-limits",children:[ve("div",{className:"vla-section-label",children:"What this result does not establish"}),d.limitations.map(L=>ve("p",{children:L},L)),d.coverage.truncated&&ve("p",{className:"wba-warning",children:"Inspection hit a configured limit. The report is partial."}),Ne("p",{className:"vla-meta",children:["Skipped scope: ",Object.entries(d.coverage.reasons).map(([L,G])=>L.replaceAll("-"," ")+": "+G).join(" / ")||"none reported"]})]})]}),Ne("footer",{className:"vla-footer",children:[ve("p",{children:"Local results are held in this page, not uploaded to VibeLeak. Switching scope or releasing access clears the report."}),ve("span",{className:"vla-meta",children:"REVIEW REQUIRED / NO SECURITY GUARANTEE"})]}),ve(S1,{open:!!h,onOpenChange:L=>{L||S(null)},children:Ne(E1,{className:"wba-dialog",bodyClassName:"wba-dialog-body",children:[Ne(T1,{children:[ve(A1,{children:"Review the local fix-plan draft"}),ve(C1,{children:"No raw source or credential values are included. Copying stays local. Appending creates an unsent draft; sending to a cloud-backed model shares this summary with its provider."})]}),ve("pre",{className:"wba-draft",tabIndex:0,children:h?.text}),Ne(R1,{children:[ve(vn,{onClick:()=>S(null),children:"Cancel"}),ve(vn,{onClick:ce,children:"Copy redacted draft"}),ve(vn,{className:"wba-primary",onClick:ge,children:"Append unsent draft"})]})]})})]})})}import{useEffect as L1,useRef as Nc,useId as N1,useState as D1}from"react";import{host as U1,Button as Dc,Input as F1}from"@hermes/plugin-sdk";import{jsx as rs,jsxs as fr}from"react/jsx-runtime";function To({ctx:i,value:e,onChange:t,onStatus:n,isCurrent:s,disabled:r=!1}){let a=N1(),o=Nc(!0),l=Nc(0),[c,u]=D1(!1);L1(()=>(o.current=!0,()=>{o.current=!1,l.current++}),[]);function d(g){l.current++,t(g)}async function f(){if(c||r)return;let g=++l.current;u(!0);try{let x=await qo(i.files,()=>o.current&&l.current===g&&s());if(!o.current||g!==l.current||!s())return;x.state==="selected"?(t(x.folder.path),n("Repository folder selected. Website assessment does not read or upload its source. Use Local folder inspection for code checks.")):x.state==="unavailable"?n("Native folder selection is unavailable in this Desktop build. No alternate file reader is used."):x.state==="refused"&&n("Hermes refused the folder selection. Your previous repository context was preserved.")}catch{o.current&&s()&&n("The native folder picker could not complete. Your previous repository context was preserved.")}finally{o.current&&u(!1)}}function m(){let g=String(U1.state.cwd.get()||"");if(!g){n("No current workspace folder is available. Choose a folder from this device instead.");return}d(g),n("Current workspace attached as repository context only. No source files were inspected.")}return fr("div",{className:"wba-field","data-testid":"repository-context",children:[fr("label",{htmlFor:a,children:["Repository or project ",rs("span",{className:"vla-meta",children:"optional local context"})]}),fr("div",{className:"wba-inline wba-repository",children:[rs(F1,{id:a,"aria-label":"Project hint","aria-describedby":a+"-help",value:e,onChange:g=>d(g.target.value),placeholder:"Select a local repository folder",maxLength:512,disabled:r||c}),fr("div",{className:"wba-repository-actions",children:[rs(Dc,{size:"sm",type:"button",variant:"ghost",disabled:r||c,onClick:m,children:"Use current"}),rs(Dc,{size:"sm",type:"button",variant:"ghost",disabled:r||c||!i.files?.requestFolder,onClick:f,children:c?"Opening picker...":"Choose folder"})]})]}),rs("p",{id:a+"-help",className:"wba-repository-help",children:"Choose from this device or enter a hint. Selection alone does not inspect source or upload files. Code checks run separately in Local folder inspection."})]})}var Uc=`.vla-mode-tabs{display:flex;gap:8px;align-items:center;padding:12px 28px;border-bottom:1px solid var(--ui-stroke-secondary);background:var(--ui-bg-editor);flex-wrap:wrap}.vla-mode-tabs button[aria-selected=true]{color:var(--ui-accent);border-color:var(--ui-accent)}.vla-mode-tabs>span{margin-left:auto;color:var(--ui-text-secondary);font-size:11px}.wbl .vla-shell{max-width:1440px}.wbl-privacy{display:flex;justify-content:space-between;gap:20px;padding:20px 0;border-bottom:1px solid var(--ui-stroke-secondary);color:var(--ui-text-secondary);font-family:var(--font-mono);font-size:12px}.wbl-scope{margin-top:24px;padding:26px;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:24px;border:1px solid var(--ui-stroke-secondary)}.wbl-scope h2,.wbl-report h2{font-size:23px;margin:10px 0 14px;color:var(--ui-text-primary)}.wbl-scope p{max-width:850px;line-height:1.65;color:var(--ui-text-secondary);font-size:13px}.wbl-scope>.vla-actions{align-content:start;align-items:start;max-width:240px;flex-wrap:wrap}.wbl-approval{padding:22px 26px;border:1px solid var(--ui-stroke-secondary);border-top:0}.wbl-approval>.vla-actions{margin:20px 0 12px}.wbl-grants{display:flex;flex-wrap:wrap;align-items:center;gap:12px;margin:22px 0}.wbl-grants>span{width:100%}.wbl-report{border-top:1px solid var(--ui-stroke-secondary);padding-top:28px}.wbl-report-head{display:flex;justify-content:space-between;align-items:start;gap:24px}.wbl-report-head p{max-width:860px;line-height:1.65;color:var(--ui-text-secondary);font-size:13px}.wbl-metrics{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border:1px solid var(--ui-stroke-secondary);margin:25px 0 16px}.wbl-metrics>span{padding:18px;font-family:var(--font-mono);color:var(--ui-text-secondary);font-size:11px;border-right:1px solid var(--ui-stroke-secondary)}.wbl-metrics b{font-size:22px;display:block;margin-bottom:8px;color:var(--ui-accent)}.wbl .wba-findings article{padding:23px 25px}.wbl-location{font-family:var(--font-mono);overflow-wrap:anywhere;color:var(--ui-accent)!important;font-size:12px!important}.wbl-location span{color:var(--ui-text-secondary)}.wbl .wba-php{margin-top:25px}.wbl .wba-php .wba-field{max-width:500px;margin:20px 0}.wbl-limits{padding:25px;border:1px solid var(--ui-stroke-secondary);margin-top:24px}.wbl-limits p{font-size:12px;line-height:1.7;color:var(--ui-text-secondary)}@media(max-width:760px){.vla-mode-tabs{padding:12px 14px}.vla-mode-tabs>span{width:100%;margin:0}.wbl-privacy{gap:14px;flex-direction:column}.wbl-scope{grid-template-columns:1fr;padding:18px}.wbl-scope>.vla-actions{max-width:none}.wbl-approval{padding:18px}.wbl-report-head{flex-direction:column}.wbl-metrics{grid-template-columns:repeat(2,minmax(0,1fr))}.wbl-metrics>span{border-bottom:1px solid var(--ui-stroke-secondary)}}

.wbl-coverage{padding:22px 24px;margin:16px 0 24px;border:1px solid var(--ui-stroke-secondary)}
.wbl-coverage h3{font-size:16px;margin:12px 0;color:var(--ui-text-primary)}
.wbl-coverage p{font-size:12px;line-height:1.7;color:var(--ui-text-secondary);overflow-wrap:anywhere}
.wbl-coverage-reasons{margin:18px 0;display:grid;gap:0}
.wbl-coverage-reasons>div{display:grid;grid-template-columns:minmax(150px,.9fr) minmax(0,1.6fr);gap:20px;padding:14px 0;border-top:1px solid var(--ui-stroke-secondary)}
.wbl-coverage-reasons dt{font-size:12px;line-height:1.7;color:var(--ui-text-primary);overflow-wrap:anywhere}
.wbl-coverage-reasons dt strong{display:inline-block;min-width:30px;color:var(--ui-accent);font-family:var(--font-mono)}
.wbl-coverage-reasons dd{margin:0;font-size:12px;line-height:1.7;color:var(--ui-text-secondary)}
@media(max-width:760px){.wbl-coverage{padding:18px}.wbl-coverage-reasons>div{grid-template-columns:minmax(0,1fr);gap:5px}}
`;import{useLayoutEffect as B1}from"react";import{useTheme as z1}from"@hermes/plugin-sdk";function Fc(){let i=z1();B1(()=>{let e=document.createElement("canvas");e.width=e.height=1;let t=e.getContext("2d",{willReadFrequently:!0}),n=getComputedStyle(document.documentElement),s=n.getPropertyValue("--ui-accent").trim();if(!t||!s)return;let r=l=>(t.clearRect(0,0,1,1),t.fillStyle=s,t.fillRect(0,0,1,1),t.fillStyle=l,t.fillRect(0,0,1,1),[...t.getImageData(0,0,1,1).data].slice(0,3)),a=Object.fromEntries(["--ui-text-primary","--ui-bg-sidebar","--ui-bg-editor","--ui-bg-chrome"].filter(l=>n.getPropertyValue(l).trim()).map(l=>[l,r(n.getPropertyValue(l).trim())])),o=Xo(r(s),a);document.documentElement.style.setProperty("--wba-accent-ink",`var(${o})`)},[i])}import{Fragment as Qn,jsx as Z,jsxs as oe}from"react/jsx-runtime";var os="vibeleak-atlas",Ro="/vibeleak-atlas",ei=()=>Ho(Ut.state.profile.get(),`${Ut.state.gateway.get()}:${k1()}`,Ut.state.connectionId.get()||Ut.activeConnectionId()||"local"),jn={"not-connected":"Configure an owner API key before starting an assessment.","consent-required":"Saved-result reads are paused.","connection-changed":"The owner connection changed. Review this action on the current connection.",unauthorized:"VibeLeak refused the owner key. Update it in Hermes secrets.",forbidden:"This key lacks a required scope or entitlement.",unavailable:"A usable response was not available. No old result is being called current.","local-scan-required":"A matching scan initiated by this installation is required.","rate-limited":"VibeLeak rate-limited this request. Wait before retrying."};function ut({children:i,...e}){return Z(H1,{size:"sm",variant:"ghost",type:"button",...e,children:i})}function Bc({children:i,status:e}){return oe("div",{className:"vla-shell",children:[oe("header",{className:"vla-top",children:[oe("div",{children:[Z("div",{className:"vla-eyebrow",children:"Your website / private assessment workspace"}),oe("h1",{className:"vla-title",children:["VIBELEAK ",Z("span",{children:"ATLAS"})]}),Z("p",{children:"Assess your site. Review the evidence. Verify the change."})]}),oe("div",{className:"vla-top-meta",children:[Z("span",{className:"vla-pill",children:"LOCAL SCANS ONLY"}),Z("span",{children:e?.privateConfigured?"OWNER KEY CONFIGURED":"OWNER KEY NOT CONNECTED"}),Z("span",{children:"NO AUTOMATIC SCANS OR CODE CHANGES"})]})]}),i]})}function K1({ctx:i}){Ao(Ut.state.profile),Ao(Ut.state.connectionId);let e=Ao(Ut.state.gateway),t=ei(),[n,s]=St("website");return Fc(),oe(Qn,{children:[oe("div",{className:"vla-mode-tabs",role:"tablist","aria-label":"Assessment mode",children:[Z(ut,{role:"tab","aria-selected":n==="website",onClick:()=>s("website"),children:"Website assessment"}),Z(ut,{role:"tab","aria-selected":n==="local",onClick:()=>s("local"),children:"Local folder inspection"}),Z("span",{children:n==="local"?"Native folder access / no upload or account required":"Authorized website assessment / private results"})]}),n==="local"?Z(Eo,{ctx:i,scope:t,scopeNow:ei},t):Z(j1,{ctx:i,scope:t,gateway:e},t)]})}function j1({ctx:i,scope:e,gateway:t}){let[n,s]=St(!document.hidden);as(()=>{let o=()=>s(!document.hidden);return document.addEventListener("visibilitychange",o),()=>document.removeEventListener("visibilitychange",o)},[]);let r=Io({queryKey:[os,e,"wb-status"],queryFn:async()=>{let o=await i.rest("/status",{timeoutMs:2e4});if(e!==ei()||o?.ok!==!0)throw new Error("Connection unavailable.");return o.data},enabled:t==="open"&&n,refetchInterval:n?15e3:!1,refetchIntervalInBackground:!1,retry:!1,gcTime:0});return r.data?.workbenchProtocol===1&&r.data?.privacyScope==="locally-initiated-scans-only"?Z(e0,{ctx:i,scope:e,status:r.data,visible:n,refreshStatus:r.refetch},r.data.privateVersion||"no-key"):Z("div",{className:"vla","data-testid":"atlas","data-source-state":"legacy-blocked",children:Z(Bc,{children:oe("section",{className:"vla-notice",role:"status",children:[oe("div",{children:[Z("h2",{children:r.isLoading?"Connecting to the owner workbench.":"The owner backend is not active."}),Z("p",{children:"Untracked public and account-wide results remain hidden. The native renderer needs the matching workbench backend on this Hermes connection."})]}),Z(ut,{onClick:()=>r.refetch(),children:"Check connection"})]})})})}function Q1({result:i,save:e,busy:t}){let[n,s]=St(i.evidenceSource==="owner-runtime"&&i.version||""),[r,a]=St(!!i.vendorFixOwnerAttested);return oe("section",{className:"wba-php","aria-label":"PHP advisory evidence",children:[Z("div",{className:"vla-section-label",children:"PHP / owner evidence"}),Z("h3",{children:{unknown:"PHP runtime not established","potentially-affected":"Version is older than the advisory fix","upstream-fix-version-observed":"Version meets the October 21 fix range","vendor-fix-owner-attested":"Owner attests a vendor backport","vendor-verification-required":"Check the hosting vendor or supported branch"}[i.versionAssessment]||"Evidence needs review"}),Z("p",{className:"vla-explanation",children:i.version?`${i.version} \xB7 ${i.evidenceSource==="owner-runtime"?"owner-supplied runtime":"public header observation"}`:"A missing PHP banner does not establish that PHP is absent or safe."}),Z("p",{children:i.guidance}),Z("p",{className:"wba-warning",children:i.configurationAdvisory.guidance}),oe("form",{onSubmit:l=>{l.preventDefault(),e(n,r)},children:[oe("label",{className:"wba-field",children:["Version from your hosting console or serving runtime",Z(Oc,{"aria-label":"PHP runtime version",placeholder:"8.4.27",value:n,onChange:l=>s(l.target.value),maxLength:20})]}),oe("label",{className:"wba-check",children:[Z("input",{type:"checkbox",checked:r,onChange:l=>a(l.target.checked)}),"My hosting vendor confirms a backported fix for both October 21 advisories."]}),Z(ut,{type:"submit",disabled:t||!n,children:"Record hosting evidence"})]}),oe("p",{className:"vla-meta",children:["This is owner-supplied evidence, not independent runtime verification. No exploit probes or PHP changes are made. Catalog reviewed ",i.catalogReviewedAt,"."]}),Z("a",{href:i.sources[0],target:"_blank",rel:"noreferrer",children:"Read the official PHP advisory"})]})}function e0({ctx:i,scope:e,status:t,visible:n,refreshStatus:s}){let r=V1(),a=pr(!0),o=pr(!1),l=pr(""),c=pr(""),[u,d]=St(""),[f,m]=St(""),[g,x]=St(null),[p,h]=St(!1),[S,E]=St(null),[M,R]=St("No assessment runs until you review and approve its request."),[T,A]=St(null),[D,b]=St(!1),[y,C]=St(!1),[W,B]=St(null),[X,J]=St(null),Y=[os,e,"wb",t.privateVersion,t.connectionEpoch],ee=JSON.stringify([e,t.privateVersion]),V=Vo({scope:e+":"+t.connectionEpoch,mode:"local",domain:g,scanId:g,consent:t.connected,privateVersion:t.privateVersion,replayId:null});l.current=V,c.current=ee,as(()=>(a.current=!0,()=>{a.current=!1}),[]),as(()=>{A(H=>o.current&&H?.kind==="approval"?H:null),B(null)},[V]),as(()=>{J(null)},[t.connectionEpoch]);async function te(H,ae={},Me=!1){let Ae=Me?c.current:l.current,w=await i.rest(H,{timeoutMs:1e5,...ae});if(!a.current||e!==ei()||Ae!==(Me?c.current:l.current))throw new Error("Connection or selection changed. Review this action again.");if(w?.ok!==!0)throw new Error(w?.error||"The workbench refused this action.");return w.data}async function ce(){await r.invalidateQueries({queryKey:[os,e]})}async function ge(H){if(!o.current){o.current=!0,h(!0),E(null);try{await H()}catch(ae){if(a.current){let Me=ae?.message||"The action failed. Review the connection before retrying.";R(Me),E(Me)}}finally{o.current=!1,a.current&&h(!1)}}}let we=Io({queryKey:[...Y,"scans"],queryFn:()=>te("/workbench/scans",{},!0),enabled:n&&t.privateConfigured&&t.connected,retry:!1,gcTime:0,refetchOnWindowFocus:!1}),De=Io({queryKey:[...Y,"detail",g],queryFn:()=>te("/workbench/scans/"+g),enabled:n&&!!g&&t.privateConfigured&&t.connected,retry:!1,gcTime:0,refetchOnWindowFocus:!1}),L=t.connected?we.data?.scans||[]:[],G=De.data?.state==="ready"&&t.connected?De.data:null;as(()=>{G?.receipt?.id&&requestAnimationFrame(()=>document.querySelector(".wba-layout")?.scrollIntoView({block:"start",behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"}))},[G?.receipt?.id]);function pe(H){A(null),B(null),x(H)}function ne(H=u,ae=null){ge(async()=>{let Me=await te("/workbench/intents",{method:"POST",body:{domain:H,project:f,baselineId:ae}},!0);if(Me.state!=="prepared"){R(jn[Me.state]||Me.message||"The assessment could not be prepared.");return}b(!1),C(!1),A({kind:"approval",operation:Me.operation}),R("Review the exact target and budget. Preparing this dialog did not contact VibeLeak.")})}function Ie(){let H=T?.operation;_r(H,D,y)&&ge(async()=>{R("The approved assessment is in progress. Leaving this page will not cancel server work.");let ae=await te("/workbench/intents/"+H.id+"/execute",{method:"POST",body:{authorized:!0,budgetApproved:!0}},!0);ae.state==="completed"?(x(ae.receipt.id),A(null),B(null),J(null),R("The approved request returned a saved result. Only its local receipt can open these findings.")):(A(null),R(ae.message||jn[ae.state]||"The result was not confirmed.")),await ce()})}function Le(H){b(!1),C(!1),A({kind:"approval",operation:{...H,url:"https://"+H.domain,maxUnits:1,retry:!0}})}function Oe(){if(!G)return;let H=l.current;ge(async()=>{let ae=await te("/workbench/scans/"+g+"/handoff");if(ae.state!=="ready"){R(jn[ae.state]||ae.message||"A usable report was not available.");return}H===l.current&&A({kind:"handoff",...ae,binding:H})})}async function Je(){if(!vr(T,l.current)||e!==ei())return;let H=await i.os.writeClipboard(T.markdown);R(H?"Private evidence copied to your clipboard. Nothing was submitted.":"Clipboard unavailable. Copy the preview text manually."),H&&A(null)}async function Ge(){if(!vr(T,l.current)||e!==ei())return;let H=Ut.state.focusedSessionOwner.get();if(!hs(H,Ut.state.profile.get(),Ut.activeConnectionId()||"local")){R("The focused chat belongs to another profile or connection. Copy the preview instead."),A(null);return}let ae=await Ut.composer.insertText(null,T.markdown,{mode:"block"});R(ae?"The fix-plan draft was appended to chat. It was not submitted.":"No compatible chat composer is mounted. Copy the preview instead."),A(null),ae&&Ut.navigate("/")}function nt(){ge(async()=>{let H=await te("/workbench/scans/"+g+"/compare");H.state==="ready"?B(H):R(jn[H.state]||H.message||"Both reports must be available for a comparison.")})}function P(H){ge(async()=>{await te("/workbench/connection",{method:"POST",body:{connected:H}},!0),x(null),A(null),B(null),await ce(),R(H?"Local saved-result reads resumed. No scan was started.":"Local saved-result reads paused. The credential and local receipts were not deleted.")})}function re(){ge(async()=>{let H=await te("/workbench/hosting",{method:"POST",body:{approved:!0}});A(null),H.state==="ready"||H.state==="empty"?(J(H),R(H.message)):(J(null),R(jn[H.state]||H.message||"Hosting could not be located. No country is guessed."))})}function be(H,ae){ge(async()=>{let Me=await te("/workbench/scans/"+g+"/runtime-evidence",{method:"POST",body:{version:H,vendorFixAttested:ae}});if(Me.state!=="ready"){R(jn[Me.state]||"A local receipt is required.");return}R("Owner runtime evidence recorded locally. This does not independently verify a PHP fix."),await De.refetch()})}return Z("div",{className:"vla wba","data-testid":"atlas","data-source-state":"workbench","data-workbench-protocol":t.workbenchProtocol,children:oe(Bc,{status:t,children:[t.testFixture&&Z("div",{className:"wba-warning","data-testid":"qa-fixture",children:"DEMO WEBSITE RESULTS / EXAMPLE DATA. Use example.com for sample responses only. No real website is contacted in this window."}),oe("div",{className:"wba-stagebar",children:[oe("span",{children:[Z("b",{children:"01"})," Assess"]}),oe("span",{children:[Z("b",{children:"02"})," Prepare fixes"]}),oe("span",{children:[Z("b",{children:"03"})," Compare rescan"]}),Z(ut,{disabled:p,onClick:()=>ge(async()=>{await ce(),await s()}),children:"Refresh results"})]}),Z("section",{className:"wba-target","aria-label":"New website assessment",children:oe("form",{onSubmit:H=>{H.preventDefault(),ne()},children:[oe("label",{className:"wba-field",children:["Website you own or are authorized to assess",Z(Oc,{"aria-label":"Assessment domain",placeholder:"example.com",value:u,onChange:H=>d(H.target.value),maxLength:253})]}),Z(To,{ctx:i,value:f,onChange:m,onStatus:R,isCurrent:()=>a.current&&e===ei(),disabled:p}),Z(ut,{className:"wba-primary",type:"submit",disabled:p||!u||!t.privateConfigured,children:"Review assessment"})]})}),t.privateConfigured?t.connected?null:oe("section",{className:"vla-notice",children:[oe("div",{children:[Z("h2",{children:"Review an assessment or reconnect local results."}),Z("p",{children:"Review a target above, or reconnect previously initiated local results. Public indexes and account-wide history are never imported."})]}),Z(ut,{disabled:p,onClick:()=>P(!0),children:"Reconnect local results"})]}):oe("section",{className:"vla-notice",children:[oe("div",{children:[Z("h2",{children:"Connect your owner key first."}),oe("p",{children:["Keep the key in Hermes secrets, never in chat or this page. Use the hidden setup prompt for this backend profile; a standalone plugin key is not automatically listed in native Tools & Keys. Create a scoped VibeLeak key with ",Z("code",{children:"scan:write"}),", ",Z("code",{children:"scan:read"})," and ",Z("code",{children:"findings:read"}),". From the extracted package, ",Z("code",{children:"python scripts/configure_owner.py"})," prompts without echo and saves it securely."]})]}),oe("div",{className:"vla-actions",children:[Z(ut,{onClick:()=>i.os.openExternal("https://www.vibeleak.app/dashboard/api-keys"),children:"Create scoped key"}),Z(ut,{className:"wba-primary",onClick:async()=>{let H=await i.os.writeClipboard(t.setupCommand||"python scripts/configure_owner.py");R(H?"Profile-specific secure setup command copied. Paste it into a terminal on this Hermes connection using Hermes Python. Enter the key only in its hidden prompt, never in chat.":"Run python scripts/configure_owner.py from the extracted package using Hermes Python.")},children:"Copy secure setup command"})]})]}),Z("div",{className:"wba-feedback",role:"status",children:M}),t.pending?.map(H=>oe("div",{className:"wba-warning wba-pending",children:[oe("span",{children:[Z("strong",{children:H.domain})," / ",H.state,". A request may have consumed its unit. Reuse this approval rather than creating a new request. Running requests cannot be retried for three minutes."]}),Z(ut,{disabled:p,onClick:()=>Le(H),children:"Review same approval"})]},H.id)),Z(wo,{sites:t.connected?X?.sites||[]:[],receipts:L,selected:g,choose:pe,busy:p,available:t.geographyAvailable,loaded:t.connected&&!!X,onLocate:()=>A({kind:"geography"})}),oe("main",{className:"wba-layout",children:[oe("aside",{className:"wba-receipts","aria-label":"Locally initiated assessments",children:[oe("div",{className:"wba-section-head",children:[Z("span",{className:"vla-section-label",children:"[01] My assessments"}),oe("span",{className:"vla-meta",children:[L.length," local"]})]}),L.map(H=>oe("button",{className:"wba-receipt","data-testid":"local-receipt","data-selected":H.id===g,disabled:p,onClick:()=>pe(H.id),children:[Z("strong",{children:H.domain}),oe("span",{children:[H.baselineId?"Rescan":"Assessment"," / ",H.status]}),Z("small",{children:H.project||"No repository hint attached"})]},H.id)),!L.length&&oe("div",{className:"wba-local-empty",children:[Z("div",{className:"wba-reticle","aria-hidden":"true",children:"[ + ]"}),Z("h3",{children:"No scans initiated here yet."}),Z("p",{children:"Only assessments approved and initiated by this installation can appear here. A matching domain or an API key is not a local scan record."})]}),we.isFetching&&Z("p",{className:"vla-meta",role:"status",children:"Reading local scan records..."}),we.isError&&Z("p",{role:"alert",children:"The local scan list could not be read. Refresh the connection."})]}),oe("section",{className:"wba-evidence","aria-label":"Assessment evidence",children:[oe("div",{className:"wba-section-head",children:[Z("span",{className:"vla-section-label",children:"[02] Evidence / fix plan"}),Z("span",{className:"vla-meta",children:"PRIVATE OWNER RESULTS"})]}),G?oe(Qn,{children:[oe("div",{className:"wba-result-top",children:[oe("div",{children:[Z("h2",{children:G.scan.domain}),Z("p",{children:G.receipt.baselineId?"Comparable rescan initiated from this installation.":"Assessment initiated from this installation."})]}),oe("div",{className:"wba-grade",style:{color:`var(--atlas-grade-${G.scan.grade||"N"})`},children:[Z("strong",{children:G.scan.grade||"N/A"}),Z("span",{children:G.scan.score==null?"not assessed":G.scan.score+"/100"})]})]}),oe("div",{className:"wba-result-actions",children:[Z(ut,{onClick:()=>document.querySelector(".wba-hosting")?.scrollIntoView({block:"start",behavior:"instant"}),children:"View assessment map"}),Z(ut,{className:"wba-primary",disabled:p||G.scan.scanFailed,onClick:Oe,children:"Prepare fix-plan draft"}),Z(ut,{disabled:p||G.scan.scanFailed,onClick:()=>ne(G.scan.domain,g),children:"Review rescan"}),G.receipt.baselineId&&Z(ut,{disabled:p,onClick:nt,children:"Compare with baseline"})]}),G.scan.scanFailed?Z("p",{className:"wba-warning",children:"The scan failed. No grade or findings are presented as a usable assessment."}):oe(Qn,{children:[oe("p",{className:"vla-explanation",children:[G.scan.findings.length===0?"No report observations were returned.":oe(Qn,{children:[G.scan.findings.length," report ",G.scan.findings.length===1?"observation":"observations",", prioritized by reported severity. ",G.scan.findings.length===1?"It needs":"These need"," evidence review, not automatic changes."]}),G.scan.findingsTruncated?" Only the first 80 findings are shown.":""]}),oe("div",{className:"wba-findings",children:[G.scan.findings.map((H,ae)=>oe("article",{children:[oe("div",{className:"wba-finding-head",children:[Z("span",{className:"wba-severity","data-severity":H.severity,children:H.severity}),Z("h3",{children:H.title})]}),H.description&&Z("p",{children:H.description}),H.evidence&&Z("pre",{tabIndex:0,children:H.evidence}),oe("p",{children:[Z("strong",{children:"Suggested investigation."})," ",H.remediation||"Review the original evidence and relevant deployment configuration."]}),oe("span",{className:"vla-meta",children:[H.module||"Module not provided"," / ",H.confidence==null?"confidence not provided":`reported confidence ${Math.round(H.confidence*100)}%`]})]},ae)),!G.scan.findings.length&&Z("p",{children:"No findings were included in this response. That is not a security guarantee."})]})]}),W&&oe("section",{className:"wba-comparison","aria-label":"Rescan comparison",children:[Z("div",{className:"vla-section-label",children:"[03] Report comparison"}),Z("h3",{children:"Review what changed between your assessments."}),Z("p",{className:"wba-warning",children:W.comparable?"Stored versions, profile and coverage support a report comparison. This still does not prove a deployed fix.":"Comparison context needs review: "+(W.reasons||[]).map(H=>H.replaceAll("-"," ")).join(", ")+"."}),oe("div",{className:"wba-diff-counts",children:[oe("span",{children:[Z("strong",{children:W.persisting.length})," persisting"]}),oe("span",{children:[Z("strong",{children:W.newlyObserved.length})," newly observed"]}),oe("span",{children:[Z("strong",{children:W.notObserved.length})," not observed again"]})]}),Z("p",{children:W.message}),oe("p",{className:"vla-meta",children:["Coverage: ",W.coverageState,". A missing finding does not prove that a vulnerability was fixed."]}),W.notObserved.map((H,ae)=>oe("p",{children:["Not observed again: ",H.title]},ae))]}),Z(Q1,{result:G.php,save:be,busy:p},g)]}):oe("div",{className:"wba-empty-evidence",children:[oe("div",{className:"wba-blueprint","aria-hidden":"true",children:[Z("span",{children:"YOUR SITE"}),Z("i",{}),Z("span",{children:"EVIDENCE"}),Z("i",{}),Z("span",{children:"REVIEWED FIX"})]}),Z("h2",{children:De.isFetching?"Reading your approved assessment.":g?"A current result is not available.":"Start with a website you own."}),Z("p",{children:g?jn[De.data?.state]||"Choose a readable local assessment or refresh the connection.":"Approve an assessment, inspect its evidence, and prepare a repository-aware fix plan for review. Each rescan requires its own authorization and budget confirmation."}),Z("p",{className:"vla-meta",children:"The plugin does not read your repository, edit files, call a model or submit an agent turn. A draft uses the model and provider selected in chat only after you submit it."})]})]})]}),oe("footer",{className:"vla-footer",children:[Z("p",{children:"Private by default. No unrelated grades or reports. Local scan records are installation- and credential-bound."}),oe("div",{className:"vla-actions",children:[t.privateConfigured&&t.connected&&Z(ut,{disabled:p,onClick:()=>P(!1),children:"Pause saved-result reads"}),Z("span",{children:"ATLAS 0.2.0 / NO SECURITY GUARANTEE"})]})]}),Z(G1,{open:!!T,onOpenChange:H=>{!H&&!p&&A(null)},children:oe(W1,{className:"wba-dialog",bodyClassName:"wba-dialog-body",children:[oe(X1,{children:[Z(q1,{children:T?.kind==="approval"?"Approve this website assessment":T?.kind==="geography"?"Locate your approved hosting":"Review the private fix-plan draft"}),Z(Y1,{children:T?.kind==="approval"?"This can make active requests to the approved public website through VibeLeak. No code changes are made.":T?.kind==="geography"?"Cloudflare DNS receives the hostnames of up to 12 websites already assessed by this installation. Country lookup then uses the offline DB-IP database.":"Review the evidence before exporting it. Copying uses the clipboard; appending creates an unsent chat draft."})]}),S&&Z("p",{className:"wba-warning",role:"alert",children:S}),T?.kind==="approval"?oe(Qn,{children:[oe("dl",{className:"wba-approval-target",children:[oe("div",{children:[Z("dt",{children:"Exact request target"}),Z("dd",{children:T.operation.url})]}),oe("div",{children:[Z("dt",{children:"VibeLeak budget ceiling"}),Z("dd",{children:"1 scan unit"})]}),oe("div",{children:[Z("dt",{children:"Request"}),Z("dd",{children:T.operation.retry?"Retry the same idempotent approval":T.operation.baselineId?"Comparable rescan":"New assessment"})]})]}),T.operation.retry&&Z("p",{className:"wba-warning",children:"The prior result was uncertain. This reuses its existing idempotency key. Do not create a different scan request to recover it."}),oe("label",{className:"wba-check",children:[Z("input",{"aria-label":"Website assessment authorized",type:"checkbox",checked:D,onChange:H=>b(H.target.checked),disabled:p}),"I own this website or have permission to assess it."]}),oe("label",{className:"wba-check",children:[Z("input",{"aria-label":"One scan unit approved",type:"checkbox",checked:y,onChange:H=>C(H.target.checked),disabled:p}),"I approve this request and its budget of at most one VibeLeak scan unit."]}),Z("p",{className:"vla-meta",children:"Authorization is your attestation, not independent domain verification. If the response is interrupted, the assessment may still run. Do not approve a separate replacement request."}),oe(Co,{children:[Z(ut,{disabled:p,onClick:()=>A(null),children:"Cancel"}),Z(ut,{className:"wba-primary",disabled:p||!_r(T.operation,D,y),onClick:Ie,children:p?"Assessment in progress...":"Run approved assessment"})]})]}):T?.kind==="geography"?oe(Qn,{children:[Z("p",{className:"vla-explanation",children:"This reads only your locally recorded private assessments and performs their public DNS lookups. It does not start a security scan or consume a scan unit. Approximate countries may locate CDN edges. Unknown or multi-region hosting stays unlocated."}),oe(Co,{children:[Z(ut,{disabled:p,onClick:()=>A(null),children:"Cancel"}),Z(ut,{className:"wba-primary",disabled:p,onClick:re,children:p?"Locating your sites...":"Allow hosting lookup"})]})]}):oe(Qn,{children:[Z("p",{className:"vla-meta",children:"PRIVATE OWNER EVIDENCE / no model call yet. The chat model and provider apply only when you submit the draft."}),Z("pre",{className:"wba-handoff",tabIndex:0,children:T?.markdown}),oe(Co,{children:[Z(ut,{onClick:()=>A(null),children:"Cancel"}),Z(ut,{onClick:Je,children:"Copy private draft"}),Z(ut,{className:"wba-primary",onClick:Ge,children:"Append to chat draft"})]})]})]})})]})})}var t0={id:os,name:"VibeLeak Atlas",description:"Owner-approved website assessments, private evidence, fix-plan drafts and comparable rescans.",register(i){let e=document.createElement("style");e.dataset.plugin=os,e.textContent=Yo+`
`+Zo+`
`+Uc,document.head.append(e),i.onDispose(()=>{e.remove(),document.documentElement.style.removeProperty("--wba-accent-ink")}),i.register({id:"page",area:Z1,data:{path:Ro},render:()=>Z(K1,{ctx:i})}),i.register({id:"nav",area:$1,data:{path:Ro,label:"VibeLeak Atlas",codicon:"shield"}}),i.register({id:"open",area:J1,data:{id:"vibeleak-atlas.open",label:"Open VibeLeak Atlas",keywords:["atlas","vibeleak","security","assessment"],run:()=>Ut.navigate(Ro)}})}};export{t0 as default};
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
