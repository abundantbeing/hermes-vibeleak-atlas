import {build} from 'esbuild';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
await mkdir('desktop',{recursive:true});
const result=await build({entryPoints:['desktop-src/plugin.jsx'],outfile:'desktop/plugin.js',bundle:true,format:'esm',platform:'browser',target:'chrome130',minify:true,legalComments:'eof',metafile:true,external:['@hermes/plugin-sdk','react','react/jsx-runtime'],loader:{'.css':'text'},jsx:'automatic'});
for(const path of Object.keys(result.metafile.inputs))if(path.includes('node_modules/react/'))throw new Error('Do not bundle a second React runtime');
const external=Object.values(result.metafile.outputs).flatMap(output=>output.imports.filter(i=>i.external).map(i=>i.path));
if(external.some(name=>!['@hermes/plugin-sdk','react','react/jsx-runtime'].includes(name)))throw new Error('Unexpected unresolved import');
await writeFile('desktop/bundle-info.json',JSON.stringify({entry:'plugin.js',bytes:result.metafile.outputs['desktop/plugin.js'].bytes,imports:[...new Set(external)]},null,2));
console.log(await readFile('desktop/bundle-info.json','utf8'));
