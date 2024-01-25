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
    Tags: string;
    Submenu: boolean;
    SubTag: string;
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

  const toc: { id: string; title: string; level: number }[] = [];
  const processedData = filteredData?.map((document) => {
    const processedDocument = unified()
      .use(rehypeParse, {
        fragment: true,
      })
      .use(() => {
        return (tree) => {
          visit(tree, "element", (node) => {
            const elementNode = node as ElementNode;
            const tagName = elementNode.tagName.toLowerCase();
            if (["h1", "h2", "h3", "h4"].includes(tagName)) {
              const rawTitle = elementNode.children[0].value;
              const id = rawTitle.toLowerCase().replace(/\s+/g, "-");
              elementNode.properties.id = id;
              toc.push({
                id,
                title: rawTitle,
                level: parseInt(tagName.slice(1)),
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

  useEffect(() => {
    const hash = location.hash.substr(1);
    setActiveSection(hash);
  }, [location.hash]);

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
      { threshold: 0.5, rootMargin: "0px 0px -85% 0px" }
    );

    document.querySelectorAll("h1[id], h2[id], h3[id], h4[id]").forEach((heading) => {
      observer.observe(heading);
    });

    return () => {
      document.querySelectorAll("h1[id], h2[id], h3[id], h4[id]").forEach((heading) => {
        observer.unobserve(heading);
      });
    };
  }, [location, activeSection]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

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
    <div className="w-full bg-[#f9f9f9]">
      <div className="max-w-[1240px] mx-auto p-4 lg:grid lg:grid-cols-4 gap-8">
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
              {toc.map(({ id, title, level }) => (
                <li key={id} style={{ marginLeft: `${(level - 2) * 20}px` }}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToHeading(id);
                    }}
                    className={id === activeSection ? "active" : ""}
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
