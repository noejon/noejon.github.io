const MESSAGES = [
  `<sup>*</sup>Definitely won't use the fee to bribe anyone.`,
  `Yep! That's me &#128175;, don't look further! <br/>Actually, continue scrolling, put lots of work into this!`,
  `Was initially asked to do the project in excel VBA...
  Asked two weeks for a C# Prototype!
  Prototype grew into an award winner`,
  `The company scaled to 6 people. That was my introduction to being a leader. Boy have I learned since then!`,
  `Here are the 
  <a target="_blank" href="https://dev.to/noejon/setting-up-a-node-js-development-environment-in-2-4eb1">
    only
  </a>
   2 
  <a target="_blank" href="https://dev.to/noejon/copying-a-git-repository-properly-j67">
    articles
  </a> I ever wrote. I like writing thorough documentation. (Don't check this page's github!)`,
  `I am pretty adaptable to any technologies/languages. BUT PLEEEAAAAAASE don't ask me to learn COBOL`,
  `Pretty cool, isn't it?`,
  `Growing as a leader I read many books about leadership. The few I keep coming back to: </br>
  <a target="_blank" href="https://www.oreilly.com/library/view/the-managers-path/9781491973882/">
    The manager's path
  </a>,
  <a target="_blank" href="https://resilient-management.com/">
    Resilient Management
  </a> and 
  <a target="_blank" href="https://www.mbs.works/coaching-habit-book/">
    The Coaching Habit
  </a>`,
  `It definitely sparks more joy than tidying up the kids' playroom!`,
  `You probably left already! I can say whatever I want! Cucumber!`,
  `Jokes aside, real badges are next`,
  `If you see it here, I am somewhat skilled with it and have shipped code to production.`,
  `That or you are impressed by our little chat! Wanna chat further? Continue reading`,
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

  document.addEventListener("scroll", function (_event) {
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
    const thirdOfSpacer = 37; // 14rem / 2. I know I know, it scales amazingly!
    leTalkativeJon.style.top = messageTop +
      window.scrollY + thirdOfSpacer + "px";
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