"use client";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "./drawer";

import { Button } from "./button";
import { Home, Info } from "lucide-react";

export default function Nav() {
  return (
    <nav className="absolute bottom-0 inset-x-0 flex justify-center gap-16 p-8 bg-primary-foreground">
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
