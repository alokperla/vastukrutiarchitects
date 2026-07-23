import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-background border-b border-border">
      <Link href="/" className="flex items-center space-x-2">
        <img src="/brand/logo.jpeg" alt="Vastukruti Architects" className="h-8 w-auto" />
        <span className="text-xl font-semibold text-foreground">Vastukruti Architects</span>
      </Link>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-md hover:bg-muted transition-colors"
        aria-label="Toggle theme"
      >
        {theme === "light" ? <Moon className="w-5 h-5 text-foreground" /> : <Sun className="w-5 h-5 text-foreground" />}
      </button>
    </nav>
  );
}
