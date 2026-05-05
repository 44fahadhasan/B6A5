import {
  TypographyH1,
  TypographyH2,
  TypographyLead,
  TypographyList,
  TypographyP,
} from "@/components/shared/typography";

export default function TermsOfService() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-14">
        <TypographyH1 className="text-balance">Terms of Service</TypographyH1>
        <TypographyLead className="mt-4 max-w-2xl mx-auto">
          Please read these terms carefully before using the Ummah Care
          platform. By accessing or using our services, you agree to be bound by
          these terms.
        </TypographyLead>
      </div>

      <div className="mb-10">
        <TypographyH2 className="text-2xl sm:text-3xl mb-4">
          Acceptance of Terms
        </TypographyH2>
        <TypographyP>
          By creating an account, or by accessing or using the Ummah Care
          platform, you agree to these Terms of Service and our Privacy Policy.
          If you do not agree to these terms, you may not use our services.
        </TypographyP>
      </div>

      <div className="mb-10">
        <TypographyH2 className="text-2xl sm:text-3xl mb-4">
          User Conduct and Responsibilities
        </TypographyH2>
        <TypographyP>
          You are responsible for your use of the platform and for any content
          you provide, including compliance with applicable laws, rules, and
          regulations. You agree not to:
        </TypographyP>
        <TypographyList>
          <li>Use the platform for any illegal or unauthorized purpose</li>
          <li>Submit false, misleading, or deceptive information</li>
          <li>Harass, abuse, or harm another person</li>
          <li>Interfere with or disrupt the operation of the platform</li>
        </TypographyList>
      </div>

      <div className="mb-10">
        <TypographyH2 className="text-2xl sm:text-3xl mb-4">
          Account Security
        </TypographyH2>
        <TypographyP>
          You are responsible for safeguarding your account credentials. We
          encourage you to use a strong password and to keep your account
          information confidential. You must notify us immediately of any
          unauthorized use of your account.
        </TypographyP>
      </div>

      <div>
        <TypographyH2 className="text-2xl sm:text-3xl mb-4">
          Termination
        </TypographyH2>
        <TypographyP>
          We may terminate or suspend your access to all or part of the platform
          at any time, with or without cause, with or without notice, effective
          immediately. Upon termination, your right to use the platform will
          immediately cease.
        </TypographyP>
      </div>
    </section>
  );
}
