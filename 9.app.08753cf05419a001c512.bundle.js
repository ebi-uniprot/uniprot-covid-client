(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{830:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n.n(a),c=n(57),o=n(64),i=n(100),l=n(35),u=n(587),s=n(548),m=n(496),f=n(492),b=n(653),d=n(542);var p=Object(a.memo)((function(t){var e=t.transformedData;return r.a.createElement(a.Fragment,null,r.a.createElement("div",{className:"button-group"},r.a.createElement("button",{type:"button",className:"button tertiary"},"Blast"),r.a.createElement("button",{type:"button",className:"button tertiary"},"Align"),r.a.createElement("button",{type:"button",className:"button tertiary"},r.a.createElement(o.DownloadIcon,null),"Download"),r.a.createElement("button",{type:"button",className:"button tertiary"},"Add")),r.a.createElement(o.Card,{title:r.a.createElement(d.b,{primaryAccession:e.primaryAccession,entryType:e.entryType,uniProtId:e.uniProtId})},r.a.createElement(b.a,{transformedData:e})),u.a.map((function(t){return(0,t.sectionContent)(e)})))}),(function(t,e){return t.transformedData.primaryAccession===e.transformedData.primaryAccession})),y=n(58),E=n(98),h=n(500),v=n(493);function g(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if(!(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t)))return;var n=[],a=!0,r=!1,c=void 0;try{for(var o,i=t[Symbol.iterator]();!(a=(o=i.next()).done)&&(n.push(o.value),!e||n.length!==e);a=!0);}catch(t){r=!0,c=t}finally{try{a||null==i.return||i.return()}finally{if(r)throw c}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function j(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var O=function(t){var e=t.comment,n=e.note,a=e.resourceName,c=e.resourceUrl,i=n&&" (".concat(n,")");return r.a.createElement(o.ExternalLink,{url:c},a,i)},A=function(t){var e=t.transformedData,n=e[f.a.ExternalLinks],c=e.primaryAccession,i=e[f.a.Sequence].sequence,l=i&&i.crc64,u=n.commentsData.get(v.a.WEB_RESOURCE),s=new Map;Object.values(f.a).forEach((function(t){e[t].xrefData.forEach((function(t){var e=t.category,n=t.databases,a=s.get(e),r=a?[].concat(j(a),j(n)):n;s.set(e,r)}))}));var m=Array.from(s.entries()).map((function(t){var e=g(t,2),n=e[0],a=e[1];return{category:n,databases:Object.values(Object(E.groupBy)(a,(function(t){return t.database}))).map((function(t){return t[0]}))}}));return r.a.createElement("div",{id:f.a.ExternalLinks},r.a.createElement(o.Card,{title:f.a.ExternalLinks},u&&r.a.createElement(a.Fragment,null,r.a.createElement("h3",null,"Web resources"),r.a.createElement(o.ExpandableList,{descriptionString:"alternative names"},u.map((function(t){return{id:Object(y.v1)(),content:r.a.createElement(O,{comment:t})}})))),r.a.createElement(h.c,{xrefs:m,primaryAccession:c,crc64:l})))},D=n(71),w=n(65);function I(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var S=function(t){var e=t.facets,n=t.selectedFacets,a=t.setSelectedFacets;return r.a.createElement(o.Facets,{data:e,addFacet:function(t,e){a([].concat(I(n),[{name:t,value:e}]))},removeFacet:function(t,e){a(n.filter((function(n){return!(n.name===t&&n.value===e)})))},selectedFacets:n})};function P(){return(P=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t}).apply(this,arguments)}var F=function(t){var e=t.accession,n=t.data,a=t.total,c=t.handleLoadMoreItems;return n&&0!==n.length?r.a.createElement("section",null,r.a.createElement("div",{style:{height:"80vh"}},r.a.createElement("h2",null,"Publications for ",e),r.a.createElement(o.DataList,{idKey:"id",data:n,dataRenderer:function(t){var e=t.reference,n=t.publicationSource,a=t.statistics,c=t.categories,i=e.citation,l=e.referencePositions,u=e.referenceComments,s=i.citationXrefs&&i.citationXrefs.find((function(t){return"PubMed"===t.databaseType})),m=i.citationXrefs&&i.citationXrefs.find((function(t){return"DOI"===t.databaseType})),f=s&&s.id,b={journal:i.journal,volume:i.volume,firstPage:i.firstPage,lastPage:i.lastPage,publicationDate:i.publicationDate,doiId:m&&m.id},d=[{title:"Cited for",content:l},{title:"Tissue",content:u&&r.a.createElement("ul",{className:"no-bullet"},u.map((function(t){return r.a.createElement("li",{key:t.value},t.value)})))},{title:"Categories",content:c&&r.a.createElement("ul",{className:"no-bullet"},Object(E.uniq)(c).map((function(t){return r.a.createElement("li",{key:t},t)})))},{title:"Source",content:n}];return e&&r.a.createElement(o.Publication,P({},i,{abstract:i.literatureAbstract,infoData:d,statistics:a,pubmedId:f,journalInfo:b}))},onLoadMoreItems:c,hasMoreData:a>n.length}))):r.a.createElement(o.Loader,null)},k=n(597);function x(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if(!(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t)))return;var n=[],a=!0,r=!1,c=void 0;try{for(var o,i=t[Symbol.iterator]();!(a=(o=i.next()).done)&&(n.push(o.value),!e||n.length!==e);a=!0);}catch(t){r=!0,c=t}finally{try{a||null==i.return||i.return()}finally{if(r)throw c}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var C=Object(c.o)(Object(i.b)((function(t){return{entryData:t.entry.data,publicationsData:t.entry.publicationsData}}),(function(t){return Object(l.b)({dispatchFetchEntry:function(t){return D.g(t)},dispatchResetEntry:function(){return D.i()},dispatchFetchEntryPublications:function(t,e){return D.h(t,e)}},t)}))((function(t){var e=t.match,n=t.entryData,i=t.publicationsData,l=t.dispatchFetchEntry,b=t.dispatchFetchEntryPublications,d=t.dispatchResetEntry,y=e.path,E=e.params.accession,h=x(Object(a.useState)([]),2),v=h[0],g=h[1];if(Object(a.useEffect)((function(){return l(E),function(){d()}}),[E,l,d]),Object(a.useEffect)((function(){var t=Object(w.e)(E,v);b(t)}),[E,b,v]),!n||0===Object.keys(n).length)return r.a.createElement(o.Loader,null);var j=Object(s.b)(n),O=u.a.map((function(t){return{label:t.name,id:t.name,disabled:t.name===f.a.ExternalLinks?!Object(m.d)(j):!Object(m.c)(j[t.name])}})),D=[{name:"Entry",icon:r.a.createElement(o.TremblIcon,null),itemContent:r.a.createElement(o.InPageNav,{sections:O}),path:"main",mainContent:r.a.createElement(p,{transformedData:j})},{name:"Publications",path:"publications",icon:r.a.createElement(o.PublicationIcon,null),itemContent:r.a.createElement(S,{facets:i.facets,selectedFacets:v,setSelectedFacets:g}),mainContent:r.a.createElement(F,{accession:E,data:i.data,total:i.total,handleLoadMoreItems:function(){b(i.nextUrl,!1)}})},{name:"External links",path:"external-links",icon:r.a.createElement(o.ExternalLinkIcon,null),mainContent:r.a.createElement(A,{transformedData:j})}];return r.a.createElement(a.Fragment,null,r.a.createElement(k.a,{sidebar:r.a.createElement(o.DisplayMenu,{data:D,title:"Publications for ".concat(E)})},r.a.createElement(c.g,null,D.map((function(t){return r.a.createElement(c.d,{path:"".concat(y,"/").concat(t.path),render:function(){return r.a.createElement(a.Fragment,null,t.mainContent)},key:t.name})})))))})));e.default=function(){return r.a.createElement(C,null)}}}]);