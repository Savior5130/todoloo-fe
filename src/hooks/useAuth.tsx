import React from "react";
import { AuthContext } from "./authContext";

export const useAuth = () => React.useContext(AuthContext);
