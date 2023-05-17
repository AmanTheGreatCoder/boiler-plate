import { useRef, useState } from "react";
import CountryAddEdit from "./CountryAddEdit";
import withPagination from "higher order components/withPagination/withPagination";
import { MODULE_NAME } from "./Values";
import ImportFile from "components/ImportFile/ImportFile";
import EnhancedTable from "components/EnhancedTable";

const columns = [
  {
    id: "countryName",
    label: "Country Name",
    style: { minWidth: 30, maxWidth: 150 },
  },
  {
    id: "countryCode",
    label: "Dial Code",
    style: { minWidth: 100, maxWidth: 150 },
    prefix: "+",
  },
  { id: "flag", label: "Flag", style: { minWidth: 30, maxWidth: 150 } },
  {
    id: "isActive",
    label: "Active",
  },
  {
    id: "actions",
    name: "Actions",
    style: { minWidth: 70, maxWidth: 150 },
    align: "right",
  },
];

function Country(props) {
  const {
    rowsPerPage,
    getList,
    setSearch,
    clearSearchField,
    children,
    ...otherProps
  } = props;
  const addEditRef = useRef(null);
  const importRef = useRef(null);
  const [editData, setEditData] = useState("");

  return (
    <EnhancedTable
      title={MODULE_NAME}
      urlPrefix="country"
      pagination={children}
      getList={getList}
      add={true}
      addEditRef={addEditRef}
      importRef={importRef}
      columns={columns}
      setEditData={setEditData}
      {...otherProps}
    >
      <CountryAddEdit
        clearSearchField={clearSearchField}
        setSearch={setSearch}
        editData={editData}
        getList={getList}
        rowsPerPage={rowsPerPage}
        ref={addEditRef}
      />
      <ImportFile
        sampleUrl={
          "https://mobile-api2.alpha-dev.streamspace.ai/sample/sample_import_country.csv"
        }
        clearSearchField={clearSearchField}
        getList={getList}
        rowsPerPage={rowsPerPage}
        setSearch={setSearch}
        title={MODULE_NAME}
        url="country/import"
        ref={importRef}
      />
    </EnhancedTable>
  );
}
export default withPagination(Country, "country/list", {
  imageRequired: true,
  title: MODULE_NAME,
});
