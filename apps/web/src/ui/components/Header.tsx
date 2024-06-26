"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "./button";
import { Cross, Info, Scan, X } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/ui/components/alert-dialog";

export default function Header() {
  const pathname = usePathname();
  const isViewer = pathname === "/viewer";

  return (
    <div className="flex flex-1 items-center justify-between bg-primary-foreground p-2">
      <div className="relative h-full w-full">
        <img
          src="/images/logo_aquarium.png"
          alt="Aquarium de trégastel"
          className="absolute inset-0 h-full object-contain"
        />
      </div>
      {isViewer && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>
              <Info />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader className="flex-row items-center">
              <AlertDialogTitle className="flex-1 text-center text-primary-foreground">
                Aide
              </AlertDialogTitle>
              <AlertDialogCancel asChild>
                <Button variant="ghost">
                  <X />
                </Button>
              </AlertDialogCancel>
            </AlertDialogHeader>
            <p>
              Lorsque vous avez scanné un poisson et que celui-ci apparaît sur
              votre smartphone, vous pouvez l'observer à 360°, en déplaçant
              votre doigt sur l'écran.
            </p>
            <div className="flex gap-4">
              <Button>
                <Scan />
              </Button>
              <p>
                Appuyez dessus pour scanner le marqueur du poisson et l'observer
                en 3D et à 360°.
              </p>
            </div>
            <div className="flex gap-4">
              <Button>
                <Info />
              </Button>
              <p>
                En sélectionnant ce bouton, découvrez les informations de
                l'espèce scanné.
              </p>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
