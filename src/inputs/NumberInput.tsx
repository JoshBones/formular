import FormInput from "@formular/inputs/FormInput";
import React, { FC } from "react";
import { FormInput as FormInputType } from "@formular/types";

const NumberInput: FC<FormInputType<number>> = ({
    name,
    validationLabel,
    validators,
    ...otherProps
}) => (
    <FormInput<number>
        name={name}
        label={validationLabel}
        validators={validators}
    >
        {({ onChange, name, value }) => (
            <input
                type="number"
                name={name}
                value={value ? value.toString() : ""}
                onChange={(e) => onChange(parseInt(e.target.value, 10))}
                {...otherProps}
            />
        )}
    </FormInput>
);

export default NumberInput