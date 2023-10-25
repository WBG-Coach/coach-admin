export const MenuItems = [
  {
    icon: 'chart-line',
    label: 'dashboard',
    route: '/',
  },
  {
    label: 'questionnaire',
    subItems: [
      {
        icon: 'document-layout-right',
        label: 'teaching-practices',
        route: '/teaching-practices',
      },
      {
        icon: 'clipboard-notes',
        label: 'coaching-sessions',
        route: '/coaching-sessions',
      },
    ],
  },
  {
    label: 'data',
    subItems: [
      {
        icon: 'university',
        label: 'schools',
        route: '/schools',
      },
      {
        icon: 'calender',
        label: 'coaches-over-time',
        route: '/coach-over-time',
      },
      {
        icon: 'folder',
        label: 'session-data',
        route: '/session-data',
      },
      {
        icon: 'sync',
        label: 'syncs',
        route: '/syncs',
      },
    ],
  },
];
