export const MenuItems = [
  {
    icon: 'chart-line',
    label: 'dashboard',
    route: '/sl/admin/',
  },
  {
    label: 'questionnaire',
    subItems: [
      {
        icon: 'document-layout-right',
        label: 'teaching-practices',
        route: '/sl/admin/teaching-practices',
      },
      {
        icon: 'clipboard-notes',
        label: 'coaching-sessions',
        route: '/sl/admin/coaching-sessions',
      },
    ],
  },
  {
    label: 'data',
    subItems: [
      {
        icon: 'university',
        label: 'schools',
        route: '/sl/admin/schools',
      },
      {
        icon: 'calender',
        label: 'coaches-over-time',
        route: '/sl/admin/coach-over-time',
      },
      {
        icon: 'folder',
        label: 'session-data',
        route: '/sl/admin/session-data',
      },
      {
        icon: 'sync',
        label: 'syncs',
        route: '/sl/admin/syncs',
      },
    ],
  },
];
