import "./SideWatchlist.css";
import type { Watchlist } from "../../models/Watchlist";

type Props = {
  watchlist: Watchlist | undefined;
};

function SideWatchlist({ watchlist }: Props) {
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
        <div className="watchlist-item" key={product.id}>
          <span>{product.name}</span>
          <span>{product.currentPrice} €</span>
        </div>
      ))}
    </div>
  );
}

export default SideWatchlist;