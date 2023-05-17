import { useRef, useState } from "react";
import PhoneNumberAddEdit from "./PhoneNumberAddEdit";
import PhoneFilter from "./PhoneFilter";
import withPagination from "higher order components/withPagination/withPagination";
import { MODULE_NAME } from "./Values";
import { Button } from "@mui/material";
import AssignNumberModal from "./AssignNumberModal";
import ImportFile from "components/ImportFile/ImportFile";
import EnhancedTable from "components/EnhancedTable";

const columns = [
  {
    id: "phoneNumber",
    label: "Phone Number",
    style: { minWidth: 30, maxWidth: 150 },
  },
  {
    id: "providerId.name",
    label: "Provider",
    style: { minWidth: 30, maxWidth: 150 },
  },
  {
    id: "cityId.cityName",
    label: "City Name",
    style: { minWidth: 30, textTransform: "capitalize", maxWidth: 150 },
  },
  {
    id: "countryId.countryName",
    label: "Country Name",
    style: { minWidth: 30, textTransform: "capitalize", maxWidth: 150 },
  },
  {
    id: "isActive",
    label: "Active",
  },
  {
    id: "assignedTo.fullName",
    label: "Assigned To",
    style: { minWidth: 30, textAlign: "center", maxWidth: 150 },
    fallback: (
      <Button size="small" variant="contained">
        Assign
      </Button>
    ),
  },
  {
    id: "actions",
    name: "Actions",
    style: { minWidth: 70, maxWidth: 150 },
    align: "right",
  },
];

function PhoneNumber({
  rowsPerPage,
  getList,
  setSearch,
  clearSearchField,
  children,
  setQuery,
  ...otherProps
}) {
  const addEditRef = useRef(null);
  const importRef = useRef(null);
  const assignModalRef = useRef(null);
  const filterRef = useRef(null);

  const [editData, setEditData] = useState("");

  return (
    <EnhancedTable
      title={MODULE_NAME}
      urlPrefix="phone"
      pagination={children}
      getList={getList}
      add={true}
      addEditRef={addEditRef}
      filterRef={filterRef}
      assignModalRef={assignModalRef}
      columns={columns}
      setEditData={setEditData}
      {...otherProps}
    >
      <PhoneNumberAddEdit
        clearSearchField={clearSearchField}
        setSearch={setSearch}
        editData={editData}
        getList={getList}
        rowsPerPage={rowsPerPage}
        ref={addEditRef}
      />
      <AssignNumberModal
        ref={assignModalRef}
        editData={editData}
        getList={getList}
        clearSearchField={clearSearchField}
        setSearch={setSearch}
        rowsPerPage={rowsPerPage}
      />
      <PhoneFilter
        onFilterChange={(values) => {
          const { cityId, countryId } = values;
          filterRef.current.handleClose();
          setQuery({
            cityId: cityId?._id || "",
            countryId: countryId?._id || "",
          });
        }}
        onClear={() => {
          filterRef.current.handleClose();
          setQuery(null);
        }}
        ref={filterRef}
      />
      <ImportFile
        sampleUrl={
          "https://mobile-api2.alpha-dev.streamspace.ai/sample/sample_import_phone.csv"
        }
        clearSearchField={clearSearchField}
        getList={getList}
        rowsPerPage={rowsPerPage}
        setSearch={setSearch}
        title={MODULE_NAME}
        url="phone/import"
        ref={importRef}
      />
    </EnhancedTable>
  );
}
export default withPagination(PhoneNumber, "phone/list", {
  imageRequired: true,
  title: MODULE_NAME,
});