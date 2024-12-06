<script>
    import spinning from '$lib/assets/spinning.gif';
</script>

<div class="modal">
    <div class="modal-content">
        <p>Waiting for signature.</p>
        <img src={spinning} alt="Loading.." class="spinner" />
    </div>
</div>

<style>
.modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal-content {
        background: white;
        padding: 20px;
        border-radius: 8px;
        text-align: center;
        width: 300px;
    }

    .spinner {
    width: 50px;
    height: 50px;
    margin-bottom: 15px;
}
</style>