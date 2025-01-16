<script src="https://js.stripe.com/v3/"></script>
<script src="../assets/js/order.js"></script>

<aside class="wrapper__order">
    <span class="close__order"><i class="fa fa-xmark"></i> Fermer</span>
    <form id="payment-form" class="form-order">
        <!-- <div class="form-group">
            <label for="cardholder-name">Nom du titulaire</label>
            <input type="text" id="cardholder-name" class="cardholder-name" placeholder="Jean Dupont" required>
        </div>
        <div class="form-group">
            <label for="card-number">Numéro de carte</label>
            <div id="card-number-element"></div>
        </div>
        <div class="form-group">
            <label for="card-expiry">Date d'expiration</label>
            <div id="card-expiry-element"></div>
        </div>
        <div class="form-group">
            <label for="card-cvc">Code CVC</label>
            <div id="card-cvc-element"></div>
        </div>
        <button id="submit-button" class="submit-button" type="submit">Payer</button> -->
        <div id="payment-element">
        </div>
        <button id="submit">
            <div class="spinner hidden" id="spinner"></div>
            <span id="button-text" class="button-order">Acheter</span>
        </button>
        <div id="payment-message" class="hidden"></div>
    </form>
</aside>