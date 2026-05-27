document.addEventListener("DOMContentLoaded", () => {
    // URL'deki parametreleri yakala
    const urlParams = new URLSearchParams(window.location.search);
            
    const title = urlParams.get('title');
    const author = urlParams.get('author');
    const price = urlParams.get('price');
    const img = urlParams.get('img');
    const desc = urlParams.get('desc');

    // Elementler tamamen yüklendikten sonra içlerini doldur
    if(title) {
        document.getElementById('kitapAdi').innerText = title;
        document.getElementById('kitapYazar').innerText = author;
        document.getElementById('kitapFiyat').innerText = price;
        document.getElementById('kitapResim').src = img;
        document.getElementById('kitapResim').alt = title;
        document.getElementById('kitapAciklama').innerText = desc || "Bu kitap için henüz bir açıklama eklenmemiş.";
        document.title = `Bitig | ${title}`; 
    }
});