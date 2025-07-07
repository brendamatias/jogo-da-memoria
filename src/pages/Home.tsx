import { ProgressBar, CardButton, Button } from "@/components";
import { useMemoryGame } from "@/hooks/useMemoryGame";

export const Home = () => {
  const {
    cards,
    attempts,
    percentage,
    maxAttempts,
    gameOver,
    allMatched,
    handleFlip,
    startNewGame,
  } = useMemoryGame();

  return (
    <div>
      <div className="space-y-5 text-center mb-[30px] font-normal">
        <h1 className="text-4xl">Jogo da Memória</h1>
        <p className="text-lg text-[#919394] max-w-[398px] mx-auto">
          Você tem {maxAttempts} tentativas para encontrar todos os pokemons
        </p>
      </div>

      <div>
        <div className="flex justify-between gap-4 items-end font-extrabold mb-1.5">
          <strong className="text-sm">Tentativas</strong>
          <h3 className="text-[26px]">
            {attempts}/{maxAttempts}
          </h3>
        </div>

        <ProgressBar value={percentage} className="mb-8" />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {cards.map((card) => (
            <CardButton
              key={card.id}
              card={card}
              onFlip={() => handleFlip(card)}
            />
          ))}
        </div>

        {allMatched && (
          <p className="text-green-600 text-center mt-6 font-medium text-lg">
            🎉 Parabéns! Você venceu!
          </p>
        )}

        {gameOver && !allMatched && (
          <p className="text-red-600 text-center mt-6 font-medium text-lg">
            ❌ Fim de jogo! Tente novamente.
          </p>
        )}

        <div className="text-center mt-8">
          <Button onClick={startNewGame}>Reiniciar Jogo</Button>
        </div>
      </div>
    </div>
  );
};
