import React, { useState, useEffect } from "react";
import {
    DigitTextField,
    DigitSelect,
    useDigitFormField,
    DigitForm,
    DigitLayout,
    DigitButton,
} from "@cthit/react-digit-components";
import * as yup from "yup";

export const AddLink = () => {
    const TextField = () => {
        const fieldValues = useDigitFormField("name");
        return (
            <DigitTextField {...fieldValues} upperLabel="Your name" filled />
        );
    };

    const SelectField = () => {
        const fieldValues = useDigitFormField("language");
        return (
            <DigitSelect
                {...fieldValues}
                filled
                valueToTextMap={{
                    sv: "Swedish",
                    en: "English",
                }}
                upperLabel="Language"
            />
        );
    };

    return (
        <DigitForm
            initialValues={{
                name: "Theodor",
                language: "sv",
            }}
            onSubmit={values => {
                console.log(values);
            }}
            render={() => (
                <DigitLayout.Column
                    size={{
                        width: "320px",
                    }}
                >
                    <TextField />
                    <SelectField />
                    <DigitButton
                        raised
                        submit
                        onSubmit={values => console.log(values)}
                        text="Submit"
                    />
                </DigitLayout.Column>
            )}
            validationSchema={yup.object().shape({
                name: yup.string(),
            })}
        ></DigitForm>
    );
};
