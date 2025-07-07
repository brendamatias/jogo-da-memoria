import {
  ProgressBar,
  type Card,
  CardButton,
  originalItems,
} from "@/components";
import { useEffect, useMemo, useState } from "react";

const MAX_ATTEMPTS = 15;

function shuffle(array: Card["content"][]): Card[] {
  return array
    .concat(array)
    .map((content, i) => ({
      id: i,
      content,
      isFlipped: false,
      isMatched: false,
    }))
    .sort(() => Math.random() - 0.5);
}

export const Home = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [selected, setSelected] = useState<Card[]>([]);
  const [attempts, setAttempts] = useState(0);

  const percentage = useMemo(() => (attempts / MAX_ATTEMPTS) * 100, [attempts]);

  const handleFlip = (card: Card) => {
    if (card.isFlipped || card.isMatched || selected.length === 2) return;

    const updated = cards.map((c) =>
      c.id === card.id ? { ...c, isFlipped: true } : c
    );

    setCards(updated);

    const newSelected = [...selected, { ...card, isFlipped: true }];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      setAttempts((a) => a + 1);

      const [first, second] = newSelected;

      if (first.content === second.content) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.content === first.content ? { ...c, isMatched: true } : c
            )
          );

          setSelected([]);
        }, 500);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === first.id || c.id === second.id
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setSelected([]);
        }, 800);
      }
    }
  };

  const startNewGame = () => {
    setCards(shuffle([...originalItems]));
    setSelected([]);
    setAttempts(0);
  };

  useEffect(() => {
    startNewGame();
  }, []);

  return (
    <div>
      <div className="space-y-5 text-center mb-[30px] font-normal">
        <h1 className="text-4xl">Jogo da Memória</h1>
        <p className="text-lg text-[#919394] max-w-[398px] mx-auto">
          Você tem {MAX_ATTEMPTS} tentativas para encontrar todos os pokemons
        </p>
      </div>

      <div>
        <div className="flex justify-between gap-4 items-end font-extrabold mb-1.5">
          <strong className="text-sm">Tentativas</strong>
          <h3 className="text-[26px]">
            {attempts}/{MAX_ATTEMPTS}
          </h3>
        </div>

        <ProgressBar value={percentage} className="mb-8" />

        <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-6 gap-4">
          {cards.map((card) => (
            <CardButton
              key={card.id}
              card={card}
              onFlip={() => handleFlip(card)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
