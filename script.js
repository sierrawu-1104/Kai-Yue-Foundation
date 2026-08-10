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
  var navLinks = document.querySelectorAll(".nav-links a[href]");
  if (!navLinks.length) return;

  /* Compares by page name rather than the raw path, since the same page is
     reachable two ways: deployed clean URLs (/events) and relative .html
     files for local file:// browsing (events.html) - see the earlier fix
     making local navigation work without breaking clean URLs on deploy. */
  function pageName(path) {
    path = path.split("?")[0].split("#")[0].replace(/\/+$/, "");
    var last = path.split("/").pop() || "";
    return last.replace(/\.html$/i, "").toLowerCase();
  }

  var current = pageName(location.pathname);

  navLinks.forEach(function (link) {
    if (pageName(link.getAttribute("href")) === current) {
      link.classList.add("nav-current");
    }
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

  /* How far down the anchor glyph's own box the zoom aims, 0 = its top edge.
     null means "don't correct vertically" (the English wordmark's stem runs
     the glyph's full height, so there's no single row worth targeting). */
  var ANCHOR_TARGET_Y_FRACTION = null;

  var isZh = window.kyLang && window.kyLang.get() === "zh";

  if (isZh) {
    /* "GALLERY" is a wordmark tied to the Latin letter "L"'s stem, so it's
       deliberately left untranslated elsewhere (see gallery.html). In
       Chinese mode the wordmark switches to 照片集锦 ("photo highlights"),
       matching the nav label, and the zoom centres on the third glyph, 集.
       Urbanist has no CJK glyphs, so this also needs a real CJK font (Noto
       Sans SC) rather than an unpredictable system fallback, since the
       anchor fractions below were measured specifically against it.
       Re-measure them if either the glyph or the font ever changes - they
       are not interchangeable between glyphs. (Earlier wordmarks measured
       entirely different values: 畫 in Noto Sans TC was 0.493, and 画's
       box-right-edge was 0.8262.) */
    solid.textContent = "照片集锦";
    solid.style.fontFamily = "'Noto Sans SC', sans-serif";
    word.innerHTML = '照片<span class="gallery-mask-anchor">集</span>锦';
    word.style.fontFamily = "'Noto Sans SC', sans-serif";
    anchor = word.querySelector(".gallery-mask-anchor");
    if (!anchor) return;

    /* Aiming at 集's exact middle turned out to be the one thing not to do:
       rendering the glyph to a canvas at 600px (weight 600, matching the
       CSS) and running a distance transform over the ink - which scores
       every pixel by how far it sits from the nearest non-ink pixel, i.e.
       how long it stays covered as the text scales 30x - put the ink box's
       exact centre (397, 398) just 7px clear of a gap. Zooming there would
       tear open into background partway through the reveal instead of
       filling the screen with image. Nudging 30px to (420, 417) - still
       only 5% of the glyph off centre, so it still reads as "the middle" -
       lands inside a stroke with 35px of clearance, 5x better. That point
       is 0.5333em right of this glyph's advance origin.

       anchorRect below is measured on the live <span>, which (unlike the
       canvas render) inherits letter-spacing: 0.05em from the word, and
       that trailing space lands inside the span's own
       getBoundingClientRect() - confirmed live, the span measures exactly
       1.05x the font-size even now that the anchor is a middle character
       rather than the first. Multiplying the *inflated* width by 0.5333
       would overshoot, so divide it back out: 0.5333/1.05. */
    ANCHOR_TARGET_FRACTION = 0.5079;

    /* Same target expressed vertically. Note this fraction is of the
       span's line box, not the ink box - the two differ, so this was
       derived live rather than from the canvas: the target sits 0.3517em
       above the baseline, and measuring the real span's rect against its
       baseline put that at 0.5575 of the box's height. */
    ANCHOR_TARGET_Y_FRACTION = 0.5575;
  } else {
    /* The glyph's vertical stem spans roughly 0.10-0.29 of that width (the
       rest is the trailing letter-spacing gap plus the foot's empty
       notch), so 0.193 is the stem's own centre. */
    ANCHOR_TARGET_FRACTION = 0.193;
  }

  var baseFontSize;
  var anchorOffsetEm;
  var anchorOffsetYEm;
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
    var prevMarginTop = word.style.marginTop;
    word.style.fontSize = "";
    word.style.marginLeft = "";
    word.style.marginTop = "";

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

    if (ANCHOR_TARGET_Y_FRACTION !== null) {
      var containerCenterY = containerRect.top + containerRect.height / 2;
      var anchorTargetY = anchorRect.top + anchorRect.height * ANCHOR_TARGET_Y_FRACTION;
      anchorOffsetYEm = (anchorTargetY - containerCenterY) / baseFontSize;
    } else {
      anchorOffsetYEm = 0;
    }

    word.style.fontSize = prevFontSize;
    word.style.marginLeft = prevMarginLeft;
    word.style.marginTop = prevMarginTop;
  }

  measureAnchor();
  measureFixedBgFallback();

  /* Which zoom DRIVER plays (auto-timed vs scroll-linked) must depend only
     on touch capability, never on viewport width - a desktop browser window
     that happens to be narrow (or a wide monitor running at high OS display
     scaling, which shrinks the CSS viewport well below its physical size)
     should still get scroll-driven zoom. useFixedBgFallback intentionally
     also fires on narrow desktop windows (see its own comment above), so it
     can't be reused here despite covering the same touch check. */
  var useMobileZoomDriver = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

  var revealed = false;

  /* Shared by both drivers below - the only difference between them is
     where "progress" (0 = untouched, 1 = fully zoomed) comes from. */
  function applyProgress(progress) {
    var eased = Math.pow(progress, 1.6);
    var multiplier = 1 + eased * 30;
    var currentFontSize = Math.min(baseFontSize * multiplier, maxFontSize);
    word.style.fontSize = currentFontSize + "px";

    var drift = anchorOffsetEm * (currentFontSize - baseFontSize);
    word.style.marginLeft = -2 * drift + "px";

    var driftY = anchorOffsetYEm * (currentFontSize - baseFontSize);
    word.style.marginTop = -2 * driftY + "px";

    if (useFixedBgFallback) {
      var wordRect = word.getBoundingClientRect();
      word.style.backgroundPosition = (bgOriginX - wordRect.left) + "px " + (bgOriginY - wordRect.top) + "px";
    }

    var fadeProgress = (progress - fadeStart) / (1 - fadeStart);
    fadeProgress = Math.min(Math.max(fadeProgress, 0), 1);
    var opacity = 1 - fadeProgress;
    blackBlock.style.opacity = opacity;
    maskText.style.opacity = opacity;

    if (progress >= 1 && !revealed) {
      revealed = true;
      wrap.classList.add("revealed");
    }
  }

  if (useMobileZoomDriver) {
    /* Mobile: tying the zoom to scroll meant recomputing font-size and the
       background-position fallback above on every scroll tick, which is
       what was laggy - and since that fallback can only ever be exactly
       right for the one progress value it was just computed for, a fast or
       janky scroll left it visibly behind the "true" position, which is
       the mask/image mismatch. Playing a single fixed-duration animation
       once on load fixes both: it runs off rAF's own clock instead of
       scroll input, and it only ever has to land the background-position
       for the one progress value it's animating toward at that instant. */
    /* The solid white "GALLERY" crossfades into the image-clipped mask via
       the CSS animations above (solid fade-out: delay 1s + duration 1s,
       word fade-in: delay 1s + duration 1s) - both land at t=2s. Starting
       the zoom before that had it visibly growing while the mask was still
       fading in from transparent, so this waits for the crossfade to fully
       settle first. */
    var MOBILE_ZOOM_DELAY = 1500;
    var MOBILE_ZOOM_DURATION = 1450;
    var mobileStartTime = null;

    function playMobileZoom(timestamp) {
      if (mobileStartTime === null) mobileStartTime = timestamp;
      var elapsed = timestamp - mobileStartTime;
      var linear = Math.min(Math.max(elapsed / MOBILE_ZOOM_DURATION, 0), 1);
      /* Exponential ease-in: barely moves at first, then rockets toward the
         end. EXP_STEEPNESS controls how dramatic that is - 1 is linear,
         higher numbers hold back longer before the final acceleration. */
      var EXP_STEEPNESS = 300;
      var progress = (Math.pow(EXP_STEEPNESS, linear) - 1) / (EXP_STEEPNESS - 1);
      applyProgress(progress);
      if (progress < 1) {
        window.requestAnimationFrame(playMobileZoom);
      }
    }

    applyProgress(0);
    window.setTimeout(function () {
      window.requestAnimationFrame(playMobileZoom);
    }, MOBILE_ZOOM_DELAY);

    /* Only the geometry needs to stay current on resize/orientation change -
       the animation itself plays once and is not restarted or scrubbed. */
    window.addEventListener("resize", function () {
      measureAnchor();
      measureFixedBgFallback();
    });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        measureAnchor();
        measureFixedBgFallback();
        /* The webfont (Urbanist, or Noto Sans SC for 照片集锦) usually finishes
           loading during the crossfade/delay above, after the resting
           applyProgress(0) call already ran against the fallback font's
           layout. A Latin word re-laying-out in a different font can shift
           width noticeably, which left the background-position visibly
           behind - so this reapplies the resting frame with the now-correct
           geometry. Skipped once the zoom itself has started so a late
           webfont load can't yank an in-flight animation back to 0. */
        if (mobileStartTime === null) applyProgress(0);
      });
    }
  } else {
    var ticking = false;

    function updateFromScroll() {
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

      applyProgress(progress);
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateFromScroll);
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", function () {
      measureAnchor();
      measureFixedBgFallback();
      onScroll();
    });
    updateFromScroll();

    /* The webfont usually lands after this script runs, and whether it beats
       us varies by origin (file:// and localhost cache separately), which is
       why the aim differed between them. */
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        measureAnchor();
        measureFixedBgFallback();
        updateFromScroll();
      });
    }
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
     instead of looping cleanly.

     This used to size that per column, from each set's real (loaded)
     height - waiting on each image's load event first since an
     unloaded/broken image reports zero height. But the -50% target is a
     CSS percentage, recalculated live against the track's current height
     on every frame - so appending more copies after the animation is
     already running (which "show-all" starts as soon as its class is
     toggled, not once images finish loading) visibly yanks the content to
     a new position. On a real network, slow images finish loading well
     after that, mid-animation, while the user is watching - reproduced
     directly: appending a copy to an already-running track jumped its
     visible content by 512px in a single frame. A fixed rep count sidesteps
     the problem rather than compensating for it - it needs no measurement,
     so it can run once, synchronously, before the track ever animates.
     4 total copies (2 per half) clears every column measured here: the
     shortest single copy is ~604px, so a half is ~1208px against an 844px
     viewport, and the tallest has far more slack. This was 6, which was
     over-provisioned - each extra rep multiplies every column, and the
     carousel already builds 28 of them, so 6 put 1416 <img> elements on the
     page for the browser to lay out and composite every frame. Dropping to
     4 removes a third of them. Anything below 2 per half reopens the gap
     bug above, so 4 is the floor. */
  var LOOP_REPS = 4;

  tracks.forEach(function (track) {
    var originalImgs = Array.prototype.slice.call(track.children);
    for (var i = 1; i < LOOP_REPS; i++) {
      originalImgs.forEach(function (img) {
        track.appendChild(img.cloneNode(true));
      });
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

  /* These durations were tuned back when every track had exactly 2 copies
     (1 repeat per half) - the CSS duration is a fixed number of seconds
     for the whole -50% traversal, regardless of how tall that traversal
     is, so it directly sets a track's pixel speed for a given height.
     LOOP_REPS now builds 3 repeats per half (6 total) instead of 1, which
     is 3x the distance in the same time - 3x the speed - unless the
     duration scales up by the same factor to hold the tuned speed
     constant. */
  var REPS_PER_HALF = LOOP_REPS / 2;

  /* A column's pixel speed depends on how TALL it is (fixed seconds for the
     whole -50% traversal), so Journey of Love going from 9 to 26 photos
     would have raced through the same seconds ~3x faster than the value
     above was tuned for (that raw, uncorrected combination worked out to
     ~120px/s - noticeably too fast). That event is a one-time 2015 gala, not
     an ongoing series, so rather than scale its duration off a photo count
     that could later drift again, its duration is hardcoded directly below -
     measured at a 1440px-wide viewport to hold ~75px/s, comfortably faster
     than every other column's fastest (Plainsboro Chinese New Year Gala,
     ~35px/s at the same width) while staying well under that ~120px/s
     ceiling. Like COLUMN_DURATIONS_S, this is a fixed seconds-per-traversal,
     so actual px/s still varies some with viewport width (column width, and
     so image height, is responsive) - 75px/s is only exact at that reference
     width, same caveat the tuned array already carries. Keyed by data-event
     rather than position so reordering events can't silently mis-pair it. */
  var COLUMN_DURATION_OVERRIDES_S = { "Journey of Love Gala": 224.16 };

  Array.prototype.forEach.call(carousel.children, function (col, i) {
    var track = col.querySelector(".gallery-carousel-track");
    if (!track) return;
    var j = i % loopLength;
    var scrollsDown = j % 2 !== 0;
    track.style.animationDirection = scrollsDown ? "reverse" : "normal";
    var override = COLUMN_DURATION_OVERRIDES_S[col.getAttribute("data-event")];
    track.style.animationDuration =
      (override != null
        ? override
        : COLUMN_DURATIONS_S[j % COLUMN_DURATIONS_S.length] * REPS_PER_HALF) + "s";
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
    /* The track holds LOOP_REPS copies of the event's photos, so one copy -
       the real photo list - is that many times shorter. This divided by 2
       back when the track was only ever doubled; once LOOP_REPS grew, the
       theater opened with every photo repeated three times. */
    var originalCount = imgs.length / LOOP_REPS;
    var index = imgs.indexOf(target) % originalCount;
    var srcs = imgs.slice(0, originalCount).map(function (img) {
      /* The carousel tiles are small webp thumbnails (they are only ever
         drawn ~119px wide on a phone); the theater shows the photo big, so
         it takes the full-size original recorded on data-full. */
      return img.getAttribute("data-full") || img.src;
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
