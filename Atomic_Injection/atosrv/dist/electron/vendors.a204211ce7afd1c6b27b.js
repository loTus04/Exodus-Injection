(window.webpackJsonp=window.webpackJsonp||[]).push([[314],{4244:function(e,t,r){"use strict";r.r(t);var a=r(184),s=r.n(a),i=r(155),o=r(896);class XEMCoin extends i.a{constructor({alias:e,feeData:{fee:t},explorers:r,txWebUrl:a,socket:i}){super({alias:e,name:"NEM",ticker:"XEM",decimal:6,derivation:"m/44'/43'/0'/0/0",unspendableBalance:"0",explorers:r,txWebUrl:a,socket:i}),this.plugins=[new o.a],this.fee=t,this.transactions=[],this.network=s.a.model.network.data.mainnet,this.fields.paymentId=!0}getAddressFromPublicKey(e){return s.a.model.address.toAddress(e,this.network.id)}async loadWallet(e,t){const r=s.a.crypto.helpers.derivePassSha(t,6e3).priv,a=s.a.crypto.keyPair.create(r).publicKey.toString();if(!r)throw new Error(this.ticker+" privateKey is empty!!!");return this.privateKey=r,this.address=this.getAddressFromPublicKey(a),this}getAddress(){if(this.privateKey){const e=s.a.crypto.keyPair.create(this.privateKey).publicKey.toString();return this.getAddressFromPublicKey(e)}return new Error(this.ticker+" privateKey is empty!!!")}async validateAddress(e){try{return s.a.model.address.isValid(e)&&s.a.model.address.isFromNetwork(e,this.network.id)}catch(t){throw new Error(`Fail to validate ${this.ticker} address [${e}]`)}}async createTransaction({address:e,amount:t,memo:r=""}){const a=s.a.model.objects.create("common")("",this.privateKey),i=s.a.model.objects.create("transferTransaction")(e,this.toCurrencyUnit(t),r),o=s.a.model.transactions.prepare("transferTransaction")(a,i,this.network.id),n=s.a.crypto.keyPair.create(this.privateKey),d=s.a.utils.serialization.serializeTransaction(o),c=n.sign(d),l={data:s.a.utils.convert.ua2hex(d),signature:c.toString()};return JSON.stringify(l)}updateCoinParamsFromServer(e){e.feeData&&void 0!==this.fee&&void 0!==e.feeData.fee&&(this.fee=e.feeData.fee);const t=e.explorers.find(({className:e})=>"NemNodeExplorer"===e);t&&(this.explorers[0].updateEndpoint(t.baseUrl),this.explorers[0].webUrl=e.txWebUrl)}}t.default=XEMCoin}}]);