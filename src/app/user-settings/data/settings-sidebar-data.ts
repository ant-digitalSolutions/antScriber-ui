import { NavItem } from "src/app/layouts/full/vertical/sidebar/nav-item/nav-item";

export const userSettingsNavItems: NavItem[] = [

  {
    displayName: 'My Profile',
    iconName: 'account_circle',
    route: 'profile',
    relativeRoute: true
  },
  {
    displayName: 'Billing',
    iconName: 'credit_card',
    route: 'billing',
    relativeRoute: true
  },
  {
    displayName: 'Tasks',
    iconName: 'smart_toy',
    route: 'tasks',
    relativeRoute: true
  },
  {
    displayName: 'Usage',
    iconName: 'analytics',
    route: 'usage',
    relativeRoute: true
  },

];
