<script>
  import onboard from "$lib/onboard.js";
  import { contAddr, abi, loadContract } from "$lib/helpers.js";
  import { provider, count } from "$lib/stores.js";

  let errorMsg = "Problem connection, please try again.";
  let connectError;

  const sepoliaChainId = "0xAA36A7"; // Sepolia Chain ID in hexadecimal (11155111 in decimal)

  const infuraId = import.meta.env.INFURA_ID; // Load from .env

  // Subscribe to wallet updates
  const wallets$ = onboard.state.select("wallets");
  // The first wallet in the array of connected wallet
  $: connectedAccount = $wallets$?.[0]?.accounts?.[0];

  $: account = connectedAccount?.ens?.name
    ? {
        ens: connectedAccount?.ens,
        address: connectedAccount?.address,
      }
    : { address: connectedAccount?.address };

  $: provider.set($wallets$?.[0]?.provider);

  const sepoliaChainParams = {
    chainId: sepoliaChainId,
    chainName: "Sepolia Testnet",
    nativeCurrency: {
      name: "SepoliaETH",
      symbol: "ETH", // Symbol of the native currency
      decimals: 18,
    },
    rpcUrls: [`https://sepolia.infura.io/v3/${infuraId}`], // Replace with a valid RPC URL
    blockExplorerUrls: ["https://sepolia.etherscan.io"], // Replace with a valid explorer URL
  };
  
  const switchOrAddChain = async () => {
    try {
      await $wallets$?.[0]?.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: sepoliaChainId }],
      });
      console.log("Switched to Sepolia network");
    } catch (error) {
      // If the chain is not added to the wallet, add it
      if (error.code === 4902) {
        try {
          await $wallets$?.[0]?.provider.request({
            method: "wallet_addEthereumChain",
            params: [sepoliaChainParams],
          });
          console.log("Sepolia chain added and switched");
        } catch (addError) {
          console.error("Failed to add Sepolia chain", addError);
        }
      } else {
        console.error("Failed to switch to Sepolia chain", error);
      }
    }
  };

  const connect = async () => {
    await onboard.connectWallet();

    await switchOrAddChain();

    let contract;

    if (!$provider) {
      connectError = errorMsg;
    }

    try {
      contract = await loadContract($provider);
      const countValue = await contract.count();
      $count = countValue;
    } catch (error) {
      connectError = errorMsg;
      console.error("Error loding contract");
    }
  };

  const disconnect = ({ label }) => {
    onboard.disconnectWallet({ label });
  };
</script>

{#if $provider}
  <div class="account-container">
    <div class="address-container">
      <span class="address">{account.address.slice(0, 6)}...{account.address.slice(-4)}</span>
      <button class="copy-btn" onclick={() => navigator.clipboard.writeText(account.address)} title="Copy Address">
        📋
      </button>
    </div>
    <button class="disconnect-btn" onclick={disconnect($wallets$?.[0])}>Disconnect</button>
  </div>
{:else}
  <div>
    <button class="connect-btn" onclick={connect}> Connect </button>
  </div>
{/if}

{#if connectError}
  <p>{connectError}</p>
{/if}

<style>
  .connect-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 8px 16px;
    background-color: #6b9e64;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .connect-btn:hover {
    background-color: #5b8b55;
  }

  .disconnect-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 8px 16px;
    background-color: #ff4c4c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .disconnect-btn:hover {
    background-color: #ff6666;
  }

  .account-container {
    position: relative;
    padding: 20px;
  }

  .address-container {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    gap: 5px;
  }

  .address {
    font-family: monospace;
    font-size: 16px;
    color: #333;
  }

  .copy-btn {
    background-color: #ddd;
    border: none;
    border-radius: 4px;
    padding: 4px 8px;
    cursor: pointer;
  }

  .copy-btn:hover {
    background-color: #ccc;
  }
</style>
