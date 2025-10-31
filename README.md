# Node.js MongoDB API - hw7-swagger

Bu proje, MongoDB veritabanı kullanarak iletişim (contacts) yönetimi için RESTful API sunan ve **Swagger/OpenAPI 3.1.0** dokümantasyonu ile tam entegre edilmiş bir Node.js uygulamasıdır.

## 🚀 Özellikler

### 🔧 **Temel Özellikler**
- ✅ **Express.js** web framework
- ✅ **MongoDB** veritabanı (Mongoose ODM)
- ✅ **RESTful API** endpoints
- ✅ **JWT Authentication** sistemi
- ✅ **Session management** 
- ✅ **Email service** (Brevo SMTP)
- ✅ **File upload** (Cloudinary integration)
- ✅ **CORS** desteği
- ✅ **Pino** logging
- ✅ **ESLint** kod kalitesi
- ✅ **Prettier** kod formatlama
- ✅ **ES6 Modules** desteği
- ✅ **Environment variables** yapılandırması

### 📚 **Swagger/OpenAPI Dokümantasyon**
- ✅ **OpenAPI 3.1.0** spesifikasyonu
- ✅ **Swagger UI** interactive interface
- ✅ **Comprehensive API documentation**
- ✅ **Interactive testing** capabilities
- ✅ **Schema definitions** and examples
- ✅ **Authentication documentation**

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

**Swagger dokümantasyonu build:**
```bash
npm run build-docs
```

**Swagger dokümantasyonu önizleme:**
```bash
npm run preview-docs
```

**Kod kalitesi kontrolü:**
```bash
npm run lint
```

## 📚 API Dokümantasyonu

### 🌐 Live Swagger UI
**Production URL**: https://nodejs-hw-mongodb-0xyb.onrender.com/api-docs/

**Local Development**: http://localhost:3001/api-docs/

### Base URL
```
Production: https://nodejs-hw-mongodb-0xyb.onrender.com
Local: http://localhost:3001
```

### 🔐 Authentication
API, JWT tabanlı authentication kullanır. Protected endpoint'lere erişim için:
```http
Authorization: Bearer <your-jwt-token>
```

### 📋 Endpoint Kategorileri

#### **Authentication Endpoints**
- `POST /auth/register` - Kullanıcı kaydı
- `POST /auth/login` - Kullanıcı girişi  
- `POST /auth/logout` - Kullanıcı çıkışı
- `POST /auth/refresh` - Token yenileme
- `POST /auth/send-reset-email` - Şifre sıfırlama emaili
- `POST /auth/reset-pwd` - Şifre sıfırlama

#### **Contact Management Endpoints**
- `GET /contacts` - Tüm kontakları listele
- `GET /contacts/{id}` - Tek kontak getir
- `POST /contacts` - Yeni kontak oluştur
- `PATCH /contacts/{id}` - Kontak güncelle
- `DELETE /contacts/{id}` - Kontak sil
- `POST /contacts/{id}/photo` - Kontak fotoğrafı yükle

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

## 📝 Data Models

### Contact Schema
```javascript
{
  name: String (required),
  phoneNumber: String (required),
  email: String (optional),
  isFavourite: Boolean (default: false),
  contactType: String (enum: ['work', 'home', 'personal'], default: 'personal'),
  photo: String (optional), // Cloudinary URL
  userId: ObjectId (required), // Reference to User
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Session Schema
```javascript
{
  userId: ObjectId (required),
  accessToken: String (required),
  refreshToken: String (required),
  accessTokenValidUntil: Date (required),
  refreshTokenValidUntil: Date (required),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## 🏗️ Proje Yapısı

```
nodejs-hw-mongodb/
├── docs/                     # API Documentation
│   ├── openapi.yaml         # OpenAPI 3.1.0 specification
│   └── swagger.json         # Generated Swagger JSON
├── swagger/                  # Swagger path definitions
│   └── paths/               # Individual endpoint definitions
│       ├── auth/            # Authentication endpoints
│       └── contacts/        # Contact management endpoints
├── src/
│   ├── controllers/          # Request handlers
│   │   ├── auth.js          # Authentication controller
│   │   └── contacts.js      # Contacts controller
│   ├── db/                   # Database configuration
│   │   ├── models/           # Mongoose models
│   │   │   ├── Contact.js   # Contact model
│   │   │   ├── User.js      # User model
│   │   │   └── Session.js   # Session model
│   │   └── initMongoConnection.js
│   ├── middlewares/          # Express middlewares
│   │   ├── authenticate.js  # JWT authentication
│   │   ├── errorHandler.js  # Error handling
│   │   ├── notFoundHandler.js
│   │   ├── isValidId.js     # MongoDB ID validation
│   │   └── upload.js        # File upload handling
│   ├── routes/               # API routes
│   │   ├── auth.js          # Authentication routes
│   │   ├── contacts.js      # Contact routes
│   │   └── index.js         # Route aggregation
│   ├── services/             # Business logic
│   │   ├── auth.js          # Authentication services
│   │   ├── contacts.js      # Contact services
│   │   └── email.js         # Email services
│   ├── utils/                # Utility functions
│   │   ├── ctrlWrapper.js   # Controller wrapper
│   │   ├── env.js           # Environment utilities
│   │   ├── parseFilterParams.js
│   │   └── parsePaginationParams.js
│   ├── constants/            # Application constants
│   ├── index.js              # Application entry point
│   └── server.js             # Express server setup
├── .env                      # Environment variables (not in repo)
├── .env.example              # Environment variables template
├── .editorconfig             # Editor configuration
├── .gitignore                # Git ignore rules
├── .prettierrc.json          # Prettier configuration
├── eslint.config.mjs         # ESLint configuration
├── redocly.yaml             # Redocly configuration
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
- `bcrypt` - Password hashing
- `jsonwebtoken` - JWT token management
- `swagger-ui-express` - Swagger UI integration
- `multer` - File upload handling
- `cloudinary` - Image storage service
- `nodemailer` - Email service
- `handlebars` - Template engine

### Geliştirme Bağımlılıkları
- `nodemon` - Otomatik yeniden başlatma
- `eslint` - Kod kalitesi kontrol
- `@eslint/js` - ESLint JavaScript konfigürasyonu
- `globals` - Global değişkenler tanımları
- `@redocly/cli` - OpenAPI documentation tools

## 🌐 Deployment

### Production URL
🚀 **Live Demo**: https://nodejs-hw-mongodb-0xyb.onrender.com/api-docs/

Bu proje Render.com üzerinde deploy edilmiştir:

1. GitHub repository'yi Render.com'a bağlayın
2. Environment variables'ı Production ortamında ayarlayın:
   ```env
   PORT=10000
   MONGODB_USER=your_mongodb_user
   MONGODB_PASSWORD=your_mongodb_password
   MONGODB_URL=your_mongodb_cluster_url
   MONGODB_DB=your_database_name
   JWT_SECRET=your_jwt_secret
   BREVO_API_KEY=your_brevo_api_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```
3. Build command: `npm run build-docs`
4. Start command: `npm start`
5. Auto-deploy aktif edilir

### 📊 Swagger Dokümantasyonu
- **Production**: https://nodejs-hw-mongodb-0xyb.onrender.com/api-docs/
- **Swagger JSON**: https://nodejs-hw-mongodb-0xyb.onrender.com/swagger.json

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

## 🎯 hw7-swagger Özellikleri

Bu versiyon özellikle **hw7-swagger** ödevi için geliştirilmiştir ve şu ek özellikleri içerir:

- ✨ **OpenAPI 3.1.0** tam spesifikasyon desteği
- 🎨 **Interactive Swagger UI** - Canlı API testi
- 📚 **Comprehensive Documentation** - Tüm endpoint'ler detaylandırılmış
- 🔐 **Authentication Flow** - JWT ve session yönetimi
- 📧 **Email Integration** - Brevo SMTP servisi
- 📷 **File Upload** - Cloudinary entegrasyonu  
- 🛠️ **Developer Tools** - Build ve preview scriptleri
- 🚀 **Production Ready** - Render.com deployment

### � Önemli Linkler
- **API Dokümantasyonu**: https://nodejs-hw-mongodb-0xyb.onrender.com/api-docs/
- **OpenAPI Spec**: [docs/openapi.yaml](docs/openapi.yaml)
- **Swagger JSON**: https://nodejs-hw-mongodb-0xyb.onrender.com/swagger.json

---

�📝 **Not**: Bu proje Node.js, MongoDB ve OpenAPI/Swagger dokümantasyonu öğrenimi kapsamında geliştirilmiştir.
