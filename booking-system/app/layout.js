import { Poppins } from "next/font/google";
import "./globals.css";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Jade Garden Beach Resort",
  description: "Booking System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className="w-full max-w-[1240px] mx-auto px-4 py-8">
          {children}
        </div>
      </body>
    </html>
  );
}
