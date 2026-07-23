import { ReactNode } from "react";

interface Props {
  title: string;
  value: string | number;
  icon: ReactNode;
}

export default function DashboardCard({
  title,
  value,
  icon,
}: Props) {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg transition hover:scale-105">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-80">{title}</p>

          <h2 className="mt-2 text-4xl font-bold">
            {value}
          </h2>
        </div>

        <div className="text-5xl">
          {icon}
        </div>
      </div>
    </div>
  );
}