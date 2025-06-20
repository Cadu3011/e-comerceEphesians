export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="min-h-screen bg-slate-900 text-black p-4">
        {children}
      </div>
    );
  }