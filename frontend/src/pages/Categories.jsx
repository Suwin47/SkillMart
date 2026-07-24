import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import CategoriesGrid from "../components/categories/CategoriesGrid";

function Categories() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 py-12">

        <div className="mx-auto max-w-7xl px-4 md:px-6">

          {/* Hero Section */}
          <div className="mb-14 text-center">

            <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
              Browse Categories
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base text-slate-500 md:text-lg">
              Discover premium digital products including web templates,
              React projects, UI kits, AI tools, mobile apps,
              databases, e-books, and design assets.
            </p>

          </div>

          {/* Categories */}
          <CategoriesGrid />

        </div>

      </main>

      <Footer />
    </>
  );
}

export default Categories;