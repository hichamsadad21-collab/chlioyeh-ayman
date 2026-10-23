const { BACKENDS, TIMEOUT_MS } = window.APP_CONFIG;

const form = document.getElementById("item-form");
const list = document.getElementById("items");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submit-btn");

function showMessage(text, type = "") {
  message.textContent = text;
  message.className = type;
}

// Appelle les backends dans l'ordre ; passe au suivant en cas d'échec.
async function apiFetch(path, options = {}) {
  let lastError;
  for (const base of BACKENDS) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(base + path, { ...options, signal: controller.signal });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Erreur HTTP ${res.status}`);
      }
      return await res.json();
    } catch (err) {
      lastError = err.name === "AbortError" ? new Error("Délai dépassé") : err;
    } finally {
      clearTimeout(timer);
    }
  }
  throw new Error(`Service indisponible : ${lastError.message}`);
}

function renderItems(items) {
  list.replaceChildren();
  if (!items.length) {
    const li = document.createElement("li");
    li.textContent = "Aucun élément pour le moment. Ajoutez le premier.";
    list.append(li);
    return;
  }
  for (const item of items) {
    const li = document.createElement("li");
    const title = document.createElement("strong");
    title.textContent = item.name;
    const desc = document.createElement("span");
    desc.textContent = item.description || "";
    li.append(title, desc);
    list.append(li);
  }
}

async function loadItems() {
  try {
    renderItems(await apiFetch("/api/items"));
  } catch (err) {
    showMessage(err.message, "error");
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = form.name.value.trim();
  const description = form.description.value.trim();

  if (name.length < 2) {
    showMessage("Le nom doit contenir au moins 2 caractères.", "error");
    return;
  }

  submitBtn.disabled = true;
  try {
    await apiFetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });
    form.reset();
    showMessage("Élément ajouté.", "ok");
    await loadItems();
  } catch (err) {
    showMessage(err.message, "error");
  } finally {
    submitBtn.disabled = false;
  }
});

loadItems();