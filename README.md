# 🚄 IRCTC API — Cloudflare Worker + Hono + Bun

This project is a **Cloudflare Worker** powered by **[Hono](https://hono.dev/)** and built using **[Bun](https://bun.sh/)**.  
It provides lightweight, serverless APIs for train data such as station train lists and auto-suggestions.

---

## 🌐 Live API

Base URL:  
👉 [https://irctc-api.cemya.workers.dev/](https://irctc-api.cemya.workers.dev/)

### Available Endpoints

| Endpoint | Description | Example |
|-----------|--------------|----------|
| `/station/train-list` | Get a list of trains available for a given station | [https://irctc-api.cemya.workers.dev/station/train-list](https://irctc-api.cemya.workers.dev/station/train-list) |
| `/suggestions` | Get train name/number auto-suggestions | [https://irctc-api.cemya.workers.dev/suggestions](https://irctc-api.cemya.workers.dev/suggestions) |

---

## 📦 Installation

Clone the repository and install dependencies:

```sh
bun install
