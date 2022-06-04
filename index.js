const gridContainer = document.querySelector('.grid-container');
const rgbSelectorBtn = document.querySelector('.rgb');
const colorModeBtn = document.querySelector('.color-mode');
const rainbowModeBtn = document.querySelector('.rainbow-mode');
const eraserModeBtn = document.querySelector('.eraser')
const clearBtn = document.querySelector('.clear');
const slider = document.querySelector('.slider');
const sliderLabel = document.querySelector('.slider-label');

/* Constants */
const DEFAULT_COLOR = "#333333";
const DEFAULT_MODE = "color";
const DEFAULT_SIZE = "1 x 1";

let currentMode = DEFAULT_MODE;
let currentColor = DEFAULT_COLOR;
let currentSize = DEFAULT_SIZE;

sliderLabel.textContent = currentSize;
createGrid(DEFAULT_SIZE);

/* Create the grid with the selected number of inner elements */
function createGrid(num) {
    let gridItemHeight = 50 / num;
    gridItemHeight.toFixed(2);
    gridContainer.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${num}, ${gridItemHeight}vh)`;
    for (let i = 0; i < num**2; i++) {
        let gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridContainer.appendChild(gridItem);
    }
    createGridItems();
}

function createGridItems() {
    /* Set the background color for hovered elements */
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => item.addEventListener('mouseenter', (e) => {
        let hoveredItem = e.target;
    
        if (currentMode === "color") {
            hoveredItem.style.backgroundColor = currentColor;
        } else if (currentMode === "rainbow") {
            hoveredItem.style.backgroundColor = randomColor();
        } else if (currentMode === "eraser") {
            hoveredItem.style.backgroundColor = "white";
        }
    }))
}

function clearGrid() {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => item.style.backgroundColor = "white")
}

/* Setters */
function setMode(newMode) {
    currentMode = newMode;
}

function setColor(newColor) {
    currentColor = newColor;
}

function setSize(newSize) {
    currentSize = newSize;
}

/* Random Color Generator */
function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`
}

/* RGB Selector Button */
rgbSelectorBtn.addEventListener('input', (e) => {
    setColor(e.target.value)
    colorModeBtn.style.border = `2px dashed ${currentColor}`;
})

/* Color Mode */
colorModeBtn.addEventListener('click', (e) => {
    // when color mode is selected, bg color should changed to selected
    // color of rgbBtn values. 
    setMode("color");
})

/* Rainbow Mode */
rainbowModeBtn.addEventListener('click', (e) => {
    // when rainbow mode is selected, bg color should generated randomly using
    // randomColor(). 
    setMode("rainbow");
})

eraserModeBtn.addEventListener('click', (e) => {
    //when eraser mode is selected, bg color should be removed / set to white;
    setMode("eraser");
})

clearBtn.addEventListener('click', (e) => {
    clearGrid();
})

/* slider functionality */
slider.addEventListener('mouseup', (e) => {
    currentSize = e.target.valueAsNumber;
    sliderLabel.textContent = `${currentSize} x ${currentSize}`;
    createGrid(currentSize);
})
