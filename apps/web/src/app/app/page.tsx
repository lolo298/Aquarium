import { Button } from "@/ui/components/button";

// Installed app entrypoint
function App() {
  return (
    <div className="flex h-full w-full flex-[10] flex-col items-center justify-center gap-16 bg-secondary text-center">
      <h2 className="text-4xl font-bold">Bienvenue sur Aquarium ARcade</h2>
      <p>
        Plongez dans un univers sous-marin fascinant et découvrez toutes les
        espèces de poissons que cachent les côtes d'Armor... Trouvez-les dans
        l'aquarium, jouez avec eux, découvrez leur mode de vie et peut-être
        qu'ils vous feront assez confiance pour que vous puissiez les nourrir !
        Une expérience instructive et ludique en réalité augmentée !
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
