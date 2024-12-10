import { useState, useMemo } from "react";
import { ProjectFilter } from "../components/ProjectFilter";
import { ProjectCard } from "../components/ProjectCard";
import { projects } from "../utils/projects";

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");

  const categories = useMemo(() => {
    const uniqueCategories = new Set(
      projects.map((project) => project.category)
    );
    return Array.from(uniqueCategories);
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") {
      return projects;
    }
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-12 text-center">Projects</h2>

        <ProjectFilter
          categories={categories}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
