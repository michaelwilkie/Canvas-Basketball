class Entity
{
    constructor(x, y, w, h, imgsrc, framelist, layer=0)
    {
        this.pos      = {x: x, y: y};
        this.vel      = {x: 0, y: 0};
        this.acc      = {x: 0, y: 0};
        this.gravity  = {x: 0, y: 0};
        this.friction = {x: 0, y: 0};
        this.angle = 0;
        this.anglerate = 0;
        this.scale = 1;
        this.w = w;
        this.h = h;
        this.noCollide = false;
        this.xCollide = false;
        this.yCollide = false;
        this.isVisible = true;
        this.layer = layer;
        // Images are used for visible entities
        if (imgsrc != null)
        {
            this.img = new Image();
            this.img.src = imgsrc;
        }
        this.frame = 0;
        this.framelist = framelist;
        this.updateframe = 0;
        this.animfinished = false;
        this.framecooldown = 10;
    }
    setVelocity(x, y)
    {
        this.vel.x = x;
        this.vel.y = y;
    }
    setGravity(x, y)
    {
        this.gravity.x = x;
        this.gravity.y = y;
    }
    setFriction(x, y)
    {
        this.friction.x = x;
        this.friction.y = y;
    }
    setVisible()
    {
        this.isVisible = true;
    }
    setInvisible()
    {
        this.isVisible = false;
    }
    killSelf()
    {
        for (var i = 0; i < entlist.length; i++)
            if (entlist[i] == this)
                entlist.splice(i, 1);        
    }
    draw()
    {        
        //ctx.drawImage(this.img, -image.width / 2, -image.height / 2);

        if (this.framelist != null && this.isVisible)
        {

            ctx.setTransform(this.scale, 0, 0, this.scale, this.pos.x, this.pos.y); // sets scale and origin
            ctx.rotate(this.angle * Math.PI / 180);
        
            ctx.drawImage(this.img, this.framelist[this.frame] * this.w, 0, this.w, this.h, 0, 0, this.w, this.h);
            //ctx.drawImage(this.img, this.framelist[this.frame] * this.w, 0, this.w, this.h, this.pos.x, this.pos.y, this.w, this.h);
            ctx.setTransform(1,0,0,1,0,0);
        }
    }
    update()
    {
        if (this.pos.x + this.w > canvas.width)  { this.xCollide = true; this.vel.x *= -1; this.pos.x = canvas.width - this.w; }
        else if (this.pos.x < 0)                 { this.xCollide = true; this.vel.x *= -1; this.pos.x = 0;                     }
        else this.xCollide = false;
        if (this.pos.y + this.h > canvas.height) { this.yCollide = true; this.vel.y *= -1; this.pos.y = canvas.height - this.h;}
        else if (this.pos.y < 0)                 { this.yCollide = true; this.vel.y *= -1; this.pos.y = 0;                     }
        else this.yCollide = false;

        if (this.xCollide)
            if (this.vel.x < 0) this.vel.x+=this.friction.x;
            else                this.vel.x-=this.friction.x;
        if (this.yCollide)
            if (this.vel.y < 0) this.vel.y+=this.friction.y;
            else                this.vel.y-=this.friction.y;
        this.vel.x+=this.gravity.x;
        this.vel.y+=this.gravity.y;
        this.vel.x+=this.acc.x;
        this.vel.y+=this.acc.y;
        this.pos.x+=this.vel.x;
        this.pos.y+=this.vel.y;
    }
    resetAnim()
    {
        this.frame = 0;
    }
}
