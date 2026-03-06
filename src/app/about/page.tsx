"use client";

import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";

const timelineEvents = [
  {
    year: "2010",
    title: "Started System Administration Career",
    description: "Began working with enterprise system administration, focusing on Linux/Unix environments and network infrastructure.",
  },
  {
    year: "2012",
    title: "VMware Expertise Development",
    description: "Specialized in VMware virtualization technologies, implementing vSphere environments and troubleshooting complex virtual machine issues.",
  },
  {
    year: "2014",
    title: "Network Security Implementation",
    description: "Led implementation of pfSense firewalls and site-to-site VPN solutions for enterprise network security.",
  },
  {
    year: "2016",
    title: "Cloud Computing Adoption",
    description: "Pioneered OpenStack deployment and management, building multi-node cloud infrastructures for scalable computing solutions.",
  },
  {
    year: "2018",
    title: "CISSP Certification Journey",
    description: "Completed comprehensive study of information security domains, achieving CISSP certification and specializing in security operations.",
  },
  {
    year: "2020",
    title: "Digital Marketing Integration",
    description: "Expanded expertise into digital marketing strategies, including Facebook ads optimization and scaling techniques for business growth.",
  },
  {
    year: "2022",
    title: "Research and Writing",
    description: "Established personal blog sharing technical knowledge and insights on system administration, security, and emerging technologies.",
  },
  {
    year: "2024",
    title: "Portfolio Development",
    description: "Created comprehensive online portfolio showcasing technical expertise, research, and professional achievements in systems engineering.",
  },
];

export default function About() {
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
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-5xl font-bold mb-12 text-center text-primary">About</h1>

            <div className="mb-16 text-center">
              <p className="text-lg leading-relaxed text-foreground/80">
                I am a researcher and systems engineer passionate about pushing the boundaries
                of technology. My work focuses on the intersection of artificial intelligence,
                distributed systems, and cybersecurity, with a commitment to ethical and
                sustainable innovation.
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary/30"></div>

              <div className="space-y-12">
                {timelineEvents.map((event, index) => (
                  <motion.div
                    key={event.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`flex items-center ${
                      index % 2 === 0 ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}
                    >
                      <div className="bg-background border border-primary/20 rounded-lg p-6 hover:border-primary/50 transition-colors">
                        <h3 className="text-xl font-semibold mb-2 text-secondary">{event.title}</h3>
                        <p className="text-foreground/80 mb-2">{event.description}</p>
                        <span className="text-sm font-bold text-primary">{event.year}</span>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}