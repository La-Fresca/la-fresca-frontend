import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel, { stepLabelClasses } from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import DescriptionIcon from '@mui/icons-material/Description'; // Document icon
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'; // Cooking icon
import LocalShippingIcon from '@mui/icons-material/LocalShipping'; // Delivery icon
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Success icon
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#fff',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#fff',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
      color: '#fff',
    }),
    '& .QontoStepIcon-completedIcon': {
      color: '#fff',
      zIndex: 1,
      fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
  }),
);

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient(136deg, rgb(255,255,0) 0%, rgb(255,215,0) 50%, rgb(255,165,0) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient(136deg, rgb(255,255,0) 0%, rgb(255,215,0) 50%, rgb(255,165,0) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 40,  // Reduced size
  height: 40,  // Reduced size
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient(136deg, rgb(255,255,0) 0%, rgb(255,215,0) 50%, rgb(255,165,0) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient(136deg, rgb(255,255,0) 0%, rgb(255,215,0) 50%, rgb(255,165,0) 100%)',
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <DescriptionIcon />, // Document icon
    2: <RestaurantMenuIcon />, // Cooking icon
    3: <LocalShippingIcon />, // Delivery icon
    4: <CheckCircleIcon />, // Success icon
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const WhiteStepLabel = styled(StepLabel)(({ theme }) => ({
  [`& .${stepLabelClasses.label}`]: {
    color: '#fff', // Set text color to white
  },
  [`& .${stepLabelClasses.active}`]: {
    color: '#fff !important', // Set text color to white when active
  },
  [`& .${stepLabelClasses.completed}`]: {
    color: '#fff !important', // Set text color to white when completed
  },
}));

const LightGrayTime = styled('div')({
  color: '#d3d3d3', // Light gray color
  fontSize: '0.75rem', // Small font size
  textAlign: 'center',
  marginTop: '4px',
});

const steps = ['Order Confirmed', 'Cooking', 'Delivering', 'Delivered'];
const completionTimes = ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM']; // Example times

export default function CustomizedSteppers() {
  return (
    <Stack sx={{ width: '100%' }} spacing={4}>
      <Stepper alternativeLabel activeStep={1} connector={<ColorlibConnector />}>
        {steps.map((label, index) => (
          <Step key={label}>
            <WhiteStepLabel StepIconComponent={ColorlibStepIcon}>
              {label}
              {index < 1 && <LightGrayTime>{completionTimes[index]}</LightGrayTime>}
            </WhiteStepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}
