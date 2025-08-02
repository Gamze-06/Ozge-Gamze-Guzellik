let reviews = document.querySelectorAll(".review-card");
let index = 0;

function showReview() {
  reviews.forEach((rev, i) => {
    rev.classList.remove("active");
    if (i === index) rev.classList.add("active");
  });
  index = (index + 1) % reviews.length;
}

function toggleAccordion(button) {
  const content = button.nextElementSibling;

  if (content.style.display === "block") {
    content.style.display = "none";
  } else {
    // diğer açık olanları kapat
    document.querySelectorAll(".accordion-content").forEach(item => item.style.display = "none");
    content.style.display = "block";
  }
}
setInterval(showReview, 4000);

// ----------------------
// Gizli ziyaretçi sayacı (G tuşu ile aç/kapat)
// ----------------------
document.addEventListener("DOMContentLoaded", () => {
  // ✅ Yeni API ile ziyaretçi sayısını artır ve çek
  fetch('https://api.counterapi.dev/v1/ozge-gamze-beauty/visits/up')
    .then(res => res.json())
    .then(data => {
      let counter = document.createElement("div");
      counter.id = "secret-counter";
      counter.style.display = "none";
      counter.style.position = "fixed";
      counter.style.bottom = "10px";
      counter.style.right = "10px";
      counter.style.background = "#f8e6f2";
      counter.style.padding = "8px 12px";
      counter.style.borderRadius = "6px";
      counter.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
      counter.style.fontSize = "14px";
      counter.style.color = "#ee03a0";
      counter.style.zIndex = "9999";
      counter.innerHTML = "👁️ Ziyaretçi Sayısı: <span id='visitor-count'>" + data.count + "</span>";
      document.body.appendChild(counter);
    });
});

// G tuşu ile sayaç göster/gizle
document.addEventListener("keydown", async (e) => {
  if (e.key.toLowerCase() === "g") {
    let counter = document.getElementById("secret-counter");
    if (counter) {
      if (counter.style.display === "none") {
        try {
          // ✅ Güncel veriyi tekrar çek
          let response = await fetch('https://api.counterapi.dev/v1/ozge-gamze-beauty/visits');
          let data = await response.json();
          document.getElementById("visitor-count").innerText = data.count;
        } catch (err) {
          console.error("Sayaç verisi alınamadı:", err);
        }
        counter.style.display = "block";
      } else {
        counter.style.display = "none";
      }
    }
  }
});
