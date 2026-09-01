import "./SideWatchlist.css";
import type { Watchlist } from "../../models/Watchlist";
import type { Product } from "../../models/Product";

type Props = {
  watchlist: Watchlist | undefined;
  selectedProduct: Product | null;
  onSelectProduct: (product: Product) => void;
};

function SideWatchlist({
  watchlist,
  selectedProduct,
  onSelectProduct,
}: Props) {
  if (!watchlist) {
    return (
      <div className="sidebar">
        <span>Loading...</span>
      </div>
    );
  }

  if (watchlist.getSize() === 0) {
    return (
      <div className="sidebar">
        <span>Your watchlist is empty.</span>
      </div>
    );
  }

  return (
    <div className="sidebar">
      {watchlist.getAll().map((product) => (
        <div
          className={`watchlist-item ${
            selectedProduct?.id === product.id ? "selected" : ""
          }`}
          key={product.id}
          onClick={() => onSelectProduct(product)}
        >
          <span>{product.name}</span>
          <span>{product.currentPrice} €</span>
        </div>
      ))}
    </div>
  );
}

export default SideWatchlist;