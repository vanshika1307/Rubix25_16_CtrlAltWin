function truncateName(name, charLimit = 30) {
  if (name.length <= charLimit) {
    return name; // If the name is already shorter than the character limit, return it as is
  }
  const truncated = name.slice(0, charLimit) + "..."; // Truncate and add ellipses
  return truncated;
}

document.getElementById("analyze-btn").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "getCart" }, (response) => {
      const resultsList = document.getElementById("results");
      resultsList.innerHTML = "";
      if (response && response.length > 0) {
        response.forEach((item) => {
          const li = document.createElement("li");
          li.textContent = `Name: ${truncateName(item.name)}, Score: ${item.score}`;
          resultsList.appendChild(li);
        });
      } else {
        const li = document.createElement("li");
        li.textContent = "No sustainability scores available.";
        resultsList.appendChild(li);
      }
    });
  });
});
