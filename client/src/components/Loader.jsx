import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

const Spinner = () => (
  <div className="spinner-wrapper">
    <ThreeDots
      visible={true}
      height="80"
      width="80"
      color="#fff"
      radius="10"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  </div>
);

export default Spinner;
