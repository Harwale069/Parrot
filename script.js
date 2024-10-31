const frames = [];
let currentFrame = 0;
let animationInterval;
let sleeping = false;
let lastInteraction = Date.now();
const asciiContainer = document.getElementById("ascii-container");

// Stats
let health = 100;
let happiness = 100;
let hungerBars = 40;
let coins = 20; // Starting coins

// Load frames and tutorial
async function loadFrames() {
    const frameCount = 10;
    for (let i = 0; i < frameCount; i++) {
        const response = await fetch(`frames/${i}.txt`);
        frames.push(await response.text());
    }
    startAnimation();
    showTutorial();
}

function showTutorial() {
    alert("Welcome to your ASCII Parrot! \n\nFeed, pet, or let your parrot sleep to maintain its health, happiness, and hunger. Use coins in the store.");
}

// Animation loop
function startAnimation(speed = 100) {
    clearInterval(animationInterval);
    animationInterval = setInterval(() => {
        if (!sleeping) {
            asciiContainer.textContent = frames[currentFrame];
            currentFrame = (currentFrame + 1) % frames.length;
        }
    }, speed);
}

// Interaction functions
function feedPet() {
    if (coins > 0) {
        alert("You fed your parrot!");
        hungerBars = Math.min(hungerBars + 3, 40);
        health = Math.min(health + 5, 100);
        coins--;  // Spend one coin
        lastInteraction = Date.now();
        startAnimation(50);
        setTimeout(() => startAnimation(), 3000);
        updateStats();
    } else {
        alert("Not enough coins to feed the parrot!");
    }
}

function petPet() {
    alert("Your parrot is happy!");
    happiness = Math.min(happiness + 15, 100);
    lastInteraction = Date.now();
    animatePetting();
    updateStats();
}

// Petting animation
function animatePetting() {
    clearInterval(animationInterval);
    let tempFrame = currentFrame;
    let pettingFrames = [frames[tempFrame], " \\ / ", "  /\\ ", " \\ / "];
    let petIndex = 0;
    animationInterval = setInterval(() => {
        asciiContainer.textContent = pettingFrames[petIndex];
        petIndex = (petIndex + 1) % pettingFrames.length;
        if (petIndex === 0) startAnimation();
    }, 200);
}

// Sleep with cooldown and display
let sleepCooldown = false;
function sleepPet() {
    if (sleepCooldown) {
        alert("Parrot needs rest before sleeping again!");
        return;
    }
    alert("Your parrot is sleeping...");
    sleeping = true;
    sleepCooldown = true;
    health = Math.min(health + 5, 100);
    asciiContainer.textContent = "ZZZ\n" + frames[8]; // Sleep on frame 8

    setTimeout(() => {
        sleeping = false;
        sleepCooldown = false;
        startAnimation();
        updateStats();
    }, 20000);  // Sleeps for 20 seconds

    setTimeout(() => { sleepCooldown = false; }, 300000);  // 5-minute cooldown
}

// Store button
function openStore() {
    alert("Store temporarily out of order.");
}

// Update stats
function updateStats() {
    document.getElementById("health").textContent = health;
    document.getElementById("happiness").textContent = happiness;
    document.getElementById("hunger").textContent = hungerBars;
    document.getElementById("coins").textContent = coins;
}

// Stats depletion
setInterval(() => {
    // Deplete hunger over time
    hungerBars = Math.max(hungerBars - (sleeping ? 0.5 : 1), 0);

    // Deplete health if hunger is low
    if (hungerBars < 20) health = Math.max(health - 1, 0);
    if (health <= 0 || happiness <= 0) {
        alert("Your parrot has died.");
        clearInterval(animationInterval);
    }
    
    // Reduce happiness if inactive for over 5 minutes
    if (Date.now() - lastInteraction >= 300000) happiness = Math.max(happiness - 1, 0);

    updateStats();
}, 60000); // Runs every minute
