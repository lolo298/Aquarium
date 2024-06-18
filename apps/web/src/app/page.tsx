"use client";
import { BeforeInstallPromptEvent } from "@/types";
import { Button } from "@/ui/components/button";
import { useEffect, useState } from "react";

function App() {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  useEffect(() => {
    const installHandler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    const afterInstallHandler = () => {
      //open app with protocol web+aquariumarcade
      window.open(
        `https://${process.env.NEXT_PUBLIC_COOLIFY_URL ?? "localhost"}/app`,
      );
    };

    //@ts-expect-error
    window.addEventListener("beforeinstallprompt", installHandler);
    window.addEventListener("appinstalled", afterInstallHandler);

    return () => {
      //@ts-expect-error
      window.removeEventListener("beforeinstallprompt", installHandler);
      window.removeEventListener("appinstalled", afterInstallHandler);
    };
  }, []);

  return (
    <div className="flex h-full w-full flex-[10] flex-col items-center justify-center gap-16 bg-secondary text-center">
      <h2 className="text-4xl font-bold">Bienvenue sur Aquarium ARcade</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed ratione
        soluta libero quasi eius dolor. Perspiciatis voluptatem aspernatur
        doloremque! Debitis, voluptatem soluta cumque veniam necessitatibus
        blanditiis saepe est doloribus porro?
      </p>
      {/* <Button
        href="/viewer"
        size="lg"
        className="bg-[linear-gradient(to_bottom,#00000055,#00000055_40%,#FFFFFF88_60%,#FFFFFF88)]"
      >
        Continuer
      </Button> */}
      <Button
        size="lg"
        className="bg-[linear-gradient(to_bottom,#00000055,#00000055_40%,#FFFFFF88_60%,#FFFFFF88)]"
        onClick={async () => {
          await installPrompt?.prompt();
        }}
      >
        Install
      </Button>
    </div>
  );
}

export default App;
