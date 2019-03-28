class Goal extends Trigger
{
    constructor(x, y, w, h, color)
    {
        super(x, y, w, h, color, "basket.png", [0]);
        this.leftRim  = addWall(x, y);
        this.scorelimit = 5;
        this.rightRim = addWall(x + this.w - 4, y);
        this.isColliding = false;
        this.invisible = true;
    }
    update()
    {
        for (var i = 0; i < pucks.length; i++)
        {
            if (checkCollision(this, pucks[i]))
            {
                pucks[i].pos.x-=pucks[i].vel.x;
                pucks[i].pos.y-=pucks[i].vel.y;
                if (checkSide(pucks[i], this) == SideEnum.UP && !this.isColliding)
                {
                    sound_goal.play();
                    var scrbrd = getScoreBoard();
                    var p = pucks[i];
                    for (var x = 0; x < 10; x++)
                        addParticle(this.pos.x + this.w/2, this.pos.y + this.h/2, Math.random());
                    var myself = this;
                    setTimeout(function()
                    {
                        myself.randomizePosition();
                        p.killSelf();
                    }, 125);
                    scrbrd.playerScored();
                    this.isColliding = true;
                }                
                pucks[i].pos.x+=pucks[i].vel.x;
                pucks[i].pos.y+=pucks[i].vel.y;
            }
            else
                this.isColliding = false;
        }
    }
    setScoreLimit(limit)
    {
        this.scorelimit = limit;
    }
    randomizePosition()
    {
        var xp = getRandomNumber(canvas.width/2 + this.w * 2, canvas.width  - 2 * this.w);
        var yp = getRandomNumber(this.h * 2, canvas.height - 2 * this.h);
        this.pos          = {x: xp             , y: yp};
        this.leftRim.pos  = {x: xp             , y: yp};
        this.rightRim.pos = {x: xp + this.w - 4, y: yp};
    }
}