import { FormularContext } from "@formular/globals";
import { FormContext } from "@formular/types";
import { render, RenderOptions } from "@testing-library/react";
import React, { ReactElement } from "react";

export const renderWithFormContext = (
    ui: ReactElement,
    options: Omit<RenderOptions, "wrapper"> & {
        providerProps?: Partial<FormContext>;
        initialValues?: Record<string, unknown>;
    } = {}
) => {
    const context: FormContext = {
        onChange: jest.fn(() => null),
        getValue: jest.fn((name: string) => options?.initialValues[name]),
        setValidity: jest.fn(() => null),
        getErrors: jest.fn(() => null),
        ...(options.providerProps || {}),
    };
    return {
        formContext: context,
        ...render(
            <FormularContext.Provider value={context}>
                {ui}
            </FormularContext.Provider>
        ),
    };
};

const errorMessage = "this looks bad, buddy";

export const alwaysBadValidator = {
    validator: () => ({
        isValid: false,
        message: errorMessage,
    }),
    errorMessage,
};
