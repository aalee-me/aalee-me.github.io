function setup() {
    noCanvas();
}

function draw() {
    let front = select('#folderfront');
    secondval=map(second(), 0, 60, 0, 360);
    front.style('transform','rotateX(-'+secondval+'deg)');
    let folder = select('#folder');
    minuteval=map(minute(), 0, 60, 0, 360)
    folder.style('transform','rotateX(-'+minuteval+'deg)');
}