class Particle extends Entity
{
    constructor(x, y, w, h, scale, imgsrc, framelist)
    {
        super(x, y, w*scale, h*scale, imgsrc, framelist);
        this.alpha = 1;
        this.scale = scale;
        this.angle = 0;
        var r = 1;
        var v = getRandomNumber(1, 6);
        var v2= getRandomNumber(1, 4);

        if (getRandomNumber(0, 2) == 1)
            r = -1;

        this.anglerate = r * Math.random() + getRandomNumber(2, 4);
        this.setVelocity(v * r,  -v2);
        this.setGravity (0    , 0.1);
        this.noCollide = true;
    }
    update()
    {
        this.angle+=this.anglerate;
        this.alpha -= 0.01;
        this.updateframe = 0;

        if (this.alpha <= 0)
            this.killSelf();

        super.update();
    }
    draw()
    {
        if (this.framelist != null && this.isVisible)
        {
            var temp = ctx.globalAlpha;
            ctx.globalAlpha = this.alpha;

            ctx.setTransform(this.scale, 0, 0, this.scale, this.pos.x, this.pos.y); // sets scale and origin
            ctx.rotate(this.angle * Math.PI / 180);
            ctx.drawImage(this.img, this.framelist[this.frame] * this.w, 0, this.w / this.scale, this.h / this.scale, -this.w/2, -this.h/2, this.w, this.h);
            ctx.setTransform(1,0,0,1,0,0);

            ctx.globalAlpha = temp;
        }
    }
}