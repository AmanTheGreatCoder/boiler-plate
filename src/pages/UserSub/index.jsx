import { useRef, useState } from "react";
import withPagination from "hoc/withPagination/withPagination";
import EnhancedTable from "components/EnhancedTable";
import { CurrencyPound, AccessTime } from "@mui/icons-material";

const columns = [
  { id: "subId", label: "ID" },
  { id: "name", label: "Name" },
  {
    id: "phoneNumberId.countryCode.phoneNumber",
    label: "Phone Number",
    format: "add",
    prefix: "+",
  },
  {
    id: "productId.total_minutes",
    label: "Total Minutes",
    prefix: [<AccessTime sx={{ fontSize: "18px", mr: 0.5 }} />],
  },
  {
    id: "productId.amount",
    label: "Amount",
    prefix: [<CurrencyPound sx={{ fontSize: "18px", mr: 0.5 }} />],
  },
  {
    id: "paymentDate",
    label: "Payment Date",
    format: "Date",
  },
  {
    id: "status",
    label: "Status",
  },
];

function UserSubscription(props) {
  const {
    rowsPerPage,
    setSearch,
    getList,
    clearSearchField,
    setQuery,
    children,
    ...otherProps
  } = props;

  return (
    <EnhancedTable
      title={"User Subscription"}
      urlPrefix="user-subs"
      pagination={children}
      columns={columns}
      getList={getList}
      {...otherProps}
    ></EnhancedTable>
  );
}

export default withPagination(UserSubscription, "user-subs", {
  imageRequired: true,
  title: "User Subs",
});
