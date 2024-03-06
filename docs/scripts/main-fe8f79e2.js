import"./vendor-291ce04a.js";const d={canvasWidth:1e3,canvasHeight:600,rectThickness:15,slantRectDeltaX:120,slantRectDeltaY:150,slantRectAngle:24,slantRectWidth:600,verticalRectHeight:120,smallCircleDistance:78,smallCircleRadius:10,largeCircleRadius:30,particleRadius:8,particleCount:400,particlesStreamInitialWidth:50},W=l=>{const e=Matter.Runner,i=Matter.Engine,p=Matter.Bodies;Matter.Body;const t=Matter.Composite,r=Matter.Constraint,s=i.create(),o=e.create({isFixed:!0});let a=Matter.Mouse.create(document.querySelector("#particles")),h=Matter.MouseConstraint.create(s,{mouse:a,constraint:{stiffness:.2,damping:.1,render:{visible:!0}}});const c=l(p,r,s,h);return e.start(o,s),t.add(s.world,c),t.add(s.world,h),{addBodies:C=>{const S=C(p);return t.add(s.world,S),S},removeBody:C=>{t.remove(s.world,C)},timeScale:C=>{s.timing.timeScale=C},reSEAT:function(){console.log("COMPOSITES"),console.log(s),console.log(s.world),console.log(s.world.composites),Matter.Composite.clear(s.world,!1,!0),s.world.composites.forEach(C=>{Matter.Composite.remove(C,!1,!0)})},initialBodies:c}},H=Matter.Composites,q=Matter.Body,A=Matter.Events,T=400;let R={};const I={particles_to_move_up:[],collider:[],init:function(l,e,i,p,t=10,r=4){let s=0,o=1,a={};const h=H.stack(l,e,r,t,-5,-5,function(u,m){let f=!0;(o==1||o==r)&&(f=!1);let y=i.rectangle(u,m,25,25,{cordinates:[o,s],isSensor:f,restitution:0,isPartofTube:!0,isStatic:!0,tubeWidth:r});return a[o]=y,o==r?(R[s]=a,a={},o=1,s++):o++,y});console.log(R);const c=q.create({parts:h.bodies,label:"tube",friction:1,restitution:0});A.on(p,"beforeUpdate",function(){Matter.Body.setAngularVelocity(c,0)});for(let u=t-1;u>0;)this.collider.push(R[u][2]),this.collider.push(R[u][3]),u-=1;return c.collider=this.collider,c.particles_to_move_up=this.particles_to_move_up,c}},L={physics:function(l,e){return W((i,p,t,r)=>{this.engine=t,console.log(t.gravity.y),t.gravity.y=.4,console.log(t.gravity.y);let s=l,o=e,a=d.rectThickness/2;const h=i.rectangle(a,0,d.rectThickness,s*2,{isStatic:!0}),c=i.rectangle(o-a-T,100,d.rectThickness,s*2,{isStatic:!0}),u=i.rectangle(100,s-a,o*2-T*2.5,d.rectThickness,{isStatic:!0}),m=i.rectangle(o*2-T*2.5+125,s-a,T*2.5,d.rectThickness,{isStatic:!0,friction:1,restitution:0}),f=I.init(o-T+65,110,i,t,15,4),y=I.init(o-T+65+100,110,i,t,15,5),C=I.init(o-T+65+100+120,110,i,t,15,3),S=[f,y,C];A.on(t,"collisionStart",function(_){let b={3:.9945,4:.9955,5:.997};for(var w=0;w<S.length;w++){let B=S[w];var x=_.pairs;B.particles_to_move_up=[];for(var g=0,M=x.length;g!=M;++g){var n=x[g];n.bodyA.label!=="Circle Body"&&n.bodyB.label!=="Circle Body"||n.bodyA.label==="Circle Body"&&n.bodyB.label==="Circle Body"||(B.collider.some(E=>E===n.bodyA)?B.particles_to_move_up.push([n.bodyB,b[n.bodyA.tubeWidth]]):B.collider.some(E=>E===n.bodyB)&&B.particles_to_move_up.push([n.bodyA,b[n.bodB.tubeWidth]]))}}}),A.on(t,"beforeUpdate",function(_){for(var b=0;b<S.length;b++){let x=S[b];for(let g=0;g<x.particles_to_move_up.length;g++){const M=x.particles_to_move_up[g];let n=M[0],B=M[1];var w=n.position.y*B;q.setPosition(n,{x:n.position.x,y:w},!0)}}});let v;return A.on(r,"startdrag",function(_){v=_.body,v.isStatic&&(console.log(_),v.label==="tube"&&(v.isStatic=!1))}),A.on(r,"enddrag",function(_){v=null}),[h,u,c,m,f,y,C]})}};Matter.Composites;const O=Matter.Composite,V=Matter.Body,P=Matter.Bodies,D=Matter.Events,k=Matter.Common;let U=function(){let l=Matter.Bodies.circle(500,600,1),e=Matter.Composite.create();Matter.Composite.add(e,l);let i=0,p,t=[],r=50;for(let s=0;s<r+1;s++){let o=350,a=500-o*Math.cos(i),h=600-o*Math.sin(i),c=P.circle(a,h,15,{isStatic:s==0||s==r});if(p){let m=Matter.Constraint.create({bodyA:p,bodyB:c,stiffness:.1,damping:.3});Matter.Composite.add(e,m)}let u=Matter.Constraint.create({bodyA:l,bodyB:c,stiffness:.1,damping:.3});Matter.Composite.add(e,u),t.push(c),i+=1/r*Math.PI,Matter.Composite.add(e,c),p=c}for(let s=0;s<r;s+=5){let o=350,a=Math.PI*Math.random(),h=500-o*Math.cos(a)*Math.random(),c=600-o*Math.sin(a)*Math.random(),u=P.circle(h,c,10,{mass:0});for(let m=0;m<t.length;m+=1){const f=t[m];let y=Matter.Constraint.create({bodyA:f,bodyB:u,stiffness:.1,damping:.5});Matter.Composite.add(e,y)}}for(let s=0;s<300;s+=1){let o=350,a=Math.PI*Math.random(),h=500-o*Math.cos(a)*Math.random(),c=600-o*Math.sin(a)*Math.random(),u=P.circle(h,c,15,{mass:0});Matter.Composite.add(e,u)}return e.label="Soft Body",e};const G={physics:function(l,e){return W((i,p,t,r)=>{let s=l,o=e,a=d.rectThickness/2;const h=i.rectangle(a,0,d.rectThickness,s*2,{isStatic:!0}),c=i.rectangle(o-a,100,d.rectThickness,s*2,{isStatic:!0}),u=i.rectangle(100,s-a,o*2,d.rectThickness*2,{isStatic:!0});i.rectangle(100,100,100,100);const m=i.rectangle(100,100,100,100,{isSensor:!0,isStatic:!0});console.log("square_sensor"),console.log(m);const f=U();console.log("soft body"),console.log(f);const y=i.fromVertices(500,100,[{x:450,y:100},{x:550,y:100},{x:500,y:300}],{label:"triangle"});console.log(y),D.on(t,"beforeUpdate",function(){Matter.Body.setAngularVelocity(y,0)});const C=i.rectangle(0,s*1.05,o*2,s,{isSensor:!0,isStatic:!0});return D.on(t,"collisionStart",function(S){for(var v=0,_=S.pairs.length;v!=_;++v){var b=S.pairs[v];if(!b.bodyA.isSensor&&!b.bodyB.isSensor||(console.log("PROMISING"),b.bodyA!=y&&b.bodyB!=y))return;console.log("POP!"),f.constraints?.forEach(n=>{Matter.Composite.remove(f,n,!0)}),f.constraints?.forEach(n=>{Matter.Composite.remove(f,n,!0)}),f.constraints?.forEach(n=>{Matter.Composite.remove(f,n,!0)});for(var w=1e3/60/t.timing.lastDelta,x=O.allBodies(t.world),v=0;v<x.length;v++){var g=x[v];if(!g.isStatic&&g.position.y>=400){var M=.03*g.mass*w;V.applyForce(g,g.position,{x:(M+k.random()*M)*k.choose([1,-1]),y:-M+k.random()*-M})}}}}),[h,u,c,y,m,f,C]})}},F={colors:["#ffbf00","#dc143c","#8e2de2","#2196f3","#39ff14"],colorIndex:-1,init:function(l){this.staticCanvas=document.querySelector("#static"),this.particlesCanvas=document.querySelector("#particles"),this.staticContext=this.staticCanvas.getContext("2d"),this.particlesContext=this.particlesCanvas.getContext("2d"),this.staticContext.canvas.width=d.canvasWidth,this.staticContext.canvas.height=d.canvasHeight,this.particlesContext.canvas.width=d.canvasWidth,this.particlesContext.canvas.height=d.canvasHeight;let e=null,i=!1;this.customParticleRadius=d.particleRadius,this.particles=[],l=="capillary-action"?(e=L,i=!0,this.customParticleRadius=4):l==="surface-tension"&&(e=G),this.physics=e.physics(d.canvasHeight,d.canvasWidth),this.staticBodies=this.physics.initialBodies,i&&(console.log(this.physics),this.particles=[],this.addParticles())},addParticles:function(){this.particlesCanvas.height,this.particlesCanvas.width,this.colorIndex++,this.colorIndex>=this.colors.length&&(this.colorIndex=0);const l=this.colors[this.colorIndex];for(let e=0;e<d.particleCount;e++)this.physics.addBodies(i=>[i.circle(Math.random()*500,Math.random()*200+300,this.customParticleRadius,{restitution:.2,friction:0})]).forEach(i=>{this.particles.push({body:i,fillStyle:l})})},draw:function(){this.staticContext.clearRect(0,0,this.staticCanvas.width,this.staticCanvas.height),this.particlesContext.clearRect(0,0,this.particlesCanvas.width,this.particlesCanvas.height);let l=this;this.staticBodies.forEach(e=>{let i=0;function p(t,r,s="#fff"){if(r.beginPath(),t.label==="Rectangle Body"){if(t.isSensor&&!t.isPartofTube)return;r.fillStyle=s,r.moveTo(t.vertices[0].x,t.vertices[0].y),r.lineTo(t.vertices[1].x,t.vertices[1].y),r.lineTo(t.vertices[2].x,t.vertices[2].y),r.lineTo(t.vertices[3].x,t.vertices[3].y)}if(t.label==="Circle Body"&&(r.fillStyle=s,r.arc(t.position.x,t.position.y,t.circleRadius,0,2*Math.PI)),t.label==="Constraint"&&(r.fillStyle=s,r.arc(t.pointA.x,t.pointA.y,4,0,2*Math.PI)),t.label==="tube"&&i==0){i++;let o="#fff",a=0;for(let h=0;h<t.parts.length;h++){const c=t.parts[h];c.isSensor?(o=l.colors[a],a++,a>=5&&(a=0)):o="#fff",p(c,r,o)}}if(t.label==="Soft Body")for(let o=0;o<t.bodies.length;o++){const a=t.bodies[o];p(a,r)}t.label==="triangle"&&(r.fillStyle=s,r.moveTo(t.vertices[0].x,t.vertices[0].y),r.lineTo(t.vertices[1].x,t.vertices[1].y),r.lineTo(t.vertices[2].x,t.vertices[2].y)),t.label===""&&r.closePath(),r.fill()}p(e,this.staticContext)});for(let e=0;e<this.particles.length;e++){const i=this.particles[e].body.position;this.particlesContext.fillStyle=this.particles[e].fillStyle,this.particlesContext.beginPath(),this.particlesContext.arc(i.x,i.y,d.particleRadius,0,2*Math.PI),this.particlesContext.closePath(),this.particlesContext.fill(),i.y>this.particlesCanvas.height+d.particleRadius&&(this.physics.removeBody(this.particles[e].body),this.particles.splice(e,1),e--)}window.requestAnimationFrame(()=>{this.draw()})},reset:function(){try{console.log("TESTISET"),this.physics.reSEAT()}catch(l){console.log(l)}}},N={staticStdDeviation:[2,3,4,5,6,7,7,8,9],staticMatrix:["6 -1","8 -2","10 -3","12 -4","15 -6","18 -7","18 -7","21 -9","27 -10"],particlesStdDeviation:[2,2,3,4,5,6,6,8,11],particlesMatrix:["7 -2","7 -3","9 -3","12 -3","15 -4","18 -6","18 -6","22 -9","25 -12"],set:function(){this.staticCanvas=document.querySelector("#static"),this.staticFilterBlur=document.querySelector("#static-filter feGaussianBlur"),this.staticFilterMatrix=document.querySelector("#static-filter feColorMatrix"),this.particlesFilterBlur=document.querySelector("#particles-filter feGaussianBlur"),this.particlesFilterMatrix=document.querySelector("#particles-filter feColorMatrix"),this.update(),window.onresize=()=>{this.update()}},update:function(){const l=this.staticCanvas.clientWidth;let e=0;l<450?e=0:l<540?e=1:l<600?e=2:l<750?e=3:l<900?e=4:l<1200?e=5:l<1500?e=6:l<2200?e=7:e=8,this.staticFilterBlur.setAttribute("stdDeviation",this.staticStdDeviation[e]),this.staticFilterMatrix.setAttribute("values","1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 "+this.staticMatrix[e]),this.particlesFilterBlur.setAttribute("stdDeviation",this.particlesStdDeviation[e]),this.particlesFilterMatrix.setAttribute("values","1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 "+this.particlesMatrix[e])}};window.onload=()=>{let l=sessionStorage.last_hash===void 0?"home":sessionStorage.last_hash;function e(i){console.log("changing content..."),$.get(`./pages/${i}.html`,function(p){$("#contents").html($(p)),window.location.hash=i,sessionStorage.last_hash=i,console.log(window.location.hash+"HASH"),$("#home").off().on("click",()=>{console.log("HOME IS CLICKED"),e("home")}),$(".CA").off().on("click",()=>{console.log("CAPILLARY ACTION IS CLICKED"),e("capillary-action")}),$(".ST").off().on("click",()=>{console.log("SURFACE TENSION IS CLICKED"),e("surface-tension")}),i!=="home"&&(F.reset(),F.init(i),F.draw(),N.set(),document.getElementById("particles").onwheel=function(t){window.addEventListener("wheel",null,!0)},document.getElementById("static").onwheel=function(t){window.addEventListener("wheel",null,!0)}),i==="home"&&(new TypeIt("#title",{speed:75,delay:500}).type("Redstone SURGE!").pause(300).type(`<span id='greet' style='font-size: 0.8em; white-space: pre-line'>
Enjoy your visit!</span>`).pause(500).delete("#greet").go(),$(".main-carousel").flickity({cellAlign:"center",wrapAround:!0}))})}e(l)};