import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigation = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="对不起, 您访问的页面不存在."
      extra={
        <Button
          type="primary"
          onClick={() => {
            navigation('/');
          }}
        >
          返回首页
        </Button>
      }
    />
  );
};

export default Error;
