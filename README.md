## Formular

*React forms made easyish (maybe?) - for Wooga <3*

## Project structure

I've sort-of built this as if it would be a standalone library that could be published to npm (after much polishing)

I haven't included any build system for this yet, just storybook so you can view the examples.

### commands:

* `npm start` - run storybook
* `npm t` - run unit / integ tests

## Quick start

The most basic use case is pretty simple:

```tsx
import Form from "@formular/form";
import StringInput from "@formular/inputs/StringInput";
import NumberInput from "@formular/inputs/NumberInput";
import isRequired from "@formular/validators/required";

const initialValues = {
    firstname: "",
    lastname: "",
    age: null
}

type MyFormValues = {
    firstname: string;
    lastname: string;
    age: number;
}

const MyForm: FC = () => (
    <Form<MyFormValues> initialValues={initialValues} onSubmit={(values /* typed values passed here */) => sendToApi(values)}>
        <StringInput name="firstname" validationLabel="First Name" validators={[isRequired]}/>
        <StringInput name="firstname" />
        <NumberInput name="firstname" />
        <button type="submit">Submit</button>
    </Form>
);
```

## Basic Philosophy

Forms are complex. Building a flexible and robust re-implementation of forms in react is complex,
so I didn't try to do it. Instead, I've attempted to stick as closely to a normal HTML form as possible
with these exceptions:

1. The default form submit method has been replaced with a callback that passes all the values of the form,
   the user must manually handle submission (with whatever async or synchronous techniques they want)
1. The basic input has been broken up into several typed inputs (currently only one for strings, one for numbers.
   They all use normal inputs under the covers though, so the user can attach whatever regular attributes they want (excepting `name`, `value`, `type`, `onBlur` and `onChange`)

This approach gives us the benefits of being able to work with our forms much like regular HTML forms, including full control over layout and styling.

## How it all works

The `Form` component exposes a bunch of functionality for reading from / writing to form fields via 
[react's context api](https://reactjs.org/docs/context.html). The `FormInput` component accesses this context, and exposes
the functionality to whatever input it is wrapping. 

The user must provide initial / default values which the form component uses to initialise the fields and ensure that the correct
structure is returned even if some fields remain untouched.

## Features

### Custom Inputs

All the built in inputs just use the `FormInput` component to wrap a real input. This would also be how the user could
create new inputs. I've included a `PhoneNumberInput` component to give an idea how this could work, but essentially
anything that accepts some kind of user input and passes the value via the `FormInput`'s `onChange` callback can be an input.

### Typing of Form Values

This is optional, but we can easily type the values of inputs. See the implementation of `NumberInput` to see what I mean.
Here we cast the string value to an number. `FormInput` is generic, which gives some type safety when implementing custom inputs.

At the top level, `Form` is built in such a way that typescript can infer types based on the initial values
passed in. Sometimes this isn't enough though, for example if we initialiase a value as `null` then TS will just infer `any` as a type.
To get fix this, `Form` is generic so we can assert the actual types we expect.

Honestly, I had hoped to strictly enforce types all the way down the tree so we don't need to just do type assertions, but I
couldn't find a solution I was happy with in the time available.

### Validation

There is some simple synchronous validation included. At the moment this is triggered by the inputs themselves, as they can best decide when its appropriate.
Given more time I would investigate adding async validation.

Validators are strongly typed, so its simple for users to add new ones as required with the `Validator<InputType>` type.

## What is missing?

There are some important things missing, but time was limited so I've just listed them here in some kind of priority order

* comprehensive testing. This was very exploratory, so TDD wasn't really appropriate. As such, testing is not comprehensive.
* initial form validation for things like required fields, etc.
* error message localisation
* array fields. Pretty simple to implement as a custom input.
* comprehensive examples. I would have loved to demo a wizard style form!
* async validation
* performance testing
