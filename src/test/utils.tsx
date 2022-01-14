import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { FormularContext } from "@formular/globals";
import { FormContext } from "@formular/types";

export const renderWithFormContext = (
    ui: ReactElement,
    options: Omit<RenderOptions, 'wrapper'> & { providerProps?: Partial<FormContext>, value?: unknown } = { value: "" }
) => {
    const context: FormContext = {
        onChange: jest.fn(() => null),
        getValue: () => options.value,
        setValidity: () => null,
        getErrors: () => [],
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
