let shards = [];
let neonColors = ['#00FFFF', '#FF00FF', '#FF3300', '#f2ff00ff', '#FFFFFF'];


function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0); 
    frameRate(24); 
    noStroke();
    
    folderElement = document.querySelector('#folder');
}

function draw() {
    clear();

    let bounds = folderElement.getBoundingClientRect();
    

    let inbound = (mouseX > bounds.left && mouseX < bounds.right && mouseY > bounds.top && mouseY < bounds.bottom);
    
    if (inbound) {
        shards.push(new Shard(mouseX, mouseY));
        shards.push(new Shard(mouseX, mouseY));
    }

    for (let num = shards.length - 1; num >= 0; num--) {
        let any = shards[num];
        
        any.display();

        if (any.alpha <= 0) {
            shards.splice(num, 1);
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

class Shard {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        
        this.color = random(neonColors);
        this.alpha = 255; 
        this.size = random(200, 300);

        this.x1 = random(-this.size, this.size);
        this.y1 = random(-this.size, this.size);
        this.x2 = random(-this.size, this.size);
        this.y2 = random(-this.size, this.size);
        this.x3 = random(-this.size, this.size);
        this.y3 = random(-this.size, this.size);
    }

    display() {
        this.alpha = this.alpha - 40;

        push();
        translate(this.x, this.y);

        let neon = color(this.color);
        neon.setAlpha(this.alpha);
        fill(neon);
        
        beginShape();
        vertex(0, 0);
        vertex(this.x1, this.y1);
        vertex(this.x2, this.y2);
        vertex(this.x3, this.y3);
        endShape(CLOSE);
        
        pop();
    }
}