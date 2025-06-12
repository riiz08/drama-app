// components/PaginationClient.tsx
"use client";

import { Pagination } from "@heroui/pagination";
import { useRouter } from "next/navigation";

export default function PaginationClient({
  total,
  initialPage,
}: {
  total: number;
  initialPage: number;
}) {
  const router = useRouter();

  const handleChange = (page: number) => {
    router.push(`/?page=${page}`);
  };

  return (
    <Pagination
      total={total}
      initialPage={initialPage}
      onChange={handleChange}
    />
  );
}
