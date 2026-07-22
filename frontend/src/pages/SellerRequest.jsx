import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";

function SellerRequest() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 py-12">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 shadow">

          <h1 className="text-4xl font-bold">
            Become a Seller
          </h1>

          <p className="mt-3 text-slate-600">
            Start selling your digital products on SkillMart.
          </p>

          <form className="mt-10 space-y-6">

            <div>
              <label className="mb-2 block font-medium">
                Business Name
              </label>

              <input
                type="text"
                placeholder="Enter your business name"
                className="w-full rounded-xl border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                About You
              </label>

              <textarea
                rows="5"
                placeholder="Tell us about yourself..."
                className="w-full rounded-xl border p-3"
              />
            </div>

            <button
              className="rounded-xl bg-blue-600 px-8 py-3 text-white"
            >
              Submit Request
            </button>

          </form>

        </div>
      </main>

      <Footer />
    </>
  );
}

export default SellerRequest;