import type { Watchlist } from "../models/Watchlist";

export class WatchlistService {

  async getWatchlist(): Promise<Watchlist> {
    const response = await chrome.runtime.sendMessage({
      type: "GET_WATCHLIST"
    });

    return response.watchlist;
  }

  async saveWatchlist(watchlist: Watchlist): Promise<void> {
    await chrome.runtime.sendMessage({
      type: "SAVE_WATCHLIST",
      watchlist
    });
  }
}

