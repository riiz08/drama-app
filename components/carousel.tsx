"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { Link } from "@heroui/link";
import NextImage from "next/image";
import { Drama } from "@/app/generated/prisma";
import getAllPopularDrama from "@/app/actions/drama/getAllPopularDrama";
import { Image } from "@heroui/image";
import { Skeleton } from "@heroui/skeleton";

export default function CarouselSlider() {
  const [drama, setDrama] = useState<Drama[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/drama/popular");
        const resData = (await res.json()) as Drama[];

        setDrama(resData);
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="rounded-xl w-full max-w-screen-xl mx-auto relative">
      {drama ? (
        <Swiper
          centeredSlides
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="w-full px-6"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          effect="coverflow"
          modules={[EffectCoverflow, Pagination, Autoplay]}
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
          }}
          slidesPerView="auto"
        >
          {drama?.map((popular, idx) => (
            <Link key={idx}>
              <SwiperSlide
                key={popular.id}
                className="max-w-xs sm:max-w-md md:max-w-lg transition-all duration-300"
              >
                <div className="relative overflow-hidden h-48 md:h-56 rounded-2xl shadow-lg">
                  <Image
                    alt={popular.title}
                    as={NextImage}
                    className="w-full h-[300px] sm:h-[400px] object-cover"
                    fill
                    isBlurred
                    priority
                    removeWrapper={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    src={popular.thumbnail}
                  />
                  <div className="absolute bottom-0 z-[999] left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-white font-bold text-xl">
                      {popular.title}
                    </h3>
                    <p className="text-white text-sm line-clamp-2">
                      {popular.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            </Link>
          ))}

          {/* Pagination */}
          <div className="swiper-pagination mt-6 text-primary" />
        </Swiper>
      ) : (
        <Skeleton className="rounded-lg">
          <div className="h-48 md:h-56" />
        </Skeleton>
      )}
    </div>
  );
}
