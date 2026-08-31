
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

export const Experience: React.FC = () => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<number | null>(null);
  
  // Como o JSON retorna um array, vamos pegá-lo usando a key com returnObjects
  const jobs = t('experience.jobs', { returnObjects: true }) as Array<{
    company: string;
    role: string;
    period: string;
    achievements: string[];
  }>;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="experience" className="py-24 px-6 md:px-12 max-w-6xl mx-auto border-t border-white/10">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-white mb-16 flex items-center gap-4 cursor-default"
      >
        <span className="mono text-[var(--accent)] text-lg md:text-xl font-normal">01.</span>
        {t('experience.title')}
      </motion.h2>
      
      <div className="space-y-6">
        {jobs.map((job, idx) => {
          const isExpanded = expanded === idx;
          return (
            <motion.div 
              key={idx} 
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="relative grid md:grid-cols-[1fr_3fr] pr-12 md:pr-16 gap-8 md:gap-12 cursor-pointer group p-6 -mx-6 rounded-2xl hover:bg-white/[0.02] transition-colors"
              onClick={() => setExpanded(isExpanded ? null : idx)}
            >
              <div className="absolute right-6 top-8 flex items-center justify-center text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors">
                <motion.div
                  animate={{ rotate: isExpanded ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </motion.div>
              </div>

              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-bold text-white group-hover:text-[var(--accent)] transition-colors inline-block">{job.company}</h3>
                <div className="text-[var(--text-secondary)] font-medium mt-2 text-lg">{job.role}</div>
                <div className="mono text-sm text-[var(--text-secondary)] mt-2 opacity-80">{job.period}</div>
              </motion.div>
              <div className="flex flex-col justify-center">
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.ul 
                      variants={{
                        hidden: { height: 0, opacity: 0 },
                        show: {
                          height: 'auto',
                          opacity: 1,
                          transition: {
                            height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
                            opacity: { duration: 0.4 },
                            staggerChildren: 0.1,
                            delayChildren: 0.1
                          }
                        }
                      }}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="space-y-6 overflow-hidden"
                    >
                      {job.achievements.map((ach, i) => {
                        const [title, ...rest] = ach.split(':');
                        return (
                          <motion.li 
                            key={i} 
                            variants={itemVariants}
                            className="text-[var(--text-secondary)] flex items-start gap-3"
                          >
                            <span className="text-[var(--accent)] mt-1.5">▹</span>
                            <span className="leading-relaxed">
                              {rest.length > 0 ? (
                                <>
                                  <strong className="text-white">{title}:</strong>{rest.join(':')}
                                </>
                              ) : (
                                ach
                              )}
                            </span>
                          </motion.li>
                        );
                      })}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
