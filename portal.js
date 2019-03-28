class Portal extends Entity
{
    constructor(x, y, w, h, color, otherPortal)
    {
        super(x, y, w, h, null, [], 1);
        this.color = color;
        this.noCollide = false;
        this.otherPortal = otherPortal;
        this.imgData = ctx.getImageData(this.pos.x, this.pos.y, this.w, this.h);
    }
    killSelf()
    {
        this.otherPortal.otherPortal = null;
        super.killSelf();
    }
    link(other)
    {
        this.otherPortal = other;
    }
    draw()
    {
        ctx.fillStyle = this.color;
        ctx.rect(this.pos.x, this.pos.y, this.w, this.h);
        ctx.stroke();
        if (this.otherPortal != null)
        {
            ctx.putImageData(this.otherPortal.imgData, this.pos.x, this.pos.y);
        }
        else
        {            
            ctx.fillRect(this.pos.x, this.pos.y, this.w, this.h);
        }
    }
    getImgData()
    {
        return this.imgData;
    }
    update()
    {
        for (var i = 0; i < pucks.length; i++)
        {
            if (checkCollision(this, pucks[i]) && !pucks[i].portalled)
            {
                if (this.otherPortal != null)
                {
                    pucks[i].portalled = true;
                    pucks[i].pos.x = this.otherPortal.pos.x;
                    pucks[i].pos.y = this.otherPortal.pos.y;
                }
            }
            else
            {
                pucks[i].portalled = false;
            }
        }
        this.imgData = ctx.getImageData(this.pos.x, this.pos.y, this.w, this.h);
    }
    resetAnim()
    {
        this.frame = 0;
    }
}
