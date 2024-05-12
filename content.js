browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.request === "gatherData") {
        const data = {
        thirdPartyRequests: getThirdPartyDomains(),
        cookiesCount: getCookies(),
        localStorageItems: getLocalStorage(),
        sessionStorageItems: 2 // You can add logic to get sessionStorage items if needed
        };
        sendResponse(data);
    }
});

function getCookies() {
    const cookies = document.cookie.split('; ').reduce((cookies, cookie) => {
      const [name, value] = cookie.split('=').map(c => c.trim());
      cookies[name] = value;
      return cookies;
    }, {});
  
    return Object.keys(cookies).length;
  }
  
  // Extract third-party domains count
  function extractDomain(url) {
    var domain;
    if (url.indexOf("://") > -1) {
      domain = url.split('/')[2];
    } else {
      domain = url.split('/')[0];
    }
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
    return thirdPartyDomains.length;
  }
  
  // Extract local storage count
  function getLocalStorage() {
    return Object.keys(localStorage).length;
  }
  
  // Send extracted data to background script
  browser.runtime.sendMessage({
    request: "getData",
    cookiesCount: getCookies(),
    thirdPartyRequests: getThirdPartyDomains(),
    localStorageItems: getLocalStorage()
  });
  