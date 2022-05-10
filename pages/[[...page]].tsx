import Head from "next/head";
import { BuilderComponent, builder, Builder } from "@builder.io/react";
import { InferGetStaticPropsType } from "next";
// import { componentRegister as backgroundComponentRegister } from "../components/Background";
import { useRouter } from "next/router";
import { useState } from "react";

builder.init('9064ecf563724ff398dcad37ecf1cafa');

// backgroundComponentRegister();

export default function Home({
  page,
  // locale,
}: InferGetStaticPropsType<typeof getStaticProps>) {

  const router = useRouter();
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  const [notFound, setNotFound] = useState(false);

  // builder.setUserAttributes({ locale });
  return <>
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    { !page && <meta name="robots" content="noindex" />    }
  </Head>
  { page && <Head>
    <title>Create Next App</title>
    <link rel="icon" href="/favicon.ico" />
  </Head> }
  {notFound && <div>Not found...</div>}
  <BuilderComponent
    model="page"
    // {...page && { content: page }} 
    contentLoaded={(data) => {
      if (!data) { setNotFound(true) }
    }}
    >
  </BuilderComponent>
</>
}

export async function getStaticProps({ params, }) { // ({ params, locale = "en" }) {
  const path = (params.page || []).join("/");
  const page = await builder
    .get("page", {
      userAttributes: { urlPath: `/${path}` },
      // options: { data: { locale: locale } },
      cachebust: true,
    })
    .toPromise() || null;

  return {
    props: {
      page,
      // locale,
    },
    revalidate: 5,
  };
}

export async function getStaticPaths() {
  // uncomment to have pages generated on the build time
  const pages = await builder.getAll("page", {
    options: { noTargeting: true },
    omit: "data.blocks",
  });
  console.log(pages.map((page) => page.data?.url))
  const paths = pages.map((page) => page.data?.url);
  return {
    paths,
    fallback: true,
  };
}
