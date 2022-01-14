import React, {
    FC,
    ComponentType,
    ReactNode, 
    ReactElement,
    useState,
    useCallback,
    useMemo,
    createContext,
    useContext,
    FormEventHandler,
} from "react";

type FormInputProps<T> = {
    name: string;
    defaultValue: T;
    onChange: (value: T) => void;
    [propName: string]: unknown;
};

type FormInput<T> = ComponentType<FormInputProps<T>>;

type FormDescriptionInput<T> = {
    readableName: string,
    defaultValue: T,
    Component: FormInput<T>
}

type FormDescription = Record<string, FormDescriptionInput<unknown>>;

const StringInput: FormInput<string> = ({
    name,
    defaultValue,
    onChange,
}: FormInputProps<string>) => (
    <input
        type="string"
        name={name}
        defaultValue={defaultValue}
        onChange={(e) => onChange(e.target.value)}
    />
);

const NumberInput: FormInput<number> = ({
    name,
    defaultValue,
    onChange,
}: FormInputProps<number>) => (
    <input
        type="number"
        name={name}
        defaultValue={defaultValue}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
    />
);


export type Form = {
    fields: Record<string,ReactElement>;
    FormComponent
};

interface ConfiguredInputProps<T> extends Exclude<FormDescriptionInput<T>, "defaultValue"> {
    name: string;
    value: T;
    onChange: (value: T) => void;
};

// function createConfiguredInput<T>({ Component, name, value, onChange }: ConfiguredInputProps<T>) {
//     const ConfiguredInput: FC<{ [propName: string]: unknown }> = ({
//         ...allProps
//     } = {}) => (
//         <Component
//             {...allProps}
//             name={name}
//             value={value}
//             onChange={onChange}
//         />
//     );

//     return ConfiguredInput;
// }

type ConfiguredFormInputs<Description extends FormDescription> = {
    [Property in keyof Description]: FC<{[propName: string]: unknown}>
}
// type ConfiguredFormInputs<Description extends FormDescription> = {
//     [Property in keyof Description]: FormInput<Description[Property]["defaultValue"]>
// }

type FormProps<Description extends FormDescription> = {
    config: Description;
    onSubmit: (values: FormValues<Description>) => void;
    children: ({
        configuredInputs,
    }: {
        configuredInputs: ConfiguredFormInputs<Description>
    }) => ReactNode;
};

type FormValues<Description extends FormDescription> = {
    [Property in keyof Description]: Description[Property]["defaultValue"];
}

type FormContext<Description extends FormDescription> = {
    getValue: (name: keyof Description) => unknown; 
    setValue: <T>(name: keyof Description, value: T) => void;
}

function createFormContext<T extends FormDescription>() {
    return createContext<FormContext<T>>({
        getValue: () => null,
        setValue: () => null
    });
}

function Form<Description extends FormDescription>({
    config,
    onSubmit,
    children
}: FormProps<Description>) {
    const Context = useMemo(() => createFormContext<Description>(), []);
    const [formValues, setFormValues] = useState<FormValues<Description>>(
        () => Object.keys(config).reduce(
            (acc, name: keyof Description) => {
                acc[name] = config[name].defaultValue;
                return acc;
            },
            {} as FormValues<Description>
        )
    );
    const onFieldChange = useCallback(
        function(name: keyof Description, newValue: unknown) {
            setFormValues({
                ...formValues,
                [name]: newValue,
            });
        },
        [formValues]
    );
    const getFieldValue = (name: keyof Description) => formValues[name];
    const configuredInputs = useMemo(
        () => 
            Object.keys(config).reduce((acc, name: keyof Description) => {
                const { Component } = config[name];
                const ConfiguredInput: FC<{ [propName: string]: unknown }> = ({
                    ...allProps
                } = {}) => {
                    const formContext = useContext(Context);

                    return (
                        <Component
                            key={`input-${name}`}
                            {...allProps}
                            name={name as string}
                            defaultValue={config[name].defaultValue}
                            onChange={(value) =>
                                formContext.setValue(name, value)
                            }
                        />
                    );
                };
                acc[name] = ConfiguredInput;
                return acc;
            }, {} as ConfiguredFormInputs<Description>),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );
    const onFormSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        onSubmit(formValues);
    };
    return (
        <Context.Provider
            value={{ setValue: onFieldChange, getValue: getFieldValue }}
        >
            <form onSubmit={onFormSubmit}>
                {children({ configuredInputs })}
            </form>
        </Context.Provider>
    );
}

type MyForm = {
    firstname: FormDescriptionInput<string>;
    age: FormDescriptionInput<number>;
}

const formFields: MyForm = {
    firstname: {
        readableName: "First Name",
        defaultValue: "",
        Component: StringInput
    },
    age: {
        readableName: "Age",
        defaultValue: null,
        Component:NumberInput
    },
};

type MyFormProps<T extends FormDescription> = {
    onSubmit: (value: FormValues<T>) => void; 
}

const MyForm: FC<MyFormProps<MyForm>> = ({ onSubmit }) => (
    <Form<MyForm> onSubmit={onSubmit} config={formFields}>
        {({ configuredInputs }) => (
            <>
                <label>
                    {formFields.firstname.readableName}
                    <configuredInputs.firstname />
                </label>
                <label>
                    {formFields.age.readableName}
                    <configuredInputs.age />
                </label>
                <button type="submit">submit</button>
            </>
        )}
    </Form>
);

export default MyForm;