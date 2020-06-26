import React, { useState } from "react";

const TabButtons = ({ buttons, changeTab, activeTab }) => {
  return (
    <div className="tab-buttons">
      {buttons.map((button, i) => {
        return (
          <button
            key={i}
            className="tab-button"
            onClick={() => changeTab(button)}
          >
            {button}
          </button>
        );
      })}
    </div>
  );
};

function Tabs({ children }) {
  let content;
  let buttons = [];
  const [activeTab, setActiveTab] = useState(null);

  const onTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="raven-tab">
      <div className="tabs">
        <div>
          {React.Children.map(children, (child) => {
            buttons.push(child.props.label);
            if (child.props.label === activeTab || child.props.defult)
              content = child.props.children;
          })}

          <TabButtons
            activeTab={activeTab}
            buttons={buttons}
            changeTab={onTabChange}
          />
          <div className="tab-content">{content}</div>
        </div>
      </div>
    </div>
  );
}

export default Tabs;
