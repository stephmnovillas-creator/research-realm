import { Eye, EyeOff } from "lucide-react";
import { type ReactNode, useState } from "react";
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
	"value" | "onChange" | "onBlur" | "name" | "type"
>;

export interface FormPasswordFieldProps extends InputProps {
	label: string;
	description?: string;
	icon?: ReactNode;
	rightAdornment?: ReactNode;
	containerClassName?: string;
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
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const fieldId = id ?? String(field.name);
	const rawErrors = field.state.meta.errors;
	const errorMessage = rawErrors.map(toOptionalMessage).find(Boolean) ?? null;
	const isInvalid = field.state.meta.isTouched && Boolean(errorMessage);

	return (
		<Field data-invalid={isInvalid} className={containerClassName}>
			<FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
			<FieldContent>
				<InputGroup className={cn(className)} {...props}>
					<InputGroupInput
						id={fieldId}
						type={isPasswordVisible ? "text" : "password"}
						name={String(field.name)}
						value={field.state.value ?? ""}
						onBlur={field.handleBlur}
						onChange={(event) => field.handleChange(event.currentTarget.value)}
						aria-invalid={isInvalid}
					/>
					{icon ? (
						<InputGroupAddon align="inline-start" className="text-gray-400">
							<InputGroupText>{icon}</InputGroupText>
						</InputGroupAddon>
					) : null}
					<InputGroupAddon align="inline-end" className="text-gray-500">
						{rightAdornment ? (
							<InputGroupText>{rightAdornment}</InputGroupText>
						) : null}
						<InputGroupButton
							type="button"
							size="icon-xs"
							tabIndex={-1}
							onMouseDown={(event) => {
								event.preventDefault();
							}}
							onClick={() => setIsPasswordVisible((previous) => !previous)}
							aria-label={isPasswordVisible ? "Hide password" : "Show password"}
						>
							{isPasswordVisible ? (
								<EyeOff className="size-4" />
							) : (
								<Eye className="size-4" />
							)}
						</InputGroupButton>
					</InputGroupAddon>
				</InputGroup>
				{description ? (
					<FieldDescription>{description}</FieldDescription>
				) : null}
				{isInvalid ? <FieldError>{errorMessage}</FieldError> : null}
			</FieldContent>
		</Field>
	);
}
