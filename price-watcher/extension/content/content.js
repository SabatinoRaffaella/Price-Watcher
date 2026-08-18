chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("📩 Messaggio ricevuto:", message);

    if (message.type === "GET_PRODUCT_INFORMATION") {
        console.log("🔎 Chiamo getProductInformations()...");

        const product = getProductInformations();

        console.log("📦 Risultato parser:", product);

        sendResponse(product);
    }
});

const product = getProductInformations();

console.log(product);