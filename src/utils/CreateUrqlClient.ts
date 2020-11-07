import { cacheExchange } from "@urql/exchange-graphcache";
import { createClient, dedupExchange, fetchExchange } from "urql";
import {
  LoginMutation,
  MeQuery,
  MeDocument,
  LogoutMutation,
  ResetPasswordMutation,
  GetRegionsQuery,
  AddRegionMutation,
  GetRegionsDocument,
} from "../generated/graphql";
import betterUpdateQuery from "./BetterUpdateQuery";

const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: { credentials: "include" },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          //login update
          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.login.error) return query;
                else return { me: result.login.user };
              }
            );
          },
          //logout update
          logout: (_result, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => {
                return { me: null };
              }
            );
          },
          //create region
          addRegion: (_result, args, cache, info) => {
            const allFields = cache.inspectFields("Query");
            const fieldInfos = allFields.filter(
              (info) => info.fieldName === "getRegions"
            );
            fieldInfos.forEach((fi) => {
              cache.invalidate("Query", "getRegions");
            });
          },
          //delete region
          deleteRegion: (_result, args, cache, info) => {
            const allFields = cache.inspectFields("Query");
            const fieldInfos = allFields.filter(
              (info) => info.fieldName === "getRegions"
            );
            fieldInfos.forEach((fi) => {
              cache.invalidate("Query", "getRegions", fi.arguments || {});
            });
          },
          //edit region
          editRegion: (_result, args, cache, info) => {
            const allFields = cache.inspectFields("Query");
            const fieldInfos = allFields.filter(
              (info) => info.fieldName === "getRegions"
            );
            fieldInfos.forEach((fi) => {
              cache.invalidate("Query", "getRegions", fi.arguments || {});
            });
          },
          // //reset password update
          resetPassword: (_result, args, cache, info) => {
            betterUpdateQuery<ResetPasswordMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.resetPassword.error) return query;
                else return { me: result.resetPassword.user };
              }
            );
          },
          // //register update
          // register: (_result, args, cache, info) => {
          //   betterUpdateQuery<RegisterMutation, MeQuery>(
          //     cache,
          //     { query: MeDocument },
          //     _result,
          //     (result, query) => {
          //       if (result.register.errors) return query;
          //       else return { me: result.register.user };
          //     }
          //   );
          // },
        },
      },
    }),
    fetchExchange,
  ],
});

export default client;
