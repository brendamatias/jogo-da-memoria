import bulbasaur from "@/assets/images/bulbasaur.png";
import charmander from "@/assets/images/charmander.png";
import cyndaquil from "@/assets/images/cyndaquil.png";
import eevee from "@/assets/images/eevee.png";
import píkachu from "@/assets/images/pikachu.png";
import squirtle from "@/assets/images/squirtle.png";
import pokeball from "@/assets/images/pokeball.png";

import { cn } from "@/lib";

export const originalItems = [
  "bulbasaur",
  "charmander",
  "cyndaquil",
  "eevee",
  "píkachu",
  "squirtle",
] as const;

type PokemonName = (typeof originalItems)[number];

const images: Record<PokemonName, string> = {
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
};

interface CardButtonProps {
  card: Card;
  onFlip: () => void;
}
export const CardButton = ({ card, onFlip }: CardButtonProps) => {
  const isVisible = card.isFlipped || card.isMatched;

  return (
    <button
      onClick={onFlip}
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
};
