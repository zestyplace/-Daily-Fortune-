import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      flowType: 'implicit'
    }
  }
);

const CG=['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const CGK=['갑','을','병','정','무','기','경','신','임','계'];
const JJ=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const JJK=['자','축','인','묘','진','사','오','미','신','유','술','해'];
const OHCG=['木','木','火','火','土','土','金','金','水','水'];
const OHJJ=['水','土','木','木','土','火','火','土','金','金','土','水'];
const OHKR={'木':'목','火':'화','土':'토','金':'금','水':'수'};
const DAYS=['월','화','수','목','금','토','일'];
const RLBS=['매우나쁨','나쁨','보통','좋음','매우좋음'];
const CGC=['#1a7a40','#4a9a65','#c01800','#d84030','#8a6000','#b08820','#4a6068','#6a8898','#1a3050','#3a5575'];
const CGBG=['#e8f5ec','#f0faf4','#fce8e6','#fef0ef','#f5ecd4','#faf4dc','#e5edf0','#ecf2f5','#d8e5f0','#e2ecf7'];
const JJC=['#1a3050','#b08820','#1a7a40','#4a9a65','#8a6000','#d84030','#c01800','#b08820','#4a6068','#6a8898','#8a6000','#3a5575'];
const JJBG=['#d8e5f0','#faf4dc','#e8f5ec','#f0faf4','#f5ecd4','#fef0ef','#fce8e6','#faf4dc','#e5edf0','#ecf2f5','#f5ecd4','#e2ecf7'];
const JG={1:[5,0,1],2:[4,1,2],3:[6,2,3],4:[5,3,4],5:[5,4,5],6:[6,5,6],7:[7,6,7],8:[7,7,8],9:[8,8,9],10:[8,9,10],11:[7,10,11],12:[7,11,0]};
const YINW=[2,4,6,8,0,2,4,6,8,0];
const LAVEN='#dddcec';
const JJ_ANI=['🐭','🐄','🐯','🐰','🐲','🐍','🐴','🐑','🐒','🐓','🐕','🐷'];
const JJ_ANI_KR=['쥐','소','호랑이','토끼','용','뱀','말','양','원숭이','닭','개','돼지'];
const JJ_ANI_DESC=['영리하고 민첩하며 어둠 속에서도 길을 찾는 지혜를 지닙니다.','묵묵히 일하는 성실함과 강인한 인내력을 상징합니다.','용맹하고 독립적이며 강인한 에너지로 변화를 이끕니다.','온순하고 섬세하며 풍요로운 행운과 부드러운 힘을 지닙니다.','신성하고 강력한 힘으로 변화와 성공을 이끄는 상서로운 존재입니다.','지혜롭고 직관적이며 깊은 통찰력으로 본질을 꿰뚫습니다.','활동적이고 자유로운 영혼으로 빠른 전진과 발전을 상징합니다.','온화하고 창의적이며 풍요로운 예술적 감각이 넘칩니다.','영리하고 다재다능하며 어떤 변화에도 유연하게 적응합니다.','부지런하고 세심하며 새벽을 알리는 시작과 성취의 기운입니다.','충직하고 용감하며 진실한 우정과 수호의 기운을 상징합니다.','복스럽고 관대하며 풍요와 행복을 가져다주는 길상입니다.'];
const JJ_IS_YANG=[false,false,true,false,true,true,false,false,true,false,true,true];
const CG_SPEC=['거대한 참나무처럼 곧고 강하게 뻗는 의지와 개척 정신이 있습니다. 리더십이 강하고 새로운 시작을 여는 선도적 에너지로, 진취적이고 독립적인 성질을 지닙니다.','덩굴처럼 유연하게 굽히며 목표를 향해 나아가는 끈기와 적응력이 뛰어납니다. 세심하고 예술적 감각이 풍부하며, 부드러운 방식으로 자신만의 길을 개척합니다.','하늘의 태양처럼 강렬하고 밝게 빛나는 에너지입니다. 외향적이고 열정이 넘치며, 주변을 따뜻하게 이끄는 강한 카리스마와 표현력이 있습니다.','촛불처럼 은은하고 지속적으로 타오르는 집중력과 지혜가 있습니다.','거대한 산이나 광활한 대지처럼 묵직하고 안정적입니다.','비옥한 논밭처럼 모든 것을 품고 기르는 기운입니다.','단단한 바위와 강철처럼 결단력 있고 냉철합니다.','세공된 보석처럼 예리하고 정밀한 기운입니다.','도도히 흐르는 큰 강처럼 지혜롭고 포용력이 큽니다.','스며드는 빗물과 이슬처럼 감성이 풍부하고 직관이 예리합니다.'];
const JJ_SPEC=['자수(子水)는 한밤중 씨앗 속에 응축된 잠재력의 기운입니다.','축토(丑土)는 겨울의 단단히 얼어붙은 땅처럼 묵묵히 축적하는 기운입니다.','인목(寅木)은 봄을 깨우는 호랑이의 기운입니다.','묘목(卯木)은 봄 동산의 무성한 풀과 꽃처럼 부드럽고 풍요로운 기운입니다.','진토(辰土)는 봄비를 머금은 변환의 땅으로, 이상과 현실을 연결하는 기운입니다.','사화(巳火)는 지장간에 丙火(양화)를 품은 강렬한 화기입니다.','오화(午火)는 한낮 정오의 태양이 절정에 달한 기운입니다.','미토(未土)는 한여름 성숙과 전환을 담은 부드러운 토기입니다.','신금(申金)은 결실의 가을, 날카롭고 강한 금기입니다.','유금(酉金)은 서늘한 가을의 정제된 금기입니다.','술토(戌土)는 가을 저녁 노을빛의 성찰하는 토기입니다.','해수(亥水)는 지장간에 壬水(양수)를 품은 겨울의 깊은 물입니다.'];
const IPCHUN={1994:4,1995:4,1996:4,1997:4,1998:4,1999:4,2000:4,2001:3,2002:4,2003:4,2004:4,2005:4,2006:4,2007:4,2008:4,2009:4,2010:4,2011:4,2012:4,2013:4,2014:4,2015:4,2016:4,2017:3,2018:4,2019:4,2020:4,2021:3,2022:4,2023:4,2024:4,2025:3,2026:4,2027:3,2028:4,2029:4,2030:4,2031:4,2032:4,2033:3,2034:4,2035:4};
const LUNAR_M={'2024-02-10':'1','2024-03-10':'2','2024-04-09':'3','2024-05-08':'4','2024-06-06':'5','2024-07-06':'6','2024-08-04':'7','2024-09-03':'8','2024-10-03':'9','2024-11-01':'10','2024-12-01':'11','2024-12-31':'12','2025-01-29':'1','2025-02-28':'2','2025-03-29':'3','2025-04-27':'4','2025-05-27':'5','2025-06-25':'6','2025-07-25':'7','2025-08-23':'8','2025-09-22':'9','2025-10-21':'10','2025-11-20':'11','2025-12-20':'12','2026-02-17':'1','2026-03-19':'2','2026-04-17':'3','2026-05-17':'4','2026-06-15':'5','2026-07-15':'6','2026-08-13':'7','2026-09-11':'8','2026-10-11':'9','2026-11-09':'10','2026-12-09':'11','2027-02-06':'1','2027-03-08':'2','2027-04-06':'3'};
const YEARS=Array.from({length:61},(_,i)=>1994+i);

function getYearPeriod(y){const sd=IPCHUN[y]||4,nd=IPCHUN[y+1]||4;return y+'년 2월 '+sd+'일 ~ '+(y+1)+'년 2월 '+(nd-1)+'일';}
function getLunarMark(d){const k=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');return LUNAR_M[k]||null;}
function calcMP(date){const y=date.getFullYear(),m=date.getMonth()+1,d=date.getDate();const row=JG[m]||[1,0,0],ji=d<row[0]?row[1]:row[2];const yCg=(((m===1?y-1:y)-1984)%60+60)%60%10;const cg=(YINW[yCg]+(ji-2+12)%12)%10;return {cg:CG[cg],jj:JJ[ji],cgk:CGK[cg],jjk:JJK[ji],color:CGC[cg],bg:CGBG[cg],label:CG[cg]+JJ[ji],labelk:CGK[cg]+JJK[ji]};}
function calcDP(date){const diff=Math.round((new Date(date.getFullYear(),date.getMonth(),date.getDate())-new Date(2000,0,7))/86400000);const idx=((diff%60)+60)%60,ci=idx%10,ji=idx%12;return {idx,ci,ji,cg:CG[ci],cgk:CGK[ci],jj:JJ[ji],jjk:JJK[ji],cgColor:CGC[ci],jjColor:JJC[ji],cgBg:CGBG[ci],label:CG[ci]+JJ[ji],labelk:CGK[ci]+JJK[ji],ani:JJ_ANI[ji]};}
function getYI(y){const i=((y-1984)%60+60)%60,ci=i%10,ji=i%12;const cgYang=ci%2===0,jjYang=JJ_IS_YANG[ji];const cgOhFull=(cgYang?'양':'음')+OHKR[OHCG[ci]]+'('+(cgYang?'陽':'陰')+OHCG[ci]+')';const jjOhFull=(jjYang?'양':'음')+OHKR[OHJJ[ji]]+'('+(jjYang?'陽':'陰')+OHJJ[ji]+')';return {ci,ji,cg:CG[ci],jj:JJ[ji],cgk:CGK[ci],jjk:JJK[ji],cgOh:OHCG[ci],jjOh:OHJJ[ji],cgColor:CGC[ci],jjColor:JJC[ji],cgBg:CGBG[ci],cgOhFull,jjOhFull,ani:JJ_ANI[ji],aniKr:JJ_ANI_KR[ji],aniDesc:JJ_ANI_DESC[ji],cgDesc:CG_SPEC[ci],jjDesc:JJ_SPEC[ji],period:getYearPeriod(y),combined:OHCG[ci]===OHJJ[ji]?'천간·지지 모두 '+OHCG[ci]+'의 기운이 중첩된 강렬한 해':'천간 '+OHCG[ci]+'과 지지 '+OHJJ[ji]+'의 기운이 어우러지는 해'};}
function getYPK(y){const i=((y-1984)%60+60)%60;return CGK[i%10]+JJK[i%12];}
function toKr(lb){if(!lb||lb.length<2)return '';const a=CG.indexOf(lb[0]),b=JJ.indexOf(lb[1]);return (a>=0?CGK[a]:'')+(b>=0?JJK[b]:'');}
function isJeolgi(date){const m=date.getMonth()+1,d=date.getDate();return !!(JG[m]&&JG[m][0]===d);}
function nextOcc(cy,cm,mode,idx){const today=new Date();today.setHours(0,0,0,0);const dim=new Date(cy,cm+1,0).getDate();let first=null;for(let d=1;d<=dim;d++){const dt=new Date(cy,cm,d);const dp=calcDP(dt);const hit=mode==='cg'?dp.ci===idx:dp.ji===idx;if(hit){if(!first)first=dt;if(dt>=today)return dt;}}return first;}
function getStats(entries,mode,sub){return (mode==='cg'?CG:JJ).map((ch,idx)=>{const list=Object.entries(entries).filter(p=>p[1].label&&p[1].label[mode==='cg'?0:1]===ch);function gv(v){return sub==='overall'?(v.rating||0):((v.sub&&v.sub[sub])||0);}const rated=list.filter(p=>gv(p[1])>0);const avg=rated.length>0?rated.reduce((s,p)=>s+gv(p[1]),0)/rated.length:null;return {ch,idx,count:list.length,rated:rated.length,avg,list};});}
function get60(entries,sub){const map={};Object.entries(entries).forEach(p=>{const lb=p[1].label;if(!lb||lb.length<2)return;if(!map[lb])map[lb]={label:lb,labelk:p[1].labelk||toKr(lb),list:[]};map[lb].list.push(p);});function gv(v){return sub==='overall'?(v.rating||0):((v.sub&&v.sub[sub])||0);}return Object.values(map).map(g=>{const rated=g.list.filter(p=>gv(p[1])>0);const avg=rated.length>0?rated.reduce((s,p)=>s+gv(p[1]),0)/rated.length:null;return {label:g.label,labelk:g.labelk,list:g.list,count:g.list.length,rated:rated.length,avg};}).filter(g=>g.rated>0).sort((a,b)=>b.avg-a.avg);}

function StarRow({val,onSet,size,color}){
  const ac=color||'#c8960c';
  return <span>{[1,2,3,4,5].map(n=><span key={n} style={{fontSize:size||24,cursor:'pointer',color:n<=val?ac:'#e0dff0'}} onClick={()=>onSet(n===val?0:n)}>{n<=val?'★':'☆'}</span>)}</span>;
}

function EntryCard({ek,ev}){
  const ci=ev.label?CG.indexOf(ev.label[0]):-1,ji=ev.label?JJ.indexOf(ev.label[1]):-1;
  const c=ci>=0?CGC[ci]:'#9090b8',jc=ji>=0?JJC[ji]:'#9090b8';
  const mk=ev.monthk||(ev.month?toKr(ev.month):'');
  return (
    <div style={{background:'#fff',borderRadius:10,padding:'12px',marginBottom:7,borderLeft:'3px solid '+c,boxShadow:'0 1px 3px rgba(0,0,0,0.04)'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4}}>
        <span style={{fontSize:11,color:'#9090b8'}}>{ek} {mk&&<span style={{color:'#b0b0c8',marginLeft:6,fontSize:10}}>{mk}월</span>}</span>
        <span style={{fontSize:12,color:'#c8960c'}}>{ev.rating?'★'.repeat(ev.rating):''}</span>
      </div>
      <div style={{marginBottom:4}}>
        <span style={{fontSize:15,fontWeight:700,color:c}}>{ev.label?ev.label[0]:''}</span>
        <span style={{fontSize:15,fontWeight:700,color:jc}}>{ev.label?ev.label[1]:''}</span>
        <span style={{fontSize:11,color:'#9090b8',marginLeft:6}}>{ev.labelk||''}일</span>
      </div>
      {ev.sub&&(ev.sub.money||ev.sub.work||ev.sub.love||ev.sub.health||ev.sub.relation)>0&&(
        <div style={{display:'flex',gap:10,fontSize:11,marginBottom:ev.note?4:0,flexWrap:'wrap'}}>
          {ev.sub.money>0&&<span style={{color:'#8a6000'}}>재물{'★'.repeat(ev.sub.money)}</span>}
          {ev.sub.work>0&&<span style={{color:'#4a6068'}}>일{'★'.repeat(ev.sub.work)}</span>}
          {ev.sub.love>0&&<span style={{color:'#c01800'}}>애정{'★'.repeat(ev.sub.love)}</span>}
          {ev.sub.health>0&&<span style={{color:'#1a3050'}}>건강{'★'.repeat(ev.sub.health)}</span>}
          {ev.sub.relation>0&&<span style={{color:'#1a7a40'}}>대인관계{'★'.repeat(ev.sub.relation)}</span>}
        </div>
      )}
      {ev.note&&<div style={{fontSize:12,color:'#7070a0',lineHeight:1.5}}>{ev.note}</div>}
    </div>
  );
}

function IcoNote(){return <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="1.5" width="10" height="13" rx="1.5"/><path d="M12 1.5l2 2" strokeLinecap="round"/><path d="M5 6h6M5 9h6M5 12h3.5" strokeLinecap="round"/></svg>;}
function IcoCal(){return <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1.5" y="3" width="13" height="11.5" rx="1.5"/><path d="M1.5 7h13" strokeLinecap="round"/><path d="M5.5 1.5v3M10.5 1.5v3" strokeLinecap="round"/><circle cx="5" cy="10.5" r="0.9" fill="currentColor" stroke="none"/><circle cx="8" cy="10.5" r="0.9" fill="currentColor" stroke="none"/><circle cx="11" cy="10.5" r="0.9" fill="currentColor" stroke="none"/></svg>;}

export default function App(){
  const today=new Date();
  const [started,setStarted]=useState(false);
  const [user,setUser]=useState(null);
  const [authLoading,setAuthLoading]=useState(true);
  const [loginLoading,setLoginLoading]=useState(false);
  const [view,setView]=useState('cal');
  const [cy,setCy]=useState(today.getFullYear());
  const [cm,setCm]=useState(today.getMonth());
  const [selDate,setSelDate]=useState(null);
  const [entries,setEntries]=useState({});
  const [monthNotes,setMonthNotes]=useState({});
  const [yearNotes,setYearNotes]=useState({});
  const [patTab,setPatTab]=useState('cg');
  const [patSel,setPatSel]=useState(null);
  const [rankLabel,setRankLabel]=useState(null);
  const [rankSub,setRankSub]=useState('overall');
  const [mnSel,setMnSel]=useState(null);
  const [monthlySubTab,setMonthlySubTab]=useState('mon');
  const [showRoller,setShowRoller]=useState(false);
  const [showYN,setShowYN]=useState(false);
  const [mRat,setMRat]=useState(0);const [mNote,setMNote]=useState('');
  const [mMon,setMMon]=useState(0);const [mWork,setMWork]=useState(0);
  const [mLov,setMLov]=useState(0);const [mHea,setMHea]=useState(0);const [mRel,setMRel]=useState(0);
  const [saving,setSaving]=useState(false);
  const [ynRat,setYnRat]=useState(0);const [ynNote,setYnNote]=useState('');
  const [ynMon,setYnMon]=useState(0);const [ynWork,setYnWork]=useState(0);
  const [ynLov,setYnLov]=useState(0);const [ynHea,setYnHea]=useState(0);const [ynSav,setYnSav]=useState(false);
  const [mnRat,setMnRat]=useState(0);const [mnNote,setMnNote]=useState('');
  const [mnMon,setMnMon]=useState(0);const [mnWork,setMnWork]=useState(0);
  const [mnLov,setMnLov]=useState(0);const [mnHea,setMnHea]=useState(0);const [mnRel,setMnRel]=useState(0);
  const [mnExp,setMnExp]=useState(false);const [mnSav,setMnSav]=useState(false);
  const [searchQ,setSearchQ]=useState('');
  const yrRef=useRef(null),moRef=useRef(null);

  // ── 인증 상태 감지 ──
  useEffect(()=>{
    const {data:{subscription}}=supabase.auth.onAuthStateChange((event,session)=>{
      setUser(session?.user||null);
      if(session?.user) setStarted(true);
      setAuthLoading(false);
    });
    return ()=>subscription.unsubscribe();
  },[]);

  // ── 데이터 로드 ──
  useEffect(()=>{
    if(!user)return;
    (async()=>{
      const [{data:d},{data:m},{data:y}]=await Promise.all([
        supabase.from('diary').select('*').eq('user_id',user.id),
        supabase.from('month_notes').select('*').eq('user_id',user.id),
        supabase.from('year_notes').select('*').eq('user_id',user.id),
      ]);
      const de={};(d||[]).forEach(r=>{de[r.date]={rating:r.rating,note:r.note,label:r.label,labelk:r.labelk,month:r.month,monthk:r.monthk,sub:r.sub||{}};});
      const me={};(m||[]).forEach(r=>{me[r.month_key]={rating:r.rating,note:r.note,monthLabel:r.month_label,monthLabelk:r.month_labelk,year:r.year,month:r.month,sub:r.sub||{}};});
      const ye={};(y||[]).forEach(r=>{ye[r.year_key]={rating:r.rating,note:r.note,yearLabel:r.year_label,yearLabelk:r.year_labelk,year:r.year,sub:r.sub||{}};});
      setEntries(de);setMonthNotes(me);setYearNotes(ye);
    })();
  },[user]);

  useEffect(()=>{
    const k='month:'+cy+'-'+String(cm+1).padStart(2,'0'),ex=monthNotes[k]||{},s=ex.sub||{};
    setMnRat(ex.rating||0);setMnNote(ex.note||'');
    setMnMon(s.money||0);setMnWork(s.work||0);setMnLov(s.love||0);setMnHea(s.health||0);setMnRel(s.relation||0);
  },[cy,cm,monthNotes]);

  useEffect(()=>{
    if(!showRoller)return;
    setTimeout(()=>{
      if(yrRef.current){const idx=YEARS.indexOf(cy);if(idx>=0)yrRef.current.scrollTop=idx*44;}
      if(moRef.current)moRef.current.scrollTop=cm*44;
    },60);
  },[showRoller]);

  function dKey(y,m,d){return y+'-'+String(m+1).padStart(2,'0')+'-'+String(d).padStart(2,'0');}
  function mnKey(y,m){return 'month:'+y+'-'+String(m+1).padStart(2,'0');}
  function ynKey(y){return 'year:'+y;}

  function openDay(date){
    setSelDate(date);
    const k=dKey(date.getFullYear(),date.getMonth(),date.getDate()),e=entries[k]||{},s=e.sub||{};
    setMRat(e.rating||0);setMNote(e.note||'');setMMon(s.money||0);setMWork(s.work||0);setMLov(s.love||0);setMHea(s.health||0);setMRel(s.relation||0);
  }

  async function doSave(){
    if(!selDate||!user)return;
    setSaving(true);
    const k=dKey(selDate.getFullYear(),selDate.getMonth(),selDate.getDate());
    const dp=calcDP(selDate),mp=calcMP(selDate);
    const data={user_id:user.id,date:k,rating:mRat,note:mNote,sub:{money:mMon,work:mWork,love:mLov,health:mHea,relation:mRel},label:dp.label,labelk:dp.labelk,month:mp.label,monthk:mp.labelk};
    await supabase.from('diary').upsert(data,{onConflict:'user_id,date'});
    setEntries(p=>({...p,[k]:{rating:mRat,note:mNote,label:dp.label,labelk:dp.labelk,month:mp.label,monthk:mp.labelk,sub:{money:mMon,work:mWork,love:mLov,health:mHea,relation:mRel}}}));
    setSaving(false);setSelDate(null);
  }

  async function doDel(){
    if(!selDate||!user)return;
    const k=dKey(selDate.getFullYear(),selDate.getMonth(),selDate.getDate());
    await supabase.from('diary').delete().eq('user_id',user.id).eq('date',k);
    setEntries(p=>{const n={...p};delete n[k];return n;});
    setSelDate(null);
  }

  function openYN(){
    const k=ynKey(cy),ex=yearNotes[k]||{},s=ex.sub||{};
    setYnRat(ex.rating||0);setYnNote(ex.note||'');setYnMon(s.money||0);setYnWork(s.work||0);setYnLov(s.love||0);setYnHea(s.health||0);setShowYN(true);
  }

  async function saveYN(){
    if(!user)return;
    setYnSav(true);
    const k=ynKey(cy),yi=getYI(cy);
    const data={user_id:user.id,year_key:k,rating:ynRat,note:ynNote,sub:{money:ynMon,work:ynWork,love:ynLov,health:ynHea},year_label:yi.cg+yi.jj,year_labelk:yi.cgk+yi.jjk,year:cy};
    await supabase.from('year_notes').upsert(data,{onConflict:'user_id,year_key'});
    setYearNotes(p=>({...p,[k]:{rating:ynRat,note:ynNote,yearLabel:yi.cg+yi.jj,yearLabelk:yi.cgk+yi.jjk,year:cy,sub:{money:ynMon,work:ynWork,love:ynLov,health:ynHea}}}));
    setYnSav(false);
  }

  async function saveMN(){
    if(!user)return;
    setMnSav(true);
    const k=mnKey(cy,cm),mp=calcMP(new Date(cy,cm,15));
    const data={user_id:user.id,month_key:k,rating:mnRat,note:mnNote,sub:{money:mnMon,work:mnWork,love:mnLov,health:mnHea,relation:mnRel},month_label:mp.label,month_labelk:mp.labelk,year:cy,month:cm+1};
    await supabase.from('month_notes').upsert(data,{onConflict:'user_id,month_key'});
    setMonthNotes(p=>({...p,[k]:{rating:mnRat,note:mnNote,monthLabel:mp.label,monthLabelk:mp.labelk,year:cy,month:cm+1,sub:{money:mnMon,work:mnWork,love:mnLov,health:mnHea,relation:mnRel}}}));
    setMnSav(false);
  }

  async function signInWithGoogle(){
    setLoginLoading(true);
    await supabase.auth.signInWithOAuth({
      provider:'google',
      options:{redirectTo:window.location.origin+window.location.pathname}
    });
  }

  function swPat(t){setPatTab(t);setPatSel(null);setRankLabel(null);setMnSel(null);}

  // ── 1. 인증 로딩 중 ──
  if(authLoading){
    return <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#f5f4f0',fontFamily:"'Noto Sans KR',sans-serif",color:'#9090b8'}}>로딩 중...</div>;
  }

  // ── 2. 스플래시 (처음 방문, 비로그인) ──
  if(!started){
    return (
      <div style={{background:'#f5f4f0',minHeight:'100vh',fontFamily:"'Noto Sans KR',sans-serif",maxWidth:480,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'center',padding:'24px'}}>
        <div style={{textAlign:'center',width:'100%'}}>
          <img src="/-Daily-Fortune-/icon.png" alt="오늘운 아이콘" style={{width:140,height:140,borderRadius:28,marginBottom:24,boxShadow:'0 12px 30px rgba(0,0,0,0.12)'}}/>
          <div style={{fontSize:32,fontWeight:700,color:'#111',marginBottom:16,letterSpacing:'-0.02em'}}>오늘운</div>
          <div style={{fontSize:17,color:'#7a79a8',lineHeight:1.7,marginBottom:28,whiteSpace:'pre-line'}}>{'기록하면\n내 운의 흐름이 보여요.'}</div>
          <button onClick={()=>setStarted(true)} style={{background:'#19173f',color:'#fff',border:'none',borderRadius:999,padding:'14px 28px',fontSize:16,fontWeight:700,cursor:'pointer'}}>기록 시작</button>
        </div>
      </div>
    );
  }

  // ── 3. 로그인 화면 (started=true, 비로그인) ──
  if(!user){
    return (
      <div style={{background:'#f5f4f0',minHeight:'100vh',fontFamily:"'Noto Sans KR',sans-serif",maxWidth:480,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'center',padding:'24px'}}>
        <div style={{textAlign:'center',width:'100%'}}>
          <img src="/-Daily-Fortune-/icon.png" alt="오늘운 아이콘" style={{width:80,height:80,borderRadius:20,marginBottom:20,boxShadow:'0 8px 20px rgba(0,0,0,0.10)'}}/>
          <div style={{fontSize:22,fontWeight:700,color:'#111',marginBottom:8}}>오늘운</div>
          <div style={{fontSize:14,color:'#9090b8',marginBottom:36}}>로그인하면 모든 기기에서 기록이 동기화돼요</div>
          <button onClick={signInWithGoogle} disabled={loginLoading} style={{display:'flex',alignItems:'center',gap:12,background:'#fff',border:'1px solid #e0dff0',borderRadius:12,padding:'14px 28px',fontSize:15,fontWeight:600,color:'#1a1830',cursor:'pointer',boxShadow:'0 2px 8px rgba(0,0,0,0.08)',margin:'0 auto'}}>
            <svg width="20" height="20" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.08 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-3.59-13.46-8.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
            {loginLoading?'로그인 중...':'Google로 계속하기'}
          </button>
          <button onClick={()=>setStarted(false)} style={{marginTop:20,background:'none',border:'none',color:'#b0b0c8',fontSize:13,cursor:'pointer'}}>← 돌아가기</button>
        </div>
      </div>
    );
  }

  // ── 4. 메인 앱 ──
  const rawFirstDay=new Date(cy,cm,1).getDay();
  const fd=(rawFirstDay+6)%7;
  const dim=new Date(cy,cm+1,0).getDate(),pdim=new Date(cy,cm,0).getDate();
  const cells=[];
  for(let i=fd-1;i>=0;i--)cells.push({cur:false,d:pdim-i});
  for(let d=1;d<=dim;d++)cells.push({cur:true,d,date:new Date(cy,cm,d)});
  while(cells.length%7!==0)cells.push({cur:false,d:cells.length-fd-dim+1});

  const mpH=calcMP(new Date(cy,cm,15));
  const totalE=Object.keys(entries).length;
  const selDP=selDate?calcDP(selDate):null,selMP=selDate?calcMP(selDate):null;
  const selK=selDate?dKey(selDate.getFullYear(),selDate.getMonth(),selDate.getDate()):null;
  const hasE=!!(selK&&entries[selK]);
  const sqTrim=searchQ.trim();
  const sres=sqTrim?Object.entries(entries).filter(p=>{const q=sqTrim.toLowerCase(),v=p[1];return [(v.labelk||''),(v.label||''),(v.monthk||''),(v.month||''),(v.note||'')].some(s=>s.toLowerCase().includes(q));}).sort((a,b)=>b[0].localeCompare(a[0])):[];

  const NB={background:'none',border:'none',cursor:'pointer',color:'#a0a0c0',fontSize:17,padding:'4px 6px'};
  const PREV='\u2039',NEXT='\u203a';
  const SECS={fontSize:10,color:'#9090b8',letterSpacing:2,marginBottom:8,fontWeight:700};

  if(showRoller){return(<div style={{background:'#f5f4f0',minHeight:'100vh',fontFamily:"'Noto Sans KR',sans-serif",maxWidth:480,margin:'0 auto'}}><div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',zIndex:300,display:'flex',alignItems:'flex-end',justifyContent:'center'}} onClick={e=>{if(e.target===e.currentTarget)setShowRoller(false);}}><div style={{background:'#fff',borderRadius:'20px 20px 0 0',width:'100%',maxWidth:480,paddingBottom:40}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'16px 20px 10px'}}><button onClick={()=>setShowRoller(false)} style={{background:'none',border:'none',cursor:'pointer',fontSize:14,color:'#9090b8'}}>취소</button><div style={{fontSize:15,fontWeight:700,color:'#1a1830'}}>{cy}년 {cm+1}월</div><button onClick={()=>setShowRoller(false)} style={{background:'none',border:'none',cursor:'pointer',fontSize:14,color:'#c8960c',fontWeight:700}}>완료</button></div><div style={{display:'flex',position:'relative'}}><div style={{position:'absolute',top:88,left:0,right:0,height:44,borderTop:'1px solid '+LAVEN,borderBottom:'1px solid '+LAVEN,pointerEvents:'none',zIndex:1}}/><div ref={yrRef} style={{flex:1,height:220,overflowY:'scroll',scrollSnapType:'y mandatory'}} onScroll={e=>{const idx=Math.round(e.target.scrollTop/44);const ny=YEARS[Math.max(0,Math.min(idx,YEARS.length-1))];if(ny!==cy)setCy(ny);}}><div style={{height:88}}/>{YEARS.map(y=><div key={y} style={{height:44,scrollSnapAlign:'center',display:'flex',alignItems:'center',justifyContent:'center',fontSize:y===cy?18:14,fontWeight:y===cy?700:400,color:y===cy?'#c8960c':'#9090b8',cursor:'pointer'}} onClick={()=>setCy(y)}>{y}년</div>)}<div style={{height:88}}/></div><div ref={moRef} style={{flex:1,height:220,overflowY:'scroll',scrollSnapType:'y mandatory'}} onScroll={e=>{const idx=Math.round(e.target.scrollTop/44);const nm=Math.max(0,Math.min(idx,11));if(nm!==cm)setCm(nm);}}><div style={{height:88}}/>{[1,2,3,4,5,6,7,8,9,10,11,12].map(m=><div key={m} style={{height:44,scrollSnapAlign:'center',display:'flex',alignItems:'center',justifyContent:'center',fontSize:(m-1)===cm?18:14,fontWeight:(m-1)===cm?700:400,color:(m-1)===cm?'#c8960c':'#9090b8',cursor:'pointer'}} onClick={()=>setCm(m-1)}>{m}월</div>)}<div style={{height:88}}/></div></div></div></div></div>);}

  if(showYN){const yi=getYI(cy);return(<div style={{background:'#f5f4f0',minHeight:'100vh',fontFamily:"'Noto Sans KR',sans-serif",maxWidth:480,margin:'0 auto'}}><div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',zIndex:200,display:'flex',alignItems:'flex-end',justifyContent:'center'}} onClick={e=>{if(e.target===e.currentTarget)setShowYN(false);}}><div style={{background:'#fff',borderRadius:'20px 20px 0 0',width:'100%',maxWidth:480,padding:'22px 20px 36px',maxHeight:'90vh',overflowY:'auto'}}><div style={{width:36,height:4,background:'#e0dff0',borderRadius:2,margin:'-6px auto 16px'}}/><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}><div style={{fontSize:16,fontWeight:800,color:'#1a1830'}}>{cy}년 연간운</div><button onClick={()=>setShowYN(false)} style={{background:'none',border:'none',cursor:'pointer',color:'#9090b8',fontSize:14}}>닫기</button></div><div style={{background:yi.cgBg,borderRadius:12,padding:'14px 16px',marginBottom:12}}><div style={{display:'flex',alignItems:'center',gap:12,marginBottom:8}}><div><span style={{fontSize:30,fontWeight:800,color:yi.cgColor}}>{yi.cg}</span><span style={{fontSize:30,fontWeight:800,color:yi.jjColor}}>{yi.jj}</span></div><div><div style={{fontSize:15,fontWeight:700,color:'#1a1830'}}>{cy}년 {yi.cgk}{yi.jjk}년</div><div style={{fontSize:11,color:'#9090b8',marginTop:1}}>{yi.combined}</div></div></div><div style={{fontSize:12,color:'#7070a0',lineHeight:1.8}}><div><span style={{color:yi.cgColor,fontWeight:700}}>{yi.cg}({yi.cgk})</span> <span style={{background:yi.cgColor+'18',color:yi.cgColor,borderRadius:4,padding:'1px 5px',fontSize:11}}>{yi.cgOhFull}</span> {yi.cgDesc}</div><div style={{marginTop:4}}><span style={{color:yi.jjColor,fontWeight:700}}>{yi.jj}({yi.jjk})</span> <span style={{background:yi.jjColor+'18',color:yi.jjColor,borderRadius:4,padding:'1px 5px',fontSize:11}}>{yi.jjOhFull}</span> {yi.jjDesc}</div></div></div><div style={{background:'#f8f7f4',borderRadius:10,padding:'11px 14px',marginBottom:14,display:'flex',alignItems:'flex-start',gap:10}}><span style={{fontSize:24}}>{yi.ani}</span><div><div style={{fontSize:13,fontWeight:700,color:'#1a1830',marginBottom:2}}>{yi.aniKr}띠의 해</div><div style={{fontSize:12,color:'#7070a0',lineHeight:1.5}}>{yi.aniDesc}</div></div></div><div style={{fontSize:12,color:'#7070a0',marginBottom:6,fontWeight:700}}>나의 {cy}년 운세 기록</div><div style={{display:'flex',gap:6,marginBottom:10,alignItems:'center'}}><StarRow val={ynRat} onSet={setYnRat} size={24}/>{ynRat>0&&<span style={{color:'#9090b8',fontSize:11,marginLeft:2}}>{RLBS[ynRat-1]}</span>}</div><div style={{background:'#f8f7f4',borderRadius:10,padding:'10px 14px',marginBottom:12}}>{[['재물',CGC[4],ynMon,setYnMon],['일',CGC[6],ynWork,setYnWork],['애정',CGC[2],ynLov,setYnLov],['건강',CGC[8],ynHea,setYnHea]].map((row,ri)=>(<div key={row[0]} style={{display:'flex',alignItems:'center',gap:8,marginBottom:ri===3?0:5}}><span style={{fontSize:12,fontWeight:600,color:row[1],width:34,flexShrink:0}}>{row[0]}</span><StarRow val={row[2]} onSet={row[3]} size={18} color={row[1]}/>{row[2]>0&&<span style={{fontSize:10,color:'#9090b8',marginLeft:1}}>{RLBS[row[2]-1]}</span>}</div>))}</div><textarea value={ynNote} onChange={e=>setYnNote(e.target.value)} rows={3} placeholder={cy+'년 한 해의 운세, 목표, 중요한 일들...'} style={{width:'100%',background:'#f8f7f4',border:'1px solid #e8e7f0',borderRadius:10,padding:'12px',color:'#1a1830',fontSize:14,resize:'none',outline:'none',boxSizing:'border-box',lineHeight:1.6,fontFamily:'inherit'}}/><button onClick={saveYN} disabled={ynSav} style={{width:'100%',marginTop:10,padding:'13px',borderRadius:10,border:'none',cursor:'pointer',fontWeight:700,background:'#c8960c',color:'#fff',fontSize:14}}>{ynSav?'저장 중...':'저장'}</button></div></div></div>);}

  function renderSummary(){const cgSt=getStats(entries,'cg','overall').filter(s=>s.rated>0).sort((a,b)=>b.avg-a.avg);const jjSt=getStats(entries,'jj','overall').filter(s=>s.rated>0).sort((a,b)=>b.avg-a.avg);if(!cgSt.length&&!jjSt.length)return null;function mkItem(s,mode){const col=mode==='cg'?CGC[s.idx]:JJC[s.idx],chrK=mode==='cg'?CGK[s.idx]:JJK[s.idx],ch=mode==='cg'?CG[s.idx]:JJ[s.idx];const dt=nextOcc(cy,cm,mode,s.idx);const dateStr=dt?(dt.getMonth()+1)+'/'+dt.getDate()+'('+DAYS[(dt.getDay()+6)%7]+')':'';return {ch,chrK,col,avg:s.avg,dateStr};}const goodItems=[...cgSt.filter(s=>s.avg>=4.0).slice(0,2).map(s=>mkItem(s,'cg')),...jjSt.filter(s=>s.avg>=4.0).slice(0,2).map(s=>mkItem(s,'jj'))];const badItems=[...cgSt.filter(s=>s.avg<=2.0).sort((a,b)=>a.avg-b.avg).slice(0,2).map(s=>mkItem(s,'cg')),...jjSt.filter(s=>s.avg<=2.0).sort((a,b)=>a.avg-b.avg).slice(0,2).map(s=>mkItem(s,'jj'))];function Card({title,icon,items,bg,bc,tc}){return(<div style={{background:bg,borderRadius:10,padding:'10px 12px',border:'1px solid '+bc+'44',flex:1}}><div style={{fontSize:9,color:tc,marginBottom:8,fontWeight:700}}>{icon} {title}</div>{items.length>0?(<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>{items.map((it,i)=>(<div key={i} style={{display:'flex',flexDirection:'column',alignItems:'center',background:'rgba(255,255,255,0.6)',borderRadius:8,padding:'7px 4px'}}><span style={{fontSize:26,fontWeight:800,color:it.col,lineHeight:1.1}}>{it.ch}</span><span style={{fontSize:10,color:'#5a5a7a',fontWeight:600,marginTop:2}}>{it.chrK}일</span>{it.dateStr&&<span style={{fontSize:8,color:'#b0b0c8',marginTop:1}}>{it.dateStr}</span>}<span style={{fontSize:10,color:tc,marginTop:3}}>{'★'.repeat(Math.round(it.avg))} {it.avg.toFixed(1)}</span></div>))}</div>):(<div style={{fontSize:10,color:tc+'99',textAlign:'center',padding:'8px 0'}}>해당 없음</div>)}</div>);}return(<div style={{margin:'8px 8px 0',display:'flex',gap:8}}><Card title="운이 좋은 날" icon="♦" items={goodItems.slice(0,4)} bg="#fffbee" bc="#c8960c" tc="#c8960c"/><Card title="주의가 필요한 날" icon="▲" items={badItems.slice(0,4)} bg="#fff5f5" bc="#d84030" tc="#d84030"/></div>);}

  function renderMNSection(){const mp=calcMP(new Date(cy,cm,15)),k=mnKey(cy,cm),hasNote=!!monthNotes[k];return(<div style={{margin:'8px 8px 0',background:'#fff',borderRadius:12,border:'1px solid #e8e7f0',overflow:'hidden'}}><div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'11px 14px',cursor:'pointer',background:hasNote?'#fffbee':'#fff'}} onClick={()=>setMnExp(!mnExp)}><div style={{display:'flex',alignItems:'center',gap:8}}><span style={{fontSize:14,fontWeight:700,color:mp.color}}>{mp.labelk}월</span><span style={{fontSize:12,color:'#9090b8'}}>월운 기록</span>{hasNote&&mnRat>0&&<span style={{fontSize:11,color:'#c8960c'}}>{'★'.repeat(mnRat)}</span>}</div><span style={{fontSize:13,color:'#c0c0d0'}}>{mnExp?'▲':'▼'}</span></div>{mnExp&&(<div style={{padding:'0 14px 14px',borderTop:'1px solid #f0eff8'}}><div style={{fontSize:11,color:'#7070a0',marginBottom:6,marginTop:10,fontWeight:700}}>종합운</div><div style={{display:'flex',gap:6,marginBottom:10,alignItems:'center'}}><StarRow val={mnRat} onSet={setMnRat} size={22}/>{mnRat>0&&<span style={{color:'#9090b8',fontSize:11,marginLeft:2}}>{RLBS[mnRat-1]}</span>}</div><div style={{background:'#f8f7f4',borderRadius:8,padding:'8px 12px',marginBottom:10}}>{[['재물',CGC[4],mnMon,setMnMon],['일',CGC[6],mnWork,setMnWork],['애정',CGC[2],mnLov,setMnLov],['건강',CGC[8],mnHea,setMnHea],['대인관계',CGC[0],mnRel,setMnRel]].map((row,ri)=>(<div key={row[0]} style={{display:'flex',alignItems:'center',gap:8,marginBottom:ri===4?0:4}}><span style={{fontSize:11,fontWeight:600,color:row[1],width:44,flexShrink:0}}>{row[0]}</span><StarRow val={row[2]} onSet={row[3]} size={17} color={row[1]}/></div>))}</div><textarea value={mnNote} onChange={e=>setMnNote(e.target.value)} rows={3} placeholder={mp.labelk+'월의 전체적인 흐름, 주요 사건...'} style={{width:'100%',background:'#f8f7f4',border:'1px solid #e8e7f0',borderRadius:8,padding:'10px',color:'#1a1830',fontSize:13,resize:'none',outline:'none',boxSizing:'border-box',lineHeight:1.6,fontFamily:'inherit'}}/><button onClick={saveMN} disabled={mnSav} style={{width:'100%',marginTop:8,padding:'10px',borderRadius:8,border:'none',cursor:'pointer',fontWeight:700,background:'#c8960c',color:'#fff',fontSize:13}}>{mnSav?'저장 중...':'월운 저장'}</button></div>)}</div>);}

  function renderRankTab(){if(rankLabel!==null){const ci=CG.indexOf(rankLabel[0]||''),ji=JJ.indexOf(rankLabel[1]||'');const cgC=ci>=0?CGC[ci]:'#9090b8',jjC=ji>=0?JJC[ji]:'#9090b8',bg=ci>=0?CGBG[ci]:'#f0f0f8';const ents=Object.entries(entries).filter(p=>p[1].label===rankLabel).sort((a,b)=>b[0].localeCompare(a[0]));const rated2=ents.filter(p=>p[1].rating>0);const avg2=rated2.length>0?rated2.reduce((s,p)=>s+p[1].rating,0)/rated2.length:null;return(<div><div style={{background:bg,borderRadius:12,padding:'14px 16px',marginBottom:12,display:'flex',alignItems:'center',justifyContent:'space-between'}}><div><span style={{fontSize:26,fontWeight:700,color:cgC}}>{rankLabel[0]}</span><span style={{fontSize:26,fontWeight:700,color:jjC}}>{rankLabel[1]}</span><span style={{fontSize:13,color:'#9090b8',marginLeft:6}}>{toKr(rankLabel)}일</span><div style={{fontSize:12,color:'#9090b8',marginTop:4}}>{ents.length}일 기록{avg2?' · 평균 '+'★'.repeat(Math.round(avg2))+' '+avg2.toFixed(1):''}</div></div><button onClick={()=>setRankLabel(null)} style={{background:'#fff',border:'1px solid #e0dff0',borderRadius:8,padding:'5px 12px',color:'#7070a0',fontSize:12,cursor:'pointer'}}>← 목록</button></div>{ents.length===0?<div style={{textAlign:'center',color:'#c0bfd8',padding:'20px'}}>기록 없음</div>:ents.map(p=><EntryCard key={p[0]} ek={p[0]} ev={p[1]}/>)}</div>);}const ranked=get60(entries,rankSub);return(<div><div style={{display:'flex',gap:6,marginBottom:14,flexWrap:'wrap'}}>{[['overall','종합'],['money','재물'],['work','일'],['love','애정'],['health','건강'],['relation','대인관계']].map(opt=>(<button key={opt[0]} onClick={()=>setRankSub(opt[0])} style={{padding:'5px 12px',borderRadius:20,fontSize:12,fontWeight:600,cursor:'pointer',border:'1px solid',background:rankSub===opt[0]?'#c8960c':'transparent',color:rankSub===opt[0]?'#fff':'#9090b8',borderColor:rankSub===opt[0]?'#c8960c':'#e0dff0'}}>{opt[1]}</button>))}</div>{ranked.length===0?<div style={{textAlign:'center',color:'#c0bfd8',padding:'30px 20px',fontSize:13}}>{rankSub==='overall'?'별점 기록이 없습니다':<span>날짜 기록 시 세부운 별점을 입력하면<br/>이곳에 순위가 나타납니다</span>}</div>:ranked.map((g,idx)=>{const ci2=CG.indexOf(g.label[0]||''),ji2=JJ.indexOf(g.label[1]||'');const cgC=ci2>=0?CGC[ci2]:'#9090b8',jjC=ji2>=0?JJC[ji2]:'#9090b8';let better=0;for(let i=0;i<idx;i++){const o=ranked[i];if((o.avg||0)>(g.avg||0)||((o.avg||0)===(g.avg||0)&&o.rated>g.rated))better++;}const rank=better+1,rc=rank===1?'#c8960c':rank===2?'#808090':rank===3?'#b07030':'#c8c8d8';return(<div key={g.label} onClick={()=>setRankLabel(g.label)} style={{background:'#fff',borderRadius:10,padding:'12px 14px',marginBottom:7,display:'flex',alignItems:'center',gap:12,boxShadow:'0 1px 3px rgba(0,0,0,0.04)',cursor:'pointer'}}><div style={{fontSize:16,fontWeight:700,color:rc,width:24,textAlign:'center',flexShrink:0}}>{rank}</div><div style={{flex:1}}><span style={{fontSize:20,fontWeight:700,color:cgC}}>{g.label[0]}</span><span style={{fontSize:20,fontWeight:700,color:jjC}}>{g.label[1]}</span><span style={{fontSize:13,color:'#9090b8',marginLeft:6}}>{g.labelk}일</span><div style={{fontSize:12,color:'#c8960c',marginTop:2}}>{'★'.repeat(Math.round(g.avg))} {g.avg.toFixed(1)}</div></div><div style={{fontSize:11,color:'#b0b0c8',flexShrink:0}}>{g.rated}회</div></div>);})}</div>);}

  function renderMonthlyTab(){if(mnSel!==null){const v=monthNotes[mnSel];if(!v){setMnSel(null);return null;}const ci=CG.indexOf((v.monthLabel||'')[0]||'');const color=ci>=0?CGC[ci]:'#9090b8',bg=ci>=0?CGBG[ci]:'#f0f0f8';const rat=Number(v.rating)||0;return(<div><div style={{display:'flex',gap:0,marginBottom:14,background:'#f5f4f0',borderRadius:10,padding:3}}><button style={{flex:1,padding:'7px',textAlign:'center',fontSize:13,fontWeight:600,background:'#fff',color:'#c8960c',border:'none',borderRadius:8,boxShadow:'0 1px 3px rgba(0,0,0,0.1)'}}>월운</button><button onClick={()=>setMnSel(null)} style={{flex:1,padding:'7px',textAlign:'center',fontSize:13,fontWeight:600,background:'transparent',color:'#9090b8',border:'none',borderRadius:8}}>연운</button></div><div style={{background:bg,borderRadius:12,padding:'14px 16px',marginBottom:12,display:'flex',alignItems:'center',justifyContent:'space-between'}}><div><div style={{fontSize:22,fontWeight:700,color}}>{v.monthLabelk||toKr(v.monthLabel||'')}월</div><div style={{fontSize:12,color:color+'99',marginTop:2}}>{v.year}년 {v.month}월</div>{rat>0&&<div style={{fontSize:13,color:'#c8960c',marginTop:3,fontWeight:700}}>{'★'.repeat(rat)} {rat}.0 {RLBS[rat-1]}</div>}</div><button onClick={()=>setMnSel(null)} style={{background:'#fff',border:'1px solid #e0dff0',borderRadius:8,padding:'5px 12px',color:'#7070a0',fontSize:12,cursor:'pointer'}}>← 목록</button></div>{v.sub&&(v.sub.money||v.sub.work||v.sub.love||v.sub.health||v.sub.relation)>0&&(<div style={{background:'#f8f7f4',borderRadius:10,padding:'10px 14px',marginBottom:8,display:'flex',gap:12,flexWrap:'wrap',fontSize:12}}>{v.sub.money>0&&<span style={{color:'#8a6000'}}>재물{'★'.repeat(v.sub.money)}</span>}{v.sub.work>0&&<span style={{color:'#4a6068'}}>일{'★'.repeat(v.sub.work)}</span>}{v.sub.love>0&&<span style={{color:'#c01800'}}>애정{'★'.repeat(v.sub.love)}</span>}{v.sub.health>0&&<span style={{color:'#1a3050'}}>건강{'★'.repeat(v.sub.health)}</span>}{v.sub.relation>0&&<span style={{color:'#1a7a40'}}>대인관계{'★'.repeat(v.sub.relation)}</span>}</div>)}{v.note&&<div style={{background:'#fff',borderRadius:10,padding:'14px',boxShadow:'0 1px 3px rgba(0,0,0,0.04)',fontSize:13,color:'#1a1830',lineHeight:1.7}}>{v.note}</div>}</div>);}const isMon=monthlySubTab==='mon';return(<div><div style={{display:'flex',gap:0,marginBottom:14,background:'#f5f4f0',borderRadius:10,padding:3}}>{[['mon','월운'],['year','연운']].map(t=>(<button key={t[0]} onClick={()=>setMonthlySubTab(t[0])} style={{flex:1,padding:'7px',textAlign:'center',cursor:'pointer',fontSize:13,fontWeight:600,background:monthlySubTab===t[0]?'#fff':'transparent',color:monthlySubTab===t[0]?'#c8960c':'#9090b8',border:'none',borderRadius:8,boxShadow:monthlySubTab===t[0]?'0 1px 3px rgba(0,0,0,0.1)':'none'}}>{t[1]}</button>))}</div>{isMon?(()=>{const sorted=Object.entries(monthNotes).sort((a,b)=>{const rd=(b[1].rating||0)-(a[1].rating||0);return rd!==0?rd:b[0].localeCompare(a[0]);});if(!sorted.length)return <div style={{textAlign:'center',color:'#c0bfd8',padding:'40px 20px'}}><div style={{fontSize:24,marginBottom:10}}>📅</div>달력 하단에서 월운을 기록하면<br/>여기에 모아볼 수 있습니다</div>;return sorted.map(p=>{const k=p[0],v=p[1],ci=CG.indexOf((v.monthLabel||'')[0]||'');const color=ci>=0?CGC[ci]:'#9090b8',bg=ci>=0?CGBG[ci]:'#f0f0f8',mlk=v.monthLabelk||toKr(v.monthLabel||'');return(<div key={k} onClick={()=>setMnSel(k)} style={{background:'#fff',borderRadius:10,padding:'12px 14px',marginBottom:7,display:'flex',alignItems:'center',gap:12,boxShadow:'0 1px 3px rgba(0,0,0,0.04)',cursor:'pointer'}}><div style={{width:42,height:42,borderRadius:9,background:bg,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><span style={{fontSize:14,fontWeight:700,color}}>{v.monthLabel||'??'}</span></div><div style={{flex:1}}><div style={{fontSize:14,fontWeight:700,color:'#1a1830'}}>{mlk}월</div><div style={{fontSize:11,color:'#9090b8'}}>{v.year}년 {v.month}월</div></div><div style={{textAlign:'right',flexShrink:0}}>{(v.rating||0)>0&&<div style={{fontSize:12,color:'#c8960c',fontWeight:700}}>{'★'.repeat(v.rating)} {Number(v.rating).toFixed(1)}</div>}<div style={{fontSize:10,color:'#c8c8d8',marginTop:2}}>→ 상세</div></div></div>);});})():(()=>{const sorted=Object.entries(yearNotes).sort((a,b)=>b[0].localeCompare(a[0]));if(!sorted.length)return <div style={{textAlign:'center',color:'#c0bfd8',padding:'40px 20px'}}><div style={{fontSize:24,marginBottom:10}}>📖</div>헤더의 연운 아이콘으로<br/>연간운을 기록해보세요</div>;return sorted.map(p=>{const k=p[0],v=p[1],yi=getYI(v.year||+k.replace('year:',''));return(<div key={k} style={{background:'#fff',borderRadius:10,padding:'14px',marginBottom:8,boxShadow:'0 1px 3px rgba(0,0,0,0.04)',borderLeft:'3px solid '+yi.cgColor}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}><div style={{display:'flex',alignItems:'center',gap:8}}><div style={{width:44,height:44,borderRadius:10,background:yi.cgBg,display:'flex',alignItems:'center',justifyContent:'center'}}><span style={{fontSize:14,fontWeight:700,color:yi.cgColor}}>{yi.cg}</span><span style={{fontSize:14,fontWeight:700,color:yi.jjColor}}>{yi.jj}</span></div><div><div style={{fontSize:14,fontWeight:700,color:'#1a1830'}}>{v.year}년 {yi.ani}</div><div style={{fontSize:11,color:'#9090b8'}}>{yi.cgk}{yi.jjk}년</div></div></div><span style={{fontSize:12,color:'#c8960c'}}>{v.rating?'★'.repeat(v.rating):''}</span></div>{v.note&&<div style={{fontSize:12,color:'#7070a0',lineHeight:1.5}}>{v.note}</div>}</div>);})})()}</div>);}

  function renderAnalysisTab(){const rated=Object.entries(entries).filter(p=>(p[1].rating||0)>0);if(rated.length<5){return <div style={{textAlign:'center',color:'#c0bfd8',padding:'50px 20px',fontSize:13}}>일운 기록이 5개 이상 쌓이면<br/>패턴 요약이 나타납니다</div>;}const cgSt=getStats(entries,'cg','overall').filter(s=>s.avg!==null).sort((a,b)=>b.avg-a.avg);const jjSt=getStats(entries,'jj','overall').filter(s=>s.avg!==null).sort((a,b)=>b.avg-a.avg);const lines=[];lines.push('지금까지 '+rated.length+'일의 일운을 기록했습니다.');if(cgSt.length>0){const b=cgSt[0];lines.push('천간 중 '+CGK[b.idx]+'일('+b.ch+')이 '+b.rated+'번 기록에서 가장 좋은 흐름을 보였습니다.');}if(cgSt.length>1){const w=cgSt[cgSt.length-1];if(w.avg<3.0)lines.push(CGK[w.idx]+'일('+w.ch+')은 상대적으로 주의가 필요한 날로 나타났습니다.');}if(jjSt.length>0){const b=jjSt[0];lines.push('지지 중 '+JJK[b.idx]+'일('+b.ch+')이 '+b.rated+'번 기록에서 에너지가 가장 높았습니다.');}if(jjSt.length>1){const w=jjSt[jjSt.length-1];if(w.avg<3.0)lines.push(JJK[w.idx]+'일('+w.ch+')은 컨디션이 낮은 날이 많았습니다.');}const subKeys=['money','work','love','health','relation'];const subLabels=['재물운','일운','애정운','건강운','대인관계'];for(let si=0;si<subKeys.length;si++){const cgS=getStats(entries,'cg',subKeys[si]).filter(s=>s.avg!==null).sort((a,b)=>b.avg-a.avg);if(cgS.length>0&&cgS[0].avg>=4.0)lines.push(subLabels[si]+'은 '+CGK[cgS[0].idx]+'일('+cgS[0].ch+')에 특히 강한 흐름을 보입니다.');}const mnRated=Object.entries(monthNotes).filter(p=>(p[1].rating||0)>0).sort((a,b)=>b[1].rating-a[1].rating);if(mnRated.length>0){const bm=mnRated[0][1];if(bm.monthLabelk)lines.push('월운 중 '+bm.monthLabelk+'월이 가장 좋았던 달로 기록되어 있습니다.');}return(<div><div style={{background:'#fff',borderRadius:12,padding:'20px',boxShadow:'0 1px 4px rgba(0,0,0,0.06)',marginBottom:12}}><div style={{fontSize:11,color:'#9090b8',letterSpacing:2,fontWeight:700,marginBottom:14}}>나의 일진 패턴</div>{lines.map((line,i)=>(<p key={i} style={{fontSize:14,color:'#1a1830',lineHeight:1.95,margin:0,marginBottom:i<lines.length-1?10:0}}>{line}</p>))}</div><div style={{fontSize:11,color:'#b0b0c8',textAlign:'center',lineHeight:1.7}}>기록이 쌓일수록 더 정확한 패턴이 나타납니다</div></div>);}

  function renderCGJJTab(){const stList=getStats(entries,patTab,'overall');const cArr=patTab==='cg'?CGC:JJC,bArr=patTab==='cg'?CGBG:JJBG,lArr=patTab==='cg'?CGK:JJK;if(patSel!==null){const s=stList[patSel];if(!s)return null;const col=cArr[patSel],bg=bArr[patSel],ch=patTab==='cg'?CG[patSel]:JJ[patSel],chk=patTab==='cg'?CGK[patSel]:JJK[patSel];return(<div><div style={{background:bg,borderRadius:12,padding:'14px 16px',marginBottom:12,display:'flex',alignItems:'center',justifyContent:'space-between'}}><div><span style={{fontSize:26,fontWeight:700,color:col}}>{ch}</span><span style={{fontSize:13,color:col+'88',marginLeft:8}}>{chk}일</span><div style={{fontSize:12,color:col+'88',marginTop:4}}>{s.count}일 기록{s.avg?' · 평균 '+'★'.repeat(Math.round(s.avg))+' '+s.avg.toFixed(1):''}</div></div><button onClick={()=>setPatSel(null)} style={{background:'#fff',border:'1px solid #e0dff0',borderRadius:8,padding:'5px 12px',color:'#7070a0',fontSize:12,cursor:'pointer'}}>← 목록</button></div>{s.list.length===0?<div style={{textAlign:'center',color:'#c0bfd8',padding:'20px'}}>기록 없음</div>:[...s.list].sort((a,b)=>b[0].localeCompare(a[0])).map(p=><EntryCard key={p[0]} ek={p[0]} ev={p[1]}/>)}</div>);}const rated=stList.filter(s=>s.avg!==null);if(rated.length===0)return <div style={{textAlign:'center',color:'#c0bfd8',padding:'40px 20px',fontSize:13}}>별점 기록이 쌓이면<br/>패턴이 나타납니다</div>;const good=rated.filter(s=>s.avg>=4.0).sort((a,b)=>b.avg-a.avg);const caution=rated.filter(s=>s.avg<3.0).sort((a,b)=>a.avg-b.avg);return(<div><div style={SECS}>{patTab==='cg'?'천간':'지지'}별 평균 운세</div><div style={{display:'flex',marginBottom:20}}><div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',height:72,paddingRight:4,paddingBottom:36,marginTop:4}}>{['5★','3★','1★'].map(n=><span key={n} style={{fontSize:8,color:'#c8c8d8'}}>{n}</span>)}</div><div style={{flex:1}}><div style={{display:'flex',alignItems:'flex-end',gap:3,height:72,marginBottom:3}}>{stList.map((s,i)=>{const col=cArr[i],h=s.avg?Math.max(7,(s.avg/5)*100):0;return(<div key={s.ch} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',cursor:'pointer'}} onClick={()=>setPatSel(i)}>{s.avg&&<div style={{fontSize:8,color:col,marginBottom:1}}>{s.avg.toFixed(1)}</div>}<div style={{width:'100%',height:h+'%',minHeight:s.avg?5:2,borderRadius:'3px 3px 0 0',background:s.avg?col:'#e8e7f0'}}/></div>);})}</div><div style={{display:'flex',gap:3}}>{stList.map((s,i)=>(<div key={s.ch} style={{flex:1,textAlign:'center',cursor:'pointer'}} onClick={()=>setPatSel(i)}><div style={{fontSize:12,fontWeight:700,color:cArr[i]}}>{s.ch}</div><div style={{fontSize:9,color:'#b0b0c8'}}>{lArr[i]}</div><div style={{fontSize:8,color:'#c8c8d8'}}>{s.count>0?s.count+'회':''}</div></div>))}</div></div></div>{good.length>0&&(<div style={{marginBottom:20}}><div style={{display:'flex',alignItems:'center',gap:6,marginBottom:10}}><div style={{width:3,height:16,background:'#1a7a40',borderRadius:2}}/><span style={{fontSize:13,fontWeight:700,color:'#1a7a40'}}>운이 좋은 날</span><span style={{fontSize:11,color:'#9090b8'}}>(평균 4★ 이상)</span></div><div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8}}>{good.map(s=>(<div key={s.ch} onClick={()=>setPatSel(s.idx)} style={{display:'flex',flexDirection:'column',alignItems:'center',background:'#fff',borderRadius:12,padding:'12px 6px',cursor:'pointer',border:'1px solid #e8e7f4',boxShadow:'0 1px 3px rgba(0,0,0,0.04)'}}><div style={{width:44,height:44,borderRadius:'50%',background:bArr[s.idx],display:'flex',alignItems:'center',justifyContent:'center',marginBottom:5}}><span style={{fontSize:22,fontWeight:700,color:cArr[s.idx]}}>{s.ch}</span></div><div style={{fontSize:12,color:'#1a1830',fontWeight:500}}>{lArr[s.idx]}일</div><div style={{fontSize:10,color:'#c8960c',marginTop:2}}>{s.avg.toFixed(1)}★</div><div style={{fontSize:9,color:'#b0b0c8',marginTop:1}}>{s.rated}회</div></div>))}</div></div>)}{caution.length>0&&(<div><div style={{display:'flex',alignItems:'center',gap:6,marginBottom:10}}><div style={{width:3,height:16,background:'#d84030',borderRadius:2}}/><span style={{fontSize:13,fontWeight:700,color:'#d84030'}}>주의가 필요한 날</span><span style={{fontSize:11,color:'#9090b8'}}>(평균 2★ 이하)</span></div><div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8}}>{caution.map(s=>(<div key={s.ch} onClick={()=>setPatSel(s.idx)} style={{display:'flex',flexDirection:'column',alignItems:'center',background:'#fff',borderRadius:12,padding:'12px 6px',cursor:'pointer',border:'1px solid #e8e7f4',boxShadow:'0 1px 3px rgba(0,0,0,0.04)'}}><div style={{width:44,height:44,borderRadius:'50%',background:bArr[s.idx],display:'flex',alignItems:'center',justifyContent:'center',marginBottom:5}}><span style={{fontSize:22,fontWeight:700,color:cArr[s.idx]}}>{s.ch}</span></div><div style={{fontSize:12,color:'#1a1830',fontWeight:500}}>{lArr[s.idx]}일</div><div style={{fontSize:10,color:'#d84030',marginTop:2}}>{s.avg.toFixed(1)}★</div><div style={{fontSize:9,color:'#b0b0c8',marginTop:1}}>{s.rated}회</div></div>))}</div></div>)}</div>);}

  function renderPat(){const hasAny=totalE>0||Object.keys(monthNotes).length>0||Object.keys(yearNotes).length>0;if(!hasAny&&patTab!=='anal')return <div style={{textAlign:'center',color:'#c0bfd8',padding:'50px 20px'}}><div style={{fontSize:28,marginBottom:10}}>📝</div>달력에서 날짜를 클릭해<br/>기록하면 패턴이 나타납니다</div>;if(patTab==='rank')return renderRankTab();if(patTab==='monthly')return renderMonthlyTab();if(patTab==='anal')return renderAnalysisTab();return renderCGJJTab();}

  return(
    <div style={{background:'#f5f4f0',minHeight:'100vh',color:'#1a1830',fontFamily:"'Noto Sans KR','Apple SD Gothic Neo',sans-serif",display:'flex',flexDirection:'column',maxWidth:480,margin:'0 auto'}}>
      <div style={{background:'#fff',borderBottom:'1px solid #e8e7f0',padding:'10px 16px 8px'}}>
        {view==='cal'?(<div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}><div><div style={{fontSize:24,fontWeight:800,color:'#1a1830',lineHeight:1.1}}>{cy}년 {cm+1}월</div><div style={{fontSize:12,color:'#1a1830',marginTop:2}}>{getYPK(cy)}년 {mpH.labelk}월</div></div><div style={{display:'flex',alignItems:'center',gap:2}}><button onClick={openYN} style={{background:'#f0eff8',border:'none',borderRadius:8,cursor:'pointer',padding:'6px 8px',color:'#7070a0',display:'flex',alignItems:'center'}}><IcoNote/></button><button onClick={()=>setShowRoller(true)} style={{background:'#f0eff8',border:'none',borderRadius:8,cursor:'pointer',padding:'6px 8px',color:'#7070a0',display:'flex',alignItems:'center',marginRight:4}}><IcoCal/></button><button style={NB} onClick={()=>{if(cm===0){setCm(11);setCy(cy-1);}else setCm(cm-1);}}>{PREV}</button><button style={{...NB,fontSize:11,color:'#c8960c',fontWeight:700}} onClick={()=>{const n=new Date();setCy(n.getFullYear());setCm(n.getMonth());}}>오늘</button><button style={NB} onClick={()=>{if(cm===11){setCm(0);setCy(cy+1);}else setCm(cm+1);}}>{NEXT}</button></div></div>):(<div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><div style={{fontSize:16,fontWeight:800,color:'#1a1830'}}>패턴 분석</div><button onClick={()=>supabase.auth.signOut()} style={{background:'none',border:'none',fontSize:11,color:'#b0b0c8',cursor:'pointer'}}>로그아웃</button></div>)}
      </div>
      {view==='cal'&&(<div style={{flex:1,overflowY:'auto',paddingBottom:8}}><div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:2,background:'#e0dff0',margin:'8px 8px 0',borderRadius:12,overflow:'hidden',padding:2}}>{DAYS.map((d,i)=>(<div key={d} style={{background:'#f0eff8',textAlign:'center',padding:'6px 0',fontSize:11,fontWeight:600,color:(i===5||i===6)?CGC[2]:'#7070a0'}}>{d}</div>))}{cells.map((cell,i)=>{if(!cell.cur)return <div key={i} style={{background:'#f5f4fa',borderRadius:6,padding:'3px 2px 4px',textAlign:'center',minHeight:70}}><span style={{fontSize:10,color:'#c8c8d8'}}>{cell.d}</span></div>;const dp=calcDP(cell.date),mpC=calcMP(cell.date);const isT=cell.date.toDateString()===today.toDateString();const hasDot=!!entries[dKey(cy,cm,cell.d)];const lunarMark=getLunarMark(cell.date);const wk=(cell.date.getDay()+6)%7;return(<div key={i} onClick={()=>openDay(cell.date)} style={{background:isT?'#fff8e6':'#ffffff',border:isT?'1.5px solid #c8960c':'1px solid #e8e7f4',borderRadius:6,overflow:'hidden',cursor:'pointer',textAlign:'center',minHeight:70}}><div style={{padding:'2px 2px 3px'}}><div style={{fontSize:11,fontWeight:700,color:isT?'#c8960c':(wk===5||wk===6?CGC[2]:'#1a1830'),paddingBottom:2,marginBottom:2,borderBottom:'1px solid #dddcec'}}>{cell.d}</div><div style={{fontSize:14,fontWeight:400,color:'#9090b8',lineHeight:1.2,letterSpacing:'-0.5px'}}>{dp.labelk}</div><div style={{display:'flex',alignItems:'baseline',justifyContent:'center',gap:1,marginTop:1}}><span style={{fontSize:11,fontWeight:600,color:dp.cgColor}}>{dp.cg}</span><span style={{fontSize:11,fontWeight:600,color:dp.jjColor}}>{dp.jj}</span></div>{isJeolgi(cell.date)?<div style={{fontSize:7,color:'#1a1830',lineHeight:1,marginTop:1}}>{mpC.cg+mpC.jj}↑</div>:lunarMark?<div style={{fontSize:7,color:'#1a1830',lineHeight:1,marginTop:1}}>음 {lunarMark}.1</div>:<div style={{height:7}}/>}{hasDot&&<div style={{width:4,height:4,borderRadius:'50%',background:'#c8960c',margin:'1px auto 0'}}/>}</div></div>);})}</div><div style={{fontSize:10,color:'#c0bfd8',textAlign:'center',padding:'3px 8px'}}>↑ 절기(월주 변경) · ● 기록 완료</div>{renderSummary()}{renderMNSection()}<div style={{margin:'8px 8px 0',position:'relative'}}><input type="text" value={searchQ} onChange={e=>setSearchQ(e.target.value)} placeholder="일진 검색 (예: 병오, 甲子, 임진...)" style={{width:'100%',boxSizing:'border-box',background:'#fff',border:'1px solid #e0dff0',borderRadius:10,padding:'10px 36px 10px 14px',fontSize:13,color:'#1a1830',outline:'none',fontFamily:'inherit'}}/>{searchQ&&<button onClick={()=>setSearchQ('')} style={{position:'absolute',right:10,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',color:'#b0b0c8',fontSize:16,cursor:'pointer'}}>✕</button>}</div>{sqTrim&&(<div style={{margin:'8px 8px 0'}}><div style={{...SECS,paddingLeft:2}}>검색 결과 — {sres.length}건</div>{sres.length===0?<div style={{background:'#fff',borderRadius:10,padding:'20px',textAlign:'center',color:'#c0bfd8',fontSize:13}}>기록된 날이 없습니다</div>:sres.map(p=><EntryCard key={p[0]} ek={p[0]} ev={p[1]}/>)}</div>)}</div>)}
      {view==='pat'&&(<div style={{flex:1,overflowY:'auto',padding:'12px'}}><div style={{display:'flex',borderBottom:'1px solid #e8e7f0',marginBottom:14}}>{[['cg','천간운'],['jj','지지운'],['rank','순위'],['monthly','연월운'],['anal','분석']].map(tab=>(<button key={tab[0]} onClick={()=>swPat(tab[0])} style={{flex:1,padding:'7px 1px',textAlign:'center',cursor:'pointer',fontSize:11,fontWeight:600,background:'none',border:'none',color:patTab===tab[0]?'#c8960c':'#9090b8',borderBottom:patTab===tab[0]?'2px solid #c8960c':'2px solid #e8e7f0'}}>{tab[1]}</button>))}</div>{renderPat()}</div>)}
      <div style={{display:'flex',position:'sticky',bottom:0,borderTop:'1px solid #e8e7f0'}}>{[['cal','달력'],['pat','패턴 분석']].map(tab=>(<div key={tab[0]} onClick={()=>setView(tab[0])} style={{flex:1,padding:'13px',textAlign:'center',cursor:'pointer',fontSize:13,fontWeight:700,letterSpacing:1,background:view===tab[0]?LAVEN:'#fff',color:'#1a1830',borderTop:view===tab[0]?'2px solid #9090b8':'2px solid transparent'}}>{tab[1]}</div>))}</div>
      {selDate&&selDP&&(<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'flex-end',justifyContent:'center',zIndex:100}} onClick={e=>{if(e.target===e.currentTarget)setSelDate(null);}}><div style={{background:'#fff',borderRadius:'20px 20px 0 0',width:'100%',maxWidth:480,padding:'22px 20px 36px',borderTop:'1px solid #e8e7f0',maxHeight:'92vh',overflowY:'auto'}}><div style={{width:36,height:4,background:'#e0dff0',borderRadius:2,margin:'-6px auto 16px'}}/><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}><div style={{fontSize:12,color:'#9090b8'}}>{selDate.getFullYear()}년 {selDate.getMonth()+1}월 {selDate.getDate()}일 ({DAYS[(selDate.getDay()+6)%7]}요일)</div>{selMP&&<div style={{background:selMP.bg,borderRadius:6,padding:'3px 10px',fontSize:12,color:selMP.color,fontWeight:700}}>{selMP.labelk}월</div>}</div><div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16,padding:'14px',background:selDP.cgBg,borderRadius:12}}><div><div><span style={{fontSize:34,fontWeight:800,color:selDP.cgColor}}>{selDP.cg}</span><span style={{fontSize:34,fontWeight:800,color:selDP.jjColor}}>{selDP.jj}</span></div><div style={{fontSize:15,color:'#1a1830',fontWeight:700,marginTop:3}}>{selDP.cgk}{selDP.jjk}일</div><div style={{fontSize:11,color:'#9090b8',marginTop:2}}>60갑자 #{selDP.idx+1}</div></div><div style={{fontSize:56,lineHeight:1,paddingRight:4}}>{selDP.ani}</div></div><div style={{fontSize:12,color:'#7070a0',marginBottom:6,fontWeight:700}}>종합운</div><div style={{display:'flex',gap:6,marginBottom:12,alignItems:'center'}}><StarRow val={mRat} onSet={setMRat} size={26}/>{mRat>0&&<span style={{color:'#9090b8',fontSize:12,marginLeft:2}}>{RLBS[mRat-1]}</span>}</div><div style={{fontSize:12,color:'#7070a0',marginBottom:8,fontWeight:700}}>세부운</div><div style={{background:'#f8f7f4',borderRadius:10,padding:'10px 14px',marginBottom:12}}>{[['재물',CGC[4],mMon,setMMon],['일',CGC[6],mWork,setMWork],['애정',CGC[2],mLov,setMLov],['건강',CGC[8],mHea,setMHea],['대인관계',CGC[0],mRel,setMRel]].map((row,ri)=>(<div key={row[0]} style={{display:'flex',alignItems:'center',gap:8,marginBottom:ri===4?0:6}}><span style={{fontSize:12,fontWeight:600,color:row[1],width:52,flexShrink:0,whiteSpace:'nowrap'}}>{row[0]}</span><StarRow val={row[2]} onSet={row[3]} size={20} color={row[1]}/>{row[2]>0&&<span style={{fontSize:11,color:'#9090b8',marginLeft:2}}>{RLBS[row[2]-1]}</span>}</div>))}</div><textarea value={mNote} onChange={e=>setMNote(e.target.value)} rows={3} placeholder="이 날 있었던 일, 기분, 특이사항..." style={{width:'100%',background:'#f8f7f4',border:'1px solid #e8e7f0',borderRadius:10,padding:'12px',color:'#1a1830',fontSize:14,resize:'none',outline:'none',boxSizing:'border-box',lineHeight:1.6,fontFamily:'inherit'}}/><div style={{display:'flex',gap:8,marginTop:12}}>{hasE&&<button onClick={doDel} style={{padding:'12px 14px',borderRadius:10,border:'none',cursor:'pointer',background:'#fce8e6',color:CGC[2],fontWeight:600}}>삭제</button>}<button onClick={()=>setSelDate(null)} style={{flex:1,padding:'12px',borderRadius:10,border:'1px solid #e8e7f0',cursor:'pointer',fontWeight:700,background:'#fff',color:'#9090b8'}}>닫기</button><button onClick={doSave} disabled={saving} style={{flex:1,padding:'12px',borderRadius:10,border:'none',cursor:'pointer',fontWeight:700,background:'#c8960c',color:'#fff'}}>{saving?'저장 중...':'저장'}</button></div></div></div>)}
    </div>
  );
}
