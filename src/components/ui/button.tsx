import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/lib/utils/cn";

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "ghost";
  }
>;

export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-medium transition duration-200",
        variant === "primary" &&
          "border-ember bg-ember text-shell hover:-translate-y-0.5 hover:bg-[#c26445]",
        variant === "secondary" &&
          "border-line bg-shell/70 text-ink hover:border-ink/30 hover:bg-white",
        variant === "ghost" && "border-transparent bg-transparent text-ink/72 hover:text-ink",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
