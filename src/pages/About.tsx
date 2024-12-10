import { User, Briefcase } from "lucide-react";
import { Image } from "../components/Image";
import { motion } from "framer-motion";

export function About() {
  return (
    <section
      id="about"
      className="bg-gray-50 dark:bg-gray-900 transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 dark:text-gray-100">
              About Me
            </h2>
            <div className="prose max-w-none dark:prose-invert">
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-2xl leading-10">
                I'm a passionate developer with expertise in building modern web
                applications. My focus is on creating clean, efficient, and
                user-friendly solutions.
              </p>
              <div className="flex items-center text-lg space-x-2 text-gray-600 dark:text-gray-300 mb-2">
                <User className="h-5 w-5" />
                <span className="text-red-700">Full Stack Developer</span>
              </div>
              <div className="group w-fit text-lg flex items-center space-x-2 transition-all text-gray-600 dark:text-gray-300">
                <Briefcase className="group-hover:-skew-x-6 h-5 w-5 transition-all text-red-800" />
                <motion.button
                  initial="initial"
                  animate="animate"
                  onClick={() =>
                    window.open("/assets/PetritHalabakuResume.pdf", "_blank")
                  }
                  className="group-hover:translate-x-1 transition-all hover:text-red-700"
                >
                  Download CV
                </motion.button>
              </div>
            </div>
          </div>
          <div className="aspect-square bg-gray-200 dark:bg-gray-800 bg-opacity-10 backdrop-blur-md rounded-lg">
            <Image
              src="/assets/images/piti.png"
              alt="Petrit Halabaku"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
