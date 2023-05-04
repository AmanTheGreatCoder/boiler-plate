// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDeviceAnalytics, IconCurrentLocation, IconBuildingBank, IconBrandCashapp, IconPhoneCall, IconPhone } from '@tabler/icons';
// import { IconBuildingCommunity } from '@tabler/icons-react';

// constant
const icons = {
    IconDeviceAnalytics,
    IconCurrentLocation,
    IconBuildingBank,
    IconBrandCashapp,
    IconPhoneCall,
    IconPhone
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
            id: 'phone-number',
            title: <FormattedMessage id="phone number" />,
            type: 'item',
            url: '/settings/phone-number',
            icon: icons.IconPhoneCall,
            breadcrumbs: false
        },
        {
            id: 'subscription',
            title: <FormattedMessage id="subscription" />,
            type: 'item',
            url: '/settings/subscription',
            icon: icons.IconBrandCashapp,
            breadcrumbs: false
        },
        {
            id: 'system-config',
            title: <FormattedMessage id="system config" />,
            type: 'item',
            url: '/settings/system-config',
            icon: icons.IconPhone,
            breadcrumbs: false
        },
    ]
};

export default dashboard;
