import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type DramaStatus = "ONGOING" | "TAMAT";

export interface CreateDramaInput {
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  status: DramaStatus;
  releaseDate: string;
  isPopular: boolean;
}

export interface CreateEpisodeInput {
  slug: string;
  episodeNum: number;
  videoUrl?: string;
  releaseDate: string;
  dramaId: string;
}

export interface Drama {
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  status: DramaStatus;
  releaseDate: string;
  isPopular: boolean;
}
