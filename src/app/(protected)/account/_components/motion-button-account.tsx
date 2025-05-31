"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const MotionButton = motion(Button);

export default function MotionButtonAccount({ ...props }) {
  return (
    <MotionButton
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.1, ease: "easeInOut" }}
      {...props}
    />
  );
}
