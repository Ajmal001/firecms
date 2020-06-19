import { Property } from "../../models";
import { FieldArray, getIn } from "formik";
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    IconButton,
    Paper
} from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
import { formStyles } from "../../styles";
import { CMSFieldProps } from "../form_props";
import React from "react";

type ArrayDefaultFieldProps<T> = CMSFieldProps<T[]>;

export default function ArrayDefaultField<T>({
                                                 field,
                                                 form: { errors, touched },
                                                 property,
                                                 createFormField,
                                                 includeDescription
                                             }: ArrayDefaultFieldProps<T>) {

    const classes = formStyles();

    const ofProperty: Property = property.of;

    const hasValue = field.value && field.value.length > 0;

    const fieldError = getIn(errors, field.name);
    const showError = getIn(touched, field.name) && !!fieldError;

    return <FieldArray
        name={field.name}
        render={arrayHelpers =>
            (

                <FormControl fullWidth error={showError}>

                    <FormHelperText filled
                                    required={property.validation?.required}>
                        {property.title || field.name}
                    </FormHelperText>

                    <Paper variant={"outlined"}
                           className={classes.paper}>
                        {hasValue ? (
                            <React.Fragment>
                                {field.value.map((entryValue: any, index: number) => {
                                    const errorElement = errors && errors[index];
                                    const touchedElement = touched && touched[index];
                                    return (
                                        <Box key={`field_${index}`}
                                             mb={1}
                                             display={"flex"}>
                                            <Box flexGrow={1}
                                                 key={`field_${field.name}_entryValue`}>
                                                {createFormField(`${field.name}[${index}]`, ofProperty, includeDescription)}
                                            </Box>
                                            <Box>
                                                <IconButton
                                                    aria-label="remove"
                                                    onClick={() => arrayHelpers.remove(index)}>
                                                    <Remove/>
                                                </IconButton>
                                            </Box>
                                            <Box>
                                                <IconButton
                                                    aria-label="insert"
                                                    onClick={() => arrayHelpers.insert(index + 1, undefined)}>
                                                    <Add/>
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </React.Fragment>
                        ) : (
                            <Box margin={2}>
                                <Button
                                    onClick={() => arrayHelpers.push(null)}>
                                    {/* show this when user has removed all entries from the list */}
                                    Add
                                </Button>
                            </Box>
                        )}
                    </Paper>

                    {includeDescription && property.description &&
                    <Box>
                        <FormHelperText>{property.description}</FormHelperText>
                    </Box>}

                    {showError && <FormHelperText
                        id="component-error-text">{fieldError}</FormHelperText>}

                </FormControl>
            )}
    />;
}