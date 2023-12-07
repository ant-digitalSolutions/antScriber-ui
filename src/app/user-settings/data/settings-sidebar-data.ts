import { NavItem } from "src/app/layouts/full/vertical/sidebar/nav-item/nav-item";

export const userSettingsNavItems: NavItem[] = [
  {
    displayName: 'My Profile',
    iconName: 'account_circle',
    route: 'profile',
    relativeRoute: true,
    prodReady: true,
  },
  {
    displayName: 'Plans',
    iconName: 'workspace_premium',
    route: 'plans',
    relativeRoute: true,
    prodReady: true,
  },
  {
    displayName: 'Payments',
    iconName: 'credit_card',
    route: 'payments',
    relativeRoute: true,
    prodReady: true,
  },
  {
    displayName: 'Tasks',
    iconName: 'smart_toy',
    route: 'tasks',
    relativeRoute: true,
  },
  {
    displayName: 'Usage',
    iconName: 'analytics',
    route: 'usage',
    relativeRoute: true,
    prodReady: true,
  },
];
