import React, { useState } from 'react';
import web3 from './web3';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from './config';
import { AbiItem } from 'web3-utils';
import Button from '@mui/material/Button';

const CampaignForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [UID, setUID] = useState<string>('');
  const [budget, setBudget] = useState<number | string>('');
  const [numTasks, setNumTasks] = useState<number | string>('');
  const [payPerTask, setPayPerTask] = useState<number | string>('');
  const [active, setActive] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');
    
    // try {
    //   const accounts = await web3?.eth?.getAccounts();
    //   if (!accounts || accounts.length === 0) {
    //     throw new Error('No accounts found');
    //   }

    //   const contract = web3?.eth ? new web3.eth.Contract(CONTRACT_ABI as AbiItem[], CONTRACT_ADDRESS) : null;

    //   console.log('Submitting transaction...');
    //   if (contract) {
    //     await contract.methods.createCampaign(
    //       name,
    //       UID,
    //       web3.utils.toWei(budget.toString(), 'ether'),
    //       numTasks,
    //       web3.utils.toWei(payPerTask.toString(), 'ether'),
    //       active
    //     ).send({ from: accounts[0] });
    //   }

    //   alert('Campaign created successfully');
    // } catch (error: any) {
    //   console.error('Error details:', error);
    //   setErrorMessage(`Error creating campaign: ${error.message || error}`);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Campaign Name:<br></br>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label><br />
        <label>
          Campaign ID:<br></br>
          <input type="text" value={UID} onChange={(e) => setUID(e.target.value)} required />
        </label><br />
        <label>
          Budget (ETH):<br></br>
          <input type="number" step="0.01" value={budget} onChange={(e) => setBudget(e.target.value)} required />
        </label><br />
        <label>
          Number of Tasks:<br></br>
          <input type="number" value={numTasks} onChange={(e) => setNumTasks(e.target.value)} required />
        </label><br />
        <label>
          Pay/Task:<br></br>
          <input type="number" step="0.01" value={payPerTask} onChange={(e) => setPayPerTask(e.target.value)} required />
        </label><br />
        <label>
          Active:
          <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
        </label><br />
        <Button type="submit" variant="contained" color="primary">
        Create Campaign
          </Button>
      </form>
    </div>
  );
};

export default CampaignForm;
