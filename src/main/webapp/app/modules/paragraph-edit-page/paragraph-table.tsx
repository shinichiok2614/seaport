import React, { useEffect, useState } from 'react';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import EditorComponent from '../paragraph-edit-update/EditorComponent';
import './ParagraphTable.css';

const ParagraphTable = ({
  paragraphList,
  openFile,
  loading,
  handleSyncList,
  postId,
}) => {
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const [content, setContent] = useState({});
  const [contentMap, setContentMap] = useState({});

  useEffect(() => {
    if (paragraphList && paragraphList.length > 0) {
      const initialContentMap = {};
      paragraphList.forEach(paragraph => {
        if (paragraph.content) {
          try {
            const parsedContent = JSON.parse(paragraph.content);
            if (
              parsedContent &&
              typeof parsedContent === 'object' &&
              parsedContent.blocks
            ) {
              initialContentMap[paragraph.id] = parsedContent;
            } else {
              console.error('Invalid content structure', parsedContent);
            }
          } catch (e) {
            console.error('Failed to parse paragraph content', e);
          }
        }
      });
      setContentMap(initialContentMap);
      setIsContentLoaded(true);
    }
  }, [paragraphList]);
  return (
    <div className="table-responsive">
      {paragraphList && paragraphList.length > 0
        ? paragraphList.map((paragraph, i) => (
            <div key={`entity-${paragraph.id}`} className="paragraph-container">
              <div>{paragraph.id}</div>
              {paragraph.image ? (
                <div className="image-container">
                  {paragraph.imageContentType ? (
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
                      &nbsp;
                    </a>
                  ) : null}
                </div>
              ) : null}
              <div className="caption-container">{paragraph.caption}</div>
              <div>{paragraph.content}</div>
              {isContentLoaded && contentMap[paragraph.id] && (
                <EditorComponent
                  data={contentMap[paragraph.id]}
                  onChange={newContent => {
                    setContentMap({
                      ...contentMap,
                      [paragraph.id]: newContent,
                    });
                  }}
                  holder={`editorjs-${paragraph.id}`}
                />
              )}
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
                    <Translate contentKey="entity.action.edit">Edit</Translate>
                  </span>
                </Button>
                <Button
                  onClick={() =>
                    (window.location.href = `/paragraph/${paragraph.id}/delete`)
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
            </div>
          ))
        : !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="seaportApp.paragraph.home.notFound">
                No Paragraphs found
              </Translate>
            </div>
          )}
    </div>
  );
};

export default ParagraphTable;
