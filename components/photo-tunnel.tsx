"use client";
import {useEffect,useRef,useState} from "react";
const photos=[
["01-matei-larisa-portrait.jpg","Matei and Larisa together"],
["02-matei-speaking-approved.jpg","Matei speaking at the microphone"],
["03-larisa-speaking.jpg","Larisa speaking at the microphone"],
["04-matei-larisa-outreach.jpg","Matei and Larisa at an outreach"],
["05-street-evangelism.jpg","Sharing the Gospel outdoors"],
["06-prayer-ministry.jpg","Prayer ministry"],
["07-worship-and-prayer.jpg","Worship and prayer gathering"],
["08-outreach-team-outdoors.jpg","Outreach ministry team"],
["09-matei-preaching-black-white.jpg","Matei preaching at an outreach"]
] as const;
export function PhotoTunnel(){
 const root=useRef<HTMLElement>(null);
 const [progress,setProgress]=useState(0);
 const [available,setAvailable]=useState<boolean[]>(Array(photos.length).fill(false));
 useEffect(()=>{
  const node=root.current;if(!node)return;
  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let frame=0;
  const update=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{
   const rect=node.getBoundingClientRect();
   const distance=Math.max(1,node.offsetHeight-window.innerHeight);
   setProgress(reduced?1:Math.max(0,Math.min(1,-rect.top/distance)));
  });};
  update();window.addEventListener("scroll",update,{passive:true});window.addEventListener("resize",update);
  return()=>{cancelAnimationFrame(frame);window.removeEventListener("scroll",update);window.removeEventListener("resize",update)};
 },[]);
 const visible=available.some(Boolean);
 return <section className={"photo-tunnel"+(!visible?" photo-tunnel-pending":"")} ref={root} aria-label="Photographs from our ministry journey">
  <div className="photo-tunnel-stage">
   <div className="photo-tunnel-label"><span>OUR JOURNEY IN FRAMES</span><span>{String(Math.min(9,Math.floor(progress*9)+1)).padStart(2,"0")} / 09</span></div>
   <div className="photo-tunnel-perspective" aria-hidden="true">
    {photos.map(([file,alt],index)=>{
     const start=index/12,phase=Math.max(0,Math.min(1,(progress-start)*2.1));
     const transform=`translate3d(${(index%3-1)*20}vw,${(index%2?1:-1)*9}vh,${(1-phase)*-950+index*5}px) rotate(${(index%2?1:-1)*7*(1-phase)}deg) scale(${.7+phase*.3})`;
     return <div key={file} className={"tunnel-photo tunnel-photo-"+index} style={{transform,opacity:available[index]?Math.min(1,phase*3):0}}><img src={"/images/scroll/"+file} alt={alt} loading={index<3?"eager":"lazy"} onLoad={()=>setAvailable(a=>a.map((v,i)=>i===index?true:v))} onError={()=>setAvailable(a=>a.map((v,i)=>i===index?false:v))}/></div>;
    })}
   </div>
   <p className="photo-tunnel-caption">{visible?"Every image is a moment in the story.":"Nine moments from the journey — photographs being prepared."}</p>
  </div>
 </section>;
}