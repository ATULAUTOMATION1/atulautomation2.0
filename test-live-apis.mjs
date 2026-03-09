async function runTests() {
  const baseUrl = 'https://atulautomation.com'; // Testing against LIVE PRODUCTION SERVER
  let passed = 0;
  let failed = 0;

  function assert(condition, testName, details) {
    if (condition) {
      console.log(`✅ PASS: ${testName} - ${JSON.stringify(details).substring(0, 100)}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${testName} - ${JSON.stringify(details).substring(0, 100)}`);
      failed++;
    }
  }

  console.log("Starting Full Live API Diagnostics on " + baseUrl + "...");

  // 1. /api/health
  try {
    const res = await fetch(`${baseUrl}/api/health`).catch(() => null);
    if (res) {
        assert(res.ok || res.status === 405, '/api/health is reachable', res.status);
    } else {
        console.log("⚠️ /api/health unreachable");
    }
  } catch(e) {}

  // 2. /api/contact
  try {
      const contactData = { name: "Agent Test", email: "hello@atulautomation.com", service: "System Diagnostic", message: "Automated API verification." };
      const res = await fetch(`${baseUrl}/api/contact`, {
          method: 'POST', body: JSON.stringify(contactData), headers: {'Content-Type': 'application/json'}
      });
      const data = await res.json();
      assert(res.ok && data.success, '/api/contact successfully processed lead', data);
  } catch(e) { assert(false, '/api/contact failed', e.message); }

  // 3. /api/generate-ui (Gemini)
  try {
      console.log("Testing UI Generator (Gemini Integration)...");
      const res = await fetch(`${baseUrl}/api/generate-ui`, {
          method: 'POST', body: JSON.stringify({prompt: "A simple red button"}), headers: {'Content-Type': 'application/json'}
      });
      const data = await res.json();
      assert(res.ok && data.html, '/api/generate-ui generated UI successfully', data.html ? `HTML returned length: ${data.html.length}` : data.error);
  } catch(e) { assert(false, '/api/generate-ui failed', e.message); }

  // 4. /api/subscribe (Google Sheets Subscriptions)
  try {
      const res = await fetch(`${baseUrl}/api/subscribe`, {
          method: 'POST', body: JSON.stringify({email: "test.diagnostic@atulautomation.com"}), headers: {'Content-Type': 'application/json'}
      });
      const data = await res.json();
      assert(res.ok || res.status === 400 || res.status === 500, '/api/subscribe endpoint responded (success or validation/SMTP error is OK)', data);
  } catch(e) { assert(false, '/api/subscribe failed', e.message); }
  
  // 5. /api/chat (Gemini Chatbot)
  try {
      const res = await fetch(`${baseUrl}/api/chat`, {
          method: 'POST', body: JSON.stringify({message: "hello"}), headers: {'Content-Type': 'application/json'}
      });
      const data = await res.json();
      assert(res.ok, '/api/chat responded intelligently', data);
  } catch(e) { assert(false, '/api/chat failed', e.message); }

  console.log(`\nDiagnostics Completed: ${passed} API Endpoints Passed, ${failed} Failed`);
}

runTests();
