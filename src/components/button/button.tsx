import { Component, JSX, mergeProps } from "solid-js";

const ButtonVariant = {
  Default: "default",
  Positive: "positive",
  Negative: "negative",
} as const;

type ButtonVariants = (typeof ButtonVariant)[keyof typeof ButtonVariant];

type ButtonProps = {
  variant?: ButtonVariants;
  children?: JSX.Element;
  square?: boolean;
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: Component<ButtonProps> = (props) => {
  const finalProps = mergeProps({ variant: ButtonVariant.Default }, props);
  return (
    <button
      class="border rounded-md flex items-center font-bold text-shadow-2xs/50 border-none text-slate-50 -skew-x-2"
      classList={{
        "py-1 px-3": !finalProps.square,
        "p-1": finalProps.square,
        "bg-gradient-to-b from-sky-500 from-60% via-sky-600 via-60% to-sky-600":
          finalProps.variant === ButtonVariant.Default,
        "bg-gradient-to-b from-green-500 from-60% via-green-600 via-60% to-green-600":
          finalProps.variant === ButtonVariant.Positive,
        "bg-gradient-to-b from-red-600 from-60% via-red-700 via-60% to-red-600":
          finalProps.variant === ButtonVariant.Negative,
      }}
      {...finalProps}
    >
      {props.children}
    </button>
  );
};
