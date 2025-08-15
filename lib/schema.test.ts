import { describe, it, expect } from "vitest";
import { onboardingSchema, SERVICE_OPTIONS } from "./schema";

describe("onboardingSchema validation", () => {
    it("should pass with valid data", () => {
        const validData = {
        fullName: "Lainitha Krishnakumar",
        email: "Lainitha@gmail.com",
        companyName: "Sysco Ltd",
        services: ["UI/UX", "Web Dev"] as const,
        budgetUsd: 50000,
        projectStartDate: "2025-09-01",
        acceptTerms: true,
        };

    const result = onboardingSchema.safeParse(validData);
    expect(result.success).toBe(true);
    });

    it("should fail if required fields are missing", () => {
        const invalidData = {
        fullName: "",
        email: "not-an-email",
        companyName: "",
        services: [],
        projectStartDate: "2020-01-01", // past date
        acceptTerms: false,
        };

    const result = onboardingSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
        const errors = result.error.format();
        expect(errors.fullName?._errors.length).toBeGreaterThan(0);
        expect(errors.email?._errors.length).toBeGreaterThan(0);
        expect(errors.services?._errors.length).toBeGreaterThan(0);
        expect(errors.projectStartDate?._errors.length).toBeGreaterThan(0);
        expect(errors.acceptTerms?._errors.length).toBeGreaterThan(0);
        }
    });

    it("should fail if budget is below minimum", () => {
        const invalidData = {
        fullName: "lainitha",
        email: "lainitha@example.com",
        companyName: "Analytical Engines Ltd",
        services: ["UI/UX"],
        budgetUsd: 50, // below 100
        projectStartDate: "2025-09-01",
        acceptTerms: true,
        };

    const result = onboardingSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    });
});
