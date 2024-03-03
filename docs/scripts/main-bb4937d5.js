import"https://code.jquery.com/jquery-3.6.3.slim.js";import"https://cdnjs.cloudflare.com/ajax/libs/jquery.waitforimages/1.5.0/jquery.waitforimages.min.js";import{M as w}from"./vendor-462561fb.js";const P=i=>{const t=Matter.Runner,l=Matter.Engine,u=Matter.Bodies;Matter.Body;const e=Matter.Composite,s=Matter.Constraint,a=l.create(),c=t.create({isFixed:!0});let d=Matter.Mouse.create(document.querySelector("#particles")),p=Matter.MouseConstraint.create(a,{mouse:d,constraint:{stiffness:.2,damping:.1,render:{visible:!0}}});const r=i(u,s,a,p);return t.start(c,a),e.add(a.world,r),e.add(a.world,p),{addBodies:n=>{const v=n(u);return e.add(a.world,v),v},removeBody:n=>{e.remove(a.world,n)},timeScale:n=>{a.timing.timeScale=n},initialBodies:r}},h={canvasWidth:1e3,canvasHeight:600,rectThickness:15,slantRectDeltaX:120,slantRectDeltaY:150,slantRectAngle:24,slantRectWidth:600,verticalRectHeight:120,smallCircleDistance:78,smallCircleRadius:10,largeCircleRadius:30,particleRadius:6,particleCount:400,particlesStreamInitialWidth:50},k=w.Composites,q=w.Body,T=w.Events;let F={};const g=400,A={particles_to_move_up:[],collider:[],init:function(i,t,l,u,e=10,s=4){let a=0,c=1,d={};const p=k.stack(i,t,s,e,-5,-5,function(f,x){let b=!0;(c==1||c==s)&&(b=!1),c==s&&(c=0,F[a]=d,d={},a++);let n=l.rectangle(f,x,25,25,{cordinates:[c,a],isSensor:b,restitution:0,isPartofTube:!0,isStatic:!0,tubeWidth:s});return d[c]=n,c++,n});console.log(F);const r=q.create({parts:p.bodies,label:"tube",friction:1,restitution:0});console.log(r),T.on(u,"beforeUpdate",function(){w.Body.setAngularVelocity(r,0)});for(let f=e-1;f>4;)this.collider.push(F[f][2]),this.collider.push(F[f][3]),f-=1;return r.collider=this.collider,r.particles_to_move_up=this.particles_to_move_up,r}},I={colors:["#ffbf00","#dc143c","#8e2de2","#2196f3","#39ff14"],colorIndex:-1,init:function(){this.staticCanvas=document.querySelector("#static"),this.particlesCanvas=document.querySelector("#particles"),this.staticContext=this.staticCanvas.getContext("2d"),this.particlesContext=this.particlesCanvas.getContext("2d"),this.staticContext.canvas.width=h.canvasWidth,this.staticContext.canvas.height=h.canvasHeight,this.particlesContext.canvas.width=h.canvasWidth,this.particlesContext.canvas.height=h.canvasHeight,this.physics=P((i,t,l,u)=>{let e=this.particlesCanvas.height,s=this.particlesCanvas.width,a=h.rectThickness/2;const c=i.rectangle(a,0,h.rectThickness,e*2,{isStatic:!0}),d=i.rectangle(s-a-g,100,h.rectThickness,e*2,{isStatic:!0}),p=i.rectangle(100,e-a,s*2-g*2.5,h.rectThickness,{isStatic:!0}),r=i.rectangle(s*2-g*2.5+125,e-a,g*2.5,h.rectThickness,{isStatic:!0,friction:1,restitution:0});i.rectangle(100,100,100,100);const f=A.init(s-g+65,110,i,l,10,4),x=A.init(s-g+65+100,110,i,l,10,5),b=A.init(s-g+65+100+120,110,i,l,10,3),n=[f,x,b];T.on(l,"collisionStart",function(C){let S={3:.996,4:.998,5:.999};for(var _=0;_<n.length;_++){let m=n[_];var B=C.pairs;m.particles_to_move_up=[];for(var y=0,M=B.length;y!=M;++y){var o=B[y];o.bodyA.label!=="Circle Body"&&o.bodyB.label!=="Circle Body"||o.bodyA.label==="Circle Body"&&o.bodyB.label==="Circle Body"||(m.collider.some(R=>R===o.bodyA)?m.particles_to_move_up.push([o.bodyB,S[o.bodyA.tubeWidth]]):m.collider.some(R=>R===o.bodyB)&&m.particles_to_move_up.push([o.bodyA,S[o.bodB.tubeWidth]]))}}}),T.on(l,"beforeUpdate",function(C){for(var S=0;S<n.length;S++){let B=n[S];for(let y=0;y<B.particles_to_move_up.length;y++){const M=B.particles_to_move_up[y];let o=M[0],m=M[1];var _=o.position.y*m;q.setPosition(o,{x:o.position.x,y:_},!0)}}});let v;return T.on(u,"startdrag",function(C){v=C.body,v.isStatic&&(console.log(C),v.label==="tube"&&(v.isStatic=!1))}),T.on(u,"enddrag",function(C){v=null}),[c,p,d,r,f,x,b]}),this.staticBodies=this.physics.initialBodies,this.particles=[],this.addParticles()},addParticles:function(){this.particlesCanvas.height,this.particlesCanvas.width,this.colorIndex++,this.colorIndex>=this.colors.length&&(this.colorIndex=0);const i=this.colors[this.colorIndex];for(let t=0;t<h.particleCount;t++)this.physics.addBodies(l=>[l.circle(Math.random()*500,Math.random()*200+300,h.particleRadius,{restitution:.2,friction:0})]).forEach(l=>{this.particles.push({body:l,fillStyle:i})})},draw:function(){this.staticContext.clearRect(0,0,this.staticCanvas.width,this.staticCanvas.height),this.particlesContext.clearRect(0,0,this.particlesCanvas.width,this.particlesCanvas.height);let i=this;this.staticBodies.forEach(t=>{let l=0;function u(e,s,a="#fff"){if(s.beginPath(),e.label==="Rectangle Body"&&(s.fillStyle=a,s.moveTo(e.vertices[0].x,e.vertices[0].y),s.lineTo(e.vertices[1].x,e.vertices[1].y),s.lineTo(e.vertices[2].x,e.vertices[2].y),s.lineTo(e.vertices[3].x,e.vertices[3].y)),e.label==="Circle Body"&&(s.fillStyle=a,s.arc(e.position.x,e.position.y,e.circleRadius,0,2*Math.PI)),e.label==="Constraint"&&(s.fillStyle=a,s.arc(e.pointA.x,e.pointA.y,4,0,2*Math.PI)),e.label==="tube"&&l==0){l++;let c="#fff",d=0;for(let p=0;p<e.parts.length;p++){const r=e.parts[p];r.isSensor?(c=i.colors[d],d++,d>=5&&(d=0)):c="#fff",u(r,s,c)}}e.label===""&&s.closePath(),s.fill()}u(t,this.staticContext)});for(let t=0;t<this.particles.length;t++){const l=this.particles[t].body.position;this.particlesContext.fillStyle=this.particles[t].fillStyle,this.particlesContext.beginPath(),this.particlesContext.arc(l.x,l.y,h.particleRadius,0,2*Math.PI),this.particlesContext.closePath(),this.particlesContext.fill(),l.y>this.particlesCanvas.height+h.particleRadius&&(this.physics.removeBody(this.particles[t].body),this.particles.splice(t,1),t--)}window.requestAnimationFrame(()=>{this.draw()})}},W={staticFilterToggle:!0,particlesFilterToggle:!0,timeScales:[.2,1,1.5],timeScaleIndex:1,set:function(){this.staticCanvas=document.querySelector("#static"),this.particlesCanvas=document.querySelector("#particles"),this.values=document.querySelectorAll(".value"),this.action=document.querySelectorAll(".controls .action"),Array.from(this.action).forEach((i,t)=>{const l=i.querySelector("button");switch(t){case 0:l.onclick=()=>{this.staticFilterToggle=!this.staticFilterToggle,this.staticCanvas.style.filter=this.staticFilterToggle?"":"none",l.style.opacity=this.staticFilterToggle?"":.3,this.values[0].innerText=this.staticFilterToggle?"enabled":"disabled"};break;case 1:l.onclick=()=>{this.particlesFilterToggle=!this.particlesFilterToggle,this.particlesCanvas.style.filter=this.particlesFilterToggle?"":"none",l.style.opacity=this.particlesFilterToggle?"":.3,this.values[1].innerText=this.particlesFilterToggle?"enabled":"disabled"};break;case 2:l.onclick=()=>{this.timeScaleIndex++,this.timeScaleIndex>=this.timeScales.length&&(this.timeScaleIndex=0),this.values[2].innerText=this.timeScales[this.timeScaleIndex],Canvas.physics.timeScale(this.timeScales[this.timeScaleIndex])};break}})}},D={staticStdDeviation:[2,3,4,5,6,7,7,8,9],staticMatrix:["6 -1","8 -2","10 -3","12 -4","15 -6","18 -7","18 -7","21 -9","27 -10"],particlesStdDeviation:[2,2,3,4,5,6,6,8,11],particlesMatrix:["7 -2","7 -3","9 -3","12 -3","15 -4","18 -6","18 -6","22 -9","25 -12"],set:function(){this.staticCanvas=document.querySelector("#static"),this.staticFilterBlur=document.querySelector("#static-filter feGaussianBlur"),this.staticFilterMatrix=document.querySelector("#static-filter feColorMatrix"),this.particlesFilterBlur=document.querySelector("#particles-filter feGaussianBlur"),this.particlesFilterMatrix=document.querySelector("#particles-filter feColorMatrix"),this.update(),window.onresize=()=>{this.update()}},update:function(){const i=this.staticCanvas.clientWidth;let t=0;i<450?t=0:i<540?t=1:i<600?t=2:i<750?t=3:i<900?t=4:i<1200?t=5:i<1500?t=6:i<2200?t=7:t=8,this.staticFilterBlur.setAttribute("stdDeviation",this.staticStdDeviation[t]),this.staticFilterMatrix.setAttribute("values","1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 "+this.staticMatrix[t]),this.particlesFilterBlur.setAttribute("stdDeviation",this.particlesStdDeviation[t]),this.particlesFilterMatrix.setAttribute("values","1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 "+this.particlesMatrix[t])}};window.onload=()=>{I.init(),I.draw(),D.set(),W.set()};
