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


if (window.location.href.includes('/gp/cart/')) {
  // Create a custom notification or alert
  const showNotification = () => {
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = '#98FB98';
    notification.style.color = '#000';
    notification.style.padding = '5px';
    notification.style.borderRadius = '8px';
    notification.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    notification.style.fontFamily = 'Arial, sans-serif';
    notification.style.fontSize = '20px';
    notification.style.zIndex = '1000';
    
    // Get the URL of the image dynamically
    const logoUrl = chrome.runtime.getURL("images/logo.png");

    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
        <img src="${logoUrl}" alt="Logo" width="50" height="60">
        <h2 style="margin: 0; font-size: 18px;">ESSENCE</h2>
      </div>
      <div>
        <strong> Make sure to check the sustainability score 
        and opt for better products on our site! 
        <a href="http://localhost:5173/" target="_blank" style="color: #2563eb; text-decoration: underline;">Visit here</a>.
        </strong>
      </div>
    `;

    // Append the notification to the document
    document.body.appendChild(notification);

    // Auto-hide the notification after 10 seconds
    setTimeout(() => {
      notification.remove();
    }, 10000);
  };

  // Show the notification
  showNotification();
}