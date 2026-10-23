---
title: Weight Perturbation Research
summary: Investigating how training-time noise changes clean performance and fixed-network weight robustness across CNN architectures.
category: Machine learning research
period: 2026–present
status: Research in progress · runtime verification pending
role: Graduate researcher, Oregon State University
technologies: [Python, PyTorch, TorchVision, CUDA, Slurm, CIFAR]
repository: https://github.com/akaashbella/alpha-sweep-training
priority: 1
figure: research
verified: '2026-10-22'
sources:
  - label: Scientific specification · main-v1
    url: https://github.com/akaashbella/alpha-sweep-training/blob/main/docs/scientific-specification.md
  - label: Functional perturbation implementation
    url: https://github.com/akaashbella/alpha-sweep-training/blob/main/src/alpha_sweep_training/perturbation.py
  - label: Operating guide and verification handoff
    url: https://github.com/akaashbella/alpha-sweep-training/blob/main/docs/operating-guide.md
  - label: Independent robustness evaluation protocol
    url: https://github.com/akaashbella/alpha-sweep-training/blob/main/docs/weight-robustness-evaluation.md
---
## Abstract

How does controlled noise in a network’s weights during training affect what it learns? This project implements an experimental framework for comparing clean classification performance and independently measured weight robustness. The planned study spans two CIFAR datasets, four convolutional architectures, ten perturbation strengths, and three training seeds: 240 training runs.

## Context

Training with perturbed weights and measuring robustness are different experiments. A network can perform well on clean inputs without remaining reliable when its weights are disturbed. The study keeps those questions separate: clean validation selects checkpoints and training alpha; a separately versioned protocol evaluates fixed-network weight perturbations on the test set.

## My role

As a graduate researcher at Oregon State University, I am investigating training-time Gaussian weight perturbation and developing the experiment infrastructure in `alpha-sweep-training`. The public repository documents the scientific contract and source implementation. Source completion is distinct from execution or scientific validation.

## Approach

For each eligible clean weight tensor, the conceptual operation is:

```text
W′ = W + α · σ(W) · ε
ε ~ N(0, I)
σ(W): population standard deviation, correction = 0
```

Every `Conv2d.weight` and `Linear.weight` is eligible, including stems, projections, depthwise and pointwise convolutions, squeeze-and-excitation components, and classifiers. Biases, normalization parameters, and buffers are not directly perturbed. Scale and noise are detached from autograd.

Noise is temporary. Gradients are evaluated at the perturbed weights, then the optimizer updates the clean/master parameters. Noise does not accumulate in stored weights, optimizer state, or checkpoints. At alpha zero, perturbation and noise sampling are bypassed entirely.

## Implementation

The source uses `torch.func.functional_call` to pass temporary parameter views while maintaining gradient ownership of the original parameters and preserving original buffer references. BatchNorm retains its normal training updates. After a forward pass, the implementation checks original parameter and buffer ownership, including exceptional exits.

```python
# Excerpt: src/alpha_sweep_training/perturbation.py
# Inside no_grad; over the entire clean tensor:
torch.std(entry.parameter.detach(), correction=0)
# Tracked addition preserves gradient ownership:
parameters[entry.name] = entry.parameter + offset
```

The broader source includes strict configuration identities, shared CIFAR preparation, scratch model builders, clean evaluation, numerical-failure handling, durable checkpoints and recovery, full-grid manifests, Slurm workflow tracking, and reporting. Reporting is infrastructure for future verified results, not evidence that a study has run.

## Observations and outcomes

The current README describes nine completed source implementation steps. It explicitly states that research computation has not been runtime-verified. Later focused queue-policy checks do not establish research runtime correctness. No completed accuracy table or scientific conclusion is presented here.

The independent evaluation plan specifies one clean and 27 perturbed full-test realizations for each best checkpoint: 28 logical slots per checkpoint and 6,720 across the unchanged 240 training tasks. These are planned coverage counts, not completed experiments.

## Limitations

Training seeds, data normalization policy, scheduler details, and precision/backend settings remain explicit unresolved decisions in the scientific documentation. Source inspection does not demonstrate successful execution, reproducibility on HPC, or improved generalization. No measured results, robustness gains, or publications are claimed.

## References

Read the scientific specification and operating guide linked below for the current contract and unresolved-input handoff. The [research article](/research/) explains the experimental design and provides a standalone mathematical illustration.
