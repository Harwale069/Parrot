const frames = [];
let currentFrame = 0;
let animationInterval;
let statInterval;
let health = 100;
let happiness = 100;
let hunger = 100;
const asciiContainer = document.getElementById("ascii-container");

// Load frames from `frames` folder
async function loadFrames() {
    const frameCount = 10;
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
    }, 100);
}

// Decrease stats over time
function decreaseStats() {
    health = Math.max(0, health - 0.1);
    happiness = Math.max(0, happiness - 0.1);
    hunger = Math.max(0, hunger - 0.1);
    document.getElementById("health").textContent = Math.round(health);
    document.getElementById("happiness").textContent = Math.round(happiness);
    document.getElementById("hunger").textContent = Math.round(hunger);

    if (health <= 0) {
        alert("Your parrot has died. Please take better care of it.");
        clearInterval(statInterval);
    }
}

// Interaction functions
function feedPet() {
    hunger = Math.min(100, hunger + 20);
    happiness = Math.min(100, happiness + 10);
    currentFrame = 1; // Set to the frame number that represents jumping
    alert("You fed your parrot!");
}

function petPet() {
    happiness = Math.min(100, happiness + 10);
    currentFrame = 2; // Set to the frame number that represents jumping
    alert("Your parrot is happy!");
}

function sleepPet() {
    currentFrame = 3; // Set to the frame number that represents sleeping
    health = Math.min(100, health + 5); // Restoring health when sleeping
    alert("Your parrot is now resting.");
}

// Start loading frames when the page is ready
window.onload = () => {
    loadFrames();
    statInterval = setInterval(decreaseStats, 1000); // Decrease stats every second
};
