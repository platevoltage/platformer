(()=>{"use strict";class t{constructor(t){this.ctx=t,this.height=480,this.width=1e3,this.color="#000033"}update(t){this.xScrollOffset=.5*t%this.width,this.render()}render(){for(let t=0;t<2;t++)this.ctx.fillStyle=this.color,this.ctx.fillRect(this.xScrollOffset+this.width*t,0,this.width+this.width*t,this.height),this.ctx.fillStyle=this.color,this.ctx.fillStyle="#333388dd",this.ctx.fillRect(200+this.xScrollOffset+this.width*t,100,100,60),this.ctx.fillRect(230+this.xScrollOffset+this.width*t,130,100,60)}}class i{constructor(t,i,s,h){this.ctx=t,this.windowWidth=t.canvas.attributes.width.textContent,this.windowHeight=t.canvas.attributes.height.textContent,this.xScrollOffset=0,this.height=100,this.width=50,this.x=i+this.xScrollOffset,this.y=s,this.color="#ff0000",this.id=h}update(t){return this.xScrollOffset=t,this.render(),0}render(){return this.ctx.fillStyle=this.color,this.ctx.fillRect(this.x+this.xScrollOffset,this.y-this.height,this.width,this.height),0}}class s extends i{constructor(t,i,s,h,e){super(t,i,s,h),this.height=1,this.width=e,this.color="#ffff00",this.bgHeight=20,this.bgColor="#003333"}render(){return this.ctx.fillStyle=this.bgColor,this.ctx.fillRect(this.x+this.xScrollOffset,this.y,this.width,this.bgHeight),this.ctx.fillStyle=this.color,this.ctx.fillRect(this.x+this.xScrollOffset,this.y-this.height,this.width,this.height),0}}class h extends i{constructor(t,i,s,h,e){super(t,i,s,h),this.height=20,this.width=e,this.color="#ffff00"}}class e extends i{constructor(t,i,s,h){super(t,i,s,h),this.movingLeft=!1,this.movingRight=!1,this.shortJumping=!1,this.longJumping=!1,this.standing=!0,this.crouching=!1,this.xLeftVelocity=0,this.xRightVelocity=0,this.yUpVelocity=0,this.yDownVelocity=0,this.obstacles=[],this.objectStandingOn="none",this.isKillable=!0,this.isDead=!1}update(t){this.xScrollOffset=t,this.isDead?(this.y+=10,this.color="#555555",this.movingRight=!1,this.movingLeft=!1):this.checkObstacleSurfaces()?0==this.yUpVelocity&&(this.yDownVelocity=0,this.standing=!0):(this.standing=!1,this.moveDown()),this.movingLeft&&this.moveLeft(),this.movingRight&&this.moveRight(),this.crouching?this.crouch():this.standUp(),this.render()}crouch(){this.height=50}standUp(){this.height=100}moveLeft(){var t;for(let i of this.obstacles)i.x+i.width+i.xScrollOffset<this.x+this.xScrollOffset||i.y-i.height>this.y||this.y-this.height>i.y||this.x+this.xScrollOffset<i.x+i.xScrollOffset||i.height<=1||i.id==this.id||(t=i);t?this.isPlayer?(this.x=t.x+t.width,this.xLeftVelocity=0,t.isEnemy&&(this.isDead=!0)):(this.movingLeft=!1,this.movingRight=!0,t.isPlayer&&(t.isDead=!0)):this.x-=this.xLeftVelocity}moveRight(){var t;for(let i of this.obstacles)i.x-this.width+i.xScrollOffset-1>this.x+this.xScrollOffset||i.y-i.height>this.y||this.y-this.height>i.y||this.x+this.xScrollOffset>i.x+i.xScrollOffset||i.height<=1||i.id==this.id||(t=i);t?this.isPlayer?(this.x=t.x-this.width-1,this.xRightVelocity=0,t.isEnemy&&(this.isDead=!0)):(this.movingRight=!1,this.movingLeft=!0,t.isPlayer&&(t.isDead=!0)):this.x+=this.xRightVelocity}bounce(){this.yUpVelocity=26,this.standing=!1}checkObstacleSurfaces(){const t=[];for(let i of this.obstacles){let s=this.y>=i.y-i.height-1&&this.x+this.width+this.xScrollOffset>=i.x+i.xScrollOffset&&this.x+this.xScrollOffset<i.x+i.width+i.xScrollOffset&&this.y<i.y;t.push(s),s&&i.isKillable&&(i.isEnemy||this.isEnemy&&i.isPlayer)&&(i.isDead=!0,this.bounce())}return t.some((t=>t))}checkObstacleCeilings(){const t=[];for(let i of this.obstacles){let s=this.y-this.height==i.y&&this.x+this.width+this.xScrollOffset>=i.x+i.xScrollOffset&&this.x+this.xScrollOffset<i.x+i.width+i.xScrollOffset&&i.height>1;if(t.push(s),s&&i.isKillable&&i.isBreakableBrick){i.isDead=!0;break}}return t.some((t=>t))}moveDown(){this.y>=this.windowHeight&&(this.isDead=!0);for(let t=0;t<this.yDownVelocity&&(this.y++,!this.checkObstacleSurfaces());t++);this.yDownVelocity<20&&this.yDownVelocity++}}class o extends e{constructor(t,i,s,h){super(t,i,s,h),this.color="#ff00ff",this.isPlayer=!0,this.offset=0,this.height=100,this.width=46}determineView(){return this.x>400&&(this.offset=-(this.x-400)),this.offset}update(t){this.xScrollOffset=t,this.isDead&&(this.y+=10,this.color="#555555",this.movingRight=!1,this.movingLeft=!1);for(var i=0;i<this.yUpVelocity;i++)this.y--,this.checkObstacleCeilings()&&(this.yUpVelocity=0,this.longJumping=!1,this.shortJumping=!1);return this.yUpVelocity>0&&this.yUpVelocity--,this.shortJumping&&this.standing&&!this.isDead?this.shortJump():this.longJumping&&this.shortJumping&&this.yUpVelocity>0?this.fullJump():this.checkObstacleSurfaces()?0==this.yUpVelocity&&(this.yDownVelocity=0,this.standing=!0):(this.standing=!1,this.moveDown()),this.movingLeft&&(!this.crouching||this.yUpVelocity>0)?(this.moveLeft(),this.xLeftVelocity<20&&(this.xLeftVelocity+=1)):this.xLeftVelocity>0?(this.moveLeft(),this.xLeftVelocity--):this.xLeftVelocity=0,this.movingRight&&(!this.crouching||this.yUpVelocity>0)?(this.moveRight(),this.xRightVelocity<20&&(this.xRightVelocity+=1)):this.xRightVelocity>0?(this.moveRight(),this.xRightVelocity--):this.xRightVelocity=0,this.crouching?this.crouch():this.standUp(),this.render()}crouch(){this.height=50}standUp(){this.height=100}shortJump(){this.yUpVelocity=20,this.standing=!1}fullJump(){this.shortJumping=!1,this.standing=!1,this.yUpVelocity+=10,this.longJumping=!1}displayStats(){this.ctx.fillStyle=this.color,this.ctx.font="16px Arial",this.ctx.fillText(`(x) ${this.x} - ${this.x+this.width} (y) ${this.y} - ${this.y-this.height}   ${this.xScrollOffset}`,10,30);let t=0;for(let i of this.obstacles)this.ctx.fillStyle=i.color,this.ctx.fillText(`(x) ${i.x} - ${i.x+i.width} (y) ${i.y} - ${i.y-i.height}   ${i.xScrollOffset}`,10,60+t),t+=16}render(){return this.ctx.fillStyle=this.color,this.ctx.fillRect(this.x+this.xScrollOffset,this.y-this.height,this.width,this.height),this.determineView()}}class c extends e{constructor(t,i,s,h){super(t,i,s,h),this.isActivated=!1,this.isEnemy=!0,this.color="#ff0044",this.movingRight=!1,this.movingLeft=!0,this.xLeftVelocity=1,this.xRightVelocity=1,this.height=46,this.width=46}update(t){this.xScrollOffset=t,-t>this.x-this.windowWidth-400&&-t<this.x+400?this.isActivated=!0:this.isActivated=!1,this.isActivated&&(this.isDead?(this.y+=10,this.color="#555555",this.movingRight=!1,this.movingLeft=!1):this.checkObstacleSurfaces()?0==this.yUpVelocity&&(this.yDownVelocity=0,this.standing=!0):(this.standing=!1,this.moveDown()),this.movingLeft&&this.moveLeft(),this.movingRight&&this.moveRight(),this.render())}}class l extends i{constructor(t,i,s,h){super(t,i,s,h),this.isBreakableBrick=!0,this.height=50,this.width=50,this.color="#880000",this.isKillable=!0,this.isDead=!1}update(t){this.xScrollOffset=t,this.isDead&&(this.y-=40,this.color="#555555"),this.render()}}const n=480;window.onload=function(){const i={canvas:document.createElement("canvas"),start:function(){this.canvas.width=1e3,this.canvas.height=n,this.context=this.canvas.getContext("2d"),document.body.insertBefore(this.canvas,document.body.childNodes[0]),this.interval=setInterval(m,20),this.garbageCollectionInterval=setInterval(b,5e3)},clear:function(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height)}};let e;i.start(),document.addEventListener("keydown",(function(t){"ArrowLeft"!=t.key||t.repeat||(r.movingLeft=!0),"ArrowRight"!=t.key||t.repeat||(r.movingRight=!0),"ArrowDown"!=t.key||t.repeat||(r.crouching=!0)," "!=t.key||t.repeat||(g=!0,r.shortJumping=!0)})),document.addEventListener("keyup",(function(t){"ArrowLeft"==t.key&&(r.movingLeft=!1),"ArrowRight"==t.key&&(r.movingRight=!1),"ArrowDown"==t.key&&(r.crouching=!1)," "==t.key&&(g=!1,x=0,r.shortJumping=!1,r.longJumping=!1)}));let r,f=[],a=[],g=!1,x=0,y=0,d=0;const u={background:1,player:[20,459],floors:[[-100,20,6e3]],floorsWithBottom:[[-100,40,100]],breakableBricks:[[500,150],[700,150],[750,150],[800,150],[850,150],[900,150],[800,350]],enemies:[[750,459]]};function m(){i.clear(),e.update(d);for(let t of f)t.update(d);for(let t of a)t.update(d),t.obstacles=[...f,...a,r];g&&x++,5==x&&(r.longJumping=!0),d=r.update(d),r.obstacles=[...f,...a]}function w(t,h,e){const o=new s(i.context,t,n-h,y,e);f.push(o),y++}function p(t,s,e){const o=new h(i.context,t,n-s,y,e);f.push(o),y++}function v(t,s){const h=new c(i.context,t,s,y);a.push(h),y++}function S(t,s){const h=new l(i.context,t,n-s,y);f.push(h),y++}function b(){a=a.filter((t=>!t.isDead)),f=f.filter((t=>!t.isDead))}Object.keys(u).forEach((s=>{switch(s){case"background":e=new t(i.context);break;case"player":!function(t,s){r=new o(i.context,t,s,y),y++}(...u.player);break;case"floors":for(let t of u.floors)w(...t);break;case"floorsWithBottom":for(let t of u.floorsWithBottom)p(...t);break;case"breakableBricks":for(let t of u.breakableBricks)S(...t);break;case"enemies":for(let t of u.enemies)v(...t)}}))}})();