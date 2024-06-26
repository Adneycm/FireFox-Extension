document.addEventListener('DOMContentLoaded', function() {
  browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
      const currentTab = tabs[0];
      browser.runtime.sendMessage({request: "getData", tabId: currentTab.id}).then(updatePopup);
  });

  function updatePopup(response) {
      document.getElementById('third_party').textContent = `Third Party Requests: ${response.thirdPartyRequests}`;
      document.getElementById('cookies').textContent = `Cookies: ${response.cookiesCount}`;
      document.getElementById('local_storage').textContent = `Local Storage Items: ${response.localStorageItems}\nSession Storage Items: ${response.sessionStorageItems} `;
      document.getElementById('hijacking').textContent = `Hijacking risk: ${response.hijacking}`;
      document.getElementById('grade').textContent = `${response.grade}`;
  }
});


