import { useState, useMemo } from "react";
import { Project } from "../types";
import { ProjectFilter } from "../components/ProjectFilter";
import { ProjectCard } from "../components/ProjectCard";

const projects: Project[] = [
  {
    title: "Gjirafa Mall Homepage",
    description: "A full-stack web application with modern features",
    image: "assets/images/gjirafamall.png",
    tech: ["React", "TailwindCSS", "JavaScript", ".Net"],
    category: "Full Stack",
    // github: "https://github.com",
    live: "https://gjirafamall.com/",
  },
  {
    title: "Gjirafa50 Product Page",
    description: "A full-stack web application with modern features",
    image: "assets/images/gjirafa50.png",
    tech: ["React", "TailwindCSS", "JavaScript", ".Net"],
    category: "Full Stack",
    // github: "https://github.com",
    live: "https://gjirafa50.com/laptop-lenovo-loq-15arp9-156-amd-ryzen-7-7435hs-16gb-ram-512gb-ssd-nvidia-geforce-rtx-4070-i-hirte?utm_source=rec-product&utm_medium=homepage&utm_campaign=homepage-featured-products",
  },
  {
    title: "NDB Technology Website",
    description: "Modern depleated radiaoctive battery platform",
    image: "assets/images/ndb.png",
    tech: ["React.js", "Gatsby.js", "MongoDB", "Mobile"],
    category: "Full Stack",
    // github: "https://github.com",
    live: "https://ndb.technology/",
  },
  {
    title: "Gjirafa Mall Gift Card",
    description: "Mobile-first responsive gift card page",
    image: "assets/images/giftcard.png",
    tech: ["React.js", ".Net", "TailwindCSS"],
    category: "Mobile",
    live: "https://gjirafamall.com/gift-card",
  },
  {
    title: "DCoding Labs Website",
    description: "",
    image: "assets/images/dcodinglabs.png",
    tech: ["React", "Tailwind", "Mobile"],
    category: "Frontend",
    live: "hhttps://www.dcodinglabs.com/",
  },
];

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
