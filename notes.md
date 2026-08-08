Site-Modernization Techniques:


1. Custom smooth scroll (Lenis or similar) — right now the browser's native scroll handles your sticky/fade effects. A lightweight smooth-scroll library adds inertia/easing to all scrolling, which makes the whole site feel more deliberate and "designed" rather than default-browser. Pairs especially well with the pinned hero/mission sections you already have.

2. Staggered text reveals on more headings — you already do this for the hero's three lines. Extending the same idea to "OUR MISSION" or "Ways We Give Back" (letters/words fading up individually instead of as one block) is a cheap way to make the site feel more consistently "alive."

3. Cursor-aware card interaction on the pillar cards — instead of (or in addition to) the opacity fade on hover, a subtle image zoom (transform: scale(1.08) on the <img> inside .pillar on hover, with overflow:hidden doing the clipping) reads as very current — you see it on most modern editorial/agency sites.

4. Scroll progress indicator — a thin bar (dark green or your gradient) pinned to the very top of the viewport that fills left-to-right as the user scrolls the page. Small detail, disproportionately "polished" feeling.

5. prefers-reduced-motion support — with as much motion as you've built (sticky pins, fades, hover scales), wrapping your animations so they're disabled for users who've set that OS preference is both an accessibility win and a subtle signal of craft to anyone who checks.

6. Page transitions between routes — right now clicking "Events" or "About" will hard-navigate with a flash. A simple fade-out/fade-in on navigation (a few lines of JS intercepting link clicks) makes multi-page sites feel like a single continuous app.

7. Horizontal scroll section — if/when you build out an Events or Gallery page, a horizontally-scrolling row of cards (scroll-snap or JS-driven) is a strong "modern" pattern for browsing a list of items without a huge vertical page.

8. Duotone or consistent color-grading on photos — running all your photography through a subtle duotone filter (CSS filter or pre-processed) in your peach/dark-green palette would visually unify photos that currently have very different lighting/tones (the hero shot vs. the mission plaque photo vs. the four pillar images).



√***add timeline to events page
√***partnerships page cards should have slowly moving gradient as you hover or click
√***Page load transitions
√***DETERMINE magnetic or free scrolling for image strips



√-fix theater title and maybe frame


GALLERY:
√- Fade out transparent gallery title on page load, scrolling zooms to reveal hero image (kravis auditorium)
√- Initially displays featured images in viewing theater mode, button on bottom allows user to view all images
√- When button pressed, 4 carousel columns slide onto screen, 1 for each event; left/right scrolling reveals additional columns/event photos with infinite horizontal looping carousel
√- Scrolling up and down should speed up/change direction of all carousels. Scrolling left and right should rotate image columns (events)
√- Clicking into any individual photo will reveal that photo in theater viewing mode; the theater will be labeled with that photo's event (folder name in gallery page images folder), and other photos of that event can be accessed by clicking/scrolling left or right in theater viewing mode. 
√- Button always fades to "Show All Photos" whenever in theater viewing mode.
√- Cube transition mode

√- Fix odd number of gallery events edge case (should alternate directions, should slide on and off screen in same direction it moves idly)
√- Maintain persistence, image columns should stay in same order and same photos visible when "All Photos" button clicked again after theater viewing mode


FINAL TOUCHES:
√***ADD TRANSLATION TOGGLE
√***get contact form to actually work
√***scrolling glitching on events page
√***fix embedded pdf being blocked by browser


√***make simplified chinese
x***maybe add fade from all hero images -> content
√***convert all png images to webp (inefficient loading otherwise)
√***modify mobile gallery so carousel not laggy
√***add mobile gallery animation to prevent lag
√***make footer invisible in mobile gallery
√***change chinese zoom to right edge of first character
√***make all event titles in gallery theater view wholly within border

√***make event title fit within vertical edges of theater view
√***remove left/right border overflow (touch-drag) events page
√***contact page subheader newline

√***Optimize for mobile viewing complete
√***reroute domain
√***change contact form recipient email
√***update chinese

√***remove .html from each page domain/extension
√***edit contact form readme (resend)

√***change contact from email in resend
***setup old website domain and add to readme
***add site logo for browser tab and search engine results

