import CommonTable from 'layout/CommonTable';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RateListAddEdit from './RateListAddEdit';

const MODULE_NAME = 'Rate List';

const columns = [
  { id: 'dialCode', label: 'Dial Code', prefix: '+' },
  { id: 'destination', label: 'Destination' },
  { id: 'rate', label: 'Rate', prefix: '$ ' },
  { id: 'initialPulse', label: 'Initial Pulse' },
  {
    id: 'subsequentPulse',
    label: 'Subsequent Pulse'
  },
  {
    id: 'connectionCharge',
    label: 'Connection Charge',
    prefix: '$ '
  },
  {
    id: 'actions',
    name: 'Actions',
    align: 'right'
  }
];

function RateList(props) {
  const navigate = useNavigate();
  const params = useParams();
  const [initialQuery, setInitialQuery] = useState({});

  useEffect(() => {
    if (params?.type && params?.parentId) {
      setInitialQuery({ type: params.type, parentId: params.parentId });
    } else {
      navigate(-1);
    }
  }, [params]);

  return (
    <CommonTable
      title={MODULE_NAME + ` ( ${params.providerName} )`}
      urlPrefix="rate-list"
      columns={columns}
      initialQuery={initialQuery}
      queryOnly={true}
    >
      <RateListAddEdit type="addEdit" />
    </CommonTable>
  );
}

export default RateList;
