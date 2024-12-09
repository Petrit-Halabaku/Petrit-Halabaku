import { About } from "./About";
import { Projects } from "./Projects";
import { Skills } from "./Skills";
import { Contact } from "./Contact";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export function Home() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{
        animate: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      <motion.section {...fadeInUp}>
        <About />
      </motion.section>
      <motion.section {...fadeInUp}>
        <Projects />
      </motion.section>
      <motion.section {...fadeInUp}>
        <Skills />
      </motion.section>
      <motion.section {...fadeInUp}>
        <Contact />
      </motion.section>
    </motion.div>
  );
}
