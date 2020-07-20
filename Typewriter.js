class Typewriter {
    //constructor takes 2 parameters:
    //text as array of strings
    //destination as DOM element eg. div where text will be displayed
    constructor(text, destination) {
        this.destination = destination;
        this.aText = text;
        this.iSpeed = 80; //delay between printing next letter
        this.iIndex = 0; //index of item in array from which we start 
        this.iArrLength = this.aText[this.iIndex].length; // length of the text in first array item
        this.iScrollAt = 20; // starts scrolling lines when reach iScrollAt lines
        this.iTextPos = 0;  // text postition
        this.sContents = ''; // text content variable
        this.iRow; // current row
        this.description = document.createElement("p");
        this.description.id = 'description';
        this.destination.appendChild(this.description);
        this.setDestinationSizeToFullPage();
    }

    //set DOM element (passed as constructor parameter) size to 95 vmin
    setDestinationSizeToFullPage() {
        this.destination.style.width = 95 + "vmin";
        this.destination.style.height = 95 + "vmin";
    }

    //starts displaying passed text letter by letter, each item in array is new line
    write() {
        this.sContents = ' ';
        this.iRow = Math.max(0, this.iIndex - this.iScrollAt);

        while (this.iRow < this.iIndex) {
            this.sContents += this.aText[this.iRow++] + '<br />';
        }
        this.description.innerHTML = this.sContents + this.aText[this.iIndex].substring(0, this.iTextPos) + "_";
        if (this.iTextPos++ == this.iArrLength) {
            this.iTextPos = 0;
            this.iIndex++;
            if (this.iIndex != this.aText.length) {
                this.iArrLength = this.aText[this.iIndex].length;
                setTimeout(() => { this.write() }, 500);
            }
        } else {
            setTimeout(() => { this.write() }, this.iSpeed);
        }

        if (this.iIndex == this.aText.length) {
            var opacity = 1;
            setTimeout(() => {
                this.destination.removeChild(this.description);
            }, 2000);

            this.spinner = setInterval(function () {
                if (opacity > 0) {
                    opacity -= 0.1;
                    this.description.style.opacity = opacity;
                } else {
                    this.clearInterval();
                }
            }, 80);
        }
    }
}