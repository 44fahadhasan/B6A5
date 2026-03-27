"use client";

import { completeOnboarding } from "@/actions/user.action";
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
    defaultValues: { types: [] as string[] },
    validators: { onSubmit: onboardingSchema },
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
      } finally {
        form.reset();
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
          >
            <FieldGroup>
              <form.Field name="types">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <FieldSet>
                      <FieldLegend>Select Roles</FieldLegend>
                      <FieldDescription>
                        You can select one or multiple roles.
                      </FieldDescription>
                      <div className="flex flex-col gap-4 mt-2">
                        {onboardRoles.map((role) => (
                          <FieldLabel
                            key={role.type}
                            htmlFor={`onboarding-${role.type}`}
                            className="cursor-pointer"
                          >
                            <Field className="flex items-start gap-3">
                              <Checkbox
                                id={`onboarding-${role.type}`}
                                checked={field.state.value.includes(role.type)}
                                onCheckedChange={(checked) => {
                                  const current = field.state.value ?? [];
                                  const next = checked
                                    ? [...current, role.type] // add
                                    : current.filter((v) => v !== role.type); // remove
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
                      </div>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
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
                Continue
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
