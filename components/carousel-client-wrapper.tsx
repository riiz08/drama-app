"use client";

import { Spinner } from "@heroui/spinner";
import dynamic from "next/dynamic";

const CarouselSlider = dynamic(() => import("./carousel"), {
  ssr: false,
  loading: () => (
    <Spinner
      classNames={{ label: "text-foreground mt-4" }}
      className="w-full h-48 sm:h-56"
      variant="wave"
    />
  ),
});

export default function CarouselClientWrapper() {
  return <CarouselSlider />;
}
