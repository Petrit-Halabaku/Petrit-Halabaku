import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import {
  Database,
  Server,
  Paintbrush,
  GitBranch,
  Braces,
  Atom,
  Leaf,
  Cpu,
  Hexagon,
  // Layers,
  Settings,
} from "lucide-react";

interface Skill {
  name: string;
  icon: React.ReactNode;
  color: string;
}

const skills: Skill[] = [
  { name: "TypeScript", icon: <Braces size={32} />, color: "text-indigo-500" },
  { name: "React JS", icon: <Atom size={32} />, color: "text-blue-400" },
  { name: "Node.js", icon: <Server size={32} />, color: "text-green-500" },
  { name: "Tailwind CSS", icon: <Leaf size={32} />, color: "text-sky-500" },
  { name: "CSS3", icon: <Paintbrush size={32} />, color: "text-blue-500" },
  { name: "GraphQL", icon: <Hexagon size={32} />, color: "text-pink-500" },
  { name: "MongoDB", icon: <Database size={32} />, color: "text-green-500" },
  { name: "PostgreSQL", icon: <Database size={32} />, color: "text-blue-600" },
  { name: "Git", icon: <GitBranch size={32} />, color: "text-orange-600" },
  { name: "CI/CD", icon: <Settings size={32} />, color: "text-purple-500" },
  { name: "System Design", icon: <Cpu size={32} />, color: "text-teal-500" },
];

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section
      id="skills"
      className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h2 className="text-4xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
          Skills & Technologies
        </h2>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={2}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          className="!py-3"
        >
          {skills.map((skill, index) => (
            <SwiperSlide key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`mb-4 ${skill.color}`}>{skill.icon}</div>
                <span className="text-sm font-medium dark:text-gray-200">
                  {skill.name}
                </span>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
}
