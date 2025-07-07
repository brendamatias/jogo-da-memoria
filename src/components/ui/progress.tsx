import { cn } from "@/lib";

interface ProgressBarProps {
  value: number;
  className?: string;
}

export const ProgressBar = ({ value, className }: ProgressBarProps) => {
  return (
    <div
      className={cn(
        "w-full bg-[#424446] rounded-2xl h-3.5 overflow-hidden",
        className
      )}
    >
      <div
        className="bg-white h-full transition-all duration-300 ease-in-out rounded-2xl"
        style={{ width: `${value}%` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
};
