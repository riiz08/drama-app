import React from "react";
import { Link } from "@heroui/link";

import Heading from "./heading";
import DramaCard from "./drama-card";

import { Drama } from "@/app/generated/prisma";

interface PopularProps {
  drama: Drama[];
}

const PopularDrama: React.FC<PopularProps> = ({ drama }) => {
  return (
    <>
      <Heading href="/popular" title="Drama Populer" />
      <div className="py-2 grid md:grid-cols-5 grid-cols-2 gap-3 md:gap-2 w-full">
        {drama.map((popular, i) => (
          <Link key={i} href={`/drama/${popular.slug}`} target="_parent">
            <DramaCard
              image={popular.thumbnail}
              isPopular={true}
              title={popular.title}
            />
          </Link>
        ))}
      </div>
    </>
  );
};

export default PopularDrama;
