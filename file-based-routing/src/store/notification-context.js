const { createContext, useEffect } = require("react");
const { useState } = require("react");

const notificationContext = createContext({
    notification: null,
    showNotification: function(newNotification) {},
    hideNotification: function() {}
})

export function NotificationContextProvider(props){
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        if (notification && (notification.status === 'success' || notification.status === 'error')) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 3000);

            return () => clearTimeout(timer);
        }   
    }, [notification]);

    const contextValue = {
        notification: notification,
        showNotification: function(newNotification) {
            setNotification(newNotification);
        },
        hideNotification: function() {
            setNotification(null);
        }
    }

    return <notificationContext.Provider value={contextValue}>
        {props.children}
    </notificationContext.Provider>
} 

export default notificationContext;