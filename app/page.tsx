// app/page.jsx or Home.jsx
import BookCard from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import HCJ from "../public/htmlcssjs.jpeg";
import Reactjs from "../public/react.png";
import Tw from "../public/tw.jpg";

const featuredBooks = [
  {
    title: "HTML, CSS, and JavaScript for Beginners",
    description: "Master the fundamentals of web development.",
    content:
      "Learn to build responsive, interactive websites with practical examples and production-ready tips.",
    price: "Buy Now for NPR 999",
    href: "/buy/html-css-js",
    image: HCJ, // Make sure to place this image in public/books/
  },
  {
    title: "React Essentials",
    description: "Build powerful SPAs with React.",
    content: "A hands-on guide to mastering components, hooks, and context.",
    price: "Buy Now for NPR 1299",
    href: "/buy/react-essentials",
    image: Reactjs,
  },
  {
    title: "Tailwind CSS Mastery",
    description: "Style faster with utility-first CSS.",
    content: "Build beautiful, responsive UIs with Tailwind's design system.",
    price: "Buy Now for NPR 899",
    href: "/buy/tailwind-css",
    image: Tw,
  },
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to ShawnLearn</h1>
        <p className="text-lg mb-6">
          Your hub for learning web development with expertly curated eBooks.
        </p>
        <Button size="lg" asChild>
          <a href="#featured">Explore eBooks</a>
        </Button>
      </section>

      <section id="featured" className="py-12">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Featured eBooks
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBooks.map((book, index) => (
            <BookCard key={index} {...book} />
          ))}
        </div>
      </section>
    </div>
  );
}
