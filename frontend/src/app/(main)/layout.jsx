import { Navbar } from "../components/layout/Navbar";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
    </>
  );
}