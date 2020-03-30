(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{687:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var a,r=n(0),o=n.n(r),c=n(5);!function(e){e.small="small",e.medium="medium",e.large="large"}(a||(a={}));t.b=function(e){var t,n,r=e.score,i=e.size,l=void 0===i?a.medium:i,u=(t=r,n=Math.floor(t/20)+1,Math.min(n,5));return o.a.createElement("span",{title:"Annotation Score"},o.a.createElement(c.DoughnutChart,{percent:20*u,size:l},"".concat(u,"/5")))}},688:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var a=n(0),r=n.n(a),o=n(5),c=n(292),i=(n(696),function(e){return e.entryType===c.a.SWISSPROT?r.a.createElement("span",{className:"uniprot-title__status icon--reviewed"},r.a.createElement(o.SwissProtIcon,null)):r.a.createElement("span",{className:"uniprot-title__status icon--unreviewed"},r.a.createElement(o.TremblIcon,null))});t.b=function(e){var t=e.primaryAccession,n=e.entryType,a=e.uniProtkbId;return r.a.createElement("span",{className:"uniprot-title"},r.a.createElement(i,{entryType:n}),t," · ".concat(a))}},693:function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(285);n(694);t.a=function(e){var t=e.title,n=e.sidebar,c=e.actionButtons,i=e.children;return r.a.createElement("section",{className:"sidebar-layout"},r.a.createElement(o.a,null,r.a.createElement(a.Fragment,null,t&&r.a.createElement("section",{className:"base-layout__title"},t),c&&r.a.createElement("section",{className:"base-layout__action-buttons"},c),r.a.createElement("section",{className:"base-layout__sidebar"},n),r.a.createElement("section",{className:"base-layout__content"},i))))}},694:function(e,t,n){var a=n(695);"string"==typeof a&&(a=[[e.i,a,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(120)(a,r);a.locals&&(e.exports=a.locals)},695:function(e,t,n){(e.exports=n(119)(!1)).push([e.i,".sidebar-layout .base-layout{min-height:100vh;max-height:100vh;grid-template-areas:'main-header main-header' 'title title' '. action-buttons' 'sidebar content' 'footer footer';grid-template-columns:20vw auto;grid-template-rows:5rem auto auto 1fr auto}.sidebar-layout .base-layout__title{grid-column:title;padding:0 1rem}.sidebar-layout .base-layout__action-buttons{grid-column:action-buttons;padding:0 1rem}.sidebar-layout .base-layout__sidebar{padding:0 1rem;grid-area:sidebar;overflow-y:auto}.sidebar-layout .base-layout__content{padding:0 1rem;grid-area:content;overflow-y:auto}\n",""])},696:function(e,t,n){var a=n(697);"string"==typeof a&&(a=[[e.i,a,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(120)(a,r);a.locals&&(e.exports=a.locals)},697:function(e,t,n){(e.exports=n(119)(!1)).push([e.i,".uniprot-title{position:relative}.uniprot-title__status{display:inline-flex;align-self:center}.uniprot-title__status svg{width:0.75em;height:0.75em;margin-right:0.25rem;position:relative}\n",""])},767:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(117),c=n(5),i=n(140),l=n(70),u=n(295),s=n(32),m=n(2),d=n(52),f=n.n(d),b=n(294),p=n(687),y=n(293),E=function(e){var t=e.transformedData,n=t.proteinExistence,a=t.annotationScore,o=t[m.a.NamesAndTaxonomy],i=o.proteinNamesData,l=o.geneNamesData,u=o.organismData,s=f()(i,(function(e){return e.recommendedName.fullName.value})),d=f()(i,(function(e){return e.recommendedName.ecNumbers})),E=[{title:"Name",content:s},{title:"EC number",content:d&&d.map((function(e){return r.a.createElement("div",{key:e.value},e.value)}))},{title:"Organism",content:u&&r.a.createElement(b.d,{data:u})},{title:"Gene",content:l&&r.a.createElement(y.a,{geneNamesData:l,isCompact:!0})},{title:"Evidence",content:n},{title:"Annotation score",content:r.a.createElement(p.b,{score:a})}];return r.a.createElement(c.InfoList,{infoData:E})},v=n(688);var h=Object(a.memo)((function(e){var t=e.transformedData;return r.a.createElement(a.Fragment,null,r.a.createElement(c.Card,{title:r.a.createElement(v.b,{primaryAccession:t.primaryAccession,entryType:t.entryType,uniProtkbId:t.uniProtkbId})},r.a.createElement(E,{transformedData:t})),u.a.map((function(e){return(0,e.sectionContent)(t)})))}),(function(e,t){return e.transformedData.primaryAccession===t.transformedData.primaryAccession})),g=n(9),j=n(29),w=n(31),D=n(3);function O(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],a=!0,r=!1,o=void 0;try{for(var c,i=e[Symbol.iterator]();!(a=(c=i.next()).done)&&(n.push(c.value),!t||n.length!==t);a=!0);}catch(e){r=!0,o=e}finally{try{a||null==i.return||i.return()}finally{if(r)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function A(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var _=function(e){var t=e.comment,n=t.note,a=t.resourceName,o=t.resourceUrl,i=n&&" (".concat(n,")");return r.a.createElement(c.ExternalLink,{url:o},a,i)},x=function(e){var t=e.transformedData,n=t[m.a.ExternalLinks],o=t.primaryAccession,i=t[m.a.Sequence].sequence,l=i&&i.crc64,u=n.commentsData.get(D.a.WEB_RESOURCE),s=new Map;Object.values(m.a).forEach((function(e){t[e].xrefData.forEach((function(e){var t=e.category,n=e.databases,a=s.get(t),r=a?[].concat(A(a),A(n)):n;s.set(t,r)}))}));var d=Array.from(s.entries()).map((function(e){var t=O(e,2),n=t[0],a=t[1];return{category:n,databases:Object.values(Object(j.groupBy)(a,(function(e){return e.database}))).map((function(e){return e[0]}))}}));return r.a.createElement("div",{id:m.a.ExternalLinks},r.a.createElement(c.Card,{title:m.a.ExternalLinks},u&&r.a.createElement(a.Fragment,null,r.a.createElement("h3",null,"Web resources"),r.a.createElement(c.ExpandableList,{descriptionString:"alternative names"},u.map((function(e){return{id:Object(g.v1)(),content:r.a.createElement(_,{comment:e})}})))),r.a.createElement(w.c,{xrefs:d,primaryAccession:o,crc64:l})))},I=n(138),N=n(53),S=n(40);function P(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var k=function(e){var t=e.facets,n=e.selectedFacets,a=e.setSelectedFacets;return r.a.createElement(c.Facets,{data:t,addFacet:function(e,t){a([].concat(P(n),[{name:e,value:t}]))},removeFacet:function(e,t){a(n.filter((function(n){return!(n.name===e&&n.value===t)})))},selectedFacets:n})};function C(){return(C=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}var F=function(e){var t=e.accession,n=e.data,a=e.total,o=e.handleLoadMoreItems;return n&&0!==n.length?r.a.createElement("section",null,r.a.createElement("div",{style:{height:"80vh"}},r.a.createElement("h2",null,"Publications for ",t),r.a.createElement(c.DataList,{idKey:"id",data:n,dataRenderer:function(e){var t=e.reference,n=e.publicationSource,a=e.statistics,o=e.categories,i=t.citation,l=t.referencePositions,u=t.referenceComments,s=i.citationCrossReferences&&i.citationCrossReferences.find((function(e){return"PubMed"===e.database})),m=i.citationCrossReferences&&i.citationCrossReferences.find((function(e){return"DOI"===e.database})),d=s&&s.id,f={journal:i.journal,volume:i.volume,firstPage:i.firstPage,lastPage:i.lastPage,publicationDate:i.publicationDate,doiId:m&&m.id},b=[{title:"Cited for",content:l},{title:"Tissue",content:u&&r.a.createElement("ul",{className:"no-bullet"},u.map((function(e){return r.a.createElement("li",{key:e.value},e.value)})))},{title:"Categories",content:o&&r.a.createElement("ul",{className:"no-bullet"},Object(j.uniq)(o).map((function(e){return r.a.createElement("li",{key:e},e)})))},{title:"Source",content:n}];return t&&r.a.createElement(c.Publication,C({},i,{abstract:i.literatureAbstract,infoData:b,statistics:a,pubmedId:d,journalInfo:f}))},onLoadMoreItems:o,hasMoreData:a>n.length}))):r.a.createElement(c.Loader,null)},L=n(693);function T(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],a=!0,r=!1,o=void 0;try{for(var c,i=e[Symbol.iterator]();!(a=(c=i.next()).done)&&(n.push(c.value),!t||n.length!==t);a=!0);}catch(e){r=!0,o=e}finally{try{a||null==i.return||i.return()}finally{if(r)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var R=Object(o.o)(Object(i.b)((function(e){return{entryData:e.entry.data,publicationsData:e.entry.publicationsData}}),(function(e){return Object(l.b)({dispatchFetchEntry:function(e){return I.g(e)},dispatchResetEntry:function(){return I.i()},dispatchFetchEntryPublications:function(e,t){return I.h(e,t)}},e)}))((function(e){var t=e.match,n=e.entryData,i=e.publicationsData,l=e.dispatchFetchEntry,d=e.dispatchFetchEntryPublications,f=e.dispatchResetEntry,b=t.path,p=t.params.accession,y=T(Object(a.useState)([]),2),E=y[0],v=y[1];if(Object(a.useEffect)((function(){return l(p),function(){f()}}),[p,l,f]),Object(a.useEffect)((function(){var e=Object(N.d)(p,E);d(e)}),[p,d,E]),!n||0===Object.keys(n).length)return r.a.createElement(c.Loader,null);var g=u.a.map((function(e){return{label:e.name,id:e.name,disabled:e.name===m.a.ExternalLinks?!Object(s.c)(n):!Object(s.b)(n[e.name])}})),j=[{name:"Entry",icon:r.a.createElement(c.TremblIcon,null),itemContent:r.a.createElement(c.InPageNav,{sections:g,rootElement:".base-layout__content"}),path:"",exact:!0,actionButtons:r.a.createElement("div",{className:"button-group"},r.a.createElement(c.DropdownButton,{label:r.a.createElement(a.Fragment,null,r.a.createElement(c.DownloadIcon,null),"Download"),className:"tertiary"},r.a.createElement("div",{className:"dropdown-menu__content"},r.a.createElement("ul",null,S.d.map((function(e){return r.a.createElement("li",{key:e},r.a.createElement("a",{href:N.a.entryDownload(n.primaryAccession,e)},e))}))))),r.a.createElement("a",{className:"button tertiary",href:"//community.uniprot.org/bbsub/bbsub.html?accession=".concat(p)},"Add a Publication")),mainContent:r.a.createElement(h,{transformedData:n})},{name:"Publications",path:"publications",icon:r.a.createElement(c.PublicationIcon,null),itemContent:r.a.createElement(k,{facets:i.facets,selectedFacets:E,setSelectedFacets:v}),mainContent:r.a.createElement(F,{accession:p,data:i.data,total:i.total,handleLoadMoreItems:function(){d(i.nextUrl,!1)}})},{name:"External links",path:"external-links",icon:r.a.createElement(c.ExternalLinkIcon,null),mainContent:r.a.createElement(x,{transformedData:n})}];return r.a.createElement("section",{id:"entry-container"},r.a.createElement(L.a,{sidebar:r.a.createElement(c.DisplayMenu,{data:j,title:"Publications for ".concat(p)}),actionButtons:r.a.createElement(o.g,null,j.map((function(e){return r.a.createElement(o.d,{path:"".concat(b,"/").concat(e.path),render:function(){return r.a.createElement(a.Fragment,null,e.actionButtons)},key:e.name})})))},r.a.createElement(o.g,null,j.map((function(e){return r.a.createElement(o.d,{path:"".concat(b,"/").concat(e.path),render:function(){return r.a.createElement(a.Fragment,null,e.mainContent)},key:e.name,exact:e.exact})})))))})));t.default=function(){return r.a.createElement(R,null)}}}]);