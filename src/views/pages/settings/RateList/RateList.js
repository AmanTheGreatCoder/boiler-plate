import React, { useEffect, useRef, useState } from "react";

// material-ui
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
} from "@mui/material";
import { Switch } from "@mui/material";

// project imports
import ProviderAddEdit from "./RateListAddEdit";
import withPagination from "higher order components/withPagination/withPagination";
import confirm from "views/forms/plugins/Confirm/confirm";
import APIManager from "utils/APImanager";
import { confirmMessage, getValueFromObject } from "utils/Helper";
import TableHeader from "components/EnhancedTable";
import ActionButtons from "components/ActionButtons/ActionButtons";
import { MODULE_NAME } from "./Values";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import EnhancedTable from "components/EnhancedTable";

const apiManager = new APIManager();

const columns = [
  { id: "dialCode", label: "Dialcode", style: { minWidth: 30 }, prefix: "+" },
  { id: "destination", label: "Destination", style: { minWidth: 30 } },
  { id: "rate", label: "Rate", style: { minWidth: 30 }, prefix: "$ " },
  { id: "initialPulse", label: "Initial Pulse", style: { minWidth: 30 } },
  {
    id: "subsequentPulse",
    label: "Subsequent Pulse",
    style: { minWidth: 30 },
  },
  {
    id: "connectionCharge",
    label: "Connection Charge",
    style: { minWidth: 30 },
    prefix: "$ ",
  },
  {
    id: "actions",
    name: "Actions",
    style: { minWidth: 70 },
    align: "right",
  },
];

function RateList({
  rowsPerPage,
  getList,
  setSearch,
  clearSearchField,
  children,
  setQuery,
  ...otherProps
}) {
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    console.log("params", params);
    if (params && params.type && params.parentId) {
      setQuery({ type: params.type, parentId: params.parentId });
    } else {
      navigate(-1);
    }
  }, [params]);

  const addEditRef = useRef(null);

  const [editData, setEditData] = useState("");

  return (
    <EnhancedTable
      title={MODULE_NAME + ` ( ${params.providerName} )`}
      urlPrefix="rate-list"
      pagination={children}
      getList={getList}
      add={true}
      addEditRef={addEditRef}
      columns={columns}
      setEditData={setEditData}
      {...otherProps}
    >
      <ProviderAddEdit
        clearSearchField={clearSearchField}
        setSearch={setSearch}
        editData={editData}
        getList={getList}
        rowsPerPage={rowsPerPage}
        ref={addEditRef}
      />
    </EnhancedTable>
  );
}
export default withPagination(RateList, "rate-list/list", {
  title: MODULE_NAME,
  queryOnly: true,
});
