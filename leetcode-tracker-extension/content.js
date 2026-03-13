(function () {
  console.log("LeetCode Tracker loaded");

  // Helper to send event to backend
  const sendEvent = async (payload) => {
    try {
      await fetch("http://localhost:8080/api/leetcode/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      console.log("Sent to backend:", payload);
    } catch (e) {
      console.error("Failed to send event", e);
    }
  };

  // Detect login (basic heuristic: user avatar appears)
  const detectLogin = () => {
    const avatar = document.querySelector('img[alt="User Avatar"]');
    if (avatar) {
      sendEvent({
        eventType: "LOGIN",
        eventTime: new Date().toISOString(),
      });
    }
  };

  // Detect submission result on problem page
  const detectSubmission = () => {
    const observer = new MutationObserver(() => {
      const resultEl = document.querySelector('[data-e2e-locator="submission-result"]');
      if (resultEl) {
        const status = resultEl.innerText.trim();
        const title = document.querySelector('a[href^="/problems/"]')?.innerText || document.title;
        const url = window.location.href;

        sendEvent({
          eventType: "SUBMISSION",
          problemName: title,
          status,
          problemUrl: url,
          eventTime: new Date().toISOString(),
        });
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  };

  detectLogin();
  detectSubmission();
})();