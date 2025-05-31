"use client";
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
} from "@/components/ui/alert-dialog";
import { Trash2Icon } from "lucide-react";
import MotionButtonAccount from "./motion-button-account";
import { logoutAndRedirect } from "@/lib/auth";
import { deleteUserSaveReview } from "../delete-user";

type AccountDeleteButtonProps = {
  questionOne: string;
  message: string;
} & React.ComponentPropsWithoutRef<"button">;

export default function AccountDeleteButton({
  questionOne,
  message,
  ...props
}: AccountDeleteButtonProps) {
  async function handleDelete() {
    await deleteUserSaveReview({ questionOne, message });
    await logoutAndRedirect();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <MotionButtonAccount {...props} variant="destructive">
          <Trash2Icon />
          <span className="flex items-center gap-2">Delete Account</span>
        </MotionButtonAccount>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete your account?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Your account and all related data will
            be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-between gap-4">
          <AlertDialogCancel asChild>
            <MotionButtonAccount variant="primary" className="min-w-[100px]">
              Cancel
            </MotionButtonAccount>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <MotionButtonAccount
              variant="destructive"
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 min-w-[100px] text-white"
            >
              {"Yes, Delete it"}
            </MotionButtonAccount>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
