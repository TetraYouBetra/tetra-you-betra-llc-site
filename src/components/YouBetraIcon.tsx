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
                x="-0.039923388"
                y="-0.039829363"
                width="1.0798468"
                height="1.0796587"
              >
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <linearGradient
                id="pinkPurple"
                x1="52"
                y1="79"
                x2="216"
                y2="243"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#ff2bd6" />
                <stop offset="55%" stopColor="#b414f0" />
                <stop offset="100%" stopColor="#7a2cff" />
              </linearGradient>

              <linearGradient
                id="cyanBlue"
                x1="403"
                y1="79"
                x2="239"
                y2="243"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#22f7ff" />
                <stop offset="55%" stopColor="#00b7ff" />
                <stop offset="100%" stopColor="#1677ff" />
              </linearGradient>

              <linearGradient
                id="limeGreen"
                x1="52"
                y1="430"
                x2="216"
                y2="267"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#b6ff00" />
                <stop offset="55%" stopColor="#8cff00" />
                <stop offset="100%" stopColor="#4dff8a" />
              </linearGradient>

              <linearGradient
                id="orangePink"
                x1="403"
                y1="430"
                x2="239"
                y2="267"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#ff2bd6" />
                <stop offset="45%" stopColor="#ff5b3d" />
                <stop offset="100%" stopColor="#ffcc33" />
              </linearGradient>
            </defs>

            <g
              filter="url(#glow)"
              strokeWidth="4"
              strokeLinejoin="round"
              transform="matrix(1.2929856,0,0,1.2929856,-38.280572,-73.680936)"
            >
              <path
                d="m 52.1534,78.997082 39.172347,-0.0115 94.827653,97.921268 30,-30 v 96 h -96 l 30,-30 -98,-98 z"
                fill="url(#pinkPurple)"
                stroke="#ff6df0"
              />

              <path
                d="m 402.8249,78.997216 -39.17243,-0.0115 -94.82784,97.921264 -30.00005,-30 v 95.99999 h 96.00018 l -30.00005,-29.99999 98.00019,-98 z"
                fill="url(#cyanBlue)"
                stroke="#63f7ff"
              />

              <path
                d="m 52.153657,430.47395 39.172347,0.0111 94.827656,-97.92128 30,29.99999 v -95.9996 h -96 l 30,30.00002 -98.000003,97.99998 z"
                fill="url(#limeGreen)"
                stroke="#cfff36"
              />

              <path
                d="m 402.82504,430.47381 -39.17243,0.0111 -94.82784,-97.9213 -30.00005,30.00001 V 266.5636 h 96.00018 l -30.00005,29.99999 98.00019,98.00003 z"
                fill="url(#orangePink)"
                stroke="#ffcf58"
              />
            </g>
          </svg>
        </SvgIcon>
      </Stack>
    </a>
  );
}
