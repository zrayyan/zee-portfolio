"use client";

import Navigation from "@/components/Navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useState, useRef } from "react";

const researchTopics = [
  { id: 1, title: "CISSP Security Domains", connections: [2, 3], description: "Comprehensive study of Certified Information Systems Security Professional domains including security operations, assessment, and software development security." },
  { id: 2, title: "System Administration", connections: [1, 4], description: "Advanced system administration techniques for enterprise environments, including OpenStack, VMware, and network security implementations." },
  { id: 3, title: "Network Security", connections: [1, 5], description: "Implementation of secure network architectures, VPN configurations, and firewall management for enterprise networks." },
  { id: 4, title: "Cloud Infrastructure", connections: [2], description: "Design and deployment of scalable cloud infrastructure using Kubernetes, Docker, and distributed systems principles." },
  { id: 5, title: "Digital Marketing", connections: [3], description: "Strategic digital marketing approaches including Facebook ads optimization and scaling techniques for business growth." },
];

export default function Research() {
  const [selected, setSelected] = useState<typeof researchTopics[0] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

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
            <h1 className="text-5xl font-bold mb-12 text-center text-primary">Research</h1>
            <p className="text-lg text-center mb-16 text-foreground/80">
              Interactive visualization of research areas and their interconnections.
            </p>

            {/* Research Graph */}
            <motion.div className="relative" ref={containerRef} style={{ scale }}>
              <svg className="w-full h-96" viewBox="0 0 800 400">
                {/* Connections */}
                <motion.line x1="200" y1="150" x2="400" y2="150" stroke="#3B82F6" strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
                <motion.line x1="200" y1="150" x2="600" y2="200" stroke="#3B82F6" strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.4 }}
                />
                <motion.line x1="400" y1="150" x2="200" y2="250" stroke="#3B82F6" strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.6 }}
                />
                <motion.line x1="600" y1="200" x2="400" y2="250" stroke="#3B82F6" strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
                <motion.line x1="400" y1="250" x2="600" y2="300" stroke="#3B82F6" strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 1.0 }}
                />
              </svg>

              {/* Nodes */}
              <div className="absolute inset-0">
                {researchTopics.map((topic, index) => (
                  <motion.div
                    key={topic.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    drag
                    dragElastic={0.2}
                    dragConstraints={{ top: -50, bottom: 50, left: -50, right: 50 }}
                    onClick={() => setSelected(topic)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') setSelected(topic);
                    }}
                    className={`absolute w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-bold cursor-pointer hover:bg-primary/80 transition-colors ${
                      index === 0 ? "top-20 left-20" :
                      index === 1 ? "top-20 left-1/2" :
                      index === 2 ? "top-20 right-20" :
                      index === 3 ? "bottom-20 left-20" :
                      "bottom-20 right-20"
                    }`}
                    title={topic.description}
                    aria-label={topic.title}
                  >
                    {topic.id}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Research Details */}
            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {researchTopics.map((topic) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="p-6 bg-background rounded-lg border border-primary/20 hover:border-primary/50 transition-colors"
                >
                  <h3 className="text-xl font-semibold mb-4 text-secondary">{topic.title}</h3>
                  <p className="text-foreground/80">{topic.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Sidebar showing selected topic */}
            <AnimatePresence>
              {selected && (
                <motion.div
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 300, opacity: 0 }}
                  className="fixed top-0 right-0 h-full w-80 bg-background border-l border-primary/20 p-6 shadow-lg z-50"
                >
                  <h3 className="text-2xl font-semibold mb-4 text-secondary">{selected.title}</h3>
                  <p className="text-foreground/80 mb-6">{selected.description}</p>
                  <button
                    onClick={() => setSelected(null)}
                    className="mt-auto px-4 py-2 bg-primary text-white rounded"
                  >
                    Close
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Detailed Research Description */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-20"
            >
              <h2 className="text-4xl font-bold mb-12 text-center text-primary">Research Overview</h2>
              <div className="max-w-4xl mx-auto text-center mb-8">
                <p className="text-lg text-foreground/80 mb-6">
                  I collaborated with a research team specializing in Service Oriented Architecture and standards-compliant Web 2.0 and Telco 2.0. My research focus was on mobile mashups and user interface composition approaches for Mobile Devices, Mobile Engineering, Web, Web engineering, quality, and privacy in integrated mobile applications.
                </p>
                <p className="text-lg text-foreground/80 mb-6">
                  My main goal was to assist mobile device users to develop and integrate mobile applications (Android), mobile services with web services. Moreover, development of location-aware mobile applications (Android) and their integration with the telecom services (IP Multimedia Sub System) mashup for smart device users having no prior knowledge of programming languages by hiding the development complexity.
                </p>
                <div className="flex justify-center gap-4">
                  <a
                    href="https://zee.linxsol.com/uncategorized/phd-presentation/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/80 transition-colors"
                  >
                    My PhD Presentation
                  </a>
                  <a
                    href="https://drive.google.com/file/d/0B6OX4OBHjolLMGQzZmFjOTYtY2FkMC00ZWU5LTgwNGQtZTkyYmY0OGYyZGI5/view"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-secondary text-white rounded-full hover:bg-secondary/80 transition-colors"
                  >
                    Read More About Research
                  </a>
                  <a
                    href="/namaz/pray.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-highlight text-white rounded-full hover:bg-highlight/80 transition-colors"
                  >
                    AJAX Based Geo Mashup APP
                  </a>
                </div>
              </div>
            </motion.section>

            {/* Research Presentations */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-20"
            >
              <h2 className="text-4xl font-bold mb-12 text-center text-primary">Research Presentations</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="p-6 bg-background rounded-lg border border-primary/20 hover:border-primary/50 transition-colors"
                >
                  <h3 className="text-2xl font-semibold mb-4 text-secondary">OpenStack Dashboard Analysis</h3>
                  <p className="text-foreground/80 mb-4">
                    Comprehensive analysis of OpenStack dashboard interfaces, hypervisor management, and overview panels for enterprise cloud deployments.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <Image
                      src="/images/wp-content/uploads/openstack-dashboard-hypervisors.png"
                      alt="OpenStack Hypervisors Dashboard"
                      width={300}
                      height={200}
                      className="rounded-lg border border-primary/20"
                    />
                    <Image
                      src="/images/wp-content/uploads/openstack-dashboard-overview.png"
                      alt="OpenStack Overview Dashboard"
                      width={300}
                      height={200}
                      className="rounded-lg border border-primary/20"
                    />
                  </div>
                  <p className="text-sm text-foreground/60">Presented at various tech conferences and workshops</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="p-6 bg-background rounded-lg border border-primary/20 hover:border-primary/50 transition-colors"
                >
                  <h3 className="text-2xl font-semibold mb-4 text-secondary">Network Security Introduction</h3>
                  <p className="text-foreground/80 mb-4">
                    Introduction to network security principles, CISSP domains, and practical implementations for securing enterprise networks.
                  </p>
                  <Image
                    src="/images/wp-content/uploads/networ-security-introduction-cissp.jpg"
                    alt="Network Security CISSP Introduction"
                    width={400}
                    height={150}
                    className="rounded-lg border border-primary/20 mb-4 w-full"
                  />
                  <p className="text-sm text-foreground/60">Featured in cybersecurity seminars and training sessions</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="p-6 bg-background rounded-lg border border-primary/20 hover:border-primary/50 transition-colors"
                >
                  <h3 className="text-2xl font-semibold mb-4 text-secondary">PhD Presentation (Prezi)</h3>
                  <p className="text-foreground/80 mb-4">
                    My PhD presentation — interactive Prezi slides covering research on mobile mashups, UI composition, and integration of mobile and telecom services.
                  </p>
                  <div className="mb-4">
                    <a
                      href="https://prezi.com/ejnjdcw6b_oy/prexi/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-3 bg-primary text-black rounded-lg hover:bg-primary/80 hover:text-white transition-colors mr-3"
                    >
                      Open Prezi Presentation
                    </a>
                    <a
                      href="https://zee.linxsol.com/uncategorized/phd-presentation/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-3 bg-secondary text-black rounded-lg hover:bg-secondary/80 hover:text-white transition-colors"
                    >
                      Blog Post / Slides
                    </a>
                  </div>
                  <p className="text-sm text-foreground/60">Opens in a new tab. Note: some Prezi embeds may not allow inline iframes.</p>
                </motion.div>
              </div>
            </motion.section>

            {/* Books & Publications */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-20"
            >
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
            </motion.section>
          </div>
        </motion.section>
      </main>
    </div>
  );
}