import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components";

interface DialogEndGameProps {
  open: boolean;
  maxAttempts: number;
  startNewGame: () => void;
}

export const DialogEndGame = ({
  open,
  maxAttempts,
  startNewGame,
}: DialogEndGameProps) => {
  return (
    <Dialog open={open}>
      <DialogContent className="text-center">
        <DialogHeader>
          <div className="text-6xl text-center">😔</div>
          <DialogTitle className="text-2xl font-bold text-center">
            Fim de Jogo!
          </DialogTitle>
          <DialogDescription className="text-red-500 text-lg text-center">
            Suas tentativas acabaram!
          </DialogDescription>
        </DialogHeader>

        <p className="text-lg text-[#919394] mb-4">
          Você usou todas as {maxAttempts} tentativas
        </p>

        <DialogFooter className="sm:justify-center">
          <Button onClick={startNewGame}>Tentar Novamente</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
