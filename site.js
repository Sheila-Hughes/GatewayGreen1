const form = document.querySelector("#contact-form");

if (form) {
  const status = document.querySelector("#form-status");
  const button = form.querySelector("button");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    button.disabled = true;
    status.textContent = "Sending your enquiry…";
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
      });
      const result = await response.json();
      status.textContent = result.message;
      if (response.ok) form.reset();
    } catch {
      status.textContent = "We couldn’t send your enquiry. Please try again later.";
    } finally {
      button.disabled = false;
    }
  });
}
