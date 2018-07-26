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

class Hero extends GameObject {
    constructor() {
        super( new lib.HeroGraphic() );
    }
}

class Game {
    constructor() {
        console.log(`Welcome to the game. Version ${this.version()}`);
    
        this.loadSound();

        this.canvas = document.getElementById("game-canvas");
        this.stage = new createjs.Stage(this.canvas);

        this.stage.width = this.canvas.width;
        this.stage.height = this.canvas.height;

        this.stage.enableMouseOver();

        // add touch
        createjs.Touch.enable(this.stage);

        // retina screen (for mobile devices)
        this.retinalize();

        createjs.Ticker.setFPS(60);

        // redraws the stage at 60 frames per second
        createjs.Ticker.on("tick", this.stage);

        this.loadGraphics();
    }
        version() {
            return '1.0.0';
        }

        loadSound() {
        }

        loadGraphics() {
            var loader = new createjs.LoadQueue(false);
	loader.addEventListener("fileload", handleFileLoad);
	loader.addEventListener("complete", handleComplete);
	loader.loadFile({src:"images/rush_game_graphics_atlas_.json", type:"spritesheet", id:"rush_game_graphics_atlas_"}, true);
    loader.loadManifest(lib.properties.manifest);
    
    function handleFileLoad(evt) {
        if (evt.item.type == "image") { images[evt.item.id] = evt.result; }
    }
    
    function handleComplete(evt) {
        var queue = evt.target;
        ss["rush_game_graphics_atlas_"] = queue.getResult("rush_game_graphics_atlas_");

        this.restartGame();
    }
        }

        restartGame() {
            var hero = new Hero();
            this.stage.addChild(hero);
            hero.x = 100;
            hero.y = 100;
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

            // CSS style
            this.canvas.style.width = this.stage.width + "px";
            this.canvas.style.height = this.stage.height + "px";
        }

    }
    
//starts game
    var game = new Game();

