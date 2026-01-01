import 'dotenv/config'
import { defineConfig } from "prisma/config";

export default defineConfig({
  earlyAccess: true, // Tambahkan baris ini untuk menghilangkan error
  schema: {
    kind: 'single',
    filePath: 'prisma/schema.prisma',
  },
})