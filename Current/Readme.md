# Current - Cube.js Analytics Project

Проект аналитики документов с использованием Cube.js и React.

## 🏗️ Архитектура

- **Backend**: Cube.js (Docker) - аналитический API
- **Frontend**: React + Vite - пользовательский интерфейс
- **Database**: SQLite - база данных
- **Cache**: Redis (Docker) - кэширование запросов

## 📋 Предварительные требования

- Docker и Docker Compose
- Node.js 18+ (для React приложения)
- WSL2 (для Windows)

## 🚀 Быстрый старт

### 1. Клонирование репозитория
```bash
git clone <your-repo-url>
cd Current
```

### 2. Настройка переменных окружения
```bash
# Скопируйте template файл
cp cube/.env.template cube/.env

# Сгенерируйте новый API секрет
node -e "console.log('CUBEJS_API_SECRET=' + require('crypto').randomBytes(64).toString('hex'))"

# Вставьте сгенерированный секрет в cube/.env файл
```

### 3. Создание базы данных
```bash
# Создайте папку для базы данных если её нет
mkdir -p react-app/public

# Создайте базу данных и выполните инициализацию
sqlite3 react-app/public/database.db < scripts/init-database.sql
```

### 3. Запуск Cube.js сервера
```bash
cd cube
docker-compose -f docker-compose-local.yml up --build
```
Сервер будет доступен на `http://localhost:4002`

### 4. Установка зависимостей React приложения
```bash
cd react-app
npm install
```

### 5. Запуск React приложения
```bash
cd react-app
npm install
npm run dev
```
Приложение будет доступно на `http://localhost:5173`

## 📊 Использование

1. Откройте `http://localhost:5173`
2. В левой панели введите JSON запрос к Cube.js
3. Нажмите "Execute Query"
4. Результаты отобразятся в таблице справа

### Пример запроса:
```json
{
  "measures": [
    "Documents.estimateCount",
    "Documents.contractCount", 
    "Documents.conversionRate"
  ],
  "dimensions": [
    "Documents.monthCreated",
    "Employees.fullName"
  ],
  "order": {
    "Documents.monthCreated": "asc"
  }
}
```

## 🔧 Структура проекта

```
Current/
├── cube/                    # Cube.js сервер
│   ├── model/cubes/        # Схемы данных
│   ├── cube.js             # Конфигурация Cube.js
│   ├── Dockerfile          # Docker образ
│   └── docker-compose-local.yml
├── react-app/              # React frontend
│   ├── src/components/     # Компоненты
│   ├── src/cubejs-config.tsx # Конфигурация клиента
│   └── public/database.db  # База данных (создается)
├── scripts/                # SQL скрипты
│   └── init-database.sql   # Инициализация БД
└── README.md
```

## 📈 Метрики и измерения

### Documents (Документы)
- `estimateCount` - количество оценок
- `contractCount` - количество контрактов
- `conversionRate` - процент конверсии

### Employees (Сотрудники)
- `fullName` - полное имя сотрудника
- `count` - количество сотрудников

### Dimensions (Измерения)
- `Documents.monthCreated` - месяц создания документа
- `Employees.fullName` - имя сотрудника

## 🛠️ Разработка

### Обновление схем данных
Схемы Cube.js находятся в `cube/model/cubes/`:
- `Documents.js` - схема документов
- `Employees.js` - схема сотрудников
- `Projects.js` - схема проектов

### Добавление данных
```bash
sqlite3 react-app/public/database.db
# Выполните SQL команды для добавления данных
```

### Отладка
- Cube.js Playground: `http://localhost:4002`
- React DevTools для отладки frontend
- Логи Docker: `docker-compose logs cube`

## 🐛 Устранение проблем

### База данных не найдена
```bash
# Проверьте существование файла
ls -la react-app/public/database.db

# Пересоздайте базу данных
sqlite3 react-app/public/database.db < scripts/init-database.sql
```

### Ошибка подключения к Cube.js
```bash
# Перезапустите контейнеры
cd cube
docker-compose -f docker-compose-local.yml restart
```

### CORS ошибки
Убедитесь, что в `cube/cube.js` настроены правильные CORS origins.

## 📝 Переменные окружения

Основные переменные в `cube/.env`:
```
CUBEJS_DB_TYPE=sqlite
CUBEJS_DB_NAME=/cube/database.db
CUBEJS_API_SECRET=your-secret-key
CUBEJS_DEV_MODE=true
```

## 🛡️ Безопасность

**ВАЖНО:** Этот проект содержит API секреты. НИКОГДА не коммитьте `.env` файлы в Git!

### Первый запуск:
1. Скопируйте `.env.template` как `.env`
2. Сгенерируйте новый API секрет командой выше
3. Никогда не делитесь содержимым `.env` файла

### API секрет:
- Используется для аутентификации Cube.js API
- Должен быть уникальным для каждой установки
- Хранится только локально, НЕ в Git

1. Форкните репозиторий
2. Создайте ветку для функции (`git checkout -b feature/amazing-feature`)
3. Сделайте коммит (`git commit -m 'Add amazing feature'`)
4. Отправьте в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request