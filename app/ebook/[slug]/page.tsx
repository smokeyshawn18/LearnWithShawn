// app/ebook/[slug]/page.tsx
import { notFound, redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { books } from "@/lib/bookData";
import { Button } from "@/components/ui/button";

interface EbookPageProps {
  params: { slug: string }; // <- destructuring directly here
}

export default async function EbookPage({ params }: EbookPageProps) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await currentUser();
  const purchasedSlug = user?.privateMetadata?.hasPurchased as string;

  const slug = params.slug;

  if (!purchasedSlug || slug !== purchasedSlug) {
    redirect(`/buy/${slug}`);
  }

  const book = books.find((b) => b.slug === slug);
  if (!book) return notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Access Your eBook</h1>
      <p className="mb-6">
        Thank you for purchasing <strong>{book.title}</strong>! Your eBook is
        ready.
      </p>
      <Button asChild>
        <a href={book.file} download target="_blank" rel="noopener noreferrer">
          Download eBook
        </a>
      </Button>
    </div>
  );
}
