

var Container = PIXI.Container,
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

var stage = new Container(),
renderer = autoDetectRenderer(300, 300);

document.body.appendChild(renderer.view);

renderer.view.style.border = "1px dashed black";
renderer.backgroundColor = "0xFFFFFF";


loader.add("img/images.json")
       .add("img/pict.png")
       .load(setup);


function setup() {



    createSpriteArray();

    renderer.render(stage);

}






function createSpriteArray () {
    var rectArr=[];
    var texturesArr=[];

    var mySpriteSheetImage  = PIXI.BaseTexture.fromImage("img/pict.png");

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

    addPieceToStage2(sprArr);

}

function addPieceToStage2(array) {


    for(var i=0; i<4; i++){

        for(var j=0; j<4; j++){

            array[i][j].x=i*75;
            array[i][j].y=j*75;
            array[i][j].column=i;
            array[i][j].row=j;
            array[i][j].interactive = true;

            // array[i][j].anchor.x=0.5;
            // array[i][j].anchor.y=0.5;


            array[i][j]
                .on('mousedown', onDragStart)
                .on('touchstart', onDragStart)
                .on('mouseup', onDragEnd)
                .on('mouseupoutside', onDragEnd)
                .on('touchend', onDragEnd)
                .on('touchendoutside', onDragEnd)
                .on('mousemove', onDragMove)
                .on('touchmove', onDragMove);
            stage.addChild(array[i][j]);

        }
    }


    animate();

}

function animate() {

    renderer.render(stage);
    requestAnimationFrame( animate );
}



function onDragStart(event){
    console.log("start");

    this.data = event.data;

    this.alpha = 0.5;
    this.dragging = true;

    clickPos.x=this.position.x;
    clickPos.y=this.position.y;

}



function onDragEnd() {

    var newXpos=Math.round(this.position.x);
    var newYpos=Math.round(this.position.y);
    console.log("toXPos "+newXpos+ " toXPos "  + newYpos);

    var sprfromX=this.column;
    var sprfromY=this.row;

    console.log("fromX "+sprfromX+ " fromY "  + sprfromY);

    var toX=(Math.floor((newXpos+75)/75))-1;
    var toY=(Math.floor((newYpos+75)/75))-1;

    console.log("toX "+toX+ " toY " + toY);

    this.alpha = 1;

    this.dragging = false;


    this.data = null;


    for (var i = stage.children.length - 1; i >= 0; i--) {
        stage.removeChild(stage.children[i]);
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






        this.position.x = newPosition.x;
        this.position.y = newPosition.y;



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

    for (var i = 0; i<4 ; i++){
        // column to change = offsetX, in row = offsetY

        for (var j = 0 ; j<4 ; j++){


            array[columnFrom][rowFrom]=array[columnTo][rowTo];
            array[columnTo][rowTo]=tempFrom;
            array[columnFrom][rowFrom]=tempTo;


        }

    }


    addPieceToStage2(array);

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

















