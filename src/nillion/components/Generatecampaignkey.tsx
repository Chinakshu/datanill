import React, { useState } from 'react';
import * as nillion from '@nillion/client-web';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { List, ListItem, ListItemText } from '@mui/material';

interface GenerateUserKeyProps {
  setUserKey: (key: string) => void;
  defaultUserKeySeed?: string;
}

const GenerateUserKey: React.FC<GenerateUserKeyProps> = ({
  setUserKey,
  defaultUserKeySeed = '',
}) => {
  const [userKeyBase58, setUserKeyBase58] = useState<string | null>(null);
  const [seed, setSeed] = useState<string>(defaultUserKeySeed);

  const handleGenerateUserKey = async (event: React.FormEvent) => {
    event.preventDefault();
    await nillion.default();
    const userkey = seed
      ? nillion.UserKey.from_seed(seed)
      : nillion.UserKey.generate();
    const userkey_base58 = userkey.to_base58();
    setUserKeyBase58(userkey_base58);
  };

  const handleSetUserKey = (key: string) => {
    setUserKey(key);
  };

  const handleSeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeed(event.target.value);
  };

  return (
    <Box my={2}>
      <h2>Create a new campaign</h2>
      <p>
        Generate a new campaign id. 
      </p>
      <form onSubmit={handleGenerateUserKey}>
        <Box display="flex" alignItems="center">
          <TextField
            type="text"
            value={seed}
            onChange={handleSeedChange}
            placeholder="Campaign Name"
            variant="outlined"
            // fullWidth
            // margin="normal"
            sx={{ mr: 2 }} // Add right margin to the input field
          />
          <Button type="submit" variant="contained" color="primary">
            Generate Campaign ID
          </Button>
        </Box>
      </form>
      {/* commented out until MM Snaps are upgraded for the key lib 2.0 update */}
      {/* <Button onClick={interactWithSnap} variant="contained" color="secondary">
        Get User Key from MetaMask Snaps
      </Button> */}
      {userKeyBase58 && (
        <Box mt={2}>
          <List>
            <ListItem>
              <ListItemText primary={`Generated Campaign Key: ${userKeyBase58}`} />
            </ListItem>
          </List>
          <Button
            onClick={() => handleSetUserKey(userKeyBase58)}
            variant="contained"
            color="primary"
          >
            Connect with Campaign key
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default GenerateUserKey;
