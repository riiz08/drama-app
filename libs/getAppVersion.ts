import fs from "fs";
import path from "path";

export function getAppVersion() {
  try {
    const versionPath = path.resolve(process.cwd(), "version.txt");
    const version = fs.readFileSync(versionPath, "utf8");
    return version.trim();
  } catch (error) {
    console.error("Failed to read version.txt:", error);
    return "unknown";
  }
}
