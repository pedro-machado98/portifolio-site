
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export const Header: React.FC = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'pt' ? 'en' : 'pt';
    i18n.changeLanguage(newLang);
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed top-0 left-0 w-full bg-[var(--bg-color)]/60 backdrop-blur-xl border-b brutal-border z-50"
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="text-xl font-bold mono text-white">Pedro Machado</div>
        <nav className="flex items-center gap-6">
          <a href="#experience" className="text-sm font-medium hover:text-[var(--accent)] transition-colors hidden sm:block">{t('nav.experience')}</a>
          <a href="#projects" className="text-sm font-medium hover:text-[var(--accent)] transition-colors hidden sm:block">{t('nav.projects')}</a>
          <a href="#education" className="text-sm font-medium hover:text-[var(--accent)] transition-colors hidden sm:block">{t('nav.education')}</a>
          <a href="#contact" className="text-sm font-medium hover:text-[var(--accent)] transition-colors hidden sm:block">{t('nav.contact')}</a>
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-sm mono px-3 py-1 brutal-border hover:bg-[var(--surface)] hover:text-[var(--accent)] transition-colors"
          >
            <Globe size={16} />
            {i18n.language === 'pt' ? 'EN' : 'PT'}
          </button>
        </nav>
      </div>
    </motion.header>
  );
};
