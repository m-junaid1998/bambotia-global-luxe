import { SUBCATEGORIES } from "@/data/products";

const AdminCategories = () => (
  <div className="space-y-8 max-w-5xl">
    <div>
      <p className="text-[10px] tracking-[0.4em] text-accent mb-2">CATALOG</p>
      <h1 className="font-serif text-3xl md:text-4xl text-foreground">Categories</h1>
      <p className="text-sm text-muted-foreground mt-2">
        Top-level categories and their sub-categories used across the storefront.
      </p>
    </div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.entries(SUBCATEGORIES).map(([cat, subs]) => (
        <div
          key={cat}
          className="bg-background/90 backdrop-blur-md border border-border rounded-2xl p-6 shadow-sm"
        >
          <p className="text-[10px] tracking-[0.3em] text-accent mb-1">CATEGORY</p>
          <h3 className="font-serif text-xl text-foreground capitalize mb-4">{cat}</h3>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            {subs.map((s) => (
              <li key={s} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-accent" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

export default AdminCategories;


// import React, { useMemo, useState } from "react";
// import {
//   ChevronDown,
//   ChevronRight,
//   ImagePlus,
//   Pencil,
//   Plus,
//   Search,
//   Trash2,
//   GripVertical,
// } from "lucide-react";

// const initialCategories = [
//   {
//     id: 1,
//     name: "Jewellery",
//     slug: "jewellery",
//     description: "Luxury jewellery collection",
//     featured: true,
//     status: true,
//     productCount: 32,
//     image:
//       "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=600",
//     banner:
//       "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200",
//     subcategories: [
//       {
//         id: 11,
//         name: "Rings",
//         slug: "rings",
//         description: "Elegant rings collection",
//         status: true,
//         image:
//           "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600",
//       },
//       {
//         id: 12,
//         name: "Necklaces",
//         slug: "necklaces",
//         description: "Premium necklaces",
//         status: true,
//         image:
//           "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600",
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: "Cosmetics",
//     slug: "cosmetics",
//     description: "Beauty & skincare essentials",
//     featured: false,
//     status: true,
//     productCount: 18,
//     image:
//       "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600",
//     banner:
//       "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1200",
//     subcategories: [
//       {
//         id: 21,
//         name: "Lipsticks",
//         slug: "lipsticks",
//         description: "Luxury lipstick collection",
//         status: true,
//         image:
//           "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=600",
//       },
//     ],
//   },
// ];

// const generateSlug = (value) =>
//   value
//     ?.toLowerCase()
//     ?.trim()
//     ?.replace(/[^a-z0-9\s-]/g, "")
//     ?.replace(/\s+/g, "-");

// const AdminCategories = () => {
//   const [categories, setCategories] = useState(initialCategories);
//   const [search, setSearch] = useState("");
//   const [expanded, setExpanded] = useState({});
//   const [filter, setFilter] = useState("all");

//   const [categoryModal, setCategoryModal] = useState(false);
//   const [subcategoryModal, setSubcategoryModal] = useState(false);

//   const [selectedCategoryId, setSelectedCategoryId] = useState(null);

//   const [categoryForm, setCategoryForm] = useState({
//     id: null,
//     name: "",
//     slug: "",
//     description: "",
//     featured: false,
//     status: true,
//     image: "",
//     banner: "",
//   });

//   const [subcategoryForm, setSubcategoryForm] = useState({
//     id: null,
//     name: "",
//     slug: "",
//     description: "",
//     status: true,
//     image: "",
//   });

//   const filteredCategories = useMemo(() => {
//     return categories.filter((cat) => {
//       const matchesSearch =
//         cat.name.toLowerCase().includes(search.toLowerCase()) ||
//         cat.subcategories.some((sub) =>
//           sub.name.toLowerCase().includes(search.toLowerCase())
//         );

//       const matchesFilter =
//         filter === "all"
//           ? true
//           : filter === "active"
//           ? cat.status
//           : !cat.status;

//       return matchesSearch && matchesFilter;
//     });
//   }, [categories, search, filter]);

//   const toggleExpand = (id) => {
//     setExpanded((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   const openCategoryModal = (category = null) => {
//     if (category) {
//       setCategoryForm(category);
//     } else {
//       setCategoryForm({
//         id: null,
//         name: "",
//         slug: "",
//         description: "",
//         featured: false,
//         status: true,
//         image: "",
//         banner: "",
//       });
//     }

//     setCategoryModal(true);
//   };

//   const saveCategory = () => {
//     if (categoryForm.id) {
//       setCategories((prev) =>
//         prev.map((item) =>
//           item.id === categoryForm.id
//             ? { ...item, ...categoryForm }
//             : item
//         )
//       );
//     } else {
//       setCategories((prev) => [
//         ...prev,
//         {
//           ...categoryForm,
//           id: Date.now(),
//           productCount: 0,
//           subcategories: [],
//         },
//       ]);
//     }

//     setCategoryModal(false);
//   };

//   const deleteCategory = (id) => {
//     setCategories((prev) => prev.filter((item) => item.id !== id));
//   };

//   const toggleCategoryStatus = (id) => {
//     setCategories((prev) =>
//       prev.map((item) =>
//         item.id === id
//           ? {
//               ...item,
//               status: !item.status,
//             }
//           : item
//       )
//     );
//   };

//   const openSubcategoryModal = (categoryId, subcategory = null) => {
//     setSelectedCategoryId(categoryId);

//     if (subcategory) {
//       setSubcategoryForm(subcategory);
//     } else {
//       setSubcategoryForm({
//         id: null,
//         name: "",
//         slug: "",
//         description: "",
//         status: true,
//         image: "",
//       });
//     }

//     setSubcategoryModal(true);
//   };

//   const saveSubcategory = () => {
//     setCategories((prev) =>
//       prev.map((cat) => {
//         if (cat.id !== selectedCategoryId) return cat;

//         if (subcategoryForm.id) {
//           return {
//             ...cat,
//             subcategories: cat.subcategories.map((sub) =>
//               sub.id === subcategoryForm.id
//                 ? { ...sub, ...subcategoryForm }
//                 : sub
//             ),
//           };
//         }

//         return {
//           ...cat,
//           subcategories: [
//             ...cat.subcategories,
//             {
//               ...subcategoryForm,
//               id: Date.now(),
//             },
//           ],
//         };
//       })
//     );

//     setSubcategoryModal(false);
//   };

//   const deleteSubcategory = (categoryId, subId) => {
//     setCategories((prev) =>
//       prev.map((cat) =>
//         cat.id === categoryId
//           ? {
//               ...cat,
//               subcategories: cat.subcategories.filter(
//                 (sub) => sub.id !== subId
//               ),
//             }
//           : cat
//       )
//     );
//   };

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//         <div>
//           <p className="text-[10px] tracking-[0.4em] text-accent mb-2">
//             ADMIN PANEL
//           </p>

//           <h1 className="font-serif text-3xl md:text-4xl text-foreground">
//             Category Management
//           </h1>

//           <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
//             Manage categories and subcategories dynamically across storefront,
//             product forms, navigation menus, homepage sections, and mobile
//             navigation.
//           </p>
//         </div>

//         <button
//           onClick={() => openCategoryModal()}
//           className="h-11 px-5 rounded-xl bg-accent text-white flex items-center gap-2 hover:scale-[1.02] transition-all"
//         >
//           <Plus size={18} />
//           Add Category
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="bg-background/90 backdrop-blur-md border border-border rounded-2xl p-4 shadow-sm">
//         <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
//           <div className="relative w-full lg:max-w-sm">
//             <Search
//               size={18}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
//             />

//             <input
//               type="text"
//               placeholder="Search category or subcategory..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full h-11 rounded-xl border border-border bg-background pl-10 pr-4 outline-none"
//             />
//           </div>

//           <div className="flex gap-2">
//             {["all", "active", "inactive"].map((item) => (
//               <button
//                 key={item}
//                 onClick={() => setFilter(item)}
//                 className={`px-4 h-10 rounded-xl border transition-all capitalize ${
//                   filter === item
//                     ? "bg-accent text-white border-accent"
//                     : "border-border bg-background"
//                 }`}
//               >
//                 {item}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Category List */}
//       <div className="space-y-4">
//         {filteredCategories.map((category) => (
//           <div
//             key={category.id}
//             className="bg-background/90 backdrop-blur-md border border-border rounded-2xl overflow-hidden shadow-sm"
//           >
//             {/* Category Header */}
//             <div className="p-5 flex flex-col xl:flex-row xl:items-center gap-5 justify-between">
//               <div className="flex items-start gap-4">
//                 <button className="mt-1 cursor-grab">
//                   <GripVertical size={18} />
//                 </button>

//                 <img
//                   src={category.image}
//                   alt=""
//                   className="w-20 h-20 rounded-2xl object-cover border border-border"
//                 />

//                 <div>
//                   <div className="flex items-center gap-3 flex-wrap">
//                     <button onClick={() => toggleExpand(category.id)}>
//                       {expanded[category.id] ? (
//                         <ChevronDown size={18} />
//                       ) : (
//                         <ChevronRight size={18} />
//                       )}
//                     </button>

//                     <h3 className="font-serif text-2xl text-foreground">
//                       {category.name}
//                     </h3>

//                     {category.featured && (
//                       <span className="px-3 py-1 rounded-full text-xs bg-emerald-100 text-emerald-700">
//                         Featured
//                       </span>
//                     )}

//                     <span
//                       className={`px-3 py-1 rounded-full text-xs ${
//                         category.status
//                           ? "bg-green-100 text-green-700"
//                           : "bg-red-100 text-red-700"
//                       }`}
//                     >
//                       {category.status ? "Active" : "Inactive"}
//                     </span>
//                   </div>

//                   <p className="text-sm text-muted-foreground mt-2">
//                     {category.description}
//                   </p>

//                   <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
//                     <span>/{category.slug}</span>
//                     <span>{category.productCount} Products</span>
//                     <span>
//                       {category.subcategories.length} Subcategories
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex flex-wrap gap-2">
//                 <button
//                   onClick={() =>
//                     toggleCategoryStatus(category.id)
//                   }
//                   className="h-10 px-4 rounded-xl border border-border hover:bg-muted transition-all"
//                 >
//                   {category.status ? "Deactivate" : "Activate"}
//                 </button>

//                 <button
//                   onClick={() => openSubcategoryModal(category.id)}
//                   className="h-10 px-4 rounded-xl border border-border hover:bg-muted transition-all flex items-center gap-2"
//                 >
//                   <Plus size={16} />
//                   Subcategory
//                 </button>

//                 <button
//                   onClick={() => openCategoryModal(category)}
//                   className="h-10 px-4 rounded-xl border border-border hover:bg-muted transition-all"
//                 >
//                   <Pencil size={16} />
//                 </button>

//                 <button
//                   onClick={() => deleteCategory(category.id)}
//                   className="h-10 px-4 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-all"
//                 >
//                   <Trash2 size={16} />
//                 </button>
//               </div>
//             </div>

//             {/* Subcategories */}
//             {expanded[category.id] && (
//               <div className="border-t border-border p-5 bg-muted/20">
//                 <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
//                   {category.subcategories.map((sub) => (
//                     <div
//                       key={sub.id}
//                       className="bg-background border border-border rounded-2xl p-4 hover:shadow-md transition-all"
//                     >
//                       <div className="flex items-start gap-3">
//                         <img
//                           src={sub.image}
//                           alt=""
//                           className="w-16 h-16 rounded-xl object-cover"
//                         />

//                         <div className="flex-1">
//                           <div className="flex items-center justify-between gap-2">
//                             <h4 className="font-medium text-foreground">
//                               {sub.name}
//                             </h4>

//                             <span
//                               className={`text-[10px] px-2 py-1 rounded-full ${
//                                 sub.status
//                                   ? "bg-green-100 text-green-700"
//                                   : "bg-red-100 text-red-700"
//                               }`}
//                             >
//                               {sub.status ? "Active" : "Inactive"}
//                             </span>
//                           </div>

//                           <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
//                             {sub.description}
//                           </p>

//                           <p className="text-xs text-accent mt-2">
//                             /{sub.slug}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="flex items-center gap-2 mt-4">
//                         <button
//                           onClick={() =>
//                             openSubcategoryModal(
//                               category.id,
//                               sub
//                             )
//                           }
//                           className="flex-1 h-9 rounded-xl border border-border text-sm hover:bg-muted transition-all"
//                         >
//                           Edit
//                         </button>

//                         <button
//                           onClick={() =>
//                             deleteSubcategory(
//                               category.id,
//                               sub.id
//                             )
//                           }
//                           className="flex-1 h-9 rounded-xl border border-red-200 text-red-600 text-sm hover:bg-red-50 transition-all"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Category Modal */}
//       {categoryModal && (
//         <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
//           <div className="w-full max-w-2xl bg-background rounded-3xl border border-border p-6 max-h-[90vh] overflow-auto">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="font-serif text-2xl">
//                 {categoryForm.id
//                   ? "Edit Category"
//                   : "Add Category"}
//               </h3>

//               <button onClick={() => setCategoryModal(false)}>
//                 ✕
//               </button>
//             </div>

//             <div className="grid md:grid-cols-2 gap-4">
//               <div className="md:col-span-2">
//                 <label className="text-sm mb-2 block">
//                   Category Name
//                 </label>

//                 <input
//                   type="text"
//                   value={categoryForm.name}
//                   onChange={(e) =>
//                     setCategoryForm({
//                       ...categoryForm,
//                       name: e.target.value,
//                       slug: generateSlug(e.target.value),
//                     })
//                   }
//                   className="w-full h-11 rounded-xl border border-border px-4"
//                 />
//               </div>

//               <div>
//                 <label className="text-sm mb-2 block">
//                   Slug URL
//                 </label>

//                 <input
//                   type="text"
//                   value={categoryForm.slug}
//                   onChange={(e) =>
//                     setCategoryForm({
//                       ...categoryForm,
//                       slug: generateSlug(e.target.value),
//                     })
//                   }
//                   className="w-full h-11 rounded-xl border border-border px-4"
//                 />
//               </div>

//               <div>
//                 <label className="text-sm mb-2 block">
//                   Category Image
//                 </label>

//                 <div className="h-32 rounded-2xl border border-dashed border-border flex flex-col items-center justify-center">
//                   {categoryForm.image ? (
//                     <img
//                       src={categoryForm.image}
//                       alt=""
//                       className="w-full h-full object-cover rounded-2xl"
//                     />
//                   ) : (
//                     <>
//                       <ImagePlus />
//                       <p className="text-xs mt-2">
//                         Upload Preview
//                       </p>
//                     </>
//                   )}
//                 </div>
//               </div>

//               <div>
//                 <label className="text-sm mb-2 block">
//                   Category Banner
//                 </label>

//                 <div className="h-32 rounded-2xl border border-dashed border-border flex flex-col items-center justify-center">
//                   {categoryForm.banner ? (
//                     <img
//                       src={categoryForm.banner}
//                       alt=""
//                       className="w-full h-full object-cover rounded-2xl"
//                     />
//                   ) : (
//                     <>
//                       <ImagePlus />
//                       <p className="text-xs mt-2">
//                         Upload Banner
//                       </p>
//                     </>
//                   )}
//                 </div>
//               </div>

//               <div className="md:col-span-2">
//                 <label className="text-sm mb-2 block">
//                   Description
//                 </label>

//                 <textarea
//                   rows={4}
//                   value={categoryForm.description}
//                   onChange={(e) =>
//                     setCategoryForm({
//                       ...categoryForm,
//                       description: e.target.value,
//                     })
//                   }
//                   className="w-full rounded-2xl border border-border p-4"
//                 />
//               </div>

//               <div className="flex items-center justify-between rounded-2xl border border-border p-4">
//                 <div>
//                   <h4 className="font-medium">
//                     Featured Category
//                   </h4>

//                   <p className="text-xs text-muted-foreground">
//                     Show on homepage sections
//                   </p>
//                 </div>

//                 <input
//                   type="checkbox"
//                   checked={categoryForm.featured}
//                   onChange={(e) =>
//                     setCategoryForm({
//                       ...categoryForm,
//                       featured: e.target.checked,
//                     })
//                   }
//                 />
//               </div>

//               <div className="flex items-center justify-between rounded-2xl border border-border p-4">
//                 <div>
//                   <h4 className="font-medium">Status</h4>

//                   <p className="text-xs text-muted-foreground">
//                     Activate or deactivate category
//                   </p>
//                 </div>

//                 <input
//                   type="checkbox"
//                   checked={categoryForm.status}
//                   onChange={(e) =>
//                     setCategoryForm({
//                       ...categoryForm,
//                       status: e.target.checked,
//                     })
//                   }
//                 />
//               </div>
//             </div>

//             <div className="flex justify-end gap-3 mt-6">
//               <button
//                 onClick={() => setCategoryModal(false)}
//                 className="h-11 px-5 rounded-xl border border-border"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={saveCategory}
//                 className="h-11 px-5 rounded-xl bg-accent text-white"
//               >
//                 Save Category
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Subcategory Modal */}
//       {subcategoryModal && (
//         <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
//           <div className="w-full max-w-xl bg-background rounded-3xl border border-border p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="font-serif text-2xl">
//                 {subcategoryForm.id
//                   ? "Edit Subcategory"
//                   : "Add Subcategory"}
//               </h3>

//               <button onClick={() => setSubcategoryModal(false)}>
//                 ✕
//               </button>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="text-sm mb-2 block">
//                   Subcategory Name
//                 </label>

//                 <input
//                   type="text"
//                   value={subcategoryForm.name}
//                   onChange={(e) =>
//                     setSubcategoryForm({
//                       ...subcategoryForm,
//                       name: e.target.value,
//                       slug: generateSlug(e.target.value),
//                     })
//                   }
//                   className="w-full h-11 rounded-xl border border-border px-4"
//                 />
//               </div>

//               <div>
//                 <label className="text-sm mb-2 block">
//                   Slug URL
//                 </label>

//                 <input
//                   type="text"
//                   value={subcategoryForm.slug}
//                   onChange={(e) =>
//                     setSubcategoryForm({
//                       ...subcategoryForm,
//                       slug: generateSlug(e.target.value),
//                     })
//                   }
//                   className="w-full h-11 rounded-xl border border-border px-4"
//                 />
//               </div>

//               <div>
//                 <label className="text-sm mb-2 block">
//                   Description
//                 </label>

//                 <textarea
//                   rows={4}
//                   value={subcategoryForm.description}
//                   onChange={(e) =>
//                     setSubcategoryForm({
//                       ...subcategoryForm,
//                       description: e.target.value,
//                     })
//                   }
//                   className="w-full rounded-2xl border border-border p-4"
//                 />
//               </div>

//               <div className="flex items-center justify-between rounded-2xl border border-border p-4">
//                 <div>
//                   <h4 className="font-medium">Status</h4>
//                 </div>

//                 <input
//                   type="checkbox"
//                   checked={subcategoryForm.status}
//                   onChange={(e) =>
//                     setSubcategoryForm({
//                       ...subcategoryForm,
//                       status: e.target.checked,
//                     })
//                   }
//                 />
//               </div>
//             </div>

//             <div className="flex justify-end gap-3 mt-6">
//               <button
//                 onClick={() => setSubcategoryModal(false)}
//                 className="h-11 px-5 rounded-xl border border-border"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={saveSubcategory}
//                 className="h-11 px-5 rounded-xl bg-accent text-white"
//               >
//                 Save Subcategory
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminCategories;