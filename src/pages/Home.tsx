import { ProgressBar } from "@/components";
import { useEffect, useState } from "react";
import { cn } from "@/lib";

import bulbasaur from "@/assets/images/bulbasaur.png";
import charmander from "@/assets/images/charmander.png";
import cyndaquil from "@/assets/images/cyndaquil.png";
import eevee from "@/assets/images/eevee.png";
import píkachu from "@/assets/images/pikachu.png";
import squirtle from "@/assets/images/squirtle.png";
import pokeball from "@/assets/images/pokeball.png";

const originalItems = [
  "bulbasaur",
  "charmander",
  "cyndaquil",
  "eevee",
  "píkachu",
  "squirtle",
];

const images: Record<string, string> = {
  bulbasaur,
  charmander,
  cyndaquil,
  eevee,
  píkachu,
  squirtle,
};

type Card = {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
};

function shuffle(array: string[]) {
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

  const maxAttempts = 15;
  const percentage = (attempts / maxAttempts) * 100;

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
    setCards(shuffle(originalItems));
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

        <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-6 gap-4">
          {cards.map((card) => {
            const isVisible = card.isFlipped || card.isMatched;

            return (
              <button
                key={card.id}
                onClick={() => handleFlip(card)}
                className={cn(
                  "h-32 w-full rounded-2xl overflow-hidden flex items-center justify-center transition-all duration-300",
                  isVisible ? "bg-white" : "bg-[#FF4C41]"
                )}
              >
                <img
                  src={isVisible ? images[card.content] : pokeball}
                  alt={isVisible ? card.content : "Pokeball"}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
