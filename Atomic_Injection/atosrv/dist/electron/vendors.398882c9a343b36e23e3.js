(window.webpackJsonp=window.webpackJsonp||[]).push([[296],{4221:function(e,t,s){"use strict";s.r(t);var i=s(905),a=s.n(i),n=s(28),r=s.n(n),o=s(155),l=s(1448),c=s(3),d=s(896),h=s(469);class BTCCoin extends(Object(h.d)(Object(h.b)(o.a))){constructor({alias:e,feeData:t,explorers:s,txWebUrl:i,socket:n}){super({alias:e,name:"Bitcoin",ticker:"BTC",decimal:8,derivation:"m/44'/0'/0'/0/0",unspendableBalance:"0",explorers:s,txWebUrl:i,socket:n}),this.plugins=[new d.a],this.feeData=t,this.feePerByte=t.feePerByte,this.coefficient=t.coefficient,this.resendTimeout=t.resendTimeout,this.coreLibrary=a.a,this.network=this.coreLibrary.Networks.livenet,this.mockAddress=c.b,this.feeRecommended=null}async createTransaction({address:e,amount:t,memo:s,userFee:i}){const a=await this.getUnspentOutputs(),n=this.explorer.calculateBalance(a),r=new this.BN(String(t)),o=i&&new this.BN(i)||await this.getFee(),l=n.lt(r.add(o))?n.sub(o):r,c=n.sub(r).sub(o),d=(new this.coreLibrary.Transaction).from(a).to([{address:e,satoshis:Number(l.toString())}]).fee(Number(o.toString()));return c.gt(new this.BN(0))&&d.to([{address:a[0].address,satoshis:Number(c.toString())}]),d.enableRBF(),d.sign(this.privateKey.toString()),d.serialize()}async getEstimatedTimeCfg(e=!1){try{if(null===this.feeRecommended||e){const{feesEstimateUrl:e}=(null==l?void 0:l.find(({className:e})=>"BTCCoin"===e))||{},{data:t}=await r.a.get(e);this.feeRecommended="object"!=typeof t?null:t}}catch(e){console.error(e)}return this.feeRecommended}async getEstimatedTimeTx(e,t="label"){const s={fastestFee:{time:6e4,label:"1-15 min"},halfHourFee:{time:18e5,label:"15-30 min"},hourFee:{time:36e5,label:"30-60 min"}};let i=null;try{const a=await this.getEstimatedTimeCfg();i=Object.keys(s).find(t=>e>=(null==a?void 0:a[t]))}finally{return s[i||"hourFee"][t]}}async availableBalance(e){const t=e&&new this.BN(e)||await this.getFee(),s=new this.BN(this.balance).sub(t).sub(new this.BN(this.unspendableBalance));return new this.BN(s).lt(new this.BN(0))?"0":this.toCurrencyUnit(s)}async validateAddress(e){return this.coreLibrary.Address.isValid(e||this.address,this.network.alias)}}t.default=BTCCoin}}]);