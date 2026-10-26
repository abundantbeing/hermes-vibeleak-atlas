import test from 'node:test';
import assert from 'node:assert/strict';
let policies=null;
try{policies=await import('../desktop-src/workbench.mjs')}catch{}
test('an assessment requires a prepared operation and both exact approvals',()=>{
  assert.ok(policies,'Workbench approval policy is missing');
  const operation={id:'11111111-1111-4111-8111-111111111111',domain:'example.com',maxUnits:1};
  assert.equal(policies.approvalReady(operation,true,true),true);
  for(const [a,b] of [[false,true],[true,false],['true',true],[true,'true']])assert.equal(policies.approvalReady(operation,a,b),false);
  assert.equal(policies.approvalReady(null,true,true),false);
  assert.equal(policies.approvalReady({...operation,maxUnits:2},true,true),false);
});
test('a focused chat on another connection or profile cannot receive owner evidence',()=>{
  assert.ok(policies,'Workbench draft policy is missing');
  assert.equal(policies.canDraftTo({profile:'a',connectionId:'local'},'a','local'),true);
  assert.equal(policies.canDraftTo({profile:'b',connectionId:'local'},'a','local'),false);
  assert.equal(policies.canDraftTo({profile:'a',connectionId:'remote'},'a','local'),false);
});

test('bright accent buttons choose a readable theme ink instead of pale inherited text',()=>{
  assert.equal(typeof policies.pickAccentInk,'function','Theme contrast policy is missing');
  const accent=[167,192,128],candidates={pale:[240,240,240],dark:[30,30,30]};
  assert.equal(policies.pickAccentInk(accent,candidates),'dark');
  assert.ok(policies.contrastRatio(accent,candidates.dark)>=4.5);
});
test('dark accent buttons choose a readable light theme ink',()=>{
  assert.equal(typeof policies.pickAccentInk,'function','Theme contrast policy is missing');
  assert.equal(policies.pickAccentInk([30,50,70],{dark:[20,20,20],light:[245,245,245]}),'light');
});
