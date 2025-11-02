var typed = new Typed("#text",{
    strings:["Backend Engineer","Full Stack Developer","Java Developer","DevOps Engineer"],
    typeSpeed:100,
    backSpeed:100,
    backDelay:1000,
    loop:true
})
vals = [85, 90, 80, 70, 60];
let v = document.querySelectorAll(".Technical-bars .bar .progress-line .fill");
v.forEach((e, i) => {
    e.style.width = vals[i] + "%";
    let p = e.parentElement.parentElement.querySelector(".percent-label");
    p.innerHTML = vals[i] + "%";
});


// Animate technical progress bars when the Skills section enters the viewport.
// Also run immediately if the Skills section is already visible.
(function () {
	const skillsContainer = document.getElementById('Skills');
	if (!skillsContainer) return;

	const bars = skillsContainer.querySelectorAll('.progress-line');

	// Helper: clamp percent to [0,100]
	const clamp = (v) => Math.max(0, Math.min(100, Number(v) || 0));

	// Prepare initial styles so bars are visible and fill uses #0ef
	bars.forEach(bar => {
		const fill = bar.querySelector('.fill');
		if (fill) {
			fill.style.width = '0%';
			fill.style.height = '100%';
			fill.style.background = '#0ef';
			fill.style.borderRadius = '6px';
			fill.style.display = 'block';
			fill.style.transition = 'width 1.2s ease-in-out';
			fill.style.position = 'absolute';
			fill.style.left = '0';
			fill.style.top = '0';
			fill.style.zIndex = '2';
		}
		// ensure wrapper has relative positioning so .fill is positioned correctly
		bar.style.position = 'relative';
		bar.style.overflow = 'hidden';
		// accessibility
		bar.setAttribute('role', 'progressbar');
	});

	const fillBars = () => {
		bars.forEach(bar => {
			const raw = bar.getAttribute('data-progress');
			const percent = clamp(parseInt(raw, 10));
			const fill = bar.querySelector('.fill');
			if (fill) fill.style.width = percent + '%';
			// update the visible percent label (sibling .percent-label)
			const pctSpan = bar.parentElement && bar.parentElement.querySelector('.percent-label');
			if (pctSpan) pctSpan.textContent = percent + '%';
			// update aria value
			bar.setAttribute('aria-valuenow', percent);
		});
	};

	// If IntersectionObserver not supported, just fill immediately
	if (!('IntersectionObserver' in window)) {
		fillBars();
		return;
	}

	// Observe the skillsContainer and fill when it enters the viewport
	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				fillBars();
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.2 });

	observer.observe(skillsContainer);

	// If the skills container is already visible on load, animate immediately
	const rect = skillsContainer.getBoundingClientRect();
	if (rect.top < window.innerHeight && rect.bottom > 0) {
		// small delay to allow paint & transitions to appear smooth
		setTimeout(fillBars, 120);
	}
})();
