/* global localStorage */

/**
 * built from:
 * - https://github.com/Hashpack/hashconnect/blob/main/example/dapp/src/app/services/hashconnect.service.ts
 * - https://github.com/rajatK012/hashconnectWalletConnect
*/

import EventEmitter from 'events'
import { Client } from '@hashgraph/sdk'
import { HashConnect } from 'hashconnect'

const APP_METADATA = {
  name: 'HashConnect Example by StarkTech',
  description: 'A dApp to use HashConnect.',
  icon: ''
}
const STORAGE_KEY = 'hashconnectData'

export const ConnectStatus = {
  INITIALIZING: 'initializing',
  CONNECTED: 'connected',
  PAIRED: 'paired'
}

export const ConnectEvents = {
  STATUS_CHANGED: 'status-changed'
}

export class ConnectService {
  constructor (network = 'testnet') {
    this.status = ConnectStatus.INITIALIZING
    this.network = network
    this.client = Client.forName(network)
    this.bus = new EventEmitter()
    this.availableExtensions = []

    this.saveData = {
      topic: '',
      pairingString: '',
      privateKey: undefined,
      pairedWalletData: undefined,
      pairedAccounts: []
    }
  }

  getStatus () {
    return this.status
  }

  setStatus (value) {
    this.bus.emit(ConnectEvents.STATUS_CHANGED, value)
    this.status = value
  }

  get accountId () {
    return this.saveData.pairedAccounts[0]
  }

  on (eventName, listener) {
    this.bus.addListener(eventName, listener)
  }

  off (eventName, listener) {
    this.bus.removeListener(eventName, listener)
  }

  async initConnect () {
    this.instance = new HashConnect(true)

    if (!this.loadLocalData()) {
      const initData = await this.instance.init(APP_METADATA, this.saveData.privateKey)
      this.saveData.privateKey = initData.privKey

      const state = await this.instance.connect()
      this.saveData.topic = state.topic

      // generate a pairing string, which you can display and generate a QR code from
      this.saveData.pairingString = this.instance.generatePairingString(state, this.network, false)

      // find any supported local wallets
      this.instance.findLocalWallets()

      this.setStatus(ConnectStatus.CONNECTED)
    } else {
      await this.instance.init(APP_METADATA, this.saveData.privateKey)
      await this.instance.connect(this.saveData.topic, this.saveData.pairedWalletData)

      this.setStatus(ConnectStatus.PAIRED)
    }

    this.setUpEvents()
  }

  getProvider (index) {
    if (index === undefined) index = 0
    if (!this.saveData.pairedAccounts[index]) return null

    const provider = this.instance.getProvider(this.network, this.saveData.topic, this.saveData.pairedAccounts[index])
    return provider
  }

  handleFoundExtensionEvent (data) {
    this.availableExtensions.push(data)
    console.log('Found extension', data)
  }

  handlePairingEvent (data) {
    console.log('Paired with wallet', data)

    this.saveData.pairedWalletData = data.metadata

    data.accountIds.forEach(id => {
      if (this.saveData.pairedAccounts.indexOf(id) === -1) { this.saveData.pairedAccounts.push(id) }
    })

    this.setStatus(ConnectStatus.PAIRED)

    this.saveDataInLocalStorage()
  }

  logEvent (data) {
    console.log(data)
  }

  setUpEvents () {
    console.log('setting up events')
    this.instance.foundExtensionEvent.on(this.handleFoundExtensionEvent.bind(this))
    this.instance.pairingEvent.on(this.handlePairingEvent.bind(this))

    this.instance.acknowledgeMessageEvent.on(this.logEvent)
    this.instance.additionalAccountRequestEvent.on(this.logEvent)
    this.instance.connectionStatusChange.on(this.logEvent)
    this.instance.authRequestEvent.on(this.logEvent)
    this.instance.transactionEvent.on(this.logEvent)
  }

  destroyEvents () {
    this.instance.foundExtensionEvent.off(this.handleFoundExtensionEvent.bind(this))
    this.instance.pairingEvent.off(this.handlePairingEvent.bind(this))

    this.instance.acknowledgeMessageEvent.off(this.logEvent)
    this.instance.additionalAccountRequestEvent.off(this.logEvent)
    this.instance.connectionStatusChange.off(this.logEvent)
    this.instance.authRequestEvent.off(this.logEvent)
    this.instance.transactionEvent.off(this.logEvent)
  }

  loadLocalData () {
    const foundData = localStorage.getItem(STORAGE_KEY)

    if (foundData) {
      this.saveData = JSON.parse(foundData)
      console.log('Found local data', this.saveData)
      return true
    }

    return false
  }

  saveDataInLocalStorage () {
    const data = JSON.stringify(this.saveData)

    localStorage.setItem(STORAGE_KEY, data)
  }

  clearPairings () {
    this.saveData.pairedAccounts = []
    this.saveData.pairedWalletData = undefined
    this.setStatus(ConnectStatus.CONNECTED)
    localStorage.removeItem(STORAGE_KEY)
  }

  async connectToExtension (extensionMeta) {
    console.log('connectToExtension', extensionMeta)
    this.instance.connectToLocalWallet(this.saveData.pairingString, extensionMeta)
  }
}
