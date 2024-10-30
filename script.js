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

// Load frames
async function loadFrames() {
    const frameCount = 10;
    for (let i = 0; i < frameCount; i++) {
        const response = await fetch(`frames/${i}.txt`);
        frames.push(await response.text());
    }
    startAnimation();
}

// Start animation loop
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
    alert("You fed your parrot!");
    hungerBars = Math.min(hungerBars + 3, 40);
    health = Math.min(health + 5, 100);
    lastInteraction = Date.now();
    startAnimation(50);  // Speed up animation temporarily
    setTimeout(() => startAnimation(), 3000); // Return to normal speed after 3 seconds
    updateStats();
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

// Sleep function with cooldown and ZZZ display
let sleepCooldown = false;
function sleepPet() {
    if (sleepCooldown) {
        alert("Parrot needs to rest before sleeping again!");
        return;
    }
    alert("Your parrot is sleeping...");
    sleeping = true;
    sleepCooldown = true;
    health = Math.min(health + 5, 100);
    asciiContainer.textContent = "ZZZ\n" + frames[currentFrame];

    setTimeout(() => {
        sleeping = false;
        sleepCooldown = false;
        startAnimation();
        updateStats();
    }, 10000);  // Parrot sleeps for 10 seconds

    setTimeout(() => { sleepCooldown = false; }, 300000);  // 5-minute cooldown
}

// Update stats display
function updateStats() {
    document.getElementById("health").textContent = health;
    document.getElementById("happiness").textContent = happiness;
    document.getElementById("hunger").textContent = hungerBars;
}

// Stats depletion functions
setInterval(() => {
    // Deplete hunger over time
    if (!sleeping) hungerBars = Math.max(hungerBars - 1, 0);
    else hungerBars = Math.max(hungerBars - 0.5, 0);

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
