import"./vendor-291ce04a.js";import{A as q}from"./ambient.min-981841d8.js";const f={canvasWidth:1e3,canvasHeight:600,rectThickness:15,slantRectDeltaX:120,slantRectDeltaY:150,slantRectAngle:24,slantRectWidth:600,verticalRectHeight:120,smallCircleDistance:78,smallCircleRadius:10,largeCircleRadius:30,particleRadius:8,particleCount:400,particlesStreamInitialWidth:50},V=a=>{const s=Matter.Runner,i=Matter.Engine,l=Matter.Bodies;Matter.Body;const t=Matter.Composite,e=Matter.Constraint,o=i.create(),n=s.create({isFixed:!0});let r=Matter.Mouse.create(document.querySelector("#particles")),h=Matter.MouseConstraint.create(o,{mouse:r,constraint:{stiffness:.2,damping:.1,render:{visible:!0}}});const c=a(l,e,o,h);return s.start(n,o),t.add(o.world,c),t.add(o.world,h),{addBodies:b=>{const M=b(l);return t.add(o.world,M),M},removeBody:b=>{t.remove(o.world,b)},timeScale:b=>{o.timing.timeScale=b},reSEAT:function(){console.log("COMPOSITES"),console.log(o),console.log(o.world),console.log(o.world.composites),Matter.Composite.clear(o.world,!1,!0),o.world.composites.forEach(b=>{Matter.Composite.remove(b,!1,!0)})},initialBodies:c}},O=Matter.Composites,U=Matter.Body,R=Matter.Events,x=400;let A={};const E={particles_to_move_up:[],collider:[],init:function(a,s,i,l,t=10,e=4){let o=0,n=1,r={};const h=O.stack(a,s,e,t,-5,-5,function(u,y){let p=!0;(n==1||n==e)&&(p=!1);let m=i.rectangle(u,y,25,25,{cordinates:[n,o],isSensor:p,restitution:0,isPartofTube:!0,isStatic:!0,tubeWidth:e});return r[n]=m,n==e?(A[o]=r,r={},n=1,o++):n++,m}),c=U.create({parts:h.bodies,label:"tube",friction:1,restitution:0});R.on(l,"beforeUpdate",function(){Matter.Body.setAngularVelocity(c,0)});for(let u=t-1;u>0;)this.collider.push(A[u][2]),this.collider.push(A[u][3]),u-=1;return c.collider=this.collider,c.particles_to_move_up=this.particles_to_move_up,c}},F={physics:function(a,s){return V((i,l,t,e)=>{this.engine=t,t.gravity.y=.4;let o=a,n=s,r=f.rectThickness/2;const h=i.rectangle(r,0,f.rectThickness,o*2,{isStatic:!0}),c=i.rectangle(n-r-x,100,f.rectThickness,o*2,{isStatic:!0}),u=i.rectangle(100,o-r,n*2-x*2.5,f.rectThickness,{isStatic:!0}),y=i.rectangle(n*2-x*2.5+125,o-r,x*2.5,f.rectThickness,{isStatic:!0,friction:1,restitution:0}),p=E.init(n-x+65,110,i,t,15,4),m=E.init(n-x+65+100,110,i,t,15,5),b=E.init(n-x+65+100+120,110,i,t,15,3),M=[p,m,b];R.on(t,"collisionStart",function(w){let C={3:.9945,4:.9955,5:.997};for(var B=0;B<M.length;B++){let P=M[B];var _=w.pairs;P.particles_to_move_up=[];for(var v=0,S=_.length;v!=S;++v){var d=_[v];d.bodyA.label!=="Circle Body"&&d.bodyB.label!=="Circle Body"||d.bodyA.label==="Circle Body"&&d.bodyB.label==="Circle Body"||(P.collider.some(T=>T===d.bodyA)?P.particles_to_move_up.push([d.bodyB,C[d.bodyA.tubeWidth]]):P.collider.some(T=>T===d.bodyB)&&P.particles_to_move_up.push([d.bodyA,C[d.bodB.tubeWidth]]))}}}),R.on(t,"beforeUpdate",function(w){for(var C=0;C<M.length;C++){let _=M[C];for(let v=0;v<_.particles_to_move_up.length;v++){const S=_.particles_to_move_up[v];let d=S[0],P=S[1];var B=d.position.y*P;U.setPosition(d,{x:d.position.x,y:B},!0)}}});let g;return R.on(e,"startdrag",function(w){g=w.body,g.isStatic&&g.label==="tube"&&(g.isStatic=!1)}),R.on(e,"enddrag",function(w){g=null}),[h,u,c,y,p,m,b]})}};Matter.Composites;const L=Matter.Composite,D=Matter.Body,k=Matter.Bodies,H=Matter.Events,I=Matter.Common;let j=function(){let a=Matter.Bodies.circle(500,600,1),s=Matter.Composite.create();Matter.Composite.add(s,a);let i=0,l,t=[],e=50;for(let o=0;o<e+1;o++){let n=350,r=500-n*Math.cos(i),h=600-n*Math.sin(i),c=k.circle(r,h,15,{isStatic:o==0||o==e});if(l){let y=Matter.Constraint.create({bodyA:l,bodyB:c,stiffness:.1,damping:.3});Matter.Composite.add(s,y)}let u=Matter.Constraint.create({bodyA:a,bodyB:c,stiffness:.1,damping:.3});Matter.Composite.add(s,u),t.push(c),i+=1/e*Math.PI,Matter.Composite.add(s,c),l=c}for(let o=0;o<e;o+=5){let n=350,r=Math.PI*Math.random(),h=500-n*Math.cos(r)*Math.random(),c=600-n*Math.sin(r)*Math.random(),u=k.circle(h,c,10,{mass:0});for(let y=0;y<t.length;y+=1){const p=t[y];let m=Matter.Constraint.create({bodyA:p,bodyB:u,stiffness:.1,damping:.5});Matter.Composite.add(s,m)}}for(let o=0;o<300;o+=1){let n=350,r=Math.PI*Math.random(),h=500-n*Math.cos(r)*Math.random(),c=600-n*Math.sin(r)*Math.random(),u=k.circle(h,c,15,{mass:0});Matter.Composite.add(s,u)}return s.label="Soft Body",s};const z={physics:function(a,s){return V((i,l,t,e)=>{let o=a,n=s,r=f.rectThickness/2;const h=i.rectangle(r,0,f.rectThickness,o*2,{isStatic:!0}),c=i.rectangle(n-r,100,f.rectThickness,o*2,{isStatic:!0}),u=i.rectangle(100,o-r,n*2,f.rectThickness*2,{isStatic:!0});i.rectangle(100,100,100,100);const y=i.rectangle(100,100,100,100,{isSensor:!0,isStatic:!0});console.log("square_sensor"),console.log(y);const p=j();console.log("soft body"),console.log(p);const m=i.fromVertices(500,100,[{x:450,y:100},{x:550,y:100},{x:500,y:300}],{label:"triangle"});console.log(m),H.on(t,"beforeUpdate",function(){Matter.Body.setAngularVelocity(m,0)});const b=i.rectangle(0,o*1.05,n*2,o,{isSensor:!0,isStatic:!0});return H.on(t,"collisionStart",function(M){for(var g=0,w=M.pairs.length;g!=w;++g){var C=M.pairs[g];if(!C.bodyA.isSensor&&!C.bodyB.isSensor||(console.log("PROMISING"),C.bodyA!=m&&C.bodyB!=m))return;console.log("POP!"),p.constraints?.forEach(d=>{Matter.Composite.remove(p,d,!0)}),p.constraints?.forEach(d=>{Matter.Composite.remove(p,d,!0)}),p.constraints?.forEach(d=>{Matter.Composite.remove(p,d,!0)});for(var B=1e3/60/t.timing.lastDelta,_=L.allBodies(t.world),g=0;g<_.length;g++){var v=_[g];if(!v.isStatic&&v.position.y>=400){var S=.03*v.mass*B;D.applyForce(v,v.position,{x:(S+I.random()*S)*I.choose([1,-1]),y:-S+I.random()*-S})}}}}),[h,u,c,m,y,p,b]})}},W={colors:["#ffbf00","#dc143c","#8e2de2","#2196f3","#39ff14"],colorIndex:-1,init:function(a){this.staticCanvas=document.querySelector("#static"),this.particlesCanvas=document.querySelector("#particles"),this.staticContext=this.staticCanvas.getContext("2d"),this.particlesContext=this.particlesCanvas.getContext("2d"),this.staticContext.canvas.width=f.canvasWidth,this.staticContext.canvas.height=f.canvasHeight,this.particlesContext.canvas.width=f.canvasWidth,this.particlesContext.canvas.height=f.canvasHeight;let s=null,i=!1;this.customParticleRadius=f.particleRadius,this.particles=[],a=="capillary-action"?(s=F,i=!0,this.customParticleRadius=4):a==="surface-tension"&&(s=z),this.physics=s.physics(f.canvasHeight,f.canvasWidth),this.staticBodies=this.physics.initialBodies,i&&(console.log(this.physics),this.particles=[],this.addParticles())},addParticles:function(){this.particlesCanvas.height,this.particlesCanvas.width,this.colorIndex++,this.colorIndex>=this.colors.length&&(this.colorIndex=0);const a=this.colors[this.colorIndex];for(let s=0;s<f.particleCount;s++)this.physics.addBodies(i=>[i.circle(Math.random()*500,Math.random()*200+300,this.customParticleRadius,{restitution:.2,friction:0})]).forEach(i=>{this.particles.push({body:i,fillStyle:a})})},draw:function(){this.staticContext.clearRect(0,0,this.staticCanvas.width,this.staticCanvas.height),this.particlesContext.clearRect(0,0,this.particlesCanvas.width,this.particlesCanvas.height);let a=this;this.staticBodies.forEach(s=>{let i=0;function l(t,e,o="#fff"){if(e.beginPath(),t.label==="Rectangle Body"){if(t.isSensor&&!t.isPartofTube)return;e.fillStyle=o,e.moveTo(t.vertices[0].x,t.vertices[0].y),e.lineTo(t.vertices[1].x,t.vertices[1].y),e.lineTo(t.vertices[2].x,t.vertices[2].y),e.lineTo(t.vertices[3].x,t.vertices[3].y)}if(t.label==="Circle Body"&&(e.fillStyle=o,e.arc(t.position.x,t.position.y,t.circleRadius,0,2*Math.PI)),t.label==="Constraint"&&(e.fillStyle=o,e.arc(t.pointA.x,t.pointA.y,4,0,2*Math.PI)),t.label==="tube"&&i==0){i++;let n="#fff",r=0;for(let h=0;h<t.parts.length;h++){const c=t.parts[h];c.isSensor?(n=a.colors[r],r++,r>=5&&(r=0)):n="#fff",l(c,e,n)}}if(t.label==="Soft Body")for(let n=0;n<t.bodies.length;n++){const r=t.bodies[n];l(r,e)}t.label==="triangle"&&(e.fillStyle=o,e.moveTo(t.vertices[0].x,t.vertices[0].y),e.lineTo(t.vertices[1].x,t.vertices[1].y),e.lineTo(t.vertices[2].x,t.vertices[2].y)),t.label===""&&e.closePath(),e.fill()}l(s,this.staticContext)});for(let s=0;s<this.particles.length;s++){const i=this.particles[s].body.position;this.particlesContext.fillStyle=this.particles[s].fillStyle,this.particlesContext.beginPath(),this.particlesContext.arc(i.x,i.y,f.particleRadius,0,2*Math.PI),this.particlesContext.closePath(),this.particlesContext.fill(),i.y>this.particlesCanvas.height+f.particleRadius&&(this.physics.removeBody(this.particles[s].body),this.particles.splice(s,1),s--)}window.requestAnimationFrame(()=>{this.draw()})},reset:function(){try{this.physics.reSEAT()}catch{}}};window.onload=()=>{var a=new q({blur:-10});let s={ignorehashchange:!1,loadUrl:function(e){if(s.ignorehashchange==!1){let o=e.newURL.slice(e.newURL.indexOf("#")+1);console.log(o),l(o)}}},i=sessionStorage.last_hash===void 0?"home":sessionStorage.last_hash;console.log("last_hash"),console.log(i),console.log(sessionStorage.last_hash),window.addEventListener("hashchange",s.loadUrl,!1);function l(e){if(t)return;e.startsWith("#")&&(e=e.slice(1)),console.log("changing content...");function o(){$.get(`./pages/${e}.html`,function(n){if($("#contents").html($(n)),console.log("PAGE NAME: "+e),e!==""&&(s.ignorehashchange=!0,window.location.hash=e,setTimeout(function(){s.ignorehashchange=!1},100),sessionStorage.last_hash=e,console.log(window.location.hash+" -> HASH")),$("#home").off().on("click",()=>{l("home")}),$(".CA").off().on("click",()=>{l("capillary-action")}),$(".ST").off().on("click",()=>{l("surface-tension")}),$(".VP").off().on("click",()=>{l("vapor-pressure")}),$(".BP").off().on("click",()=>{l("boiling-point")}),$(".V").off().on("click",()=>{l("viscosity")}),$(".MHV").off().on("click",()=>{l("molar-heat-of-vaporization")}),$(".FP").off().on("click",()=>{l("freezing-point")}),$(".MP").off().on("click",()=>{l("melting-point")}),$(".S").off().on("click",()=>{l("sublimation")}),e!=="home"&&(W.reset(),W.init(e),W.draw(),document.getElementById("particles").onwheel=function(r){window.addEventListener("wheel",null,!0)},document.getElementById("static").onwheel=function(r){window.addEventListener("wheel",null,!0)}),e==="home"){new TypeIt("#title",{speed:75,delay:500}).type("Redstone SURGE!").pause(300).type(`<span id='greet' style='font-size: 0.8em; white-space: pre-line'>
Enjoy your visit!</span>`).pause(500).delete("#greet").go();let r=$(".main-carousel").flickity({cellAlign:"center",autoPlay:!0,pauseAutoPlayOnHover:!0,wrapAround:!0});r.on("dragStart.flickity",function(h,c){t=!0}),r.on("dragEnd.flickity",function(h,c){setTimeout(()=>{t=!1},200)})}a.mount()})}o()}let t=!1;l(i)};