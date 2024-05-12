browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.request === "getData") {
    browser.tabs.sendMessage(message.tabId, {request: "gatherData"}).then(sendResponse);
    return true; // Indicates that sendResponse will be called asynchronously
  }
});

