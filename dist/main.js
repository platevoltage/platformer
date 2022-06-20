(()=>{"use strict";function t(t,i,s,h,e){const o=[t,i,s,h,e];t.fillStyle="#7f77fe",t.fillRect(i+s*e,0,s+s*e,h),function(t,i,s,h,e,o,c){s.fillStyle="#ffffffaa",s.fillRect(t+h+e*c,i,100,60),s.fillRect(t+20+h+e*c,i+20,100,60)}(200,100,...o)}function i(t,i,s,h,e){t.fillStyle="#000033",t.fillRect(i+s*e,0,s+s*e,h),t.fillStyle="#333388dd",t.fillRect(200+i+s*e,100,100,60),t.fillRect(230+i+s*e,130,100,60)}class s{constructor(s,h){this.ctx=s,this.windowWidth=s.canvas.attributes.width.textContent,this.windowHeight=s.canvas.attributes.height.textContent,this.bgSelect=h,this.background=[i,t,i]}update(t){this.xScrollOffset=.5*t%this.windowWidth,this.render()}render(){for(let t=0;t<2;t++)this.background[this.bgSelect](this.ctx,this.xScrollOffset,this.windowWidth,this.windowHeight,t)}}const h=[function(t){return{background:2,player:[20,t-21],floors:[],floorsWithBottom:[[-100,20,6e3],[-100,40,100]],bricks:[[750,150],[850,150]],breakableBricks:[[500,150],[700,150],[800,150],[900,150],[800,350]],enemies:[[750,t-21]]}},function(t){return{background:1,player:[20,t-21],floors:[],floorsWithBottom:[[-100,0,6e3],[-100,40,100]],bricks:[[750,150],[850,150]],breakableBricks:[[500,150],[700,150],[800,150],[900,150],[800,350]],enemies:[[750,t-21]]}}];class e{constructor(t,i,s,h){this.ctx=t,this.windowWidth=t.canvas.attributes.width.textContent,this.windowHeight=t.canvas.attributes.height.textContent,this.xScrollOffset=0,this.height=100,this.width=50,this.x=i+this.xScrollOffset,this.y=s,this.color="#ff0000",this.id=h}update(t){return this.xScrollOffset=t,this.render(),0}render(){return this.ctx.fillStyle=this.color,this.ctx.fillRect(this.x+this.xScrollOffset,this.y-this.height,this.width,this.height),0}}class o extends e{constructor(t,i,s,h,e){super(t,i,s,h),this.height=1,this.width=e,this.color="#ffff00",this.bgHeight=20,this.bgColor="#003333"}render(){return this.ctx.fillStyle=this.bgColor,this.ctx.fillRect(this.x+this.xScrollOffset,this.y,this.width,this.bgHeight),this.ctx.fillStyle=this.color,this.ctx.fillRect(this.x+this.xScrollOffset,this.y-this.height,this.width,this.height),0}}class c extends e{constructor(t,i,s,h,e){super(t,i,s,h),this.height=20,this.width=e,this.color="#503c04"}}class l extends e{constructor(t,i,s,h){super(t,i,s,h),this.movingLeft=!1,this.movingRight=!1,this.shortJumping=!1,this.longJumping=!1,this.standing=!0,this.crouching=!1,this.xLeftVelocity=0,this.xRightVelocity=0,this.yUpVelocity=0,this.yDownVelocity=0,this.obstacles=[],this.objectStandingOn="none",this.isKillable=!0,this.isDead=!1}update(t){this.xScrollOffset=t,this.isDead?(this.y+=10,this.color="#555555",this.movingRight=!1,this.movingLeft=!1):this.checkObstacleSurfaces()?0==this.yUpVelocity&&(this.yDownVelocity=0,this.standing=!0):(this.standing=!1,this.moveDown()),this.movingLeft&&this.moveLeft(),this.movingRight&&this.moveRight(),this.crouching?this.crouch():this.standUp(),this.render()}crouch(){this.height=50}standUp(){this.height=100}moveLeft(){var t;for(let i of this.obstacles)i.x+i.width+i.xScrollOffset<this.x+this.xScrollOffset||i.y-i.height>this.y||this.y-this.height>i.y||this.x+this.xScrollOffset<i.x+i.xScrollOffset||i.height<=1||i.id==this.id||(t=i);t?this.isPlayer?(this.x=t.x+t.width,this.xLeftVelocity=0,t.isEnemy&&(this.isDead=!0)):(this.movingLeft=!1,this.movingRight=!0,t.isPlayer&&(t.isDead=!0)):this.x-=this.xLeftVelocity}moveRight(){var t;for(let i of this.obstacles)i.x-this.width+i.xScrollOffset-1>this.x+this.xScrollOffset||i.y-i.height>this.y||this.y-this.height>i.y||this.x+this.xScrollOffset>i.x+i.xScrollOffset||i.height<=1||i.id==this.id||(t=i);t?this.isPlayer?(this.x=t.x-this.width-1,this.xRightVelocity=0,t.isEnemy&&(this.isDead=!0)):(this.movingRight=!1,this.movingLeft=!0,t.isPlayer&&(t.isDead=!0)):this.x+=this.xRightVelocity}bounce(){this.yUpVelocity=26,this.standing=!1}checkObstacleSurfaces(){const t=[];for(let i of this.obstacles){let s=this.y>=i.y-i.height-1&&this.x+this.width+this.xScrollOffset>=i.x+i.xScrollOffset&&this.x+this.xScrollOffset<i.x+i.width+i.xScrollOffset&&this.y<i.y;t.push(s),s&&i.isKillable&&(i.isEnemy||this.isEnemy&&i.isPlayer)&&(i.isDead=!0,this.bounce())}return t.some((t=>t))}checkObstacleCeilings(){const t=[];for(let i of this.obstacles){let s=this.y-this.height==i.y&&this.x+this.width+this.xScrollOffset>=i.x+i.xScrollOffset&&this.x+this.xScrollOffset<i.x+i.width+i.xScrollOffset&&i.height>1;if(t.push(s),s&&i.isKillable&&i.isBreakableBrick){i.isDead=!0;break}}return t.some((t=>t))}moveDown(){this.y>=this.windowHeight&&(this.isDead=!0);for(let t=0;t<this.yDownVelocity&&(this.y++,!this.checkObstacleSurfaces());t++);this.yDownVelocity<20&&this.yDownVelocity++}}class n extends l{constructor(t,i,s,h){super(t,i,s,h),this.color="#a41f19",this.isPlayer=!0,this.offset=0,this.height=100,this.width=46}determineView(){return this.x>400&&(this.offset=-(this.x-400)),this.offset}update(t){this.xScrollOffset=t,this.isDead&&(this.y+=10,this.color="#555555",this.movingRight=!1,this.movingLeft=!1);for(var i=0;i<this.yUpVelocity;i++)this.y--,this.checkObstacleCeilings()&&(this.yUpVelocity=0,this.longJumping=!1,this.shortJumping=!1);return this.yUpVelocity>0&&this.yUpVelocity--,this.shortJumping&&this.standing&&!this.isDead?this.shortJump():this.longJumping&&this.shortJumping&&this.yUpVelocity>0?this.fullJump():this.checkObstacleSurfaces()?0==this.yUpVelocity&&(this.yDownVelocity=0,this.standing=!0):(this.standing=!1,this.moveDown()),this.movingLeft&&(!this.crouching||this.yUpVelocity>0)?(this.moveLeft(),this.xLeftVelocity<20&&(this.xLeftVelocity+=1)):this.xLeftVelocity>0?(this.moveLeft(),this.xLeftVelocity--):this.xLeftVelocity=0,this.movingRight&&(!this.crouching||this.yUpVelocity>0)?(this.moveRight(),this.xRightVelocity<20&&(this.xRightVelocity+=1)):this.xRightVelocity>0?(this.moveRight(),this.xRightVelocity--):this.xRightVelocity=0,this.crouching?this.crouch():this.standUp(),this.render()}crouch(){this.height=50}standUp(){this.height=100}shortJump(){this.yUpVelocity=20,this.standing=!1}fullJump(){this.shortJumping=!1,this.standing=!1,this.yUpVelocity+=10,this.longJumping=!1}displayStats(){this.ctx.fillStyle=this.color,this.ctx.font="16px Arial",this.ctx.fillText(`(x) ${this.x} - ${this.x+this.width} (y) ${this.y} - ${this.y-this.height}   ${this.xScrollOffset}`,10,30);let t=0;for(let i of this.obstacles)this.ctx.fillStyle=i.color,this.ctx.fillText(`(x) ${i.x} - ${i.x+i.width} (y) ${i.y} - ${i.y-i.height}   ${i.xScrollOffset}`,10,60+t),t+=16}render(){return this.ctx.fillStyle=this.color,this.ctx.fillRect(this.x+this.xScrollOffset,this.y-this.height,this.width,this.height),this.determineView()}}class r extends l{constructor(t,i,s,h){super(t,i,s,h),this.isActivated=!1,this.isEnemy=!0,this.color="#863c04",this.movingRight=!1,this.movingLeft=!0,this.xLeftVelocity=1,this.xRightVelocity=1,this.height=46,this.width=46}update(t){this.xScrollOffset=t,-t>this.x-this.windowWidth-400&&-t<this.x+400?this.isActivated=!0:this.isActivated=!1,this.isActivated&&(this.isDead?(this.y+=10,this.color="#555555",this.movingRight=!1,this.movingLeft=!1):this.checkObstacleSurfaces()?0==this.yUpVelocity&&(this.yDownVelocity=0,this.standing=!0):(this.standing=!1,this.moveDown()),this.movingLeft&&this.moveLeft(),this.movingRight&&this.moveRight(),this.render())}}class f extends e{constructor(t,i,s,h){super(t,i,s,h),this.height=50,this.width=50,this.color="#e3831c",this.isKillable=!1,this.isDead=!1}update(t){this.xScrollOffset=t,this.isDead&&(this.y-=40,this.color="#555555"),this.render()}render(){return this.ctx.fillStyle="#111111",this.ctx.fillRect(this.x+this.xScrollOffset,this.y-this.height,this.width,this.height),this.ctx.fillStyle=this.color,this.ctx.fillRect(this.x+this.xScrollOffset+2,this.y-this.height+2,this.width-4,this.height-4),0}}class a extends f{constructor(t,i,s,h){super(t,i,s,h),this.isBreakableBrick=!0,this.color="#863c04",this.isKillable=!0,this.isDead=!1}}const g=480;window.onload=function(){const t={canvas:document.createElement("canvas"),start:function(){this.canvas.width=1e3,this.canvas.height=g,this.context=this.canvas.getContext("2d"),document.body.insertBefore(this.canvas,document.body.childNodes[0]),this.interval=setInterval(p,20),this.garbageCollectionInterval=setInterval(R,5e3)},clear:function(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height)}};let i;t.start(),document.addEventListener("keydown",(function(t){"ArrowLeft"!=t.key||t.repeat||(e.movingLeft=!0),"ArrowRight"!=t.key||t.repeat||(e.movingRight=!0),"ArrowDown"!=t.key||t.repeat||(e.crouching=!0)," "!=t.key||t.repeat||(y=!0,e.shortJumping=!0)})),document.addEventListener("keyup",(function(t){"ArrowLeft"==t.key&&(e.movingLeft=!1),"ArrowRight"==t.key&&(e.movingRight=!1),"ArrowDown"==t.key&&(e.crouching=!1)," "==t.key&&(y=!1,x=0,e.shortJumping=!1,e.longJumping=!1)}));let e,l=[],d=[],y=!1,x=0,u=0,m=0;const w=h[1](g);function p(){t.clear(),i.update(m);for(let t of l)t.update(m);for(let t of d)t.update(m),t.obstacles=[...l,...d,e];y&&x++,5==x&&(e.longJumping=!0),m=e.update(m),e.obstacles=[...l,...d]}function b(i,s,h){const e=new o(t.context,i,g-s,u,h);l.push(e),u++}function v(i,s,h){const e=new c(t.context,i,g-s,u,h);l.push(e),u++}function S(i,s){const h=new r(t.context,i,s,u);d.push(h),u++}function k(i,s){const h=new a(t.context,i,g-s,u);l.push(h),u++}function O(i,s){const h=new f(t.context,i,g-s,u);l.push(h),u++}function R(){d=d.filter((t=>!t.isDead)),l=l.filter((t=>!t.isDead))}Object.keys(w).forEach((h=>{switch(h){case"background":o=w.background,i=new s(t.context,o);break;case"player":!function(i,s){e=new n(t.context,i,s,u),u++}(...w.player);break;case"floors":for(let t of w.floors)b(...t);break;case"floorsWithBottom":for(let t of w.floorsWithBottom)v(...t);break;case"breakableBricks":for(let t of w.breakableBricks)k(...t);break;case"bricks":for(let t of w.bricks)O(...t);break;case"enemies":for(let t of w.enemies)S(...t)}var o}))}})();