import React from "react";
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
        const shortcutField = useDigitFormField("shortcut");
        return (
            <DigitTextField
                {...shortcutField}
                upperLabel="l.chalmers.it/"
                outlined
                maxLength={20}
                size={{
                    maxWidth: "-1",
                }}
            />
        );
    };

    const validationSchema = yup.object().shape({
        shortcut: yup
            .string()
            .min(1, "Shortcut can not be empty")
            .max(20, "Shortcut can not be longer than 20 characters")
            .matches(/^[0-9a-z]+$/, "Shortcut must be alphanumeric")
            .required("Shortcut is required"),
        linkurl: yup
            .string()
            .url("Link must be a valid URL")
            .min("URL can not be empty")
            .required("Linkurl is required"),
    });

    const LinkURLField = () => {
        const urlField = useDigitFormField("linkurl");
        return (
            <DigitTextField
                {...urlField}
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
            validationSchema={validationSchema}
        />
    );
};
