import React, { useMemo, useEffect } from 'react';
import { Form, InputNumber, Tabs, Collapse, Row, Col, Input } from 'antd';
import './index.scss';
const { Panel } = Collapse;
const { TabPane } = Tabs;

interface Props {
  data: any;
  onFormValueChange: any;
}
const CanvasProps: React.FC<Props> = ({ data, onFormValueChange }) => {
  const { lineWidth, strokeStyle } = data?.line || {};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onFormChange = (changedValues: any, allValues: any) => {
    if (Object.keys(data).length === 0) return;
    if (allValues.lineWidth === lineWidth && allValues.strokeStyle === strokeStyle) return;
    onFormValueChange(allValues);
    // form.resetFields();
  }

  /**
   * 渲染位置和大小的表单
   */

  const renderForm = useMemo(() => {
    return <Form onValuesChange={onFormChange}>
      <Row>
        <Col span={24}>
          <Form.Item label="颜色" name="strokeStyle" initialValue={strokeStyle}>
            <Input type="color" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="墙厚" name="lineWidth" initialValue={lineWidth}>
            <InputNumber />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  }, [lineWidth, onFormChange, strokeStyle]);


  return (
    <div className="rightArea">
      <Tabs defaultActiveKey="1">
        <TabPane tab="" key="1" style={{ margin: 0 }}>
          <Collapse defaultActiveKey={['1']}>
            <Panel header="样式" key="1">
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