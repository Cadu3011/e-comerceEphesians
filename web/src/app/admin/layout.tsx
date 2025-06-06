export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="min-h-screen bg-gray-100 text-black p-4">
        {children}
      </div>
    );
  }