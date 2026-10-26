// Static review rules only. Never execute source or return source excerpts.
export const PHP_FIXES=Object.freeze({'8.2':'8.2.35','8.3':'8.3.36','8.4':'8.4.27','8.5':'8.5.12'});
export const PHP_SOURCE='https://www.php.net/archive/2026.php#2026-10-21-5';
export const PHP_FOLLOWUP='https://www.php.net/archive/2026.php#2026-10-23-1';
export function assessLocalRuntime(version='',attested=false){
  const base={version:null,state:'unknown',securityVerified:false,configurationAssessed:false,source:PHP_SOURCE,followup:PHP_FOLLOWUP,catalogReviewedAt:'2026-10-25'};
  if(!version)return base;
  if(!/^(?:5|7|8)\.\d{1,2}\.\d{1,3}$/.test(version))throw new Error('Enter only a stable PHP version, for example 8.4.27.');
  if(attested!==true)return {...base,state:'unattested'};
  const [major,minor,patch]=version.split('.'),fixed=PHP_FIXES[major+'.'+minor];
  return {...base,version,fixedVersion:fixed||null,state:fixed?(Number(patch)>=Number(fixed.split('.')[2])?'upstream-fix-version-observed':'potentially-affected'):'vendor-verification-required',evidence:'owner-supplied, not independently verified'};
}
const lineAt=(text,index)=>text.slice(0,index).split('\n').length;
export function inspectSource(file,text){
  const findings=[];let php=false,stack={},phpRequirement=null;
  const add=(rule,title,severity,index,remediation,certainty='review-required')=>findings.push({rule,title,severity,file,line:lineAt(text,index),certainty,evidence:'Content withheld. Review this file and line locally.',remediation});
  if(/(?:^|\/)package\.json$/.test(file)){
    try{const data=JSON.parse(text);for(const name of ['next','react','react-dom']){const value=data.dependencies?.[name]??data.devDependencies?.[name];if(typeof value==='string'&&/^[\d.^~<>=* |a-z-]{1,40}$/i.test(value))stack[name]=value}}catch{}
  }
  if(/(?:^|\/)composer\.(?:json|lock)$/.test(file)){
    php=true;
    try{const data=JSON.parse(text),v=data.require?.php??data.platform?.php;if(typeof v==='string'&&/^[\d.^~<>=* |!-]{1,60}$/.test(v))phpRequirement=v}catch{}
  }
  if(/\.php$/i.test(file)){
    php=true;
    // Preserve line positions while dropping comments. This is not a PHP parser.
    const code=text.replace(/\/\*[\s\S]*?\*\//g,m=>m.replace(/[^\n]/g,' ')).replace(/(?:\/\/|#)[^\n]*/g,m=>' '.repeat(m.length));
    for(const [rule,pattern,title,remediation] of [
      ['php-request-eval',/\beval\s*\(\s*\$_(?:GET|POST|REQUEST|COOKIE)\b/gi,'Request input reaches eval()','Remove dynamic code evaluation. Parse structured input, validate it and use an explicit allowlist of supported operations.'],
      ['php-request-unserialize',/\bunserialize\s*\(\s*\$_(?:GET|POST|REQUEST|COOKIE)\b/gi,'Request input reaches unserialize()','Avoid deserializing untrusted PHP objects. Prefer a validated data format and review reachable call paths.'],
      ['php-request-command',/\b(?:exec|shell_exec|system|passthru)\s*\(\s*\$_(?:GET|POST|REQUEST|COOKIE)\b/gi,'Request input reaches a command-execution function','Remove request-controlled commands. Use a fixed operation allowlist and validate arguments; confirm the actual reachable route.']
    ]){const match=pattern.exec(code);if(match)add(rule,title,'high',match.index,remediation)}
    const serializer=/\bini_set\s*\(\s*['"]session\.serialize_handler['"]/i.exec(code);
    if(serializer)add('php-session-serializer','Runtime session serializer changes need review','medium',serializer.index,'Review the October 23 PHP advisory prerequisites and effective upload-progress settings. This pattern alone does not confirm vulnerability.');
  }
  if(/(?:\.ini|\.conf|\.ya?ml|\.php)$/i.test(file)){
    const enabled=/session\.upload_progress\.enabled\s*=\s*(?:1|on|true)\b/i.exec(text);
    if(enabled){php=true;add('php-upload-progress','Session upload progress is enabled in a local config','medium',enabled.index,'Confirm whether this configuration serves production and review the PHP session advisory. Local configuration is not proof of effective server settings.','runtime-confirmation-required')}
    const debug=/display_errors\s*=\s*(?:1|on|true)\b/i.exec(text);
    if(debug)add('php-display-errors','PHP error display is enabled in a local config','medium',debug.index,'Keep detailed errors out of production responses. Review the effective deployment configuration before changing this local setting.');
  }
  const secret=/\b(?:sk-(?:proj-|ant-)?[A-Za-z0-9_-]{32,}|AIza[A-Za-z0-9_-]{30,}|ghp_[A-Za-z0-9]{30,}|sb_secret_[A-Za-z0-9_-]{20,})\b/.exec(text);
  if(secret)add('source-provider-secret','Possible hardcoded secret in readable source','high',secret.index,'Review the value locally without copying it into chat. If it is a real exposed credential, remove the exposure, rotate it through the provider and review access. Public/publishable keys are not automatically secrets.');
  return {findings,php,stack,phpRequirement};
}
