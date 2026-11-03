# Implementation Plan - Dynamic Threshold Adjustment for Iteration #6

## Objective
Implement an automatic adjustment mechanism in Iteration #6 (Subescenario 5) to dynamically calibrate the combined frequency threshold whenever the resulting number count deviates by more than 10% from the target average of 12 numbers.

## Proposed Changes
1. **Frontend (`/src/App.tsx`)**:
   - Enhance `liveTargetResult` and backsimulation loops where `sub5Filtered` is calculated.
   - Calculate the current size of `sub5Filtered`. If deviation from 12 exceeds 10% (i.e. outside [11, 13] or [10, 14]), dynamically adjust frequency acceptance criteria or fallback slice sorting based on ML score and combined frequency weights.
   - Add visual indicator in the Iteration #6 card showing the dynamic adjustment status and active deviation correction.

## Verification Plan
- Run `compile_applet` to ensure TypeScript and Vite build succeeds without errors.
- Verify in browser preview that Iteration #6 correctly targets ~12 numbers with automatic threshold tuning.
