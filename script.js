const frames = [];
let currentFrame = 0;
let animationInterval;
const asciiContainer = document.getElementById("ascii-container");

// Load frames from `frames` folder
async function loadFrames() {
    const frameCount = 12; // Assume 12 frames based on the example
    for (let i = 1; i <= frameCount; i++) {
        const response = await fetch(`frames/frame${i}.txt`);
        frames.push(await response.text());
    }
    startAnimation();
}

// Start the ASCII animation loop
function startAnimation() {
    animationInterval = setInterval(() => {
        asciiContainer.textContent = frames[currentFrame];
        currentFrame = (currentFrame + 1) % frames.length;
    }, 100); // Adjust speed as needed
}

// Interaction functions
function feedPet() {
    alert("You fed your pet!");
    // Additional animations or effects can go here
}

function petPet() {
    alert("Your pet is happy!");
    // Additional animations or effects can go here
}

// Start loading frames when the page is ready
window.onload = loadFrames;
