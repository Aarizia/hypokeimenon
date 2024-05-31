const logoSketch = (sketch) => {

    let canvasLogoContainer = document.querySelector('#logoContainer');
    let logoWidth = canvasLogoContainer.offsetWidth;
    let logoHeight = canvasLogoContainer.offsetHeight;

    let circles = [];
    let spots = [];
    let img;

    sketch.preload = function() {
        img = sketch.loadImage("img/hypoHvidXsmall.png");
    }

    sketch.setup = function() {
        let canvasLogo = sketch.createCanvas(logoWidth, logoHeight);    // NB: canvas forsvinder
        img.resize(logoWidth, logoHeight);

        canvasLogo.parent("logoContainer");
        img.loadPixels();
        
        for (let x = 0; x < img.width; x++) {
            for (let y = 0; y < img.height; y++) {
                let index = x + y * img.width;
                let c = img.pixels[index * 4];
                let b = sketch.brightness([c]);
                if (b < 50) {
                    spots.push(sketch.createVector(x, y));
                }
            }
        }
    }

    sketch.draw = function() {
        sketch.background(255);
        
        let total = 25;
        let count = 0;
        let attempts = 0;

        while (count < total) {
            let newC = sketch.newCircle();
            if (newC !== null) {
                circles.push(newC);
                count++;
            }

            attempts++;

            if (attempts > 1000) {
                sketch.noLoop();
                console.log("finished");
                break;
            }
        }

        for (let i = 0; i < circles.length; i++) {
            let circl = circles[i];

            if (circl.growing) {
                if (circl.edges()) {
                    circl.growing = false;
                } else {
                    for (let j = 0; j < circles.length; j++) {
                        let other = circles[j];
                        if (circl !== other) {
                            var d = sketch.dist(circl.x, circl.y, other.x, other.y);
                            var distance = circl.r + other.r;

                            if (d - 4 < distance) {
                                circl.growing = false;
                                break;
                            }
                        }
                    }
                }
            }

            circl.show();
            circl.grow();
        }
    }

    sketch.newCircle = function() {
        var r = sketch.int(sketch.random(0, spots.length));
        var spot = spots[r];
        var x = spot.x;
        var y = spot.y;

        var valid = true;
        for (var i = 0; i < circles.length; i++) {
            var circle = circles[i];
            var d = sketch.dist(x, y, circle.x, circle.y);
            if (d < circle.r) {
                valid = false;
                break;
            }
        }

        if (valid) {
            return new Circle(x, y);
        } else {
            return null;
        }
    }

    class Circle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.r = 1;
            this.growing = true;
        }

        grow() {
            if (this.growing) {
                this.r += 1;
            }
        }

        show() {
            sketch.stroke(125, 100);
            sketch.strokeWeight(1);
            sketch.noFill();
            sketch.ellipse(this.x, this.y, this.r * 2);
        }

        edges() {
            return (
                this.x + this.r >= sketch.width ||
                this.x - this.r <= 0 ||
                this.y + this.r >= sketch.height ||
                this.y - this.r <= 0
            );
        }
    }
}

new p5(logoSketch);
