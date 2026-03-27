import { Logo } from "@/components/layout/logo";
import { ModeToggle } from "../mode-toggle";
import FooterBottom from "./footer-bottom";
import FooterNav from "./footer-nav";

export default function Footer() {
  return (
    <footer className="mx-auto max-w-5xl *:px-4 *:md:px-6">
      <div className="flex flex-col gap-6 py-6">
        <div className="flex items-center justify-between">
          <Logo />
          <ModeToggle />
        </div>
        <FooterNav />
      </div>
      <FooterBottom />
    </footer>
  );
}
