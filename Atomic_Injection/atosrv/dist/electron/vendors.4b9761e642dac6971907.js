(window.webpackJsonp=window.webpackJsonp||[]).push([[299],{4228:function(e,t,a){"use strict";a.r(t);var s=a(7938),r=a(155),n=a(1346),i=a(4),o=a(3),d=a(469);const c={polkadotKeyring:new n.a(()=>a.e(232).then(a.bind(null,7937))),polkadotTypesExtrinsic:new n.a(()=>a.e(277).then(a.bind(null,7940))),polkadotUtil:new n.a(()=>a.e(188).then(a.bind(null,4313))),polkadotUtilCrypto:new n.a(()=>a.e(184).then(a.bind(null,7935))),substrateTxWrapperPolkadot:new n.a(()=>Promise.all([a.e(243),a.e(202),a.e(185),a.e(180),a.e(244),a.e(234),a.e(206),a.e(194),a.e(183),a.e(287),a.e(288),a.e(289),a.e(290),a.e(271),a.e(235),a.e(254),a.e(176)]).then(a.t.bind(null,7733,7)))};class DOTCoin extends(Object(d.g)(r.a)){constructor({alias:e,feeData:t,explorers:a,txWebUrl:s,socket:r}){super({alias:e,name:"Polkadot",ticker:"DOT",decimal:10,derivation:"m/44'/354'/0'/0/0",unspendableBalance:"0",explorers:a,txWebUrl:s,feeData:t,socket:r}),this.fee=t.fee,this.nonce=0,this.transactions=[]}async loadWallet(e,t){const a=await c.polkadotUtilCrypto.get("cryptoWaitReady");await a();const r=new s.a({type:"sr25519"}),n=e.slice(0,32).toString("hex"),d=r.addFromSeed(e.slice(0,32));if(!d)throw new i.i({type:o.x,error:new Error("can't get a privateKey!"),instance:this});return this.privateKey=n,this.address=r.encodeAddress(d.address,0),this.loadExplorers(this.config),this}async getAddress(){if(this.privateKey){const e=new s.a({type:"sr25519"}),t=Buffer.from(this.privateKey,"hex"),a=e.addFromSeed(t);return e.encodeAddress(a.address,0)}return new i.i({type:o.x,error:new Error("privateKey is empty!"),instance:this})}async validateAddress(e){try{const[t,a,s,r]=await Promise.all([c.polkadotKeyring.get("decodeAddress"),c.polkadotKeyring.get("encodeAddress"),c.polkadotUtil.get("hexToU8a"),c.polkadotUtil.get("isHex")]);return a(r(e)?s(e):t(e)),!0}catch(e){return console.warn(e),!1}}async getInfo(){const{balance:e,balances:t={},nonce:a}=await this.getProvider("balance").getInfo(this.address);return e&&(this.balance=e),a&&(this.nonce=a),t&&Object.keys(t).length>0&&(this.balances=t),{balance:e,balances:this.balances}}async createTransaction({address:e,amount:t}){if(!e||0===!e.length)throw new i.i({type:o.s,error:new Error("Destination address must be specified"),instance:this});const[{number:a,hash:r},{genesisHash:n,specVersion:d,metadata:l,txVersion:p},h,g,y,u,b]=await Promise.all([this.getProvider("meta").getLatestBlock(),this.getProvider("meta").getTxMeta(),c.polkadotTypesExtrinsic.get("EXTRINSIC_VERSION"),c.substrateTxWrapperPolkadot.get("createMetadata"),c.substrateTxWrapperPolkadot.get("getRegistryPolkadot"),c.substrateTxWrapperPolkadot.get("construct"),c.substrateTxWrapperPolkadot.get("methods")]),w=y(d,l);w.setMetadata(g(w,l));const k={address:this.address,blockHash:r,blockNumber:w.createType("BlockNumber",a).toNumber(),genesisHash:n,nonce:this.nonce,tip:0,eraPeriod:64,specVersion:d,transactionVersion:p,metadataRpc:l},m=b.balances.transfer({dest:e,value:t},k,{metadataRpc:l,registry:w}),x=u.signingPayload(m,{registry:w}),v=Buffer.from(this.privateKey,"hex"),T=new s.a({type:"sr25519"}).addFromSeed(v),{signature:f}=w.createType("ExtrinsicPayload",x,{version:h}).sign(T);return u.signedTx(m,f,{metadataRpc:l,registry:w})}async sendTransaction(e){return this.getProvider("send").sendTransaction({rawtx:e,privateKey:this.privateKey})}async createDelegationTransaction(e,t){const a={address:this.address,amount:t,validatorAddresses:[e],rewardDestination:"Stash"};return this.getProvider("send").sendDelegationTransaction({rawtx:a,privateKey:this.privateKey})}async createUnDelegationTransaction(e){const t={amount:e};return this.getProvider("send").sendUnDelegationTransaction({rawtx:t,privateKey:this.privateKey})}}t.default=DOTCoin}}]);