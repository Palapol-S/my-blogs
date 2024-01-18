import { Component } from "react";
import { Link } from "react-router-dom";
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

interface BlogsProps {
  blogs?: {
    data: Blog[];
  };
}

class Blogs extends Component<BlogsProps> {
  render() {
    const { blogs } = this.props;
    console.log("BlogsPage");
    console.log(blogs)
    return (
      <div className="w-full bg-[#f9f9f9] py-[50px]">
        <div className="max-w-[1140px] mx-auto">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 ss:grid-cols-1 gap-8 px-4 text-black">
            {blogs?.data.map((blog: Blog) => (
              <Link key={blog.id} to={`/blog-content/${blog.id}`} state={{ data: blog }}>
                <div
                  className="bg-white rounded-xl overflow-hidden drops-shadow-md"
                  style={{ height: "350px" }}
                >
                  <img
                    className="h-48 w-full object-cover"
                    src={`http://localhost:1337${blog.attributes.Image.data.attributes.url}`}
                    alt="Image"
                  />
                  <div className="p-2 md:p-2">
                    <h3 className="font-bold text-l md:text-l sm:text-base ss:text-sm my-1">
                      {blog.attributes.Title}
                    </h3>
                    <p className="line-clamp-2">{blog.attributes.Description}</p>
                    <div className="font-bold text-l md:text-l sm:text-base ss:text-sm my-1">
                      {blog.attributes.createdBy.firstname}{" "}
                      {blog.attributes.createdBy.lastname}
                    </div>
                    <div className="flex items-center md-4 mt-4">
                      <div className="text-gray-900 text-justify">
                        {blog.attributes.ReadTime}.
                      </div>
                      <div className="ml-2">
                        <h6 className="text-gray-900 text-justify">
                          {optionDate.format(new Date(blog.attributes.createdAt))}
                        </h6>
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
  }
}

export default Blogs;
