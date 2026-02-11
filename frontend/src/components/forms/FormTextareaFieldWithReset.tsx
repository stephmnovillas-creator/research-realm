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
	InputGroupTextarea,
} from "@/components/ui/input-group";
import { useFieldContext } from "@/lib/forms/formContext";
import { cn } from "@/lib/utils/cn";
import { toOptionalMessage } from "@/lib/utils/toMessage";

type TextareaProps = Omit<
	React.ComponentProps<"textarea">,
	"value" | "onChange" | "onBlur" | "name"
>;

export interface FormTextareaFieldWithResetProps extends TextareaProps {
	label: string;
	description?: string;
	onValueChange?: (value: string) => void;
	showReset?: boolean;
	onReset?: () => void;
	containerClassName?: string;
}

export function FormTextareaFieldWithReset({
	label,
	description,
	onValueChange,
	showReset,
	onReset,
	containerClassName,
	id,
	className,
	...props
}: FormTextareaFieldWithResetProps) {
	const field = useFieldContext<string>();
	const fieldId = id ?? String(field.name);
	const rawErrors = field.state.meta.errors;
	const errorMessage = rawErrors.map(toOptionalMessage).find(Boolean) ?? null;
	const isInvalid = field.state.meta.isTouched && Boolean(errorMessage);

	return (
		<Field data-invalid={isInvalid} className={containerClassName}>
			<FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
			<FieldContent>
				<InputGroup className="h-auto items-start">
					<InputGroupTextarea
						id={fieldId}
						name={String(field.name)}
						value={field.state.value ?? ""}
						onBlur={field.handleBlur}
						onChange={(event) => {
							field.handleChange(event.currentTarget.value);
							onValueChange?.(event.currentTarget.value);
						}}
						aria-invalid={isInvalid}
						className={cn(className)}
						{...props}
					/>
					{showReset ? (
						<InputGroupAddon align="block-end" className="">
							<InputGroupButton
								type="button"
								size="icon-xs"
								tabIndex={-1}
								onMouseDown={(event) => {
									event.preventDefault();
								}}
								onClick={onReset}
								aria-label="Reset generated value"
								className={"flex"}
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
