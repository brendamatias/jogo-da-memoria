import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components";

interface DialogSuccessProps {
  open: boolean;
  attempts: number;
  maxAttempts: number;
  startNewGame: () => void;
}

export const DialogSuccess = ({
  open,
  attempts,
  maxAttempts,
  startNewGame,
}: DialogSuccessProps) => {
  return (
    <Dialog open={open}>
      <DialogContent className="text-center">
        <DialogHeader>
          <div className="text-6xl text-center">🎉</div>
          <DialogTitle className="text-2xl font-bold text-center">
            Parabéns!
          </DialogTitle>
          <DialogDescription className="text-green-500 text-lg text-center">
            Todos os pokémons foram encontrados!
          </DialogDescription>
        </DialogHeader>

        <p className="text-lg text-[#919394] mb-4">
          Você usou {attempts} de {maxAttempts} tentativas
        </p>

        <DialogFooter className="sm:justify-center">
          <Button onClick={startNewGame}>Jogar Novamente</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
