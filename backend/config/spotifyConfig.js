import fs from "fs";

export const client_id = '0b4bce1cb5364f589ea2e58f46aee207';
export const client_secret = '314826a61a714013be54c48dd6dd1906';
export const redirect_uri = 'https://127.0.0.1:8080/callback';

export const sslOptions = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.cert"),
};