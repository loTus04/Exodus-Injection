(window.webpackJsonp=window.webpackJsonp||[]).push([[293],{4233:function(e,s,t){"use strict";t.r(s);var a=t(878),n=t(155),i=t(469),r=t(896);class BANDCoin extends(Object(i.f)(Object(i.g)(n.a))){constructor({alias:e,feeData:s,explorers:t,txWebUrl:a,socket:n}){super({alias:e,name:"Band Protocol",ticker:"BAND",decimal:6,derivation:"m/44'/494'/0'/0/0",unspendableBalance:"0",explorers:t,txWebUrl:a,socket:n,feeData:s,denom:"uband"}),this.derivation="m/44'/494'/0'/0/0",this.prefix="band",this.denom="uband",this.plugins=[new r.a],this.sendFeeGas=s.sendFeeGas||"200000",this.stakingFeeGas=s.stakingFeeGas||"300000",this.claimFeeGas=s.claimFeeGas||"600000",this.transactions=[],this.balances=null,this.fields.paymentId=!0,this.reserveForStake=s.reserveForStake||"400"}async signTransaction(e){const s=this.getSignKeys(),{sequence:t="0",account_number:n}=await this.getProvider("send").getAuth(this.address),i={sequence:t,account_number:n,chain_id:this.getProvider("send").getChainId()},r=Object(a.b)(e,s,i),c=e;return c.signatures=[{signature:r.signature,pub_key:{type:"tendermint/PubKeySecp256k1",value:Buffer.from(""+s.publicKey,"hex").toString("base64")},public_key:Buffer.from("eb5ae98721"+s.publicKey,"hex").toString("base64")}],c}}s.default=BANDCoin}}]);