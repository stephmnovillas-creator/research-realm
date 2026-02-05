import type React from "react";
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useFieldContext } from "@/lib/forms/formContext";
import { cn } from "@/lib/utils/cn";

type InputProps = Omit<React.ComponentProps<typeof Input>, "value" | "onChange" | "onBlur" | "name" | "type">;

export interface FormPasswordFieldProps extends InputProps {
	label: string;
	description?: string;
	icon?: React.ReactNode;
	rightAdornment?: React.ReactNode;
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

export function FormPasswordField({
	label,
	description,
	icon,
	rightAdornment,
	containerClassName,
	id,
	className,
	...props
}: FormPasswordFieldProps) {
	const field = useFieldContext<string>();
	const fieldId = id ?? String(field.name);
	const rawErrors = field.state.meta.errors;
	const errorMessage = rawErrors.map(errorToText).find(Boolean) ?? null;
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
						type="password"
						name={String(field.name)}
						value={field.state.value ?? ""}
						onBlur={field.handleBlur}
						onChange={(event) => field.handleChange(event.currentTarget.value)}
						aria-invalid={isInvalid}
						className={cn(icon && "pl-12", rightAdornment && "pr-12", className)}
						{...props}
					/>
					{rightAdornment ? (
						<span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
							{rightAdornment}
						</span>
					) : null}
				</div>
				{description ? <FieldDescription>{description}</FieldDescription> : null}
				{isInvalid ? <FieldError>{errorMessage}</FieldError> : null}
			</FieldContent>
		</Field>
	);
}
