(function () {
  var hamburger = document.querySelector(".nav-hamburger");
  var navLinks = document.querySelector(".nav-links");
  if (!hamburger || !navLinks) return;

  function setOpen(open) {
    hamburger.classList.toggle("is-open", open);
    navLinks.classList.toggle("is-open", open);
    hamburger.setAttribute("aria-expanded", open ? "true" : "false");
    document.documentElement.classList.toggle("nav-open", open);
  }

  hamburger.addEventListener("click", function () {
    setOpen(!navLinks.classList.contains("is-open"));
  });

  /* Only real navigation closes the menu - the language toggle stays open
     so a visitor can switch language and then still pick a page. */
  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setOpen(false);
    });
  });
})();

(function () {
  var DICT = window.KY_I18N;
  if (!DICT) return;

  var LANG_KEY = "kyLang";
  var lang = localStorage.getItem(LANG_KEY) === "zh" ? "zh" : "en";

  function lookup(key) {
    var parts = key.split(".");
    var node = DICT;
    for (var i = 0; i < parts.length; i++) {
      if (!node) return null;
      node = node[parts[i]];
    }
    return node;
  }

  /* This runs before every other script in the file, so anything further
     down that captures "default" text off the DOM at init time (the
     theater's featured-photo label, the contact form's default button/file
     text) captures it already in the active language. */
  function applyLang(next) {
    lang = next;
    document.documentElement.setAttribute("lang", lang === "zh" ? "zh-Hans" : "en");

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var entry = lookup(el.getAttribute("data-i18n"));
      if (entry && entry[lang] != null) el.textContent = entry[lang];
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var entry = lookup(el.getAttribute("data-i18n-html"));
      if (entry && entry[lang] != null) el.innerHTML = entry[lang];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var entry = lookup(el.getAttribute("data-i18n-placeholder"));
      if (entry && entry[lang] != null) el.placeholder = entry[lang];
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach(function (el) {
      var entry = lookup(el.getAttribute("data-i18n-aria-label"));
      if (entry && entry[lang] != null) el.setAttribute("aria-label", entry[lang]);
    });

    var toggleBtn = document.querySelector(".lang-toggle");
    if (toggleBtn) toggleBtn.textContent = lang === "zh" ? "EN" : "中文";
  }

  applyLang(lang);

  var toggleBtn = document.querySelector(".lang-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      var next = lang === "zh" ? "en" : "zh";
      localStorage.setItem(LANG_KEY, next);

      /* The gallery page's zoom animation is built around one specific
         glyph's measured metrics (font, DOM structure, and anchor
         position all change together between languages) - reloading lets
         it reinitialize cleanly through the same path already proven at
         first load, rather than live-rebinding a scroll-driven animation
         mid-flight. */
      if (document.querySelector(".gallery-mask-anchor")) {
        location.reload();
        return;
      }

      applyLang(next);
    });
  }

  window.kyLang = {
    get: function () {
      return lang;
    },
    t: function (key) {
      var entry = lookup(key);
      return entry ? entry[lang] : null;
    },
  };
})();

(function () {
  var loader = document.getElementById("page-loader");
  if (!loader) return;

  var html = document.documentElement;
  html.classList.add("is-loading");

  /* A cached, near-instant load would otherwise flash the loader for a few
     ms, which reads as a glitch rather than a transition. Enforcing a floor
     keeps the logo on screen long enough to register. */
  var MIN_SHOW_MS = 500;
  var shownAt = Date.now();
  var hidden = false;

  function hide() {
    if (hidden) return;
    hidden = true;

    var elapsed = Date.now() - shownAt;
    var wait = Math.max(MIN_SHOW_MS - elapsed, 0);

    setTimeout(function () {
      loader.classList.add("is-hidden");
      html.classList.remove("is-loading");
      loader.addEventListener(
        "transitionend",
        function () {
          loader.remove();
        },
        { once: true }
      );
    }, wait);
  }

  /* Waiting for window's "load" event (everything fully loaded, including
     every off-screen image and each embedded YouTube iframe's own player
     assets) held scroll locked for seconds on image/video-heavy pages like
     Events. DOMContentLoaded — parsing done, independent of media — is all
     the loader actually needs to cover. */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", hide);
  } else {
    hide();
  }

  /* Failsafe in case something upstream keeps DOMContentLoaded from firing
     — the loader must not be able to trap the page indefinitely. */
  setTimeout(hide, 6000);
})();

(function () {
  if (typeof Lenis === "undefined") return;

  var lenis = new Lenis({
    duration: 1.1,
    easing: function (t) {
      return Math.min(1, 1.001 - Math.pow(2, -10 * t));
    },
    smoothWheel: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
})();

(function () {
  var wrap = document.querySelector(".hero-sticky");
  var lines = document.querySelectorAll(".hero-line");
  if (!wrap || !lines.length) return;

  var ticking = false;

  function update() {
    var rect = wrap.getBoundingClientRect();
    var viewportHeight = window.innerHeight;
    var pinDistance = wrap.offsetHeight - viewportHeight;

    if (pinDistance <= 0) {
      lines.forEach(function (line) {
        line.style.opacity = "1";
      });
      ticking = false;
      return;
    }

    var scrolledIntoPin = -rect.top;
    var progress = scrolledIntoPin / pinDistance;
    progress = Math.min(Math.max(progress, 0), 1);

    var segment = 1 / lines.length;

    lines.forEach(function (line, i) {
      var segStart = i * segment;
      var segProgress = (progress - segStart) / segment;
      segProgress = Math.min(Math.max(segProgress, 0), 1);
      line.style.opacity = String(segProgress);
    });

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
})();

(function () {
  var mission = document.querySelector(".mission");
  if (!mission || !("IntersectionObserver" in window)) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          mission.classList.add("in-view");
        } else {
          mission.classList.remove("in-view");
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(mission);
})();

(function () {
  var pillarsWrap = document.querySelector(".pillars-wrap");
  if (!pillarsWrap || !("IntersectionObserver" in window)) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          pillarsWrap.classList.add("in-view");
        } else {
          pillarsWrap.classList.remove("in-view");
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(pillarsWrap);
})();

(function () {
  var events = document.querySelectorAll(".event");
  if (!events.length || !("IntersectionObserver" in window)) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        } else {
          entry.target.classList.remove("in-view");
        }
      });
    },
    { threshold: 0.2 }
  );

  events.forEach(function (event) {
    observer.observe(event);
  });
})();

(function () {
  var dots = document.querySelectorAll(".timeline-dot");
  if (!dots.length) return;

  dots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      var wasActive = dot.classList.contains("active");
      dots.forEach(function (other) {
        other.classList.remove("active");
      });
      if (!wasActive) {
        dot.classList.add("active");
      }
    });
  });
})();

(function () {
  var cards = document.querySelectorAll(".partner-card");
  if (!cards.length) return;

  cards.forEach(function (card) {
    card.addEventListener("click", function () {
      var expanded = card.classList.toggle("expanded");
      card.setAttribute("aria-expanded", expanded ? "true" : "false");
    });
  });
})();

(function () {
  var groups = document.querySelectorAll(".partner-group, .contact-cards");
  if (!groups.length || !("IntersectionObserver" in window)) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  groups.forEach(function (group) {
    observer.observe(group);
  });
})();

(function () {
  var wrap = document.querySelector(".gallery-hero-sticky");
  var maskText = document.querySelector(".gallery-mask-text");
  var word = document.querySelector(".gallery-mask-word");
  var solid = document.querySelector(".gallery-mask-solid");
  var anchor = document.querySelector(".gallery-mask-anchor");
  var blackBlock = document.querySelector(".gallery-black-block");
  if (!wrap || !maskText || !word || !anchor || !blackBlock) return;

  var fadeStart = 0.7;

  /* How far across the anchor glyph's advance width the zoom aims, 0 = its
     left edge. */
  var ANCHOR_TARGET_FRACTION;

  var isZh = window.kyLang && window.kyLang.get() === "zh";

  if (isZh) {
    /* "GALLERY" is a wordmark tied to the Latin letter "L"'s stem, so it's
       deliberately left untranslated elsewhere (see gallery.html). In
       Chinese mode the wordmark switches to 画廊 ("art gallery" - huàláng,
       the standard everyday term), and the zoom now targets 画's own
       vertical stroke instead. Urbanist has no CJK glyphs, so this also
       needs a real CJK font (Noto Sans SC) rather than an unpredictable
       system fallback, since the anchor fraction below was measured
       specifically against it. Re-measure that fraction if either the
       glyph or the font ever changes - the two are not interchangeable.
       (The traditional 畫 in Noto Sans TC measured 0.493; the simplified
       画 is a different glyph entirely and does not share that value.) */
    solid.textContent = "画廊";
    solid.style.fontFamily = "'Noto Sans SC', sans-serif";
    word.innerHTML = '<span class="gallery-mask-anchor">画</span>廊';
    word.style.fontFamily = "'Noto Sans SC', sans-serif";
    anchor = word.querySelector(".gallery-mask-anchor");
    if (!anchor) return;

    /* Unlike 畫, which had one thick full-height stem, 画 has five
       verticals: the box's two outer edges plus the 田 component's inner
       strokes. Measured at 300px, those sit at x 44-69, 88-111, 142-165,
       194-218 and 235-259 of a 300px advance; the middle one is the
       glyph's own centre stroke, and its centre lands at 0.512 - which
       agrees with both the ink bounding box (0.508) and the ink centroid
       (0.519). Picking the widest full-height run instead would snap to
       the box's right edge (0.817) and aim the zoom off to one side. */
    ANCHOR_TARGET_FRACTION = 0.512;
  } else {
    /* The glyph's vertical stem spans roughly 0.10-0.29 of that width (the
       rest is the trailing letter-spacing gap plus the foot's empty
       notch), so 0.193 is the stem's own centre. */
    ANCHOR_TARGET_FRACTION = 0.193;
  }

  var baseFontSize;
  var anchorOffsetEm;
  var maxFontSize;

  /* background-attachment: fixed (set in CSS) is what makes the image look
     "pinned" behind the zooming text instead of scaling with it - but
     mobile browsers (Safari in particular) don't reliably support fixed
     backgrounds, so on mobile the image just scales along with the text
     instead of staying put, breaking the zoom-reveal illusion. This
     reproduces the same visual result by hand: compute where a
     viewport-"cover"-sized copy of the image would sit if it really were
     fixed, then every frame, re-express that as a background-position
     relative to the text element's own (moving, resizing) box. Desktop
     keeps the native CSS behavior untouched. */
  var GALLERY_IMG_NATURAL_W = 8143;
  var GALLERY_IMG_NATURAL_H = 5167;
  var useFixedBgFallback = false;
  var bgRenderW, bgRenderH, bgOriginX, bgOriginY;

  function measureFixedBgFallback() {
    /* What this fallback actually depends on is the device, not the
       window size - so it also asks whether this is a touch device rather
       than relying on width alone. A phone held in landscape is 812-932px
       wide, so the width test alone reported "desktop" and handed a real
       mobile browser the native background-attachment: fixed path this
       exists to avoid. The width test stays as the first clause because
       desktop emulation of a small viewport reports hover/pointer as
       fine, and resizing a desktop window should still exercise this. */
    useFixedBgFallback =
      window.matchMedia("(max-width: 800px)").matches ||
      window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (!useFixedBgFallback) return;

    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var imgRatio = GALLERY_IMG_NATURAL_W / GALLERY_IMG_NATURAL_H;
    var viewportRatio = vw / vh;

    if (imgRatio > viewportRatio) {
      bgRenderH = vh;
      bgRenderW = vh * imgRatio;
    } else {
      bgRenderW = vw;
      bgRenderH = vw / imgRatio;
    }
    bgOriginX = (vw - bgRenderW) / 2;
    bgOriginY = (vh - bgRenderH) / 2;

    word.style.backgroundAttachment = "scroll";
    word.style.backgroundSize = bgRenderW + "px " + bgRenderH + "px";
  }

  /* Where the zoom aims depends on the L's position, which depends on
     Urbanist's glyph metrics. Measuring while the fallback font is still
     showing aims it at empty space instead, so this re-runs once the webfont
     is ready. Always measures at the unscaled size. */
  function measureAnchor() {
    var prevFontSize = word.style.fontSize;
    var prevMarginLeft = word.style.marginLeft;
    word.style.fontSize = "";
    word.style.marginLeft = "";

    baseFontSize = parseFloat(getComputedStyle(word).fontSize);

    /* Browsers cap font-size (Chrome stops at 5000px). Past the cap the text
       stops growing, so the drift compensation has to stop too or the L slides
       off centre. Probe the real ceiling rather than assuming one. */
    word.style.fontSize = "100000px";
    maxFontSize = parseFloat(getComputedStyle(word).fontSize);
    word.style.fontSize = "";

    var containerRect = maskText.getBoundingClientRect();
    var anchorRect = anchor.getBoundingClientRect();
    var containerCenterX = containerRect.left + containerRect.width / 2;
    var anchorTargetX = anchorRect.left + anchorRect.width * ANCHOR_TARGET_FRACTION;
    anchorOffsetEm = (anchorTargetX - containerCenterX) / baseFontSize;

    word.style.fontSize = prevFontSize;
    word.style.marginLeft = prevMarginLeft;
  }

  measureAnchor();
  measureFixedBgFallback();

  var revealed = false;
  var ticking = false;

  function update() {
    if (revealed) {
      ticking = false;
      return;
    }

    var rect = wrap.getBoundingClientRect();
    var viewportHeight = window.innerHeight;
    var pinDistance = wrap.offsetHeight - viewportHeight;

    if (pinDistance <= 0) {
      ticking = false;
      return;
    }

    var scrolledIntoPin = -rect.top;
    var progress = scrolledIntoPin / pinDistance;
    progress = Math.min(Math.max(progress, 0), 1);

    var eased = Math.pow(progress, 1.6);
    var multiplier = 1 + eased * 30;
    var currentFontSize = Math.min(baseFontSize * multiplier, maxFontSize);
    word.style.fontSize = currentFontSize + "px";

    var drift = anchorOffsetEm * (currentFontSize - baseFontSize);
    word.style.marginLeft = -2 * drift + "px";

    if (useFixedBgFallback) {
      var wordRect = word.getBoundingClientRect();
      word.style.backgroundPosition = (bgOriginX - wordRect.left) + "px " + (bgOriginY - wordRect.top) + "px";
    }

    var fadeProgress = (progress - fadeStart) / (1 - fadeStart);
    fadeProgress = Math.min(Math.max(fadeProgress, 0), 1);
    var opacity = 1 - fadeProgress;
    blackBlock.style.opacity = opacity;
    maskText.style.opacity = opacity;

    if (progress >= 1) {
      revealed = true;
      wrap.classList.add("revealed");
    }

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", function () {
    measureAnchor();
    measureFixedBgFallback();
    onScroll();
  });
  update();

  /* The webfont usually lands after this script runs, and whether it beats us
     varies by origin (file:// and localhost cache separately), which is why the
     aim differed between them. */
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      measureAnchor();
      measureFixedBgFallback();
      update();
    });
  }
})();

(function () {
  var wrap = document.querySelector(".gallery-hero-sticky");
  var toggle = document.querySelector(".gallery-view-toggle");
  var tracks = document.querySelectorAll(".gallery-carousel-track");
  if (!wrap || !toggle || !tracks.length) return;

  /* The vertical loop works by translating a doubled track up exactly
     -50%, so the second (identical) copy lands where the first started.
     That's only gap-free if a single copy is already at least as tall as
     the viewport - otherwise the loop point falls inside the visible
     column and a blank gap passes through before the next copy scrolls
     up far enough to cover it. Columns with fewer or shorter images (an
     8-image column measured ~623px tall against an 812px viewport, for
     example) fell short of that. Each half of the loop must be built from
     the same whole number of repeats of the original set - not just
     "enough images" - or the -50% snap-back lands mid-repeat and jumps
     instead of looping cleanly, so this computes how many whole repeats
     per half are needed from each set's real (loaded) height and mirrors
     that exactly on both sides. */
  tracks.forEach(function (track) {
    var originalImgs = Array.prototype.slice.call(track.children);

    function appendOriginalSet() {
      originalImgs.forEach(function (img) {
        track.appendChild(img.cloneNode(true));
      });
    }

    function buildLoop() {
      var singleSetHeight = track.scrollHeight;
      var target = window.innerHeight * 1.4;
      var repsPerHalf = Math.max(1, Math.ceil(target / singleSetHeight));
      var totalReps = repsPerHalf * 2;
      for (var i = 1; i < totalReps; i++) {
        appendOriginalSet();
      }
    }

    var pending = originalImgs.filter(function (img) {
      return !img.complete;
    }).length;

    if (pending === 0) {
      buildLoop();
    } else {
      originalImgs.forEach(function (img) {
        if (img.complete) return;
        img.addEventListener("load", onOneLoaded);
        img.addEventListener("error", onOneLoaded);
      });
    }

    function onOneLoaded() {
      pending--;
      if (pending === 0) buildLoop();
    }
  });

  /* Freshly-started track animations sit at currentTime 0. If the user
     scrolls up (negative playbackRate) before any forward progress has
     accrued, the animation tries to run before its own start and freezes
     instead of wrapping. Seeding a large time buffer on open guarantees
     room to reverse without ever approaching 0. */
  var ANIMATION_RUNWAY_MS = 60000;

  function seedAnimationRunway() {
    carousel.querySelectorAll(".gallery-carousel-track").forEach(function (t) {
      var anims = t.getAnimations();
      if (!anims.length) return;
      var anim = anims[0];
      var ct = anim.currentTime || 0;
      /* Only top up when actually running low - topping up unconditionally
         on every open would jump each track's visual position by a large,
         arbitrary amount every time the panel reopens, since these are
         continuously-looping animations (mod their own duration). Once
         seeded, currentTime only grows during forward play or shrinks
         during an active reversal, so in practice this rarely re-fires
         after the first open. */
      if (ct < ANIMATION_RUNWAY_MS) {
        anim.currentTime = ct + ANIMATION_RUNWAY_MS;
      }
    });
  }

  toggle.addEventListener("click", function () {
    var showingAll = wrap.classList.toggle("show-all");
    if (showingAll) {
      seedAnimationRunway();
      /* Re-measure in case dimensions changed while hidden (e.g. a resize
         while in theater mode). Deliberately does NOT touch scrollLeft —
         the carousel is only hidden via CSS, never removed, so its scroll
         position naturally persists across a trip into theater mode and
         back; forcing it back to the start here would defeat that. */
      measure();
    } else if (window.kyTheater) {
      window.kyTheater.showFeatured();
    }
  });

  var carousel = document.querySelector(".gallery-carousel");
  if (!carousel) return;

  var originalCols = Array.prototype.slice.call(carousel.children);

  /* A strictly-alternating direction pattern looped over an ODD number of
     columns always ends on the same phase it started (e.g. with 7 events,
     event 1 and event 7 are both "up") — so the seam where the loop
     repeats clashes with itself. Doubling the whole event set first turns
     that into an even-length loop (7 -> 14), which always ends on the
     opposite phase from its start, so it alternates cleanly forever. Each
     event then appears twice per full cycle when the count is odd; an
     even count needs no doubling and behaves exactly as before. */
  var loopCols = originalCols.slice();
  if (originalCols.length % 2 !== 0) {
    originalCols.forEach(function (col) {
      var dup = col.cloneNode(true);
      carousel.appendChild(dup);
      loopCols.push(dup);
    });
  }
  var loopLength = loopCols.length;

  /* Wrap-buffer clone: a full second copy of the loop so the horizontal
     scroll always has real DOM content ahead, however far the user goes.
     Column i and its buffer clone at i + loopLength must always match
     direction/speed (assigned below) for that wrap to be invisible. */
  loopCols.forEach(function (col) {
    carousel.appendChild(col.cloneNode(true));
  });

  var COLUMN_DURATIONS_S = [70, 85, 62, 92, 76, 98];

  Array.prototype.forEach.call(carousel.children, function (col, i) {
    var track = col.querySelector(".gallery-carousel-track");
    if (!track) return;
    var j = i % loopLength;
    var scrollsDown = j % 2 !== 0;
    track.style.animationDirection = scrollsDown ? "reverse" : "normal";
    track.style.animationDuration =
      COLUMN_DURATIONS_S[j % COLUMN_DURATIONS_S.length] + "s";
    /* Reveal slide-in direction matches this column's own idle scroll
       direction (same j-based parity, not raw nth-child position), so a
       column never slides in one way and immediately flips to scroll the
       opposite way once idle. */
    col.classList.toggle("gallery-col-down", scrollsDown);
  });

  var unit = 0;
  var period = 0;

  function measure() {
    /* getBoundingClientRect gives exact fractional pixel positions;
       offsetLeft rounds to the nearest integer, and that rounding error
       compounds across columns into a visible sliver at the wrap/snap
       boundaries. */
    var r0 = carousel.children[0].getBoundingClientRect();
    var r1 = carousel.children[1].getBoundingClientRect();
    var rPeriod = carousel.children[loopLength].getBoundingClientRect();
    unit = r1.left - r0.left;
    period = rPeriod.left - r0.left;
  }

  measure();
  window.addEventListener("resize", measure);

  carousel.scrollLeft = period;

  var snapTimer = null;

  function wrapScroll() {
    var min = unit / 2;
    if (carousel.scrollLeft < min) {
      carousel.scrollLeft += period;
    } else if (carousel.scrollLeft > min + period) {
      carousel.scrollLeft -= period;
    }
  }

  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  var snapAnimId = null;

  function animateScrollTo(target, duration) {
    if (snapAnimId) cancelAnimationFrame(snapAnimId);
    var start = carousel.scrollLeft;
    var distance = target - start;
    var startTime = null;

    function step(timestamp) {
      if (startTime === null) startTime = timestamp;
      var elapsed = timestamp - startTime;
      var t = Math.min(elapsed / duration, 1);
      carousel.scrollLeft = start + distance * easeInOutQuad(t);
      if (t < 1) {
        snapAnimId = requestAnimationFrame(step);
      } else {
        snapAnimId = null;
      }
    }

    snapAnimId = requestAnimationFrame(step);
  }

  function snap() {
    var target = Math.round(carousel.scrollLeft / unit) * unit;
    if (Math.abs(carousel.scrollLeft - target) < 1) return;
    animateScrollTo(target, 350);
  }

  carousel.addEventListener(
    "scroll",
    function () {
      wrapScroll();
      if (snapTimer) clearTimeout(snapTimer);
      snapTimer = setTimeout(snap, 60);
    },
    { passive: true }
  );

  carousel.addEventListener("dragstart", function (e) {
    e.preventDefault();
  });

  var pressX = 0;
  var pressY = 0;

  carousel.addEventListener("pointerdown", function (e) {
    pressX = e.clientX;
    pressY = e.clientY;
  });

  carousel.addEventListener("click", function (e) {
    if (!window.kyTheater) return;
    if (
      Math.abs(e.clientX - pressX) > 8 ||
      Math.abs(e.clientY - pressY) > 8
    ) {
      return;
    }
    var target = e.target;
    if (!target || target.tagName !== "IMG") return;
    var col = target.closest(".gallery-carousel-col");
    if (!col) return;
    var isZh = window.kyLang && window.kyLang.get() === "zh";
    var eventName =
      (isZh && col.getAttribute("data-event-zh")) || col.getAttribute("data-event");
    var track = col.querySelector(".gallery-carousel-track");
    if (!eventName || !track) return;
    var imgs = Array.prototype.slice.call(track.children);
    var originalCount = imgs.length / 2;
    var index = imgs.indexOf(target) % originalCount;
    var srcs = imgs.slice(0, originalCount).map(function (img) {
      return img.src;
    });
    window.kyTheater.showEvent(srcs, eventName, index);
    wrap.classList.remove("show-all");
  });

  /* Vertical-scroll feel: SENSITIVITY = boost added per wheel-delta unit,
     MAX_BOOST = speed cap (1 + boost = playback rate), DECAY = per-frame
     falloff back to normal speed (closer to 1 = slower return). */
  var WHEEL_SENSITIVITY = 0.08;
  var MAX_BOOST = 20;
  var BOOST_DECAY = 0.94;

  var boost = 0;
  var boostRafId = null;
  var trackAnims = null;

  function getTrackAnims() {
    if (!trackAnims) {
      trackAnims = [];
      carousel.querySelectorAll(".gallery-carousel-track").forEach(function (t) {
        var anims = t.getAnimations();
        if (anims.length) trackAnims.push(anims[0]);
      });
    }
    return trackAnims;
  }

  function boostTick() {
    boost *= BOOST_DECAY;
    if (Math.abs(boost) < 0.02) boost = 0;
    var rate = 1 + boost;
    getTrackAnims().forEach(function (anim) {
      anim.playbackRate = rate;
    });
    boostRafId = boost === 0 ? null : requestAnimationFrame(boostTick);
  }

  carousel.addEventListener(
    "wheel",
    function (e) {
      if (!wrap.classList.contains("show-all")) return;
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      boost += e.deltaY * WHEEL_SENSITIVITY;
      boost = Math.max(-MAX_BOOST, Math.min(MAX_BOOST, boost));
      if (!boostRafId) boostRafId = requestAnimationFrame(boostTick);
    },
    { passive: false }
  );

  /* Touch equivalent of the wheel boost above, for mobile: a vertical drag
     feeds the same boost/decay/playbackRate mechanic frame-by-frame
     instead of scrolling the page, so swiping up/down while viewing all
     photos speeds the carousel up the same way a mouse-wheel scroll does
     on desktop. Reuses WHEEL_SENSITIVITY since touch clientY deltas and
     wheel deltaY are both already in CSS-pixel-equivalent units. A
     horizontal-dominant drag is left alone so the carousel's native
     left/right touch-scroll between columns still works. */
  var touchLastX = null;
  var touchLastY = null;

  carousel.addEventListener(
    "touchstart",
    function (e) {
      if (!wrap.classList.contains("show-all") || e.touches.length !== 1) return;
      touchLastX = e.touches[0].clientX;
      touchLastY = e.touches[0].clientY;
    },
    { passive: true }
  );

  carousel.addEventListener(
    "touchmove",
    function (e) {
      if (touchLastY === null || e.touches.length !== 1) return;
      var x = e.touches[0].clientX;
      var y = e.touches[0].clientY;
      var dx = x - touchLastX;
      var dy = touchLastY - y;
      touchLastX = x;
      touchLastY = y;
      if (Math.abs(dy) <= Math.abs(dx)) return;
      e.preventDefault();
      boost += dy * WHEEL_SENSITIVITY;
      boost = Math.max(-MAX_BOOST, Math.min(MAX_BOOST, boost));
      if (!boostRafId) boostRafId = requestAnimationFrame(boostTick);
    },
    { passive: false }
  );

  function touchEnd() {
    touchLastX = null;
    touchLastY = null;
  }

  carousel.addEventListener("touchend", touchEnd, { passive: true });
  carousel.addEventListener("touchcancel", touchEnd, { passive: true });

  /* Arrow button navigation */
  var navLeftBtn = document.querySelector(".gallery-nav-left");
  var navRightBtn = document.querySelector(".gallery-nav-right");

  function navigateCarousel(direction) {
    var targetScroll = carousel.scrollLeft + direction * unit;
    animateScrollTo(targetScroll, 500);
  }

  if (navLeftBtn) {
    navLeftBtn.addEventListener("click", function () {
      navigateCarousel(-1);
    });
  }

  if (navRightBtn) {
    navRightBtn.addEventListener("click", function () {
      navigateCarousel(1);
    });
  }
})();

(function () {
  var frame = document.querySelector(".gallery-theater-frame");
  var label = document.querySelector(".gallery-theater-label");
  var prevBtn = document.querySelector(".gallery-theater-arrow-left");
  var nextBtn = document.querySelector(".gallery-theater-arrow-right");
  if (!frame || !label || !prevBtn || !nextBtn) return;

  var featuredLabel = label.textContent;
  var featuredSrcs = Array.prototype.map.call(
    frame.querySelectorAll(".gallery-theater-photo"),
    function (img) {
      return img.src;
    }
  );

  var current = 0;
  var animating = false;

  function render(srcs, labelText, startIndex) {
    frame.innerHTML = "";
    animating = false;
    srcs.forEach(function (src, i) {
      var img = document.createElement("img");
      img.src = src;
      img.alt = "";
      img.className =
        "gallery-theater-photo" + (i === startIndex ? " active" : "");
      frame.appendChild(img);
    });
    label.textContent = labelText;
    current = startIndex;
  }

  function move(delta) {
    if (animating) return;
    var photos = Array.prototype.slice.call(
      frame.querySelectorAll(".gallery-theater-photo")
    );
    if (photos.length < 2) return;
    var next = (current + delta + photos.length) % photos.length;
    var half = frame.clientWidth / 2;
    var dir = delta > 0 ? 1 : -1;

    animating = true;

    photos.forEach(function (p) {
      p.style.transition = "none";
    });

    var cube = document.createElement("div");
    cube.className = "gallery-theater-cube";
    var outFace = photos[current].cloneNode(false);
    var inFace = photos[next].cloneNode(false);
    outFace.classList.remove("active");
    inFace.classList.remove("active");
    outFace.style.transform = "translateZ(" + half + "px)";
    inFace.style.transform =
      "rotateY(" + dir * 90 + "deg) translateZ(" + half + "px)";
    cube.appendChild(outFace);
    cube.appendChild(inFace);
    cube.style.transform = "translateZ(" + -half + "px)";
    frame.appendChild(cube);

    photos[current].classList.remove("active");

    void cube.offsetWidth;
    cube.style.transform =
      "translateZ(" + -half + "px) rotateY(" + -dir * 90 + "deg)";

    function finish() {
      if (!animating || !cube.parentNode) return;
      current = next;
      var incoming = photos[next];
      incoming.classList.add("active");
      void incoming.offsetWidth;
      frame.removeChild(cube);
      requestAnimationFrame(function () {
        photos.forEach(function (p) {
          p.style.transition = "";
        });
      });
      animating = false;
    }

    cube.addEventListener("transitionend", function (ev) {
      if (ev.target === cube) finish();
    });
    setTimeout(finish, 900);
  }

  prevBtn.addEventListener("click", function () {
    move(-1);
  });

  nextBtn.addEventListener("click", function () {
    move(1);
  });

  var theater = document.querySelector(".gallery-theater");
  if (theater) {
    var wheelAccum = 0;
    theater.addEventListener(
      "wheel",
      function (e) {
        if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
        e.preventDefault();
        if (animating) {
          wheelAccum = 0;
          return;
        }
        wheelAccum += e.deltaX;
        if (wheelAccum > 60) {
          wheelAccum = 0;
          move(1);
        } else if (wheelAccum < -60) {
          wheelAccum = 0;
          move(-1);
        }
      },
      { passive: false }
    );

    var touchX = null;
    theater.addEventListener(
      "touchstart",
      function (e) {
        touchX = e.touches[0].clientX;
      },
      { passive: true }
    );
    theater.addEventListener(
      "touchend",
      function (e) {
        if (touchX === null) return;
        var dx = e.changedTouches[0].clientX - touchX;
        touchX = null;
        if (Math.abs(dx) > 40) move(dx < 0 ? 1 : -1);
      },
      { passive: true }
    );
  }

  window.kyTheater = {
    showEvent: function (srcs, labelText, startIndex) {
      render(srcs, labelText, startIndex);
    },
    showFeatured: function () {
      render(featuredSrcs, featuredLabel, 0);
    },
  };
})();

(function () {
  var form = document.querySelector(".contact-form");
  if (!form) return;

  var fileBox = form.querySelector(".contact-file");
  var fileInput = form.querySelector(".contact-file-input");
  var fileLabel = form.querySelector(".contact-file-label");
  var defaultFileText = fileLabel ? fileLabel.textContent : "";
  var submitBtn = form.querySelector(".contact-send-btn");
  var defaultBtnText = submitBtn ? submitBtn.textContent : "";
  var status = form.querySelector(".contact-form-status");

  /* The backend runs on a Vercel function, which hard-caps the whole
     request body at 4.5MB regardless of plan. Leaving headroom below that
     for the other form fields and multipart overhead. */
  var MAX_FILE_BYTES = 4 * 1024 * 1024;

  function t(key, fallback) {
    var val = window.kyLang && window.kyLang.t(key);
    return val != null ? val : fallback;
  }

  function setStatus(text, kind) {
    if (!status) return;
    status.textContent = text;
    status.classList.remove("is-success", "is-error");
    if (kind) status.classList.add("is-" + kind);
  }

  if (fileInput) {
    fileInput.addEventListener("change", function () {
      var file = fileInput.files[0];

      if (file && file.size > MAX_FILE_BYTES) {
        fileInput.value = "";
        fileLabel.textContent = defaultFileText;
        fileBox.classList.remove("has-file");
        setStatus(
          t("contact.statusFileTooLarge", "That PDF is too large (max 4MB). Please attach a smaller file."),
          "error"
        );
        return;
      }

      fileLabel.textContent = file ? file.name : defaultFileText;
      fileBox.classList.toggle("has-file", !!file);
      if (file) setStatus("", null);
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var formData = new FormData(form);

    submitBtn.disabled = true;
    submitBtn.textContent = t("contact.sendingButton", "SENDING...");
    setStatus("", null);

    fetch(form.dataset.endpoint, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    })
      .then(function (res) {
        return res.json().then(function (result) {
          if (!res.ok || !result.success) {
            throw new Error(result.message || "submission failed");
          }
          form.reset();
          fileLabel.textContent = defaultFileText;
          fileBox.classList.remove("has-file");
          setStatus(t("contact.statusSuccess", "Thanks! Your message has been sent."), "success");
        });
      })
      .catch(function () {
        setStatus(
          t(
            "contact.statusError",
            "Something went wrong. Please email us directly at huang@kyfoundation.org."
          ),
          "error"
        );
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = defaultBtnText;
      });
  });
})();
