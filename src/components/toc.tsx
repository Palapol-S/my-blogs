//unused component right now
import { Component } from "react";
import "../styles/tableOfContent.css";
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";

interface Document {
  id: number;
  attributes: {
    Title: string;
    Documentation: string;
  };
}

interface DocumentProps {
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

interface DocumentsState {
  data: Document[];
}

class TableOfContent extends Component<DocumentProps, DocumentsState> {
  private observer: IntersectionObserver | null = null;

  constructor(props: DocumentProps) {
    super(props);

    this.state = {
      data: props.documents?.data || [],
    };
  }

  componentDidUpdate() {
    this.observeHeadings();
  }

  componentWillUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  observeHeadings() {
    if (this.observer) {
      this.observer.disconnect();
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          const navItem = document.querySelector(`nav a[href="#${id}"]`);

          if (navItem) {
            navItem.classList.toggle("active", entry.isIntersecting);
          }
        });
      },
      { threshold: 0.5 } // Adjust the threshold as needed
    );

    document.querySelectorAll("h1[id], h2[id], h3[id], h4[id]").forEach((heading) => {
      this.observer!.observe(heading);
    });
  }

  render() {
    const { documents } = this.props;
    console.log(documents);
    const toc: { id: string; title: string }[] = [];
    const processedData = this.state.data.map((document) => {
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
        .processSync(document.attributes.Documentation ?? "")
        .toString();
        
      return {
        ...document,
        processedDocument,
      };
    });

    /* console.log */(processedData)

    return (
      <nav>
        <ul>
          {toc.map(({ id, title }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  this.scrollToHeading(id);
                }}
              >
                {title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default TableOfContent;
