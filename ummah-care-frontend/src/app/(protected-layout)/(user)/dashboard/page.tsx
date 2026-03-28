import { getSession } from "@/actions/auth-actions";
import { Onboarding } from "@/components/modules/onboarding";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function UserDashboardPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["session"],
    queryFn: getSession,
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Onboarding />
      </HydrationBoundary>
    </div>
  );
}
