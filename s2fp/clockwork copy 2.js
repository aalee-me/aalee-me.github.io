function setup() {
    noCanvas();
    sdelay = 5;
    if ((sdelay + second()) > 60 && minute == 59) {
        mdelay = 1;
        if(hour == 23) {
            hdelay = 1;
        }
    }
    else {
        mdelay = 0;
        hdelay = 0;
    }

    srate = 60/(width*sdelay);
    ssoon = (second() + sdelay)%60;
    msoon = (minute() + mdelay)%60;
    hsoon = (hour() + hdelay)%24;
    mmap = map(msoon, 0, 60, 0, 360);
    hmap = map(hsoon, 0, 24, 0, 360);
    smap = map(ssoon, 0, 60, 0, 360);
    mease = 0;
    hease = 0;
    sease = 0;
    elapsed = 0;
    loading = true;
}

function draw() {
    // print(millis());
    minuteval = map(minute(), 0, 60, 0, 360);
    hourval = map(hour(), 0, 24, 0, 360);
    secondval = map(second(), 0, 60, 0, 360);

    if(loading == true) {
        if(elapsed < sdelay){
            elapsed = millis()/1000;
            t = elapsed / sdelay;
            mease = mmap * (t*t);
            hease = hmap * (t*t); 
            sease = smap * (t*t);
        }
        else {
            loading = false;
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