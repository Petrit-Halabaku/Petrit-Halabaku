import { Github, ExternalLink } from "lucide-react";
import { Project } from "../types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-200">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-48 object-cover"
      />
      <div className="px-6 py-4 ">
        <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 rounded-full text-sm transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex space-x-4">
          {project.github && (
            <a
              href={project.github}
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
            >
              <Github className="h-5 w-5 mr-1" />
              Code
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
            >
              <ExternalLink className="h-5 w-5 mr-1" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
