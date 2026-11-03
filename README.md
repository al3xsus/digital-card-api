# Цифровая визитка

## Архитектурные решения и обоснование

### 1. Разделение ответственности (Separation of Concerns)

Для соблюдения принципов чистого кода и разделения ответственности была выбрана трехслойная модульная архитектура NestJS:

1. GraphQL Layer (*.resolver.ts): Транспортный слой, принимает GraphQL-запросы и мутации.

2. Business Logic Layer (*.service.ts): Инкапсулирует все доменные правила и трансформации данных. 

3. Data Access Layer (PrismaService): Абстрактная работа с БД.

### 2. Выбор архитектуры: 

#### Модульная слоистая архитектура вместо DDD

При проектировании бэкенда сознательно не использовался подход DDD (Domain-Driven Design), так как для цифровой визитки он являлся бы избыточным усложнением. Вместо этого выбрана модульная слоистая архитектура (Modular Layered Architecture), сочетающая в себе DDD и слоистый подходы.
Почему?
* Код разделен на независимые модули (profile), внутри которых соблюдается четкая вертикаль: GraphQL Resolvers => Services => Prisma.
* Модели данных просты и понятны, а все операции над данными сосредоточены в сервисах.
* Структура позволяет легко добавлять новые домены (например, blog или auth), сохраняя кодовую базу чистой и предсказуемой.

### 3, Модели
БД состоит из 5 моделей: профиль, ссылки, навыки, проекты и экспириенс. Профиль является неудаляемым синглтоном, который можно только редактировать, все остальные сущности доступны для создания, редактирования и удаления. Профиль реляционно связан с остальными сущностями связью один ко многим, 1:N.

### 4. Оптимизация работы с вложенными данными (Проблема N+1)

В GraphQL очень легко получить проблему N+1 запросов к базе данных, если клиент запрашивает вложенные сущности (например, profile -> projects -> technologies).
Для предотвращения серии каскадных запросов к БД в сервисах применена инструкция include.

## Технологический стек

Framework: NestJS (Node.js 20 LTS)

API: GraphQL (Apollo Server + @as-integrations/express5)

ORM: Prisma ORM

Database: PostgreSQL 16

Language: TypeScript (CommonJS target)

DevOps: Docker, Docker Compose

## Быстрый запуск

Требования:

* Docker and Docker Compose
* Node.js (v20+) (optional)

Запуск в Docker (Рекомендуемый способ)

Клонируйте репозиторий:

```
git clone https://github.com/al3xsus/digital-card-api.git
cd digital-card-api
```

Запустите весь стек (PostgreSQL + NestJS API):

```
docker compose up --build
```

При старте контейнера автоматически применятся миграции БД и выполнится сидинг.

Откройте Apollo Sandbox в браузере по адресу:

```
http://localhost:3000/graphql
```

## Пример GraphQL-запроса
Скопируйте следующий запрос в Apollo Sandbox для проверки получения полного профиля визитки со всеми вложенными связями:

```graphql
query GetProfile {
  profile {
    id
    name
    description
    socials {
      id
      url
    }
    skills {
      id
      name
    }
    projects {
      id
      name
      url
    }
    experience {
      id
      company
      position
      period
      achievements
    }
  }
}
```

Пример добавления, редактирования и удаления сущности (в данном случае, скилла)

```graphql
mutation CreateSkill {
  addSkill (input: {name: "Cool skill"}),
  {
    id, name
  }
}

mutation UpdateSkill {
  updateSkill (id: "SKILL_ID", input: {name: "Cool skill v2"}),
  {
    id, name
  }
}

mutation DeleteSkill {
  deleteSkill(id: "SKILL_ID")
}
```

## ⚙️ Переменные окружения (.env)
Для работы приложения необходим файл .env в корне проекта. Создайте его на основе примера ниже:

```
# Подключение к PostgreSQL (используется как NestJS приложением, так и контейнером БД)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/digital_card?schema=public"

# Порт, на котором запускается HTTP/GraphQL сервер
PORT=3000
```

Примечание для Docker Compose: При запуске через docker compose хост базы данных автоматически заменяется на имя сервиса в сети Docker (например, postgres), но локально Prisma использует этот DATABASE_URL.