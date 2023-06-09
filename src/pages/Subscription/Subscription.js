import { AccessTime, CurrencyPound } from '@mui/icons-material';
import SubscriptionAddEdit from './SubscriptionAddEdit';
import CommonTable from 'layout/CommonTable';

const MODULE_NAME = 'Subscriptions';

const columns = [
  { id: 'name', label: 'Name' },
  {
    id: 'amount',
    label: 'Amount',
    prefix: [<CurrencyPound sx={{ fontSize: '18px', mr: 0.5 }} />]
  },
  {
    id: 'totalMinutes',
    label: 'Total Minutes',
    prefix: [<AccessTime sx={{ fontSize: '18px', mr: 0.5 }} />]
  },
  {
    id: 'isActive',
    label: 'Active'
  },
  {
    id: 'actions',
    name: 'Actions',
    align: 'right'
  }
];

function Subscription(props) {
  return (
    <CommonTable
      title={MODULE_NAME}
      urlPrefix="subscription"
      isDelete={false}
      imageRequired={true}
      columns={columns}
    >
      <SubscriptionAddEdit type="addEdit" />
    </CommonTable>
  );
}

export default Subscription;
