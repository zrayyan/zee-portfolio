"use client";

import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";

const timelineEvents = [
  {
    year: "2020",
    title: "Entrepreneurship Journey",
    description: "Launched my first entrepreneurial venture, laying the foundation for future technical and business projects.",
  },
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
    year: "2025",
    title: "Mobile App Launch",
    description: (
      <>
        Developed the <a href="https://imuslimlife.com" className="text-secondary hover:underline" target="_blank" rel="noopener noreferrer">iMuslimLife</a> app, available on{' '}
        <a href="https://apps.apple.com/app/6743494825" className="text-secondary hover:underline" target="_blank" rel="noopener noreferrer">App Store</a> and{' '}
        <a href="https://play.google.com/store/apps/details?id=com.rayyan.salatemustaqeem" className="text-secondary hover:underline" target="_blank" rel="noopener noreferrer">Google Play</a>. Web version at{' '}
        <a href="https://imuslimlife.com/#/prayer-times" className="text-secondary hover:underline" target="_blank" rel="noopener noreferrer">imuslimlife.com</a>.
      </>
    ),
  },
  {
    year: "2010",
    title: "Research and Writing",
    description: "Started documenting technical knowledge in blog posts, sharing insights on system administration and security.",
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

            {/* Social Links */}
            <div className="mb-16 text-center">
              <h2 className="text-2xl font-semibold mb-6 text-primary">Connect With Me</h2>
              <div className="flex justify-center gap-6">
                <a
                  href="https://www.linkedin.com/in/muhammadzeeshanmunir/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/MuhammadZeeshanMunir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-primary transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://twitter.com/MZMunir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-primary transition-colors"
                  aria-label="Twitter"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a
                  href="https://github.com/MZMunir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-primary transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/user/MZMunir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-primary transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
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