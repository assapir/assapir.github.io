(self.webpackChunkassapir_github_io=self.webpackChunkassapir_github_io||[]).push([[678],{1621:function(e,t,n){"use strict";n.d(t,{Z:function(){return a}});var l=n(7294),r=n(5444);function a(e){var t=e.tags;return l.createElement("div",{className:"tags"},"תגיות:"," ",t.map((function(e,n){return l.createElement(r.Link,{key:e,to:"/tags/"+e},e,t.length>n+1?", ":" ")})))}},7704:function(e,t,n){"use strict";n.r(t);var l=n(7294),r=n(5444),a=n(9535),i=n(7198),o=n(3751),c=n(1621);t.default=function(e){var t,n=e.data,s=e.location;(0,l.useEffect)((function(){document.documentElement.dir="rtl"}));var m=(null===(t=n.site.siteMetadata)||void 0===t?void 0:t.title)||"Title",u=n.allMarkdownRemark.nodes;return 0===u.length?l.createElement(i.Z,{location:s,title:m},l.createElement(o.Z,{title:"All posts"}),l.createElement(a.Z,null),l.createElement("p",{dir:"ltr"},'No blog posts found. Add markdown posts to "content/blog" (or the directory you specified for the "gatsby-source-filesystem" plugin in gatsby-config.js).')):l.createElement(i.Z,{location:s,title:m},l.createElement(o.Z,{title:m}),l.createElement("ol",{style:{listStyle:"none"}},u.map((function(e){var t=e.frontmatter.title||e.fields.slug,n=e.frontmatter.tags||[];return l.createElement("li",{key:e.fields.slug},l.createElement("article",{className:"post-list-item",itemScope:!0,itemType:"http://schema.org/Article"},l.createElement("header",null,l.createElement("h2",null,l.createElement(r.Link,{to:e.fields.slug,itemProp:"url"},l.createElement("span",{itemProp:"headline"},t))),l.createElement("small",null,new Date(e.frontmatter.date).toLocaleDateString()),n.length>0&&l.createElement(c.Z,{tags:n})),l.createElement("section",null,l.createElement("p",{dangerouslySetInnerHTML:{__html:e.frontmatter.description||e.excerpt},itemProp:"description"}))))}))),l.createElement("h6",null,l.createElement(r.Link,{to:"/tags/"},"לרשימת כל התגיות")))}}}]);
//# sourceMappingURL=component---src-pages-index-js-8e4c42033638e7b9617a.js.map