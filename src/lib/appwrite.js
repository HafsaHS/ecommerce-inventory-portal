import { Client, Databases, Account } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("676f17120023574cecd2");

export const account = new Account(client);
export const databases = new Databases(client);
