"use client";

import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { cn } from "@heroui/theme";
import { addToast, closeAll } from "@heroui/toast";
import { useEffect } from "react";

const ToastCoffe = () => {
  const toast = () =>
    addToast({
      title: "Belanja admin coffe",
      description: "Kalau nak belanja admin kopi, klik je tombol kat bawah ni.",
      classNames: {
        base: cn([
          "bg-default-50 dark:bg-background shadow-sm",
          "border border-l-8 rounded-md rounded-l-none",
          "flex flex-col items-start",
          "border-primary-200 dark:border-primary-100 border-l-primary",
        ]),
        icon: "w-6 h-6 fill-current",
      },
      endContent: (
        <div className="ms-11 my-2 flex gap-x-2">
          <Button
            as={Link}
            color={"primary"}
            href="https://sociabuzz.com/riiz85/tribe"
            size="sm"
            variant="bordered"
          >
            Belanja coffe
          </Button>
          <Button
            className="underline-offset-2"
            color={"primary"}
            size="sm"
            variant="light"
            onPress={() => closeAll()}
          >
            Nanti nantilah
          </Button>
        </div>
      ),
      color: "primary",
      timeout: 5000,
    });

  useEffect(() => {
    toast();
  }, []);

  return null;
};

export default ToastCoffe;
