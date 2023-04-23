// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDeviceAnalytics, IconCurrentLocation } from '@tabler/icons';
// import { IconBuildingCommunity } from '@tabler/icons-react';

// constant
const icons = {
    IconDeviceAnalytics,
    IconCurrentLocation
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'settings',
    title: <FormattedMessage id="settings" />,
    type: 'group',
    children: [
        {
            id: 'country',
            title: <FormattedMessage id="country" />,
            type: 'item',
            url: '/settings/country',
            icon: icons.IconCurrentLocation,
            breadcrumbs: false
        },
        // {
        //     id: 'analytics',
        //     title: <FormattedMessage id="analytics" />,
        //     type: 'item',
        //     url: '/dashboard/analytics',
        //     icon: icons.IconDeviceAnalytics,
        //     breadcrumbs: false
        // }
    ]
};

export default dashboard;
