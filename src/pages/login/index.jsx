import { useState } from 'react';
import { Form, Button, Input, Row } from 'antd';
import styled from 'styled-components';
import { LoginApi } from '@/services/login';
import { useNavigate } from 'react-router-dom';
import useUserStore from '@/store';

const LoginForm = styled.div`
  .form {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 420px;
    height: 420px;
    transform: translate(-50%, -70%);
    padding: 36px;
    box-shadow: 0 0 100px rgba(0, 0, 0, 0.08);

    button {
      width: 100%;
    }

    p {
      color: rgb(204, 204, 204);
      text-align: center;
      margin-top: 16px;
      width: 100%;
    }
  }
  .loginimg {
    position: absolute;
    top: 2%;
    left: 1%;
    border-style: none;
  }
  .logo {
    text-align: center;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    margin-bottom: 24px;

    img {
      width: 40px;
      margin-right: 8px;
    }

    span {
      vertical-align: text-bottom;
      font-size: 16px;
      text-transform: uppercase;
      display: inline-block;
    }
  }
`;

const Login = () => {
  const [loginLoading, setLoginLoading] = useState(false);
  const [form] = Form.useForm();
  const navigation = useNavigate();
  const updateLoginState = useUserStore((state) => state.updateLoginState);

  const handleOk = () => {
    setLoginLoading(true);
    form.validateFields().then((values) => {
      LoginApi(values)
        .then(async (res) => {
          if (res.success) {
            await updateLoginState(true);
            localStorage.setItem('userInfo', JSON.stringify(res.data));
            // 更新登录状态
            navigation('/');
          }
        })
        .finally(() => {
          setLoginLoading(false);
        });
    });
  };

  return (
    <LoginForm>
      <img alt={'logo'} src="/logo.png" className="loginimg" />
      <div className="form">
        <div className="logo">
          <span>签证图片识别</span>
        </div>
        <Form form={form}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名',
              },
            ]}
          >
            <Input size="large" onPressEnter={handleOk} placeholder="登录账号" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
          >
            <Input
              size="large"
              onPressEnter={handleOk}
              type="password"
              placeholder="登录账号"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Row>
            <Button type="primary" size="large" onClick={handleOk} loading={loginLoading}>
              登 录
            </Button>
            <p>
              <span>@copyright Rain</span>
            </p>
          </Row>
        </Form>
      </div>
    </LoginForm>
  );
};

export default Login;
