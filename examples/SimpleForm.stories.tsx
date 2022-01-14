import React, { FC } from "react";
import Form from "@formular/Form";
import StringInput from "@formular/inputs/StringInput";
import isRequired from "@formular/validators/required";
import Errors from "./Errors";
import NumberInput from "@formular/inputs/NumberInput";
import styled from "styled-components";

const initialValues = {
    firstname: "",
    lastname: "",
    age: null,
};

type FormValues = {
    firstname: string;
    lastname: string;
    age: number;
};

const FormContainer = styled.div`
    width: 500px;
`;

const FormRow = styled.div`
    padding: 10px;
`;

const InputWithLabel = styled.label`
    display: grid;
    grid-template-columns: 20% 80%;

    & > input {
        padding: 5px;
    }
`;

const SubmitButton = styled.button.attrs(() => ({
    type: "submit",
}))`
    padding: 5px 10px;
    margin-right: 10px;
    float: right; // look at me, using float like its 1995
`;

const SimpleForm: FC<{ onSubmit: () => void }> = ({ onSubmit }) => (
    <FormContainer>
        <Form<FormValues>
            title="Simple Form"
            onSubmit={onSubmit}
            initialValues={initialValues}
        >
            {({ errors, isFormValid }) => (
                <>
                    <h2>Simple Form Example</h2>
                    <FormRow>
                        <Errors errors={errors.firstname} />
                        <InputWithLabel>
                            First Name *
                            <StringInput
                                name="firstname"
                                validationLabel="First Name"
                                validators={[isRequired]}
                            />
                        </InputWithLabel>
                    </FormRow>
                    <FormRow>
                        <Errors errors={errors.lastname} />
                        <InputWithLabel>
                            Last Name *
                            <StringInput
                                name="lastname"
                                validationLabel="Last Name"
                                validators={[isRequired]}
                            />
                        </InputWithLabel>
                    </FormRow>
                    <FormRow>
                        <Errors errors={errors.age} />
                        <InputWithLabel>
                            Age *
                            <NumberInput
                                name="age"
                                validationLabel="Age"
                                validators={[isRequired]}
                            />
                        </InputWithLabel>
                    </FormRow>
                    <SubmitButton disabled={!isFormValid}>Submit</SubmitButton>
                </>
            )}
        </Form>
    </FormContainer>
);

export default {
    title: "Examples",
    component: SimpleForm,
    argTypes: { onSubmit: { action: "submitted" } },
};

const Template = (args) => <SimpleForm {...args} />;

export const SimpleFormStory = Template.bind({});
