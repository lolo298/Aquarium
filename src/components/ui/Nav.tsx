"use client";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "./drawer";

export default function Nav() {
  return (
    <nav className="absolute bottom-0 inset-x-0 flex justify-center gap-16 p-8 bg-white">
      <button className="bg-blue-500 p-4">Home</button>
      <Drawer>
        <DrawerTrigger asChild>
          <button className="bg-red-500 p-4">Info</button>
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
