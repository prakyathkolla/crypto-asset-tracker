import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "@/lib/utils";

interface PriceChartProps {
  data: Array<{ time: number; priceUsd: string }>;
}

export const PriceChart = ({ data }: PriceChartProps) => {
  const chartData = useMemo(() => {
    return data.map((item) => ({
      time: new Date(item.time).toLocaleTimeString(),
      price: parseFloat(item.priceUsd),
    }));
  }, [data]);

  return (
    <div className="w-full h-[400px] brutal-border bg-white/5 p-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2D5AF7" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#2D5AF7" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="time"
            stroke="#fff"
            tick={{ fill: "#fff" }}
            tickLine={{ stroke: "#fff" }}
          />
          <YAxis
            stroke="#fff"
            tick={{ fill: "#fff" }}
            tickLine={{ stroke: "#fff" }}
            tickFormatter={(value) => formatCurrency(value)}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1A1F2C",
              border: "2px solid white",
              borderRadius: "4px",
            }}
            labelStyle={{ color: "#fff" }}
            formatter={(value: number) => [formatCurrency(value), "Price"]}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#2D5AF7"
            fillOpacity={1}
            fill="url(#colorPrice)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};