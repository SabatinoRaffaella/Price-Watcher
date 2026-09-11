import { PriceHistory, type PriceRecord } from "../models/PriceHistory";
import { ExtensionBridge } from "./ExtensionBridge";

export class PriceHistoryService {

  private bridge = new ExtensionBridge();

  async get(productId: string): Promise<PriceHistory | null> {
    const data = await this.bridge.getPriceHistory(productId);

    if (!data) {
      return null;
    }

    return PriceHistory.fromJSON(data);
  }
  
  async recordPrice(
    productId: string,
    price: number
  ): Promise<boolean> {

    const history =
      await this.get(productId)
      ?? new PriceHistory(productId);

    const changed = history.add(price);

    if (changed) {
      await this.bridge.savePriceHistory(history);
    }

    return changed;
  }
  async getRecords(productId: string): Promise<PriceRecord[]> {
    const history = await this.get(productId);

    return history?.getRecords() ?? [];
  }
  async remove(productId: string): Promise<void> {
    await this.bridge.removePriceHistory(productId);
  }
}