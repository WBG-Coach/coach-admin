export const MenuItems = [
  {
    icon: "home-alt",
    label: "dashboard",
    route: "/",
  },
  {
    label: "questionnaire",
    subItems: [
      {
        icon: "puzzle-piece",
        label: "competencies",
        route: "/competencies",
      },
      {
        icon: "clipboard-notes",
        label: "questions",
        route: "/questions",
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
        icon: "user",
        label: "coaches",
        route: "/coaches",
      },
      {
        icon: "user-circle",
        label: "teachers",
        route: "/teachers",
      },
      {
        icon: "notes",
        label: "sessions",
        route: "/sessions",
      },
    ],
  },
  {
    label: "account",
    subItems: [
      {
        icon: "setting",
        label: "settings",
        route: "/settings",
      },
      {
        icon: "signout",
        label: "logout",
      },
    ],
  },
];
