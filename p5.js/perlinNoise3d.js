const perlinNoise3d = (sketch) => {

    let projectFourContainer = document.querySelector('#sectionFourContainer');
    let canvasContainerProject = document.querySelector('#projectFourContainer');
    let width = canvasContainerProject.offsetWidth;
    let height = canvasContainerProject.offsetHeight;

    let inc = 0.1;
    let scl = 40;
    let zoff = 0;
    let cols, rows;
    let fr;
    let particles = [];
    let flowfield = [];

    sketch.setup = function() {
        let canvasProject = sketch.createCanvas(width, height);
        canvasProject.parent("projectFourContainer");
        projectFourContainer.classList.add("hidden");

        sketch.background(255);
    
        cols = sketch.floor(width / scl);
        rows = sketch.floor(height / scl);
        fr = sketch.createP('');
    
        for (let i = 0; i < 750; i++) {
            particles[i] = new Particle();
        }
    
        flowfield = new Array(cols * rows);
    }


    sketch.draw = function() {
        let yoff = 0;
        
        for (let y = 0; y < rows; y++) {
            let xoff = 0;
            for (let x = 0; x < cols; x++) {
                let index = x + y * cols;
                let angle = sketch.noise(xoff, yoff, zoff) * sketch.TWO_PI;
                let v = p5.Vector.fromAngle(angle);
                
                v.setMag(0.1);
                flowfield[index] = v;
                xoff += inc;
            }
            
            yoff += inc;
            zoff += 0.0003;
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].follow(flowfield);
                particles[i].update();
                particles[i].edges();
                particles[i].show();
            }
        }
        fr.html(sketch.floor(sketch.frameRate()));
    }

    function Particle() {
        this.pos = sketch.createVector(sketch.random(width), sketch.random(height));
        this.vel = sketch.createVector(0, 0);
        this.acc = sketch.createVector(0, 0);
        this.maxspeed = 1.5;
        
        this.update = function() {
            this.vel.add(this.acc); 
            this.vel.limit(this.maxspeed);
            this.pos.add(this.vel);
            this.acc.mult(0);
        }
        
        this.follow = function(vectors) {
            let x = sketch.floor(this.pos.x / scl);
            let y = sketch.floor(this.pos.y / scl);
            let index = x + y * cols;
            let force = vectors[index]
            this.applyForce(force);
        }
        
        this.applyForce = function(force) {
            this.acc.add(force);
        }
        
        this.show = function() {
            sketch.stroke(0, 1);
            sketch.strokeWeight(2);
            sketch.point(this.pos.x, this.pos.y);
        }
        
        this.edges = function() {
            if (this.pos.x > width) this.pos.x = 0;
            if (this.pos.x < 0) this.pos.x = width;
            if (this.pos.y > height) this.pos.y = 0;
            if (this.pos.y < 0) this.pos.y = height;
        }
    }

}

new p5(perlinNoise3d);