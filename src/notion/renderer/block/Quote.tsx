import { PickNotionBlock } from '@/notion/types';
import { FC } from 'react';
import RichTextRenderer from '../RichTextRenderer';

interface QuoteProps {
  block: PickNotionBlock<'quote'>;
}

const Quote: FC<QuoteProps> = ({ block }) => {
  return (
    <RichTextRenderer
      richText={block.quote.rich_text}
      render={(children) => (
        <div className='pb-[24px] pt-[12px] text-[17px]'>
          <div className='mb-[4px]'>{quoteIcon}</div>
          {children}
        </div>
      )}
    />
  );
};

export default Quote;

const quoteIcon = (
  <svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g clipPath='url(#clip0_193_1456)'>
      <path
        d='M6.29939 4.65C6.37818 4.59091 6.46784 4.54791 6.56325 4.52346C6.65866 4.49902 6.75795 4.49361 6.85545 4.50754C6.95295 4.52147 7.04676 4.55446 7.13151 4.60464C7.21626 4.65482 7.29029 4.72121 7.34939 4.8C7.40848 4.87879 7.45148 4.96845 7.47592 5.06386C7.50037 5.15927 7.50578 5.25856 7.49185 5.35607C7.47792 5.45357 7.44492 5.54737 7.39474 5.63212C7.34456 5.71687 7.27818 5.79091 7.19939 5.85C6.02639 6.72975 5.35439 7.5855 4.96964 8.3325C5.49791 8.19651 6.05544 8.22848 6.56471 8.42397C7.07398 8.61945 7.50969 8.96873 7.8113 9.42327C8.1129 9.87781 8.26541 10.415 8.24762 10.9602C8.22984 11.5054 8.04263 12.0316 7.71204 12.4655C7.38145 12.8994 6.92389 13.2195 6.40296 13.3814C5.88203 13.5433 5.32361 13.5388 4.80532 13.3687C4.28703 13.1986 3.83462 12.8712 3.51097 12.4321C3.18732 11.993 3.0085 11.4639 2.99939 10.9185C2.90328 9.99745 3.03409 9.06687 3.38039 8.208C3.82814 7.0785 4.70339 5.847 6.29939 4.65ZM13.0494 4.65C13.1282 4.59091 13.2178 4.54791 13.3133 4.52346C13.4087 4.49902 13.508 4.49361 13.6055 4.50754C13.703 4.52147 13.7968 4.55446 13.8815 4.60464C13.9663 4.65482 14.0403 4.72121 14.0994 4.8C14.1585 4.87879 14.2015 4.96845 14.2259 5.06386C14.2504 5.15927 14.2558 5.25856 14.2418 5.35607C14.2279 5.45357 14.1949 5.54737 14.1447 5.63212C14.0946 5.71687 14.0282 5.79091 13.9494 5.85C12.7764 6.72975 12.1044 7.5855 11.7196 8.3325C12.2479 8.19651 12.8054 8.22848 13.3147 8.42397C13.824 8.61945 14.2597 8.96873 14.5613 9.42327C14.8629 9.87781 15.0154 10.415 14.9976 10.9602C14.9798 11.5054 14.7926 12.0316 14.462 12.4655C14.1314 12.8994 13.6739 13.2195 13.153 13.3814C12.632 13.5433 12.0736 13.5388 11.5553 13.3687C11.037 13.1986 10.5846 12.8712 10.261 12.4321C9.93732 11.993 9.7585 11.4639 9.74939 10.9185C9.65328 9.99745 9.78409 9.06687 10.1304 8.208C10.5789 7.0785 11.4534 5.847 13.0494 4.65Z'
        fill='#989BA0'
      />
    </g>
    <defs>
      <clipPath id='clip0_193_1456'>
        <rect width='18' height='18' fill='white' />
      </clipPath>
    </defs>
  </svg>
);
