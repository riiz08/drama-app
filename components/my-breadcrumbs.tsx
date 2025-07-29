"use client";

import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { DIcon, DramaIcon, HomeIcon, PlayIcon } from "./icons";

interface PropsBreadCrumbs {
  dramaTitle?: string | undefined;
  episodeSlug?: string | undefined;
  dramaSlug?: string | undefined;
  episodeNum?: number | undefined;
}

export default function MyBreadcrumbs({
  dramaTitle,
  episodeSlug,
  dramaSlug,
  episodeNum,
}: PropsBreadCrumbs) {
  const pathName = usePathname();
  const router = useRouter();

  return (
    <Breadcrumbs
      size="sm"
      variant="solid"
      onAction={(key) => {
        router.replace(`${key}`);
      }}
    >
      <BreadcrumbItem key="/" startContent={<HomeIcon />}>
        Home
      </BreadcrumbItem>
      <BreadcrumbItem key="/drama" startContent={<DIcon />}>
        Drama
      </BreadcrumbItem>
      <BreadcrumbItem key={`/drama/${dramaSlug}`} startContent={<DramaIcon />}>
        {dramaTitle}
      </BreadcrumbItem>
      {episodeNum ? (
        <BreadcrumbItem
          key={`/${dramaSlug}/${episodeSlug}`}
          startContent={<PlayIcon />}
        >
          Episode {episodeNum}
        </BreadcrumbItem>
      ) : (
        ""
      )}
    </Breadcrumbs>
  );
}
