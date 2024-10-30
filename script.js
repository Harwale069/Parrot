const frames = [];
let currentFrame = 0;
let animationInterval;
const asciiContainer = document.getElementById("ascii-container");

// Stats
let health = 100;
let happiness = 100;
let hunger = 100;

// Load frames from `frames` folder
async function loadFrames() {
    const frameCount = 10; // Update if you have more frames
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
    hunger = Math.min(hunger + 20, 100);
    happiness = Math.min(happiness + 10, 100);
}

function petPet() {
    alert("Your parrot is happy!");
    happiness = Math.min(happiness + 15, 100);
}

// New sleep function
function sleepPet() {
    alert("Your parrot is sleeping!");
    health = Math.min(health + 10, 100);
    let hungerDecreaseInterval = setInterval(() => {
        hunger = Math.max(hunger - 1, 0);
        happiness = Math.max(happiness - 1, 0);
        updateStats();
    }, 3000); // Decrease hunger and happiness every 3 seconds

    setTimeout(() => {
        clearInterval(hungerDecreaseInterval); // Stop the interval after 10 seconds
        updateStats();
    }, 10000); // Parrot sleeps for 10 seconds
}

// Update stats display
function updateStats() {
    document.getElementById("health").textContent = health;
    document.getElementById("happiness").textContent = happiness;
    document.getElementById("hunger").textContent = hunger;
}

// Start loading frames when the page is ready
window.onload = loadFrames;
