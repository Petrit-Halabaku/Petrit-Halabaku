import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, Candy } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { scrollToSection } from "./ScrollToSection";

export function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleNavClick = (id: string) => {
    navigate(`/#${id}`);
    scrollToSection(id);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 left-0 right-0 bg-white dark:bg-dark-card shadow-sm z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="text-xl group flex justify-center items-center relative font-bold dark:text-dark-text transition-all duration-300"
          >
            <span className="group-hover:opacity-0 opacity-100 font-ribeye-marrow font-bold text-3xl hover:scale-150 transition-all">
              {import.meta.env.VITE_DEV_NICKNAME}
            </span>
            <Candy
              size={40}
              className="group-hover:opacity-100 group-hover:rotate-90 opacity-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all"
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {["about", "projects", "skills", "contact"].map((item) => (
              <Link
                key={item}
                to={`/#${item}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item);
                }}
                className="capitalize hover:text-blue-600 dark:text-dark-text dark:hover:text-blue-400"
              >
                {item}
              </Link>
            ))}
            {/* <ThemeToggle /> */}
          </nav>

          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6 dark:text-dark-text" />
          </button>
        </div>

        {isMenuOpen && (
          <motion.nav
            className="md:hidden py-4 space-y-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {["about", "projects", "skills", "contact"].map((item) => (
              <Link
                key={item}
                to={`#${item}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item);
                  handleNavigation(`/#${item}`);
                }}
                className="block px-4 py-2 hover:bg-gray-100 dark:text-dark-text dark:hover:bg-gray-800 capitalize"
              >
                {item}
              </Link>
            ))}
            <div className="px-4 py-2">
              <ThemeToggle />
            </div>
          </motion.nav>
        )}
      </div>
    </header>
  );
}
