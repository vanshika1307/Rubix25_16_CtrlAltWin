async function getCartData() {
  const products = [];
  document.querySelectorAll(".sc-list-item-content").forEach((item) => {
    const nameElement = item.querySelector(".sc-product-title");
    const priceElement = item.querySelector(".a-price-whole");

    console.log(priceElement, nameElement);

    if (nameElement) {
      const name = nameElement.textContent.trim();
      // const price = priceElement.textContent.trim();
      products.push({ name, price: 0 });
    }
  });

  if (products.length === 0) {
    console.warn("No products found in the cart.");
    return [];
  }

  const backendURL = "http://localhost:3000/api/sustain-score";
  try {
    const response = await fetch(backendURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ products }),
    });
    const data = await response.json();
    // Assuming the backend returns a 'scoredProducts' array
    return data.scoredProducts.map((product, index) => ({
      ...product,
      score: product.score || "N/A",
    }));
  } catch (error) {
    console.error("Error fetching sustainability scores:", error);
    return [];
  }
}

async function updateCartWithScores() {
  const scores = await getCartData();
  document.querySelectorAll(".sc-list-item-content").forEach((item, index) => {
    const score = scores[index]?.score || "N/A";
    const scoreElement = document.createElement("div");
    scoreElement.textContent = `Sustainability Score: ${score}`;
    scoreElement.style.color = "green";
    item.appendChild(scoreElement);
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getCart") {
    getCartData().then((scores) => sendResponse(scores));
    return true;
  }
});
