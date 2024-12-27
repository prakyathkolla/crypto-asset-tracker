import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Loader2, Calendar } from "lucide-react";
import { PriceChart } from "@/components/PriceChart";
import { formatCurrency } from "@/lib/utils";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { useState } from "react";

const AssetDetail = () => {
  const { id } = useParams();
  const [date, setDate] = useState<Date>(new Date());

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
    queryKey: ["history", id, date],
    queryFn: async () => {
      // Set the start time to the beginning of the selected date
      const startTime = new Date(date);
      startTime.setHours(0, 0, 0, 0);
      
      // Set the end time to the end of the selected date
      const endTime = new Date(date);
      endTime.setHours(23, 59, 59, 999);

      const response = await fetch(
        `https://api.coincap.io/v2/assets/${id}/history?interval=h1&start=${startTime.getTime()}&end=${endTime.getTime()}`
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

        <div className="flex justify-end mb-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="brutal-border">
                <Calendar className="mr-2 h-4 w-4" />
                {format(date, "PPP")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={(newDate) => newDate && setDate(newDate)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <PriceChart data={history || []} />
      </div>
    </div>
  );
};

export default AssetDetail;