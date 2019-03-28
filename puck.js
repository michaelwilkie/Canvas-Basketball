class Puck extends Entity
{
    constructor(x, y, w, h, velX, velY, imgsrc, framelist)
    {
        super(x, y, w, h, imgsrc, framelist);
        this.isTouching = false;
        this.radius = 16;
        this.frame = 2;
        this.speed = 5;
        this.vel = {x: velX, y: velY};
        this.setGravity(0, 0.25);
        this.setFriction(1, 1);
        this.portalled = false;
        pucks.push(this);
    }
    update()
    {
        /*if (this.pos.x + this.w > canvas.width)  { this.xCollide = true; this.vel.x *= -1; this.pos.x = canvas.width - this.w; }
        else if (this.pos.x < 0)                 { this.xCollide = true; this.vel.x *= -1; this.pos.x = 0;                     }
        else this.xCollide = false;
        if (this.pos.y + this.h > canvas.height) { this.yCollide = true; this.vel.y *= -1; this.pos.y = canvas.height - this.h;}
        else if (this.pos.y < 0)                 { this.yCollide = true; this.vel.y *= -1; this.pos.y = 0;                     }
        else this.yCollide = false;*/

        /* TODO - CIRCLE COLLISIONS
        for (var i = 0; i < entlist.length; i++)
        {                        
            var that = entlist[i];
            if (this != that && checkPuckCollision(this, that))
            {
                this.vel.x = (2 * that.vel.x) / 2;
                this.vel.y = (2 * that.vel.y) / 2;
                that.vel.x = (2 * this.vel.x) / 2;
                that.vel.y = (2 * this.vel.y) / 2;

                this.pos.x+=this.vel.x;
                this.pos.y+=this.vel.y;
                that.pos.x+=that.vel.x;
                that.pos.y+=that.vel.y;
            }
            
        } */

        if (distance({x: 0, y: 0}, this.vel) < 1 && (this.yCollide || this.xCollide))
        {
            this.killSelf();
        }

        if (!this.animfinished)
        {
            this.updateframe++;
            if (this.framelist != null)
            {
                if (this.frame == this.framelist.length - 1)
                    this.animfinished = true;
            }
            if (this.updateframe > 10)
            {
                this.frame++;
                this.updateframe = 0;
            }
        }
        else
        {
            this.frame = 0; 
            this.animfinished = false;
        }    
        super.update();
    }
    resetPosition()
    {
        this.pos.x = canvas.width/2;
        this.pos.y = canvas.height/2;

        if (getRandomNumber(0, 2) == 0)
            this.vel.y = this.speed;
        else
            this.vel.y = -1 * this.speed;       

        if (getRandomNumber(0, 2) == 0)
            this.vel.x =      this.speed;
        else
            this.vel.x = -1 * this.speed;
    }
    killSelf()
    {
        for (var i = 0; i < pucks.length; i++)
        {
            if (this == pucks[i])
            {
                pucks.splice(i, 1);
                break;
            }
        }
        super.killSelf();
    }
}