import { useUser } from "@clerk/nextjs";

export default function Dashboard() {
  const { user } = useUser();

  if (user?.emailAddresses[0].emailAddress !== "admin@example.com") {
    return <p>Access Denied</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
      <p>Grant access to users manually here or check payment statuses</p>
    </div>
  );
}
