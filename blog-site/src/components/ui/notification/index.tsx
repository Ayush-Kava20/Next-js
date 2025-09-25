function Notification(props: {
  title: string;
  message: string;
  status: 'success' | 'error' | 'pending';
}) {
  const { title, message, status } = props;

  let statusClasses = '';

  if (status === 'pending') {
    statusClasses = 'bg-blue-500';
  }

  if (status === 'success') {
    statusClasses = 'bg-green-500';
  }

  if (status === 'error') {
    statusClasses = 'bg-red-500';
  }

  const cssClasses = `w-full fixed bottom-0 left-0  h-20 flex items-center justify-between bottom-0 p-4 ${statusClasses}`;

  return (
    <div className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
