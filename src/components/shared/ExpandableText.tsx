import React, { useState } from "react";

interface ExpandableTextProps {
  text: string;
  maxLength?: number;
}

const ExpandableText: React.FC<ExpandableTextProps> = ({
  text,
  maxLength = 100,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const displayText = isExpanded ? text : text.slice(0, maxLength) + "...";

  return (
    <div>
      <p className="text-gray-secondary">{displayText}</p>
      {text.length > maxLength && (
        <button className="text-primary text-xs" onClick={toggleExpanded}>
          <div className="flex items-center gap-2">
            {isExpanded ? (
              <>
                <p>Show Less</p> <i className="pi pi-chevron-up text-xs"></i>
              </>
            ) : (
              <>
                <p>Show More</p> <i className="pi pi-chevron-down text-xs"></i>
              </>
            )}
          </div>
        </button>
      )}
    </div>
  );
};

export default ExpandableText;
