// import { motion } from "framer-motion";
// import { FaTools } from "react-icons/fa";
// // import { Link } from "react-router-dom";
// // import { Home } from "lucide-react";

// const Maintenance = () => {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-dark-bg p-4 transition-colors duration-200">
//       <motion.div
//         initial={{ scale: 0, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{
//           type: "spring",
//           stiffness: 260,
//           damping: 20,
//           duration: 1,
//         }}
//         className="text-center"
//       >
//         <motion.div
//           animate={{
//             rotate: [0, 10, -10, 0],
//           }}
//           transition={{
//             duration: 2,
//             repeat: Infinity,
//             repeatType: "reverse",
//           }}
//           className="text-6xl mb-6 text-blue-600 dark:text-blue-400"
//         >
//           <FaTools />
//         </motion.div>

//         <h1 className="text-4xl font-bold text-gray-800 dark:text-dark-text mb-4">
//           Under Maintenance
//         </h1>

//         <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
//           We're currently working on improving our website. Please check back
//           soon!
//         </p>

//         {/* <motion.div
//           animate={{
//             y: [0, -10, 0],
//           }}
//           transition={{
//             duration: 2,
//             repeat: Infinity,
//             repeatType: "reverse",
//           }}
//           className="text-sm text-gray-500 dark:text-gray-400 mb-8"
//         >
//           Estimated time: 30 minutes
//         </motion.div> */}

//         {/* <Link
//           to="/"
//           className="inline-flex items-center px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200"
//         >
//           <Home className="w-5 h-5 mr-2" />
//           Back to Home
//         </Link> */}
//       </motion.div>
//     </div>
//   );
// };

// export default Maintenance;

import { motion } from "framer-motion";
import { Construction, Wrench } from "lucide-react";

export default function UnderConstruction() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <main className="min-h-screen bg-white dark:bg-dark-bg text-white flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div className="flex justify-center mb-8" variants={item}>
            <div className="relative">
              <motion.div
                animate={{
                  rotate: [0, 10, 0, -10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              >
                <Construction className="w-24 h-24 text-yellow-500" />
              </motion.div>
              <motion.div
                className="absolute -bottom-2 -right-2"
                animate={{
                  rotate: [0, 45, 0, -45, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  delay: 0.5,
                }}
              >
                <Wrench className="w-12 h-12 text-gray-400" />
              </motion.div>
            </div>
          </motion.div>

          <motion.h1 className="text-3xl font-bold mb-4" variants={item}>
            Under Construction
          </motion.h1>

          <motion.p className="text-gray-400 mb-8" variants={item}>
            This page is currently being built and will be available soon.
            Please check back later for updates.
          </motion.p>
        </motion.div>
      </div>
    </main>
  );
}
