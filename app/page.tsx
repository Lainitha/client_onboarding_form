"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema, type OnboardingFormData, SERVICE_OPTIONS } from "@/lib/schema";
import { useState } from "react";

export default function Home() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<OnboardingFormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: { services: [], acceptTerms: false },
  });

  const onSubmit = async (data: OnboardingFormData) => {
    setServerError(null);
    setServerSuccess(null);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_ONBOARD_URL as string, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        // Attempt to parse error message if API returns JSON
        try {
          const err = await res.json();
          const msg = err?.message || `Request failed with status ${res.status}`;
          setServerError(msg);
        } catch {
          setServerError(`Request failed with status ${res.status}`);
        }
        return;
      }

      setServerSuccess(data); // store for summary display
      reset({ services: [], acceptTerms: false }); // clear form after success
    } catch (e) {
      setServerError("Network error. Please check your connection and try again.");
    }
  };

  return (
    <main className="min-h-dvh bg-gray-50 text-gray-900">
      <div className="mx-auto max-w-2xl p-6">
        <h1 className="text-3xl font-bold mb-2">Client Onboarding</h1>
        <p className="text-sm text-gray-600 mb-6">Tell us a bit about your project. All fields marked * are required.</p>

        {/* Error Notice */}
        {serverError && (
          <div role="alert" aria-live="assertive" className="mb-4 rounded-2xl border border-red-300 bg-red-50 p-3 text-red-800">
            <strong className="block font-semibold mb-1">Submission failed</strong>
            <span>{serverError}</span>
          </div>
        )}

        {/* Success Notice */}
        {serverSuccess && (
          <div role="status" aria-live="polite" className="mb-4 rounded-2xl border border-green-300 bg-green-50 p-3 text-green-800">
            <strong className="block font-semibold mb-1">Success!</strong>
            <p className="mb-2">Thanks, {serverSuccess.fullName}. Here's what we received:</p>
            <ul className="list-disc pl-6 text-sm">
              <li>Email: {serverSuccess.email}</li>
              <li>Company: {serverSuccess.companyName}</li>
              <li>Services: {serverSuccess.services.join(", ")}</li>
              {serverSuccess.budgetUsd !== undefined && <li>Budget (USD): {serverSuccess.budgetUsd}</li>}
              <li>Start Date: {serverSuccess.projectStartDate}</li>
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-2xl bg-white p-5 shadow">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium">Full Name *</label>
            <input
              id="fullName"
              type="text"
              {...register("fullName")}
              className="mt-1 block w-full rounded-xl border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-invalid={!!errors.fullName}
            />
            {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email *</label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="mt-1 block w-full rounded-xl border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-invalid={!!errors.email}
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>

          {/* Company Name */}
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium">Company Name *</label>
            <input
              id="companyName"
              type="text"
              {...register("companyName")}
              className="mt-1 block w-full rounded-xl border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-invalid={!!errors.companyName}
            />
            {errors.companyName && <p className="mt-1 text-xs text-red-600">{errors.companyName.message}</p>}
          </div>

          {/* Services */}
          <fieldset>
            <legend className="block text-sm font-medium">Services Interested In *</legend>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {SERVICE_OPTIONS.map((service) => {
                const id = `service-${service.replace(/\s+/g, "-").toLowerCase()}`;
                return (
                  <label key={service} htmlFor={id} className="inline-flex items-center gap-2 text-sm">
                    <input
                      id={id}
                      type="checkbox"
                      value={service}
                      {...register("services")}
                      className="h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                    {service}
                  </label>
                );
              })}
            </div>
            {errors.services && <p className="mt-1 text-xs text-red-600">{errors.services.message}</p>}
          </fieldset>

          {/* Budget */}
          <div>
            <label htmlFor="budgetUsd" className="block text-sm font-medium">Budget (USD) <span className="text-gray-500" aria-hidden>— optional</span></label>
            <input
              id="budgetUsd"
              type="number"
              inputMode="numeric"
              {...register("budgetUsd")}
              className="mt-1 block w-full rounded-xl border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-invalid={!!errors.budgetUsd}
              placeholder="e.g., 5000"
            />
            {errors.budgetUsd && <p className="mt-1 text-xs text-red-600">{errors.budgetUsd.message}</p>}
          </div>

          {/* Project Start Date */}
          <div>
            <label htmlFor="projectStartDate" className="block text-sm font-medium">Project Start Date *</label>
            <input
              id="projectStartDate"
              type="date"
              {...register("projectStartDate")}
              className="mt-1 block w-full rounded-xl border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-invalid={!!errors.projectStartDate}
            />
            {errors.projectStartDate && <p className="mt-1 text-xs text-red-600">{errors.projectStartDate.message}</p>}
          </div>

          {/* Accept Terms */}
          <div className="flex items-start gap-2">
            <input
              id="acceptTerms"
              type="checkbox"
              {...register("acceptTerms")}
              className="mt-1 h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="acceptTerms" className="text-sm">I agree to the terms and conditions *</label>
          </div>
          {errors.acceptTerms && <p className="-mt-2 text-xs text-red-600">{errors.acceptTerms.message}</p>}

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-blue-600 px-4 py-2 font-semibold text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Submitting…" : "Submit"}
            </button>
          </div>
        </form>

        <p className="mt-4 text-xs text-gray-500">API URL: <code>process.env.NEXT_PUBLIC_ONBOARD_URL</code></p>
      </div>
    </main>
  );
}
