import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export const Education: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="education" className="py-24 px-6 md:px-12 max-w-6xl mx-auto border-t border-white/10">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-white mb-16 flex items-center gap-4 cursor-default"
      >
        <span className="mono text-[var(--accent)] text-lg md:text-xl font-normal">03.</span>
        {t('education.title')}
      </motion.h2>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="cursor-default group p-8 md:p-10 border border-white/10 bg-black/20 hover:border-white/30 hover:bg-white/[0.02] transition-colors duration-300 rounded-sm"
      >
        <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-[var(--accent)] transition-colors inline-block">
          {t('education.degree')}
        </h3>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-lg">
          <span className="text-[var(--text-secondary)] font-medium">{t('education.institution')}</span>
          <span className="hidden sm:block text-white/20">•</span>
          <span className="mono text-sm text-[var(--accent)]">{t('education.period')}</span>
        </div>
      </motion.div>
    </section>
  );
};
