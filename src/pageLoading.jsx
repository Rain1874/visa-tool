import { Spin } from 'antd';

const pageLoading = () => {
  return (
    <div className="w-[100%] h-[100vh] flex justify-center items-center">
      <Spin size="large" />
    </div>
  );
};

export default pageLoading;
