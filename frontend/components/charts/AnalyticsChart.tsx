"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface Props {
  data: {
    repository: string;
    overall: number;
    security: number;
    performance: number;
    quality: number;
    maintainability: number;
  }[];
}

export default function AnalyticsChart({ data }: Props) {
  return (
    <div className="mt-10 rounded-2xl bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold">
        AI Review Trends
      </h2>

      <div className="h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="5 5" />

            <XAxis dataKey="repository" />

            <YAxis domain={[0, 100]} />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="overall"
              stroke="#2563eb"
              strokeWidth={3}
            />

            <Line
              type="monotone"
              dataKey="security"
              stroke="#dc2626"
              strokeWidth={3}
            />

            <Line
              type="monotone"
              dataKey="performance"
              stroke="#16a34a"
              strokeWidth={3}
            />

            <Line
              type="monotone"
              dataKey="quality"
              stroke="#9333ea"
              strokeWidth={3}
            />

            <Line
              type="monotone"
              dataKey="maintainability"
              stroke="#ea580c"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}