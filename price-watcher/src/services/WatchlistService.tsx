import { Watchlist } from "../models/Watchlist";
import { ExtensionBridge } from "../services/ExtensionBridge";

export class WatchlistService {

  private bridge = new ExtensionBridge();

  async getWatchlist(): Promise<Watchlist> {
    const data = await this.bridge.getWatchlist();

    // trasformiamo i dati ricevuti in una Watchlist
    return new Watchlist(data);
  }

  async saveWatchlist(watchlist: Watchlist): Promise<void> {
    await this.bridge.saveWatchlist(watchlist);
  }
}