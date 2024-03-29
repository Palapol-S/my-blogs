import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { Image, Card, Button, Text } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { optionDate } from "../functions/date";

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
    Tags: string;
    SecondTags: string;
    ThirdTags: string;
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

  return (
    <div className="max-w-2xl mx-auto px-4 mt-8 mb-8">
      <div className="mb-8 mt-8">
        <Text size="xl" fw={500} className="font-bold text-3xl mb-4">
          {blog?.attributes.Title}
        </Text>
        <div
          className="markdown text-justify text-xl mb-2"
          dangerouslySetInnerHTML={{
            __html: blog?.attributes.Description ?? "",
          }}
        />
      </div>
      <div className="mt-8">
        <Card shadow="sm">
          <Card.Section
            inheritPadding
            py="sm"
            style={{ background: "#ffffff" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  className="w-10 h-10 rounded-full object-cover mr-4"
                  src="https://placekitten.com/100/100"
                  alt="Author"
                />
                <div>
                  <h3 className="font-bold text-lg">
                    {blog?.attributes.createdBy.firstname}{" "}
                    {blog?.attributes.createdBy.lastname}
                  </h3>
                  <p className="text-gray-600">
                    Published on{" "}
                    {blog?.attributes.createdAt
                      ? optionDate.format(new Date(blog.attributes.createdAt))
                      : "Unknown Date"}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Button
                  className="content-manager"
                  id="edit"
                  onClick={() =>
                    window.open(
                      "http://localhost:1337/admin/content-manager/collectionType/api::blog.blog?page=1&pageSize=10&sort=id:ASC",
                      "_blank"
                    )
                  }
                >
                  <IconEdit />
                </Button>
              </div>
            </div>
          </Card.Section>
        </Card>
      </div>
      <div className="mb-4 mt-4 border-b"></div>
      <div className="mb-8 mt-8">
        <Image
          className="w-full h-64 object-cover rounded-md"
          src={`http://localhost:1337${blog?.attributes.Image.data.attributes.url}`}
          alt="Blog Image"
        />
      </div>
      <div>
        <div
          className="markdown text-justify"
          dangerouslySetInnerHTML={{
            __html: blog?.attributes.Blogs ?? "",
          }}
        />
      </div>
      <div className="mb-4 mt-4 border-b"></div>
      <div className="mt-8">
        <div className="flex space-x-4 items-center">
          {blog?.attributes.Tags && (
            <Link
              to={`/blog/tag/${blog.attributes.Tags}`}
              className="bg-gray-200 px-3 py-1 rounded-full"
            >
              {blog?.attributes.Tags}
            </Link>
          )}
          {blog?.attributes.SecondTags && (
            <Link
              to={`/blog/tag/${blog.attributes.SecondTags}`}
              className="bg-gray-200 px-3 py-1 rounded-full"
            >
              {blog?.attributes.SecondTags}
            </Link>
          )}
          {blog?.attributes.ThirdTags && (
            <Link
              to={`/blog/tag/${blog.attributes.ThirdTags}`}
              className="bg-gray-200 px-3 py-1 rounded-full"
            >
              {blog?.attributes.ThirdTags}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogContent;
