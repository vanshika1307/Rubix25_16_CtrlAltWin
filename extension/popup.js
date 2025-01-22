document.getElementById('analyze-btn').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'getCart' }, response => {
      const resultsList = document.getElementById('results');
      resultsList.innerHTML = ''; 
      if (response && response.length > 0) {
        response.forEach(item => {
          const li = document.createElement('li');
          li.textContent = `Name: ${item.name}, Price: ${item.price}, Score: ${item.score}`;
          resultsList.appendChild(li);
        });
      } else {
        const li = document.createElement('li');
        li.textContent = 'No sustainability scores available.';
        resultsList.appendChild(li);
      }
    });
  });
});
