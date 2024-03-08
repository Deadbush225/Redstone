import"./vendor-291ce04a.js";const d={canvasWidth:1e3,canvasHeight:600,rectThickness:15,slantRectDeltaX:120,slantRectDeltaY:150,slantRectAngle:24,slantRectWidth:600,verticalRectHeight:120,smallCircleDistance:78,smallCircleRadius:10,largeCircleRadius:30,particleRadius:8,particleCount:400,particlesStreamInitialWidth:50},V=c=>{const n=Matter.Runner,e=Matter.Engine,f=Matter.Bodies;Matter.Body;const t=Matter.Composite,s=Matter.Constraint,o=e.create(),i=n.create({isFixed:!0});let r=Matter.Mouse.create(document.querySelector("#particles")),a=Matter.MouseConstraint.create(o,{mouse:r,constraint:{stiffness:.2,damping:.1,render:{visible:!0}}});const l=c(f,s,o,a);return n.start(i,o),t.add(o.world,l),t.add(o.world,a),{addBodies:b=>{const M=b(f);return t.add(o.world,M),M},removeBody:b=>{t.remove(o.world,b)},timeScale:b=>{o.timing.timeScale=b},reSEAT:function(){console.log("COMPOSITES"),console.log(o),console.log(o.world),console.log(o.world.composites),Matter.Composite.clear(o.world,!1,!0),o.world.composites.forEach(b=>{Matter.Composite.remove(b,!1,!0)})},initialBodies:l}},q=Matter.Composites,U=Matter.Body,R=Matter.Events,x=400;let A={};const E={particles_to_move_up:[],collider:[],init:function(c,n,e,f,t=10,s=4){let o=0,i=1,r={};const a=q.stack(c,n,s,t,-5,-5,function(u,m){let p=!0;(i==1||i==s)&&(p=!1);let y=e.rectangle(u,m,25,25,{cordinates:[i,o],isSensor:p,restitution:0,isPartofTube:!0,isStatic:!0,tubeWidth:s});return r[i]=y,i==s?(A[o]=r,r={},i=1,o++):i++,y}),l=U.create({parts:a.bodies,label:"tube",friction:1,restitution:0});R.on(f,"beforeUpdate",function(){Matter.Body.setAngularVelocity(l,0)});for(let u=t-1;u>0;)this.collider.push(A[u][2]),this.collider.push(A[u][3]),u-=1;return l.collider=this.collider,l.particles_to_move_up=this.particles_to_move_up,l}},O={physics:function(c,n){return V((e,f,t,s)=>{this.engine=t,t.gravity.y=.4;let o=c,i=n,r=d.rectThickness/2;const a=e.rectangle(r,0,d.rectThickness,o*2,{isStatic:!0}),l=e.rectangle(i-r-x,100,d.rectThickness,o*2,{isStatic:!0}),u=e.rectangle(100,o-r,i*2-x*2.5,d.rectThickness,{isStatic:!0}),m=e.rectangle(i*2-x*2.5+125,o-r,x*2.5,d.rectThickness,{isStatic:!0,friction:1,restitution:0}),p=E.init(i-x+65,110,e,t,15,4),y=E.init(i-x+65+100,110,e,t,15,5),b=E.init(i-x+65+100+120,110,e,t,15,3),M=[p,y,b];R.on(t,"collisionStart",function(w){let C={3:.9945,4:.9955,5:.997};for(var B=0;B<M.length;B++){let P=M[B];var _=w.pairs;P.particles_to_move_up=[];for(var v=0,S=_.length;v!=S;++v){var h=_[v];h.bodyA.label!=="Circle Body"&&h.bodyB.label!=="Circle Body"||h.bodyA.label==="Circle Body"&&h.bodyB.label==="Circle Body"||(P.collider.some(T=>T===h.bodyA)?P.particles_to_move_up.push([h.bodyB,C[h.bodyA.tubeWidth]]):P.collider.some(T=>T===h.bodyB)&&P.particles_to_move_up.push([h.bodyA,C[h.bodB.tubeWidth]]))}}}),R.on(t,"beforeUpdate",function(w){for(var C=0;C<M.length;C++){let _=M[C];for(let v=0;v<_.particles_to_move_up.length;v++){const S=_.particles_to_move_up[v];let h=S[0],P=S[1];var B=h.position.y*P;U.setPosition(h,{x:h.position.x,y:B},!0)}}});let g;return R.on(s,"startdrag",function(w){g=w.body,g.isStatic&&g.label==="tube"&&(g.isStatic=!1)}),R.on(s,"enddrag",function(w){g=null}),[a,u,l,m,p,y,b]})}};Matter.Composites;const F=Matter.Composite,L=Matter.Body,k=Matter.Bodies,H=Matter.Events,I=Matter.Common;let D=function(){let c=Matter.Bodies.circle(500,600,1),n=Matter.Composite.create();Matter.Composite.add(n,c);let e=0,f,t=[],s=50;for(let o=0;o<s+1;o++){let i=350,r=500-i*Math.cos(e),a=600-i*Math.sin(e),l=k.circle(r,a,15,{isStatic:o==0||o==s});if(f){let m=Matter.Constraint.create({bodyA:f,bodyB:l,stiffness:.1,damping:.3});Matter.Composite.add(n,m)}let u=Matter.Constraint.create({bodyA:c,bodyB:l,stiffness:.1,damping:.3});Matter.Composite.add(n,u),t.push(l),e+=1/s*Math.PI,Matter.Composite.add(n,l),f=l}for(let o=0;o<s;o+=5){let i=350,r=Math.PI*Math.random(),a=500-i*Math.cos(r)*Math.random(),l=600-i*Math.sin(r)*Math.random(),u=k.circle(a,l,10,{mass:0});for(let m=0;m<t.length;m+=1){const p=t[m];let y=Matter.Constraint.create({bodyA:p,bodyB:u,stiffness:.1,damping:.5});Matter.Composite.add(n,y)}}for(let o=0;o<300;o+=1){let i=350,r=Math.PI*Math.random(),a=500-i*Math.cos(r)*Math.random(),l=600-i*Math.sin(r)*Math.random(),u=k.circle(a,l,15,{mass:0});Matter.Composite.add(n,u)}return n.label="Soft Body",n};const j={physics:function(c,n){return V((e,f,t,s)=>{let o=c,i=n,r=d.rectThickness/2;const a=e.rectangle(r,0,d.rectThickness,o*2,{isStatic:!0}),l=e.rectangle(i-r,100,d.rectThickness,o*2,{isStatic:!0}),u=e.rectangle(100,o-r,i*2,d.rectThickness*2,{isStatic:!0});e.rectangle(100,100,100,100);const m=e.rectangle(100,100,100,100,{isSensor:!0,isStatic:!0});console.log("square_sensor"),console.log(m);const p=D();console.log("soft body"),console.log(p);const y=e.fromVertices(500,100,[{x:450,y:100},{x:550,y:100},{x:500,y:300}],{label:"triangle"});console.log(y),H.on(t,"beforeUpdate",function(){Matter.Body.setAngularVelocity(y,0)});const b=e.rectangle(0,o*1.05,i*2,o,{isSensor:!0,isStatic:!0});return H.on(t,"collisionStart",function(M){for(var g=0,w=M.pairs.length;g!=w;++g){var C=M.pairs[g];if(!C.bodyA.isSensor&&!C.bodyB.isSensor||(console.log("PROMISING"),C.bodyA!=y&&C.bodyB!=y))return;console.log("POP!"),p.constraints?.forEach(h=>{Matter.Composite.remove(p,h,!0)}),p.constraints?.forEach(h=>{Matter.Composite.remove(p,h,!0)}),p.constraints?.forEach(h=>{Matter.Composite.remove(p,h,!0)});for(var B=1e3/60/t.timing.lastDelta,_=F.allBodies(t.world),g=0;g<_.length;g++){var v=_[g];if(!v.isStatic&&v.position.y>=400){var S=.03*v.mass*B;L.applyForce(v,v.position,{x:(S+I.random()*S)*I.choose([1,-1]),y:-S+I.random()*-S})}}}}),[a,u,l,y,m,p,b]})}},W={colors:["#ffbf00","#dc143c","#8e2de2","#2196f3","#39ff14"],colorIndex:-1,init:function(c){this.staticCanvas=document.querySelector("#static"),this.particlesCanvas=document.querySelector("#particles"),this.staticContext=this.staticCanvas.getContext("2d"),this.particlesContext=this.particlesCanvas.getContext("2d"),this.staticContext.canvas.width=d.canvasWidth,this.staticContext.canvas.height=d.canvasHeight,this.particlesContext.canvas.width=d.canvasWidth,this.particlesContext.canvas.height=d.canvasHeight;let n=null,e=!1;this.customParticleRadius=d.particleRadius,this.particles=[],c=="capillary-action"?(n=O,e=!0,this.customParticleRadius=4):c==="surface-tension"&&(n=j),this.physics=n.physics(d.canvasHeight,d.canvasWidth),this.staticBodies=this.physics.initialBodies,e&&(console.log(this.physics),this.particles=[],this.addParticles())},addParticles:function(){this.particlesCanvas.height,this.particlesCanvas.width,this.colorIndex++,this.colorIndex>=this.colors.length&&(this.colorIndex=0);const c=this.colors[this.colorIndex];for(let n=0;n<d.particleCount;n++)this.physics.addBodies(e=>[e.circle(Math.random()*500,Math.random()*200+300,this.customParticleRadius,{restitution:.2,friction:0})]).forEach(e=>{this.particles.push({body:e,fillStyle:c})})},draw:function(){this.staticContext.clearRect(0,0,this.staticCanvas.width,this.staticCanvas.height),this.particlesContext.clearRect(0,0,this.particlesCanvas.width,this.particlesCanvas.height);let c=this;this.staticBodies.forEach(n=>{let e=0;function f(t,s,o="#fff"){if(s.beginPath(),t.label==="Rectangle Body"){if(t.isSensor&&!t.isPartofTube)return;s.fillStyle=o,s.moveTo(t.vertices[0].x,t.vertices[0].y),s.lineTo(t.vertices[1].x,t.vertices[1].y),s.lineTo(t.vertices[2].x,t.vertices[2].y),s.lineTo(t.vertices[3].x,t.vertices[3].y)}if(t.label==="Circle Body"&&(s.fillStyle=o,s.arc(t.position.x,t.position.y,t.circleRadius,0,2*Math.PI)),t.label==="Constraint"&&(s.fillStyle=o,s.arc(t.pointA.x,t.pointA.y,4,0,2*Math.PI)),t.label==="tube"&&e==0){e++;let i="#fff",r=0;for(let a=0;a<t.parts.length;a++){const l=t.parts[a];l.isSensor?(i=c.colors[r],r++,r>=5&&(r=0)):i="#fff",f(l,s,i)}}if(t.label==="Soft Body")for(let i=0;i<t.bodies.length;i++){const r=t.bodies[i];f(r,s)}t.label==="triangle"&&(s.fillStyle=o,s.moveTo(t.vertices[0].x,t.vertices[0].y),s.lineTo(t.vertices[1].x,t.vertices[1].y),s.lineTo(t.vertices[2].x,t.vertices[2].y)),t.label===""&&s.closePath(),s.fill()}f(n,this.staticContext)});for(let n=0;n<this.particles.length;n++){const e=this.particles[n].body.position;this.particlesContext.fillStyle=this.particles[n].fillStyle,this.particlesContext.beginPath(),this.particlesContext.arc(e.x,e.y,d.particleRadius,0,2*Math.PI),this.particlesContext.closePath(),this.particlesContext.fill(),e.y>this.particlesCanvas.height+d.particleRadius&&(this.physics.removeBody(this.particles[n].body),this.particles.splice(n,1),n--)}window.requestAnimationFrame(()=>{this.draw()})},reset:function(){try{this.physics.reSEAT()}catch{}}};window.onload=()=>{let c={ignorehashchange:!1,loadUrl:function(t){if(c.ignorehashchange==!1){let s=t.newURL.slice(t.newURL.indexOf("#")+1);console.log(s),e(s)}}},n=sessionStorage.last_hash===void 0?"home":sessionStorage.last_hash;console.log("last_hash"),console.log(n),console.log(sessionStorage.last_hash),window.addEventListener("hashchange",c.loadUrl,!1);function e(t){if(f)return;t.startsWith("#")&&(t=t.slice(1)),console.log("changing content...");function s(){$.get(`./pages/${t}.html`,function(o){if($("#contents").html($(o)),console.log("PAGE NAME: "+t),t!==""&&(c.ignorehashchange=!0,window.location.hash=t,setTimeout(function(){c.ignorehashchange=!1},100),sessionStorage.last_hash=t,console.log(window.location.hash+" -> HASH")),$("#home").off().on("click",()=>{e("home")}),$(".CA").off().on("click",()=>{e("capillary-action")}),$(".ST").off().on("click",()=>{e("surface-tension")}),$(".VP").off().on("click",()=>{e("vapor-pressure")}),$(".BP").off().on("click",()=>{e("boiling-point")}),$(".V").off().on("click",()=>{e("viscosity")}),$(".MHV").off().on("click",()=>{e("molar-heat-of-vaporization")}),$(".FP").off().on("click",()=>{e("freezing-point")}),$(".MP").off().on("click",()=>{e("melting-point")}),$(".S").off().on("click",()=>{e("sublimation")}),t!=="home"&&(W.reset(),W.init(t),W.draw(),document.getElementById("particles").onwheel=function(i){window.addEventListener("wheel",null,!0)},document.getElementById("static").onwheel=function(i){window.addEventListener("wheel",null,!0)}),t==="home"){new TypeIt("#title",{speed:75,delay:500}).type("Redstone SURGE!").pause(300).type(`<span id='greet' style='font-size: 0.8em; white-space: pre-line'>
Enjoy your visit!</span>`).pause(500).delete("#greet").go();let i=$(".main-carousel").flickity({cellAlign:"center",autoPlay:!0,pauseAutoPlayOnHover:!0,wrapAround:!0});i.on("dragStart.flickity",function(r,a){f=!0}),i.on("dragEnd.flickity",function(r,a){setTimeout(()=>{f=!1},200)})}})}s()}let f=!1;e(n)};