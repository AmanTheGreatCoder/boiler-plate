import {
  IconHeartHandshake,
  IconSettings,
  IconPhone,
  IconUserCircle,
  IconBrandStripe,
  IconMap2,
  IconMapPin,
  IconDashboard
} from '@tabler/icons';

const SidebarItems = {
  id: 'items',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'user',
      title: 'Users',
      type: 'item',
      url: '/user',
      icon: IconUserCircle,
      breadcrumbs: false
    },
    {
      id: 'country',
      title: 'Countries',
      type: 'item',
      url: '/country',
      icon: IconMap2,
      breadcrumbs: false
    },
    {
      id: 'city',
      title: 'Cities',
      type: 'item',
      url: '/city',
      icon: IconMapPin,
      breadcrumbs: false
    },
    {
      id: 'phone-number',
      title: 'Phone Numbers',
      type: 'item',
      url: '/phone-number',
      icon: IconPhone,
      breadcrumbs: false
    },
    {
      id: 'subscription',
      title: 'Subscriptions',
      type: 'item',
      url: '/subscription',
      icon: IconBrandStripe,
      breadcrumbs: false
    },
    {
      id: 'system-config',
      title: 'System Config',
      type: 'item',
      url: '/system-config',
      icon: IconSettings,
      breadcrumbs: false
    },
    {
      id: 'provider',
      title: 'Provider',
      type: 'item',
      url: '/provider',
      icon: IconHeartHandshake,
      breadcrumbs: false
    },
    {
      id: 'user-subscription',
      title: 'User Subscriptions',
      type: 'item',
      url: '/user-subscription',
      icon: IconHeartHandshake,
      breadcrumbs: false
    }
  ]
};

const MenuItems = {
  items: [SidebarItems]
};

export default MenuItems;
