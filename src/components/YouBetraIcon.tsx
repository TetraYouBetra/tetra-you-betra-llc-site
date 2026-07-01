import SvgIcon from '@mui/material/SvgIcon';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function YouBetraIcon() {
  return (
    <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
      <Stack
        component="div"
        direction="row"
        sx={{ alignItems: 'center' }}
        spacing={2} // 16px
      >
        <SvgIcon sx={{ height: 32, width: 'auto', mr: 2 }}>
          <svg
            width="512"
            height="512"
            viewBox="0 0 512 512"
            version="1.1"
            id="svg13"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs id="defs10">
              <filter
                id="glow"
                x="-0.038702384"
                y="-0.041666667"
                width="1.0774048"
                height="1.0833333"
              >
                <feGaussianBlur
                  stdDeviation="5"
                  result="blur"
                  id="feGaussianBlur1"
                />
                <feMerge id="feMerge2">
                  <feMergeNode in="blur" id="feMergeNode1" />
                  <feMergeNode in="SourceGraphic" id="feMergeNode2" />
                </feMerge>
              </filter>
              <linearGradient
                id="pinkPurple"
                x1="97.657565"
                y1="89.82407"
                x2="258.50532"
                y2="250.67182"
                gradientTransform="matrix(1.0444659,0,0,0.95742711,-57.73482,0)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#ff2bd6" id="stop2" />
                <stop offset="100%" stopColor="#7a2cff" id="stop3" />
              </linearGradient>
              <linearGradient
                id="cyanBlue"
                x1="392.54511"
                y1="89.82407"
                x2="231.69736"
                y2="250.67182"
                gradientTransform="scale(1.0444659,0.95742711)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#22f7ff" id="stop4" />
                <stop offset="100%" stopColor="#1677ff" id="stop5" />
              </linearGradient>
              <linearGradient
                id="limeGreen"
                x1="97.657565"
                y1="444.94249"
                x2="258.50532"
                y2="284.09473"
                gradientTransform="matrix(1.0444659,0,0,0.95742711,-57.73482,0)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#b6ff00" id="stop6" />
                <stop offset="100%" stopColor="#4dff8a" id="stop7" />
              </linearGradient>
              <linearGradient
                id="orangePink"
                x1="392.54511"
                y1="444.94249"
                x2="231.69736"
                y2="284.09473"
                gradientTransform="scale(1.0444659,0.95742711)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#ff2bd6" id="stop8" />
                <stop offset="45%" stopColor="#ff5b3d" id="stop9" />
                <stop offset="100%" stopColor="#ffcc33" id="stop10" />
              </linearGradient>
            </defs>
            <g
              filter="url(#glow)"
              strokeWidth="4"
              strokeLinejoin="round"
              id="g13"
              transform="matrix(1.2929856,0,0,1.2929856,-38.280572,-73.680936)"
            >
              <path
                d="m 46.26518,88 h 50 l 84,84 30,-30 v 96 h -96 l 30,-30 -98,-98 z"
                fill="url(#pinkPurple)"
                stroke="#ff6df0"
                id="path10"
                style={{ fill: 'url(#pinkPurple)' }}
              />
              <path
                d="m 408,88 h -50 l -84,84 -30,-30 v 96 h 96 l -30,-30 98,-98 z"
                fill="url(#cyanBlue)"
                stroke="#63f7ff"
                id="path11"
                style={{ fill: 'url(#cyanBlue)' }}
              />
              <path
                d="m 46.26518,424 h 50 l 84,-84 30,30 v -96 h -96 l 30,30 -98,98 z"
                fill="url(#limeGreen)"
                stroke="#cfff36"
                id="path12"
                style={{ fill: 'url(#limeGreen)' }}
              />
              <path
                d="m 408,424 h -50 l -84,-84 -30,30 v -96 h 96 l -30,30 98,98 z"
                fill="url(#orangePink)"
                stroke="#ffcf58"
                id="path13"
                style={{ fill: 'url(#orangePink)' }}
              />
            </g>
          </svg>
        </SvgIcon>
        <Typography
          variant="h1"
          component="span"
          sx={{
            fontSize: '1rem',
            fontWeight: 700,
            letterSpacing: '0.18em',
            whiteSpace: 'nowrap',
            userSelect: 'none',
            background:
              'linear-gradient(90deg, #ffffff 0%, #ffffff 35%, #ff2bd6 55%, #7a2cff 70%, #22d9ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          TETRA YOU BETRA LLC
        </Typography>
      </Stack>
    </a>
  );
}
