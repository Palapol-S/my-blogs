import React, { useEffect, useRef, useState } from "react";
import { Text } from "@mantine/core";
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import { useParams, useLocation } from "react-router-dom";
import "../styles/tableOfContent.css";

interface Document {
  id: number;
  attributes: {
    Title: string;
    Documentation: string;
  };
}

interface DocsContentProps {
  documents?: {
    data: Document[];
  };
}

interface ElementNode {
  type: string;
  tagName: string;
  children: { type: string; value: string }[];
  properties: { [key: string]: any };
}

const DocsContent: React.FC<DocsContentProps> = ({ documents }) => {
  const { id } = useParams<{ id: string }>();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const tocRef = useRef<HTMLUListElement | null>(null);
  const location = useLocation();

  const filteredData = documents?.data.filter(
    (document) => document.id === Number(id)
  );

  const toc: { id: string; title: string }[] = [];
  const processedData = filteredData?.map((document) => {
    const processedDocument = unified()
      .use(rehypeParse, {
        fragment: true,
      })
      .use(() => {
        return (tree) => {
          visit(tree, "element", (node) => {
            const elementNode = node as ElementNode;
            if (elementNode.tagName === "h2") {
              const rawTitle = elementNode.children[0].value;
              const id = rawTitle.toLowerCase().replace(/\s+/g, "-");
              elementNode.properties.id = id;
              toc.push({
                id,
                title: rawTitle,
              });
            }
          });
        };
      })
      .use(rehypeStringify)
      .processSync(document?.attributes.Documentation ?? "")
      .toString();

    return {
      ...document,
      processedDocument,
    };
  });

  // Extract activeSection from the location hash when the page changes
  useEffect(() => {
    const hash = location.hash.substr(1);
    setActiveSection(hash);
  }, [location.hash]);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting && id !== activeSection) {
            setActiveSection(id);
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe headings when the component mounts or the page changes
    document.querySelectorAll("h2[id]").forEach((heading) => {
      observer.observe(heading);
    });

    return () => {
      document.querySelectorAll("h2[id]").forEach((heading) => {
        observer.unobserve(heading);
      });
    };
  }, [location, activeSection]);

  // Scroll to top when switching between pages
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Scroll to heading when TOC item is clicked
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  // Highlight active section in TOC
  useEffect(() => {
    if (tocRef.current) {
      const activeItem = tocRef.current.querySelector(
        `a[href="#${activeSection}"]`
      );
      if (activeItem) {
        tocRef.current.querySelectorAll("a").forEach((item) => {
          item.classList.remove("active");
        });
        activeItem.classList.add("active");
      }
    }
  }, [activeSection]);

  return (
    <div className="w-full pb-10 bg-[#f9f9f9]">
      <div className="max-w-[1240px] mx-auto p-4 grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div>
            {processedData?.map((document) => (
              <React.Fragment key={document.id}>
                <Text
                  size="lg"
                  fw={500}
                  className="font-bold text-2xl md:text-xl sm:text-lg ss:text-md my-1 px-4"
                >
                  {document.attributes.Title}
                </Text>
                <div
                  className="markdown line-break text-justify px-4"
                  dangerouslySetInnerHTML={{
                    __html: document.processedDocument ?? "",
                  }}
                />
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="lg:col-span-1">
          <nav ref={tocRef}>
            <ul>
              {toc.map(({ id, title }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToHeading(id);
                    }}
                  >
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default DocsContent;
