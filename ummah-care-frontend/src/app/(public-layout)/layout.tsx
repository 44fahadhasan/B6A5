import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Header />
      <div className="min-h-[calc(100vh-233px)] py-8 md:py-10 lg:py-14">
        {children}
      </div>
      <Footer />
    </main>
  );
}
