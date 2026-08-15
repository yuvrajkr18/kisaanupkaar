import fs from 'fs';

let content = fs.readFileSync('src/pages/Dashboard.tsx', 'utf8');

// Add imports
if (!content.includes('useLanguage')) {
    content = content.replace("import { useFarm } from '../context/FarmContext';", "import { useFarm } from '../context/FarmContext';\nimport { useLanguage } from '../context/LanguageContext';\nimport { LanguageSelector } from '../components/LanguageSelector';");
}

// Add hook
content = content.replace('const pendingTasks = tasks.filter(t => t.status === \'Pending\');', 'const pendingTasks = tasks.filter(t => t.status === \'Pending\');\n  const { t } = useLanguage();');

// Update Header to include language selector in desktop as well
content = content.replace(
    '<div>\n        <h1 className="text-3xl font-bold text-slate-900">Good Morning, Farmer 👋</h1>\n        <p className="text-slate-500 mt-1 text-lg">Here\'s what\'s happening on your farm today.</p>\n      </div>',
    '<div className="flex justify-between items-start">\n        <div>\n          <h1 className="text-3xl font-bold text-slate-900">{t("greeting")}</h1>\n          <p className="text-slate-500 mt-1 text-lg">{t("greeting_sub")}</p>\n        </div>\n        <div className="hidden lg:block">\n          <LanguageSelector variant="light" />\n        </div>\n      </div>'
);

// Update stats headers
content = content.replace('>Active Crops</p>', '>{t("active_crops")}</p>');
content = content.replace('>Farm Area</p>', '>{t("farm_area")}</p>');
content = content.replace('>Total Expenses</p>', '>{t("total_expenses")}</p>');
content = content.replace('>Pending Tasks</p>', '>{t("pending_tasks")}</p>');

// Update stats subtext
content = content.replace('Acres</span></h3>', '{t("acres")}</span></h3>');
content = content.replace('+1 this month</span>', '{t("this_month")}</span>');
content = content.replace('-12% target</span>', '{t("target")}</span>');

// Update crop cycle
content = content.replace('>Current Crop Cycle</h4>', '>{t("current_crop_cycle")}</h4>');
content = content.replace('>View Full List</button>', '>{t("view_full_list")}</button>');

// Update next actions
content = content.replace('>Next Actions</h4>', '>{t("next_actions")}</button>');

fs.writeFileSync('src/pages/Dashboard.tsx', content, 'utf8');
