const perlinNoise = (sketch) => {

    let projectThreeContainer = document.querySelector('#sectionThreeContainer');
    let canvasContainerProject = document.querySelector('#projectThreeContainer');
    let width = canvasContainerProject.offsetWidth;
    let height = canvasContainerProject.offsetHeight;

    let inc = 0.01;
    let start = 0;

    sketch.setup = function() {

        let canvasProject = sketch.createCanvas(width, height);
        canvasProject.parent("projectThreeContainer");
        projectThreeContainer.classList.add("hidden");

    }

    sketch.draw = function() {
        sketch.background(51);

        sketch.stroke(255);
        sketch.noFill();
        sketch.beginShape();

        let xoff = start;

        for (var x = 0; x < sketch.width; x++) {

            let y = sketch.noise(xoff) * sketch.height;

            xoff += inc;

            sketch.stroke(255);
            sketch.vertex(x, y);

        }

        sketch.endShape();

        start += inc;

    }
}

new p5(perlinNoise);