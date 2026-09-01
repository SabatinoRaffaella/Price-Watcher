var amazonParser = {
    matches(hostname) {
        return hostname.includes("amazon.");
    },

   getProductInformations() {
    console.log("🟠 AMAZON PARSER CHIAMATO");
    const whole = document.querySelector(".a-price-whole");
    const decimal = document.querySelector(".a-price-decimal");

    if (!whole || !decimal) {
        return null;
    }

    const wholeText = whole.textContent.trim().replace(/\D/g, "");
    const decimalText = decimal.textContent.trim().replace(/\D/g, "");

    const price = Number(`${wholeText}.${decimalText}`);
    const image = document.querySelector("#landingImage");

    return {
        name: findProductName(),
		price,
		discountPercentage: findDiscountPercentage(),
		currency: "EUR",
		url: window.location.href,
		site: window.location.hostname,
        imageUrl: image?.src ?? null 
    };
	}
};

function findDiscountPercentage() {
    const element = document.querySelector(
        ".apex-savings-percentage"
    );

    if (!element) {
        return null;
    }

    const text = element.textContent.trim();

    const match = text.match(/(\d+(?:[.,]\d+)?)\s*%/);

    if (!match) {
        return null;
    }

    return Number(match[1].replace(",", "."));
}