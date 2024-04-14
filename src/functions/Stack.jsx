
import { useLocalStorage } from "@uidotdev/usehooks";

export const useStack = () => {
  const [stack, setStack] = useLocalStorage("stack",[]);

  const push = (value) => {
    if (stack.length == 0 && stack[stack.length-1] != value) setStack([value]);
    else if (stack.length == 1 && stack[stack.length - 1] != value)
      setStack([...stack, value]);
    else if (stack.length == 2 && stack[stack.length - 1] != value)
      setStack([stack[1], value]);
  };

  return { push, stack };
};
