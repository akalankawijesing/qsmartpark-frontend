// app/components/UserForm.tsx
"use client";
import { useState, FormEvent } from "react";
import { User } from "@/lib/types";
import { useRouter } from "next/navigation";

type Props = {
  method: "create" | "edit";
  user?: User;
};

export default function UserForm({ method, user }: Props) {
  const router = useRouter();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload = { name, email, phone, passwordHash: "placeholder" }; // adapt
    const url = method === "create" ? "http://localhost:8080/api/users" : `http://localhost:8080/api/users/${user?.userId}`;
    const res = await fetch(url, {
      method: method === "create" ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    console.log("Submitting user data:", payload);
    if (!res.ok) {
      setError("Failed to save user");
      return;
    }
    router.push("/user");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      {error && <div className="text-red-600">{error}</div>}
      <div>
        <label className="block">Name</label>
        <input value={name} onChange={e => setName(e.target.value)} required className="w-full border p-2 rounded" />
      </div>
      <div>
        <label className="block">Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full border p-2 rounded" />
      </div>
      <div>
        <label className="block">Phone</label>
        <input value={phone} onChange={e => setPhone(e.target.value)} required className="w-full border p-2 rounded" />
      </div>
      <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
        {method === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
}
