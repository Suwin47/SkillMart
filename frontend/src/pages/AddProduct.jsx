import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";

function AddProduct() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState("");

 const [formData, setFormData] = useState({
  title: "",
  description: "",
  category: "UI Kits",
  price: "",
  thumbnail: null,
  productFile: null,
});

  const categories = [
  "All",
  "Web Templates",
  "React Projects",
  "UI Kits",
  "Design Assets",
  "AI Tools",
  "Mobile Apps",
  "Databases",
  "E-Books",
];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      thumbnail: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  const handleProductFile = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  setFormData((prev) => ({
    ...prev,
    productFile: file,
  }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("price", formData.price);
      data.append("thumbnail", formData.thumbnail);
      data.append("productFile", formData.productFile);

      const res = await api.post("/services", data);

      toast.success(res.data.message);

      navigate("/seller/products");

    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Failed to create product."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">

      <h1 className="mb-8 text-4xl font-bold">
        Add Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl bg-white p-8 shadow"
      >

        <div>
          <label className="mb-2 block font-medium">
            Product Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Description
          </label>

          <textarea
            rows="5"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
            required
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <label className="mb-2 block font-medium">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-xl border p-3"
            >
              {categories.map((cat) => (
                <option
                  key={cat}
                  value={cat}
                >
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Price
            </label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full rounded-xl border p-3"
              required
            />
          </div>

        </div>


        <div>

          <label className="mb-2 block font-medium">
            Thumbnail
          </label>

         <input
  type="file"
  accept="image/*"
  onChange={handleImage}
  required
  className="w-full rounded-xl border p-3"
/>

        </div>

        <div>

  <label className="mb-2 block font-medium">
    Product File
  </label>

  <input
    type="file"
    accept=".zip,.rar,.pdf,.fig,.apk,.sql,.docx,.pptx,.xlsx"
    onChange={handleProductFile}
    required
    className="w-full rounded-xl border p-3"
  />

  {formData.productFile && (
    <p className="mt-2 text-sm text-slate-500">
      Selected File: <strong>{formData.productFile.name}</strong>
    </p>
  )}

</div>

        {preview && (

          <div>

            <img
              src={preview}
              alt="Preview"
              className="h-56 rounded-xl border object-cover"
            />

          </div>

        )}

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
        >
          {loading ? "Uploading..." : "Create Product"}
        </button>

      </form>

    </div>
  );
}

export default AddProduct;