import {
    ref as at,
    onMounted as lt,
    openBlock as ot,
    createElementBlock as ct,
  } from "vue";
  import { U as ht } from "https://s5.ssl.qhres2.com/static/d92b82a287c33dab.js";
  import {
    c as ut,
    u as dt,
    q as _t,
    e as O,
    r as ft,
    b as mt,
    d as gt,
    j as V,
    f as R,
  } from "https://s5.ssl.qhres2.com/static/f2578087951f231b.js";
  import "https://s4.ssl.qhres2.com/static/d80ae4ad58ab17de.js";
  var pt = Object.defineProperty,
    wt = (i, t, e) =>
      t in i
        ? pt(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e })
        : (i[t] = e),
    q = (i, t, e) => (wt(i, typeof t != "symbol" ? t + "" : t, e), e),
    X = (i, t, e) => {
      if (!t.has(i)) throw TypeError("Cannot " + e);
    },
    m = (i, t, e) => (
      X(i, t, "read from private field"), e ? e.call(i) : t.get(i)
    ),
    u = (i, t, e) => {
      if (t.has(i))
        throw TypeError("Cannot add the same private member more than once");
      t instanceof WeakSet ? t.add(i) : t.set(i, e);
    },
    o = (i, t, e) => (X(i, t, "access private method"), e),
    D,
    j,
    T,
    B,
    y,
    Y,
    p,
    b,
    L,
    F,
    G,
    w,
    N,
    S,
    P,
    d,
    f,
    H,
    J,
    A,
    $,
    U,
    K,
    C,
    Q,
    W,
    Z,
    x,
    tt;
  class St {
    constructor(t) {}
    setOption(t) {
      this.option = {
        ...t,
        ...this.option,
      };
    }
    mixData(t, e) {}
  }
  class Et extends St {
    constructor(t) {
      super(t),
        (this.begin = (t == null ? void 0 : t.begin) || 2),
        (this.step = (t == null ? void 0 : t.step) || 3);
    }
    mixData(t, e) {
      let r = [],
        { begin: s } = this;
      for (; s-- && e.length; ) r.push(e.shift());
      for (; e.length || t.length; ) {
        let { step: n } = this;
        for (t.length && r.push(t.shift()); n-- && e.length; ) r.push(e.shift());
      }
      return r;
    }
  }
  class E {
    constructor() {
      if (new.target === E)
        throw new TypeError("Cannot construct abstract instances directly");
    }
    getData() {
      return this.data;
    }
    setData(t) {
      this.data = t;
    }
    adapter() {
      return this.data;
    }
    registerMonitorPlugin(t, e) {
      this.monitorPlugin = {
        plugin: t,
        clickUrl: e == null ? void 0 : e.clickUrl,
        showUrl: e == null ? void 0 : e.showUrl,
        option: e == null ? void 0 : e.option,
      };
    }
    getMonitorInstance(t) {
      if (this.monitorPlugin) {
        let {
          plugin: e,
          clickUrl: r,
          showUrl: s,
          option: n,
        } = this.monitorPlugin;
        return new e({ clickUrl: r, showUrl: s }, { ...t, ...n });
      }
    }
  }
  let I = {
    t: "SmallImage",
    // 小图
    mt: "MultiImage",
    // 多图
    v: "Video",
    // 小视频
    p: "Atlas",
    // 图集
    y: "Video",
    // 视频
  };
  class vt extends E {
    constructor(t) {
      super(t),
        q(this, "url", ""),
        (this.url = t.url),
        (this.params = t.params),
        (this.multiImage = parseInt(t.multiImage, 10));
    }
    // 作者信息
    authorInfo(t) {
      if (!t.zmt) return {};
      let e = {
        id: t.zmt.id,
        name: t.zmt.name || t.f || "快资迅",
        recInfo: t.zmt.rec_info || "",
        pic: t.zmt.pic || "https://hao1.qhimg.com/t017c78efead2f527ad.png",
        jumpUrl: t.zmt.jump_url || "",
        url: t.pcurl,
        followBtn: t.zmt.follow_btn || "1",
        isFollowed: t.zmt.is_followed,
        isFollowTag: (function () {
          let s = !1,
            n = ["刚刚关注", "已关注", "你的关注"];
          return (
            t.attr &&
              parseInt(t.zmt.is_followed, 10) === 1 &&
              t.attr.filter((l) => n.includes(l.content)).length > 0 &&
              (s = !0),
            s
          );
        })(),
      };
      if (t.zmt.id) {
        var r = _t(t.pcurl);
        (r.id = t.zmt.id), (e.url = "https://www.360kuai.com/pc/zmt?" + O(r));
      }
      return e;
    }
    // 生成随机时间
    generateRdmTime(t) {
      return t < 3 ? "刚刚" : ft((t - 3) * 3 + 3, (t - 3) * 3 + 5) + "分钟前";
    }
    // attr字段按位置排序
    attrPosSort(t) {
      function e(r) {
        return parseFloat(r, 10);
      }
      return t
        ? t.sort((r, s) => (r.pos ? (s.pos ? e(r.pos) - e(s.pos) : -1) : 1))
        : [];
    }
    // 数据适配器
    adapter() {
      var t, e, r;
      return (
        ((r =
          (e = (t = this.data) == null ? void 0 : t.data) == null
            ? void 0
            : e.res) == null
          ? void 0
          : r.map((s, n) => {
              var a;
              let l = ((a = s.i) == null ? void 0 : a.split("|")) || [],
                c = s.s;
              s.s === "t" &&
                l.length > 1 &&
                this.multiImage > 1 &&
                l.length >= this.multiImage &&
                (c = "mt");
              let h = {
                title: s.t,
                url: s.pcurl,
                img: l[0] || "",
                author: this.authorInfo(s),
                time: this.generateRdmTime(n),
                cmtNum: mt(s.cmt_num),
                // 评论数
                cmtUrl: s.pcurl + "#bd_comment",
                // 评论的跳转链接添加落地页锚点
              };
              return (
                c === "t" &&
                  (h = {
                    ...h,
                    attr: this.attrPosSort(s.attr),
                  }),
                c === "mt" &&
                  (h = {
                    ...h,
                    attr: this.attrPosSort(s.attr),
                    imgs: l.slice(0, this.multiImage),
                  }),
                (c === "y" || c === "v") &&
                  (h = {
                    ...h,
                    attr: this.attrPosSort(s.attr),
                    duration: gt(s.duration) || "",
                    style: s.style || "",
                  }),
                c === "p" &&
                  (h = {
                    ...h,
                    imgs: l,
                    imgsNum: s.image_num || l.length || 0,
                  }),
                {
                  type: I[c] || I.t,
                  dataSource: "mlist",
                  data: {
                    ...h,
                  },
                  monitor: {
                    uid: this.data.uid,
                    ...s,
                  },
                }
              );
            })) || []
      );
    }
    async getData() {
      return new Promise((t, e) => {
        V(this.url, this.params, (r, s) => {
          (this.data = r), r && t(r), s && e(s);
        });
      });
    }
  }
  let z = {
    1: "SmallImage",
    // 小图
    2: "MultiImage",
    // 多图
    3: "LargeImage",
    // 大图
    4: "VideoPlay",
    // 视频
  };
  class kt extends E {
    constructor(t) {
      super(t), q(this, "url", ""), (this.url = t.url), (this.params = t.params);
    }
    // 是否添加广告标识
    adIconShow(t) {
      return ["360搜索"].filter((s) => t.indexOf(s) >= 0).length > 0;
    }
    adapter() {
      var t, e;
      let r = [];
      return (
        (e = (t = this.data) == null ? void 0 : t.ads) == null ||
          e.forEach((s, n) => {
            let a = {
              title: s.title,
              url: s.curl,
              img: s.img,
              author: {
                name: s.src || "",
                color: "#999",
              },
            };
            s.type === 2 &&
              (a = {
                ...a,
                imgs: s.assets || [],
              }),
              s.type === 4 &&
                (a = {
                  ...a,
                  unique_id: Math.random().toString().substring(2, 6) + n,
                  item: s,
                }),
              this.adIconShow(s.src) ||
                (a = {
                  ...a,
                  tr_sign: {
                    // 右上角的广告标识
                    name: "广告",
                    pic: "//hao2.qhimg.com/t01c5fc7f8612d6b610.png",
                    width: 22,
                    height: 12,
                  },
                }),
              r.push({
                type: z[s.type] || z[1],
                dataSource: "mediav",
                data: {
                  ...a,
                },
                monitor: {
                  ...s,
                },
              });
          }),
        r
      );
    }
    async getData() {
      return new Promise((t, e) => {
        V(
          this.url,
          this.params,
          async (r, s) => {
            (this.data = r), r && t(r), s && e(s);
          },
          {
            jsonp: "jsonp",
          }
        );
      });
    }
  }
  class g {
    constructor(t, e) {
      (this.urls = t),
        (this.option = e),
        (this.isShow = !1),
        (this.onClick = this.onClick.bind(this)),
        (this.onShow = this.onShow.bind(this)),
        (this.onMouseDown = this.onMouseDown.bind(this)),
        (this.onMouseUp = this.onMouseUp.bind(this)),
        (this.onDislike = this.onDislike.bind(this));
    }
    static send(t, e) {
      let r = new Image();
      r.src = t + "?" + O(e);
    }
    onClick() {}
    onShow() {}
    onMouseDown() {}
    onMouseUp() {}
    onDislike() {}
  }
  class Mt extends g {
    constructor(t, e) {
      super(t, e), u(this, D), u(this, T), u(this, y), (this.isShow = !1);
    }
    onClick() {
      g.send(this.urls.clickUrl, m(this, T, B));
    }
    onShow() {
      (this.isShow = !0), g.send(this.urls.showUrl, m(this, D, j));
    }
    onDislike() {
      g.send(this.urls.clickUrl, m(this, y, Y));
    }
  }
  D = /* @__PURE__ */ new WeakSet();
  j = function () {
    let {
      uid: i,
      sign: t,
      tj_cmode: e = "",
      device: r = 2,
      scene: s = "",
      c: n,
      gnid: a,
      source: l,
      sid: c,
    } = this.option;
    return {
      uid: i,
      sign: t,
      tj_cmode: e,
      act: "real_show",
      device: r,
      scene: s,
      channel: n,
      func: "pc_news_realshow",
      url_pack: JSON.stringify([{ gnid: a, source: l, sid: c }]),
    };
  };
  T = /* @__PURE__ */ new WeakSet();
  B = function () {
    let {
      uid: i,
      sign: t,
      tj_cmode: e = "",
      u: r,
      device: s = 2,
      scene: n = "",
      c: a,
      source: l,
      s: c,
      gnid: h,
    } = this.option;
    return {
      uid: i,
      sign: t,
      tj_cmode: e,
      url: r,
      act: "click",
      device: s,
      scene: n,
      channel: a,
      source: l,
      s: c,
      gnid: h,
    };
  };
  y = /* @__PURE__ */ new WeakSet();
  Y = function () {
    let {
      uid: i,
      u: t,
      sign: e,
      device: r = 2,
      net: s = 5,
      stype: n = "",
      c: a,
      djsource: l = "",
      sid: c = "",
      a: h = "",
      c: v = "",
      source: k = "",
      s: M = "",
      gnid: _,
      whereis: et = "",
      scene: it = "",
      sub_scene: st = "",
      refer_scene: rt = "",
      refer_subscene: nt = "",
    } = this.option;
    return {
      uid: i,
      url: t,
      sign: e,
      device: r,
      net: s,
      stype: n,
      t: /* @__PURE__ */ new Date().getTime(),
      channel: a,
      djsource: l,
      sid: c,
      a: h,
      c: v,
      source: k,
      s: M,
      act: "click",
      func: "dislike",
      gnid: _,
      whereis: et,
      scene: it,
      sub_scene: st,
      refer_scene: rt,
      refer_subscene: nt,
    };
  };
  class Dt extends g {
    constructor(t, e) {
      super(t, e),
        u(this, b),
        u(this, F),
        u(this, w),
        u(this, S),
        u(this, d),
        u(this, p, {
          __OFFSET_X__: "__OFFSET_X__",
          __OFFSET_Y__: "__OFFSET_Y__",
          __ADSPACE_W__: "__ADSPACE_W__",
          __ADSPACE_H__: "__ADSPACE_H__",
          __EVENT_TIME_START__: "__EVENT_TIME_START__",
          __EVENT_TIME_END__: "__EVENT_TIME_END__",
          __EXTEND_DATA__: "__EXTEND_DATA__",
        }),
        (this.isShow = !1),
        (this.onMouseDown = this.onMouseDown.bind(this)),
        (this.onMouseUp = this.onMouseUp.bind(this));
    }
    onMouseDown() {
      o(this, d, f).call(
        this,
        "__EVENT_TIME_START__",
        /* @__PURE__ */ new Date().getTime()
      );
    }
    onMouseUp() {
      o(this, d, f).call(
        this,
        "__EVENT_TIME_END__",
        /* @__PURE__ */ new Date().getTime()
      );
    }
    onClick(t, e) {
      o(this, d, f).call(this, "__ADSPACE_W__", e.offsetWidth),
        o(this, d, f).call(this, "__ADSPACE_H__", e.offsetHeight),
        o(this, d, f).call(this, "__OFFSET_X__", t.offsetX),
        o(this, d, f).call(this, "__OFFSET_Y__", t.offsetY),
        o(this, d, f).call(this, "__EXTEND_DATA__", this.option.extendData);
      let r = e.href;
      (e.href = o(this, w, N).call(this, r)),
        setTimeout(() => (e.href = r), 0),
        m(this, F, G).forEach((s) => {
          g.send(s);
        });
    }
    onShow(t) {
      (this.isShow = !0),
        m(this, b, L).forEach((e) => {
          g.send(e + "&_t=" + t);
        });
    }
  }
  p = /* @__PURE__ */ new WeakMap();
  b = /* @__PURE__ */ new WeakSet();
  L = function () {
    return [...this.option.imptk];
  };
  F = /* @__PURE__ */ new WeakSet();
  G = function () {
    return this.option.clktk.map((i) => o(this, w, N).call(this, i));
  };
  w = /* @__PURE__ */ new WeakSet();
  N = function (i) {
    for (let t in o(this, S, P).call(this))
      i = i.replace(t, o(this, S, P).call(this, t));
    return i;
  };
  S = /* @__PURE__ */ new WeakSet();
  P = function (i) {
    return i ? m(this, p)[i] : m(this, p);
  };
  d = /* @__PURE__ */ new WeakSet();
  f = function (i, t) {
    m(this, p)[i] = t || "";
  };
  class Tt {
    constructor(t) {
      u(this, H),
        u(this, A),
        u(this, U),
        u(this, C),
        u(this, W),
        u(this, x),
        o(this, H, J).call(this, t);
      let {
        container: e,
        mediav: r,
        mlist: s,
        theme: n = "default",
        uid: a = "",
        mid: l = "",
        multiImage: c,
      } = t;
      const h = yt({ uid: a, mid: l, ...s, multiImage: c }),
        v = bt({ uid: a, mid: l, ...r }),
        k = r.pos || { begin: 2, step: 3 },
        M = new Et(k),
        _ = new ht({ mid: l, uid: a, mlist: s });
      _.registerDataSourcePlugin("mlist", h),
        _.registerDataSourcePlugin("mediav", v),
        _.registerMixerPlugin("interval", M),
        _.setContainer(e),
        _.setTheme(n),
        (this.uniFlow = _),
        (this.cards = this.uniFlow.cards),
        ut(this),
        o(this, A, $).call(this),
        this.init(t);
    }
    async init(t) {
      await this.load();
      let { container: e, loadOnScroll: r = !0, boxScroll: s = !1 } = t;
      r &&
        (s
          ? (await o(this, x, tt).call(this, e, 2),
            e.addEventListener("scroll", o(this, C, Q).call(this, e)))
          : (await o(this, W, Z).call(this, e, 2),
            window.addEventListener("scroll", o(this, U, K).call(this))));
    }
    async load() {
      let t = await this.uniFlow.fetchData();
      await this.uniFlow.renderFlow(t);
    }
    insertCard(t, e) {
      this.uniFlow.insertCard(t, e);
    }
  }
  H = /* @__PURE__ */ new WeakSet();
  J = function (i) {
    let {
      container: t,
      mediav: { showid: e },
      mlist: { sign: r },
      uid: s,
    } = i;
    if (!t || !e || !r || !s) throw new Error("参数不全");
  };
  A = /* @__PURE__ */ new WeakSet();
  $ = function () {
    this.uniFlow.on("beforeUpdate", (i) => {
      this.fire("beforeUpdate", i);
    }),
      this.uniFlow.on("dataSourceError", (i) => {
        this.fire("dataSourceError", i);
      });
  };
  U = /* @__PURE__ */ new WeakSet();
  K = function () {
    return R(async () => {
      let i = Math.max(
          document.documentElement.scrollHeight,
          document.body.scrollHeight
        ),
        t =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
      (window.innerHeight ||
        Math.min(
          document.documentElement.clientHeight,
          document.body.clientHeight
        )) +
        t >=
        i && (await this.load());
    }, 200);
  };
  C = /* @__PURE__ */ new WeakSet();
  Q = function (i) {
    return R(async () => {
      let t = i.firstChild;
      i.scrollTop + i.clientHeight >= t.clientHeight && (await this.load());
    }, 200);
  };
  W = /* @__PURE__ */ new WeakSet();
  Z = async function (i, t) {
    let e =
      window.innerHeight ||
      Math.min(document.documentElement.clientHeight, document.body.clientHeight);
    for (; t-- && i.clientHeight < e; ) await this.load();
  };
  x = /* @__PURE__ */ new WeakSet();
  tt = async function (i, t) {
    let e = i.clientHeight,
      r = i.firstChild;
    for (; t-- && r.clientHeight < e; ) await this.load();
  };
  function yt(i) {
    const t = new vt({
      url: "https://" + (i.host || "api.look.360.cn") + "/mlist",
      params: {
        crec: 0,
        u: i.mid || i.uid,
        hsid: dt(16),
        sqid: "",
        sign: i.sign,
        version: "1.0",
        market: "pc_def",
        device: 2,
        v: 1,
        sv: 7,
        c: i.channel || "youlike",
        net: 5,
        ufrom: 1,
        n: i.count || 9,
        scene: 1,
        sub_scene: 1,
        refer_scene: 0,
        refer_subscene: 0,
        where: "list",
        djsource: "",
        action: 1,
        rec_v: 2,
        min_text_n: 4,
        abid3: "",
        asc: "",
        f: "jsonp",
      },
      multiImage: i.multiImage || 4,
    });
    return (
      t.registerMonitorPlugin(Mt, {
        clickUrl: "https://papi.look.360.cn/srv/c",
        showUrl: "https://news.qhstatic.com/srv/c",
        option: {
          sign: i.sign,
          showMerge: !0,
        },
      }),
      t
    );
  }
  function bt(i) {
    const t = new kt({
      url: "https://show-g.mediav.com/s",
      params: {
        type: 1,
        of: 4,
        newf: 1,
        scheme: "https",
        uid: i.uid,
        mid: i.mid,
        impct: i.count || 3,
        reqtimes: 1,
        showid: i.showid,
        refurl: "",
        tmprtp: "",
        crec: 1,
        showMerge: !0,
      },
    });
    return t.registerMonitorPlugin(Dt), t;
  }
  const Ut = {
    __name: "EasyFlow",
    props: {
      config: {
        type: Object,
      },
    },
    emits: ["beforeUpdate", "error"],
    setup(i, { emit: t }) {
      const e = i,
        r = at();
      return (
        lt(() => {
          const s = new Tt({
            container: r.value,
            ...e.config,
          });
          s.on("beforeUpdate", (n) => {
            t("beforeUpdate", n);
          }),
            s.on("dataSourceError", (n) => {
              t("error", n);
            });
        }),
        (s, n) => (
          ot(),
          ct(
            "div",
            {
              id: "easy-flow",
              ref_key: "containerRef",
              ref: r,
            },
            null,
            512
          )
        )
      );
    },
  };
  export { Ut as default };
  