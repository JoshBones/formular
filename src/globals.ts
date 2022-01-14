import { createContext } from "react";
import type { FormContext } from "./types";

export const FormularContext = createContext<FormContext>({
    onChange: () => null,
    getValue: () => null,
    setValidity: () => null,
    getErrors: () => null,
});
