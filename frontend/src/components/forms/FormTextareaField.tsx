import type React from "react";
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { useFieldContext } from "@/lib/forms/formContext";

type TextareaProps = Omit<
	React.ComponentProps<typeof Textarea>,
	"value" | "onChange" | "onBlur" | "name"
>;

export interface FormTextareaFieldProps extends TextareaProps {
	label: string;
	description?: string;
	containerClassName?: string;
}

function errorToText(error: unknown): string | null {
	if (typeof error === "string") {
		return error;
	}

	if (error && typeof error === "object" && "message" in error) {
		const message = (error as { message?: unknown }).message;
		return typeof message === "string" ? message : null;
	}

	return null;
}

export function FormTextareaField({
	label,
	description,
	containerClassName,
	id,
	...props
}: FormTextareaFieldProps) {
	const field = useFieldContext<string>();
	const fieldId = id ?? String(field.name);
	const rawErrors = field.state.meta.errors;
	const errorMessage = rawErrors.map(errorToText).find(Boolean) ?? null;
	const isInvalid = field.state.meta.isTouched && Boolean(errorMessage);

	return (
		<Field data-invalid={isInvalid} className={containerClassName}>
			<FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
			<FieldContent>
				<Textarea
					id={fieldId}
					name={String(field.name)}
					value={field.state.value ?? ""}
					onBlur={field.handleBlur}
					onChange={(event) => field.handleChange(event.currentTarget.value)}
					aria-invalid={isInvalid}
					{...props}
				/>
				{description ? <FieldDescription>{description}</FieldDescription> : null}
				{isInvalid ? <FieldError>{errorMessage}</FieldError> : null}
			</FieldContent>
		</Field>
	);
}
