import React, { useMemo, useEffect } from 'react';
import { Form, InputNumber, Tabs, Collapse, Row, Col, Input, Select } from 'antd';
import './index.scss';
const { Panel } = Collapse;
const { TabPane } = Tabs;
const { Option } = Select;

interface Props {
  data: any;
  onFormValueChange: any;
}
const CanvasProps: React.FC<Props> = ({ data, onFormValueChange }) => {
  const [form] = Form.useForm(); 

  const { x, y, width, height } = data?.node?.rect || {};
  const { rotate, lineWidth, strokeStyle, dash, text, id } = data?.node || {};

  useEffect(() => {
    // form.validateFields((err, value) => {
    //   if (err) return;
    //   if (Object.keys(data).length === 0) return;
    //   if (value.x === x && value.y === y && value.width === width && value.height === height && value.rotate === rotate && value.lineWidth === lineWidth && value.strokeStyle === strokeStyle && value.dash === dash && value.color === color && value.fontFamily === fontFamily && value.fontSize === fontSize && value.text === text && value.data === extraFields) return;
    //   onFormValueChange(value);
    //   form.resetFields();
    // })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form])

  /**
   * 渲染位置和大小的表单
   */

  const renderForm = useMemo(() => {
    return <Form>
      <Row>
        <Col span={12}>
          <Form.Item label="X(px)" name="x" initialValue={x}>
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Y(px)" name="y" initialValue={y}>
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="宽(px)" name="width" initialValue={width}>
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="高(px)" name="height" initialValue={height}>
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={14}>
          <Form.Item label="角度(deg)" name="rotate" initialValue={rotate}>
            <InputNumber />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  }, [x, y, width, height, rotate]);

  /**
   * 渲染样式的表单
   */

  const renderStyleForm = useMemo(() => {
    return <Form>
      <Row>
        <Col span={24}>
          <Form.Item label="线条颜色" name="strokeStyle" initialValue={strokeStyle}>
            <Input type="color" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="线条样式" name="dash" initialValue={dash}>
            <Select style={{ width: '100%' }}>
              <Option value={0}>_________</Option>
              <Option value={1}>---------</Option>
              <Option value={2}>_ _ _ _ _</Option>
              <Option value={3}>- . - . - .</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="线条宽度" name="lineWidth" initialValue={lineWidth}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  }, [lineWidth, strokeStyle, dash]);

  return (
    <div className="rightArea">
      <Tabs defaultActiveKey="1">
        <TabPane tab="" key="1" style={{ margin: 0 }}>
          <Collapse defaultActiveKey={['1', '2', '3']}>
            <Panel header="节点属性" key="1">
              {
                renderForm
              }
            </Panel>
            <Panel header="样式" key="2">
              {
                renderStyleForm
              }
            </Panel>
          </Collapse>
        </TabPane>
      </Tabs>

    </div>
  );
};

export default CanvasProps;