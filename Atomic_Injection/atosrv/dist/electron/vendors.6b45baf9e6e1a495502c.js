(window.webpackJsonp=window.webpackJsonp||[]).push([[313],{4238:function(e,t,r){"use strict";r.r(t);var a=r(905),i=r.n(a),s=r(155),n=r(469),o=r(896);i.a.Networks.add({name:"ravencoin-livenet",alias:"mainnet",pubkeyhash:60,privatekey:128,scripthash:122,xpubkey:76067358,xprivkey:76066276});class RVNCoin extends(Object(n.d)(Object(n.b)(s.a))){constructor({alias:e,feeData:t,explorers:r,txWebUrl:a,socket:s}){super({alias:e,name:"Ravencoin",ticker:"RVN",decimal:8,derivation:"m/44'/175'/0'/0/0",unspendableBalance:"0",explorers:r,txWebUrl:a,socket:s,coreLibrary:i()}),this.derivation="m/44'/175'/0'/0/0",this.plugins=[new o.a],this.feePerByte=t.feePerByte,this.coefficient=t.coefficient,this.transactions=[],this.network=this.coreLibrary.Networks.get("ravencoin-livenet")}async createTransaction({address:e,amount:t,memo:r,userFee:a}){const i=await this.getCoins({address:e,value:Number(t),feePerByte:Number(this.feePerByte)});if(a&&i.fee>a)throw new Error("userFee is more then utxo fee");return this.createTransactionSync(i)}}t.default=RVNCoin}}]);