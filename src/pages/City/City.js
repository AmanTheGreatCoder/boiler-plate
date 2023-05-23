import { useRef, useState } from "react";
import CityAddEdit from "./CityAddEdit";
import withPagination from "hoc/withPagination/withPagination";
import APIManager from "utils/APImanager";
import ImportFile from "components/ImportFile/ImportFile";
import CityFilter from "./CityFilter";
import EnhancedTable from "components/EnhancedTable";

const columns = [
  {
    id: "cityName",
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
    id: "actions",
    name: "Actions",
    style: { minWidth: 70, maxWidth: 150 },
    align: "right",
  },
];

function City({
  rowsPerPage,
  getList,
  setSearch,
  setQuery,
  clearSearchField,
  children,
  ...otherProps
}) {
  const addEditRef = useRef(null);
  const importRef = useRef(null);
  const filterRef = useRef(null);
  const [editData, setEditData] = useState("");

  return (
    <EnhancedTable
      title={"Cities"}
      urlPrefix="city"
      pagination={children}
      getList={getList}
      add={true}
      filterRef={filterRef}
      addEditRef={addEditRef}
      columns={columns}
      setEditData={setEditData}
      {...otherProps}
    >
      <CityAddEdit
        clearSearchField={clearSearchField}
        setSearch={setSearch}
        editData={editData}
        getList={getList}
        rowsPerPage={rowsPerPage}
        ref={addEditRef}
      />
      <ImportFile
        sampleUrl={
          "https://mobile-api2.alpha-dev.streamspace.ai/sample/sample_import_city.csv"
        }
        clearSearchField={clearSearchField}
        getList={getList}
        rowsPerPage={rowsPerPage}
        setSearch={setSearch}
        url="city/import"
        ref={importRef}
      />
      <CityFilter
        onFilterChange={(values) => {
          const { cityId, countryId } = values;
          filterRef.current.handleClose();
          setQuery({
            // cityId: cityId?._id || "",
            countryId: countryId?._id || "",
          });
        }}
        onClear={() => {
          filterRef.current.handleClose();
          setQuery(null);
        }}
        ref={filterRef}
      />
    </EnhancedTable>
  );
}
export default withPagination(City, "city/listAll", {
  imageRequired: true,
  title: "Cities",
});
