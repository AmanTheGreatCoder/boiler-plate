// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDeviceAnalytics, IconCurrentLocation, IconHeartHandshake, IconSettingsAutomation, IconBuildingBank, IconBrandCashapp, IconPhoneCall, IconPhone, IconPhonePlus, IconUserCircle, IconBrandStripe, IconMap2, IconMapPin } from '@tabler/icons';
// import { IconBuildingCommunity } from '@tabler/icons-react';

// constant
const icons = {
    IconDeviceAnalytics,
    IconCurrentLocation,
    IconBuildingBank,
    IconBrandCashapp,
    IconPhoneCall,
    IconPhone,
    IconPhonePlus,
    IconUserCircle,
    IconMap2,
    IconMapPin,
    IconBrandStripe,
    IconSettingsAutomation,
    IconHeartHandshake
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'settings',
    title: <FormattedMessage id="settings" />,
    type: 'group',
    children: [
        {
            id: 'user',
            title: <FormattedMessage id="user" />,
            type: 'item',
            url: '/settings/user',
            icon: icons.IconUserCircle,
            breadcrumbs: false
        },
        {
            id: 'country',
            title: <FormattedMessage id="country" />,
            type: 'item',
            url: '/settings/country',
            icon: icons.IconMap2,
            breadcrumbs: false
        },
        {
            id: 'city',
            title: <FormattedMessage id="city" />,
            type: 'item',
            url: '/settings/city',
            icon: icons.IconMapPin,
            breadcrumbs: false
        },
        {
            id: 'phone-number',
            title: <FormattedMessage id="phone number" />,
            type: 'item',
            url: '/settings/phone-number',
            icon: icons.IconPhone,
            breadcrumbs: false
        },
        {
            id: 'subscription',
            title: <FormattedMessage id="subscription" />,
            type: 'item',
            url: '/settings/subscription',
            icon: icons.IconBrandStripe,
            breadcrumbs: false
        },
        {
            id: 'system-config',
            title: <FormattedMessage id="system config" />,
            type: 'item',
            url: '/settings/system-config',
            icon: icons.IconSettingsAutomation,
            breadcrumbs: false
        },
        {
            id: 'provider',
            title: <FormattedMessage id="provider" />,
            type: 'item',
            url: '/settings/provider',
            icon: icons.IconHeartHandshake,
            breadcrumbs: false
        },
    ]
};

export default dashboard;
