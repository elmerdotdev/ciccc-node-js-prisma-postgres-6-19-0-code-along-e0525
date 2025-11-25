# Steps

## Database

```sql
CREATE DATABASE awesome_shop;
CREATE USER shopowner WITH PASSWORD '12345';
GRANT ALL PRIVILEGES ON DATABASE awesome_shop TO shopowner;
ALTER DATABASE awesome_shop OWNER TO shopowner;
ALTER USER shopowner CREATEDB;
```

## Node + Prisma 6.19

1. Run `npx prisma init`

    - create schema/schema.prisma
    - prisma.config.ts
    - add DATABASE_URL to .env

2. Update the database url to your credentials (For example: `DATABASE_URL="postgresql://todo_app_admin:1234@localhost:5432/todo_app"`)
3. Add import dotenv config into `prisma.config.ts`
4. Create model in `schema/schema.prisma`
5. Run `npx prisma migrate dev`
6. Whenever you make changes to the model, run `npx prisma migrate dev` again
