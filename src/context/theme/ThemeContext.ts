import { createContext } from "react";
import { ThemeContextType } from "@/types/theme.types";

export const ThemeContext = createContext<ThemeContextType | null>(null);
