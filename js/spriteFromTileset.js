//Aliases


var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    Text = PIXI.Text,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    texture,
    texture2,
    sparr,

    coordinatsArray,
    currentPiece,
    Rectangle = PIXI.Rectangle;
    Graphics = PIXI.Graphics;
var clickPos={};
var sprArr=[];
//Create a Pixi stage and renderer
var stage = new Container(),
    renderer = autoDetectRenderer(300, 300);
document.body.appendChild(renderer.view);
stage.interactive=true;
//Set the canvas's border style and background color
renderer.view.style.border = "1px dashed black";
renderer.backgroundColor = "0xFFFFFF";

//load an image and run the `setup` function when it's done
loader.add("img/images.json")
       .add("img/pict.png")
        .load(setup);
//Define any variables that are used in more than one function
var state = undefined,

    b = undefined,

    adventuress,


    id = undefined;

function setup() {
  //texture = TextureCache["img/images.png"]; //for add picec1
  texture = TextureCache["img/pict.png"];

  //Fix possible texture bleed



  var left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39),
      down = keyboard(40);

  //Left arrow key `press` method
  left.press = function () {
    // animate(function() {
    //   if(adventuress.x<250){
    //
    //     adventuress.x += 50;
    //
    //   }
    //
    // }, 10000);
      //addPieceToStage()

   console.log("left")
    //Change the explorer.s velocity when the key is pressed


  };
  left.release = function () {

    //If the left arrow has been released, and the right arrow isn't down,
    //and the explorer.isn't moving vertically, stop the sprite from moving
    //by setting its velocity to zero
    if (!right.isDown) {
      console.log("left release")

    }
  };


  //Set the game's current state to `play`


  //Start the game loop

    addPieceToStage();

    renderer.render(stage);








}




function addPieceToStage() {
var id = PIXI.loader.resources["img/images.json"].textures;

    var sprite;

    coordinatsArray=[
        [0,0],
        [75,0],
        [150,0],
        [225,0],
        [0,75],
        [75,75],
        [150, 75],
        [225, 75],
        [0,150],
        [75,150],
        [150,150],
        [225,150],
        [0,225],
        [75,225],
        [150,225],
        [225,225]
    ];




    sparr=[];
    for(var i = 1; i<17 ; i++){
        var val = i < 10 ? '0' + i : i;
        var oneSpr=new Sprite(id["pict_"+val+".png"]);
        oneSpr.initialNumb=i;
        sparr.push(oneSpr);

    }




    //sparr.sort(compareRandom);
    //addPiecesToStage(sparr);
    //addPieceToStage2();
    createSpriteArray ();

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
    // var rectArr=[];
    // var texturesArr=[];
    // var sprArr=[];
    // var mySpriteSheetImage  = PIXI.BaseTexture.fromImage("img/pict.png");

    for(var i=0; i<4; i++){
        // rectArr[i] = [];
        // texturesArr [i]=[];
        // sprArr[i] =[];
        for(var j=0; j<4; j++){



            // rectArr[i][j]= new Rectangle (75*i,75*j,75,75);
            // texturesArr[i][j]= new PIXI.Texture(mySpriteSheetImage,rectArr[i][j])
            //
            // sprArr[i][j]= new Sprite(texturesArr[i][j]);
            array[i][j].x=i*75;
            array[i][j].y=j*75;
            array[i][j].column=i;
            array[i][j].row=j;
            array[i][j].interactive = true;


            array[i][j]
                .on('mousedown', onDragStart)
                .on('mouseover',onMouseOver)
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

    //console.log(arr);


    animate();




}

function animate() {

    renderer.render(stage);
    requestAnimationFrame( animate );
}


function onMouseOver (){


}

function onDragStart(event){
    console.log("start");


    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;

    this.alpha = 0.5;
    this.dragging = true;
    clickPos.x=this.position.x;
    clickPos.y=this.position.y;

}



function onDragEnd() {
    console.log("clickPos.x" + clickPos.x+ " " +Math.round(this.position.x));
    console.log(sprArr);
    var newXpos=Math.round(this.position.x);
    var newYpos=Math.round(this.position.y);
    var sprfromX=this.column;
    var sprfromY=this.row;
    console.log("fromX "+sprfromX+ " fromY" + sprfromY);
    var toX=(Math.floor((newXpos+75)/75))-1;
    var toY=(Math.floor((newYpos+75)/75))-1;
    console.log("toX "+toX+ " toY" + toY);

    this.alpha = 1;

    this.dragging = false;

    // set the interaction data to null
    this.data = null;


    for (var i = stage.children.length - 1; i >= 0; i--) {
        stage.removeChild(stage.children[i]);
    };


    var arrayChange=swapPlacesInMatrix(sprArr,sprfromX,sprfromY,toY,toX);
    addPieceToStage2(arrayChange);






}

function onDragMove(){




    if (this.dragging)
    {

        var newPosition = this.data.getLocalPosition(this.parent);
        ///console.log(this.data);
            if(newPosition.x>225){
                newPosition.x = Math.min(this.x, 225); //TODO not number -stage.width-this.width

            }

            if(newPosition.y>225){
                newPosition.y = Math.min(this.y, 225); //TODO not number -stage.height-this.height

            }

        //var old=coordinatsArray[this.numb][0];
        //var put=Math.round(newPosition.x);
        console.log("column "+ this.column + " row " + this.row);


        //this.offset=old%put;
        this.position.x = newPosition.x;
        this.position.y = newPosition.y;

        //var ww=onMouseOver ();
        //console.log(ww);


    }


}






function addPiecesToStage(array){


    for(var j = 0; j<array.length ; j++){
        //console.log(coordinatsArray[j])



        array[j].x=coordinatsArray[j][0];
        array[j].y=coordinatsArray[j][1];
        stage.addChild(array[j]);
        array[j].numb=j;
        array[j].interactive = true;


        array[j]
            .on('mousedown', onDragStart)
            .on('touchstart', onDragStart)
            .on('mouseup', onDragEnd)
            .on('mouseupoutside', onDragEnd)
            .on('touchend', onDragEnd)
            .on('touchendoutside', onDragEnd)
            .on('mousemove', onDragMove)
            .on('touchmove', onDragMove);




        }




    animate();

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


return array;

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

















