import React, { useState } from "react";
import { Menu, Button, Tag, Popover } from "antd";
import * as FileSaver from "file-saver";
import {
  SaveOutlined,
  RollbackOutlined
} from '@ant-design/icons';
import "./index.scss";

const ButtonGroup = Button.Group;
const { SubMenu } = Menu;
type Props = {
  canvas: any;
  history: any;
}
const Header = ({canvas, history}: Props) => {

  const [isLock, setIsLock] = useState(false);

  const [scaleNumber, setScaleNumber] = useState(1);

  const [lineStyle, setLineStyle] = useState('直线')

  const [fromArrowType, setFromArrowType] = useState('无箭头')

  const [toArrowType, setToArrowType] = useState('无箭头')

  // //导入
  // const onHandleImportJson = () => { }

  // //保存svg
  // const onHandleSaveToSvg = () => { }

  // //选中menu时，触发的函数
  // const onHandleSelect = (data: { key: any; }) => {
  //   switch (data.key) {
  //     case 'create_new':
  //       canvas.open({ nodes: [], lines: [] });
  //       break;
  //     case 'import_json':
  //       onHandleImportJson();
  //       break;
  //     case 'save_json':
  //       console.log("canvas.data", canvas.data)
  //       FileSaver.saveAs(
  //         new Blob([JSON.stringify(canvas.data)], { type: 'text/plain;charset=utf-8' }),
  //         `le5le.topology.json`
  //       );
  //       break;
  //     case 'save_png':
  //       canvas.saveAsImage('le5le.topology.png');
  //       break;
  //     case 'save_svg':
  //       onHandleSaveToSvg();
  //       break;
  //     case 'undo':
  //       canvas.undo();
  //       break;
  //     case 'redo':
  //       canvas.redo();
  //       break;
  //     case 'copy':
  //       canvas.copy();
  //       break;
  //     case 'cut':
  //       canvas.cut();
  //       break;
  //     case 'paste':
  //       canvas.paste();
  //       break;
  //     case 'preview':
  //       let reader = new FileReader();
  //       const result = new Blob([JSON.stringify(canvas.data)], { type: 'text/plain;charset=utf-8' });
  //       reader.readAsText(result, 'text/plain;charset=utf-8');
  //       reader.onload = (e) => {
  //         history.push({ pathname: '/preview', state: { data: JSON.parse(reader.result), id: history.location.state.id } });
  //       }
  //       break;
  //     default:
  //       break;
  //   }
  // }

  // //放大画布
  // const scaleZoomOut = () => {
  //   if (scaleNumber < 5) {
  //     setScaleNumber(scaleNumber + 0.5);
  //     canvas.scaleTo(scaleNumber + 0.5)
  //   }
  // }

  // //缩小画布
  // const scaleZoomIn = () => {
  //   if (scaleNumber > 0.5) {
  //     setScaleNumber(scaleNumber - 0.5);
  //     canvas.scaleTo(scaleNumber - 0.5)
  //   }
  // }

  // /**
  // * 设置默认的连线起始箭头
  // */

  // const onHandleSelectMenu1 = (data: { item: { props: { children: React.SetStateAction<string>; }; }; key: any; }) => {
  //   setFromArrowType(data.item.props.children);
  //   canvas.data.fromArrowType = data.key;
  //   canvas.render();
  // }

  // /**
  // * 设置默认的连线终止箭头
  // */

  // const onHandleSelectMenu2 = (data: { item: { props: { children: React.SetStateAction<string>; }; }; key: any; }) => {
  //   setToArrowType(data.item.props.children);
  //   canvas.data.toArrowType = data.key;
  //   canvas.render();
  // }

  // /**
  // * 元素连线之间的选项
  // */

  // const menu2 = (
  //   <Menu onClick={data => onHandleSelectMenu2(data)} style={{ border: 0 }}>
  //     <Menu.Item key="空">
  //       无箭头
  //   </Menu.Item>
  //     <Menu.Item key="triangleSolid">
  //       实心三角形
  //   </Menu.Item>
  //     <Menu.Item key="triangle">
  //       空心三角形
  //   </Menu.Item>
  //     <Menu.Item key="diamondSolid">
  //       实心菱形
  //   </Menu.Item>
  //     <Menu.Item key="diamond">
  //       空心菱形
  //   </Menu.Item>
  //     <Menu.Item key="circleSolid">
  //       实心圆
  //   </Menu.Item>
  //     <Menu.Item key="circle">
  //       空心圆
  //   </Menu.Item>
  //     <Menu.Item key="line">
  //       线型箭头
  //   </Menu.Item>
  //     <Menu.Item key="lineUp">
  //       上单边线箭头
  //   </Menu.Item>
  //     <Menu.Item key="lineDown">
  //       下单边线箭头
  //   </Menu.Item>
  //   </Menu>
  // );

  // /**
  // * 元素连线之间的选项
  // */

  // const menu1 = (
  //   <Menu onClick={data => onHandleSelectMenu1(data)} style={{ border: 0 }}>
  //     <Menu.Item key="空">
  //       无箭头
  //     </Menu.Item>
  //     <Menu.Item key="triangleSolid">
  //       实心三角形
  //     </Menu.Item>
  //     <Menu.Item key="triangle">
  //       空心三角形
  //     </Menu.Item>
  //     <Menu.Item key="diamondSolid">
  //       实心菱形
  //     </Menu.Item>
  //     <Menu.Item key="diamond">
  //       空心菱形
  //     </Menu.Item>
  //     <Menu.Item key="circleSolid">
  //       实心圆
  //     </Menu.Item>
  //     <Menu.Item key="circle">
  //       空心圆
  //     </Menu.Item>
  //     <Menu.Item key="line">
  //       线型箭头
  //     </Menu.Item>
  //     <Menu.Item key="lineUp">
  //       上单边线箭头
  //     </Menu.Item>
  //     <Menu.Item key="lineDown">
  //       下单边线箭头
  //     </Menu.Item>
  //   </Menu>
  // );

  // /**
  // * 连线起始箭头
  // */
  // const menu = (
  //   <Menu onClick={data => onHandleSelectMenu(data)} style={{ border: 0 }}>
  //     <Menu.Item key="line">
  //       直线
  // </Menu.Item>
  //     <Menu.Item key="polyline">
  //       折线
  // </Menu.Item>
  //     <Menu.Item key="curve">
  //       曲线
  // </Menu.Item>
  //   </Menu>
  // );

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

