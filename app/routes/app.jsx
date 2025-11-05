import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { authenticate } from "../shopify.server";
import { CrateDiscoutCode, changeOrderSummaryScheme, getCheckoutProfileId, getfunctionid, hideMethod, setFocusBorderColor, setStyling } from "./castaner server/castaner.server";



export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const loader = async ({ request }) => {
  const {admin} = await authenticate.admin(request);
   const id = await getCheckoutProfileId(admin.graphql)
   let profileId = id.data.checkoutProfiles.edges
    .map((item) => (item.node.isPublished === true ? item.node.id : null))
    .filter((id) => id !== null)

   await setStyling(admin.graphql, profileId[0])
   await setFocusBorderColor(admin.graphql ,profileId[0])
   let abc = await changeOrderSummaryScheme(admin.graphql,profileId[0])
   const getid = await getfunctionid(admin.graphql)
   const customercode = await CrateDiscoutCode(admin.graphql)
   const hide_Method = await hideMethod(admin.graphql)


   

  return json({ apiKey: process.env.SHOPIFY_API_KEY || "",getid,customercode,profileId, abc,hide_Method});
};

export default function App() {
  // const {apiKey,profileId, abc,hide_Method} = useLoaderData();
  //  console.log(abc,"dataddddddd",hide_Method)
  //  console.log("====================>")

  return (

    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <ui-nav-menu>
        <Link to="/app" rel="home">
          Home
        </Link>
        <Link to="/app/additional">Additional page</Link>
      </ui-nav-menu>
      <Outlet />
    </AppProvider>
  );
}

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
