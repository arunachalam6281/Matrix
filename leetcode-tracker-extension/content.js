(function () {
  console.log("LeetCode Tracker loaded");

  const API = "https://matrix-production-d793.up.railway.app/api/leetcode/event";

  // remember last submission to prevent duplicates
  let lastSubmissionKey = null;

  const sendEvent = async (payload) => {
    try {
      await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("Event sent:", payload);
    } catch (e) {
      console.error("Failed to send event:", e);
    }
  };

  const detectSubmission = () => {
    const observer = new MutationObserver(() => {

      const result = document.querySelector('[data-e2e-locator="submission-result"]');
      if (!result) return;

      const status = result.innerText.trim();
      if (!status) return;

      const title =
        document.querySelector('a[href^="/problems/"]')?.innerText ||
        document.title;

      const url = window.location.href;

      const submissionKey = title + "_" + status;

      // ignore duplicates
      if (submissionKey === lastSubmissionKey) return;

      lastSubmissionKey = submissionKey;

      console.log("Submission detected:", status);

      sendEvent({
        eventType: "SUBMISSION",
        problemName: title,
        status,
        problemUrl: url,
        eventTime: new Date().toISOString(),
      });

    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  };

  detectSubmission();
})();