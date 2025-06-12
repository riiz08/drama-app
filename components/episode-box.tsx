import React from "react";
import { Drama, Episode } from "@/app/generated/prisma";
import { Divider } from "@heroui/divider";
import { Listbox, ListboxItem } from "@heroui/listbox";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Heading from "./heading";

type Props = {
  episodes: Episode[];
  drama: Drama;
};

const EpisodeBox = ({ episodes, drama }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const currentSlug = pathname?.split("/").pop();

  const handleSelect = (key: React.Key) => {
    router.push(`/${String(key)}`);
  };

  return (
    <div className="w-full bg-content1 mt-4 px-2">
      <Heading title="Daftar episode lainnya" />
      <Divider className="mb-2" />
      <Listbox
        aria-label="Pilih Episod"
        onAction={(key) => handleSelect(key)}
        className="max-h-32 overflow-y-scroll"
        selectionMode="single"
        selectedKeys={currentSlug ? [currentSlug] : []}
        defaultSelectedKeys={"all"}
        color="primary"
        autoFocus
        shouldFocusWrap
      >
        {episodes.map((ep) => (
          <ListboxItem
            key={ep.slug}
            textValue={`${drama.title} full episod ${ep.episodeNum}`}
            className="text-content1-foreground"
            startContent={
              <Image
                src={drama.thumbnail}
                alt={`Tonton drama ${drama.title} full episod`}
                height={50}
                width={50}
                style={{ width: "auto", height: "auto" }}
                priority
                className="rounded-md"
              />
            }
          >
            <div>
              <h4>
                {drama.title} full episod {ep.episodeNum}
              </h4>
            </div>
          </ListboxItem>
        ))}
      </Listbox>
    </div>
  );
};

export default EpisodeBox;
