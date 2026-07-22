import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "John David",
    role: "Frontend Developer",
    image: "https://i.pravatar.cc/150?img=12",
    review:
      "SkillMart has completely changed the way I buy UI kits and templates. Everything is organized and downloads are instant.",
  },
  {
    id: 2,
    name: "Sophia Wilson",
    role: "UI/UX Designer",
    image: "https://i.pravatar.cc/150?img=5",
    review:
      "The quality of products is amazing. I found premium Figma resources that saved me hours of work.",
  },
  {
    id: 3,
    name: "Michael Lee",
    role: "Full Stack Developer",
    image: "https://i.pravatar.cc/150?img=15",
    review:
      "As a seller, SkillMart helped me reach more customers. The experience is smooth and professional.",
  },
];

function Testimonials() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center">

          <p className="uppercase tracking-[0.25em] text-blue-600 font-semibold">
            Testimonials
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            Loved by Our Community
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-slate-500">
            Thousands of creators and buyers trust SkillMart every day.
          </p>

        </div>

        {/* Cards */}

        <div className="mt-16 grid gap-8 lg:grid-cols-3">

          {testimonials.map((item) => (

            <div
              key={item.id}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
            >

              <div className="flex gap-1 text-yellow-500">

                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    fill="currentColor"
                  />
                ))}

              </div>

              <p className="mt-6 leading-8 text-slate-600">
                "{item.review}"
              </p>

              <div className="mt-8 flex items-center gap-4">

                <img
                  src={item.image}
                  alt={item.name}
                  className="h-14 w-14 rounded-full object-cover"
                />

                <div>

                  <h3 className="font-bold text-slate-900">
                    {item.name}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {item.role}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Testimonials;