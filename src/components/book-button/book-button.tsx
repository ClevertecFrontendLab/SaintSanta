import { ReactNode } from 'react';

import './book-button.scss';

type ButtonProps = {
  isDisabled?: boolean;
  classButton: string;
  children?: ReactNode;
  dataTestId?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Button = ({ isDisabled = false, classButton, onClick, children, dataTestId }: ButtonProps) => (
  <button type='button' className={classButton} onClick={onClick} disabled={isDisabled} data-test-id={dataTestId}>
    {children}
  </button>
);
