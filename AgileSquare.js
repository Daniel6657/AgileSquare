class AgileSquare {
    //take as parameter id of div that will be created and appended to body
    constructor(squareId) {
        var agileSquare = this;
        this.agileSquareDiv = document.createElement("div");        
        this.agileSquareDiv.id = squareId;
        this.centerSquare();
        document.body.appendChild(this.agileSquareDiv);
        window.addEventListener('resize', function (event) {
            agileSquare.centerSquare();
        });
        this.showLegend();
    }

    //set div size to passed as parameters
    setSquareSize(width, height) {
        this.width = width;
        this.height = height;
        this.agileSquareDiv.style.width = this.width + "px";
        this.agileSquareDiv.style.height = this.height + "px";
    }

    //set div position to passed as parameters, 
    //or if div would be beyond the screen places it at the center of the screen
    setSquarePosition(x, y) {
        if (x + this.width / 2 >= 0 && x < window.innerWidth && y + this.height/2 >= 0 && y < window.innerHeight) {
            this.xPosition = x;
            this.yPosition = y;
        } else {
            this.agileSquareDiv.style.transition = '0s';
            if (x > window.innerWidth) {
                this.xPosition = - this.width;
            } else if (x < 0) {
                this.xPosition = window.innerWidth;
            }

            if (y > window.innerHeight) {
                this.yPosition = -this.height;
            } else if (y < 0) {
                this.yPosition = window.innerHeight;
            }
            setTimeout(() => {
                this.centerSquare();
            }, 20);
        }

        this.agileSquareDiv.style.left = this.xPosition + "px";
        this.agileSquareDiv.style.top = this.yPosition + "px";
    }

    //set square position to center of the screen
    centerSquare() {
        this.agileSquareDiv.style.transition = '0.8s';
        let x = (window.innerWidth - this.width) / 2;
        let y = (window.innerHeight - this.height) / 2;
        this.setSquarePosition(x, y);
        setTimeout(() => {
            this.agileSquareDiv.style.transition = '0.1s';
            this.agileSquareDiv.style.transform = 'translate(-50 %, -50 %)';
        }, 60);
    }

    //return div distance to cursor
    distanceToCursor(x, y) {
        let dx = (this.xPosition + this.width / 2) - x;
        let dy = (this.yPosition + this.height / 2) - y;

        return Math.sqrt(dx*dx + dy*dy);
    }

    //set new position of the div depending on the cursor position
    runFromCursor(e) {
        let x = e.clientX;
        let y = e.clientY;
        
        if (this.distanceToCursor(x, y) < 150) {
            let newX = this.xPosition;
            let newY = this.yPosition;
            if (this.xPosition != x) {
                newX = this.xPosition > x ? this.xPosition + (this.xPosition - x) / 10 : this.xPosition - (x - this.xPosition) / 10;
            }

            if (this.yPosition != y) {
                newY = this.yPosition > y ? this.yPosition + (this.yPosition - y) / 10 : this.yPosition - (y - this.yPosition) / 10;
            }

            this.setSquarePosition(newX, newY);
        }
    }

    //invoke typeWriter and then add eventListener to invoke runFromCursor function on mousemove
    showLegend() {
        var descriptionText = new Array(
            "Once upon a time, a bad wizzard wanted to change the resolution of the world to only one pixel.",
            "However, brave unaware of risk bunnny jumped in front of him.",
            "Now only true hoovering by cursor can restore his resolution.",
            "Try to help him, but it won't be easy.",
            "After that incident he began to be fearful");
        var agileSquare = this;
        var typewriter = new Typewriter(descriptionText, this.agileSquareDiv);
        typewriter.write();
        this.centerSquare();
        setTimeout(() => {
            this.setSquareSize(60, 60);
            document.addEventListener('mousemove', function (event) {
                agileSquare.runFromCursor(event);
            });
        },28000);
    }
  }