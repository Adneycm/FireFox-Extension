document.addEventListener("click", function (e) {
  if (!e.target.classList.contains("hackerpresence-button")) {
    return;
  }
  console.log("pass return function listener!");


  var hacker = e.target.textContent;
  console.log(hacker);

  chrome.tabs.executeScript(null, {
    file: "/content_scripts/hackerpresencefy.js",
  });

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { hackerpresence: hacker });
  });
});
