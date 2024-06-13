import { useState } from "react";
import "./App.css";
import CustomNotification from "./components/CustomNotification/CustomNotification";

function App() {
  const [selectedNotification, setSelectedNotification] = useState([]);

  const handleNotificationClick = (props) => {
    setSelectedNotification((prevNotifications) => [
      ...prevNotifications,
      {
        id: Math.random().toString(36).substring(2, 9),
        ...props,
      },
    ]);
  };
  const handleCloseButtonClick = (id) => {
    setSelectedNotification((prevNotifications) =>
      prevNotifications.filter((item) => item.id !== id)
    );
  };

  return (
    <>
      <div className="box">
        <button
          className="info-btn"
          onClick={() =>
            handleNotificationClick({
              notificationType: "info",
              notificationTitle: "Information title",
              notificationSubtitle: "Information Sub-title",
              shouldDisplayCloseButton: true,
              notificationAutoCloseTime: null,
              isMultiline: false,
            })
          }
        >
          Info
        </button>
        <button
          className="success-btn"
          onClick={() =>
            handleNotificationClick({
              notificationType: "success",
              notificationTitle: "Success title",
              notificationSubtitle: "Success sub-title",
              shouldDisplayCloseButton: true,
              notificationAutoCloseTime: null,
              isMultiline: false,
            })
          }
        >
          Success
        </button>
        <button
          className="warning-btn"
          onClick={() =>
            handleNotificationClick({
              notificationType: "warning",
              notificationTitle: "Warning title",
              notificationSubtitle: "Warning subtitle",
              shouldDisplayCloseButton: false,
              notificationAutoCloseTime: 3000,
              isMultiline: false,
            })
          }
        >
          Warning
        </button>
        <button
          className="error-btn"
          onClick={() =>
            handleNotificationClick({
              notificationType: "error",
              notificationTitle: "Error title",
              notificationSubtitle: "Error subtitle",
              shouldDisplayCloseButton: true,
              notificationAutoCloseTime: 2000,
              isMultiline: true,
            })
          }
        >
          Error
        </button>
      </div>
      <div className="cnContainer">
        {selectedNotification &&
          selectedNotification.map((notification) => (
            <CustomNotification
              key={notification.id}
              id={notification.id}
              type={notification.notificationType}
              title={notification.notificationTitle}
              subtitle={notification.notificationSubtitle}
              autoCloseTime={notification.notificationAutoCloseTime}
              shouldDisplayCloseButton={notification.shouldDisplayCloseButton}
              isMultiline={notification.isMultiline}
              onCloseButtonClick={handleCloseButtonClick}
            />
          ))}
      </div>
    </>
  );
}
export default App;
