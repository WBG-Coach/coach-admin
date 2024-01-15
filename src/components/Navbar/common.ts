export const MenuItems = [
  {
    icon: 'chart-line',
    label: 'dashboard',
    route: `/${import.meta.env.VITE_COUNTRY}/admin/`,
  },
  {
    label: 'questionnaire',
    subItems: [
      {
        icon: 'document-layout-right',
        label: 'teaching-practices',
        route: `/${import.meta.env.VITE_COUNTRY}/admin/teaching-practices`,
      },
      {
        icon: 'clipboard-notes',
        label: 'coaching-sessions',
        route: `/${import.meta.env.VITE_COUNTRY}/admin/coaching-sessions`,
      },
    ],
  },
  {
    label: 'data',
    subItems: [
      {
        icon: 'university',
        label: 'schools',
        route: `/${import.meta.env.VITE_COUNTRY}/admin/schools`,
      },
      {
        icon: 'calender',
        label: 'coaches-over-time',
        route: `/${import.meta.env.VITE_COUNTRY}/admin/coach-over-time`,
      },
      {
        icon: 'folder',
        label: 'session-data',
        route: `/${import.meta.env.VITE_COUNTRY}/admin/session-data`,
      },
      {
        icon: 'sync',
        label: 'syncs',
        role: 'admin',
        route: `/${import.meta.env.VITE_COUNTRY}/admin/syncs`,
      },
    ],
  },
];
