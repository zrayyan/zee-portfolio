"use client";

import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    title: "OpenStack Havana Installation",
    description: "Complete installation and configuration of OpenStack Havana cloud platform on CentOS/RHEL systems with high availability and multi-node architecture.",
    technologies: ["OpenStack", "CentOS", "RHEL", "Cloud Computing"],
    github: "#",
    demo: "#",
    images: [
      "/images/wp-content/uploads/openstack-dashboard-hypervisors.png",
      "/images/wp-content/uploads/openstack-dashboard-overview.png"
    ]
  },
  {
    title: "pfSense Site-to-Site VPN",
    description: "Implementation of secure site-to-site VPN using pfSense firewall with Dell SonicWall NSA 3500 for enterprise network connectivity.",
    technologies: ["pfSense", "VPN", "Dell SonicWall", "Network Security"],
    github: "#",
    demo: "#",
  },
  {
    title: "VMware vShield Implementation",
    description: "Deployment of VMware vCloud Network and Security vShield components including Manager, App, Endpoint, and VXLAN for virtualized environments.",
    technologies: ["VMware", "vShield", "VXLAN", "Virtualization"],
    github: "#",
    demo: "#",
  },
  {
    title: "AJAX Based Prayer Mashup",
    description: "Location-aware mobile application with AJAX-based prayer mashup functionality, integrating mobile services with web services and telecom services (IP Multimedia Sub System).",
    technologies: ["AJAX", "JavaScript", "Prayer Mashup", "Mobile Development", "IP Multimedia Sub System"],
    github: "#",
    demo: "/namaz/pray.html",
  },
  {
    title: "iMuslimLife",
    description: "Cross-platform prayer and Islamic lifestyle app available on web, iOS, and Android providing accurate prayer times, Qibla direction, and religious content.",
    technologies: ["React", "Next.js", "Mobile", "PWA"],
    github: "#",
    demo: "https://imuslimlife.com/",
    images: ["/images/imuslimlife.svg"],
  },
  {
    title: "Salat-e-Mustaqeem Prayer App",
    description: "Companion mobile application for Salat-e-Mustaqeem offering prayer schedules, reminders, and community features.",
    technologies: ["React Native", "Firebase", "Mobile"],
    github: "#",
    demo: "https://imuslimlife.com/#/mobile-app",
    images: ["/images/salat-app.svg"],
  },

];

export default function Projects() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="pt-20 px-6">
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="py-20"
        >
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-5xl font-bold mb-12 text-center text-primary">Projects</h1>
            <p className="text-lg text-center mb-16 text-foreground/80">
              Showcasing innovative solutions and technical implementations.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative p-6 bg-background rounded-lg border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <h3 className="text-2xl font-semibold mb-4 text-highlight group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    {project.images && project.images.length > 0 && (
                      <div className="mb-4 grid grid-cols-2 gap-2">
                        {project.images.map((image, imgIndex) => (
                          <Image
                            key={imgIndex}
                            src={image}
                            alt={`${project.title} screenshot ${imgIndex + 1}`}
                            width={200}
                            height={150}
                            className="rounded-lg border border-primary/20"
                          />
                        ))}
                      </div>
                    )}
                    <p className="text-foreground/80 mb-6">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-4">
                      <a
                        href={project.github}
                        className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
                      >
                        <Github size={20} />
                        <span>Code</span>
                      </a>
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-secondary hover:text-secondary/80 transition-colors"
                        animate={project.demo !== "#" ? { y: [0, -4, 0] } : undefined}
                        transition={project.demo !== "#" ? { duration: 2.2, repeat: Infinity, ease: "easeInOut" } : undefined}
                        whileHover={{ y: -2 }}
                      >
                        <ExternalLink size={20} />
                        <span>{project.demo !== "#" ? "Live Demo" : "Demo"}</span>
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}