import { createContext, Dispatch, SetStateAction } from "react";

interface FuriganaContextType {
  showFurigana: boolean;
  toggleShowFurigana: Dispatch<SetStateAction<boolean>>;
}

export const FuriganaContext = createContext<FuriganaContextType>({
  showFurigana: false,
  toggleShowFurigana: () => {},
});
