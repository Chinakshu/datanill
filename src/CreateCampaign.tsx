import React, { useEffect, useState } from 'react';
import { NillionClient } from '@nillion/client-web';
import StoreSecretForm from './nillion/components/StoreSecretForm';
import RetrieveSecret from './nillion/components/RetrieveSecretForm';
import {
  readStorageForUserAtPage,
  updateStorageForUserAtPage,
} from './nillion/helpers/localStorage';
import UpdateSecretForm from './nillion/components/UpdateSecretForm';
import StoreProgram from './nillion/components/StoreProgramForm';
import ConnectionSection from './nillion/components/campaignconnect';
import { Container, Box, Tabs, Tab, Typography } from '@mui/material';
import CCForm from './campaignform'
import CList from './listcampaign'

export default function Main() {
  const [userkey, setUserKey] = useState<string | null>(null);
  const [client, setClient] = useState<NillionClient | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [partyId, setPartyId] = useState<string | null>(null);
  const [storedSecretInfo, setStoredSecretInfo] = useState<any>({});
  const [localStorageStoredSecrets, setLocalStorageStoredSecrets] =
    useState<any>({});
  const localStoragePageName = 'main-flow';
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    if (userkey && client) {
      setUserId(client.user_id);
      setPartyId(client.party_id);

      const storedItems = readStorageForUserAtPage(
        client.user_id,
        localStoragePageName
      );
      if (storedItems && Object.keys(storedItems).length > 0) {
        setLocalStorageStoredSecrets(storedItems);
        setStoredSecretInfo(storedItems);
      }
    }
  }, [userkey, client]);

  const handleNewStoredSecret = (newSecretInfo: any) => {
    const storeId = newSecretInfo.storeId;

    setStoredSecretInfo((secrets: any) => ({
      ...secrets,
      [storeId]: { ...storedSecretInfo[storeId], ...newSecretInfo },
    }));

    if (userId) {
      updateStorageForUserAtPage(userId, localStoragePageName, {
        ...storedSecretInfo,
        [storeId]: { ...storedSecretInfo[storeId], ...newSecretInfo },
      });
    }
  };

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <div className='flex'>
      <div className='w-2/5 pl-10 pt-6 pr-5 text-mg flex flex-col '>
      <h1 className='text-6xl'>Create Campaign</h1>

      <ConnectionSection
        client={client}
        userkey={userkey}
        setUserKey={setUserKey}
        setClient={setClient}
      />
      <CCForm />
      </div>
      <div className='pl-5 w-3/5 pb-20'>
        <CList />
      </div>
      </div>
  );
}
