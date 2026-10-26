import test from 'node:test';
import assert from 'node:assert/strict';
import * as core from '../desktop-src/core.mjs';
const context={scope:'backend-a/profile-a',mode:'fleet',domain:'example.com',scanId:'scan-a',consent:true,privateVersion:'owner-a',replayId:null};
test('handoff binding is invalidated by source, selection, account, consent, history or connection changes',()=>{
  assert.equal(typeof core.handoffBinding,'function');
  assert.equal(typeof core.handoffIsCurrent,'function');
  const binding=core.handoffBinding(context),handoff={binding,markdown:'# Saved owner report'};
  assert.equal(core.handoffIsCurrent(handoff,binding),true);
  for(const change of [{scope:'backend-b/profile-a'},{mode:'public'},{domain:'other.example.com'},{scanId:'scan-b'},{consent:false},{privateVersion:'owner-b'},{replayId:'1'}]){
    assert.equal(core.handoffIsCurrent(handoff,core.handoffBinding({...context,...change})),false,JSON.stringify(change));
  }
  assert.equal(core.handoffIsCurrent(null,binding),false);
  assert.equal(core.handoffIsCurrent({binding:null,markdown:'stale'},null),false);
});
test('ASCII projection respects the selected AI readiness lens',()=>{
  const lines=Array.from({length:29},()=>''.padEnd(80,' '));
  const sites=[{grade:'F',ai:{grade:'A'},geo:{status:'mapped',country:'US',lat:38,lon:-97}}];
  assert.ok(core.asciiMap(lines,sites,'ai').includes('A'));
  assert.ok(!core.asciiMap(lines,sites,'ai').includes('F'));
});
