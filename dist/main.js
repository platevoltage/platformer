(()=>{"use strict";class t{constructor(t){this.ctx=t,this.height=480,this.width=2e3,this.color="#000033"}update(t){this.xScrollOffset=t%this.width/2,this.render()}render(){this.ctx.fillStyle=this.color,this.ctx.fillRect(0+this.xScrollOffset,0,this.width,this.height),this.ctx.fillStyle="#333388dd",this.ctx.fillRect(200+this.xScrollOffset,100,100,60),this.ctx.fillRect(230+this.xScrollOffset,130,100,60),this.ctx.fillRect(1200+this.xScrollOffset,100,100,60),this.ctx.fillRect(1230+this.xScrollOffset,130,100,60)}}class i{constructor(t,i,s,h){this.ctx=t,this.xScrollOffset=0,this.height=100,this.width=50,this.x=i+this.xScrollOffset,this.y=s,this.color="#ff0000",this.id=h}update(t){return this.xScrollOffset=t,this.render(),0}render(){return this.ctx.fillStyle=this.color,this.ctx.fillRect(this.x+this.xScrollOffset,this.y-this.height,this.width,this.height),0}}class s extends i{constructor(t,i,s,h,e){super(t,i,s,h),this.height=1,this.width=e,this.color="#ffff00",this.bgHeight=20,this.bgColor="#003333"}render(){return this.ctx.fillStyle=this.bgColor,this.ctx.fillRect(this.x+this.xScrollOffset,this.y,this.width,this.bgHeight),this.ctx.fillStyle=this.color,this.ctx.fillRect(this.x+this.xScrollOffset,this.y-this.height,this.width,this.height),0}}class h extends i{constructor(t,i,s,h,e){super(t,i,s,h),this.height=20,this.width=e,this.color="#ffff00"}}class e extends i{constructor(t,i,s,h){super(t,i,s,h),this.movingLeft=!1,this.movingRight=!1,this.shortJumping=!1,this.longJumping=!1,this.standing=!0,this.crouching=!1,this.xLeftVelocity=0,this.xRightVelocity=0,this.yUpVelocity=0,this.yDownVelocity=0,this.obstacles=[],this.objectStandingOn="none",this.isKillable=!0,this.isDead=!1}update(t){this.xScrollOffset=t,this.isDead?(this.y+=10,this.color="#555555",this.movingRight=!1,this.movingLeft=!1):this.checkObstacleSurfaces()?0==this.yUpVelocity&&(this.yDownVelocity=0,this.standing=!0):(this.standing=!1,this.moveDown()),this.movingLeft&&this.moveLeft(),this.movingRight&&this.moveRight(),this.crouching?this.crouch():this.standUp(),this.render()}crouch(){this.height=50}standUp(){this.height=100}moveLeft(){var t;for(let i of this.obstacles)i.x+i.width+i.xScrollOffset<this.x+this.xScrollOffset||i.y-i.height>this.y||this.y-this.height>i.y||this.x+this.xScrollOffset<i.x+i.xScrollOffset||i.height<=1||i.id==this.id||(t=i);t?this.isPlayer?(this.x=t.x+t.width,this.xLeftVelocity=0,t.isEnemy&&(this.isDead=!0)):(this.movingLeft=!1,this.movingRight=!0,t.isPlayer&&(t.isDead=!0)):this.x-=this.xLeftVelocity}moveRight(){var t;for(let i of this.obstacles)i.x-this.width+i.xScrollOffset-1>this.x+this.xScrollOffset||i.y-i.height>this.y||this.y-this.height>i.y||this.x+this.xScrollOffset>i.x+i.xScrollOffset||i.height<=1||i.id==this.id||(t=i);t?this.isPlayer?(this.x=t.x-this.width-1,this.xRightVelocity=0,t.isEnemy&&(this.isDead=!0)):(this.movingRight=!1,this.movingLeft=!0,t.isPlayer&&(t.isDead=!0)):this.x+=this.xRightVelocity}bounce(){this.yUpVelocity=26,this.standing=!1}shortJump(){this.yUpVelocity=20,this.standing=!1}fullJump(){this.shortJumping=!1,this.standing=!1,this.yUpVelocity+=10,this.longJumping=!1}checkObstacleSurfaces(){const t=[this.y>=this.ctx.canvas.attributes.height.textContent-1];for(let i of this.obstacles){let s=this.y>=i.y-i.height-1&&this.x+this.width+this.xScrollOffset>=i.x+i.xScrollOffset&&this.x+this.xScrollOffset<i.x+i.width+i.xScrollOffset&&this.y<i.y;t.push(s),s&&i.isKillable&&i.isEnemy&&(i.isDead=!0,this.bounce())}return t.some((t=>t))}checkObstacleCeilings(){const t=[];for(let i of this.obstacles){let s=this.y-this.height==i.y&&this.x+this.width+this.xScrollOffset>=i.x+i.xScrollOffset&&this.x+this.xScrollOffset<i.x+i.width+i.xScrollOffset&&i.height>1;if(t.push(s),s&&i.isKillable&&i.isBreakableBrick){i.isDead=!0;break}}return t.some((t=>t))}moveDown(){for(let t=0;t<this.yDownVelocity&&(this.y++,!this.checkObstacleSurfaces());t++);this.yDownVelocity<20&&this.yDownVelocity++}displayStats(){this.ctx.fillStyle=this.color,this.ctx.font="30px Arial",this.ctx.fillText(`(x) ${this.x} - ${this.x+this.width} (y) ${this.y} - ${this.y-this.height}   ${this.xScrollOffset}`,10,30);let t=0;for(let i of this.obstacles)this.ctx.fillStyle=i.color,this.ctx.fillText(`(x) ${i.x} - ${i.x+i.width} (y) ${i.y} - ${i.y-i.height}   ${i.xScrollOffset}`,10,60+t),t+=30}}class o extends e{constructor(t,i,s,h){super(t,i,s,h),this.color="#ff00ff",this.isPlayer=!0,this.offset=0}determineView(){return this.x>400&&(this.offset=-(this.x-400)),this.offset}update(t){this.xScrollOffset=t,this.isDead&&(this.y+=10,this.color="#555555",this.movingRight=!1,this.movingLeft=!1);for(var i=0;i<this.yUpVelocity;i++)this.y--,this.checkObstacleCeilings()&&(this.yUpVelocity=0,this.longJumping=!1,this.shortJumping=!1);return this.yUpVelocity>0&&this.yUpVelocity--,this.shortJumping&&this.standing&&!this.isDead?this.shortJump():this.longJumping&&this.shortJumping?this.fullJump():this.checkObstacleSurfaces()?0==this.yUpVelocity&&(this.yDownVelocity=0,this.standing=!0):(this.standing=!1,this.moveDown()),this.movingLeft&&(!this.crouching||this.yUpVelocity>0)?(this.moveLeft(),this.xLeftVelocity<20&&(this.xLeftVelocity+=1)):this.xLeftVelocity>0?(this.moveLeft(),this.xLeftVelocity--):this.xLeftVelocity=0,this.movingRight&&(!this.crouching||this.yUpVelocity>0)?(this.moveRight(),this.xRightVelocity<20&&(this.xRightVelocity+=1)):this.xRightVelocity>0?(this.moveRight(),this.xRightVelocity--):this.xRightVelocity=0,this.crouching?this.crouch():this.standUp(),this.render()}crouch(){this.height=50}standUp(){this.height=100}render(){return this.ctx.fillStyle=this.color,this.ctx.fillRect(this.x+this.xScrollOffset,this.y-this.height,this.width,this.height),this.determineView()}}class c extends e{constructor(t,i,s,h){super(t,i,s,h),this.isEnemy=!0,this.color="#ff0044",this.movingRight=!1,this.movingLeft=!0,this.xLeftVelocity=1,this.xRightVelocity=1}update(t){this.xScrollOffset=t,this.isDead?(this.y+=10,this.color="#555555",this.movingRight=!1,this.movingLeft=!1):this.checkObstacleSurfaces()?0==this.yUpVelocity&&(this.yDownVelocity=0,this.standing=!0):(this.standing=!1,this.moveDown()),this.movingLeft&&this.moveLeft(),this.movingRight&&this.moveRight(),this.crouching?this.crouch():this.standUp(),this.render()}standUp(){this.height=50}}class l extends i{constructor(t,i,s,h){super(t,i,s,h),this.isBreakableBrick=!0,this.height=50,this.width=50,this.color="#880000",this.isKillable=!0,this.isDead=!1}update(t){this.xScrollOffset=t,this.isDead&&(this.y-=40,this.color="#555555"),this.render()}}const n=480;window.onload=function(){const i={canvas:document.createElement("canvas"),start:function(){this.canvas.width=1e3,this.canvas.height=n,this.context=this.canvas.getContext("2d"),document.body.insertBefore(this.canvas,document.body.childNodes[0]),this.interval=setInterval(u,20),this.garbageCollectionInterval=setInterval(w,5e3)},clear:function(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height)}};let e;i.start();const r=[];let f,g=[],x=!1,a=0,y=0,d=0;function u(){i.clear(),e.update(d);for(let t of r)t.update(d);for(let t of g)t.update(d),t.obstacles=[...r,...g,f];x&&a++,5==a&&(f.longJumping=!0),d=f.update(d),f.obstacles=[...r,...g]}function m(t,s,e){const o=new h(i.context,t,n-s,y,e);r.push(o),y++}function p(t,s){const h=new c(i.context,t,s,y);g.push(h),y++}function v(t,s){const h=new l(i.context,t,n-s,y);r.push(h),y++}function w(){g=g.filter((t=>!t.isDead))}e=new t(i.context),f=new o(i.context,20,459,y),y++,v(100,150),v(150,150),v(200,150),v(250,150),v(250,200),v(300,200),v(350,200),function(t,h,e){const o=new s(i.context,-100,460,y,6e3);r.push(o),y++}(),m(-100,40,100),m(1e3,40,100),p(800,430),p(920,430),p(1030,430),document.addEventListener("keydown",(function(t){"ArrowLeft"!=t.key||t.repeat||(f.movingLeft=!0),"ArrowRight"!=t.key||t.repeat||(f.movingRight=!0),"ArrowDown"!=t.key||t.repeat||(f.crouching=!0)," "!=t.key||t.repeat||(x=!0,f.shortJumping=!0)})),document.addEventListener("keyup",(function(t){"ArrowLeft"==t.key&&(f.movingLeft=!1),"ArrowRight"==t.key&&(f.movingRight=!1),"ArrowDown"==t.key&&(f.crouching=!1)," "==t.key&&(x=!1,a=0,f.shortJumping=!1,f.longJumping=!1)}))}})();