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
    category: "UI Kit",
    price: "",
    downloadUrl: "",
    thumbnail: null,
  });

  const categories = [
    "UI Kit",
    "React Component",
    "Template",
    "Source Code",
    "E-book",
    "Course",
    "Icons",
    "Design Asset",
    "Other",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("price", formData.price);
      data.append("downloadUrl", formData.downloadUrl);
      data.append("thumbnail", formData.thumbnail);

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
            Download URL
          </label>

          <input
            type="text"
            name="downloadUrl"
            value={formData.downloadUrl}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
            required
          />
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
          />

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