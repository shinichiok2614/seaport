import { APP_DATE_FORMAT } from 'app/config/constants';
import React, { useEffect, useState } from 'react';
import { byteSize, TextFormat } from 'react-jhipster';
import { Link } from 'react-router-dom';
// import EditorComponent from 'app/modules/paragraph-edit-update/EditorComponent';
import './ParagraphViewEachPostPage.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export const ParagraphViewEachPostPage = ({ paragraph }) => {
  // const [content, setContent] = useState({});
  const [content, setContent] = useState('');
  const [isContentLoaded, setIsContentLoaded] = useState(false);

  // useEffect(() => {
  //   if (paragraph.content) {
  //     try {
  //       const parsedContent = JSON.parse(paragraph.content);
  //       if (
  //         parsedContent &&
  //         typeof parsedContent === 'object' &&
  //         parsedContent.blocks
  //       ) {
  //         setContent(parsedContent);
  //         setIsContentLoaded(true);
  //       } else {
  //         console.error('Invalid content structure', parsedContent);
  //       }
  //     } catch (e) {
  //       console.error('Failed to parse paragraph content', e);
  //     }
  //   }
  // }, [paragraph.content]);
  useEffect(() => {
    if (paragraph.content) {
      setContent(paragraph.content);
      setIsContentLoaded(true);
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
      {/* <div>{paragraph.content}</div> */}
      {/* {isContentLoaded && (
        <EditorComponent data={content} onChange={setContent} readOnly={true} />
      )} */}
      {isContentLoaded && (
        <CKEditor
          editor={ClassicEditor}
          data={content}
          onChange={(event, editor) => {
            const data = editor.getData();
            setContent(data);
          }}
          config={{
            toolbar: [], // Hide toolbar for read-only mode
          }}
          onReady={editor => {
            // Code runs when editor is ready
            editor.enableReadOnlyMode('read-only-mode');
          }}
        />
      )}
      {/* <div>{paragraph.contentType}</div> */}
    </div>
  );
};
