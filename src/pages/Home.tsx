import {
  ProgressBar,
  CardButton,
  DialogEndGame,
  DialogSuccess,
} from "@/components";
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

  const disabled = gameOver || allMatched;

  return (
    <div>
      <div className="space-y-5 text-center mb-[30px] font-normal">
        <h1 className="text-3xl sm:text-4xl font-press-start">
          Jogo da Memória
        </h1>
        <p className="text-md sm:text-lg text-[#919394] max-w-[398px] mx-auto">
          Você tem {maxAttempts} tentativas para encontrar todos os pokemons
        </p>
      </div>

      <div className="flex justify-between gap-4 items-end font-extrabold mb-1.5">
        <strong className="text-sm">Tentativas</strong>
        <h3 className="text-[22px] sm:text-[26px]">
          {attempts}/{maxAttempts}
        </h3>
      </div>

      <ProgressBar value={percentage} className="mb-6 sm:mb-8" />

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-6">
        {cards.map((card) => (
          <CardButton
            key={card.id}
            card={card}
            onFlip={() => !disabled && handleFlip(card)}
          />
        ))}
      </div>

      <DialogSuccess
        open={allMatched}
        attempts={attempts}
        maxAttempts={maxAttempts}
        startNewGame={startNewGame}
      />

      <DialogEndGame
        open={gameOver}
        maxAttempts={maxAttempts}
        startNewGame={startNewGame}
      />
    </div>
  );
};
