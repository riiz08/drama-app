"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { Link } from "@heroui/link";

import { Drama } from "@/app/generated/prisma";
import getAllPopularDrama from "@/app/actions/drama/getAllPopularDrama";
import { Image } from "@heroui/image";

export default function CarouselSlider() {
  const [drama, setDrama] = useState<Drama[]>();

  const fetchingDrama = async () => {
    const drama = await getAllPopularDrama();

    return setDrama(drama);
  };

  useEffect(() => {
    fetchingDrama();
  }, []);

  return (
    <div className="rounded-xl w-full max-w-screen-xl mx-auto relative">
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
                  isBlurred
                  alt={popular.title}
                  className="w-full h-[300px] sm:h-[400px] object-cover"
                  removeWrapper={true}
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
    </div>
  );
}
