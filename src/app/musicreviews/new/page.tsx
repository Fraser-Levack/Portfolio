import ReviewForm from "@/components/ReviewForm";
import { submitReview } from "../actions";

export default function NewReview() {
  return <ReviewForm title="NEW REVIEW" submitLabel="Post review" action={submitReview} />;
}
