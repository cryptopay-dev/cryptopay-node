import CryptoJS from 'crypto-js'
import { version } from '../package.json'
import * as openApiGeneretedCode from '../openApiGeneretedCode'
require('dotenv').config()
import axios from 'axios'
import { CustomErrorCreater } from './helpers/errorCreaterHelper'
import { IHeaders } from './interfaces'
import { SERVER } from './constants'

export default class CryptoPay {
  private InvoicesApi: any
  private RatesApi: any
  constructor(
    private api_secret: string,
    private api_key: string,
    private callback_secret: string,
    private url: string = SERVER.sandbox
  ) {
    // request interceptor
    axios.interceptors.request.use(req => {
      const { method = 'get', data = '' } = req
      req.url = req.url?.replace('%2F', '/')
      let url = req.url?.replace(this.url, '') + ''
      const customHeaders = this.headerCreator(method.toUpperCase(), url, data)
      req.headers = { ...req.headers, ...customHeaders.headers }
      return req
    })
    // response interceptor
    axios.interceptors.response.use(
      res => {
        return res?.data
      },
      error => Promise.reject(CustomErrorCreater(error))
    ) //error interceptor

    this.InvoicesApi = openApiGeneretedCode.InvoicesApiFactory(
      undefined,
      this.url,
      axios
    )
    this.RatesApi = openApiGeneretedCode.RatesApiFactory(
      undefined,
      this.url,
      axios
    )
  }

  public getUrl = () => {
    return this.url
  }
  public invoicesApi = () => {
    return this.InvoicesApi
  }
  public ratesApi = () => {
    return this.RatesApi
  }

  public callbackVerification = (body: string, headers: any): boolean => {
    return (
      CryptoJS.HmacSHA256(body, this.callback_secret).toString() ===
      headers['x-cryptopay-signature']
    )
  }
  private headerCreator(method: string, path: string, body?: any): IHeaders {
    const date = new Date(Date.now()).toUTCString()
    const contentType = 'application/json'
    const bodyHash = body ? CryptoJS.MD5(body).toString() : ''
    const stringToSign = `${method}\n${bodyHash}\n${contentType}\n${date}\n${path}`
    const signature = CryptoJS.enc.Base64.stringify(
      CryptoJS.HmacSHA1(stringToSign, this.api_secret)
    )
    return {
      headers: {
        Date: date,
        Authorization: `HMAC ${this.api_key}:${signature}`,
        'Content-Type': contentType,
        'User-Agent': `Cryptopay NodeJS v${version}`,
      },
    }
  }
}
