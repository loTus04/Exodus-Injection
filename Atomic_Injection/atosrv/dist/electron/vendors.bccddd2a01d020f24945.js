(window.webpackJsonp=window.webpackJsonp||[]).push([[301],{4259:function(e,t,i){"use strict";i.r(t);var r=i(180),a=i(1735),s=i.n(a),n=i(155),o=i(4),c=i(3),p=i(469),h=i(896);class FIOCoin extends(Object(p.a)(Object(p.b)(n.a))){constructor({alias:e,feeData:t,explorers:i,txWebUrl:a,socket:s}){super({alias:e,name:"FIO",ticker:"FIO",decimal:8,derivation:"m/44'/235'/0'/0/0",unspendableBalance:"0",explorers:i,txWebUrl:a,socket:s,coreLibrary:r}),this.derivation="m/44'/235'/0'/0/0",this.plugins=[new h.a],this.feePerByte=t.feePerByte,this.coefficient=t.coefficient}loadWallet(e){return new Promise((t,i)=>{const r=this.coreLibrary.bip32.fromSeed(e,this.network).derivePath(this.derivation);r||i(new o.i({type:c.x,error:new Error("can't get a privateKey!"),instance:this})),this.privateKey=r.toWIF(),this.address=s.a.PrivateKey.fromString(this.privateKey).toPublic().toString("FIO"),t(this)})}getAddress(){return this.privateKey?s.a.PrivateKey.fromString(this.privateKey).toPublic().toString("FIO"):new Error(this.ticker+" privateKey is empty!!!")}}t.default=FIOCoin}}]);