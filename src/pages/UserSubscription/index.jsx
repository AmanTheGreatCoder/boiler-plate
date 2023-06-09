import { CurrencyPound, AccessTime } from '@mui/icons-material';
import CommonTable from 'layout/CommonTable';

const columns = [
  { id: 'subId', label: 'ID' },
  { id: 'name', label: 'Name' },
  {
    id: 'phoneNumberId.countryCode.phoneNumber',
    label: 'Phone Number',
    format: 'add',
    prefix: '+'
  },
  {
    id: 'productId.total_minutes',
    label: 'Total Minutes',
    prefix: [<AccessTime sx={{ fontSize: '18px', mr: 0.5 }} />]
  },
  {
    id: 'productId.amount',
    label: 'Amount',
    prefix: [<CurrencyPound sx={{ fontSize: '18px', mr: 0.5 }} />]
  },
  {
    id: 'paymentDate',
    label: 'Payment Date',
    format: 'Date'
  },
  {
    id: 'status',
    label: 'Status'
  }
];

function UserSubscription(props) {
  return (
    <CommonTable
      imageRequired={true}
      title={'User Subscription'}
      urlPrefix="user-subs"
      columns={columns}
    />
  );
}

export default UserSubscription;
