const productElement = document.getElementById("product");
const refreshButton = document.getElementById("refresh");
const watchlistButton = document.getElementById("watchlistButton");

let currentProduct = null;

async function sendMessageToContent(tabId, message, retries = 10) {
    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            return await chrome.tabs.sendMessage(tabId, message);
        } catch (error) {
            if (
                error.message.includes(
                    "Receiving end does not exist"
                )
            ) {
                await new Promise(resolve =>
                    setTimeout(resolve, 100)
                );

                continue;
            }

            throw error;
        }
    }

    throw new Error(
        "Il content script non è diventato disponibile."
    );
}


async function getCurrentProduct() {
    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    if (!tab?.id) {
        return null;
    }

    try {
        const product = await sendMessageToContent(
            tab.id,
            {
                type: "GET_PRODUCT_INFORMATION"
            }
        );

        return product;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function updateProduct() {
    productElement.innerHTML =
        "<p>Caricamento...</p>";

    currentProduct = await getCurrentProduct();

    if (!currentProduct) {
        productElement.innerHTML =
            "<p>Prodotto non trovato.</p>";

        watchlistButton.disabled = true;
        return;
    }

    productElement.innerHTML = `
        <h3>${currentProduct.name ?? "Prodotto senza nome"}</h3>
        <p>
            <strong>
                ${currentProduct.price.toFixed(2)} €
            </strong>
        </p>
        <p>
            Sconto:
            ${currentProduct.discountPercentage != null
                ? `-${currentProduct.discountPercentage}%`
                : "N/D"}
        </p>
    `;

    watchlistButton.disabled = false;

    const watched = await isInWatchlist(
        currentProduct.url
    );

    watchlistButton.textContent = watched
        ? "✅ Nella watchlist"
        : "⭐ Aggiungi alla watchlist";
}

refreshButton.addEventListener(
    "click",
    updateProduct
);

document
    .getElementById("openWatchlist")
    .addEventListener("click", () => {
        chrome.tabs.create({
            url: chrome.runtime.getURL(
                "watchlist/watchlist.html"
            )
        });
    });

watchlistButton.addEventListener(
    "click",
    async () => {
        if (!currentProduct) {
            return;
        }

        await addToWatchlist(currentProduct, 20);

        watchlistButton.textContent =
            "✅ Nella watchlist";
    }
);

updateProduct();