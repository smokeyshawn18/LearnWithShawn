import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { books } from "@/lib/bookData";
import { Button } from "@/components/ui/button";

export default async function EbookPage() {
  // Get the current user's authentication details
  const { userId } = await auth();
  if (!userId) redirect("/sign-in"); // If not logged in, redirect to sign-in

  const user = await currentUser();

  // Get the purchased book slugs from private metadata
  const purchasedSlugs = Array.isArray(user?.privateMetadata?.hasPurchased)
    ? user?.privateMetadata?.hasPurchased
    : [];

  if (purchasedSlugs.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">No Books Purchased</h1>
        <p>You haven't purchased any eBooks yet. Please visit the store.</p>
      </div>
    );
  }

  // Find all purchased books from the books data array
  const purchasedBooks = books.filter((book) =>
    purchasedSlugs.includes(book.slug)
  );

  if (purchasedBooks.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">Books Not Found</h1>
        <p>Please contact support if this is an error.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Access Your eBooks</h1>
      <p className="mb-6">
        Thank you for your purchases! Your eBooks are ready for download.
      </p>
      <div className="grid gap-6">
        {purchasedBooks.map((book) => (
          <div
            key={book.slug}
            className="border p-4 rounded-lg shadow-sm flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p className="text-gray-600">{book.description}</p>
            </div>
            <Button asChild>
              <a
                href={book.file}
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                Download eBook
              </a>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
