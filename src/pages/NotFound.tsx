import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export function NotFound() {
  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const numberVariants = {
    initial: { scale: 0 },
    animate: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    },
  };

  const bounceTransition = {
    y: {
      duration: 0.4,
      yoyo: Infinity,
      ease: "easeOut",
    },
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="text-center"
      >
        <div className="flex justify-center items-center space-x-4 mb-8">
          <motion.span
            variants={numberVariants}
            className="text-8xl font-bold text-blue-600 dark:text-blue-400"
          >
            4
          </motion.span>
          <motion.div
            animate={{ y: ["0%", "-20%"] }}
            transition={bounceTransition}
            className="text-8xl font-bold text-blue-600 dark:text-blue-400"
          >
            0
          </motion.div>
          <motion.span
            variants={numberVariants}
            className="text-8xl font-bold text-blue-600 dark:text-blue-400"
          >
            4
          </motion.span>
        </div>

        <h1 className="text-2xl font-bold mb-4 dark:text-gray-100">
          Oops! Page not found
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200"
        >
          <Home className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
