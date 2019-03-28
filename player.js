class Player extends Entity
{
    constructor(x, y)
    {
        super(x, y, 70, 200, "player.png", [0,1]);
        this.ball = new Puck(this.pos.x + this.w, this.pos.y, 32, 32, 0, 0, "circles2.png", [2,3,4,5,4,3,2]);
        this.PlayerAnim = {idling: 0, jumping: 1};
        this.setGravity(0, 0.2);
        this.bJumping = false;
        this.bShotball = false;
        this.bSPress = false;
        this.shotsTaken = 0;
    }
    getShotsTaken()
    {
        return this.shotsTaken;
    }
    shootBall()
    {
        if (!this.bShotBall)
        {
             this.shotsTaken++;
             addPuck(this.pos.x + this.w, this.pos.y, 5, this.vel.y - 8);
             this.bShotBall = true;
        }
    }
    jump()
    {
        if (!this.bJumping)
        {
            this.vel.y = -5;
            this.bJumping = true;
            this.frame = this.PlayerAnim.jumping;
        }
    }
    land()
    {
        this.frame = this.PlayerAnim.idling;
        this.bJumping = false;
        //this.bShotBall = false;
    }
    update()
    {
        this.ball.isVisible = !this.bShotBall;
        this.ball.pos = {x: this.pos.x + this.w - 16, y: this.pos.y};
        if (!isSPressed && this.bSPress)
        {
            this.bShotBall = false;
        }
        if (isSpacePressed)
        {
            this.jump();
        }        
        
        if (isSPressed)
        {
            this.shootBall();
        }
        super.update();
        
        if (this.pos.y + this.h > canvas.height)
        {
            this.pos.y = canvas.height - this.h;
            this.vel.y = 0;
            this.land();
        }
        this.bSPress = isSPressed;
    }
    draw()
    {
        this.ball.draw();
        super.draw();
    }

}