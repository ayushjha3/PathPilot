"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import {
  BriefcaseIcon,
  LineChart,
  TrendingUp,
  TrendingDown,
  Brain,
  Sparkles
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const DashboardView = ({ insights }) => {
  // Transform salary data for the chart
  const salaryData = insights.salaryRanges.map((range) => ({
    name: range.role,
    min: range.min / 1000,
    max: range.max / 1000,
    median: range.median / 1000,
  }));

  const getDemandLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getMarketOutlookInfo = (outlook) => {
    switch (outlook.toLowerCase()) {
      case "positive":
        return { icon: TrendingUp, color: "text-green-500" };
      case "neutral":
        return { icon: LineChart, color: "text-yellow-500" };
      case "negative":
        return { icon: TrendingDown, color: "text-red-500" };
      default:
        return { icon: LineChart, color: "text-gray-500" };
    }
  };

  const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
  const outlookColor = getMarketOutlookInfo(insights.marketOutlook).color;

  // Format dates using date-fns
  const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
  const nextUpdateDistance = formatDistanceToNow(
    new Date(insights.nextUpdate),
    { addSuffix: true }
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Badge
          className="
    rounded-full
    border-violet-500/20
    bg-violet-500/10
    text-violet-300
    px-4
    py-1
  "
        >Last updated: {lastUpdatedDate}</Badge>
      </div>

      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card
          className="
    group
    relative
    overflow-hidden
    rounded-3xl
    border
    border-white/10
    bg-background/70
    backdrop-blur-xl
    transition-all
    duration-300
    hover:-translate-y-1
    hover:border-violet-500/30
    hover:shadow-[0_20px_50px_rgba(124,58,237,0.15)]
  "
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-semibold">
              Market Outlook
            </CardTitle>
            <OutlookIcon className={`h-4 w-4 ${outlookColor}`} />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold tracking-tight">{insights.marketOutlook}</div>
            <p className="text-xs text-muted-foreground">
              Next update {nextUpdateDistance}
            </p>
          </CardContent>
        </Card>

        <Card
          className="
    group
    relative
    overflow-hidden
    rounded-3xl
    border
    border-white/10
    bg-background/70
    backdrop-blur-xl
    transition-all
    duration-300
    hover:-translate-y-1
    hover:border-violet-500/30
    hover:shadow-[0_20px_50px_rgba(124,58,237,0.15)]
  "
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-semibold">
              Industry Growth
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold tracking-tight">
              {insights.growthRate.toFixed(1)}%
            </div>
            <Progress value={insights.growthRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card
          className="
    group
    relative
    overflow-hidden
    rounded-3xl
    border
    border-white/10
    bg-background/70
    backdrop-blur-xl
    transition-all
    duration-300
    hover:-translate-y-1
    hover:border-violet-500/30
    hover:shadow-[0_20px_50px_rgba(124,58,237,0.15)]
  "
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-semibold">Demand Level</CardTitle>
            <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold tracking-tight">{insights.demandLevel}</div>
            <div
              className={`h-2 w-full rounded-full mt-2 ${getDemandLevelColor(
                insights.demandLevel
              )}`}
            />
          </CardContent>
        </Card>

        <Card
          className="
    group
    relative
    overflow-hidden
    rounded-3xl
    border
    border-white/10
    bg-background/70
    backdrop-blur-xl
    transition-all
    duration-300
    hover:-translate-y-1
    hover:border-violet-500/30
    hover:shadow-[0_20px_50px_rgba(124,58,237,0.15)]
  "
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-semibold">Top Skills</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {insights.topSkills.map((skill) => (
                <Badge key={skill} variant="secondary" >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Salary Ranges Chart */}
      <Card
        className="
    relative
    overflow-hidden
    group
    rounded-3xl
    border
    border-border/60
    bg-background/80
    backdrop-blur-xl
    transition-all
    duration-500
    hover:-translate-y-1
    hover:border-indigo-500/30
    hover:shadow-2xl
    hover:shadow-indigo-500/10
  "
      >
        <div
          className="
    absolute
    inset-0
    -z-10
    rounded-3xl
    bg-gradient-to-br
    from-indigo-500/5
    via-transparent
    to-cyan-500/5
    opacity-0
    transition-opacity
    duration-500
    group-hover:opacity-100
  "
        />
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold">
            💰 Salary Intelligence
          </CardTitle>

          <CardDescription>
            Compare minimum, median and maximum compensation across popular industry
            roles.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="h-[420px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={salaryData}
                margin={{
                  top: 20,
                  right: 20,
                  left: 20,
                  bottom: 40,
                }}
                barGap={6}
                barCategoryGap="22%"
              >
                <CartesianGrid
                  vertical={false}
                  stroke="var(--border)"
                  strokeDasharray="2 6"
                  opacity={0.35}
                />

                <XAxis
                  dataKey="name"
                  interval={0}
                  angle={-20}
                  textAnchor="end"
                  height={70}
                  tickMargin={10}
                  tickLine={false}
                  axisLine={false}
                  tick={{
                    fill: "var(--muted-foreground)",
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                />

                <YAxis
                  tickFormatter={(value) => `$${value}K`}
                  tickLine={false}
                  axisLine={false}
                  tick={{
                    fill: "var(--muted-foreground)",
                    fontSize: 12,
                  }}
                />

                <Tooltip
                  cursor={{
                    fill: "rgba(99,102,241,0.08)",
                    radius: 8,
                  }}
                  content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null;

                    return (
                      <div className="min-w-[180px] rounded-2xl border border-border bg-background/95 p-4 shadow-xl backdrop-blur">
                        <p className="mb-3 font-semibold text-foreground">
                          {label}
                        </p>

                        {payload.map((item) => (
                          <div
                            key={item.dataKey}
                            className="mb-1 flex items-center justify-between gap-6 text-sm"
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className="h-2.5 w-2.5 rounded-full"
                                style={{
                                  backgroundColor: item.color,
                                }}
                              />
                              <span>{item.name}</span>
                            </div>

                            <span className="font-semibold">
                              ${item.value}K
                            </span>
                          </div>
                        ))}
                      </div>
                    );
                  }}
                />

                <Legend
                  verticalAlign="top"
                  height={40}
                  iconType="circle"
                  wrapperStyle={{
                    fontSize: "13px",
                  }}
                />

                <Bar
                  dataKey="min"
                  fill="#2DD4BF"  
                  radius={[10, 10, 0, 0]}
                />

                <Bar
                  dataKey="median"
                  fill="#D4A017"  
                  radius={[10, 10, 0, 0]}
                />

                <Bar
                  dataKey="max"
                  fill="#DC2626"  
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        {/* Key Trends */}
        <Card
          className="
    group
    relative
    flex
    h-full
    flex-col
    overflow-hidden
    rounded-3xl
    border
    border-white/10
    bg-gradient-to-br
    from-[#08070D]
    via-[#0C0A13]
    to-[#09080F]
    transition-all
    duration-500
    hover:-translate-y-1
    hover:border-violet-500/20
    hover:shadow-[0_20px_60px_rgba(124,58,237,0.12)]
"
        >
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-violet-500/10 blur-[90px]" />

          <CardHeader className="pb-4">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/15">
                  <TrendingUp className="h-6 w-6 text-violet-300" />
                </div>

                <div>

                  <CardTitle className="text-xl font-semibold">
                    Industry Trends
                  </CardTitle>

                  <CardDescription className="mt-1">
                    Latest technologies and hiring shifts.
                  </CardDescription>

                </div>

              </div>

              <Badge
                className="
                border-violet-500/20
                bg-violet-500/10
                text-violet-300
            "
              >
                Live
              </Badge>

            </div>

          </CardHeader>

          <CardContent className="flex flex-1 flex-col justify-between">

            <div className="space-y-3">

              {insights.keyTrends.map((trend, index) => (
                <div
                  key={index}
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    p-4
                    transition-all
                    hover:border-violet-500/30
                    hover:bg-violet-500/5
                "
                >
                  <div className="flex gap-3">

                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-violet-400" />

                    <p className="text-sm leading-7 text-muted-foreground">
                      {trend}
                    </p>

                  </div>

                </div>
              ))}

            </div>

            <Separator className="my-6 bg-white/10" />

            <div className="rounded-2xl border border-violet-500/15 bg-violet-500/5 p-5">

              <p className="text-sm leading-7 text-muted-foreground">

                <span className="font-semibold text-violet-300">
                  AI Insight
                </span>

                {" "}
                Emerging demand is centered around cloud-native development,
                AI integration and platform engineering.

              </p>

            </div>

          </CardContent>

        </Card>


        {/* Skill Recommendation */}
        <Card
          className="
    group
    relative
    flex
    h-full
    flex-col
    overflow-hidden
    rounded-3xl
    border
    border-white/10
    bg-gradient-to-br
    from-[#08070D]
    via-[#0C0A13]
    to-[#09080F]
    transition-all
    duration-500
    hover:-translate-y-1
    hover:border-cyan-500/20
    hover:shadow-[0_20px_60px_rgba(34,211,238,0.12)]
"
        >

          <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-cyan-500/10 blur-[90px]" />

          <CardHeader className="pb-4">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/15">

                  <Brain className="h-6 w-6 text-cyan-300" />

                </div>

                <div>

                  <CardTitle className="text-xl font-semibold">
                    AI Skill Recommendations
                  </CardTitle>

                  <CardDescription className="mt-1">
                    Skills recommended for your target career.
                  </CardDescription>

                </div>

              </div>

              <Badge
                className="
border-cyan-500/20
bg-cyan-500/10
text-cyan-300
"
              >
                AI Powered
              </Badge>

            </div>

          </CardHeader>

          <CardContent className="flex flex-1 flex-col justify-between">

            <div className="grid grid-cols-2 gap-3">

              {insights.recommendedSkills.map((skill) => (

                <div
                  key={skill}
                  className="
rounded-2xl
border
border-white/10
bg-white/[0.03]
p-4
transition-all
hover:border-cyan-500/30
hover:bg-cyan-500/5
"
                >

                  <div className="flex items-center gap-3">

                    <div className="h-2.5 w-2.5 rounded-full bg-cyan-400" />

                    <span className="text-sm font-medium">
                      {skill}
                    </span>

                  </div>

                </div>

              ))}

            </div>

            <Separator className="my-6 bg-white/10" />

            <div className="rounded-2xl border border-cyan-500/15 bg-cyan-500/5 p-5">

              <p className="text-sm leading-7 text-muted-foreground">

                <span className="font-semibold text-cyan-300">
                  Recommendation
                </span>

                {" "}
                Mastering these skills will significantly improve your
                readiness for current market opportunities.

              </p>

            </div>

          </CardContent>

        </Card>
      </div>
    </div>
  );
};

export default DashboardView;