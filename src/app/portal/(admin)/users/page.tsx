import { ProtectedRoute } from '@/components/ProtectedRoute';
import { User } from "@/lib/types";

async function getUsers(): Promise<User[]> {
  const res = await fetch("http://localhost:8080/api/system/users", {
    method: "GET",
    credentials: "include", // required for cookies/session if used
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch users: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  console.log("Fetched users:", data);
  return data;
}

export default async function UsersPage() {
  let users: User[] = [];
  try {
    users = await getUsers();
  } catch (e: unknown) {
    if (e instanceof Error) {
      return <div>Error: {e.message}</div>;
    }
    return <div>Unexpected error</div>;
  }

  if (!users.length) return <div>No users found.</div>;

  return (
    <ProtectedRoute requiredRoles={["ADMIN", "STAFF"]}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Users</h1>
        <ul className="space-y-2">
          {users.map((u) => (
            <li key={u.userId} className="border p-2 rounded">
              <div>
                <strong>Name:</strong> {u.firstName} {u.lastName}
              </div>
              <div>
                <strong>Email:</strong> {u.email}
              </div>
              <div>
                <strong>Phone:</strong> {u.phone}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </ProtectedRoute>
  );
}
