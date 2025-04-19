import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Dashboard() {
  const { userId } = await auth();
  if (!userId) {
    return <p>Access Denied - Please sign in</p>;
  }

  const user = await currentUser();
  if (!user || user.emailAddresses[0].emailAddress !== "admin@example.com") {
    return <p>Access Denied</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
      <p>Grant access to users manually here or check payment statuses</p>
    </div>
  );
}
