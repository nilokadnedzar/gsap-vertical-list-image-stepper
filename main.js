document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  const words = document.querySelectorAll(".word");
  const images = document.querySelectorAll(".feature-img");
  const indicator = document.querySelector(".line-indicator");

  if (!words.length || !indicator || !images.length) return;

  // Initialize
  gsap.set(words[0], { opacity: 1, x: 6 });
  gsap.set(images[0], { autoAlpha: 1, scale: 1 });
  
  // Sets all the other images invisible
  images.forEach((img, idx) => {
    if (idx !== 0) gsap.set(img, { autoAlpha: 0, scale: 1.04 });
  });

  // Set the scoll bar indicator to the position of the first active element
  gsap.set(indicator, { 
    height: words[0].offsetHeight,
    y: words[0].offsetTop 
  });

  // Initializes the scroll-trigger
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".feature-section",
      start: "top top",
      end: "+=2500",
      scrub: 0.8,
      pin: true,
      anticipatePin: 1
    }
  });

  // Builds up the step animation
  words.forEach((word, index) => {
    if (index === 0) return;

    const prevWord = words[index - 1];
    const currentImg = images[index];
    const prevImg = images[index - 1];

    tl.to(indicator, {
      y: word.offsetTop,
      height: word.offsetHeight,
      duration: 1,
      ease: "none"
    })
      .to(prevWord, { opacity: 0.35, x: 0, duration: 0.5 }, "<")
      .to(word, { opacity: 1, x: 6, duration: 0.5 }, "<")
      .to(prevImg, { autoAlpha: 0, scale: 1.04, duration: 0.5 }, "<")
      .to(currentImg, { autoAlpha: 1, scale: 1, duration: 0.5 }, "<");
  });

  // Click to scroll
  words.forEach((word, index) => {
    word.addEventListener("click", () => {
      const st = tl.scrollTrigger;
      if (!st) return;

      const progress = index / (words.length - 1);
      const targetScroll = st.start + (st.end - st.start) * progress;

      gsap.to(window, {
        scrollTo: targetScroll,
        duration: 0.8,
        ease: "power2.out"
      });
    });
  });
});