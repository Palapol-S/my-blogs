import { Component } from "react";
import { NavLink } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons-react";
import "../styles/sidebar.css";

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

interface SidebarProps {
  documents?: {
    data: Document[];
  };
}

interface SidebarState {
  openItems: number[];
}

class Sidebar extends Component<SidebarProps, SidebarState> {
  state: SidebarState = {
    openItems: [],
  };

  toggleOpen = (itemId: number) => {
    this.setState((prevState) => {
      const isOpen = prevState.openItems.includes(itemId);
      const updatedOpenItems = isOpen
        ? prevState.openItems.filter((id) => id !== itemId)
        : [...prevState.openItems, itemId];

      return {
        openItems: updatedOpenItems,
      };
    });
  };

  render() {
    const { documents } = this.props;
    const { openItems } = this.state;

    const groupedData: { [tag: string]: Document[] } = {};
    documents?.data.forEach((document) => {
      const tag = document.attributes.Tags;
      if (groupedData[tag]) {
        groupedData[tag].push(document);
      } else {
        groupedData[tag] = [document];
      }
    });

    return (
      <div className="sidebar">
        {Object.keys(groupedData).map((tag, index) => {
          const items = groupedData[tag];
          const isSubmenu = items[0].attributes.Submenu;
          const isOpen = openItems.includes(items[0].id);

          return (
            <div
              key={index}
              className={`sidebar-item${
                isSubmenu ? (isOpen ? " open" : "") : ""
              }`}
            >
              {isSubmenu ? (
                <div
                  className="sidebar-title"
                  onClick={() => this.toggleOpen(items[0].id)}
                >
                  <span>{items[0].attributes.Tags}</span>
                  {isSubmenu && <IconArrowRight className="toggle-btn" />}
                </div>
              ) : (
                <NavLink
                  to={`/document/${items[0].id}`}
                  className="sidebar-title"
                >
                  {items[0].attributes.Tags}
                </NavLink>
              )}
              {isSubmenu && isOpen && (
                <div className="sidebar-content">
                  {items.map((item, index) => (
                    <NavLink
                      key={index}
                      to={`/document/${item.id}`}
                      className="sidebar-link"
                    >
                      {item.attributes.SubTag}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Sidebar;
