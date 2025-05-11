// app/login/layout.tsx
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      {children}
    </main>
  );
}
