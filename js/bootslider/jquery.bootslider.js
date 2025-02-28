function bootslider(target, options) {
    function setLayers() {
        $(".bs-layer", $this).each(function() {
            var e = $(this);
            var t = $(".active", $this);
            var n = e.attr("data-left");
            var r = e.attr("data-right");
            var i = e.attr("data-top");
            var s = e.attr("data-bottom");
            var o = e.attr("data-width") ? e.attr("data-width") : e.get(0).width;
            var u = e.attr("data-height") ? e.attr("data-height") : e.get(0).height;
            var a = t.width() / settings.canvas.width;
            var f = t.height() / settings.canvas.height;
            if (settings.layout != "default") {
                var l = $(".bs-background img", $this).not(".bs-layer");
                var c = t.width() / t.height();
                var h = o / u;
                if (c >= h) {
                    f = a
                } else {
                    a = f
                }
            }
            $("[data-fontsize]", $this).each(function() {
                var e = $(this);
                var t = e.attr("data-fontsize") * a + "px";
                e.css({
                    "font-size": t
                })
            });
            if (n) {
                e.css({
                    left: n * a
                })
            } else if (r) {
                e.css({
                    right: r * a
                })
            } else {
                e.css({
                    left: 0
                })
            }
            if (i) {
                e.css({
                    top: i * f
                })
            } else if (s) {
                e.css({
                    bottom: s * f
                })
            } else {
                e.css({
                    top: 0
                })
            }
            e.css({
                width: o * a,
                height: u * f
            })
        })
    }

    function timerinit() {
        count = -10;
        $progress.css({
            width: "0%"
        })
    }

    function parallax() {
        $(".bs-parallax", $this).each(function() {
            var e = $(window).scrollTop();
            $(this).css("top", -(e * settings.parallax) + "px")
        })
    }

    function fullvideo() {
        var e = $active.width();
        var t = $active.height() - 7;
        $(".bs-video-fullscreen iframe", $this).css({
            width: e + "px",
            height: t + "px"
        })
    }
    var settings = $.extend({
        animationIn: "fadeInUp",
        animationOut: "fadeOutUp",
        timeout: 5e3,
        autoplay: true,
        looponce: false,
        preload: true,
        pauseOnHover: false,
        pagination: false,
        thumbnails: false,
        mousewheel: false,
        keyboard: true,
        touchscreen: true,
        parallax: .2,
        layout: "default",
        canvas: {
            width: 1170,
            height: 500
        }
    }, options);
    var self = this;
    var $this = $(target);
    var $slides = $(".bs-slide", $this);
    var $active = $(".active", $this) ? $(".active", $this) : $slides.eq(0);
    var $length = $slides.length - 1;
    var $next = $(".bs-next", $this);
    var $prev = $(".bs-prev", $this);
    var $loader = $(".bs-loader", $this);
    var $pagination = $(".bs-pagination", $this);
    var $thumbnails = $(".bs-thumbnails", $this);
    var $progress = $(".bs-progress .progress-bar", $this);
    var timeout;
    var $current;
    var animated;
    var settleTime = 800;
    var margin = -$active.height();
    self.init = function() {
        var e = 0;
        if (settings.layout !== "content") {
            $(".bs-background img", $this).each(function() {
                var t = $(this);
                var n = t.attr("src");
                var r = $(new Image);
                r.load(function() {
                    ++e;
                    if (e === $length || settings.preload === false) {
                        $loader.fadeOut(500).remove();
                        if (settings.touchscreen == true) {
                            self.add("touchscreen")
                        }
                        if (settings.mousewheel == true) {
                            self.add("mousewheel")
                        }
                        if (settings.keyboard == true) {
                            self.add("keyboard")
                        }
                        if (settings.pagination == true) {
                            self.add("pagination")
                        } else {
                            $pagination.hide()
                        }
                        if (settings.thumbnails == true) {
                            self.add("thumbnails")
                        } else {
                            $thumbnails.hide()
                        }
                        margin = -$active.height();
                        setLayers();
                        var n = t.attr("data-layout") ? t.attr("data-layout") : settings.layout;
                        self.layout(n);
                        $slides.addClass("animated");
                        $("[data-animate-in]", $slides).each(function() {
                            $(this).addClass("animated")
                        });
                        $("[data-animate-out]", $slides).each(function() {
                            $(this).addClass("animated")
                        });
                        $active.addClass("active");
                        $active.addClass("visible");
                        var r = $active.attr("data-animate-in") ? $active.attr("data-animate-in") : settings.animationIn;
                        $active.addClass(r);
                        $current = $active.index();
                        $("[data-animate-in]", $active).each(function() {
                            var e = $(this);
                            var t = e.attr("data-animate-in");
                            var n = e.attr("data-animate-out") ? e.attr("data-animate-out") : "fadeOut";
                            var r = e.attr("data-delay") ? e.attr("data-delay") : 0;
                            var i = e.attr("data-delay-out") ? e.attr("data-delay-out") : 0;
                            e.hide();
                            e.removeClass(n);
                            if (r === 0) {
                                e.show();
                                e.addClass("visible");
                                e.addClass(t)
                            } else {
                                setTimeout(function() {
                                    e.show();
                                    e.addClass("visible");
                                    e.addClass(t)
                                }, r);
                                if (i !== 0) {
                                    setTimeout(function() {
                                        e.removeClass(t);
                                        e.addClass(n)
                                    }, i + r)
                                }
                            }
                        })
                    }
                });
                r.attr("src", n)
            })
        } else {
            if (settings.touchscreen == true) {
                self.add("touchscreen")
            }
            if (settings.mousewheel == true) {
                self.add("mousewheel")
            }
            if (settings.keyboard == true) {
                self.add("keyboard")
            }
            if (settings.pagination == true) {
                self.add("pagination")
            } else {
                $pagination.hide()
            }
            if (settings.thumbnails == true) {
                self.add("thumbnails")
            } else {
                $thumbnails.hide()
            }
            margin = -$active.height();
            setLayers();
            var t = $this.attr("data-layout") ? $this.attr("data-layout") : settings.layout;
            self.layout(t);
            $slides.addClass("animated");
            $("[data-animate-in]", $slides).each(function() {
                $(this).addClass("animated")
            });
            $("[data-animate-out]", $slides).each(function() {
                $(this).addClass("animated")
            });
            $active.addClass("active");
            $active.addClass("visible");
            var n = $active.attr("data-animate-in") ? $active.attr("data-animate-in") : settings.animationIn;
            $active.addClass(n);
            $current = $active.index();
            $("[data-animate-in]", $active).each(function() {
                var e = $(this);
                var t = e.attr("data-animate-in");
                var n = e.attr("data-animate-out") ? e.attr("data-animate-out") : "fadeOut";
                var r = e.attr("data-delay") ? e.attr("data-delay") : 0;
                var i = e.attr("data-delay-out") ? e.attr("data-delay-out") : 0;
                e.removeClass(n);
                e.hide();
                if (r === 0) {
                    e.show();
                    e.addClass("visible");
                    e.addClass(t)
                } else {
                    setTimeout(function() {
                        e.show();
                        e.addClass("visible");
                        e.addClass(t)
                    }, r);
                    if (i !== 0) {
                        setTimeout(function() {
                            e.show();
                            e.removeClass(t);
                            e.addClass(n)
                        }, i + r)
                    }
                }
            })
        }
    };
    self.layout = function(e) {
        var t = $(".active", $this);
        var n = $(".bs-background img", $this).not(".bs-layer");
        var r = function() {};
        if (e === "fixedheight") {
            $this.addClass("bootslider-variableheight");
            r = function() {
                n.each(function() {
                    var e = $(this);
                    var n = e.get(0).height;
                    var r = e.get(0).width;
                    var i = t.width() / t.height();
                    var s = r / n;
                    if (i >= s) {
                        e.removeClass("fullheight").addClass("fullwidth")
                    } else {
                        e.removeClass("fullwidth").addClass("fullheight")
                    }
                })
            }
        } else if (e === "fixedheight-center") {
            $this.addClass("bootslider-variableheight");
            r = function() {
                n.each(function() {
                    var e = $(this);
                    var n = e.get(0).height;
                    var r = e.get(0).width;
                    var i = t.width() / t.height();
                    var s = r / n;
                    var o = (t.height() - t.width() / r * n) / 2;
                    var u = (t.width() - t.height() / n * r) / 2;
                    if (i >= s) {
                        e.removeClass("fullheight").addClass("fullwidth");
                        e.css({
                            left: 0,
                            top: o
                        })
                    } else {
                        e.removeClass("fullwidth").addClass("fullheight");
                        e.css({
                            top: 0,
                            left: u
                        })
                    }
                })
            }
        } else if (e === "fullscreen") {
            $this.addClass("bootslider-variableheight");
            r = function() {
                n.each(function() {
                    var e = $(this);
                    if (typeof $(window).width() != "undefined" && $(window).width() != 0) var n = $(window).width();
                    else if (typeof document.documentElement.clientWidth != "undefined" && document.documentElement.clientWidth != 0) var n = document.documentElement.clientWidth;
                    else var n = window.innerWidth;
                    if (typeof $(window).height() != "undefined" && $(window).height() != 0) var r = $(window).height();
                    else if (typeof document.documentElement.clientHeight != "undefined" && document.documentElement.clientHeight != 0) var r = document.documentElement.clientHeight;
                    else var r = window.innerHeight;
                    var i = e.get(0).height;
                    var s = e.get(0).width;
                    $slides.width(n).height(r);
                    var o = t.width() / t.height();
                    var u = s / i;
                    if (o >= u) {
                        e.removeClass("fullheight").addClass("fullwidth")
                    } else {
                        e.removeClass("fullwidth").addClass("fullheight")
                    }
                })
            }
        } else if (e === "fullscreen-center") {
            $this.addClass("bootslider-variableheight");
            r = function() {
                n.each(function() {
                    var e = $(this);
                    if (typeof $(window).width() != "undefined" && $(window).width() != 0) var n = $(window).width();
                    else if (typeof document.documentElement.clientWidth != "undefined" && document.documentElement.clientWidth != 0) var n = document.documentElement.clientWidth;
                    else var n = window.innerWidth;
                    if (typeof $(window).height() != "undefined" && $(window).height() != 0) var r = $(window).height();
                    else if (typeof document.documentElement.clientHeight != "undefined" && document.documentElement.clientHeight != 0) var r = document.documentElement.clientHeight;
                    else var r = window.innerHeight;
                    var i = e.get(0).height;
                    var s = e.get(0).width;
                    $slides.width(n).height(r);
                    var o = t.width() / t.height();
                    var u = s / i;
                    var a = (r - t.width() / s * i) / 2;
                    var f = (n - t.height() / i * s) / 2;
                    if (o >= u) {
                        e.removeClass("fullheight").addClass("fullwidth");
                        e.css({
                            left: 0,
                            top: a
                        })
                    } else {
                        e.removeClass("fullwidth").addClass("fullheight");
                        e.css({
                            top: 0,
                            left: f
                        })
                    }
                })
            }
        } else if (e === "content") {
            $this.addClass("bootslider-content")
        }
        var i = function() {
            var e = 0;
            return function(t, n) {
                clearTimeout(e);
                e = setTimeout(t, n)
            }
        }();
        $(window).resize(function() {
            i(function() {
                r()
            }, 200)
        }).trigger("resize")
    };
    self.gotoslide = function(e) {
        var t = $current;
        if (e == t) return;
        if (animated == 1) return;
        if (e > $length) e = 0;
        else if (e < 0) e = $length;
        $(window).resize();
        animated = 1;
        $("ul li", $pagination).eq(t).removeClass("active");
        $("ul li", $pagination).eq(e).addClass("active");
        $("ul li", $thumbnails).eq(t).removeClass("active");
        $("ul li", $thumbnails).eq(e).addClass("active");
        if (settings.autoplay == true) timerinit();
        $("iframe[src*='player.vimeo.com']", $this).each(function() {
            var e = this.id;
            if (typeof Froogaloop(e).api === "function") Froogaloop(e).api("pause");
            else $(this).attr("src", this.src)
        });
        $("iframe[src*='youtube.com']", $this).each(function() {
            var e = this.id;
            if (typeof youtubeplayers[e].pauseVideo === "function") youtubeplayers[e].pauseVideo();
            else $(this).attr("src", this.src)
        });
        var n = $slides.eq(t);
        n.removeClass("active");
        var r = n.attr("data-animate-out") ? n.attr("data-animate-out") : settings.animationOut;
        var i = $active.attr("data-animate-in") ? $active.attr("data-animate-in") : settings.animationIn;
        n.addClass(r);
        $("[data-animate-out]", n).each(function() {
            var e = $(this);
            var t = e.attr("data-animate-in");
            var n = e.attr("data-animate-out");
            e.removeClass(t);
            e.addClass(n)
        });
        $active = $slides.eq(e);
        $active.addClass("active").addClass("visible");
        var s = $active.attr("data-animate-in") ? $active.attr("data-animate-in") : settings.animationIn;
        $active.removeClass(s).addClass(s);
        $('[data-bs-video-autoplay="true"]').each(function() {
            var e = this.src;
            if (/\autoplay=1/.test(e)) {
                $(this).attr("src", e.replace(/\autoplay=1/g, ""))
            }
        });
        $('[data-bs-video-autoplay="true"]', $active).each(function() {
            var e = this.src;
            if (/\?/.test(e) && !/\autoplay=1/.test(e)) {
                $(this).attr("src", e + "&autoplay=1")
            } else if (!/\?/.test(e)) {
                $(this).attr("src", e + "?autoplay=1")
            }
        });
        $("[data-animate-in]", $active).removeClass("visible");
        $("[data-animate-in]", $active).each(function() {
            var e = $(this);
            var t = e.attr("data-animate-in");
            var n = e.attr("data-animate-out") ? e.attr("data-animate-out") : "fadeOut";
            var r = e.attr("data-delay") ? e.attr("data-delay") : 0;
            var i = e.attr("data-delay-out") ? e.attr("data-delay-out") : 0;
            e.removeClass(n);
            e.hide();
            if (r === 0) {
                e.show();
                e.addClass("visible");
                e.addClass(t)
            } else {
                setTimeout(function() {
                    e.show();
                    e.addClass("visible");
                    e.addClass(t)
                }, r);
                if (i !== 0) {
                    setTimeout(function() {
                        e.removeClass(t);
                        e.addClass(n)
                    }, i + r)
                }
            }
        });
        margin = -$active.height();
        if (e > t) $active.css({
            "margin-top": margin
        });
        else n.css({
            "margin-top": margin
        });
        setTimeout(function() {
            n.removeClass("visible").removeClass(r).removeClass(i);
            if (e > t) $active.css({
                "margin-top": 0
            });
            else n.css({
                "margin-top": 0
            });
            animated = 0
        }, settleTime);
        timeout = $active.attr("data-timeout") ? $active.attr("data-timeout") : settings.timeout;
        $current = e
    };
    (function($) {
        $.timer = function(func, time, autostart) {
            this.set = function(func, time, autostart) {
                this.init = true;
                if (typeof func == "object") {
                    var paramList = ["autostart", "time"];
                    for (var arg in paramList) {
                        if (func[paramList[arg]] != undefined) {
                            eval(paramList[arg] + " = func[paramList[arg]]")
                        }
                    }
                    func = func.action
                }
                if (typeof func == "function") {
                    this.action = func
                }
                if (!isNaN(time)) {
                    this.intervalTime = time
                }
                if (autostart && !this.isActive) {
                    this.isActive = true;
                    this.setTimer()
                }
                return this
            };
            this.once = function(e) {
                var t = this;
                if (isNaN(e)) {
                    e = 0
                }
                window.setTimeout(function() {
                    t.action()
                }, e);
                return this
            };
            this.play = function(e) {
                if (!this.isActive) {
                    if (e) {
                        this.setTimer()
                    } else {
                        this.setTimer(this.remaining)
                    }
                    this.isActive = true
                }
                return this
            };
            this.pause = function() {
                if (this.isActive) {
                    this.isActive = false;
                    this.remaining -= new Date - this.last;
                    this.clearTimer()
                }
                return this
            };
            this.stop = function() {
                this.isActive = false;
                this.remaining = this.intervalTime;
                this.clearTimer();
                return this
            };
            this.toggle = function(e) {
                if (this.isActive) {
                    this.pause()
                } else if (e) {
                    this.play(true)
                } else {
                    this.play()
                }
                return this
            };
            this.reset = function() {
                this.isActive = false;
                this.play(true);
                return this
            };
            this.clearTimer = function() {
                window.clearTimeout(this.timeoutObject)
            };
            this.setTimer = function(e) {
                var t = this;
                if (typeof this.action != "function") {
                    return
                }
                if (isNaN(e)) {
                    e = this.intervalTime
                }
                this.remaining = e;
                this.last = new Date;
                this.clearTimer();
                this.timeoutObject = window.setTimeout(function() {
                    t.go()
                }, e)
            };
            this.go = function() {
                if (this.isActive) {
                    this.action();
                    this.setTimer()
                }
            };
            if (this.init) {
                return new $.timer(func, time, autostart)
            } else {
                this.set(func, time, autostart);
                return this
            }
        }
    })(jQuery);
    if (settings.autoplay == true) {
        var count = 0;
        var timer = $.timer(function() {
            count++;
            timeout = $active.attr("data-timeout") ? $active.attr("data-timeout") : settings.timeout;
            if (count >= timeout / 100) {
                if (settings.looponce == true && $current < $length) self.gotoslide($current + 1);
                else if (settings.looponce == false) self.gotoslide($current + 1)
            }
            $progress.css({
                width: count * 11e3 / timeout + "%"
            })
        }, 100, true);
        if (settings.pauseOnHover == true) {
            $slides.hover(function() {
                self.pauseTimer()
            }, function() {
                self.playTimer()
            })
        }
        timer.go()
    } else {
        $progress.closest(".progress").hide(0)
    }
    self.pauseTimer = function() {
        timer.pause()
    };
    self.playTimer = function() {
        timer.play()
    };
    $next.click(function() {
        self.gotoslide($current + 1)
    });
    $prev.click(function() {
        self.gotoslide($current - 1)
    });
    self.add = function(e) {
        switch (e) {
            case "touchscreen":
                {
                    $this.swipe({
                        swipeLeft: function(e, t) {
                            self.gotoslide($current + 1)
                        },
                        swipeRight: function(e, t) {
                            self.gotoslide($current - 1)
                        }
                    })
                }
                break;
            case "mousewheel":
                {
                    $this.bind("mousewheel", function(e, t) {
                        if (t < 0) {
                            self.gotoslide($current + 1)
                        }
                        if (t > 0) {
                            self.gotoslide($current - 1)
                        }
                        e.stopPropagation();
                        e.preventDefault()
                    })
                }
                break;
            case "keyboard":
                {
                    $(document).keydown(function(e) {
                        if (e.keyCode == 37) {
                            self.gotoslide($current - 1)
                        }
                        if (e.keyCode == 39) {
                            self.gotoslide($current + 1)
                        }
                    })
                }
                break;
            case "pagination":
                {
                    var t;
                    for (t = 1; t <= $length + 1; t++) $("ul", $pagination).append('<li><a href="javascript:void(0);">' + t + "</a></li>");
                    $("ul li", $pagination).eq($active.index()).addClass("active");
                    $("ul li a", $pagination).click(function() {
                        var e = $(this).closest("li").index();
                        self.gotoslide(e)
                    })
                }
                break;
            case "thumbnails":
                {
                    var t;
                    var n = 100 / ($length + 1);
                    if (n > 25) n = 25;
                    for (t = 0; t <= $length; t++) {
                        var r = $(".bs-slide", $this).eq(t).attr("data-thumbnail") ? $(".bs-slide", $this).eq(t).attr("data-thumbnail") : $(".bs-background img").eq(t).attr("src");
                        var i = $(".bs-background img", $this).eq(t).attr("alt");
                        $("ul", $thumbnails).append('<li style="width: ' + n + '%" class="bs-thumbnail"><a href="javascript:void(0);"><img src="' + r + '" alt="' + i + '" /></a></li>')
                    }
                    $("ul li", $thumbnails).eq($active.index()).addClass("active");
                    $("ul li a", $thumbnails).click(function() {
                        var e = $(this).closest("li").index();
                        self.gotoslide(e)
                    })
                }
                break
        }
    };
    $(window).scroll(function(e) {
        parallax()
    });
    $(".bs-video", $this).fitVids();
    $("iframe", $this).attr("data-bootslider-target", bootsliderCount);
    ++bootsliderCount;
    $(window).resize(function() {
        fullvideo();
        margin = -$active.height();
        setLayers()
    }).trigger("resize");
    if (window.addEventListener) {
        window.addEventListener("orientationchange", function() {
            $(window).trigger("resize")
        })
    } else if (window.attachEvent) {
        window.attachEvent("orientationchange", function() {
            $(window).trigger("resize")
        })
    }
    window.BOOTSLIDER.push(this)
}
var bootsliderCount = 0;
window.BOOTSLIDER = new Array