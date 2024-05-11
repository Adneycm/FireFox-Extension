// Assign hackerpresencefy() as a listener for messages from the extension.
chrome.runtime.onMessage.addListener(hackerpresencefy);

function hackerpresencefy(request, sender, sendResponse) {
  removeEverything();
  insertBeast(beastNameToURL(request.hackerCheck));
  chrome.runtime.onMessage.removeListener(hackerpresencefy);
}

function removeEverything() {
  // while (document.body.firstChild) {
  //   document.body.firstChild.remove();
  // }

  while (document.body.getElementById('cookies')) {
    document.body.getElementById('cookies').remove();
  }

}

function insertBeast(beastURL) {
  var div = document.createElement('div');
  var textNode = document.createTextNode('Hello, world!');
  div.appendChild(textNode);
  document.getElementById('cookies').appendChild(div);

  document.body.appendChild(div);
}

function beastNameToURL(beastName) {
  switch (beastName) {
    case "Cookies & Supercookies":
      return chrome.extension.getURL("button/HackerPresenceIcon.png");

  }
}
