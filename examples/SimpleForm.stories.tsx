import React, { FC } from "react";
import Form from "@formular/Form";
import StringInput from "@formular/inputs/StringInput";
import isRequired from "@formular/validators/required";
import Errors from "./Errors";
import NumberInput from "@formular/inputs/NumberInput";

const initialValues = {
    firstname: "",
    lastname: "",
    age: null,
};

type FormValues = {
    firstname: string;
    lastname: string;
    age: number;
}

const SimpleForm: FC<{ onSubmit: () => void }> = ({ onSubmit }) => (
    <Form<FormValues> onSubmit={onSubmit} initialValues={initialValues}>
        {({ errors }) => (
            <>
                <div>
                    <Errors errors={errors.firstname} />
                    <label>
                        First Name
                        <StringInput
                            name="firstname"
                            validationLabel="First Name"
                            validators={[isRequired]}
                        />
                    </label>
                </div>
                <div>
                    <Errors errors={errors.lastname} />
                    <label>
                        Last Name
                        <StringInput
                            name="lastname"
                            validationLabel="Last Name"
                            validators={[isRequired]}
                        />
                    </label>
                </div>
                <div>
                    <Errors errors={errors.age} />
                    <label>
                        Age
                        <NumberInput
                            name="age"
                            validationLabel="Age"
                            validators={[isRequired]}
                        />
                    </label>
                </div>
                <button type="submit">Submit</button>
            </>
        )}
    </Form>
);

export default {
    title: "Examples",
    component: SimpleForm,
    argTypes: { onSubmit: { action: "submitted" } },
};

const Template = (args) => <SimpleForm {...args} />;

export const SimpleFormStory = Template.bind({});
