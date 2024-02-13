# Fullstack Authentication Example with Next.js and NextAuth.js

This is the starter project for the fullstack tutorial with Next.js and Prisma. You can find the final version of this project in the [`final`](https://github.com/prisma/blogr-nextjs-prisma/tree/final) branch of this repo.

### Create a `.env` file
```env
    DATABASE_URL="file:./dev.db"
```

### Install depedencies
```shell
    npm i
```

### Run application
```shell
    npm run dev
```

### Create user (it wil also create checking and saving accounts)
#### `POST` `http://localhost:3000/api/users`
```json
{
    "name": "Gustavo Pereira",
    "email": "gustavo.3.5.p@gmail.com"
}
```

### Add funds to accounts
#### `PUT` `http://localhost:3000/api/checkings/<id>/add-fund`
```json
{
    "fund": 200,
}
```
