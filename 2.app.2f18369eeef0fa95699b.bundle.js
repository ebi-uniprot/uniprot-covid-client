(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{687:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var a,r=n(0),o=n.n(r),c=n(5);!function(e){e.small="small",e.medium="medium",e.large="large"}(a||(a={}));t.b=function(e){var t,n,r=e.score,i=e.size,s=void 0===i?a.medium:i,l=(t=r,n=Math.floor(t/20)+1,Math.min(n,5));return o.a.createElement("span",{title:"Annotation Score"},o.a.createElement(c.DoughnutChart,{percent:20*l,size:s},"".concat(l,"/5")))}},688:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var a=n(0),r=n.n(a),o=n(5),c=n(292),i=(n(696),function(e){return e.entryType===c.a.SWISSPROT?r.a.createElement("span",{className:"uniprot-title__status icon--reviewed"},r.a.createElement(o.SwissProtIcon,null)):r.a.createElement("span",{className:"uniprot-title__status icon--unreviewed"},r.a.createElement(o.TremblIcon,null))});t.b=function(e){var t=e.primaryAccession,n=e.entryType,a=e.uniProtkbId;return r.a.createElement("span",{className:"uniprot-title"},r.a.createElement(i,{entryType:n}),t," · ".concat(a))}},693:function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(285);n(694);t.a=function(e){var t=e.title,n=e.sidebar,c=e.actionButtons,i=e.children;return r.a.createElement("section",{className:"sidebar-layout"},r.a.createElement(o.a,null,r.a.createElement(a.Fragment,null,t&&r.a.createElement("section",{className:"base-layout__title"},t),c&&r.a.createElement("section",{className:"base-layout__action-buttons"},c),r.a.createElement("section",{className:"base-layout__sidebar"},n),r.a.createElement("section",{className:"base-layout__content"},i))))}},694:function(e,t,n){var a=n(695);"string"==typeof a&&(a=[[e.i,a,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(120)(a,r);a.locals&&(e.exports=a.locals)},695:function(e,t,n){(e.exports=n(119)(!1)).push([e.i,".sidebar-layout .base-layout{min-height:100vh;max-height:100vh;grid-template-areas:'main-header main-header' 'title title' '. action-buttons' 'sidebar content' 'footer footer';grid-template-columns:20vw auto;grid-template-rows:5rem auto auto 1fr auto}.sidebar-layout .base-layout__title{grid-column:title;padding:0 1rem}.sidebar-layout .base-layout__action-buttons{grid-column:action-buttons;padding:0 1rem}.sidebar-layout .base-layout__sidebar{padding:0 1rem;grid-area:sidebar;overflow-y:auto}.sidebar-layout .base-layout__content{padding:0 1rem;grid-area:content;overflow-y:auto}\n",""])},696:function(e,t,n){var a=n(697);"string"==typeof a&&(a=[[e.i,a,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(120)(a,r);a.locals&&(e.exports=a.locals)},697:function(e,t,n){(e.exports=n(119)(!1)).push([e.i,".uniprot-title{position:relative}.uniprot-title__status{display:inline-flex;align-self:center}.uniprot-title__status svg{width:0.75em;height:0.75em;margin-right:0.25rem;position:relative}\n",""])},717:function(e,t,n){var a=n(718);"string"==typeof a&&(a=[[e.i,a,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(120)(a,r);a.locals&&(e.exports=a.locals)},718:function(e,t,n){(e.exports=n(119)(!1)).push([e.i,".warning{color:red}\n",""])},719:function(e,t,n){var a=n(720);"string"==typeof a&&(a=[[e.i,a,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(120)(a,r);a.locals&&(e.exports=a.locals)},720:function(e,t,n){(e.exports=n(119)(!1)).push([e.i,".datalist{display:flex;height:100%;overflow-y:auto}\n",""])},721:function(e,t,n){var a=n(722);"string"==typeof a&&(a=[[e.i,a,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(120)(a,r);a.locals&&(e.exports=a.locals)},722:function(e,t,n){(e.exports=n(119)(!1)).push([e.i,".uniprot-card{display:flex}.uniprot-card__left{padding:0.2rem}.uniprot-card__right h5{margin:0}\n",""])},766:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(140),c=n(70),i=n(121),s=n(117),l=n(5),u=n(135),m=n.n(u),d=n(107),f=n(25),p=n(693),b=n(52),y=n.n(b),v=n(29),E=function(e){var t=e.termValue,n=e.linkTo;return void 0!==n?r.a.createElement(i.Link,{to:n},t):r.a.createElement("span",null,t)},g=n(189),h=n(294),S=n(293),A=n(286),N=n(358),T=n(64),D=n(2),P=n(193),I=n(362),O=n(7),C=n(15),w=n(348),F=n(347),k=n(128),R=n(3),_=n(687),x=n(220),L=n(62),M=n(688),j=n(31),q=n(13),U=n(359),B=n(350),G=n(363),V=n(360),H=n(357),Y=n(48);function K(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],a=!0,r=!1,o=void 0;try{for(var c,i=e[Symbol.iterator]();!(a=(c=i.next()).done)&&(n.push(c.value),!t||n.length!==t);a=!0);}catch(e){r=!0,o=e}finally{try{a||null==i.return||i.return()}finally{if(r)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var W=function(e){return{label:e,render:function(t){var n=t[D.a.Sequence].featuresData;return n&&r.a.createElement(T.a,{features:n.filter((function(t){return t.type===e}))})}}},z=function(e){return{label:"Gene Ontology - ".concat(e),render:function(t){var n=t[D.a.Function].goTerms,a=n&&n.get(e);return a&&r.a.createElement(H.a,{data:a})}}},Q=new Map;Q.set(k.a.accession,{label:"Entry",sortable:!0,render:function(e){return r.a.createElement(E,{termValue:e.primaryAccession,linkTo:"/uniprotkb/".concat(e.primaryAccession)})}}),Q.set(k.a.id,{label:"Entry Name",sortable:!0,render:function(e){return r.a.createElement(E,{termValue:e.uniProtkbId})}}),Q.set(k.a.proteinName,{label:"Protein names",sortable:!0,render:function(e){var t=e[D.a.NamesAndTaxonomy].proteinNamesData;return t&&r.a.createElement(g.c,{proteinNames:t,isCompact:!0})}}),Q.set(k.a.geneNames,{label:"Gene Names",sortable:!0,render:function(e){var t=e[D.a.NamesAndTaxonomy].geneNamesData;return t&&r.a.createElement(S.a,{geneNamesData:t,isCompact:!0})}}),Q.set(k.a.organism,{label:"Organism",sortable:!0,render:function(e){var t=e[D.a.NamesAndTaxonomy].organismData;return t&&r.a.createElement(h.d,{data:t})}}),Q.set(k.a.length,{label:"Length",render:function(e){var t=e[D.a.Sequence];return t.sequence&&Object(A.b)({value:t.sequence.length,unit:A.a.AA})}}),Q.set(k.a.genePrimary,{label:"Gene names (Primary)",render:function(e){var t=e[D.a.NamesAndTaxonomy].geneNamesData;return r.a.createElement(a.Fragment,null,t&&t.map((function(e){return e.geneName&&r.a.createElement("div",{key:e.geneName.value},e.geneName.value)})))}}),Q.set(k.a.geneOln,{label:"Gene names (Ordered locus)",render:function(e){var t=e[D.a.NamesAndTaxonomy].geneNamesData;return r.a.createElement(a.Fragment,null,t&&t.map((function(e){return e.orderedLocusNames&&r.a.createElement(a.Fragment,{key:e.orderedLocusNames.join("")},Object(S.b)(e.orderedLocusNames,!1))})))}}),Q.set(k.a.geneOrf,{label:"Gene names (ORF)",render:function(e){var t=e[D.a.NamesAndTaxonomy].geneNamesData;return r.a.createElement(a.Fragment,null,t&&t.map((function(e){return e.orfNames&&r.a.createElement(a.Fragment,{key:e.orfNames.join("")},Object(S.b)(e.orfNames,!1))})))}}),Q.set(k.a.geneSynonym,{label:"Gene names (Synonyms)",render:function(e){var t=e[D.a.NamesAndTaxonomy].geneNamesData;return r.a.createElement(a.Fragment,null,t&&t.map((function(e){return e.synonyms&&r.a.createElement(a.Fragment,{key:e.synonyms.join("")},Object(S.b)(e.synonyms,!1))})))}}),Q.set(k.a.organismId,{label:"Organism",render:function(e){var t=e[D.a.NamesAndTaxonomy].organismData;return t&&r.a.createElement(h.a,{taxonId:t.taxonId})}}),Q.set(k.a.proteinName,{label:"Protein names",render:function(e){var t=e[D.a.NamesAndTaxonomy].proteinNamesData;return t&&r.a.createElement(g.c,{proteinNames:t,isCompact:!0})}}),Q.set(k.a.drProteomes,{label:"Proteomes",render:function(e){var t=e[D.a.NamesAndTaxonomy].proteomesData;return t&&r.a.createElement(N.a,{data:t,isCompact:!0})}}),Q.set(k.a.lineage,{label:"Lineage",render:function(e){var t=e[D.a.NamesAndTaxonomy].organismData;return t&&t.lineage&&r.a.createElement(h.b,{lineage:t.lineage})}}),Q.set(k.a.organismHost,{label:"Virus hosts",render:function(e){var t=e[D.a.NamesAndTaxonomy].organismHosts;return t&&r.a.createElement(a.Fragment,null,t.map((function(e){return r.a.createElement("p",{key:e.taxonId},r.a.createElement(h.d,{data:e}))})))}}),Q.set(k.a.ccAlternativeProducts,{label:"Alternative Products",render:function(e){var t=e[D.a.Sequence];return t.alternativeProducts&&r.a.createElement(P.a,{alternativeProducts:t.alternativeProducts,includeSequences:!1,canonicalAccession:e.primaryAccession})}}),Q.set(k.a.sequence,{label:"Sequence",render:function(e){var t=e[D.a.Sequence];return r.a.createElement(l.Sequence,{sequence:t.sequence.value,accession:e.primaryAccession})}}),Q.set(k.a.ftVarSeq,{label:"Alternative sequence",render:function(e){var t=e[D.a.Sequence].featuresData;return r.a.createElement(a.Fragment,null,t&&r.a.createElement(T.a,{features:t}))}}),Q.set(k.a.fragment,{label:"Fragment",render:function(e){var t=e[D.a.Sequence].flag,n=t&&[I.a.FRAGMENT,I.a.FRAGMENTS,I.a.FRAGMENTS_PRECURSOR,I.a.FRAGMENT_PRECURSOR].includes(t);return t&&r.a.createElement(a.Fragment,null,n?t:"N")}}),Q.set(k.a.mass,{label:"Mass",render:function(e){var t=e[D.a.Sequence].molWeight;return Object(A.b)({value:t,unit:A.a.DA})}}),Q.set(k.a.ccMassSpectrometry,{label:"Mass Spectrometry",render:function(e){var t=e[D.a.Sequence].massSpectrometry;return t&&r.a.createElement(P.b,{data:t})}}),Q.set(k.a.ftVariant,{label:"Variants",render:function(e){return r.a.createElement(G.a,{primaryAccession:e.primaryAccession,hasTable:!1})}}),Q.set(k.a.ftNonCon,W(O.a.NON_CONS)),Q.set(k.a.ftNonStd,W(O.a.NON_STD)),Q.set(k.a.ftNonTer,W(O.a.NON_TER)),Q.set(k.a.ccPolymorphism,{label:"Polymorphysm",render:function(e){var t=e[D.a.Sequence].polymorphysm;return t&&r.a.createElement(C.b,{comments:t})}}),Q.set(k.a.ccRnaEditing,{label:"RNA Editing",render:function(e){var t=e[D.a.Sequence].rnaEditing;return t&&r.a.createElement(P.c,{data:t})}}),Q.set(k.a.errorGmodelPred,{label:"Sequence Caution",render:function(e){var t=e[D.a.Sequence].sequenceCaution;return t&&r.a.createElement(P.d,{data:t})}}),Q.set(k.a.ftConflict,W(O.a.CONFLICT)),Q.set(k.a.ftUnsure,W(O.a.UNSURE)),Q.set(k.a.sequenceVersion,{label:"Sequence Version",render:function(e){var t=e[D.a.Sequence].entryAudit;return t&&r.a.createElement("span",null,t.sequenceVersion)}}),Q.set(k.a.absorption,{label:"Absorption",render:function(e){var t=e[D.a.Function].bioPhysicoChemicalProperties;return t.absorption&&r.a.createElement(w.a,{data:t.absorption})}}),Q.set(k.a.ftActSite,W(O.a.ACT_SITE)),Q.set(k.a.ftBinding,W(O.a.BINDING)),Q.set(k.a.ftCaBind,W(O.a.CA_BIND)),Q.set(k.a.ccCatalyticActivity,{label:"Catalytic Activity",render:function(e){var t=e[D.a.Function].commentsData.get(R.a.CATALYTIC_ACTIVITY);return t&&r.a.createElement(B.a,{comments:t})}}),Q.set(k.a.ccCofactor,{label:"Cofactor",render:function(e){var t=e[D.a.Function].commentsData.get(R.a.COFACTOR);return t&&r.a.createElement(w.b,{cofactors:t})}}),Q.set(k.a.ftDnaBind,W(O.a.DNA_BIND)),Q.set(k.a.ec,{label:"EC Number",render:function(e){var t=e[D.a.NamesAndTaxonomy].proteinNamesData,n=y()(t,(function(e){return e.recommendedName.ecNumbers}));return n&&r.a.createElement(g.a,{ecNumbers:n})}}),Q.set(k.a.ccActivityRegulation,{label:"Activity Regulation",render:function(e){var t=e[D.a.Function].commentsData.get(R.a.ACTIVITY_REGULATION);return t&&r.a.createElement(C.b,{comments:t})}}),Q.set(k.a.ccFunction,{label:"Function",render:function(e){var t=e[D.a.Function].commentsData.get(R.a.FUNCTION);return t&&r.a.createElement(C.b,{comments:t})}}),Q.set(k.a.kinetics,{label:"Kinetics",render:function(e){var t=e[D.a.Function].bioPhysicoChemicalProperties;return t.kinetics&&r.a.createElement(w.c,{data:t.kinetics})}}),Q.set(k.a.ftMetal,W(O.a.METAL)),Q.set(k.a.ftNpBind,W(O.a.NP_BINDL)),Q.set(k.a.ccPathway,{label:"Pathway",render:function(e){var t=e[D.a.Function].commentsData.get(R.a.PATHWAY);return t&&r.a.createElement(C.b,{comments:t})}}),Q.set(k.a.phDependence,{label:"pH Dependence",render:function(e){var t=e[D.a.Function].bioPhysicoChemicalProperties;return t.pHDependence&&r.a.createElement(C.a,{comments:t.pHDependence})}}),Q.set(k.a.redoxPotential,{label:"Redox Potential",render:function(e){var t=e[D.a.Function].bioPhysicoChemicalProperties;return t.redoxPotential&&r.a.createElement(C.a,{comments:t.redoxPotential})}}),Q.set(k.a.ftSite,W(O.a.SITE)),Q.set(k.a.tempDependence,{label:"Temperature Dependence",render:function(e){var t=e[D.a.Function].bioPhysicoChemicalProperties;return t.temperatureDependence&&r.a.createElement(C.a,{comments:t.temperatureDependence})}}),Q.set(k.a.score,{label:"Score",render:function(e){return r.a.createElement(_.b,{score:e.annotationScore,size:_.a.medium})}}),Q.set(k.a.ccSequenceCaution,{label:"Sequence Caution",render:function(e){var t=e[D.a.Sequence].sequenceCaution;return t&&r.a.createElement(P.d,{data:t})}}),Q.set(k.a.keyword,{label:"Keywords",render:function(e){var t=Object(x.a)(e);return r.a.createElement(L.a,{keywords:t})}}),Q.set(k.a.keywordid,{label:"Keyword IDs",render:function(e){var t=Object(x.a)(e);return r.a.createElement(L.a,{keywords:t,idOnly:!0})}}),Q.set(k.a.ccMiscellaneous,{label:"Miscellaneous [CC]",render:function(e){var t=e[D.a.Function].commentsData.get(R.a.MISCELLANEOUS);return t&&r.a.createElement(C.b,{comments:t})}}),Q.set(k.a.proteinExistence,{label:"Protein existence",render:function(e){return e.proteinExistence}}),Q.set(k.a.reviewed,{label:"",render:function(e){return r.a.createElement(M.a,{entryType:e.entryType})}}),Q.set(k.a.ccInteraction,{label:"Interacts with",render:function(e){var t=e[D.a.Interaction].commentsData.get(R.a.INTERACTION);return t&&r.a.createElement(a.Fragment,null,t.map((function(e){return e.interactions.map((function(e){return r.a.createElement("div",{key:e.type===R.b.SELF?"self":"".concat(e.interactantOne.uniProtkbAccession,"-").concat(e.interactantTwo.uniProtkbAccession)},e.type===R.b.SELF?"Itself":r.a.createElement(i.Link,{to:"/uniprotkb/".concat(e.interactantOne.uniProtkbAccession)},e.interactantOne.uniProtkbAccession))}))})))}}),Q.set(k.a.ccSubunit,{label:"Subunit structure",render:function(e){var t=e[D.a.Interaction].commentsData.get(R.a.SUBUNIT);return t&&r.a.createElement(C.b,{comments:t})}}),Q.set(k.a.ccDevelopmentalStage,{label:"Developmental stage",render:function(e){var t=e[D.a.Expression].commentsData.get(R.a.DEVELOPMENTAL_STAGE);return t&&r.a.createElement(C.b,{comments:t})}}),Q.set(k.a.ccInduction,{label:"Induction",render:function(e){var t=e[D.a.Expression].commentsData.get(R.a.INDUCTION);return t&&r.a.createElement(C.b,{comments:t})}}),Q.set(k.a.ccTissueSpecificity,{label:"Tissue Specificity",render:function(e){var t=e[D.a.Expression].commentsData.get(R.a.TISSUE_SPECIFICITY);return t&&r.a.createElement(C.b,{comments:t})}}),Q.set(k.a.goP,z(F.a.P)),Q.set(k.a.goC,z(F.a.C)),Q.set(k.a.goF,z(F.a.F)),Q.set(k.a.go,{label:"Gene Ontology",render:function(e){var t=e[D.a.Function].goTerms,n=t&&Object(v.flatten)(Object.values(t));return n&&r.a.createElement(H.a,{data:n})}}),Q.set(k.a.goId,{label:"Gene Ontology IDs",render:function(e){var t=e[D.a.Function].goTerms,n=t&&Object(v.flatten)(Object.values(t));return n&&r.a.createElement("section",{className:"text-block"},r.a.createElement(l.ExpandableList,{descriptionString:"terms"},n.filter((function(e){return e.id})).map((function(e){var t=e.id;return{id:t,content:t&&r.a.createElement("a",{href:Y.a.QuickGO(t)},t)}}))))}}),Q.set(k.a.threeD,{label:"3D structures",render:function(e){var t=e[D.a.Structure].structures;return t&&r.a.createElement(a.Fragment,null,Object.entries(t).map((function(e){var t=K(e,2),n=t[0],o=t[1];return r.a.createElement("div",{key:n},o&&r.a.createElement(a.Fragment,null,n,": ",o.length))})))}}),Q.set(k.a.ccSubcellularLocation,{label:"Subcellular Location",render:function(e){var t=e[D.a.SubCellularLocation].commentsData.get(R.a.SUBCELLULAR_LOCATION);return t&&r.a.createElement(V.a,{comments:t})}}),Q.set(k.a.ccDomain,{label:"Domain",render:function(e){var t=e[D.a.FamilyAndDomains].commentsData.get(R.a.DOMAIN);return t&&r.a.createElement(C.b,{comments:t})}}),Q.set(k.a.ccPtm,{label:"Post-Translational Modification",render:function(e){var t=e[D.a.ProteinProcessing].commentsData.get(R.a.PTM);return t&&r.a.createElement(C.b,{comments:t})}}),Q.set(k.a.ccAllergen,{label:"Allergenic Properties",render:function(e){var t=e[D.a.PathologyAndBioTech].commentsData.get(R.a.ALLERGEN);return t&&r.a.createElement(C.b,{comments:t})}}),Q.set(k.a.ccBiotechnology,{label:"Biotechnological Use",render:function(e){var t=e[D.a.PathologyAndBioTech].commentsData.get(R.a.BIOTECHNOLOGY);return t&&r.a.createElement(C.b,{comments:t})}}),Q.set(k.a.ccDisruptionPhenotype,{label:"Disruption Phenotype",render:function(e){var t=e[D.a.PathologyAndBioTech].commentsData.get(R.a.DISRUPTION_PHENOTYPE);return t&&r.a.createElement(C.b,{comments:t})}}),Q.set(k.a.ccDisease,{label:"Disease Involvement",render:function(e){var t=e[D.a.PathologyAndBioTech].commentsData.get(R.a.DISEASE);return t&&r.a.createElement(U.a,{comments:t,primaryAccession:e.primaryAccession})}}),Q.set(k.a.ftMutagen,W(O.a.MUTAGEN)),Q.set(k.a.ccPharmaceutical,{label:"Pharmaceutical Use",render:function(e){var t=e[D.a.PathologyAndBioTech].commentsData.get(R.a.PHARMACEUTICAL);return t&&r.a.createElement(C.b,{comments:t})}}),Q.set(k.a.ccToxicDose,{label:"Toxic Dose",render:function(e){var t=e[D.a.PathologyAndBioTech].commentsData.get(R.a.TOXIC_DOSE);return t&&r.a.createElement(C.b,{comments:t})}}),Q.set(k.a.ftIntramem,W(O.a.INTRAMEM)),Q.set(k.a.ftTopDom,W(O.a.TOPO_DOM)),Q.set(k.a.ftTransmem,W(O.a.TRANSMEM)),Q.set(k.a.ftChain,W(O.a.CHAIN)),Q.set(k.a.ftCrosslnk,W(O.a.CROSSLNK)),Q.set(k.a.ftDisulfide,W(O.a.DISULFID)),Q.set(k.a.ftCarbohyd,W(O.a.CARBOHYD)),Q.set(k.a.ftInitMet,W(O.a.INIT_MET)),Q.set(k.a.ftLipid,W(O.a.LIPID)),Q.set(k.a.ftModRes,W(O.a.MOD_RES)),Q.set(k.a.ftPeptide,W(O.a.PEPTIDE)),Q.set(k.a.ftPropep,W(O.a.PROPEP)),Q.set(k.a.ftSignal,W(O.a.SIGNAL)),Q.set(k.a.ftTransit,W(O.a.TRANSIT)),Q.set(k.a.ftStrand,W(O.a.STRAND)),Q.set(k.a.ftHelix,W(O.a.HELIX)),Q.set(k.a.ftTurn,W(O.a.TURN)),Q.set(k.a.pmId,{label:"PubMed ID",render:function(e){var t=[];return e.references&&(t=e.references.reduce((function(e,t){var n=t.citation.citationCrossReferences;return n?e.concat(n.filter((function(e){return"PubMed"===e.database}))):e}),[])),r.a.createElement(l.ExpandableList,null,t.map((function(e){return{id:e.id,content:r.a.createElement(i.Link,{to:"citations/".concat(e.id)},e.id)}})))}}),Q.set(k.a.mappedPmId,{label:"Mapped PubMed ID",render:function(){return""}}),Q.set(k.a.dateCreate,{label:"Date Created",render:function(e){var t=e[D.a.Sequence].entryAudit;return t&&t.firstPublicDate}}),Q.set(k.a.dateMod,{label:"Date Modified",render:function(e){var t=e[D.a.Sequence].entryAudit;return t&&t.lastAnnotationUpdateDate}}),Q.set(k.a.dateSeqMod,{label:"Date Sequence Modified",render:function(e){var t=e[D.a.Sequence].entryAudit;return t&&t.lastSequenceUpdateDate}}),Q.set(k.a.version,{label:"Version",render:function(e){var t=e[D.a.Sequence].entryAudit;return t&&r.a.createElement(a.Fragment,null,t.entryVersion)}}),Q.set(k.a.ftCoiled,W(O.a.COILED)),Q.set(k.a.ftCompbias,W(O.a.COMPBIAS)),Q.set(k.a.ftDomain,W(O.a.DOMAIN)),Q.set(k.a.ftMotif,W(O.a.MOTIF)),Q.set(k.a.proteinFamilies,{label:"Protein Families",render:function(e){var t=e[D.a.FamilyAndDomains].commentsData.get(R.a.SIMILARITY);return t&&r.a.createElement(C.b,{comments:t})}}),Q.set(k.a.ftRegion,W(O.a.REGION)),Q.set(k.a.ftRepeat,W(O.a.REPEAT)),Q.set(k.a.ccSimilarity,{label:"Sequence Similarities",render:function(e){var t=e[D.a.FamilyAndDomains].commentsData.get(R.a.SIMILARITY);return t&&r.a.createElement(C.b,{comments:t})}}),Q.set(k.a.ftZnFing,W(O.a.ZN_FING)),Q.set(k.a.taxId,{label:"Taxon ID",render:function(e){var t=e[D.a.NamesAndTaxonomy].organismData;return t&&r.a.createElement(a.Fragment,null,t.taxonId)}});Object.values(k.a).filter((function(e){return e.startsWith("dr_")})).forEach((function(e){var t,n=Object(q.h)(e.substring(3));n&&n.name?Q.set(e,(t=n.name,{label:"".concat(t," cross-reference"),render:function(e){var n=Object(q.i)(t);if(n){var a=e[n].xrefData.find((function(e){return e.category===q.d.get(t)}));if(a){var o=a.databases.find((function(e){return e.database===t}));return o&&r.a.createElement(j.a,{xrefsGoupedByDatabase:o,primaryAccession:e.primaryAccession})}}}})):console.error("No database found for ".concat(e))}));var J,X,Z=Q,$=(n(717),n(719),n(54)),ee=n(292);function te(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],a=!0,r=!1,o=void 0;try{for(var c,i=e[Symbol.iterator]();!(a=(c=i.next()).done)&&(n.push(c.value),!t||n.length!==t);a=!0);}catch(e){r=!0,o=e}finally{try{a||null==i.return||i.return()}finally{if(r)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function ne(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}!function(e){e.domains="domain",e.PTM="PTM",e.variants="reviewed variant",e.activeSites="active site",e.isoforms="isoform",e.structures="3D structure",e.disease="disease",e.interactions="interaction",e.subcell="subcellular location",e.publications="publication"}(X||(X={}));var ae=(ne(J={},X.domains,{link:"#".concat(D.a.Function)}),ne(J,X.PTM,{link:"#".concat(D.a.ProteinProcessing)}),ne(J,X.variants,{link:"#".concat(D.a.PathologyAndBioTech)}),ne(J,X.activeSites,{link:"#".concat(D.a.Function)}),ne(J,X.isoforms,{link:"#".concat(D.a.Sequence)}),ne(J,X.structures,{link:"#".concat(D.a.Structure)}),ne(J,X.disease,{link:"#".concat(D.a.PathologyAndBioTech)}),ne(J,X.interactions,{link:"#".concat(D.a.Interaction)}),ne(J,X.subcell,{link:"#".concat(D.a.SubCellularLocation)}),ne(J,X.publications,{link:"/publications",prefixResolver:function(e){return e.entryType===ee.a.SWISSPROT?"reviewed ":""}}),J),re=function(e,t){return e.filter((function(e){return e.type===t})).length},oe=function(e){var t=new Map,n=e.primaryAccession,a=e.features,r=e.comments,o=e.uniProtKBCrossReferences,c=e.references;if(a&&(t.set(X.domains,re(a,O.a.DOMAIN)),t.set(X.PTM,re(a,O.a.MOD_RES)),t.set(X.variants,re(a,O.a.VARIANT)),t.set(X.activeSites,re(a,O.a.ACT_SITE))),r){var i=r.find((function(e){return e.commentType===R.a.ALTERNATIVE_PRODUCTS}));t.set(X.isoforms,i?i.isoforms.length:0);var s=r.find((function(e){return e.commentType===R.a.INTERACTION}));t.set(X.interactions,s?s.interactions.length:0);var l=r.filter((function(e){return e.commentType===R.a.DISEASE}));t.set(X.disease,l.length)}if(o){var u=o.filter((function(e){return"PDB"===e.database}));t.set(X.structures,u.length)}return c&&t.set(X.publications,c.length),Array.from(t.entries()).filter((function(e){return te(e,2)[1]})).map((function(t){var a=te(t,2),r=a[0],o=a[1],c=ae[r],i=c.link,s=c.prefixResolver,l=s?s(e):"";return{link:"/uniprotkb/".concat(n).concat(i),name:"".concat(o," ").concat(l).concat(r).concat(o&&o>1?"s":"")}}))},ce=(n(721),Object(s.o)((function(e){var t,n=e.data,o=e.selectedEntries,c=e.handleEntrySelection,i=e.history,s=y()(n,(function(e){return e.proteinDescription.recommendedName.fullName.value}));s&&(t="".concat(s," · "));var u,m=oe(n),d=r.a.createElement(a.Fragment,null,y()(n,(function(e){return e.organism.scientificName}))," · ");n.genes&&(u=r.a.createElement(a.Fragment,null,"Gene: ",n.genes.filter((function(e){return e.geneName})).map((function(e){return e.geneName&&e.geneName.value})).join(", ")," · "));var f,p="".concat(n.sequence.length," amino-acids · "),b=n.annotationScore,v=r.a.createElement(_.b,{score:b,size:_.a.small});if(n.keywords){var E=Object(x.b)(n.keywords,[$.a.MOLECULAR_FUNCTION,$.a.BIOLOGICAL_PROCESS,$.a.DISEASE]);E.length>0&&(f=E.map((function(e,t){return r.a.createElement(a.Fragment,{key:e.category},t>0&&" · ",r.a.createElement(L.a,{keywords:e.keywords}))})))}return r.a.createElement(l.Card,{links:m,onClick:function(){return i.push("/uniprotkb/".concat(n.primaryAccession))}},r.a.createElement("section",{className:"uniprot-card"},r.a.createElement("section",{className:"uniprot-card__left"},r.a.createElement("input",{type:"checkbox",checked:!!o[n.primaryAccession]&&o[n.primaryAccession],onClick:function(e){return e.stopPropagation()},onChange:function(){return c(n.primaryAccession)},"data-testid":"up-card-checkbox"})),r.a.createElement("section",{className:"uniprot-card__right"},r.a.createElement("h5",null,r.a.createElement(M.b,{primaryAccession:n.primaryAccession,entryType:n.entryType,uniProtkbId:n.uniProtkbId})),r.a.createElement("section",null,t,d,u,p,v),r.a.createElement("section",null,r.a.createElement("small",null,f)))))}))),ie=n(127),se=function(e){var t=e.results,n=void 0===t?[]:t,a=e.totalNumberResults,o=e.tableColumns,c=e.selectedEntries,i=e.handleEntrySelection,s=e.handleLoadMoreRows,u=e.handleHeaderClick,m=e.sortColumn,d=e.sortDirection,f=e.viewMode,p=a>n.length;if(f===ie.a.CARD)return r.a.createElement("div",{className:"datalist"},r.a.createElement(l.DataList,{idKey:"primaryAccession",data:n,dataRenderer:function(e){return r.a.createElement(ce,{data:e,selectedEntries:c,handleEntrySelection:i})},onLoadMoreItems:s,hasMoreData:p}));var b=o.map((function(e){var t=Z.get(e);return t?{label:t.label,name:e,render:function(e){return t.render(Object(ee.b)(e))},sortable:t.sortable,sorted:e===m&&d}:{label:e,name:e,render:function(){return r.a.createElement("div",{className:"warning"},"".concat(e," has no config"))},sortable:!1,sorted:!1}}));return r.a.createElement(l.DataTable,{idKey:"primaryAccession",columns:b,data:n,selectable:!0,selected:c,onSelect:i,onHeaderClick:u,onLoadMoreItems:s,hasMoreData:p})},le=n(53),ue=function(){return r.a.createElement(a.Fragment,null,r.a.createElement("section",{className:"text-block"},"This site provides the latest available pre-release UniProtKB data for the SARS-CoV-2 coronavirus and other entries relating to the COVID-19 outbreak. Therefore, data and functionality provided here may differ from the main Uniprot.org website which is updated every eight weeks. This site will be updated as new relevant information becomes available, independent of the general UniProt release schedule."),r.a.createElement("section",{className:"text-block"},"This data can also be accessed via our FTP on"," ",r.a.createElement("a",{href:"ftp://ftp.uniprot.org/pub/databases/uniprot/pre_release/"},"ftp://ftp.uniprot.org/pub/databases/uniprot/pre_release/")),r.a.createElement("section",{className:"text-block"},"Please go to the ",r.a.createElement("a",{href:"//www.uniprot.org"},"UniProt.org")," website for all other entries and functionalities."))},me={uniprotkb:{name:"UniProtKB",info:r.a.createElement(ue,null),links:[]}},de=n(40);function fe(e){return(fe="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function pe(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function be(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],a=!0,r=!1,o=void 0;try{for(var c,i=e[Symbol.iterator]();!(a=(c=i.next()).done)&&(n.push(c.value),!t||n.length!==t);a=!0);}catch(e){r=!0,o=e}finally{try{a||null==i.return||i.return()}finally{if(r)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function ye(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}function ve(e){var t=function(e,t){if("object"!==fe(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var a=n.call(e,t||"default");if("object"!==fe(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===fe(t)?t:String(t)}function Ee(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function ge(e){return(ge=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function he(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function Se(e,t){return(Se=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function Ae(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var Ne=function(e){function t(e){var n,a,r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),a=this,r=ge(t).call(this,e),n=!r||"object"!==fe(r)&&"function"!=typeof r?he(a):r,Ae(he(n),"getURLParams",(function(e){var t=m.a.parse(e),a=t.query,r=t.facets,o=t.sort,c=t.dir,i=[];r&&"string"==typeof r&&(i=n.facetsAsArray(r));var s=c;return{query:a&&"string"==typeof a?a:"",selectedFacets:i,sortColumn:o,sortDirection:s&&de.c[s]}})),Ae(he(n),"setURLParams",(function(e,t,a,r){n.props.history.push({pathname:"/uniprotkb",search:["query=".concat(e).concat(n.facetsAsString(t)),"".concat(a?"&sort=".concat(a):""),"".concat(r?"&dir=".concat(r):"")].join("")})})),Ae(he(n),"handleEntrySelection",(function(e){var t=n.state.selectedEntries;if(e in t){t[e];var a=ye(t,[e].map(ve));n.setState({selectedEntries:a})}else t[e]=!0,n.setState({selectedEntries:t})})),Ae(he(n),"facetsAsString",(function(e){return!e||e.length<=0?"":e.reduce((function(e,t,n){return"".concat(e).concat(n>0?",":"").concat(t.name,":").concat(t.value)}),"&facets=")})),Ae(he(n),"facetsAsArray",(function(e){return e.split(",").map((function(e){var t=be(e.split(":"),2);return{name:t[0],value:t[1]}}))})),Ae(he(n),"addFacet",(function(e,t){var a=n.props.location.search,r=n.getURLParams(a),o=r.query,c=r.selectedFacets,i=r.sortColumn,s=r.sortDirection,l={name:e,value:t};n.setURLParams(o,pe(c.concat(l)),i,s)})),Ae(he(n),"removeFacet",(function(e,t){var a=n.props.location.search,r=n.getURLParams(a),o=r.query,c=r.selectedFacets,i=r.sortColumn,s=r.sortDirection,l=c.findIndex((function(n){return n.name===e&&n.value===t}));c.splice(l,1),n.setURLParams(o,c,i,s)})),Ae(he(n),"updateColumnSort",(function(e){var t=n.props.location.search,a=n.getURLParams(t),r=a.query,o=a.selectedFacets,c=a.sortColumn,i=a.sortDirection,s=new Map([[k.a.accession,"accession"],[k.a.id,"mnemonic"],[k.a.proteinName,"name"],[k.a.geneNames,"gene"],[k.a.organism,"organism_name"],[k.a.mass,"mass"],[k.a.length,"length"]]).get(e),l=i;s===c&&(l=i===de.c.ascend?de.c.descend:de.c.ascend),n.setURLParams(r,o,s,l)})),n.state={selectedEntries:{}},n}var n,o,c;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&Se(e,t)}(t,e),n=t,(o=[{key:"componentDidMount",value:function(){this.updateData()}},{key:"componentDidUpdate",value:function(e){var t=this.props.location.search;e.location.search!==t&&this.updateData()}},{key:"componentWillUnmount",value:function(){(0,this.props.dispatchResetSearchInput)()}},{key:"updateData",value:function(){var e=this.props,t=e.location.search,n=e.dispatchFetchBatchOfResultsIfNeeded,a=e.dispatchClearResults,r=e.dispatchUpdateQueryString,o=this.getURLParams(t),c=o.query,i=o.selectedFacets,s=o.sortColumn,l=o.sortDirection;a(),n(Object(le.c)(c,[],i,s,l)),r(c)}},{key:"render",value:function(){var e=this.props,t=e.location.search,n=e.results,o=e.facets,c=e.isFetching,s=e.dispatchFetchBatchOfResultsIfNeeded,u=e.namespace,m=e.nextUrl,d=e.totalNumberResults,f=e.viewMode,b=e.tableColumns,y=e.dispatchSwitchViewMode,v=this.state.selectedEntries,E=this.getURLParams(t),g=E.query,h=E.selectedFacets,S=E.sortColumn,A=E.sortDirection;if(c&&!n.length)return r.a.createElement(l.Loader,null);var N=me[u],T=N.name,D=N.links,P=N.info,I=r.a.createElement("div",{className:"button-group"},r.a.createElement("button",{type:"button",className:"button tertiary"},r.a.createElement(i.Link,{to:{pathname:"/download",state:{query:g,selectedFacets:h,sortColumn:S,sortDirection:A,selectedEntries:Object.keys(v)}}},r.a.createElement(l.DownloadIcon,null),"Download")),r.a.createElement("button",{type:"button",className:"button tertiary large-icon",onClick:function(){return y()},"data-testid":"table-card-toggle"},r.a.createElement("span",{className:f===ie.a.CARD?"tertiary-icon__active":""},r.a.createElement(l.TableIcon,null)),r.a.createElement("span",{className:f===ie.a.TABLE?"tertiary-icon__active":""},r.a.createElement(l.ListIcon,null))),f===ie.a.TABLE&&r.a.createElement(i.Link,{to:"/customise-table"},r.a.createElement("button",{type:"button",className:"button tertiary"},r.a.createElement(l.EditIcon,null),"Customize data")));return r.a.createElement(a.Fragment,null,r.a.createElement(p.a,{title:r.a.createElement(a.Fragment,null,r.a.createElement(l.PageIntro,{title:"COVID-19 ".concat(T),links:D,resultsCount:d,showContent:!0},P)),actionButtons:I,sidebar:r.a.createElement(l.Facets,{data:o,selectedFacets:h,addFacet:this.addFacet,removeFacet:this.removeFacet})},r.a.createElement(a.Fragment,null,r.a.createElement(se,{results:n,handleEntrySelection:this.handleEntrySelection,selectedEntries:v,handleHeaderClick:this.updateColumnSort,sortColumn:S,sortDirection:A,handleLoadMoreRows:function(){return s(m)},totalNumberResults:d,tableColumns:b,viewMode:f}))))}}])&&Ee(n.prototype,o),c&&Ee(n,c),t}(a.Component),Te=Object(s.o)(Object(o.b)((function(e){return{namespace:e.query.namespace,tableColumns:e.results.tableColumns,results:e.results.results.data,facets:e.results.facets,isFetching:e.results.results.isFetching,nextUrl:e.results.nextUrl,totalNumberResults:e.results.totalNumberResults,viewMode:e.results.viewMode}}),(function(e){return Object(c.b)({dispatchFetchBatchOfResultsIfNeeded:function(e){return d.i(e)},dispatchResetSearchInput:function(){return f.q()},dispatchClearResults:function(){return d.h()},dispatchSwitchViewMode:function(){return d.k()},dispatchUpdateQueryString:function(e){return f.r(e)}},e)}))(Ne));t.default=function(){return r.a.createElement(Te,null)}}}]);