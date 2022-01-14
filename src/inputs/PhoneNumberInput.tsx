import React, { FC } from "react";
import FormInput from "./FormInput";
import { FormInput as FormInputType } from "@formular/types";

const PhoneNumberInput: FC<FormInputType<[string, string]>> = ({
    name,
    validationLabel,
    validators,
    ...otherProps
}) => {
    return (
        <FormInput<[string, string]>
            name={name}
            validationLabel={validationLabel}
            validators={validators}
        >
            {({ onChange, name, value, triggerValidation }) => (
                <>
                    <input
                        type="string"
                        name={`${name}-areacode`}
                        value={value[0] || ""}
                        onChange={(e) =>
                            onChange([e.target.value, value[1] || ""])
                        }
                        {...otherProps}
                    />
                    <input
                        type="number"
                        name={`${name}-number`}
                        value={value[1] || ""}
                        onChange={(e) =>
                            onChange([value[0] || "", e.target.value])
                        }
                        onBlur={triggerValidation}
                        {...otherProps}
                    />
                </>
            )}
        </FormInput>
    );
};

export default PhoneNumberInput;
