"use client";
import { Provider } from "jotai";
import { useEffect } from "react";

function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    window.addEventListener("message", (e) => {
      if (
        !e.data ||
        e.data.source === "react-devtools-content-script" ||
        e.data.wappalyzer
      )
        return;
      console.log("message", e.data);
      if (e.data && e.data.type === "precache-loaded") {
        fetch("/api/markers");
      }
    });
  }, []);

  return <Provider>{children}</Provider>;
}

export default Providers;
