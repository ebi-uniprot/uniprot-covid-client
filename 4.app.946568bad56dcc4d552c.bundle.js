(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{699:function(e,t,n){var r=n(700);"string"==typeof r&&(r=[[e.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(121)(r,o);r.locals&&(e.exports=r.locals)},700:function(e,t,n){(e.exports=n(120)(!1)).push([e.i,".column-select-drag-drop__list{background:#e4e8eb;display:flex;padding:0.5rem;overflow:auto;white-space:nowrap;margin-bottom:1rem}.column-select-drag-drop__list__item{user-select:none;padding:0.5rem;margin:0 0.25rem 0 0;color:#fbfeff;background:#00639a}.column-select-drag-drop__list__item:focus{outline:none}.column-select-drag-drop__list__item:hover{color:#fbfeff;background:#00a6d5}.column-select-drag-drop__list__item--dragging{color:#fbfeff;background:#00a6d5}.column-select-drag-drop__list__item__button{background-color:transparent;margin-left:0.25rem;cursor:pointer}.column-select-drag-drop__list__item__button:focus{outline:none}.column-select-drag-drop__list__item__button__icon{color:#fbfeff;width:0.9rem;height:0.9rem;position:relative;top:0.085rem;left:0.35rem}\n",""])},703:function(e,t,n){var r=n(704);"string"==typeof r&&(r=[[e.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(121)(r,o);r.locals&&(e.exports=r.locals)},704:function(e,t,n){(e.exports=n(120)(!1)).push([e.i,".column-select{margin-bottom:1rem}.column-select__tab-title:first-letter{text-transform:capitalize}.column-select__tab-title__count{margin-left:0.5rem}.column-select__tab-title__count--visible{visibility:visible}.column-select__tab-title__count--hidden{visibility:hidden}\n",""])},705:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=n(140),c=n(71),i=n(118),l=n(5),u=n(23),s=n(108),d=n(717);n(699);function m(){return(m=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var b=function(e){var t=e.columns,n=e.onDragDrop,r=e.onRemove;return o.a.createElement(d.a,{onDragEnd:function(e){e.destination&&n(e.source.index,e.destination.index)}},o.a.createElement(d.c,{droppableId:"droppable",direction:"horizontal"},(function(e){return o.a.createElement("div",m({ref:e.innerRef,className:Object(u.b)({b:"column-select-drag-drop",e:"list"})},e.droppableProps),t.map((function(e,t){var n=e.itemId,a=e.label;return o.a.createElement(d.b,{key:n,draggableId:n,index:t},(function(e,t){return o.a.createElement("div",m({ref:e.innerRef},e.draggableProps,e.dragHandleProps,{className:"button ".concat(Object(u.b)({b:"column-select-drag-drop",e:["list","item"],m:t.isDragging&&"dragging"})),style:e.draggableProps.style}),a,o.a.createElement("button",{type:"button","data-testid":"column-select-dnd-remove-button",className:Object(u.b)({b:"column-select-drag-drop",e:["list","item","button"]}),onClick:function(){return r(n)}},o.a.createElement(l.CloseIcon,{className:Object(u.b)({b:"column-select-drag-drop",e:["list","item","button","icon"]})})))}))})),e.placeholder)})))},f=n(40),p=(n(703),function(e,t){return o.a.createElement("div",{className:Object(u.b)({b:"column-select",e:"tab-title"})},e,o.a.createElement("span",{className:Object(u.b)({b:"column-select",e:["tab-title","count"],m:t.length?"visible":"hidden"})},o.a.createElement(l.Bubble,{size:"small",value:t.length})))}),g=function(e){var t=e.selectedColumns,n=e.fieldData,r=e.onDragDrop,a=e.onSelect,c=e.onReset,i=function(e,t){var n=new Array(e.length);return[f.a.data,f.a.links].forEach((function(r){t[r].forEach((function(t){var o=t.id;t.items.forEach((function(t){var a=t.id,c=t.label,i=e.indexOf(a);i>=0&&(n[i]={tabId:r,accordionId:o,itemId:a,label:c})}))}))})),n}(t,n),u=[f.a.data,f.a.links].map((function(e){var t=i.filter((function(t){return t.tabId===e}));return{title:p(e,t),id:e,key:e,content:o.a.createElement(l.AccordionSearch,{accordionData:Object.values(n[e]),onSelect:function(e,t){return a(t)},selected:t,columns:!0})}}));return o.a.createElement("div",{className:"column-select"},o.a.createElement(b,{columns:i,onDragDrop:r,onRemove:a}),o.a.createElement("button",{className:"button secondary",type:"button",tabIndex:0,onClick:c,"data-testid":"column-select-reset-button"},"Reset to default"),o.a.createElement(l.Tabs,{tabData:u}))},v=n(127),h=n(128);function _(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function O(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?y(Object(n),!0).forEach((function(t){j(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):y(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function j(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var E={tabId:f.a.data,accordionId:"Names & Taxonomy",itemId:h.a.accession},w=Object(i.o)(Object(a.b)((function(e,t){return{onChange:t.onChange,fieldData:e.results.fields.data,isFetching:e.results.fields.isFetching}}),(function(e){return Object(c.b)({fetchFieldsIfNeeded:function(){return s.j()}},e)}))((function(e){var t=e.fetchFieldsIfNeeded,n=e.isFetching,r=e.fieldData,a=e.selectedColumns,c=e.onChange;if(n||!r||!r[f.a.data]||!r[f.a.data].length||!r[f.a.links]||!r[f.a.links].length)return t(),o.a.createElement(l.Loader,null);var i=a.filter((function(e){return e!==E.itemId})),s=function(e,t){var n=e.tabId,r=e.accordionId,o=e.itemId;return O({},t,j({},n,t[n].map((function(e){return e.id===r?O({},e,{items:e.items.filter((function(e){return e.id!==o}))}):e}))))}(E,r),d=function(e){c([E.itemId].concat(_(e)))};return o.a.createElement(g,{selectedColumns:i,fieldData:s,onReset:function(){return c(v.c)},onSelect:function(e){var t=i.indexOf(e);d(t>=0?Object(u.e)(i,t):[].concat(_(i),[e]))},onDragDrop:function(e,t){d(Object(u.d)(i,e,t))}})})));t.a=w},763:function(e,t,n){var r=n(764);"string"==typeof r&&(r=[[e.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(121)(r,o);r.locals&&(e.exports=r.locals)},764:function(e,t,n){(e.exports=n(120)(!1)).push([e.i,".customise-table{padding:1rem}.customise-table--cancel-submit-buttons{float:right}\n",""])},769:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),a=n(140),c=n(71),i=n(118),l=n(108),u=n(705),s=(n(763),function(e){var t=e.selectedColumns,n=e.onChange,r=e.onSubmit,a=e.onCancel;return o.a.createElement("form",{onSubmit:r,className:"customise-table","data-testid":"customise-table-form"},o.a.createElement(u.a,{onChange:n,selectedColumns:t}),o.a.createElement("div",{className:"button-group customise-table--cancel-submit-buttons"},o.a.createElement("button",{className:"button secondary",type:"button",onClick:a,"data-testid":"customise-table-cancel-button"},"Cancel"),o.a.createElement("button",{className:"button",type:"submit"},"Save")))});function d(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],r=!0,o=!1,a=void 0;try{for(var c,i=e[Symbol.iterator]();!(r=(c=i.next()).done)&&(n.push(c.value),!t||n.length!==t);r=!0);}catch(e){o=!0,a=e}finally{try{r||null==i.return||i.return()}finally{if(o)throw a}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var m=Object(i.o)(Object(a.b)((function(e){return{tableColumns:e.results.tableColumns}}),(function(e){return Object(c.b)({updateTableColumns:function(e){return l.l(e)}},e)}))((function(e){var t=e.tableColumns,n=e.updateTableColumns,a=e.history,c=d(Object(r.useState)(t),2),i=c[0],l=c[1];return o.a.createElement(s,{selectedColumns:i,onChange:function(e){l(e)},onSubmit:function(e){e.preventDefault(),n(i),a.goBack()},onCancel:function(){a.goBack()}})})));t.default=function(){return o.a.createElement(m,null)}}}]);