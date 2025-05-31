"use client";

import { Spinner } from "@heroui/spinner";
import dynamic from "next/dynamic";

const CarouselSlider = dynamic(() => import("./carousel"), {
  ssr: false,
  loading: () => (
    <Spinner
      classNames={{ label: "text-foreground mt-4" }}
      variant="wave"
      className="w-full h-48 sm:h-56"
    />
  ),
});

export default function CarouselClientWrapper() {
  return <CarouselSlider />;
}
