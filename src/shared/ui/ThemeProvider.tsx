import { ReactNode, useEffect } from "react";
import { useAppSelector } from "@shared/lib/hooks";

interface Props {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: Props) => {
  const theme = useAppSelector((state) => state.settings.theme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return children;
};

