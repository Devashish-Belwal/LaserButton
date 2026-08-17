"use client";

import { LaserButton } from "@/components/LaserButton";
// import LaserButton from "@/components/LaserButton";
import { useEffect, useState } from "react";

const PORTRAIT_RATIO = 900 / 1600;   // 0.5625
const LANDSCAPE_RATIO = 1600 / 900;  // 1.777...

export default function Playground() {
  const [size, setSize] = useState({
    w: window.innerWidth,
    h: window.innerHeight,
  });

  useEffect(() => {
    const onResize = () =>
      setSize({
        w: window.innerWidth,
        h: window.innerHeight,
      });

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isLandscape = size.w >= size.h;
  const viewportRatio = size.w / size.h;

  const shouldLetterbox = isLandscape
    ? viewportRatio > LANDSCAPE_RATIO
    : viewportRatio > PORTRAIT_RATIO;

  return (
    <div className="fixed inset-0 bg-slate-900 flex items-center justify-center">
      <main
        className={[
          "bg-gray-500 overflow-y-auto shadow-2xl flex justify-center items-center",

          shouldLetterbox
            ? isLandscape
              ? "h-full w-auto aspect-video"
              : "h-full w-auto aspect-9/16"
            : "w-full h-full",
        ].join(" ")}
      >
        {/* Your app */}
        <div>
          <LaserButton
            className=""
          >
            <div>hello</div>
          </LaserButton>
        </div>
      </main>
    </div>
  );
}