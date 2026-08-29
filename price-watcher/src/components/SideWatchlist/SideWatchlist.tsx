import "./SideWatchlist.css";
import type { Watchlist } from "../../models/Watchlist";

type Props = {
  watchlist: Watchlist;
};

function SideWatchlist({ watchlist }: Props) {
  return (
    <div className="sidebar">
      {watchlist.getAll().map((product) => (
        <div className="watchlist-item" key={product.id}>
          <span>{product.name}</span>
          <span>{product.currentPrice} €</span>
        </div>
      ))}
    </div>
  );
}

export default SideWatchlist;