function getRandomNumber(lower, upper)
{
    return Math.floor((Math.random() * (upper - lower)) + lower);
}
function getMousePos(e) 
{
    var rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
}
function copyCanvasData(srcx, srcy, w, h,
                        dstx, dsty)
{
    var c = document.getElementById("myCanvas");
    var ct = c.getContext("2d");
    var imgData = ct.getImageData(srcx, srcy, w, h);
    ct.putImageData(imgData, dstx, dsty);
}
function getUnitVector(vect)
{
    var sqrsum = vect.x * vect.x + vect.y * vect.y;
    return {x: vect.x/sqrsum, y: vect.y/sqrsum};    
}
function clamp(clmp, curr)
{
    if (clmp < 0)
        if (Math.abs(curr) > Math.abs(clmp))
            return clmp;
        else
            return curr;
    else 
        if (curr > clmp)
            return clmp;
        else
            return curr;
}
//function 
function getPlayer()
{
    for (var i = 0; i < entlist.length; i++)
        if(entlist[i] instanceof Player)
            return entlist[i];
    return null;
}
function getPuck()
{
    for (var i = 0; i < entlist.length; i++)
        if(entlist[i] instanceof Puck)
            return entlist[i];
    return null;
}
function getScoreBoard()
{
    return scorebrd;
}
function allImagesLoaded()
{
    for (var i = 0; i < entlist.length; i++)
        if (entlist[i].img != null)
            if (!entlist[i].img.complete)
                return false;
    return true;
}
var SideEnum = {
    UP   : 0,
    DOWN : 1,
    RIGHT: 2,
    LEFT : 3,
    ERROR: 4
}
var SideString = [
    "up",
    "down",
    "right",
    "left",
    "error"
];
// checkSide(a,b) :  return what side entity A is to entity B
//
//   +-----+ 
//   |     |   +---+
//   |  a  |   | b |
//   |     |   +---+
//   +-----+ 
//
// In this illustration, a is to the left of b
// so, in this case, the function wil return SideEnum.LEFT
//
function checkSide(a, b)
{
    if (!(a instanceof Entity))
        return SideEnum.ERROR;
    if (!(b instanceof Entity))
        return SideEnum.ERROR;
    
    if (a.pos.x + a.w > b.pos.x + b.w && a.pos.x > b.pos.x + b.w) return SideEnum.LEFT ;
    if (b.pos.x + b.w > a.pos.x + a.w && b.pos.x > a.pos.x + a.w) return SideEnum.RIGHT;
    if (a.pos.y + a.h > b.pos.y + b.h && a.pos.y > b.pos.y + b.h) return SideEnum.DOWN ;
    if (b.pos.y + b.h > a.pos.y + a.h && b.pos.y > a.pos.y + a.h) return SideEnum.UP   ;
    
    return SideEnum.ERROR;
}
function checkCollision(a, b)
{
    if (!(a instanceof Entity))
        return false;
    if (!(b instanceof Entity))
        return false;
 
    var rect1 = {x: a.pos.x, y: a.pos.y, width: a.w, height: a.h}
    var rect2 = {x: b.pos.x, y: b.pos.y, width: b.w, height: b.h}
 
    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y)
    {
        return true;
    }
    return false;   
}
function checkPuckCollision(a, b)
{
    if (!(a instanceof Puck)) return false;
    if (!(b instanceof Puck)) return false;

    var distance = Math.sqrt(
                        ((a.pos.x - b.pos.x) * (a.pos.x - b.pos.x))
                      + ((a.pos.y - b.pos.y) * (a.pos.y - b.pos.y))
                            );
    return distance < a.radius + b.radius;
}
function addPuckAtMouse(e)
{
    var x = mousepos.x;
    var y = mousepos.y;
    var vx = (mousestartpos.x - mousepos.x) / 10;
    var vy = (mousestartpos.y - mousepos.y) / 10;
    addPuck(x - 16, y - 16, vx, vy);
}
function addParticle(x, y, scale)
{
    var obj = new Particle(x, y, 64, 64, scale, "star.png", [0]);
    entlist.push(obj);
    return obj;
}
function addPuck(x, y, vx, vy)
{
    var obj = new Puck(x, y, 32, 32, vx, vy, "circles2.png", [2,3,4,5,4,3,2]);
    entlist.push(obj);
    return obj;
}
function addAttractor(x, y)
{
    var obj = new Attractor(x, y, 32, 32, "circles2.png", [2,3,4,5,4,3,2]);
    entlist.push(obj);
    return obj;
}
function addGoal(x, y, w, h)
{
    var obj = new Goal(x, y, w, h);
    entlist.push(obj);
    return obj;
}
function addWall(x, y)
{
    var obj = new Wall(x, y, 4, 4)
    entlist.push(obj);
    return obj;
}
function addMovingWall(x, y, isVertical)
{
    var obj = new MovingWall(x, y, 64, 64, isVertical, "spring-aa.png", [0,1,2,3,4]);
    entlist.push(obj);
    return obj;
}
function addPlayer(x, y)
{
    var obj = new Player(x, y);
    entlist.push(obj);
    return obj;
}
function addPortal(x, y, w, h, color, otherPortal)
{
    var obj = new Portal(x, y, w, h, color, otherPortal);
    return obj;
}
function sound(src) 
{
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}
function drawLine()
{
    ctx.beginPath();
    ctx.moveTo(mousestartpos.x, mousestartpos.y);
    ctx.lineTo(mousepos.x, mousepos.y);
    ctx.stroke();
}
function distance(p1, p2)
{
    var x = p2.x - p1.x;
    var y = p2.y - p1.y;
    return Math.sqrt(x*x + y*y);
}

var canvas;
var ctx;

var mousepos      = {x: 0, y: 0};
var mousestartpos = {x: 0, y: 0};
var mdown = false;

var layers = [];

var entlist = [];
var pucks = [];

var imagesLoaded = false;

var sound_bump = new sound("bump.mp3");
var sound_ping = new sound("ping.mp3");
var sound_goal = new sound("goal.mp3");
var scorebrd = null;
 
var vendors = ['webkit', 'moz'];
for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
}

var isUpArrowPressed    = false;
var isDownArrowPressed  = false;
var isRightArrowPressed = false;
var isLeftArrowPressed  = false;
var isSpacePressed      = false;
var isSPressed          = false;

window.onkeydown = function(e)
{
    var key = e.keyCode ? e.keyCode : e.which;
    if (key == 32) isSpacePressed     = true;
    if (key == 37) isLeftArrowPressed = true;
    if (key == 38) isUpArrowPressed   = true;
    if (key == 39) isRightArrowPressed= true;
    if (key == 40) isDownArrowPressed = true;
    if (key == 83) isSPressed         = true;
}
 
window.onkeyup = function(e)
{
    var key = e.keyCode ? e.keyCode : e.which;
    if (key == 32) isSpacePressed     = false;
    if (key == 37) isLeftArrowPressed = false;
    if (key == 38) isUpArrowPressed   = false;
    if (key == 39) isRightArrowPressed= false;
    if (key == 40) isDownArrowPressed = false;
    if (key == 83) isSPressed         = false;  
}

$(document).ready(function () 
{
    canvas = $("#myCanvas")[0];
    ctx = $("#myCanvas")[0].getContext("2d");
    canvas.addEventListener('mousedown', function (event)
    {
        mousestartpos = getMousePos(event);
        mousepos = mousestartpos;
        mdown = true;
    });
    canvas.addEventListener('mousemove', function (event)
    {
        mousepos = getMousePos(event);
    });
    canvas.addEventListener('mouseup', function (event)
    {
        addPuckAtMouse(event);
        mdown = false;
    });

    var Fps = 60;
    scorebrd = new ScoreBoard();
    var portal1 = addPortal(10, 10, 30, 30, "darkblue", null);
    var portal2 = addPortal(10, canvas.height - 30, 30, 30, "darkorange", null);
    //portal1.link(portal2);
    //portal2.link(portal1);
    addPlayer(100, canvas.height - 140);
    addGoal(4*canvas.width/5, canvas.height/2, 85, 52);
    addParticle(canvas.width/2, canvas.height/2, 0.9);
    //addMovingWall(32, canvas.height - 80, false); 
    //addMovingWall(canvas.width/2, canvas.height/5, true); 
    var game = setInterval(function ()
    {
        ctx.clearRect(0,0,canvas.width,canvas.width);
        if (!imagesLoaded)
            imagesLoaded = allImagesLoaded();
        else
        {
            //for (var i = 0; i < entlist.length; i++)
            //{
            //    entlist[i].draw();
            //}
            //portal1.update();
            //portal2.update();
            //portal1.draw();
            //portal2.draw();
            for (var i = 0; i < entlist.length; i++)
            {
                entlist[i].draw();
                entlist[i].update();
            }
            if (mdown)
                drawLine();
            scorebrd.display();
        }
    }, 1000 / Fps);
 });