export async function getPriceHistory(productId) {
    const result = await chrome.storage.local.get("priceHistory");

    const priceHistory = result.priceHistory ?? {};

    return priceHistory[productId] ?? [];
}

export async function recordPrice(productId, price) {
    const result = await chrome.storage.local.get("priceHistory");

    const priceHistory = result.priceHistory ?? {};

    const history = priceHistory[productId] ?? [];

    history.push({
        price,
        timestamp: Date.now()
    });

    priceHistory[productId] = history;

    await chrome.storage.local.set({
        priceHistory
    });
}