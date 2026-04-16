import * as React from "react";
import { motion, HTMLMotionProps } from "motion/react";
import { cn } from "./ui/Button";

interface SectionProps extends HTMLMotionProps<"section"> {
  children: React.ReactNode;
  delay?: number;
}

export function Section({ children, className, delay = 0, ...props }: SectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={cn("w-full py-16 md:py-24", className)}
      {...props}
    >
      {children}
    </motion.section>
  );
}
