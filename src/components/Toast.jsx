function Toast({ message, show }) {

  if (!show) return null;

  return (
    <div
      className="position-fixed top-0 end-0 p-3"
      style={{
        zIndex: 9999,
      }}
    >
      <div className="toast show">
        <div className="toast-header bg-success text-white">

          <strong className="me-auto">
            Notification
          </strong>

        </div>

        <div className="toast-body">
          {message}
        </div>
      </div>
    </div>
  );
}

export default Toast;