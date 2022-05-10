import Head from "next/head";
import { BuilderComponent, builder, Builder } from "@builder.io/react";
import { InferGetStaticPropsType } from "next";
// import { componentRegister as backgroundComponentRegister } from "../components/Background";
import { useRouter } from "next/router";

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

  // builder.setUserAttributes({ locale });
  const isLive = !Builder.isEditing && !Builder.isPreviewing;
 
  if (!page && isLive) {
    return <div>Not found</div>
  }

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <main> */}
          {/* <div> */}
            {/* <div> */}
              <BuilderComponent content={page} model="page" />
            {/* </div> */}
          {/* </div> */}
      {/* </main> */}
    </div>
  );
}

export async function getStaticProps({ params }) {
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
