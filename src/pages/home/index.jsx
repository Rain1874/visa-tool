/*
 * @Author: zhangxy
 * @email: zhangxy@troy.cn
 * @Date: 2025-01-10 17:05:03
 * @LastEditors: zhangxy
 * @LastEditTime: 2025-01-13 14:53:20
 */

import { Form, Radio, Input, Button, message } from 'antd';
import { useState, useEffect } from 'react';
import { prompt }  from './config';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
// import useUserStore from '@/store';

const Home = () => {
  const [form] = Form.useForm();
  const [text, setText] = useState('');
  const type = Form.useWatch('type', form);
  
  useEffect(() => {
    if(prompt[type]) {
      setText(prompt[type].content);
    }else {
      setText('暂无提示')
    }
  },[type])
  const [typeOptions] = useState([
    {
      label: '退休证',
      value: 'retire',
    },
    {
      label: '自定义',
      value: 'custom',
    },
  ]);
  // 从本地模板生成 Excel 文件
  async function generateExcelFromTemplate(type, data) {
    try {
      // 1. 读取本地模板文件
      const response = await fetch(`/template/${type}.xlsx`); // 如果模板放在 public 文件夹
      const arrayBuffer = await response.arrayBuffer();
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(arrayBuffer);
      // 2. 获取第一个工作表
      const worksheet = workbook.getWorksheet(1);
      // 4. 替换占位符
      worksheet.eachRow((row) => {
        row.eachCell((cell) => {
          if (typeof cell.value === 'string') {
            Object.keys(data).forEach((key) => {
              if (cell.value.includes(`{${key}}`)) {
                cell.value = cell.value.replace(`{${key}}`, data[key]);
              }
            });
          }
        });
      });

      // 5. 导出修改后的文件
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/octet-stream' });
      saveAs(blob, `${type}.xlsx`)
    } catch (error) {
      message.error('生成 Excel 文件失败',error);

    }
  }
  const generate = () => {
    form.validateFields().then((values) => {
      console.log(values)
      const jsonData = {};
      try {
        if(values.json) {
          Object.assign(jsonData, JSON.parse(values.json));
        }
      }catch(e) {
        message.error('JSON格式错误');
        return;
      }
      generateExcelFromTemplate(values.type, jsonData);
        
    })
  }
  return (
    <div className='w-[100%] h-[100vh] flex flex-col items-center pt-5'>
      <Form form={form} 
        layout='horrizontal' 
        initialValues={{ type: 'retire' }}
        style={{ width: 600 }}
      >
        <Form.Item 
          label='类型' 
          name='type'
          rules={[{ required: true, message: '请选择类型' }]}
        >
          <Radio.Group options={typeOptions} />
        </Form.Item>
        <Form.Item 
          label='JSON' 
          name='json'
          rules={[
            { required: true, message: '请选择类型' },
            { validator: (_, value) => {
                if (!value) {
                  // 如果值为空，不进行验证
                  return Promise.resolve();
                }
                try {
                  JSON.parse(value);
                  // 如果解析成功，返回 Promise.resolve()
                  return Promise.resolve();
                } catch (e) {
                  // 如果解析失败，返回 Promise.reject() 并提供错误信息
                  return Promise.reject(new Error('请输入有效的 JSON 格式'));
                }
              } 
            },
          ]}
        >
          <Input.TextArea autoSize={{ minRows: 4, maxRows: 8 }}/>
        </Form.Item>
        <Form.Item style={{ textAlign: 'center' }}>
          <Button onClick={generate} type='primary'>生产EXCEL</Button>
        </Form.Item>
        <TextWrapper>
          <CopyToClipboard text={text} onCopy={() => message.success('复制成功')}>
            <Button type='primary' size='small'> 
              一键复制
            </Button>
          </CopyToClipboard>
          <Pre>
            {text}
          </Pre>
        </TextWrapper>

      </Form>
    </div>
  );
};
const TextWrapper = styled.div`
  position: relative; 
  .ant-btn {
  position: absolute;
    right: 0;
    top: 8px;
  }
`
const Pre = styled.pre`
  white-space: pre-wrap;
  word-break: break-word;
  padding: 16px 8px 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
`

export default Home;
