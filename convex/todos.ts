import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {},
  async handler(ctx) {
    return await ctx.db
      .query("todos")
      .withIndex("by_creation_time")
      .order("desc")
      .collect();
  },
});

export const add = mutation({
  args: { text: v.string() },
  async handler(ctx, args) {
    await ctx.db.insert("todos", {
      text: args.text,
      completed: false,
    });
  },
});

export const toggle = mutation({
  args: { id: v.id("todos") },
  async handler(ctx, args) {
    const todo = await ctx.db.get(args.id);
    if (!todo) {
      throw new Error("Todo not found");
    }
    return await ctx.db.patch(args.id, {
      completed: !todo.completed,
    });
  },
});

export const remove = mutation({
  args: { id: v.id("todos") },
  async handler(ctx, args) {
    await ctx.db.delete(args.id);
  },
});
