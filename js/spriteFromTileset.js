

var Container = PIXI.Container,
    ParticleContainer=PIXI.ParticleContainer,
    autoDetectRenderer = PIXI.autoDetectRenderer,

    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    Text = PIXI.Text,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    texture,
    coordinatsArray,
    Rectangle = PIXI.Rectangle;
    Graphics = PIXI.Graphics;

var clickPos={};
var sprArr=[];
var initialArr=[];
var sprfromX;
var sprfromY;


var toX;
var toY;

var stage = new Container();
var gameField = new Container(300,300);
var readyPeacture = new Container(300,300);
// gameField.position.x=25;
// gameField.position.y=25;
stage.addChild(readyPeacture);
stage.addChild(gameField);
// var stage= new ParticleContainer(300,{
//
//     interactiveChildren:true
// })
renderer = autoDetectRenderer(500, 500);

document.body.appendChild(renderer.view);

renderer.view.style.border = "1px dashed black";
renderer.backgroundColor = "0xFFFFFF";


loader.add("img/images.json")
       .add("img/pict.png")
       .load(setup);


function setup() {


    //snuffle2D();

    //console.log(ww);
    //addReadyPicture ()
    createSpriteArray();

    // var someArr=[[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]];
    // arrayToMess(someArr)
    // console.log(someArr)

    renderer.render(stage);

}






function createSpriteArray () {
    var rectArr=[];
    var texturesArr=[];

    var mySpriteSheetImage  = TextureCache["img/pict.png"];

    for(var i=0; i<4; i++) {
        rectArr[i] = [];
        texturesArr [i] = [];
        sprArr[i] = [];
        for (var j = 0; j < 4; j++) {


            rectArr[i][j] = new Rectangle(75 * i, 75 * j, 75, 75);
            texturesArr[i][j] = new PIXI.Texture(mySpriteSheetImage, rectArr[i][j])

            sprArr[i][j] = new Sprite(texturesArr[i][j]);


        }

    }



    //arrayToMess(sprArr)
    createInitialArray(sprArr);
    //addPieceToStage2(sprArr);

}



function addReadyPicture () {

   var wholeImageTexture  = TextureCache["img/pict.png"];
   var wholeImage = new Sprite(wholeImageTexture)

   readyPeacture.addChild(wholeImage);



    animate();


}


function arrayToMess (array) {


    for(var i=0; i<4; i++){

        for(var j=0; j<4; j++){
            array[i][j]=array[j][i]


        }
    }

}


function createInitialArray (array){
    for(var i=0; i<4; i++){
        initialArr[i]=[];
        for(var j=0; j<4; j++){

            array[i][j].column=i;
            array[i][j].row=j;
            initialArr[i][j]=array[i][j]

        }
    }


    addPieceToStage2(array);
}



function addPieceToStage2(array) {

    console.log(checkWin(initialArr,array))




    for(var i=0; i<4; i++){

        for(var j=0; j<4; j++){

            array[i][j].x=i*75;
            array[i][j].y=j*75;

            array[i][j].interactive = true;
            array[i][j].column=i;
            array[i][j].row=j;

            var onePiece=array[i][j];
            //onePiece.anchor.x=0.5;
            //onePiece.anchor.y=0.5;
            onePiece.off("mousedown");
            onePiece.off("mouseup");
            onePiece.off("mousemove");
            onePiece.off("mouseupoutside");
            onePiece
                .on('mousedown', onDragStart)
                .on('mouseup', onDragEnd)
                .on('mousemove', onDragMove)
                .on('mouseupoutside', onDragEnd)
                //.on('touchstart', onDragStart)
                // .on('touchend', onDragEnd)
                // .on('touchendoutside', onDragEnd)
                // .on('touchmove', onDragMove);
            gameField.addChild(onePiece);

        }
    }


    animate();



}

function animate() {

    renderer.render(stage);
    requestAnimationFrame(animate);
}



function onDragStart(event){
    console.log("start");

    this.data = event.data;

    this.alpha = 0.5;
    this.dragging = true;

    clickPos.x=this.position.x;
    clickPos.y=this.position.y;
    //sprfromX=(this.position.x/75)-1;
    //sprfromY=(this.position.y/75)-1 ;



}





function onDragEnd() {


    console.log("onDragEnd")
    sprfromX=this.column;
    sprfromY=this.row;

    console.log("fromX "+sprfromX+ " fromY "  + sprfromY);
    console.log("toX "+toX+ " toY " + toY);

    this.alpha = 1;

    this.dragging = false;


    this.data = null;



    for (var i = gameField.children.length - 1; i >= 0; i--) {
        gameField.removeChild(gameField.children[i]);
    };





    swapPlacesInMatrix(sprArr,sprfromX,sprfromY,toY,toX);

}





function onDragMove(){




    if (this.dragging)
    {

        var newPosition = this.data.getLocalPosition(this.parent);

            if(newPosition.x>300){
                newPosition.x = Math.min(this.x, 300); //TODO not number -stage.width-this.width

            }

            if(newPosition.y>300){
                newPosition.y = Math.min(this.y, 300); //TODO not number -stage.height-this.height

            }

            if(newPosition.x<0){
                newPosition.x = Math.min(this.x, 0);

            }

            if(newPosition.y<0){
                newPosition.y = Math.min(this.y, 0);

            }


        // var sprfromX=this.column;
        // var sprfromY=this.row;
        // console.log("fromX "+sprfromX+ " fromY "  + sprfromY);
        // console.log(Math.round(newPosition.x));
        //
        toX=Math.floor(Math.round(newPosition.x)/75);
        toY=Math.floor(Math.round(newPosition.y)/75);
        //
        // console.log("toX "+toX+ " toY " + toY);
        // ;

        this.position.x = toX*75;
        this.position.y = toY*75;


        // this.position.x = newPosition.x;
        // this.position.y = newPosition.y;


    }



}




function swapPlaces(array,from,to) {

    array.splice(to, 0, array.splice(from, 1)[0]);
    return array;




}


function swapPlacesInMatrix(array,columnFrom,rowFrom,rowTo,columnTo) {

    var tempFrom=array[columnFrom][rowFrom];
    console.log("tempFr" + tempFrom)
    var tempTo=array[columnTo][rowTo];
    console.log("tempTo" + tempTo)

    // for (var i = 0; i<4 ; i++){
    //     // column to change = offsetX, in row = offsetY
    //
    //     for (var j = 0 ; j<4 ; j++){
    //
    //
    //         array[columnFrom][rowFrom]=array[columnTo][rowTo];
    //         array[columnTo][rowTo]=tempFrom;
    //         array[columnFrom][rowFrom]=tempTo;
    //
    //
    //     }
    //
    // }

    array[columnFrom][rowFrom]=array[columnTo][rowTo];
    array[columnTo][rowTo]=tempFrom;
    array[columnFrom][rowFrom]=tempTo;



    addPieceToStage2(array);

}

function checkWinNew (array){
    var win=0;
    var no_win=0;

    console.log("column " +array[0][0].column*75)
    console.log("column " +array[0][0].position.x)

    for (var i = 0; i < 4; i++){
        for (var j = 0; j < 4; j++){
            //console.log(array[i][j].column)
            //console.log(array[i][j].position.x)

            // var tempNumbX=array[i][j].column*75;
            // var tempNumbY=array[i][j].row*75;
            //
            // if (tempNumbX==array[i][j].position.x&&tempNumbY==array[i][j].position.y){
            //     console.log("win!")
            //     win+=1;
            // }
            // else {
            //     console.log("no win!")
            //     no_win+=1;
            // }






            console.log(array[i][j].position.x)
            if (array[i][0].column==array[j][0].position.x&&array[i][1].row==array[j][1].position.y){
                console.log("win!")
                win+=1;
            }
            else {
                console.log("no win!")
                no_win+=1;
            }

        }

    }
    console.log("win!" +win)
    console.log("no win!" +no_win )
    //TODO 16 - settings for game
    if(win==16){
        return true;
            }
    else {
        return false}



}



function checkWin (initialArr, array){
    var win=0;
    var no_win=0;
    console.log("column " +initialArr[0][0].column)
    console.log("column " +array[0][0].column)
    for (var i = 0; i < 4; i++){
        for (var j = 0; j < 4; j++){

            if (initialArr[i][j].column==array[i][j].column&&initialArr[i][j].row==array[i][j].row){
                console.log("win!")
                win+=1;
            }
            else {
                console.log("no win!")
                no_win+=1;
            }

        }

    }
    console.log("win!" +win)
    console.log("no win!" +no_win )
    //TODO 16 - settings for game
    if(win==16){
        return true;
    }
    else {
        return false}



}







































































function matrixArray(){
    var arr = [];
    var arrayX =[0,75,150,225];
    for(var i=0; i<4; i++){
        arr[i] = [];

        for(var j=0; j<4; j++){



                arr[i][j]= 6;


        }
    }
    return arr;
}



function compareRandom(a, b) {
    return Math.random() - 0.5;
}


function snuffle2D(){
    var arr=[0,1,2,3];
    var longArr= [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]];

    arr.sort(compareRandom);

    for (var i = 0; i<4 ; i++){
        // column to change = offsetX, in row = offsetY
        var ww=arr[i];
        //console.log(ww);

        for (var j = 0 ; j<4 ; j++){
            var qq=arr[j]
            var temp=longArr[i][j]
            var temp2=longArr[ww][j];
            longArr[i][j]=longArr[ww][j]

            longArr[ww][j]=temp;
            





        }

    }
    console.log(longArr)

}







    function onDown (eventData) {

    console.log("click!")


    }






function removeSprite(){


}



function drawNewPiece()  {


    var angles =[1.578,3.1416,4.1888,6.2831];
    var arrayX =[0,50,100,150,200,250];

    var result = Math.floor( Math.random() * 5 );
    this.positionX= arrayX[randomNumber(4)] ;
    this.positionY= arrayX[randomNumber(4)] ;
    this.positionRotate= angles[randomNumber(3)] ;

    this.rect = new Rectangle(this.positionX,this.positionX, 50, 50);

    this.adventuress2 = new Sprite(texture);
    this.adventuress2.texture.frame=this.rect;




}

function randomNumber(arrayMembers){

  return Math.floor( Math.random() * arrayMembers);

}
















































































































function gameLoop() {

  //Loop this function 60 times per second
  requestAnimationFrame(gameLoop);

  //Update the current game state:
  state();

  //Render the stage
  renderer.render(stage);
}




//The `keyboard` helper function
function keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;

  //The `downHandler`
  key.downHandler = function (event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = function (event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener("keydown", key.downHandler.bind(key), false);
  window.addEventListener("keyup", key.upHandler.bind(key), false);

  //Return the key object
  return key;
}

//The contain helper function

//# sourceMappingURL=treasureHunter.js.map

















