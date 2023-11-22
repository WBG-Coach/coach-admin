const npTranslation = {
  common: {
    edit: 'सम्पादन गर्नुहोस्',
    view: 'हेर्नुहोस्',
    delete: 'हटाउनुहोस्',
    'items-per-page': 'पृष्ठ सूचीमा कुल',
    activate: 'सक्रिय गर्नुहोस्',
    deactivate: 'निष्क्रिय पार्नुहोस्',
    generateQRCode: 'QR कोड सिर्जना गर्नुहोस्',
    cancel: 'रद्द गर्नुहोस्',
    download: 'डाटा डाउनलोड गर्नुहोस्',
    actions: 'कार्यहरू',
  },
  Navbar: {
    dashboard: 'मुख्य पृष्ठ',
    questionnaire: 'प्रश्नावली',
    'teaching-practices': 'शिक्षण अभ्यासहरू',
    data: 'डाटा',
    syncs: 'अपलोड र डाउनलोड',
    logout: 'एपबाट लगआउट गर्नुहोस्',
    settings: 'एप सेटिङ',
    'coaching-sessions': 'कोचिङ सत्रहरू',
    'session-data': 'सत्र मा डाटा',
    'coaches-over-time': 'कोचिङ अवधि',
    schools: 'विद्यालयहरू',
  },
  dashboard: {
    engagement: {
      title: 'संलग्नता',
      'coaching-sessions': 'कोचिङ सत्रहरू',
      'completed-a-second-coach-session': 'दोस्रो कोच सत्र पूरा गरेको छ',
      'teachers-coached': 'प्रशिक्षित शिक्षकहरूको कुल संख्या',
      'active-coaches': 'सक्रिय प्रशिक्षकहरू',
      'coaching-sessions-per-teacher-over-last-three-months': 'पछिल्लो तीन महिनामा प्रति शिक्षक कोचिङ सत्रहरू',
      description: 'चयन गरिएको अवधिमा कोच प्लेटफर्म प्रयोग गरेर कोच संलग्नता प्रतिनिधित्व गर्ने संख्याहरू।',
    },
    'targeted-improvement-areas': {
      title: 'लक्षित सुधार क्षेत्रहरू',
      description: 'शिक्षण अभ्यासहरू जसको लागि शिक्षक र प्रशिक्षकहरू कोचिङ सत्रहरू बीचमा काम गर्न सहमत भए',
    },
    'select-teaching-practices-to-show': 'तपाईंले हेर्न चाहनुभएको शिक्षण अभ्यासहरू चयन गर्नुहोस्',
    'supportive-learning-environment': 'सहयोगी सिकाइ वातावरण',
  },
  'teacher-practices': {
    new: 'शिक्षण अभ्यास थप्नुहोस्',
    table: {
      name: 'नाम',
      'number-of-questions': 'प्रश्न संख्या',
      'publish-state': 'डाटा प्रकाशित स्थिति',
      Actions: 'कार्यहरू',
    },
    form: {
      name: 'शिक्षण अभ्यास नाम',
      'question-title': 'शीर्षक',
      'question-description': 'विवरण',
      'save-question': 'प्रश्न सुरक्षण',
    },
  },
  'coaching-sessions': {
    table: {
      school: 'विद्यालय',
      coach: 'प्रशिक्षक',
      teacher: 'शिक्षक',
      feedback: 'प्रतिक्रिया',
      actions: 'कार्यहरू',
      subject: 'विषय',
    },
  },
  school: {
    table: {
      actions: 'कार्यहरू',
      name: 'नाम',
      'teachers-count': 'कुल शिक्षक संख्या',
      'coaches-count': 'कोच को कुल संख्या',
    },
    'new-school': 'नयाँ विद्यालय',
    filter: 'विद्यालयको नाम',
  },
  'coach-over-time': {
    filters: {
      school: 'विद्यालय',
      'with-no-data': 'डाटा नभएका विद्यालयहरू समावेश गर्नुहोस्',
      region: 'क्षेेत्र',
    },
    table: {
      School: 'विद्यालय',
      'Number of coaches': 'कोच संख्या',
      'Feedback sessions': 'प्रतिक्रिया सत्र',
      'Teachers coached (30-60 days)': 'कुल प्रशिक्षित शिक्षक (३०-६० दिन)',
      'Teachers coached (60-90 days)': 'कुल प्रशिक्षित शिक्षक (6०-9० दिन)',
      'Number of teachers coached': 'प्रशिक्षित शिक्षकहरूको कुल संख्या',
      'Teachers coached (90+ days)': 'कुल प्रशिक्षित शिक्षक (90+ दिन)',
      'Teachers coached (last 30 days)': 'कुल प्रशिक्षित शिक्षक  (पछिल्लो 30 दिन)',
    },
  },
  'session-data': {
    filters: {
      period: 'अवधि',
      region: 'क्षेत्र',
      school: 'विद्यालय',
      'with-no-data': 'डाटा नभएका विद्यालयहरू समावेश गर्नुहोस्',
    },
    table: {
      school: 'विद्यालय',
      'feedback-sessions': 'प्रतिक्रिया सत्र',
      'effective-teaching': 'प्रभावकारी शिक्षण',
      'number-of-coaches': 'कोच संख्या',
      'time-on-learning': 'सिक्ने समय',
      'positive-behavioral-expectations': 'सकारात्मक व्यवहार अपेक्षाहरू',
      'number-of-teachers-coached': 'प्रशिक्षित कुल शिक्षक',
      'critical-thinking': 'आलोचनात्मक विचार',
      'supportive-learning Environment': 'सहयोगी सिकाइ वातावरण',
    },
  },
  settings: {
    title: 'सेटिङ',
    tabs: {
      user: {
        title: 'साधारण',
        name: 'नाम',
        description: 'आफ्नो जानकारी अपडेट गर्नुहोस्।',
        email: 'इमेल',
      },
      users: {
        title: 'प्रयोगकर्ताहरू',
        new: 'नयाँ प्रयोगकर्ताहरू',
      },
      logs: {
        table: {
          title: 'दैनिकी',
          user: 'प्रयोगकर्ता',
          action: 'कार्यहरू',
          date: 'मिति',
        },
      },
      'change-password': {
        'current-password': 'वर्तमान पासवर्ड',
        'new-password': 'नया पासवर्ड',
        'confirm-password': 'पासवर्ड सुनिश्चित गर्नुहोस',
        description: 'आफ्नो पासवर्ड अपडेट गर्नुहोस्',
        title: 'पासवर्ड परिवर्तन गर्नुहोस्',
      },
      language: {
        title: 'भाषा परिवर्तन गर्नुहोस्',
      },
    },
  },
};

export default npTranslation;
