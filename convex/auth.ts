import {
  // type AuthFunctions,
  createClient,
  type GenericCtx,
} from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
// import { requireActionCtx } from "@convex-dev/better-auth/utils";
import { betterAuth } from "better-auth";
// import { anonymous, twoFactor } from "better-auth/plugins";
import { components } from "./_generated/api";
import type { DataModel } from "./_generated/dataModel";
import { type QueryCtx, query } from "./_generated/server";
import betterAuthSchema from "./betterAuth/schema";

const APP_URL =
  process.env.APP_URL || process.env.VITE_APP_URL || "http://localhost:3000";

export const authComponent = createClient<DataModel, typeof betterAuthSchema>(
  components.betterAuth,
  {
    local: {
      schema: betterAuthSchema,
    },
    verbose: false,
  }
);

// export const { onCreate, onUpdate, onDelete } = authComponent.triggersApi();

export const createAuth = (
  ctx: GenericCtx<DataModel>,
  { optionsOnly } = { optionsOnly: false }
) =>
  betterAuth({
    baseURL: APP_URL,
    database: authComponent.adapter(ctx),
    logger: {
      disabled: optionsOnly,
    },
    account: {
      accountLinking: {
        enabled: true,
      },
    },
    // emailVerification: {
    //   sendVerificationEmail: async ({ user, url }) => {
    //     await sendEmailVerification(requireActionCtx(ctx), {
    //       to: user.email,
    //       url,
    //     });
    //   },
    // },
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
      // sendResetPassword: async ({ user, url }) => {
      //   await sendResetPassword(requireActionCtx(ctx), {
      //     to: user.email,
      //     url,
      //   });
      // },
    },
    // socialProviders: {
    //   github: {
    //     clientId: envServer.GITHUB_CLIENT_ID,
    //     clientSecret: envServer.GITHUB_CLIENT_SECRET,
    //   },
    //   // google: {
    //   //   clientId: envServer.GOOGLE_CLIENT_ID,
    //   //   clientSecret: envServer.GOOGLE_CLIENT_SECRET,
    //   // },
    // },
    user: {
      deleteUser: {
        enabled: true,
      },
      // additionalFields: {
      //   foo: {
      //     type: "string",
      //     required: false,
      //   },
      // },
    },
    plugins: [convex()],
  });

// Feel free to edit, omit, etc.
export const safeGetUser = async (ctx: QueryCtx) =>
  authComponent.safeGetAuthUser(ctx);

export const getUser = async (ctx: QueryCtx) => authComponent.getAuthUser(ctx);

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => safeGetUser(ctx),
});
