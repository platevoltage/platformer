(()=>{"use strict";class t{constructor(t,i,h){this.ctx=t,this.height=100,this.width=50,this.x=i,this.y=h,this.color="#ff0000"}update(){this.render()}render(){this.ctx.fillStyle=this.color,this.ctx.fillRect(this.x,this.y-this.height,this.width,this.height)}}class i extends t{constructor(t,i,h,s){super(t,i,h),this.height=1,this.width=s,this.color="#ffff00",this.bgHeight=20,this.bgColor="#003333"}render(){this.ctx.fillStyle=this.bgColor,this.ctx.fillRect(this.x,this.y,this.width,this.bgHeight),this.ctx.fillStyle=this.color,this.ctx.fillRect(this.x,this.y-this.height,this.width,this.height)}}class h extends t{constructor(t,i,h){super(t,i,h),this.movingLeft=!1,this.movingRight=!1,this.shortJumping=!1,this.longJumping=!1,this.standing=!0,this.crouching=!1,this.xLeftVelocity=0,this.xRightVelocity=0,this.yUpVelocity=0,this.yDownVelocity=0,this.obstacles=[]}update(){this.y-=this.yUpVelocity,this.yUpVelocity>0&&this.yUpVelocity--,this.shortJumping&&this.standing?this.shortJump():this.longJumping&&this.shortJumping?this.fullJump():this.checkObstacleSurfaces()?0==this.yUpVelocity&&(this.yDownVelocity=0,this.standing=!0):(this.standing=!1,this.moveDown()),this.movingLeft&&(!this.crouching||this.yUpVelocity>0)?(this.moveLeft(),this.xLeftVelocity<20&&(this.xLeftVelocity+=.3)):this.xLeftVelocity>0?(this.moveLeft(),this.xLeftVelocity--):this.xLeftVelocity=0,this.movingRight&&(!this.crouching||this.yUpVelocity>0)?(this.moveRight(),this.xRightVelocity<20&&(this.xRightVelocity+=.3)):this.xRightVelocity>0?(this.moveRight(),this.xRightVelocity--):this.xRightVelocity=0,this.crouching?this.height=50:this.height=100,this.render()}moveLeft(){for(let t of this.obstacles)t.x+t.width<this.x||t.y-t.height>this.y||this.y-this.height>t.y||this.x<t.x||t.height<=1?this.x-=Math.floor(this.xLeftVelocity):(this.x=t.x+t.width,this.xLeftVelocity=0)}moveRight(){for(let t of this.obstacles)t.x-this.width-1>this.x||t.y-t.height>this.y||this.y-this.height>t.y||this.x>t.x||t.height<=1?this.x+=Math.floor(this.xRightVelocity):(this.x=t.x-this.width-1,this.xRightVelocity=0)}shortJump(){this.yUpVelocity+=20,this.standing=!1}fullJump(){this.shortJumping=!1,this.standing=!1,this.yUpVelocity+=10,this.longJumping=!1}checkObstacleSurfaces(){const t=[this.y>=this.ctx.canvas.attributes.height.textContent-1];for(let i of this.obstacles){let h=this.y>=i.y-i.height-1&&this.x+this.width>=i.x&&this.x<i.x+i.width&&this.y<i.y;t.push(h)}return t.some((t=>t))}moveDown(){for(let t=0;t<this.yDownVelocity&&(this.y++,!this.checkObstacleSurfaces());t++);this.yDownVelocity<20&&this.yDownVelocity++}displayStats(){this.ctx.fillStyle=this.color,this.ctx.font="30px Arial",this.ctx.fillText(`(x) ${this.x} - ${this.x+this.width} (y) ${this.y} - ${this.y-this.height}`,10,30);let t=0;for(let i of this.obstacles)this.ctx.fillStyle=i.color,this.ctx.fillText(`(x) ${i.x} - ${i.x+i.width} (y) ${i.y} - ${i.y-i.height}`,10,60+t),t+=30}}class s extends h{constructor(t,i,h){super(t,i,h),this.color="#ff00ff"}}window.onload=function(){var t={canvas:document.createElement("canvas"),start:function(){this.canvas.width=1e3,this.canvas.height=480,this.context=this.canvas.getContext("2d"),document.body.insertBefore(this.canvas,document.body.childNodes[0]),this.interval=setInterval(n,20)},clear:function(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height)}};t.start();const h=[];let e,o=!1,c=0;function n(){t.clear();for(let t of h)t.update();o&&c++,5==c&&(e.longJumping=!0),e.update(),e.obstacles=h}function l(s,e,o){const c=new i(t.context,s,480-e,o);h.push(c)}e=new s(t.context,20,480),l(200,90,100),l(500,152,100),l(700,203,100),document.addEventListener("keydown",(function(t){"ArrowLeft"!=t.key||t.repeat||(e.movingLeft=!0),"ArrowRight"!=t.key||t.repeat||(e.movingRight=!0),"ArrowDown"!=t.key||t.repeat||(e.crouching=!0)," "!=t.key||t.repeat||(o=!0,e.shortJumping=!0)})),document.addEventListener("keyup",(function(t){"ArrowLeft"==t.key&&(e.movingLeft=!1),"ArrowRight"==t.key&&(e.movingRight=!1),"ArrowDown"!=t.key||t.repeat||(e.crouching=!1)," "!=t.key||t.repeat||(o=!1,c=0,e.shortJumping=!1,e.longJumping=!1)}))}})();