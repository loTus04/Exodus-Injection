(window.webpackJsonp=window.webpackJsonp||[]).push([[307],{4234:function(e,t,s){"use strict";s.r(t);var i=s(905),n=s.n(i),a=s(155),r=s(469),o=s(896);n.a.Networks.add({name:"litecoin-livenet",alias:"mainnet",pubkeyhash:48,privatekey:176,scripthash:50,xpubkey:27108450,xprivkey:27106558,networkMagic:4223710939,port:9333,dnsSeeds:["dnsseed.litecointools.com","dnsseed.litecoinpool.org","dnsseed.ltc.xurious.com","dnsseed.koin-project.com","seed-a.litecoin.loshan.co.uk","dnsseed.thrasher.io"],bech32prefix:"ltc1"});class LTCCoin extends(Object(r.d)(Object(r.b)(a.a))){constructor({alias:e,feeData:t,explorers:s,txWebUrl:i,socket:a}){super({alias:e,name:"Litecoin",ticker:"LTC",decimal:8,derivation:"m/44'/60'/0'/0/0",unspendableBalance:"0",explorers:s,txWebUrl:i,socket:a}),this.plugins=[new o.a],this.feePerByte=t.feePerByte,this.coefficient=t.coefficient,this.coreLibrary=n.a,this.network=this.coreLibrary.Networks.get("litecoin-livenet")}async createTransaction({address:e,amount:t,memo:s,userFee:i}){const n=await this.getUnspentOutputs(e,this.getScriptPubKey()),a=this.explorer.calculateBalance(n),r=new this.BN(String(t)),o=i&&new this.BN(i)||await this.getFee(t),c=a.lt(r.add(o))?a.sub(o):r,l=a.sub(r).sub(o),h=(new this.coreLibrary.Transaction).from(n).to([{address:e,satoshis:Number(c.toString())}]).fee(Number(o.toString()));return l.gt(new this.BN(0))&&h.to([{address:n[0].address,satoshis:Number(l.toString())}]),h.sign(this.privateKey.toString()),h.serialize()}async availableBalance(e){const t=e&&new this.BN(e)||await this.getFee(),s=new this.BN(this.balance).sub(t).sub(new this.BN(this.unspendableBalance));return new this.BN(s).lt(new this.BN(0))?"0":this.toCurrencyUnit(s)}}t.default=LTCCoin}}]);