const stepperWidgets = document.querySelectorAll('[data-widget="stepper"]');

stepperWidgets.forEach((widget) => {
  const steps = JSON.parse(widget.dataset.steps || '[]');
  const button = widget.querySelector('[data-step-btn]');
  const text = widget.querySelector('[data-step-text]');
  const indexEl = widget.querySelector('[data-step-index]');
  const viz = widget.closest('.interactive-card')?.querySelector('.viz');
  let idx = 0;

  const update = () => {
    if (!steps.length) return;
    text.textContent = steps[idx];
    indexEl.textContent = `步骤 ${idx + 1}/${steps.length}`;
    if (viz) {
      viz.dataset.state = 'active';
      setTimeout(() => {
        viz.dataset.state = 'idle';
      }, 600);
    }
  };

  button?.addEventListener('click', () => {
    idx = (idx + 1) % steps.length;
    update();
  });

  update();
});

const sliderWidgets = document.querySelectorAll('[data-widget="slider"]');
sliderWidgets.forEach((widget) => {
  const input = widget.querySelector('input[type="range"]');
  const value = widget.querySelector('[data-slider-value]');
  const target = widget.closest('.interactive-card')?.querySelector('.viz');

  const update = () => {
    const current = Number(input.value);
    value.textContent = current;
    if (target) {
      target.style.setProperty('--gate', `${current}%`);
    }
  };

  input?.addEventListener('input', update);
  update();
});

const elizaWidget = document.querySelector('[data-widget="eliza"]');
if (elizaWidget) {
  const input = elizaWidget.querySelector('input');
  const button = elizaWidget.querySelector('button');
  const output = elizaWidget.querySelector('[data-eliza-output]');
  const rules = [
    { keyword: '我', response: '你说“我”，能展开说说这种感受吗？' },
    { keyword: '压力', response: '压力让你最难受的部分是什么？' },
    { keyword: '父母', response: '你和父母的关系在这里起到了什么作用？' },
    { keyword: '工作', response: '你希望工作带给你什么样的满足感？' },
  ];

  button?.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) return;
    const rule = rules.find((item) => text.includes(item.keyword));
    output.textContent = rule
      ? rule.response
      : '请继续描述，我在尝试理解你话语中的重点。';
    input.value = '';
  });
}

const expertWidget = document.querySelector('[data-widget="expert"]');
if (expertWidget) {
  const button = expertWidget.querySelector('button');
  const output = expertWidget.querySelector('[data-expert-output]');
  button?.addEventListener('click', () => {
    const checks = Array.from(expertWidget.querySelectorAll('input[type="checkbox"]'));
    const active = checks.filter((item) => item.checked).map((item) => item.value);
    if (active.includes('latency') && active.includes('memory')) {
      output.textContent = '推理瓶颈: 建议启用缓存或分层检索规则。';
      return;
    }
    if (active.includes('rules') && active.includes('drift')) {
      output.textContent = '知识漂移: 建议补充新规则并安排专家复核。';
      return;
    }
    output.textContent = active.length
      ? '诊断结果: 系统处于可控状态，建议持续观察。'
      : '请选择至少一项症状以触发规则链。';
  });
}

const kmeansWidget = document.querySelector('[data-widget="kmeans"]');
if (kmeansWidget) {
  const button = kmeansWidget.querySelector('button');
  const dots = Array.from(kmeansWidget.querySelectorAll('.kmeans-dots span'));
  const clusters = ['cluster-a', 'cluster-b', 'cluster-c'];
  button?.addEventListener('click', () => {
    dots.forEach((dot) => {
      dot.className = '';
      const pick = clusters[Math.floor(Math.random() * clusters.length)];
      dot.classList.add(pick);
    });
  });
}

const gridWidget = document.querySelector('[data-widget="grid"]');
if (gridWidget) {
  const button = gridWidget.querySelector('button');
  const cells = Array.from(gridWidget.querySelectorAll('.grid-world span'));
  let pos = 0;
  const render = () => {
    cells.forEach((cell, idx) => {
      cell.classList.toggle('active', idx === pos);
    });
  };
  button?.addEventListener('click', () => {
    pos = (pos + 1) % cells.length;
    render();
  });
  render();
}

const attentionWidget = document.querySelector('[data-widget="attention"]');
if (attentionWidget) {
  const button = attentionWidget.querySelector('button');
  const nodes = Array.from(attentionWidget.querySelectorAll('.attention-grid span'));
  button?.addEventListener('click', () => {
    nodes.forEach((node) => node.classList.remove('active'));
    const pick = nodes[Math.floor(Math.random() * nodes.length)];
    pick.classList.add('active');
  });
}

const progressWidget = document.querySelector('[data-widget="progress"]');
if (progressWidget) {
  const button = progressWidget.querySelector('button');
  const bar = progressWidget.querySelector('.progress-track span');
  let value = 0;
  button?.addEventListener('click', () => {
    value = (value + 20) % 120;
    bar.style.width = `${Math.min(value, 100)}%`;
  });
}

const moeWidget = document.querySelector('[data-widget="moe"]');
if (moeWidget) {
  const button = moeWidget.querySelector('button');
  const experts = Array.from(moeWidget.querySelectorAll('.moe-experts span'));
  button?.addEventListener('click', () => {
    experts.forEach((expert) => expert.classList.remove('active'));
    const pick = experts.sort(() => 0.5 - Math.random()).slice(0, 2);
    pick.forEach((expert) => expert.classList.add('active'));
  });
}

const multimodalWidget = document.querySelector('[data-widget="multimodal"]');
if (multimodalWidget) {
  const input = multimodalWidget.querySelector('input[type="range"]');
  const bars = multimodalWidget.querySelectorAll('.dual-track .bar span');
  const label = multimodalWidget.querySelector('[data-align-label]');
  const update = () => {
    const value = Number(input.value);
    bars[0].style.width = `${value}%`;
    bars[1].style.width = `${100 - value}%`;
    label.textContent = value > 60 ? '文本主导' : value < 40 ? '视觉主导' : '平衡对齐';
  };
  input?.addEventListener('input', update);
  update();
}

const treeWidget = document.querySelector('[data-widget="tree"]');
if (treeWidget) {
  const button = treeWidget.querySelector('button');
  const path = treeWidget.querySelector('[data-tree-path]');
  const options = [
    '根节点 → 文本长度 → 情感强度 → 正向推荐',
    '根节点 → 视觉特征 → 纹理密度 → 高风险',
    '根节点 → 互动频率 → 用户分层 → 重点跟进',
  ];
  let idx = 0;
  button?.addEventListener('click', () => {
    idx = (idx + 1) % options.length;
    path.textContent = options[idx];
  });
}
