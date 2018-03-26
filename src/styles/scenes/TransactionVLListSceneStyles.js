// @flow

import { Image } from 'react-native'

import THEME from '../../theme/variables/airbitz'
import * as Styles from '../indexStyles'

const TransactionVLListSceneStyles = {
  gradient: {
    height: THEME.SPACER.HEADER
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  totalBalanceBox: {
    // one
    height: 111,
    justifyContent: 'center'
  },
  totalBalanceWrap: {
    flex: 3,
    alignItems: 'center',
    backgroundColor: THEME.COLORS.TRANSPARENT
  },
  totalBalanceHeader: {
    flex: 2,
    justifyContent: 'flex-end',
    backgroundColor: THEME.COLORS.TRANSPARENT
  },
  totalBalanceText: {
    fontSize: 18,
    color: THEME.COLORS.PRIMARY
  },
  currentBalanceBoxDollarsWrap: {
    flex: 3,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: THEME.COLORS.TRANSPARENT
  },
  currentBalanceBoxDollars: {
    color: THEME.COLORS.PRIMARY,
    fontSize: 44
  },
  walletsBox: {
    // one
    //flex: 1
  },
  walletsBoxHeaderWrap: {
    paddingLeft: 12,
    paddingRight: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50
  },
  walletsBoxHeaderTextWrap: {
    paddingVertical: 12,
    width: '100%'
  },
  leftArea: {
    flexDirection: 'row'
  },
  walletsBoxHeaderText: {
    fontSize: 18,
    color: THEME.COLORS.WHITE,
    backgroundColor: THEME.COLORS.TRANSPARENT,
    width: '100%',
    textAlign: 'center'
  },
  listsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  scene: Styles.SceneContainer,
  styleCatch: Styles,
  mainScrollView: {
    flex: 1
  },
  wrapperView: {
    backgroundColor: '#ffffff',
    flex: 1
  },
  balanceView: {
    flex: 0.25,
    width: '100%',
    backgroundColor: '#6856d6',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  balanceText: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    color: '#ffffff'
  },
  transactionText: {
    width: '100%',
    marginTop: 30,
    textAlign: 'center'
  },
  renderItemWrapper: {
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
    backgroundColor: '#ffffff',
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  renderMainData: {
    paddingLeft: 10,
    justifyContent: 'center'
  },
  renderDetails: {
    paddingRight: 10,
    justifyContent: 'center'
  },
  renderItem: {
    width: '100%',
    textAlign: 'left',
    color: THEME.COLORS.PRIMARY
  },
  itemStatusSuccess: {
    fontSize: 12,
    color: THEME.COLORS.ACCENT_MINT
  },
  itemStatusFail: {
    fontSize: 12,
    color: THEME.COLORS.ACCENT_RED
  },
  loadingItem: {
    marginTop: 10,
    width: '100%',
    textAlign: 'center'
  },
  scrollViewContentContainer: {
    alignItems: 'center'
  },
  exchangeRateBanner: {
    container: {
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      height: 26,
      backgroundColor: THEME.COLORS.PRIMARY
    },
    containerError: {
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      height: 26,
      backgroundColor: THEME.COLORS.GRAY_4
    },
    text: {
      color: THEME.COLORS.WHITE,
      textAlign: 'center',
      marginRight: '2%',
      marginLeft: '2%'
    },
    textError: {
      color: THEME.COLORS.PRIMARY,
      backgroundColor: THEME.COLORS.TRANSPARENT,
      fontSize: 10
    }
  },
  shim: {
    height: 20
  },

  flipButton: Styles.IconButtonStyle,
  actionButtonContainer: {
    width: '90%',
    height: THEME.BUTTONS.HEIGHT
  },
  confirmModal: {
    middle: {
      container: {
        width: '100%'
      },
      currencyIcon: {
        height: 25,
        width: 25,
        resizeMode: Image.resizeMode.contain
      },
      altCurrencyText: {
        color: THEME.COLORS.PRIMARY,
        fontSize: 14
      },
      top: {
        flex: 4,
        flexDirection: 'row'
      },
      topRight: {
        flex: 8
      },
      topLeft: {
        flex: 2,
        flexDirection: 'column',
        alignItems: 'center'
      },
      shim: {
        height: 10,
        backgroundColor: THEME.COLORS.WHITE
      },
      bottom: {
        flex: 4,
        flexDirection: 'row'
      },
      bottomRight: {
        flex: 8
      },
      bottomLeft: {
        flex: 2,
        flexDirection: 'column',
        alignItems: 'center'
      },
      text: {
        color: THEME.COLORS.GRAY_1
      }
    },
    bottom: {
      justifyContent: 'center',
      alignSelf: 'center',
      alignItem: 'center',
      height: 35,
      marginBottom: 10
    },
    bottomButton: {
      color: THEME.COLORS.GRAY_2,
      fontSize: 17
    },
    icon: {
      color: THEME.COLORS.SECONDARY,
      backgroundColor: THEME.COLORS.TRANSPARENT,
      width: 26,
      height: 26
    },
    iconSize: 26
  },
  flipWrapper: {
    container: {
      width: '90%',
      height: 176,
      backgroundColor: THEME.COLORS.SECONDARY
    },
    containerNoFee: {
      width: '90%',
      backgroundColor: THEME.COLORS.SECONDARY
    },
    containerNoWalletSelected: {
      paddingVertical: 10,
      justifyContent: 'space-around'
    },
    topRow: {
      height: 34,
      flexDirection: 'column',
      justifyContent: 'space-around'
    },
    walletSelector: Styles.TextAndIconButtonStyle,
    noWalletSelected: {
      ...Styles.TextAndIconButtonStyle,
      textContainer: {
        paddingLeft: 32
      },
      inner: {
        ...Styles.TextAndIconButtonStyle.inner,
        width: '100%',
        justifyContent: 'space-around'
      }
    },
    iconContainer: {
      position: 'absolute',
      top: 3,
      left: 3,
      height: 29,
      width: 29,
      backgroundColor: THEME.COLORS.TRANSPARENT,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    altIconContainer: {
      position: 'absolute',
      flexDirection: 'row',
      top: 0,
      left: 5,
      height: 50,
      width: 200,
      alignItems: 'center'
    },
    currencyIcon: {
      height: 25,
      width: 25,
      resizeMode: Image.resizeMode.contain
    },
    altCurrencyText: {
      color: THEME.COLORS.WHITE,
      fontSize: 14
    },
    flipInput: {
      // flex: 2
      height: 110
    },
    fee: {
      height: 36,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    feeText: {
      color: THEME.COLORS.WHITE
    },
    flipInputColor: THEME.COLORS.WHITE
  }
}

export { TransactionVLListSceneStyles }
