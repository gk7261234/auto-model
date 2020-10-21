import React from "react";
import { Button } from "antd";
import {
  SaveOutlined,
  RollbackOutlined
} from '@ant-design/icons';
import "./index.scss";

const ButtonGroup = Button.Group;

type Props = {
  canvas: any;
  history: any;
}
const Header: React.FC<Props> = ({canvas, history}) => {
  return (
    <div style={{ height: 48, width: "100vw", borderBottom: "1px solid #e8e8e8" }}>
      <ButtonGroup style={{ float: "right", right: 10, marginTop: 12 }}>
        <Button>
          <SaveOutlined />
          保存
        </Button>
        <Button>
          <RollbackOutlined />
          返回主页
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default Header;

