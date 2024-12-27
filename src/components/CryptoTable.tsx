import { useNavigate } from "react-router-dom";
import { ArrowUp, ArrowDown } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface CryptoAsset {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  priceUsd: string;
  changePercent24Hr: string;
  marketCapUsd: string;
}

interface CryptoTableProps {
  assets: CryptoAsset[];
}

export const CryptoTable = ({ assets }: CryptoTableProps) => {
  const navigate = useNavigate();

  return (
    <div className="w-full overflow-x-auto brutal-border bg-white/5 p-1">
      <table className="w-full">
        <thead className="border-b-2 border-white">
          <tr className="text-left">
            <th className="p-4 font-mono">#</th>
            <th className="p-4 font-mono">Name</th>
            <th className="p-4 font-mono text-right">Price</th>
            <th className="p-4 font-mono text-right">24h %</th>
            <th className="p-4 font-mono text-right hidden md:table-cell">Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr
              key={asset.id}
              onClick={() => navigate(`/asset/${asset.id}`)}
              className="border-b border-white/20 hover:bg-white/5 cursor-pointer brutal-hover"
            >
              <td className="p-4 font-mono">{asset.rank}</td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-brutal-yellow">{asset.symbol}</span>
                  <span className="text-white/80">{asset.name}</span>
                </div>
              </td>
              <td className="p-4 font-mono text-right">
                {formatCurrency(parseFloat(asset.priceUsd))}
              </td>
              <td className="p-4 font-mono text-right">
                <span
                  className={`flex items-center justify-end gap-1 ${
                    parseFloat(asset.changePercent24Hr) >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {parseFloat(asset.changePercent24Hr) >= 0 ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  {Math.abs(parseFloat(asset.changePercent24Hr)).toFixed(2)}%
                </span>
              </td>
              <td className="p-4 font-mono text-right hidden md:table-cell">
                {formatCurrency(parseFloat(asset.marketCapUsd))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};