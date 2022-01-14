import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "./Form";
import StringInput from "@formular/inputs/StringInput";
import NumberInput from "./inputs/NumberInput";

const renderForm = ({
    fields = [],
    initialValues = {},
}: {
    fields?: Array<{ label: string; name: string }>;
    initialValues?: Record<string, unknown>;
} = {}) => {
    const onSubmitCallback = jest.fn().mockName("onSubmitCallback");
    return {
        onSubmitCallback,
        ...render(
            <Form onSubmit={onSubmitCallback} initialValues={initialValues}>
                {fields.map(({ label, name }) => (
                    <label key={name}>
                        {label}
                        <StringInput name={name} />
                    </label>
                ))}

                <button type="submit">submit form</button>
            </Form>
        ),
    };
};

test("Form should render a form", () => {
    const { getByRole } = renderForm();

    expect(getByRole("form")).toBeInTheDocument();
});

test("Form should render a simple form", () => {
    const fields = [{ label: "First Name", name: "firstname" }];
    const { getByLabelText } = renderForm({ fields });

    expect(getByLabelText(fields[0].label)).toBeInTheDocument();
});

test("Form should submit all values", () => {
    const valuesToInput = [
        { label: "First Name", name: "firstname", value: "Bobby" },
        { label: "Last Name", name: "lastname", value: "McRobby" },
    ];
    const fields = valuesToInput.map(({ label, name }) => ({ label, name }));
    const initialValues = {
        firstname: "",
        lastname: "",
    };
    const { getByLabelText, getByRole, onSubmitCallback } = renderForm({
        fields,
        initialValues,
    });

    valuesToInput.forEach(({ label, value }) => {
        userEvent.type(getByLabelText(label), value);
    });

    userEvent.click(getByRole("button"));

    const expectedResult = valuesToInput.reduce((acc, { name, value }) => {
        acc[name] = value;
        return acc;
    }, {});

    expect(onSubmitCallback).toHaveBeenCalledWith(expectedResult);
});

test("Form should submit all values even when some are unset", () => {
    const valuesToInput = [
        { label: "First Name", name: "firstname", value: "Bobby" },
    ];
    const fields = [
        { label: "First Name", name: "firstname" },
        { label: "Last Name", name: "lastname" },
    ];
    const initialValues = {
        firstname: "",
        lastname: "",
    };
    const { getByLabelText, getByRole, onSubmitCallback } = renderForm({ fields, initialValues });

    valuesToInput.forEach(({ label, value }) => {
        userEvent.type(getByLabelText(label), value);
    });

    userEvent.click(getByRole("button"));

    const expectedResult = valuesToInput.reduce(
        (acc, { name, value }) => {
            acc[name] = value;
            return acc;
        },
        { lastname: "" }
    );

    expect(onSubmitCallback).toHaveBeenCalledWith(expectedResult);
});

test("Form should return typed values", () => {
    const valuesToInput = {
        firstname: { label: "First Name", value: "Bobby" },
        lastname: { label: "Last Name", value: "McRobby" },
        age: { label: "Age", value: 25 },
        phone: { label: "Phone No.", value: ["", ""]}
    };
    const initialValues = {
        firstname: "",
        lastname: "",
        age: null
    };
    const onSubmitCallback = jest.fn().mockName("onSubmitCallback");
    const { getByLabelText, getByRole } = render(
        <Form onSubmit={onSubmitCallback} initialValues={initialValues}>
            <label>
                {valuesToInput.firstname.label}
                <StringInput name="firstname" />
            </label>
            <label>
                {valuesToInput.lastname.label}
                <StringInput name="lastname" />
            </label>
            <label>
                {valuesToInput.age.label}
                <NumberInput name="age" />
            </label>

            <button type="submit">submit form</button>
        </Form>
    );

    userEvent.type(getByLabelText(valuesToInput.firstname.label), valuesToInput.firstname.value);
    userEvent.type(getByLabelText(valuesToInput.lastname.label), valuesToInput.lastname.value);
    userEvent.type(getByLabelText(valuesToInput.age.label), valuesToInput.age.value.toString());
    userEvent.click(getByRole("button"));

    const expectedResult = {
        firstname: "Bobby" ,
        lastname: "McRobby",
        age: 25,
    };

    expect(onSubmitCallback).toHaveBeenCalledWith(expectedResult);
});