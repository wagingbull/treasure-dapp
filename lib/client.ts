import { GraphQLClient } from "graphql-request";
import { getSdk } from "../generated/app.generated";

const client = getSdk(new GraphQLClient(process.env.CRYPTOPUNKS_API_URL!));

export default client;