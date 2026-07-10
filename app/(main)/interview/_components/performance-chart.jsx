"use client";

import {
  LineChart,
  Line,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function PerformanceChart({ assessments }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (assessments) {
      const formattedData = assessments.map((assessment) => ({
        date: format(new Date(assessment.createdAt), "MMM dd"),
        score: assessment.quizScore,
      }));
      setChartData(formattedData);
    }
  }, [assessments]);

  return (
    <Card
      className="
      rounded-3xl
      border
      border-white/10
      bg-background/70
      backdrop-blur-xl
      shadow-lg
      overflow-hidden
    "
    >
      {/* Background Glow */}

      <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-violet-500/10 blur-[120px]" />

      <CardHeader className="relative">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-violet-500/10 p-3">

            <TrendingUp className="h-6 w-6 text-violet-500" />

          </div>

          <div>

            <CardTitle className="gradient-title text-3xl md:text-4xl">
              Performance Analytics
            </CardTitle>

            <CardDescription className="mt-2">
              Track your assessment progress and monitor improvements over time.
            </CardDescription>

          </div>

        </div>

      </CardHeader>

      <CardContent>

        <div className="h-[360px]">

          <ResponsiveContainer width="100%" height="100%">

            <AreaChart data={chartData}>

              <defs>

                <linearGradient
                  id="scoreGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#7C3AED"
                    stopOpacity={0.35}
                  />

                  <stop
                    offset="95%"
                    stopColor="#7C3AED"
                    stopOpacity={0}
                  />

                </linearGradient>

              </defs>

              <CartesianGrid
                strokeDasharray="4 4"
                stroke="rgba(255,255,255,0.06)"
              />

              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
              />

              <YAxis
                domain={[0, 100]}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
              />

              <Tooltip
                cursor={{
                  stroke: "#7C3AED",
                  strokeDasharray: "5 5",
                }}
                content={({ active, payload }) => {
                  if (active && payload?.length) {
                    return (
                      <div className="rounded-2xl border border-violet-500/20 bg-background/90 p-4 shadow-xl backdrop-blur-xl">

                        <p className="text-sm font-semibold">
                          {payload[0].payload.date}
                        </p>

                        <p className="mt-2 text-violet-400 font-bold text-lg">
                          {payload[0].value}%
                        </p>

                      </div>
                    );
                  }

                  return null;
                }}
              />

              <Area
                type="monotone"
                dataKey="score"
                fill="url(#scoreGradient)"
                stroke="none"
              />

              <Line
                type="monotone"
                dataKey="score"
                stroke="#7C3AED"
                strokeWidth={4}
                dot={{
                  r: 5,
                  fill: "#7C3AED",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 8,
                  fill: "#8B5CF6",
                  stroke: "#fff",
                  strokeWidth: 3,
                }}
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      </CardContent>

    </Card>
  );
}