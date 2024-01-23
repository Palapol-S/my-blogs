import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { optionDate } from "../functions/date";
import { Button } from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";

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
    SecondTags: string | null;
    ThirdTags: string | null;
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
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[] | null>(null);

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

  const handleSearchClick = () => {
    // Filter blogs based on search query
    const newFilteredBlogs = blogs?.data.filter((blog) => {
      const isTitleMatch = blog.attributes.Title.toLowerCase().includes(searchQuery.toLowerCase());
      const isTagsMatch = blog.attributes.Tags.toLowerCase().includes(searchQuery.toLowerCase());
      const isSecondTagsMatch = blog.attributes.SecondTags && blog.attributes.SecondTags.toLowerCase().includes(searchQuery.toLowerCase());
      const isThirdTagsMatch = blog.attributes.ThirdTags && blog.attributes.ThirdTags.toLowerCase().includes(searchQuery.toLowerCase());

      return isTitleMatch || isTagsMatch || isSecondTagsMatch || isThirdTagsMatch;
    });

    setFilteredBlogs(newFilteredBlogs || null);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setFilteredBlogs(null);
  };

  // Sort blogs by views in descending order
  const sortedBlogs = blogs?.data
    .slice()
    .sort((a, b) => (viewCounts[b.id] || 0) - (viewCounts[a.id] || 0));

  return (
    <div className="w-full bg-[#f9f9f9] py-[50px]">
      <div className="max-w-[1100px] mx-auto flex flex-col items-center">
        {/* Search Box with IconSearch and IconX */}
        <div className="relative w-1/2 mb-4">
          <input
            name="search"
            type="text"
            placeholder="Search by Title or Tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md pl-10"
          />
          {searchQuery && (
            <Button
              className="absolute top-3 right-3 cursor-pointer"
              onClick={handleClearSearch}
            >
              <IconX size={20} className="text-gray-500" />
            </Button>
          )}
          <Button
            className="absolute top-3 left-3 cursor-pointer"
            onClick={handleSearchClick}
          >
            <IconSearch size={20} className="text-gray-500" />
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 ss:grid-cols-1 gap-8 px-4 mt-4 text-black">
          {(filteredBlogs || sortedBlogs)?.map((blog: Blog) => (
            <Link
              key={blog.id}
              to={`/blog-content/${blog.id}`}
              state={{ data: blog }}
              onClick={() => handleBlogItemClick(blog)}
            >
              <div
                className="bg-white rounded-xl overflow-hidden shadow-md"
                style={{ height: "380px" }}
              >
                <img
                  className="h-48 w-full object-cover"
                  src={`http://localhost:1337${blog.attributes.Image.data.attributes.url}`}
                  alt="Image"
                />
                <div className="ml-2 mr-2 p-2 md:p-2 flex flex-col">
                  <div className="h-20">
                    <h3 className="font-bold text-l md:text-l sm:text-base ss:text-sm my-1">
                      {blog.attributes.Title}
                    </h3>
                    <p className="line-clamp-2">
                      {blog.attributes.Description}
                    </p>
                  </div>
                  <div>
                    <div className="font-bold text-l md:text-l sm:text-base ss:text-sm my-1">
                      {blog.attributes.createdBy.firstname}{" "}
                      {blog.attributes.createdBy.lastname}
                    </div>
                    <div className="flex items-center md-4">
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
                    <div className="mt-2 flex justify-between">
                      <div
                        className="blog-tag bg-gray-200 px-3 py-1 rounded-full text-xs"
                        style={{ opacity: 0.7 }}
                      >
                        {blog.attributes.Tags}
                      </div>
                      <Button
                        style={{
                          fontSize: "12px",
                          color: "#18816A",
                          marginLeft: "8px",
                          borderRadius: "8px",
                        }}
                      >
                        <p className="read-more-button">Read More</p>
                      </Button>
                    </div>
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
