import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";

function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [preview, setPreview] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
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

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const res = await api.get(`/services/${id}`);

            const product = res.data.service;

            setFormData({
                title: product.title,
                description: product.description,
                category: product.category,
                price: product.price,
                downloadUrl: product.downloadUrl,
                thumbnail: null,
            });

            setPreview(product.thumbnail);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load product.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
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
            setSaving(true);

            const data = new FormData();

            data.append("title", formData.title);
            data.append("description", formData.description);
            data.append("category", formData.category);
            data.append("price", formData.price);
            data.append("downloadUrl", formData.downloadUrl);

            if (formData.thumbnail) {
                data.append("thumbnail", formData.thumbnail);
            }

            const res = await api.put(`/services/${id}`, data);

            toast.success(res.data.message);

            navigate("/seller/products");

        } catch (err) {
            console.error(err);

            toast.error(
                err.response?.data?.message || "Update failed."
            );
        } finally {
            setSaving(false);
        }
    };
      if (loading) {
    return (
      <div className="text-center text-2xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">

      <h1 className="mb-8 text-4xl font-bold">
        Edit Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl bg-white p-8 shadow"
      >

        <div>
          <label className="mb-2 block font-medium">
            Title
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
                <option key={cat} value={cat}>
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
            Change Thumbnail
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
          />
        </div>

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="h-56 rounded-xl border object-cover"
          />
        )}

        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
        >
          {saving ? "Updating..." : "Update Product"}
        </button>

      </form>

    </div>
  );
}

export default EditProduct;