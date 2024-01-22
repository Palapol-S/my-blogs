import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { optionDate } from "../functions/date";
import { Button } from "@mantine/core";

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
    Description: string;
    ReadTime: string;
    createdAt: string;
    Tags: string;
    views: number;
  };
}

interface BlogsProps {
  blogs?: {
    data: Blog[];
  };
}

const Blogs: React.FC<BlogsProps> = ({ blogs }) => {
  const [viewCounts, setViewCounts] = useState<Record<number, number>>({});

  useEffect(() => {
    const storedViewCounts = localStorage.getItem("blogViewCounts");
    if (storedViewCounts) {
      setViewCounts(JSON.parse(storedViewCounts));
    }
  }, []); // Run this effect only once when the component mounts

  const handleBlogItemClick = (blog: Blog) => {
    const updatedViewCounts = {
      ...viewCounts,
      [blog.id]: (viewCounts[blog.id] || 0) + 1,
    };

    setViewCounts(updatedViewCounts);
    localStorage.setItem("blogViewCounts", JSON.stringify(updatedViewCounts));
  };

  // Sort blogs by views in descending order
  const sortedBlogs = blogs?.data
    .slice()
    .sort((a, b) => (viewCounts[b.id] || 0) - (viewCounts[a.id] || 0));

  return (
    <div className="w-full bg-[#f9f9f9] py-[50px]">
      <div className="max-w-[1140px] mx-auto">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 ss:grid-cols-1 gap-8 px-4 text-black">
          {sortedBlogs?.map((blog: Blog) => (
            <Link
              key={blog.id}
              to={`/blog-content/${blog.id}`}
              state={{ data: blog }}
              onClick={() => handleBlogItemClick(blog)}
            >
              <div
                className="bg-white rounded-xl overflow-hidden drops-shadow-md"
                style={{ maxHeight: "400px" }}
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
                    <div className="bg-gray-200 px-3 py-1 rounded-full">
                      {blog.attributes.Tags}
                    </div>
                    {/* Views: {viewCounts[blog.id] || 0} */}
                    <Button
                      style={{
                        color: "#18816A",
                        marginLeft: "8px",
                        borderRadius: "8px",
                      }}
                    >
                      Read More
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

export default Blogs;
