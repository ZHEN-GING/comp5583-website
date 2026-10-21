/* Original pixel district, drawn on an integer canvas grid for GENE_XU, 2026-10-20.
   No artwork, sprites, fonts or code extracted from referenced websites or games. */
(function () {
  'use strict';
  const W = 640, H = 384;
  const palette = { ink:'#20282d', asphalt:'#30383c', roadEdge:'#48514f', stone:'#858a78', curb:'#b4ac8a', paper:'#e0d6af', teal:'#77c6b2', ochre:'#b58951', brick:'#956353', rust:'#b77b5e', grass:'#53675b', foliage:'#657f66', darkLeaf:'#344d46' };
  const spots = [
    { id:'about', label:'ABOUT', place:'City archive', hint:'E · Read about me', x:154, y:174 },
    { id:'projects', label:'PROJECTS', place:'Corner studio', hint:'E · View projects', x:480, y:174 },
    { id:'home', label:'HOME', place:'District entrance', hint:'E · Welcome', x:178, y:275 },
    { id:'contact', label:'CONTACT', place:'Post office', hint:'E · Contact', x:468, y:275 }
  ];
  const obstacles = [
    {x:54,y:24,w:192,h:130}, {x:390,y:28,w:200,h:126},
    {x:82,y:308,w:162,h:62}, {x:394,y:306,w:192,h:64},
    {x:88,y:282,w:22,h:25}, {x:156,y:287,w:43,h:20},
    {x:442,y:288,w:22,h:19}, {x:22,y:268,w:25,h:77},
    {x:605,y:267,w:24,h:72}, {x:18,y:86,w:22,h:68}
  ];
  const bitmap = {
    A:['010','101','111','101','101'],B:['110','101','110','101','110'],C:['011','100','100','100','011'],D:['110','101','101','101','110'],E:['111','100','110','100','111'],F:['111','100','110','100','100'],G:['011','100','101','101','011'],H:['101','101','111','101','101'],I:['111','010','010','010','111'],J:['001','001','001','101','010'],K:['101','101','110','101','101'],L:['100','100','100','100','111'],M:['10001','11011','10101','10001','10001'],N:['1001','1101','1011','1001','1001'],O:['010','101','101','101','010'],P:['110','101','110','100','100'],Q:['010','101','101','011','001'],R:['110','101','110','101','101'],S:['011','100','010','001','110'],T:['111','010','010','010','010'],U:['101','101','101','101','111'],V:['101','101','101','101','010'],W:['10001','10001','10101','11011','10001'],X:['101','101','010','101','101'],Y:['101','101','010','010','010'],Z:['111','001','010','100','111'],'0':['111','101','101','101','111'],'1':['010','110','010','010','111'],'2':['110','001','010','100','111'],'3':['110','001','010','001','110'],'4':['101','101','111','001','001'],'5':['111','100','110','001','110'],'6':['011','100','111','101','111'],'7':['111','001','010','010','010'],'8':['111','101','111','101','111'],'9':['111','101','111','001','110'],'-':['000','000','111','000','000'],'.':['0','0','0','0','1'],'/':['001','001','010','100','100'],' ':['00','00','00','00','00']
  };
  function rect(ctx,x,y,w,h,color) { ctx.fillStyle=color; ctx.fillRect(Math.round(x),Math.round(y),w,h); }
  function pixelText(ctx,text,x,y,color,scale) {
    let cursor=x; const s=scale||1;
    for (const ch of text.toUpperCase()) {
      const rows=bitmap[ch]||bitmap[' '];
      rows.forEach((row,yy)=>Array.from(row).forEach((v,xx)=>{ if(v==='1')rect(ctx,cursor+xx*s,y+yy*s,s,s,color); }));
      cursor+=(rows[0].length+1)*s;
    }
  }
  function label(ctx,text,x,y,w,color) {
    rect(ctx,x+3,y+3,w,16,palette.ink);rect(ctx,x,y,w,16,color||palette.teal);
    rect(ctx,x+2,y+2,w-4,12,palette.ink);pixelText(ctx,text,x+6,y+5,palette.paper,1);
  }
  function plant(ctx,x,y,s) {
    const k=s||1;
    rect(ctx,x+5*k,y+13*k,4*k,7*k,palette.ochre);
    rect(ctx,x+2*k,y+3*k,12*k,11*k,palette.darkLeaf);
    rect(ctx,x,y+7*k,16*k,7*k,palette.darkLeaf);
    rect(ctx,x+3*k,y+2*k,10*k,8*k,palette.foliage);
    rect(ctx,x+1*k,y+6*k,11*k,5*k,'#7d9173');
    rect(ctx,x+5*k,y,5*k,5*k,'#8c9b78');rect(ctx,x+11*k,y+10*k,3*k,3*k,palette.grass);
  }
  function lamp(ctx,x,y) {
    rect(ctx,x-2,y-21,4,25,palette.ink);rect(ctx,x-3,y+3,6,3,palette.roadEdge);
    rect(ctx,x-7,y-27,14,7,palette.ink);rect(ctx,x-5,y-26,10,4,'#d8b875');
    rect(ctx,x-4,y-25,8,2,'#f2dda5');
  }
  function vent(ctx,x,y,w,h) {
    rect(ctx,x+3,y+3,w,h,'#3e4747');rect(ctx,x,y,w,h,'#adb09a');rect(ctx,x+2,y+2,w-4,h-4,'#535e59');
    for(let xx=x+4;xx<x+w-3;xx+=4)rect(ctx,xx,y+3,1,h-6,'#87907d');
  }
  function building(ctx,x,y,w,h,wall,roof) {
    rect(ctx,x+7,y+7,w,h+5,'#242e31');rect(ctx,x,y,w,h,palette.ink);
    rect(ctx,x+3,y+3,w-6,h-6,wall);rect(ctx,x+5,y+5,w-10,h-30,roof);
    rect(ctx,x+5,y+5,w-10,3,'#b09b78');rect(ctx,x+5,y+8,3,h-33,'#a39272');
    rect(ctx,x+8,y+h-29,w-16,3,'#4f524b');
    for(let yy=y+17;yy<y+h-30;yy+=13) {
      rect(ctx,x+9,yy,w-18,1,'#60685b');
      for(let xx=x+12+(Math.floor(yy/13)%2)*13;xx<x+w-11;xx+=27)rect(ctx,xx,yy+1,1,12,'#60685b');
    }
    for(let xx=x+10;xx<x+w-12;xx+=18) {
      rect(ctx,xx,y+h-22,12,12,palette.ink);rect(ctx,xx+2,y+h-20,8,7,'#b3be9c');
      rect(ctx,xx+5,y+h-20,1,8,'#676e5d');rect(ctx,xx+2,y+h-12,8,1,'#d8d4a9');
    }
    rect(ctx,x+2,y+h-4,w-4,3,'#6b4a40');
  }
  function drawWorld(ctx) {
    rect(ctx,0,0,W,H,palette.grass);
    for(let y=0;y<H;y+=16)for(let x=0;x<W;x+=16) {
      const n=((x*7+y*11)%43);if(n<14)rect(ctx,x+3,y+9,3,1,'#617461');
      if(n>32)rect(ctx,x+10,y+3,2,2,'#415b50');
    }
    // Sidewalks and orthogonal road network.
    rect(ctx,0,156,W,108,palette.stone);rect(ctx,260,0,118,H,palette.stone);
    for(let y=0;y<H;y+=16)rect(ctx,262,y,114,1,'#777e70');
    for(let x=0;x<W;x+=16)rect(ctx,x,158,1,104,'#777e70');
    rect(ctx,0,184,W,64,palette.curb);rect(ctx,280,0,80,H,palette.curb);
    rect(ctx,0,188,W,56,palette.asphalt);rect(ctx,284,0,72,H,palette.asphalt);
    rect(ctx,0,188,W,2,palette.roadEdge);rect(ctx,0,242,W,2,palette.roadEdge);
    rect(ctx,284,0,2,H,palette.roadEdge);rect(ctx,354,0,2,H,palette.roadEdge);
    for(let x=8;x<W;x+=34)if(x<276||x>360)rect(ctx,x,215,16,2,'#aca083');
    for(let y=12;y<H;y+=32)if(y<172||y>256)rect(ctx,319,y,2,13,'#aca083');
    // Four crosswalks and drain covers.
    for(let i=0;i<6;i++) {rect(ctx,286+i*12,171,7,9,'#c0b793');rect(ctx,286+i*12,253,7,9,'#c0b793');}
    for(let i=0;i<5;i++) {rect(ctx,266,190+i*11,9,6,'#c0b793');rect(ctx,365,190+i*11,9,6,'#c0b793');}
    [[36,239],[552,190],[286,65],[347,329]].forEach(([x,y])=>{rect(ctx,x,y,14,4,palette.ink);for(let z=2;z<12;z+=3)rect(ctx,x+z,y+1,1,2,'#6c7367');});
    // North archive and studio: original roofs, brick courses, doors and equipment.
    building(ctx,54,24,192,130,palette.brick,'#727b69');
    rect(ctx,64,37,46,29,'#51645a');rect(ctx,67,40,40,23,'#a6b295');
    for(let i=0;i<4;i++)rect(ctx,70+i*9,43,6,17,'#657d73');
    vent(ctx,192,42,29,22);rect(ctx,123,47,42,8,'#b2a27b');rect(ctx,125,49,38,4,'#d1c5a3');
    label(ctx,'CITY ARCHIVE',107,104,90,palette.teal);
    rect(ctx,139,124,29,30,palette.ink);rect(ctx,142,127,23,24,'#374947');rect(ctx,153,127,2,24,'#7c9c83');
    rect(ctx,147,138,2,2,palette.paper);rect(ctx,158,138,2,2,palette.paper);
    rect(ctx,134,154,39,8,'#b9af8f');rect(ctx,136,157,35,2,'#777b6b');
    building(ctx,390,28,200,126,palette.rust,'#777867');
    vent(ctx,411,45,40,26);vent(ctx,457,45,23,19);
    rect(ctx,528,43,35,22,'#443f3a');rect(ctx,531,46,29,16,'#9d7e5c');
    for(let i=0;i<4;i++)rect(ctx,533+i*7,48,4,12,'#c0a27b');
    rect(ctx,496,65,6,34,'#3b4846');rect(ctx,492,63,14,5,'#b6ac86');
    label(ctx,'PROJECT STUDIO',426,104,108,'#dfae74');
    rect(ctx,468,124,25,30,palette.ink);rect(ctx,471,127,19,23,'#597267');rect(ctx,484,138,2,3,palette.paper);
    rect(ctx,463,154,36,8,'#b9af8f');
    // Sheltered terminal, bulletin case, mailbox: real pixel objects at entrances.
    rect(ctx,179,137,14,24,palette.ink);rect(ctx,177,134,18,15,'#4a7366');rect(ctx,180,137,12,8,'#abd3ac');
    rect(ctx,182,139,8,1,'#35544a');rect(ctx,182,142,5,1,'#35544a');rect(ctx,179,160,14,3,'#6c715e');
    rect(ctx,508,134,18,27,palette.ink);rect(ctx,510,136,14,13,'#73ad9c');rect(ctx,512,138,10,9,'#b2e5c6');
    rect(ctx,513,141,7,1,'#3d7c69');rect(ctx,514,151,8,3,'#7b947d');rect(ctx,507,160,21,3,'#546354');
    // Southern pocket garden and entrance information board.
    rect(ctx,60,280,196,92,'#899078');rect(ctx,64,284,188,84,'#66785d');
    rect(ctx,74,314,168,53,'#4a5f4c');
    for(let x=82;x<244;x+=15){rect(ctx,x,334,4,36,'#a99a75');rect(ctx,x,337,4,3,'#d3c29a');}
    rect(ctx,80,344,164,4,'#9b8c67');rect(ctx,80,359,164,3,'#9b8c67');
    plant(ctx,83,287,2);plant(ctx,215,288,2);plant(ctx,120,312,2);plant(ctx,185,316,2);
    rect(ctx,157,285,40,26,palette.ink);rect(ctx,160,288,34,20,'#cfb983');rect(ctx,164,291,26,2,'#5e6554');
    pixelText(ctx,'WELCOME',163,297,'#4d564c',1);rect(ctx,162,311,4,12,'#746245');rect(ctx,188,311,4,12,'#746245');
    // South post office with roof terrace and brass mail slot.
    building(ctx,394,306,192,64,'#8e7458','#8c8469');
    rect(ctx,408,316,48,24,'#626c5d');vent(ctx,413,320,37,16);
    rect(ctx,510,316,53,26,'#b39d73');rect(ctx,513,319,47,20,'#6c7867');
    label(ctx,'POST OFFICE',465,348,88,palette.teal);
    rect(ctx,442,287,22,23,palette.ink);rect(ctx,444,289,18,19,'#bd8a55');rect(ctx,446,292,14,3,palette.ink);
    rect(ctx,448,300,10,5,'#e4c68e');rect(ctx,447,310,4,10,'#695842');rect(ctx,456,310,4,10,'#695842');
    // Small-scale street furniture and pocket detail.
    [[22,86],[22,118],[605,267],[605,303]].forEach(([x,y])=>plant(ctx,x,y,1.5));
    [[40,176],[254,175],[378,175],[606,176],[54,263],[256,267],[382,265],[603,264]].forEach(([x,y])=>lamp(ctx,x,y));
    [[71,169],[563,169],[221,274],[546,277]].forEach(([x,y])=>{rect(ctx,x,y,19,5,'#a18b62');rect(ctx,x+2,y+5,3,5,palette.ink);rect(ctx,x+14,y+5,3,5,palette.ink);rect(ctx,x,y-4,19,3,'#bb9d6e');});
    rect(ctx,10,14,26,44,'#384f47');rect(ctx,14,18,18,36,'#708a6c');
    rect(ctx,605,32,23,45,'#384f47');rect(ctx,608,35,17,39,'#708a6c');
    pixelText(ctx,'GENE DISTRICT',14,365,palette.paper,1);
    pixelText(ctx,'N',613,13,palette.paper,1);rect(ctx,614,22,1,15,palette.paper);rect(ctx,611,25,7,1,palette.paper);rect(ctx,612,24,5,1,palette.paper);
  }
  function drawPerson(ctx,x,y,facing,step) {
    const xx=Math.round(x)-8, yy=Math.round(y)-24;
    rect(ctx,xx+1,yy+22,14,3,'#202d2b');
    const stride=step%2===1?1:0;
    const left=facing==='left', right=facing==='right', back=facing==='up';
    // Six-pixel boots, jacket seams and a small canvas satchel: a bespoke 16x24 sprite.
    rect(ctx,xx+4,yy+17,4,5+stride,'#26383d');rect(ctx,xx+9,yy+17,4,5-stride,'#26383d');
    rect(ctx,xx+3,yy+22-stride,5,2,'#151f27');rect(ctx,xx+9,yy+21+stride,5,2,'#151f27');
    rect(ctx,xx+3,yy+9,11,10,'#20282d');rect(ctx,xx+4,yy+10,9,8,'#c1815d');
    rect(ctx,xx+5,yy+10,3,8,'#e4b07b');rect(ctx,xx+9,yy+11,3,7,'#a46750');
    rect(ctx,xx+2,yy+11-stride,2,7,'#d09a71');rect(ctx,xx+13,yy+11+stride,2,6,'#d09a71');
    rect(ctx,xx+4,yy+1,9,9,'#1e282c');rect(ctx,xx+3,yy+3,11,5,'#1e282c');
    if(!back){
      rect(ctx,xx+5,yy+4,7,5,'#d8af85');rect(ctx,xx+4,yy+2,9,3,'#374c49');
      if(left){rect(ctx,xx+3,yy+5,3,3,'#d8af85');rect(ctx,xx+5,yy+5,1,1,'#26323a');}
      else if(right){rect(ctx,xx+11,yy+5,3,3,'#d8af85');rect(ctx,xx+10,yy+5,1,1,'#26323a');}
      else {rect(ctx,xx+6,yy+5,1,1,'#26323a');rect(ctx,xx+10,yy+5,1,1,'#26323a');rect(ctx,xx+8,yy+8,2,1,'#a46f53');}
    } else {rect(ctx,xx+4,yy+2,9,6,'#374c49');rect(ctx,xx+5,yy+6,7,2,'#293e3b');}
    if(back){rect(ctx,xx+6,yy+11,6,6,'#5b7565');rect(ctx,xx+7,yy+12,4,3,'#91a184');}
    else {rect(ctx,xx+11,yy+14,4,5,'#536c62');rect(ctx,xx+12,yy+14,2,1,'#b7b388');}
  }
  function canStand(x,y) {
    if(x<12||x>W-12||y<26||y>H-10)return false;
    return !obstacles.some(o=>x+5>o.x&&x-5<o.x+o.w&&y>o.y&&y-6<o.y+o.h);
  }
  function nearestTo(x,y) {
    let nearest=null, distance=48;
    spots.forEach(s=>{const d=Math.hypot(x-s.x,y-s.y);if(d<distance){distance=d;nearest=s;}});
    return nearest;
  }
  function create(root,options) {
    const opts=options||{};
    let paused=false, destroyed=false, frame=0, previousTime=0, lastHint='', moved=0, dirty=true;
    let player={x:320,y:218,facing:'down'}, held=new Set(), padDirection=null;
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const stage=document.createElement('div');stage.className='district-stage';
    const canvas=document.createElement('canvas');canvas.width=W;canvas.height=H;canvas.className='district-canvas';canvas.tabIndex=0;
    canvas.setAttribute('role','img');canvas.setAttribute('aria-label','Interactive pixel street district. Focus here to walk with arrow keys or W A S D; press E near an entrance. All destinations also have accessible buttons.');
    const instruction=document.createElement('p');instruction.className='district-key-help';instruction.id='district-key-help';
    instruction.innerHTML='<span><kbd>W A S D</kbd> / <kbd>Arrow keys</kbd> walk</span><span><kbd>E</kbd> open nearby</span><span>Or select any named entrance</span>';
    canvas.setAttribute('aria-describedby',instruction.id);stage.appendChild(canvas);
    const ctx=canvas.getContext('2d');ctx.imageSmoothingEnabled=false;
    const scenery=document.createElement('canvas');scenery.width=W;scenery.height=H;drawWorld(scenery.getContext('2d'));
    const buttons=new Map();
    function open(id,trigger) { if(paused||destroyed)return;clearInput();if(typeof opts.onOpen==='function')opts.onOpen(id,trigger); }
    spots.forEach(s=>{
      const button=document.createElement('button');button.type='button';button.className='district-hotspot';button.dataset.section=s.id;
      button.style.left=(s.x/W*100)+'%';button.style.top=(s.y/H*100)+'%';button.textContent=s.label;
      button.setAttribute('aria-label','Open '+s.id+' — '+s.place);
      button.addEventListener('click',()=>open(s.id,button));stage.appendChild(button);buttons.set(s.id,button);
    });
    const toolbar=document.createElement('div');toolbar.className='district-toolbar';
    const status=document.createElement('p');status.className='district-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');
    const resetButton=document.createElement('button');resetButton.className='district-reset';resetButton.type='button';resetButton.textContent='Reset position';
    resetButton.addEventListener('click',()=>{reset();canvas.focus({preventScroll:true});});toolbar.append(status,resetButton);
    const touch=document.createElement('div');touch.className='district-touch';touch.setAttribute('aria-label','Touch movement controls');
    const pad=document.createElement('div');pad.className='district-dpad';
    [['up','Up','↑'],['left','Left','←'],['down','Down','↓'],['right','Right','→']].forEach(([dir,name,symbol])=>{
      const b=document.createElement('button');b.type='button';b.className='district-direction '+dir;b.textContent=symbol;b.setAttribute('aria-label','Move '+name.toLowerCase());
      function release(){padDirection=null;dirty=true;}
      b.addEventListener('pointerdown',ev=>{if(paused)return;ev.preventDefault();b.setPointerCapture(ev.pointerId);padDirection=dir;});
      b.addEventListener('pointerup',release);b.addEventListener('pointercancel',release);b.addEventListener('lostpointercapture',release);
      b.addEventListener('keydown',ev=>{if((ev.key==='Enter'||ev.key===' ')&&!paused){ev.preventDefault();padDirection=dir;}});
      b.addEventListener('keyup',release);b.addEventListener('blur',release);pad.appendChild(b);
    });
    const action=document.createElement('button');action.type='button';action.className='district-action';action.textContent='Open nearby';
    action.addEventListener('click',()=>{const near=nearestTo(player.x,player.y);if(near)open(near.id,action);});
    touch.append(pad,action);root.append(stage,instruction,toolbar,touch);
    const keyDirections={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',w:'up',s:'down',a:'left',d:'right'};
    function clearInput(){held.clear();padDirection=null;dirty=true;}
    function onKeyDown(e){
      if(paused||destroyed||document.activeElement!==canvas||e.altKey||e.ctrlKey||e.metaKey)return;
      const k=e.key.length===1?e.key.toLowerCase():e.key;
      if(keyDirections[k]){e.preventDefault();held.add(keyDirections[k]);}
      else if(k==='e'&&!e.repeat){e.preventDefault();const n=nearestTo(player.x,player.y);if(n)open(n.id,canvas);}
    }
    function onKeyUp(e){const k=e.key.length===1?e.key.toLowerCase():e.key;if(keyDirections[k])held.delete(keyDirections[k]);}
    canvas.addEventListener('keydown',onKeyDown);window.addEventListener('keyup',onKeyUp);
    canvas.addEventListener('blur',clearInput);canvas.addEventListener('pointerdown',()=>canvas.focus({preventScroll:true}));
    window.addEventListener('blur',clearInput);
    function visibility(){if(document.hidden)clearInput();previousTime=0;}
    document.addEventListener('visibilitychange',visibility);
    function updateHint(){
      const near=nearestTo(player.x,player.y);
      const message=paused?'Reading panel · movement paused':near?near.hint+' — '+near.place:'Explore the district, or select an entrance.';
      if(message!==lastHint){lastHint=message;status.textContent=message;if(typeof opts.onHint==='function')opts.onHint(message);}
      buttons.forEach((b,id)=>b.classList.toggle('is-near',!paused&&near&&near.id===id));
      action.disabled=paused||!near;action.textContent=near?'Open '+near.id:'Move near an entrance';
    }
    function draw(){
      ctx.clearRect(0,0,W,H);ctx.drawImage(scenery,0,0);
      const n=nearestTo(player.x,player.y);
      if(n&&!paused){rect(ctx,n.x-11,n.y+7,22,2,palette.teal);rect(ctx,n.x-13,n.y+4,2,5,palette.teal);rect(ctx,n.x+11,n.y+4,2,5,palette.teal);}
      drawPerson(ctx,player.x,player.y,player.facing,reduced?0:Math.floor(moved/7)%4);
    }
    function loop(t){
      if(destroyed)return;
      const dt=previousTime?Math.min((t-previousTime)/1000,0.04):0;previousTime=t;
      let dx=0,dy=0;
      if(!paused&&!document.hidden){
        const keys=(document.activeElement===canvas)?held:new Set();
        if(keys.has('left')||padDirection==='left')dx--;
        if(keys.has('right')||padDirection==='right')dx++;
        if(keys.has('up')||padDirection==='up')dy--;
        if(keys.has('down')||padDirection==='down')dy++;
      }
      if(dx||dy){
        player.facing=Math.abs(dx)>Math.abs(dy)?(dx<0?'left':'right'):(dy<0?'up':'down');
        const distance=75*dt/(dx&&dy?Math.SQRT2:1),nx=player.x+dx*distance,ny=player.y+dy*distance;
        let changed=false;
        if(canStand(nx,player.y)){changed=changed||nx!==player.x;player.x=nx;}
        if(canStand(player.x,ny)){changed=changed||ny!==player.y;player.y=ny;}
        if(changed)moved+=75*dt;
        dirty=true;
      }
      if(dirty){draw();updateHint();dirty=false;}
      frame=requestAnimationFrame(loop);
    }
    function reset(){player={x:320,y:218,facing:'down'};moved=0;clearInput();dirty=true;}
    function setPaused(value){paused=Boolean(value);clearInput();canvas.setAttribute('aria-disabled',String(paused));buttons.forEach(b=>b.disabled=paused);resetButton.disabled=paused;touch.querySelectorAll('.district-direction').forEach(b=>b.disabled=paused);updateHint();}
    function getState(){const near=nearestTo(player.x,player.y);return {x:Number(player.x.toFixed(2)),y:Number(player.y.toFixed(2)),facing:player.facing,paused,nearest:near?near.id:null,moving:held.size>0||Boolean(padDirection),width:W,height:H};}
    function destroy(){destroyed=true;cancelAnimationFrame(frame);clearInput();window.removeEventListener('keyup',onKeyUp);window.removeEventListener('blur',clearInput);document.removeEventListener('visibilitychange',visibility);stage.remove();instruction.remove();toolbar.remove();touch.remove();}
    draw();updateHint();frame=requestAnimationFrame(loop);
    return {setPaused,reset,getState,destroy};
  }
  window.DistrictScene=Object.freeze({create,world:Object.freeze({width:W,height:H,spots:spots.map(s=>Object.freeze({...s})),obstacles:obstacles.map(o=>Object.freeze({...o}))})});
})();
