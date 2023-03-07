import { i18n } from '@lingui/core';
import { t } from '@lingui/macro';
import { Link } from 'react-router-dom';

import { useDark } from '@/hooks';
import { dynamicActivate } from '@/utils';

export default function Footer() {
  const { isDark, toggleDark } = useDark();

  const toggleLocales = () => {
    const locales = ['zh', 'en', 'ja'];
    const locale = locales[(locales.indexOf(i18n.locale) + 1) % locales.length];

    dynamicActivate(locale);
  };

  return (
    <nav className="text-xl mt-6 inline-flex gap-2">
      <Link className="icon-btn mx-2" title={t`Home`} to="/">
        <div className="i-carbon-campsite" />
      </Link>
      <button
        className="icon-btn mx-2 !outline-none"
        title={t`Toggle dark mode`}
        onClick={() => toggleDark()}
      >
        {isDark ? <div className="i-carbon-moon" /> : <div className="i-carbon-sun" />}
      </button>
      <button className="icon-btn mx-2" title={t`Change languages`} onClick={() => toggleLocales()}>
        <div className="i-carbon-language" />
      </button>
      <a
        className="icon-btn"
        rel="noreferrer"
        href="https://github.com/a1ooha/vitesse-for-react"
        target="_blank"
        title="GitHub"
      >
        <div className="i-carbon-logo-github" />
      </a>
    </nav>
  );
}
