import { useEffect, useState } from "react";
import "../Dashboard/Dashboard.css";

import { WatchlistService } from "../../services/WatchlistService";
import SideWatchlist from "../SideWatchlist/SideWatchlist";
import type { Watchlist } from "../../models/Watchlist";
import type { Product } from "../../models/Product";
import ProductDetails from "../ProductDetails/ProductDetails";

function Dashboard() {
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);
  const [watchlist, setWatchlist] = useState<Watchlist>();

  useEffect(() => {
    const service = new WatchlistService();

    service.getWatchlist().then(setWatchlist);
  }, []);

  return (
    <div className="layout">
      <SideWatchlist
        watchlist={watchlist}
        selectedProduct={selectedProduct}
        onSelectProduct={setSelectedProduct}
      />

      <main className="content">
          <ProductDetails product={selectedProduct} />
      </main>
    </div>
  );
}

export default Dashboard;