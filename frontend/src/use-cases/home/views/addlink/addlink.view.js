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

export const AddLink = props => {
    const ShortcutField = () => {
        const fieldValues = useDigitFormField("shortcut");
        return <DigitTextField {...fieldValues} upperLabel="smrf.it/" filled />;
    };

    const LinkURLField = () => {
        const fieldValues = useDigitFormField("linkurl");
        return (
            <DigitTextField {...fieldValues} upperLabel="Linked URL" filled />
        );
    };

    return (
        <DigitForm
            initialValues={{
                shortcut: "",
                linkurl: "",
            }}
            onSubmit={props.addLink}
            render={() => (
                <DigitLayout.Column
                    size={{
                        width: "320px",
                    }}
                >
                    <ShortcutField />
                    <LinkURLField />
                    <DigitButton
                        raised
                        submit
                        onSubmit={values => console.log(values)}
                        text="Make Link"
                    />
                </DigitLayout.Column>
            )}
            validationSchema={yup.object().shape({
                name: yup.string(),
            })}
        ></DigitForm>
    );
};
