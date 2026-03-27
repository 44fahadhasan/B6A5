import SignIn from "@/components/modules/sign-in";

interface SignInParams {
  searchParams: Promise<{ redirect?: string }>;
}

export default async function SignInPage({ searchParams }: SignInParams) {
  const { redirect } = await searchParams;

  return <SignIn redirectPath={redirect} />;
}
