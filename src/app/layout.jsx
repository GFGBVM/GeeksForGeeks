import "./globals.css";
import IntroLoader from "./components/ui/IntroLoader";
import { Navbar } from "./components/layout/Navbar";
import { Dancing_Script, Roboto, Montserrat } from "next/font/google";

/* Roboto */
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

/* Montserrat */
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

/* Dancing Script */
const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dancing",
  display: "swap",
});

export const metadata = {
  title: "GFG BVM 2025",
  description:
    "Join the GeeksforGeeks student chapter at BVM for an interactive workshop where you'll learn problem-solving techniques, practical coding patterns, and build portfolio-worthy projects.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`
          ${roboto.variable}
          ${montserrat.variable}
          ${dancing.variable}
          font-roboto
        `}
      >
        <IntroLoader />

        {/* Optional Navbar (if needed globally) */}
        {/* <Navbar /> */}

        <div className="page-content">
          {children}
        </div>
      </body>
    </html>
  );
}