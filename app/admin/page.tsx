import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { books } from "@/lib/bookData";
import { ClerkUser } from "@/types/clerk"; // 👈 Import your custom type

// Admin Panel Component
export default async function AdminPanel() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await currentUser();
  const isAdmin = user?.privateMetadata?.role === "admin";
  if (!isAdmin) redirect("/");

  const response = await fetch("https://api.clerk.com/v1/users", {
    headers: {
      Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
  });

  const users: ClerkUser[] = await response.json();

  // Function to grant book access to users
  async function grantBookAccess(formData: FormData) {
    "use server";

    const userId = formData.get("userId") as string;
    const bookSlug = formData.get("bookSlug") as string;

    const response = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const user: ClerkUser = await response.json();
    const currentHasPurchased = Array.isArray(
      user.private_metadata?.hasPurchased
    )
      ? user.private_metadata.hasPurchased
      : [];

    const updatedHasPurchased = [
      ...new Set([...currentHasPurchased, bookSlug]),
    ];

    await fetch(`https://api.clerk.com/v1/users/${userId}/metadata`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        private_metadata: {
          hasPurchased: updatedHasPurchased,
        },
      }),
    });

    redirect("/admin");
  }

  // Function to remove book access from users
  async function removeBookAccess(formData: FormData) {
    "use server";

    const userId = formData.get("userId") as string;
    const bookSlug = formData.get("bookSlug") as string;

    const response = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const user: ClerkUser = await response.json();
    const currentHasPurchased = Array.isArray(
      user.private_metadata?.hasPurchased
    )
      ? user.private_metadata.hasPurchased
      : [];

    const updatedHasPurchased = currentHasPurchased.filter(
      (slug) => slug !== bookSlug
    );

    await fetch(`https://api.clerk.com/v1/users/${userId}/metadata`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        private_metadata: {
          hasPurchased: updatedHasPurchased,
        },
      }),
    });

    redirect("/admin");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <p className="mb-6">Grant or Remove permissions for eBook access.</p>

      {books.map((book) => (
        <div key={book.slug} className="mb-6">
          <h2 className="text-xl font-bold mb-4">{book.title}</h2>
          <p>{book.description}</p>

          <table className="min-w-full table-auto mt-6">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">User</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Permission</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const hasPurchased = Array.isArray(
                  user.private_metadata?.hasPurchased
                )
                  ? user.private_metadata.hasPurchased
                  : [];

                const hasBook = hasPurchased.includes(book.slug);

                return (
                  <tr key={user.id} className="border-b">
                    <td className="px-4 py-2">
                      {user.image_url ? (
                        <Image
                          src={user.image_url}
                          alt="User Avatar"
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {user.email_addresses?.[0]?.email_address || "N/A"}
                    </td>
                    <td className="px-4 py-2">
                      {hasBook ? "Has Access" : "No Access"}
                    </td>
                    <td className="px-4 py-2">
                      {!hasBook ? (
                        <form action={grantBookAccess}>
                          <input type="hidden" name="userId" value={user.id} />
                          <input
                            type="hidden"
                            name="bookSlug"
                            value={book.slug}
                          />
                          <Button type="submit" className="ml-2">
                            Grant Access
                          </Button>
                        </form>
                      ) : (
                        <form action={removeBookAccess}>
                          <input type="hidden" name="userId" value={user.id} />
                          <input
                            type="hidden"
                            name="bookSlug"
                            value={book.slug}
                          />
                          <Button
                            type="submit"
                            className="ml-2 bg-red-500 hover:bg-red-700"
                          >
                            Remove Access
                          </Button>
                        </form>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
