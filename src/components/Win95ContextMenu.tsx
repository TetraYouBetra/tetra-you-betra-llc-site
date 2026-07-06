import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { raised, sunken, win95 } from '../theme/win95Theme';

export type ContextMenuPosition = {
  mouseX: number;
  mouseY: number;
};

export type Win95ContextMenuItem =
  | {
      type?: 'item';
      label: React.ReactNode;
      disabled?: boolean;
      onClick: () => void;
    }
  | {
      type: 'separator';
    };

type Win95ContextMenuProps = {
  position: ContextMenuPosition | null;
  onClose: () => void;
  items: Win95ContextMenuItem[];
  width?: number;
};

export default function Win95ContextMenu({
  position,
  onClose,
  items,
  width = 190,
}: Win95ContextMenuProps) {
  return (
    <Menu
      open={position !== null}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={
        position
          ? {
              top: position.mouseY,
              left: position.mouseX,
            }
          : undefined
      }
      slotProps={{
        paper: {
          sx: {
            width,
            backgroundColor: win95.face,
            backgroundImage: 'none',
            boxShadow: raised,
            border: 'none',
            color: win95.text,
          },
        },
        list: {
          sx: {
            p: '3px',
          },
        },
      }}
    >
      {items.map((item, index) => {
        if (item.type === 'separator') {
          return (
            <Box
              key={`separator-${index}`}
              sx={{ height: 2, my: '3px', boxShadow: sunken }}
            />
          );
        }

        return (
          <MenuItem
            key={`item-${index}`}
            disabled={item.disabled}
            onClick={() => {
              item.onClick();
              onClose();
            }}
            sx={{
              minHeight: 24,
              px: '18px',
              fontSize: 12,
              color: win95.text,

              '&:hover, &.Mui-focusVisible': {
                backgroundColor: win95.title,
                color: win95.titleText,
              },

              '&.Mui-disabled': {
                color: win95.disabledText,
                opacity: 1,
                textShadow: `1px 1px 0 ${win95.light}`,
              },
            }}
          >
            {item.label}
          </MenuItem>
        );
      })}
    </Menu>
  );
}
