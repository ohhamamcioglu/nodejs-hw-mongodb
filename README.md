# Node.js MongoDB Contacts API

Bu proje, MongoDB veritabanı kullanarak iletişim (contacts) yönetimi için RESTful API sunan bir Node.js uygulamasıdır.

## 🚀 Özellikler

- ✅ **Express.js** web framework
- ✅ **MongoDB** veritabanı (Mongoose ODM)
- ✅ **RESTful API** endpoints
- ✅ **CORS** desteği
- ✅ **Pino** logging
- ✅ **ESLint** kod kalitesi
- ✅ **Prettier** kod formatlama
- ✅ **ES6 Modules** desteği
- ✅ **Environment variables** yapılandırması

## 📋 Gereksinimler

- Node.js v18.17.0 veya üzeri
- MongoDB Atlas hesabı
- npm veya yarn paket yöneticisi

## ⚙️ Kurulum

1. **Repository'yi klonlayın:**
```bash
git clone https://github.com/yourusername/nodejs-hw-mongodb.git
cd nodejs-hw-mongodb
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Environment variables'ı ayarlayın:**
`.env.example` dosyasını kopyalayarak `.env` oluşturun ve kendi MongoDB bilgilerinizi girin:
```bash
cp .env.example .env
```

`.env` dosyasını düzenleyin:
```env
PORT=3001
MONGODB_USER=your_mongodb_user
MONGODB_PASSWORD=your_mongodb_password
MONGODB_URL=your_mongodb_cluster_url
MONGODB_DB=your_database_name
```

4. **Uygulamayı başlatın:**

**Geliştirme modunda:**
```bash
npm run dev
```

**Production modunda:**
```bash
npm start
```

**Kod kalitesi kontrolü:**
```bash
npm run lint
```

## 📚 API Endpoints

### Base URL
```
http://localhost:3001
```

### Endpoints

#### 1. Tüm İletişimleri Getir
```http
GET /contacts
```

**Response (200):**
```json
{
  "status": 200,
  "message": "Successfully found contacts!",
  "data": [
    {
      "_id": "68d254723fba42c7044ca2db",
      "name": "Yulia Shevchenko",
      "phoneNumber": "+380000000001",
      "email": "oleh1@example.com",
      "isFavourite": false,
      "contactType": "personal",
      "createdAt": "2024-05-08T13:12:14.954Z",
      "updatedAt": "2024-05-08T13:12:14.954Z"
    }
  ]
}
```

#### 2. Tek İletişim Getir
```http
GET /contacts/:contactId
```

**Response (200):**
```json
{
  "status": 200,
  "message": "Successfully found contact with id {contactId}!",
  "data": {
    "_id": "68d254723fba42c7044ca2db",
    "name": "Yulia Shevchenko",
    "phoneNumber": "+380000000001",
    "email": "oleh1@example.com",
    "isFavourite": false,
    "contactType": "personal",
    "createdAt": "2024-05-08T13:12:14.954Z",
    "updatedAt": "2024-05-08T13:12:14.954Z"
  }
}
```

**Response (404):**
```json
{
  "message": "Contact not found"
}
```

## 📝 Data Model

### Contact Schema
```javascript
{
  name: String (required),
  phoneNumber: String (required),
  email: String (optional),
  isFavourite: Boolean (default: false),
  contactType: String (enum: ['work', 'home', 'personal'], default: 'personal'),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## 🏗️ Proje Yapısı

```
nodejs-hw-mongodb/
├── src/
│   ├── controllers/          # Request handlers
│   │   └── contacts.js
│   ├── db/                   # Database configuration
│   │   ├── models/           # Mongoose models
│   │   │   └── Contact.js
│   │   └── initMongoConnection.js
│   ├── routes/               # API routes
│   │   └── contacts.js
│   ├── services/             # Business logic
│   │   └── contacts.js
│   ├── index.js              # Application entry point
│   └── server.js             # Express server setup
├── .env                      # Environment variables (not in repo)
├── .env.example              # Environment variables template
├── .editorconfig             # Editor configuration
├── .gitignore                # Git ignore rules
├── .prettierrc.json          # Prettier configuration
├── eslint.config.mjs         # ESLint configuration
├── package.json              # Project dependencies and scripts
└── README.md                 # Project documentation
```

## 🛠️ Geliştirme Araçları

- **Nodemon**: Otomatik sunucu yeniden başlatma
- **ESLint**: Kod kalitesi ve standart kontrolü
- **Prettier**: Kod formatlama
- **EditorConfig**: Editor ayarları standardizasyonu

## 📦 Kullanılan Paketler

### Ana Bağımlılıklar
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `cors` - Cross-Origin Resource Sharing
- `pino-http` - HTTP logging
- `pino-pretty` - Log formatlama
- `dotenv` - Environment variables

### Geliştirme Bağımlılıkları
- `nodemon` - Otomatik yeniden başlatma
- `eslint` - Kod kalitesi kontrol
- `@eslint/js` - ESLint JavaScript konfigürasyonu
- `globals` - Global değişkenler tanımları

## 🌐 Deployment

Bu proje Render.com üzerinde deploy edilebilir:

1. GitHub'a push edin
2. Render.com hesabınızda yeni service oluşturun
3. Environment variables'ı ayarlayın
4. Deploy edin

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add some amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje ISC lisansı altında lisanslanmıştır.

## 👨‍💻 Yazar

**Ömer Hilmi Hamamcıoğlu**
- Email: ohhamamcioglu@gmail.com
- GitHub: [@ohhamamcioglu](https://github.com/ohhamamcioglu)

---

📝 **Not**: Bu proje Node.js ve MongoDB öğrenimi kapsamında geliştirilmiştir.
