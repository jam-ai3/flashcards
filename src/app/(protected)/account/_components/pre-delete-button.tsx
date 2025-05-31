"use client";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PreDeleteButton() {
  const router = useRouter();

  return (
    <Button
      variant="destructive"
      className="flex-1 bg-red-600 hover:bg-red-700 min-w-[100px] text-white"
      onClick={() => router.push("/account/delete-survey")}
    >
      <Trash />
      <span>Delete Account</span>
    </Button>
  );
}
