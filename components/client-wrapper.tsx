"use client";

import { Spinner } from "@heroui/spinner";
import React, { Suspense } from "react";

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense
      fallback={
        <Spinner size="lg" className="min-h-screen w-full" label="Loading..." />
      }
    >
      {children}
    </Suspense>
  );
};

export default ClientWrapper;
