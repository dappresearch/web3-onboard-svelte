<script>
    import {provider} from "$lib/stores.js";
    import {loadContract} from "$lib/helpers";
    import {count} from "$lib/stores.js";
    import onboard from "$lib/onboard.js";
    import spinning from "$lib/assets/spinning.gif";
    import Modal from "./Modal.svelte";
    
    let contract;
    let showModal = false;
    let showLoading = false;
    
    const plusOrMinus= async (instruct) => {
        let tx;

        if ($provider) {
            contract = await loadContract($provider);
        } else {
            await onboard.connectWallet();
            contract = await loadContract($provider);
        }

        try {
            showModal = true;
            if (instruct == "plus") {
                tx = await contract.plus();
            } else {
                tx = await contract.minus();
            }
        } catch (error) {
            showModal = false;
            return;
        }

        showModal = false;

        showLoading = true;

        await tx.wait();

        showLoading = false;

        $count = await contract.count();

        console.log(count);

    };
</script>

<div id="app" class="center-container">
    <p>Count: {$count}</p>
    <div class="button-container">
        <button onclick={() => plusOrMinus("plus")}>+</button>
        <button onclick={() => plusOrMinus("minus")}>-</button>
    </div>

    {#if showModal}
        <Modal />
    {/if}

    {#if showLoading}
        <div class="loading-container">
            <img src={spinning} alt="Loading.." class="spinner" />
        </div>
    {/if}
</div>

<style>
    .center-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        text-align: center;
    }

    .button-container {
        margin-top: 20px;
    }

    button {
        margin: 0 10px;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
    }

    p {
        font-size: 18px;
    }

    .spinner {
        width: 50px;
        height: 50px;
        margin-bottom: 15px;
    }

    .loading-container {
        margin-top: 10px;
    }
</style>
