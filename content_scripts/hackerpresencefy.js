// Assign beastify() as a listener for messages from the extension.
chrome.runtime.onMessage.addListener(beastify);

function beastify(request, sender, sendResponse) {
  removeEverything();
  insertBeast(beastNameToURL(request.hackerCheck));
  chrome.runtime.onMessage.removeListener(beastify);
}

function removeEverything() {
  while (document.body.firstChild) {
    document.body.firstChild.remove();
  }
}

function insertBeast(beastText) {
    var newText = document.createElement("div");
    newText.innerHTML = beastText;
    document.body.appendChild(newText);
  }
  

function beastNameToURL(beastName) {
  switch (beastName) {
    case "Cookies & Supercookies":
      //return document.cookie.split('; ').join('\n\n\n');
      const cookies = document.cookie.split('; ').reduce((cookies, cookie) => {
        const [name, value] = cookie.split('=').map(c => c.trim());
        cookies[name] = value;
        return cookies;
      }, {});

      const cookieCount = Object.keys(cookies).length;
      const cookieList = Object.entries(cookies).map(([name, value]) => `${name}: ${value}`).join('\n');

      const cookiesText = cookieCount === 1 ? 'cookie' : 'cookies';

      return `
        <p>Found ${cookieCount} ${cookiesText}.</p>
        <p>You can see each one below: ${cookieList}</p>`;
    
    case "Hijacking & Hooks":
      return "Hijacking & Hooks"
    case "Local Storage (HTML5)":
      return "Local Storage (HTML5)";
    case "Third Party Domains":
        return "Third Party Domains";
  }
}