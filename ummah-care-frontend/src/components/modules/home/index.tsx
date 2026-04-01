import { EarlyCtaBanner } from "./early-cta-banner";
import { FAQ } from "./faq";
import { FeatureHighlights } from "./feature-highlights";
import { FinalCtaBanner } from "./final-cta-banner";
import { Hero } from "./hero";
import { HowItWorks } from "./how-it-works";
import { NewsletterSignup } from "./newsletter-signup";
import { RoleSystem } from "./role-system";
import { Testimonials } from "./testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <EarlyCtaBanner />
      {/* <ImpactStats /> */}
      <HowItWorks />
      <RoleSystem />
      <FeatureHighlights />
      {/* <Stories /> */}
      <Testimonials />
      {/* <Partners /> */}
      <FAQ />
      <FinalCtaBanner />
      <NewsletterSignup />
    </>
  );
}
