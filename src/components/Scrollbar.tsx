import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { raised, sunken, win95 } from '../theme/win95Theme';

type Axis = 'vertical' | 'horizontal';

type Props = {
  viewportRef: React.RefObject<HTMLElement | null>;
  axis: Axis;
  visible: boolean;
  hasOtherScrollbar?: boolean;
};

const SCROLLBAR_SIZE = 17;
const BUTTON_SIZE = 17;
const MIN_THUMB_SIZE = 24;
const STEP = 36;

export default function Win95Scrollbar({
  viewportRef,
  axis,
  visible,
  hasOtherScrollbar = false,
}: Props) {
  const [metrics, setMetrics] = React.useState({
    scrollSize: 0,
    clientSize: 0,
    scrollPos: 0,
  });

  const isVertical = axis === 'vertical';

  const updateMetrics = React.useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;

    setMetrics({
      scrollSize: isVertical ? el.scrollHeight : el.scrollWidth,
      clientSize: isVertical ? el.clientHeight : el.clientWidth,
      scrollPos: isVertical ? el.scrollTop : el.scrollLeft,
    });
  }, [isVertical, viewportRef]);

  React.useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    updateMetrics();

    const resizeObserver = new ResizeObserver(updateMetrics);
    resizeObserver.observe(el);

    if (el.firstElementChild) {
      resizeObserver.observe(el.firstElementChild);
    }

    el.addEventListener('scroll', updateMetrics, { passive: true });

    return () => {
      resizeObserver.disconnect();
      el.removeEventListener('scroll', updateMetrics);
    };
  }, [updateMetrics, viewportRef]);

  if (!visible) return null;

  const maxScroll = Math.max(1, metrics.scrollSize - metrics.clientSize);
  const trackSize = Math.max(1, metrics.clientSize - BUTTON_SIZE * 2);
  const thumbSize = Math.max(
    MIN_THUMB_SIZE,
    Math.floor((metrics.clientSize / metrics.scrollSize) * trackSize)
  );
  const thumbTravel = Math.max(1, trackSize - thumbSize);
  const thumbOffset = Math.floor((metrics.scrollPos / maxScroll) * thumbTravel);

  const scrollBy = (amount: number) => {
    viewportRef.current?.scrollBy({
      [isVertical ? 'top' : 'left']: amount,
      behavior: 'auto',
    });
  };

  const scrollToRatio = (clientPosition: number) => {
    const el = viewportRef.current;
    if (!el) return;

    const ratio = Math.min(Math.max(clientPosition / thumbTravel, 0), 1);
    const next = ratio * maxScroll;

    if (isVertical) {
      el.scrollTop = next;
    } else {
      el.scrollLeft = next;
    }
  };

  const handleThumbPointerDown = (event: React.PointerEvent) => {
    event.preventDefault();

    const startPointer = isVertical ? event.clientY : event.clientX;
    const startOffset = thumbOffset;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const currentPointer = isVertical ? moveEvent.clientY : moveEvent.clientX;
      scrollToRatio(startOffset + currentPointer - startPointer);
    };

    const handlePointerUp = () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        backgroundColor: win95.face,
        boxShadow: sunken,
        display: 'flex',
        zIndex: 2,

        ...(isVertical
          ? {
              top: 2,
              right: 2,
              bottom: hasOtherScrollbar ? `${SCROLLBAR_SIZE + 2}px` : 2,
              width: SCROLLBAR_SIZE,
              flexDirection: 'column',
            }
          : {
              left: 2,
              right: hasOtherScrollbar ? `${SCROLLBAR_SIZE + 2}px` : 2,
              bottom: 2,
              height: SCROLLBAR_SIZE,
              flexDirection: 'row',
            }),
      }}
    >
      <ScrollButton
        label={isVertical ? '▲' : '◄'}
        onClick={() => scrollBy(-STEP)}
      />

      <Box
        sx={{
          position: 'relative',
          flex: 1,
          minWidth: 0,
          minHeight: 0,
          backgroundColor: win95.face,
        }}
        onPointerDown={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          const pointer = isVertical
            ? event.clientY - rect.top
            : event.clientX - rect.left;

          const beforeThumb = pointer < thumbOffset;
          scrollBy(beforeThumb ? -metrics.clientSize : metrics.clientSize);
        }}
      >
        <Box
          onPointerDown={handleThumbPointerDown}
          sx={{
            position: 'absolute',
            backgroundColor: win95.face,
            boxShadow: raised,
            cursor: 'default',

            ...(isVertical
              ? {
                  left: 0,
                  right: 0,
                  top: thumbOffset,
                  height: thumbSize,
                }
              : {
                  top: 0,
                  bottom: 0,
                  left: thumbOffset,
                  width: thumbSize,
                }),
          }}
        />
      </Box>

      <ScrollButton
        label={isVertical ? '▼' : '►'}
        onClick={() => scrollBy(STEP)}
      />
    </Box>
  );
}

function ScrollButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <IconButton
      size="small"
      onClick={onClick}
      sx={{
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        minWidth: BUTTON_SIZE,
        p: 0,
        fontSize: 9,
        lineHeight: 1,
      }}
    >
      {label}
    </IconButton>
  );
}
