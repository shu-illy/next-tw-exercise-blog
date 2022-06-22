import { MicroCMSListResponse } from "microcms-js-sdk";
import type { GetStaticProps, NextPage } from "next";
import { client } from "src/libs/client";

type Blog = {
  title: string;
  boty: string;
};

type Props = MicroCMSListResponse<Blog>;

const Home: NextPage<Props> = (props) => {
  console.log(props.contents[0].title);
  return (
    <div>
      <p>{`記事の総数: ${props.totalCount}件`}</p>
      <ul>
        {props.contents.map((content) => {
          return <li key={content.id}>{content.title}</li>;
        })}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await client.getList({ endpoint: "blog" });
  return {
    props: data,
  };
};

export default Home;
