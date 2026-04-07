type ButtonProps = React.ComponentPropsWithoutRef<"button"> & CustomButtonProps;

function cn(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const baseButtonClassName =
  "cursor-pointer inline-flex h-12 items-center justify-center rounded-md bg-emerald-600 px-5 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:opacity-60";

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  const variantClassName =
    variant === "secondary"
      ? "border border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-50"
      : undefined;

  return (
    <button
      type={type}
      className={cn(baseButtonClassName, variantClassName, className)}
      {...props}
    />
  );
}
