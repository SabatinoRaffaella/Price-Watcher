import { useEffect, useState } from "react";
import "../Dashboard/Dashboard.css";

import { WatchlistService } from "../../services/WatchlistService";
import SideWatchlist from "../SideWatchlist/SideWatchlist";
import type { Watchlist } from "../../models/Watchlist";
import type { Product } from "../../models/Product";
import ProductDetails from "../ProductDetails/ProductDetails";
import { PriceHistory } from "../../models/PriceHistory";
import { PriceHistoryService } from "../../services/PriceHistoryService";

function Dashboard() {
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [watchlist, setWatchlist] = useState<Watchlist>();

  const [priceHistory, setPriceHistory] =
    useState<PriceHistory | null>(null);

  useEffect(() => {
    const service = new WatchlistService();

    service.getWatchlist().then(setWatchlist);
  }, []);

  useEffect(() => {
    if (!selectedProduct) {
      setPriceHistory(null);
      return;
    }

    const service = new PriceHistoryService();

    service.get(selectedProduct.id).then(setPriceHistory);
  }, [selectedProduct]);

  return (
    <div className="layout">
      <SideWatchlist
        watchlist={watchlist}
        selectedProduct={selectedProduct}
        onSelectProduct={setSelectedProduct}
      />

      <main className="content">
        <ProductDetails
          product={selectedProduct}
          priceHistory={priceHistory}
        />
      </main>
    </div>
  );
}

export default Dashboard;