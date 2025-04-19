import { notFound, redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { books } from "@/lib/bookData";
import { Button } from "@/components/ui/button";

// Define the expected params type
interface EbookPageProps {
  params: Promise<{ slug: string }>; // Use Promise for async params
}

export default async function EbookPage({ params }: EbookPageProps) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await currentUser();
  const purchased = user?.privateMetadata?.hasPurchased as string[] | undefined;

  // Await the params to resolve the slug
  const { slug } = await params;

  if (!purchased || !purchased.includes(slug)) {
    redirect(`/buy/${slug}`);
  }

  const book = books.find((b) => b.slug === slug);
  if (!book) return notFound();

  return (
    <div className="container mx-auto px-4 py-12 text-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-extrabold mb-6">📘 Access Your eBook</h1>
      <p className="mb-8 text-lg">
        Thank you for purchasing <strong>{book.title}</strong>! Your eBook is
        ready to download.
      </p>
      <Button asChild className="text-white bg-blue-600 hover:bg-blue-700">
        <a href={book.file} download target="_blank" rel="noopener noreferrer">
          Download eBook
        </a>
      </Button>
    </div>
  );
}
