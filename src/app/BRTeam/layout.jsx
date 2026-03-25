import BRFooter from "../components/layout/BRTeamFooter";
import { BRNavbar } from "../components/layout/BRNavbar";

export default function BRTeamLayout({ children }) {
  return (
    <>
      <BRNavbar />
      <main className="pt-20 min-h-screen">
        {children}
      </main>
      <BRFooter />
    </>
  );
}