"use client";

import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function Contact() {

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
          <div className="container mx-auto max-w-2xl">
            <h1 className="text-5xl font-bold mb-12 text-center text-primary">Contact</h1>
            <p className="text-lg text-center mb-16 text-foreground/80">
              For inquiries, please send an email to <a href="mailto:zeeshan@yzinfotech.com" className="text-primary hover:text-primary/80">zeeshan@yzinfotech.com</a>.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-16 text-center"
            >
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Mail size={20} className="text-primary" />
                <a href="mailto:zeeshan@yzinfotech.com" className="text-lg font-medium text-primary hover:text-primary/80 transition-colors">
                  zeeshan@yzinfotech.com
                </a>
              </div>
              <p className="text-foreground/60">
                Prefer direct contact? Reach out via email or connect on{" "}
                <a href="#" className="text-secondary hover:text-secondary/80 transition-colors">
                  LinkedIn
                </a>
                .
              </p>
            </motion.div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}