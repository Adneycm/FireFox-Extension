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
      return getCookies()    
    case "Hijacking & Hooks":
      return "Hijacking & Hooks"
    case "Local Storage (HTML5)":
      return getLocalStorage()
    case "Third Party Domains":
        return getThirdPartyDomains()
  }
}


function getCookies() {
  const cookies = document.cookie.split('; ').reduce((cookies, cookie) => {
    const [name, value] = cookie.split('=').map(c => c.trim());
    cookies[name] = value;
    return cookies;
  }, {});

  const cookieCount = Object.keys(cookies).length;
  const cookieList = Object.entries(cookies).map(([name, value]) => `${name}: ${value}`).join('<br>');

  const cookiesText = cookieCount === 1 ? 'cookie' : 'cookies';

  return `
    <p>Found ${cookieCount} ${cookiesText}.</p>
    <p>You can see each one below:<br> ${cookieList}</p>`;
}



function extractDomain(url) {
  var domain;
  // find & remove protocol (http, ftp, etc.) and get domain
  if (url.indexOf("://") > -1) {
      domain = url.split('/')[2];
  } else {
      domain = url.split('/')[0];
  }
  // find & remove port number
  domain = domain.split(':')[0];
  return domain;
}

function getThirdPartyDomains() {
  var thirdPartyDomains = [];
  var allElements = document.getElementsByTagName('*');
  for (var i = 0; i < allElements.length; i++) {
      var element = allElements[i];
      if (element.tagName === 'SCRIPT' || element.tagName === 'IMG' || element.tagName === 'IFRAME') {
          var src = element.src || element.href;
          if (src) {
              var domain = extractDomain(src);
              if (domain && domain !== window.location.hostname) {
                  if (thirdPartyDomains.indexOf(domain) === -1) {
                      thirdPartyDomains.push(domain);
                  }
              }
          }
      }
  }
  // return thirdPartyDomains.join(', '); // Return as a comma-separated string
  return  `
  <p>Found ${thirdPartyDomains.length} Third Party Domains.</p>
  <p>You can see each one below:<br> ${thirdPartyDomains.join(', ')}</p>`;
}


function getLocalStorage() {
  const localStorageCount = Object.keys(localStorage).length;
  let localStorageEntries = "";

  for (let key in localStorage) {
    const value = localStorage[key];
    let formattedValue = value;

    // Se o valor for uma string JSON, analise-o e formate-o
    try {
      const parsedValue = JSON.parse(value);
      formattedValue = JSON.stringify(parsedValue, null, 2);
    } catch (error) {
      // Se não for possível analisar como JSON, mantenha o valor original
    }

    localStorageEntries += `${key}: "${formattedValue}"<br>`;
  }

  return `
    <p>Found ${localStorageCount} Local Storage entries.</p>
    <p>You can see each one below:<br> ${localStorageEntries}</p>`;
}