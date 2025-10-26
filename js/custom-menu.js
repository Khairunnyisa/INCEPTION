// ===== KatRing: original logic restored, preview DOM removed =====
const tabs = document.querySelectorAll('.tab');
const menuTitle = document.querySelector('.menu-title');
const menuItems = document.getElementById('menu-items');
const leftImage = document.getElementById('menu-left-image');

// === MENU DATA ===
const menuData = {
  lauk: [
    { name: "Ayam Rica-Rica", price: "$8.2", img: "images/menu/ayam-rica.png" },
    { name: "Opor Ayam", price: "$5", img: "images/menu/opor-ayam.png" },
    { name: "Ayam Goreng", price: "$4", img: "images/menu/ayam-goreng.png" },
    { name: "Ayam Bakar", price: "$6", img: "images/menu/ayam-bakar.png" },
    { name: "Dendeng Balado", price: "$8", img: "images/menu/dendeng-balado.png" },
    { name: "Rendang Padang", price: "$7", img: "images/menu/rendang.png" },
    { name: "Sate Maranggi", price: "$5", img: "images/menu/sate-maranggi.png" },
    { name: "Empal Gepuk", price: "$6", img: "images/menu/empal-gepuk.png" },
    { name: "Perkedel", price: "$3", img: "images/menu/perkedel.png" },
    { name: "Telur Dadar Iris", price: "$4", img: "images/menu/telur-dadar.png" },
    { name: "Telur Balado", price: "$4", img: "images/menu/telur-balado.png" },
    { name: "Bakso Goreng", price: "$5", img: "images/menu/bakso-goreng.png" },
    { name: "Udang Balado", price: "$7", img: "images/menu/udang-balado.png" },
    { name: "Ikan Bakar", price: "$5", img: "images/menu/ikan-bakar.png" },
  ],
  sayur: [
    { name: "Sayur Lodeh", price: "$5.3", img: "images/menu/sayur-lodeh.png" },
    { name: "Tumis Kangkung", price: "$5.3", img: "images/menu/tumis-kangkung.png" },
    { name: "Capcay Kangkung", price: "$5.3", img: "images/menu/capcay-kangkung.png" },
    { name: "Urap", price: "$5.3", img: "images/menu/urap.png" },
    { name: "Tahu Tempe Bacem", price: "$5.3", img: "images/menu/tahu-tempe-bacem.png" },
    { name: "Sayur Asem", price: "$5.3", img: "images/menu/sayur-asem.png" },
  ],
  camilan: [
    { name: "Risol", price: "$5.3", img: "images/menu/risol.png" },
    { name: "Pastel", price: "$5.3", img: "images/menu/pastel.png" },
    { name: "Lemper Ayam", price: "$5.3", img: "images/menu/lemper-ayam.png" },
    { name: "Sosis Solo", price: "$5.3", img: "images/menu/sosis-solo.png" },
    { name: "Bakwan Jagung", price: "$5.3", img: "images/menu/bakwan-jagung.png" },
    { name: "Tahu Isi", price: "$3.3", img: "images/menu/tahu-isi.png" },
  ],
  sambal: [
    { name: "Sambal Terasi", price: "Lv2", img: "images/menu/sambel-terasi.png" },
    { name: "Sambal Ijo", price: "Lv3", img: "images/menu/sambel-ijo.png" },
    { name: "Sambal Matah", price: "Lv3", img: "images/menu/sambel-matah.png" },
  ],
  nasi: [
    { name: "Nasi Putih", price: "$5.3", img: "images/menu/nasi-putih.png" },
    { name: "Nasi Kuning", price: "$5.3", img: "images/menu/nasi-kuning.png" },
    { name: "Nasi Uduk", price: "$5.3", img: "images/menu/nasi-uduk.png" },
    { name: "Nasi Liwet", price: "$5.3", img: "images/menu/nasi-liwet.png" },
  ]
};

// === LOGIC ===
let selectedLauk = []; // preserves selection state for lauk-only
let selectedData = {
  nasi: null,
  lauk: [],
  sayur: [],
  camilan: null,
};

// === CATEGORY LEFT IMAGES (unchanged) ===
const categoryImages = {
  nasi: "menu-click1.png",
  lauk: "menu-click2.png",
  sayur: "menu-click3.png",
  camilan: "menu-click4.png",
  sambal: "menu-click5.png",
};

function renderLaukOptions() {
  menuItems.innerHTML = menuData.lauk
    .map(
      (item) => `
      <label class="lauk-option">
        <input type="checkbox" value="${item.name}" class="lauk-checkbox" ${
        selectedLauk.includes(item.name) ? "checked" : ""
      }>
        <span class="lauk-name">${item.name}</span>
        <span class="lauk-price">${item.price}</span>
      </label>
    `
    )
    .join("");

  document.querySelectorAll(".lauk-checkbox").forEach((box) => {
    box.addEventListener("change", (e) => {
      if (e.target.checked) {
        if (selectedLauk.length >= 2) {
          e.target.checked = false;
          alert("Kamu hanya bisa memilih 2 lauk.");
          return;
        }
        selectedLauk.push(e.target.value);
        // update internal selectedData state
        const item = menuData.lauk.find(i => i.name === e.target.value);
        if (item) selectedData.lauk.push(item);
      } else {
        selectedLauk = selectedLauk.filter((i) => i !== e.target.value);
        selectedData.lauk = selectedData.lauk.filter((i) => i.name !== e.target.value);
      }

      // === AUTO NEXT kalau udah 2 lauk dipilih ===
      if (selectedLauk.length === 2) {
        menuItems.classList.add("fade-out");
        setTimeout(() => {
          goToNextTab("lauk");
        }, 600); // jeda 0.6 detik buat efek loading smooth
      }

      // NOTE: preview DOM has been removed; state is preserved only.
    });
  });
}

function generateCards(items) {
  return items
    .map(
      (item) => `
      <div class="food-card" data-img="${item.img}">
        <img src="${item.img}" alt="${item.name}">
        <p><strong>${item.name}</strong><br>${item.price}</p>
      </div>
    `
    )
    .join("");
}

function updateLayout(category) {
  menuItems.className = "menu-items fade-in"; // tambahin animasi masuk

  switch (category) {
    case "nasi":
      menuTitle.textContent = "Pilih Nasi";
      menuItems.classList.add("layout-nasi");
      menuItems.innerHTML = `
        <div class="food-card" data-img="images/menu/nasi-putih.png">
          <img src="images/menu/nasi-putih.png" alt="Nasi Putih" />
          <p><strong>Nasi Putih</strong><br />$5.3</p>
        </div>
        <div class="food-card" data-img="images/menu/nasi-kuning.png">
          <img src="images/menu/nasi-kuning.png" alt="Nasi Kuning" />
          <p><strong>Nasi Kuning</strong><br />$5.3</p>
        </div>
        <div class="food-card" data-img="images/menu/nasi-uduk.png">
          <img src="images/menu/nasi-uduk.png" alt="Nasi Uduk" />
          <p><strong>Nasi Uduk</strong><br />$5.3</p>
        </div>
        <div class="food-card" data-img="images/menu/nasi-liwet.png">
          <img src="images/menu/nasi-liwet.png" alt="Nasi Liwet" />
          <p><strong>Nasi Liwet</strong><br />$5.3</p>
        </div>
      `;
      break;

    case "lauk":
      menuTitle.textContent = "Pilih Lauk (2)";
      menuItems.classList.add("layout-lauk-checkbox");
      renderLaukOptions();
      break;

    case "sayur":
      menuTitle.textContent = "Pilih Sayur";
      menuItems.classList.add("layout-sayur");
      menuItems.innerHTML = generateCards(menuData.sayur);
      break;

    case "camilan":
      menuTitle.textContent = "Pilih Camilan";
      menuItems.classList.add("layout-camilan");
      menuItems.innerHTML = generateCards(menuData.camilan);
      break;

    case "sambal":
      menuTitle.textContent = "Pilih Sambal";
      menuItems.classList.add("layout-sambal");
      menuItems.innerHTML = generateCards(menuData.sambal);
      break;
  }

  // === AUTO NEXT untuk kategori non-lauk ===
  if (category !== "lauk") {
    document.querySelectorAll(".food-card").forEach((card) => {
      card.addEventListener("click", () => {
        // preserve state: map clicked card to item and store it, but DO NOT render preview DOM
        const cat = category;
        const name = card.querySelector("strong")?.textContent?.trim();
        const item = (menuData[cat] || []).find(i => i.name === name);
        if (item) {
          if (cat === 'nasi') selectedData.nasi = item;
          else if (cat === 'sayur') selectedData.sayur = [item];
          else if (cat === 'camilan') selectedData.camilan = item;
          else if (cat === 'sambal') selectedData.sambal = item;
        }

        menuItems.classList.add("fade-out");
        setTimeout(() => {
          goToNextTab(category);
        }, 600);
      });
    });
  }
}

// === TAB INTERACTION ===
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelector(".tab.active").classList.remove("active");
    tab.classList.add("active");
    const category = tab.dataset.category;
    // update leftImage for category
    leftImage.src = `images/menu/${categoryImages[category]}`;
    updateLayout(category);
  });
});

// === DEFAULT ===
document.addEventListener("DOMContentLoaded", () => {
  // set initial left image (unchanged)
  leftImage.src = `images/menu/${categoryImages['nasi']}`;
  updateLayout("nasi");
});

function goToNextTab(currentCategory) {
  const categories = ["nasi", "lauk", "sayur", "camilan", "sambal"];
  const currentIndex = categories.indexOf(currentCategory);
  const nextCategory = categories[currentIndex + 1];

  if (nextCategory) {
    const nextTab = document.querySelector(`.tab[data-category="${nextCategory}"]`);
    if (nextTab) nextTab.click();
  }
}
