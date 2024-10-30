const frames = [];
let currentFrame = 0;
let animationInterval;
const asciiContainer = document.getElementById("ascii-container");

// Load frames from `frames` folder
async function loadFrames() {
    const frameCount = 10; // Update if you have more frames
    for (let i = 0; i < frameCount; i++) {
        try {
            const response = await fetch(`frames/${i}.txt`);
            if (!response.ok) throw new Error(`Failed to load frame ${i}`);
            const frameData = await response.text();
            frames.push(frameData);
            console.log(`Loaded frame ${i}`);
        } catch (error) {
            console.error(error);
        }
    }
    console.log(frames); // Log loaded frames
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
    // Additional animations or effects can go here
}

function petPet() {
    alert("Your parrot is happy!");
    // Additional animations or effects can go here
}

// Start loading frames when the page is ready
window.onload = loadFrames;
