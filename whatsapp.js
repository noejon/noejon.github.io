const MESSAGES = [
  "<sup>*</sup>I most certainly, definitely, for sure, won't use the fee to bribe anyone.",
  "Yep! That's me &#128175;, don't look further! Actually now that I think about it, please continue scrolling, I have put a lot of work into this!",
  "If I were you, I would probably stick to walking, and as far as possible from the road!",
  "We eventually scaled to a company of 6 people, and that was my introduction to being a leader. Boy have I learned since then!",
  "Here are the <a target=\"_blank\" href=\"https://dev.to/noejon/setting-up-a-node-js-development-environment-in-2-4eb1\">only</a> 2 <a target=\"_blank\" href=\"https://dev.to/noejon/copying-a-git-repository-properly-j67\">articles</a> I ever wrote. I am quite good at writing thorough documentation if needed. (Just don't check the github for this page!)",
  "I am pretty adaptable to any technology/language",
  "Far from 200 books, but I wanted to grow as a leader and read lots of books about that. There are a few I keep coming back to, The manager's path from Camille Fournier, Resilient Management from Lara Hogan and The Coaching Habit from Michael Bungay Stanier",
  "It definitely sparks more joy than tidying up the kids room!",
  "Glad you are still around! Some stats for you"
];
const SCROLL_DIRECTION_UP = "up";
const SCROLL_DIRECTION_DOWN = "down";
const MESSAGE_OBSERVER_OPTIONS = {
  root: null,
  threshold: 0,
  rootMargin: "0px"
}

document.addEventListener('DOMContentLoaded', function () {
  // Getting the scroll direction to move the message up and down
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

  // Adding an Intersection observer to each element with data-message-id
  const whatsapp = (message) => {
    // const allMessages = document.querySelectorAll("[data-message-id]");

    // for (let element of allMessages){

    // }
    const { left: messageLeft, top: messageTop, width: messageWidth } = message.getBoundingClientRect();

    const leTalkativeJon = document.querySelector('.le-talkative-jon');
    // Checking if the interceptor is on the left side of the page
    if (messageLeft < document.body.getBoundingClientRect().width / 2) {
      leTalkativeJon.classList.remove("right");
      leTalkativeJon.classList.add("left");
      leTalkativeJon.style.left = messageLeft + "px";
    } else {
      // we are on the right side of the page
      leTalkativeJon.classList.remove("left");
      leTalkativeJon.classList.add("right");
      leTalkativeJon.style.left = messageLeft +
        messageWidth -
        leTalkativeJon.getBoundingClientRect().width +
        "px";
    }
    leTalkativeJon.style.top = messageTop + window.scrollY + 20 + "px";
    document.querySelector('#leMessage').innerHTML = MESSAGES[message.dataset.messageId];
  }

  let visibleIntersectors = [];

  const observerCallbackFunction = (intersectors) => {
    for (let intersector of intersectors) {
      if (intersector.isIntersecting === true) {
        if (!visibleIntersectors.find(visibleIntersector => visibleIntersector === intersector.target)) {
          scrollDirection === SCROLL_DIRECTION_UP ? visibleIntersectors.unshift(intersector.target) : visibleIntersectors.push(intersector.target)
        }
      }
      else {
        visibleIntersectors = visibleIntersectors.filter(visibleIntersector => visibleIntersector !== intersector.target)
      }

      if (visibleIntersectors.length < 1) return;

      if (visibleIntersectors.length === 1) {
        whatsapp(visibleIntersectors[0])
      }
      else if (visibleIntersectors.length === 2) {
        if (scrollDirection === SCROLL_DIRECTION_DOWN) {
          whatsapp(visibleIntersectors[1])
        }
        else {
          whatsapp(visibleIntersectors[0])
        }
      }
      else {
        let activeIntersector = Math.floor(visibleIntersectors.length / 2)
        whatsapp(visibleIntersectors[activeIntersector])
      }
    }
  };

  const messageIntersectors = document.querySelectorAll('[data-message-id]');
  const messagesObserver = new IntersectionObserver(observerCallbackFunction, MESSAGE_OBSERVER_OPTIONS);
  for (let messageIntersector of messageIntersectors) {
    messagesObserver.observe(messageIntersector);
  }
});