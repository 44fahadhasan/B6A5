import RequestDetails from "@/components/modules/request-details";

export default async function RequestDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <RequestDetails id={id} />;
}
