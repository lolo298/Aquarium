function App() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-16 bg-secondary text-center">
      <h2 className="text-4xl font-bold">Bienvenue sur Aquarium ARcade</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed ratione
        soluta libero quasi eius dolor. Perspiciatis voluptatem aspernatur
        doloremque! Debitis, voluptatem soluta cumque veniam necessitatibus
        blanditiis saepe est doloribus porro?
      </p>
      <a
        href="/viewer"
        className="rounded-md bg-tertiary px-16 py-2 text-white"
      >
        Continuer
      </a>
    </div>
  );
}

export default App;
