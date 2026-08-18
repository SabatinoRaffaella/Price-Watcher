const parsers = [
    amazonParser
];

function findProductName() {
    const selectors = [
        "#productTitleGroupAnchor",
        "#productTitle",
        "#title",
        "h1[data-feature-name='title']",
        "h1"
    ];

    for (const selector of selectors) {
        const element = document.querySelector(selector);

        if (element) {
            const name = element.textContent.trim();

            if (name.length > 0) {
                return name;
            }
        }
    }

    return null;
}

function getProductInformations() {
    const parser = parsers.find(
        parser => parser.matches(window.location.hostname)
    );

    return parser
        ? parser.getProductInformations()
        : null;
}

console.log("🟢 parser-manager caricato");
console.log("getProductInformations:", typeof getProductInformations);