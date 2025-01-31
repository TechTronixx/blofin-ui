import { ReactNode, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import styles from "./index.module.scss";
import { contentStyles } from "./styles";
import useLatest from "../../hooks/useLatest";

interface PopupProps {
  title: ReactNode;
  content: ReactNode;
  cancel?: () => void;
  distance?: number;
}

export interface PopupRef {
  open: () => void;
  close: () => void;
}

const Popup = forwardRef<PopupRef, PopupProps>((props, ref) => {
  useImperativeHandle(ref, () => {
    return {
      open: () => {
        setShow(true);
      },
      close: () => {
        setShow(false);
      }
    };
  });

  const { title, content, cancel, distance = 10 } = props;

  const [show, setShow] = useState(false);

  const [isToped, setIsToped] = useState(false);

  const targetRef = useRef<HTMLDivElement>(null);

  const [targetRefHeight, setTargetRefHeight] = useState(0);

  const popupRef = useRef<HTMLDivElement>(null);

  const contentRef = useRef<HTMLDivElement>(null);

  const cancelRef = useLatest(cancel);

  const handleClickOutside = (event: any) => {
    if (
      popupRef.current &&
      document.contains(event.target) &&
      event.target &&
      !popupRef.current.contains(event.target) &&
      show
    ) {
      setShow(false);
      cancelRef.current && cancelRef.current();
    }
  };

  const toggle = () => {
    setShow(!show);
    if (show) {
      cancelRef.current && cancelRef.current();
    }
  };

  useEffect(() => {
    if (targetRef.current) {
      setTargetRefHeight(targetRef.current.clientHeight);
    }

    if (targetRef.current && contentRef.current && show) {
      const screenHeight = window.innerHeight || document.documentElement.clientHeight;
      const { bottom } = targetRef.current.getBoundingClientRect();
      const { height } = contentRef.current.getBoundingClientRect();
      if (bottom + height > screenHeight) {
        setIsToped(false);
      } else {
        setIsToped(true);
      }
    }
  }, [show]);

  useEffect(() => {
    if (popupRef.current) {
      document.removeEventListener("click", handleClickOutside);
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [show]);

  return (
    <div ref={popupRef} className={styles["popup-container"]}>
      <div ref={targetRef} className={styles["popup-title"]} onClick={toggle}>
        {title}
      </div>

      <div
        ref={contentRef}
        className={`${contentStyles({ show })} ${styles["popup-content"]}`}
        style={
          isToped
            ? { top: distance + targetRefHeight + "px" }
            : { bottom: distance + targetRefHeight + "px" }
        }>
        {show && content}
      </div>
    </div>
  );
});

export default Popup;
