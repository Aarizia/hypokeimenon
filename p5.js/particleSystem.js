const particleSystem = (sketch) => {

    let projectTwoContainer = document.querySelector('#sectionTwoContainer');
    let canvasContainerProject = document.querySelector('#projectTwoContainer');
    let width = canvasContainerProject.offsetWidth;
    let height = canvasContainerProject.offsetHeight;

    let bubbles = [];

    sketch.setup = function() {
        let canvasProject = sketch.createCanvas(width, height);
        canvasProject.parent("projectTwoContainer");
        projectTwoContainer.classList.add("hidden");

        for (let i = 0; i < 2000; i++) {

            let x = sketch.random(width);
            let y = sketch.random(height);
            let r = sketch.random(10, 40);

            bubbles[i] = new Bubble(x, y, r);
        }
    }

    sketch.draw = function() {
        sketch.background(0);

        for (let i = 0; i < bubbles.length; i++) {

            bubbles[i].move();
            bubbles[i].show();
        }
    }

    class Bubble {
        constructor(x, y, r) {
            this.x = x;
            this.y = y;
            this.r = r;  
        }

        move() {
            this.x = this.x + sketch.random(2, -2);
            this.y = this.y + sketch.random(2, -2);
        }

        show() {
            sketch.noStroke();
            sketch.fill(255, 10);
            sketch.ellipse(this.x, this.y, this.r);
        }
    }
}

new p5(particleSystem);