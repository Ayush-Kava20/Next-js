import { Fragment } from 'react';
import { useContext } from 'react';
import MainHeader from './main-header';
import notificationContext from '@/store/notification-context';
import Notification from '../ui/notification';

export default function Layout(props) {
  const notificationCtx = useContext(notificationContext);
  const activeNotification = notificationCtx.notification;

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}    
    </Fragment>
  );
}
