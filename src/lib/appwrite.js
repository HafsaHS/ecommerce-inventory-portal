import { Client, Databases, Account } from "appwrite";

export const API_ENDPOINT = "https://cloud.appwrite.io/v1";
export const PROJECT_ID = "676f17120023574cecd2";

const client = new Client();
client.setEndpoint(API_ENDPOINT).setProject(PROJECT_ID);
export const account = new Account(client);
export const databases = new Databases(client);
