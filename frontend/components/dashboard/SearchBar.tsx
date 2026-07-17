"use client";

import { Search } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({
  value,
  onChange,
}: Props) {
  return (
    <div className="flex items-center rounded-2xl border bg-white px-4 py-3 shadow">

      <Search size={20} className="text-gray-400" />

      <input
        className="ml-3 w-full outline-none"
        placeholder="Search repositories..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

    </div>
  );
}