// components/Notification.tsx

const Notification = (props: {
  message: string;
  type: "error" | "success" | "info";
}) => {
  //   const { show } = useShow();
  //   if (!show) return null;
  return (
    <div
      className={`absolute text-white font-bold transition-transform transform duration-300 ease-in-out flex items-center justify-center rounded-xl`}
      style={{
        width: "350px",
        height: "80px",
        bottom: "30px",
        left: "40px",
        color: "white",
        background: getNotificationStyles(props.type),
      }}
    >
      <div className="">
        <p className="text-sm font-medium">{props.message}</p>
      </div>
    </div>
  );
};

const getNotificationStyles = (type: "error" | "success" | "info") => {
  switch (type) {
    case "error":
      return "red";
    case "success":
      return "green";
    case "info":
      return "blue";
    default:
      return "gray";
  }
};

export default Notification;
