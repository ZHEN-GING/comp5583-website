/* Content identity shared by the direct navigation and district entrances.
   All facts live in the independent static V1 sections.html content copy. */
(function () {
  "use strict";
  window.PORTFOLIO_SECTIONS = Object.freeze({
    home: Object.freeze({ title: "Home", place: "District entrance", contentRef: "sections.html#home" }),
    about: Object.freeze({ title: "About", place: "City archive", contentRef: "sections.html#about" }),
    projects: Object.freeze({ title: "Projects", place: "Corner workshop", contentRef: "sections.html#projects" }),
    contact: Object.freeze({ title: "Contact", place: "Post office", contentRef: "sections.html#contact" })
  });
}());
