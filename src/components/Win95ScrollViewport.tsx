import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import { raised, sunken, win95 } from '../theme/win95Theme';

import type { SxProps, Theme } from '@mui/material/styles';

type Win95ScrollViewportProps = Omit<BoxProps, 'width' | 'height'> & {
  children: React.ReactNode;
  width?: React.CSSProperties['width'];
  height?: React.CSSProperties['height'];
  maxHeight?: React.CSSProperties['maxHeight'];
  sx?: SxProps<Theme>;
};

export default function Win95ScrollViewport({
  children,
  width = '100%',
  height = '100%',
  maxHeight,
  sx,
  ...props
}: Win95ScrollViewportProps) {
  return (
    <Box
      {...props}
      sx={{
        width,
        height,
        maxHeight,
        minHeight: 0,
        minWidth: 0,
        overflow: 'auto',
        backgroundColor: win95.light,
        color: win95.text,
        boxShadow: sunken,
        p: '2px',

        scrollbarWidth: 'auto',
        scrollbarColor: `${win95.shadow} ${win95.face}`,

        '&::-webkit-scrollbar': {
          width: 18,
          height: 18,
          backgroundColor: win95.face,
        },

        '&::-webkit-scrollbar-track': {
          backgroundColor: win95.face,
          boxShadow: sunken,
        },

        '&::-webkit-scrollbar-thumb': {
          backgroundColor: win95.face,
          boxShadow: raised,
          minHeight: 24,
        },

        '&::-webkit-scrollbar-thumb:active': {
          boxShadow: sunken,
        },

        '&::-webkit-scrollbar-corner': {
          backgroundColor: win95.face,
        },

        '&::-webkit-scrollbar-button': {
          width: 18,
          height: 18,
          backgroundColor: win95.face,
          boxShadow: raised,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        },

        '&::-webkit-scrollbar-button:active': {
          boxShadow: sunken,
        },

        '&::-webkit-scrollbar-button:vertical:decrement': {
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='7' height='4'%3E%3Cpath fill='black' d='M3.5 0 7 4H0z'/%3E%3C/svg%3E")`,
        },

        '&::-webkit-scrollbar-button:vertical:increment': {
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='7' height='4'%3E%3Cpath fill='black' d='M0 0h7L3.5 4z'/%3E%3C/svg%3E")`,
        },

        '&::-webkit-scrollbar-button:horizontal:decrement': {
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='7'%3E%3Cpath fill='black' d='M4 0v7L0 3.5z'/%3E%3C/svg%3E")`,
        },

        '&::-webkit-scrollbar-button:horizontal:increment': {
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='7'%3E%3Cpath fill='black' d='M0 0v7l4-3.5z'/%3E%3C/svg%3E")`,
        },

        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
