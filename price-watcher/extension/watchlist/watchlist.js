const DEFAULT_TARGET_DISCOUNT = 20;
const NOTIFICATION_COOLDOWN = 24 * 60 * 60 * 1000;
const NOTIFICATION_STEP = 10;


/**
 * Restituisce la watchlist salvata.
 */
async function getWatchlist() {
    const result = await chrome.storage.local.get("watchlist");

    return result.watchlist ?? [];
}

async function isInWatchlist(url) {
    const result = await chrome.storage.local.get("watchlist");

    const watchlist = result.watchlist ?? [];

    return watchlist.some(
        item => item.url === url
    );
}

/**
 * Salva la watchlist.
 */
async function saveWatchlist(watchlist) {
    await chrome.storage.local.set({
        watchlist
    });
}


/**
 * Aggiunge un prodotto alla watchlist.
 *
 * product deve avere almeno:
 * {
 *   name,
 *   price,
 *   discountPercentage,
 *   currency,
 *   url,
 *   site
 * }
 */
async function addToWatchlist(
    product,
    targetDiscount = DEFAULT_TARGET_DISCOUNT
) {
    const watchlist = await getWatchlist();

    const existingIndex = watchlist.findIndex(
        item => item.url === product.url
    );

    const item = {
        url: product.url,
        name: product.name,
        site: product.site,

        currentPrice: product.price,
        currentDiscount: product.discountPercentage,

        targetDiscount,

        // Ultima soglia significativa che ha generato una notifica.
        // 0 significa "nessuna notifica ancora".
        lastNotifiedThreshold: 0,

        // Timestamp dell'ultima notifica.
        lastNotification: null
    };

    if (existingIndex >= 0) {
        watchlist[existingIndex] = {
            ...watchlist[existingIndex],
            ...item
        };
    } else {
        watchlist.push(item);
    }

    await saveWatchlist(watchlist);

    return item;
}


/**
 * Rimuove un prodotto dalla watchlist.
 */
async function removeFromWatchlist(url) {
    const watchlist = await getWatchlist();

    const newWatchlist = watchlist.filter(
        item => item.url !== url
    );

    await saveWatchlist(newWatchlist);
}


/**
 * Calcola quale soglia significativa è stata raggiunta.
 *
 * Esempio con target 20:
 *
 * 19 -> null
 * 20 -> 20
 * 21 -> 20
 * 29 -> 20
 * 30 -> 30
 * 39 -> 30
 * 40 -> 40
 */
function getReachedThreshold(discount, targetDiscount) {
    if (discount == null || discount < targetDiscount) {
        return null;
    }

    const difference = discount - targetDiscount;

    return (
        targetDiscount +
        Math.floor(difference / NOTIFICATION_STEP) *
            NOTIFICATION_STEP
    );
}


/**
 * Determina se dobbiamo mandare una notifica.
 */
function shouldNotify(item, currentDiscount) {
    if (currentDiscount == null) {
        return false;
    }

    const threshold = getReachedThreshold(
        currentDiscount,
        item.targetDiscount
    );

    // Sotto la soglia: non notificare.
    if (threshold === null) {
        return false;
    }

    // Abbiamo già notificato per questa soglia.
    if (threshold <= item.lastNotifiedThreshold) {
        return false;
    }

    // Protezione aggiuntiva contro notifiche ravvicinate.
    if (
        item.lastNotification &&
        Date.now() - item.lastNotification <
            NOTIFICATION_COOLDOWN
    ) {
        return false;
    }

    return true;
}


/**
 * Aggiorna un prodotto con le informazioni appena lette dalla pagina.
 */
async function updateWatchedProduct(product) {
    const watchlist = await getWatchlist();

    const index = watchlist.findIndex(
        item => item.url === product.url
    );

    if (index === -1) {
        return;
    }

    const item = watchlist[index];

    const currentDiscount = product.discountPercentage;

    item.currentPrice = product.price;
    item.currentDiscount = currentDiscount;
    item.name = product.name ?? item.name;

    if (shouldNotify(item, currentDiscount)) {
        const threshold = getReachedThreshold(
            currentDiscount,
            item.targetDiscount
        );

        await notifyPriceDrop(
            product,
            threshold
        );

        item.lastNotifiedThreshold = threshold;
        item.lastNotification = Date.now();
    }

    await saveWatchlist(watchlist);

    return item;
}


/**
 * Crea la notifica desktop.
 */
async function notifyPriceDrop(product, threshold) {
    await chrome.notifications.create(
        `price-drop-${Date.now()}`,
        {
            type: "basic",
            iconUrl: "icons/icon128.png",
            title: "💰 Price Watcher",
            message:
                `${product.name ?? "Prodotto"} ` +
                `ha raggiunto uno sconto del ${threshold}%!\n` +
                `Prezzo: ${product.price.toFixed(2)} €`,
            priority: 1
        }
    );
}