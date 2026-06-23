# SpinBattles Web3 DApp Developer Challenge


## My Solution Notes

### How I connected the flow
- I kept the main reward logic inside `src/lib/hooks/useRewards.ts` so the UI has one place to load balances, load rewards, submit a claim, wait for the transaction, and refresh the screen.
- The backend reward data comes from `fetchUserRewards`, the off-chain balance comes from `fetchUserBalance`, and the token balance comes from `readTokenBalance`.
- After a successful claim, `readTokenBalance` also checks the claimed reward history so the mock on-chain balance increases after the reward is confirmed.

### Bug I found and fixed
- The main bug was in the claim order.
- Before the fix, the app sent the reward to `/api/rewards/claim` right after getting a transaction hash.
- That was too early, because the transaction could still fail while waiting for confirmation.
- If that happened, the backend already marked the reward as claimed, even though the chain transaction failed.
- I fixed it by changing the order in `src/lib/hooks/useRewards.ts`:
  1. Submit the claim transaction.
  2. Save the transaction hash and keep the UI in `pending`.
  3. Wait for `waitForConfirmation(txHash)`.
  4. If it fails, show `failed` and do not update the backend.
  5. If it confirms, then call `postClaimReward`, show `confirmed`, and refresh the data.

### UI changes I made
- The connected wallet now shows the full address instead of a shortened address.
- The wallet card shows a connected badge when the wallet is connected.
- The reward panel shows off-chain balance, on-chain balance, pending reward count, and claimed reward count clearly.
- The claim button is disabled while a claim is pending, so the user cannot double-submit.
- The transaction status now shows the difference between waiting for wallet approval, waiting for chain confirmation, success, and failure.

### How I checked it
- I ran `npx tsc --noEmit` to check TypeScript.
- I ran `npm run build` to make sure the app builds.
- I tested the backend claim API and confirmed the reward moves from pending to claimed only after the claim endpoint is called.
- I also checked that failed transaction handling keeps the reward pending so the user can try again.
# Spinbattles-crypto
# Spinbattles-crypto
# Spinbattles-crypto
# Spinbattles-crypto
