function setup() {
    noCanvas();
    delay = 5;
    soon = (second() + delay)%60;
    mmap = map(soon, 0, 60, 0, 360);
    hmap = map(soon, 0, 24, 0, 360);
    smap = map(soon, 0, 60, 0, 360);
    mease = 0;
    hease = 0;
    sease = 0;
    elapsed = 0;
    loading = true;
}

function draw() {
    minuteval=map(minute(), 0, 60, 0, 360);
    hourval=map(hour(), 0, 24, 0, 360);
    secondval=map(second(), 0, 60, 0, 360);


    if(loading == true) {
        if(elapsed < delay){
            elapsed = millis() / 1000;
            t = elapsed / delay;
            hease = hmap * (t);
            mease = mmap * (t);
            sease = smap * (t);
        }
        else {
            loading = false
            mease = minuteval;
        hease = hourval; 
        sease = secondval;
        }
    }
    else{
        mease = minuteval;
        hease = hourval; 
        sease = secondval;
    }
clock(mease, hease, sease);

}

function clock(mease, hease, sease) {    
    let front = select('#folder');
    let folder = select('#folderfront');
    front.style('transform', 'rotateX('+mease+'deg) rotateY('+hease+'deg)');
    folder.style('transform','rotateX('+sease+'deg)');
}