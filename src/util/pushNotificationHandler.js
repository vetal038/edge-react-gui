// @flow
import PushNotification from 'react-native-push-notification'
import moment from 'moment'
import { addTransaction, replaceTransaction, addUpgrade, replaceUpgrade, changeBalance, firstTimeLoading } from '../modules/UI/scenes/TransactionVLList/action'
import * as Constants from '../constants/indexConstants'

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

  let notifHandleObj = {}, message = ''

  switch (notification.strategy || notification.type) {
    case 'WITHDRAW':
    case 'DEPOSIT':
      const transaction = {
        'hash': notification.hash || '',
        'vaults': Number(notification.vaults) || 0,
        'dollars': Number(notification.dollars) || 0,
        'status': notification.status || 'UNKNOWN',
        'strategy': notification.strategy || 'UNKNOWN',
        'xtoken': notification.xtoken || '',
        'created_date': notification.created_date || moment().format('YYYY-MM-DD'),
        'updated_date': notification.updated_date || moment().format('YYYY-MM-DD'),
        'created_time': notification.created_time || moment().format('HH:mm:ss'),
        'updated_time': notification.updated_time || moment().format('HH:mm:ss')
      }
      console.log('transaction', transaction)
      message = `${Constants.getStrategy(transaction.strategy)} $${Number(transaction.dollars).toFixed(2)}. Status ${transaction.status}.`

      notifHandleObj = {
        title: 'You have new transaction',
        message: message
      }
      if (transaction.status.toUpperCase() === 'PENDING') {
        dispatch(addTransaction({ transaction }))
      } else {
        dispatch(replaceTransaction({ transaction }))
      }
      dispatch(firstTimeLoading())
      break
    case 'UNLOCK':
    case 'LIMIT':
      const upgrade = {
        'previous_state': Number(notification.previous_state) || 0,
        'new_state': Number(notification.new_state) || 0,
        'cost': Number(notification.cost) || 0,
        // 'status': notification.status || 'UNKNOWN',
        'type': notification.type || 'UNKNOWN',
        'xtoken': notification.xtoken || '',
        'created_date': notification.created_date || moment().format('YYYY-MM-DD'),
        'updated_date': notification.updated_date || moment().format('YYYY-MM-DD'),
        'created_time': notification.created_time || moment().format('HH:mm:ss'),
        'updated_time': notification.updated_time || moment().format('HH:mm:ss')
      }

      console.log('upgrade', upgrade)
      message = `${Constants.getStrategy(upgrade.type)} $${Number(upgrade.new_state).toFixed(2)}. ${Constants.getStrategy(Constants.FEE)} $${upgrade.cost.toFixed(2)}`

      notifHandleObj = {
        title: 'You have new upgrade',
        message: message
      }
      // if (upgrade.status.toUpperCase() === 'PENDING') {
      //   dispatch(addUpgrade({ upgrade }))
      // } else {
      //   dispatch(replaceUpgrade({ upgrade }))
      // }
      dispatch(addUpgrade({ upgrade }))
      dispatch(firstTimeLoading())
      break
    default:
      break
  }

  // switch (notification.type) {
  //   case 'balance':
  //     notifHandleObj = {
  //       title: 'Your balance was changed',
  //       message: `Now your balance is $${Number(notification.balance).toFixed(2)}`
  //     }
  //     dispatch(changeBalance({balance: Number(notification.balance)}))
  //     break
  //   case 'transaction':
  //     const transaction = JSON.parse(notification.transaction)
  //     console.log('transaction', transaction)
  //     let message = `${Constants.getStrategy(transaction.strategy)}${transaction.strategy === 'INCREASE_CAPACITY' ? '' : ':'} $${Number(transaction.user_amount).toFixed(2)}`
  //     if (transaction.strategy === 'INCREASE_CAPACITY') {
  //       message += `. ${Constants.getStrategy(Constants.FEE)}: $${Number(transaction.usd).toFixed(2)}`
  //     }
  //     if (notification.hasOwnProperty('balance')) {
  //       message += `. Balance: $${Number(notification.balance).toFixed(2)}`
  //       dispatch(changeBalance({balance: Number(notification.balance)}))
  //     }
  //     notifHandleObj = {
  //       title: 'You have new transaction',
  //       message: message
  //     }
  //     dispatch(addTransaction({ transaction }))
  //     dispatch(firstTimeLoading())
  //     break
  //   default:
  //     break
  // }

  if (notification.strategy || notification.type) PushNotification.localNotification({...notifDefaultObj, ...notifHandleObj})
}
