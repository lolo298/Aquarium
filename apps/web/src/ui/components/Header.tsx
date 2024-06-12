import Image from "next/image";

export default function Header() {
  return (
    <div className="flex-1 gap-16 bg-primary-foreground p-2">
      <div className="relative h-full">
        <img
          src="/images/logo_aquarium.png"
          alt="Aquarium de trégastel"
          className="absolute inset-0 h-full object-contain"
        />
      </div>
    </div>
  );
}
