(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{728:function(e,t,n){var a=n(729);"string"==typeof a&&(a=[[e.i,a,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(151)(a,r);a.locals&&(e.exports=a.locals)},729:function(e,t,n){(e.exports=n(150)(!1)).push([e.i,".warning{color:red}\n",""])},730:function(e,t,n){var a=n(731);"string"==typeof a&&(a=[[e.i,a,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(151)(a,r);a.locals&&(e.exports=a.locals)},731:function(e,t,n){(e.exports=n(150)(!1)).push([e.i,".datalist{display:flex;height:100%}.datalist__column{width:50%;overflow-y:auto}\n",""])},732:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.genericHashLink=p,t.HashLink=y,t.NavHashLink=v;var o=s(n(0)),c=s(n(36)),i=n(96);function s(e){return e&&e.__esModule?e:{default:e}}var l="",u=null,m=null,d=null;function f(){l="",null!==u&&u.disconnect(),null!==m&&(window.clearTimeout(m),m=null)}function b(){var e=document.getElementById(l);return null!==e&&(d(e),f(),!0)}function p(e,t){e.scroll,e.smooth;var n=function(e,t){var n={};for(var a in e)t.indexOf(a)>=0||Object.prototype.hasOwnProperty.call(e,a)&&(n[a]=e[a]);return n}(e,["scroll","smooth"]);return o.default.createElement(t,a({},n,{onClick:function(t){f(),e.onClick&&e.onClick(t),"string"==typeof e.to?l=e.to.split("#").slice(1).join("#"):"object"===r(e.to)&&"string"==typeof e.to.hash&&(l=e.to.hash.replace("#","")),""!==l&&(d=e.scroll||function(t){return e.smooth?t.scrollIntoView({behavior:"smooth"}):t.scrollIntoView()},window.setTimeout((function(){!1===b()&&(null===u&&(u=new MutationObserver(b)),u.observe(document,{attributes:!0,childList:!0,subtree:!0}),m=window.setTimeout((function(){f()}),1e4))}),0))}}),e.children)}function y(e){return p(e,i.Link)}function v(e){return p(e,i.NavLink)}var E={onClick:c.default.func,children:c.default.node,scroll:c.default.func,to:c.default.oneOfType([c.default.string,c.default.object])};y.propTypes=E,v.propTypes=E},733:function(e,t,n){var a=n(734);"string"==typeof a&&(a=[[e.i,a,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(151)(a,r);a.locals&&(e.exports=a.locals)},734:function(e,t,n){(e.exports=n(150)(!1)).push([e.i,".protein-highlights{display:flex;flex-wrap:wrap}.protein-highlights h4{width:100%}.protein-highlights__item{margin:0.2rem 0;width:50%}\n",""])},803:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(97),c=n(34),i=n(96),s=n(55),l=n(61),u=n(204),m=n.n(u),d=n(53),f=n(12),b=n(582),p=n(154),y=n.n(p),v=n(583),E=n(584),h=n(552),g=n(553),A=n(586),N=n(587),S=n(508),T=n(488),I=n(597),D=n(598),P=n(501),C=n(502),O=n(649),w=n(29),R=n(490),F=n(564),L=n(534),k=n(503),M=n(536),x=n(497),j=n(547),_=n(614),U=n(600),q=n(615),B=function(e){return{label:e,render:function(t){var n=t[T.a.Sequence].featuresData;return n&&r.a.createElement(S.a,{features:n.filter((function(t){return t.type===e}))})}}},G=new Map;G.set(w.a.accession,{label:"Entry",sortable:!0,render:function(e){return r.a.createElement(v.a,{termValue:e.primaryAccession,linkTo:"/uniprotkb/".concat(e.primaryAccession)})}}),G.set(w.a.id,{label:"Entry Name",sortable:!0,render:function(e){return r.a.createElement(v.a,{termValue:e.uniProtId})}}),G.set(w.a.proteinName,{label:"Protein names",sortable:!0,render:function(e){var t=e[T.a.NamesAndTaxonomy].proteinNamesData;return t&&r.a.createElement(E.b,{proteinNames:t,isCompact:!0})}}),G.set(w.a.geneNames,{label:"Gene Names",sortable:!0,render:function(e){var t=e[T.a.NamesAndTaxonomy].geneNamesData;return t&&r.a.createElement(g.a,{geneNamesData:t,isCompact:!0})}}),G.set(w.a.organism,{label:"Organism",sortable:!0,render:function(e){var t=e[T.a.NamesAndTaxonomy].organismData;return t&&r.a.createElement(h.d,{data:t})}}),G.set(w.a.length,{label:"Length",render:function(e){var t=e[T.a.Sequence];return t.sequence&&Object(A.b)({value:t.sequence.length,unit:A.a.AA})}}),G.set(w.a.genePrimary,{label:"Gene names (Primary)",render:function(e){var t=e[T.a.NamesAndTaxonomy].geneNamesData;return r.a.createElement(a.Fragment,null,t&&t.map((function(e){return e.geneName&&r.a.createElement("div",{key:e.geneName.value},e.geneName.value)})))}}),G.set(w.a.geneOln,{label:"Gene names (Ordered locus)",render:function(e){var t=e[T.a.NamesAndTaxonomy].geneNamesData;return r.a.createElement(a.Fragment,null,t&&t.map((function(e){return e.orderedLocusNames&&r.a.createElement(a.Fragment,{key:e.orderedLocusNames.join("")},Object(g.b)(e.orderedLocusNames,!1))})))}}),G.set(w.a.geneOrf,{label:"Gene names (ORF)",render:function(e){var t=e[T.a.NamesAndTaxonomy].geneNamesData;return r.a.createElement(a.Fragment,null,t&&t.map((function(e){return e.orfNames&&r.a.createElement(a.Fragment,{key:e.orfNames.join("")},Object(g.b)(e.orfNames,!1))})))}}),G.set(w.a.geneSynonym,{label:"Gene names (Synonyms)",render:function(e){var t=e[T.a.NamesAndTaxonomy].geneNamesData;return r.a.createElement(a.Fragment,null,t&&t.map((function(e){return e.synonyms&&r.a.createElement(a.Fragment,{key:e.synonyms.join("")},Object(g.b)(e.synonyms,!1))})))}}),G.set(w.a.organismId,{label:"Organism",render:function(e){var t=e[T.a.NamesAndTaxonomy].organismData;return t&&r.a.createElement(h.a,{taxonId:t.taxonId})}}),G.set(w.a.proteinName,{label:"Protein names",render:function(e){var t=e[T.a.NamesAndTaxonomy].proteinNamesData;return t&&r.a.createElement(E.b,{proteinNames:t,isCompact:!0})}}),G.set(w.a.drProteomes,{label:"Proteomes",render:function(e){var t=e[T.a.NamesAndTaxonomy].proteomesData;return t&&r.a.createElement(N.a,{data:t,isCompact:!0})}}),G.set(w.a.lineage,{label:"Lineage",render:function(e){var t=e[T.a.NamesAndTaxonomy].organismData;return t&&t.lineage&&r.a.createElement(h.b,{lineage:t.lineage})}}),G.set(w.a.organismHost,{label:"Virus hosts",render:function(e){var t=e[T.a.NamesAndTaxonomy].organismHosts;return t&&r.a.createElement(a.Fragment,null,t.map((function(e){return r.a.createElement("p",{key:e.taxonId},r.a.createElement(h.d,{data:e}))})))}}),G.set(w.a.ccAlternativeProducts,{label:"Alternative Products",render:function(e){var t=e[T.a.Sequence];return t.alternativeProducts&&r.a.createElement(I.a,{alternativeProducts:t.alternativeProducts,includeSequences:!1})}}),G.set(w.a.sequence,{label:"Sequence",render:function(e){var t=e[T.a.Sequence];return r.a.createElement(l.Sequence,{sequence:t.sequence.value,id:e.primaryAccession})}}),G.set(w.a.ftVarSeq,{label:"Alternative sequence",render:function(e){var t=e[T.a.Sequence].featuresData;return r.a.createElement(a.Fragment,null,t&&r.a.createElement(S.a,{features:t}))}}),G.set(w.a.fragment,{label:"Fragment",render:function(e){var t=e[T.a.Sequence].flag,n=t&&[D.a.FRAGMENT,D.a.FRAGMENTS,D.a.FRAGMENTS_PRECURSOR,D.a.FRAGMENT_PRECURSOR].includes(t);return t&&r.a.createElement(a.Fragment,null,n?t:"N")}}),G.set(w.a.mass,{label:"Mass",render:function(e){var t=e[T.a.Sequence].molWeight;return Object(A.b)({value:t,unit:A.a.DA})}}),G.set(w.a.ccMassSpectrometry,{label:"Mass Spectrometry",render:function(e){var t=e[T.a.Sequence].massSpectrometry;return t&&r.a.createElement(I.b,{data:t})}}),G.set(w.a.ftVariant,{label:"Variants",render:function(e){return r.a.createElement(q.a,{primaryAccession:e.primaryAccession,hasTable:!1})}}),G.set(w.a.ftNonCon,B(P.a.NON_CONS)),G.set(w.a.ftNonStd,B(P.a.NON_STD)),G.set(w.a.ftNonTer,B(P.a.NON_TER)),G.set(w.a.ccPolymorphism,{label:"Polymorphysm",render:function(e){var t=e[T.a.Sequence].polymorphysm;return t&&r.a.createElement(C.b,{comments:t})}}),G.set(w.a.ccRnaEditing,{label:"RNA Editing",render:function(e){var t=e[T.a.Sequence].rnaEditing;return t&&r.a.createElement(I.c,{data:t})}}),G.set(w.a.errorGmodelPred,{label:"Sequence Caution",render:function(e){var t=e[T.a.Sequence].sequenceCaution;return t&&r.a.createElement(I.d,{data:t})}}),G.set(w.a.ftConflict,B(P.a.CONFLICT)),G.set(w.a.ftUnsure,B(P.a.UNSURE)),G.set(w.a.sequenceVersion,{label:"Sequence Version",render:function(e){var t=e[T.a.Sequence].entryAudit;return t&&r.a.createElement("span",null,t.sequenceVersion)}}),G.set(w.a.absorption,{label:"Absorption",render:function(e){var t=e[T.a.Function].bioPhysicoChemicalProperties;return t.absorption&&r.a.createElement(O.a,{data:t.absorption})}}),G.set(w.a.ftActSite,B(P.a.ACT_SITE)),G.set(w.a.ftBinding,B(P.a.BINDING)),G.set(w.a.ftCaBind,B(P.a.CA_BIND)),G.set(w.a.ccCatalyticActivity,{label:"Catalytic Activity",render:function(e){var t=e[T.a.Function].commentsData.get(R.a.CATALYTIC_ACTIVITY);return t&&r.a.createElement(U.a,{comments:t})}}),G.set(w.a.ccCofactor,{label:"Cofactor",render:function(e){var t=e[T.a.Function].commentsData.get(R.a.COFACTOR);return t&&r.a.createElement(O.b,{cofactors:t})}}),G.set(w.a.ftDnaBind,B(P.a.DNA_BIND)),G.set(w.a.ec,{label:"EC Number",render:function(e){var t=e[T.a.NamesAndTaxonomy].proteinNamesData,n=y()(t,(function(e){return e.recommendedName.ecNumbers}));return n&&r.a.createElement(E.a,{ecNumbers:n})}}),G.set(w.a.ccActivityRegulation,{label:"Activity Regulation",render:function(e){var t=e[T.a.Function].commentsData.get(R.a.ACTIVITY_REGULATION);return t&&r.a.createElement(C.b,{comments:t})}}),G.set(w.a.ccFunction,{label:"Function",render:function(e){var t=e[T.a.Function].commentsData.get(R.a.FUNCTION);return t&&r.a.createElement(C.b,{comments:t})}}),G.set(w.a.kinetics,{label:"Kinetics",render:function(e){var t=e[T.a.Function].bioPhysicoChemicalProperties;return t.kinetics&&r.a.createElement(O.c,{data:t.kinetics})}}),G.set(w.a.ftMetal,B(P.a.METAL)),G.set(w.a.ftNpBind,B(P.a.NP_BINDL)),G.set(w.a.ccPathway,{label:"Pathway",render:function(e){var t=e[T.a.Function].commentsData.get(R.a.PATHWAY);return t&&r.a.createElement(C.b,{comments:t})}}),G.set(w.a.phDependence,{label:"pH Dependence",render:function(e){var t=e[T.a.Function].bioPhysicoChemicalProperties;return t.pHDependence&&r.a.createElement(C.a,{comments:t.pHDependence})}}),G.set(w.a.redoxPotential,{label:"Redox Potential",render:function(e){var t=e[T.a.Function].bioPhysicoChemicalProperties;return t.redoxPotential&&r.a.createElement(C.a,{comments:t.redoxPotential})}}),G.set(w.a.ftSite,B(P.a.SITE)),G.set(w.a.tempDependence,{label:"Temperature Dependence",render:function(e){var t=e[T.a.Function].bioPhysicoChemicalProperties;return t.temperatureDependence&&r.a.createElement(C.a,{comments:t.temperatureDependence})}}),G.set(w.a.score,{label:"Score",render:function(e){return r.a.createElement(F.b,{score:e.annotationScore,size:F.a.medium})}}),G.set(w.a.ccSequenceCaution,{label:"Sequence Caution",render:function(e){var t=e[T.a.Sequence].sequenceCaution;return t&&r.a.createElement(I.d,{data:t})}}),G.set(w.a.keyword,{label:"Keywords",render:function(e){var t=Object(L.a)(e);return r.a.createElement(k.a,{keywords:t})}}),G.set(w.a.keywordid,{label:"Keyword IDs",render:function(e){var t=Object(L.a)(e);return r.a.createElement(k.a,{keywords:t,idOnly:!0})}}),G.set(w.a.ccMiscellaneous,{label:"Miscellaneous [CC]",render:function(e){var t=e[T.a.Function].commentsData.get(R.a.MISCELLANEOUS);return t&&r.a.createElement(C.b,{comments:t})}}),G.set(w.a.proteinExistence,{label:"Protein existence",render:function(e){return e.proteinExistence}}),G.set(w.a.reviewed,{label:"",render:function(e){return r.a.createElement(M.a,{entryType:e.entryType})}}),G.set(w.a.ccInteraction,{label:"Interacts with",render:function(e){var t=e[T.a.Interaction].commentsData.get(R.a.INTERACTION);return t&&r.a.createElement(a.Fragment,null,t.map((function(e){return e.interactions.map((function(e){return r.a.createElement("div",{key:e.type===R.b.SELF?"self":e.uniProtAccession},e.type===R.b.SELF?"Itself":r.a.createElement(i.Link,{to:"/uniprotkb/".concat(e.uniProtAccession)},e.uniProtAccession))}))})))}}),G.set(w.a.ccSubunit,{label:"Subunit structure",render:function(e){var t=e[T.a.Interaction].commentsData.get(R.a.SUBUNIT);return t&&r.a.createElement(C.b,{comments:t})}}),G.set(w.a.ccDevelopmentalStage,{label:"Developmental stage",render:function(e){var t=e[T.a.Expression].commentsData.get(R.a.DEVELOPMENTAL_STAGE);return t&&r.a.createElement(C.b,{comments:t})}}),G.set(w.a.ccInduction,{label:"Induction",render:function(e){var t=e[T.a.Expression].commentsData.get(R.a.INDUCTION);return t&&r.a.createElement(C.b,{comments:t})}}),G.set(w.a.ccTissueSpecificity,{label:"Tissue Specificity",render:function(e){var t=e[T.a.Expression].commentsData.get(R.a.TISSUE_SPECIFICITY);return t&&r.a.createElement(C.b,{comments:t})}}),G.set(w.a.ccAllergen,{label:"Allergenic Properties",render:function(e){var t=e[T.a.PathologyAndBioTech].commentsData.get(R.a.ALLERGEN);return t&&r.a.createElement(C.b,{comments:t})}}),G.set(w.a.ccBiotechnology,{label:"Biotechnological Use",render:function(e){var t=e[T.a.PathologyAndBioTech].commentsData.get(R.a.BIOTECHNOLOGY);return t&&r.a.createElement(C.b,{comments:t})}}),G.set(w.a.ccDisruptionPhenotype,{label:"Disruption Phenotype",render:function(e){var t=e[T.a.PathologyAndBioTech].commentsData.get(R.a.DISRUPTION_PHENOTYPE);return t&&r.a.createElement(C.b,{comments:t})}}),G.set(w.a.ccDisease,{label:"Disease Involvement",render:function(e){var t=e[T.a.PathologyAndBioTech].commentsData.get(R.a.DISEASE);return t&&r.a.createElement(_.a,{comments:t,primaryAccession:e.primaryAccession})}}),G.set(w.a.ftMutagen,B(P.a.MUTAGEN)),G.set(w.a.ccPharmaceutical,{label:"Pharmaceutical Use",render:function(e){var t=e[T.a.PathologyAndBioTech].commentsData.get(R.a.PHARMACEUTICAL);return t&&r.a.createElement(C.b,{comments:t})}}),G.set(w.a.ccToxicDose,{label:"Toxic Dose",render:function(e){var t=e[T.a.PathologyAndBioTech].commentsData.get(R.a.TOXIC_DOSE);return t&&r.a.createElement(C.b,{comments:t})}}),G.set(w.a.ftIntramem,B(P.a.INTRAMEM)),G.set(w.a.ftTopDom,B(P.a.TOPO_DOM)),G.set(w.a.ftTransmem,B(P.a.TRANSMEM)),G.set(w.a.ftChain,B(P.a.CHAIN)),G.set(w.a.ftCrosslnk,B(P.a.CROSSLNK)),G.set(w.a.ftDisulfide,B(P.a.DISULFID)),G.set(w.a.ftCarbohyd,B(P.a.CARBOHYD)),G.set(w.a.ftInitMet,B(P.a.INIT_MET)),G.set(w.a.ftLipid,B(P.a.LIPID)),G.set(w.a.ftModRes,B(P.a.MOD_RES)),G.set(w.a.ftPeptide,B(P.a.PEPTIDE)),G.set(w.a.ftPropep,B(P.a.PROPEP)),G.set(w.a.ftSignal,B(P.a.SIGNAL)),G.set(w.a.ftTransit,B(P.a.TRANSIT)),G.set(w.a.ftStrand,B(P.a.STRAND)),G.set(w.a.ftHelix,B(P.a.HELIX)),G.set(w.a.ftTurn,B(P.a.TURN)),G.set(w.a.pmId,{label:"PubMed ID",render:function(e){var t=e.references.reduce((function(e,t){var n=t.citation.citationXrefs;return n?e.concat(n.filter((function(e){return"PubMed"===e.databaseType}))):e}),[]);return r.a.createElement(l.ExpandableList,null,t.map((function(e){return{id:e.id,content:r.a.createElement(i.Link,{to:"citations/".concat(e.id)},e.id)}})))}}),G.set(w.a.mappedPmId,{label:"Mapped PubMed ID",render:function(){return""}}),G.set(w.a.dateCreate,{label:"Date Created",render:function(e){var t=e[T.a.Sequence].entryAudit;return t&&t.firstPublicDate}}),G.set(w.a.dateMod,{label:"Date Modified",render:function(e){var t=e[T.a.Sequence].entryAudit;return t&&t.lastAnnotationUpdateDate}}),G.set(w.a.dateSeqMod,{label:"Date Sequence Modified",render:function(e){var t=e[T.a.Sequence].entryAudit;return t&&t.lastSequenceUpdateDate}}),G.set(w.a.version,{label:"Version",render:function(e){var t=e[T.a.Sequence].entryAudit;return t&&r.a.createElement(a.Fragment,null,t.entryVersion)}}),G.set(w.a.ftCoiled,B(P.a.COILED)),G.set(w.a.ftCompbias,B(P.a.COMPBIAS)),G.set(w.a.ftDomain,B(P.a.DOMAIN)),G.set(w.a.ftMotif,B(P.a.MOTIF)),G.set(w.a.proteinFamilies,{label:"Protein Families",render:function(e){var t=e[T.a.FamilyAndDomains].commentsData.get(R.a.SIMILARITY);return t&&r.a.createElement(C.b,{comments:t})}}),G.set(w.a.ftRegion,B(P.a.REGION)),G.set(w.a.ftRepeat,B(P.a.REPEAT)),G.set(w.a.ccSimilarity,{label:"Sequence Similarities",render:function(e){var t=e[T.a.FamilyAndDomains].commentsData.get(R.a.SIMILARITY);return t&&r.a.createElement(C.b,{comments:t})}}),G.set(w.a.ftZnFing,B(P.a.ZN_FING)),G.set(w.a.taxId,{label:"Taxon ID",render:function(e){var t=e[T.a.NamesAndTaxonomy].organismData;return t&&r.a.createElement(i.Link,{to:"/taxonomy/".concat(t.taxonId)},t.taxonId)}});Object.values(w.a).filter((function(e){return e.startsWith("dr_")})).forEach((function(e){var t,n=Object(j.f)(e.substring(3));n&&n.name?G.set(e,(t=n.name,{label:"".concat(t," cross-reference"),render:function(e){var n=Object(j.g)(t);if(n){var a=e[n].xrefData.find((function(e){return e.category===j.b.get(t)}));if(a){var o=a.databases.find((function(e){return e.database===t}));return o&&r.a.createElement(x.b,{database:o,primaryAccession:e.primaryAccession})}}}})):console.error("No database found for ".concat(e))}));var H,V,Y=G,K=(n(728),n(730),n(95)),W=n(509),z=function(e){var t,n=e.data,o=y()(n,(function(e){return e.proteinDescription.recommendedName.fullName.value}));o&&(t="".concat(o," · "));var c,i=r.a.createElement(a.Fragment,null,r.a.createElement("a",{href:"#"},y()(n,(function(e){return e.organism.scientificName})))," · ");n.genes&&(c=r.a.createElement(a.Fragment,null,"Gene: ",n.genes.filter((function(e){return e.geneName})).map((function(e){return e.geneName&&e.geneName.value})).join(", ")," · "));var s,l,u="".concat(n.sequence.length," amino-acids · "),m=n.annotationScore,d=r.a.createElement(F.b,{score:m,size:F.a.small});if(n.keywords){var f=Object(L.b)(n.keywords,[W.a.MOLECULAR_FUNCTION,W.a.BIOLOGICAL_PROCESS,W.a.DISEASE]);f.length>0&&(s=f.map((function(e,t){return r.a.createElement(a.Fragment,{key:e.category},t>0&&" · ",r.a.createElement(k.a,{keywords:e.keywords}))})))}var b=y()(n,(function(e){return e.comments[0].commentType}));if(n.comments&&b===R.a.FUNCTION){var p=n.comments[0],v=y()(p,(function(e){return e.texts[0].value}));v&&(l=Object(K.k)(v,150))}return r.a.createElement("div",null,r.a.createElement("h4",null,r.a.createElement(M.b,{primaryAccession:n.primaryAccession,entryType:n.entryType,uniProtId:n.uniProtId})),r.a.createElement("p",null,t,i,c,u,d),r.a.createElement("p",null,l),r.a.createElement("p",null,s))},X=n(544),J=n(66),Z=n(571),$=n(76),Q=n(732);n(733);function ee(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}!function(e){e.domains="domains",e.PTM="PTM",e.variants="variants",e.mutagenesis="mutagenesis",e.activeSites="active sites",e.isoforms="isoforms",e.structures="3D structures",e.disease="disease",e.interactions="interactions",e.subcell="subcellular location",e.publications="reviewed publications"}(V||(V={}));var te=(ee(H={},V.domains,T.a.Function),ee(H,V.PTM,T.a.ProteinProcessing),ee(H,V.variants,T.a.PathologyAndBioTech),ee(H,V.mutagenesis,T.a.PathologyAndBioTech),ee(H,V.activeSites,T.a.Function),ee(H,V.isoforms,T.a.Sequence),ee(H,V.structures,T.a.Structure),ee(H,V.disease,T.a.PathologyAndBioTech),ee(H,V.interactions,T.a.Interaction),ee(H,V.subcell,T.a.SubCellularLocation),ee(H,V.publications,null),H),ne=function(e,t){return e.filter((function(e){return e.type===t})).length},ae=function(e){var t=e.data,n=new Map;if(t.features&&(n.set(V.domains,ne(t.features,P.a.DOMAIN)),n.set(V.PTM,ne(t.features,P.a.MOD_RES)),n.set(V.variants,ne(t.features,P.a.VARIANT)),n.set(V.mutagenesis,ne(t.features,P.a.MUTAGEN)),n.set(V.activeSites,ne(t.features,P.a.ACT_SITE))),t.comments){var a=t.comments.find((function(e){return e.commentType===R.a.ALTERNATIVE_PRODUCTS}));n.set(V.isoforms,a?a.isoforms.length:0);var o=t.comments.find((function(e){return e.commentType===R.a.INTERACTION}));n.set(V.interactions,o?o.interactions.length:0);var c=t.comments.filter((function(e){return e.commentType===R.a.DISEASE}));n.set(V.disease,c.length);var i=t.comments.filter((function(e){return e.commentType===R.a.SUBCELLULAR_LOCATION}));n.set(V.subcell,i.length)}if(t.databaseCrossReferences){var s=t.databaseCrossReferences.filter((function(e){return"PDB"===e.databaseType}));n.set(V.structures,s.length)}return t.references&&n.set(V.publications,t.references.length),r.a.createElement("div",{className:"protein-highlights"},r.a.createElement("h4",null,"Protein Highlights"),Array.from(n.keys()).map((function(e){return 0===n.get(e)?null:r.a.createElement("div",{key:e,className:"protein-highlights__item"},r.a.createElement(Q.HashLink,{to:"/uniprotkb/".concat(t.primaryAccession,"#").concat(te[e])},r.a.createElement(l.Bubble,{value:n.get(e),colourClass:"colour-uniprot-blue"}),e))})))},re=n(628),oe=function(e){var t=e.accession,n=$.a.entry(t),o=Object(Z.a)(n);if(0===Object.keys(o).length)return r.a.createElement(l.Loader,null);var c=Object(X.b)(o),i=r.a.createElement(M.b,{primaryAccession:o.primaryAccession,entryType:o.entryType,uniProtId:o.uniProtId});return r.a.createElement(a.Fragment,null,r.a.createElement(l.Card,{title:i},r.a.createElement(re.b,{transformedData:c}),r.a.createElement(C.b,{comments:c[T.a.FamilyAndDomains].commentsData.get(R.a.SIMILARITY),title:R.a.SIMILARITY.toLowerCase()}),r.a.createElement(ae,{data:o})))},ce=function(e){var t=e.results,n=void 0===t?[]:t,a=e.totalNumberResults,o=e.tableColumns,c=e.selectedEntries,i=e.handleEntrySelection,s=e.handleLoadMoreRows,u=e.handleHeaderClick,m=e.handleCardClick,d=e.sortColumn,f=e.sortDirection,b=e.viewMode,p=e.summaryAccession,y=a>n.length;if(b===J.a.CARD)return r.a.createElement("div",{className:"datalist"},r.a.createElement("div",{className:"datalist__column"},r.a.createElement(l.DataList,{idKey:"primaryAccession",data:n,selectable:!0,selected:c,onSelect:i,dataRenderer:function(e){return r.a.createElement(z,{data:e})},onLoadMoreItems:s,onCardClick:m,hasMoreData:y})),r.a.createElement("div",{className:"datalist__column"},p&&r.a.createElement(oe,{accession:p})));var v=o.map((function(e){var t=Y.get(e);return t?{label:t.label,name:e,render:function(e){return t.render(Object(X.b)(e))},sortable:t.sortable,sorted:e===d&&f}:{label:e,name:e,render:function(){return r.a.createElement("div",{className:"warning"},"".concat(e," has no config"))},sortable:!1,sorted:!1}}));return r.a.createElement(l.DataTable,{idKey:"primaryAccession",columns:v,data:n,selectable:!0,selected:c,onSelect:i,onHeaderClick:u,onLoadMoreItems:s,hasMoreData:y})},ie=n(74),se=function(e){return e.reduce((function(e,t){return"".concat(e," AND (").concat(t.name,":").concat(t.value.indexOf(" ")>=0&&!t.value.match(/^\[.*\]$/)?'"'.concat(t.value,'"'):t.value,")")}),"")},le=function(){return r.a.createElement(a.Fragment,null,r.a.createElement("p",null,"The UniProt Knowledgebase (UniProtKB) is the central hub for the collection of functional information on proteins, with accurate, consistent and rich annotation. In addition to capturing the core data mandatory for each UniProtKB entry (mainly, the amino acid sequence, protein name or description, taxonomic data and citation information), as much annotation information as possible is added."),r.a.createElement("p",null,"UniProtKB consists of two sections:"),r.a.createElement("p",null,"Reviewed (Swiss-Prot) - Manually annotated Records with information extracted from literature and curator-evaluated computational analysis."),r.a.createElement("p",null,"Unreviewed (TrEMBL) - Computationally analyzed Records that await full manual annotation."))},ue={uniprotkb:{name:"UniProtKB",info:r.a.createElement(le,null),links:[{title:"Help",destination:""},{title:"Video",destination:""}]}};function me(e){return(me="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function de(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function fe(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],a=!0,r=!1,o=void 0;try{for(var c,i=e[Symbol.iterator]();!(a=(c=i.next()).done)&&(n.push(c.value),!t||n.length!==t);a=!0);}catch(e){r=!0,o=e}finally{try{a||null==i.return||i.return()}finally{if(r)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function be(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}function pe(e){var t=function(e,t){if("object"!==me(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var a=n.call(e,t||"default");if("object"!==me(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===me(t)?t:String(t)}function ye(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function ve(e){return(ve=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function Ee(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function he(e,t){return(he=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function ge(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var Ae=function(e){function t(e){var n,a,r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),a=this,r=ve(t).call(this,e),n=!r||"object"!==me(r)&&"function"!=typeof r?Ee(a):r,ge(Ee(n),"getURLParams",(function(e){var t=m.a.parse(e),a=t.query,r=t.facets,o=t.sort,c=t.dir,i=[];r&&"string"==typeof r&&(i=n.facetsAsArray(r));var s=c;return{query:a&&"string"==typeof a?a:"",selectedFacets:i,sortColumn:o,sortDirection:s&&ie.b[s]}})),ge(Ee(n),"setURLParams",(function(e,t,a,r){n.props.history.push({pathname:"/uniprotkb",search:["query=".concat(e).concat(n.facetsAsString(t)),"".concat(a?"&sort=".concat(a):""),"".concat(r?"&dir=".concat(r):"")].join("")})})),ge(Ee(n),"handleEntrySelection",(function(e){var t=n.state.selectedEntries;if(e in t){t[e];var a=be(t,[e].map(pe));n.setState({selectedEntries:a})}else t[e]=!0,n.setState({selectedEntries:t})})),ge(Ee(n),"facetsAsString",(function(e){return!e||e.length<=0?"":e.reduce((function(e,t,n){return"".concat(e).concat(n>0?",":"").concat(t.name,":").concat(t.value)}),"&facets=")})),ge(Ee(n),"facetsAsArray",(function(e){return e.split(",").map((function(e){var t=fe(e.split(":"),2);return{name:t[0],value:t[1]}}))})),ge(Ee(n),"addFacet",(function(e,t){var a=n.props.location.search,r=n.getURLParams(a),o=r.query,c=r.selectedFacets,i=r.sortColumn,s=r.sortDirection,l={name:e,value:t};n.setURLParams(o,de(c.concat(l)),i,s)})),ge(Ee(n),"removeFacet",(function(e,t){var a=n.props.location.search,r=n.getURLParams(a),o=r.query,c=r.selectedFacets,i=r.sortColumn,s=r.sortDirection,l=c.findIndex((function(n){return n.name===e&&n.value===t}));c.splice(l,1),n.setURLParams(o,c,i,s)})),ge(Ee(n),"updateColumnSort",(function(e){var t=n.props.location.search,a=n.getURLParams(t),r=a.query,o=a.selectedFacets,c=a.sortColumn,i=a.sortDirection,s=i;e===c&&(s=i===ie.b.ascend?ie.b.descend:ie.b.ascend),n.setURLParams(r,o,e,s)})),n.state={selectedEntries:{}},n}var n,o,c;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&he(e,t)}(t,e),n=t,(o=[{key:"componentDidMount",value:function(){this.updateData()}},{key:"componentDidUpdate",value:function(e){var t=this.props.location.search;e.location.search!==t&&this.updateData()}},{key:"componentWillUnmount",value:function(){(0,this.props.dispatchResetSearchInput)()}},{key:"updateData",value:function(){var e=this.props,t=e.location.search,n=e.tableColumns,a=e.cardColumns,r=e.dispatchFetchBatchOfResultsIfNeeded,o=e.dispatchClearResults,c=this.getURLParams(t),i=c.query,s=c.selectedFacets,l=c.sortColumn,u=c.sortDirection,m=Object(K.g)([].concat(de(a),de(n)));o(),r(function(e,t,n){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:void 0,r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:ie.b.ascend,o=se(n);return Object($.b)("".concat(e).concat(o),t,a,Object(ie.c)(ie.b[r]))}(i,m,s,l,u))}},{key:"render",value:function(){var e=this.props,t=e.location.search,n=e.results,o=e.facets,c=e.isFetching,s=e.dispatchFetchBatchOfResultsIfNeeded,u=e.dispatchUpdateSummaryAccession,m=e.namespace,d=e.nextUrl,f=e.totalNumberResults,p=e.viewMode,y=e.tableColumns,v=e.dispatchSwitchViewMode,E=e.summaryAccession,h=this.state.selectedEntries,g=this.getURLParams(t),A=g.selectedFacets,N=g.sortColumn,S=g.sortDirection;if(c&&!n.length)return r.a.createElement(l.Loader,null);var T=ue[m],I=T.name,D=T.links,P=T.info;return r.a.createElement(a.Fragment,null,r.a.createElement(b.a,{title:r.a.createElement(l.PageIntro,{title:I,links:D,resultsCount:f},P),sidebar:r.a.createElement(l.Facets,{data:o,selectedFacets:A,addFacet:this.addFacet,removeFacet:this.removeFacet}),content:r.a.createElement(a.Fragment,null,n.length>0&&r.a.createElement("div",{className:"button-group"},r.a.createElement("button",{type:"button",className:"button link-button disabled"},"Blast"),r.a.createElement("button",{type:"button",className:"button link-button disabled"},"Align"),r.a.createElement("button",{type:"button",className:"button link-button"},r.a.createElement(l.DownloadIcon,null),"Download"),r.a.createElement("button",{type:"button",className:"button link-button disabled"},r.a.createElement(l.BasketIcon,null),"Add"),r.a.createElement("button",{type:"button",className:"button link-button"},r.a.createElement(l.StatisticsIcon,null),"Statistics"),r.a.createElement("button",{type:"button",className:"button link-button large-icon",onClick:function(){return v()},"data-testid":"table-card-toggle"},r.a.createElement("span",{className:p===J.a.CARD?"link-button-icon__active":""},r.a.createElement(l.TableIcon,null)),r.a.createElement("span",{className:p===J.a.TABLE?"link-button-icon__active":""},r.a.createElement(l.ListIcon,null))),p===J.a.TABLE&&r.a.createElement(i.Link,{to:"/customise-table"},r.a.createElement("button",{type:"button",className:"button link-button"},r.a.createElement(l.EditIcon,null),"Customise data"))),r.a.createElement(ce,{results:n,handleEntrySelection:this.handleEntrySelection,selectedEntries:h,handleHeaderClick:this.updateColumnSort,handleCardClick:u,summaryAccession:E,sortColumn:N,sortDirection:S,handleLoadMoreRows:function(){return s(d)},totalNumberResults:f,tableColumns:y,viewMode:p}))}))}}])&&ye(n.prototype,o),c&&ye(n,c),t}(a.Component),Ne=Object(s.o)(Object(o.b)((function(e){return{namespace:e.query.namespace,tableColumns:e.results.tableColumns,cardColumns:e.results.cardColumns,results:e.results.results.data,facets:e.results.facets,isFetching:e.results.results.isFetching,nextUrl:e.results.nextUrl,totalNumberResults:e.results.totalNumberResults,viewMode:e.results.viewMode,summaryAccession:e.results.summaryAccession}}),(function(e){return Object(c.b)({dispatchFetchBatchOfResultsIfNeeded:function(e){return d.j(e)},dispatchResetSearchInput:function(){return f.u()},dispatchClearResults:function(){return d.i()},dispatchSwitchViewMode:function(){return d.l()},dispatchUpdateSummaryAccession:function(e){return d.m(e)}},e)}))(Ae));t.default=function(){return r.a.createElement(Ne,null)}}}]);