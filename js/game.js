var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var cactus = new Image();
var cactus1 = new Image();
var cactus2 = new Image();
var sign = new Image();
var sign1 = new Image();
var skeleton = new Image();
var bottomBlocks = new Image();
var topBlocks = new Image();
var tree = new Image();
var tree1 = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.jpg";
cactus.src = "img/cactus.png";
cactus1.src = "img/cactus1.png";
cactus2.src = "img/cactus2.png";
sign.src = "img/sign.png";
sign1.src = "img/sign1.png";
skeleton.src = "img/skeleton.png";
bottomBlocks.src = "img/bottomBlocks.png";
topBlocks.src = "img/topBlocks.png";
tree.src = "img/tree.png";
tree1.src = "img/tree1.png";

function playGame() {
	alert("Do you want to play again?");
}
// Sound files
var fly = new Audio();
var  score_audio = new Audio;
fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

var gap = 110;

// Bird action
document.addEventListener("keydown", moveUp);
function moveUp() {
	yPos -= 25;
	fly.play();
}

// Block generation
var pipe = [];
pipe [0] = {
	x : cvs.width,
	y : 0
}

// Others generation
var others = [cactus, cactus1, cactus2, sign, sign1, skeleton, tree, tree1];
var item = Math.floor(Math.random() * others.length);
var pipe1 = [];
pipe1 [0] = {
	x : cvs.width,
	y : 0
}

// Bird position
var xPos = 100;
var yPos = 150;
var grav = 1.2;
var score = 0;


function draw () {
	ctx.drawImage(bg, 0, 0);


// Generation of blocks
	for(var i=0; i<pipe.length; i++){
		ctx.drawImage(topBlocks, pipe[i].x, pipe[i].y);
		ctx.drawImage(bottomBlocks, pipe[i].x, pipe[i].y + topBlocks.height + gap);
		pipe[i].x--;

		if(pipe[i].x == 420){
			pipe.push({x : cvs.width,
					   y : Math.floor(Math.random()* topBlocks.height) - topBlocks.height});
		}
//Bird crashing to bocks
		if(xPos + bird.width >= pipe[i].x &&
			xPos <= pipe[i].x + topBlocks.width &&
			(yPos <= pipe[i].y + topBlocks.height ||
			yPos + bird.height >= pipe[i].y + topBlocks.height + gap) || yPos + bird.height >= 400 || yPos + bird.height <= -0.001) {
			playGame();
			location.reload();
		}
		if (pipe[i].x == 30){
			score++;
			score_audio.play();
		}
	}
//Score
	ctx.fillStyle = "brown";
	ctx.font = "30px Verdana"
	ctx.fillText("Score: " + score, 10, canvas.height - 360)


// Generation of other objects
for(var j=0; j<pipe1.length; j++){
		ctx.drawImage(others[item], pipe1[j].x, cvs.height - others[item].height);
	pipe1[j].x--;
		if (pipe1[j].x == -50){
			item = Math.floor(Math.random() * others.length);
			pipe1.push({x : cvs.width,
						y : cvs.height - others[item].height});
		}
	}


	ctx.drawImage(bird, xPos, yPos);

	yPos += grav;
	requestAnimationFrame(draw);
}

tree1.onload = draw;