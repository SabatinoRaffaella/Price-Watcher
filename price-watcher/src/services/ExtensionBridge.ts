import type { Watchlist } from "../models/Watchlist";

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
}