"use client";

import { useState } from "react";

interface SearchBarProps {
  onSearch: (value: string) => void;
}

export default function SearchBar({
  onSearch,
}: SearchBarProps) {
  const [value, setValue] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const text = e.target.value;
    setValue(text);
    onSearch(text);
  }

  return (
    <input
      type="text"
      placeholder="Search repository..."
      value={value}
      onChange={handleChange}
      className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500"
    />
  );
}