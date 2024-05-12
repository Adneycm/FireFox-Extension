browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.request === "gatherData") {
        const data = {
        thirdPartyRequests: getThirdPartyDomains(),
        cookiesCount: getCookies(),
        localStorageItems: getLocalStorage(),
        sessionStorageItems: getSessionStorageItems(),
        grade: calculateGrade(),
        hijacking: calculateHijackingRisk()
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
  
  function getLocalStorage() {
    return Object.keys(localStorage).length;
  }

  function getSessionStorageItems() {
    const sessionStorageCount = Object.keys(sessionStorage).length;
    return sessionStorageCount;
}

function calculateHijackingRisk() {
    var risk = 0;

    // Check if the website uses HTTPS
    if (window.location.protocol === 'https:') {
        risk += 2; // HTTPS reduces risk
    } else {
        risk += 5; // HTTP increases risk
    }

    // Check if cookies are marked as Secure
    var cookies = document.cookie.split(';');
    cookies.forEach(function(cookie) {
        var cookieParts = cookie.trim().split('=');
        var cookieName = cookieParts[0];
        var cookieAttributes = cookieParts.slice(1).join('=');

        if (cookieAttributes.toLowerCase().includes('secure')) {
            risk -= 1; // Secure flag reduces risk
        }
    });

    // Check if session identifiers are secure
    // This is a simplified example, actual checks should be more comprehensive
    if (document.cookie.includes('sessionid=')) {
        risk += 3; // Presence of a session identifier increases risk
    }

    return risk;
}


  function calculateGrade() {
    var cookieCount = getCookies()
    var thirdPartyRequests = getThirdPartyDomains()
    var localStorageItems = getLocalStorage() + getSessionStorageItems()
    var hijacking = calculateHijackingRisk()

    var cookieWeight = 0.4;
    var thirdPartyWeight = 0.3;
    var localStorageWeight = 0.3;
    var hijackingWeight = 0.5;

    var normalizedCookieCount = cookieCount / 100;
    var normalizedThirdPartyRequests = thirdPartyRequests / 100;
    var normalizedLocalStorageItems = localStorageItems / 100;
    var normalizedhijacking = localStorageItems / 100;

    var weightedSum = (normalizedCookieCount * cookieWeight) +
                      (normalizedThirdPartyRequests * thirdPartyWeight) +
                      (normalizedLocalStorageItems * localStorageWeight) + 
                      (normalizedhijacking * hijackingWeight);

    var grade = weightedSum * 10;

    grade = 10 - grade;
    if (grade < 0) {
        grade = 0
    }

    return grade.toFixed(1);
}

  browser.runtime.sendMessage({
    request: "getData",
    cookiesCount: getCookies(),
    thirdPartyRequests: getThirdPartyDomains(),
    localStorageItems: getLocalStorage(),
    sessionStorageItems: getSessionStorageItems(),
    hijacking: calculateHijackingRisk(),
    grade: calculateGrade()
  });
  