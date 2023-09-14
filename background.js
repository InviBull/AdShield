const adSelectors = [
    'div[id^="ads"]',
    'div[class^="ads"]',

    'div[id*="adsbygoogle"]',
    'div[class*="adsbygoogle"]',

    'ins[id*="adsbygoogle"]',
    'ins[class*="adsbygoogle"]',

    '[aria-label^="Ad"]'
];


const adBlocker = new MutationObserver(() => {
    currUrl = window.location.href;

    chrome.storage.sync.get({ whitelist: [] }, function (data) {
        const whitelist = data.whitelist;
        blockAds = true;
        whitelist.forEach((url) => {
            if (currUrl.startsWith(url)) {
                blockAds = false;
            }
        });

        if (!blockAds) return;

        adSelectors.forEach((selector) => {
            const adElements = document.querySelectorAll(selector);
            adElements.forEach((element) => {
                element.style.display = 'none';
            });
        });
    });

});

adBlocker.observe(document.body, {
    childList: true,
    subtree: true,
});