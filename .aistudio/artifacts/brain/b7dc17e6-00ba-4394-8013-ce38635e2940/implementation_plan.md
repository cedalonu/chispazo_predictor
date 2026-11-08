# Implementation Plan - Audit and Align Backtesting Chart Data with Historical Simulation Results

## Problem Statement
The user reported that the graphical backtesting charts show values for foci/iterations that do not match the actual historical simulation results recorded in Iteración #6 (or respective iterations). We need to audit and ensure that `fociHist` hit functions (`getHits`) query the exact same data source and properties (`r.sub5Hits`, `r.madreHits`, etc.) as the simulation result tables and historical logs.

## Proposed Changes

### 1. Audit Hit Extractors in `fociHist`
- Ensure that `fociHist` in `FocusGraphicalAnalysisModal` correctly references `r.sub5Hits` for Iteración #6 (Cierre) and respective hit properties for other foci (`r.madreHits`, `r.sub1Hits`, etc.).
- Verify that historical simulation results (`simResults`) are correctly populated and sorted chronologically (`a.num - b.num`) before computing cumulative and non-cumulative series.

### 2. Verify Data Consistency
- Check that the hit calculation function `getHits` for each focus matches the exact logic used in the Iteration #6 results table.
- Verify that cumulative sums and non-cumulative values correctly reflect the last 30 sorted historical draws.

## Verification Plan
- Run `compile_applet` and `lint_applet` to verify zero errors.
- Inspect the backtesting chart data flow in `FocusGraphicalAnalysisModal`.
