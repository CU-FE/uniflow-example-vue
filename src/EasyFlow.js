import { ref as lt, onMounted as ot, openBlock as ct, createElementBlock as ht } from "vue";
import { U as ut } from "https://s5.ssl.qhres2.com/static/d92b82a287c33dab.js";
import { c as dt, u as _t, q as ft, e as V, r as mt, b as gt, d as pt, j as R, f as q } from "https://s5.ssl.qhres2.com/static/f2578087951f231b.js";
import "https://s4.ssl.qhres2.com/static/d80ae4ad58ab17de.js";
var wt = Object.defineProperty, St = (i, t, e) => t in i ? wt(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e, X = (i, t, e) => (St(i, typeof t != "symbol" ? t + "" : t, e), e), j = (i, t, e) => {
  if (!t.has(i))
    throw TypeError("Cannot " + e);
}, d = (i, t, e) => (j(i, t, "read from private field"), e ? e.call(i) : t.get(i)), c = (i, t, e) => {
  if (t.has(i))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(i) : t.set(i, e);
}, o = (i, t, e) => (j(i, t, "access private method"), e), T, B, y, Y, b, L, p, F, G, P, J, w, I, S, H, _, m, E, A, $, U, K, W, Q, C, Z, x, tt, N, et;
class Et {
  constructor(t) {
  }
  setOption(t) {
    this.option = {
      ...t,
      ...this.option
    };
  }
  mixData(t, e) {
  }
}
class vt extends Et {
  constructor(t) {
    super(t), this.begin = (t == null ? void 0 : t.begin) || 2, this.step = (t == null ? void 0 : t.step) || 3;
  }
  mixData(t, e) {
    let r = [], { begin: s } = this;
    for (; s-- && e.length; )
      r.push(e.shift());
    for (; e.length || t.length; ) {
      let { step: n } = this;
      for (t.length && r.push(t.shift()); n-- && e.length; )
        r.push(e.shift());
    }
    return r;
  }
}
class v {
  constructor() {
    if (new.target === v)
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
      option: e == null ? void 0 : e.option
    };
  }
  getMonitorInstance(t) {
    if (this.monitorPlugin) {
      let { plugin: e, clickUrl: r, showUrl: s, option: n } = this.monitorPlugin;
      return new e({ clickUrl: r, showUrl: s }, { ...t, ...n });
    }
  }
}
let z = {
  t: "SmallImage",
  // 小图
  mt: "MultiImage",
  // 多图
  v: "Video",
  // 小视频
  p: "Atlas",
  // 图集
  y: "Video"
  // 视频
};
class kt extends v {
  constructor(t) {
    super(t), X(this, "url", ""), this.url = t.url, this.params = t.params, this.multiImage = parseInt(t.multiImage, 10);
  }
  // 作者信息
  authorInfo(t) {
    if (!t.zmt)
      return {};
    let e = {
      id: t.zmt.id,
      name: t.zmt.name || t.f || "快资迅",
      recInfo: t.zmt.rec_info || "",
      pic: t.zmt.pic || "https://hao1.qhimg.com/t017c78efead2f527ad.png",
      jumpUrl: t.zmt.jump_url || "",
      url: t.pcurl,
      followBtn: t.zmt.follow_btn || "1",
      isFollowed: t.zmt.is_followed,
      isFollowTag: function() {
        let s = !1, n = ["刚刚关注", "已关注", "你的关注"];
        return t.attr && parseInt(t.zmt.is_followed, 10) === 1 && t.attr.filter((l) => n.includes(l.content)).length > 0 && (s = !0), s;
      }()
    };
    if (t.zmt.id) {
      var r = ft(t.pcurl);
      r.id = t.zmt.id, e.url = "https://www.360kuai.com/pc/zmt?" + V(r);
    }
    return e;
  }
  // 生成随机时间
  generateRdmTime(t) {
    return t < 3 ? "刚刚" : mt((t - 3) * 3 + 3, (t - 3) * 3 + 5) + "分钟前";
  }
  // attr字段按位置排序
  attrPosSort(t) {
    function e(r) {
      return parseFloat(r, 10);
    }
    return t ? t.sort((r, s) => r.pos ? s.pos ? e(r.pos) - e(s.pos) : -1 : 1) : [];
  }
  // 数据适配器 
  adapter() {
    var t, e, r;
    return ((r = (e = (t = this.data) == null ? void 0 : t.data) == null ? void 0 : e.res) == null ? void 0 : r.map((s, n) => {
      var a;
      let l = ((a = s.i) == null ? void 0 : a.split("|")) || [], h = s.s;
      s.s === "t" && l.length > 1 && this.multiImage > 1 && l.length >= this.multiImage && (h = "mt");
      let u = {
        title: s.t,
        url: s.pcurl,
        img: l[0] || "",
        author: this.authorInfo(s),
        time: this.generateRdmTime(n),
        cmtNum: gt(s.cmt_num),
        // 评论数
        cmtUrl: s.pcurl + "#bd_comment"
        // 评论的跳转链接添加落地页锚点
      };
      return h === "t" && (u = {
        ...u,
        attr: this.attrPosSort(s.attr)
      }), h === "mt" && (u = {
        ...u,
        attr: this.attrPosSort(s.attr),
        imgs: l.slice(0, this.multiImage)
      }), (h === "y" || h === "v") && (u = {
        ...u,
        attr: this.attrPosSort(s.attr),
        duration: pt(s.duration) || "",
        style: s.style || ""
      }), h === "p" && (u = {
        ...u,
        imgs: l,
        imgsNum: s.image_num || l.length || 0
      }), {
        type: z[h] || z.t,
        dataSource: "mlist",
        data: {
          ...u
        },
        monitor: {
          uid: this.data.uid,
          ...s
        }
      };
    })) || [];
  }
  async getData() {
    return new Promise((t, e) => {
      R(this.url, this.params, (r, s) => {
        this.data = r, r && t(r), s && e(s);
      });
    });
  }
}
let O = {
  1: "SmallImage",
  // 小图
  2: "MultiImage",
  // 多图
  3: "LargeImage",
  // 大图
  4: "VideoPlay"
  // 视频
};
class Mt extends v {
  constructor(t) {
    super(t), X(this, "url", ""), this.url = t.url, this.params = t.params;
  }
  // 是否添加广告标识
  adIconShow(t) {
    return ["360搜索"].filter((s) => t.indexOf(s) >= 0).length > 0;
  }
  adapter() {
    var t, e;
    let r = [];
    return (e = (t = this.data) == null ? void 0 : t.ads) == null || e.forEach((s, n) => {
      let a = {
        title: s.title,
        url: s.curl,
        img: s.img,
        author: {
          name: s.src || "",
          color: "#999"
        }
      };
      s.type === 2 && (a = {
        ...a,
        imgs: s.assets || []
      }), s.type === 4 && (a = {
        ...a,
        unique_id: Math.random().toString().substring(2, 6) + n,
        item: s
      }), this.adIconShow(s.src) || (a = {
        ...a,
        tr_sign: {
          // 右上角的广告标识
          name: "广告",
          pic: "//hao2.qhimg.com/t01c5fc7f8612d6b610.png",
          width: 22,
          height: 12
        }
      }), r.push({
        type: O[s.type] || O[1],
        dataSource: "mediav",
        data: {
          ...a
        },
        monitor: {
          ...s
        }
      });
    }), r;
  }
  async getData() {
    return new Promise((t, e) => {
      R(this.url, this.params, async (r, s) => {
        this.data = r, r && t(r), s && e(s);
      }, {
        jsonp: "jsonp"
      });
    });
  }
}
class g {
  constructor(t, e) {
    this.urls = t, this.option = e, this.isShow = !1, this.onClick = this.onClick.bind(this), this.onShow = this.onShow.bind(this), this.onMouseDown = this.onMouseDown.bind(this), this.onMouseUp = this.onMouseUp.bind(this), this.onDislike = this.onDislike.bind(this);
  }
  static send(t, e) {
    let r = new Image();
    r.src = t + "?" + V(e);
  }
  onClick() {
  }
  onShow() {
  }
  onMouseDown() {
  }
  onMouseUp() {
  }
  onDislike() {
  }
}
class Dt extends g {
  constructor(t, e) {
    super(t, e), c(this, T), c(this, y), c(this, b), this.isShow = !1;
  }
  onClick() {
    g.send(this.urls.clickUrl, d(this, y, Y));
  }
  onShow() {
    this.isShow = !0, g.send(this.urls.showUrl, d(this, T, B));
  }
  onDislike() {
    g.send(this.urls.clickUrl, d(this, b, L));
  }
}
T = /* @__PURE__ */ new WeakSet();
B = function() {
  let { uid: i, sign: t, tj_cmode: e = "", device: r = 2, scene: s = "", c: n, gnid: a, source: l, sid: h } = this.option;
  return {
    uid: i,
    sign: t,
    tj_cmode: e,
    act: "real_show",
    device: r,
    scene: s,
    channel: n,
    func: "pc_news_realshow",
    url_pack: JSON.stringify([{ gnid: a, source: l, sid: h }])
  };
};
y = /* @__PURE__ */ new WeakSet();
Y = function() {
  let { uid: i, sign: t, tj_cmode: e = "", u: r, device: s = 2, scene: n = "", c: a, source: l, s: h, gnid: u } = this.option;
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
    s: h,
    gnid: u
  };
};
b = /* @__PURE__ */ new WeakSet();
L = function() {
  let { uid: i, u: t, sign: e, device: r = 2, net: s = 5, stype: n = "", c: a, djsource: l = "", sid: h = "", a: u = "", c: k = "", source: M = "", s: D = "", gnid: f, whereis: it = "", scene: st = "", sub_scene: rt = "", refer_scene: nt = "", refer_subscene: at = "" } = this.option;
  return {
    uid: i,
    url: t,
    sign: e,
    device: r,
    net: s,
    stype: n,
    t: (/* @__PURE__ */ new Date()).getTime(),
    channel: a,
    djsource: l,
    sid: h,
    a: u,
    c: k,
    source: M,
    s: D,
    act: "click",
    func: "dislike",
    gnid: f,
    whereis: it,
    scene: st,
    sub_scene: rt,
    refer_scene: nt,
    refer_subscene: at
  };
};
class Tt extends g {
  constructor(t, e) {
    super(t, e), c(this, F), c(this, P), c(this, w), c(this, S), c(this, _), c(this, p, {
      __OFFSET_X__: "__OFFSET_X__",
      __OFFSET_Y__: "__OFFSET_Y__",
      __ADSPACE_W__: "__ADSPACE_W__",
      __ADSPACE_H__: "__ADSPACE_H__",
      __EVENT_TIME_START__: "__EVENT_TIME_START__",
      __EVENT_TIME_END__: "__EVENT_TIME_END__",
      __EXTEND_DATA__: "__EXTEND_DATA__"
    }), this.isShow = !1, this.onMouseDown = this.onMouseDown.bind(this), this.onMouseUp = this.onMouseUp.bind(this);
  }
  onMouseDown() {
    o(this, _, m).call(this, "__EVENT_TIME_START__", (/* @__PURE__ */ new Date()).getTime());
  }
  onMouseUp() {
    o(this, _, m).call(this, "__EVENT_TIME_END__", (/* @__PURE__ */ new Date()).getTime());
  }
  onClick(t, e) {
    o(this, _, m).call(this, "__ADSPACE_W__", e.offsetWidth), o(this, _, m).call(this, "__ADSPACE_H__", e.offsetHeight), o(this, _, m).call(this, "__OFFSET_X__", t.offsetX), o(this, _, m).call(this, "__OFFSET_Y__", t.offsetY), o(this, _, m).call(this, "__EXTEND_DATA__", this.option.extendData);
    let r = e.href;
    e.href = o(this, w, I).call(this, r), setTimeout(() => e.href = r, 0), d(this, P, J).forEach((s) => {
      g.send(s);
    });
  }
  onShow(t) {
    this.isShow = !0, d(this, F, G).forEach((e) => {
      g.send(e + "&_t=" + t);
    });
  }
}
p = /* @__PURE__ */ new WeakMap();
F = /* @__PURE__ */ new WeakSet();
G = function() {
  return [...this.option.imptk];
};
P = /* @__PURE__ */ new WeakSet();
J = function() {
  return this.option.clktk.map((i) => o(this, w, I).call(this, i));
};
w = /* @__PURE__ */ new WeakSet();
I = function(i) {
  for (let t in o(this, S, H).call(this))
    i = i.replace(t, o(this, S, H).call(this, t));
  return i;
};
S = /* @__PURE__ */ new WeakSet();
H = function(i) {
  return i ? d(this, p)[i] : d(this, p);
};
_ = /* @__PURE__ */ new WeakSet();
m = function(i, t) {
  d(this, p)[i] = t || "";
};
class yt {
  constructor(t) {
    c(this, A), c(this, U), c(this, W), c(this, C), c(this, x), c(this, N), c(this, E, 100), o(this, A, $).call(this, t);
    let { container: e, mediav: r, mlist: s, theme: n = "default", uid: a = "", mid: l = "", multiImage: h } = t;
    const u = bt({ uid: a, mid: l, ...s, multiImage: h }), k = Ft({ uid: a, mid: l, ...r }), M = r.pos || { begin: 2, step: 3 }, D = new vt(M), f = new ut({ mid: l, uid: a, mlist: s });
    f.registerDataSourcePlugin("mlist", u), f.registerDataSourcePlugin("mediav", k), f.registerMixerPlugin("interval", D), f.setContainer(e), f.setTheme(n), this.uniFlow = f, this.cards = this.uniFlow.cards, dt(this), o(this, U, K).call(this), this.init(t);
  }
  async init(t) {
    await this.load();
    let { container: e, loadOnScroll: r = !0, boxScroll: s = !1 } = t;
    r && (s ? (await o(this, N, et).call(this, e, 2), e.addEventListener("scroll", o(this, C, Z).call(this, e))) : (await o(this, x, tt).call(this, e, 2), window.addEventListener("scroll", o(this, W, Q).call(this))));
  }
  async load() {
    let t = await this.uniFlow.fetchData();
    await this.uniFlow.renderFlow(t);
  }
  insertCard(t, e) {
    this.uniFlow.insertCard(t, e);
  }
}
E = /* @__PURE__ */ new WeakMap();
A = /* @__PURE__ */ new WeakSet();
$ = function(i) {
  let { container: t, mediav: { showid: e }, mlist: { sign: r }, uid: s } = i;
  if (!t || !e || !r || !s)
    throw new Error("参数不全");
};
U = /* @__PURE__ */ new WeakSet();
K = function() {
  this.uniFlow.on("beforeUpdate", (i) => {
    this.fire("beforeUpdate", i);
  }), this.uniFlow.on("dataSourceError", (i) => {
    this.fire("dataSourceError", i);
  });
};
W = /* @__PURE__ */ new WeakSet();
Q = function() {
  return q(async () => {
    let i = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight), t = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    (window.innerHeight || Math.min(document.documentElement.clientHeight, document.body.clientHeight)) + t + d(this, E) >= i && await this.load();
  }, 200);
};
C = /* @__PURE__ */ new WeakSet();
Z = function(i) {
  return q(async () => {
    let t = i.firstChild;
    i.scrollTop + i.clientHeight + d(this, E) >= t.clientHeight && await this.load();
  }, 200);
};
x = /* @__PURE__ */ new WeakSet();
tt = async function(i, t) {
  let e = window.innerHeight || Math.min(document.documentElement.clientHeight, document.body.clientHeight);
  for (; t-- && i.clientHeight < e; )
    await this.load();
};
N = /* @__PURE__ */ new WeakSet();
et = async function(i, t) {
  let e = i.clientHeight, r = i.firstChild;
  for (; t-- && r.clientHeight < e; )
    await this.load();
};
function bt(i) {
  const t = new kt({
    url: "https://" + (i.host || "api.look.360.cn") + "/mlist",
    params: {
      crec: 0,
      u: i.mid || i.uid,
      hsid: _t(16),
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
      f: "jsonp"
    },
    multiImage: i.multiImage || 4
  });
  return t.registerMonitorPlugin(Dt, {
    clickUrl: "https://papi.look.360.cn/srv/c",
    showUrl: "https://news.qhstatic.com/srv/c",
    option: {
      sign: i.sign,
      showMerge: !0
    }
  }), t;
}
function Ft(i) {
  const t = new Mt({
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
      showMerge: !0
    }
  });
  return t.registerMonitorPlugin(Tt), t;
}
const Wt = {
  __name: "EasyFlow",
  props: {
    config: {
      type: Object
    }
  },
  emits: ["beforeUpdate", "error"],
  setup(i, { emit: t }) {
    const e = i, r = lt();
    return ot(() => {
      const s = new yt({
        container: r.value,
        ...e.config
      });
      s.on("beforeUpdate", (n) => {
        t("beforeUpdate", n);
      }), s.on("dataSourceError", (n) => {
        t("error", n);
      });
    }), (s, n) => (ct(), ht("div", {
      id: "easy-flow",
      ref_key: "containerRef",
      ref: r
    }, null, 512));
  }
};
export {
  Wt as default
};
