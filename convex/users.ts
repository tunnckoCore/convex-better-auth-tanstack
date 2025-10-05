import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {},
  async handler(ctx) {
    return await ctx.db.query("user").order("desc").collect();
  },
});
