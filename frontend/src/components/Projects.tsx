
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export const Projects: React.FC = () => {
  const { t } = useTranslation();
  
  const projects = t('projects.items', { returnObjects: true }) as Array<{
    name: string;
    description: string;
    tech: string;
    highlight: string;
    repo: string;
  }>;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="projects" className="py-24 px-6 md:px-12 max-w-6xl mx-auto border-t border-white/10">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-white mb-16 flex items-center gap-4 cursor-default"
      >
        <span className="mono text-[var(--accent)] text-lg md:text-xl font-normal">02.</span>
        {t('projects.title')}
      </motion.h2>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid md:grid-cols-2 gap-8 md:gap-10"
      >
        {projects.map((project, idx) => (
          <motion.div 
            key={idx} 
            variants={itemVariants}
            className="group relative flex flex-col h-full p-8 md:p-10 border border-white/10 bg-black/20 hover:border-white/30 hover:bg-white/[0.02] transition-colors duration-300 rounded-sm cursor-default"
          >
            <div className="absolute top-0 right-0 p-8 flex gap-3 opacity-50 group-hover:opacity-100 transition-opacity">
              <a href={project.repo} target="_blank" rel="noreferrer" className="hover:text-[var(--accent)] cursor-pointer text-xl">
                <span>↗</span>
              </a>
            </div>
            
            <h3 className="text-3xl font-bold text-white mb-4 mt-2 group-hover:text-[var(--accent)] transition-colors">{project.name}</h3>
            
            <p className="text-[var(--text-secondary)] text-lg mb-8 flex-grow leading-relaxed">
              {project.description}
              <br /><br />
              <span className="text-white/80 italic">{project.highlight}</span>
            </p>
            
            <div className="mono text-sm text-[var(--accent)] mt-auto pt-6 border-t border-white/10">
              {project.tech}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
