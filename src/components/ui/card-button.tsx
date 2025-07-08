import bulbasaur from "@/assets/images/bulbasaur.png";
import charmander from "@/assets/images/charmander.png";
import cyndaquil from "@/assets/images/cyndaquil.png";
import eevee from "@/assets/images/eevee.png";
import píkachu from "@/assets/images/pikachu.png";
import squirtle from "@/assets/images/squirtle.png";
import pokeball from "@/assets/images/pokeball.png";

import { cn } from "@/lib";
import { memo } from "react";

export const originalItems = [
  "bulbasaur",
  "charmander",
  "cyndaquil",
  "eevee",
  "píkachu",
  "squirtle",
] as const;

type PokemonName = (typeof originalItems)[number];

const pokemonImages: Record<PokemonName, string> = {
  bulbasaur,
  charmander,
  cyndaquil,
  eevee,
  píkachu,
  squirtle,
};

export type Card = {
  id: number;
  content: PokemonName;
  isFlipped: boolean;
  isMatched: boolean;
  animationIndex: number;
};

interface CardButtonProps {
  card: Card;
  onFlip: () => void;
}

export const CardButton = memo(({ card, onFlip }: CardButtonProps) => {
  const isVisible = card.isFlipped || card.isMatched;
  const imageSrc = isVisible ? pokemonImages[card.content] : pokeball;

  const baseClass =
    "h-32 w-full rounded-2xl overflow-hidden flex items-center justify-center transition-all duration-300 scale-90 opacity-0 animate-[fadeIn_0.3s_ease-in_forwards]";
  const visibleClass = "bg-white";
  const hiddenClass = "bg-[#FF4C41]";

  return (
    <button
      onClick={onFlip}
      className={cn(baseClass, isVisible ? visibleClass : hiddenClass)}
      aria-label={isVisible ? `Carta de ${card.content}` : "Carta oculta"}
      disabled={card.isMatched}
      style={{
        animationDelay: `${card.animationIndex * 50}ms`,
      }}
    >
      <img src={imageSrc} alt={isVisible ? card.content : "Pokeball"} />
    </button>
  );
});
