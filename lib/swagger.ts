// lib/swagger.ts
import {createSwaggerSpec} from "next-swagger-doc";

export const getSwaggerSpec = () => {
  const spec = createSwaggerSpec({
    apiFolder: "app/api", // vì API của anh nằm trong app/api
    definition: {
      openapi: "3.0.0",
      info: {
        title: "AskThemAll API",
        version: "1.0.0",
        description:
          "API docs cho hệ thống AskThemAll (questions, answers, feedback, dataset, ...)",
      },
      servers: [
        {
          url: "http://localhost:3000",
          description: "Local dev",
        },
      ],
    },
  });

  return spec;
};
