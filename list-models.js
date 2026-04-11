const fs = require('fs');

async function test() {
    const apiKey = "AIzaSyDTmjA9F0fxZ3vPCYKINo-TrNnkEVJTTcw";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();
    
    if (data.models) {
        const flashModels = data.models.filter(m => m.name.includes("flash")).map(m => m.name);
        console.log("Available Flash Models:", flashModels);
    } else {
        console.log(JSON.stringify(data, null, 2));
    }
}

test();
