type InputProps = React.ComponentPropsWithoutRef<"input"> & CustomInputProps;

function cn(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const baseWrapperClassName = "relative w-full";
const baseInputClassName =
  "h-12 w-full rounded-md border border-emerald-400 bg-white pl-4 pr-12 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100";

export function Input({
  leftIcon,
  rightIcon,
  wrapperClassName,
  inputClassName,
  className,
  ...props
}: InputProps) {
  const hasLeftIcon = Boolean(leftIcon);
  const hasRightIcon = Boolean(rightIcon);

  return (
    <div className={cn(baseWrapperClassName, wrapperClassName)}>
      {hasLeftIcon ? (
        <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
          {leftIcon}
        </span>
      ) : null}

      <input
        className={cn(
          baseInputClassName,
          hasLeftIcon ? "pl-12" : undefined,
          hasRightIcon ? "pr-12" : undefined,
          inputClassName,
          className,
        )}
        {...props}
      />

      {hasRightIcon ? (
        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
          {rightIcon}
        </span>
      ) : null}
    </div>
  );
}
