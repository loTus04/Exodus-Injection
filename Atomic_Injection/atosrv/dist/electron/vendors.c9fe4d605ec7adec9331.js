(window.webpackJsonp=window.webpackJsonp||[]).push([[306],{4274:function(t,e,a){"use strict";a.r(e);var s=a(5570),i=a.n(s),r=a(155),n=a(4),o=a(16),c=a.n(o);var l=t=>{const e=[],a=t.reduce((t,a)=>{const{tiptime:s,locktime:i,height:r,satoshis:n}=a,o=Math.floor((s-i)/60);if(r>=7777777||i<5e8||n<1e9||o<60||!r)return t;const l=r>=1e6?44640:525600;let h=Math.min(o,l);h-=59;const d=new c.a(Math.floor(n/10512e3)*h);return d.lt(new c.a(0))||(t=t.add(d),e.push(a)),t},new c.a(0));return{inputs:e,reward:a}},h=a(469),d=a(896);const w={messagePrefix:"",bip32:{public:76067358,private:76066276},pubKeyHash:60,scriptHash:5,wif:188,coin:"zec",consensusBranchId:{1:0,2:0,3:1537743641,4:1991772603}};class KMDCoin_KMDCoin extends(Object(h.g)(Object(h.e)(Object(h.b)(r.a)))){constructor({alias:t,feeData:e,explorers:a,txWebUrl:s,socket:r}){super({alias:t,name:"Komodo",ticker:"KMD",decimal:8,derivation:"m/44'/141'/0'/0/0",unspendableBalance:"0",explorers:a,txWebUrl:s,socket:r}),this.plugins=[new d.a],this.feePerByte=e.feePerByte,this.coefficient=e.coefficient,this.coreLibrary=i.a,this.transactions=[],this.network=w,this.balance=null,this.balances=null}getTransactionBuilder(){const t=new this.coreLibrary.TransactionBuilder(this.network);return t.setVersion(4),t.setLockTime(parseInt(Date.now()/1e3,10)),t.setVersionGroupId(parseInt("0x892F2085",16)),t.setExpiryHeight(499999999),t}signInput(t,e,a,s){t.sign(a,e,null,this.coreLibrary.Transaction.SIGHASH_ALL,s.satoshis)}async calculateReward(t){const e=await this.getUnspentOutputs(t),a=await Promise.all(e.map(({txid:t})=>this.getTransaction(t))),{blockHash:s}=await this.getProvider("utxo").getLatestBlock(),i=await this.getProvider("utxo").getBlock(s);e.forEach(t=>{const e=a.find(e=>e.txid===t.txid);t.locktime=e&&e.locktime,t.tiptime=i.time,t.satoshis=Number(t.satoshis)});const{inputs:r,reward:n}=l(e);return{inputs:r,reward:n}}async createClaimTransaction(t){const{inputs:e=[],reward:a}=t||await this.calculateReward(this.address);if(0===e.length)throw new Error("Claim is unavailable, please try again later.");if(a.toNumber()<1e6)throw new Error("Current reward is too low. Minimal amount is 0.01 KMD.");const s=e.reduce((t,{value:e})=>t.add(new this.BN(e)),new this.BN(0));return await this.buildTx(e,this.address,s.add(a).toNumber(),new this.BN(0))}async getInfo(){const{balance:t,balances:e}=await this.getProvider("balance").getInfo(this.address);if(this.balance=t,e)this.balances={rewards:e.interest>0?String(e.interest):"0"};else{const{reward:t}=await this.calculateReward(this.address);let e=t&&this.toCurrencyUnit(t);e||(e=await this.getProvider("rewards").getRewards(this.address).catch(t=>console.warn(t))),this.balances={rewards:String(e)}}return{balance:this.balance,balances:this.balances}}async claim(){try{const t=await this.createClaimTransaction();return await this.sendTransaction(t)}catch(t){throw new n.i({type:"claimError",error:t,instance:this})}}}e.default=KMDCoin_KMDCoin}}]);