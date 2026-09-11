import type { Watchlist } from "../models/Watchlist";
import type { PriceHistory } from "../models/PriceHistory";

export class ExtensionBridge {

  async getWatchlist() {
    return chrome.runtime.sendMessage({
      type: "GET_WATCHLIST"
    });
  }

  async saveWatchlist(watchlist: Watchlist) {
    return chrome.runtime.sendMessage({
      type: "SAVE_WATCHLIST",
      watchlist
    });
  }

  async getPriceHistory(productId: string) {
    const result = chrome.runtime.sendMessage({
      type: "GET_PRICE_HISTORY",
      productId
    });
    console.log("Price history received:", result);
    return result;
  }

  async savePriceHistory(history: PriceHistory) {
    return chrome.runtime.sendMessage({
      type: "SAVE_PRICE_HISTORY",
      history: history.toJSON()
    });
  }

  async removePriceHistory(productId: string) {
    return chrome.runtime.sendMessage({
      type: "REMOVE_PRICE_HISTORY",
      productId
    });
  }
}