"use client";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";

import { Home, Info } from "lucide-react";
import { Button } from "./button";
import { useAtom } from "jotai";
import { fishAtom } from "@/lib/atoms";
import { set } from "react-hook-form";
import { use, useEffect } from "react";

export default function Nav() {
  const [fish, setFish] = useAtom(fishAtom);
  console.log("initial fish", fish);

  // useEffect(() => {
  //   setFish(["salmon", "tuna"]);
  // }, []);

  return (
    <nav className="flex flex-1 justify-center gap-16  bg-primary-foreground p-8">
      <Button>
        <Home />
      </Button>
      <Drawer>
        <DrawerTrigger asChild>
          <Button>
            <Info />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="flex flex-col items-center text-center">
            <DrawerHeader>
              <DrawerTitle>Drawer Title</DrawerTitle>
            </DrawerHeader>
            <DrawerDescription>Drawer Description</DrawerDescription>
            <div>
              <p>
                Name: <span>Test</span>
              </p>
              <p>
                Age: <span>25</span>
              </p>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </nav>
  );
}
