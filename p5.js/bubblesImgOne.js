const bubblesOne = (sketch) => {

    let canvasImgContainer = document.querySelector('#bioContainerOne');
    let imgWidth = canvasImgContainer.offsetWidth;
    let imgHeight = canvasImgContainer.offsetHeight;

    let bubbles = [];

    sketch.setup = function() {
        let canvasImg = sketch.createCanvas(imgWidth, imgHeight);
        canvasImg.parent("bioContainerOne");

        for (let i = 0; i < 200; i++) {
            let x = sketch.random(sketch.width);
            let y = sketch.random(sketch.height);
            let r = sketch.random(5, 8);
            bubbles[i] = new Bubble(x, y, r);
        }
    }

    sketch.draw = function() {
        sketch.background(255);

        for (let i = 0; i < bubbles.length; i++) {
            bubbles[i].move();
            bubbles[i].show();
            
            let overlapping = false;
            
            for (let j = 0; j < bubbles.length; j++) {
                if (bubbles[i] !== bubbles[j] && bubbles[i].intersects(bubbles[j])) {
                    overlapping = true;
                }
            }

            if (overlapping) {
                bubbles[i].changeColor(0);
            } else {
                bubbles[i].changeColor(175);
            }
        }
    }

    class Bubble {
        constructor(x, y, r) {
            this.x = x;
            this.y = y;
            this.r = r;
            this.brightness = 0;
        }

        intersects(other) {
            let d = sketch.dist(this.x, this.y, other.x, other.y);
            return (d < this.r + other.r);
        }

        changeColor(bright) {
            this.brightness = bright;
        }

        contains(px, py) {
            let d = sketch.dist(this.x, this.y, px, py);
            return (d < this.r);
        }

        move() {
            if (this.x < 0 + this.r + 5) {
                this.x = this.x + sketch.random(1, 3);
            } else if (this.x > sketch.width - this.r - 5) {
                this.x = this.x + sketch.random(-1, -3);
            } else if (this.y < 0 + this.r + 5) {
                this.y = this.y + sketch.random(1, 3);
            } else if (this.y > sketch.height - this.r - 5) {
                this.y = this.y + sketch.random(-1, -3);
            } else {
                this.x = this.x + sketch.random(1, -1);
                this.y = this.y + sketch.random(1, -1);
            }
        }

        show() {
            sketch.noStroke();
            //sketch.stroke(0, 25);
            sketch.strokeWeight(1);
            sketch.fill(this.brightness, 25);
            sketch.ellipse(this.x, this.y, this.r * 2);
        }
    }
}

new p5(bubblesOne);