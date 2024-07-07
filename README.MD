# Small portfolio website

Mostly to play around with HTML/CSS/JS again!

## Experiments

### Messages

The message will be shown after a it's main content is fully rendered when scrolling down.
It will revert to the previous message (or just keep the first one visible) when scrolling up.

Step 1 - keep track of the scrolling direction

```js
document.addEventListener('DOMContentLoaded', function () {
  let lastScrollTop = window.scrollY || document.body.scrollTop;
  let scrollDirection;

  document.addEventListener("scroll", function (event) {
    const currentScrollTop = window.scrollY || document.body.scrollTop;

    if (currentScrollTop > lastScrollTop) {
      scrollDirection = SCROLL_DIRECTION_DOWN;
    } else {
      scrollDirection = SCROLL_DIRECTION_UP;
    }

    // Catering for mobile and negative scrolling
    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
  }, { passive: true })
});
```

Here we set it to passive to avoid possible jank, telling it that we won't call `preventDefault`, so that the browser can start the default action without waiting for the listener.

Approach using data-message-id.

- Step 1: create an array of messages
  - This needs to be HTML cause we are using tags. There is no DB call whatsoever, so we'll just set the innerHTML
- Step 2: Create a div with the "data-message-id"
