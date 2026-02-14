// frontend/src/components/DeleteConfirmationModal.tsx
import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Trash2 } from "lucide-react";

interface DeleteConfirmationModalProps {
    title: string;
    researchDate: number;
    onConfirm: () => Promise<void>;
}

export function DeleteConfirmationModal({
    onConfirm
}: DeleteConfirmationModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            await onConfirm();
            setIsOpen(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger>
                <button
                    type="button"
                    className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium flex items-center gap-2"
                    title="Delete research"
                >
                    <Trash2 className="w-4 h-4" />
                    DELETE
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-full max-w-md">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-red-600">
                        Delete Research
                    </AlertDialogTitle>
                    <AlertDialogDescription className="mt-4">
                        <p className="font-medium text-gray-800 mb-2">
                            Are you sure you want to delete this research?
                        </p>
                        <p className="text-sm text-gray-600">
                            This action cannot be undone.
                        </p>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isLoading}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        {isLoading ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}