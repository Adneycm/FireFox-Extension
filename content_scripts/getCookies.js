document.addEventListener("DOMContentLoaded",  function() {
    function getCookies() {
        var contagemCookies = {};

        var todosCookies = Cookies.get();

        for (var cookieNome in todosCookies) {
            var categoria = cookieNome.split('_')[0];

            if (contagemCookies[categoria] === undefined) {
                contagemCookies[categoria] = 1;
            } else {
                contagemCookies[categoria]++;
            }
        }

        for (var categoria in contagemCookies) {
            console.log('Categoria: ' + categoria + ', Quantidade: ' + contagemCookies[categoria]);
        }
    }

    getCookies();
    });


    function getCookiesInfo() {
    const cookies = document.cookie.split('; ').reduce((cookies, cookie) => {
        const [name, value] = cookie.split('=').map(c => c.trim());
        cookies[name] = value;
        return cookies;
    }, {});

    const cookieCount = Object.keys(cookies).length;
    const cookieList = Object.entries(cookies).map(([name, value]) => `${name}: ${value}`).join('\n');

    const cookiesText = cookieCount === 1 ? 'cookie' : 'cookies';

    return `Found ${cookieCount} ${cookiesText}. You can see each one below:\n${cookieList}`;
}