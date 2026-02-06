const animationWidgets = document.querySelectorAll('[data-widget="anim"]');

animationWidgets.forEach((widget) => {
  const steps = JSON.parse(widget.dataset.steps || '[]');
  const interval = Number(widget.dataset.interval || 1200);
  const label = widget.querySelector('[data-step-label]');
  const counter = widget.querySelector('[data-step-count]');
  const startBtn = widget.querySelector('[data-action="start"]');
  const pauseBtn = widget.querySelector('[data-action="pause"]');
  const resetBtn = widget.querySelector('[data-action="reset"]');
  const activatable = Array.from(widget.querySelectorAll('[data-steps]'));
  const valueTargets = Array.from(widget.querySelectorAll('[data-values]'));
  const classTargets = Array.from(widget.querySelectorAll('[data-classes]'));
  const progressTargets = Array.from(widget.querySelectorAll('[data-progress]'));
  let index = 0;
  let timer = null;

  const parseSteps = (value) =>
    value
      .split(',')
      .map((item) => Number(item.trim()))
      .filter((item) => Number.isFinite(item));

  const applyStep = () => {
    if (!steps.length) return;
    if (label) {
      label.textContent = steps[index];
    }
    if (counter) {
      counter.textContent = `步骤 ${index + 1}/${steps.length}`;
    }

    activatable.forEach((element) => {
      const activeSteps = parseSteps(element.dataset.steps || '');
      element.classList.toggle('is-active', activeSteps.includes(index + 1));
    });

    valueTargets.forEach((element) => {
      const values = JSON.parse(element.dataset.values || '[]');
      const value = values[index] ?? values[values.length - 1] ?? '';
      element.textContent = value;
    });

    classTargets.forEach((element) => {
      const classes = JSON.parse(element.dataset.classes || '[]');
      const next = classes[index] ?? classes[classes.length - 1] ?? '';
      const base = element.dataset.base || '';
      element.className = `${base} ${next}`.trim();
    });

    progressTargets.forEach((element) => {
      const progress = ((index + 1) / steps.length) * 100;
      element.style.width = `${progress}%`;
    });
  };

  const next = () => {
    index = (index + 1) % steps.length;
    applyStep();
  };

  const start = () => {
    if (timer || !steps.length) return;
    timer = setInterval(next, interval);
  };

  const pause = () => {
    if (!timer) return;
    clearInterval(timer);
    timer = null;
  };

  const reset = () => {
    pause();
    index = 0;
    applyStep();
  };

  startBtn?.addEventListener('click', start);
  pauseBtn?.addEventListener('click', pause);
  resetBtn?.addEventListener('click', reset);

  applyStep();
});
