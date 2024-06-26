"use client";
import { BeforeInstallPromptEvent } from "@/types";
import { Button } from "@/ui/components/button";
import { useEffect, useState } from "react";

function App() {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  useEffect(() => {
    // prevent the default chrome install prompt for the pwa
    const installHandler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    //@ts-expect-error
    window.addEventListener("beforeinstallprompt", installHandler);

    return () => {
      //@ts-expect-error
      window.removeEventListener("beforeinstallprompt", installHandler);
    };
  }, []);

  return (
    <div className="flex h-full w-full flex-[10] flex-col items-center justify-center gap-16 bg-secondary px-4 text-center">
      <h2 className="text-4xl font-bold">Bienvenue sur Aquarium ARcade</h2>
      <p>
        Afin de profiter pleinement de l'expérience, ouvrez ce site sur chrome
        et installez l'application sur votre appareil pour un accès rapide et
        une expérience immersive. Ouvrez ensuite l'application pour continuer.
      </p>
      <Button
        size="lg"
        className="bg-[linear-gradient(to_bottom,#00000055,#00000055_40%,#FFFFFF88_60%,#FFFFFF88)]"
        onClick={async () => {
          await installPrompt?.prompt();
        }}
      >
        Installer
      </Button>
    </div>
  );
}

export default App;
