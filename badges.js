const badges = [
  {
    skill: "React",
    yearStarted: "2018",
    imageLocation: "images/react.svg",
    alt: "The react logo"
  },
  {
    skill: "Node",
    yearStarted: "2015",
    imageLocation: "images/node.svg",
    alt: "The node logo"
  },
  {
    skill: "TypeScript",
    yearStarted: "2016",
    imageLocation: "images/typescript.svg",
    alt: "The react logo"
  },
  {
    skill: "HTML 5",
    yearStarted: "2008",
    imageLocation: "images/HTML.svg",
    alt: "The HTML logo"
  },
  {
    skill: "CSS 3",
    yearStarted: "2008",
    imageLocation: "images/CSS.svg",
    alt: "The CSS logo"
  },
  {
    skill: "JavaScript",
    yearStarted: "2008",
    imageLocation: "images/javascript.svg",
    alt: "The Javascript logo"
  },
  {
    skill: "SQL",
    yearStarted: "2008",
    imageLocation: "images/sql.svg",
    alt: "The PostgreSQL logo"
  },
  {
    skill: "Bash/ZSH",
    yearStarted: "2008",
    imageLocation: "images/bash.svg",
    alt: "The Bash logo"
  },
  {
    skill: "AWS",
    yearStarted: "2015",
    imageLocation: "images/aws.svg",
    alt: "The AWS logo"
  },
  {
    skill: "git",
    yearStarted: "2012",
    imageLocation: "images/git.svg",
    alt: "The git logo"
  },
  {
    skill: "Docker",
    yearStarted: "2018",
    imageLocation: "images/react.svg",
    alt: "The Docker logo"
  },
  {
    skill: "Angular",
    yearStarted: "2016",
    imageLocation: "images/angular.svg",
    alt: "The C Sharp logo"
  },
  {
    skill: "C#",
    yearStarted: "2008",
    imageLocation: "images/csharp.svg",
    alt: "The C Sharp logo"
  },
];

document.addEventListener('DOMContentLoaded', function () {
  const badgesListElement = document.querySelector('#badge-list');
  if (!badgesListElement) return;

  const currentYear = new Date().getFullYear();

  for (let badge of badges) {
    const yearsPracticed = currentYear - badge.yearStarted;

    badgesListElement.insertAdjacentHTML("beforeend", `
      <li class="flex-column skill-item">
        <img class="skill-image" src="${badge.imageLocation}" alt="${badge.alt}" />
        <div class="big-font-and-the-andersons">
          <p>${badge.skill}</p>
          <p>${yearsPracticed} years</p>
      </li>
    `);
  }
});