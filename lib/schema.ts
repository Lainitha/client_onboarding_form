import { z } from "zod";

export const SERVICE_OPTIONS = ["UI/UX", "Branding", "Web Dev", "Mobile App"] as const;

export const onboardingSchema = z.object({
    fullName: z
        .string()
        .min(2, "Full name must be at least 2 characters")
        .max(80, "Full name must be at most 80 characters")
        .regex(/^[A-Za-z\s'-]+$/, "Only letters, spaces, apostrophes, and hyphens allowed"),

    email: z.string().email("Invalid email address"),

    companyName: z
        .string()
        .min(2, "Company name must be at least 2 characters")
        .max(100, "Company name must be at most 100 characters"),

    services: z.array(z.enum(SERVICE_OPTIONS)).min(1, "Select at least one service"),

    budgetUsd: z.preprocess(
        (val) => (val === "" || val === undefined || val === null ? undefined : Number(val)),
    z
        .number({ invalid_type_error: "Must be a number" })
        .int("Must be an integer")
        .min(100, "Minimum budget is $100")
        .max(1_000_000, "Maximum budget is $1,000,000")
        .optional()
    ),

    projectStartDate: z.string().refine(
        (date) => {
        if (!date) return false;
        const today = new Date();
        const inputDate = new Date(date);
        today.setHours(0, 0, 0, 0);
        return inputDate >= today;
        },
        { message: "Start date must be today or later" }
    ),

    acceptTerms: z.literal(true, {
        errorMap: () => ({ message: "You must accept the terms" })
    })
});

export type OnboardingFormData = z.infer<typeof onboardingSchema>;