import { type Component, mergeProps, type JSX } from "solid-js";

type InputProps = {} & JSX.InputHTMLAttributes<HTMLInputElement>;

export const Input: Component<InputProps> = (props) => {
  const finalProps = mergeProps({}, props);
  return (
    <input
      class="border w-full text-center appearance-none bg-neutral-950/30 inset-shadow-xs inset-shadow-neutral-950"
      {...finalProps}
    />
  );
};
