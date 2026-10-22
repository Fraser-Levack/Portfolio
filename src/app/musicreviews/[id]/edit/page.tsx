import { notFound } from "next/navigation";
import ReviewForm from "@/components/ReviewForm";
import { getReview } from "@/lib/supabase";
import { editReview } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditReview({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const review = await getReview(id);
  if (!review) notFound();

  return <ReviewForm title="EDIT REVIEW" submitLabel="Save changes" action={editReview.bind(null, id)} review={review} />;
}
