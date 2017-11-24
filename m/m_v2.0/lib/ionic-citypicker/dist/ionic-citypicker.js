!function(n,t){var i=n.createElement("style");if(n.getElementsByTagName("head")[0].appendChild(i),i.styleSheet)i.styleSheet.disabled||(i.styleSheet.cssText=t);else try{i.innerHTML=t}catch(e){i.innerText=t}}(document,".city-picker-bg{\n    background:transparent;\n}\n.city-picker-backdrop {\n    position: fixed;\n    top: 0;\n    left: 0;\n    z-index: 1;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, 0.5);\n    -webkit-transition: 0.1s opacity linear;\n    transition: 0.1s opacity linear;\n}\n.city-bgclose{\n    width: 100%;\n    height: 100%;\n    z-index: 2;\n    position: absolute;\n}\n.city-picker{\n    z-index: 3;\n    position: absolute;\n    background: #eee;\n    width: 100%;\n    height: 296px;\n    bottom: 0;\n}\n.city-picker .city-picker-header{\n    position: absolute;\n    height: 44px;\n    width: 100%;\n}\n.city-picker .city-picker-header .button{\n    font-size: 18px;\n}\n.city-picker .ionic-scroll{\n  height: 252px;\n}\n.city-picker .ionic-scroll .scroll{\n    padding: 108px 0;\n}\n.city-picker .ionic-scroll li {\n    position: relative;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 36px;\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n    padding: 0 10px;\n    overflow: hidden;\n    line-height: 36px;\n    color: #000;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    -webkit-transition: 300ms;\n    -o-transition: 300ms;\n    transition: 300ms;\n}\n.city-picker .city-picker-inner{\n    height: 252px;position: relative;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: -webkit-flex;\n    display: flex;\n    padding: 0;\n    font-size: 1.2rem;\n    text-align: right;\n    -webkit-box-pack: center;\n    -ms-flex-pack: center;\n    -webkit-justify-content: center;\n    justify-content: center;\n    /*-webkit-mask-box-image: -webkit-linear-gradient(bottom, transparent, transparent 5%, white 20%, white 80%, transparent 95%, transparent);\n    -webkit-mask-box-image: linear-gradient(to top, transparent, transparent 5%, white 20%, white 80%, transparent 95%, transparent);*/\n}\n\n.city-picker .picker-center-highlight {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  -webkit-box-sizing: border-box;\n     -moz-box-sizing: border-box;\n          box-sizing: border-box;\n  margin-top: 0px;\n  pointer-events: none;\n}\n/*.city-picker .picker-center-highlight:after {\n    position: absolute;\n    top: auto;\n    right: auto;\n    margin-bottom: -18px;\n    bottom: 0;\n    left: 0;\n    z-index: 15;\n    display: block;\n    width: 100%;\n    height: 50%;\n    content: '';\n    background-color: rgba(255,255,255,.4);\n    -webkit-transform-origin: 50% 100%;\n    -ms-transform-origin: 50% 100%;\n    -o-transform-origin: 50% 100%;\n    transform-origin: 50% 100%;\n}\n.city-picker .picker-center-highlight:before {\n  position: absolute;\n  top: 0;\n  right: auto;\n  bottom: auto;\n  left: 0;\n  z-index: 15;\n  display: block;\n  width: 100%;\n  height: 50%;\n  margin-top:-18px;\n  content: '';\n  background-color: rgba(255,255,255,.4);\n  -webkit-transform-origin: 50% 0;\n      -ms-transform-origin: 50% 0;\n       -o-transform-origin: 50% 0;\n          transform-origin: 50% 0;\n}*/\n\n.city-picker .picker-center-highlight:before {\n  height: 100%;\n  margin: 0 auto;\n  z-index: 3;\n  background-image: -webkit-linear-gradient(top,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6)),-webkit-linear-gradient(bottom,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6));\n  background-image: linear-gradient(180deg,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6)),linear-gradient(0deg,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6));\n  background-position: top,bottom;\n  background-size: 100% 108px;\n  background-repeat: no-repeat;\n  position: absolute;\n  left: 0;\n  top: 0;\n  content: '';\n  width: 100%;\n}\n.city-picker .picker-center-highlight:after {\n  content: '';\n  width: 100%;\n  height: 36px;\n  position: absolute;\n  left: 0;\n  top: 50%;\n  margin-top:-18px;\n  z-index: 3;\n  background-image: -webkit-linear-gradient(top,#d0d0d0,#d0d0d0,transparent,transparent),-webkit-linear-gradient(bottom,#d0d0d0,#d0d0d0,transparent,transparent);\n  background-image: linear-gradient(180deg,#d0d0d0,#d0d0d0,transparent,transparent),linear-gradient(0deg,#d0d0d0,#d0d0d0,transparent,transparent);\n  background-position: top,bottom;\n  background-size: 100% 1px;\n  background-repeat: no-repeat;\n}\n.city-picker .row,.city-picker  .col{padding: 0;}\n.ionic-citypicker .item-note:after{\n  content: \" \";\n  display: inline-block;\n  -webkit-transform: rotate(45deg);\n  transform: rotate(45deg);\n  height: 6px;\n  width: 6px;\n  border-width: 2px 2px 0 0;\n  border-color: #c8c8cd;\n  border-style: solid;\n  position: relative;\n  top: -2px;\n  top: -1px;\n  margin-left: .3em;\n}");