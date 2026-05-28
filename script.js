document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
            
    const title = urlParams.get('title');
    const author = urlParams.get('author');
    const price = urlParams.get('price');
    const img = urlParams.get('img');
    const desc = urlParams.get('desc');

    if(title) {
        document.getElementById('kitapAdi').innerText = title;
        document.getElementById('kitapYazar').innerText = author;
        document.getElementById('kitapFiyat').innerText = price;
        document.getElementById('kitapResim').src = img;
        document.getElementById('kitapResim').alt = title;
        document.getElementById('kitapAciklama').innerText = desc || "Bu kitap için henüz bir açıklama eklenmemiş.";
        document.title = `Bitig | ${title}`; 
    }

    const yardimFormu = document.getElementById('yardimFormu');
    if (yardimFormu) {
        yardimFormu.addEventListener('submit', function(e) {
            e.preventDefault(); // Sayfanın yenilenmesini engeller

            const isim = document.getElementById('adSoyad').value;
            const email = document.getElementById('eposta').value;
            const konu = document.getElementById('yardimKonusu').value;
            const mesaj = document.getElementById('yardimMesaj').value;

            // İstediğin dinamik çıktı metni
            const sonucMetni = `Sayın <strong>${isim}</strong> (${email}), girilen iletişim bilgileriniz sistemimizde güvenle tutulmaktadır. Göndermiş olduğunuz <strong>"${mesaj}"</strong> içerikli <u>${konu}</u> şikayetiniz / talebiniz başarıyla alınmıştır. En kısa sürede inceleme yapılıp tarafınıza dönüş sağlanacaktır.`;

            const sonucKutusu = document.getElementById('yardimSonucKutusu');
            if (sonucKutusu) {
                document.getElementById('yardimSonucMetni').innerHTML = sonucMetni;
                sonucKutusu.style.display = 'block'; // Kutuyu görünür yapar
            }

            // Formu temizle
            yardimFormu.reset();

            // Sonuç kutusuna ekranı kaydır
            sonucKutusu.scrollIntoView({ behavior: 'smooth' });
        });
    }
});

function kategoriSec(kategoriAdi) {
    const selectElement = document.getElementById('yardimKonusu');
    if (selectElement) {
        selectElement.value = kategoriAdi;
    }
    
    const formAlani = document.querySelector('.yardimAlan');
    if (formAlani) {
        formAlani.scrollIntoView({ behavior: 'smooth' });
    }
}
