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

        this.restartGame();
    }
        version() {
            return '1.0.0';
        }

        loadSound() {
        }

        restartGame() {

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