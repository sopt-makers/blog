import clsx from 'clsx';
import { FC, ReactNode } from 'react';

interface ChipProps {
  children: ReactNode;
  active?: boolean;
}

const Chip: FC<ChipProps> = ({ children, active = false }) => {
  return (
    <div
      className={clsx(
        'cursor-pointer rounded-[12px] border border-black40 bg-black80 px-[12px] py-[8px] text-[16px] text-gray10 transition',
        'hover:bg-black60',
        active && 'border-gray-10 bg-gray10 text-black100',
      )}
    >
      {children}
    </div>
  );
};

export default Chip;
