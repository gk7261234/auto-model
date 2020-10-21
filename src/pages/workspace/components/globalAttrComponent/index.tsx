import React, { useMemo, useEffect } from 'react';
import { Form, Tabs, Row, Col, Input, Collapse } from 'antd';
import './index.scss';
const { TabPane } = Tabs;
const { Panel } = Collapse;

interface Props {
  data: any;
}
const CanvasProps: React.FC<Props> = ({ data }) => {
  const [form] = Form.useForm(); 

  interface IForm {
    name: string;
    height: number;
    color: number;
    layerNumber: number;
    pixelRatio: string;
  }

  const name = "模型-1";
  const height=100;
  const color="";
  const layerNumber = 0;
  const pixelRatio = "";

  /**
   * 渲染位置和大小的表单
   * 
   */
  const renderForm = useMemo(() => {
    const formLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 15 },
    };
    return <Form {...formLayout}>
      <Row>
        <Col span={24}>
          <Form.Item label="名称" name="bkColor" initialValue={name}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="高度" name="height" initialValue={height}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="颜色" name="color" initialValue={color}>
            <Input type="color" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="层数" name="layerNumber" initialValue={layerNumber}>
            <Input  />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="像素比" name="pixelRatio" initialValue={pixelRatio}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  }, [name, height, color, layerNumber, pixelRatio]);

  return (
    <div className="rightArea">
      <Tabs defaultActiveKey="1">
        <TabPane tab="" key="1" style={{ margin: 0 }}>
          <Collapse defaultActiveKey={['1']}>
            <Panel header="全局属性栏" key="1">
              {
                renderForm
              }
            </Panel>
          </Collapse>
        </TabPane>
      </Tabs>

    </div>
  );
};

export default CanvasProps;