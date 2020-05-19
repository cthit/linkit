import React, { useState, useEffect } from "react";
import {
    DigitTextField,
    useDigitFormField,
    DigitForm,
    DigitLayout,
    DigitButton,
} from "@cthit/react-digit-components";
import * as yup from "yup";

export const AddLink = props => {
    const ShortcutField = () => {
        const fieldValues = useDigitFormField("shortcut");
        return (
            <DigitTextField
                {...fieldValues}
                upperLabel="smrf.it/"
                outlined
                maxLength={20}
                size={{
                    maxWidth: "-1",
                }}
            />
        );
    };

    const LinkURLField = () => {
        const fieldValues = useDigitFormField("linkurl");
        return (
            <DigitTextField
                {...fieldValues}
                upperLabel="Linked URL"
                outlined
                size={{
                    maxWidth: "-1",
                }}
            />
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
                <DigitLayout.Column>
                    <ShortcutField />
                    <LinkURLField />
                    <DigitButton
                        raised
                        submit
                        primary
                        text="Make Link"
                        size={{ width: "200px" }}
                        alignSelf="flex-end"
                    />
                </DigitLayout.Column>
            )}
            validationSchema={yup.object().shape({
                name: yup.string(),
            })}
        />
    );
};
