const randomDots = (sketch) => {

    let projectOneContainer = document.querySelector('#sectionOneContainer');
    let canvasContainerProject = document.querySelector('#projectOneContainer');
    let width = canvasContainerProject.offsetWidth;
    let height = canvasContainerProject.offsetHeight;

    let x, y, f;

    sketch.setup = function() {
        let canvasProject = sketch.createCanvas(width, height);
        canvasProject.parent("projectOneContainer");
        
        sketch.background(0);
    }

    sketch.draw = function() {
        f = sketch.random(255);
        x = sketch.random(sketch.width); // takes canvas width
        y = sketch.random(sketch.height); // takes canvas height
        sketch.noStroke();
        sketch.fill(f, 100);
        sketch.circle(x, y, 24);
    }
}

new p5(randomDots);

// credit for code and design to Daniel Shiffman in
// book: The Nature of Code and
// youtube tutorial channel: The Coding Train
