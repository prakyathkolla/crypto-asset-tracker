import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { PriceChart } from "@/components/PriceChart";
import { formatCurrency } from "@/lib/utils";

const AssetDetail = () => {
  const { id } = useParams();

  const { data: asset, isLoading: isLoadingAsset } = useQuery({
    queryKey: ["asset", id],
    queryFn: async () => {
      const response = await fetch(`https://api.coincap.io/v2/assets/${id}`);
      const data = await response.json();
      return data.data;
    },
    refetchInterval: 30000,
  });

  const { data: history, isLoading: isLoadingHistory } = useQuery({
    queryKey: ["history", id],
    queryFn: async () => {
      const response = await fetch(
        `https://api.coincap.io/v2/assets/${id}/history?interval=h1`
      );
      const data = await response.json();
      return data.data;
    },
  });

  if (isLoadingAsset || isLoadingHistory) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 brutal-border px-4 py-2 bg-white/5 brutal-hover"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Assets
        </Link>

        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl md:text-6xl font-bold font-mono">
              {asset.name}
            </h1>
            <span className="text-2xl md:text-4xl text-brutal-yellow font-mono">
              {asset.symbol}
            </span>
          </div>
          <p className="text-white/60">Rank #{asset.rank}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="brutal-border p-4 bg-white/5">
            <div className="text-white/60 mb-2 font-mono">Price</div>
            <div className="text-2xl font-bold font-mono">
              {formatCurrency(parseFloat(asset.priceUsd))}
            </div>
          </div>
          <div className="brutal-border p-4 bg-white/5">
            <div className="text-white/60 mb-2 font-mono">Market Cap</div>
            <div className="text-2xl font-bold font-mono">
              {formatCurrency(parseFloat(asset.marketCapUsd))}
            </div>
          </div>
          <div className="brutal-border p-4 bg-white/5">
            <div className="text-white/60 mb-2 font-mono">Volume (24h)</div>
            <div className="text-2xl font-bold font-mono">
              {formatCurrency(parseFloat(asset.volumeUsd24Hr))}
            </div>
          </div>
          <div className="brutal-border p-4 bg-white/5">
            <div className="text-white/60 mb-2 font-mono">Change (24h)</div>
            <div
              className={`text-2xl font-bold font-mono ${
                parseFloat(asset.changePercent24Hr) >= 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {parseFloat(asset.changePercent24Hr).toFixed(2)}%
            </div>
          </div>
        </div>

        <PriceChart data={history} />
      </div>
    </div>
  );
};

export default AssetDetail;