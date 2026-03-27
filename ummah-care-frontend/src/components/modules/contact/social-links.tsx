export const socialLinks = [
  {
    icon: <Facebook />,
    href: "https://www.facebook.com/44fahadhasan",
    label: "Facebook",
  },
  {
    icon: <Whatsapp />,
    href: "https://wa.me/+8801568335944",
    label: "WhatsApp",
  },
  {
    icon: <Linkedin />,
    href: "https://www.linkedin.com/in/44fahadhasan",
    label: "LinkedIn",
  },
];

function Facebook(props: React.ComponentProps<"svg">) {
  return (
    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 2a1 1 0 0 1 .993 .883l.007 .117v4a1 1 0 0 1 -.883 .993l-.117 .007h-3v1h3a1 1 0 0 1 .991 1.131l-.02 .112l-1 4a1 1 0 0 1 -.858 .75l-.113 .007h-2v6a1 1 0 0 1 -.883 .993l-.117 .007h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-6h-2a1 1 0 0 1 -.993 -.883l-.007 -.117v-4a1 1 0 0 1 .883 -.993l.117 -.007h2v-1a6 6 0 0 1 5.775 -5.996l.225 -.004h3z" />
    </svg>
  );
}

function Whatsapp(props: React.ComponentProps<"svg">) {
  return (
    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18.497 4.409a10 10 0 0 1 -10.36 16.828l-.223 -.098l-4.759 .849l-.11 .011a1 1 0 0 1 -.11 0l-.102 -.013l-.108 -.024l-.105 -.037l-.099 -.047l-.093 -.058l-.014 -.011l-.012 -.007l-.086 -.073l-.077 -.08l-.067 -.088l-.056 -.094l-.034 -.07l-.04 -.108l-.028 -.128l-.012 -.102a1 1 0 0 1 0 -.125l.012 -.1l.024 -.11l.045 -.122l1.433 -3.304l-.009 -.014a10 10 0 0 1 1.549 -12.454l.215 -.203a10 10 0 0 1 13.226 -.217m-8.997 3.09a1.5 1.5 0 0 0 -1.5 1.5v1a6 6 0 0 0 6 6h1a1.5 1.5 0 0 0 0 -3h-1l-.144 .007a1.5 1.5 0 0 0 -1.128 .697l-.042 .074l-.022 -.007a4.01 4.01 0 0 1 -2.435 -2.435l-.008 -.023l.075 -.041a1.5 1.5 0 0 0 .704 -1.272v-1a1.5 1.5 0 0 0 -1.5 -1.5" />
    </svg>
  );
}

function Linkedin(props: React.ComponentProps<"svg">) {
  return (
    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M17 2a5 5 0 0 1 5 5v10a5 5 0 0 1 -5 5h-10a5 5 0 0 1 -5 -5v-10a5 5 0 0 1 5 -5zm-9 8a1 1 0 0 0 -1 1v5a1 1 0 0 0 2 0v-5a1 1 0 0 0 -1 -1m6 0a3 3 0 0 0 -1.168 .236l-.125 .057a1 1 0 0 0 -1.707 .707v5a1 1 0 0 0 2 0v-3a1 1 0 0 1 2 0v3a1 1 0 0 0 2 0v-3a3 3 0 0 0 -3 -3m-6 -3a1 1 0 0 0 -.993 .883l-.007 .127a1 1 0 0 0 1.993 .117l.007 -.127a1 1 0 0 0 -1 -1" />
    </svg>
  );
}
