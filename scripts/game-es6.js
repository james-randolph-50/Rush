class GameObject extends createjs.Container {
  constructor(graphic) {
    super();

    if (graphic !== undefined) {
      this.graphic = graphic;
      this.addChild(this.graphic);

      var b = this.graphic.nominalBounds;
      this.setBounds(b.x, b.y, b.width, b.height);
    }
  }
}

class MoveableGameObject extends GameObject {
  
}

class Hero extends GameObject {
  constructor() {
    super( new lib.HeroGraphic() );
  }
}

class Platform extends GameObject {
  constructor() {
    super( new lib.PlatformGraphic() );
  }
}

class World extends createjs.Container {
  constructor() {
    super();

    this.platforms = [];

    this.generatePlatforms();
    this.addHero();

  }
  addHero() {
    var hero = new Hero();
    this.stage.addChild(hero);
    hero.x = 100;
    hero.y = 100;
  }

  generatePlatforms() {
    var platform = new Platform();
    platform.x = 100;
    platform.y = 300;
    this.platforms.push(platform);
    this.stage.addChild(platform);

    platform = new Platform();
    platform.x = 250;
    platform.y = 300;
    this.platforms.push(platform);

    this.addChild(platform);
  }
  isObjectOnGround(object) {
    var objectWidth = object.getBounds().width;
    var objectHeight = object.getBounds().height;

    for (var platform of this.platforms) {
      var objectWidth = object.getBounds().width;
      var objectHeight = object.getBounds().height;

      if (object.x >= platform.x && object.x < platform.x + platformWidth &&  object.y + objectHeight >= platform.y && object.y + objectHeight <= platform.y + platformHeight)
   {
      return true;
   }
  }
  return false;
 }
}


class Game{
  constructor() {
    console.log(`Welcome to the game. Version ${this.version()}`);

    this.loadSound();

    this.canvas = document.getElementById("game-canvas");
    this.stage = new createjs.Stage(this.canvas);

    this.stage.width = this.canvas.width;
    this.stage.height = this.canvas.height;

    // enable tap on touch device
    createjs.Touch.enable(this.stage);

    // enable retina screen
    this.retinalize();

    this.loadGraphics();
  }
  version(){
    return '1.0.0';
  }
  loadSound() {

  }
  loadGraphics() {
    var loader = new createjs.LoadQueue(false);
  	loader.addEventListener("fileload", handleFileLoad);
  	loader.addEventListener("complete", handleComplete.bind(this));
  	loader.loadFile({src:"images/rush_game_graphics_atlas_.json", type:"spritesheet", id:"rush_game_graphics_atlas_"}, true);
  	loader.loadManifest(lib.properties.manifest);

    function handleFileLoad(evt) {
    	if (evt.item.type == "image") { images[evt.item.id] = evt.result; }
    }

    function handleComplete(evt) {
    	var queue = evt.target;
      ss["Rush Game Graphics_atlas_"] = queue.getResult("Rush Game Graphics_atlas_");
    
      this.restartGame();
    }
  }
  restartGame() {
    this.world = new World();
    this.stage.addChild(this.world);
  }

  retinalize() {
    this.stage.width = this.canvas.width;
    this.stage.height = this.canvas.height;

    let ratio = window.devicePixelRatio;
    if (ratio === undefined) {
      return;
    }

    this.canvas.setAttribute('width', Math.round( this.stage.width * ratio ));
    this.canvas.setAttribute('height', Math.round( this.stage.height * ratio ));

    this.stage.scaleX = this.stage.scaleY = ratio;

    // Set CSS style
    this.canvas.style.width = this.stage.width + "px";
    this.canvas.style.height = this.stage.height + "px";
  }
}

// start the game
var game = new Game();
