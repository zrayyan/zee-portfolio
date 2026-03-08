"use client";

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />

      {/* About Snapshot */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 px-6"
      >
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-8 text-primary">About</h2>
          <p className="text-lg leading-relaxed">
            As a researcher and systems engineer, I specialize in cutting-edge technologies
            that push the boundaries of what's possible. My work spans from theoretical research
            to practical implementations in complex systems.
          </p>
        </div>
      </motion.section>

      {/* As an Entrepreneur */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 px-6 bg-secondary/5"
      >
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-8 text-primary">As an Entrepreneur</h2>
          <p className="text-lg leading-relaxed">
            I provide IT consultancy, develop eCommerce websites, and offer managed cloud hosting for clients.
            Additionally, I own and operate multiple franchises in the telecommunications industry.
            My solutions are attractive, elegant, simple, informative, and accessible to all.
          </p>
        </div>
      </motion.section>

      {/* Research Focus Areas */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 px-6 bg-primary/5"
      >
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-12 text-center text-primary">Research Focus</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {["CISSP Security Domains", "System Administration", "Cloud Infrastructure"].map((area, index) => (
              <motion.div
                key={area}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-background rounded-lg border border-primary/20 hover:border-primary/50 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-4 text-secondary">{area}</h3>
                <p className="text-foreground/80">
                  {area === "CISSP Security Domains" && "Comprehensive study and implementation of information security principles across all 8 CISSP domains."}
                  {area === "System Administration" && "Expertise in enterprise system administration, virtualization, and infrastructure management."}
                  {area === "Cloud Infrastructure" && "Design and deployment of scalable cloud solutions using OpenStack, VMware, and modern container technologies."}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Projects Carousel */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 px-6"
      >
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-12 text-center text-primary">Featured Projects</h2>
          <motion.div className="flex space-x-6 overflow-x-auto py-4 snap-x snap-mandatory" drag="x" dragConstraints={{ left: -500, right: 0 }}>
            {[
              { title: "OpenStack Cloud Deployment", desc: "Multi-node OpenStack Havana installation on CentOS/RHEL with high availability", tech: ["OpenStack", "CentOS", "MySQL"] },
              { title: "Enterprise VPN Solution", desc: "Site-to-site VPN implementation using pfSense and Dell SonicWall", tech: ["pfSense", "VPN", "Network Security"] },
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="snap-start flex-none w-[45vw] sm:min-w-[300px] p-6 bg-background rounded-lg border border-primary/20 hover:shadow-lg hover:shadow-primary/20 transition-all"
              >
                <h3 className="text-2xl font-semibold mb-4 text-highlight">{project.title}</h3>
                <p className="text-foreground/80 mb-4">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Books & Publications (from Research) */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-20 px-6"
      >
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-12 text-center text-primary">Books & Publications</h2>
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-background rounded-lg border border-primary/20 p-8 max-w-md hover:border-primary/50 transition-colors"
            >
              <h3 className="text-2xl font-semibold mb-6 text-center text-secondary">
                VMware vSphere Troubleshooting
              </h3>
              <div className="flex justify-center gap-4 mb-6">
                <div className="text-center">
                  <div className="relative inline-block group">
                    <Image
                      src="/images/wp-content/uploads/MyBook-VMware-vSphereTroubleshooting.jpg"
                      alt="VMware vSphere Troubleshooting Book Front Cover"
                      width={128}
                      height={192}
                      className="w-32 h-auto rounded-lg border border-primary/20 mb-2"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                      <span className="text-white text-sm">Front</span>
                    </div>
                  </div>
                  <p className="text-xs text-foreground/60">Front Cover</p>
                </div>
                <div className="text-center">
                  <div className="relative inline-block group">
                    <Image
                      src="/images/wp-content/uploads/BAck-MyBook-VMware-vSphereTroubleshooting.jpg"
                      alt="VMware vSphere Troubleshooting Book Back Cover"
                      width={128}
                      height={192}
                      className="w-32 h-auto rounded-lg border border-primary/20 mb-2"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                      <span className="text-white text-sm">Back</span>
                    </div>
                  </div>
                  <p className="text-xs text-foreground/60">Back Cover</p>
                </div>
              </div>
              <p className="text-foreground/80 mb-4 text-center">
                Comprehensive guide to troubleshooting VMware vSphere environments, covering common issues, diagnostic techniques, and resolution strategies for enterprise virtualization deployments.
              </p>
              <div className="text-center">
                <a
                  href="https://www.amazon.com/VMware-vSphere-Troubleshooting-Muhammad-Zeeshan/dp/1783551763/ref=sr_1_1?keywords=Muhammad+Zeeshan+Munir&qid=1581304372&sr=8-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/80 transition-colors"
                >
                  Available on Amazon
                </a>
                <p className="text-sm text-foreground/60 mt-3">Price: Paperback (new) ~ $54.99 · Kindle ~ $35.99</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Latest Writing */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 px-6 bg-primary/5"
      >
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-12 text-center text-primary">Latest Writing</h2>
          <div className="space-y-6">
            {[
              { title: "Software Development Security - Eighth CISSP Domain", date: "2024-03-01" },
              { title: "OpenStack Havana Installation on CentOS/RHEL", date: "2024-02-15" },
            ].map((post, index) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-background rounded-lg border border-primary/20"
              >
                <h3 className="text-xl font-semibold mb-2 text-secondary">{post.title}</h3>
                <p className="text-sm text-foreground/60">{post.date}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Application */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 px-6 bg-highlight/5"
      >
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-8 text-primary">Featured Application</h2>
          <div className="bg-background rounded-lg border border-primary/20 p-8 hover:border-primary/50 transition-colors">
            <h3 className="text-2xl font-semibold mb-4 text-highlight">AJAX Based Prayer Mashup</h3>
            <p className="text-lg leading-relaxed mb-6 text-foreground/80">
              An innovative location-aware mobile application featuring AJAX-based prayer mashup functionality.
              Integrates mobile services with web services and telecom services (IP Multimedia Sub System).
            </p>
            <motion.a
              href="/namaz/pray.html"
              target="_blank"
              rel="noopener noreferrer"
              role="button"
              aria-label="Open Live Demo of AJAX Prayer Mashup (opens in new tab)"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition-colors font-medium border border-[#2563EB] shadow-lg shadow-[#3B82F6]/20 z-20"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ y: -2, scale: 1.02 }}
            >
              <ExternalLink size={18} className="opacity-90" />
              <span>Live Demo</span>
            </motion.a>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
