let health = 100;
let happiness = 100;
let hunger = 100;

function feedPet() {
    hunger = Math.min(hunger + 10, 100);
    updateStats();
    // Additional animation logic
}

function petPet() {
    happiness = Math.min(happiness + 10, 100);
    updateStats();
    // Additional animation logic
}

function updateStats() {
    document.getElementById("health").textContent = health;
    document.getElementById("happiness").textContent = happiness;
    document.getElementById("hunger").textContent = hunger;
    checkDeath();
}

function checkDeath() {
    if (hunger <= 0 || health <= 0) {
        alert("Your parrot has died! Game over.");
        // Reset game logic
    }
}

// Add a timer to decrease hunger and health over time
setInterval(() => {
    hunger = Math.max(hunger - 1, 0);
    health = Math.max(health - 0.1, 0); // or any other logic
    updateStats();
}, 60000); // Every minute
