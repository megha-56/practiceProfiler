import "../styles/globals.css";

export const metadata = {
  title: "Profiler",
  description: "User profile manager",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
