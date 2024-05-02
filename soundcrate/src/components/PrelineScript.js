'use client';

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function PrelineScript() {
  const path = usePathname();

  // useEffect(() => {
  //   const loadPreline = async () => {
  //     await import("preline/preline");

  //     window.HSStaticMethods.autoInit();
  //   };

  //   loadPreline();
  // }, [path]);


  useEffect(() => {
    import('preline/preline');
  }, []);

  useEffect(() => {
    setTimeout(() => {
        // @ts-ignore
        HSStaticMethods.autoInit();
    }, 100);
  }, [path]);

  return null;
}