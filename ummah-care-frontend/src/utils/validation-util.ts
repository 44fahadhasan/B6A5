import * as z from "zod";

export const formatZodErrors = (issues: z.core.$ZodIssue[]): string[] => {
  return issues.map((issue, idx) => {
    const field = String(issue.path?.[0] ?? "field");

    // Convert camelCase → Proper Label
    const label = field
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^./, (c) => c.toUpperCase());

    let message = issue.message;

    // Required field detection
    if (issue.code === "invalid_type" && issue.input === undefined) {
      const normalCaseLabel = label.charAt(0).toUpperCase() + label.slice(1);
      message = `${normalCaseLabel} is required.`;
    }

    return `${idx + 1}. ${label}: ${message}`;
  });
};

type ValidationResult<T> =
  | { success: true; data: z.output<T> }
  | { success: false; message: string; data: null };

export const validatePayload = <T extends z.ZodType>(
  payload: Record<string, unknown>,
  zodSchema: T,
): ValidationResult<T> => {
  const result = zodSchema.safeParse(payload);

  if (!result.success) {
    const errors = formatZodErrors(result.error.issues);
    return {
      success: false,
      message: errors.join("\n"),
      data: null,
    };
  }

  return {
    success: true,
    data: result.data,
  };
};
