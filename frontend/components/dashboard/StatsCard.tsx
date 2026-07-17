type Props = {
  title: string;
  value: string | number;
};

export default function StatsCard({ title, value }: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <p className="text-sm font-medium text-gray-500">
        {title}
      </p>

      <div className="mt-4 flex items-end justify-between">
        <h2 className="text-4xl font-bold text-gray-900">
          {value}
        </h2>

        <div className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
          Live
        </div>
      </div>
    </div>
  );
}