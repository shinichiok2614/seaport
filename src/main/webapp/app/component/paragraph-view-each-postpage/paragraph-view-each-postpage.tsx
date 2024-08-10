import { APP_DATE_FORMAT } from 'app/config/constants';
import React, { useEffect, useState } from 'react';
import { byteSize, TextFormat } from 'react-jhipster';
import { Link } from 'react-router-dom';
import EditorComponent from 'app/modules/paragraph-edit-update/EditorComponent';
import './ParagraphViewEachPostPage.css';

export const ParagraphViewEachPostPage = ({ paragraph }) => {
  const [content, setContent] = useState({});
  const [isContentLoaded, setIsContentLoaded] = useState(false);

  useEffect(() => {
    if (paragraph.content) {
      try {
        const parsedContent = JSON.parse(paragraph.content);
        if (
          parsedContent &&
          typeof parsedContent === 'object' &&
          parsedContent.blocks
        ) {
          setContent(parsedContent);
          setIsContentLoaded(true);
        } else {
          console.error('Invalid content structure', parsedContent);
        }
      } catch (e) {
        console.error('Failed to parse paragraph content', e);
      }
    }
  }, [paragraph.content]);
  return (
    <div className="ParagraphViewEachPostPage">
      {paragraph.image ? (
        <div className="ParagraphViewEachPostPage1">
          {paragraph.imageContentType ? (
            <img
              src={`data:${paragraph.imageContentType};base64,${paragraph.image}`}
            />
          ) : null}
          <div className="ParagraphViewEachPostPage1-cation">
            {paragraph.caption}
          </div>
        </div>
      ) : null}
      <div>{paragraph.content}</div>
      {isContentLoaded && (
        <EditorComponent data={content} onChange={setContent} readOnly={true} />
      )}

      {/* <div>{paragraph.contentType}</div> */}
    </div>
  );
};
