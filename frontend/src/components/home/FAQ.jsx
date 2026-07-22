import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How do I purchase a product?",
    answer:
      "Simply browse products, add your favorite item to the cart, complete the payment, and download it instantly.",
  },
  {
    question: "Can I become a seller on SkillMart?",
    answer:
      "Yes. Register for an account, submit a seller request, and once approved you can upload and sell your digital products.",
  },
  {
    question: "Are payments secure?",
    answer:
      "Absolutely. All payments are processed through secure and trusted payment gateways.",
  },
  {
    question: "Can I download products again later?",
    answer:
      "Yes. Every purchased product will be available in your account's purchase history.",
  },
  {
    question: "Do I get a refund?",
    answer:
      "Refunds depend on the seller's policy. Please check the product page before purchasing.",
  },
];

function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-slate-50 py-24">
      <div className="max-w-4xl mx-auto px-6">

        <div className="text-center">

          <p className="uppercase tracking-[0.25em] text-blue-600 font-semibold">
            FAQ
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-slate-500">
            Find answers to the most common questions about SkillMart.
          </p>

        </div>

        <div className="mt-14 space-y-5">

          {faqs.map((faq, index) => (

            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white shadow-sm"
            >

              <button
                onClick={() =>
                  setOpen(open === index ? -1 : index)
                }
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >

                <span className="font-semibold text-slate-800">
                  {faq.question}
                </span>

                {open === index ? (
                  <ChevronUp />
                ) : (
                  <ChevronDown />
                )}

              </button>

              {open === index && (

                <div className="px-6 pb-6 text-slate-500 leading-7">
                  {faq.answer}
                </div>

              )}

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default FAQ;