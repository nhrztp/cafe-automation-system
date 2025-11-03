# 🖥️ İki Bilgisayarlı Kafe Otomasyon Kurulumu

Bu rehber, kafenizde 2 bilgisayar kullanımı için sistem kurulumunu açıklar:

- **Ana Bilgisayar (Admin)**: Tüm özellikler
- **POS Bilgisayarı (Garson)**: Sadece sipariş alma

## 📋 Gereksinimler

- 2 bilgisayar aynı yerel ağda
- SQLite veritabanı (network path üzerinde paylaşılacak)

## 🔧 Kurulum Adımları

### 1. Ana Bilgisayarda Kurulum

1. Projeyi çalıştırın ve veritabanını oluşturun:

```bash
cd KafeOtomasyon
dotnet run
```

2. Veritabanı dosyası `cafe.db` oluşturuldu
3. Bu dosyayı ağda paylaşılan bir klasöre kopyalayın (örn: `\\SERVER\kafe\cafe.db`)

### 2. Ağda Veritabanı Paylaşımı (Windows)

**Seçenek 1: Network Share (Önerilen)**

1. Veritabanı dosyasını ağda paylaşılan bir klasöre koyun
2. Her bilgisayarda connection string'i güncelleyin:

`appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=//SERVER/kafe/cafe.db"
  }
}
```

**Seçenek 2: Dropbox/OneDrive**

1. Veritabanını bulut depolamaya yükleyin
2. Her bilgisayarda senkronize edin
3. Connection string'i güncelleyin

### 3. İkinci Bilgisayarda Kurulum

1. Aynı projeyi ikinci bilgisayara kopyalayın
2. `appsettings.json` dosyasını veritabanı path'i için güncelleyin
3. Çalıştırın:

```bash
cd KafeOtomasyon
dotnet run
```

### 4. Kullanıcı Hesapları Oluşturma

**Admin Kullanıcı (Ana Bilgisayar):**

- Kullanıcı: `admin`
- Şifre: `admin123`
- Role: `admin`

**POS Kullanıcı (Garson Bilgisayarı):**
Yeni kullanıcı eklemek için veritabanına manuel olarak ekleyebilir veya kodda ekleyebilirsiniz:

```csharp
// Veritabanına garson kullanıcısı ekle
var waiter = new User
{
    Username = "garson1",
    Password = BCrypt.Net.BCrypt.HashPassword("garson123"),
    Role = "staff",
    Name = "Garson 1"
};
_context.Users.Add(waiter);
_context.SaveChanges();
```

## 👥 Kullanım Senaryosu

### Ana Bilgisayar (Admin)

1. Admin olarak giriş yap → Tüm özelliklere erişim
2. Dashboard, Menü, Siparişler, Masalar, Raporlar, Log
3. Adisyon kesme ve masa yönetimi

### POS Bilgisayarı (Garson)

1. Staff olarak giriş yap → Sadece sipariş sayfasına gider
2. Sadece sipariş oluşturabilir
3. Ana bilgisayarda tüm siparişler görünür

## 🔐 Kullanıcı Rolleri

### Admin Role

- Dashboard
- Menü Yönetimi
- Tüm siparişler
- Masa yönetimi
- Raporlar
- Log görüntüleme
- Adisyon kesme

### Staff Role (POS)

- Sadece sipariş oluşturma
- Sipariş listesini görüntüleme
- Masa durumunu görüntüleme

## ⚠️ Önemli Notlar

1. **Veritabanı Eşzamanlılık**:

   - SQLite eşzamanlı yazma desteği sınırlıdır
   - Çok sayıda eşzamanlı işlem için SQL Server kullanın

2. **Güvenlik**:

   - Sadece yerel ağda paylaşın
   - İnternet erişimi açmayın

3. **Backup**:
   - Veritabanını düzenli olarak yedekleyin
   - `cafe.db` dosyasını günlük kopyalayın

## 🚀 Alternatif: SQL Server Kullanımı

Eşzamanlı kullanım için SQL Server'a geçiş:

1. `Microsoft.EntityFrameworkCore.SqlServer` paketini ekleyin
2. `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SERVER;Database=CafeDB;Integrated Security=True;"
  }
}
```

3. `Program.cs`'de SQL Server kullanın:

```csharp
builder.Services.AddDbContext<CafeDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
```

## 📞 Sorun Giderme

**Veritabanı bağlantı hatası:**

- Ağ path'ini kontrol edin
- Dosya paylaşım izinlerini kontrol edin

**Eşzamanlı yazma hatası:**

- Kısa bir süre bekleyin ve tekrar deneyin
- SQL Server'a geçin
