let bgColor;
let currentbgColor;
let textColor;
let currenttextColor;

function setup() {
    createCanvas(windowWidth, windowHeight);

    bgColor = color(255); 
    currentbgColor = color(255);

    textColor = color(220); 
    currenttextColor = color(220);

    noStroke();
}

function draw() {
    currentbgColor = lerpColor(currentbgColor, bgColor, 0.05);
    background(currentbgColor);

    currenttextColor = lerpColor(currenttextColor, textColor, 0.05);
    
    const bgText = document.querySelector('.background');
    if (bgText) {
        bgText.style.color = `rgb(${Math.floor(red(currenttextColor))}, ${Math.floor(green(currenttextColor))}, ${Math.floor(blue(currenttextColor))})`;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function updateP5Theme(colorHex) {
    if (colorHex) {
        bgColor = color(colorHex);   
        textColor = color(255);
    } else {
        bgColor = color(255);        
        textColor = color(220); 
    }
}

function toggleFolder(folder) {
    // Prevent interaction if the entrance animation is still running
    if (folder.classList.contains('enter')) return;

    const isOpen = folder.classList.contains('open');
    
    if (isOpen) return; 

    document.querySelectorAll('.folder.open').forEach(f => {
        f.classList.remove('open');
        f.classList.add('close');
        
        setTimeout(() => f.classList.remove('close'), 800);
    });

    folder.classList.remove('close');
    folder.classList.add('open');

    const style = getComputedStyle(folder);
    const themeColor = style.getPropertyValue('--theme').trim();
    updateP5Theme(themeColor);
}

function closeProject(e, btn) {
    e.stopPropagation(); 
    const folder = btn.closest('.folder');
    folder.classList.remove('open');
    folder.classList.add('close');
    
    updateP5Theme(null); 
    setTimeout(() => {
        folder.classList.remove('close');
    }, 800);
}

function nextProject(e, btn) {
    e.stopPropagation();
    const currentFolder = btn.closest('.folder');
    const nextFolder = currentFolder.nextElementSibling;
    
    currentFolder.classList.remove('open');
    currentFolder.classList.add('close');

    setTimeout(() => {
        currentFolder.classList.remove('close');
    }, 800);
    
    if (nextFolder && nextFolder.classList.contains('folder')) {
        setTimeout(() => {
            toggleFolder(nextFolder);
        }, 300); 
    } else {
        updateP5Theme(null);
    }
}

document.addEventListener('DOMContentLoaded', () => {

    // --- ENTRANCE ANIMATION CLEANUP ---
    // Remove the 'enter' class after 2 seconds (animation + stagger time).
    // This restores standard behavior and transitions for future clicks.
    setTimeout(() => {
        document.querySelectorAll('.folder.enter').forEach(f => {
            f.classList.remove('enter');
        });
    }, 2000);
    // ----------------------------------

    const allTabs = document.querySelectorAll('.ftab');
    allTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            const parentFolder = tab.closest('.folder');

            if (parentFolder && parentFolder.classList.contains('open')) {
                e.stopPropagation(); 
                
                parentFolder.classList.remove('open');
                parentFolder.classList.add('close');
                
                updateP5Theme(null);
                setTimeout(() => {
                    parentFolder.classList.remove('close');
                }, 800);
            } 
        });
    });

    const folders = document.querySelectorAll('.folder');
    if (folders.length > 0) {
        const lastFolder = folders[folders.length - 1];
        const nextBtn = lastFolder.querySelector('button[onclick*="nextProject"], .next-btn'); 
        if (nextBtn) {
            nextBtn.style.display = 'none';
        }
    }
});