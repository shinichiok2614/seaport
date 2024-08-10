import React from 'react';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const ParagraphTable = ({
  paragraphList,
  openFile,
  loading,
  handleSyncList,
  postId,
}) => {
  return (
    <div className="table-responsive">
      {paragraphList && paragraphList.length > 0
        ? paragraphList.map((paragraph, i) => (
            <div key={`entity-${i}`}>
              {paragraph.image ? (
                <div>
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
                      />
                      &nbsp;
                    </a>
                  ) : null}
                </div>
              ) : null}
              <div>{paragraph.id}</div>
              <div>{paragraph.caption}</div>
              <div>{paragraph.content}</div>
              <div className="btn-group flex-btn-group-container">
                {/* <Button
                  tag={Link}
                  to={`/paragraph/${paragraph.id}`}
                  color="info"
                  size="sm"
                  data-cy="entityDetailsButton"
                >
                  <FontAwesomeIcon icon="eye" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.view">View</Translate>
                  </span>
                </Button> */}
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
