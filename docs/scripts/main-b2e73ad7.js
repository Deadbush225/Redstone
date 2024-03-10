import{M as _}from"./vendor-462561fb.js";import{A as N}from"./ambient.min-be422996.js";const y={canvasWidth:1e3,canvasHeight:600,rectThickness:15,slantRectDeltaX:120,slantRectDeltaY:150,slantRectAngle:24,slantRectWidth:600,verticalRectHeight:120,smallCircleDistance:78,smallCircleRadius:10,largeCircleRadius:30,particleRadius:8,particleCount:400,particlesStreamInitialWidth:50},A=c=>{const s=Matter.Runner,o=Matter.Engine,h=Matter.Bodies;Matter.Body;const t=Matter.Composite,r=Matter.Constraint,e=o.create(),n=s.create({isFixed:!0});let i=Matter.Mouse.create(document.querySelector("#particles")),a=Matter.MouseConstraint.create(e,{mouse:i,constraint:{stiffness:.2,damping:.1,render:{visible:!0}}});const l=c(h,r,e,a);return s.start(n,e),t.add(e.world,l),t.add(e.world,a),{addBodies:M=>{const S=M(h);return t.add(e.world,S),S},removeBody:M=>{t.remove(e.world,M)},timeScale:M=>{e.timing.timeScale=M},reSEAT:function(){console.log("COMPOSITES"),console.log(e),console.log(e.world),console.log(e.world.composites),Matter.Composite.clear(e.world,!1,!0),e.world.composites.forEach(M=>{Matter.Composite.remove(M,!1,!0)})},initialBodies:l,clearParticles:()=>{t.clear(e.world)},addComposite:M=>{console.log(c),M.bodies.forEach(S=>{t.add(e.world,S)})}}},tt=Matter.Composites,K=Matter.Body,I=Matter.Events,k=400;let W={};const q={particles_to_move_up:[],collider:[],init:function(c,s,o,h,t=10,r=4){let e=0,n=1,i={};const a=tt.stack(c,s,r,t,-5,-5,function(u,m){let g=!0;(n==1||n==r)&&(g=!1);let v=o.rectangle(u,m,25,25,{cordinates:[n,e],isSensor:g,restitution:0,isPartofTube:!0,isStatic:!0,tubeWidth:r});return i[n]=v,n==r?(W[e]=i,i={},n=1,e++):n++,v}),l=K.create({parts:a.bodies,label:"tube",friction:1,restitution:0});I.on(h,"beforeUpdate",function(){Matter.Body.setAngularVelocity(l,0)});for(let u=t-1;u>0;)this.collider.push(W[u][2]),this.collider.push(W[u][3]),u-=1;return l.collider=this.collider,l.particles_to_move_up=this.particles_to_move_up,l}},et={physics:function(c,s){return A((o,h,t,r)=>{this.engine=t,t.gravity.y=.4;let e=c,n=s,i=y.rectThickness/2;const a=o.rectangle(i,0,y.rectThickness,e*2,{isStatic:!0}),l=o.rectangle(n-i-k,100,y.rectThickness,e*2,{isStatic:!0}),u=o.rectangle(100,e-i,n*2-k*2.5,y.rectThickness,{isStatic:!0}),m=o.rectangle(n*2-k*2.5+125,e-i,k*2.5,y.rectThickness,{isStatic:!0,friction:1,restitution:0}),g=q.init(n-k+65,110,o,t,15,4),v=q.init(n-k+65+100,110,o,t,15,5),B=q.init(n-k+65+100+120,110,o,t,15,3),w=[g,v,B];I.on(t,"collisionStart",function(S){let b={3:.9945,4:.9955,5:.997};for(var x=0;x<w.length;x++){let T=w[x];var d=S.pairs;T.particles_to_move_up=[];for(var f=0,p=d.length;f!=p;++f){var C=d[f];C.bodyA.label!=="Circle Body"&&C.bodyB.label!=="Circle Body"||C.bodyA.label==="Circle Body"&&C.bodyB.label==="Circle Body"||(T.collider.some(E=>E===C.bodyA)?T.particles_to_move_up.push([C.bodyB,b[C.bodyA.tubeWidth]]):T.collider.some(E=>E===C.bodyB)&&T.particles_to_move_up.push([C.bodyA,b[C.bodB.tubeWidth]]))}}}),I.on(t,"beforeUpdate",function(S){for(var b=0;b<w.length;b++){let d=w[b];for(let f=0;f<d.particles_to_move_up.length;f++){const p=d.particles_to_move_up[f];let C=p[0],T=p[1];var x=C.position.y*T;K.setPosition(C,{x:C.position.x,y:x},!0)}}});let M;return I.on(r,"startdrag",function(S){M=S.body,M.isStatic&&M.label==="tube"&&(M.isStatic=!1)}),I.on(r,"enddrag",function(S){M=null}),[a,u,l,m,g,v,B]})}};Matter.Composites;const ot=Matter.Composite,it=Matter.Body,L=Matter.Bodies,j=Matter.Events,O=Matter.Common;let st=function(){let c=Matter.Bodies.circle(500,600,1),s=Matter.Composite.create();Matter.Composite.add(s,c);let o=0,h,t=[],r=50;for(let e=0;e<r+1;e++){let n=350,i=500-n*Math.cos(o),a=600-n*Math.sin(o),l=L.circle(i,a,15,{isStatic:e==0||e==r});if(h){let m=Matter.Constraint.create({bodyA:h,bodyB:l,stiffness:.1,damping:.3});Matter.Composite.add(s,m)}let u=Matter.Constraint.create({bodyA:c,bodyB:l,stiffness:.1,damping:.3});Matter.Composite.add(s,u),t.push(l),o+=1/r*Math.PI,Matter.Composite.add(s,l),h=l}for(let e=0;e<r;e+=5){let n=350,i=Math.PI*Math.random(),a=500-n*Math.cos(i)*Math.random(),l=600-n*Math.sin(i)*Math.random(),u=L.circle(a,l,10,{mass:0});for(let m=0;m<t.length;m+=1){const g=t[m];let v=Matter.Constraint.create({bodyA:g,bodyB:u,stiffness:.1,damping:.5});Matter.Composite.add(s,v)}}for(let e=0;e<300;e+=1){let n=350,i=Math.PI*Math.random(),a=500-n*Math.cos(i)*Math.random(),l=600-n*Math.sin(i)*Math.random(),u=L.circle(a,l,15,{mass:0});Matter.Composite.add(s,u)}return s.label="Soft Body",s};const nt={physics:function(c,s){return A((o,h,t,r)=>{let e=c,n=s,i=y.rectThickness/2;const a=o.rectangle(i,0,y.rectThickness,e*2,{isStatic:!0}),l=o.rectangle(n-i,100,y.rectThickness,e*2,{isStatic:!0}),u=o.rectangle(100,e-i,n*2,y.rectThickness*2,{isStatic:!0});o.rectangle(100,100,100,100);const m=o.rectangle(100,100,100,100,{isSensor:!0,isStatic:!0});console.log("square_sensor"),console.log(m);const g=st();console.log("soft body"),console.log(g);const v=o.fromVertices(500,100,[{x:450,y:100},{x:550,y:100},{x:500,y:300}],{label:"triangle"});console.log(v),j.on(t,"beforeUpdate",function(){Matter.Body.setAngularVelocity(v,0)});const B=o.rectangle(0,e*1.05,n*2,e,{isSensor:!0,isStatic:!0});return j.on(t,"collisionStart",function(w){for(var M=0,S=w.pairs.length;M!=S;++M){var b=w.pairs[M];if(!b.bodyA.isSensor&&!b.bodyB.isSensor||(console.log("PROMISING"),b.bodyA!=v&&b.bodyB!=v))return;console.log("POP!"),g.constraints?.forEach(C=>{Matter.Composite.remove(g,C,!0)}),g.constraints?.forEach(C=>{Matter.Composite.remove(g,C,!0)}),g.constraints?.forEach(C=>{Matter.Composite.remove(g,C,!0)});for(var x=1e3/60/t.timing.lastDelta,d=ot.allBodies(t.world),M=0;M<d.length;M++){var f=d[M];if(!f.isStatic&&f.position.y>=400){var p=.03*f.mass*x;it.applyForce(f,f.position,{x:(p+O.random()*p)*O.choose([1,-1]),y:-p+O.random()*-p})}}}}),[a,u,l,v,m,g,B]})}};_.Composites;_.Composite;_.Body;const H=_.Bodies,rt=_.Events;_.Common;let lt=function(){let c=_.Bodies.circle(500,600,1),s=_.Composite.create();_.Composite.add(s,c);let o=0,h,t=[],r=50;for(let e=0;e<r+1;e++){let n=350,i=500-n*Math.cos(o),a=600-n*Math.sin(o),l=H.circle(i,a,15,{isStatic:e==0||e==r});if(h){let m=_.Constraint.create({bodyA:h,bodyB:l,stiffness:.1,damping:.3});_.Composite.add(s,m)}let u=_.Constraint.create({bodyA:c,bodyB:l,stiffness:.1,damping:.3});_.Composite.add(s,u),t.push(l),o+=1/r*Math.PI,_.Composite.add(s,l),h=l}for(let e=0;e<r;e+=5){let n=350,i=Math.PI*Math.random(),a=500-n*Math.cos(i)*Math.random(),l=600-n*Math.sin(i)*Math.random(),u=H.circle(a,l,10,{mass:0});for(let m=0;m<t.length;m+=1){const g=t[m];let v=_.Constraint.create({bodyA:g,bodyB:u,stiffness:.1,damping:.5});_.Composite.add(s,v)}}for(let e=0;e<300;e+=1){let n=350,i=Math.PI*Math.random(),a=500-n*Math.cos(i)*Math.random(),l=600-n*Math.sin(i)*Math.random(),u=H.circle(a,l,5,{mass:0});_.Composite.add(s,u)}return s},ct=function(c,s,o,h,t,r,e,n){let i=_.Composite.create();for(let a=0;a<200;a+=1){let l=(c+o)*Math.random(),u=(s+h)*Math.random(),m=H.circle(l,u,15,{mass:0,isStatic:!1,friction:t,frictionAir:r,frictionStatic:e,fill:n});_.Composite.add(i,m)}return i.label="Soft Body",i};const at={exampleInitialize:function(c){this.friction=c[0],this.frictionAir=c[1],this.frictionStatic=c[2],this.fill=c[3]},physics:function(c,s){return A((o,h,t,r)=>{let e=c,n=s,i=y.rectThickness/2;const a=o.rectangle(i,0,y.rectThickness,e*2,{isStatic:!0}),l=o.rectangle(n-i,100,y.rectThickness,e*2,{isStatic:!0}),u=o.rectangle(100,e-i,n*2,y.rectThickness*2,{isStatic:!0}),m=ct(50,50,100,100,this.friction,this.frictionAir,this.frictionStatic,this.fill);lt();const g=o.fromVertices(100,400,[{x:50,y:1e3},{x:50,y:1600},{x:1200,y:1600}],{label:"triangle",isStatic:!0});return rt.on(t,"beforeUpdate",function(){}),[a,u,l,g,m]})}};Matter.Composites;Matter.Composite;Matter.Body;const U=Matter.Bodies,G=Matter.Events;Matter.Common;let R=5,dt=.1,ht=function(){let c=Matter.Bodies.circle(500,600,1),s=Matter.Composite.create();Matter.Composite.add(s,c);let o=0,h,t=[],r=50;for(let e=0;e<r+1;e++){let n=350,i=500-n*Math.cos(o),a=600-n*Math.sin(o),l=U.circle(i,a,15,{isStatic:e==0||e==r});if(h){let m=Matter.Constraint.create({bodyA:h,bodyB:l,stiffness:.1,damping:.3});Matter.Composite.add(s,m)}let u=Matter.Constraint.create({bodyA:c,bodyB:l,stiffness:.1,damping:.3});Matter.Composite.add(s,u),t.push(l),o+=1/r*Math.PI,Matter.Composite.add(s,l),h=l}for(let e=0;e<r;e+=5){let n=350,i=Math.PI*Math.random(),a=500-n*Math.cos(i)*Math.random(),l=600-n*Math.sin(i)*Math.random(),u=U.circle(a,l,10,{mass:0});for(let m=0;m<t.length;m+=1){const g=t[m];let v=Matter.Constraint.create({bodyA:g,bodyB:u,stiffness:.1,damping:.5});Matter.Composite.add(s,v)}}for(let e=0;e<300;e+=1){let n=350,i=Math.PI*Math.random(),a=500-n*Math.cos(i)*Math.random(),l=600-n*Math.sin(i)*Math.random(),u=U.circle(a,l,15,{mass:0});Matter.Composite.add(s,u)}return s.label="Soft Body",s},ft=function(c,s,o,h,t,r,e,n,i){let a=Matter.Composite.create();for(let l=0;l<200;l+=1){let u=c+o*Math.random(),m=s+h*Math.random(),g=U.circle(u,m,15,{mass:0,isStatic:!1,friction:t,frictionAir:r,frictionStatic:e,fill:n,restitution:i});Matter.Composite.add(a,g)}return a.label="Soft Body",a};const z={physics:function(c,s){return A((o,h,t,r)=>{t.gravity.y=1;let e=c,n=s,i=y.rectThickness/2;const a=o.rectangle(i,0,y.rectThickness,e*2,{isStatic:!0}),l=o.rectangle(n-i,100,y.rectThickness,e*2,{isStatic:!0}),u=o.rectangle(100,e-i,n*2,y.rectThickness*2,{isStatic:!0});var m=document.getElementById("tempRange");m.oninput=function(){R=this.value*dt};const g=o.rectangle(100,200,950,40,{restitution:1});o.rectangle(i,0,100,500),o.rectangle(100,100,100,100);const v=o.rectangle(100,100,100,100,{isSensor:!0,isStatic:!0});console.log("square_sensor"),console.log(v);const B=ht();console.log("soft body"),console.log(B);const w=o.fromVertices(500,100,[{x:450,y:100},{x:550,y:100},{x:500,y:300}],{label:"triangle"});console.log(w);const M=ft(100,200,800,400,0,0,0,"skyblue",1);return G.on(t,"beforeUpdate",function(){Matter.Body.setAngularVelocity(g,0),300>g.position.y>200}),o.rectangle(0,e*1.05,n*2,e,{isSensor:!0,isStatic:!0}),G.on(t,"collisionStart",function(S){for(var b=0,x=S.pairs.length;b!=x;++b){var d=S.pairs[b];if(d.bodyA.isStatic&&d.bodyB.isStatic)return;d.bodyA.isStatic&d.bodyB.label==="Circle Body"&&Matter.Body.setVelocity(d.bodyB,{y:-R,x:R}),d.bodyB.isStatic&d.bodyA.label==="Circle Body"&&Matter.Body.setVelocity(d.bodyA,{y:-R,x:R})}}),[a,u,l,g,M]})}},ut=Matter.Composites;Matter.Composite;Matter.Body;Matter.Bodies;const Y=Matter.Events;Matter.Common;function Q(c,s,o,h,t){return(c-s)*(t-h)/(o-s)+h}let V=450;const pt={physics:function(c,s){return A((o,h,t,r)=>{t.gravity.y=0;let e=c,n=s,i=y.rectThickness/2;const a=o.rectangle(i,0,y.rectThickness,e*2,{isStatic:!0,restitution:1}),l=o.rectangle(n-i,100,y.rectThickness,e*2,{isStatic:!0,restitution:1}),u=o.rectangle(100,e-i,n*2,y.rectThickness*2,{isStatic:!0,restitution:1});var m=document.getElementById("tempRange");m.oninput=function(){V=Q(this.value,1,100,700,200),console.log(V)};let g=[],v=0,B=0,w=20,M=[];const S=ut.stack(350,150,w,w,1,1,(d,f)=>{let p=o.circle(d,f,7,{isStatic:!0,friction:0,frictionAir:0,frictionStatic:0,restitution:1});return M.push(p),B==w-1?(g[v]=M,v++,M=[],B=0):B++,p});let b=[];for(let d=0;d<g.length;d++)b[d]=[];for(let d=0;d<g.length;d++){const f=g[d];for(let p=0;p<f.length;p++)b[p][d]=g[d][p]}S.label="Soft Body";function x(d){if(!(d<=0))try{let f=b[0],p=b[b.length-1],C=f.length==1?0:Math.floor(f.length*Math.random()),T=p.length==1?0:Math.floor(p.length*Math.random()),E=Matter.Common.random(1,-1),F=Matter.Common.random(1,-1),Z=Matter.Common.random(1,-1),yt=Matter.Common.random(1,-1);Matter.Body.setStatic(f[C],!1),Matter.Body.setStatic(p[T],!1),Matter.Body.setVelocity(f[C],{x:3*E,y:3*F}),Matter.Body.setVelocity(p[T],{x:3*Z,y:3*F}),f.splice(C,1),p.splice(T,1),f.length==0&&b.splice(0,1),p.length==0&&b.splice(b.length-1,1),setTimeout(x(d-1),V*Math.random())}catch(f){console.log(f)}}return setInterval(()=>{x(Q(V,700,200,1,15))},1e3),Y.on(t,"beforeUpdate",function(){}),Y.on(t,"collisionStart",function(d){for(var f=0,p=d.pairs.length;f!=p;++f){var C=d.pairs[f];if(C.bodyA.isStatic&&C.bodyB.isStatic)return}}),[a,u,l,S]})}},mt=Matter.Composites;Matter.Composite;Matter.Body;Matter.Bodies;const X=Matter.Events;Matter.Common;function J(c,s,o,h,t){return(c-s)*(t-h)/(o-s)+h}let D=450;const gt={physics:function(c,s){return A((o,h,t,r)=>{t.gravity.y=1;let e=c,n=s,i=y.rectThickness/2;const a=o.rectangle(i,0,y.rectThickness,e*2,{isStatic:!0}),l=o.rectangle(n-i,100,y.rectThickness,e*2,{isStatic:!0}),u=o.rectangle(100,e-i,n*2,y.rectThickness*2,{isStatic:!0});var m=document.getElementById("tempRange");m.oninput=function(){D=J(this.value,1,100,700,200),console.log(D)};let g=[],v=0,B=0,w=20,M=[];const S=mt.stack(350,150,w,w,1,1,(d,f)=>{let p=o.circle(d,f,7,{isStatic:!0});return M.push(p),B==w-1?(g[v]=M,v++,M=[],B=0):B++,p});let b=[];for(let d=0;d<g.length;d++)b[d]=[];for(let d=0;d<g.length;d++){const f=g[d];for(let p=0;p<f.length;p++)b[p][d]=g[d][p]}S.label="Soft Body";function x(d){if(!(d<=0))try{let f=b[0],p=b[b.length-1],C=f.length==1?0:Math.floor(f.length*Math.random()),T=p.length==1?0:Math.floor(p.length*Math.random());Matter.Body.setStatic(f[C],!1),Matter.Body.setStatic(p[T],!1),f.splice(C,1),p.splice(T,1),f.length==0&&b.splice(0,1),p.length==0&&b.splice(b.length-1,1),setTimeout(x(d-1),D*Math.random())}catch(f){console.log(f)}}return setInterval(()=>{x(J(D,700,200,1,15))},1e3),X.on(t,"beforeUpdate",function(){}),X.on(t,"collisionStart",function(d){for(var f=0,p=d.pairs.length;f!=p;++f){var C=d.pairs[f];if(C.bodyA.isStatic&&C.bodyB.isStatic)return}}),[a,u,l,S]})}};_.Bodies;const P={colors:["#ffbf00","#dc143c","#8e2de2","#2196f3","#39ff14"],colorIndex:-1,init:function(c,s=0){this.staticCanvas=document.querySelector("#static"),this.particlesCanvas=document.querySelector("#particles"),this.staticContext=this.staticCanvas.getContext("2d"),this.particlesContext=this.particlesCanvas.getContext("2d"),this.staticContext.canvas.width=y.canvasWidth,this.staticContext.canvas.height=y.canvasHeight,this.particlesContext.canvas.width=y.canvasWidth,this.particlesContext.canvas.height=y.canvasHeight;let o=null,h=!1;this.customParticleRadius=y.particleRadius,this.particles=[],console.log(`DEMO NAME - ${c}`);let t=[[0,.01,1,"skyblue"],[1,.02,5,"orange"],[1,.1,10,"yellow"]];c=="capillary-action"?(o=et,h=!0,this.customParticleRadius=4):c==="surface-tension"?o=nt:c==="viscosity"?(console.log("arrayIndex"),console.log(s),console.log(t[s]),o=at,o.exampleInitialize(t[s])):c==="vapor-pressure"||c==="boiling-point"?o=z:c==="freezing-point"||(c==="melting-point"?o=gt:c==="molar-heat-of-vaporization"?o=z:c==="sublimation"&&(o=pt)),console.log("DEMO"),console.log(o),this.physics=o.physics(y.canvasHeight,y.canvasWidth),this.staticBodies=this.physics.initialBodies,console.log(this.staticBodies),console.log("PHYSICS"),console.log(this.physics),this.particles=[],h&&(console.log(this.physics),this.addParticles())},addParticles:function(){this.particlesCanvas.height,this.particlesCanvas.width,this.colorIndex++,this.colorIndex>=this.colors.length&&(this.colorIndex=0);const c=this.colors[this.colorIndex];for(let s=0;s<y.particleCount;s++)this.physics.addBodies(o=>[o.circle(Math.random()*500,Math.random()*200+300,this.customParticleRadius,{restitution:.2,friction:0})]).forEach(o=>{this.particles.push({body:o,fillStyle:c})})},draw:function(){this.staticContext.clearRect(0,0,this.staticCanvas.width,this.staticCanvas.height),this.particlesContext.clearRect(0,0,this.particlesCanvas.width,this.particlesCanvas.height);let c=this;this.staticBodies.forEach(s=>{let o=0;function h(t,r,e="#fff"){if(r.beginPath(),t.label==="Rectangle Body"){if(t.isSensor)return;r.fillStyle=e,r.moveTo(t.vertices[0].x,t.vertices[0].y),r.lineTo(t.vertices[1].x,t.vertices[1].y),r.lineTo(t.vertices[2].x,t.vertices[2].y),r.lineTo(t.vertices[3].x,t.vertices[3].y)}if(t.label==="Circle Body"&&(r.fillStyle=t.fill!==void 0?t.fill:e,r.arc(t.position.x,t.position.y,t.circleRadius,0,2*Math.PI)),t.label==="Constraint"&&(r.fillStyle=e,r.arc(t.pointA.x,t.pointA.y,4,0,2*Math.PI)),t.label==="tube"&&o==0){o++;let n="#fff",i=0;for(let a=0;a<t.parts.length;a++){const l=t.parts[a];l.isSensor?(n=c.colors[i],i++,i>=5&&(i=0)):n="#fff",h(l,r,n)}}if(t.label==="Soft Body")for(let n=0;n<t.bodies.length;n++){const i=t.bodies[n];h(i,r)}t.label==="triangle"&&(r.fillStyle=e,r.moveTo(t.vertices[0].x,t.vertices[0].y),r.lineTo(t.vertices[1].x,t.vertices[1].y),r.lineTo(t.vertices[2].x,t.vertices[2].y)),t.label===""&&r.closePath(),r.fill()}h(s,this.staticContext)});for(let s=0;s<this.particles.length;s++){const o=this.particles[s].body.position;this.particlesContext.fillStyle=this.particles[s].fillStyle,this.particlesContext.beginPath(),this.particlesContext.arc(o.x,o.y,y.particleRadius,0,2*Math.PI),this.particlesContext.closePath(),this.particlesContext.fill(),o.y>this.particlesCanvas.height+y.particleRadius&&(this.physics.removeBody(this.particles[s].body),this.particles.splice(s,1),s--)}window.requestAnimationFrame(()=>{this.draw()})},reset:function(){try{this.physics.reSEAT()}catch{}}};window.onload=()=>{var c=new N({blur:-10});let s={ignorehashchange:!1,loadUrl:function(r){if(s.ignorehashchange==!1){let e=r.newURL.slice(r.newURL.indexOf("#")+1);console.log(e),h(e)}}},o=sessionStorage.last_hash===void 0?"home":sessionStorage.last_hash;console.log("last_hash"),console.log(o),console.log(sessionStorage.last_hash),window.addEventListener("hashchange",s.loadUrl,!1);function h(r){if(t)return;r.startsWith("#")&&(r=r.slice(1)),console.log("changing content...");function e(){$.get(`./pages/${r}.html`,function(n){if($("#contents").html($(n)),console.log("PAGE NAME: "+r),r!==""&&(s.ignorehashchange=!0,window.location.hash=r,setTimeout(function(){s.ignorehashchange=!1},100),sessionStorage.last_hash=r,console.log(window.location.hash+" -> HASH")),$("#home").off().on("click",()=>{h("home")}),$(".CA").off().on("click",()=>{h("capillary-action")}),$(".ST").off().on("click",()=>{h("surface-tension")}),$(".VP").off().on("click",()=>{h("vapor-pressure")}),$(".BP").off().on("click",()=>{h("boiling-point")}),$(".V").off().on("click",()=>{h("viscosity")}),$(".MHV").off().on("click",()=>{h("molar-heat-of-vaporization")}),$(".FP").off().on("click",()=>{h("freezing-point")}),$(".MP").off().on("click",()=>{h("melting-point")}),$(".S").off().on("click",()=>{h("sublimation")}),r!=="home"){try{let a=document.getElementById("demo-vid");a.currentTime=22}catch{}c.mount();let i=4;$("#change-liquid").on("click",()=>{console.log("CHANGING LIQUID"),P.reset(),P.init(r,i%3),P.draw(),i++}),P.reset(),P.init(r),P.draw(),document.getElementById("particles").onwheel=function(a){window.addEventListener("wheel",null,!0)},document.getElementById("static").onwheel=function(a){window.addEventListener("wheel",null,!0)}}if(r==="home"){new TypeIt("#title",{speed:75,delay:500}).type("Redstone SURGE!").pause(300).type(`<span id='greet' style='font-size: 0.8em; white-space: pre-line'>
Enjoy your visit!</span>`).pause(500).delete("#greet").go();let i=$(".main-carousel").flickity({cellAlign:"center",autoPlay:!0,pauseAutoPlayOnHover:!0,wrapAround:!0});i.on("dragStart.flickity",function(a,l){t=!0}),i.on("dragEnd.flickity",function(a,l){setTimeout(()=>{t=!1},200)})}$("myDropdown1").on("click",()=>{$("myDropdown").toggleClass("show")}),$("myDropdown2").on("click",()=>{$("myDropdown").toggleClass("show")}),window.onclick=i=>{let a=document.getElementById("myDropdown1"),l=document.getElementById("myDropdown2");[a,l].forEach(m=>{m.previousElementSibling!=i.target&&m.classList.contains("show")&&m.classList.remove("show")})}})}e()}let t=!1;h(o)};