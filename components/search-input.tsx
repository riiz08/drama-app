"use client";

import { Episode } from "@/app/generated/prisma";
import { Input } from "@heroui/input";
import { Listbox, ListboxItem } from "@heroui/listbox";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface jsonResp {
  success: boolean;
  drama: DramaResult;
}

interface DramaResult {
  status: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  releaseDate: Date;
  isPopular: boolean;
  createdAt: Date;
  updatedAt: Date;
  episodes: Episode[];
}

export const SearchIcon = (props: { className: string }) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

const SearchInput = () => {
  const [searchValue, setSearchValue] = useState("");
  const [result, setResult] = useState<DramaResult[]>([]);
  const router = useRouter();

  const fetchData = async (title: string) => {
    const res = await fetch("/api/drama", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch drama");

    const data = await res.json();

    return data;
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchValue.length > 2) {
        fetchData(searchValue)
          .then((res: any) => setResult(res.drama))
          .catch((err) => console.error("Fetch error:", err));
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchValue]);

  return (
    <div>
      <Input
        isClearable
        aria-label="search"
        id="search"
        placeholder="Type to search..."
        radius="lg"
        size="md"
        startContent={
          <SearchIcon className="pointer-events-none flex-shrink-0" />
        }
        variant="faded"
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {result.length > 0 && (
        <Listbox aria-label="List Drama 2025" color="default" variant="faded">
          {result.map((drama) => (
            <ListboxItem
              key={drama.slug}
              onPress={(e) => router.push(`/drama/${drama.slug}`)}
            >
              {drama.title}
            </ListboxItem>
          ))}
        </Listbox>
      )}
    </div>
  );
};

export default SearchInput;
