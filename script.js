<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive ASCII Parrot</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="terminal">
        <pre id="ascii-container">Loading...</pre>
    </div>
    <div class="controls">
        <button onclick="feedPet()">Feed</button>
        <button onclick="petPet()">Pet</button>
        <button onclick="sleepPet()">Sleep</button>
        <button onclick="openStore()">Store</button>
    </div>
    <div id="stats">
        <p>Coins: <span id="coins">20</span></p>
        <p>Health: <span id="health">100</span></p>
        <p>Happiness: <span id="happiness">100</span></p>
        <p>Hunger: <span id="hunger">40</span></p>
    </div>
    <script src="script.js"></script>
</body>
</html>
