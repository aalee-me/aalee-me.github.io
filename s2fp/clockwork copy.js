function setup() {
    noCanvas();
    zm = 0;
    zh = 0;
    zs = 0;
    rate = .001;
}

function draw() {
    minuteval=map(minute(), 0, 60, 0, 360);
    hourval=map(hour(), 0, 24, 0, 360);
    secondval=map(second(), 0, 60, 0, 360);
    dm = minuteval - zm;
    dh = hourval - zh;
    ds = secondval - zs;
    zm += dm*rate;
    zh += dh*rate;
    zs += ds*rate;
    if (millis() < 3000) {
        minuteval=map(zm, 0, 60, 0, 360);
    hourval=map(zh, 0, 24, 0, 360);
    secondval=map(zs, 0, 60, 0, 360);
    }

        clock(minuteval, hourval, secondval);
}

function clock(minuteval, hourval, secondval) {    
    let front = select('#folder');
    let folder = select('#folderfront');
    front.style('transform', `rotateX(-${minuteval}deg) rotateY(-${hourval}deg)`);
    folder.style('transform',`rotateX(-${secondval}deg)`);
}

var d = new Date();
var n = d.toLocaleTimeString();