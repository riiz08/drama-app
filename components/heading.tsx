import { Link } from "@heroui/link";
import React from "react";

interface HeadingProps {
  title: string;
  href?: string;
  h1: boolean;
}

export const ChevronRight = () => {
  return (
    <svg
      className="lucide lucide-chevrons-right-icon lucide-chevrons-right"
      fill="none"
      height={24}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      width={24}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m6 17 5-5-5-5" />
      <path d="m13 17 5-5-5-5" />
    </svg>
  );
};
const Heading: React.FC<HeadingProps> = ({ title, href, h1 }) => {
  return (
    <div className="flex justify-between items-center bg-content1 rounded-md px-2 py-1 mb-2">
      {h1 ? (
        <h1 className="font-semibold text-sm md:text-lg text-center">
          {title}
        </h1>
      ) : (
        <h2 className="font-semibold text-sm md:text-lg text-center">
          {title}
        </h2>
      )}
      {href ? (
        <Link
          showAnchorIcon
          anchorIcon={<ChevronRight />}
          className="text-xs font-semibold"
          color="foreground"
          href={href}
          target="_parent"
        >
          View All
        </Link>
      ) : (
        ""
      )}
    </div>
  );
};

export default Heading;
