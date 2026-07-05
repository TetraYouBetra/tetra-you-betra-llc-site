import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

type Win95TabItem = {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
};

type Win95TabsProps = {
  value: string;
  tabs: Win95TabItem[];
  onChange: (value: string) => void;
};

function getMobileTabOrder(
  tabs: Win95TabItem[],
  value: string
): Win95TabItem[] {
  const active = tabs.find((tab) => tab.value === value);
  if (!active) return tabs;

  const inactive = tabs.filter((tab) => tab.value !== value);

  // Selected tab is always rendered last so it appears
  // on the bottom/front row like classic Win95 property sheets.
  return [...inactive, active];
}

function getMobileColumnCount(tabCount: number): number {
  if (tabCount <= 4) return 2;
  if (tabCount <= 6) return 3;
  return Math.ceil(tabCount / 2);
}

export default function Win95Tabs({ value, tabs, onChange }: Win95TabsProps) {
  const theme = useTheme();
  const isNarrow = useMediaQuery(theme.breakpoints.down('sm'));

  const orderedTabs = React.useMemo(() => {
    if (!isNarrow) return tabs;
    return getMobileTabOrder(tabs, value);
  }, [isNarrow, tabs, value]);

  const mobileColumns = React.useMemo(
    () => getMobileColumnCount(tabs.length),
    [tabs.length]
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        overflow: 'visible',
      }}
    >
      <Tabs
        value={value}
        variant="standard"
        scrollButtons={false}
        onChange={(_, nextValue) => onChange(nextValue)}
        sx={{
          width: '100%',
          overflow: 'visible',

          '& .MuiTabs-scroller': {
            overflow: 'visible !important',
          },

          '& .MuiTabs-list': {
            display: 'flex',
            flexWrap: isNarrow ? 'wrap' : 'nowrap',
            alignItems: 'flex-end',
            overflow: 'visible',
            width: '100%',
          },

          '& .MuiTab-root': {
            ...(isNarrow && {
              flex: `1 0 ${100 / mobileColumns}%`,
              minWidth: 0,
              maxWidth: 'none',
            }),
          },
        }}
      >
        {orderedTabs.map((tab) => (
          <Tab
            key={tab.value}
            value={tab.value}
            label={tab.label}
            disabled={tab.disabled}
          />
        ))}
      </Tabs>
    </Box>
  );
}
