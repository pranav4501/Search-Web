import React, { useState, useRef } from 'react';
import { usePopper } from 'react-popper';

interface LinkWithPopoverProps {
  url: string;
  summary: string;
}

const LinkWithPopover: React.FC<LinkWithPopoverProps> = ({ url, summary }) => {
  const [showPopover, setShowPopover] = useState(false);
  const linkRef = useRef(null);
  const popperRef = useRef(null);
  const { styles, attributes } = usePopper(linkRef.current, popperRef.current, {
    placement: 'top',
  });

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
      >
        {url}
      </a>
      {showPopover && (
        <div
          ref={popperRef}
          style={styles.popper}
          {...attributes.popper}
          className="popover"
        >
          {summary}
        </div>
      )}
    </>
  );
};

export default LinkWithPopover;