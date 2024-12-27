import { useQuery } from "@tanstack/react-query";
import { CryptoTable } from "@/components/CryptoTable";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { data: assets, isLoading } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const response = await fetch("https://api.coincap.io/v2/assets?limit=50");
      const data = await response.json();
      return data.data;
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-6xl font-bold font-mono">
            Crypto Assets
          </h1>
          <p className="text-white/60">
            Top 50 cryptocurrencies by market cap. Updates every 30 seconds.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <CryptoTable assets={assets} />
        )}
      </div>
    </div>
  );
};

export default Index;