import CommonTable from 'layout/CommonTable';
import ProviderAddEdit from './ProviderAddEdit';

const MODULE_NAME = 'Providers';
const columns = [
  { id: 'name', label: 'Provider' },
  {
    id: 'outboundDomain',
    label: 'Domain'
  },
  {
    id: 'outboundProxy',
    label: 'Proxy'
  },
  {
    id: 'outboundPort',
    label: 'Port'
  },
  {
    id: 'outboundUserName',
    label: 'Username'
  },
  {
    id: 'outboundActiveGateway',
    label: 'Gateway',
    component: 'toggle',
    endpoint: 'active-gateway'
  },
  {
    id: 'isActive',
    label: 'Active'
  },
  {
    id: 'actions',
    name: 'Actions'
  }
];

function Provider(props) {
  return (
    <CommonTable title={MODULE_NAME} urlPrefix="provider" rateList={true} columns={columns}>
      <ProviderAddEdit type="addEdit" />
    </CommonTable>
  );
}

export default Provider;
