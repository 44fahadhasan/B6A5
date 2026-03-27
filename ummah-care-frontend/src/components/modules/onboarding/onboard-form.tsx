"use client";

import { completeOnboarding } from "@/actions/user.action";
import AppInputField from "@/components/shared/form/app-input-field ";
import AppSubmitButton from "@/components/shared/form/app-submit-button";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { USER_TYPE } from "@/constants/user.const";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  IOnboardingPayloadPayload,
  onboardingSchema,
} from "./onboard-form.schema";
import { onboardRoles } from "./onboard-roles";

export function OnboardingForm() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: IOnboardingPayloadPayload) =>
      await completeOnboarding(payload),
  });

  const form = useForm({
    defaultValues: {
      types: [] as string[],
      orgName: "",
      description: "",
      logoUrl: "",
      website: "",
      registrationNumber: "",
      contactEmail: "",
      contactPhone: "",
    },
    validators: {
      onSubmit: onboardingSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Submitting onboarding...");

      try {
        const res = await mutateAsync(value as IOnboardingPayloadPayload);

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
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Choose How You Want to Contribute</DialogTitle>
          <DialogDescription>
            Select the roles you want to participate in. You can skip and
            continue as a simple user.
          </DialogDescription>
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
              <form.Field name="types">
                {(field) => {
                  const { value: selectedTypes = [], meta } = field.state;
                  const isOrganizationSelected = selectedTypes.includes(
                    USER_TYPE.ORGANIZATION,
                  );
                  const isInvalid = meta.isTouched && !meta.isValid;

                  return (
                    <FieldSet>
                      <FieldLegend>Select Roles</FieldLegend>
                      <FieldDescription>
                        You can select one or multiple roles.
                      </FieldDescription>

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
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </FieldGroup>

                      {isOrganizationSelected && (
                        <FieldGroup>
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
                        </FieldGroup>
                      )}
                    </FieldSet>
                  );
                }}
              </form.Field>
            </FieldGroup>
          </form>
        </ScrollArea>
        <DialogFooter className="flex justify-end gap-3 mt-4">
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
          <DialogClose asChild>
            <Button
              size="sm"
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Skip
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
