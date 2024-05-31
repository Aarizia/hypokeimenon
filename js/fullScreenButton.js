let projects = document.querySelector('#projects')
let fullScreenButton = document.querySelectorAll('.full-screen-button');
let fullScreenContainer = document.querySelector('#fullScreenProject');
let fullScreenEscapeButton = document.querySelector('#fullScreenEscape');
let fullScreenRefreshButton = document.querySelector('#fullScreenRefresh');


projects.addEventListener('click', function(e) {

    let sectionElement = e.target.parentElement.attributes.id.value;
    let classes = e.target.attributes[0].value;

    let classesArray = classes.split(" ");

    if (classesArray[0] == 'full-screen-button') {

        fullScreenContainer.innerHTML = `
        <div id="fullScreenCanvasContainer"></div>
        `

        fullScreenContainer.style.display = 'block';
        fullScreenContainer.style.zIndex = '+1';
        fullScreenEscapeButton.style.display = 'flex';
        fullScreenEscapeButton.style.zIndex = '+10';
        // fullScreenRefreshButton.style.display = 'flex';
        // fullScreenRefreshButton.style.zIndex = '+10';

        if (sectionElement == 'sectionOneContainer') {

            const particleSystemFS = (sketch) => {
            
                let bubbles = [];
            
                sketch.setup = function() {
                    let canvasProject = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
                    canvasProject.parent('fullScreenCanvasContainer');
            
                    for (let i = 0; i < 5000; i++) {
            
                        let x = sketch.random(sketch.width);
                        let y = sketch.random(sketch.height);
                        let r = sketch.random(30, 60);
            
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
                        this.x = this.x + sketch.random(5, -5);
                        this.y = this.y + sketch.random(5, -5);
                    }
            
                    show() {
                        sketch.noStroke();
                        sketch.fill(255, 10);
                        sketch.ellipse(this.x, this.y, this.r);
                    }
                }
            }
            
            new p5(particleSystemFS);

        };

        if (sectionElement == 'sectionTwoContainer') {

            const perlinNoiseFS = (sketch) => {

                let inc = 0.01;
                let start = 0;

                sketch.setup = function() {
                    let canvasProject = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
                    canvasProject.parent('fullScreenCanvasContainer');
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

            new p5(perlinNoiseFS);

        }

        if (sectionElement == 'sectionThreeContainer') {

            const perlinNoise3dFS = (sketch) => {
            
                let inc = 0.1;
                let scl = 40;
                let zoff = 0;
                let cols, rows;
                //let fr;
                let particles = [];
                let flowfield = [];
            
                sketch.setup = function() {
                    let canvasProject = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
                    canvasProject.parent('fullScreenCanvasContainer');
            
                    sketch.background(255);
                
                    cols = sketch.floor(sketch.windowWidth / scl);
                    rows = sketch.floor(sketch.windowHeight / scl);
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
                    //fr.html(sketch.floor(sketch.frameRate()));
                }
            
                function Particle() {
                    this.pos = sketch.createVector(sketch.random(sketch.windowWidth), sketch.random(sketch.windowHeight));
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
                        if (this.pos.x > sketch.windowWidth) this.pos.x = 0;
                        if (this.pos.x < 0) this.pos.x = sketch.windowWidth;
                        if (this.pos.y > sketch.windowHeight) this.pos.y = 0;
                        if (this.pos.y < 0) this.pos.y = sketch.windowHeight;
                    }
                }
            }
            
            new p5(perlinNoise3dFS);



        }

        if (sectionElement == 'sectionFourContainer') {

            const randomDots = (sketch) => {

                // let projectFourContainer = document.querySelector('#sectionFourContainer');
                // let canvasContainerProject = document.querySelector('#projectFourContainer');
                // let width = canvasContainerProject.offsetWidth;
                // let height = canvasContainerProject.offsetHeight;
            
                let x, y, f;
            
                sketch.setup = function() {
                    let canvasProject = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
                    canvasProject.parent('fullScreenCanvasContainer');
                    //projectFourContainer.classList.add("hidden");
                    
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
        }

        // fullScreenRefreshButton.addEventListener('click', function() {

        //     //new p5(particleSystemFS);

        // })

        fullScreenEscapeButton.addEventListener('click', function() {

            fullScreenContainer.innerHTML = '';
            fullScreenContainer.style.display = 'none';
            fullScreenEscapeButton.style.display = 'none';
            fullScreenRefreshButton.style.display = 'none';

        });
    }

})