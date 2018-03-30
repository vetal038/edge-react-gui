// @flow
import PushNotification from 'react-native-push-notification'
import { addTransaction, changeBalance, firstTimeLoading } from '../modules/UI/scenes/TransactionVLList/action'

export function pushNotificationHandler (notification, dispatch) {
  const notifDefaultObj = {
    /* Android Only Properties */
    autoCancel: true, // (optional) default: true
    largeIcon: 'ic_notification_image', // (optional) default: "ic_launcher"
    smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
    color: '#6856d6', // (optional) default: system default
    vibrate: true, // (optional) default: true
    vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    ongoing: false,

    /* iOS and Android properties */
    title: 'Notification Title', // (optional)
    message: 'Notification Message' // (required)
  }

  let notifHandleObj = {}

  switch (notification.type) {
    case 'balance':
      notifHandleObj = {
        title: 'Your balance was changed',
        message: `Now your balance is $${Number(notification.balance).toFixed(2)}`
      }
      dispatch(changeBalance({balance: Number(notification.balance)}))
      break
    case 'transaction':
      const transaction = JSON.parse(notification.transaction)
      console.log('transaction', transaction)
      let message = `Type: ${transaction.strategy} Amount: $${Number(transaction.user_amount).toFixed(2)}`
      if (transaction.strategy === 'INCREASE_CAPACITY') {
        message += ` Fee: $${Number(transaction.usd).toFixed(2)}`
      }
      if (notification.hasOwnProperty('balance')) {
        message += ` Balance: $${Number(notification.balance).toFixed(2)}`
        dispatch(changeBalance({balance: Number(notification.balance)}))
      }
      notifHandleObj = {
        title: 'You have new transaction',
        message: message
      }
      dispatch(addTransaction({ transaction }))
      dispatch(firstTimeLoading())
      break
    default:
      break
  }

  if (notification.type) PushNotification.localNotification({...notifDefaultObj, ...notifHandleObj})
}
