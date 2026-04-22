import fetch from 'node-fetch';

async function testAuth() {
  console.log("Testing POST /api/auth/signup");
  const res = await fetch("http://localhost:3000/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Test User", email: "test2@example.com", password: "password123" })
  });
  
  const data = await res.json();
  console.log("Status:", res.status);
  console.log("Response:", data);
}

testAuth();
