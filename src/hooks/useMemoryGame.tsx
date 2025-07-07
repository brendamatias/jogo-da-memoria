import { useState, useEffect, useMemo, useCallback } from "react";
import { originalItems, type Card } from "@/components";

const MAX_ATTEMPTS = 15;

const shuffle = (contentArray: Card["content"][]): Card[] => {
  const duplicated = [...contentArray, ...contentArray];
  return duplicated
    .map((content, i) => ({
      id: i,
      content,
      isFlipped: false,
      isMatched: false,
    }))
    .sort(() => Math.random() - 0.5);
};

export function useMemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [selected, setSelected] = useState<Card[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [isBusy, setIsBusy] = useState(false);

  const percentage = useMemo(() => (attempts / MAX_ATTEMPTS) * 100, [attempts]);

  const allMatched = cards.length > 0 && cards.every((c) => c.isMatched);
  const gameOver = attempts >= MAX_ATTEMPTS && !allMatched;

  const startNewGame = useCallback(() => {
    setCards(shuffle([...originalItems]));
    setSelected([]);
    setAttempts(0);
    setIsBusy(false);
  }, [originalItems]);

  const handleFlip = useCallback(
    (card: Card) => {
      if (card.isFlipped || card.isMatched || selected.length === 2 || isBusy)
        return;

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
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.content === first.content ? { ...c, isMatched: true } : c
              )
            );
            setSelected([]);
            setIsBusy(false);
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
            setIsBusy(false);
          }, 800);
        }
      }
    },
    [cards, selected, isBusy]
  );

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
