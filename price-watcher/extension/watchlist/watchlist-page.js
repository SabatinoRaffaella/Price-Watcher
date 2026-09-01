const watchlistElement =
    document.getElementById("watchlist");

const emptyState =
    document.getElementById("emptyState");

const refreshButton =
    document.getElementById("refreshButton");


async function renderWatchlist() {
    const watchlist = await getWatchlist();

    watchlistElement.innerHTML = "";

    if (watchlist.length === 0) {
        emptyState.classList.remove("hidden");
        return;
    }

    emptyState.classList.add("hidden");

    for (const item of watchlist) {
        const element = createWatchlistItem(item);

        watchlistElement.appendChild(element);
    }
}


function createWatchlistItem(item) {
    const element = document.createElement("article");

    element.className = "watch-item";


    const content = document.createElement("div");

    const name = document.createElement("h2");

    name.className = "product-name";

    name.textContent =
        item.name ?? "Prodotto senza nome";


    const url = document.createElement("div");

    url.className = "product-url";

    url.textContent = item.site ?? "";


    const info = document.createElement("div");

    info.className = "product-info";

    const image = document.createElement("img");

    image.className = "product-thumbnail";
    image.src = item.imageUrl ?? "";
    image.alt = item.name ?? "Prodotto";

    content.appendChild(image);
    
    const priceBlock =
        createInfoBlock(
            "Prezzo",
            formatPrice(item.currentPrice)
        );


    const discountBlock =
        createInfoBlock(
            "Sconto",
            formatDiscount(item.currentDiscount),
            "discount"
        );


    info.appendChild(priceBlock);

    info.appendChild(discountBlock);


    const targetControl =
        document.createElement("div");

    targetControl.className = "target-control";


    const targetLabel =
        document.createElement("label");

    targetLabel.textContent =
        "Avvisa dal:";


    const targetInput =
        document.createElement("input");

    targetInput.type = "number";

    targetInput.min = "1";

    targetInput.max = "100";

    targetInput.value =
        item.targetDiscount;


    const percent =
        document.createTextNode("%");


    const saveButton =
        document.createElement("button");

    saveButton.textContent =
        "💾 Salva";


    saveButton.addEventListener(
        "click",
        async () => {

            const value =
                Number(targetInput.value);

            if (
                !Number.isFinite(value) ||
                value < 1 ||
                value > 100
            ) {
                return;
            }

            await updateWatchlistItem(
                item.url,
                {
                    targetDiscount: value
                }
            );

            saveButton.textContent =
                "✅ Salvato";

            setTimeout(() => {
                saveButton.textContent =
                    "💾 Salva";
            }, 1200);
        }
    );


    targetControl.appendChild(targetLabel);

    targetControl.appendChild(targetInput);

    targetControl.appendChild(percent);

    targetControl.appendChild(saveButton);


    content.appendChild(name);

    content.appendChild(url);

    content.appendChild(info);

    content.appendChild(image);

    content.appendChild(targetControl);


    const actions =
        document.createElement("div");

    actions.className = "actions";


    const openButton =
        document.createElement("button");

    openButton.textContent =
        "↗ Amazon";


    openButton.addEventListener(
        "click",
        () => {
            chrome.tabs.create({
                url: item.url
            });
        }
    );


    const deleteButton =
        document.createElement("button");

    deleteButton.className =
        "danger";

    deleteButton.textContent =
        "🗑 Rimuovi";


    deleteButton.addEventListener(
        "click",
        async () => {

            const confirmed =
                confirm(
                    `Rimuovere "${item.name}" dalla watchlist?`
                );

            if (!confirmed) {
                return;
            }

            await removeFromWatchlist(
                item.url
            );

            await renderWatchlist();
        }
    );


    actions.appendChild(openButton);

    actions.appendChild(deleteButton);


    element.appendChild(content);

    element.appendChild(actions);


    return element;
}


function createInfoBlock(
    label,
    value,
    className = ""
) {
    const block =
        document.createElement("div");

    block.className =
        "info-block";


    const labelElement =
        document.createElement("span");

    labelElement.className =
        "info-label";

    labelElement.textContent =
        label;


    const valueElement =
        document.createElement("span");

    valueElement.className =
        `info-value ${className}`;

    valueElement.textContent =
        value;


    block.appendChild(labelElement);

    block.appendChild(valueElement);


    return block;
}


function formatPrice(price) {
    if (price == null) {
        return "N/D";
    }

    return new Intl.NumberFormat(
        "it-IT",
        {
            style: "currency",
            currency: "EUR"
        }
    ).format(price);
}


function formatDiscount(discount) {
    if (discount == null) {
        return "N/D";
    }

    return `-${discount}%`;
}


refreshButton.addEventListener(
    "click",
    renderWatchlist
);


renderWatchlist();