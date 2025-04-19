// lib/bookData.ts
import HCJ from "../public/htmlcssjs.jpeg";

export const books = [
  {
    description: "Nice book",
    slug: "html-css-js",
    title: "HTML, CSS, and JavaScript for Beginners",
    price: "NPR 999",
    image: HCJ,
    file: "/ebooks/html-css-js.pdf", // ← add this
  },
  {
    description: "Nice book",
    slug: "react-essentials",
    title: "React Essentials",
    price: "NPR 1299",
    image: "/books/react.jpg",
    file: "/ebooks/html-css-js.pdf", // ← add this
  },
  {
    description: "Nice book",
    slug: "tailwind-css",
    title: "Tailwind CSS Mastery",
    price: "NPR 899",
    image: "/books/tailwind.jpg",
    file: "/ebooks/html-css-js.pdf", // ← add this
  },
];
