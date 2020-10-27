import React, { useEffect, useState, useCallback, useMemo, Fragment } from "react";
import { Topology, registerNode } from "@topology/core";
import { Options } from '@topology/core';
import {
  flowData,
  flowDataAnchors,
  flowDataIconRect,
  flowDataTextRect,
  flowSubprocess,
  flowSubprocessIconRect,
  flowSubprocessTextRect,
  flowDb,
  flowDbIconRect,
  flowDbTextRect,
  flowDocument,
  flowDocumentAnchors,
  flowDocumentIconRect,
  flowDocumentTextRect,
  flowInternalStorage,
  flowInternalStorageIconRect,
  flowInternalStorageTextRect,
  flowExternStorage,
  flowExternStorageAnchors,
  flowExternStorageIconRect,
  flowExternStorageTextRect,
  flowQueue,
  flowQueueIconRect,
  flowQueueTextRect,
  flowManually,
  flowManuallyAnchors,
  flowManuallyIconRect,
  flowManuallyTextRect,
  flowDisplay,
  flowDisplayAnchors,
  flowDisplayIconRect,
  flowDisplayTextRect,
  flowParallel,
  flowParallelAnchors,
  flowComment,
  flowCommentAnchors
} from '@topology/flow-diagram';

import {
  activityFinal,
  activityFinalIconRect,
  activityFinalTextRect,
  swimlaneV,
  swimlaneVIconRect,
  swimlaneVTextRect,
  swimlaneH,
  swimlaneHIconRect,
  swimlaneHTextRect,
  fork,
  forkHAnchors,
  forkIconRect,
  forkTextRect,
  forkVAnchors
} from '@topology/activity-diagram';

import {
  simpleClass,
  simpleClassIconRect,
  simpleClassTextRect,
  interfaceClass,
  interfaceClassIconRect,
  interfaceClassTextRect
} from '@topology/class-diagram';

import {
  lifeline,
  lifelineAnchors,
  lifelineIconRect,
  lifelineTextRect,
  sequenceFocus,
  sequenceFocusAnchors,
  sequenceFocusIconRect,
  sequenceFocusTextRect
} from '@topology/sequence-diagram';
import { Modal } from "antd";
import { Tools } from "../../config/config"

import { getNodeById } from "../../service/workspace/index";

import Header from "./components/Header"
import NodeComponent from './components/nodeAttrComponent';
import BackgroundComponent from './components/globalAttrComponent';
import LineComponent from './components/lineAttrComponent';
import NodeTreeComponent from "./components/nodeTreeComponent";
import ModelComponent from "./components/modelComponent";
import ContextMenu from "./components/contextMenu";

import "./index.scss"
const { confirm } = Modal;
let canvas: Topology;

type Props = {
  history: any;
}

interface Iselected {
  node: any;
  line: any;
  multi: boolean;
  nodes: any;
  locked: boolean;
}

const WorkSpace = ({ history }: Props) => {
  const [contextmenu, setContextmenu] = useState<any>({
    position: 'fixed',
    zIndex: '10',
    display: 'none',
    left: '',
    top: '',
    bottom: ''
  });
  
  const [selected, setSelected] = useState<Iselected>({
    node: null,
    line: null,
    multi: false,
    nodes: null,
    locked: false
  });

  const [isLoadCanvas, setIsLoadCanvas] = useState(false);

  useEffect(() => {
    const canvasOptions: Options = {
      rotateCursor: '/rotate.cur',
    };
    canvasOptions.on = onMessage;
    canvasRegister();
    canvas = new Topology('topology-canvas', canvasOptions);
    canvas.data.lineName = "line";
    canvas.data.toArrowType = "空";
    canvas.render();
    // (async function getNodeData() {
    //   const data = await getNodeById("5dcd1fe16025d712f05ace89");
    //   canvas.open(data.data)
    // })();

    // if (history.location.state.from === "/preview") {
    //   confirm({
    //     title: '是否要保存预览前的数据?',
    //     okText: '保存',
    //     cancelText: '取消',
    //     onOk() {
    //       canvas.open(history.location.state.data);
    //     },
    //     onCancel() {
    //       getNodeData();
    //     },
    //   });
    // } else {
    //   if (history.location?.state?.id) {
    //     getNodeData();
    //   }
    // }
    setIsLoadCanvas(true);
    document.onclick = event => {
      setContextmenu({
        display: 'none',
        left: '',
        top: '',
        bottom: ''
      });
    }
  }, [history]);

  // 注册图形库
  const canvasRegister = () => {
    registerNode('flowData', flowData, flowDataAnchors, flowDataIconRect, flowDataTextRect);
    registerNode('flowSubprocess', flowSubprocess, undefined, flowSubprocessIconRect, flowSubprocessTextRect);
    registerNode('flowDb', flowDb, undefined, flowDbIconRect, flowDbTextRect);
    registerNode('flowDocument', flowDocument, flowDocumentAnchors, flowDocumentIconRect, flowDocumentTextRect);
    registerNode(
      'flowInternalStorage',
      flowInternalStorage,
      undefined,
      flowInternalStorageIconRect,
      flowInternalStorageTextRect
    );
    registerNode(
      'flowExternStorage',
      flowExternStorage,
      flowExternStorageAnchors,
      flowExternStorageIconRect,
      flowExternStorageTextRect
    );
    registerNode('flowQueue', flowQueue, undefined, flowQueueIconRect, flowQueueTextRect);
    registerNode('flowManually', flowManually, flowManuallyAnchors, flowManuallyIconRect, flowManuallyTextRect);
    registerNode('flowDisplay', flowDisplay, flowDisplayAnchors, flowDisplayIconRect, flowDisplayTextRect);
    registerNode('flowParallel', flowParallel, flowParallelAnchors, undefined, undefined);
    registerNode('flowComment', flowComment, flowCommentAnchors, undefined, undefined);

    // activity
    registerNode('activityFinal', activityFinal, undefined, activityFinalIconRect, activityFinalTextRect);
    registerNode('swimlaneV', swimlaneV, undefined, swimlaneVIconRect, swimlaneVTextRect);
    registerNode('swimlaneH', swimlaneH, undefined, swimlaneHIconRect, swimlaneHTextRect);
    registerNode('forkH', fork, forkHAnchors, forkIconRect, forkTextRect);
    registerNode('forkV', fork, forkVAnchors, forkIconRect, forkTextRect);

    // class
    registerNode('simpleClass', simpleClass, undefined, simpleClassIconRect, simpleClassTextRect);
    registerNode('interfaceClass', interfaceClass, undefined, interfaceClassIconRect, interfaceClassTextRect);

    // sequence
    registerNode('lifeline', lifeline, lifelineAnchors, lifelineIconRect, lifelineTextRect);
    registerNode('sequenceFocus', sequenceFocus, sequenceFocusAnchors, sequenceFocusIconRect, sequenceFocusTextRect);
  }

  const onDrag = (event: any, node: any) => {
    event.dataTransfer.setData('Text', JSON.stringify(node.data));
  }

  /**
   * 当表单数据变化时, 重新渲染canvas
   * @params {object} value - 图形的宽度,高度, x, y等等
   */

  const onHandleFormValueChange = useCallback(value => {
    const { rotate, data, lineWidth, strokeStyle, dash, color, fontSize, fontFamily, text, ...other } = value;
    const changedValues = { node: { rect: other, font: { color, fontSize, fontFamily }, rotate, lineWidth, strokeStyle, dash, text, data } }
    if (changedValues.node) {
      // 遍历查找修改的属性，赋值给原始Node
      for (const key in changedValues.node) {
        if (Array.isArray((changedValues.node as any)[key])) {
          console.log(key);
        } else if (typeof (changedValues.node as any) === 'object') {
          for (const k in (changedValues.node as any)) {
            if((changedValues.node as any)[key][k]){
              selected.node[key][k] = (changedValues.node as any)[key][k];
            }
          }
        } else {
          selected.node[key] = (changedValues.node as any)[key];
        }
      }
    }
    canvas.updateProps(selected.node);
  }, [selected]);

  const getLocked = (data: any) => {
    let locked = true
    if (data.nodes && data.nodes.length) {
      for (const item of data.nodes) {
        if (!item.locked) {
          locked = false
          break
        }
      }
    }
    if (locked && data.lines) {
      for (const item of data.lines) {
        if (!item.locked) {
          locked = false
          break
        }
      }
    }

    return locked
  }

  /**
   * 当线条表单数据变化时, 重新渲染canvas
   * @params {object} value - 图形的宽度,高度, x, y等等
   */

  const onHandleLineFormValueChange = useCallback(value => {
    const { lineWidth, strokeStyle } = value;
    const changedValues = { line: { lineWidth, strokeStyle } }
    if (changedValues.line) {
      // 遍历查找修改的属性，赋值给原始line
      for (const key in changedValues.line) {
        if (Array.isArray((changedValues.line as any)[key])) {
          console.log(key)
        } else if (typeof (changedValues.line as any)[key] === 'object') {
          for (const k in (changedValues.line as any)[key]) {
            if((changedValues.line as any)[key][k]){
              selected.line[key][k] = (changedValues.line as any)[key][k];
            }
          }
        } else {
          selected.line[key] = (changedValues.line as any)[key];
        }
      }
    }
    console.log(selected)
    canvas.updateProps(selected.line);
  }, [selected]);

  /**
   * 监听画布上元素的事件
   * @params {string} event - 事件名称
   * @params {object} data - 节点数据
   */
  const onMessage = (event: any, data: any) => {
    console.log("event: ", event, data);
    switch (event) {
      case 'node': // 节点
      case 'addNode':
        setSelected({
          node: data,
          line: null,
          multi: false,
          nodes: null,
          locked: data.locked
        });
        break;
      case 'line': // 连线
      case 'addLine':
        setSelected({
          node: null,
          line: data,
          multi: false,
          nodes: null,
          locked: data.locked
        })
        break;
      case 'multi':
        setSelected({
          node: null,
          line: null,
          multi: true,
          nodes: Array.isArray(data) && data.length > 1 ? data : null,
          locked: getLocked(data)
        })
        break;
      case 'space':  // 空白处
        setSelected({
          node: null,
          line: null,
          multi: false,
          nodes: null,
          locked: false
        })
        break;
      default:
        break;
    }
  }

  // 鼠标事件
  const hanleContextMenu = (event: any) => {
    event.preventDefault()
    event.stopPropagation()

    if (event.clientY + 360 < document.body.clientHeight) {
      setContextmenu({
        position: 'fixed',
        zIndex: '10',
        display: 'block',
        left: event.clientX + 'px',
        top: event.clientY + 'px',
        bottom: ''
      });

    } else {
      setContextmenu({
        position: 'fixed',
        zIndex: '10',
        display: 'block',
        left: event.clientX + 'px',
        top: event.clientY + 'px',
        bottom: ''
      });
    }
    console.log()
  }


  // 顶部__操作栏
  const renderHeader = useMemo(() => {
    if (isLoadCanvas)
      return <Header canvas={canvas} history={history} />
  }, [isLoadCanvas, history])

  interface IAttrAreaConfig {
    node: JSX.Element;
    line: JSX.Element;
    default: JSX.Element;
  }
  // 左侧__属性栏配置
  const attrAreaConfig = useMemo<IAttrAreaConfig>(() => {
    return {
      node: selected && <NodeComponent data={selected} onFormValueChange={onHandleFormValueChange} />, // 渲染Node节点类型的组件
      line: selected && <LineComponent data={selected} onFormValueChange={onHandleLineFormValueChange} />, // 渲染线条类型的组件
      default: canvas && <BackgroundComponent data={canvas} /> // 渲染画布背景的组件
    }
  }, [selected, onHandleFormValueChange, onHandleLineFormValueChange])

  // 左侧__渲染属性栏
  const renderAttrArea = useMemo(() => {
    let _component = attrAreaConfig.default;
    Object.keys(attrAreaConfig).forEach(item => {
      if (selected[item]) {
        _component = attrAreaConfig[item]
      }
    })
    return _component;
  }, [selected, attrAreaConfig]);

  return (
    <Fragment>
      { renderHeader}
      <div className="page">
        <div className="tool">
        {/* 控件栏 start */}
        {
            Tools.map((item, index) => <div key={index}>
              <div className="title">{item.group}</div>
              <div className="button">
                {
                  item.children.map((itemx, idx) => {
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    return (<a key={idx} title={itemx.name} draggable = {true} href="#" onDragStart={ev => onDrag(ev, itemx)}>
                      <i className={'iconfont ' + itemx.icon} style={{ fontSize: 13 }} />
                    </a>)
                  })
                }
              </div>
            </div>)
          }
          {/* 控件栏 end */}
          {/* 属性栏 start */}
          { renderAttrArea }
          {/* 属性栏 end */}
        </div>
        <div className="full">
          <svg
              width="100%"
              height="100%"
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
              }}
              xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#f3f3f3" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            <div id="topology-canvas" style={{ height: '100%', width: '100%' }} onContextMenu={hanleContextMenu} />
            <div style={contextmenu}>
              <ContextMenu data={selected} canvas={canvas} />
            </div>
        </div>
        <div className="props">
          {/* 概要栏 start */}
          <div className="item">
            <div className="title">概要栏</div>
            <NodeTreeComponent />
          </div>
          {/* 概要栏 end */}
          {/* 模型显示栏 start */}
          <div className="item">
            <div className="title">模型显示栏</div>
            <ModelComponent />
          </div>
          {/* 模型显示栏 end */}
        </div>
      </div>
    </Fragment>
  );

}

export default WorkSpace;