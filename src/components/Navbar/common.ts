export const MenuItems = [
  {
    icon: "chart-line",
    label: "dashboard",
    route: "/",
  },
  {
    label: "questionnaire",
    subItems: [
      {
        icon: "document-layout-right",
        label: "teaching-practices",
        route: "/teaching-practices",
      },
      {
        icon: "clipboard-notes",
        label: "coaching-sessions",
        route: "/coaching-sessions",
      },
    ],
  },
  {
    label: "data",
    subItems: [
      {
        icon: "university",
        label: "schools",
        route: "/schools",
      },
      {
        icon: "users-alt",
        label: "coaches",
        route: "/coaches",
      },
      {
        icon: "graduation-cap",
        label: "teachers",
        route: "/teachers",
      },
      {
        icon: "sync",
        label: "syncs",
        route: "/syncs",
      },
    ],
  },
];
