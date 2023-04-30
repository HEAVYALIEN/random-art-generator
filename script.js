const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const canvasSizeInput = document.getElementById("canvasSize");
const canvasSizeValue = document.getElementById("canvasSizeValue");

const colorPalettes = [
    ["#F7DBAE", "#F9AF7F", "#F87E7B", "#B05574", "#42394A"],
    ["#FFADAD", "#FFD6A5", "#FDFFB6", "#CAFFBF", "#9BF6FF"],
    ["#EFECCA", "#A9BD8B", "#5C832F", "#FFC857", "#4B4B4B"],
];

const shapes = [
    { type: 'rectangle', width: 600, height: 600},
    { type: 'circle', radius: 150 },
    { type: 'bullseye', size: 100 },
    { type: 'abyss', size: 300 }
    // Add more shapes as needed
];

function generateBackground(colorRange) {
    const color = colorRange[Math.floor(Math.random() * colorRange.length)];
    const rgb = hexToRgb(color);
    ctx.fillStyle = `rgb(${rgb})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

function generateShapes(numShapes, colorRange, shapeSize) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    generateBackground(colorRange);
    
    for (let i = 0; i < numShapes; i++) {
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const color = colorRange[Math.floor(Math.random() * colorRange.length)];
        const transparency = randomTransparency(0.1, 0.5);
        const rgb = hexToRgb(color); // Define rgb here
        ctx.fillStyle = `rgba(${rgb}, ${transparency})`;

        if (shape.type === 'circle') {
            const radius = shapeSize ? shapeSize : shape.radius;
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        } else if (shape.type === 'bullseye') {
            const numRings = 4;
            const ringSize = shapeSize ? shapeSize / numRings : 50 / numRings;
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
          
            for (let i = 1; i <= numRings; i++) {
              const size = ringSize * i;
              ctx.beginPath();
              ctx.arc(x, y, size, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(${rgb}, ${transparency})`;
              ctx.fill();
            }
        }   
        else if (shape.type === 'abyss') {
            const numRings = 8;
            const ringSize = shapeSize ? shapeSize / numRings : 50 / numRings;
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
          
            for (let i = 1; i <= numRings; i++) {
              const size = ringSize * i;
              ctx.beginPath();
              ctx.arc(x, y, size, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(${rgb}, ${transparency})`;
              ctx.fill();
            }
          }
          
    }
}

function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
}

function randomTransparency(min, max) {
    return Math.random() * (max - min) + min;
}

// Add event listeners to the sliders
const numShapesSlider = document.getElementById("numShapes");
numShapesSlider.addEventListener("input", function () {
    document.getElementById("numShapesValue").innerHTML = this.value;
});

const shapeSizeSlider = document.getElementById("shapeSize");
shapeSizeSlider.addEventListener("input", function () {
    document.getElementById("shapeSizeValue").innerHTML = this.value;
});

// Add event listener to the "Generate" button
const generateButton = document.getElementById("generateButton");
generateButton.addEventListener("click", function () {
    const numShapes = parseInt(numShapesSlider.value);
    const paletteIndex = parseInt(colorPaletteSlider.value);
    const colorRange = colorPalettes[paletteIndex];
    const shapeSize = parseInt(shapeSizeSlider.value);
    generateShapes(numShapes, colorRange, shapeSize);
});

// Add event listener to the "Save" button
const saveButton = document.getElementById("saveButton");
saveButton.addEventListener("click", function () {
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "myArt.png";
    link.href = dataURL;
    link.click();
});

canvasSizeInput.addEventListener("input", function () {
    const size = this.value;
    canvasSizeValue.textContent = size;
    myCanvas.width = size;
    myCanvas.height = size;
    generateArt();
});

const colorPaletteSlider = document.getElementById("colorPalette");
colorPaletteSlider.addEventListener("input", function () {
    document.getElementById("colorPaletteValue").innerHTML = this.value;
});