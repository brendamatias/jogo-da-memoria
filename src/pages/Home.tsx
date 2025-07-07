import { ProgressBar } from "@/components";

export const Home = () => {
  return (
    <div>
      <div className="space-y-5 text-center mb-[30px] font-normal">
        <h1 className="text-4xl">Jogo da Memória</h1>
        <p className="text-lg text-[#919394] max-w-[398px] mx-auto">
          Você tem 15 tentativas para encontrar todos os pokemons
        </p>
      </div>

      <div>
        <div className="flex justify-between gap-4 items-end font-extrabold mb-1.5">
          <strong className="text-sm">Tentativas</strong>
          <h3 className="text-[26px]">5/15</h3>
        </div>

        <ProgressBar value={20} className="mb-8" />

        <div className="grid grid-cols-4 gap-6">
          {Array(12)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="h-32 w-32 bg-white rounded-2xl flex items-center justify-center text-black font-bold text-xl"
              >
                {index + 1}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
