import { RotateCcw } from "lucide-react";
import type React from "react";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
	InputGroupText,
} from "@/components/ui/input-group";
import { useFieldContext } from "@/lib/forms/formContext";
import { cn } from "@/lib/utils/cn";
import { toOptionalMessage } from "@/lib/utils/toMessage";

type InputProps = Omit<
	React.ComponentProps<"input">,
	"value" | "onChange" | "onBlur" | "name"
>;

export interface FormTextFieldWithResetProps extends InputProps {
	label: string;
	description?: string;
	icon?: React.ReactNode;
	normalizeValue?: (value: string) => string | number;
	onValueChange?: (value: string | number) => void;
	showReset?: boolean;
	onReset?: () => void;
	containerClassName?: string;
}

export function FormTextFieldWithReset({
	label,
	description,
	icon,
	normalizeValue,
	onValueChange,
	showReset,
	onReset,
	containerClassName,
	id,
	className,
	...props
}: FormTextFieldWithResetProps) {
	const field = useFieldContext<unknown>();
	const fieldId = id ?? String(field.name);
	const rawErrors = field.state.meta.errors;
	const errorMessage = rawErrors.map(toOptionalMessage).find(Boolean) ?? null;
	const isInvalid = field.state.meta.isTouched && Boolean(errorMessage);

	return (
		<Field data-invalid={isInvalid} className={containerClassName}>
			<FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
			<FieldContent>
				<InputGroup>
					{icon ? (
						<InputGroupAddon align="inline-start" className="text-gray-400">
							<InputGroupText>{icon}</InputGroupText>
						</InputGroupAddon>
					) : null}
					<InputGroupInput
						id={fieldId}
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
						className={cn(className)}
						{...props}
					/>
					{showReset ? (
						<InputGroupAddon align="inline-end" className="text-gray-500">
							<InputGroupButton
								type="button"
								size="icon-xs"
								tabIndex={-1}
								onMouseDown={(event) => {
									event.preventDefault();
								}}
								onClick={onReset}
								aria-label="Reset generated value"
							>
								<RotateCcw className="size-3.5" />
							</InputGroupButton>
						</InputGroupAddon>
					) : null}
				</InputGroup>
				{description ? (
					<FieldDescription>{description}</FieldDescription>
				) : null}
				{isInvalid ? <FieldError>{errorMessage}</FieldError> : null}
			</FieldContent>
		</Field>
	);
}
