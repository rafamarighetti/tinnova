import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';

export const SubmitButton = styled('button')`
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 0.975rem;
  background-color: ${'#00c8b3'};
  height: 64px;
  border-radius: 100px;
  color: #ffffff;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;
  margin-top: 36px;
  &:hover {
    opacity: 0.7
  }

  &.${buttonUnstyledClasses.active} {
     background-color: ${'#00c8b3'};
     color: #ffffff;
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
    background-color: ${'#00c8b3'};
    color: #ffffff;
  }

  &.${buttonUnstyledClasses.disabled} {
    background-color: ${'#f6f6f6'};
    color: '#dddcdc'
    cursor: not-allowed;
  }
`;