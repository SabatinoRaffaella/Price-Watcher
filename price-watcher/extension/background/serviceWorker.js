chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_WATCHLIST") {
    chrome.storage.local.get("watchlist").then((result) => {
      sendResponse(result.watchlist ?? []);
    });
  }

  return true;
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.type === "GET_PRICE_HISTORY") {

        const { productId } = message;

        chrome.storage.local.get("priceHistory").then((result) => {

            const priceHistory = result.priceHistory ?? {};
            const records = priceHistory[productId] ?? [];

            sendResponse({
                productId,
                records,
                minPrice: records.length > 0
                    ? Math.min(...records.map(r => r.price))
                    : null
            });
        });
    }

    return true;
});

chrome.sidePanel.setPanelBehavior({
  openPanelOnActionClick: true
});