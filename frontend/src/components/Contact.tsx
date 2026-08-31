import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    // TODO: Connect to AWS API Gateway Endpoint
    // const formData = new FormData(e.currentTarget);
    // const data = Object.fromEntries(formData);
    
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 px-6 max-w-2xl mx-auto border-t brutal-border mb-32">
      <h2 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center gap-4">
        <span className="mono text-[var(--accent)] text-sm font-normal">04.</span>
        {t('contact.title')}
      </h2>
      
      <div className="brutal-card p-8 md:p-10">
        {status === 'success' ? (
          <div className="text-center py-12">
            <div className="text-[var(--accent)] text-xl mb-4">✓</div>
            <h3 className="text-white font-bold text-lg mb-2">{t('contact.successTitle')}</h3>
            <p className="text-[var(--text-secondary)]">{t('contact.successSubtitle')}</p>
            <button 
              onClick={() => setStatus('idle')}
              className="mt-8 text-sm mono text-white hover:text-[var(--accent)] underline"
            >
              {t('contact.sendAnother')}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block mono text-xs text-[var(--text-secondary)] mb-2 uppercase">
                {t('contact.name')}
              </label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required 
                className="w-full bg-[var(--bg-color)] border brutal-border px-4 py-3 text-white focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block mono text-xs text-[var(--text-secondary)] mb-2 uppercase">
                {t('contact.email')}
              </label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                className="w-full bg-[var(--bg-color)] border brutal-border px-4 py-3 text-white focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block mono text-xs text-[var(--text-secondary)] mb-2 uppercase">
                {t('contact.message')}
              </label>
              <textarea 
                id="message" 
                name="message" 
                required 
                rows={5}
                className="w-full bg-[var(--bg-color)] border brutal-border px-4 py-3 text-white focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="w-full py-4 bg-white text-black font-bold hover:bg-[var(--accent)] transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? '...' : t('contact.send')}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
