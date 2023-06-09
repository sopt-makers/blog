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
        'cursor-pointer rounded-[12px] border px-[12px] py-[8px] text-[16px] transition',
        active ? 'border-gray10 bg-gray10 text-black100' : 'border-black40 bg-black80 text-gray10 hover:bg-black60',
      )}
    >
      {children}
    </div>
  );
};

export default Chip;
