const enTranslation = {
  common: {
    actions: 'Actions',
    activate: 'Activate',
    deactivate: 'Deactivate',
    edit: 'Edit',
    view: 'View',
    delete: 'Delete',
    generateQRCode: 'Generate QRCode',
    cancel: 'Cancel',
    download: 'Download data',
    'items-per-page': 'Items per page',
  },

  Navbar: {
    logout: 'Logout',
    settings: 'Settings',
    dashboard: 'Dashboard',
    questionnaire: 'QUESTIONNAIRE',
    'teaching-practices': 'Teaching practices',
    'coaching-sessions': 'Coaching sessions',
    data: 'DATA',
    schools: 'Schools',
    'coaches-over-time': 'Coach over time',
    'session-data': 'Session data',
    syncs: 'Sync',
  },

  dashboard: {
    engagement: {
      title: 'Engagement',
      description: 'The numbers that represent coach engagement using the Coach platform in the selected period.',
      'teachers-coached': 'Teachers coached',
      'active-coaches': 'Active coaches',
      'coaching-sessions': 'Coaching sessions',
      'coaching-sessions-per-teacher-over-last-three-months': 'Coaching sessions per teacher over last three months',
      'completed-a-second-coach-session': 'Completed a second coach session',
    },
    'targeted-improvement-areas': {
      title: 'Targeted improvement areas',
      description: 'Teaching practices teachers and coaches agreed to work on between coaching sessions',
    },
    'select-teaching-practices-to-show': 'Select Teaching Practices to show',
    'supportive-learning-environment': 'Supportive learning environment',
  },

  'teacher-practices': {
    new: 'Add teaching practice',
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
        description: 'Update your access password.',
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
    },
  },
};

export default enTranslation;
