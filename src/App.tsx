import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { en, fr, zh } from 'make-plural/plurals';
import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import routes from 'virtual:generated-pages-react';

import Footer from '@/components/Footer';
import { defaultLocale, dynamicActivate } from '@/utils';
import Navbar from './components/NavBar/Index';


const queryClient = new QueryClient();


i18n.loadLocaleData({
  fr: { plurals: fr },
  zh: { plurals: zh },
  en: { plurals: en },
});

export default function App() {
  useEffect(() => {
    dynamicActivate(defaultLocale);
  }, []);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <QueryClientProvider client={queryClient}>
        <I18nProvider i18n={i18n}>
          <main text="center gray-700">
            <Navbar />
            <div p="x-4 y-4">
              {useRoutes(routes)}
            </div>
            <Footer />
          </main>
        </I18nProvider>
      </QueryClientProvider>
    </Suspense>
  );
}
