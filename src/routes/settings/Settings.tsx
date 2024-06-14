import * as React from "react";
import { useEffect, useState } from "react";

import { getSettings, saveSettings } from "../../services/settingsService";
import { Box, FormGroup, FormControlLabel, Switch } from "@mui/material";

export default function Settings() {
  const [userSettings, setUserSettings] = useState({});

  const reloadSettings = async () => {
    const settings = await getSettings();
    setUserSettings(settings);
  };

  const setShowReverse = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSettings = { ...userSettings, show_reverse: e.target.checked };
    await saveSettings(newSettings);
    reloadSettings();
  };

  useEffect(() => {
    reloadSettings();
  }, []);

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            checked={userSettings["show_reverse"] ?? false}
            onChange={setShowReverse}
          />
        }
        label="Show Reverse Cards"
      />
    </FormGroup>
  );
}
