import {
  TypographyH1,
  TypographyH2,
  TypographyLead,
  TypographyList,
  TypographyP,
} from "@/components/shared/typography";

export default function PrivacyPolicy() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-14">
        <TypographyH1 className="text-balance">Privacy Policy</TypographyH1>
        <TypographyLead className="mt-4 max-w-2xl mx-auto">
          At Ummah Care, we value your privacy. This policy outlines how we
          collect, use, and protect your personal information.
        </TypographyLead>
      </div>

      <div className="mb-10">
        <TypographyH2 className="text-2xl sm:text-3xl mb-4">
          Information We Collect
        </TypographyH2>
        <TypographyP>
          We collect information you provide directly to us, such as when you
          create an account, update your profile, submit a request, or
          communicate with us. This may include your name, email address, phone
          number, location, and any other information you choose to provide.
        </TypographyP>
      </div>

      <div className="mb-10">
        <TypographyH2 className="text-2xl sm:text-3xl mb-4">
          How We Use Your Information
        </TypographyH2>
        <TypographyP>
          We use the information we collect to operate, maintain, and provide
          the features and functionality of the Ummah Care platform. This
          includes:
        </TypographyP>
        <TypographyList>
          <li>Facilitating requests and offers of help</li>
          <li>Verifying users to build trust within the community</li>
          <li>
            Sending you technical notices, updates, security alerts, and support
            messages
          </li>
          <li>Responding to your comments, questions, and requests</li>
        </TypographyList>
      </div>

      <div className="mb-10">
        <TypographyH2 className="text-2xl sm:text-3xl mb-4">
          Data Security
        </TypographyH2>
        <TypographyP>
          We implement appropriate technical and organizational measures to
          protect the personal data that we collect and process about you. While
          we strive to use commercially acceptable means to protect your
          personal information, please note that no method of transmission over
          the Internet or method of electronic storage is 100% secure.
        </TypographyP>
      </div>

      <div>
        <TypographyH2 className="text-2xl sm:text-3xl mb-4">
          Changes to This Policy
        </TypographyH2>
        <TypographyP>
          We may update this Privacy Policy from time to time. If we make
          changes, we will notify you by revising the date at the top of the
          policy and, in some cases, we may provide you with additional notice
          (such as adding a statement to our homepage or sending you a
          notification).
        </TypographyP>
      </div>
    </section>
  );
}
