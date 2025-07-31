"use client";

import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error);
  }, [error]);

  const router = useRouter();

  return (
    <div className="min-h-screen w-full justify-center flex items-center flex-col gap-2">
      <h2 className="font-extrabold">Something went wrong!</h2>
      <Button
        size="sm"
        variant="shadow"
        color="warning"
        onPress={
          // Attempt to recover by trying to re-render the segment
          () => router.push("/")
        }
      >
        Back to homepage
      </Button>
    </div>
  );
}
