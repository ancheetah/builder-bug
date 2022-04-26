import Head from "next/head";
import { BuilderComponent, builder, Builder } from "@builder.io/react";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { componentRegister as backgroundComponentRegister } from "../components/Background";

builder.init('42aedc5d7c084408b4c99cbd0f9a9e09');

backgroundComponentRegister();

export default function Home({
  page,
  locale,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  builder.setUserAttributes({ locale });
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {page || Builder.isPreviewing || Builder.isEditing ? (
          <div>
            <div>
              <BuilderComponent content={page} model="page" isChild />
            </div>
          </div>
        ) : (
          <div>Not found</div>
        )}
      </main>
    </div>
  );
}

export async function getStaticProps({
  params,
  locale = "en",
}: GetStaticPropsContext<{ page: string }>) {
  const urlPath = params?.page || "";

  const page = await builder
    .get("page", {
      userAttributes: { urlPath: `/${urlPath || ""}`, locale: locale },
      options: { data: { locale: locale } },
      cachebust: true,
    })
    .promise() || null;

  return {
    props: {
      page,
      locale,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  // uncomment to have pages generated on the build time
  const pages = await builder.getAll("page", {
    options: { noTargeting: true },
    omit: "data.blocks",
  });
  const paths = pages.map((page) => page.data?.url);
  console.log("paths: ", paths);
  return {
    paths,
    fallback: "blocking",
  };
}
