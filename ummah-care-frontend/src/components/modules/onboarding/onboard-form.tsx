"use client";

import { completeOnboarding } from "@/actions/user.action";
import AppInputField from "@/components/shared/form/app-input-field ";
import AppSubmitButton from "@/components/shared/form/app-submit-button";
import { TypographyMuted } from "@/components/shared/typography";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { USER_TYPE } from "@/constants/user.const";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import {
  IOnboardingPayloadPayload,
  onboardingSchema,
} from "./onboard-form.schema";
import { onboardRoles } from "./onboard-roles";

export function OnboardingForm() {
  const [step, setStep] = useState(1);
  const [isOrgSelected, setIsOrgSelected] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: IOnboardingPayloadPayload) =>
      await completeOnboarding(payload),
  });

  const form = useForm({
    defaultValues: {
      types: [] as IOnboardingPayloadPayload["types"],
      orgName: "",
      description: "",
      logoUrl: "",
      website: "",
      registrationNumber: "",
      contactEmail: "",
      contactPhone: "",
    },
    validators: {
      onSubmit: ({ value }) => {
        const result = onboardingSchema.safeParse(value);

        if (!result.success) {
          const errors: Record<string, { message: string }[]> = {};

          result.error.issues.forEach((err) => {
            const path = err.path.join(".");
            if (!errors[path]) errors[path] = [];
            errors[path].push({ message: err.message });
          });

          return { fields: errors };
        }
        return null;
      },
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Submitting onboarding...");
      const payload = { ...value } as IOnboardingPayloadPayload;

      if (!payload.types.includes(USER_TYPE.ORGANIZATION)) {
        delete payload.orgName;
        delete payload.description;
        delete payload.logoUrl;
        delete payload.website;
        delete payload.registrationNumber;
        delete payload.contactEmail;
        delete payload.contactPhone;
      }

      try {
        const res = await mutateAsync(payload);

        if (!res?.success) {
          toast.error(res?.message ?? "Failed to complete onboarding", {
            id: toastId,
          });
          return;
        }

        toast.success(res?.message ?? "Onboarding completed successfully!", {
          id: toastId,
        });
      } catch (error) {
        toast.error((error as Error).message ?? "Something went wrong", {
          id: toastId,
        });
      }
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Get Started</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Choose How You Want to Contribute</DialogTitle>
          <DialogDescription>
            Select the roles you want to participate in. You can skip and
            continue as a simple user.
          </DialogDescription>

          {/* Progress */}
          {isOrgSelected && (
            <div className="mt-3">
              <Progress value={step === 1 ? 50 : 100} />
              <TypographyMuted className="mt-1 text-xs">
                {step === 1 ? "50% complete" : "100% complete"}
              </TypographyMuted>
            </div>
          )}
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <form
            id="onboarding-form"
            noValidate
            method="post"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="px-1"
          >
            <FieldGroup>
              {step === 1 && (
                <form.Field name="types">
                  {(field) => {
                    const { value: selectedTypes = [], meta } = field.state;
                    const isInvalid = meta.isTouched && !meta.isValid;

                    return (
                      <FieldSet>
                        <FieldLegend>Select Roles</FieldLegend>
                        <FieldDescription>
                          You can select one or multiple roles.
                        </FieldDescription>

                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}

                        {/* Onboarding Roles filed */}
                        <FieldGroup>
                          {onboardRoles.map((role) => (
                            <FieldLabel
                              key={role.type}
                              htmlFor={`onboarding-${role.type}`}
                              className="cursor-pointer"
                            >
                              <Field className="flex items-start gap-3">
                                <Checkbox
                                  id={`onboarding-${role.type}`}
                                  checked={selectedTypes.includes(role.type)}
                                  onCheckedChange={(checked) => {
                                    const current = selectedTypes ?? [];
                                    const next = checked
                                      ? [...current, role.type]
                                      : current.filter((v) => v !== role.type);
                                    field.handleChange(next);

                                    if (role.type === USER_TYPE.ORGANIZATION) {
                                      setIsOrgSelected(Boolean(checked));
                                    }

                                    // If Organization is uncheck, reset step and clear org fields
                                    if (
                                      role.type === USER_TYPE.ORGANIZATION &&
                                      !next.includes(USER_TYPE.ORGANIZATION)
                                    ) {
                                      setStep(1);
                                      setIsOrgSelected(false);

                                      // keep selected roles intact
                                      field.handleChange(next);

                                      form.setFieldValue("orgName", "");
                                      form.setFieldValue("description", "");
                                      form.setFieldValue("logoUrl", "");
                                      form.setFieldValue("website", "");
                                      form.setFieldValue(
                                        "registrationNumber",
                                        "",
                                      );
                                      form.setFieldValue("contactEmail", "");
                                      form.setFieldValue("contactPhone", "");
                                    }
                                  }}
                                />
                                <div>
                                  <FieldTitle>{role.label}</FieldTitle>
                                  <FieldDescription>
                                    {role.description}
                                  </FieldDescription>
                                </div>
                              </Field>
                            </FieldLabel>
                          ))}
                        </FieldGroup>
                      </FieldSet>
                    );
                  }}
                </form.Field>
              )}

              {step === 2 && (
                <form.Field name="types">
                  {(typesField) => {
                    const selectedTypes = typesField.state.value || [];

                    if (!selectedTypes.includes(USER_TYPE.ORGANIZATION)) {
                      return null;
                    }

                    // Org input fields
                    return (
                      <FieldGroup>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <form.Field name="orgName">
                            {(orgField) => (
                              <AppInputField
                                field={orgField}
                                label="Organization Name"
                                type="text"
                                placeholder="Enter organization name"
                              />
                            )}
                          </form.Field>
                          <form.Field name="description">
                            {(descField) => (
                              <AppInputField
                                field={descField}
                                label="Description"
                                type="textarea"
                                placeholder="Enter description"
                              />
                            )}
                          </form.Field>
                          <form.Field name="logoUrl">
                            {(logoField) => (
                              <AppInputField
                                field={logoField}
                                label="Logo URL"
                                type="url"
                                placeholder="Enter logo URL"
                              />
                            )}
                          </form.Field>
                          <form.Field name="website">
                            {(websiteField) => (
                              <AppInputField
                                field={websiteField}
                                label="Website"
                                type="url"
                                placeholder="Enter website URL"
                              />
                            )}
                          </form.Field>
                          <form.Field name="registrationNumber">
                            {(regField) => (
                              <AppInputField
                                field={regField}
                                label="Registration Number"
                                type="text"
                                placeholder="Enter registration number"
                              />
                            )}
                          </form.Field>
                          <form.Field name="contactEmail">
                            {(emailField) => (
                              <AppInputField
                                field={emailField}
                                label="Contact Email"
                                type="email"
                                placeholder="Enter contact email"
                              />
                            )}
                          </form.Field>
                          <form.Field name="contactPhone">
                            {(phoneField) => (
                              <AppInputField
                                field={phoneField}
                                label="Contact Phone"
                                type="text"
                                placeholder="Enter contact phone"
                              />
                            )}
                          </form.Field>
                        </div>
                      </FieldGroup>
                    );
                  }}
                </form.Field>
              )}
            </FieldGroup>
          </form>
        </ScrollArea>

        <DialogFooter className="flex justify-end gap-3 mt-4">
          {step === 1 ? (
            <form.Field name="types">
              {(field) => {
                const selectedTypes = field.state.value || [];
                const hasOrg = selectedTypes.includes(USER_TYPE.ORGANIZATION);

                return hasOrg ? (
                  <Button size="sm" onClick={() => setStep(2)}>
                    Next
                  </Button>
                ) : (
                  <form.Subscribe
                    selector={(s) => [s.canSubmit, s.isSubmitting]}
                  >
                    {([canSubmit, isSubmitting]) => (
                      <AppSubmitButton
                        form="onboarding-form"
                        className="w-auto"
                        disabled={!canSubmit}
                        pendingLabel="Submitting..."
                        isPending={isPending || isSubmitting}
                      >
                        Submit
                      </AppSubmitButton>
                    )}
                  </form.Subscribe>
                );
              }}
            </form.Field>
          ) : (
            <>
              <Button size="sm" onClick={() => setStep(1)}>
                Back
              </Button>
              <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
                {([canSubmit, isSubmitting]) => (
                  <AppSubmitButton
                    form="onboarding-form"
                    className="w-auto"
                    disabled={!canSubmit}
                    pendingLabel="Submitting..."
                    isPending={isPending || isSubmitting}
                  >
                    Submit
                  </AppSubmitButton>
                )}
              </form.Subscribe>
            </>
          )}

          {/* dialog close button */}
          <DialogClose asChild>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                form.reset();
                setStep(1);
                setIsOrgSelected(false);
              }}
            >
              Skip
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
