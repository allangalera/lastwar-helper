import { Component, JSX, mergeProps } from "solid-js";
import { tv, VariantProps } from "tailwind-variants";

const button = tv({
  base: "border rounded-md flex items-center font-bold text-shadow-2xs/50 text-slate-50 border-none -skew-x-2 bg-gradient-to-b cursor-pointer",
  variants: {
    color: {
      primary: "from-sky-500 from-60% via-sky-600 via-60% to-sky-600",
      positive: "from-green-500 from-60% via-green-600 via-60% to-green-600",
      negative: "from-red-600 from-60% via-red-700 via-60% to-red-600",
    },
    disabled: {
      true: "from-neutral-400 from-60% via-neutral-500 via-60% to-neutral-400 cursor-not-allowed text-slate-50/70",
    },
    square: {
      true: "p-1",
      false: "py-1 px-3",
    },
  },
  compoundVariants: [
    {
      size: ["sm", "md"],
      class: "px-3 py-1",
    },
  ],
  defaultVariants: {
    color: "primary",
    square: false,
  },
});
type ButtonVariants = VariantProps<typeof button>;

type ButtonProps = ButtonVariants & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: Component<ButtonProps> = (props) => {
  return (
    <button
      class={button({
        color: props.color,
        disabled: props.disabled,
        square: props.square,
      })}
      {...props}
    >
      {props.children}
    </button>
  );
};
