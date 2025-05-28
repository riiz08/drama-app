// src/global.d.ts
interface ScreenOrientation {
  lock(orientation: OrientationLockType): Promise<void>;
  unlock?: () => void;
}

type OrientationLockType =
  | "any"
  | "natural"
  | "landscape"
  | "portrait"
  | "portrait-primary"
  | "portrait-secondary"
  | "landscape-primary"
  | "landscape-secondary";

// src/types/global.d.ts

interface Response {
  json<T>(): Promise<T>;
}
