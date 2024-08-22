import { createContext } from "react";
import { AuthContextType } from "../types/Types";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
