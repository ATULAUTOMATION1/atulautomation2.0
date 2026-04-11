async function test() {
    const apiKey = "AIzaSyDTmjA9F0fxZ3vPCYKINo-TrNnkEVJTTcw";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{role: "user", parts: [{ text: "hello" }]}]
        }),
    });

    const data = await response.json();
    console.log(response.status, JSON.stringify(data, null, 2));
}

test();
