import { Tooltip, tooltipClasses } from "@mui/material";
import { styled } from '@mui/material/styles';

// Technically a custom tooltip
// Allows HTML within tooltip text for tailwind classes

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: 'rgba(0,0,0,0.75)',
      color: 'rgba(255, 255, 255, 1)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));

  export default HtmlTooltip;