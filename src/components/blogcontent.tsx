import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { Image, Card, Button, Text } from "@mantine/core";

interface Blog {
  id: number;
  attributes: {
    Image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    authorImage: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    createdBy: {
      id: number;
      firstname: string;
      lastname: string;
    };
    Title: string;
    Content: string;
    Description: string;
    ReadTime: string;
    createdAt: string;
    Blogs: string;
  };
}

interface BlogContentProps {
  blogs: { data: Blog[] };
}

const BlogContent: React.FC<BlogContentProps> = ({ blogs }) => {
  const { id } = useParams<{ id: string }>();

  const location = useLocation();

  let blog: Blog | undefined = undefined;

  if (blogs.data) {
    const filteredBlogs = blogs.data.filter((blog) => blog.id === Number(id));
    blog = filteredBlogs[0];
  }

  if (location) {
    console.log({ state: location.state });
  }

  console.log("BlogContentPage");
  console.log(blog);

  return (
    <div className="w-full pb-10 bg-[#f9f9f9]">
      <div className="max-w-[1240px] mx-auto p-4">
        <div
          className="grid lg:grid-cols-4 sm:grid-cols-3 ss:grid-cols-1
                md:gap-8 sm:gap-y-8 ss:gap-y-8 px-4 sm:pt-20 md:mt-0 ss:pt-20 text-black"
        >
          <div className="col-span-3">
            <Card>
              <Card.Section inheritPadding py="xs">
                <Image
                  className="h-fit lg:h-72 sm:h-56 ss:h-48 w-full object-cover border rounded-md"
                  src={null}
                  decoding="async"
                  fallbackSrc={`http://localhost:1337${blog?.attributes.Image.data.attributes.url}`}
                  alt="Image"
                />
              </Card.Section>
              <Card.Section
                inheritPadding
                py="xs"
                style={{ background: "#ffffff" }}
              >
                <Text
                  size="lg"
                  fw={500}
                  className="font-bold text-2xl md:text-xl sm:text-lg ss:text-md my-1 p-4"
                >
                  {blog?.attributes.Title}
                </Text>
                <div className="pt-2">
                  <div
                  //index.css className markdown all: revert
                  className="markdown indent-10 line-break text-justify p-4" 
                  dangerouslySetInnerHTML={{ __html: blog?.attributes.Blogs ?? ''}} 
                  />
                </div>
              </Card.Section>
            </Card>
          </div>
          <div className="col-span-1">
            <div className="items-center w-full bg-white rounded-x1 drop-shadow-md py-5 p-4 md:px-6 max-h-[250px]">
              <div className="text-center">
                <img
                  className="p-2 w-32 h-32 rounded-full mx-auto object-cover"
                />
                <h1 className="font-bold text-2xl text-center text-gray-900 pt-3 md:text-xl">
                  {blog?.attributes.createdBy.firstname}{" "}
                  {blog?.attributes.createdBy.lastname}
                </h1>
              </div>
            </div>
            <div className="mt-10 items-center w-full bg-white rounded-x1 drop-shadow-md py-5 p-4 md:px-6 max-h-[250px]">
              <div className="text-center">
                <h1 className="font-bold text-2xl text-center text-gray-900 pt-3 md:text-xl">
                  
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <Link to="/">
          <Button className="back-button">Back</Button>
        </Link>
      </div>
      <div className="flex justify-center mt-4">
        <Button
          className="content-manager"
          onClick={() =>
            window.open(
              "http://localhost:1337/admin/content-manager/collectionType/api::blog.blog?page=1&pageSize=10&sort=id:ASC",
              "_blank"
            )
          }
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

export default BlogContent;
