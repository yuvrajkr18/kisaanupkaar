import fs from 'fs';

let content = fs.readFileSync('src/translations.ts', 'utf8');

// Insert english translations
content = content.replace(
  "how_it_works: 'How it Works'\n  },",
  "how_it_works: 'How it Works',\n    listen: 'Listen',\n    stop: 'Stop',\n    tts_dashboard_summary: 'Good Morning. You have {crops} active crops, {area} acres of farm area, and {tasks} pending tasks.'\n  },"
);

// Insert hindi translations
content = content.replace(
  "how_it_works: 'यह कैसे काम करता है'\n  },",
  "how_it_works: 'यह कैसे काम करता है',\n    listen: 'सुनें',\n    stop: 'रोकें',\n    tts_dashboard_summary: 'सुप्रभात। आपके पास {crops} सक्रिय फसलें, {area} एकड़ खेत, और {tasks} लंबित कार्य हैं।'\n  },"
);

// Insert gujarati translations
content = content.replace(
  "how_it_works: 'તે કેવી રીતે કામ કરે છે'\n  },",
  "how_it_works: 'તે કેવી રીતે કામ કરે છે',\n    listen: 'સાંભળો',\n    stop: 'થોભો',\n    tts_dashboard_summary: 'સુપ્રભાત. તમારી પાસે {crops} સક્રિય પાક, {area} એકર ખેતર, અને {tasks} બાકી કાર્યો છે.'\n  },"
);

// Insert marathi translations
content = content.replace(
  "how_it_works: 'हे कसे कार्य करते'\n  },",
  "how_it_works: 'हे कसे कार्य करते',\n    listen: 'ऐका',\n    stop: 'थांबवा',\n    tts_dashboard_summary: 'शुभ सकाळ. तुमच्याकडे {crops} सक्रिय पिके, {area} एकर शेत, आणि {tasks} प्रलंबित कामे आहेत.'\n  },"
);

// Insert bhojpuri translations
content = content.replace(
  "how_it_works: 'ई कइसे काम करेला'\n  }",
  "how_it_works: 'ई कइसे काम करेला',\n    listen: 'सुनीं',\n    stop: 'रोकीं',\n    tts_dashboard_summary: 'शुभ बिहान। रउआ लगे {crops} चालू फसल, {area} एकड़ खेत, अवुरी {tasks} बचल काम बा।'\n  }"
);

fs.writeFileSync('src/translations.ts', content, 'utf8');
