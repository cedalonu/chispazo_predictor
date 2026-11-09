# Implementation Plan - Increasing Thesis Hit Rate via Advanced ML & Optimization

## Proposed Changes

### 1. Advanced Predictive & Optimization Enhancements (`/src/App.tsx`)
- **Markov Chain Transitions**: Implement second-order Markov chain transition probability weighting $P(X_{t+1} | X_t, X_{t-1})$ for consecutive draws.
- **Genetic Algorithm Weight Evolution**: Introduce an evolutionary weight optimization loop that evolves scoring weights for frequency, gap, and multi-pool intersection.
- **Dynamic Heuristic Thresholds**: Refine sum range [60-90] and parity controls dynamically based on recent volatility.
- **Ensemble ML Scoring**: Combine random forest heuristic scoring with gradient boosting heuristics in `getNumberScore`.

### 2. Thesis Document Integration (`/src/App.tsx`)
- Update `getAssistantExpertResponse` (TESIS 10) to detail these advanced optimization vectors, their backtesting impact, and mathematical formulation in the scientific thesis text.

## Verification Plan
- Run `compile_applet` and `lint_applet` to ensure type safety and correct build.
- Verify TESIS 10 renders correctly with the updated optimization metrics.
