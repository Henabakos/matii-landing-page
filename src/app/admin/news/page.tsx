import React from "react";
import { getAdminAllNewsArticles } from "@/lib/services/news.service";
import NewsClientManager from "./NewsClientManager";

export const metadata = {
  title: "News & Dispatches Manager | Matii CMS",
};

export default async function AdminNewsPage() {
  const news = await getAdminAllNewsArticles();

  return <NewsClientManager initialNews={news} />;
}
