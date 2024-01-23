import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { optionDate } from "../functions/date";
import { Button } from "@mantine/core";

interface BlogTag {
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
    Description: string;
    ReadTime: string;
    createdAt: string;
    Tags: string;
    SecondTags: string | null;
    ThirdTags: string | null;
    views: number;
  };
}

interface BlogTagProps {
  blogs?: {
    data: BlogTag[];
  };
}

const BlogTag: React.FC<BlogTagProps> = ({ blogs }) => {
  const [viewCounts, setViewCounts] = useState<Record<number, number>>({});
  const { tag } = useParams<{ tag: string }>(); // Get the 'tag' parameter from the URL

  useEffect(() => {
    const storedViewCounts = localStorage.getItem("blogViewCounts");
    if (storedViewCounts) {
      setViewCounts(JSON.parse(storedViewCounts));
    }
  }, []); // Run this effect only once when the component mounts

  const handleBlogItemClick = (blog: BlogTag) => {
    const updatedViewCounts = {
      ...viewCounts,
      [blog.id]: (viewCounts[blog.id] || 0) + 1,
    };

    setViewCounts(updatedViewCounts);
    localStorage.setItem("blogViewCounts", JSON.stringify(updatedViewCounts));
  };

  // Filter blogs based on the specified tag in Tags, SecondTags, or ThirdTags
  const filteredBlogs = blogs?.data.filter((blog) => {
    const hasTag = blog.attributes.Tags.includes(tag as string); // Assert that tag is a string
    const hasSecondTag = blog.attributes.SecondTags?.includes(tag as string) || false;
    const hasThirdTag = blog.attributes.ThirdTags?.includes(tag as string) || false;

    return hasTag || hasSecondTag || hasThirdTag;
  });

  // Sort filtered blogs by views in descending order
  const sortedBlogs = filteredBlogs?.slice().sort((a, b) => (viewCounts[b.id] || 0) - (viewCounts[a.id] || 0));

  return (
    <div className="w-full bg-[#f9f9f9] py-[50px]">
      <div className="max-w-[1140px] mx-auto">
        <h1 className="text-center text-3xl font-bold mb-10">Blogs with Tag: {tag}</h1>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 ss:grid-cols-1 gap-8 px-4 text-black">
          {sortedBlogs?.map((blog: BlogTag) => (
            <Link
              key={blog.id}
              to={`/blog-content/${blog.id}`}
              state={{ data: blog }}
              onClick={() => handleBlogItemClick(blog)}
            >
              <div
                className="bg-white rounded-xl overflow-hidden shadow-md"
                style={{ height: "400px" }}
              >
                <img
                  className="h-48 w-full object-cover"
                  src={`http://localhost:1337${blog.attributes.Image.data.attributes.url}`}
                  alt="Image"
                />
                <div className="ml-2 mr-2 p-2 md:p-2 flex flex-col">
                  <div>
                    <h3 className="font-bold text-l md:text-l sm:text-base ss:text-sm my-1">
                      {blog.attributes.Title}
                    </h3>
                    <p className="line-clamp-2">
                      {blog.attributes.Description}
                    </p>
                    <div className="font-bold text-l md:text-l sm:text-base ss:text-sm my-1 mt-2">
                      {blog.attributes.createdBy.firstname}{" "}
                      {blog.attributes.createdBy.lastname}
                    </div>
                    <div className="flex items-center md-4 mt-4">
                      <div className="text-gray-900 text-justify">
                        {blog.attributes.ReadTime}.
                      </div>
                      <div className="ml-2">
                        <p className="text-gray-900 text-justify">
                          {optionDate.format(
                            new Date(blog.attributes.createdAt)
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between">
                    <div
                      className="blog-tag bg-gray-200 px-3 py-1 rounded-full text-xs"
                      style={{ opacity: 0.7 }}
                    >
                      {blog.attributes.Tags}
                    </div>
                    {/* Views: {viewCounts[blog.id] || 0} */}
                    <Button
                      style={{
                        fontSize: "12px",
                        color: "#ff9800",
                        marginLeft: "8px",
                        borderRadius: "8px",
                      }}
                    >
                      <p className="read-more-button">Read More</p>
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogTag;
