import { t } from '@lingui/macro';
import { Link } from 'react-router-dom';

import { useDark } from '@/hooks';

function Footer() {
  const { isDark, toggleDark } = useDark();

  return (
    <nav className="text-xl mt-6 inline-flex gap-2">
      <button
        className="icon-btn mx-2 !outline-none"
        title={t`Toggle dark mode`}
        onClick={() => toggleDark()}
      >
        {isDark ? <div className="i-carbon-moon" /> : <div className="i-carbon-sun" />}
      </button>
    </nav>
  );
}

export default Footer;
