export type PriceRecord = {
  price: number;
  timestamp: number;
};

export class PriceHistory {
  private readonly productId: string;
  private records: PriceRecord[] = [];
  private minPrice: PriceRecord | null = null;

  constructor(productId: string) {
    this.productId = productId;
  }

  add(price: number, timestamp = Date.now()) {
    const last = this.records[this.records.length - 1];

    // Nessuna variazione → non registrare nulla
    if (last?.price === price) {
      return false;
    }

    const record: PriceRecord = {
      price,
      timestamp,
    };

    this.records.push(record);

    // Aggiorna il minimo assoluto
    if (!this.minPrice || price < this.minPrice.price) {
      this.minPrice = record;
    }

    // Mantieni solo le ultime 4 variazioni
    if (this.records.length > 4) {
      this.records.shift();
    }
    return true;
  }

  get id() {
    return this.productId;
  }

  get recent() {
    return [...this.records];
  }

  get minimum() {
    return this.minPrice;
  }

  getRecords() {
    return this.records;
  }

  get length(){
    return this.records.length;
  }

  toJSON() {
    return {
      productId: this.productId,
      records: this.records,
      minPrice: this.minPrice
    };
  }

  static fromJSON(data: {
    productId: string;
    records: PriceRecord[];
    minPrice: PriceRecord | null;
  }): PriceHistory {

    const history = new PriceHistory(data.productId);

    history.records = [...data.records];
    history.minPrice = data.minPrice;

    return history;
  }

  
}