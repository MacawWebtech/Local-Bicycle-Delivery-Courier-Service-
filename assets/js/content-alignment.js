/* Equalize text only among peer cards occupying the same visible row. */
(() => {
  const groups = '.service-grid,.steps,.industries,.testimonial-grid,.zone-grid,.impact-grid,.benefits,.values-grid,.courier-grid,.safety-grid,.community-grid,.delivery-grid,.blog-grid,.topic-grid,.rate-grid,.business-rate-grid,.price-factor-grid,.pricing-grid,.cargo-cards,.contact-card-grid,.planning-grid,.dashboard-metrics,.service-workflow ol,.detail-content,.numbered-benefits';
  let frame, busy = false;
  const original = new Map();
  function align() {
    if (busy) return;
    busy = true;
    original.forEach((value, node) => { node.style.minHeight = value; });
    original.clear();
    document.querySelectorAll(groups).forEach(group => {
      const rows = [];
      [...group.children].filter(card => card.getClientRects().length && getComputedStyle(card).position !== 'absolute').forEach(card => {
        const top = card.offsetTop;
        let row = rows.find(row => Math.abs(row.top - top) < 5);
        if (!row) rows.push(row = {top, cards: []});
        row.cards.push(card);
      });
      rows.filter(row => row.cards.length > 1).forEach(({cards}) => {
        const bodies = cards.map(card => card.querySelector(':scope > .blog-card-body,:scope > .delivery-card-body,:scope > .courier-copy') || card);
        ['.eyebrow','h3','h4','blockquote','p:not(.eyebrow):not(.rate-limit):not(.neighborhood-window):not(.service-benefit)'].forEach(selector => {
          const matches = bodies.map(body => [...body.children].filter(node => node.matches(selector)));
          const count = Math.min(...matches.map(nodes => nodes.length));
          for (let i = 0; i < count; i++) {
            const nodes = matches.map(nodes => nodes[i]);
            if (nodes.some(node => !node.getClientRects().length)) continue;
            const height = Math.max(...nodes.map(node => node.getBoundingClientRect().height));
            nodes.forEach(node => {
              original.set(node, node.style.minHeight);
              node.style.minHeight = `${Math.ceil(height)}px`;
            });
          }
        });
      });
    });
    busy = false;
  }
  function schedule() { cancelAnimationFrame(frame); frame = requestAnimationFrame(align); }
  window.addEventListener('resize', schedule);
  window.addEventListener('load', schedule);
  document.addEventListener('click', schedule);
  document.addEventListener('input', schedule);
  new MutationObserver(schedule).observe(document.querySelector('main') || document.body, {childList:true,subtree:true,attributes:true,attributeFilter:['hidden','class']});
  if (document.fonts) document.fonts.ready.then(schedule);
  schedule();
})();

/* Website-wide entry motion; content stays visible if scripting is unavailable. */
(() => {
 const selector = 'main>section,main>header,main>.dashboard-layout,.footer-grid>div,.hero-photo,.city-photo,.industry-image,.about-story-image,.featured-photo,.inquiry-panel,.request-panel,.login-panel,.service-card,.delivery-card,.blog-card,.courier-card,.rate-card,.neighborhood-card,.active-delivery-card,.values-grid>article,.safety-grid>article,.community-grid>article,.cargo-cards>article,.pricing-grid>article,.topic-grid>article,.contact-card-grid>article,.testimonial-grid>figure,.industries>article,.benefits>article,.steps>article,.steps>li,.zone-grid>article,.impact-grid>article,.planning-grid>article,.price-factor-grid>article,.dashboard-metrics>article,.business-benefit-bar>article,.bicycle-benefits>article,.parcel-rules>article,.coverage-business-cards>article,.numbered-benefits>article,.service-workflow li,.route-story li,.about-milestones li,.column-guidance article,.industry-rows article,.dashboard-box,.contact-office,.contact-hours';
 if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
 const seen = new WeakSet();
 const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
   if (!entry.isIntersecting) return;
   entry.target.classList.add('box-motion-enter');
   entry.target.addEventListener('animationend', event => {
    if (event.target === entry.target) entry.target.classList.remove('box-motion-enter');
   }, {once:true});
   observer.unobserve(entry.target);
  });
 }, {threshold:0});
 function register() {
  document.querySelectorAll(selector).forEach(box => {
   if (!seen.has(box)) { seen.add(box); observer.observe(box); }
  });
 }
 register();
 new MutationObserver(register).observe(document.querySelector('main') || document.body, {childList:true,subtree:true});
})();
