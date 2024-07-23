import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import '../assets/linkpopover.css';

interface LinkWithPopoverProps {
  url: string;
  summary: string;
}

const LinkWithPopover: React.FC<LinkWithPopoverProps> = ({ url, summary }) => {
  const [showPopover, setShowPopover] = useState(false);
  const linkRef = useRef(null);
  const popperRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const popover = showPopover ? (
    <div
      className="summary-popover"
      style={{
        position: 'absolute',
        left: mousePosition.x + 15,
        top: mousePosition.y + 15,
      }}
    >
      {summary}
    </div>
  ) : null;

  return (
    <>
      <a
        ref={linkRef}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="source-link"
        onMouseEnter={() => setShowPopover(true)}
        onMouseLeave={() => setShowPopover(false)}
        onMouseMove={handleMouseMove}
      >
        {url}
      </a>
      {createPortal(popover, document.body)}
    </>
  );
};

export default LinkWithPopover;