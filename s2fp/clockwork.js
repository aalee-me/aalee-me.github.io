function setup() {
    noCanvas();
}

function draw() {
    let front = select('#folder');
    minuteval=map(minute(), 0, 60, 0, 360);
    hourval=map(hour(), 0, 24, 0, 360);
    front.style('transform', `rotateX(-${minuteval}deg) rotateY(-${hourval}deg)`);
    let folder = select('#folderfront');
    secondval=map(second(), 0, 60, 0, 360);
    folder.style('transform','rotateX(-'+secondval+'deg)');
}