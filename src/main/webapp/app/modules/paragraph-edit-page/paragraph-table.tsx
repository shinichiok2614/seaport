// import React, { useEffect, useState } from 'react';
// import { Translate } from 'react-jhipster';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Link } from 'react-router-dom';
// import { Button } from 'reactstrap';
// import EditorComponent from '../paragraph-edit-update/EditorComponent';
// import './ParagraphTable.css';

// const ParagraphTable = ({
//   paragraphList,
//   openFile,
//   loading,
//   handleSyncList,
//   postId,
// }) => {
//   const [isContentLoaded, setIsContentLoaded] = useState(false);
//   const [contentMap, setContentMap] = useState({});

//   const adjustEditorHeight = id => {
//     const editorElement = document.getElementById(`editorjs-${id}`);
//     if (editorElement) {
//       const lineHeight = 24; // Cấu hình chiều cao dòng phù hợp với font của bạn
//       const numberOfLines = editorElement.scrollHeight / lineHeight;
//       const newHeight = numberOfLines * lineHeight;
//       editorElement.style.height = `250px`;
//       // editorElement.style.height = `${newHeight}px`;
//     }
//   };

//   useEffect(() => {
//     paragraphList.forEach(paragraph => {
//       if (contentMap[paragraph.id]) {
//         adjustEditorHeight(paragraph.id);
//       }
//     });
//   }, [contentMap]);
//   useEffect(() => {
//     if (paragraphList && paragraphList.length > 0) {
//       const initialContentMap = {};
//       paragraphList.forEach(paragraph => {
//         if (paragraph.content) {
//           try {
//             const parsedContent = JSON.parse(paragraph.content);
//             if (
//               parsedContent &&
//               typeof parsedContent === 'object' &&
//               parsedContent.blocks
//             ) {
//               initialContentMap[paragraph.id] = parsedContent;
//             } else {
//               console.error('Invalid content structure', parsedContent);
//             }
//           } catch (e) {
//             console.error('Failed to parse paragraph content', e);
//           }
//         }
//       });
//       setContentMap(initialContentMap);
//       setIsContentLoaded(true);
//     }
//   }, [paragraphList]);
//   return (
//     <div className="ParagraphTable">
//       {paragraphList && paragraphList.length > 0
//         ? paragraphList.map((paragraph, i) => (
//             <div key={`entity-${paragraph.id}`} className="paragraph-container">
//               {/* <div>{paragraph.id}</div> */}
//               {paragraph.image ? (
//                 <div className="image-container">
//                   {paragraph.imageContentType ? (
//                     <a
//                       onClick={openFile(
//                         paragraph.imageContentType,
//                         paragraph.image,
//                       )}
//                     >
//                       <img
//                         src={`data:${paragraph.imageContentType};base64,${paragraph.image}`}
//                         alt={paragraph.caption}
//                         className="centered-image"
//                       />
//                       &nbsp;
//                     </a>
//                   ) : null}
//                 </div>
//               ) : null}
//               <div className="caption-container">{paragraph.caption}</div>
//               <div>{paragraph.content}</div>
//               <div id={`editorjs-${paragraph.id}`} className="editor-container">
//                 {isContentLoaded && contentMap[paragraph.id] && (
//                   <EditorComponent
//                     data={contentMap[paragraph.id]}
//                     onChange={newContent => {
//                       setContentMap({
//                         ...contentMap,
//                         [paragraph.id]: newContent,
//                       });
//                     }}
//                     holder={`editorjs-${paragraph.id}`}
//                     readOnly={true}
//                   />
//                 )}
//               </div>
//               <div className="btn-group flex-btn-group-container">
//                 <Button
//                   tag={Link}
//                   to={`/paragrapheditupdatepage/${paragraph.id}?postId=${postId}`}
//                   color="primary"
//                   size="sm"
//                   data-cy="entityEditButton"
//                 >
//                   <FontAwesomeIcon icon="pencil-alt" />{' '}
//                   <span className="d-none d-md-inline">
//                     <Translate contentKey="entity.action.edit">Edit</Translate>
//                   </span>
//                 </Button>
//                 <Button
//                   onClick={() =>
//                     (window.location.href = `/paragraph/${paragraph.id}/delete`)
//                   }
//                   color="danger"
//                   size="sm"
//                   data-cy="entityDeleteButton"
//                 >
//                   <FontAwesomeIcon icon="trash" />{' '}
//                   <span className="d-none d-md-inline">
//                     <Translate contentKey="entity.action.delete">
//                       Delete
//                     </Translate>
//                   </span>
//                 </Button>
//               </div>
//             </div>
//           ))
//         : !loading && (
//             <div className="alert alert-warning">
//               <Translate contentKey="seaportApp.paragraph.home.notFound">
//                 No Paragraphs found
//               </Translate>
//             </div>
//           )}
//     </div>
//   );
// };

// export default ParagraphTable;
// import React, { useEffect, useState } from 'react';
// import { Translate } from 'react-jhipster';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Link } from 'react-router-dom';
// import { Button } from 'reactstrap';
// import { CKEditor } from '@ckeditor/ckeditor5-react'; // Import CKEditor
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'; // Import CKEditor build
// import './ParagraphTable.css';

// const ParagraphTable = ({
//   paragraphList,
//   openFile,
//   loading,
//   handleSyncList,
//   postId,
// }) => {
//   const [isContentLoaded, setIsContentLoaded] = useState(false);
//   const [contentMap, setContentMap] = useState({});

//   const adjustEditorHeight = id => {
//     const editorElement = document.getElementById(`editorjs-${id}`);
//     if (editorElement) {
//       const lineHeight = 24; // Cấu hình chiều cao dòng phù hợp với font của bạn
//       const numberOfLines = editorElement.scrollHeight / lineHeight;
//       const newHeight = numberOfLines * lineHeight;
//       editorElement.style.height = `250px`;
//       // editorElement.style.height = `${newHeight}px`;
//     }
//   };

//   useEffect(() => {
//     paragraphList.forEach(paragraph => {
//       if (contentMap[paragraph.id]) {
//         adjustEditorHeight(paragraph.id);
//       }
//     });
//   }, [contentMap]);

//   useEffect(() => {
//     if (paragraphList && paragraphList.length > 0) {
//       const initialContentMap = {};
//       paragraphList.forEach(paragraph => {
//         if (paragraph.content) {
//           try {
//             const parsedContent = JSON.parse(paragraph.content);
//             if (
//               parsedContent &&
//               typeof parsedContent === 'object' &&
//               parsedContent.blocks
//             ) {
//               initialContentMap[paragraph.id] = parsedContent;
//             } else {
//               console.error('Invalid content structure', parsedContent);
//             }
//           } catch (e) {
//             console.error('Failed to parse paragraph content', e);
//             initialContentMap[paragraph.id] = paragraph.content; // If not JSON, consider it plain text
//           }
//         }
//       });
//       setContentMap(initialContentMap);
//       setIsContentLoaded(true);
//     }
//   }, [paragraphList]);

//   return (
//     <div className="ParagraphTable">
//       {paragraphList && paragraphList.length > 0
//         ? paragraphList.map((paragraph, i) => (
//             <div key={`entity-${paragraph.id}`} className="paragraph-container">
//               {paragraph.image ? (
//                 <div className="image-container">
//                   {paragraph.imageContentType ? (
//                     <a
//                       onClick={openFile(
//                         paragraph.imageContentType,
//                         paragraph.image,
//                       )}
//                     >
//                       <img
//                         src={`data:${paragraph.imageContentType};base64,${paragraph.image}`}
//                         alt={paragraph.caption}
//                         className="centered-image"
//                       />
//                       &nbsp;
//                     </a>
//                   ) : null}
//                 </div>
//               ) : null}
//               <div className="caption-container">{paragraph.caption}</div>

//               <div id={`editorjs-${paragraph.id}`} className="editor-container">
//                 {isContentLoaded && contentMap[paragraph.id] && (
//                   <CKEditor
//                     editor={ClassicEditor}
//                     data={contentMap[paragraph.id]} // Truyền nội dung vào CKEditor
//                     config={{
//                       toolbar: [], // Ẩn thanh công cụ để chỉ đọc
//                     }}
//                     onReady={editor => {
//                       // Code chạy khi editor sẵn sàng
//                       editor.enableReadOnlyMode('my-feature-id');
//                     }}
//                   />
//                 )}
//               </div>

//               <div className="btn-group flex-btn-group-container">
//                 <Button
//                   tag={Link}
//                   to={`/paragrapheditupdatepage/${paragraph.id}?postId=${postId}`}
//                   color="primary"
//                   size="sm"
//                   data-cy="entityEditButton"
//                 >
//                   <FontAwesomeIcon icon="pencil-alt" />{' '}
//                   <span className="d-none d-md-inline">
//                     <Translate contentKey="entity.action.edit">Edit</Translate>
//                   </span>
//                 </Button>
//                 <Button
//                   onClick={() =>
//                     (window.location.href = `/paragraph/${paragraph.id}/delete`)
//                   }
//                   color="danger"
//                   size="sm"
//                   data-cy="entityDeleteButton"
//                 >
//                   <FontAwesomeIcon icon="trash" />{' '}
//                   <span className="d-none d-md-inline">
//                     <Translate contentKey="entity.action.delete">
//                       Delete
//                     </Translate>
//                   </span>
//                 </Button>
//               </div>
//             </div>
//           ))
//         : !loading && (
//             <div className="alert alert-warning">
//               <Translate contentKey="seaportApp.paragraph.home.notFound">
//                 No Paragraphs found
//               </Translate>
//             </div>
//           )}
//     </div>
//   );
// };

// export default ParagraphTable;

// import React, { useEffect, useState } from 'react';
// import { Translate } from 'react-jhipster';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Link } from 'react-router-dom';
// import { Button } from 'reactstrap';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import './ParagraphTable.css';

// const ParagraphTable = ({ paragraphList, openFile, loading, postId }) => {
//   const [contentMap, setContentMap] = useState({});

//   useEffect(() => {
//     if (paragraphList && paragraphList.length > 0) {
//       const initialContentMap = {};
//       paragraphList.forEach(paragraph => {
//         if (paragraph.content) {
//           initialContentMap[paragraph.id] = paragraph.content; // Use content directly
//         }
//       });
//       setContentMap(initialContentMap);
//     }
//   }, [paragraphList]);

//   return (
//     <div className="ParagraphTable">
//       {paragraphList && paragraphList.length > 0
//         ? paragraphList.map(paragraph => (
//             <div key={`entity-${paragraph.id}`} className="paragraph-container">
//               {paragraph.image && paragraph.imageContentType && (
//                 <div className="image-container">
//                   <a
//                     onClick={openFile(
//                       paragraph.imageContentType,
//                       paragraph.image,
//                     )}
//                   >
//                     <img
//                       src={`data:${paragraph.imageContentType};base64,${paragraph.image}`}
//                       alt={paragraph.caption}
//                       className="centered-image"
//                     />
//                   </a>
//                 </div>
//               )}
//               <div className="caption-container">{paragraph.caption}</div>

//               <div id={`editorjs-${paragraph.id}`} className="editor-container">
//                 {contentMap[paragraph.id] && (
//                   <CKEditor
//                     editor={ClassicEditor}
//                     data={contentMap[paragraph.id]} // Directly use content without parsing
//                     config={{
//                       toolbar: [], // Hide toolbar for read-only mode
//                     }}
//                   />
//                 )}
//               </div>

//               <div className="btn-group flex-btn-group-container">
//                 <Button
//                   tag={Link}
//                   to={`/paragrapheditupdatepage/${paragraph.id}?postId=${postId}`}
//                   color="primary"
//                   size="sm"
//                   data-cy="entityEditButton"
//                 >
//                   <FontAwesomeIcon icon="pencil-alt" />{' '}
//                   <span className="d-none d-md-inline">
//                     <Translate contentKey="entity.action.edit">Edit</Translate>
//                   </span>
//                 </Button>
//                 <Button
//                   onClick={() =>
//                     (window.location.href = `/paragraph/${paragraph.id}/delete`)
//                   }
//                   color="danger"
//                   size="sm"
//                   data-cy="entityDeleteButton"
//                 >
//                   <FontAwesomeIcon icon="trash" />{' '}
//                   <span className="d-none d-md-inline">
//                     <Translate contentKey="entity.action.delete">
//                       Delete
//                     </Translate>
//                   </span>
//                 </Button>
//               </div>
//             </div>
//           ))
//         : !loading && (
//             <div className="alert alert-warning">
//               <Translate contentKey="seaportApp.paragraph.home.notFound">
//                 No Paragraphs found
//               </Translate>
//             </div>
//           )}
//     </div>
//   );
// };

// export default ParagraphTable;
// import React, { useEffect, useState } from 'react';
// import { Translate } from 'react-jhipster';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Link } from 'react-router-dom';
// import { Button } from 'reactstrap';
// import EditorComponent from '../paragraph-edit-update/EditorComponent';
// import './ParagraphTable.css';

// const ParagraphTable = ({
//   paragraphList,
//   openFile,
//   loading,
//   handleSyncList,
//   postId,
// }) => {
//   const [isContentLoaded, setIsContentLoaded] = useState(false);
//   const [contentMap, setContentMap] = useState({});

//   const adjustEditorHeight = id => {
//     const editorElement = document.getElementById(`editorjs-${id}`);
//     if (editorElement) {
//       const lineHeight = 24; // Cấu hình chiều cao dòng phù hợp với font của bạn
//       const numberOfLines = editorElement.scrollHeight / lineHeight;
//       const newHeight = numberOfLines * lineHeight;
//       editorElement.style.height = `250px`;
//       // editorElement.style.height = `${newHeight}px`;
//     }
//   };

//   useEffect(() => {
//     paragraphList.forEach(paragraph => {
//       if (contentMap[paragraph.id]) {
//         adjustEditorHeight(paragraph.id);
//       }
//     });
//   }, [contentMap]);
//   useEffect(() => {
//     if (paragraphList && paragraphList.length > 0) {
//       const initialContentMap = {};
//       paragraphList.forEach(paragraph => {
//         if (paragraph.content) {
//           try {
//             const parsedContent = JSON.parse(paragraph.content);
//             if (
//               parsedContent &&
//               typeof parsedContent === 'object' &&
//               parsedContent.blocks
//             ) {
//               initialContentMap[paragraph.id] = parsedContent;
//             } else {
//               console.error('Invalid content structure', parsedContent);
//             }
//           } catch (e) {
//             console.error('Failed to parse paragraph content', e);
//           }
//         }
//       });
//       setContentMap(initialContentMap);
//       setIsContentLoaded(true);
//     }
//   }, [paragraphList]);
//   return (
//     <div className="ParagraphTable">
//       {paragraphList && paragraphList.length > 0
//         ? paragraphList.map((paragraph, i) => (
//             <div key={`entity-${paragraph.id}`} className="paragraph-container">
//               {/* <div>{paragraph.id}</div> */}
//               {paragraph.image ? (
//                 <div className="image-container">
//                   {paragraph.imageContentType ? (
//                     <a
//                       onClick={openFile(
//                         paragraph.imageContentType,
//                         paragraph.image,
//                       )}
//                     >
//                       <img
//                         src={`data:${paragraph.imageContentType};base64,${paragraph.image}`}
//                         alt={paragraph.caption}
//                         className="centered-image"
//                       />
//                       &nbsp;
//                     </a>
//                   ) : null}
//                 </div>
//               ) : null}
//               <div className="caption-container">{paragraph.caption}</div>
//               <div>{paragraph.content}</div>
//               <div id={`editorjs-${paragraph.id}`} className="editor-container">
//                 {isContentLoaded && contentMap[paragraph.id] && (
//                   <EditorComponent
//                     data={contentMap[paragraph.id]}
//                     onChange={newContent => {
//                       setContentMap({
//                         ...contentMap,
//                         [paragraph.id]: newContent,
//                       });
//                     }}
//                     holder={`editorjs-${paragraph.id}`}
//                     readOnly={true}
//                   />
//                 )}
//               </div>
//               <div className="btn-group flex-btn-group-container">
//                 <Button
//                   tag={Link}
//                   to={`/paragrapheditupdatepage/${paragraph.id}?postId=${postId}`}
//                   color="primary"
//                   size="sm"
//                   data-cy="entityEditButton"
//                 >
//                   <FontAwesomeIcon icon="pencil-alt" />{' '}
//                   <span className="d-none d-md-inline">
//                     <Translate contentKey="entity.action.edit">Edit</Translate>
//                   </span>
//                 </Button>
//                 <Button
//                   onClick={() =>
//                     (window.location.href = `/paragraph/${paragraph.id}/delete`)
//                   }
//                   color="danger"
//                   size="sm"
//                   data-cy="entityDeleteButton"
//                 >
//                   <FontAwesomeIcon icon="trash" />{' '}
//                   <span className="d-none d-md-inline">
//                     <Translate contentKey="entity.action.delete">
//                       Delete
//                     </Translate>
//                   </span>
//                 </Button>
//               </div>
//             </div>
//           ))
//         : !loading && (
//             <div className="alert alert-warning">
//               <Translate contentKey="seaportApp.paragraph.home.notFound">
//                 No Paragraphs found
//               </Translate>
//             </div>
//           )}
//     </div>
//   );
// };

// export default ParagraphTable;
import React, { useEffect, useState } from 'react';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './ParagraphTable.css';

const ParagraphTable = ({ paragraphList, openFile, loading, postId }) => {
  const [contentMap, setContentMap] = useState({});

  useEffect(() => {
    if (paragraphList && paragraphList.length > 0) {
      const initialContentMap = {};
      paragraphList.forEach(paragraph => {
        if (paragraph.content) {
          initialContentMap[paragraph.id] = paragraph.content; // Use content directly
        }
      });
      setContentMap(initialContentMap);
    }
  }, [paragraphList]);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          {paragraphList && paragraphList.length > 0
            ? paragraphList.map(paragraph => (
                <div
                  key={`entity-${paragraph.id}`}
                  className="paragraph-container"
                >
                  <div className="btn-group flex-btn-group-container">
                    <Button
                      tag={Link}
                      to={`/paragrapheditupdatepage/${paragraph.id}?postId=${postId}`}
                      color="primary"
                      size="sm"
                      data-cy="entityEditButton"
                    >
                      <FontAwesomeIcon icon="pencil-alt" />{' '}
                      <span className="d-none d-md-inline">
                        <Translate contentKey="entity.action.edit">
                          Edit
                        </Translate>
                      </span>
                    </Button>
                    <Button
                      onClick={() =>
                        (window.location.href = `/paragraphdelete/${paragraph.id}?postId=${postId}`)
                      }
                      color="danger"
                      size="sm"
                      data-cy="entityDeleteButton"
                    >
                      <FontAwesomeIcon icon="trash" />{' '}
                      <span className="d-none d-md-inline">
                        <Translate contentKey="entity.action.delete">
                          Delete
                        </Translate>
                      </span>
                    </Button>
                  </div>
                  {paragraph.image && paragraph.imageContentType && (
                    <div className="image-container">
                      <a
                        onClick={openFile(
                          paragraph.imageContentType,
                          paragraph.image,
                        )}
                      >
                        <img
                          src={`data:${paragraph.imageContentType};base64,${paragraph.image}`}
                          alt={paragraph.caption}
                          className="centered-image"
                        />
                      </a>
                    </div>
                  )}
                  <div className="caption-container">{paragraph.caption}</div>

                  <div
                    id={`editorjs-${paragraph.id}`}
                    className="editor-container"
                  >
                    {contentMap[paragraph.id] && (
                      <CKEditor
                        editor={ClassicEditor}
                        data={contentMap[paragraph.id]} // Directly use content without parsing
                        config={{
                          toolbar: [], // Hide toolbar for read-only mode
                        }}
                        onReady={editor => {
                          // Code runs when editor is ready
                          editor.enableReadOnlyMode('read-only-mode');
                        }}
                      />
                    )}
                  </div>
                </div>
              ))
            : !loading && (
                <div className="alert alert-warning">
                  <Translate contentKey="seaportApp.paragraph.home.notFound">
                    No Paragraphs found
                  </Translate>
                </div>
              )}
        </Col>
      </Row>
    </div>
  );
};

export default ParagraphTable;
