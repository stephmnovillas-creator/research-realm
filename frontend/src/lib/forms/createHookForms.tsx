import { createFormHook } from "@tanstack/react-form";
import { FormPasswordField } from "@/components/forms/FormPasswordField";
import { FormSubmitButton } from "@/components/forms/FormSubmitButton";
import { FormTextField } from "@/components/forms/FormTextField";
import { FormTextareaField } from "@/components/forms/FormTextareaField";
import { fieldContext, formContext, useFieldContext, useFormContext } from "./formContext";

const { useAppForm, withForm } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: {
		FormTextField,
		FormPasswordField,
		FormTextareaField,
	},
	formComponents: {
		FormSubmitButton,
	},
});

export { useAppForm, withForm, useFieldContext, useFormContext };
