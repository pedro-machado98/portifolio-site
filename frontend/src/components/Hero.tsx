import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="pt-32 pb-20 px-6 max-w-5xl mx-auto min-h-[90vh] flex flex-col justify-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-8 max-w-3xl"
      >
        <motion.div variants={itemVariants} className="mono text-[var(--accent)] text-sm mb-6">
          &gt; {t('hero.greeting')}
        </motion.div>
        
        <motion.h1 
          variants={itemVariants} 
          className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[1.1] uppercase"
        >
          Pedro Machado
        </motion.h1>
        
        <motion.h2 
          variants={itemVariants} 
          className="text-3xl md:text-4xl text-[var(--text-secondary)] font-medium max-w-2xl tracking-tight"
        >
          {t('hero.role')}
        </motion.h2>
        
        <motion.p 
          variants={itemVariants} 
          className="text-lg md:text-xl text-[var(--text-secondary)] mt-10 leading-relaxed max-w-2xl font-light"
        >
          {t('hero.summary')}
        </motion.p>

        <motion.div variants={itemVariants} className="pt-16">
          <p className="mono text-xs uppercase text-[var(--text-secondary)] mb-6 tracking-widest">{t('hero.stack')}</p>
          <div className="flex flex-wrap gap-4">
            {['Java', 'Spring', 'TypeScript', 'Node.js', 'Kafka', 'NestJS', 'AWS', 'Docker', 'Ansible', 'Jenkins'].map((tech) => (
              <span 
                key={tech} 
                className="px-4 py-2 text-xs mono border border-[var(--border)] bg-black text-[var(--text-secondary)] hover:text-white hover:border-white transition-all duration-300 cursor-default uppercase tracking-wider"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="pt-16 flex gap-6">
          <a 
            href="#contact" 
            className="px-8 py-4 bg-white text-black font-bold text-sm uppercase tracking-widest hover:bg-[var(--accent)] transition-colors duration-300 flex items-center justify-center"
          >
            {t('hero.contact')}
          </a>
          <a 
            href="https://github.com/pedro-machado98" 
            target="_blank" 
            rel="noreferrer" 
            className="px-8 py-4 border-2 border-[var(--border)] text-white font-bold text-sm uppercase tracking-widest hover:border-white hover:bg-[var(--surface)] transition-all duration-300 flex items-center justify-center gap-3"
          >
            GitHub
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};
