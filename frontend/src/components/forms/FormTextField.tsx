import type React from "react";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useFieldContext } from "@/lib/forms/formContext";
import { cn } from "@/lib/utils/cn";
import { toOptionalMessage } from "@/lib/utils/toMessage";

type InputProps = Omit<
	React.ComponentProps<typeof Input>,
	"value" | "onChange" | "onBlur" | "name"
>;

export interface FormTextFieldProps extends InputProps {
	label: string;
	description?: string;
	icon?: React.ReactNode;
	rightAdornment?: React.ReactNode;
	normalizeValue?: (value: string) => string | number;
	onValueChange?: (value: string | number) => void;
	containerClassName?: string;
}

export function FormTextField({
	label,
	description,
	icon,
	rightAdornment,
	normalizeValue,
	onValueChange,
	containerClassName,
	id,
	className,
	type = "text",
	...props
}: FormTextFieldProps) {
	const field = useFieldContext<unknown>();
	const fieldId = id ?? String(field.name);
	const rawErrors = field.state.meta.errors;
	const errorMessage = rawErrors.map(toOptionalMessage).find(Boolean) ?? null;
	const isInvalid = field.state.meta.isTouched && Boolean(errorMessage);

	return (
		<Field data-invalid={isInvalid} className={containerClassName}>
			<FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
			<FieldContent>
				<div className="relative">
					{icon ? (
						<span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
							{icon}
						</span>
					) : null}
					<Input
						id={fieldId}
						type={type}
						name={String(field.name)}
						value={String(field.state.value ?? "")}
						onBlur={field.handleBlur}
						onChange={(event) => {
							const rawValue = event.currentTarget.value;
							const nextValue = normalizeValue
								? normalizeValue(rawValue)
								: rawValue;
							field.handleChange(nextValue);
							onValueChange?.(nextValue);
						}}
						aria-invalid={isInvalid}
						className={cn(
							icon && "pl-12",
							rightAdornment && "pr-12",
							className,
						)}
						{...props}
					/>
					{rightAdornment ? (
						<span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
							{rightAdornment}
						</span>
					) : null}
				</div>
				{description ? (
					<FieldDescription>{description}</FieldDescription>
				) : null}
				{isInvalid ? <FieldError>{errorMessage}</FieldError> : null}
			</FieldContent>
		</Field>
	);
}
