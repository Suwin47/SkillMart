import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";

function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState("description");

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [purchased, setPurchased] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const tabs = [
    { id: "description", label: "Description" },
    { id: "features", label: "Features" },
    { id: "reviews", label: "Reviews" },
    { id: "faq", label: "FAQ" },
  ];

  useEffect(() => {
    if (product?._id) {
      fetchReviews();
      checkPurchase();
    }
  }, [product]);

  const fetchReviews = async () => {
    try {
      const res = await api.get(`/reviews/${product._id}`);
      setReviews(res.data.reviews || []);
    } catch (err) {
      console.error(err);
    }
  };

  const checkPurchase = async () => {
    try {
      await api.get(`/download/${product._id}`);
      setPurchased(true);
    }
      catch (err) {
  if (err.response?.status !== 403) {
    console.error(err);
  }

  setPurchased(false);
}
  };

  const submitReview = async () => {
    if (!purchased) {
      return toast.error(
        "Purchase this product to submit a review."
      );
    }

    if (!rating) {
      return toast.error("Please select a rating.");
    }

    if (!comment.trim()) {
      return toast.error("Please write your review.");
    }

    try {
      setSubmitting(true);

      await api.post("/reviews", {
        serviceId: product._id,
        rating,
        comment,
      });

      toast.success("Review submitted successfully.");

      setRating(5);
      setComment("");

      fetchReviews();

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Unable to submit review."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="flex flex-wrap border-b border-slate-200">

        {tabs.map((tab) => (

          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-8 py-5 text-lg font-semibold transition ${
              activeTab === tab.id
                ? "border-b-4 border-indigo-600 text-indigo-600"
                : "text-slate-500 hover:text-indigo-600"
            }`}
          >
            {tab.label}
          </button>

        ))}

      </div>

      <div className="p-8">

        {activeTab === "description" && (

          <div>

            <h2 className="text-2xl font-bold">
              Product Description
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              {product.description}
            </p>

          </div>

        )}

        {activeTab === "features" && (

          <div>

            <h2 className="text-2xl font-bold">
              Features
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">

              {[
                "Responsive Design",
                "Clean Code",
                "Easy Customization",
                "Modern UI",
                "Documentation Included",
                "Lifetime Updates",
              ].map((feature) => (

                <div
                  key={feature}
                  className="flex items-center gap-3 rounded-xl bg-slate-50 p-4"
                >

                  <div className="h-3 w-3 rounded-full bg-green-500"></div>

                  <span>{feature}</span>

                </div>

              ))}

            </div>

          </div>

        )}

        {activeTab === "reviews" && (

          <div>

            <h2 className="text-3xl font-bold">
              Customer Reviews
            </h2>

            <div className="mt-2 text-slate-500">
              {reviews.length} Reviews
            </div>

            {/* Review Form */}

            <div className="mt-8 rounded-2xl border bg-slate-50 p-8">

              <h3 className="mb-5 text-xl font-bold">
                Submit Review
              </h3>

              {!purchased && (

                <div className="mb-5 rounded-xl bg-yellow-50 p-4 text-sm text-yellow-700">

                  Purchase this product to write a review.

                </div>

              )}

              {/* Stars */}

              <div className="mb-6 flex gap-2">

                {[1,2,3,4,5].map((star)=>(
                  <button
                    key={star}
                    disabled={!purchased}
                    onClick={()=>setRating(star)}
                    className={`text-4xl transition ${
                      purchased
                        ? "hover:scale-110"
                        : "cursor-not-allowed opacity-40"
                    }`}
                  >
                    {star<=rating ? "⭐":"☆"}
                  </button>
                ))}

              </div>

              <textarea
                rows={5}
                disabled={!purchased}
                value={comment}
                onChange={(e)=>setComment(e.target.value)}
                placeholder={
                  purchased
                    ? "Share your experience with this product..."
                    : "Purchase required to review this product."
                }
                className="w-full rounded-xl border p-4 outline-none disabled:bg-slate-100"
              />

              <button
                onClick={submitReview}
                disabled={!purchased || submitting}
                className={`mt-6 w-full rounded-xl py-4 font-semibold transition ${
                  purchased
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "cursor-not-allowed bg-slate-300 text-slate-500"
                }`}
              >
                {submitting
                  ? "Submitting..."
                  : "Submit Review"}
              </button>

            </div>

            {/* Reviews */}

            <div className="mt-10 space-y-6">
                            {reviews.length === 0 ? (

                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">

                  <h3 className="text-xl font-semibold text-slate-700">
                    No Reviews Yet
                  </h3>

                  <p className="mt-3 text-slate-500">
                    Be the first customer to review this product.
                  </p>

                </div>

              ) : (

                reviews.map((review) => (

                  <div
                    key={review._id}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                  >

                    <div className="flex items-start justify-between">

                      <div className="flex items-center gap-4">

                        <img
                          src={
                            review.buyer?.profileImage ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              review.buyer?.fullName || "User"
                            )}`
                          }
                          alt={review.buyer?.fullName}
                          className="h-12 w-12 rounded-full object-cover"
                        />

                        <div>

                          <h3 className="font-semibold text-slate-900">
                            {review.buyer?.fullName}
                          </h3>

                          <p className="mt-1 text-sm text-slate-500">
                            {new Date(
                              review.createdAt
                            ).toLocaleDateString()}
                          </p>

                        </div>

                      </div>

                      <div className="text-xl">
                        {"⭐".repeat(review.rating)}
                      </div>

                    </div>

                    <p className="mt-5 leading-7 text-slate-600">
                      {review.comment}
                    </p>

                  </div>

                ))

              )}

            </div>

          </div>

        )}

        {activeTab === "faq" && (

          <div>

            <h2 className="text-2xl font-bold">
              Frequently Asked Questions
            </h2>

            <div className="mt-8 space-y-6">

              <div className="rounded-xl border p-5">

                <h3 className="font-semibold">
                  Will I receive lifetime updates?
                </h3>

                <p className="mt-2 text-slate-600">
                  Yes. Every purchase includes free lifetime updates.
                </p>

              </div>

              <div className="rounded-xl border p-5">

                <h3 className="font-semibold">
                  Can I use this in commercial projects?
                </h3>

                <p className="mt-2 text-slate-600">
                  Yes. Commercial usage is allowed.
                </p>

              </div>

              <div className="rounded-xl border p-5">

                <h3 className="font-semibold">
                  Is support included?
                </h3>

                <p className="mt-2 text-slate-600">
                  Yes. Six months of support is included.
                </p>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default ProductTabs;