import React,{useEffect,useRef,useId,useState} from 'react';
import {host,Button,Input} from '@hermes/plugin-sdk';
import {pickRepositoryFolder} from './workbench.mjs';
export default function RepositoryContext({ctx,value,onChange,onStatus,isCurrent,disabled=false}){
  const inputId=useId(),alive=useRef(true),revision=useRef(0),[choosing,setChoosing]=useState(false);
  useEffect(()=>{alive.current=true;return()=>{alive.current=false;revision.current++}},[]);
  function change(next){revision.current++;onChange(next)}
  async function choose(){
    if(choosing||disabled)return;const token=++revision.current;setChoosing(true);
    try{const result=await pickRepositoryFolder(ctx.files,()=>alive.current&&revision.current===token&&isCurrent());
      if(!alive.current||token!==revision.current||!isCurrent())return;
      if(result.state==='selected'){onChange(result.folder.path);onStatus('Repository folder selected. Website assessment does not read or upload its source. Use Local folder inspection for code checks.')}
      else if(result.state==='unavailable')onStatus('Native folder selection is unavailable in this Desktop build. No alternate file reader is used.');
      else if(result.state==='refused')onStatus('Hermes refused the folder selection. Your previous repository context was preserved.');
    }catch{if(alive.current&&isCurrent())onStatus('The native folder picker could not complete. Your previous repository context was preserved.')}
    finally{if(alive.current)setChoosing(false)}
  }
  function useCurrent(){const cwd=String(host.state.cwd.get()||'');if(!cwd){onStatus('No current workspace folder is available. Choose a folder from this device instead.');return}change(cwd);onStatus('Current workspace attached as repository context only. No source files were inspected.')}
  return <div className="wba-field" data-testid="repository-context"><label htmlFor={inputId}>Repository or project <span className="vla-meta">optional local context</span></label><div className="wba-inline wba-repository"><Input id={inputId} aria-label="Project hint" aria-describedby={inputId+'-help'} value={value} onChange={e=>change(e.target.value)} placeholder="Select a local repository folder" maxLength={512} disabled={disabled||choosing}/><div className="wba-repository-actions"><Button size="sm" type="button" variant="ghost" disabled={disabled||choosing} onClick={useCurrent}>Use current</Button><Button size="sm" type="button" variant="ghost" disabled={disabled||choosing||!ctx.files?.requestFolder} onClick={choose}>{choosing?'Opening picker...':'Choose folder'}</Button></div></div><p id={inputId+'-help'} className="wba-repository-help">Choose from this device or enter a hint. Selection alone does not inspect source or upload files. Code checks run separately in Local folder inspection.</p></div>;
}
