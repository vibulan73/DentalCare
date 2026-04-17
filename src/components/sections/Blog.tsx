"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Heart,
  Stethoscope,
  Scale,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { blogPosts, faqs } from "@/lib/data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart,
  Stethoscope,
  Scale,
};

export default function Blog() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="blog" className="relative py-24 bg-muted/30">
      <div className="section-padding">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold tracking-wider uppercase text-dental-teal mb-3">
            Resources
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Dental Tips & <span className="gradient-text">FAQs</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay informed about your dental health with our educational articles
            and get answers to commonly asked questions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Blog Articles */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-dental-teal" />
              <h3
                className="text-xl font-bold"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Latest Articles
              </h3>
            </div>
            <div className="space-y-4">
              {blogPosts.map((post, i) => {
                const IconComp = iconMap[post.icon] || Heart;
                return (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="group bg-card rounded-2xl border border-border p-6 hover:border-dental-teal/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl gradient-teal flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <IconComp className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-dental-teal uppercase tracking-wider">
                            {post.category}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            • {post.readTime}
                          </span>
                        </div>
                        <h4
                          className="font-bold text-base mb-1 group-hover:text-dental-teal transition-colors line-clamp-2"
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                          {post.title}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {post.excerpt}
                        </p>
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-dental-teal mt-2 group-hover:gap-2 transition-all">
                          Read More
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>

          {/* FAQ Accordion */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">❓</span>
              <h3
                className="text-xl font-bold"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Frequently Asked Questions
              </h3>
            </div>
            <Accordion className="space-y-3">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                >
                  <AccordionItem
                    value={`faq-${i}`}
                    className="bg-card rounded-xl border border-border px-5 data-[state=open]:border-dental-teal/30 data-[state=open]:shadow-md transition-all"
                  >
                    <AccordionTrigger className="text-left text-sm font-semibold hover:text-dental-teal py-4 [&[data-state=open]]:text-dental-teal">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground pb-4 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
