// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDeviceAnalytics, IconCurrentLocation, IconBuildingBank, IconBrandCashapp, IconPhoneCall } from '@tabler/icons';
// import { IconBuildingCommunity } from '@tabler/icons-react';

// constant
const icons = {
    IconDeviceAnalytics,
    IconCurrentLocation,
    IconBuildingBank,
    IconBrandCashapp,
    IconPhoneCall
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
        {
            id: 'city',
            title: <FormattedMessage id="city" />,
            type: 'item',
            url: '/settings/city',
            icon: icons.IconBuildingBank,
            breadcrumbs: false
        },
        {
            id: 'plans',
            title: <FormattedMessage id="plans" />,
            type: 'item',
            url: '/settings/plans',
            icon: icons.IconBrandCashapp,
            breadcrumbs: false
        },
        {
            id: 'phone-number',
            title: <FormattedMessage id="phone number" />,
            type: 'item',
            url: '/settings/phone-number',
            icon: icons.IconPhoneCall,
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
