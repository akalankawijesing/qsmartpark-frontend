export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">403</h1>
        <p className="text-lg text-gray-600 mb-8">
          You don&apos;t have permission to access this page.
        </p>
        <a
          href="/login"
          className="text-indigo-600 hover:text-indigo-500"
        >
          Go back to login
        </a>
      </div>
    </div>
  );
}