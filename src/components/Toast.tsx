interface IToastProp {
  message: string;
}

const Toast = ({ message }: IToastProp) => {
  return (
    <div className="toast toast-end toast-top">
      <div className="alert alert-success">{message}</div>
    </div>
  );
};

export default Toast;
