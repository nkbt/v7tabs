let shNode = null, tabFl, winFl, scrTimer, _clT, gData, gs, zTO, dNodes = [], selArray = [], thisId,
  scroll = 0, sf = !1, rf = !1, ctxS = !1, cWin, rcs1 = 152, rcs2 = 240;

function tabs_list() {
  chrome.storage.local.get('savedSettings',
    function (g) {
      gData = g.savedSettings;
      let h = document.getElementById('tcss');
      h && document.head.removeChild(h);
      let k = document.createElement('link');
      k.rel = 'stylesheet', k.id = 'tcss', k.type = 'text/css', k.href = chrome.extension.getURL(
        gData.t), document.head.appendChild(k), 'per-tab' === gData.scope &&
      (zs_.style.backgroundImage = 'url("img/per-tab.svg")'), setTimeout(function () {
        tMenu.style.display = 'block', bMenu.style.display = 'block', panel.style.display = 'block', 250 <
        window.innerWidth && sbk.focus()
      }, 100), gData.single ? (document.getElementById('s_').className = 's0 s1', swtl()) : tl()
    })
}

chrome.windows.getCurrent(function (g) {
  cWin = g.id, chrome.windows.onFocusChanged.addListener(function (h) {
    h !== cWin || gData.single || (gData.ws ?
      (document.getElementById(h).className = 'ws_ wa_', document.getElementById('WL_' +
        h).style.borderLeft = '3px solid #ff0000', chrome.windows.getAll(function (k) {
        for (let o = k.length;
          o--;) {
          k[o].id !== h &&
          (document.getElementById(k[o].id).className = 'ws_', document.getElementById('WL_' +
            k[o].id).style.borderLeft = '3px solid #fff')
        }
      })) :
      (document.getElementById('WL_' +
        h).style.borderLeft = '3px solid #ff0000', chrome.windows.getAll(function (k) {
        for (let o = k.length;
          o--;) {
          k[o].id !== h &&
          (document.getElementById('WL_' + k[o].id).style.borderLeft = '3px solid #fff')
        }
      })))
  })
}), chrome.webNavigation.onBeforeNavigate.addListener(function (g) {
  if (0 === g.frameId) {
    let h = document.getElementById(g.tabId);
    h && (h.getElementsByTagName('img')[0].className = 'fvLoad')
  }
}), chrome.tabs.onRemoved.addListener(function (g) {
  let h = document.getElementById(g);
  if (h) {
    let k = h.parentNode;
    if (k.removeChild(h), !gData.single && gData.ws) {
      let o = '(' + k.childElementCount + ')', u = k.id.split('_')[1];
      document.getElementById('wNmb_' + u).textContent = o
    }
  }
  rf && (clearTimeout(_clT), _clT = setTimeout(function () {
    nPr.innerHTML = '', chrome.sessions.getRecentlyClosed(function (k) {
      for (let o = 0, u = k.length;
        o < u;
        o++) {
        if (k[o].tab) {
          rNode(k[o].tab);
        } else if (k[o].window) {
          for (let v = 0,
            x = k[o].window.tabs.length; v < x; v++) {
            rNode(k[o].window.tabs[v])
          }
        }
      }
    })
  }, 300))
}), chrome.tabs.onCreated.addListener(function (g) {
  if (!gData.single) {
    let h = document.getElementById('WL_' + g.windowId);
    if (h) {
      h.insertBefore(_tn(g), h.childNodes[g.index]);
      let k = '(' + h.childElementCount + ')';
      gData.ws && (document.getElementById('wNmb_' + g.windowId).textContent = k)
    } else {
      tl()
    }
  } else if (g.windowId === cWin) {
    let h = document.getElementById('sideBarTabsPanel');
    h.insertBefore(_tn(g), h.childNodes[g.index])
  }
}), chrome.windows.onRemoved.addListener(function (g) {
  let h = document.getElementById(g), k = document.getElementById('WL_' + g);
  h && h.parentNode.removeChild(h), k && k.parentNode.removeChild(k)
}), chrome.tabs.onMoved.addListener(function () {
  gData.single ?
    swtl() :
    tl()
}), chrome.tabs.onDetached.addListener(function () {
  gData.single ?
    swtl() :
    tl()
}), chrome.tabs.onAttached.addListener(function () {
  gData.single ?
    swtl() :
    tl()
}), chrome.tabs.onReplaced.addListener(function () {
  gData.single ?
    swtl() :
    tl()
}), chrome.runtime.onMessage.addListener(function (g) {
  g.zoom ?
    (document.getElementById('sideBarTabsPanel').style.zoom = g.n + '%', gData.zoom = ~~g.n) :
    g.w ?
      cWin !== g.w &&
      (scroll = g.ns, document.getElementById('sideBarTabsPanel').scrollTop = Math.round(scroll)) :
      g.gD ?
        cWin !== g.w_ && (gData = g.gD, 'w' === g.d ?
        gData.single ?
          (document.getElementById('s_').className = 's0 s1', swtl()) :
          (document.getElementById('s_').className = 's0 s2', tl()) :
        'z' === g.d && (console.log('ide'), zs_.style.backgroundImage = 'per-tab' === gData.scope ?
        'url("img/per-tab.svg")' :
        'url("img/per-origin.svg")')) :
        g.intZoom ?
          g.w !== cWin &&
          (gData.zoom = g.intZoom, document.getElementById('sideBarTabsPanel').style.zoom = gData.zoom +
            '%') :
          g.t && window.close()
}), chrome.tabs.onActivated.addListener(function (g) {
  if (!gData.single) {
    let h = document.getElementById('WL_' + g.windowId);
    if (h) {
      let k = h.getElementsByClassName('tn tna'), o = document.getElementById(g.tabId);
      k.length && (k[0].className = 'tn'), o && (o.className = 'tn tna')
    }
  } else if (g.windowId === cWin) {
    chrome.tabs.getZoom(function (o) {
      z_.innerHTML = Math.round(100 * o) + '%'
    });
    let h = document.getElementsByClassName('tn tna'), k = document.getElementById(g.tabId);
    h.length && (h[0].className = 'tn'), k && (k.className = 'tn tna')
  }
}), chrome.tabs.onUpdated.addListener(function (g, h, k) {
  if (h.title) {
    k.active && cWin === k.windowId &&
    chrome.tabs.getZoom(function (u) {z_.innerHTML = Math.round(100 * u) + '%'});
    let o = document.getElementById(k.id);
    o && (o.getElementsByClassName('nti')[0].textContent = h.title)
  }
  if ('complete' === h.status && tbd(k), void 0 !== h.pinned) {
    let o = document.getElementById(g);
    o.pinned = h.pinned, o.style.borderLeft = h.pinned ? '3px solid blue' : ''
  }
});

function tbpScr() {
  clearTimeout(scrTimer), scroll = this.scrollTop, scrTimer = setTimeout(function () {
    chrome.runtime.sendMessage({w: cWin, ns: scroll})
  }, 400)
}

function sessionSave(g) {
  gData.sessions ? chrome.management.getAll(function (h) {
    let k = !0;
    for (let o = h.length; o--;) {
      if ('khmbgihnlknbjgjhmekjeoidpfimabpp' === h[o].id) {
        h[o].enabled && (k = !1, g ?
          chrome.runtime.sendMessage('khmbgihnlknbjgjhmekjeoidpfimabpp', {saveSession: 'current'}) :
          chrome.runtime.sendMessage('khmbgihnlknbjgjhmekjeoidpfimabpp', {saveSession: 'all'}));
        break
      }
    }
    k && saveSess2(g)
  }) : saveSess2(g)
}

function saveSess2(g) {
  let h = new Date;
  h = h.toLocaleString();
  let k = prompt(chrome.i18n.getMessage('sPrompt'), h);
  null != k && chrome.windows.getAll({populate: !0}, function (o) {
    let v = o;
    for (let x = v.length; x--;) {
      v[x].incognito && v.splice(x, 1);
    }
    if (g) {
      for (let x = v.length; x--;) {
        v[x].focused || v.splice(x, 1);
      }
    }
    chrome.bookmarks.getRootByName('user_root',
      function (x) {
        chrome.bookmarks.create({parentId: x.id, title: k, index: 0, url: null},
          function (y) {
            let A = y.id;
            for (let E, C = 0, D = v.length; C < D; C++) {
              E = v[C].tabs;
              for (let F = 0, G = E.length; F < G; F++) {
                chrome.bookmarks.create({
                  parentId: A,
                  title: E[F].title,
                  index: 0,
                  url: E[F].url
                })
              }
            }
            let B = {
              type: 'basic',
              title: chrome.i18n.getMessage('ts'),
              message: k + '\n' + chrome.i18n.getMessage('ts1'),
              isClickable: !0,
              iconUrl: chrome.runtime.getURL('img/bx.png')
            };
            chrome.notifications.create('',
              B,
              function (C) {timer14 = setTimeout(function () {chrome.notifications.clear(C)}, 3e3)})
          })
      })
  })
}

function setCl() {
  let g = chrome.extension.getViews({type: 'tab'});
  g.length ?
    g[0].chrome.tabs.getCurrent(function (h) {
      chrome.tabs.update(h.id,
        {selected: !0}), chrome.windows.update(h.windowId, {focused: !0})
    }) :
    chrome.tabs.create({url: 'options.html'})
}

function mw(g) {
  chrome.tabs.query({currentWindow: !0},
    function (h) {
      for (let k = 0, o = h.length; k < o; k++) {
        h[k].active && (0 < g.wheelDelta && h[k - 1] ?
          chrome.tabs.update(h[k - 1].id, {active: !0}) :
          0 > g.wheelDelta && h[k + 1] && chrome.tabs.update(h[k + 1].id, {active: !0}))
      }
    })
}

function saveG() {chrome.storage.local.set({savedSettings: gData})}

function tbmw(g) {
  if (g.ctrlKey) {
    clearTimeout(gs), 0 < g.wheelDelta && 160 > gData.zoom ?
      gData.zoom += 5 :
      0 > g.wheelDelta && 70 < gData.zoom && (gData.zoom -= 5), document.getElementById(
      'sideBarTabsPanel').style.zoom = gData.zoom + '%', gs = setTimeout(saveG,
      300), chrome.runtime.sendMessage({
      intZoom: gData.zoom,
      w: cWin
    }), clearTimeout(zTO), zi.textContent = gData.zoom +
      ' %', zi.style.display = 'block', zTO = setTimeout(zF,
      2e3);
  } else if (gData.wheel) {
    let h = this.scrollHeight > this.clientHeight;
    if (!h) {
      let k = g.wheelDelta;
      chrome.tabs.query({currentWindow: !0},
        function (o) {
          for (let u = 0, v = o.length; u < v; u++) {
            o[u].active && (0 < k && o[u - 1] ?
              chrome.tabs.update(o[u - 1].id, {active: !0}) :
              0 > k && o[u + 1] && chrome.tabs.update(o[u + 1].id, {active: !0}))
          }
        })
    }
  }
  ctxS && _ctxB()
}

function wsds(g) {g.dataTransfer.setData('movWin', this.id), winFl = !0}

function wsdo(g) {(tabFl || winFl) && (g.preventDefault(), this.style.backgroundColor = '#25CE00')}

function wsdr(g) {
  if (tabFl) {
    this.style.backgroundColor = '', this.style.color = '';
    for (let h = dNodes.length; h--;) {
      chrome.tabs.move(dNodes[h].id,
        {windowId: ~~this.id, index: 0})
    }
  } else if (winFl) {
    this.style.backgroundColor = '';
    let h = g.dataTransfer.getData('movWin'), k = ~~this.id;
    h != this.id && chrome.windows.get(~~h, {populate: !0}, function (o) {
      let u = o.tabs, v = [];
      for (let x = u.length; x--;) {
        v.unshift(u[x].id);
      }
      chrome.tabs.move(v, {windowId: k, index: -1})
    })
  }
}

function wsmu(g) {
  if (!(0 === g.button)) {
    2 === g.button &&
    chrome.windows.update(~~this.id, {focused: !0});
  } else if ('wsFv' ===
    g.target.className) {
    chrome.tabs.query({windowId: ~~this.id},
      function (h) {
        for (let k = h.length; k--;) {
          h[k].url.startsWith('opera://') || chrome.tabs.reload(h[k].id)
        }
      });
  } else if ('delBtn' === g.target.className) {
    chrome.windows.remove(~~this.id);
  } else {
    let h = document.getElementById('WL_' + this.id);
    'block' === h.style.display ?
      h.animate([{maxHeight: '100%'}, {maxHeight: '0%'}],
        {
          duration: 150,
          steps: 2,
          webkitAnimationTimingFunction: 'ease-out'
        }).onfinish = function () {h.style.display = 'none'} :
      (h.style.display = 'block', h.animate([{maxHeight: '0%'}, {maxHeight: '100%'}],
        {duration: 150, steps: 2, webkitAnimationTimingFunction: 'ease-in-out'}))
  }
}

function tnmu(g) {
  if (0 === g.button) {
    if (g.ctrlKey) {
      this.classList.toggle('tnc'), shNode = this;
    } else if (g.shiftKey) {
      if (shNode && shNode !== this) {
        let u, v, h = this.parentNode, k = shNode.getBoundingClientRect(),
          o = this.getBoundingClientRect();
        o.top > k.top ? (u = k.top, v = o.top) : (u = o.top, v = k.top);
        let x = h.childNodes;
        for (let y = 0, A = x.length; y < A; y++) {
          x[y].getBoundingClientRect().top >= u &&
          x[y].getBoundingClientRect().top <= v && x[y].classList.add('tnc')
        }
      } else {
        this.classList.toggle('tnc');
      }
      shNode = this
    } else {
      if ('delBtn' !== g.target.className) {
        cCc(), chrome.tabs.update(~~this.id,
          {active: !0}), this.windowId !== cWin && chrome.windows.update(~~this.windowId,
          {focused: !0});
      } else if (!this.pinned) {
        let h = this.parentNode, k = ~~this.id;
        if (h.removeChild(this), chrome.tabs.remove(k), !gData.single && gData.ws) {
          let o = '(' + h.childElementCount + ')', u = this.windowId;
          document.getElementById('wNmb_' + u).textContent = o
        }
      }
      shNode = null
    }
  } else if (1 === g.button && gData.mmc && !this.pinned) {
    g.preventDefault();
    let h = this.parentNode, k = this.windowId;
    if (h.removeChild(this), chrome.tabs.remove(~~this.id), !gData.single && gData.ws) {
      let o = '(' + h.childElementCount + ')';
      document.getElementById('wNmb_' + k).textContent = o
    }
    shNode = null
  } else if (2 === g.button) {
    g.preventDefault(), thisId = this.id;
    let h = g.pageX, k = g.pageY, o = document.getElementsByClassName('tnc');
    if (this.classList.contains('tnc') && 1 < o.length) {
      h + rcs2 > document.body.clientWidth && (h = document.body.clientWidth - rcs2), k + 100 >
      document.body.clientHeight && (k = document.body.clientHeight - 100), rcs.style.top = k +
        'px', rcs.style.left = h +
        'px', rcs.style.display = 'block', ctxS = 1, rcs.focus(), rcs.addEventListener('blur',
        _ctxB), rcs.addEventListener('click', _ctxC), selArray = [];
      let u = document.getElementsByClassName('tnc');
      for (let v = u.length; v--;) {
        selArray.push(~~u[v].id)
      }
    } else {
      cCc(), this.classList.add('tnc'), h + rcs1 > document.body.clientWidth &&
      (h = document.body.clientWidth - rcs1), k + 320 > document.body.clientHeight &&
      (k = document.body.clientHeight - 320), ptt.textContent = this.pinned ?
        chrome.i18n.getMessage('rc11') :
        chrome.i18n.getMessage('rc2'), rcm.style.top = k + 'px', rcm.style.left = h +
        'px', rcm.style.display = 'block', ctxS = 1, rcm.focus(), rcm.addEventListener('blur',
        _ctxB), rcm.addEventListener('click', _ctxC);
    }
    shNode = null
  }
}

function t2cl() {
  if (gData.dbc && !this.pinned) {
    let g = this.parentNode;
    if (g.removeChild(this), chrome.tabs.remove(~~this.id), !gData.single && gData.ws) {
      let h = '(' + g.childElementCount + ')', k = this.windowId;
      document.getElementById('wNmb_' + k).textContent = h
    }
  }
}

function tnds() {
  if (dNodes = [], this.classList.contains('tnc')) {
    let h = document.getElementsByClassName('tnc');
    for (let k = 0, o = h.length; k < o; k++) {
      dNodes.push({
        id: ~~h[k].id,
        ix: ~~h[k].index,
        wi: ~~h[k].windowId
      })
    }
  } else {
    dNodes.push({id: ~~this.id, ix: ~~this.index, wi: ~~this.windowId});
  }
  tabFl = !0
}

function tndo(g) {
  tabFl &&
  (g.preventDefault(), this.style.background = '-webkit-linear-gradient(top, rgba(255,255,255,0) 0%,rgba(255,255,255,0) 75%,rgba(37,206,0,1) 75%,rgba(37,206,0,1) 100%)')
}

function tndr() {
  if (tabFl) {
    this.style.background = '';
    let h = ~~this.id, k = ~~this.windowId, o = this.index;
    for (let u = dNodes.length; u--;) {
      dNodes[u].id !== h &&
      (dNodes[u].ix < o && dNodes[u].wi === k && o--, chrome.tabs.move(dNodes[u].id,
        {windowId: k, index: o + 1}))
    }
  }
  dNodes = []
}

function tde(g) {
  tabFl = !1, window.innerWidth < g.clientX && g.target && chrome.windows.create({
    tabId: dNodes[0].id,
    top: 100,
    left: 100,
    width: 1200,
    height: 650,
    type: 'normal',
    focused: !0
  }, function (h) {
    dNodes.shift();
    for (let k = 0, o = dNodes.length; k < o; k++) {
      chrome.tabs.move(dNodes[k].id,
        {windowId: h.id, index: -1})
    }
  })
}

function tbd(g) {
  setTimeout(function () {
    let h = document.getElementById(g.id);
    if (h) {
      let k = h.getElementsByTagName('img')[0];
      k.className = 'tabFav', k.src = 'chrome://favicon/' + g.url
    }
  }, 500)
}

function pb() {setTimeout(function () {ctxS || cCc()}, 100)}

function pncl(g) {
  g.target === this && (2 === g.detail ? chrome.tabs.create({active: !0}) : 1 === g.detail && cCc())
}

function _ctxC(g) {
  if (0 === g.button && 1 === g.detail) {
    let h = g.target.id;
    this.blur(), chrome.tabs.get(~~thisId, function (k) {
      if ('rltt' === h) {
        chrome.tabs.reload(k.id);
      } else if ('ptt' === h) {
        let o = document.getElementById(thisId);
        o.pinned ?
          (chrome.tabs.update(~~thisId, {pinned: !1}), o.style.borderLeft = '') :
          (chrome.tabs.update(~~thisId, {pinned: !0}), o.style.borderLeft = '3px solid blue')
      } else if ('nwtt' === h) {
        chrome.windows.create({
          tabId: ~~thisId,
          top: 100,
          left: 100,
          width: 1200,
          height: 650,
          type: 'normal',
          focused: !0
        });
      } else if ('nwto' === h) {
        let o = new URL(k.url).hostname, u = [];
        chrome.tabs.query({},
          function (v) {
            for (let y, x = v.length; x--;) {
              y = new URL(v[x].url).hostname, y === o &&
              u.unshift(v[x].id);
            }
            chrome.windows.create({
              tabId: ~~thisId,
              top: 100,
              left: 100,
              width: 1200,
              height: 650,
              type: 'normal',
              focused: !0
            }, function (x) {chrome.tabs.move(u, {windowId: x.id, index: -1})})
          })
      } else if ('nwta' === h) {
        chrome.tabs.query({},
          function (o) {
            function u(x) {
              for (let y = o.length; y--;) {
                o[y].openerTabId == x && (v.unshift(o[y].id), u(o[y].id))
              }
            }

            let v = [];
            u(thisId), chrome.windows.create({
              tabId: ~~thisId,
              top: 100,
              left: 100,
              width: 1200,
              height: 650,
              type: 'normal',
              focused: !0
            }, function (x) {chrome.tabs.move(v, {windowId: x.id, index: -1})})
          });
      } else if ('clot' === h) {
        chrome.tabs.query({windowId: k.windowId},
          function (o) {
            for (let u = o.length; u--;) {
              o[u].id !== k.id && chrome.tabs.remove(o[u].id)
            }
          });
      } else if ('clau' === h) {
        let o = k.index;
        chrome.tabs.query({windowId: k.windowId},
          function (u) {
            for (let v = u.length; v--;) {
              u[v].index < o && chrome.tabs.remove(u[v].id)
            }
          })
      } else if ('clad' === h) {
        let o = k.index;
        chrome.tabs.query({windowId: k.windowId},
          function (u) {
            for (let v = u.length; v--;) {
              u[v].index > o && chrome.tabs.remove(u[v].id)
            }
          })
      } else if ('cat' === h) {
        let o = {};
        chrome.tabs.query({},
          function (u) {
            for (let v = u.length; v--;) {
              u[v].url.startsWith('data') || (o[u[v].url] = u[v].title);
            }
            _cTabs(o)
          })
      } else if ('rcsm' === h) {
        chrome.windows.create({
            tabId: selArray[0],
            type: 'normal',
            focused: !0
          },
          function (o) {
            selArray.shift(), chrome.tabs.move(selArray,
              {windowId: o.id, index: -1})
          });
      } else if ('rcsc' === h) {
        for (let o = selArray.length;
          o--;) {
          chrome.tabs.remove(selArray[o]);
        }
      } else if ('cst' === h) {
        let o = {}, u = selArray.length;
        for (let v = selArray.length; v--;) {
          u--, chrome.tabs.get(selArray[v],
            function (x) {x.url.startsWith('data') || (o[x.url] = x.title), u || _cTabs(o)})
        }
      }
    })
  }
}

function _ctxB() {rcm.style.display = 'none', rcs.style.display = 'none', ctxS = null, cCc()}

function tmu(g) {
  g.stopPropagation();
  let h = g.target.id;
  if (sf && cspf(sP), rf && cspf(rP), 0 !== g.button) {
    2 === g.button && ('nt_' === h ?
      chrome.windows.create({top: 100, left: 100, width: 1200, height: 650, type: 'normal'}) :
      'ct_' === h ?
        chrome.tabs.query({active: !1, currentWindow: !0},
          function (k) {
            for (let o = 0; o < k.length; o++) {
              chrome.tabs.remove(k[o].id)
            }
          }) :
        'rl_' === h ?
          chrome.tabs.query({currentWindow: !0},
            function (k) {
              for (let o = 0; o < k.length; o++) {
                'chrome://extensions/' !== k[o].url &&
                chrome.tabs.reload(k[o].id)
              }
            }) :
          'ro_' === h && rcList());
  } else if ('ca_' === h) {
    window.close();
  } else {
    if ('sbk' === h) {
      return;
    }
    'nt_' === h ?
      chrome.tabs.create({active: !0}) :
      'ct_' === h ?
        chrome.tabs.query({active: !0, currentWindow: !0},
          function (k) {chrome.tabs.remove(k[0].id)}) :
        'rl_' === h ?
          chrome.tabs.query({active: !0, currentWindow: !0},
            function (k) {chrome.tabs.reload(k[0].id)}) :
          's_' === h ?
            ('s0 s1' === g.target.className ?
              (g.target.className = 's0 s2', gData.single = !1, tl()) :
              (g.target.className = 's0 s1', gData.single = !0, swtl()), chrome.storage.local.set({savedSettings: gData}), chrome.runtime.sendMessage(
              {gD: gData, d: 'w', w_: cWin})) :
            'ro_' === h && chrome.sessions.restore(function () {chrome.runtime.lastError})
  }
}

function bmu(g) {
  let h = g.target.id;
  0 === g.button ?
    'settings' === h ?
      setCl() :
      'st_' === h ?
        sessionSave() :
        'zd_' === h ?
          _z_t() :
          'z_' === h ? _z_100() : 'zu_' === h ? _z_t(1) : 'zs_' === h && zoomSc() :
    2 === g.button && 'st_' === h && sessionSave(!0), sf && cspf(sP), rf && cspf(rP)
}

function BSI() {
  1 < this.value.length ?
    BSS(this.value) :
    1 === this.value.length ?
      !sf && (sP.style.top = Math.round(35 / (gData.zoom / 100)) + 1 +
      'px', sP.style.bottom = Math.round(30 / (gData.zoom / 100)) + 1 +
      'px', sP.style.zoom = gData.zoom + '%', sP.style.display = 'block', sf = 1) :
      1 > this.value.length && sf && cspf(sP)
}

function BSF() {rf && cspf(rP)}

function BSS(g) {
  sf ?
    nP.innerHTML = '' :
    (sP.style.top = Math.round(35 / (gData.zoom / 100)) + 1 +
      'px', sP.style.bottom = Math.round(30 / (gData.zoom / 100)) + 1 +
      'px', sP.style.zoom = gData.zoom +
      '%', sP.style.display = 'block', sf = 1), chrome.tabs.query({},
    function (h) {
      for (let u, k = 0, o = h.length; k < o; k++) {
        u = h[k].title + ' ' + h[k].url, -1 <
        u.indexOf(g) && sNode(h[k])
      }
    })
}

function csp(g) {0 === g.button && cspf(sP)}

function crp(g) {0 === g.button && cspf(rP)}

function cspf(g) {
  g.animate([{transform: 'translateX(0px)', opacity: '1'},
      {transform: 'translateX(-400px)', opacity: '0'}],
    {
      duration: 300,
      steps: 2,
      webkitAnimationTimingFunction: 'ease-out'
    }).onfinish = function () {g.style.display = 'none', g.style.opacity = '1', sf = !1, rf = !1, sbk.value = ''}
}

function snmu(g) {
  if (0 === g.button) {
    if ('delBtn' === g.target.className) {
      let h = this.parentNode, k = ~~this.id.replace('_s', '');
      h.removeChild(this), chrome.tabs.remove(k)
    } else {
      cCc();
      let h = ~~this.id.replace('_s', '');
      chrome.tabs.update(h, {active: !0}), this.windowId !== cWin &&
      chrome.windows.update(~~this.windowId, {focused: !0})
    }
  }
}

function rnmu(g) {
  0 === g.button && (this.parentNode.removeChild(this), chrome.sessions.restore(this.id))
}

function _cTabs(g) {
  let h = 'data:text/html,<style>ul{margin:30px 0 0 30px;font-size:18px;}li{margin:20px 0 0 0;}</style><h2>',
    k = new Date().toLocaleString();
  for (let u in h += k + '</h2><ul>', g) {
    g.hasOwnProperty(u) &&
    (h += '<li><a href="' + encodeURIComponent(u) + '">' + encodeURIComponent(g[u]) + '</a></li>');
  }
  h += '</ul>';
  let o = document.createElement('textarea');
  document.body.appendChild(o), o.value = h, o.focus(), o.select(), document.execCommand('Copy'), document.body.removeChild(
    o), o = null
}

function fc() {
  let g = document.getElementsByClassName('fvLoad');
  if (g.length) {
    for (let h = g.length; h--;) {
      (function (k, o) {
        chrome.tabs.get(~~k,
          function (u) {
            'complete' === u.status && (o.className = 'tabFav', o.src = 'chrome://favicon/' + u.url)
          })
      })(g[h].parentNode.id, g[h])
    }
  }
}

function cCc() {
  let g = document.getElementsByClassName('tnc');
  for (let h = g.length; h--;) {
    g[h].classList.remove('tnc');
  }
  shNode = null
}

function tl() {
  panel.innerHTML = '';
  let g = document.createElement('div');
  g.className = 'sideBarPanel', g.id = 'sideBarTabsPanel', panel.appendChild(g), g.addEventListener(
    'scroll',
    tbpScr), g.addEventListener('click', pncl), g.addEventListener('mousewheel',
    tbmw), chrome.windows.getAll({populate: !0}, function (h) {
    for (let k = 0; k < h.length; k++) {
      if (gData.ws) {
        let v = document.createElement('div');
        v.className = h[k].id === cWin ?
          'ws_ wa_' :
          'ws_', v.id = h[k].id, g.appendChild(v), h[k].incognito ?
          v.innerText = 'Incognito' :
          'normal' === h[k].type ?
            v.innerText = 'Window' :
            'popup' === h[k].type && (v.innerText = 'Popup'), v.addEventListener('mouseup',
          wsmu), v.addEventListener('dragstart', wsds), v.addEventListener('dragover',
          wsdo), v.addEventListener('dragleave',
          function () {this.style.backgroundColor = ''}), v.addEventListener('drop',
          wsdr), v.addEventListener('dragend', function () {winFl = !1});
        let x = document.createElement('div');
        x.className = 'wsFv', x.title = chrome.i18n.getMessage('wr'), v.appendChild(x);
        let y = document.createElement('div');
        y.id = 'wNmb_' + h[k].id, y.className = 'wNmbCl', y.textContent = '(' + h[k].tabs.length +
          ')', v.appendChild(y);
        let A = document.createElement('div');
        A.className = 'delBtn', A.title = chrome.i18n.getMessage('wc'), v.appendChild(A)
      }
      let o = document.createElement('div');
      o.style.display = 'block', o.id = 'WL_' +
        h[k].id, o.style.paddingTop = '3px', o.style.paddingBottom = '5px', o.style.overflow = 'hidden', o.style.borderLeft = h[k].id ===
      cWin ? '3px solid #ff0000' : '3px solid #fff', g.appendChild(o);
      let u = h[k].tabs;
      for (let v = 0, x = u.length; v < x; v++) {
        _tn(u[v], o, 1);
      }
      g.scrollTop = Math.round(scroll), g.style.zoom = gData.zoom + '%'
    }
  })
}

function swtl() {
  panel.innerHTML = '';
  let g = document.createElement('div');
  g.className = 'sideBarPanel', g.id = 'sideBarTabsPanel', panel.appendChild(g), g.addEventListener(
    'scroll',
    tbpScr), g.addEventListener('click', pncl), g.addEventListener('mousewheel',
    tbmw), chrome.windows.get(cWin, {populate: !0}, function (h) {
    let k = h.tabs;
    for (let o = 0, u = k.length; o < u; o++) {
      _tn(k[o], g, 1);
    }
    g.scrollTop = Math.round(scroll), g.style.zoom = gData.zoom + '%'
  })
}

function _tn(g, h, k) {
  let o = document.createElement('div');
  o.className = g.active ?
    'tn tna' :
    'tn', o.id = g.id, o.pinned = g.pinned, o.url = g.url, o.index = g.index, o.windowId = g.windowId, gData.toti &&
  (o.title = g.title + '\n' + g.url), o.addEventListener('mouseup', tnmu), o.addEventListener(
    'dblclick',
    t2cl), o.addEventListener('dragstart', tnds), o.addEventListener('dragover',
    tndo), o.addEventListener('dragleave',
    function () {this.style.background = ''}), o.addEventListener('drop', tndr), o.addEventListener(
    'dragend',
    tde);
  let u = document.createElement('img');
  'loading' === g.status ?
    u.className = 'fvLoad' :
    (u.className = 'tabFav', u.src = 'chrome://favicon/' + g.url);
  let v = document.createElement('div');
  v.className = 'nti', v.textContent = g.title && '' !== g.title ?
    g.title :
    chrome.i18n.getMessage('load');
  let x = document.createElement('div');
  return x.className = 'delBtn', x.title = chrome.i18n.getMessage('rc10'), o.appendChild(u), o.appendChild(
    v), o.appendChild(x), o.pinned && (o.style.borderLeft = '3px solid blue'), k ?
    void h.appendChild(o) :
    o
}

function sNode(g) {
  let h = document.createElement('div');
  h.className = 'tn', h.id = g.id +
    '_s', h.url = g.url, h.index = g.index, h.windowId = g.windowId, gData.toti &&
  (h.title = g.title + '\n' + g.url), nP.appendChild(h), h.addEventListener('mouseup', snmu);
  let k = document.createElement('img');
  k.className = 'tabFav', k.src = 'chrome://favicon/' + g.url;
  let o = document.createElement('div');
  o.className = 'nti', o.textContent = g.title && '' !== g.title ?
    g.title :
    chrome.i18n.getMessage('load');
  let u = document.createElement('div');
  u.className = 'delBtn', u.title = 'Close tab', h.appendChild(k), h.appendChild(o), h.appendChild(u)
}

function rNode(g) {
  let h = document.createElement('div');
  h.className = 'tnr', h.id = g.sessionId, gData.toti &&
  (h.title = g.title + '\n' + g.url), h.addEventListener('click', rnmu);
  let k = document.createElement('img');
  k.className = 'tabFav', k.src = 'chrome://favicon/' + g.url;
  let o = document.createElement('div');
  o.className = 'nti';
  let u = g.title;
  g.title && '' !== g.title ||
  (u = g.url), o.textContent = u, h.appendChild(k), h.appendChild(o), nPr.appendChild(h)
}

function rcList() {
  sf && cspf(sP), nPr.innerHTML = '', rf ||
  (rP.style.top = Math.round(35 / (gData.zoom / 100)) + 1 + 'px', rP.style.bottom = Math.round(30 /
    (gData.zoom / 100)) + 1 + 'px', rP.style.zoom = gData.zoom +
    '%', rP.style.display = 'block', rf = 1), chrome.sessions.getRecentlyClosed(function (g) {
    for (let h = 0, k = g.length;
      h < k;
      h++) {
      if (g[h].tab) {
        rNode(g[h].tab);
      } else if (g[h].window) {
        for (let o = 0,
          u = g[h].window.tabs.length; o < u; o++) {
          rNode(g[h].window.tabs[o])
        }
      }
    }
  })
}

window.onload = function () {
  tabs_list(), /*document.addEventListener('contextmenu', function (g) {g.preventDefault()}),*/ tMenu.addEventListener('mouseup',
    tmu), tMenu.addEventListener('mousewheel', mw), bMenu.addEventListener('mousewheel',
    mw), bMenu.addEventListener('mouseup', bmu), cB.addEventListener('click',
    csp), cBr.addEventListener('click', crp), setTimeout(tOut, 700)
};

function tOut() {
  let g = document.querySelectorAll('[data-i18n]');
  for (let k = g.length;
    k--;) {
    g[k].innerHTML = chrome.i18n.getMessage(g[k].getAttribute('data-i18n'));
  }
  nt_.title = chrome.i18n.getMessage('header1'), ct_.title = chrome.i18n.getMessage('header2'), rl_.title = chrome.i18n.getMessage(
    'header3'), ro_.title = chrome.i18n.getMessage('header4'), st_.title = chrome.i18n.getMessage(
    'header5'), s_.title = chrome.i18n.getMessage('header7'), ca_.title = chrome.i18n.getMessage(
    'header6'), panel.addEventListener('dragover',
    function (k) {k.preventDefault()}), panel.addEventListener('blur', pb);
  let h = chrome.i18n.getUILanguage();
  'pl' === h ?
    rcs1 = 176 :
    'de' === h ? rcs1 = 180 : 'ru' === h && (rcs1 = 204), sbk.addEventListener('input',
    BSI), sbk.addEventListener('focus',
    BSF), cB.textContent = cBr.textContent = chrome.i18n.getMessage('rc10')
}

chrome.tabs.getZoom(function (g) {
  z_.innerHTML = Math.round(100 * g) + '%'
}), chrome.tabs.onZoomChange.addListener(function (g) {
  chrome.tabs.get(g.tabId,
    function (h) {
      h.active && cWin === h.windowId && (z_.textContent = Math.round(100 * g.newZoomFactor) + '%')
    })
});

function zoomSc() {
  'per-tab' === gData.scope ?
    (gData.scope = 'per-origin', zs_.style.backgroundImage = 'url("img/per-origin.svg")') :
    (gData.scope = 'per-tab', zs_.style.backgroundImage = 'url("img/per-tab.svg")'), chrome.storage.local.set(
    {savedSettings: gData}), chrome.runtime.sendMessage({gD: gData, d: 'z', w_: cWin})
}

function _z_t(g) {
  let h = [5,
    3.999,
    3,
    2.5,
    2,
    1.746,
    1.5,
    1.25,
    1.1,
    1,
    0.9,
    0.8,
    0.75,
    0.6666,
    0.5,
    0.33334,
    0.25], k = 1;
  chrome.tabs.getZoom(function (o) {
    if (!g) {
      if (0.25 < o) {
        for (let u = 17; u--;) {
          if (o <= h[u]) {
            k = 0, chrome.tabs.setZoomSettings({scope: gData.scope},
              function () {
                chrome.runtime.lastError &&
                console.log(chrome.runtime.lastError.message), chrome.tabs.setZoom(null,
                  h[u + 1],
                  function () {
                    chrome.runtime.lastError && console.log(chrome.runtime.lastError.message)
                  })
              });
            break
          }
        }
        k && chrome.tabs.setZoomSettings({scope: gData.scope},
          function () {
            chrome.runtime.lastError &&
            console.log(chrome.runtime.lastError.message), chrome.tabs.setZoom(null,
              4.999,
              function () {
                chrome.runtime.lastError && console.log(chrome.runtime.lastError.message)
              })
          })
      }
    } else if (h[5] = 1.7455, 4.99 > o) {
      for (let u = 0; u < 17; u++) {
        if (o >= h[u]) {
          k = 0, chrome.tabs.setZoomSettings({scope: gData.scope},
            function () {
              chrome.runtime.lastError &&
              console.log(chrome.runtime.lastError.message), chrome.tabs.setZoom(null,
                h[u - 1],
                function () {
                  chrome.runtime.lastError && console.log(chrome.runtime.lastError.message)
                })
            });
          break
        }
      }
      k && chrome.tabs.setZoomSettings({scope: gData.scope},
        function () {
          chrome.runtime.lastError &&
          console.log(chrome.runtime.lastError.message), chrome.tabs.setZoom(null,
            0.25,
            function () {chrome.runtime.lastError && console.log(chrome.runtime.lastError.message)})
        })
    }
  })
}

function _z_100() {
  chrome.tabs.setZoomSettings({mode: 'automatic', scope: gData.scope},
    function () {
      chrome.runtime.lastError &&
      console.log(chrome.runtime.lastError.message), chrome.tabs.setZoom(null,
        1,
        function () {chrome.runtime.lastError && console.log(chrome.runtime.lastError.message)})
    })
}

function zF() {
  zi.animate([{transform: 'translateY(0px)', opacity: '1'},
      {transform: 'translateY(50px)', opacity: '0'}],
    {
      duration: 100,
      steps: 2,
      webkitAnimationTimingFunction: 'ease-in'
    }).onfinish = function () {zi.style.display = 'none'}
}

setInterval(fc, 5e3);
