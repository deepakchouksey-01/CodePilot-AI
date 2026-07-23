interface Props {
  value: number;
}

export default function ProgressBar({
  value,
}: Props) {
  return (
    <div className="w-full rounded-full bg-gray-200">

      <div
        className="h-3 rounded-full bg-green-500 transition-all duration-700"
        style={{
          width: `${value}%`,
        }}
      />

    </div>
  );
}