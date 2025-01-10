const apiItems = "http://localhost:9876/api/items";
const navbarConnect = document.querySelector(".wrapper__navbar__connect");

// Check if user is connected

async function fetchAllItems() {
  try {
    const response = await fetch(apiItems + "/getallitems");
    if (!response.ok) {
      throw new Error("Response status" + response.status);
    }
    const datas = await response.json();
    return datas;
  } catch (error) {
    console.error("Erreur serveur", error.message);
  }
}

function clearChild(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}
