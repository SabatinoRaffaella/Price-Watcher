import { useEffect, useState } from "react";
import { WatchlistService } from "../../services/WatchlistService";
import SideWatchlist from "../SideWatchlist/SideWatchlist";
import type { Watchlist } from "../../models/Watchlist";

function Dashboard() {
  const [watchlist, setWatchlist] = useState<Watchlist>();

  useEffect(() => {
    const service = new WatchlistService();

    service.getWatchlist().then(setWatchlist);
  }, []);

  return (
    <div className="dashboard">
      <SideWatchlist watchlist={watchlist} />

      {/* altri componenti della dashboard */}
    </div>
  );
}

export default Dashboard;