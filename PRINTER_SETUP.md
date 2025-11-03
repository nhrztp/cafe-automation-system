# Yazıcı Yönlendirme Sistemi (Printer Routing System)

## Genel Bakış

Kafe otomasyon sistemi, siparişleri kategori bazında farklı yazıcılara otomatik olarak yönlendirir.

## Yazıcı Eşleştirmeleri

| Kategori | Yazıcı | Açıklama |
|----------|--------|----------|
| **Sıcak İçecekler** | BAR | Çay, kahve ve sıcak içecekler |
| **Soğuk İçecekler** | BAR | Meşrubat ve soğuk içecekler |
| **Yiyecekler** | MUTFAK | Ana yemekler ve kahvaltı |
| **Tatlılar** | MUTFAK | Tatlı çeşitleri |
| **Nargile** | NARGİLE | Nargile siparişleri |
| **Adisyon/Ödeme** | KASA | Hesap ve ödeme fişleri |

## Nasıl Çalışır?

### 1. Sipariş Oluşturma
Bir sipariş oluşturulduğunda:
- Siparişteki ürünler kategorilerine göre gruplandırılır
- Her kategori grubu için ayrı bir fiş oluşturulur
- Fişler otomatik olarak ilgili yazıcılara gönderilir

**Örnek:**
- Masa 5'e sipariş: 2 Türk Kahvesi, 1 Kola, 1 Tost
  - **BAR yazıcısı**: 2 Türk Kahvesi, 1 Kola
  - **MUTFAK yazıcısı**: 1 Tost

### 2. Fiş İçeriği
Her mutfak/bar fişi şunları içerir:
- Masa numarası
- Sipariş numarası
- Garson adı
- Ürün adı ve miktarı (büyük fontla)
- Tarih ve saat

### 3. Ödeme Fişi
Masa kapatılıp ödeme alındığında:
- Tam adisyon **KASA** yazıcısından yazdırılır
- Tüm ürünler, fiyatlar ve ödeme detayları gösterilir

## Yazıcı Kurulumu

### Windows'ta Yazıcı İsimlendirme
1. **Denetim Masası** > **Aygıtlar ve Yazıcılar**'a gidin
2. Her yazıcıya sağ tıklayıp **"Yazıcı özellikleri"** seçin
3. Yazıcı adlarını aşağıdaki gibi değiştirin:
   - Bar yazıcısı → **BAR**
   - Mutfak yazıcısı → **MUTFAK**
   - Nargile yazıcısı → **NARGİLE**
   - Kasa yazıcısı → **KASA**

### Yazıcı Türleri
- **Termal yazıcılar (80mm)**: Mutfak/Bar fişleri için idealdir
- **Lazer/Inkjet**: Kasa fişleri için kullanılabilir

## Özelleştirme

### Kategori-Yazıcı Eşleştirmesi Değiştirme
`Services/PrinterService.cs` dosyasındaki `GetPrinterForCategory` metodunu düzenleyin:

```csharp
public static string GetPrinterForCategory(string? categoryName)
{
    return categoryName switch
    {
        "Sıcak İçecekler" => "BAR",
        "Soğuk İçecekler" => "BAR",
        "Yiyecekler" => "MUTFAK",
        "Tatlılar" => "MUTFAK",
        "Nargile" => "NARGİLE",
        "YeniKategori" => "YENİ_YAZICI", // Yeni kategori ekle
        _ => "KASA"
    };
}
```

### Fiş Görünümünü Değiştirme
- **Mutfak/Bar fişleri**: `Views/Order/KitchenSlip.cshtml`
- **Ödeme fişi**: `Views/Table/PrintBill.cshtml`

## Sorun Giderme

### Problem: Yazıcı seçimi gösterilmiyor
**Çözüm**: Tarayıcı güvenlik ayarları nedeniyle otomatik yazıcı seçimi kısıtlıdır. Yazdırma dialogunda manuel olarak doğru yazıcıyı seçin.

### Problem: Fişler yazdırılmıyor
**Çözüm**: 
1. Yazıcı adlarının doğru olduğundan emin olun
2. Tarayıcıda pop-up engelleme kapalı olmalı
3. Yazıcıların çevrimiçi olduğunu kontrol edin

### Problem: Yanlış yazıcıya yönlendirme
**Çözüm**: 
1. Ürün kategorilerini kontrol edin
2. `PrinterService.cs` eşleştirmelerini kontrol edin
3. Veritabanındaki kategori isimlerini kontrol edin

## Teknik Detaylar

### Dosyalar
- `Services/PrinterService.cs`: Yazıcı yönlendirme mantığı
- `Controllers/OrderController.cs`: Sipariş ve yazdırma işlemleri
- `Views/Order/KitchenSlip.cshtml`: Mutfak/Bar fiş şablonu
- `Views/Order/PrintTrigger.cshtml`: Çoklu yazıcı tetikleyici
- `Views/Table/PrintBill.cshtml`: Ödeme fişi şablonu
- `wwwroot/js/printer.js`: JavaScript yazıcı yardımcıları

### İş Akışı
1. Sipariş oluşturulur (`OrderController.Create`)
2. Ürünler kategoriye göre gruplandırılır (`PrinterService.GroupOrderItemsByPrinter`)
3. Her grup için ayrı pencere açılır (`PrintTrigger.cshtml`)
4. Her pencere ilgili fişi gösterir ve yazdırma dialogunu açar (`KitchenSlip.cshtml`)
5. Kullanıcı doğru yazıcıyı seçer ve yazdırır

## Notlar
- Fişler otomatik olarak 500ms sonra yazdırma dialogunu açar
- Birden fazla yazıcı grubu varsa, pencereler 800ms aralıklarla açılır
- Yazdırmadan sonra otomatik olana sipariş listesine yönlendirir

