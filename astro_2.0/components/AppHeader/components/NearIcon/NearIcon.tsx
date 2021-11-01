import cn from 'classnames';
import { VFC } from 'react';

import styles from './NearIcon.module.scss';

interface NearIconProps {
  className?: string;
}

export const NearIcon: VFC<NearIconProps> = ({ className }) => {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(styles.root, className)}
    >
      <circle cx="19" cy="19" r="18.5" className={styles.circle} />
      <path
        className={styles.icon}
        d="M24.4384 11.0621L20.6769 16.5738C20.6159 16.6534 20.5877 16.7528 20.598 16.852C20.6083 16.9513 20.6562 17.043 20.7322 17.1087C20.8081 17.1745 20.9065 17.2094 21.0075 17.2065C21.1085 17.2035 21.2046 17.1629 21.2765 17.0929L24.978 13.9354C24.9994 13.916 25.026 13.9033 25.0546 13.8988C25.0832 13.8943 25.1125 13.8981 25.1389 13.9099C25.1652 13.9217 25.1876 13.9408 25.203 13.965C25.2185 13.9892 25.2264 14.0173 25.2258 14.0459V23.9703C25.2255 24.0004 25.2159 24.0297 25.1983 24.0543C25.1807 24.0789 25.1559 24.0976 25.1272 24.1079C25.0985 24.1182 25.0673 24.1196 25.0378 24.1119C25.0083 24.1043 24.9819 24.0879 24.962 24.065L13.7695 10.843C13.5908 10.6307 13.3673 10.4596 13.1145 10.3417C12.8618 10.2237 12.586 10.1618 12.3065 10.1602H11.9167C11.4084 10.1602 10.9208 10.3596 10.5614 10.7145C10.2019 11.0694 10 11.5508 10 12.0527V26.0286C10 26.5305 10.2019 27.0119 10.5614 27.3668C10.9208 27.7217 11.4084 27.9211 11.9167 27.9211C12.2443 27.921 12.5663 27.8381 12.8522 27.6802C13.1381 27.5224 13.3782 27.2948 13.5496 27.0192L17.3111 21.5074C17.3721 21.4279 17.4003 21.3285 17.39 21.2292C17.3797 21.13 17.3318 21.0383 17.2558 20.9725C17.1799 20.9068 17.0815 20.8718 16.9805 20.8748C16.8795 20.8777 16.7834 20.9183 16.7115 20.9884L13.01 24.1459C12.9887 24.1652 12.962 24.1779 12.9334 24.1825C12.9049 24.187 12.8755 24.1831 12.8492 24.1714C12.8228 24.1596 12.8005 24.1404 12.785 24.1163C12.7695 24.0921 12.7616 24.064 12.7622 24.0354V14.1209C12.7625 14.0907 12.7721 14.0614 12.7897 14.0368C12.8073 14.0122 12.8321 13.9935 12.8608 13.9832C12.8895 13.9729 12.9207 13.9715 12.9502 13.9792C12.9797 13.9869 13.0062 14.0032 13.026 14.0261L24.2185 27.2481C24.3986 27.4585 24.6229 27.6275 24.876 27.7434C25.129 27.8593 25.4046 27.9193 25.6835 27.9191H26.0833C26.335 27.9191 26.5842 27.8702 26.8168 27.775C27.0493 27.6799 27.2606 27.5405 27.4386 27.3648C27.6166 27.1891 27.7578 26.9804 27.8541 26.7508C27.9504 26.5212 28 26.2751 28 26.0266V12.0527C28 11.8032 27.95 11.5561 27.853 11.3257C27.7559 11.0953 27.6136 10.8862 27.4344 10.7103C27.2551 10.5344 27.0424 10.3952 26.8085 10.3008C26.5745 10.2064 26.324 10.1586 26.0713 10.1602C25.7437 10.1602 25.4217 10.2431 25.1358 10.401C24.8499 10.5589 24.6098 10.7865 24.4384 11.0621Z"
      />
    </svg>
  );
};
