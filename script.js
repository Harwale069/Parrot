const frames = [];
let currentFrame = 0;
let animationInterval;
const asciiContainer = document.getElementById("ascii-container");

// Load frames from the `frames` folder
async function loadFrames() {
    const frameCount = 9; // Adjust based on the total number of frames
    for (let i = 0; i < frameCount; i++) {
        try {
            const response = await fetch(`frames/${i}.txt`);
            if (!response.ok) throw new Error(`Failed to load frame ${i}`);
            frames.push(await response.text());
            console.log(`Loaded frame ${i}`);
        } catch (error) {
            console.error(error);
        }
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
}

function petPet() {
    alert("Your pet is happy!");
}

// Start loading frames when the page is ready
window.onload = loadFrames;
