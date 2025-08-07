// app/users/new/page.tsx
import UserForm from "@/components/UserForm";

export default function NewUserPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add User</h1>
      <UserForm method="create" />
    </div>
  );
}
