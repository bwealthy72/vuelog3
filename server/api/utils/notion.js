import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const getProp = function (prop) {
  const t = prop.type;
  switch (t) {
    case "select":
      return prop[t].name;
    case "rich_text":
    case "title":
      return prop[t][0].plain_text;
    case "created_time":
    case "last_edited_time":
    case "number":
    case "checkbox":
    case "multi_select":
      return prop[t].map((v) => v.name);
    case "files":
      return prop[t]?.[0]?.file?.url;
  }
};

export { notion, getProp };