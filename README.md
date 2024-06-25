## This is simple express app for generating project names using **Cohere's API**.

Usage
- Update .env with your cohere api key
- Clone the repository
```
git clone https://github.com/shahbaz-athwal/cohere-api
```
- Run locally
```
npm run start
```
- Hit the api using a post request
```
http://localhost:3000/generate
```
- Body structure
```
{
  description: "your project description"
}
```
