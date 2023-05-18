import { FormattedMessage } from "react-intl";
import {
  IconHeartHandshake,
  IconSettings,
  IconPhone,
  IconUserCircle,
  IconBrandStripe,
  IconMap2,
  IconMapPin,
  IconDashboard,
} from "@tabler/icons";

const Dashboard = {
  id: "dashboard",
  type: "group",
  children: [
    {
      id: "dashboard",
      title: <FormattedMessage id="dashboard" />,
      type: "item",
      url: "/dashboard",
      icon: IconDashboard,
      breadcrumbs: false,
    },
    {
      id: "user",
      title: <FormattedMessage id="user" />,
      type: "item",
      url: "/user",
      icon: IconUserCircle,
      breadcrumbs: false,
    },
    {
      id: "country",
      title: <FormattedMessage id="country" />,
      type: "item",
      url: "/country",
      icon: IconMap2,
      breadcrumbs: false,
    },
    {
      id: "city",
      title: <FormattedMessage id="city" />,
      type: "item",
      url: "/city",
      icon: IconMapPin,
      breadcrumbs: false,
    },
    {
      id: "phone-number",
      title: <FormattedMessage id="phone number" />,
      type: "item",
      url: "/phone-number",
      icon: IconPhone,
      breadcrumbs: false,
    },
    {
      id: "subscription",
      title: <FormattedMessage id="subscription" />,
      type: "item",
      url: "/subscription",
      icon: IconBrandStripe,
      breadcrumbs: false,
    },
    {
      id: "system-config",
      title: <FormattedMessage id="system config" />,
      type: "item",
      url: "/system-config",
      icon: IconSettings,
      breadcrumbs: false,
    },
    {
      id: "provider",
      title: <FormattedMessage id="provider" />,
      type: "item",
      url: "/provider",
      icon: IconHeartHandshake,
      breadcrumbs: false,
    },
  ],
};

export default Dashboard;
