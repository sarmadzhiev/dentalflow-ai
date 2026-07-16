# DentalFlow AI MVP

Работещ стартов MVP за AI виртуален рецепционист за стоматологични клиники.

## Стартиране локално

1. Инсталирай Node.js 20 или по-нова версия.
2. Разархивирай проекта.
3. В терминал в папката на проекта изпълни:

```bash
npm install
npm run dev
```

4. Отвори http://localhost:3000
5. Демо панелът е на http://localhost:3000/dashboard

## Качване във GitHub

```bash
git init
git add .
git commit -m "Initial DentalFlow AI MVP"
git branch -M main
git remote add origin ТВОЯТ_GITHUB_REPOSITORY_URL
git push -u origin main
```

## Публикуване във Vercel

- Влез във Vercel.
- Избери Add New → Project.
- Импортирай GitHub repository.
- Натисни Deploy.
- После добави `dental.sarmadzhiev.eu` в Settings → Domains.
- Vercel ще покаже DNS записа, който трябва да добавиш при регистратора на домейна.

## Следващи модули

- Supabase authentication
- база данни за клиники, пациенти и запитвания
- реален AI чат
- календар и записване
- имейл/SMS напомняния
- GDPR съгласия и политика за поверителност
