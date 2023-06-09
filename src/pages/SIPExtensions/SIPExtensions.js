import CommonTable from 'layout/CommonTable';
import SIPExtensionsAddEdit from './SIPExtensionsAddEdit';

const MODULE_NAME = 'System Config';

const columns = [
  { id: 'sipDomain', label: 'Domain' },
  { id: 'proxyServerIp', label: 'IP' },
  {
    id: 'proxyServerPort',
    label: 'Port'
  },
  {
    id: 'sipTransport',
    label: 'Transport'
  },
  {
    id: 'actions',
    name: 'Actions',
    align: 'right'
  }
];

function City(props) {
  return (
    <CommonTable
      title={MODULE_NAME}
      urlPrefix="sip"
      columns={columns}
      AddEdit={SIPExtensionsAddEdit}
    >
      <SIPExtensionsAddEdit type="addEdit" />
    </CommonTable>
  );
}
export default City;
