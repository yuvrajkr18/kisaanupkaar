import fs from 'fs';

let content = fs.readFileSync('src/layouts/DashboardLayout.tsx', 'utf8');

// Add imports
if (!content.includes('useLanguage')) {
    content = content.replace("import { cn } from '../lib/utils';", "import { cn } from '../lib/utils';\nimport { useLanguage } from '../context/LanguageContext';\nimport { LanguageSelector } from '../components/LanguageSelector';");
}

// Update component
content = content.replace('const navigate = useNavigate();', 'const navigate = useNavigate();\n  const { t } = useLanguage();');

// Update nav items
content = content.replace(/\{ name: 'Dashboard'.*?\},/, "{ name: t('nav_dashboard'), path: '/dashboard', icon: LayoutDashboard },");
content = content.replace(/\{ name: 'Crops'.*?\},/, "{ name: t('nav_crops'), path: '/crops', icon: Sprout },");
content = content.replace(/\{ name: 'Fields'.*?\},/, "{ name: t('nav_fields'), path: '/fields', icon: Map },");
content = content.replace(/\{ name: 'Expenses'.*?\},/, "{ name: t('nav_expenses'), path: '/expenses', icon: IndianRupee },");
content = content.replace(/\{ name: 'Tasks'.*?\},/, "{ name: t('nav_tasks'), path: '/tasks', icon: CheckSquare },");
content = content.replace(/\{ name: 'Weather'.*?\},/, "{ name: t('nav_weather'), path: '/weather', icon: CloudSun },");

content = content.replace(/\{ name: 'Profile'.*?\},/, "{ name: t('nav_profile'), path: '/profile', icon: User },");
content = content.replace("Logout\n        </button>", "{t('nav_logout')}\n        </button>");

// Add language selector to mobile header
content = content.replace(
    '<button \n            onClick={() => setMobileMenuOpen(true)}',
    '<LanguageSelector variant="light" />\n          <button \n            onClick={() => setMobileMenuOpen(true)}'
);

fs.writeFileSync('src/layouts/DashboardLayout.tsx', content, 'utf8');
