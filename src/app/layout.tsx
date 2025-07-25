import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "JS Sandbox",
  description: "Code in JS right in your browser",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily: `'Segoe UI', Roboto, Helvetica, Arial, sans-serif`,
          backgroundColor: "#000",
          color: "#fff",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {/* Smiledust Logo — absolute top-left */}
        <Link
          href="https://smiledust.com"
          style={{
            position: "absolute",
            top: "1rem",
            left: "1rem",
            textDecoration: "none",
            color: "#ec4899",
            fontSize: "1.5rem",
            fontWeight: "bold",
            fontFamily: `'Pacifico', cursive`,
            zIndex: 1000,
          }}
          className="smiledust-font"
        >
          smiledust
        </Link>

        {/* Main Content */}
        <main
          style={{
            flex: 1,
            paddingTop: "5rem", // increased space from top
          }}
        >
          {children}
        </main>

        {/* Footer */}
        <footer
          style={{
            backgroundColor: "#000", // same as rest of site
            textAlign: "center",
            padding: "0.5rem",
            fontSize: "0.9rem",
            color: "#888",
          }}
        >
          © {new Date().getFullYear()} smiledust
        </footer>
      </body>
    </html>
  );
}
