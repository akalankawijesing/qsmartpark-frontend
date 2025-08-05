// app/users/page.tsx
interface User {
  userId: number;
  name: string;
  email: string;
  phone: string;
}

async function getUsers(): Promise<User[]> {
  const res = await fetch("http://localhost:8080/api/users", {
    cache: "no-store", // or adjust caching as needed
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export default async function UsersPage() {
  let users: User[] = [];
  try {
    users = await getUsers();
  } catch (e: any) {
    return <div>Error: {e.message}</div>;
  }

  if (!users.length) return <div>No users found.</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <ul className="space-y-2">
        {users.map((u) => (
          <li key={u.userId} className="border p-2 rounded">
            <div><strong>Name:</strong> {u.name}</div>
            <div><strong>Email:</strong> {u.email}</div>
            <div><strong>Phone:</strong> {u.phone}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
