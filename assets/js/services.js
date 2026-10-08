/* Native disclosures are keyboard accessible; links open the relevant guide. */
'use strict';
function revealServiceGuide(){const id=window.location.hash.slice(1);if(!id)return;const guide=document.getElementById(id);if(guide?.classList.contains('service-detail')){guide.open=true;guide.scrollIntoView({block:'start',behavior:'auto'});}}
window.addEventListener('hashchange',revealServiceGuide);
revealServiceGuide();
