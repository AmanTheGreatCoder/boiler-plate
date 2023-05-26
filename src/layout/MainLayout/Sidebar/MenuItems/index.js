import { IconUserCircle, IconDashboard } from '@tabler/icons';

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
    }
  ]
};

const MenuItems = {
  items: [SidebarItems]
};

export default MenuItems;
