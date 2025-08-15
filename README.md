# 📝 Client Onboarding Form

![Next.js](https://img.shields.io/badge/Next.js-13.4-blue?style=flat-square) ![React Hook Form](https://img.shields.io/badge/React_Hook_Form-v7-green?style=flat-square) ![Zod](https://img.shields.io/badge/Zod-v3-purple?style=flat-square) ![Vitest](https://img.shields.io/badge/Testing-Vitest-orange?style=flat-square)

A **simple, accessible, and fully validated client onboarding form** built using **Next.js**, **React Hook Form**, and **Zod**. Designed with good UX, real-time validation, and success/error alerts.  

---

## 🎯 Features

- **Form Validation:** Strong validation using `Zod + React Hook Form`.
- **Nice UX touches:**
  - Submit button disabled while submitting.
  - Values persist after validation errors.
  - Success alert with submitted summary on 200/201 response.
- **Accessible & Keyboard-Friendly:** Proper labels, focus states, and inline error messages.
- **Services Multi-Select:** Checkboxes for multiple selections.
- **Native Date Picker:** For selecting project start date.
- **Pre-fill from Query Params (Bonus):** Prefill form via URL like `?fullName=Ada&service=UI/UX`.
- **Unit Tests:** Zod schema unit tests using **Vitest**.

---

## ⚙️ Setup Instructions

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd client-onboarding-form-simple
