import * as THREE from 'three';
import world from './generated/world.json';
import {BAYER4,GRADES,layoutLabels} from './core.mjs';

const VERT=`varying vec3 vNormal; void main(){vNormal=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`;
const FRAG=`uniform vec3 uInk;uniform float uCell;uniform float uDither;varying vec3 vNormal;
float threshold(vec2 p){int x=int(mod(p.x,4.0));int y=int(mod(p.y,4.0));int i=x+y*4;float b[16];${BAYER4.map((x,i)=>`b[${i}]=${x}.0;`).join('')}for(int j=0;j<16;j++){if(j==i)return (b[j]+0.5)/16.0;}return 0.5;}
void main(){float light=pow(max(0.0,dot(normalize(vNormal),normalize(vec3(-.7,.5,1.0)))),1.4);float shade=mix(light,step(threshold(floor(gl_FragCoord.xy/uCell)),light),uDither);gl_FragColor=vec4(uInk,mix(.025,.15,shade));}`;
const position=(lat,lon,r=1)=>{const phi=lat*Math.PI/180,theta=lon*Math.PI/180;return new THREE.Vector3(r*Math.cos(phi)*Math.sin(theta),r*Math.sin(phi),r*Math.cos(phi)*Math.cos(theta))};

export function mountGlobe(container,{createLoop,onSelect,onFailure,clusters=[],reduced=false,paused=false,dither=true}={}){
  const canvas=document.createElement('canvas');canvas.setAttribute('aria-hidden','true');canvas.tabIndex=-1;container.prepend(canvas);
  let renderer;
  try{renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:false,powerPreference:'low-power'});}
  catch{canvas.remove();onFailure?.();return {update(){},dispose(){}}}
  renderer.setClearColor(0,0);
  const scene=new THREE.Scene(),camera=new THREE.OrthographicCamera(-1.6,1.6,1.24,-1.24,.1,20);camera.position.z=3.65;
  const globe=new THREE.Group();globe.rotation.y=-.36;globe.rotation.x=.12;scene.add(globe);
  const sphere=new THREE.ShaderMaterial({uniforms:{uInk:{value:new THREE.Color()},uCell:{value:2.5},uDither:{value:dither?1:0}},vertexShader:VERT,fragmentShader:FRAG,transparent:true,depthWrite:false});
  globe.add(new THREE.Mesh(new THREE.SphereGeometry(1,64,40),sphere));
  const landGeometry=new THREE.BufferGeometry();landGeometry.setAttribute('position',new THREE.Float32BufferAttribute(world.points.flatMap(([lat,lon])=>position(lat,lon,1.004).toArray()),3));
  const landMaterial=new THREE.PointsMaterial({size:.011,sizeAttenuation:true,transparent:true,opacity:.64});globe.add(new THREE.Points(landGeometry,landMaterial));
  const grid=new THREE.Group();const gridMaterial=new THREE.LineBasicMaterial({transparent:true,opacity:.14});
  for(const lat of [-60,-30,0,30,60]){const path=[];for(let lon=-180;lon<=180;lon+=3)path.push(position(lat,lon,1.007));grid.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(path),gridMaterial))}
  for(let lon=-180;lon<180;lon+=30){const path=[];for(let lat=-90;lat<=90;lat+=3)path.push(position(lat,lon,1.007));grid.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(path),gridMaterial))}globe.add(grid);
  const markers=new THREE.Group();globe.add(markers);
  let currentClusters=clusters,selected=null,motion=!reduced&&!paused,visible=true,inView=true,lost=false,disposed=false,width=1,height=1,lastTime=0,frames=0,drag=null;
  const vector=new THREE.Vector3(),raycaster=new THREE.Raycaster();
  const colorCanvas=document.createElement('canvas');colorCanvas.width=1;colorCanvas.height=1;const colorContext=colorCanvas.getContext('2d',{willReadFrequently:true});
  const cssColor=name=>{const raw=getComputedStyle(container).getPropertyValue(name).trim()||getComputedStyle(container).color;colorContext.clearRect(0,0,1,1);colorContext.fillStyle=raw;colorContext.fillRect(0,0,1,1);const [r,g,b]=colorContext.getImageData(0,0,1,1).data;return new THREE.Color().setRGB(r/255,g/255,b/255,THREE.SRGBColorSpace)};
  function palette(){sphere.uniforms.uInk.value.copy(cssColor('--ui-text-primary'));landMaterial.color.copy(cssColor('--ui-accent'));gridMaterial.color.copy(cssColor('--ui-text-primary'));for(const marker of markers.children)marker.material.color.copy(cssColor(`--atlas-grade-${marker.userData.grade||'N'}`))}
  function rebuild(){for(const marker of [...markers.children]){marker.geometry.dispose();marker.material.dispose();markers.remove(marker)}for(const cluster of currentClusters){const marker=new THREE.Mesh(new THREE.SphereGeometry(.016+Math.min(cluster.count,12)*.0015,10,8),new THREE.MeshBasicMaterial());marker.position.copy(position(cluster.lat,cluster.lon,1.025));marker.userData=cluster;markers.add(marker)}palette()}
  function draw(time=performance.now()){
    if(disposed||lost||!visible||!inView)return;
    const delta=lastTime?Math.min((time-lastTime)/1000,.1):0;lastTime=time;
    if(motion&&!drag)globe.rotation.y+=delta*.075;
    renderer.render(scene,camera);frames++;canvas.dataset.frames=String(frames);canvas.dataset.motion=String(motion);canvas.dataset.dpr=String(renderer.getPixelRatio());
    const labels=container.querySelectorAll('[data-country-label]');scene.updateMatrixWorld(true);
    const projected=[];
    for(const label of labels){label.style.opacity='0';label.style.pointerEvents='none';label.tabIndex=-1;label.setAttribute('aria-hidden','true');const marker=markers.children.find(x=>x.userData.country===label.dataset.countryLabel);if(!marker)continue;marker.getWorldPosition(vector);if(vector.z<=.12)continue;vector.project(camera);projected.push({id:label.dataset.countryLabel,label,x:(vector.x*.5+.5)*width,y:(-vector.y*.5+.5)*height,width:label.offsetWidth,height:label.offsetHeight,priority:marker.userData.count,selected:selected===marker.userData.country})}
    for(const p of layoutLabels(projected,width,height)){p.label.style.opacity='1';p.label.style.pointerEvents='auto';p.label.tabIndex=0;p.label.removeAttribute('aria-hidden');p.label.style.transform=`translate(${p.left}px,${p.top}px)`}
    canvas.dataset.selected=selected||'';
  }
  const loop=createLoop(()=>draw(),()=>motion&&visible&&inView&&!lost);
  function sync(){lastTime=0;if(motion&&visible&&inView&&!lost)loop.start();else loop.stop();draw()}
  function resize(){const box=container.getBoundingClientRect();width=Math.max(1,box.width);height=Math.max(1,box.height);renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));renderer.setSize(width,height,false);sphere.uniforms.uCell.value=2.5*renderer.getPixelRatio();camera.left=-1.24*width/height;camera.right=1.24*width/height;camera.updateProjectionMatrix();draw()}
  const observer=new ResizeObserver(resize);observer.observe(container);
  const intersection=new IntersectionObserver(entries=>{inView=entries[0]?.isIntersecting!==false;sync()});intersection.observe(container);
  function visibility(){visible=!document.hidden;sync()}
  function down(event){drag={x:event.clientX,y:event.clientY,startX:event.clientX,startY:event.clientY};canvas.setPointerCapture(event.pointerId);canvas.style.cursor='grabbing';loop.stop()}
  function move(event){if(!drag)return;globe.rotation.y+=(event.clientX-drag.x)*.006;globe.rotation.x=THREE.MathUtils.clamp(globe.rotation.x+(event.clientY-drag.y)*.004,-1.1,1.1);drag.x=event.clientX;drag.y=event.clientY;draw()}
  function up(event){if(drag&&Math.hypot(event.clientX-drag.startX,event.clientY-drag.startY)<5){const b=canvas.getBoundingClientRect();raycaster.setFromCamera(new THREE.Vector2((event.clientX-b.left)/b.width*2-1,-(event.clientY-b.top)/b.height*2+1),camera);const hit=raycaster.intersectObjects(markers.children)[0];if(hit){hit.object.getWorldPosition(vector);if(vector.z>.05)onSelect?.(hit.object.userData.country)}}drag=null;canvas.style.cursor='grab';sync()}
  function wheel(event){event.preventDefault();camera.zoom=THREE.MathUtils.clamp(camera.zoom-event.deltaY*.001,.75,1.45);camera.updateProjectionMatrix();draw()}
  function contextLost(event){event.preventDefault();lost=true;loop.stop();canvas.dataset.context='lost'}
  function contextRestored(){lost=false;canvas.dataset.context='restored';resize();sync()}
  canvas.addEventListener('pointerdown',down);canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerup',up);canvas.addEventListener('pointercancel',up);canvas.addEventListener('wheel',wheel,{passive:false});canvas.addEventListener('webglcontextlost',contextLost);canvas.addEventListener('webglcontextrestored',contextRestored);document.addEventListener('visibilitychange',visibility);
  rebuild();resize();sync();
  return {update(next){if(next.clusters){currentClusters=next.clusters;rebuild()}if('paused'in next||'reduced'in next){motion=!next.paused&&!next.reduced;sync()}if('dither'in next)sphere.uniforms.uDither.value=next.dither?1:0;selected=next.country||null;palette();draw()},dispose(){disposed=true;loop.dispose();observer.disconnect();intersection.disconnect();document.removeEventListener('visibilitychange',visibility);for(const [name,fn] of [['pointerdown',down],['pointermove',move],['pointerup',up],['pointercancel',up],['wheel',wheel],['webglcontextlost',contextLost],['webglcontextrestored',contextRestored]])canvas.removeEventListener(name,fn);scene.traverse(object=>{object.geometry?.dispose();if(Array.isArray(object.material))object.material.forEach(m=>m.dispose());else object.material?.dispose()});renderer.renderLists.dispose();renderer.dispose();renderer.forceContextLoss();canvas.remove();container.dataset.disposed='true'}};
}
