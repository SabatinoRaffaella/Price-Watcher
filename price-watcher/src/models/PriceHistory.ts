export type PriceRecord = {
  price: number;
  date: number;
};

export class PriceHistory {
  private readonly productId: string;
  private records: PriceRecord[] = [];
  private minPrice: PriceRecord | null = null;

  constructor(productId: string) {
    this.productId = productId;
  }

  add(price: number, date = Date.now()) {
    const last = this.records[this.records.length - 1];

    // Nessuna variazione → non registrare nulla
    if (last?.price === price) {
      return;
    }

    const record: PriceRecord = {
      price,
      date,
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
}