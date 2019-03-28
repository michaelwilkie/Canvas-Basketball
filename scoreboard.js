class ScoreBoard
{
    constructor()
    {
        this.scoreplayer = 0;
    }
    display()
    {
        var playr = getPlayer();
        var score = this.scoreplayer;
       
        /*
        if (playr.shotsTaken == 0 || score == 0)
            ctx.fillText(" Score/shot ratio: " + score, 0, 100);
        else
            ctx.fillText(" Score/shot ratio: " + (score/playr.shotsTaken).toFixed(2), 0, 100);
        */
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(" Shots: "+ playr.getShotsTaken(), 0, 50);
        ctx.fillText(score, canvas.width/2 - ctx.measureText(score).width/2, 50);
    }
    playerScored()
    {
        this.scoreplayer++;
    }
    computerScored()
    {
        this.scorecomputer++;
    }
}