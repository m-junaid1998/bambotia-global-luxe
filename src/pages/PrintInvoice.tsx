// import React from "react";

// const PrintInvoice = ({
//   orderNumber,
//   customer,
//   items,
//   subtotal,
//   shipping,
//   total,
//   paymentMethod,
//   estimatedDelivery,
//   placedAt,
// }) => {
//   return (
//     <div
//       id="print-invoice"
//       className="hidden print:block bg-white text-black min-h-screen p-10"
//     >
//       {/* Header */}
//       <div className="flex items-start justify-between border-b pb-6 mb-8">
//         <div>
//           <h1 className="text-4xl font-bold tracking-wide">BAMBOTIA</h1>

//           <p className="text-sm text-gray-500 mt-2">
//             Luxury Jewellery & Fashion Store
//           </p>
//         </div>

//         <div className="text-right">
//           <p className="text-xs text-gray-500 uppercase ">Invoice</p>

//           <h2 className="text-2xl font-semibold mt-1">#{orderNumber}</h2>

//           <p className="text-sm text-gray-600 mt-2">
//             {new Date(placedAt).toLocaleDateString("en-PK", {
//               year: "numeric",
//               month: "long",
//               day: "numeric",
//             })}
//           </p>
//         </div>
//       </div>

//       {/* Customer + Delivery */}
//       <div className="grid grid-cols-2 gap-10 mb-10">
//         <div>
//           <h3 className="text-lg uppercase  mb-4">Customer Details</h3>

//           <div className="space-y-2 text-sm">
//             <p>
//               <span className="font-medium">Name:</span> {customer.fullName}
//             </p>

//             <p>
//               <span className="font-medium">Phone:</span> {customer.phone}
//             </p>

//             <p>
//               <span className="font-medium">Address:</span> {customer.address},{" "}
//               {customer.area}, {customer.city}
//             </p>

//             {customer.notes && (
//               <p>
//                 <span className="font-medium">Notes:</span> {customer.notes}
//               </p>
//             )}
//           </div>
//         </div>

//         <div>
//           <h3 className="text-lg  uppercase mb-4">Order Details</h3>

//           <div className="space-y-2 text-sm">
//             <p>
//               <span className="font-medium">Payment Method:</span>{" "}
//               {paymentMethod}
//             </p>

//             <p>
//               <span className="font-medium">Estimated Delivery:</span>{" "}
//               {estimatedDelivery}
//             </p>

//             <p>
//               <span className="font-medium">Order Status:</span> Confirmed
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="mt-5">
//         <table className="w-full table-fixed">

//           <thead>
//             <tr className="border-b border-gray-300">
//               <th className="text-left py-3 w-[45px] text-[11px] uppercase tracking-wide text-gray-500 font-semibold">
//                 P:ID
//               </th>

//               <th className="text-left py-3 w-[200px] text-[11px] uppercase tracking-wide text-gray-500 font-semibold">
//                 Product Image
//               </th>

//               <th className="text-left py-3 text-[11px] uppercase tracking-wide text-gray-500 font-semibold">
//                 Product Name
//               </th>

//               <th className="text-center py-3 w-[60px] text-[11px] uppercase tracking-wide text-gray-500 font-semibold">
//                 Qty
//               </th>

//               <th className="text-right py-3 w-[110px] text-[11px] uppercase tracking-wide text-gray-500 font-semibold">
//                 Price
//               </th>

//               <th className="text-right py-3 w-[110px] text-[11px] uppercase tracking-wide text-gray-500 font-semibold">
//                 Total
//               </th>
//             </tr>
//           </thead>

//           {/* Table Body */}
//           <tbody>
//             {items.map((item, index) => (
//               <tr
//                 key={item.productId}
//                 className={
//                   index !== items.length - 1 ? "border-b border-gray-200" : ""
//                 }
//               >
//                 <td className="py-4 text-sm text-gray-700 font-medium">
//                   #{item.productId}
//                 </td>

//                 <td className="py-4">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-[9em] h-[7.5em] rounded object-cover"
//                   />
//                 </td>

//                 <td className="py-4">
//                   <p className="text-sm font-semibold text-gray-900 leading-tight">
//                     {item.name}
//                   </p>
//                 </td>

//                 <td className="py-4 text-center text-sm text-gray-700">
//                   {item.quantity}
//                 </td>

//                 {/* Price */}
//                 <td className="py-4 text-right text-sm text-gray-700">
//                   PKR {item.price.toLocaleString()}
//                 </td>

//                 {/* Total */}
//                 <td className="py-4 text-right text-sm font-semibold text-black">
//                   PKR {(item.price * item.quantity).toLocaleString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Totals */}
//       <div className="flex justify-end mt-10">
//         <div className="w-full max-w-sm border rounded-xl p-6">
//           <div className="flex justify-between text-sm mb-3">
//             <span>Subtotal</span>

//             <span>PKR {subtotal.toLocaleString()}</span>
//           </div>

//           <div className="flex justify-between text-sm mb-3">
//             <span>Shipping</span>

//             <span>
//               {shipping === 0 ? "FREE" : `PKR ${shipping.toLocaleString()}`}
//             </span>
//           </div>

//           <div className="border-t pt-4 mt-4 flex justify-between">
//             <span className="font-semibold text-lg">Grand Total</span>

//             <span className="font-bold text-lg">
//               PKR {total.toLocaleString()}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="mt-16 border-t pt-6 text-center">
//         <p className="text-sm font-medium">
//           Thank you for shopping with BAMBOTIA
//         </p>

//         <p className="text-xs text-gray-500 mt-2">
//           This is a computer-generated invoice and does not require a signature.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default PrintInvoice;
import React from "react";

const PrintInvoice = ({
  orderNumber,
  customer,
  items,
  subtotal,
  shipping,
  total,
  paymentMethod,
  estimatedDelivery,
  placedAt,
}) => {
  return (
    <div
      id="print-invoice"
      className="hidden print:block bg-white text-black min-h-screen p-10"
    >
      <div className="flex items-start justify-between border-b pb-6 mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-wide uppercase">
            BAMBOTIA{" "}
          </h1>
          <p className="text-sm text-gray-500 mt-2 italic">
            Luxury Jewellery & Fashion Store
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-500 uppercase tracking-widest">
            Invoice
          </p>
          <h2 className="text-2xl font-semibold mt-1">#{orderNumber}</h2>
          <p className="text-sm text-gray-600 mt-2">
            {new Date(placedAt).toLocaleDateString("en-PK", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-10 mb-10">
        <div>
          <h3 className="text-lg uppercase font-bold mb-4 border-l-4 border-black pl-3">
            Customer Details{" "}
          </h3>
          <div className="space-y-1.5 text-sm">
            <p>
              <span className="font-semibold">Name:</span> {customer.fullName}
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              {customer.phone}{" "}
            </p>
            <p className="leading-relaxed">
              <span className="font-semibold">Address:</span> {customer.address}
              , {customer.area}, {customer.city}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg uppercase font-bold mb-4 border-l-4 border-black pl-3">
            Order Details{" "}
          </h3>
          <div className="space-y-1.5 text-sm">
            <p>
              <span className="font-semibold">Payment:</span> {paymentMethod}
            </p>
            <p>
              <span className="font-semibold">Delivery:</span>{" "}
              {estimatedDelivery}{" "}
            </p>
            <p>
              <span className="font-semibold">Status:</span> Confirmed
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <table className="w-full border-collapse overflow-hidden">
          <thead>
            <tr className="border-b-2 border-black bg-gray-50">
              <th className="text-left py-3 px-2 w-[10%] text-[11px] uppercase font-bold">
                P:ID
              </th>
              <th className="text-left py-3 px-2 w-[15%] text-[11px] uppercase font-bold">
                Image
              </th>
              <th className="text-left py-3 px-2 text-[11px] uppercase font-bold">
                Product Name
              </th>
              <th className="text-center py-3 px-2 w-[8%] text-[11px] uppercase font-bold">
                Qty
              </th>
              <th className="text-right py-3 px-2 w-[15%] text-[11px] uppercase font-bold">
                Price
              </th>
              <th className="text-right py-3 px-2 w-[15%] text-[11px] uppercase font-bold">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={item.productId}
                className="border-b border-gray-100 last:border-b-2 last:border-black break-inside-avoid"
              >
                <td className="py-4 px-2 text-xs font-mono text-gray-500">
                  #{item.productId}{" "}
                </td>
                <td className="py-4 px-2">
                  <img
                    src={item.image}
                    alt=""
                    className="w-16 h-16 object-cover rounded border border-gray-100 shadow-sm"
                  />
                </td>
                <td className="py-4 px-2">
                  <p className="text-sm font-bold text-gray-900 leading-tight">
                    {item.name}
                  </p>
                </td>
                <td className="py-4 px-2 text-center text-sm">
                  {item.quantity}{" "}
                </td>
                <td className="py-4 px-2 text-right text-sm">
                  PKR {item.price.toLocaleString()}{" "}
                </td>
                <td className="py-4 px-2 text-right text-sm font-bold text-black">
                  PKR {(item.price * item.quantity).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-10 break-inside-avoid">
        <div className="w-full max-w-sm border-2 border-black p-6 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex justify-between text-sm mb-3">
            <span className="text-gray-600 uppercase font-bold">Subtotal </span>
            <span className="font-medium text-black">
              PKR {subtotal.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between text-sm mb-4">
            <span className="text-gray-600 uppercase font-bold">Shipping</span>
            <span className="font-medium text-emerald-700">
              {shipping === 0 ? "FREE" : `PKR ${shipping.toLocaleString()}`}
            </span>
          </div>

          <div className="border-t-2 border-dashed border-gray-300 pt-4 mt-2 flex justify-between items-center">
            <span className="font-black text-lg uppercase tracking-tighter">
              Grand Total
            </span>
            <span className="font-black text-2xl text-black">
              PKR {total.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-20 border-t pt-8 text-center break-inside-avoid">
        <p className="text-sm font-black uppercase tracking-widest mb-2">
          Thank you for shopping with BAMBOTIA
        </p>
        <p className="text-[10px] text-gray-400 max-w-md mx-auto leading-relaxed">
          This is a computer-generated invoice and does not require a signature.
        </p>
      </div>
    </div>
  );
};

export default PrintInvoice;
