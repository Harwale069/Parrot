const frames = [];
let currentFrame = 0;
let animationInterval;
const asciiContainer = document.getElementById("ascii-container");

// Load frames from the frames folder
async function loadFrames() {
    const frameCount = 10; // Adjust if you have more frames
    for (let i = 0; i < frameCount; i++) {
        const response = await fetch(`frames/${i}.txt`);
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
    alert("You fed your parrot!");
    // Update pet stats or animation here
}

function petPet() {
    alert("Your parrot is happy!");
    // Update pet stats or animation here
}

// Start loading frames when the page is ready
window.onload = loadFrames;
