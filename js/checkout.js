// --- tombol + dan - di list menu ---
document.querySelectorAll('.menu-card').forEach(card => {
  const minusBtn = card.querySelector('.qty-btn:first-child');
  const plusBtn = card.querySelector('.qty-btn:last-child');
  const qtyText = card.querySelector('.qty-box span');
  const priceEl = card.querySelector('.menu-price');
  const totalText = card.querySelector('.menu-total');

  // Ambil harga satuan
  const priceMatch = priceEl.textContent.match(/Rp\s?([\d\.]+)/);
  const basePrice = priceMatch ? parseInt(priceMatch[1].replace(/\./g, '')) : 0;

  // Set awal qty dan total ke 0 pas reload
  qtyText.textContent = 0;
  totalText.textContent = "Rp0";

  // Fungsi update total harga per menu
  function updateTotal() {
    const qty = parseInt(qtyText.textContent);
    const total = basePrice * qty;
    totalText.textContent = `Rp${total.toLocaleString('id-ID')}`;
  }

  // Tombol +
  plusBtn.addEventListener('click', () => {
    let qty = parseInt(qtyText.textContent);
    qty++;
    qtyText.textContent = qty;
    updateTotal();
  });

  // Tombol -
  minusBtn.addEventListener('click', () => {
    let qty = parseInt(qtyText.textContent);
    if (qty > 0) {
      qty--;
      qtyText.textContent = qty;
      updateTotal();
    }
  });
});


// --- Script logic pilihan metode pembayaran ---
const cardOption = document.getElementById('cardOption');
const otherOption = document.getElementById('otherOption');
const cardForm = document.getElementById('cardForm');
const walletList = document.getElementById('walletList');

cardOption.addEventListener('click', () => {
  cardOption.classList.add('active');
  otherOption.classList.remove('active');
  cardForm.style.display = 'block';
  walletList.style.display = 'none';
});

otherOption.addEventListener('click', () => {
  otherOption.classList.add('active');
  cardOption.classList.remove('active');
  cardForm.style.display = 'none';
  walletList.style.display = 'block';

  const bankSelect = document.getElementById('bankSelect');
  const selectedBankLogo = document.getElementById('selectedBankLogo');
  if (bankSelect) bankSelect.selectedIndex = 0;
  if (selectedBankLogo) selectedBankLogo.style.display = 'none';
  document.querySelectorAll('#cardForm input').forEach(i => i.value = '');
});


// --- Script menampilkan logo bank di dropdown kartu kredit ---
const bankSelect = document.getElementById('bankSelect');
const selectedBankLogo = document.getElementById('selectedBankLogo');

if (bankSelect && selectedBankLogo) {
  bankSelect.addEventListener('change', function () {
    const selectedOption = this.options[this.selectedIndex];
    const logoUrl = selectedOption.getAttribute('data-logo');
    if (logoUrl) {
      selectedBankLogo.querySelector('img').src = logoUrl;
      selectedBankLogo.style.display = 'inline-block';
    } else {
      selectedBankLogo.style.display = 'none';
    }
  });
}