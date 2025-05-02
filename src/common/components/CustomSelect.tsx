// import { useState } from "react";
// import { Flag } from "lucide-react";
// import { TPriority } from "../../App";

// export const CustomSelect = (props: {
//   options: { value: number; label: string }[];
//   selectHandler: () => void;
// }) => {
//   const colors = ["red", "orange", "blue", "black"];

//   const [open, setOpen] = useState(false);

//   return (
//     <div>
//       {/* Selected Item */}
//       <div onClick={() => setOpen(!open)}>
//         <span>
//           <Flag size={15} color={colors[selected.value - 1]} />
//           {selected.label}
//         </span>
//       </div>

//       {/* Dropdown List */}
//       {open && (
//         <ul>
//           {options.map((item, index) => (
//             <li
//               key={index}
//               onClick={() => {
//                 selectHandler(item);
//                 setOpen(false);
//               }}
//             >
//               <Flag size={15} color={colors[item.value - 1]} />
//               {item.label}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };
