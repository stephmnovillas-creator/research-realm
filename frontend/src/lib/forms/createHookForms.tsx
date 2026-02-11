import { createFormHook } from "@tanstack/react-form";
import { FormPasswordField } from "@/components/forms/FormPasswordField";
import { FormSubmitButton } from "@/components/forms/FormSubmitButton";
import { FormTextareaField } from "@/components/forms/FormTextareaField";
import { FormTextareaFieldWithReset } from "@/components/forms/FormTextareaFieldWithReset";
import { FormTextField } from "@/components/forms/FormTextField";
import { FormTextFieldWithReset } from "@/components/forms/FormTextFieldWithReset";
import {
	fieldContext,
	formContext,
	useFieldContext,
	useFormContext,
} from "./formContext";

const { useAppForm, withForm } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: {
		FormTextField,
		FormTextFieldWithReset,
		FormPasswordField,
		FormTextareaField,
		FormTextareaFieldWithReset,
	},
	formComponents: {
		FormSubmitButton,
	},
});

export { useAppForm, withForm, useFieldContext, useFormContext };
