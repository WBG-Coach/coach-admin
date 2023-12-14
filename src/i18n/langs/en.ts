const enTranslation = {
  common: {
    actions: 'Actions',
    activate: 'Activate',
    deactivate: 'Deactivate',
    save: 'Save',
    edit: 'Edit',
    view: 'View',
    delete: 'Delete',
    generateQRCode: 'Generate QRCode',
    cancel: 'Cancel',
    download: 'Download data',
    'items-per-page': 'Items per page',
    'all-time': 'All time',
    'last-7-days': 'Last 7 days',
    'last-30-days': 'Last 30 days',
    'last-60-days': 'Last 60 days',
    'last-90-days': 'Last 90 days',
    'all-regions': 'All regions',
    'all-schools': 'All schools',
    'all-districts': 'All districts',
  },

  Navbar: {
    logout: 'Log out',
    settings: 'Settings',
    dashboard: 'Dashboard',
    questionnaire: 'QUESTIONNAIRE',
    'teaching-practices': 'Teaching practices',
    'coaching-sessions': 'Coaching sessions',
    data: 'DATA',
    schools: 'Schools',
    'coaches-over-time': 'Coaching activity',
    'session-data': 'Session data',
    syncs: 'Sync log',
  },

  dashboard: {
    filters: {
      region: 'Select region',
      district: 'Select district',
      school: 'Select school',
    },
    engagement: {
      title: 'Engagement',
      description: 'Overview of coaching engagement on the Coach platform for the selected period.',
      'teachers-coached': 'Teachers coached',
      'active-coaches': 'Active coaches',
      'coaching-sessions': 'Coaching sessions',
      'coaching-sessions-per-teacher-over-last-three-months': 'Sessions per teacher (last 3 months)',
      'completed-a-second-coach-session': 'Completed a second coaching session',
    },
    'targeted-improvement-areas': {
      title: 'Targeted improvement areas',
      description: 'Fundamental teaching practices and skills teachers and coaches agreed to work on between coaching sessions',
    },
    'needs-work': 'Needs work',
    'keep-working': 'Keep working',
    'needs-attention': 'Needs attention',
    'almost-there': 'Almost there',
    'doing-great': 'Doing great',
    'school-rating': 'School rating',
    'regional-average': 'Regional average',
    'national-average': 'National average',
    'select-teaching-practices-to-show': 'Select teaching practices to show',
    'supportive-learning-environment': 'Supportive learning environment',
    'teachers-showing-improvement-or-mastery': 'Teachers showing improvement or mastery',
    'teachers-and-coaches-chose-to-work-on-improving-this-practice':
      'Teachers and coaches chose to work on improving this practice',
    'teachers-did-not-have-a-feedback-session': 'Teachers without feedback sessions',
  },

  'teacher-practices': {
    new: 'Add teaching practice',
    active: 'Active',
    inactive: 'Inactive',
    table: {
      name: 'Name',
      'number-of-questions': 'Number of questions',
      'publish-state': 'Publish state',
      Actions: 'Actions',
    },
    form: {
      name: 'Teaching practice name',
      'question-title': 'Title',
      'question-description': 'Description',
      'save-question': 'Save question',
    },
  },

  'coaching-sessions': {
    table: {
      school: 'School',
      coach: 'Coach',
      teacher: 'Teacher',
      subject: 'Subject',
      feedback: 'Feedback',
      actions: 'Actions',
    },
  },

  school: {
    'new-school': 'New school',
    filter: 'School name',
    table: {
      name: 'Name',
      'coaches-count': 'Coaches count',
      'teachers-count': 'Teachers count',
      actions: 'Actions',
    },
    form: {
      new: 'New school',
      update: 'Update school',
      region: 'Region: ',
      name: 'School name',
      emis: 'Emis number',
    },
  },

  'coach-over-time': {
    filters: {
      region: 'Region',
      school: 'School',
      'with-no-data': 'Include schools with no data',
    },
    table: {
      School: 'School',
      'Number of coaches': 'Number of coaches',
      'Number of teachers coached': 'Number of teachers coached',
      'Feedback sessions': 'Feedback sessions',
      'Teachers coached (last 30 days)': 'Teachers coached (last 30 days)',
      'Teachers coached (30-60 days)': 'Teachers coached (30-60 days)',
      'Teachers coached (60-90 days)': 'Teachers coached (60-90 days)',
      'Teachers coached (90+ days)': 'Teachers coached (90+ days)',
    },
  },

  session: {
    table: {
      school: 'School',
      coach: 'Coach',
      teacher: 'Teacher',
      subject: 'Subject',
      feedback: 'Feedback',
    },
  },

  'session-data': {
    filters: {
      period: 'Period',
      region: 'Region',
      school: 'School',
      'with-no-data': 'Include schools with no data',
    },
    table: {
      school: 'School',
      'number-of-coaches': 'Number of coaches',
      'number-of-teachers-coached': 'Number of teachers coached',
      'feedback-sessions': 'Feedback sessions',
      'supportive-learning Environment': 'Supportive Learning Environment',
      'critical-thinking': 'Critical Thinking',
      'effective-teaching': 'Effective Teaching',
      'time-on-learning': 'Time on Learning',
      'positive-behavioral-expectations': 'Positive Behavioral Expectations',
    },
  },

  sync: {
    table: {
      'android-version': 'Android version',
      model: 'Model',
      'device-id': 'DeviceID',
      'last-update': 'Last Update',
    },
  },

  settings: {
    title: 'Settings',
    tabs: {
      user: {
        title: 'General',
        description: 'Update your information.',
        name: 'Name',
        email: 'Email',
        save: 'Save updates',
      },
      users: {
        title: 'Users',
        new: 'New user',
      },
      'change-password': {
        title: 'Change password',
        description: 'Update your password.',
        'current-password': 'Current password',
        'new-password': 'New password',
        'confirm-password': 'Confirm password',
      },
      logs: {
        table: {
          title: 'Logs',
          user: 'User',
          action: 'Action',
          date: 'Date',
        },
      },
      language: {
        title: 'Change language',
      },
      region: {
        title: 'Regions',
        new: 'New region',
        'sub-subregion-title': 'Municipalities',
        'subregion-title': 'Districts',
        'new-subregion': 'New district',
        'new-sub-subregion': 'New municipality',
        edit: 'Edit',
        total_schools: 'Total school: {{ value }}',
        placeholder: 'Region name',
        0: {
          title: 'Regions',
          new: 'New region',
          placeholder: 'Region name',
          select: 'Select a region',
        },
        1: {
          title: 'Districts',
          new: 'New district',
          placeholder: 'District name',
          select: 'Select a district',
        },
        2: {
          title: 'Municipalities',
          new: 'New Municipality',
          placeholder: 'Municipality name',
          select: 'Select a municipality',
        },
      },
    },
  },
};

export default enTranslation;
