class Game {
  constructor(){
//this.score=0;
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();

    }

    fish1 = createSprite(100,200);
    
    fish1.scale= 0.1;
    fish2 = createSprite(300,200);
    
    fish2.scale= 0.1;
    fish3 = createSprite(500,200);
    
    fish3.scale= 0.1;
    fish4 = createSprite(700,200);
   
    fish4.scale= 0.1;
    fishs = [fish1, fish2, fish3, fish4];
    
    fish1.addImage(fish1Img);
    fish2.addImage(fish2Img);
    fish3.addImage(fish3Img);
    fish4.addImage(fish4Img);
   
    
    
  }
 

  play(){
    form.hide();

    /*if(fish1.isTouching(ring)){
      fish1Score+=1;
    }
    if(fish2.isTouching(ring)){
      fish2Score+=1;
    }
    if(fish3.isTouching(ring)){
      fish3Score+=1;
    }
    if(fish4.isTouching(ring)){
      fish4Score+=1;
    }
*/
/*textSize(22);
fill('black');
  text('Score'+this.score,displayWidth,displayHeight-500);*/
    Player.getPlayerInfo();

    player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
     background(underTheSeaImg).width/2;
     //image(underTheSeaImg,0,-displayHeight*10,displayWidth,displayHeight*5)
     //image(underTheSeaImg,0,-displayHeight*4,displayWidth,displayHeight*5)
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x=180;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
       x = x+220;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        fishs[index-1].x = x;
        fishs[index-1].y = y;

        if (index === player.index){
          fill("yellow");
          ellipse(x,y,80,80);
          //cars[index - 1].shapeColor = "red";
          camera.position.x =displayWidth/2;
          camera.position.y =  fishs[index-1].y;
        }
        textSize(25);
        fill("white");
        text(allPlayers.player1.name + "'s Score:"+allPlayers.player1.score ,200,500);
       text(allPlayers.player2.name + "'s Score:" + allPlayers.player2.score , 200,550);
       text(allPlayers.player3.name + "'s Score:"+allPlayers.player3.score ,200,600);
       text(allPlayers.player4.name + "'s Score:" + allPlayers.player4.score ,200,650);
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if(keyIsDown(DOWN_ARROW) && player.index !== null){
      player.distance -=10
      player.update();
    }
    


    /*if(keyIsDown(DOWN_ARROW) && player.index !== null){
      player.distance -=10
      player.update();
    }*/
    /*if(fishs[index-1].isTouching(ring)){
      ring.destroy();
      player.score =player.score+1;
      player.update();
    }*/
    
    drawSprites();
  }
  end(){
    console.log("game has ended");
  }
}