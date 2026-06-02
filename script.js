document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
            
    const title = urlParams.get('title');
    const author = urlParams.get('author');
    const price = urlParams.get('price');
    const img = urlParams.get('img');
    const desc = urlParams.get('desc');

    if(title) {
        if(document.getElementById('kitapAdi')) document.getElementById('kitapAdi').innerText = title;
        if(document.getElementById('kitapYazar')) document.getElementById('kitapYazar').innerText = author;
        if(document.getElementById('kitapFiyat')) document.getElementById('kitapFiyat').innerText = price;
        if(document.getElementById('kitapResim')) {
            document.getElementById('kitapResim').src = img;
            document.getElementById('kitapResim').alt = title;
        }
        if(document.getElementById('kitapAciklama')) document.getElementById('kitapAciklama').innerText = desc || "Bu kitap için henüz bir açıklama eklenmemiş.";
        document.title = `Bitig | ${title}`; 
    }

    
    const yardimFormu = document.getElementById('yardimFormu');
    if (yardimFormu) {
        yardimFormu.addEventListener('submit', function(e) {
            e.preventDefault();

            const isim = document.getElementById('adSoyad').value;
            const email = document.getElementById('eposta').value;
            const konu = document.getElementById('yardimKonusu').value;
            const mesaj = document.getElementById('yardimMesaj').value;

            const sonucMetni = `Sayın <strong>${isim}</strong> (${email}), girilen iletişim bilgileriniz sistemimizde güvenle tutulmaktadır. Göndermiş olduğunuz <strong>"${mesaj}"</strong> içerikli <u>${konu}</u> şikayetiniz / talebiniz başarıyla alınmıştır. En kısa sürede inceleme yapılıp tarafınıza dönüş sağlanacaktır.`;

            const sonucKutusu = document.getElementById('yardimSonucKutusu');
            if (sonucKutusu) {
                document.getElementById('yardimSonucMetni').innerHTML = sonucMetni;
                sonucKutusu.style.display = 'block'; 
            }
            yardimFormu.reset();
            sonucKutusu.scrollIntoView({ behavior: 'smooth' });
        });
    }

    const sepeteEkleBtn = document.querySelector('.sepeteEkle');
    if (sepeteEkleBtn && title) {
        sepeteEkleBtn.addEventListener('click', () => {
            let sepet = JSON.parse(localStorage.getItem('sepet')) || [];
            
            const yeniUrun = {
                baslik: title,
                yazar: author,
                fiyat: price,
                gorsel: img
            };

            sepet.push(yeniUrun);
            localStorage.setItem('sepet', JSON.stringify(sepet));
            alert(`${title} sepetinize eklendi!`);
        });
    }


    const sepetIcerik = document.getElementById('sepetIcerik');
    if (sepetIcerik) {
        let sepet = JSON.parse(localStorage.getItem('sepet')) || [];
        const sepetOzet = document.getElementById('sepetOzet');
        const sepetToplam = document.getElementById('sepetToplam');
        
        let toplamFiyat = 0;

        if (sepet.length === 0) {
            sepetIcerik.innerHTML = "<p class='bos-sepet'>Sepetinizde henüz kitap bulunmuyor.</p>";
            sepetOzet.style.display = 'none';
        } else {
            sepetIcerik.innerHTML = "";
            sepet.forEach((urun) => {
                const fiyatSayi = parseFloat(urun.fiyat.replace(' TL', '')) || 0;
                toplamFiyat += fiyatSayi;

                sepetIcerik.innerHTML += `
                    <div class="sepet-item">
                        <img src="${urun.gorsel}" alt="${urun.baslik}">
                        <div class="sepet-item-detay">
                            <h4>${urun.baslik}</h4>
                            <p>${urun.yazar}</p>
                        </div>
                        <span class="sepet-item-fiyat">${urun.fiyat}</span>
                    </div>
                `;
            });

            sepetToplam.innerText = `${toplamFiyat} TL`;
            sepetOzet.style.display = 'block';
        }

        const sepetKuponInput = document.getElementById('sepetKuponInput');
        const sepetKuponBtn = document.getElementById('sepetKuponBtn');
        const kuponMesaj = document.getElementById('kuponMesaj');
        let kuponUygulandiMi = false;

        if (sepetKuponBtn && sepetKuponInput && kuponMesaj) {
            sepetKuponBtn.addEventListener('click', () => {
                const girilenKod = sepetKuponInput.value.trim().toUpperCase();

                if (kuponUygulandiMi) {
                    kuponMesaj.style.color = "#ff9f1a";
                    kuponMesaj.innerText = "Bu siparişte zaten bir kupon kullandınız.";
                    return;
                }

                if (girilenKod === "BITIG20") {
                    let indirimTutari = toplamFiyat * 0.20; // %20 indirim
                    toplamFiyat = toplamFiyat - indirimTutari;
                    
                    sepetToplam.innerText = `${toplamFiyat.toFixed(2)} TL`;
                    kuponMesaj.style.color = "#28a745";
                    kuponMesaj.innerText = `Tebrikler! %20 indirim uygulandı. (${indirimTutari.toFixed(2)} TL düşüldü)`;
                    kuponUygulandiMi = true;
                    
                    
                    sepetKuponInput.disabled = true;
                    sepetKuponBtn.disabled = true;
                } else {
                    kuponMesaj.style.color = "#ef5350";
                    kuponMesaj.innerText = "Geçersiz veya hatalı kupon kodu!";
                }
            });
        }

        const temizleBtn = document.getElementById('sepetiTemizleBtn');
        if (temizleBtn) {
            temizleBtn.addEventListener('click', () => {
                localStorage.removeItem('sepet');
                location.reload();
            });
        }

        const satinAlBtn = document.getElementById('satinAlBtn');
        const siparisSonucKutusu = document.getElementById('siparisSonucKutusu');

        if (satinAlBtn && siparisSonucKutusu) {
            satinAlBtn.addEventListener('click', () => {
                siparisSonucKutusu.style.display = 'block';
                sepetIcerik.innerHTML = "<p class='bos-sepet'>Sepetinizde henüz kitap bulunmuyor.</p>";
                sepetOzet.style.display = 'none';
                localStorage.removeItem('sepet');
                siparisSonucKutusu.scrollIntoView({ behavior: 'smooth' });
            });
        }
    }

    const aramaKutusu = document.getElementById('arama');
    const aramaButonu = document.querySelector('.arama button');
    
    if (aramaKutusu && aramaButonu) {
        const aramaTetikle = () => {
            const aramaTerimi = aramaKutusu.value.trim();
            if (aramaTerimi !== "") {
                window.location.href = `list.html?search=${encodeURIComponent(aramaTerimi)}`;
            }
        };

        aramaButonu.addEventListener('click', aramaTetikle);
        aramaKutusu.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') aramaTetikle();
        });
    }

    const urlAramaParametresi = new URLSearchParams(window.location.search).get('search');
    if (urlAramaParametresi && window.location.pathname.includes('list.html')) {
        const arananKelime = urlAramaParametresi.toLowerCase();
        const kitapKartlari = document.querySelectorAll('.kitap-kart');

        if (aramaKutusu) aramaKutusu.value = urlAramaParametresi;

        kitapKartlari.forEach(kart => {
            const kitapAdi = kart.querySelector('h3').innerText.toLowerCase();
            const yazarAdi = kart.querySelector('p').innerText.toLowerCase();

            if (kitapAdi.includes(arananKelime) || yazarAdi.includes(arananKelime)) {
                kart.style.display = ''; 
            } else {
                kart.style.display = 'none';  
            }
        });
    }

    
    const oyunBaslatBtn = document.getElementById('oyunBaslatBtn');
    const oyunKitapGörsel = document.getElementById('oyunKitapGörsel');
    const oyunKitapAdi = document.getElementById('oyunKitapAdi');
    const oyunKitapYazar = document.getElementById('oyunKitapYazar');
    const kuponKodu = document.getElementById('kuponKodu');

    const oyunKitaplari = [
        { adi: "Çalıkuşu", yazar: "Reşat Nuri Güntekin", img: "img/kitap1.jpg" },
        { adi: "Yabancı", yazar: "Albert Camus", img: "img/kitap15.jpg" },
        { adi: "Kırmızı Pazartesi", yazar: "Gabriel Garcia Marquez", img: "img/kitap16.jpg" },
        { adi: "Siddhartha", yazar: "Hermann Hesse", img: "img/kitap8.jpg" }
    ];

    if (oyunBaslatBtn) {
        oyunBaslatBtn.addEventListener('click', () => {
            oyunBaslatBtn.disabled = true;
            if(kuponKodu) kuponKodu.style.display = 'none';
            let sayac = 0;

            const efekt = setInterval(() => {
                const rastgeleKitap = oyunKitaplari[Math.floor(Math.random() * oyunKitaplari.length)];
                if(oyunKitapAdi) oyunKitapAdi.innerText = rastgeleKitap.adi;
                if(oyunKitapYazar) oyunKitapYazar.innerText = rastgeleKitap.yazar;
                
                sayac++;
                if (sayac > 10) { 
                    clearInterval(efekt);
                    
                    const sonKitap = oyunKitaplari[Math.floor(Math.random() * oyunKitaplari.length)];
                    if(oyunKitapAdi) oyunKitapAdi.innerHTML = ` Şanslı Kitabın: <strong>${sonKitap.adi}</strong>`;
                    if(oyunKitapYazar) oyunKitapYazar.innerText = sonKitap.yazar;
                    
                    if(kuponKodu) {
                        kuponKodu.innerText = `KUPONUN: BITIG20 (%20 İndirim!)`;
                        kuponKodu.style.display = 'block';
                    }
                    
                    oyunBaslatBtn.disabled = false;
                    oyunBaslatBtn.innerText = "Tekrar Dene!";
                }
            }, 100);
        });
    }
}); 
