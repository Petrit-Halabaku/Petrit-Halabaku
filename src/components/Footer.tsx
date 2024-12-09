import { Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-dark-card py-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex space-x-6">
            {/* <motion.a
              href={`${import.meta.env.VITE_DEV_GITHUB_URL}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              <Github className="h-6 w-6" />
            </motion.a> */}
            <motion.a
              href={`${import.meta.env.VITE_DEV_LINKEDIN_URL}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              <Linkedin className="h-6 w-6" />
            </motion.a>
            <motion.a
              href={`mailto:${import.meta.env.VITE_DEV_EMAIL}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              <Mail className="h-6 w-6" />
            </motion.a>
          </div>
          <div className="flex space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <Link
              to="/terms"
              className="hover:text-gray-900 dark:hover:text-gray-100"
            >
              Terms & Conditions
            </Link>
            <Link
              to="/privacy"
              className="hover:text-gray-900 dark:hover:text-gray-100"
            >
              Privacy Policy
            </Link>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {currentYear} {`${import.meta.env.VITE_DEV_NAME}`}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
