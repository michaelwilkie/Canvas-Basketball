class Attractor extends Entity
{
    constructor(x, y, w, h, imgsrc, framelist)
    {
        super(x, y, w, h, imgsrc, framelist);
        this.frame = 2;
    }
    update()
    {
        if (this.pos.x + this.w > canvas.width)  { this.xCollide = true; this.vel.x *= -1; this.pos.x = canvas.width - this.w; }
        else if (this.pos.x < 0)                 { this.xCollide = true; this.vel.x *= -1; this.pos.x = 0;                     }
        else this.xCollide = false;
        if (this.pos.y + this.h > canvas.height) { this.yCollide = true; this.vel.y *= -1; this.pos.y = canvas.height - this.h;}
        else if (this.pos.y < 0)                 { this.yCollide = true; this.vel.y *= -1; this.pos.y = 0;                     }
        else this.yCollide = false;
        
        var attr = this.findAttractor();

        this.acc.x = (attr.pos.x - this.pos.x);
        this.acc.y = (attr.pos.y - this.pos.y);
        //this.acc = getUnitVector(this.vel);


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
    findAttractor()
    {
        for (var i = 0; i < entlist.length; i++)
            if (entlist[i] instanceof Attractor && entlist[i] != this)
                return entlist[i];
        
        return null;
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
}