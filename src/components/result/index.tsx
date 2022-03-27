import { FC, useCallback } from "react";
import { Result, Button } from "antd";

/** 按钮类型 */
type IBtnType =
  | "link"
  | "text"
  | "ghost"
  | "primary"
  | "default"
  | "dashed"
  | undefined;

interface IProps {
  /** 是否显示 */
  show?: boolean;
  /** 错误码 */
  status: "success" | "error" | "info" | "warning" | "404" | "403" | "500";
  /** 标题 */
  title: string;
  /** 副标题 */
  subTitle?: string;
  /** 左按钮文案 */
  leftBtnText?: string;
  /** 左按钮type */
  leftBtnType?: IBtnType;
  /** 左按钮点击时间 */
  onLeftBtnClick?: () => void;
  /** 右按钮文案 */
  rightBtnText?: string;
  /** 右按钮type */
  rightBtnType?: IBtnType;
  /** 右按钮点击事件 */
  onRightBtnClick?: () => void;
}

const ResultComponent: FC<IProps> = ({
  show,
  status = "info",
  title,
  subTitle,
  leftBtnText,
  leftBtnType = "default",
  onLeftBtnClick,
  rightBtnText,
  rightBtnType = "primary",
  onRightBtnClick,
}) => {
  const leftBtn = useCallback(
    () => (
      <>
        {leftBtnText && (
          <Button
            type={leftBtnType}
            onClick={() => onLeftBtnClick?.()}
            key="left"
          >
            {leftBtnText}
          </Button>
        )}
      </>
    ),
    [leftBtnText, leftBtnType, onLeftBtnClick]
  );

  const rightBtn = useCallback(
    () => (
      <>
        {rightBtnText && (
          <Button
            type={rightBtnType}
            onClick={() => onRightBtnClick?.()}
            key="right"
          >
            {rightBtnText}
          </Button>
        )}
      </>
    ),
    [rightBtnText, rightBtnType, onRightBtnClick]
  );

  return (
    <>
      {show && (
        <Result
          status={status}
          title={title}
          subTitle={subTitle}
          extra={[leftBtn(), rightBtn()]}
        />
      )}
    </>
  );
};

export default ResultComponent;
