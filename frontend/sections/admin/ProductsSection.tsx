"use client";
import { useState, useId, useRef } from "react";
import Image from "next/image";
import { Pencil, Trash2, Plus, Search, X, Package } from "lucide-react";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "@/services/productsService";
import { CATEGORIES } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";
import { useAppSelector } from "@/store/hooks";
import { AdminPageWrapper } from "@/custom-components/layout/PageWrapper";
import { Button } from "@/custom-components/ui/Button";
import { Badge } from "@/custom-components/ui/Badge";
import { Input } from "@/custom-components/ui/Input";

// ─── Form state type ──────────────────────────────────────────────────────────

interface ProductForm {
  name: string;
  description: string;
  category: string;
  price: string;
  originalPrice: string;
  stock: string;
  imageUrl: string;
}

const EMPTY_FORM: ProductForm = {
  name: "",
  description: "",
  category: CATEGORIES[0],
  price: "",
  originalPrice: "",
  stock: "",
  imageUrl: "",
};

function productToForm(p: Product): ProductForm {
  return {
    name: p.name,
    description: p.description,
    category: p.category,
    price: String(p.price),
    originalPrice: p.originalPrice != null ? String(p.originalPrice) : "",
    stock: String(p.stock),
    imageUrl: p.imageUrl,
  };
}

// ─── Stock badge helper ───────────────────────────────────────────────────────

function StockBadge({ stock }: { stock: number }) {
  if (stock === 0)
    return (
      <Badge variant="danger" dot>
        Out of stock
      </Badge>
    );
  if (stock <= 5)
    return (
      <Badge variant="warning" dot>
        Low ({stock})
      </Badge>
    );
  return (
    <Badge variant="success" dot>
      {stock}
    </Badge>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ProductsSection() {
  const formId = useId();

  // ── Data state ──────────────────────────────────────────────────────────────
  const { data: productsData, isLoading } = useGetProductsQuery({ limit: 100 });
  const products = productsData?.data ?? [];
  const [createProduct, { isLoading: creating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: deleting }] = useDeleteProductMutation();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // ── Modal state ─────────────────────────────────────────────────────────────
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductForm>(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState<Partial<ProductForm>>({});

  // ── Delete state ────────────────────────────────────────────────────────────
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  // ── Image upload state ──────────────────────────────────────────────────────
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const token = useAppSelector((s) => s.auth.token);

  // ── Derived ─────────────────────────────────────────────────────────────────
  const filtered = products.filter((p) => {
    const matchesSearch =
      search.trim() === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // ── Modal helpers ───────────────────────────────────────────────────────────
  function openAdd() {
    setEditingProduct(null);
    setForm(EMPTY_FORM);
    setFormErrors({});
    setImagePreview("");
    setModalOpen(true);
  }

  function openEdit(p: Product) {
    setEditingProduct(p);
    setForm(productToForm(p));
    setFormErrors({});
    setImagePreview(p.imageUrl ?? "");
    setModalOpen(true);
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload/image`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: fd,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setForm((prev) => ({ ...prev, imageUrl: data.url }));
      setImagePreview(data.url);
    } catch {
      alert("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  function closeModal() {
    setModalOpen(false);
  }

  function handleFormChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function validate(): boolean {
    const errors: Partial<ProductForm> = {};
    if (!form.name.trim()) errors.name = "Name is required";
    const price = parseFloat(form.price);
    if (isNaN(price) || price <= 0) errors.price = "Price must be greater than 0";
    const stock = parseInt(form.stock, 10);
    if (isNaN(stock) || stock < 0) errors.stock = "Stock must be 0 or more";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  const handleSave = async (formData: ProductForm) => {
    if (!validate()) return;
    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        imageUrl: formData.imageUrl,
        category: formData.category,
        stock: Number(formData.stock),
      };
      if (editingProduct) {
        await updateProduct({ id: editingProduct._id, data: { ...payload, _id: editingProduct._id } }).unwrap();
      } else {
        await createProduct(payload as any).unwrap();
      }
      setModalOpen(false);
      setEditingProduct(null);
    } catch {
      alert("Failed to save product. Please try again.");
    }
  };

  // ── Delete helpers ──────────────────────────────────────────────────────────
  function confirmDelete(p: Product) {
    setDeleteTarget(p);
  }

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteProduct(deleteTarget._id).unwrap();
      setDeleteTarget(null);
    } catch {
      alert("Failed to delete product.");
    }
  };

  // ── Discount % helper ───────────────────────────────────────────────────────
  function discountPercent(price: number, original: number) {
    return Math.round(((original - price) / original) * 100);
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <>
      <AdminPageWrapper
        title="Products"
        description="Manage your product catalogue"
        action={
          <Button onClick={openAdd} leftIcon={<Plus className="w-4 h-4" />}>
            Add Product
          </Button>
        }
      >
        {/* ── Toolbar ─────────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex flex-1 gap-3 flex-wrap items-center">
            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search products…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-10 pl-9 pr-9 text-sm rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.05] text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-10 px-3 text-sm rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.05] text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors cursor-pointer"
            >
              <option value="">All categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Count badge */}
          <Badge variant="info" size="md">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </Badge>
        </div>

        {/* ── Table ───────────────────────────────────────────────────────── */}
        <div className="rounded-xl border border-zinc-200 overflow-hidden surface-glass shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="sticky top-0 z-10 bg-zinc-50 dark:bg-white/[0.04] border-b border-zinc-200 dark:border-white/10">
                  <th className="text-left px-4 py-3 font-semibold text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                    Product
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                    Category
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                    Price
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                    Stock
                  </th>
                  <th className="text-right px-4 py-3 font-semibold text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-white/[0.06]">
                {isLoading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <tr key={`sk-${i}`}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg shrink-0 animate-pulse bg-zinc-200 dark:bg-zinc-700" />
                          <div className="h-3.5 w-40 rounded animate-pulse bg-zinc-200 dark:bg-zinc-700" />
                        </div>
                      </td>
                      <td className="px-4 py-3"><div className="h-3.5 w-20 rounded animate-pulse bg-zinc-200 dark:bg-zinc-700" /></td>
                      <td className="px-4 py-3"><div className="h-3.5 w-14 rounded animate-pulse bg-zinc-200 dark:bg-zinc-700" /></td>
                      <td className="px-4 py-3"><div className="h-3.5 w-12 rounded animate-pulse bg-zinc-200 dark:bg-zinc-700" /></td>
                      <td className="px-4 py-3"><div className="h-3.5 w-16 ml-auto rounded animate-pulse bg-zinc-200 dark:bg-zinc-700" /></td>
                    </tr>
                  ))
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-16 text-center">
                      <div className="flex flex-col items-center gap-3 text-zinc-400 dark:text-zinc-500">
                        <Package className="w-10 h-10" />
                        <p className="text-sm font-medium">No products found</p>
                        {(search || categoryFilter) && (
                          <p className="text-xs">
                            Try adjusting your search or filter
                          </p>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((product) => (
                    <tr
                      key={product._id}
                      className="hover:bg-zinc-50 dark:hover:bg-white/[0.04] transition-colors group"
                    >
                      {/* Image + name */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-zinc-100 dark:bg-zinc-800">
                            {product.imageUrl ? (
                              <Image
                                src={product.imageUrl}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="40px"
                              />
                            ) : (
                              <Package className="w-5 h-5 m-auto text-zinc-400" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-zinc-900 dark:text-zinc-100 truncate max-w-[200px]">
                              {product.name}
                            </p>
                            <p className="text-xs text-zinc-400 dark:text-zinc-500 truncate max-w-[200px]">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Badge variant="default">{product.category}</Badge>
                      </td>

                      {/* Price */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice != null && product.originalPrice > product.price && (
                            <span className="text-xs text-zinc-400 line-through">
                              {formatPrice(product.originalPrice)}
                              <span className="ml-1 no-underline text-green-600 dark:text-green-400 font-medium not-italic">
                                -{discountPercent(product.price, product.originalPrice)}%
                              </span>
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Stock */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <StockBadge stock={product.stock} />
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEdit(product)}
                            title="Edit product"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => confirmDelete(product)}
                            title="Delete product"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </AdminPageWrapper>

      {/* ── Add / Edit Modal ───────────────────────────────────────────────────── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="w-full max-w-lg surface-glass border border-zinc-200 rounded-2xl shadow-2xl overflow-hidden">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {editingProduct ? "Edit Product" : "Add Product"}
              </h2>
              <button
                onClick={closeModal}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal body */}
            <div className="px-6 py-5 space-y-4 overflow-y-auto max-h-[70vh]">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor={`${formId}-name`}
                  className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id={`${formId}-name`}
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleFormChange}
                  placeholder="Product name"
                  className="h-10 px-3 text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors"
                />
                {formErrors.name && (
                  <p className="text-xs text-red-500">{formErrors.name}</p>
                )}
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor={`${formId}-description`}
                  className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide"
                >
                  Description
                </label>
                <textarea
                  id={`${formId}-description`}
                  name="description"
                  value={form.description}
                  onChange={handleFormChange}
                  placeholder="Short product description"
                  rows={3}
                  className="px-3 py-2 text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors resize-none"
                />
              </div>

              {/* Category */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor={`${formId}-category`}
                  className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide"
                >
                  Category
                </label>
                <select
                  id={`${formId}-category`}
                  name="category"
                  value={form.category}
                  onChange={handleFormChange}
                  className="h-10 px-3 text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors cursor-pointer"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price + Original Price */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor={`${formId}-price`}
                    className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide"
                  >
                    Price <span className="text-red-500">*</span>
                  </label>
                  <input
                    id={`${formId}-price`}
                    name="price"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={form.price}
                    onChange={handleFormChange}
                    placeholder="0.00"
                    className="h-10 px-3 text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors"
                  />
                  {formErrors.price && (
                    <p className="text-xs text-red-500">{formErrors.price}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor={`${formId}-originalPrice`}
                    className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide"
                  >
                    Original Price
                    <span className="ml-1 font-normal text-zinc-400 normal-case">(sale)</span>
                  </label>
                  <input
                    id={`${formId}-originalPrice`}
                    name="originalPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.originalPrice}
                    onChange={handleFormChange}
                    placeholder="0.00"
                    className="h-10 px-3 text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>

              {/* Stock */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor={`${formId}-stock`}
                  className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide"
                >
                  Stock <span className="text-red-500">*</span>
                </label>
                <input
                  id={`${formId}-stock`}
                  name="stock"
                  type="number"
                  min="0"
                  step="1"
                  value={form.stock}
                  onChange={handleFormChange}
                  placeholder="0"
                  className="h-10 px-3 text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors"
                />
                {formErrors.stock && (
                  <p className="text-xs text-red-500">{formErrors.stock}</p>
                )}
              </div>

              {/* Product Image Upload */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
                  Product Image
                </label>
                {imagePreview && (
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700 mb-1">
                    <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="px-3 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 disabled:opacity-50 transition-colors"
                  >
                    {uploading ? "Uploading…" : imagePreview ? "Change Image" : "Upload Image"}
                  </button>
                  {imagePreview && (
                    <span className="text-xs text-zinc-400 truncate max-w-[180px]">
                      {form.imageUrl.split("/").pop()}
                    </span>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
            </div>

            {/* Modal footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
              <Button variant="secondary" onClick={closeModal}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => handleSave(form)} disabled={creating || updating}>
                {editingProduct ? "Save changes" : "Add product"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirmation Modal ──────────────────────────────────────────── */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setDeleteTarget(null);
          }}
        >
          <div className="w-full max-w-sm surface-glass border border-zinc-200 rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Delete product?
              </h2>
              <button
                onClick={() => setDeleteTarget(null)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {deleteTarget.name}
                </span>
                ? This action cannot be undone.
              </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
              <Button variant="secondary" onClick={() => setDeleteTarget(null)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDelete} disabled={deleting}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
