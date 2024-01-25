import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { optionDate } from "../functions/date";
import { Button, Card } from "@mantine/core";
import { IconSearch, IconX, IconClock } from "@tabler/icons-react";

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
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [suggestionsIndex, setSuggestionsIndex] = useState<number>(0);

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

  const getSuggestions = () => {
    const suggestionsSet = new Set<string>();
    blogs?.data.forEach((blog) => {
      suggestionsSet.add(blog.attributes.Title.toLowerCase());
      suggestionsSet.add(blog.attributes.Tags.toLowerCase());
      if (blog.attributes.SecondTags) {
        suggestionsSet.add(blog.attributes.SecondTags.toLowerCase());
      }
      if (blog.attributes.ThirdTags) {
        suggestionsSet.add(blog.attributes.ThirdTags.toLowerCase());
      }
    });
    return Array.from(suggestionsSet);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setSuggestions(
      getSuggestions().filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      )
    );
    setSuggestionsIndex(0); // Reset suggestion index when search query changes
  };

  const handleSearchClick = () => {
    // Filter blogs based on search query
    const newFilteredBlogs = blogs?.data.filter((blog) => {
      const isTitleMatch = blog.attributes.Title.toLowerCase().includes(
        searchQuery.toLowerCase()
      );
      const isTagsMatch = blog.attributes.Tags.toLowerCase().includes(
        searchQuery.toLowerCase()
      );
      const isSecondTagsMatch =
        blog.attributes.SecondTags &&
        blog.attributes.SecondTags.toLowerCase().includes(
          searchQuery.toLowerCase()
        );
      const isThirdTagsMatch =
        blog.attributes.ThirdTags &&
        blog.attributes.ThirdTags.toLowerCase().includes(
          searchQuery.toLowerCase()
        );

      return (
        isTitleMatch || isTagsMatch || isSecondTagsMatch || isThirdTagsMatch
      );
    });

    setFilteredBlogs(newFilteredBlogs || null);
    setSuggestions([]); // Clear suggestions after clicking search
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setFilteredBlogs(null);
    setSuggestions([]);
    setSuggestionsIndex(0); // Reset suggestion index when clearing search
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setFilteredBlogs(
      blogs?.data.filter(
        (blog) =>
          blog.attributes.Title.toLowerCase() === suggestion.toLowerCase() ||
          blog.attributes.Tags.toLowerCase() === suggestion.toLowerCase() ||
          (blog.attributes.SecondTags &&
            blog.attributes.SecondTags.toLowerCase() ===
              suggestion.toLowerCase()) ||
          (blog.attributes.ThirdTags &&
            blog.attributes.ThirdTags.toLowerCase() ===
              suggestion.toLowerCase())
      ) || null
    );
    setSuggestions([]);
    setSuggestionsIndex(0); // Reset suggestion index when selecting a suggestion
  };

  // Sort blogs by views in descending order
  const sortedBlogs = blogs?.data
    .slice()
    .sort((a, b) => (viewCounts[b.id] || 0) - (viewCounts[a.id] || 0));

  return (
    <div className="w-full bg-[#f9f9f9] py-[50px]">
      <div className="max-w-[1100px] mx-auto flex flex-col items-center">
        <div className="relative w-1/2 mb-4">
          <input
            name="search"
            type="text"
            placeholder="Search by Title or Tags..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            onKeyPress={handleKeyPress}
            autoComplete="off"
            className="w-full p-3 pl-5 border rounded"
          />
          {searchQuery && (
            <Button
              name="close"
              className="absolute top-3 right-3 cursor-pointer"
              onClick={handleClearSearch}
            >
              <IconX size={24} className="text-gray-500" />
            </Button>
          )}
          <Button
            name="search"
            className="absolute top-3 right-12 cursor-pointer"
            onClick={handleSearchClick}
          >
            <IconSearch size={24} className="text-gray-500" />
          </Button>
          {suggestions.length > 0 && (
            <div className="absolute z-10 mt-2 bg-white border border-gray-300 rounded-md shadow-md w-full">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className={`p-2 cursor-pointer hover:bg-gray-100 ${
                    index === suggestionsIndex ? "bg-gray-100" : ""
                  }`}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 ss:grid-cols-1 gap-8 px-4 mt-4 text-black">
          {(filteredBlogs || sortedBlogs)?.map((blog: Blog) => (
            <Link
              key={blog.id}
              to={`/blog-content/${blog.id}`}
              state={{ data: blog }}
              onClick={() => handleBlogItemClick(blog)}
            >
              <Card
                shadow="md"
                padding="xs"
                radius="md"
                className="bg-white rounded-xl overflow-hidden shadow-md"
                style={{ height: "100%" }}
              >
                <img
                  className="h-48 w-full object-cover rounded-t-md"
                  src={`http://localhost:1337${blog.attributes.Image.data.attributes.url}`}
                  alt="Image"
                />
                <Card.Section>
                  <div className="flex flex-col h-20 px-2">
                    <h3 className="line-clamp-1 font-bold text-l md:text-l sm:text-base ss:text-sm my-1">
                      {blog.attributes.Title}
                    </h3>
                    <p className="line-clamp-2">
                      {blog.attributes.Description}
                    </p>
                  </div>
                </Card.Section>
                <Card.Section>
                  <div className="font-bold text-l md:text-l sm:text-base ss:text-sm my-1 px-2">
                    {blog.attributes.createdBy.firstname}{" "}
                    {blog.attributes.createdBy.lastname}
                  </div>
                  <div className="flex items-center md-4 px-2">
                    <IconClock size={16} className="text-gray-500 mr-1" />
                    <div className="text-gray-900 text-justify">
                      {blog.attributes.ReadTime}.
                    </div>
                    <div className="ml-2">
                      <p className="text-gray-900 text-justify">
                        {optionDate.format(new Date(blog.attributes.createdAt))}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between px-2 pb-2">
                    <div
                      className="blog-tag bg-gray-200 px-3 py-1 rounded-full text-xs"
                      style={{ opacity: 0.7 }}
                    >
                      {blog.attributes.Tags}
                    </div>
                    <Button
                      style={{
                        fontSize: "12px",
                        color: "#FA8072",
                        marginLeft: "8px",
                        borderRadius: "8px",
                      }}
                    >
                      <p className="read-more-button">Read More</p>
                    </Button>
                  </div>
                </Card.Section>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
