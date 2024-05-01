// Configurar a chave pública do Mercado Pago
const publicKey = 'TEST-cde3776a-77e9-4a70-9da2-414f9104e199';

// Verificar se a chave pública foi inserida
if (!publicKey) {
  console.error('Chave pública do Mercado Pago não foi definida.');
}

// Verificar se o Mercado Pago SDK foi carregado corretamente
if (typeof Mercadopago === 'undefined') {
  console.error('SDK do Mercado Pago não foi carregado corretamente.');
} else {
  // Inicializar o Mercado Pago
  Mercadopago.setPublishableKey(publicKey);

  document.getElementById('generate-qr-code').addEventListener('click', function() {
    console.log('Botão de gerar QR Code clicado.');

    const amount = document.getElementById('amount').value;

    // Chamar a API do Mercado Pago para gerar o QR Code
    Mercadopago.createPayment({
      transaction_amount: Number(amount),
      description: 'Descrição do pagamento',
      payment_method_id: 'qr',
    }, function(response) {
      if (response.status === 200) {
        const qrCode = response.body.secure_thumbnail;
        document.getElementById('qr-code').innerHTML = `<img src="${qrCode}" alt="QR Code">`;
      } else {
        alert('Erro ao gerar QR Code');
      }
    });
  });

  document.getElementById('card-payment').addEventListener('click', function() {
    console.log('Botão de pagamento com cartão de crédito clicado.');

    const amount = document.getElementById('amount').value;

    // Redirecionar para a página de pagamento do Mercado Pago para pagamento com cartão de crédito
    window.location.href = `https://www.mercadopago.com/mlb/checkout/start?pref_id=${amount}`;
  });
}
