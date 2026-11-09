# Implementation Plan - Strict Temporal Audit (Cut-off at t-1)

## Objective
Implement a rigorous temporal audit in the scientific thesis and historical backtesting loop to guarantee that predictions for any draw $t$ use strictly data prior to draw $t$ ($t-1$ cut-off), ensuring zero look-ahead bias ("para contestar un examen no se deben conocer las respuestas").

## Proposed Changes

### 1. Temporal Cut-off Enforcement in Historical Loops (`src/App.tsx`)
- Update `getAssistantExpertResponse` historical backtesting (`last30` and `last20` iteration loops) to explicitly slice data strictly up to index `histIdx` (data prior to draw $d.num$).
- Remove any score weighting based on `isRealWinner` in historical simulation loops so that historical backtesting operates purely with blind, out-of-sample temporal prediction ($t-1$ cutoff).
- Add an explicit **"Auditoría de Temporalidad (Cut-off t-1)"** section to the thesis document, verifying that for every historical draw evaluated, index data strictly excludes the target draw.

### 2. Thesis Document Update (`getAssistantExpertResponse`)
- Add Section **7. AUDITORÍA DE RIGOR TEMPORAL Y CERO SESGO DE FUTURO (CUT-OFF t-1)** detailing the chronological index verification, out-of-sample validation, and cryptographic cut-off timestamp verification.

## Verification Plan
- Run `compile_applet` and `lint_applet` to ensure zero compilation or type errors.
- Verify in the thesis document that temporal cut-offaudit logs are correctly displayed.
