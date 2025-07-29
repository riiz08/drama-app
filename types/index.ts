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
  totalEpisode: number;
  airTime: string;
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

export type PopularDramaType = {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  releaseDate: Date;
  status: DramaStatus;
  totalEpisode: number;
};
