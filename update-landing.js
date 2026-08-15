import fs from 'fs';

let content = fs.readFileSync('src/pages/Landing.tsx', 'utf8');

// Add imports
if (!content.includes('useLanguage')) {
    content = content.replace("import { Leaf, Sprout, IndianRupee, CheckSquare, LineChart, ArrowRight } from 'lucide-react';", "import { Leaf, Sprout, IndianRupee, CheckSquare, LineChart, ArrowRight } from 'lucide-react';\nimport { useLanguage } from '../context/LanguageContext';\nimport { LanguageSelector } from '../components/LanguageSelector';");
}

// Add hook
content = content.replace('export default function Landing() {', 'export default function Landing() {\n  const { t } = useLanguage();');

// Update navbar
content = content.replace('>About</a>', '>{t("about")}</a>');
content = content.replace('>Features</a>', '>{t("features")}</a>');
content = content.replace('>How it Works</a>', '>{t("how_it_works")}</a>');
content = content.replace('Login\n        </Link>', '{t("login")}\n        </Link>');

// Add language selector next to login
content = content.replace(
    '<Link \n          to="/login"',
    '<div className="flex items-center gap-4">\n        <LanguageSelector variant="light" />\n        <Link \n          to="/login"'
);
content = content.replace('          Login\n        </Link>\n      </nav>', '          {t("login")}\n        </Link>\n        </div>\n      </nav>');

// Update hero
content = content.replace('Manage Your Farm. <br className="hidden lg:block"/>', '{t("landing_title_1")} <br className="hidden lg:block"/>');
content = content.replace('<span className="text-emerald-600">Make Better Decisions.</span>', '<span className="text-emerald-600">{t("landing_title_2")}</span>');
content = content.replace('FarmWise helps farmers digitally manage crops, expenses, farming activities and important farm information from one simple platform.', '{t("landing_subtitle")}');
content = content.replace('Get Started\n              <ArrowRight', '{t("get_started")}\n              <ArrowRight');
content = content.replace('Explore Features\n            </a>', '{t("explore_features")}\n            </a>');

fs.writeFileSync('src/pages/Landing.tsx', content, 'utf8');
