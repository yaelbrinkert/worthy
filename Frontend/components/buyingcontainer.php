<script src="https://js.stripe.com/v3/"></script>

<aside class="wrapper__order">
    <form id="payment-form">
        <div class="form-group">
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
        <button id="submit-button" class="submit-button" type="submit">Payer</button>
    </form>
</aside>

<script>
    const stripe = Stripe('pk_test_51JPWqLIuG2X5dLxKQhNHn9yQV6gzs87oyT8k2qHwuMhOrZCFpT3F9vXzzWcdJJ02N58eq23DwECJFC0M2s9CT5C100eoFFA0Z9')
    const elements = stripe.elements();

    const cardNumberElement = elements.create('cardNumber', {
  style: {
    base: {
      fontSize: '14px',
      color: '#503618',
      '::placeholder': { color: '#503618' },
    },
  },
});
cardNumberElement.mount('#card-number-element');

const cardExpiryElement = elements.create('cardExpiry', {
    style: {
        base: {
            fontSize: '14px',
            color: '#503618',
            '::placeholder': { color: '#503618'},
        },
    },
});
cardExpiryElement.mount('#card-expiry-element');

const cardCvcElement = elements.create('cardCvc', {
    style: {
        base: {
            fontSize: '14px',
            color: '#503618',
            '::placeholder': { color: '#503618'},
        },
    },
});
cardCvcElement.mount('#card-cvc-element')

// Gestion de la soumission du formulaire
const form = document.getElementById('payment-form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const { paymentMethod, error } = await stripe.createPaymentMethod({
    type: 'card',
    card: cardElement,
  });

  if (error) {
    console.error(error.message);
  } else {
    console.log('Payment Method créé:', paymentMethod.id);
    // Envoyez paymentMethod.id au backend pour confirmer le paiement
  }
});
</script>