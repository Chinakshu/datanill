import React, { useEffect, useState } from 'react';
import web3 from './web3';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from './config';
import { AbiItem } from 'web3-utils';
import Button from '@mui/material/Button';
import CopyableString from './nillion/components/CopyableString';

// Add null check for web3
if (!web3) {
  throw new Error('web3 is null');
}

interface Campaign {
  id: number;
  name: string;
  UID: string;
  budget: string;
  numTasks: number;
  payPerTask: string;
  active: boolean;
  remainingBudget: string;
  entryCount: number;
}

const ListCampaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [storeId, setStoreId] = useState('');
  const [dataName, setDataName] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const contract = web3 ? new web3.eth.Contract(CONTRACT_ABI as AbiItem[], CONTRACT_ADDRESS) : null;
      const campaignCount = contract ? Number(await contract.methods.campaignCount().call()) : 0;

      const campaignData: Campaign[] = [];
      for (let i = 1; i <= campaignCount; i++) {
        const campaign: any[] = contract ? await contract.methods.getCampaignDetails(i).call() : [];
        const budget = web3 ? web3.utils.fromWei(campaign[2], 'ether') : '';
        const payPerTask = web3 ? web3.utils.fromWei(campaign[4], 'ether') : '';
        const remainingBudget = web3 ? web3.utils.fromWei(campaign[6], 'ether') : '';
        campaignData.push({
          id: i,
          name: campaign[0],
          UID: campaign[1],
          budget,
          numTasks: campaign[3],
          payPerTask,
          active: campaign[5],
          remainingBudget,
          entryCount: campaign[7]
        });
      }
      setCampaigns(campaignData);
    };

    fetchCampaigns();
  }, []);

  const dummyCampaigns = [
    {
      id: 1,
      name: 'Horror Stories',
      UID: '3EjqdKU4Vx7B27AJiiMSpYYDHWxcqF3aCUgyj6BVCLQX2vQjMhVpzTepLF4g7xhYHaJHVSJ2M34upHACanMjWewM',
      budget: '10',
      numTasks: 5,
      payPerTask: '2',
      active: true,
      remainingBudget: '8',
      entryCount: 3,
    },
    {
      id: 2,
      name: 'Shopping List',
      UID: '4FXoK7HqVrEtVpgsVK1QHo5iV74WkAZy5t3AmHEGVWW1XCax15cyYFkXgYud6QKytBacGUtK4FE4yr7v2YXAiZrb',
      budget: '20',
      numTasks: 10,
      payPerTask: '1.5',
      active: false,
      remainingBudget: '15',
      entryCount: 5,
    },
    {
      id: 3,
      name: 'Medical History',
      UID: '3qkcPdcD9sDC9PVyVvmj2K1npGjrqUBFLLV1JwyPEhR8XBvY2x9Q42nkaxvi2cafLxBFtTp4w8cjwk1uQp979EGo',
      budget: '15',
      numTasks: 5,
      payPerTask: '2.5',
      active: true,
      remainingBudget: '10',
      entryCount: 4,
    },
  ];

  const campaignsToDisplay = campaigns.length > 0 ? campaigns : dummyCampaigns;

  const handleSubmitEntry = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setShowPopup(true);
  };

  const handlePopupSubmit = () => {
    // Dummy submit logic
    console.log('Store ID:', storeId);
    console.log('Data Name:', dataName);
    setShowPopup(false);
  };

  return (
    <div className=" p-6">
      <h2 className='text-6xl mb-6'>Active Campaigns</h2>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {campaignsToDisplay.map((campaign) => (
          <li key={campaign.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">{campaign.name}</h3>
            <p>Campaign ID: <CopyableString
        text={campaign.UID}
        copyText={campaign.UID}
        shouldTruncate={true}
        truncateLength={10}
        descriptor="Campaign ID"
      /></p>    
            <p>Budget: {campaign.budget} ETH</p>
            <p>Number of Tasks: {campaign.numTasks}</p>
            <p>Pay Per Task: {campaign.payPerTask} ETH</p>
            <p>Active: {campaign.active ? 'Yes' : 'No'}</p>
            <p>Remaining Budget: {campaign.remainingBudget} ETH</p>
            <p>Entries Submitted: {campaign.entryCount}</p>
            <Button onClick={() => handleSubmitEntry(campaign)} variant="contained" color="primary">
        Submit Entry
          </Button>
          </li>
        ))}
      </ul>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Submit Entry for {selectedCampaign?.name}</h3>
            <label className="block mb-2">
              Store ID:
              <input
                type="text"
                className="border p-2 w-full"
                value={storeId}
                onChange={(e) => setStoreId(e.target.value)}
              />
            </label>
            <label className="block mb-4">
              Data Name:
              <input
                type="text"
                className="border p-2 w-full"
                value={dataName}
                onChange={(e) => setDataName(e.target.value)}
              />
            </label>
            <button
              className="bg-blue-500 text-white p-2 rounded"
              onClick={handlePopupSubmit}
            >
              Submit
            </button>
            <button
              className="bg-red-500 text-white p-2 rounded ml-2"
              onClick={() => setShowPopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListCampaigns;