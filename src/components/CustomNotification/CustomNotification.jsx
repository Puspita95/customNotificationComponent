import "./CustomNotification.css";
import { FcInfo, FcApproval } from "react-icons/fc";
import { IoIosWarning } from "react-icons/io";
import { BiSolidErrorCircle } from "react-icons/bi";
import { useEffect, useState } from "react";

const CustomNotification = ({
  id,
  type,
  title,
  subtitle,
  shouldDisplayCloseButton,
  autoCloseTime,
  isMultiline,
  onCloseButtonClick,
}) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (autoCloseTime > 0) {
      const interval = 100; 
      const decrement = 100 / (autoCloseTime / interval);

      const timer = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev - decrement;
          if (newProgress <= 0) {
            clearInterval(timer);
            onCloseButtonClick(id);
            return 0;
          }
          return newProgress;
        });
      }, interval);

      return () => clearInterval(timer);
    }
  }, [autoCloseTime, onCloseButtonClick, id]);

  return (
    <div style={{ margin: "0 5rem" }}>
      <div
        className={`cnOuterBox ${type} ${isMultiline ? "cnMultiLineBox" : ""}`}
      >
        <div className="cnCloseDiv">
          {shouldDisplayCloseButton ? (
            <button
              className="cnCloseButton"
              onClick={() => onCloseButtonClick(id)}
            >
              X
            </button>
          ) : (
            <div style={{ marginBottom: "10px" }}></div>
          )}
        </div>

        <div className="cnBox">
          {type === "info" && (
            <div className="icon-wrapper">
              <FcInfo size={25} />
            </div>
          )}
          {type === "success" && (
            <div className="icon-wrapper">
              <FcApproval size={25} />
            </div>
          )}
          {type === "warning" && (
            <div className="icon-wrapper">
              <IoIosWarning size={25} />
            </div>
          )}
          {type === "error" && (
            <div className="icon-wrapper">
              <BiSolidErrorCircle size={25} />
            </div>
          )}
          {isMultiline ? (
            <div className="cnHeading">
              {subtitle ? (
                <>
                  <div>{title} :</div>
                  <div>{subtitle}</div>
                </>
              ) : (
                title
              )}
            </div>
          ) : (
            <div className="cnHeading">
              {subtitle ? `${title} : ${subtitle}` : title}
            </div>
          )}
        </div>
        {autoCloseTime && (
          <div className="progressBar">
            <div
              className={`progress progress${type}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomNotification;
