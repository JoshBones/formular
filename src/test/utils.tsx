import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { FormularContext } from "@formular/globals";
import { FormContext } from "@formular/types";

export const renderWithFormContext = (
    ui: ReactElement,
    options: Omit<RenderOptions, 'wrapper'> & { providerProps?: Partial<FormContext> } = {}
) => {
    const context: FormContext = {
        onChange: jest.fn(() => null),
        getValue: () => null,
        setValidity: () => null,
        ...(options.providerProps || {}),
    };
    return {
        formContext: context,
        ...render(
            <FormularContext.Provider value={context}>
                {ui}
            </FormularContext.Provider>
        )
    };
};
