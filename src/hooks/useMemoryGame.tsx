import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { originalItems, type Card } from "@/components";
import { useSound } from ".";

const MAX_ATTEMPTS = 15;

const shuffle = (contentArray: Card["content"][]): Card[] => {
  const duplicated = [...contentArray, ...contentArray];

  const shuffled = duplicated
    .map((content, i) => ({
      id: i,
      content,
      isFlipped: false,
      isMatched: false,
    }))
    .sort(() => Math.random() - 0.5);

  return shuffled.map((card, index) => ({
    ...card,
    animationIndex: index,
  }));
};

export function useMemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [selected, setSelected] = useState<Card[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [isBusy, setIsBusy] = useState(false);

  const percentage = useMemo(() => (attempts / MAX_ATTEMPTS) * 100, [attempts]);
  const hasLost = useRef(false);

  const allMatched = cards.length > 0 && cards.every((c) => c.isMatched);
  const gameOver = attempts >= MAX_ATTEMPTS && !allMatched;

  const flipSound = useSound("/sounds/flip.mp3");
  const matchSound = useSound("/sounds/match.mp3");
  const incorrectSound = useSound("/sounds/incorrect.mp3");
  const loseSound = useSound("/sounds/lose.mp3");
  const winSound = useSound("/sounds/win.mp3");
  const resetSound = useSound("/sounds/reset.mp3");

  const startNewGame = useCallback(() => {
    hasLost.current = false;
    resetSound();
    setCards(shuffle([...originalItems]));
    setSelected([]);
    setAttempts(0);
    setIsBusy(false);
  }, [originalItems]);

  const handleFlip = useCallback(
    (card: Card) => {
      if (card.isFlipped || card.isMatched || selected.length === 2 || isBusy)
        return;

      flipSound();

      const updated = cards.map((c) =>
        c.id === card.id ? { ...c, isFlipped: true } : c
      );

      setCards(updated);

      const newSelected = [...selected, { ...card, isFlipped: true }];
      setSelected(newSelected);

      if (newSelected.length === 2) {
        setIsBusy(true);
        setAttempts((a) => a + 1);

        const [first, second] = newSelected;

        if (first.content === second.content) {
          matchSound();
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.content === first.content ? { ...c, isMatched: true } : c
              )
            );
            setSelected([]);
            setIsBusy(false);
          }, 300);
        } else {
          setTimeout(() => {
            if (attempts + 1 < MAX_ATTEMPTS) {
              incorrectSound();
            }
            setCards((prev) =>
              prev.map((c) =>
                c.id === first.id || c.id === second.id
                  ? { ...c, isFlipped: false }
                  : c
              )
            );
            setSelected([]);
            setIsBusy(false);
          }, 800);
        }
      }
    },
    [cards, selected, isBusy]
  );

  useEffect(() => {
    if (allMatched) {
      setTimeout(() => {
        winSound();
      }, 300);
    }
    if (!allMatched && attempts >= MAX_ATTEMPTS && !hasLost.current) {
      loseSound();
      hasLost.current = true;
    }
  }, [allMatched, attempts, winSound, loseSound]);

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  return {
    cards,
    selected,
    attempts,
    percentage,
    maxAttempts: MAX_ATTEMPTS,
    gameOver,
    allMatched,
    handleFlip,
    startNewGame,
  };
}
