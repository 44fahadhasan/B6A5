import RequestDetailsModal from "@/components/modules/request-details/modal";

export default async function RequestDetailsModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <RequestDetailsModal id={id} />;
}
