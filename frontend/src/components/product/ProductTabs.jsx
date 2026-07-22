import { useEffect, useState } from "react";
import api from "../../services/api";

function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState("description");
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const tabs = [
    { id: "description", label: "Description" },
    { id: "features", label: "Features" },
    { id: "reviews", label: "Reviews" },
    { id: "faq", label: "FAQ" },
  ];

  useEffect(() => {
    if (product?._id) {
      fetchReviews();
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

  const submitReview = async () => {
    if (!comment.trim()) {
      alert("Please enter your review.");
      return;
    }

    try {
      await api.post("/reviews", {
        serviceId: product._id,
        rating,
        comment,
      });

      setComment("");
      setRating(5);

      fetchReviews();

      alert("Review submitted successfully.");
    } catch (err) {
      alert(
        err.response?.data?.message || "Unable to submit review."
      );
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

            <h2 className="text-2xl font-bold text-slate-900">
              Customer Reviews
            </h2>

            {/* Write Review */}

            <div className="mt-8 rounded-2xl border border-slate-200 p-6">

              <h3 className="mb-5 text-xl font-semibold">
                Write a Review
              </h3>

              <div className="mb-5 flex gap-2">

                {[1, 2, 3, 4, 5].map((star) => (

                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="text-3xl"
                  >
                    {star <= rating ? "⭐" : "☆"}
                  </button>

                ))}

              </div>

              <textarea
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience..."
                className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-indigo-500"
              />

              <button
                type="button"
                onClick={submitReview}
                className="mt-5 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
              >
                Submit Review
              </button>

            </div>

            {/* Review List */}

            <div className="mt-10 space-y-6">

              {reviews.length === 0 ? (

                <div className="rounded-xl border border-dashed p-10 text-center text-slate-500">
                  No reviews yet.
                </div>

              ) : (

                reviews.map((review) => (

                  <div
                    key={review._id}
                    className="rounded-2xl border border-slate-200 p-6"
                  >

                    <div className="flex items-center justify-between">

                      <div>

                        <h3 className="font-semibold">
                          {review.buyer?.fullName}
                        </h3>

                        <p className="mt-3 text-slate-600">
                          {review.comment}
                        </p>

                      </div>

                      <div className="text-xl text-yellow-500">
                        {"⭐".repeat(review.rating)}
                      </div>

                    </div>

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

              <div>

                <h3 className="font-semibold">
                  Will I receive lifetime updates?
                </h3>

                <p className="mt-2 text-slate-600">
                  Yes. Every purchase includes free lifetime updates.
                </p>

              </div>

              <div>

                <h3 className="font-semibold">
                  Can I use this in commercial projects?
                </h3>

                <p className="mt-2 text-slate-600">
                  Yes. Commercial usage is allowed.
                </p>

              </div>

              <div>

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