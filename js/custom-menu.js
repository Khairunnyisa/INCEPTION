// === DOM ELEMENTS ===
const tabs = document.querySelectorAll('.tab');
const menuTitle = document.querySelector('.menu-title');
const menuItems = document.getElementById('menu-items');
const selectedItemsContainer = document.getElementById('selected-items');

// === MENU DATA ===
const menuData = {
  lauk: [
    { name: "Ayam Rica-Rica", price: 8200, img: "images/menu/ayam-rica.png" },
    { name: "Opor Ayam", price: 5000, img: "images/menu/opor-ayam.png" },
    { name: "Ayam Goreng", price: 4000, img: "images/menu/ayam-goreng.png" },
    { name: "Ayam Bakar", price: 6000, img: "images/menu/ayam-bakar.png" },
    { name: "Dendeng Balado", price: 8000, img: "images/menu/dendeng-balado.png" },
    { name: "Rendang Padang", price: 7000, img: "images/menu/rendang.png" },
    { name: "Sate Maranggi", price: 5000, img: "images/menu/sate-maranggi.png" },
    { name: "Empal Gepuk", price: 6000, img: "images/menu/empal-gepuk.png" },
    { name: "Perkedel", price: 3000, img: "images/menu/perkedel.png" },
    { name: "Telur Dadar Iris", price: 4000, img: "images/menu/telur-dadar.png" },
    { name: "Telur Balado", price: 4000, img: "images/menu/telur-balado.png" },
    { name: "Bakso Goreng", price: 5000, img: "images/menu/bakso-goreng.png" },
    { name: "Udang Balado", price: 7000, img: "images/menu/udang-balado.png" },
    { name: "Ikan Bakar", price: 5000, img: "images/menu/ikan-bakar.png" },
  ],
  sayur: [
    { name: "Sayur Lodeh", price: 5300, img: "images/menu/sayur-lodeh.png" },
    { name: "Tumis Kangkung", price: 5300, img: "images/menu/tumis-kangkung.png" },
    { name: "Capcay Kangkung", price: 5300, img: "images/menu/capcay-kangkung.png" },
    { name: "Urap", price: 5300, img: "images/menu/urap.png" },
    { name: "Tahu Tempe Bacem", price: 5300, img: "images/menu/tahu-tempe-bacem.png" },
    { name: "Sayur Asem", price: 5300, img: "images/menu/sayur-asem.png" },
  ],
  camilan: [
    { name: "Risol", price: 5300, img: "images/menu/risol.png" },
    { name: "Pastel", price: 5300, img: "images/menu/pastel.png" },
    { name: "Lemper Ayam", price: 5300, img: "images/menu/lemper-ayam.png" },
    { name: "Sosis Solo", price: 5300, img: "images/menu/sosis-solo.png" },
    { name: "Bakwan Jagung", price: 5300, img: "images/menu/bakwan-jagung.png" },
    { name: "Tahu Isi", price: 3300, img: "images/menu/tahu-isi.png" },
  ],
  sambal: [
    { name: "Sambal Terasi", price: "Lv2", img: "images/menu/sambel-terasi.png" },
    { name: "Sambal Ijo", price: "Lv3", img: "images/menu/sambel-ijo.png" },
    { name: "Sambal Matah", price: "Lv3", img: "images/menu/sambel-matah.png" },
  ],
  nasi: [
    { name: "Nasi Putih", price: 5300, img: "images/menu/nasi-putih.png" },
    { name: "Nasi Kuning", price: 5300, img: "images/menu/nasi-kuning.png" },
    { name: "Nasi Uduk", price: 5300, img: "images/menu/nasi-uduk.png" },
    { name: "Nasi Liwet", price: 5300, img: "images/menu/nasi-liwet.png" },
  ]
};

// === FORMAT RUPIAH ===
function formatRupiah(amount) {
  if (isNaN(amount)) return amount;
  return "Rp" + parseInt(amount).toLocaleString("id-ID");
}

// === STATE ===
let selectedData = {
  nasi: null,
  lauk: [],
  sayur: null,
  camilan: null,
  sambal: null,
};

// === POSISI ITEM DI PIRING ===
const positions = {
  nasi: { top: 410, left: 355 },
  lauk: [
    { top: 290, left: 300 },
    { top: 345, left: 230 }
  ],
  sayur: { top: 320, left: 450 },
  camilan: { top: 480, left: 450 },
  sambal: { top: 495, left: 270 }
};

// === RENDER LAUK OPTIONS ===
function renderLaukOptions() {
  menuItems.innerHTML = menuData.lauk.map(item => `
    <label class="lauk-option">
      <input type="checkbox" value="${item.name}" class="lauk-checkbox" ${selectedData.lauk.some(i => i.name === item.name) ? "checked" : ""}>
      <span class="lauk-name">${item.name}</span>
      <span class="lauk-price">${formatRupiah(item.price)}</span>
    </label>
  `).join("");

  document.querySelectorAll(".lauk-checkbox").forEach(box => {
    box.addEventListener("change", (e) => {
      const value = e.target.value;
      const item = menuData.lauk.find(i => i.name === value);
      if (e.target.checked) {
        if (selectedData.lauk.length >= 2) {
          e.target.checked = false;
          alert("Kamu hanya bisa memilih 2 lauk.");
          return;
        }
        selectedData.lauk.push(item);
      } else {
        selectedData.lauk = selectedData.lauk.filter(i => i.name !== value);
      }
      updatePlate();
      if (selectedData.lauk.length === 2) setTimeout(() => goToNextTab("lauk"), 500);
    });
  });
}

// === GENERATE CARDS ===
function generateCards(items, category) {
  return items.map(item => `
    <div class="food-card" data-category="${category}">
      <img src="${item.img}" alt="${item.name}">
      <p><strong>${item.name}</strong><br>${formatRupiah(item.price)}</p>
    </div>
  `).join("");
}

// === UPDATE LAYOUT ===
function updateLayout(category) {
  menuItems.className = "menu-items fade-in";
  switch (category) {
    case "nasi":
      menuTitle.textContent = "Pilih Nasi →";
      menuItems.className = "menu-items layout-nasi fade-in";
      menuItems.innerHTML = generateCards(menuData.nasi, "nasi");
      break;
    case "lauk":
      menuTitle.textContent = "Pilih Lauk (maks. 2) →";
      menuItems.className = "menu-items layout-lauk-checkbox fade-in";
      renderLaukOptions();
      return;
    case "sayur":
      menuTitle.textContent = "Pilih Sayur →";
      menuItems.className = "menu-items layout-sayur fade-in";
      menuItems.innerHTML = generateCards(menuData.sayur, "sayur");
      break;
    case "camilan":
      menuTitle.textContent = "Pilih Camilan →";
      menuItems.className = "menu-items layout-camilan fade-in";
      menuItems.innerHTML = generateCards(menuData.camilan, "camilan");
      break;
    case "sambal":
      menuTitle.textContent = "Pilih Sambal →";
      menuItems.className = "menu-items layout-sambal fade-in";
      menuItems.innerHTML = generateCards(menuData.sambal, "sambal");
      break;
  }

  setTimeout(() => {
    document.querySelectorAll(".food-card").forEach(card => {
      card.addEventListener("click", () => {
        const catKey = category;
        const name = card.querySelector("strong").textContent;
        const item = menuData[catKey].find(i => i.name === name);
        selectedData[catKey] = item;
        updatePlate();
        setTimeout(() => goToNextTab(catKey), 500);
      });
    });
  }, 50);
}

// === UPDATE PLATE ===
function updatePlate() {
  selectedItemsContainer.innerHTML = "";

  Object.entries(selectedData).forEach(([cat, val]) => {
    if (Array.isArray(val)) {
      val.forEach((item, i) => {
        const img = document.createElement("img");
        img.src = item.img;
        img.style.position = "absolute";
        img.style.top = `${positions[cat][i].top}px`;
        img.style.left = `${positions[cat][i].left}px`;
        selectedItemsContainer.appendChild(img);
      });
    } else if (val) {
      const img = document.createElement("img");
      img.src = val.img;
      img.style.position = "absolute";
      img.style.top = `${positions[cat].top}px`;
      img.style.left = `${positions[cat].left}px`;
      selectedItemsContainer.appendChild(img);
    }
  });
}

// === TAB INTERACTION ===
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelector(".tab.active")?.classList.remove("active");
    tab.classList.add("active");
    updateLayout(tab.dataset.category);
  });
});

// === DEFAULT LOAD ===
document.addEventListener("DOMContentLoaded", () => {
  updateLayout("nasi");
  updatePlate();
});

// === AUTO NEXT TAB ===
function goToNextTab(currentCategory) {
  const categories = ["nasi", "lauk", "sayur", "camilan", "sambal"];
  const idx = categories.indexOf(currentCategory);
  const next = categories[idx + 1];
  if (!next) return;
  document.querySelector(`.tab[data-category="${next}"]`)?.click();
}