import type React from "react";
import { Button } from "@/components/ui/button";
import { useFormContext } from "@/lib/forms/formContext";

export interface FormSubmitButtonProps
	extends Omit<React.ComponentProps<typeof Button>, "children" | "type"> {
	label: string;
	submittingLabel: string;
}

export function FormSubmitButton({
	label,
	submittingLabel,
	disabled,
	...props
}: FormSubmitButtonProps) {
	const form = useFormContext();

	return (
		<form.Subscribe selector={(state) => state.isSubmitting}>
			{(isSubmitting) => (
				<Button type="submit" disabled={disabled || isSubmitting} {...props}>
					{isSubmitting ? submittingLabel : label}
				</Button>
			)}
		</form.Subscribe>
	);
}
