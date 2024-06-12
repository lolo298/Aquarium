import { Button } from "@/ui/components/button";

function App() {
  return (
    <div className="flex h-full w-full flex-[10] flex-col items-center justify-center gap-16 bg-secondary text-center">
      <h2 className="text-4xl font-bold">Bienvenue sur Aquarium ARcade</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed ratione
        soluta libero quasi eius dolor. Perspiciatis voluptatem aspernatur
        doloremque! Debitis, voluptatem soluta cumque veniam necessitatibus
        blanditiis saepe est doloribus porro?
      </p>
      <Button
        href="/viewer"
        size="lg"
        className="bg-[linear-gradient(to_bottom,#00000055,#00000055_40%,#FFFFFF88_60%,#FFFFFF88)]"
      >
        Continuer
      </Button>
    </div>
  );
}

export default App;
