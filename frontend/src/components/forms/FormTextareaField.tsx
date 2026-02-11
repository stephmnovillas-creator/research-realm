import type React from "react";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { useFieldContext } from "@/lib/forms/formContext";
import { toOptionalMessage } from "@/lib/utils/toMessage";

type TextareaProps = Omit<
	React.ComponentProps<typeof Textarea>,
	"value" | "onChange" | "onBlur" | "name"
>;

export interface FormTextareaFieldProps extends TextareaProps {
	label: string;
	description?: string;
	onValueChange?: (value: string) => void;
	containerClassName?: string;
}

export function FormTextareaField({
	label,
	description,
	onValueChange,
	containerClassName,
	id,
	...props
}: FormTextareaFieldProps) {
	const field = useFieldContext<string>();
	const fieldId = id ?? String(field.name);
	const rawErrors = field.state.meta.errors;
	const errorMessage = rawErrors.map(toOptionalMessage).find(Boolean) ?? null;
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
					onChange={(event) => {
						field.handleChange(event.currentTarget.value);
						onValueChange?.(event.currentTarget.value);
					}}
					aria-invalid={isInvalid}
					{...props}
				/>
				{description ? (
					<FieldDescription>{description}</FieldDescription>
				) : null}
				{isInvalid ? <FieldError>{errorMessage}</FieldError> : null}
			</FieldContent>
		</Field>
	);
}
